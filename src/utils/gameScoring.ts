/**
 * gameScoring.ts — Deterministic Scoring, Combo Multiplier, and Dynamic Star Engine
 * Author & System Architect: Mohammad El-Menshawy (محمد المنشاوي)
 */

import { GameDifficulty } from '../types/gameQuestions.ts';

export interface ComboState {
  streak: number;
  multiplier: number;
  isFlameActive: boolean;
}

export interface QuestionScoreResult {
  isCorrect: boolean;
  basePoints: number;
  multiplier: number;
  comboBonus: number;
  speedBonus: number;
  totalPoints: number;
  newStreak: number;
}

export interface StarRatingResult {
  stars: 1 | 2 | 3;
  accuracyPercent: number;
  hasSpeedBonus: boolean;
  feedbackAr: string;
  feedbackEn: string;
}

/**
 * Calculates current combo multiplier based on consecutive correct answers.
 * - 0 to 1 streak: 1x
 * - 2 streak: 2x
 * - 3+ streak: 3x
 */
export function calculateComboMultiplier(consecutiveStreak: number): ComboState {
  if (consecutiveStreak >= 3) {
    return { streak: consecutiveStreak, multiplier: 3, isFlameActive: true };
  }
  if (consecutiveStreak === 2) {
    return { streak: consecutiveStreak, multiplier: 2, isFlameActive: true };
  }
  return { streak: Math.max(0, consecutiveStreak), multiplier: 1, isFlameActive: false };
}

/**
 * Calculates score for an answered question with base points, difficulty weighting,
 * combo multiplier, and speed bonuses.
 */
export function calculateQuestionScore(
  isCorrect: boolean,
  currentStreak: number,
  responseSeconds: number,
  difficulty: GameDifficulty = 'medium'
): QuestionScoreResult {
  if (!isCorrect) {
    return {
      isCorrect: false,
      basePoints: 0,
      multiplier: 1,
      comboBonus: 0,
      speedBonus: 0,
      totalPoints: 0,
      newStreak: 0,
    };
  }

  const difficultyBase = difficulty === 'easy' ? 20 : difficulty === 'medium' ? 30 : 45;
  const newStreak = currentStreak + 1;
  const combo = calculateComboMultiplier(newStreak);

  // Additional points gained from combo multiplier
  const comboBonus = difficultyBase * (combo.multiplier - 1);

  // Speed Bonus: answered quickly within 6 seconds
  const speedBonus = responseSeconds > 0 && responseSeconds <= 6 ? 10 : 0;

  const totalPoints = difficultyBase + comboBonus + speedBonus;

  return {
    isCorrect: true,
    basePoints: difficultyBase,
    multiplier: combo.multiplier,
    comboBonus,
    speedBonus,
    totalPoints,
    newStreak,
  };
}

/**
 * Deterministic Star Rating Calculation (1, 2, or 3 Stars):
 * - 3 Stars: Accuracy >= 90% and response time meets age/difficulty targets.
 * - 2 Stars: Accuracy >= 70%.
 * - 1 Star: Completed session with at least 1 correct answer.
 */
export function calculateStarRating(
  correctCount: number,
  totalQuestions: number,
  avgResponseSeconds: number = 10,
  difficulty: GameDifficulty = 'medium'
): StarRatingResult {
  if (totalQuestions <= 0) {
    return {
      stars: 1,
      accuracyPercent: 0,
      hasSpeedBonus: false,
      feedbackAr: 'بداية موفقة، واصل التدريب لتحقيق النجوم!',
      feedbackEn: 'Good start, keep practicing to earn stars!',
    };
  }

  const accuracyPercent = Math.round((correctCount / totalQuestions) * 100);

  // Target speed thresholds by difficulty (in seconds)
  const speedTarget = difficulty === 'easy' ? 12 : difficulty === 'medium' ? 10 : 8;
  const hasSpeedBonus = avgResponseSeconds > 0 && avgResponseSeconds <= speedTarget;

  if (accuracyPercent >= 90 && hasSpeedBonus) {
    return {
      stars: 3,
      accuracyPercent,
      hasSpeedBonus: true,
      feedbackAr: '🌟 أداء أسطوري استثنائي! دقة فائقة وسرعة بديهة مذهلة!',
      feedbackEn: 'Legendary performance! Supreme accuracy and lightning speed!',
    };
  }

  if (accuracyPercent >= 80) {
    return {
      stars: 3,
      accuracyPercent,
      hasSpeedBonus,
      feedbackAr: '🌟 تميز باهر! إتقان ممتاز لأسئلة المنهج والامتحان!',
      feedbackEn: 'Outstanding distinction! Excellent mastery of curriculum questions!',
    };
  }

  if (accuracyPercent >= 65) {
    return {
      stars: 2,
      accuracyPercent,
      hasSpeedBonus,
      feedbackAr: '⭐ إنجاز رائع! اقتربت من الدرجة النهائية، راجع الملاحظات للقمة!',
      feedbackEn: 'Great achievement! Very close to perfection, review notes to reach the top!',
    };
  }

  return {
    stars: 1,
    accuracyPercent,
    hasSpeedBonus: false,
    feedbackAr: '👍 محاولة طيبة، راجع الأسئلة الخاطئة وكرر التحدي للتفوق!',
    feedbackEn: 'Good effort, review incorrect answers and retry to excel!',
  };
}
