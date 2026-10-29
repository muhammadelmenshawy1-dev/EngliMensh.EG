export type ExamLevel = 1 | 2 | 3 | 4 | 5;

export type QuestionType = 'mcq' | 'short_answer' | 'essay' | 'reading_comprehension';
export type QuestionDifficulty = 'standard' | 'hots';
export type ExamTrackType = 'general_secondary' | 'baccalaureate';

export interface QuestionMCQ {
  id: string;
  type: 'single' | 'mrq' | 'rewrite';
  question_type?: QuestionType;
  difficulty?: QuestionDifficulty;
  question: string;
  questionAr?: string;
  options: string[];
  correctAnswers: number[]; // index of correct options
  explanation: string;
  explanationAr?: string;
  exam_trap_explanation?: string; // High-yield Ministry Exam Trap Rationale
  examTrapExplanationAr?: string;
  sourceExam?: string;
  points: number;
  skill?: 'Vocabulary' | 'Grammar' | 'Reading' | 'Listening' | 'Literature' | 'Translation' | 'Writing' | string;
}

export interface DualPassagePerspective {
  title: string;
  perspective: string; // e.g., 'Passage A: Empirical / Positivist Paradigm'
  text: string;
  wordCount?: number;
}

export interface ReadingSection {
  passageTitle: string;
  passageTitleAr?: string;
  passageText: string;
  passageType?: 'factual' | 'narrative' | 'analytical' | 'dual_synthesis';
  secondaryPassage?: DualPassagePerspective; // For Baccalaureate dual-text comparative synthesis
  wordCount?: number;
  questions: QuestionMCQ[];
}

export interface TranslationQuestion {
  id: string;
  direction: 'en-to-ar' | 'ar-to-en';
  sourceText: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  exam_trap_explanation?: string;
}

export interface StoryQuestion {
  id: string;
  chapter: number;
  question: string;
  questionAr?: string;
  question_type?: 'short_answer' | 'hots';
  difficulty?: QuestionDifficulty;
  modelAnswer: string;
  keyCriteria: string[];
  maxMarks: number;
}

export interface WritingTask {
  type: 'essay' | 'descriptive_essay' | 'formal_email' | 'informal_email' | 'cv_resume';
  title: string;
  prompt: string;
  wordCountTarget: string;
  rubric: {
    ideas: number;
    grammarVocab: number;
    organization: number;
    mechanics: number;
  };
  sampleOutline: string[];
  modelResponse: string;
}

export interface AcademicResearchTask {
  title: string;
  thesisPrompt: string;
  evidenceData: string;
  citationPrompt: string;
  modelDefense: string;
  maxMarks?: number;
}

export interface Exam {
  id: string;
  unitId: number;
  trackType?: ExamTrackType; // 'general_secondary' | 'baccalaureate'
  grade?: number; // 10 | 11 | 12
  level: ExamLevel;
  levelTitle: string;
  levelTitleAr: string;
  durationMinutes: number;
  totalMarks: number;
  mcqWeightPercent?: number; // Official MOE: 85% for General Secondary
  writtenWeightPercent?: number; // Official MOE: 15% for General Secondary
  mcqs: QuestionMCQ[];
  governorate?: string;
  term?: 1 | 2;
  category?: 'unit_level' | 'governmental' | 'term_revision';
  reading?: ReadingSection;
  readingPassages?: ReadingSection[]; // Support for 2 unseen passages in MOE mocks
  translation?: TranslationQuestion[];
  storyQuestions?: StoryQuestion[];
  writingTask?: WritingTask;
  academicResearchTask?: AcademicResearchTask;
}

export interface UnitInfo {
  id: number;
  title: string;
  titleAr: string;
  theme: string;
  grammarFocus: string;
  novelChapter: string;
  exams: Exam[];
}

export interface StudentProgress {
  [unitId: number]: {
    [level: number]: {
      unlocked: boolean;
      completed: boolean;
      bestScore: number;
      percentage: number;
      lastAttemptDate?: string;
    };
  };
}

export interface EssayEvaluation {
  ideasScore: number;
  grammarVocabScore: number;
  organizationScore: number;
  mechanicsScore: number;
  totalScore: number;
  maxScore: number;
  feedback: string;
  correctedSentences: { original: string; corrected: string; explanation: string }[];
  modelAnswer: string;
}

export interface StoryEvaluation {
  score: number;
  maxScore: number;
  criticalDepth: string;
  factualAlignment: string;
  feedback: string;
  modelAnswer: string;
}

export type MainAppTab = 'home' | 'curricula' | 'exams' | 'translator' | 'dictionary' | 'games' | 'leaderboard' | 'profile' | 'teacher' | 'tools';

export interface ExamHistoryRecord {
  id: string;
  examId: string;
  examTitle: string;
  category?: string;
  unitId?: number;
  score: number;
  maxMarks: number;
  percentage: number;
  completedAt: string;
  teacherFeedback?: string;
  subjectiveScore?: number;
  isGradedByTeacher?: boolean;
}

export interface BadgeDefinition {
  id: string;
  title: string;
  titleAr: string;
  description: string;
  icon: string;
  requiredPoints?: number;
}

export interface StudentProfile {
  id: string;
  name: string;
  email?: string;
  role?: 'student' | 'teacher';
  grade: string;
  school: string;
  group: string;
  totalScore: number;
  badges: string[];
  lastActive: string;
  createdAt: string;
  examHistory: ExamHistoryRecord[];
  gamesPlayed: number;
  highStreak: number;
  avatarUrl?: string;
}

export interface SubjectiveSubmission {
  id: string;
  studentId: string;
  studentName: string;
  studentGrade: string;
  studentGroup: string;
  examId: string;
  examTitle: string;
  type: 'story' | 'essay';
  questionId: string;
  questionPrompt: string;
  studentResponse: string;
  maxScore: number;
  awardedScore?: number;
  teacherFeedback?: string;
  status: 'pending' | 'graded';
  submittedAt: string;
  gradedAt?: string;
}

export interface VocabularyItem {
  id: string;
  english: string;
  arabic: string;
  unit: number;
  partOfSpeech?: string;
  example?: string;
}
