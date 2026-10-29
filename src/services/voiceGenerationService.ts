// =========================================================================
// EngliMensh.EG - Voice Generation & Audio Synthesis Service
// System Architect: Mohammad El-Menshawy (محمد المنشاوي)
// Distinct, consistent character voices for Adam and Omar routed via speechService
// =========================================================================

import { BoyCharacterId } from '../types/videoLesson.ts';
import { speakText, stopSpeaking as stopGlobalSpeaking } from '../utils/speechService.ts';

export interface SpokenLineTiming {
  speakerId: BoyCharacterId;
  textEn: string;
  textAr: string;
  estimatedDurationSeconds: number;
}

export class VoiceGenerationService {
  /**
   * Estimates duration for a line based on word count, syllables, and speech rate.
   */
  public static estimateDuration(text: string, rate: number = 0.9): number {
    const wordCount = text.trim().split(/\s+/).length;
    const baseDuration = wordCount / 2.5 / rate;
    return Math.max(1.8, Math.round((baseDuration + 0.5) * 10) / 10);
  }

  /**
   * Speaks a dialogue line using the unified speechService with specific boy persona acoustics.
   */
  public static speakCharacterLine(
    speaker: BoyCharacterId,
    text: string,
    onStart?: () => void,
    onEnd?: () => void,
    rate: number = 0.9
  ): null {
    const pitch = speaker === 'adam' ? 1.15 : 1.25;
    speakText(text, 'en', {
      rate,
      pitch,
      onStart,
      onEnd,
      onError: () => {
        if (onEnd) onEnd();
      },
    });
    return null;
  }

  /**
   * Stops any ongoing speech synthesis via unified speechService.
   */
  public static stopSpeaking(): void {
    stopGlobalSpeaking();
  }
}
