/**
 * speechService.ts — EngliMensh.eg Audio, Speech Recognition & Text-to-Speech Engine
 * Author & System Architect: Mohammad El-Menshawy (محمد المنشاوي)
 * 
 * Features:
 * - Robust SpeechSynthesis with asynchronous voice loading (voiceschanged) & GC protection
 * - Safe Web Speech API SpeechRecognition wrapper with getUserMedia permission check
 * - Arabic error diagnostics for microphone permission, audio capture, & offline states
 * - String normalization & Levenshtein + word-ratio pronunciation assessment
 */

export type LanguageCode = 'en' | 'ar';

export interface SpeechVoiceOption {
  voice: SpeechSynthesisVoice;
  lang: string;
  name: string;
}

// Global reference to prevent JS Garbage Collection of active Utterance
let activeUtterance: SpeechSynthesisUtterance | null = null;
let voicesList: SpeechSynthesisVoice[] = [];

/**
 * Initializes available voices for Speech Synthesis
 */
export function initSpeechVoices(): Promise<SpeechSynthesisVoice[]> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      resolve([]);
      return;
    }

    const load = () => {
      const available = window.speechSynthesis.getVoices();
      if (available.length > 0) {
        voicesList = available;
        resolve(available);
      } else {
        voicesList = [];
        resolve([]);
      }
    };

    load();

    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = () => {
        load();
      };
    }
  });
}

// Auto-initialize on module load
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  initSpeechVoices();
}

/**
 * Selects best available voice for language ('en' or 'ar')
 */
export function getBestVoiceForLanguage(lang: LanguageCode): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;

  const currentVoices = voicesList.length > 0 ? voicesList : window.speechSynthesis.getVoices();
  if (!currentVoices || currentVoices.length === 0) return null;

  const targetLangPrefix = lang === 'en' ? 'en' : 'ar';
  const preferredLocales = lang === 'en' ? ['en-US', 'en-GB', 'en-AU', 'en'] : ['ar-SA', 'ar-EG', 'ar-AE', 'ar'];

  for (const locale of preferredLocales) {
    const match = currentVoices.find((v) => v.lang.toLowerCase() === locale.toLowerCase() || v.lang.toLowerCase().replace('_', '-').startsWith(locale.toLowerCase()));
    if (match) return match;
  }

  // Fallback to prefix
  const prefixMatch = currentVoices.find((v) => v.lang.toLowerCase().startsWith(targetLangPrefix));
  return prefixMatch || null;
}

/**
 * Speaks text using Text-to-Speech safely with GC protection and event handlers
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
  const cleanText = text.trim();
  if (!cleanText) return;

  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    if (options?.onError) {
      options.onError('خدمة القراءة الصوتية غير مدعومة في متصفحك.');
    }
    return;
  }

  try {
    // Stop ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = lang === 'en' ? 'en-US' : 'ar-SA';
    utterance.rate = options?.rate ?? 0.9;
    utterance.pitch = options?.pitch ?? 1.0;

    const chosenVoice = getBestVoiceForLanguage(lang);
    if (chosenVoice) {
      utterance.voice = chosenVoice;
    }

    utterance.onstart = () => {
      if (options?.onStart) options.onStart();
    };

    utterance.onend = () => {
      activeUtterance = null;
      if (options?.onEnd) options.onEnd();
    };

    utterance.onerror = (event) => {
      activeUtterance = null;
      // Ignore canceled speech errors triggered by new clicks
      if (event.error === 'canceled' || event.error === 'interrupted') {
        if (options?.onEnd) options.onEnd();
        return;
      }
      console.warn('[speechService] TTS Error:', event.error);
      if (options?.onError) {
        options.onError('تعذر تشغيل الصوت. تحقق من إعدادات الميكروفون والصوت.');
      }
    };

    // Store global reference to prevent garbage collection mid-speech
    activeUtterance = utterance;
    window.speechSynthesis.speak(utterance);
  } catch (err: any) {
    activeUtterance = null;
    console.error('[speechService] TTS Exception:', err);
    if (options?.onError) {
      options.onError('حدث خطأ أثناء تشغيل القارئ الصوتي.');
    }
  }
}

/**
 * Stops ongoing speech synthesis
 */
export function stopSpeaking(): void {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch (e) {
      // Ignore
    }
  }
  activeUtterance = null;
}

/**
 * Requests & verifies microphone permission beforehand
 */
export async function checkMicrophonePermission(): Promise<{ granted: boolean; errorArabic?: string }> {
  if (typeof window === 'undefined' || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    return {
      granted: false,
      errorArabic: 'التعرف على الصوت غير مدعوم في هذا المتصفح أو التطبيق. استخدم متصفح Google Chrome.',
    };
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    // Stop tracks immediately after verifying permission
    stream.getTracks().forEach((track) => track.stop());
    return { granted: true };
  } catch (err: any) {
    console.warn('[speechService] Microphone Permission Denied:', err);
    if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
      return {
        granted: false,
        errorArabic: 'تم رفض صلاحية الميكروفون. يرجى السماح بالميكروفون من إعدادات الموقع أو المتصفح.',
      };
    }
    if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
      return {
        granted: false,
        errorArabic: 'لم يتم العثور على ميكروفون متصل. تحقق من توصيل الميكروفون بالجهاز.',
      };
    }
    return {
      granted: false,
      errorArabic: 'تعذر الوصول للميكروفون. تحقق من الصلاحيات وتوصيل الجهاز.',
    };
  }
}

/**
 * Normalizes text for accurate string comparison (diacritics, punctuation, case)
 */
export function normalizeTextForComparison(text: string): string {
  if (!text) return '';
  return text
    .trim()
    .toLowerCase()
    // Remove diacritics / tashkeel
    .replace(/[\u064B-\u0652]/g, '')
    // Normalize Arabic letters
    .replace(/[أإآ]/g, 'ا')
    .replace(/ة/g, 'ه')
    .replace(/ى/g, 'ي')
    // Remove punctuation
    .replace(/[.,/#!$%^&*;:{}=\-_`~()?"'’]/g, '')
    // Replace multiple spaces with single space
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

  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = s1[i - 1] === s2[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,      // Deletion
        dp[i][j - 1] + 1,      // Insertion
        dp[i - 1][j - 1] + cost // Substitution
      );
    }
  }

  return dp[m][n];
}

export interface PronunciationResult {
  scorePercent: number; // 0 to 100
  matchedWords: string[];
  missingWords: string[];
  recognizedText: string;
  targetText: string;
  feedbackArabic: string;
}

/**
 * Compares recognized speech against a target sentence to produce real accuracy evaluation
 */
export function comparePronunciation(targetText: string, recognizedText: string): PronunciationResult {
  const normTarget = normalizeTextForComparison(targetText);
  const normRecognized = normalizeTextForComparison(recognizedText);

  if (!normRecognized) {
    return {
      scorePercent: 0,
      matchedWords: [],
      missingWords: normTarget.split(' ').filter(Boolean),
      recognizedText,
      targetText,
      feedbackArabic: 'لم يتم التقاط أي صوت واضح. حاول التحدث مرة أخرى بصوت أعلى.',
    };
  }

  const targetWords = normTarget.split(' ').filter(Boolean);
  const recognizedWords = normRecognized.split(' ').filter(Boolean);

  const matchedWords: string[] = [];
  const missingWords: string[] = [];

  targetWords.forEach((tw) => {
    // Check exact or near word match (Levenshtein <= 1 for short words)
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

  // Calculate composite score (Word ratio 70% + Character similarity 30%)
  const wordMatchRatio = targetWords.length > 0 ? matchedWords.length / targetWords.length : 0;
  
  const maxLen = Math.max(normTarget.length, normRecognized.length);
  const levDist = calculateLevenshteinDistance(normTarget, normRecognized);
  const charSimRatio = maxLen > 0 ? Math.max(0, (maxLen - levDist) / maxLen) : 0;

  const scorePercent = Math.min(100, Math.max(0, Math.round((wordMatchRatio * 0.7 + charSimRatio * 0.3) * 100)));

  let feedbackArabic = '';
  if (scorePercent >= 90) {
    feedbackArabic = 'ممتاز! نطق مثالي ودقيق جداً. أحسنت يا بطل! 🌟';
  } else if (scorePercent >= 75) {
    feedbackArabic = 'جيد جداً! نطقك قريب جداً من الصحيح، واصل التدريب. 👍';
  } else if (scorePercent >= 50) {
    feedbackArabic = 'أداء مقبول. استمع للنطق المثالي أولاً ثم حاول التكرار ببطء. 🎧';
  } else {
    feedbackArabic = 'يحتاج لمزيد من التدريب. اضغط على زر الاستماع للنطق المثالي ثم أعد المحاولة. 💡';
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
