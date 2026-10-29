/**
 * speechService.ts — EngliMensh.eg Audio, Speech Recognition & Text-to-Speech Engine
 * Author & System Architect: Mohammad El-Menshawy (محمد المنشاوي)
 *
 * Features:
 * - Robust SpeechSynthesis with asynchronous voice loading (voiceschanged), Egyptian Arabic preference & GC protection
 * - Capability-based Capacitor Android native TTS & SpeechRecognition bridge with safe Web Speech fallback
 * - Zero dual-microphone contention: never opens a redundant getUserMedia stream while SpeechRecognition owns the mic
 * - String normalization & Levenshtein + word-ratio pronunciation assessment
 */

import { Capacitor } from '@capacitor/core';
import { SpeechRecognition as CapSpeechRecognition } from '@capacitor-community/speech-recognition';
import { TextToSpeech as CapTextToSpeech } from '@capacitor-community/text-to-speech';

export type LanguageCode = 'en' | 'ar';

/**
 * Returns the registered Capacitor native SpeechRecognition plugin when running on a native platform.
 */
export function getNativeSpeechRecognitionPlugin(): typeof CapSpeechRecognition | null {
  try {
    if (typeof Capacitor?.isNativePlatform === 'function' && Capacitor.isNativePlatform()) {
      return CapSpeechRecognition;
    }
    if (typeof window !== 'undefined' && (window as any).Capacitor?.Plugins?.SpeechRecognition) {
      return (window as any).Capacitor.Plugins.SpeechRecognition;
    }
  } catch {
    // Ignore in non-Capacitor environments
  }
  return null;
}

/**
 * Returns the registered Capacitor native TextToSpeech plugin when running on a native platform.
 */
export function getNativeTextToSpeechPlugin(): typeof CapTextToSpeech | null {
  try {
    if (typeof Capacitor?.isNativePlatform === 'function' && Capacitor.isNativePlatform()) {
      return CapTextToSpeech;
    }
    if (typeof window !== 'undefined' && (window as any).Capacitor?.Plugins?.TextToSpeech) {
      return (window as any).Capacitor.Plugins.TextToSpeech;
    }
  } catch {
    // Ignore in non-Capacitor environments
  }
  return null;
}

export type SpeechRecognitionLifecycleState =
  | 'idle'
  | 'requesting_permission'
  | 'listening'
  | 'processing'
  | 'success'
  | 'error';

export interface SpeechVoiceOption {
  voice: SpeechSynthesisVoice;
  lang: string;
  name: string;
}

// Global reference to prevent JS Garbage Collection of active Utterance
let activeUtterance: SpeechSynthesisUtterance | null = null;
let voicesList: SpeechSynthesisVoice[] = [];
let activeSpeechSessionId = 0;

/**
 * Initializes available voices for Speech Synthesis with delayed initialization support
 */
export function initSpeechVoices(): Promise<SpeechSynthesisVoice[]> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      resolve([]);
      return;
    }

    let resolved = false;
    const finish = (list: SpeechSynthesisVoice[]) => {
      if (!resolved) {
        resolved = true;
        resolve(list);
      }
    };

    const load = () => {
      try {
        const available = window.speechSynthesis.getVoices() || [];
        if (available.length > 0) {
          voicesList = available;
          finish(available);
          return true;
        }
      } catch {
        // Ignore
      }
      return false;
    };

    if (load()) return;

    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      const prevHandler = window.speechSynthesis.onvoiceschanged;
      window.speechSynthesis.onvoiceschanged = (ev) => {
        if (typeof prevHandler === 'function') {
          try {
            prevHandler.call(window.speechSynthesis, ev);
          } catch {
            // Ignore
          }
        }
        const available = window.speechSynthesis.getVoices() || [];
        voicesList = available;
        finish(available);
      };
    }

    // Fallback timeout so initSpeechVoices never hangs if browser has 0 voices
    setTimeout(() => {
      const available = window.speechSynthesis?.getVoices?.() || [];
      voicesList = available;
      finish(available);
    }, 600);
  });
}

// Auto-initialize on module load
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  void initSpeechVoices();
}

/**
 * Selects best available voice for language ('en' or 'ar').
 * Prefers Egyptian Arabic ('ar-EG') first for Arabic, with safe fallback to 'ar-SA' or any 'ar' voice.
 */
export function getBestVoiceForLanguage(
  lang: LanguageCode,
  availableVoicesOverride?: SpeechSynthesisVoice[]
): SpeechSynthesisVoice | null {
  const currentVoices =
    availableVoicesOverride ??
    (voicesList.length > 0
      ? voicesList
      : typeof window !== 'undefined' && 'speechSynthesis' in window
      ? window.speechSynthesis.getVoices()
      : []);

  if (!currentVoices || currentVoices.length === 0) return null;

  const targetLangPrefix = lang === 'en' ? 'en' : 'ar';
  // Prefer ar-EG first for Egyptian learners, then ar-SA, then general Arabic
  const preferredLocales =
    lang === 'en'
      ? ['en-US', 'en-GB', 'en-AU', 'en']
      : ['ar-EG', 'ar-SA', 'ar-AE', 'ar'];

  for (const locale of preferredLocales) {
    const normLocale = locale.toLowerCase();
    const exactMatch = currentVoices.find(
      (v) => v.lang && v.lang.toLowerCase().replace('_', '-') === normLocale
    );
    if (exactMatch) return exactMatch;

    const prefixLocaleMatch = currentVoices.find(
      (v) =>
        v.lang &&
        v.lang.toLowerCase().replace('_', '-').startsWith(normLocale)
    );
    if (prefixLocaleMatch) return prefixLocaleMatch;
  }

  // Fallback to language prefix
  const prefixMatch = currentVoices.find(
    (v) => v.lang && v.lang.toLowerCase().startsWith(targetLangPrefix)
  );
  return prefixMatch || null;
}

/**
 * Speaks text using Text-to-Speech safely with GC protection, cancellation, and Capacitor native fallback.
 */
export function speakText(
  text: string,
  lang: LanguageCode = 'en',
  options?: {
    rate?: number;
    pitch?: number;
    onStart?: () => void;
    onEnd?: () => void;
    onError?: (errorMsg: string) => void;
  }
): void {
  const cleanText = text ? text.trim() : '';
  if (!cleanText) {
    options?.onEnd?.();
    return;
  }

  const sessionId = ++activeSpeechSessionId;
  const targetDefaultLocale = lang === 'en' ? 'en-US' : 'ar-EG';
  const rate = options?.rate ?? 0.9;
  const pitch = options?.pitch ?? 1.0;

  // Check if Capacitor native TextToSpeech plugin is available when on native Android or when Web Speech is missing
  const capTTS = getNativeTextToSpeechPlugin();

  const hasWebSpeech =
    typeof window !== 'undefined' &&
    'speechSynthesis' in window &&
    typeof SpeechSynthesisUtterance !== 'undefined';

  if (!hasWebSpeech && capTTS && typeof capTTS.speak === 'function') {
    options?.onStart?.();
    capTTS
      .stop?.()
      .catch(() => {})
      .finally(() => {
        if (sessionId !== activeSpeechSessionId) return;
        capTTS
          .speak({
            text: cleanText,
            lang: targetDefaultLocale,
            rate,
            pitch,
          })
          .then(() => {
            if (sessionId === activeSpeechSessionId) options?.onEnd?.();
          })
          .catch(() => {
            if (sessionId === activeSpeechSessionId) {
              options?.onError?.('تعذر تشغيل الصوت عبر محرك الجهاز.');
            }
          });
      });
    return;
  }

  if (!hasWebSpeech) {
    options?.onError?.('خدمة القراءة الصوتية غير مدعومة في متصفحك الحالي.');
    return;
  }

  try {
    // Cancel any ongoing speech safely before starting new utterance
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    const chosenVoice = getBestVoiceForLanguage(lang);

    if (chosenVoice) {
      utterance.voice = chosenVoice;
      utterance.lang = chosenVoice.lang || targetDefaultLocale;
    } else {
      utterance.lang = targetDefaultLocale;
    }

    utterance.rate = rate;
    utterance.pitch = pitch;

    utterance.onstart = () => {
      if (sessionId !== activeSpeechSessionId) return;
      options?.onStart?.();
    };

    utterance.onend = () => {
      if (activeUtterance === utterance) {
        activeUtterance = null;
      }
      if (sessionId !== activeSpeechSessionId) return;
      options?.onEnd?.();
    };

    utterance.onerror = (event: any) => {
      if (activeUtterance === utterance) {
        activeUtterance = null;
      }
      // Ignore canceled/interrupted events caused by stopSpeaking() or rapid re-clicks
      if (event?.error === 'canceled' || event?.error === 'interrupted') {
        if (sessionId === activeSpeechSessionId) {
          options?.onEnd?.();
        }
        return;
      }

      // If WebView speechSynthesis failed and Capacitor native TTS is available, fall back seamlessly
      if (capTTS && typeof capTTS.speak === 'function' && sessionId === activeSpeechSessionId) {
        capTTS
          .speak({ text: cleanText, lang: targetDefaultLocale, rate, pitch })
          .then(() => {
            if (sessionId === activeSpeechSessionId) options?.onEnd?.();
          })
          .catch(() => {
            if (sessionId === activeSpeechSessionId) {
              options?.onError?.('تعذر تشغيل الصوت. تحقق من إعدادات الصوت في جهازك.');
            }
          });
        return;
      }

      if (sessionId === activeSpeechSessionId) {
        options?.onError?.('تعذر تشغيل الصوت. تحقق من إعدادات الصوت في جهازك.');
      }
    };

    // Retain global reference to prevent garbage collection mid-sentence
    activeUtterance = utterance;
    window.speechSynthesis.speak(utterance);
  } catch (err) {
    activeUtterance = null;
    if (sessionId === activeSpeechSessionId) {
      options?.onError?.('حدث خطأ أثناء تشغيل القارئ الصوتي.');
    }
  }
}

/**
 * Stops ongoing speech synthesis and invalidates any pending utterance callbacks.
 */
export function stopSpeaking(): void {
  activeSpeechSessionId += 1;
  activeUtterance = null;

  if (typeof window !== 'undefined') {
    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {
        // Ignore
      }
    }
    try {
      const capTTS = getNativeTextToSpeechPlugin();
      if (capTTS && typeof capTTS.stop === 'function') {
        void capTTS.stop();
      }
    } catch {
      // Ignore
    }
  }
}

/**
 * Translates Web Speech API error codes into clear, actionable Arabic messages.
 */
export function getArabicSpeechErrorMessage(errorCode: string): string {
  switch (errorCode) {
    case 'not-allowed':
    case 'permission-denied':
    case 'service-not-allowed':
      return 'تم رفض صلاحية الميكروفون. اسمح للتطبيق باستخدام الميكروفون من إعدادات المتصفح أو الجهاز.';
    case 'audio-capture':
      return 'لم يتم العثور على ميكروفون متاح أو أن الميكروفون قيد الاستخدام من تطبيق آخر.';
    case 'no-speech':
      return 'لم نلتقط أي كلام واضح. اضغط على الميكروفون وتحدث بوضوح.';
    case 'network':
      return 'تعذر الاتصال بخدمة التعرف على الصوت. تحقق من اتصال الإنترنت وحاول مرة أخرى.';
    case 'language-not-supported':
      return 'خدمة التعرف على الصوت لا تدعم اللغة المحددة في هذا الجهاز.';
    case 'aborted':
      return 'تم إيقاف التسجيل الصوتي.';
    default:
      return 'تعذر التعرف على الكلام. تحقق من صلاحية الميكروفون وحاول مرة أخرى.';
  }
}

/**
 * Checks whether browser SpeechRecognition or Capacitor native SpeechRecognition is supported.
 * NOTE: Does NOT open a getUserMedia stream so it never contends with SpeechRecognition hardware access!
 */
export function isSpeechRecognitionSupported(): boolean {
  if (typeof window === 'undefined') return false;
  const hasWebSpeech = Boolean(
    (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
  );
  const hasCapSpeech = Boolean(getNativeSpeechRecognitionPlugin());
  return hasWebSpeech || hasCapSpeech;
}

/**
 * Non-contending permission check: uses navigator.permissions.query if available,
 * without opening a competing getUserMedia audio stream before SpeechRecognition starts.
 */
export async function checkMicrophonePermission(): Promise<{
  granted: boolean;
  errorArabic?: string;
}> {
  if (typeof window === 'undefined') {
    return {
      granted: false,
      errorArabic: 'بيئة التشغيل الحالية لا تدعم الميكروفون.',
    };
  }

  // If Capacitor native SpeechRecognition plugin is present, check/request its native permission
  const capSpeech = getNativeSpeechRecognitionPlugin();
  if (capSpeech && typeof capSpeech.requestPermissions === 'function') {
    try {
      const perm = await capSpeech.requestPermissions();
      if (perm?.speechRecognition === 'denied') {
        return {
          granted: false,
          errorArabic: getArabicSpeechErrorMessage('not-allowed'),
        };
      }
      return { granted: true };
    } catch {
      return {
        granted: false,
        errorArabic: getArabicSpeechErrorMessage('not-allowed'),
      };
    }
  }

  if (!isSpeechRecognitionSupported()) {
    return {
      granted: false,
      errorArabic:
        'التعرف على الصوت غير مدعوم في هذا المتصفح. يرجى استخدام متصفح Google Chrome.',
    };
  }

  // Query Permissions API passively without locking audio hardware via getUserMedia
  if (navigator.permissions && typeof navigator.permissions.query === 'function') {
    try {
      const status = await navigator.permissions.query({
        name: 'microphone' as PermissionName,
      });
      if (status.state === 'denied') {
        return {
          granted: false,
          errorArabic: getArabicSpeechErrorMessage('not-allowed'),
        };
      }
    } catch {
      // Permissions API may not support 'microphone' in all browsers; let SpeechRecognition.start() prompt directly
    }
  }

  return { granted: true };
}

/**
 * Normalizes text for accurate string comparison (diacritics, punctuation, case)
 */
export function normalizeTextForComparison(text: string): string {
  if (!text) return '';
  return text
    .trim()
    .toLowerCase()
    .replace(/[\u064B-\u0652]/g, '')
    .replace(/[أإآ]/g, 'ا')
    .replace(/ة/g, 'ه')
    .replace(/ى/g, 'ي')
    .replace(/[.,/#!$%^&*;:{}=\-_`~()?"'’]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Calculates Levenshtein Distance between two strings
 */
export function calculateLevenshteinDistance(str1: string, str2: string): number {
  const s1 = normalizeTextForComparison(str1);
  const s2 = normalizeTextForComparison(str2);

  const m = s1.length;
  const n = s2.length;
  if (m === 0) return n;
  if (n === 0) return m;

  const dp: number[][] = Array.from({ length: m + 1 }, () =>
    new Array(n + 1).fill(0)
  );

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost
      );
    }
  }

  return dp[m][n];
}

export interface PronunciationResult {
  scorePercent: number;
  matchedWords: string[];
  missingWords: string[];
  recognizedText: string;
  targetText: string;
  feedbackArabic: string;
}

/**
 * Compares recognized speech against a target sentence to produce accuracy evaluation
 */
export function comparePronunciation(
  targetText: string,
  recognizedText: string
): PronunciationResult {
  const normTarget = normalizeTextForComparison(targetText);
  const normRecognized = normalizeTextForComparison(recognizedText);

  if (!normRecognized) {
    return {
      scorePercent: 0,
      matchedWords: [],
      missingWords: normTarget.split(' ').filter(Boolean),
      recognizedText,
      targetText,
      feedbackArabic:
        'لم يتم التقاط أي صوت واضح. حاول التحدث مرة أخرى بصوت أعلى.',
    };
  }

  const targetWords = normTarget.split(' ').filter(Boolean);
  const recognizedWords = normRecognized.split(' ').filter(Boolean);

  const matchedWords: string[] = [];
  const missingWords: string[] = [];

  targetWords.forEach((tw) => {
    const isMatched = recognizedWords.some((rw) => {
      if (tw === rw) return true;
      if (tw.length > 3 && calculateLevenshteinDistance(tw, rw) <= 1) return true;
      return false;
    });

    if (isMatched) {
      matchedWords.push(tw);
    } else {
      missingWords.push(tw);
    }
  });

  const wordMatchRatio =
    targetWords.length > 0 ? matchedWords.length / targetWords.length : 0;

  const maxLen = Math.max(normTarget.length, normRecognized.length);
  const levDist = calculateLevenshteinDistance(normTarget, normRecognized);
  const charSimRatio =
    maxLen > 0 ? Math.max(0, (maxLen - levDist) / maxLen) : 0;

  const scorePercent = Math.min(
    100,
    Math.max(0, Math.round((wordMatchRatio * 0.7 + charSimRatio * 0.3) * 100))
  );

  let feedbackArabic = '';
  if (scorePercent >= 90) {
    feedbackArabic = 'ممتاز! نطق مثالي ودقيق جداً. أحسنت يا بطل! 🌟';
  } else if (scorePercent >= 75) {
    feedbackArabic = 'جيد جداً! نطقك قريب جداً من الصحيح، واصل التدريب. 👍';
  } else if (scorePercent >= 50) {
    feedbackArabic =
      'أداء مقبول. استمع للنطق المثالي أولاً ثم حاول التكرار ببطء. 🎧';
  } else {
    feedbackArabic =
      'يحتاج لمزيد من التدريب. اضغط على زر الاستماع للنطق المثالي ثم أعد المحاولة. 💡';
  }

  return {
    scorePercent,
    matchedWords,
    missingWords,
    recognizedText,
    targetText,
    feedbackArabic,
  };
}
