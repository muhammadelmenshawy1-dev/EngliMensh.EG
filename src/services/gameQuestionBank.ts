import rawQuestionBank from '../data/games/questionBank.json';
import {
  allUnits,
  secondary2GeneralUnits,
  secondary3GeneralUnits,
  governmentalExams
} from '../data/allUnits.ts';
import { VOCABULARY_DECKS } from '../data/vocabularyDecks.ts';
import { allCurriculaUnits } from '../data/masterCurriculumDatabase.ts';
import { QuestionMCQ } from '../types.ts';
import { CurriculumQuestion, EducationalStage } from '../types/curriculum.ts';
import { BankQuestion, QuestionBankData, GameDifficulty, GameFocusArea } from '../types/gameQuestions.ts';

export interface GameQuestion {
  id: string;
  question: string;
  questionAr?: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
  explanationAr?: string;
  examTrapExplanation?: string;
  skill?: string;
  unitId?: number;
  stage?: EducationalStage;
  grade?: number;
  difficulty?: GameDifficulty;
}

export interface QuestionFilterOptions {
  stage?: EducationalStage | 'All';
  grade?: number; // Primary 1-6, Prep 1-3 (or 7-9), Sec 1-3 (or 10-12)
  unitId?: number; // 0 for All Units, 1-12
  category?: 'all' | 'vocabulary' | 'grammar' | 'spelling' | 'exam_traps';
  difficulty?: GameDifficulty;
  focus?: GameFocusArea;
  limit?: number;
}

const questionBankData: QuestionBankData = Array.isArray(rawQuestionBank)
  ? { schemaVersion: 2, questions: rawQuestionBank as unknown as BankQuestion[] }
  : (rawQuestionBank as unknown as QuestionBankData);

/**
 * Randomize array order using Fisher-Yates algorithm
 */
function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function matchesGrade(stage: EducationalStage, unitGrade: number, filterGrade?: number): boolean {
  if (!filterGrade) return true;
  if (unitGrade === filterGrade) return true;
  if (stage === 'Preparatory' && unitGrade >= 7 && unitGrade - 6 === filterGrade) return true;
  if (stage === 'Secondary' && unitGrade >= 10 && unitGrade - 9 === filterGrade) return true;
  return false;
}

/**
 * Normalizes a BankQuestion from questionBank.json into GameQuestion format.
 */
export function normalizeBankQuestion(bq: BankQuestion): GameQuestion | null {
  if (!bq || !bq.question || !bq.choices || bq.choices.length < 2) {
    return null;
  }

  const origChoices = [...bq.choices];
  const correctChoice = origChoices.find((c) => c.id === bq.correctChoiceId) || origChoices[0];
  const shuffledChoices = shuffleArray(origChoices);
  const newCorrectIndex = shuffledChoices.findIndex((c) => c.id === correctChoice.id);

  const stageMap: Record<string, EducationalStage> = {
    primary: 'Primary',
    intermediate: 'Preparatory',
    secondary: 'Secondary'
  };

  const unitMatch = bq.unit?.match(/Unit\s+(\d+)/i);
  const parsedUnitId = unitMatch ? parseInt(unitMatch[1], 10) : 1;

  return {
    id: bq.id,
    question: bq.question,
    questionAr: bq.questionAr,
    options: shuffledChoices.map((c) => c.text),
    correctIndex: newCorrectIndex >= 0 ? newCorrectIndex : 0,
    explanation: bq.explanation,
    explanationAr: bq.explanationAr,
    skill:
      bq.focus === 'vocabulary'
        ? 'Vocabulary'
        : bq.focus === 'spelling'
        ? 'Spelling'
        : 'Grammar',
    unitId: parsedUnitId,
    stage: stageMap[bq.stage] || 'Secondary',
    grade: bq.grade,
    difficulty: bq.difficulty
  };
}

/**
 * Normalizes an MCQ question from secondary exams and randomizes its options while preserving correct answer index.
 */
export function normalizeMCQQuestion(
  mcq: QuestionMCQ,
  fallbackUnitId: number = 1,
  grade: number = 10
): GameQuestion | null {
  if (!mcq || !mcq.question || !mcq.options || mcq.options.length < 2) {
    return null;
  }

  const rawCorrectIndex =
    mcq.correctAnswers && mcq.correctAnswers.length > 0 ? mcq.correctAnswers[0] : 0;
  const originalOptions = [...mcq.options];
  const correctAnswerText = originalOptions[rawCorrectIndex] || originalOptions[0];

  const shuffledOptions = shuffleArray(originalOptions);
  const newCorrectIndex = shuffledOptions.indexOf(correctAnswerText);

  return {
    id: mcq.id || `q_${Math.random().toString(36).substring(2, 9)}`,
    question: mcq.question,
    questionAr: mcq.questionAr,
    options: shuffledOptions,
    correctIndex: newCorrectIndex >= 0 ? newCorrectIndex : 0,
    explanation:
      mcq.explanation ||
      'الإجابة الصحيحة وفقاً لدليل المعلم والتوجيه الفني لوزارة التربية والتعليم.',
    explanationAr: mcq.explanationAr,
    examTrapExplanation: mcq.exam_trap_explanation,
    skill: mcq.skill || 'Grammar & Vocabulary',
    unitId: fallbackUnitId,
    stage: 'Secondary',
    grade,
    difficulty: mcq.difficulty === 'hots' ? 'hard' : 'medium'
  };
}

/**
 * Normalizes a CurriculumQuestion from master catalog (Primary, Prep, Sec).
 */
export function normalizeCurriculumQuestion(
  cq: CurriculumQuestion,
  stage?: EducationalStage,
  grade?: number,
  unitId?: number
): GameQuestion | null {
  if (!cq || !cq.question || !cq.options || cq.options.length < 2) {
    return null;
  }

  const letterMap: { [key: string]: number } = { A: 0, B: 1, C: 2, D: 3 };
  const rawCorrectIndex = letterMap[cq.correctAnswer] ?? 0;
  const originalOptions = [...cq.options];
  const correctAnswerText = originalOptions[rawCorrectIndex] || originalOptions[0];

  const shuffledOptions = shuffleArray(originalOptions);
  const newCorrectIndex = shuffledOptions.indexOf(correctAnswerText);

  return {
    id: cq.id || `cq_${Math.random().toString(36).substring(2, 9)}`,
    question: cq.question,
    options: shuffledOptions,
    correctIndex: newCorrectIndex >= 0 ? newCorrectIndex : 0,
    explanation:
      cq.explanation || 'الإجابة النموذجية المعتمدة بشرائح الوزارة للعام الدراسي.',
    explanationAr: cq.explanationAr,
    examTrapExplanation: cq.exam_trap_explanation,
    skill: cq.skill || 'Vocabulary & Grammar',
    unitId: unitId || 1,
    stage: stage || 'Secondary',
    grade: grade || 10,
    difficulty:
      cq.difficulty === 'hots'
        ? 'hard'
        : stage === 'Primary' && (grade || 1) <= 3
        ? 'easy'
        : 'medium'
  };
}

/**
 * Generates plausible orthographic/phonological spelling distractors for a single English vocabulary word.
 */
function buildSpellingDistractors(word: string): [string, string, string] {
  const clean = word.trim();
  const variants = new Set<string>();

  // 1. Vowel swap (e <-> i, a <-> e, o <-> u)
  const vowelSwapped = clean.replace(/[aeiou]/i, (m) => {
    const lower = m.toLowerCase();
    if (lower === 'a') return 'e';
    if (lower === 'e') return 'i';
    if (lower === 'i') return 'e';
    if (lower === 'o') return 'u';
    return 'o';
  });
  if (vowelSwapped.toLowerCase() !== clean.toLowerCase()) variants.add(vowelSwapped);

  // 2. Double a medial consonant or drop a doubled consonant
  const doubleMatch = clean.match(/([bcdfghjklmnpqrstvwxyz])\1/i);
  if (doubleMatch) {
    variants.add(clean.replace(/([bcdfghjklmnpqrstvwxyz])\1/i, '$1'));
  } else if (clean.length >= 4) {
    const midIdx = Math.floor(clean.length / 2);
    variants.add(clean.slice(0, midIdx + 1) + clean[midIdx] + clean.slice(midIdx + 1));
  }

  // 3. Adjacent transposition or silent-e / suffix tweak
  if (clean.endsWith('e') && clean.length > 3) {
    variants.add(clean.slice(0, -1));
  } else {
    variants.add(`${clean}e`);
  }

  // 4. Fallback phonetic substitutions
  variants.add(`${clean}${clean.slice(-1)}`);
  variants.add(clean.length > 3 ? `${clean.slice(0, 2)}${clean[3]}${clean[2]}${clean.slice(4)}` : `${clean}s`);

  const list = Array.from(variants).filter((v) => v.toLowerCase() !== clean.toLowerCase());
  while (list.length < 3) {
    list.push(`${clean}${list.length === 0 ? 'e' : list.length === 1 ? 'n' : 'r'}`);
  }
  return [list[0], list[1], list[2]];
}

/**
 * Retrieves a pool of randomized curriculum questions matching filter options across all stages (Primary, Preparatory, Secondary).
 */
export function getGameQuestions(options: QuestionFilterOptions = {}): GameQuestion[] {
  const {
    stage = 'All',
    grade,
    unitId = 0,
    category = 'all',
    difficulty,
    focus,
    limit = 10
  } = options;
  const normalizedPool: GameQuestion[] = [];

  // 0. Gather verified questions from questionBank.json first
  (questionBankData.questions || []).forEach((bq) => {
    const norm = normalizeBankQuestion(bq);
    if (!norm) return;
    const matchStage = stage === 'All' || norm.stage === stage;
    const matchGrade = matchesGrade(norm.stage || 'Secondary', norm.grade || 1, grade);
    const matchUnit = unitId === 0 || norm.unitId === unitId;
    if (matchStage && matchGrade && matchUnit) {
      normalizedPool.push(norm);
    }
  });

  // 1. Gather from allCurriculaUnits (Primary 1-6, Prep 1-3, Secondary 1-3)
  allCurriculaUnits.forEach((u) => {
    const matchStage = stage === 'All' || u.stage === stage;
    const matchGrade = matchesGrade(u.stage, u.grade, grade);
    const matchUnit = unitId === 0 || u.unitNumber === unitId;

    if (matchStage && matchGrade && matchUnit) {
      if (u.unitExam && u.unitExam.questions) {
        u.unitExam.questions.forEach((q) => {
          const norm = normalizeCurriculumQuestion(q, u.stage, u.grade, u.unitNumber);
          if (norm) normalizedPool.push(norm);
        });
      }

      // Synthesize curriculum-grounded Spelling questions from unit vocabularyModule.keyWords so every stage/grade/unit has rich Spelling coverage
      const unitKeyWords = u.vocabularyModule?.keyWords || [];
      if (unitKeyWords.length > 0) {
        unitKeyWords.slice(0, 4).forEach((kv, kvIdx) => {
          const rawWord = (kv.word || '').trim();
          // Only use single-word alphabetical items for clean spelling assessment
          if (!rawWord || rawWord.includes(' ') || rawWord.length < 3) return;
          const distractors = buildSpellingDistractors(rawWord);
          const choices = shuffleArray([rawWord, ...distractors]);
          const correctIndex = choices.indexOf(rawWord);
          const unitIdent = `${u.stage.toLowerCase()}_g${u.grade}_t${u.semester}_u${u.unitNumber}`;

          normalizedPool.push({
            id: `curr_spl_${unitIdent}_${kvIdx}`,
            question: `Choose the correct English spelling for "${kv.meaningAr}" (${u.unitTitle}):`,
            questionAr: `اختر التهجئة الإملائية الصحيحة لكلمة (${kv.meaningAr}):`,
            options: choices,
            correctIndex: correctIndex >= 0 ? correctIndex : 0,
            explanation: `The correct spelling in ${u.gradeLabel} (${u.unitTitle}) is "${rawWord}" (${kv.meaningAr}).`,
            explanationAr: `التهجئة الصحيحة للكلمة المقررة بالوحدة هي "${rawWord}" بمعنى (${kv.meaningAr}).`,
            skill: 'Spelling',
            unitId: u.unitNumber,
            stage: u.stage,
            grade: u.grade,
            difficulty:
              u.stage === 'Primary' && u.grade <= 3
                ? 'easy'
                : u.stage === 'Secondary'
                ? 'hard'
                : 'medium'
          });
        });
      }
    }
  });

  // 2. Gather from Secondary 1, 2, 3 exam booklets if Secondary stage requested
  if (stage === 'All' || stage === 'Secondary') {
    const secGroups = [
      { units: allUnits, gradeNum: 10 },
      { units: secondary2GeneralUnits, gradeNum: 11 },
      { units: secondary3GeneralUnits, gradeNum: 12 }
    ];

    secGroups.forEach(({ units, gradeNum }) => {
      if (!matchesGrade('Secondary', gradeNum, grade)) return;
      units.forEach((unit) => {
        if (unitId === 0 || unit.id === unitId) {
          unit.exams.forEach((exam) => {
            if (exam.mcqs) {
              exam.mcqs.forEach((q) => {
                if (q.type === 'single') {
                  const norm = normalizeMCQQuestion(q, unit.id, gradeNum);
                  if (norm) normalizedPool.push(norm);
                }
              });
            }
          });
        }
      });
    });

    if (!grade || matchesGrade('Secondary', 10, grade)) {
      governmentalExams.forEach((exam) => {
        if (exam.mcqs) {
          exam.mcqs.forEach((q) => {
            if (q.type === 'single') {
              const norm = normalizeMCQQuestion(q, 1, 10);
              if (norm) normalizedPool.push(norm);
            }
          });
        }
      });
    }
  }

  // 3. Fallback to Vocabulary Decks if pool is small
  if (normalizedPool.length < limit) {
    VOCABULARY_DECKS.forEach((deck) => {
      if (unitId === 0 || deck.unitId === unitId) {
        deck.items.forEach((item, idx) => {
          const otherItems = deck.items.filter((i) => i.id !== item.id);
          const distractors = shuffleArray(otherItems)
            .slice(0, 3)
            .map((i) => i.arabic);
          const optionsList = shuffleArray([item.arabic, ...distractors]);

          normalizedPool.push({
            id: `vocab_${deck.unitId}_${idx}`,
            question: `What is the Arabic meaning of the curriculum vocabulary word "${item.english}"?`,
            options: optionsList,
            correctIndex: optionsList.indexOf(item.arabic),
            explanation: `الكلمة الرسمية بالمنهج (${deck.unitTitle}): ${item.english} = ${item.arabic}`,
            skill: 'Vocabulary',
            unitId: deck.unitId,
            stage: 'Secondary',
            grade: 10,
            difficulty: 'medium'
          });
        });
      }
    });
  }

  // Category / Focus Filter
  const effectiveCategory =
    focus && focus !== 'mixed' ? focus : category;

  let filtered = normalizedPool;
  if (effectiveCategory === 'vocabulary') {
    filtered = normalizedPool.filter(
      (q) => q.skill === 'Vocabulary' || q.question.toLowerCase().includes('meaning')
    );
  } else if (effectiveCategory === 'grammar') {
    filtered = normalizedPool.filter(
      (q) => q.skill === 'Grammar' || (!q.question.toLowerCase().includes('meaning') && q.skill !== 'Vocabulary' && q.skill !== 'Spelling')
    );
  } else if (effectiveCategory === 'spelling') {
    filtered = normalizedPool.filter((q) => q.skill === 'Spelling');
  } else if (effectiveCategory === 'exam_traps') {
    filtered = normalizedPool.filter((q) => q.examTrapExplanation);
  }

  if (difficulty) {
    const byDiff = filtered.filter((q) => q.difficulty === difficulty);
    if (byDiff.length >= Math.min(limit, 3)) {
      filtered = byDiff;
    }
  }

  if (filtered.length === 0) {
    filtered = normalizedPool;
  }

  return shuffleArray(filtered).slice(0, limit);
}
