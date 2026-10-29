/**
 * GameQuestions.ts — Curriculum-Driven Arcade Types & Schemas
 * Author & System Architect: Mohammad El-Menshawy (محمد المنشاوي)
 */

export type CurriculumSystem = 'egyptian' | 'saudi' | 'general';
export type GameStage = 'primary' | 'intermediate' | 'secondary';
export type GameFocusArea = 'vocabulary' | 'grammar' | 'spelling' | 'mixed';
export type GameDifficulty = 'easy' | 'medium' | 'hard';
export type ArcadeGameType = 'shootout' | 'tug_of_war' | 'bowling' | 'word_match';
export type ArcadeDifficulty = 'easy' | 'standard' | 'advanced' | 'hots';

export interface GameChoice {
  id: string; // 'a' | 'b' | 'c' | 'd'
  text: string;
  textAr?: string;
}

export interface BankQuestion {
  id: string;
  curriculum: CurriculumSystem;
  stage: GameStage;
  grade: number; // Primary 1-6, Prep/Intermediate 1-3, Secondary 1-3
  unit?: string;
  textbookSeries?: string;
  term?: 1 | 2;
  lesson?: number | string;
  focus: 'vocabulary' | 'grammar' | 'spelling';
  difficulty: GameDifficulty;
  question: string;
  questionAr?: string;
  choices: GameChoice[];
  correctChoiceId: string;
  explanation: string;
  explanationAr?: string;
  tags?: string[];
  estimatedSeconds?: number;
  verificationStatus?: 'verified' | 'corrected_pending_verification' | 'curriculum_aligned' | 'unverified';
  sourceReference?: string;
  learningObjective?: string;
}

export interface QuestionBankData {
  schemaVersion: number;
  questions: BankQuestion[];
}

export interface QuestionFilterCriteria {
  curriculum?: CurriculumSystem;
  stage?: GameStage | 'all';
  grade?: number;
  unit?: string;
  focus?: GameFocusArea;
  difficulty?: GameDifficulty;
  limit?: number;
  excludeIds?: string[];
}

export interface AnswerRecord {
  questionId: string;
  question: string;
  questionAr?: string;
  selectedChoiceId: string;
  selectedChoiceText: string;
  correctChoiceId: string;
  correctChoiceText: string;
  isCorrect: boolean;
  explanation: string;
  explanationAr?: string;
  responseSeconds: number;
}

export interface SessionResult {
  gameId: 'shoot_and_score' | 'tug_of_words' | 'bowling_championship' | 'quick_match';
  gameTitle: string;
  curriculum: CurriculumSystem;
  stage: GameStage;
  grade: number;
  difficulty: GameDifficulty;
  focus: GameFocusArea;
  totalScore: number;
  basePoints: number;
  comboBonus: number;
  gamePoints: number;
  totalQuestions: number;
  correctCount: number;
  incorrectCount: number;
  accuracyPercent: number;
  highestStreak: number;
  maxMultiplier: number;
  starsAwarded: 1 | 2 | 3;
  durationSeconds: number;
  answers: AnswerRecord[];
  timestamp: string;
}

export interface LeaderboardRecord {
  id: string;
  studentId: string;
  studentName: string;
  gameId: string;
  gameTitle: string;
  score: number;
  stars: number;
  accuracy: number;
  durationSeconds: number;
  stage: GameStage;
  grade: number;
  difficulty: GameDifficulty;
  date: string;
}

export interface ArcadeStudentProgress {
  version: number;
  studentId: string;
  studentName: string;
  totalGamesPlayed: number;
  totalCorrect: number;
  totalIncorrect: number;
  totalStars: number;
  totalArcadeScore: number;
  highestCombo: number;
  bestScores: {
    shoot_and_score?: number;
    tug_of_words?: number;
    bowling_championship?: number;
    quick_match?: number;
  };
  bestStars: {
    shoot_and_score?: number;
    tug_of_words?: number;
    bowling_championship?: number;
    quick_match?: number;
  };
  completedTiers: {
    [key: string]: boolean; // e.g. "secondary-1-easy": true
  };
  lastPlayedAt: string;
}
