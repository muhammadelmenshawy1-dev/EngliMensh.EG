// =========================================================================
// EngliMensh.EG - Persistent Student Progress Tracking Service
// System Architect: Mohammad El-Menshawy (محمد المنشاوي)
// Storage Schema: englimensh_progress_${unitId}
// =========================================================================

export interface StoredLevelProgress {
  level: number;
  score: number;
  totalMarks: number;
  percentage: number;
  passed: boolean;
  completedAt: string;
  attempts?: number;
}
export type LevelProgressRecord = StoredLevelProgress;

export interface StoredUnitProgress {
  unitId: string;
  levels: Record<number, StoredLevelProgress>;
}

// In-memory fallback in case localStorage is disabled or restricted
const inMemoryStore: Record<string, string> = {};

function isStorageAvailable(): boolean {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return false;
    const testKey = '__storage_test__';
    window.localStorage.setItem(testKey, testKey);
    window.localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

export function getProgressKey(unitId: string): string {
  return `englimensh_progress_${unitId.trim()}`;
}

/**
 * Safely load stored unit progress from localStorage with robust validation
 */
export function loadUnitProgress(unitId: string): StoredUnitProgress | null {
  if (!unitId) return null;
  const key = getProgressKey(unitId);

  try {
    let raw: string | null = null;
    if (isStorageAvailable()) {
      raw = window.localStorage.getItem(key);
    } else {
      raw = inMemoryStore[key] || null;
    }

    if (!raw) return null;

    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return null;

    // Validate unitId match
    const validUnitId = typeof parsed.unitId === 'string' && parsed.unitId ? parsed.unitId : unitId;

    // Validate levels map
    const validatedLevels: Record<number, LevelProgressRecord> = {};
    if (parsed.levels && typeof parsed.levels === 'object') {
      for (const [lvlStr, record] of Object.entries(parsed.levels)) {
        const lvlNum = parseInt(lvlStr, 10);
        if (isNaN(lvlNum) || lvlNum < 1 || lvlNum > 5) continue;
        if (!record || typeof record !== 'object') continue;

        const rec = record as Record<string, unknown>;
        const score = typeof rec.score === 'number' && !isNaN(rec.score) ? Math.max(0, rec.score) : 0;
        const totalMarks = typeof rec.totalMarks === 'number' && !isNaN(rec.totalMarks) ? Math.max(1, rec.totalMarks) : 10;
        const percentage = typeof rec.percentage === 'number' && !isNaN(rec.percentage)
          ? Math.min(100, Math.max(0, rec.percentage))
          : Math.round((score / totalMarks) * 100);
        const passed = typeof rec.passed === 'boolean' ? rec.passed : percentage >= 50;
        const completedAt = typeof rec.completedAt === 'string' && rec.completedAt ? rec.completedAt : new Date().toISOString();
        const attempts = typeof rec.attempts === 'number' ? Math.max(1, rec.attempts) : 1;

        validatedLevels[lvlNum] = {
          level: lvlNum,
          score,
          totalMarks,
          percentage,
          passed,
          completedAt,
          attempts
        };
      }
    }

    return {
      unitId: validUnitId,
      levels: validatedLevels
    };
  } catch (error) {
    console.warn(`[EngliMensh] Warning: Could not read progress for unit "${unitId}":`, error);
    return null;
  }
}

/**
 * Safely save or update level progress for a specific unit
 * Retake Policy: Preserves existing progress across other levels, updates current level,
 * and maintains the best score if previous attempt scored higher.
 */
export function saveLevelProgress(
  unitId: string,
  level: number,
  score: number,
  totalMarks: number
): StoredUnitProgress | null {
  if (!unitId || level < 1 || level > 5) return null;

  try {
    const existing = loadUnitProgress(unitId) || { unitId, levels: {} };
    const currentTotal = Math.max(1, totalMarks);
    const currentScore = Math.max(0, score);
    const currentPct = Math.round((currentScore / currentTotal) * 100);
    const currentPassed = currentPct >= 50;

    const previousRecord = existing.levels[level];
    const prevAttempts = previousRecord?.attempts || 0;

    // Retake policy: Record latest completedAt and increment attempts;
    // Keep highest score/percentage if student previously did better
    const bestScore = previousRecord ? Math.max(previousRecord.score, currentScore) : currentScore;
    const bestPercentage = previousRecord ? Math.max(previousRecord.percentage, currentPct) : currentPct;
    const passed = previousRecord?.passed || currentPassed;

    existing.levels[level] = {
      level,
      score: bestScore,
      totalMarks: currentTotal,
      percentage: bestPercentage,
      passed,
      completedAt: new Date().toISOString(),
      attempts: prevAttempts + 1
    };

    const payload = JSON.stringify(existing);
    const key = getProgressKey(unitId);

    if (isStorageAvailable()) {
      window.localStorage.setItem(key, payload);
    } else {
      inMemoryStore[key] = payload;
    }

    // Dispatch custom event so other components (CurriculumExplorer, ExamsHub) update reactively
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('englimensh_progress_updated', {
        detail: { unitId, level, progress: existing.levels[level] }
      }));
    }

    return existing;
  } catch (error) {
    console.warn(`[EngliMensh] Warning: Could not save progress for unit "${unitId}" level ${level}:`, error);
    return null;
  }
}

/**
 * Get summary of completed levels for a unit
 */
export function getUnitProgressSummary(unitId: string): {
  completedLevels: number;
  passedLevels: number;
  totalScore: number;
  maxScore: number;
  overallPercentage: number;
  isFullyMastered: boolean;
} {
  const data = loadUnitProgress(unitId);
  if (!data || !data.levels) {
    return {
      completedLevels: 0,
      passedLevels: 0,
      totalScore: 0,
      maxScore: 0,
      overallPercentage: 0,
      isFullyMastered: false
    };
  }

  const records = Object.values(data.levels);
  const completedLevels = records.length;
  const passedLevels = records.filter(r => r.passed).length;
  const totalScore = records.reduce((sum, r) => sum + r.score, 0);
  const maxScore = records.reduce((sum, r) => sum + r.totalMarks, 0);
  const overallPercentage = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;
  const isFullyMastered = passedLevels === 5;

  return {
    completedLevels,
    passedLevels,
    totalScore,
    maxScore,
    overallPercentage,
    isFullyMastered
  };
}

/**
 * Retrieve all saved progress across the entire application
 */
export function getAllSavedUnitProgress(): Record<string, StoredUnitProgress> {
  const results: Record<string, StoredUnitProgress> = {};
  try {
    if (isStorageAvailable()) {
      for (let i = 0; i < window.localStorage.length; i++) {
        const key = window.localStorage.key(i);
        if (key && key.startsWith('englimensh_progress_')) {
          const unitId = key.replace('englimensh_progress_', '');
          const data = loadUnitProgress(unitId);
          if (data) results[unitId] = data;
        }
      }
    }
    // Also merge in-memory fallback
    for (const key of Object.keys(inMemoryStore)) {
      if (key.startsWith('englimensh_progress_')) {
        const unitId = key.replace('englimensh_progress_', '');
        if (!results[unitId]) {
          const data = loadUnitProgress(unitId);
          if (data) results[unitId] = data;
        }
      }
    }
  } catch (err) {
    console.warn('[EngliMensh] Error loading all saved progress:', err);
  }
  return results;
}
