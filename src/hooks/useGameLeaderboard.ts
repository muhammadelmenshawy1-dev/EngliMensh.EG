/**
 * useGameLeaderboard.ts — Persistent Local Classroom Leaderboard Hook
 * Author & System Architect: Mohammad El-Menshawy (محمد المنشاوي)
 */

import { useState, useEffect, useCallback } from 'react';
import { LeaderboardRecord, SessionResult, GameStage, GameDifficulty } from '../types/gameQuestions.ts';

const LEADERBOARD_KEY = 'englimensh_local_leaderboard_v1';
const MAX_LEADERBOARD_ENTRIES = 100;

export function useGameLeaderboard() {
  const [entries, setEntries] = useState<LeaderboardRecord[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const raw = localStorage.getItem(LEADERBOARD_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // Ignore storage errors
    }
    return [];
  });

  const persistEntries = useCallback((newEntries: LeaderboardRecord[]) => {
    setEntries(newEntries);
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(newEntries));
      }
    } catch {
      // Storage recovery
    }
  }, []);

  /**
   * Adds a new completed session to the leaderboard.
   */
  const addRecord = useCallback(
    (session: SessionResult, studentName: string = 'طالب متميز (Student)') => {
      const newRecord: LeaderboardRecord = {
        id: `lb_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        studentId: session.gameId,
        studentName: studentName.trim() || 'طالب متميز',
        gameId: session.gameId,
        gameTitle: session.gameTitle,
        score: session.totalScore,
        stars: session.starsAwarded,
        accuracy: session.accuracyPercent,
        durationSeconds: session.durationSeconds,
        stage: session.stage,
        grade: session.grade,
        difficulty: session.difficulty,
        date: new Date().toLocaleDateString('ar-EG', {
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
      };

      setEntries((prev) => {
        const combined = [newRecord, ...prev];

        // Sort: 1. Score DESC -> 2. Accuracy DESC -> 3. Duration ASC
        combined.sort((a, b) => {
          if (b.score !== a.score) return b.score - a.score;
          if (b.accuracy !== a.accuracy) return b.accuracy - a.accuracy;
          return a.durationSeconds - b.durationSeconds;
        });

        const capped = combined.slice(0, MAX_LEADERBOARD_ENTRIES);
        persistEntries(capped);
        return capped;
      });
    },
    [persistEntries]
  );

  /**
   * Filter leaderboard entries by game, stage, or difficulty.
   */
  const getFilteredEntries = useCallback(
    (filters: {
      gameId?: string;
      stage?: GameStage | 'all';
      difficulty?: GameDifficulty | 'all';
    }) => {
      return entries.filter((e) => {
        if (filters.gameId && filters.gameId !== 'all' && e.gameId !== filters.gameId) {
          return false;
        }
        if (filters.stage && filters.stage !== 'all' && e.stage !== filters.stage) {
          return false;
        }
        if (filters.difficulty && filters.difficulty !== 'all' && e.difficulty !== filters.difficulty) {
          return false;
        }
        return true;
      });
    },
    [entries]
  );

  /**
   * Safely clears all local leaderboard history.
   */
  const clearLeaderboard = useCallback(() => {
    setEntries([]);
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem(LEADERBOARD_KEY);
      }
    } catch {}
  }, []);

  return {
    entries,
    addRecord,
    getFilteredEntries,
    clearLeaderboard,
  };
}
