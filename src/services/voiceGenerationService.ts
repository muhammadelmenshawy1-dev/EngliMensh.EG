// =========================================================================
// EngliMensh.EG - Voice Generation & Audio Synthesis Service
// System Architect: Mohammad El-Menshawy (محمد المنشاوي)
// Distinct, consistent character voices for Adam and Omar
// =========================================================================

import { BoyCharacterId } from '../types/videoLesson.ts';

export interface SpokenLineTiming {
  speakerId: BoyCharacterId;
  textEn: string;
  textAr: string;
  estimatedDurationSeconds: number;
}

export class VoiceGenerationService {
  private static cachedAudioBlobs: Map<string, string> = new Map();

  /**
   * Estimates duration for a line based on word count, syllables, and speech rate.
   */
  public static estimateDuration(text: string, rate: number = 0.9): number {
    const wordCount = text.trim().split(/\s+/).length;
    // Base speaking rate: ~2.5 words per second at 1.0x rate
    const baseDuration = (wordCount / 2.5) / rate;
    // Add brief buffer for natural sentence pauses (0.5s)
    return Math.max(1.8, Math.round((baseDuration + 0.5) * 10) / 10);
  }

  /**
   * Speaks a dialogue line using browser Web Speech API with specific boy persona acoustics.
   */
  public static speakCharacterLine(
    speaker: BoyCharacterId,
    text: string,
    onStart?: () => void,
    onEnd?: () => void,
    rate: number = 0.9
  ): SpeechSynthesisUtterance | null {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      if (onEnd) onEnd();
      return null;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = rate;

    // Distinct character voice configurations
    if (speaker === 'adam') {
      utterance.pitch = 1.15; // Cheerful boy tone
    } else {
      utterance.pitch = 1.25; // Brisk energetic boy tone
    }

    if (onStart) utterance.onstart = onStart;
    utterance.onend = () => {
      if (onEnd) onEnd();
    };
    utterance.onerror = () => {
      if (onEnd) onEnd();
    };

    window.speechSynthesis.speak(utterance);
    return utterance;
  }

  /**
   * Stops any ongoing speech synthesis.
   */
  public static stopSpeaking(): void {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }
}
