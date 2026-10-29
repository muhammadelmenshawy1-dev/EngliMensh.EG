/**
 * learningStore.ts — Centralized Student Progression, Quests, Curriculum Nodes, XP & Word Bank Store
 * Author & System Architect: Mohammad El-Menshawy (محمد المنشاوي)
 *
 * Preserves and synchronizes with existing storage keys:
 * - englimensh_student_profile_v3
 * - englimensh_arcade_progress_v2
 * - englimensh_local_leaderboard_v1
 * - englimensh_word_bank_v1
 */

import { EducationalStage } from '../types/curriculum.ts';
import {
  getStoredStudent,
  createOrUpdateStudent,
  saveStudent,
} from './studentStorage.ts';

const LEARNING_STATE_KEY = 'englimensh_learning_state_v1';
const WORD_BANK_KEY = 'englimensh_word_bank_v1';
const LEGACY_FAV_KEY = 'englimensh_dictionary_favorites_v1';

export type UnitModuleKey =
  | 'vocab'
  | 'grammar'
  | 'reading'
  | 'listening'
  | 'exam';

export interface UnitNodeProgress {
  unitKey: string;
  stage: EducationalStage;
  grade: number;
  semester: number;
  unitNumber: number;
  unitTitle: string;
  unitTitleAr: string;
  vocabDone: boolean;
  grammarDone: boolean;
  readingDone: boolean;
  listeningDone: boolean;
  examDone: boolean;
  // Convenience aliases used by UI components
  vocabCompleted: boolean;
  grammarCompleted: boolean;
  readingCompleted: boolean;
  listeningCompleted: boolean;
  examCompleted: boolean;
  bestExamScore?: number;
  lastModule?: UnitModuleKey;
  lastAccessedAt: string;
}

export interface DailyQuestState {
  dateStr: string; // YYYY-MM-DD
  titleAr: string;
  targetDescriptionAr: string;
  currentCount: number;
  targetCount: number;
  xpReward: number;
  rewardXp: number;
  completed: boolean;
  rewardClaimed: boolean;
}

export interface SavedVocabWord {
  id: string;
  english: string;
  arabic: string;
  partOfSpeech?: string;
  example?: string;
  unitLabel?: string;
  dateAdded: string;
}

export type SavedWordItem = SavedVocabWord;

export interface AchievementBadgeStatus {
  id: string;
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  criteriaAr: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  progressText?: string;
}

export interface LearningState {
  version: number;
  nickname: string;
  avatar: string;
  avatarEmoji: string;
  selectedStage: EducationalStage;
  selectedGrade: number;
  preferredStage: EducationalStage;
  preferredGrade: number;
  selectedSemester: 1 | 2;
  xp: number;
  currentStreak: number;
  streakDays: number;
  lessonsCompleted: number;
  gamesWon: number;
  gamesWonByType: {
    shootout: number;
    tug_of_war: number;
    bowling: number;
  };
  lastActiveDateStr: string;
  unitProgress: Record<string, UnitNodeProgress>;
  lastActiveUnitKey: string | null;
  dailyQuest: DailyQuestState;
  completedActivityIds: Record<string, { xp: number; timestamp: string }>;
  unlockedBadgeDates: Record<string, string>;
}

export type LearningStoreState = LearningState;

function getTodayDateStr(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
    2,
    '0'
  )}-${String(now.getDate()).padStart(2, '0')}`;
}

function getYesterdayDateStr(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
    2,
    '0'
  )}-${String(d.getDate()).padStart(2, '0')}`;
}

function createDefaultDailyQuest(
  dateStr: string,
  stage: EducationalStage
): DailyQuestState {
  const stageAr =
    stage === 'Primary'
      ? 'الابتدائي'
      : stage === 'Preparatory'
      ? 'المتوسط/الإعدادي'
      : 'الثانوي';
  return {
    dateStr,
    titleAr: `أجب عن 5 أسئلة أو أكمل درساً في منهج ${stageAr}`,
    targetDescriptionAr: `أجب عن 5 أسئلة صحيحة أو أكمل أنشطة في منهج ${stageAr}`,
    currentCount: 0,
    targetCount: 5,
    xpReward: 50,
    rewardXp: 50,
    completed: false,
    rewardClaimed: false,
  };
}

export function getUnitKey(
  stage: EducationalStage,
  grade: number,
  semester: number,
  unitNumber: number
): string {
  return `${stage}_${grade}_${unitNumber}`;
}

export function calculateUnitPercentage(node?: UnitNodeProgress): number {
  if (!node) return 0;
  let completed = 0;
  if (node.vocabDone || node.vocabCompleted) completed += 1;
  if (node.grammarDone || node.grammarCompleted) completed += 1;
  if (node.readingDone || node.readingCompleted) completed += 1;
  if (node.listeningDone || node.listeningCompleted) completed += 1;
  if (node.examDone || node.examCompleted) completed += 1;
  return Math.round((completed / 5) * 100);
}

function normalizeUnitProgressMap(
  rawMap: Record<string, any> | undefined
): Record<string, UnitNodeProgress> {
  if (!rawMap || typeof rawMap !== 'object') return {};
  const result: Record<string, UnitNodeProgress> = {};
  for (const [k, val] of Object.entries(rawMap)) {
    if (!val || typeof val !== 'object') continue;
    const vocab = Boolean(val.vocabDone || val.vocabCompleted);
    const grammar = Boolean(val.grammarDone || val.grammarCompleted);
    const reading = Boolean(val.readingDone || val.readingCompleted);
    const listening = Boolean(val.listeningDone || val.listeningCompleted);
    const exam = Boolean(val.examDone || val.examCompleted);
    result[k] = {
      unitKey: val.unitKey || k,
      stage: val.stage || 'Secondary',
      grade: Number(val.grade) || 10,
      semester: Number(val.semester) || 1,
      unitNumber: Number(val.unitNumber) || 1,
      unitTitle: val.unitTitle || `Unit ${val.unitNumber || 1}`,
      unitTitleAr: val.unitTitleAr || '',
      vocabDone: vocab,
      grammarDone: grammar,
      readingDone: reading,
      listeningDone: listening,
      examDone: exam,
      vocabCompleted: vocab,
      grammarCompleted: grammar,
      readingCompleted: reading,
      listeningCompleted: listening,
      examCompleted: exam,
      bestExamScore: val.bestExamScore,
      lastModule: val.lastModule,
      lastAccessedAt: val.lastAccessedAt || new Date().toISOString(),
    };
  }
  return result;
}

export function loadLearningState(): LearningState {
  const today = getTodayDateStr();
  const student = getStoredStudent();

  let initialStage: EducationalStage = 'Secondary';
  let initialGrade = 10;
  if (student?.grade) {
    const gLower = student.grade.toLowerCase();
    if (gLower.includes('primary')) {
      initialStage = 'Primary';
      const match = gLower.match(/\d+/);
      initialGrade = match ? Math.min(6, Math.max(1, Number(match[0]))) : 4;
    } else if (gLower.includes('prep')) {
      initialStage = 'Preparatory';
      const match = gLower.match(/\d+/);
      initialGrade = match ? Math.min(9, Math.max(7, Number(match[0]) + 6)) : 7;
    }
  }

  const baseXp = student?.totalScore ?? 350;
  const baseStreak = student?.highStreak ? Math.max(1, student.highStreak) : 5;
  const baseName = student?.name || 'عمر محمد';

  const defaultState: LearningState = {
    version: 1,
    nickname: baseName,
    avatar: '👦',
    avatarEmoji: '👦',
    selectedStage: initialStage,
    selectedGrade: initialGrade,
    preferredStage: initialStage,
    preferredGrade: initialGrade,
    selectedSemester: 1,
    xp: baseXp,
    currentStreak: baseStreak,
    streakDays: baseStreak,
    lessonsCompleted: 0,
    gamesWon: student?.gamesPlayed || 0,
    gamesWonByType: {
      shootout: 0,
      tug_of_war: 0,
      bowling: 0,
    },
    lastActiveDateStr: today,
    unitProgress: {},
    lastActiveUnitKey: null,
    dailyQuest: createDefaultDailyQuest(today, initialStage),
    completedActivityIds: {},
    unlockedBadgeDates: {
      first_step: student?.createdAt || new Date().toISOString(),
    },
  };

  if (typeof window === 'undefined') return defaultState;

  try {
    const raw = localStorage.getItem(LEARNING_STATE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') {
        const unitProgress = normalizeUnitProgressMap(parsed.unitProgress);
        const lessonsCount = Object.values(unitProgress).reduce((acc, u) => {
          return (
            acc +
            (u.vocabDone ? 1 : 0) +
            (u.grammarDone ? 1 : 0) +
            (u.readingDone ? 1 : 0) +
            (u.listeningDone ? 1 : 0) +
            (u.examDone ? 1 : 0)
          );
        }, 0);

        const gamesWonByType = {
          shootout: Number(
            parsed.gamesWonByType?.shootout ?? parsed.gamesWon?.shootout ?? 0
          ),
          tug_of_war: Number(
            parsed.gamesWonByType?.tug_of_war ?? parsed.gamesWon?.tug_of_war ?? 0
          ),
          bowling: Number(
            parsed.gamesWonByType?.bowling ?? parsed.gamesWon?.bowling ?? 0
          ),
        };
        const totalGamesWon =
          typeof parsed.gamesWon === 'number'
            ? parsed.gamesWon
            : gamesWonByType.shootout +
              gamesWonByType.tug_of_war +
              gamesWonByType.bowling;

        const stageVal: EducationalStage =
          parsed.preferredStage || parsed.selectedStage || initialStage;
        const gradeVal: number =
          Number(parsed.preferredGrade || parsed.selectedGrade) || initialGrade;
        const streakVal = Math.max(
          1,
          Number(parsed.streakDays ?? parsed.currentStreak ?? baseStreak)
        );
        const xpVal = Math.max(
          Number(parsed.xp ?? 0),
          student?.totalScore ?? 0,
          350
        );
        const avatarVal = parsed.avatar || parsed.avatarEmoji || '👦';

        const merged: LearningState = {
          ...defaultState,
          ...parsed,
          nickname: student?.name || parsed.nickname || baseName,
          avatar: avatarVal,
          avatarEmoji: avatarVal,
          selectedStage: stageVal,
          preferredStage: stageVal,
          selectedGrade: gradeVal,
          preferredGrade: gradeVal,
          xp: xpVal,
          currentStreak: streakVal,
          streakDays: streakVal,
          lessonsCompleted: Math.max(
            Number(parsed.lessonsCompleted || 0),
            lessonsCount
          ),
          gamesWon: totalGamesWon,
          gamesWonByType,
          unitProgress,
          completedActivityIds: parsed.completedActivityIds || {},
          unlockedBadgeDates:
            parsed.unlockedBadgeDates || defaultState.unlockedBadgeDates,
        };

        if (!merged.dailyQuest || merged.dailyQuest.dateStr !== today) {
          merged.dailyQuest = createDefaultDailyQuest(today, merged.preferredStage);
        } else {
          merged.dailyQuest = {
            ...merged.dailyQuest,
            rewardXp: merged.dailyQuest.rewardXp ?? merged.dailyQuest.xpReward ?? 50,
            xpReward: merged.dailyQuest.xpReward ?? merged.dailyQuest.rewardXp ?? 50,
          };
        }

        return merged;
      }
    }
  } catch (e) {
    console.warn('[learningStore] Failed to parse learning state:', e);
  }

  return defaultState;
}

export function saveLearningState(state: LearningState): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LEARNING_STATE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn('[learningStore] Failed to save learning state:', e);
  }
}

export function updateStudentProfileMetadata(updates: {
  nickname?: string;
  avatar?: string;
  preferredStage?: EducationalStage;
  preferredGrade?: number;
}): LearningState {
  const state = loadLearningState();
  if (updates.nickname !== undefined && updates.nickname.trim()) {
    state.nickname = updates.nickname.trim();
    createOrUpdateStudent({ name: state.nickname });
  }
  if (updates.avatar !== undefined) {
    state.avatar = updates.avatar;
    state.avatarEmoji = updates.avatar;
  }
  if (updates.preferredStage !== undefined) {
    state.preferredStage = updates.preferredStage;
    state.selectedStage = updates.preferredStage;
  }
  if (updates.preferredGrade !== undefined) {
    state.preferredGrade = updates.preferredGrade;
    state.selectedGrade = updates.preferredGrade;
  }
  saveLearningState(state);
  return state;
}

function touchDailyStreak(state: LearningState): LearningState {
  const today = getTodayDateStr();
  const yesterday = getYesterdayDateStr();

  if (state.lastActiveDateStr === today) {
    const s = Math.max(1, state.streakDays, state.currentStreak);
    return {
      ...state,
      currentStreak: s,
      streakDays: s,
    };
  }

  const nextStreak =
    state.lastActiveDateStr === yesterday
      ? Math.max(state.streakDays, state.currentStreak) + 1
      : Math.max(1, state.streakDays);
  return {
    ...state,
    currentStreak: nextStreak,
    streakDays: nextStreak,
    lastActiveDateStr: today,
  };
}

/**
 * Awards XP safely with duplicate-completion protection and returns the updated LearningState
 */
export function awardProtectedXP(
  activityId: string,
  xpAmount: number,
  advanceQuest: boolean | number = 1
): LearningState {
  let state = loadLearningState();
  state = touchDailyStreak(state);

  let xpAwarded = 0;
  if (!state.completedActivityIds[activityId] && xpAmount > 0) {
    xpAwarded = xpAmount;
    state.completedActivityIds = {
      ...state.completedActivityIds,
      [activityId]: {
        xp: xpAmount,
        timestamp: new Date().toISOString(),
      },
    };
  }

  const questInc =
    typeof advanceQuest === 'boolean' ? (advanceQuest ? 1 : 0) : advanceQuest;

  if (questInc > 0) {
    const newCount = Math.min(
      state.dailyQuest.targetCount,
      state.dailyQuest.currentCount + questInc
    );
    const isNowComplete = newCount >= state.dailyQuest.targetCount;
    let bonusXp = 0;

    if (isNowComplete && !state.dailyQuest.rewardClaimed) {
      bonusXp = state.dailyQuest.xpReward || 50;
    }

    state.dailyQuest = {
      ...state.dailyQuest,
      currentCount: newCount,
      completed: isNowComplete,
      rewardClaimed: state.dailyQuest.rewardClaimed || isNowComplete,
    };

    xpAwarded += bonusXp;
  }

  if (xpAwarded > 0) {
    state.xp = (state.xp || 350) + xpAwarded;
    const currentStd = getStoredStudent();
    if (currentStd) {
      createOrUpdateStudent({
        totalScore: Math.max(state.xp, (currentStd.totalScore || 0) + xpAwarded),
        highStreak: Math.max(currentStd.highStreak || 0, state.streakDays),
      });
    } else {
      createOrUpdateStudent({
        name: state.nickname || 'عمر محمد',
        totalScore: state.xp,
        highStreak: state.streakDays,
      });
    }
  }

  saveLearningState(state);
  return state;
}

/**
 * Records progress on a curriculum unit module (supports both string unitKey and object signature)
 */
export function recordUnitModuleCompletion(
  unitKeyOrParams:
    | string
    | {
        stage: EducationalStage;
        grade: number;
        semester: number;
        unitNumber: number;
        unitTitle: string;
        unitTitleAr: string;
        module: UnitModuleKey;
      },
  moduleArg?: UnitModuleKey,
  xpAmountArg: number = 20
): LearningState {
  let unitKey: string;
  let mod: UnitModuleKey;
  let stage: EducationalStage = 'Secondary';
  let grade = 10;
  let semester = 1;
  let unitNumber = 1;
  let unitTitle = 'Unit 1';
  let unitTitleAr = '';

  if (typeof unitKeyOrParams === 'string') {
    unitKey = unitKeyOrParams;
    mod = moduleArg || 'vocab';
    const parts = unitKey.split('_');
    if (parts[0] === 'Primary' || parts[0] === 'Preparatory' || parts[0] === 'Secondary') {
      stage = parts[0];
    }
    grade = Number(parts[1]) || 10;
    unitNumber = Number(parts[2]) || 1;
    unitTitle = `Unit ${unitNumber}`;
  } else {
    stage = unitKeyOrParams.stage;
    grade = unitKeyOrParams.grade;
    semester = unitKeyOrParams.semester;
    unitNumber = unitKeyOrParams.unitNumber;
    unitTitle = unitKeyOrParams.unitTitle;
    unitTitleAr = unitKeyOrParams.unitTitleAr;
    mod = unitKeyOrParams.module;
    unitKey = getUnitKey(stage, grade, semester, unitNumber);
  }

  const activityId = `unit_${unitKey}_${mod}`;
  const state = awardProtectedXP(activityId, xpAmountArg, 1);

  const existing: UnitNodeProgress = state.unitProgress[unitKey] || {
    unitKey,
    stage,
    grade,
    semester,
    unitNumber,
    unitTitle,
    unitTitleAr,
    vocabDone: false,
    grammarDone: false,
    readingDone: false,
    listeningDone: false,
    examDone: false,
    vocabCompleted: false,
    grammarCompleted: false,
    readingCompleted: false,
    listeningCompleted: false,
    examCompleted: false,
    lastAccessedAt: new Date().toISOString(),
  };

  const vocab = existing.vocabDone || mod === 'vocab';
  const grammar = existing.grammarDone || mod === 'grammar';
  const reading = existing.readingDone || mod === 'reading';
  const listening = existing.listeningDone || mod === 'listening';
  const exam = existing.examDone || mod === 'exam';

  const updatedNode: UnitNodeProgress = {
    ...existing,
    vocabDone: vocab,
    grammarDone: grammar,
    readingDone: reading,
    listeningDone: listening,
    examDone: exam,
    vocabCompleted: vocab,
    grammarCompleted: grammar,
    readingCompleted: reading,
    listeningCompleted: listening,
    examCompleted: exam,
    lastModule: mod,
    lastAccessedAt: new Date().toISOString(),
  };

  state.unitProgress = {
    ...state.unitProgress,
    [unitKey]: updatedNode,
  };
  state.lastActiveUnitKey = unitKey;

  const totalCompletedModules = Object.values(state.unitProgress).reduce(
    (acc, u) =>
      acc +
      (u.vocabDone ? 1 : 0) +
      (u.grammarDone ? 1 : 0) +
      (u.readingDone ? 1 : 0) +
      (u.listeningDone ? 1 : 0) +
      (u.examDone ? 1 : 0),
    0
  );
  state.lessonsCompleted = totalCompletedModules;

  saveLearningState(state);
  return state;
}

/**
 * Records touching/opening a unit so "Continue Learning" knows the latest active unit
 */
export function setLastActiveUnit(
  unitKeyOrParams:
    | string
    | {
        stage: EducationalStage;
        grade: number;
        semester: number;
        unitNumber: number;
        unitTitle: string;
        unitTitleAr: string;
        module?: UnitModuleKey;
      }
): LearningState {
  const state = loadLearningState();
  const unitKey =
    typeof unitKeyOrParams === 'string'
      ? unitKeyOrParams
      : getUnitKey(
          unitKeyOrParams.stage,
          unitKeyOrParams.grade,
          unitKeyOrParams.semester,
          unitKeyOrParams.unitNumber
        );

  state.lastActiveUnitKey = unitKey;
  saveLearningState(state);
  return state;
}

/**
 * Records a completed game match for quests and badge tracking
 */
export function recordGameMatchCompleted(
  gameId: string,
  pointsEarned: number = 50
): LearningState {
  const mappedKey: 'shootout' | 'tug_of_war' | 'bowling' =
    gameId.includes('shoot')
      ? 'shootout'
      : gameId.includes('tug')
      ? 'tug_of_war'
      : 'bowling';

  const activityId = `game_${mappedKey}_${Date.now()}`;
  const state = awardProtectedXP(activityId, Math.max(15, Math.round(pointsEarned * 0.25)), 1);

  state.gamesWonByType = {
    ...state.gamesWonByType,
    [mappedKey]: (state.gamesWonByType[mappedKey] || 0) + 1,
  };
  state.gamesWon = (state.gamesWon || 0) + 1;

  saveLearningState(state);
  return state;
}

const DEFAULT_STARTER_WORDS: SavedVocabWord[] = [
  { id: 'wb_starter_1', english: 'friend', arabic: 'صديق', dateAdded: 'اليوم' },
  { id: 'wb_starter_2', english: 'happy', arabic: 'سعيد', dateAdded: 'اليوم' },
  {
    id: 'wb_starter_3',
    english: 'curriculum',
    arabic: 'منهج دراسي',
    dateAdded: 'اليوم',
  },
];

export function loadWordBank(): SavedVocabWord[] {
  if (typeof window === 'undefined') return DEFAULT_STARTER_WORDS;
  try {
    const raw = localStorage.getItem(WORD_BANK_KEY);
    let list: SavedVocabWord[] = [];
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        list = parsed;
      }
    } else {
      list = [...DEFAULT_STARTER_WORDS];
      localStorage.setItem(WORD_BANK_KEY, JSON.stringify(list));
    }

    const legacyRaw = localStorage.getItem(LEGACY_FAV_KEY);
    if (legacyRaw) {
      try {
        const legacyParsed = JSON.parse(legacyRaw);
        if (Array.isArray(legacyParsed)) {
          legacyParsed.forEach((item: any) => {
            if (item && typeof item === 'object' && item.english && item.arabic) {
              const exists = list.some(
                (w) =>
                  w.english.trim().toLowerCase() ===
                  String(item.english).trim().toLowerCase()
              );
              if (!exists) {
                list.push({
                  id: item.id || `migrated_${Date.now()}_${Math.random()}`,
                  english: String(item.english).trim(),
                  arabic: String(item.arabic).trim(),
                  dateAdded:
                    item.dateAdded || new Date().toLocaleDateString('ar-EG'),
                });
              }
            }
          });
        }
      } catch {
        // Ignore
      }
    }

    return list;
  } catch {
    return DEFAULT_STARTER_WORDS;
  }
}

export function saveWordToBank(
  englishOrObj:
    | string
    | {
        english: string;
        arabic: string;
        partOfSpeech?: string;
        example?: string;
        unitLabel?: string;
      },
  arabicArg?: string
): SavedVocabWord[] {
  const cleanEn =
    typeof englishOrObj === 'string'
      ? englishOrObj.trim()
      : englishOrObj.english.trim();
  const cleanAr =
    typeof englishOrObj === 'string'
      ? (arabicArg || '').trim()
      : englishOrObj.arabic.trim();

  const current = loadWordBank();
  if (!cleanEn || !cleanAr) return current;

  const normKey = cleanEn.toLowerCase();
  if (current.some((w) => w.english.trim().toLowerCase() === normKey)) {
    return current;
  }

  const newEntry: SavedVocabWord = {
    id: `wb_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    english: cleanEn,
    arabic: cleanAr,
    partOfSpeech:
      typeof englishOrObj === 'object' ? englishOrObj.partOfSpeech : undefined,
    example: typeof englishOrObj === 'object' ? englishOrObj.example : undefined,
    unitLabel:
      typeof englishOrObj === 'object' ? englishOrObj.unitLabel : undefined,
    dateAdded: new Date().toLocaleDateString('ar-EG', {
      month: 'short',
      day: 'numeric',
    }),
  };

  const updated = [newEntry, ...current];
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem(WORD_BANK_KEY, JSON.stringify(updated));
    }
  } catch {
    // Ignore
  }

  return updated;
}

export function removeWordFromBank(id: string): SavedVocabWord[] {
  const current = loadWordBank();
  const updated = current.filter((w) => w.id !== id);
  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem(WORD_BANK_KEY, JSON.stringify(updated));
    }
  } catch {
    // Ignore
  }
  return updated;
}

/**
 * Evaluates all student achievements against actual progress criteria
 */
export function evaluateStudentAchievements(
  passedState?: LearningState,
  passedWordBankCount?: number,
  passedBadges?: string[]
): AchievementBadgeStatus[] {
  const state = passedState || loadLearningState();
  const student = getStoredStudent();
  const wordBankCount = passedWordBankCount ?? loadWordBank().length;
  const legacyBadges = passedBadges || student?.badges || [];

  const totalXp = Math.max(state.xp, student?.totalScore || 0);
  const streak = Math.max(state.streakDays, student?.highStreak || 0);
  const unitsList = Object.values(state.unitProgress);
  const grammarCompletedCount = unitsList.filter(
    (u) => u.grammarDone || u.grammarCompleted
  ).length;
  const fullUnitsCompletedCount = unitsList.filter(
    (u) => calculateUnitPercentage(u) === 100
  ).length;

  const badgeDefs: Omit<AchievementBadgeStatus, 'unlockedAt'>[] = [
    {
      id: 'streak_5',
      titleAr: '5 أيام متتالية',
      titleEn: '5-Day Streak',
      descriptionAr: 'المواظبة على التعلم أو اللعب لمدة 5 أيام متتالية',
      criteriaAr: 'الوصول إلى 5 أيام متتالية',
      icon: '🔥',
      unlocked: streak >= 5 || legacyBadges.includes('streak_hero'),
      progressText: `${Math.min(5, streak)} / 5 أيام`,
    },
    {
      id: 'tug_champion',
      titleAr: 'بطل شد الحبل',
      titleEn: 'Tug of Words Champion',
      descriptionAr: 'الفوز في مباراة شد الحبل اللغوي',
      criteriaAr: 'الفوز في لعبة شد الحبل',
      icon: '🪢',
      unlocked:
        state.gamesWonByType.tug_of_war >= 1 || state.gamesWon >= 1,
      progressText: `${Math.min(1, state.gamesWonByType.tug_of_war)} / 1 فوز`,
    },
    {
      id: 'grammar_hunter',
      titleAr: 'صائد القواعد',
      titleEn: 'Grammar Hunter',
      descriptionAr: 'إتمام تدريبات القواعد النحوية',
      criteriaAr: 'إكمال القواعد في وحدة دراسية',
      icon: '🎯',
      unlocked:
        grammarCompletedCount >= 1 ||
        legacyBadges.includes('grammar_champion'),
      progressText: `${Math.min(1, grammarCompletedCount)} / 1 وحدة`,
    },
    {
      id: 'penalty_striker',
      titleAr: 'هداف الجزاء',
      titleEn: 'Shootout Striker',
      descriptionAr: 'تحقيق الفوز في بطولة ضربات الجزاء التعليمية',
      criteriaAr: 'الفوز في ضربات الجزاء',
      icon: '⚽',
      unlocked: state.gamesWonByType.shootout >= 1,
      progressText: `${Math.min(1, state.gamesWonByType.shootout)} / 1 فوز`,
    },
    {
      id: 'bowling_king',
      titleAr: 'ملك البولينج',
      titleEn: 'Bowling Champion',
      descriptionAr: 'إتمام بطولة البولينج وتحقيق نتيجة متميزة',
      criteriaAr: 'إكمال بطولة البولينج',
      icon: '🎳',
      unlocked: state.gamesWonByType.bowling >= 1,
      progressText: `${Math.min(1, state.gamesWonByType.bowling)} / 1 بطولة`,
    },
    {
      id: 'vocab_star',
      titleAr: 'نجم المفردات',
      titleEn: 'Vocabulary Star',
      descriptionAr: 'حفظ 5 كلمات أو أكثر في بنك كلماتي للمراجعة',
      criteriaAr: 'حفظ 5 كلمات في بنك كلماتي',
      icon: '📚',
      unlocked: wordBankCount >= 5,
      progressText: `${Math.min(5, wordBankCount)} / 5 كلمات`,
    },
    {
      id: 'curriculum_explorer',
      titleAr: 'مستكشف المناهج',
      titleEn: 'Unit Master',
      descriptionAr: 'إكمال جميع أقسام وحدة دراسية كاملة بنسبة 100%',
      criteriaAr: 'إنهاء وحدة دراسية كاملة (100%)',
      icon: '🏰',
      unlocked: fullUnitsCompletedCount >= 1,
      progressText: `${Math.min(1, fullUnitsCompletedCount)} / 1 وحدة`,
    },
    {
      id: 'challenge_pro',
      titleAr: 'محترف التحديات',
      titleEn: 'Challenge Pro',
      descriptionAr: 'جمع 500 نقطة XP أو إتمام المهمة اليومية بنجاح',
      criteriaAr: 'الوصول إلى 500 XP أو إكمال المهمة اليومية',
      icon: '👑',
      unlocked: totalXp >= 500 || state.dailyQuest.completed,
      progressText: state.dailyQuest.completed
        ? 'مكتمل'
        : `${Math.min(500, totalXp)} / 500 XP`,
    },
  ];

  let datesChanged = false;
  const nowDate = new Date().toLocaleDateString('ar-EG', {
    month: 'short',
    day: 'numeric',
  });

  const results: AchievementBadgeStatus[] = badgeDefs.map((b) => {
    if (b.unlocked && !state.unlockedBadgeDates[b.id]) {
      state.unlockedBadgeDates[b.id] = nowDate;
      datesChanged = true;
    }
    return {
      ...b,
      unlockedAt: b.unlocked ? state.unlockedBadgeDates[b.id] || nowDate : undefined,
    };
  });

  if (datesChanged) {
    saveLearningState(state);
  }

  return results;
}

/**
 * Resets student learning progress safely without deleting curriculum data
 */
export function resetStudentLearningProgress(): LearningState {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(LEARNING_STATE_KEY);
      localStorage.removeItem('englimensh_arcade_progress_v2');
      localStorage.removeItem('englimensh_local_leaderboard_v1');
      localStorage.removeItem('egypt_moe_student_progress_v2');

      const currentStd = getStoredStudent();
      if (currentStd) {
        saveStudent({
          ...currentStd,
          totalScore: 0,
          gamesPlayed: 0,
          highStreak: 1,
          badges: ['first_step'],
          examHistory: [],
        });
      }
    } catch (e) {
      console.error('[learningStore] Error resetting progress:', e);
    }
  }
  return loadLearningState();
}
