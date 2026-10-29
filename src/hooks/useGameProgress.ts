/**
 * useGameProgress.ts — Persistent Arcade Progression Hook for EngliMensh.EG
 * Author & System Architect: Mohammad El-Menshawy (محمد المنشاوي)
 */

import { useState, useEffect, useCallback } from 'react';
import { ArcadeStudentProgress, SessionResult } from '../types/gameQuestions.ts';
import { getStoredStudent, createOrUpdateStudent } from '../services/studentStorage.ts';

const PROGRESS_STORAGE_KEY = 'englimensh_arcade_progress_v2';
const CURRENT_VERSION = 2;

export function useGameProgress() {
  const [progress, setProgress] = useState<ArcadeStudentProgress>(() => {
    const student = getStoredStudent();
    const defaultProgress: ArcadeStudentProgress = {
      version: CURRENT_VERSION,
      studentId: student?.id || 'guest_student',
      studentName: student?.name || 'طالب متميز (Guest)',
      totalGamesPlayed: student?.gamesPlayed || 0,
      totalCorrect: 0,
      totalIncorrect: 0,
      totalStars: 0,
      totalArcadeScore: student?.totalScore || 0,
      highestCombo: student?.highStreak || 0,
      bestScores: {},
      bestStars: {},
      completedTiers: {},
      lastPlayedAt: new Date().toISOString(),
    };

    if (typeof window === 'undefined') return defaultProgress;

    try {
      const raw = localStorage.getItem(PROGRESS_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object') {
          return {
            ...defaultProgress,
            ...parsed,
            studentId: student?.id || parsed.studentId || 'guest_student',
            studentName: student?.name || parsed.studentName || 'طالب متميز (Guest)',
          };
        }
      }
    } catch {
      // Graceful storage fallback
    }

    return defaultProgress;
  });

  // Save progress to LocalStorage safely
  const persistProgress = useCallback((newProgress: ArcadeStudentProgress) => {
    setProgress(newProgress);
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(newProgress));
      }
    } catch {
      // Quota recovery
    }
  }, []);

  // Records a completed game session into cumulative progression
  const recordSession = useCallback(
    (session: SessionResult) => {
      setProgress((prev) => {
        const gameIdKey = session.gameId;
        const currentBestScore = prev.bestScores[gameIdKey] || 0;
        const currentBestStars = prev.bestStars[gameIdKey] || 0;

        const updatedBestScores = {
          ...prev.bestScores,
          [gameIdKey]: Math.max(currentBestScore, session.totalScore),
        };

        const updatedBestStars = {
          ...prev.bestStars,
          [gameIdKey]: Math.max(currentBestStars, session.starsAwarded),
        };

        const tierKey = `${session.stage}-${session.grade}-${session.difficulty}`;
        const updatedTiers = {
          ...prev.completedTiers,
          [tierKey]: session.accuracyPercent >= 70,
        };

        const updatedProgress: ArcadeStudentProgress = {
          ...prev,
          totalGamesPlayed: prev.totalGamesPlayed + 1,
          totalCorrect: prev.totalCorrect + session.correctCount,
          totalIncorrect: prev.totalIncorrect + session.incorrectCount,
          totalStars: prev.totalStars + session.starsAwarded,
          totalArcadeScore: prev.totalArcadeScore + session.totalScore,
          highestCombo: Math.max(prev.highestCombo, session.highestStreak),
          bestScores: updatedBestScores,
          bestStars: updatedBestStars,
          completedTiers: updatedTiers,
          lastPlayedAt: new Date().toISOString(),
        };

        persistProgress(updatedProgress);

        // Synchronize XP points with global EngliMensh Student Profile
        try {
          const currentStd = getStoredStudent();
          if (currentStd) {
            createOrUpdateStudent({
              totalScore: (currentStd.totalScore || 0) + session.totalScore,
              gamesPlayed: (currentStd.gamesPlayed || 0) + 1,
              highStreak: Math.max(currentStd.highStreak || 0, session.highestStreak),
            });
          }
        } catch {
          // Ignore sync errors
        }

        return updatedProgress;
      });
    },
    [persistProgress]
  );

  return {
    progress,
    recordSession,
  };
}
