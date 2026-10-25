export type EducationalStage = 'Primary' | 'Preparatory' | 'Secondary';

export type SecondaryTrackPath = 'general_secondary' | 'egyptian_baccalaureate';

export type CurriculumTrack = 
  | 'National / Baccalaureate' 
  | 'Connect' 
  | 'Connect Plus' 
  | 'New Hello' 
  | 'Egyptian Baccalaureate' 
  | 'General Secondary';

export type QuestionSkill = 'Vocabulary' | 'Grammar' | 'Reading' | 'Listening';

export interface CurriculumQuestion {
  id: string;
  skill: QuestionSkill;
  question_type?: 'mcq' | 'short_answer' | 'essay' | 'reading_comprehension';
  difficulty?: 'standard' | 'hots';
  question: string;
  options: [string, string, string, string];
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  explanationAr?: string;
  exam_trap_explanation?: string;
  examTrapExplanationAr?: string;
}

export interface VocabularyWord {
  word: string;
  pos?: string; // "n. / v. / adj. / adv. / idiom"
  partOfSpeech?: string;
  ar?: string; // المعنى باللغة العربية
  meaningAr?: string;
  def?: string; // Accessible grade-appropriate English definition
  meaningEn?: string;
  ex?: string; // Authentic contextual sentence
  exampleSentence?: string;
  exAr?: string; // ترجمة الجملة إلى العربية
  collocation?: string;
  synonym?: string;
  antonym?: string;
}

export interface CollocationItem {
  phrase: string;
  meaningAr: string;
  example: string;
  exampleAr?: string;
}

export interface IdiomExpression {
  idiom: string;
  meaningEn: string;
  meaningAr: string;
  example: string;
}

export interface LiteratureWord {
  word: string;
  pos: string; // "n.", "v.", "adj.", "idiom"
  meaningEn: string;
  meaningAr: string;
  contextSentence?: string;
}

export interface LiteratureHOTSQuestion {
  id: string;
  question: string;
  questionAr?: string;
  focusTheme: string; // e.g. "Pride vs. Humility", "Tragic Flaw & Betrayal", "Social Class & Integrity"
  quotation?: string;
  modelAnswer: string;
  modelAnswerAr?: string;
  rubricCriteria: string[];
}

export interface LiteratureChapterModule {
  workTitle: string; // "The Old Man and the Sea" | "King Lear" | "Great Expectations"
  workTitleAr: string;
  author: string;
  chapterNumber: number; // or Act number
  chapterTitle: string;
  chapterTitleAr: string;
  keyVocabulary: LiteratureWord[]; // 8-10 essential literary terms
  synopsis: string;
  synopsisAr: string;
  centralThemes: { theme: string; themeAr: string; explanation: string }[];
  hotsQuestions: LiteratureHOTSQuestion[]; // 2-3 HOTS questions
}

export interface VocabularyModule {
  keyWords: VocabularyWord[];
  collocations: CollocationItem[];
  idiomsAndExpressions?: IdiomExpression[];
  exercises: CurriculumQuestion[];
}

export interface GrammarRuleSection {
  title: string;
  explanation: string;
  examples: string[];
}

export interface GrammarModule {
  ruleName: string;
  ruleNameAr?: string;
  explanationSummary: string;
  detailedRules: GrammarRuleSection[];
  exercises: CurriculumQuestion[];
}

export interface ReadingQuestion extends CurriculumQuestion {
  skill: 'Reading';
}

export interface ReadingModule {
  passageTitle: string;
  passage: string;
  wordCount?: number;
  criticalThinkingFocus?: string;
  questions: CurriculumQuestion[]; // 5 HOTS questions
}

export interface ListeningModule {
  audioTitle: string;
  speakerRoles: string;
  transcript: string;
  durationApprox?: string;
  questions?: CurriculumQuestion[];
  exercises?: CurriculumQuestion[];
}

export interface PrepDialogueTurn {
  speaker: string;
  text?: string;
  isBlank: boolean;
  blankNumber?: number; // 1 to 5
  expectedAnswer?: string;
  acceptableAnswers?: string[];
  hintAr?: string;
}

export interface PrepDialogue {
  title: string;
  context: string;
  turns: PrepDialogueTurn[];
}

export interface PrepOpenEndedQuestion {
  id: string;
  question: string;
  questionAr?: string;
  modelAnswer: string;
  rubric: string;
  maxMarks: number;
}

export interface PrepErrorCorrectionItem {
  id: string;
  sentence: string;
  bracketWord: string;
  correctWord: string;
  explanation: string;
  explanationAr?: string;
  exam_trap_explanation?: string;
}

export interface PrepWritingTask {
  type: 'paragraph' | 'email';
  title: string;
  prompt: string;
  promptAr?: string;
  targetWords: string;
  guidancePoints?: string[];
  modelAnswer: string;
  rubricCriteria: { criterion: string; marks: number }[];
}

export interface PrepExamBlueprint {
  dialogue: PrepDialogue;
  readingPassage: {
    title: string;
    passage: string;
    mcqs: CurriculumQuestion[];
    openEnded: PrepOpenEndedQuestion[];
  };
  vocabGrammarMcqs: CurriculumQuestion[];
  errorCorrection: PrepErrorCorrectionItem[];
  writingTask: PrepWritingTask;
}

export interface UnitExam {
  examId: string;
  examTitle: string;
  examTitleAr?: string;
  durationMinutes: number; // 30 minutes
  totalMarks: number;
  questions: CurriculumQuestion[];
  stage?: EducationalStage;
  prepBlueprint?: PrepExamBlueprint;
}

export interface UnitCurriculum {
  stage: EducationalStage;
  grade: number; // 1-6 for Primary, 7-9 for Prep, 10-12 for Sec
  gradeLabel: string; // e.g. "Secondary 1 - الصف الأول الثانوي"
  track: CurriculumTrack;
  secondaryPath?: SecondaryTrackPath;
  semester: 1 | 2;
  unitNumber: number;
  unitTitle: string;
  unitTitleAr: string;
  theme: string;
  vocabularyModule: VocabularyModule;
  grammarModule: GrammarModule;
  readingModule: ReadingModule;
  listeningModule: ListeningModule;
  unitExam: UnitExam;
  literatureModule?: LiteratureChapterModule;
}

export interface GradeCurriculumCatalog {
  stage: EducationalStage;
  grade: number;
  gradeLabel: string;
  gradeLabelAr: string;
  track: CurriculumTrack;
  secondaryPath?: SecondaryTrackPath;
  description: string;
  semesters: {
    semester: 1 | 2;
    semesterLabel: string;
    units: UnitCurriculum[];
    revisionTitle?: string;
    revisionExam?: UnitExam;
  }[];
}

export interface MasterCurriculumDatabase {
  curricula: UnitCurriculum[];
  stageCatalogs: GradeCurriculumCatalog[];
}
