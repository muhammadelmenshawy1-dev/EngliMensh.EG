import React, { useState, useRef, useEffect } from 'react';
import {
  Mic,
  MicOff,
  Volume2,
  Copy,
  Check,
  Bookmark,
  ArrowLeftRight,
  RotateCcw,
} from 'lucide-react';
import {
  speakText,
  stopSpeaking,
  checkMicrophonePermission,
} from '../utils/speechService.ts';
import { translateSentence } from '../services/translationService.ts';
import { TranslationStyle } from '../types/dictionary.ts';

const translationCache = new Map<string, string>();
const TRANSLATION_TIMEOUT_MS = 10000;
const VOICE_LISTEN_TIMEOUT_MS = 8000;

type Language = 'en' | 'ar';
type TranslationStatus = 'idle' | 'loading' | 'success' | 'error';

// Built-in offline core vocabulary dictionary for instant fallback
const OFFLINE_CORE_DICTIONARY: Record<string, { ar: string; en: string }> = {
  friend: { ar: 'صديق', en: 'friend' },
  happy: { ar: 'سعيد', en: 'happy' },
  school: { ar: 'مدرسة', en: 'school' },
  teacher: { ar: 'معلم / أستاذ', en: 'teacher' },
  student: { ar: 'طالب', en: 'student' },
  book: { ar: 'كتاب', en: 'book' },
  family: { ar: 'عائلة / أسرة', en: 'family' },
  water: { ar: 'ماء', en: 'water' },
  science: { ar: 'علوم', en: 'science' },
  future: { ar: 'مستقبل', en: 'future' },
  success: { ar: 'نجاح', en: 'success' },
  knowledge: { ar: 'معرفة', en: 'knowledge' },
  curriculum: { ar: 'منهج دراسي', en: 'curriculum' },
  environment: { ar: 'بيئة', en: 'environment' },
  technology: { ar: 'تكنولوجيا / تقنية', en: 'technology' },
  education: { ar: 'تعليم', en: 'education' },
  hello: { ar: 'مرحباً / أهلاً', en: 'hello' },
  welcome: { ar: 'أهلاً بك', en: 'welcome' },
  صديق: { ar: 'صديق', en: 'friend' },
  سعيد: { ar: 'سعيد', en: 'happy' },
  مدرسة: { ar: 'مدرسة', en: 'school' },
  معلم: { ar: 'معلم', en: 'teacher' },
  طالب: { ar: 'طالب', en: 'student' },
  كتاب: { ar: 'كتاب', en: 'book' },
  عائلة: { ar: 'عائلة', en: 'family' },
  مستقبل: { ar: 'مستقبل', en: 'future' },
  نجاح: { ar: 'نجاح', en: 'success' },
  تعليم: { ar: 'تعليم', en: 'education' },
};

interface FastTranslatorProps {
  onSaveWord: (word: string, translation: string) => void;
}

const getSpeechErrorMessage = (error: string): string => {
  switch (error) {
    case 'not-allowed':
    case 'service-not-allowed':
      return 'تم رفض صلاحية الميكروفون. اسمح للتطبيق باستخدام الميكروفون من إعدادات المتصفح أو التطبيق.';
    case 'audio-capture':
      return 'لم يتم العثور على ميكروفون متاح. تحقق من توصيل الميكروفون وصلاحياته.';
    case 'no-speech':
      return 'لم نلتقط أي كلام. اضغط على الميكروفون وحاول التحدث بوضوح.';
    case 'network':
      return 'تعذر الاتصال بخدمة التعرف على الصوت. تحقق من الإنترنت وحاول مرة أخرى.';
    case 'language-not-supported':
      return 'خدمة التعرف على الصوت لا تدعم اللغة المحددة في هذه البيئة.';
    case 'aborted':
      return 'تم إيقاف التسجيل.';
    default:
      return 'تعذر التعرف على الكلام. تحقق من الميكروفون والصلاحيات وحاول مرة أخرى.';
  }
};

export const FastTranslator: React.FC<FastTranslatorProps> = ({ onSaveWord }) => {
  const [sourceText, setSourceText] = useState('');
  const [resultText, setResultText] = useState('');
  const [status, setStatus] = useState<TranslationStatus>('idle');
  const [sourceLang, setSourceLang] = useState<Language>('en');
  const [dialectStyle, setDialectStyle] = useState<TranslationStyle>('msa');
  const [isListening, setIsListening] = useState(false);
  const [voiceStatusMessage, setVoiceStatusMessage] = useState('');
  const [voiceError, setVoiceError] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [copied, setCopied] = useState(false);
  const [savedFeedback, setSavedFeedback] = useState(false);

  const recognitionRef = useRef<any>(null);
  const listenTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const requestIdRef = useRef(0);
  const mountedRef = useRef(true);
  const listeningRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
      listeningRef.current = false;

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (listenTimeoutRef.current) clearTimeout(listenTimeoutRef.current);

      abortControllerRef.current?.abort();

      if (recognitionRef.current) {
        try {
          recognitionRef.current.onstart = null;
          recognitionRef.current.onresult = null;
          recognitionRef.current.onerror = null;
          recognitionRef.current.onend = null;
          recognitionRef.current.abort();
        } catch {
          // Ignore
        }
        recognitionRef.current = null;
      }

      stopSpeaking();
    };
  }, []);

  const clearListenTimer = () => {
    if (listenTimeoutRef.current) {
      clearTimeout(listenTimeoutRef.current);
      listenTimeoutRef.current = null;
    }
  };

  const executeTranslation = async (
    textToTranslate: string,
    lang: Language,
    style: TranslationStyle = dialectStyle
  ): Promise<void> => {
    const query = textToTranslate.trim();
    if (!query || !mountedRef.current) return;

    const targetLang: Language = lang === 'en' ? 'ar' : 'en';
    const cacheKey = `${lang}:${targetLang}:${style}:${query.toLowerCase()}`;
    const cachedTranslation = translationCache.get(cacheKey);

    if (cachedTranslation !== undefined) {
      abortControllerRef.current?.abort();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      requestIdRef.current += 1;
      setResultText(cachedTranslation);
      setStatus('success');
      return;
    }

    abortControllerRef.current?.abort();
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    const requestId = ++requestIdRef.current;
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setStatus('loading');
    setResultText('');
    setSavedFeedback(false);

    // 1. Try translationService first (supports /api/translate, GTX fallback, and 2-level LocalStorage cache)
    try {
      const serviceRes = await translateSentence(query, lang, targetLang, style);
      if (requestId !== requestIdRef.current || !mountedRef.current) return;

      if (serviceRes.success && serviceRes.translation.trim()) {
        const clean = serviceRes.translation.trim();
        translationCache.set(cacheKey, clean);
        setResultText(clean);
        setStatus('success');
        return;
      }
    } catch {
      // Proceed to MyMemory / Offline dictionary fallback
    }

    // 2. Fallback to MyMemory API with timeout
    timeoutRef.current = setTimeout(() => {
      controller.abort();
    }, TRANSLATION_TIMEOUT_MS);

    try {
      const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
        query
      )}&langpair=${lang}|${targetLang}`;

      const response = await fetch(url, {
        method: 'GET',
        signal: controller.signal,
        headers: { Accept: 'application/json' },
      });

      if (!response.ok) {
        throw new Error(`HTTP_${response.status}`);
      }

      const data = await response.json();

      if (requestId !== requestIdRef.current || !mountedRef.current) {
        return;
      }

      const translated = data?.responseData?.translatedText;
      const apiStatus = Number(data?.responseStatus);

      if (
        typeof translated !== 'string' ||
        !translated.trim() ||
        (Number.isFinite(apiStatus) && apiStatus >= 400)
      ) {
        throw new Error('INVALID_TRANSLATION');
      }

      const cleanTranslation = translated.trim();
      translationCache.set(cacheKey, cleanTranslation);
      setResultText(cleanTranslation);
      setStatus('success');
    } catch (error) {
      if (requestId !== requestIdRef.current || !mountedRef.current) {
        return;
      }

      // 3. Check Offline Core Dictionary before reporting error
      const offlineEntry = OFFLINE_CORE_DICTIONARY[query.toLowerCase()];
      if (offlineEntry) {
        const fallbackWord = targetLang === 'ar' ? offlineEntry.ar : offlineEntry.en;
        translationCache.set(cacheKey, fallbackWord);
        setResultText(fallbackWord);
        setStatus('success');
        return;
      }

      setStatus('error');
      if (controller.signal.aborted) {
        setResultText(
          'انتهت مهلة الاتصال أو أُلغي الطلب. تحقق من الإنترنت ثم حاول مرة أخرى.'
        );
      } else {
        setResultText(
          'تعذرت الترجمة حاليًا. تحقق من الاتصال بالإنترنت وحاول مرة أخرى.'
        );
      }
      console.error('[FastTranslator] Translation failed:', error);
    } finally {
      if (requestId === requestIdRef.current) {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
        abortControllerRef.current = null;
      }
    }
  };

  const handleTranslate = () => {
    setVoiceError('');
    setVoiceStatusMessage('');
    void executeTranslation(sourceText, sourceLang, dialectStyle);
  };

  const stopVoiceInput = () => {
    clearListenTimer();
    listeningRef.current = false;
    setIsListening(false);
    setVoiceStatusMessage('');

    try {
      recognitionRef.current?.stop();
    } catch {
      // Ignore
    }
  };

  const toggleVoiceInput = async () => {
    if (listeningRef.current) {
      stopVoiceInput();
      return;
    }

    setVoiceError('');
    setVoiceStatusMessage('جارٍ التحقق من صلاحية الميكروفون...');

    stopSpeaking();
    setIsSpeaking(false);

    const permCheck = await checkMicrophonePermission();
    if (!permCheck.granted) {
      setVoiceStatusMessage('');
      setVoiceError(
        permCheck.errorArabic || 'تعذر الحصول على صلاحية الميكروفون.'
      );
      return;
    }

    const SpeechRecognitionAPI =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognitionAPI) {
      setVoiceStatusMessage('');
      setVoiceError(
        'التعرف على الصوت غير مدعوم في هذا المتصفح. يمكنك كتابة النص مباشرة أو استخدام متصفح Chrome.'
      );
      return;
    }

    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch {
        // Ignore
      }
      recognitionRef.current = null;
    }

    const languageAtStart = sourceLang;
    const instance = new SpeechRecognitionAPI();

    instance.lang = languageAtStart === 'en' ? 'en-US' : 'ar-EG';
    instance.interimResults = false;
    instance.maxAlternatives = 1;

    instance.onstart = () => {
      if (!mountedRef.current) return;
      listeningRef.current = true;
      setIsListening(true);
      setVoiceError('');
      setVoiceStatusMessage('🎙️ جاري الاستماع... تحدث الآن بوضوح.');

      clearListenTimer();
      listenTimeoutRef.current = setTimeout(() => {
        if (listeningRef.current && mountedRef.current) {
          try {
            instance.stop();
          } catch {
            // Ignore
          }
          listeningRef.current = false;
          setIsListening(false);
          setVoiceStatusMessage('');
          setVoiceError('انتهت مهلة الاستماع دون التقاط صوت واضح. حاول مرة أخرى.');
        }
      }, VOICE_LISTEN_TIMEOUT_MS);
    };

    instance.onresult = (event: any) => {
      if (!mountedRef.current) return;
      clearListenTimer();

      const spokenText = event.results?.[0]?.[0]?.transcript?.trim();
      listeningRef.current = false;
      setIsListening(false);

      if (!spokenText) {
        setVoiceStatusMessage('');
        setVoiceError('لم يتم التقاط كلام واضح. حاول التحدث مرة أخرى.');
        return;
      }

      setSourceText(spokenText);
      setVoiceError('');
      setVoiceStatusMessage('✅ تم التقاط الصوت وجارٍ الترجمة الفورية...');
      void executeTranslation(spokenText, languageAtStart, dialectStyle);
    };

    instance.onerror = (event: any) => {
      if (!mountedRef.current) return;
      clearListenTimer();

      listeningRef.current = false;
      setIsListening(false);
      setVoiceStatusMessage('');

      if (event.error === 'aborted') return;

      setVoiceError(getSpeechErrorMessage(event.error));
    };

    instance.onend = () => {
      if (!mountedRef.current) return;
      clearListenTimer();
      listeningRef.current = false;
      setIsListening(false);
    };

    recognitionRef.current = instance;
    listeningRef.current = true;
    setIsListening(true);

    try {
      instance.start();
    } catch {
      clearListenTimer();
      listeningRef.current = false;
      setIsListening(false);
      setVoiceStatusMessage('');
      recognitionRef.current = null;
      setVoiceError(
        'تعذر بدء التسجيل. تأكد من السماح بالميكروفون ثم حاول مرة أخرى.'
      );
    }
  };

  const handleSpeak = (textToSpeak: string, lang: Language) => {
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
      return;
    }

    speakText(textToSpeak, lang, {
      onStart: () => {
        if (mountedRef.current) setIsSpeaking(true);
      },
      onEnd: () => {
        if (mountedRef.current) setIsSpeaking(false);
      },
      onError: (err) => {
        if (mountedRef.current) {
          setIsSpeaking(false);
          setVoiceError(err);
        }
      },
    });
  };

  const handleSwitchLanguage = () => {
    if (listeningRef.current) {
      try {
        recognitionRef.current?.abort();
      } catch {
        // Ignore
      }
      clearListenTimer();
      listeningRef.current = false;
      setIsListening(false);
    }

    abortControllerRef.current?.abort();
    requestIdRef.current += 1;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    const newLang: Language = sourceLang === 'en' ? 'ar' : 'en';
    const nextText = status === 'success' ? resultText : sourceText;

    setSourceLang(newLang);
    setSourceText(nextText);
    setResultText('');
    setStatus('idle');
    setVoiceError('');
    setVoiceStatusMessage('');
  };

  const handleClear = () => {
    abortControllerRef.current?.abort();
    requestIdRef.current += 1;
    clearListenTimer();

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (listeningRef.current) {
      try {
        recognitionRef.current?.abort();
      } catch {
        // Ignore
      }
    }

    listeningRef.current = false;
    setIsListening(false);
    setSourceText('');
    setResultText('');
    setStatus('idle');
    setVoiceError('');
    setVoiceStatusMessage('');
    setIsSpeaking(false);
    setSavedFeedback(false);
    stopSpeaking();
  };

  const handleCopyResult = async () => {
    if (!resultText.trim()) return;
    try {
      await navigator.clipboard.writeText(resultText.trim());
      setCopied(true);
      setTimeout(() => {
        if (mountedRef.current) setCopied(false);
      }, 2000);
    } catch {
      // Fallback ignored
    }
  };

  const handleSaveWord = () => {
    if (status !== 'success' || !sourceText.trim() || !resultText.trim()) {
      return;
    }

    if (sourceLang === 'en') {
      onSaveWord(sourceText.trim(), resultText.trim());
    } else {
      onSaveWord(resultText.trim(), sourceText.trim());
    }
    setSavedFeedback(true);
  };

  return (
    <div
      className="bg-white p-4 sm:p-5 rounded-3xl border border-[#E2E8F0] shadow-sm space-y-3.5 text-[#0F172A]"
      dir="rtl"
    >
      {/* Header & Language / Dialect Controls */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-base font-black text-[#0F172A]">
          المترجم الفوري السريع
        </h2>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={handleSwitchLanguage}
            className="text-xs bg-blue-50 hover:bg-blue-100 text-[#1E3A8A] border border-blue-200 px-3 py-1.5 rounded-full font-black flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <span>
              {sourceLang === 'en' ? 'الإنجليزية ➔ العربية' : 'العربية ➔ الإنجليزية'}
            </span>
            <ArrowLeftRight className="w-3.5 h-3.5" />
          </button>

          <select
            value={dialectStyle}
            onChange={(e) => setDialectStyle(e.target.value as TranslationStyle)}
            aria-label="نمط الترجمة"
            className="text-[11px] bg-slate-50 border border-[#E2E8F0] text-[#64748B] font-bold rounded-full px-2.5 py-1.5 focus:outline-none cursor-pointer"
          >
            <option value="msa">فصحى (MSA)</option>
            <option value="egyptian">عامية مصرية</option>
          </select>
        </div>
      </div>

      {/* Text Input Box (Matches Screen 4 Mockup) */}
      <div className="relative">
        <textarea
          value={sourceText}
          onChange={(event) => {
            setSourceText(event.target.value);
            setVoiceError('');
            setVoiceStatusMessage('');
            setSavedFeedback(false);

            if (status !== 'idle') {
              setStatus('idle');
              setResultText('');
            }
          }}
          placeholder={
            sourceLang === 'en'
              ? 'أدخل الكلمة أو الجملة بالإنجليزية...'
              : 'أدخل الكلمة أو الجملة بالعربية...'
          }
          aria-label={sourceLang === 'en' ? 'English input' : 'Arabic input'}
          dir={sourceLang === 'ar' ? 'rtl' : 'ltr'}
          className="w-full h-24 p-3.5 bg-slate-50 border border-[#E2E8F0] rounded-2xl text-[#0F172A] text-sm font-semibold placeholder-[#64748B]/70 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] focus:bg-white resize-none transition-all"
        />

        {sourceText.trim() && (
          <button
            type="button"
            onClick={() => handleSpeak(sourceText, sourceLang)}
            className="absolute bottom-3 left-3 p-2 rounded-xl bg-white border border-slate-200 text-[#1E3A8A] hover:bg-blue-50 shadow-2xs cursor-pointer"
            title="استمع للنص الأصلي"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Primary Action Row: Royal Blue Translate Button + Red Circular Mic Button (Matches Screen 4 Mockup) */}
      <div className="flex items-center gap-2.5">
        <button
          type="button"
          onClick={handleTranslate}
          disabled={status === 'loading' || !sourceText.trim()}
          className="flex-1 min-h-[46px] bg-gradient-to-r from-[#1E3A8A] to-[#0F2856] hover:from-[#172E6E] hover:to-[#0A1D40] disabled:opacity-50 text-white font-black py-2.5 px-4 rounded-2xl text-sm transition-all shadow-sm cursor-pointer"
        >
          {status === 'loading' ? 'جارٍ الترجمة...' : 'ترجم الآن'}
        </button>

        {/* Red Circular Microphone Button (Matches Screen 4 Mockup) */}
        <button
          type="button"
          onClick={toggleVoiceInput}
          aria-label={isListening ? 'إيقاف التسجيل' : 'بدء التسجيل الصوتي'}
          aria-pressed={isListening}
          title={isListening ? 'إيقاف التسجيل' : 'الترجمة بالصوت'}
          className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-all cursor-pointer shadow-md ${
            isListening
              ? 'bg-red-600 text-white animate-pulse ring-4 ring-red-500/30'
              : 'bg-red-500 hover:bg-red-600 text-white'
          }`}
        >
          {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
        </button>

        {sourceText.trim() && (
          <button
            type="button"
            onClick={handleClear}
            title="مسح النص"
            className="w-12 h-12 rounded-2xl bg-slate-100 hover:bg-slate-200 text-[#64748B] flex items-center justify-center shrink-0 cursor-pointer transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Voice Status & Error Alerts */}
      {voiceStatusMessage && (
        <p
          role="status"
          className="text-xs text-[#1E3A8A] bg-blue-50 border border-blue-200 px-3 py-2 rounded-xl font-bold"
        >
          {voiceStatusMessage}
        </p>
      )}

      {voiceError && (
        <div
          role="alert"
          className="p-3 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold"
        >
          {voiceError}
        </div>
      )}

      {/* Translation Output Card */}
      {resultText && (
        <div
          aria-live="polite"
          className={`p-4 rounded-2xl border space-y-2.5 ${
            status === 'error'
              ? 'bg-red-50 border-red-200 text-red-900'
              : 'bg-slate-50 border-blue-200 text-[#0F172A]'
          }`}
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="font-black text-xs text-[#1E3A8A]">
              {status === 'error' ? 'تنبيه:' : 'الترجمة الناتجة:'}
            </span>

            {status === 'success' && (
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() =>
                    handleSpeak(resultText, sourceLang === 'en' ? 'ar' : 'en')
                  }
                  className="text-xs bg-white border border-slate-200 px-2.5 py-1.5 rounded-xl text-[#1E3A8A] hover:bg-blue-50 cursor-pointer flex items-center gap-1 font-bold shadow-2xs"
                  title="استمع للترجمة"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>{isSpeaking ? 'جارٍ النطق...' : 'استماع'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopyResult}
                  className="text-xs bg-white border border-slate-200 px-2.5 py-1.5 rounded-xl text-[#64748B] hover:text-[#0F172A] cursor-pointer flex items-center gap-1 font-bold shadow-2xs"
                  title="نسخ الترجمة"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">تم النسخ</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>نسخ</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleSaveWord}
                  className={`text-xs px-2.5 py-1.5 rounded-xl font-black flex items-center gap-1 cursor-pointer border transition-all ${
                    savedFeedback
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-amber-50 hover:bg-amber-100 text-[#D97706] border-amber-200'
                  }`}
                >
                  {savedFeedback ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>تم الحفظ</span>
                    </>
                  ) : (
                    <>
                      <Bookmark className="w-3.5 h-3.5" />
                      <span>+ بنك الكلمات</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          <div
            dir={sourceLang === 'en' ? 'rtl' : 'ltr'}
            className="whitespace-pre-wrap break-words font-black text-base text-[#0F172A] bg-white p-3 rounded-xl border border-slate-200/80"
          >
            {resultText}
          </div>

          {status === 'error' && (
            <button
              type="button"
              onClick={handleTranslate}
              disabled={!sourceText.trim()}
              className="text-xs font-black text-[#1E3A8A] underline cursor-pointer disabled:opacity-50"
            >
              إعادة المحاولة
            </button>
          )}
        </div>
      )}
    </div>
  );
};
