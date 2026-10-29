import React, { useState, useEffect, useRef } from 'react';
import {
  Languages,
  ArrowRightLeft,
  Copy,
  Check,
  Volume2,
  Sparkles,
  Loader2,
  AlertCircle,
  FileText,
  RotateCcw,
  Trash2,
  History,
  BookMarked,
  MessageSquare,
  Globe,
  Mic,
  MicOff,
  Radio,
  Square,
} from 'lucide-react';
import { TranslationStyle, AlternativeSense } from '../../types/dictionary';
import { translateSentence } from '../../services/translationService';
import { detectLanguage } from '../../services/dictionarySearch';
import { speakText } from '../../services/dictionaryAudio';
import { getDictionaryPreferences, saveDictionaryPreferences } from '../../services/dictionaryStorage';

interface HistoryItem {
  id: string;
  sourceText: string;
  translatedText: string;
  fromLang: 'ar' | 'en';
  toLang: 'ar' | 'en';
  styleUsed?: TranslationStyle;
  timestamp: string;
}

const SAMPLE_SENTENCES = [
  {
    label: 'Academic English',
    text: 'Continuous perseverance and dedicated practice are essential to achieve academic distinction.',
    lang: 'en' as const,
  },
  {
    label: 'Egyptian Secondary Curriculum',
    text: 'تعد المبادرة الوطنية للذكاء الاصطناعي ركيزة أساسية لتطوير مهارات طلاب الثانوية العامة.',
    lang: 'ar' as const,
  },
  {
    label: 'Egyptian Colloquial',
    text: 'شد حيلك في المذاكرة وإن شاء الله هتحقق كل أحلامك وتجيب مجموع عالي.',
    lang: 'ar' as const,
  },
];

export const DictionaryView: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [targetLang, setTargetLang] = useState<'ar' | 'en'>('ar');
  const [translationStyle, setTranslationStyle] = useState<TranslationStyle>('msa');
  const [manualDirection, setManualDirection] = useState<boolean>(false);
  const [preferredAccent, setPreferredAccent] = useState<'us' | 'uk'>('us');

  // Translation State
  const [isLoading, setIsLoading] = useState(false);
  const [resultText, setResultText] = useState('');
  const [alternativeSenses, setAlternativeSenses] = useState<AlternativeSense[]>([]);
  const [contextNote, setContextNote] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState('');

  // Audio & Copy State
  const [isCopied, setIsCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // Speech Recognition Voice Input State
  const [isListening, setIsListening] = useState(false);
  const [autoTranslateAfterVoice, setAutoTranslateAfterVoice] = useState(true);
  const [voiceError, setVoiceError] = useState<string | null>(null);
  const [voiceLang, setVoiceLang] = useState<'ar-EG' | 'ar-SA' | 'en-US' | 'en-GB'>('ar-EG');
  const [interimText, setInterimText] = useState<string>('');

  // Async Refs to prevent memory leaks, stale closures, and infinite recording loops
  const recognitionRef = useRef<any>(null);
  const maxRecordingTimerRef = useRef<any>(null);
  const silenceTimerRef = useRef<any>(null);
  const hasCapturedFinalResultRef = useRef<boolean>(false);
  const accumulatedTranscriptRef = useRef<string>('');
  const isListeningRef = useRef<boolean>(false);

  useEffect(() => {
    const prefs = getDictionaryPreferences();
    setPreferredAccent(prefs.preferredAccent);

    try {
      const storedHistory = localStorage.getItem('englimensh_translation_history');
      if (storedHistory) {
        setHistory(JSON.parse(storedHistory));
      }
    } catch {
      // Ignore JSON parse errors
    }

    return () => {
      stopVoiceInput(false);
    };
  }, []);

  const autoDetectedLang = detectLanguage(inputText);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setInputText(val);
    if (!manualDirection && val.trim()) {
      const detected = detectLanguage(val);
      const newTarget = detected === 'ar' ? 'en' : 'ar';
      setTargetLang(newTarget);
      if (newTarget === 'en') {
        setTranslationStyle('en');
      } else if (translationStyle === 'en') {
        setTranslationStyle('msa');
      }
    }
  };

  const handleAccentToggle = (accent: 'us' | 'uk') => {
    setPreferredAccent(accent);
    saveDictionaryPreferences({ preferredAccent: accent });
  };

  const handleSwapLanguages = () => {
    setManualDirection(true);
    const newTarget = targetLang === 'ar' ? 'en' : 'ar';
    setTargetLang(newTarget);
    if (newTarget === 'en') {
      setTranslationStyle('en');
    } else if (translationStyle === 'en') {
      setTranslationStyle('msa');
    }

    if (resultText) {
      setInputText(resultText);
      setResultText(inputText);
    }
  };

  // Safe timer disposal helper
  const cleanupVoiceTimers = () => {
    if (maxRecordingTimerRef.current) {
      clearTimeout(maxRecordingTimerRef.current);
      maxRecordingTimerRef.current = null;
    }
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }
  };

  // Complete cleanup and stop of speech recognition session
  const stopVoiceInput = (byUser: boolean = true) => {
    cleanupVoiceTimers();
    isListeningRef.current = false;
    setIsListening(false);
    setInterimText('');

    if (recognitionRef.current) {
      try {
        const rec = recognitionRef.current;
        recognitionRef.current = null;
        rec.onstart = null;
        rec.onresult = null;
        rec.onerror = null;
        rec.onend = null;
        rec.onspeechend = null;
        rec.stop();
      } catch {
        // Stop cleanly without error logging
      }
    }
  };

  // Speech Recognition Deduplication Guard Ref
  const hasSubmittedVoiceTranslationRef = useRef<boolean>(false);

  // Robust Speech Recognition Start with full lifecycle handlers & timeouts
  const startVoiceInput = () => {
    setVoiceError(null);
    setInterimText('');
    hasCapturedFinalResultRef.current = false;
    hasSubmittedVoiceTranslationRef.current = false;
    accumulatedTranscriptRef.current = '';

    const SpeechRecognitionAPI =
      typeof window !== 'undefined' &&
      ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition);

    if (!SpeechRecognitionAPI) {
      setVoiceError('متصفحك الحالي لا يدعم الإدخال الصوتي المباشر. يرجى استخدام متصفح Chrome أو Edge.');
      return;
    }

    // Stop previous instance if active
    stopVoiceInput(false);

    try {
      const recognition = new SpeechRecognitionAPI();
      recognitionRef.current = recognition;

      recognition.continuous = false;
      recognition.interimResults = true;

      // Select voice language: use explicit selection or infer from target/source language
      const defaultVoiceLang = autoDetectedLang === 'ar' || targetLang === 'en' ? 'ar-EG' : 'en-US';
      const effectiveVoiceLang = voiceLang || defaultVoiceLang;
      recognition.lang = effectiveVoiceLang;

      recognition.onstart = () => {
        isListeningRef.current = true;
        setIsListening(true);
        setVoiceError(null);

        cleanupVoiceTimers();

        // 1. Max recording safety timeout (25 seconds) to prevent infinite listening hanging
        maxRecordingTimerRef.current = setTimeout(() => {
          if (isListeningRef.current) {
            if (!accumulatedTranscriptRef.current.trim()) {
              setVoiceError('لم يتم التعرف على كلام. حاول مرة أخرى.');
            }
            stopVoiceInput(false);
          }
        }, 25000);

        // 2. Silence detection timeout (10 seconds)
        silenceTimerRef.current = setTimeout(() => {
          if (isListeningRef.current && !accumulatedTranscriptRef.current.trim()) {
            setVoiceError('لم يتم التعرف على كلام. حاول مرة أخرى.');
            stopVoiceInput(false);
          }
        }, 10000);
      };

      recognition.onresult = (event: any) => {
        if (silenceTimerRef.current) {
          clearTimeout(silenceTimerRef.current);
          silenceTimerRef.current = null;
        }

        let finalStr = '';
        let interimStr = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          const chunk = result[0]?.transcript || '';
          if (result.isFinal) {
            finalStr += chunk;
          } else {
            interimStr += chunk;
          }
        }

        if (finalStr.trim()) {
          const cleanFinal = finalStr.trim();
          const existing = accumulatedTranscriptRef.current;
          const updated = existing ? `${existing} ${cleanFinal}` : cleanFinal;
          accumulatedTranscriptRef.current = updated;
          hasCapturedFinalResultRef.current = true;
          setInputText(updated);
          setInterimText('');
        } else if (interimStr.trim()) {
          setInterimText(interimStr);
        }
      };

      recognition.onspeechend = () => {
        cleanupVoiceTimers();
        try {
          recognition.stop();
        } catch {
          // Ignore stop errors
        }
      };

      recognition.onerror = (event: any) => {
        cleanupVoiceTimers();
        isListeningRef.current = false;
        setIsListening(false);
        setInterimText('');

        const err = event.error;
        if (err === 'not-allowed' || err === 'permission-denied') {
          setVoiceError('تم رفض إذن استخدام المايكروفون. يرجى تفعيله من إعدادات المتصفح.');
        } else if (err === 'no-speech') {
          setVoiceError('لم يتم التعرف على كلام. حاول مرة أخرى.');
        } else if (err === 'audio-capture') {
          setVoiceError('تعذر العثور على مايكروفون يعمل. يرجى التأكد من توصيل المايكروفون.');
        } else if (err === 'network') {
          setVoiceError('تعذر الاتصال بخدمة التعرف على الصوت. تحقق من اتصال الإنترنت.');
        } else if (err !== 'aborted') {
          setVoiceError('تعذر معالجة الصوت، برجاء إعادة المحاولة.');
        }
      };

      recognition.onend = () => {
        cleanupVoiceTimers();
        const wasActive = isListeningRef.current;
        isListeningRef.current = false;
        setIsListening(false);
        setInterimText('');

        const capturedFinal = hasCapturedFinalResultRef.current;
        const finalText = accumulatedTranscriptRef.current.trim();

        if (recognitionRef.current === recognition) {
          recognitionRef.current = null;
        }

        // Trigger translation EXACTLY ONCE if autoTranslate is enabled, a final transcript exists, and not yet submitted
        if (wasActive && capturedFinal && finalText && autoTranslateAfterVoice && !hasSubmittedVoiceTranslationRef.current) {
          hasSubmittedVoiceTranslationRef.current = true;
          setTimeout(() => {
            handleTranslate(finalText);
          }, 150);
        }
      };

      recognition.start();
    } catch (err: any) {
      cleanupVoiceTimers();
      isListeningRef.current = false;
      setIsListening(false);
      setVoiceError('تعذر بدء التسجيل الصوتي. برجاء التأكد من إذن المايكروفون.');
    }
  };

  const saveToHistoryLog = (src: string, trans: string, from: 'ar' | 'en', to: 'ar' | 'en', style?: TranslationStyle) => {
    const newItem: HistoryItem = {
      id: Date.now().toString(),
      sourceText: src,
      translatedText: trans,
      fromLang: from,
      toLang: to,
      styleUsed: style,
      timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
    };

    setHistory((prev) => {
      const updated = [newItem, ...prev.filter((h) => h.sourceText !== src).slice(0, 19)];
      try {
        localStorage.setItem('englimensh_translation_history', JSON.stringify(updated));
      } catch {
        // Storage fallback
      }
      return updated;
    });
  };

  const handleTranslate = async (overrideText?: string) => {
    const textToUse = typeof overrideText === 'string' ? overrideText : inputText;
    const cleanText = textToUse.trim();
    if (!cleanText) {
      setErrorMessage('لا يوجد نص واضح لترجمته.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    const fromLang = targetLang === 'ar' ? 'en' : 'ar';
    const toLang = targetLang;
    const styleToUse = toLang === 'en' ? 'en' : translationStyle;

    try {
      const response = await translateSentence(cleanText, fromLang, toLang, styleToUse);

      if (response.success && response.translation) {
        setResultText(response.translation);
        if (response.alternativeSenses) {
          setAlternativeSenses(response.alternativeSenses);
        } else {
          setAlternativeSenses([]);
        }
        if (response.note) {
          setContextNote(response.note);
        } else {
          setContextNote('');
        }
        saveToHistoryLog(cleanText, response.translation, fromLang, toLang, styleToUse);
      } else {
        setErrorMessage(response.error || 'تعذر الاتصال بخدمة الترجمة. يمكنك إعادة المحاولة.');
      }
    } catch (err: any) {
      if (err === 'timeout' || err.name === 'AbortError') {
        setErrorMessage('استغرق الطلب وقتًا أطول من المتوقع. حاول مرة أخرى.');
        return;
      }
      console.error('Translation failed:', err);
      setErrorMessage('تعذر الاتصال بخدمة الترجمة. يمكنك إعادة المحاولة.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setInputText('');
    setResultText('');
    setAlternativeSenses([]);
    setContextNote('');
    setErrorMessage('');
    setVoiceError(null);
    setIsCopied(false);
  };

  const handleCopy = () => {
    if (!resultText) return;
    navigator.clipboard.writeText(resultText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleSpeak = () => {
    if (!resultText) return;
    setIsSpeaking(true);
    speakText(
      resultText,
      targetLang,
      preferredAccent,
      () => setIsSpeaking(true),
      () => setIsSpeaking(false),
      () => setIsSpeaking(false)
    );
  };

  const handleClearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem('englimensh_translation_history');
    } catch {
      // Ignore clear errors
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-24 pt-4 sm:pt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-6">
        {/* 1. Hero Header Banner */}
        <div className="bg-gradient-to-r from-[#07224D] via-[#0B397D] to-[#0878E8] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-10 -bottom-10 w-60 h-60 bg-[#FFC928]/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-amber-300 text-xs font-bold">
                <BookMarked className="w-4 h-4 text-[#FFC928]" />
                <span>EngliMensh.EG Intelligent Translation Studio • المترجم الذكي</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                المترجم الذكي ثنائي اللغة
              </h1>

              <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
                ترجمة فورية فائقة السرعة تدعم العربية الفصحى، العامية المصرية، والإنجليزية الأكاديمية مع الإدخال الصوتي المباشر والنطق الأكاديمي الاصلي.
              </p>

              {/* Author Credit & Accent Selector */}
              <div className="pt-2 flex items-center gap-4 flex-wrap text-xs sm:text-sm">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20">
                  <span className="text-blue-200 font-medium">نطق الصوت:</span>
                  <button
                    onClick={() => handleAccentToggle('us')}
                    className={`px-2.5 py-0.5 rounded-lg font-bold transition-all cursor-pointer ${
                      preferredAccent === 'us'
                        ? 'bg-[#FFC928] text-[#07224D] shadow-xs'
                        : 'text-white/80 hover:text-white'
                    }`}
                  >
                    🇺🇸 US Accent
                  </button>
                  <button
                    onClick={() => handleAccentToggle('uk')}
                    className={`px-2.5 py-0.5 rounded-lg font-bold transition-all cursor-pointer ${
                      preferredAccent === 'uk'
                        ? 'bg-[#FFC928] text-[#07224D] shadow-xs'
                        : 'text-white/80 hover:text-white'
                    }`}
                  >
                    🇬🇧 UK Accent
                  </button>
                </div>

                <div className="text-blue-200 font-medium flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/20">
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>By Eng. Mohammad El-Menshawy (محمد المنشاوي)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Main Translation Workbench Container */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl p-5 sm:p-7 space-y-6">
          {/* Workbench Controls Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            {/* Left: Direction Badge */}
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-blue-50 text-[#0878E8] shadow-xs">
                <Languages className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-black text-[#07224D] flex items-center gap-2">
                  <span>المترجم الذكي ثنائي اللغة</span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-100 text-[#0878E8] font-bold">
                    {autoDetectedLang === 'ar' ? 'العربية ← English' : 'English ← العربية'}
                  </span>
                </h2>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  اكتب أو تحدث بالصوت للترجمة الفورية
                </p>
              </div>
            </div>

            {/* Right: Language Swap & Dialect Controls */}
            <div className="flex items-center gap-3 flex-wrap w-full sm:w-auto">
              {/* Dialect Selector (When translating into Arabic) */}
              {targetLang === 'ar' && (
                <div className="flex items-center bg-slate-100 p-1 rounded-2xl text-xs font-bold text-slate-700 border border-slate-200">
                  <button
                    onClick={() => setTranslationStyle('msa')}
                    className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                      translationStyle === 'msa'
                        ? 'bg-[#07224D] text-white shadow-xs font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    العربية الفصحى (MSA)
                  </button>
                  <button
                    onClick={() => setTranslationStyle('egyptian_arabic')}
                    className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                      translationStyle === 'egyptian_arabic'
                        ? 'bg-[#0878E8] text-white shadow-xs font-bold'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    🇪🇬 العامية المصرية
                  </button>
                </div>
              )}

              {/* Swap Button */}
              <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl text-xs font-bold text-slate-700 border border-slate-200">
                <span className={targetLang === 'ar' ? 'text-[#0878E8] font-extrabold' : 'text-slate-600'}>
                  English
                </span>
                <button
                  onClick={handleSwapLanguages}
                  className="p-2 rounded-xl bg-white hover:bg-blue-50 text-[#0878E8] shadow-2xs transition-transform active:scale-90 cursor-pointer border border-slate-200"
                  title="تبديل اتجاه الترجمة (Swap Languages)"
                >
                  <ArrowRightLeft className="w-4 h-4" />
                </button>
                <span className={targetLang === 'en' ? 'text-[#0878E8] font-extrabold' : 'text-slate-600'}>
                  العربية
                </span>
              </div>
            </div>
          </div>

          {/* Sample Starter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs scrollbar-none">
            <span className="font-bold text-slate-400 shrink-0 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>جمل نموذجية للتجربة:</span>
            </span>
            {SAMPLE_SENTENCES.map((sample, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setInputText(sample.text);
                  setManualDirection(false);
                  const newTarget = sample.lang === 'ar' ? 'en' : 'ar';
                  setTargetLang(newTarget);
                  if (newTarget === 'en') setTranslationStyle('en');
                  else setTranslationStyle('msa');
                }}
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-blue-50 hover:text-[#0878E8] font-semibold text-slate-700 transition-colors whitespace-nowrap cursor-pointer border border-slate-200/60"
              >
                {sample.label}
              </button>
            ))}
          </div>

          {/* Workbench Grid: Input Textarea & Output Translation Container */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left: Source Textarea & Voice Box */}
            <div className="space-y-3 flex flex-col">
              <div className="flex items-center justify-between text-xs font-bold text-slate-600 px-1 flex-wrap gap-2">
                <span className="flex items-center gap-1.5">
                  <Globe className="w-4 h-4 text-[#0878E8]" />
                  <span>النص الأصلي ({autoDetectedLang === 'ar' ? 'العربية' : 'English'})</span>
                </span>

                {/* Voice Input Options & Auto-Translate Toggle */}
                <div className="flex items-center gap-2.5 flex-wrap">
                  <div className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-xl text-[11px] border border-slate-200">
                    <span className="text-slate-500 font-bold">صوت:</span>
                    <select
                      value={voiceLang}
                      onChange={(e) => setVoiceLang(e.target.value as any)}
                      className="bg-white text-slate-800 text-[11px] font-bold rounded-lg px-1.5 py-0.5 border border-slate-200 focus:outline-none focus:ring-1 focus:ring-[#0878E8] cursor-pointer"
                    >
                      <option value="ar-EG">🇪🇬 عامية (ar-EG)</option>
                      <option value="ar-SA">🇸🇦 فصحى (ar-SA)</option>
                      <option value="en-US">🇺🇸 English US</option>
                      <option value="en-GB">🇬🇧 English UK</option>
                    </select>
                  </div>

                  <label className="inline-flex items-center gap-1 text-[11px] text-slate-600 font-medium cursor-pointer">
                    <input
                      type="checkbox"
                      checked={autoTranslateAfterVoice}
                      onChange={(e) => setAutoTranslateAfterVoice(e.target.checked)}
                      className="rounded text-[#0878E8] focus:ring-[#0878E8] w-3.5 h-3.5"
                    />
                    <span>ترجمة تلقائية</span>
                  </label>

                  <span className="text-[11px] text-slate-400 font-mono">
                    {inputText.length} حرف | {inputText.trim() ? inputText.trim().split(/\s+/).length : 0} كلمة
                  </span>
                </div>
              </div>

              {/* Voice Error Banner */}
              {voiceError && (
                <div className="p-3 bg-amber-50 border border-amber-200 text-amber-900 text-xs rounded-xl flex items-center justify-between gap-2 animate-fadeIn">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>{voiceError}</span>
                  </div>
                  <button
                    onClick={() => setVoiceError(null)}
                    className="text-amber-700 hover:text-amber-900 font-bold text-xs cursor-pointer"
                  >
                    إغلاق
                  </button>
                </div>
              )}

              {/* Input Area with Live Speech Recording Badge & Interim Stream */}
              <div className="relative">
                <textarea
                  value={inputText}
                  onChange={handleInputChange}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                      e.preventDefault();
                      handleTranslate();
                    }
                  }}
                  placeholder={
                    targetLang === 'ar'
                      ? 'اكتب هنا أو اضغط على المايكروفون للتحدث باللغة الإنجليزية...'
                      : 'أدخل النص بالعربية هنا أو تحدث بالصوت للترجمة الفورية...'
                  }
                  dir={autoDetectedLang === 'ar' ? 'rtl' : 'ltr'}
                  rows={7}
                  className={`w-full p-4 rounded-2xl border text-slate-900 placeholder-slate-400 text-base focus:outline-none focus:ring-2 focus:ring-[#0878E8] focus:bg-white transition-all resize-none font-sans leading-relaxed shadow-inner ${
                    isListening ? 'bg-amber-50/50 border-amber-300 ring-2 ring-amber-400/50' : 'bg-slate-50 border-slate-200'
                  }`}
                />

                {/* Voice Recording Active Overlay Badge */}
                {isListening && (
                  <div className="absolute top-3 right-3 left-3 flex flex-col gap-1.5 bg-rose-600/95 backdrop-blur-md text-white p-3 rounded-2xl text-xs font-bold shadow-lg animate-fadeIn border border-rose-400/30">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Radio className="w-4 h-4 animate-spin text-amber-300" />
                        <span>
                          تحدث الآن... جارٍ الاستماع (
                          {voiceLang === 'ar-EG'
                            ? 'العامية المصرية'
                            : voiceLang === 'ar-SA'
                            ? 'العربية الفصحى'
                            : voiceLang === 'en-GB'
                            ? 'English UK'
                            : 'English US'}
                          )
                        </span>
                      </div>
                      <button
                        onClick={() => stopVoiceInput(true)}
                        className="px-2.5 py-1 bg-white text-rose-700 hover:bg-rose-50 rounded-lg text-xs font-extrabold flex items-center gap-1 shadow-xs cursor-pointer transition-colors"
                      >
                        <Square className="w-3 h-3 fill-current" />
                        <span>إيقاف (Stop)</span>
                      </button>
                    </div>
                    {interimText && (
                      <div className="bg-rose-900/60 p-2 rounded-xl text-amber-200 font-mono text-[11px] border border-rose-400/20 italic">
                        "{interimText}"
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Source Controls: Clear & Voice Input & Translate */}
              <div className="flex items-center justify-between pt-1 flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleClear}
                    disabled={!inputText && !resultText}
                    className="text-xs text-slate-400 hover:text-rose-600 font-bold cursor-pointer disabled:opacity-40 transition-colors flex items-center gap-1 px-2 py-1.5 rounded-lg hover:bg-slate-100"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>مسح النص</span>
                  </button>

                  {/* Microphone Button */}
                  {isListening ? (
                    <button
                      onClick={() => stopVoiceInput(true)}
                      className="px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md cursor-pointer animate-pulse transition-all"
                      title="إيقاف التسجيل الصوتي"
                    >
                      <Square className="w-4 h-4 fill-current" />
                      <span>إيقاف الاستماع (Stop)</span>
                    </button>
                  ) : (
                    <button
                      onClick={startVoiceInput}
                      className="px-3.5 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-[#0878E8] text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-all active:scale-95 cursor-pointer"
                      title="بدء الإدخال الصوتي بالمايكروفون"
                    >
                      <Mic className="w-4 h-4 text-[#0878E8]" />
                      <span>تحدث بالصوت (Voice Input)</span>
                    </button>
                  )}
                </div>

                <button
                  onClick={() => handleTranslate()}
                  disabled={isLoading || !inputText.trim()}
                  className="px-6 py-3 rounded-2xl bg-[#0878E8] hover:bg-blue-600 text-white font-black text-sm shadow-lg shadow-blue-500/20 transition-all transform active:scale-95 flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin text-white" />
                      <span>جارٍ تجهيز الترجمة...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 text-[#FFC928]" />
                      <span>ترجمة الآن (Translate)</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Right: Translation Output Box */}
            <div className="space-y-3 flex flex-col">
              <div className="flex items-center justify-between text-xs font-bold text-slate-600 px-1">
                <span className="flex items-center gap-1.5">
                  <Languages className="w-4 h-4 text-amber-500" />
                  <span>
                    الترجمة الفورية ({targetLang === 'ar' ? (translationStyle === 'egyptian_arabic' ? 'العامية المصرية 🇪🇬' : 'العربية الفصحى') : 'English'})
                  </span>
                </span>
                {resultText && (
                  <span className="text-[11px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                    تمت الترجمة بنجاح
                  </span>
                )}
              </div>

              <div
                dir={targetLang === 'ar' ? 'rtl' : 'ltr'}
                className="w-full p-5 rounded-2xl bg-blue-50/70 border border-blue-100/90 text-slate-900 text-base min-h-[180px] flex-1 flex flex-col justify-between font-sans relative shadow-inner"
              >
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center py-10 text-slate-400 space-y-3 my-auto">
                    <Loader2 className="w-8 h-8 animate-spin text-[#0878E8]" />
                    <span className="text-sm font-bold text-[#0878E8]">
                      جارٍ تجهيز الترجمة...
                    </span>
                  </div>
                ) : errorMessage ? (
                  <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-rose-800 text-xs space-y-2 my-auto" dir="ltr">
                    <div className="flex items-center gap-2 font-bold text-sm text-rose-700">
                      <AlertCircle className="w-5 h-5 text-rose-600" />
                      <span>Notice / تنبيه</span>
                    </div>
                    <p className="leading-relaxed">{errorMessage}</p>
                    <button
                      onClick={() => handleTranslate()}
                      className="mt-2 px-4 py-2 bg-rose-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer hover:bg-rose-700 transition-colors shadow-xs"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>إعادة المحاولة (Retry)</span>
                    </button>
                  </div>
                ) : resultText ? (
                  <div className="space-y-4">
                    <p className="text-lg sm:text-xl font-bold leading-relaxed text-[#07224D]">
                      {resultText}
                    </p>

                    {/* Optional Dialect or Context Note */}
                    {contextNote && (
                      <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2">
                        <MessageSquare className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <span>{contextNote}</span>
                      </div>
                    )}

                    {/* Multi-Meaning Breakdown (If single word translated) */}
                    {alternativeSenses && alternativeSenses.length > 0 && (
                      <div className="pt-3 border-t border-blue-200/60 space-y-2">
                        <span className="text-xs font-bold text-[#0878E8] block">
                          معاني إضافية وسياقات الكلمة (Alternative Senses):
                        </span>
                        <div className="grid grid-cols-1 gap-2">
                          {alternativeSenses.map((sense, sIdx) => (
                            <div key={sIdx} className="bg-white/80 p-2.5 rounded-xl border border-blue-100 text-xs space-y-1">
                              <div className="flex items-center justify-between font-bold text-slate-800">
                                <span>{sense.meaning}</span>
                                {sense.partOfSpeech && (
                                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-blue-100 text-[#0878E8]">
                                    {sense.partOfSpeech}
                                  </span>
                                )}
                              </div>
                              <p className="text-slate-500 text-[11px]">{sense.context}</p>
                              {sense.exampleEn && (
                                <p className="text-slate-600 text-[11px] italic font-sans" dir="ltr">
                                  "{sense.exampleEn}" {sense.exampleAr ? `(${sense.exampleAr})` : ''}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="my-auto text-center py-8 text-slate-400 text-xs space-y-2">
                    <FileText className="w-10 h-10 mx-auto text-blue-200" />
                    <p className="text-sm font-semibold text-slate-500">
                      ستظهر نتيجة الترجمة الفورية في هذا الإطار فور الضغط على "ترجمة الآن".
                    </p>
                  </div>
                )}

                {/* Result Action Bar */}
                {resultText && !isLoading && (
                  <div className="flex items-center justify-end gap-2 pt-4 border-t border-blue-200/60" dir="ltr">
                    <button
                      onClick={handleSpeak}
                      className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-xs ${
                        isSpeaking
                          ? 'bg-[#FFC928] text-[#07224D] ring-2 ring-amber-400'
                          : 'bg-white hover:bg-blue-100 text-slate-700 border border-slate-200'
                      }`}
                      title="استماع إلى النطق الصوتي الأصلي"
                    >
                      <Volume2 className="w-4 h-4 text-[#0878E8]" />
                      <span>{isSpeaking ? 'جاري النطق...' : 'استماع صوتي'}</span>
                    </button>

                    <button
                      onClick={handleCopy}
                      className="px-3 py-2 rounded-xl text-xs font-bold bg-white hover:bg-blue-100 text-slate-700 border border-slate-200 transition-all cursor-pointer flex items-center gap-1.5 shadow-xs"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-600" />
                          <span className="text-emerald-600 font-bold">تم النسخ</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 text-slate-600" />
                          <span>نسخ الترجمة</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 3. Translation History Section */}
        {history.length > 0 && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between text-sm font-bold text-slate-700 pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2 text-[#07224D]">
                <History className="w-4 h-4 text-[#0878E8]" />
                <span>سجل الترجمات الأخيرة (Recent Translation History)</span>
              </div>

              <button
                onClick={handleClearHistory}
                className="text-xs text-slate-400 hover:text-rose-600 font-bold transition-colors cursor-pointer flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>مسح السجل</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {history.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    setInputText(item.sourceText);
                    setResultText(item.translatedText);
                    setTargetLang(item.toLang);
                  }}
                  className="p-3.5 rounded-2xl bg-slate-50 hover:bg-blue-50/80 border border-slate-200 hover:border-blue-200 transition-all cursor-pointer space-y-1.5 group"
                >
                  <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400">
                    <span className="font-mono">{item.timestamp}</span>
                    <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-[#0878E8] font-bold">
                      {item.fromLang.toUpperCase()} → {item.toLang.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-slate-800 line-clamp-1 truncate group-hover:text-[#0878E8]">
                    {item.sourceText}
                  </p>
                  <p className="text-xs text-slate-600 line-clamp-1 truncate font-medium">
                    {item.translatedText}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
