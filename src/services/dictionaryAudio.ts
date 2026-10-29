import { getDictionaryPreferences } from './dictionaryStorage';

let synth: SpeechSynthesis | null = null;
let voices: SpeechSynthesisVoice[] = [];
let activeUtterance: SpeechSynthesisUtterance | null = null;

if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  synth = window.speechSynthesis;
  const loadVoices = () => {
    voices = synth ? synth.getVoices() : [];
  };
  loadVoices();
  if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = loadVoices;
  }
}

export const isTTSSupported = (): boolean => {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
};

export const speakText = (
  text: string,
  lang: 'en' | 'ar' = 'en',
  accent: 'us' | 'uk' = 'us',
  onStart?: () => void,
  onEnd?: () => void,
  onError?: (err: any) => void
): void => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    if (onError) onError(new Error('Text-to-speech is not supported in this environment.'));
    return;
  }

  const cleanText = text.trim();
  if (!cleanText) {
    if (onError) onError(new Error('Text is empty.'));
    return;
  }

  try {
    if (!synth) {
      synth = window.speechSynthesis;
    }

    // Cancel any active speech
    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    const prefs = getDictionaryPreferences();
    utterance.rate = prefs.speechRate || 0.85;

    if (voices.length === 0 && synth) {
      voices = synth.getVoices();
    }

    if (lang === 'ar') {
      utterance.lang = 'ar-SA';
      const arabicVoice = voices.find(
        (v) => v.lang.startsWith('ar') || v.lang.includes('ar')
      );
      if (arabicVoice) utterance.voice = arabicVoice;
    } else {
      const targetLang = accent === 'uk' ? 'en-GB' : 'en-US';
      let matchedVoice = voices.find(
        (v) => v.lang === targetLang || v.lang.replace('_', '-').startsWith(targetLang)
      );
      if (!matchedVoice) {
        matchedVoice = voices.find((v) => v.lang.startsWith('en'));
      }
      if (matchedVoice) {
        utterance.voice = matchedVoice;
        utterance.lang = matchedVoice.lang;
      } else {
        utterance.lang = targetLang;
      }
    }

    utterance.onstart = () => {
      if (onStart) onStart();
    };

    utterance.onend = () => {
      activeUtterance = null;
      if (onEnd) onEnd();
    };

    utterance.onerror = (event) => {
      activeUtterance = null;
      if (event.error === 'canceled' || event.error === 'interrupted') {
        if (onEnd) onEnd();
        return;
      }
      console.warn('[dictionaryAudio] TTS playback error:', event);
      if (onEnd) onEnd();
      if (onError) onError(event);
    };

    // Store global reference to prevent garbage collection mid-speech
    activeUtterance = utterance;
    synth.speak(utterance);
  } catch (err: any) {
    activeUtterance = null;
    if (onEnd) onEnd();
    if (onError) onError(err);
  }
};

export const speakWord = (
  word: string,
  accentOrLang: 'us' | 'uk' | 'en' | 'ar' = 'us',
  onStart?: () => void,
  onEnd?: () => void,
  onError?: (err: any) => void
): void => {
  const isArabic = accentOrLang === 'ar';
  const accent = accentOrLang === 'uk' ? 'uk' : 'us';
  const lang = isArabic ? 'ar' : 'en';
  speakText(word, lang, accent, onStart, onEnd, onError);
};

export const stopSpeech = (): void => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch {
      // Ignore
    }
  }
  activeUtterance = null;
};
