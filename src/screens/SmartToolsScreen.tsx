import React, { useState, useEffect, useRef } from 'react';
import {
  Languages,
  Mic,
  Volume2,
  Bookmark,
  Search,
  Trash2,
  Wrench,
  Plus,
  RotateCcw,
  Keyboard,
} from 'lucide-react';
import { FastTranslator } from '../components/FastTranslator.tsx';
import {
  speakText,
  stopSpeaking,
  checkMicrophonePermission,
  comparePronunciation,
  PronunciationResult,
} from '../utils/speechService.ts';
import {
  loadWordBank,
  saveWordToBank,
  removeWordFromBank,
  awardProtectedXP,
  SavedWordItem,
} from '../services/learningStore.ts';

type PronunciationTrainerState =
  | 'idle'
  | 'requesting_permission'
  | 'listening'
  | 'processing'
  | 'result'
  | 'permission_denied'
  | 'unsupported'
  | 'no_speech'
  | 'network_error'
  | 'timeout'
  | 'cancelled';

const PRONUNCIATION_LISTEN_TIMEOUT_MS = 8000;

const PRACTICE_SENTENCES = [
  { id: '1', level: 'ابتدائي', text: 'I love learning English every day.' },
  { id: '2', level: 'إعدادي', text: 'Practice makes perfect in language skills.' },
  { id: '3', level: 'ثانوي', text: 'Continuous education builds a bright future.' },
  { id: '4', level: 'متنوع', text: 'The Nile is the longest river in the world.' },
];

const DEFAULT_WAVE_BARS = [
  14, 22, 34, 18, 42, 28, 16, 36, 46, 26, 18, 38, 30, 44, 24, 16, 28, 14,
];

interface SmartToolsScreenProps {
  onStateUpdated?: () => void;
}

export const SmartToolsScreen: React.FC<SmartToolsScreenProps> = ({
  onStateUpdated,
}) => {
  const [activeFilterTab, setActiveFilterTab] = useState<
    'all' | 'translator' | 'speech' | 'wordbank'
  >('all');

  // Word Bank state synced with centralized learningStore
  const [wordBank, setWordBank] = useState<SavedWordItem[]>(() => loadWordBank());
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [newWordEn, setNewWordEn] = useState<string>('');
  const [newWordAr, setNewWordAr] = useState<string>('');
  const [showAddWordForm, setShowAddWordForm] = useState<boolean>(false);

  // Pronunciation Trainer explicit state machine
  const [selectedTargetIndex, setSelectedTargetIndex] = useState<number>(0);
  const [customTargetSentence, setCustomTargetSentence] = useState<string>('');
  const [trainerState, setTrainerState] =
    useState<PronunciationTrainerState>('idle');
  const [spokenText, setSpokenText] = useState<string>('');
  const [manualAttemptText, setManualAttemptText] = useState<string>('');
  const [showManualFallback, setShowManualFallback] = useState<boolean>(false);
  const [pronunciationResult, setPronunciationResult] =
    useState<PronunciationResult | null>(null);
  const [voiceError, setVoiceError] = useState<string>('');
  const [isPlayingTargetTTS, setIsPlayingTargetTTS] = useState<boolean>(false);
  const [waveBars, setWaveBars] = useState<number[]>(DEFAULT_WAVE_BARS);

  const recognitionRef = useRef<any>(null);
  const listenTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const audioStreamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const mountedRef = useRef<boolean>(true);

  const activeTargetSentence =
    customTargetSentence.trim() || PRACTICE_SENTENCES[selectedTargetIndex].text;

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      cleanupAudioAndRecognition();
      stopSpeaking();
    };
  }, []);

  const stopWaveformMeter = () => {
    if (animFrameRef.current !== null) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    if (audioStreamRef.current) {
      audioStreamRef.current.getTracks().forEach((t) => t.stop());
      audioStreamRef.current = null;
    }
    if (audioContextRef.current) {
      try {
        void audioContextRef.current.close();
      } catch {
        // Ignore
      }
      audioContextRef.current = null;
    }
    if (mountedRef.current) {
      setWaveBars(DEFAULT_WAVE_BARS);
    }
  };

  const startLiveWaveformMeter = async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        return;
      }
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (!mountedRef.current) {
        stream.getTracks().forEach((t) => t.stop());
        return;
      }
      audioStreamRef.current = stream;

      const AudioCtx =
        window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;

      const ctx: AudioContext = new AudioCtx();
      audioContextRef.current = ctx;
      const source = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 64;
      source.connect(analyser);

      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      const updateBars = () => {
        if (!mountedRef.current || !audioContextRef.current) return;
        analyser.getByteFrequencyData(dataArray);
        const nextBars = DEFAULT_WAVE_BARS.map((_, i) => {
          const val = dataArray[i % dataArray.length] || 0;
          return Math.max(10, Math.min(48, Math.round((val / 255) * 44) + 10));
        });
        setWaveBars(nextBars);
        animFrameRef.current = requestAnimationFrame(updateBars);
      };
      animFrameRef.current = requestAnimationFrame(updateBars);
    } catch {
      // Ignore meter error; SpeechRecognition handles permission state
    }
  };

  const cleanupAudioAndRecognition = () => {
    if (listenTimerRef.current) {
      clearTimeout(listenTimerRef.current);
      listenTimerRef.current = null;
    }
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
    stopWaveformMeter();
  };

  const handleSaveWord = (en: string, ar: string) => {
    const updated = saveWordToBank(en, ar);
    setWordBank(updated);
    onStateUpdated?.();
  };

  const handleRemoveWord = (id: string) => {
    const updated = removeWordFromBank(id);
    setWordBank(updated);
    onStateUpdated?.();
  };

  const handleManualWordAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWordEn.trim() || !newWordAr.trim()) return;
    handleSaveWord(newWordEn.trim(), newWordAr.trim());
    setNewWordEn('');
    setNewWordAr('');
    setShowAddWordForm(false);
  };

  const evaluateRecognizedTranscript = (transcript: string) => {
    setTrainerState('processing');
    setSpokenText(transcript);
    const evalResult = comparePronunciation(activeTargetSentence, transcript);
    setPronunciationResult(evalResult);
    setTrainerState('result');

    if (evalResult.scorePercent >= 70) {
      const todayKey = new Date().toISOString().split('T')[0];
      awardProtectedXP(
        `pronunciation_${todayKey}_${activeTargetSentence.slice(0, 16)}`,
        15,
        true
      );
      onStateUpdated?.();
    }
  };

  const toggleSpeechRecognition = async () => {
    if (
      trainerState === 'listening' ||
      trainerState === 'requesting_permission'
    ) {
      cleanupAudioAndRecognition();
      setTrainerState('cancelled');
      setVoiceError('تم إيقاف التسجيل الصوتي.');
      return;
    }

    setVoiceError('');
    setPronunciationResult(null);
    setSpokenText('');
    setTrainerState('requesting_permission');

    stopSpeaking();
    setIsPlayingTargetTTS(false);

    const permCheck = await checkMicrophonePermission();
    if (!permCheck.granted) {
      setTrainerState('permission_denied');
      setVoiceError(
        permCheck.errorArabic || 'تعذر الوصول إلى الميكروفون. تحقق من الصلاحيات.'
      );
      setShowManualFallback(true);
      return;
    }

    const SpeechRecognitionAPI =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognitionAPI) {
      setTrainerState('unsupported');
      setVoiceError(
        'متصفحك الحالي لا يدعم التعرف المباشر على الصوت. يمكنك استخدام وضع التجربة الكتابية بالأسفل أو فتح التطبيق في متصفح Chrome.'
      );
      setShowManualFallback(true);
      return;
    }

    cleanupAudioAndRecognition();

    const instance = new SpeechRecognitionAPI();
    instance.lang = 'en-US';
    instance.interimResults = false;
    instance.maxAlternatives = 1;

    instance.onstart = () => {
      if (!mountedRef.current) return;
      setTrainerState('listening');
      setVoiceError('');
      void startLiveWaveformMeter();

      listenTimerRef.current = setTimeout(() => {
        if (mountedRef.current) {
          cleanupAudioAndRecognition();
          setTrainerState('timeout');
          setVoiceError(
            'انتهت مهلة الاستماع (8 ثوانٍ) دون التقاط جملة واضحة. اضغط تسجيل وحاول مرة أخرى.'
          );
        }
      }, PRONUNCIATION_LISTEN_TIMEOUT_MS);
    };

    instance.onresult = (event: any) => {
      if (!mountedRef.current) return;
      cleanupAudioAndRecognition();

      const recognized = event.results?.[0]?.[0]?.transcript?.trim();
      if (!recognized) {
        setTrainerState('no_speech');
        setVoiceError(
          'لم نلتقط كلاماً واضحاً. حاول التحدث مرة أخرى بصوت واضح.'
        );
        return;
      }

      setVoiceError('');
      evaluateRecognizedTranscript(recognized);
    };

    instance.onerror = (event: any) => {
      if (!mountedRef.current) return;
      cleanupAudioAndRecognition();

      if (event.error === 'aborted') {
        setTrainerState('cancelled');
        return;
      }

      if (event.error === 'no-speech') {
        setTrainerState('no_speech');
        setVoiceError('لم يتم التقاط صوت. اضغط على زر التسجيل ثم انطق الجملة بوضوح.');
      } else if (
        event.error === 'not-allowed' ||
        event.error === 'service-not-allowed'
      ) {
        setTrainerState('permission_denied');
        setVoiceError(
          'تم رفض صلاحية الميكروفون. يرجى السماح بالميكروفون من إعدادات المتصفح.'
        );
        setShowManualFallback(true);
      } else if (event.error === 'network') {
        setTrainerState('network_error');
        setVoiceError(
          'تعذر الاتصال بخدمة التعرف على الصوت. تحقق من الإنترنت أو استخدم وضع الإدخال اليدوي.'
        );
        setShowManualFallback(true);
      } else {
        setTrainerState('no_speech');
        setVoiceError('تعذر التعرف على النطق. حاول مرة أخرى بصوت واضح.');
      }
    };

    instance.onend = () => {
      if (!mountedRef.current) return;
      stopWaveformMeter();
      if (listenTimerRef.current) {
        clearTimeout(listenTimerRef.current);
        listenTimerRef.current = null;
      }
      setTrainerState((prev) =>
        prev === 'listening' || prev === 'requesting_permission'
          ? 'no_speech'
          : prev
      );
    };

    recognitionRef.current = instance;
    setTrainerState('listening');

    try {
      instance.start();
    } catch {
      cleanupAudioAndRecognition();
      setTrainerState('permission_denied');
      setVoiceError('تعذر بدء الميكروفون. تأكد من إعطاء الصلاحية في المتصفح.');
      setShowManualFallback(true);
    }
  };

  const handleResetTrainer = () => {
    cleanupAudioAndRecognition();
    stopSpeaking();
    setIsPlayingTargetTTS(false);
    setTrainerState('idle');
    setSpokenText('');
    setPronunciationResult(null);
    setVoiceError('');
  };

  const handlePlayTargetTTS = () => {
    if (isPlayingTargetTTS) {
      stopSpeaking();
      setIsPlayingTargetTTS(false);
      return;
    }

    speakText(activeTargetSentence, 'en', {
      onStart: () => {
        if (mountedRef.current) setIsPlayingTargetTTS(true);
      },
      onEnd: () => {
        if (mountedRef.current) setIsPlayingTargetTTS(false);
      },
      onError: (err) => {
        if (mountedRef.current) {
          setIsPlayingTargetTTS(false);
          setVoiceError(err);
        }
      },
    });
  };

  const filteredWordBank = wordBank.filter(
    (w) =>
      w.english.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.arabic.includes(searchQuery)
  );

  // Compute word-by-word highlight comparison when a result is present
  const targetWords = activeTargetSentence.trim().split(/\s+/);
  const recognizedNormalizedWords = new Set(
    spokenText
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(Boolean)
  );

  return (
    <div
      className="space-y-4 pb-24 pt-3 px-3 sm:px-4 max-w-lg mx-auto text-[#0F172A]"
      dir="rtl"
    >
      {/* Screen Header & Filter Pills */}
      <div className="bg-white rounded-3xl p-4 border border-[#E2E8F0] shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-2xl bg-blue-50 text-[#1E3A8A] flex items-center justify-center">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-black text-[#0F172A]">
                الأدوات الذكية والمساعد
              </h1>
              <p className="text-[11px] text-[#64748B] font-semibold">
                المترجم الفوري · درب صوتك · بنك كلماتي
              </p>
            </div>
          </div>
        </div>

        {/* Sub-Filter Pills */}
        <div className="grid grid-cols-4 gap-1.5 bg-slate-100 p-1 rounded-2xl">
          {[
            { id: 'all' as const, label: 'الكل' },
            { id: 'translator' as const, label: 'المترجم' },
            { id: 'speech' as const, label: 'درب صوتك' },
            { id: 'wordbank' as const, label: `كلماتي (${wordBank.length})` },
          ].map((tab) => (
            <button
              key={`smart_tools_filter_${tab.id}`}
              type="button"
              onClick={() => setActiveFilterTab(tab.id)}
              className={`py-2 px-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                activeFilterTab === tab.id
                  ? 'bg-[#1E3A8A] text-white shadow-xs'
                  : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 1. FAST TRANSLATOR CARD (المترجم الفوري السريع — Matches Screen 4 Mockup Top Card) */}
      {(activeFilterTab === 'all' || activeFilterTab === 'translator') && (
        <FastTranslator
          onSaveWord={(word, translation) => handleSaveWord(word, translation)}
        />
      )}

      {/* 2. PRONUNCIATION TRAINER CARD (درب صوتك — Matches Screen 4 Mockup Middle Card) */}
      {(activeFilterTab === 'all' || activeFilterTab === 'speech') && (
        <div className="bg-white rounded-3xl border border-[#E2E8F0] p-4 sm:p-5 shadow-sm space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Mic className="w-5 h-5 text-[#1E3A8A]" />
              <h2 className="text-base font-black text-[#0F172A]">درب صوتك</h2>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setShowManualFallback((prev) => !prev)}
                className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#64748B] text-xs font-bold flex items-center gap-1 cursor-pointer"
                title="التبديل إلى وضع الإدخال الكتابي"
              >
                <Keyboard className="w-3.5 h-3.5" />
                <span className="text-[10px]">إدخال يدوي</span>
              </button>

              {trainerState !== 'idle' && (
                <button
                  type="button"
                  onClick={handleResetTrainer}
                  className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#64748B] cursor-pointer"
                  title="إعادة ضبط"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Sentence Selector Pills */}
          <div className="space-y-2">
            <div className="flex gap-1.5 overflow-x-auto pb-1">
              {PRACTICE_SENTENCES.map((p, idx) => (
                <button
                  key={`ps_pill_${p.id}`}
                  type="button"
                  onClick={() => {
                    setSelectedTargetIndex(idx);
                    setCustomTargetSentence('');
                    handleResetTrainer();
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black whitespace-nowrap border cursor-pointer transition-all ${
                    selectedTargetIndex === idx && !customTargetSentence
                      ? 'bg-[#1E3A8A] text-white border-[#1E3A8A]'
                      : 'bg-slate-50 text-[#64748B] border-[#E2E8F0] hover:text-[#0F172A]'
                  }`}
                >
                  {p.level} {idx + 1}
                </button>
              ))}
            </div>

            <input
              type="text"
              value={customTargetSentence}
              onChange={(e) => {
                setCustomTargetSentence(e.target.value);
                setPronunciationResult(null);
              }}
              placeholder="أو اكتب جملة إنجليزية مخصصة للتدرب على نطقها..."
              dir="ltr"
              className="w-full px-3.5 py-2 rounded-xl bg-slate-50 border border-[#E2E8F0] text-[#0F172A] text-xs font-semibold placeholder-[#64748B]/70 focus:outline-none focus:border-[#1E3A8A]"
            />
          </div>

          {/* Target Phrase & Native Audio Button */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-[#E2E8F0] flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handlePlayTargetTTS}
              className="px-3 py-2 rounded-xl bg-white hover:bg-blue-50 text-[#1E3A8A] border border-slate-200 text-xs font-black flex items-center gap-1.5 shrink-0 shadow-2xs cursor-pointer"
            >
              <Volume2 className="w-4 h-4 text-[#F59E0B]" />
              <span>{isPlayingTargetTTS ? 'جارٍ النطق...' : 'استمع'}</span>
            </button>

            <p
              className="text-sm sm:text-base font-black text-[#0F172A] text-left flex-1"
              dir="ltr"
            >
              "{activeTargetSentence}"
            </p>
          </div>

          {/* Orange & Royal Blue Waveform Visualization (Matches Screen 4 Mockup) */}
          <div className="py-1 flex items-center justify-center gap-1.5 h-14">
            {waveBars.map((heightPx, i) => {
              const isOrangeSide = i < waveBars.length / 2;
              return (
                <div
                  key={`pron_wave_bar_${i}`}
                  className={`w-1.5 rounded-full transition-all duration-150 ${
                    isOrangeSide ? 'bg-[#F59E0B]' : 'bg-[#1E3A8A]'
                  } ${
                    trainerState === 'listening' ? 'opacity-100' : 'opacity-75'
                  }`}
                  style={{
                    height: `${
                      trainerState === 'listening' ? heightPx : DEFAULT_WAVE_BARS[i]
                    }px`,
                  }}
                />
              );
            })}
          </div>

          {/* Red Pill "تسجيل" Button (Matches Screen 4 Mockup) */}
          <div className="text-center space-y-1.5">
            <button
              type="button"
              onClick={toggleSpeechRecognition}
              className={`min-w-[140px] min-h-[44px] px-8 py-2.5 rounded-full font-black text-sm text-white shadow-md transition-all cursor-pointer inline-flex items-center justify-center gap-2 ${
                trainerState === 'listening'
                  ? 'bg-red-600 animate-pulse ring-4 ring-red-500/30'
                  : 'bg-red-500 hover:bg-red-600 active:scale-95'
              }`}
            >
              <Mic className="w-4 h-4" />
              <span>
                {trainerState === 'requesting_permission'
                  ? 'جارٍ طلب الميكروفون...'
                  : trainerState === 'listening'
                  ? 'إيقاف التسجيل'
                  : 'تسجيل'}
              </span>
            </button>

            <p className="text-[11px] font-bold text-[#64748B]">
              {trainerState === 'listening'
                ? '🎙️ انطق الجملة الإنجليزية الآن بوضوح...'
                : 'اضغط "تسجيل" ثم انطق الجملة لتقييم نطقك فورا'}
            </p>
          </div>

          {/* Error / Status Alert */}
          {voiceError && (
            <div className="p-3 rounded-2xl bg-amber-50 border border-amber-300 text-amber-900 text-xs font-bold text-center">
              {voiceError}
            </div>
          )}

          {/* Manual Fallback Input (when speech recognition is unavailable or user toggles it) */}
          {showManualFallback && (
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <label className="text-xs font-black text-[#1E3A8A] block">
                تجربة التقييم كتابياً (وضع عدم توفر الميكروفون):
              </label>
              <div className="flex gap-2" dir="ltr">
                <input
                  type="text"
                  value={manualAttemptText}
                  onChange={(e) => setManualAttemptText(e.target.value)}
                  placeholder="Type the sentence as you pronounced it..."
                  className="flex-1 px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-[#0F172A] focus:outline-none focus:border-[#1E3A8A]"
                />
                <button
                  type="button"
                  disabled={!manualAttemptText.trim()}
                  onClick={() =>
                    evaluateRecognizedTranscript(manualAttemptText.trim())
                  }
                  className="px-4 py-2 rounded-xl bg-[#1E3A8A] disabled:opacity-40 text-white text-xs font-black cursor-pointer"
                >
                  تقييم
                </button>
              </div>
            </div>
          )}

          {/* Pronunciation Evaluation Result */}
          {trainerState === 'result' && pronunciationResult && (
            <div className="p-4 rounded-2xl bg-slate-50 border border-blue-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-[#0F172A]">
                  نتيجة تقييم النطق:
                </span>
                <span
                  className={`text-sm font-black px-3 py-1 rounded-full border ${
                    pronunciationResult.scorePercent >= 80
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                      : pronunciationResult.scorePercent >= 60
                      ? 'bg-amber-100 text-amber-900 border-amber-300'
                      : 'bg-red-100 text-red-800 border-red-300'
                  }`}
                >
                  {pronunciationResult.scorePercent}% تطابق
                </span>
              </div>

              {/* Word-by-Word Matched vs Missed Breakdown */}
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-[#64748B] block">
                  تحليل الكلمات (الأخضر = نُطقت بوضوح):
                </span>
                <div
                  className="flex flex-wrap gap-1.5 p-2.5 rounded-xl bg-white border border-slate-200"
                  dir="ltr"
                >
                  {targetWords.map((w, wIdx) => {
                    const cleanW = w.toLowerCase().replace(/[^\w]/g, '');
                    const matched = recognizedNormalizedWords.has(cleanW);
                    return (
                      <span
                        key={`target_word_eval_${wIdx}`}
                        className={`px-2 py-0.5 rounded-lg text-xs font-black ${
                          matched
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-900'
                        }`}
                      >
                        {w}
                      </span>
                    );
                  })}
                </div>
              </div>

              <div className="text-xs text-[#64748B]">
                <span className="font-bold">النص الملتقط: </span>
                <span className="font-black text-[#0F172A]" dir="ltr">
                  "{spokenText}"
                </span>
              </div>

              <p className="text-xs font-black text-[#1E3A8A] leading-relaxed">
                {pronunciationResult.feedbackArabic}
              </p>
            </div>
          )}
        </div>
      )}

      {/* 3. MY WORD BANK CARD (بنك كلماتي — Matches Screen 4 Mockup Bottom Card) */}
      {(activeFilterTab === 'all' || activeFilterTab === 'wordbank') && (
        <div className="bg-white rounded-3xl border border-[#E2E8F0] p-4 sm:p-5 shadow-sm space-y-3.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-[#1E3A8A]" />
              <h2 className="text-base font-black text-[#0F172A]">بنك كلماتي</h2>
              <span className="text-xs font-black text-[#D97706] bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                {wordBank.length}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setShowAddWordForm((prev) => !prev)}
              className="px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#1E3A8A] text-xs font-black flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>إضافة كلمة</span>
            </button>
          </div>

          {/* Manual Add Word Form */}
          {showAddWordForm && (
            <form
              onSubmit={handleManualWordAdd}
              className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5"
            >
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={newWordEn}
                  onChange={(e) => setNewWordEn(e.target.value)}
                  placeholder="English word..."
                  dir="ltr"
                  className="px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-[#0F172A] focus:outline-none focus:border-[#1E3A8A]"
                />
                <input
                  type="text"
                  value={newWordAr}
                  onChange={(e) => setNewWordAr(e.target.value)}
                  placeholder="المعنى بالعربية..."
                  className="px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-[#0F172A] focus:outline-none focus:border-[#1E3A8A]"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 rounded-xl bg-[#1E3A8A] text-white text-xs font-black cursor-pointer"
              >
                حفظ في بنك كلماتي
              </button>
            </form>
          )}

          {/* Search Filter (when more than 3 words) */}
          {wordBank.length > 3 && (
            <div className="relative">
              <Search className="w-4 h-4 text-[#64748B] absolute right-3 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="ابحث في كلماتك المحفوظة..."
                className="w-full pr-9 pl-3 py-2 rounded-xl bg-slate-50 border border-[#E2E8F0] text-[#0F172A] text-xs font-semibold focus:outline-none focus:border-[#1E3A8A]"
              />
            </div>
          )}

          {/* Saved Word Rows (Matches Screen 4 Mockup: friend / happy rows) */}
          <div className="space-y-2 max-h-72 overflow-y-auto">
            {filteredWordBank.length === 0 ? (
              <p className="text-center text-xs text-[#64748B] py-4 font-semibold">
                لا توجد كلمات مطابقة. احفظ كلمات من المترجم أو الدروس لتظهر هنا!
              </p>
            ) : (
              filteredWordBank.map((word) => (
                <div
                  key={`wb_row_${word.id}`}
                  className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-[#E2E8F0] hover:border-blue-200 transition-colors"
                >
                  {/* Right side in RTL: Arabic + Audio + Delete */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => speakText(word.english, 'en')}
                      className="p-2 rounded-xl bg-white border border-slate-200 text-[#1E3A8A] hover:bg-blue-50 cursor-pointer shadow-2xs"
                      title="استمع لنطق الكلمة"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                    <div>
                      <span className="text-xs font-black text-[#0F172A] block">
                        {word.arabic}
                      </span>
                      <span className="text-[10px] text-[#64748B]">
                        {word.dateAdded}
                      </span>
                    </div>
                  </div>

                  {/* Left side in RTL: English Word + Bookmark/Delete Icon (Matches Mockup) */}
                  <div className="flex items-center gap-2" dir="ltr">
                    <span className="text-sm font-black text-[#0F172A]">
                      {word.english}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveWord(word.id)}
                      className="p-1.5 rounded-lg text-[#1E3A8A] hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                      title="حذف من بنك الكلمات"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
