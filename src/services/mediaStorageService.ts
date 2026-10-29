// =========================================================================
// EngliMensh.EG - Media Storage & Asset Validation Service
// System Architect: Mohammad El-Menshawy (محمد المنشاوي)
// Durable caching and validation for approved video lessons
// =========================================================================

import { VideoLesson, CostControlBudget } from '../types/videoLesson.ts';
import { masterVideoLessons } from '../data/videoLessons.ts';

const VIDEO_LESSONS_STORAGE_KEY = 'englimensh_video_lessons_v1';
const VIDEO_BUDGET_STORAGE_KEY = 'englimensh_video_budget_v1';

const DEFAULT_BUDGET: CostControlBudget = {
  dailyLimitUsd: 5.0,
  usedTodayUsd: 0.0,
  maxJobsPerDay: 10,
  jobsCompletedToday: 0,
  requiresTeacherApproval: true
};

export class MediaStorageService {
  /**
   * Retrieves all registered video lessons, hydrating from localStorage or master defaults.
   */
  public static getAllLessons(): VideoLesson[] {
    if (typeof window === 'undefined') return masterVideoLessons;
    try {
      const stored = localStorage.getItem(VIDEO_LESSONS_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as VideoLesson[];
        // Merge with master defaults so built-in verified lessons always exist
        const mergedMap = new Map<string, VideoLesson>();
        masterVideoLessons.forEach(l => mergedMap.set(l.id, l));
        parsed.forEach(l => mergedMap.set(l.id, l));
        return Array.from(mergedMap.values());
      }
    } catch (e) {
      console.warn('Failed to load video lessons from storage:', e);
    }
    return masterVideoLessons;
  }

  /**
   * Retrieves a specific video lesson by unitId or id.
   */
  public static getLessonByUnitId(unitId: string): VideoLesson | undefined {
    const all = this.getAllLessons();
    return all.find(l => l.unitId === unitId || l.id === unitId || l.unitId.includes(unitId));
  }

  /**
   * Saves or updates a video lesson in persistent storage.
   */
  public static saveLesson(lesson: VideoLesson): void {
    if (typeof window === 'undefined') return;
    try {
      const all = this.getAllLessons();
      const index = all.findIndex(l => l.id === lesson.id);
      if (index >= 0) {
        all[index] = lesson;
      } else {
        all.push(lesson);
      }
      localStorage.setItem(VIDEO_LESSONS_STORAGE_KEY, JSON.stringify(all));
    } catch (e) {
      console.error('Failed to save video lesson:', e);
    }
  }

  /**
   * Retrieves the current cost control budget and usage state.
   */
  public static getBudget(): CostControlBudget {
    if (typeof window === 'undefined') return DEFAULT_BUDGET;
    try {
      const raw = localStorage.getItem(VIDEO_BUDGET_STORAGE_KEY);
      if (raw) return { ...DEFAULT_BUDGET, ...JSON.parse(raw) };
    } catch (e) {
      console.warn('Failed to read video budget:', e);
    }
    return DEFAULT_BUDGET;
  }

  public static getDailyBudget(): CostControlBudget {
    return this.getBudget();
  }

  /**
   * Records a completed generation cost against the daily budget.
   */
  public static recordUsage(costUsd: number): void {
    if (typeof window === 'undefined') return;
    try {
      const budget = this.getBudget();
      budget.usedTodayUsd = Math.round((budget.usedTodayUsd + costUsd) * 100) / 100;
      budget.jobsCompletedToday += 1;
      localStorage.setItem(VIDEO_BUDGET_STORAGE_KEY, JSON.stringify(budget));
    } catch (e) {
      console.warn('Failed to record budget usage:', e);
    }
  }

  /**
   * Validates if a media URL responds and is playable.
   */
  public static async validateMediaUrl(url: string): Promise<boolean> {
    try {
      const res = await fetch(url, { method: 'HEAD' });
      return res.ok;
    } catch {
      return false;
    }
  }
}
