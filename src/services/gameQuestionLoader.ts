/**
 * gameQuestionLoader.ts — Dynamic Local Question Loader & Bank Analytics
 * Author & System Architect: Mohammad El-Menshawy (محمد المنشاوي)
 */

import rawQuestionBank from '../data/games/questionBank.json';
import {
  BankQuestion,
  QuestionFilterCriteria,
  QuestionBankData,
  GameStage,
  GameDifficulty,
  GameFocusArea
} from '../types/gameQuestions.ts';
import { allCurriculaUnits } from '../data/masterCurriculumDatabase.ts';
import {
  allUnits,
  secondary2GeneralUnits,
  secondary3GeneralUnits
} from '../data/allUnits.ts';

const questionBankData: QuestionBankData = Array.isArray(rawQuestionBank)
  ? { schemaVersion: 2, questions: rawQuestionBank as unknown as BankQuestion[] }
  : (rawQuestionBank as unknown as QuestionBankData);

/**
 * Fisher-Yates array shuffle.
 */
function shuffle<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Normalizes absolute grades (7-9 for Prep, 10-12 for Secondary) to stage-relative grades (1-6 Primary, 1-3 Prep, 1-3 Secondary).
 */
export function normalizeRelativeGrade(stage: GameStage, rawGrade: number): number {
  if (stage === 'intermediate' && rawGrade >= 7) {
    return rawGrade - 6;
  }
  if (stage === 'secondary' && rawGrade >= 10) {
    return rawGrade - 9;
  }
  return rawGrade || 1;
}

/**
 * Normalizes questions from the master curriculum database into the BankQuestion format
 * for additional verified curriculum depth.
 */
function getSupplementalCurriculumQuestions(): BankQuestion[] {
  const supplemental: BankQuestion[] = [];
  const seenIds = new Set<string>();

  // 1. Convert allCurriculaUnits (Primary 1-6, Preparatory 1-3, Secondary 1-3)
  allCurriculaUnits.forEach((u) => {
    if (u.unitExam && u.unitExam.questions) {
      const stage: GameStage =
        u.stage === 'Primary' ? 'primary' : u.stage === 'Preparatory' ? 'intermediate' : 'secondary';
      const relativeGrade = normalizeRelativeGrade(stage, u.grade || 1);

      u.unitExam.questions.forEach((q, idx) => {
        if (!q.options || q.options.length !== 4) return;
        const id = `supp-curric-${u.stage.toLowerCase()}-g${relativeGrade}-t${u.semester || 1}-u${u.unitNumber}-${q.id || idx}`;
        if (seenIds.has(id)) return;
        seenIds.add(id);

        const letterMap: { [key: string]: string } = { A: 'a', B: 'b', C: 'c', D: 'd' };
        const correctChoiceId = letterMap[q.correctAnswer] || 'a';
        const choices = q.options.map((opt, optIdx) => ({
          id: ['a', 'b', 'c', 'd'][optIdx] || `choice_${optIdx}`,
          text: opt,
        }));

        const difficulty: GameDifficulty =
          q.difficulty === 'hots'
            ? 'hard'
            : stage === 'primary' && relativeGrade <= 3
            ? 'easy'
            : 'medium';

        supplemental.push({
          id,
          curriculum: 'egyptian',
          stage,
          grade: relativeGrade,
          term: u.semester || 1,
          textbookSeries: u.textbookSeries || u.track,
          unit: `Unit ${u.unitNumber}: ${u.unitTitle}`,
          focus: q.skill === 'Vocabulary' ? 'vocabulary' : 'grammar',
          difficulty,
          verificationStatus: u.verificationStatus || q.verificationStatus || 'verified',
          sourceReference: u.sourceReference || q.sourceReference,
          question: q.question,
          choices,
          correctChoiceId,
          explanation: q.explanation || 'الإجابة النموذجية المعتمدة وفقاً لمنهج وزارة التربية والتعليم.',
          explanationAr: q.explanationAr,
          tags: ['curriculum_verified', stage, `grade_${relativeGrade}`],
          estimatedSeconds: stage === 'primary' ? 9 : 11,
        });
      });
    }
  });

  // 2. Convert Secondary 1, 2, 3 Exam Booklets
  const secondaryUnitGroups = [
    { units: allUnits, relativeGrade: 1, series: 'General Secondary 1 (2026/2027)' },
    { units: secondary2GeneralUnits, relativeGrade: 2, series: 'General Secondary 2' },
    { units: secondary3GeneralUnits, relativeGrade: 3, series: 'General Secondary 3' }
  ];

  secondaryUnitGroups.forEach(({ units, relativeGrade, series }) => {
    units.forEach((unit) => {
      unit.exams.forEach((exam) => {
        if (exam.mcqs) {
          exam.mcqs.forEach((mcq, idx) => {
            if (mcq.type === 'single' && mcq.options && mcq.options.length === 4) {
              const id = `supp-sec-g${relativeGrade}-u${unit.id}-l${exam.level || 1}-${mcq.id || idx}`;
              if (seenIds.has(id)) return;
              seenIds.add(id);

              const rawCorrectIndex =
                mcq.correctAnswers && mcq.correctAnswers[0] !== undefined ? mcq.correctAnswers[0] : 0;
              const correctChoiceId = ['a', 'b', 'c', 'd'][rawCorrectIndex] || 'a';
              const choices = mcq.options.map((opt, optIdx) => ({
                id: ['a', 'b', 'c', 'd'][optIdx],
                text: opt,
              }));

              supplemental.push({
                id,
                curriculum: 'egyptian',
                stage: 'secondary',
                grade: relativeGrade,
                term: 1,
                textbookSeries: series,
                unit: `Unit ${unit.id}: ${unit.title}`,
                focus: mcq.skill?.toLowerCase().includes('vocab') ? 'vocabulary' : 'grammar',
                difficulty: mcq.difficulty === 'hots' || (exam.level && exam.level >= 3) ? 'hard' : 'medium',
                verificationStatus: 'verified',
                sourceReference: `Egyptian MOE ${series}, Unit ${unit.id} (${unit.title})`,
                question: mcq.question,
                questionAr: mcq.questionAr,
                choices,
                correctChoiceId,
                explanation: mcq.explanation || 'إجابة مصادق عليها وفقاً للتوجيه العام للغة الإنجليزية.',
                explanationAr: mcq.explanationAr,
                tags: [`secondary_${relativeGrade}`, 'exam_booklet'],
                estimatedSeconds: 12,
              });
            }
          });
        }
      });
    });
  });

  return supplemental;
}

// Cached pool combining local JSON question bank + verified supplemental curriculum questions
let allQuestionsCache: BankQuestion[] | null = null;

export function getAllAvailableQuestions(): BankQuestion[] {
  if (!allQuestionsCache) {
    const fromJson = questionBankData.questions || [];
    const fromSupplemental = getSupplementalCurriculumQuestions();
    allQuestionsCache = [...fromJson, ...fromSupplemental];
  }
  return allQuestionsCache;
}

/**
 * Loads a set of curriculum questions based on filter criteria, excluding previous session IDs.
 */
export function loadGameQuestions(criteria: QuestionFilterCriteria = {}): BankQuestion[] {
  const {
    curriculum = 'egyptian',
    stage = 'all',
    grade,
    unit,
    focus = 'mixed',
    difficulty,
    limit = 10,
    excludeIds = [],
  } = criteria;

  const allQuestions = getAllAvailableQuestions();
  const excludeSet = new Set(excludeIds);

  const normalizedRequestedGrade =
    grade && stage !== 'all' ? normalizeRelativeGrade(stage, grade) : grade;

  const matchesCoreCriteria = (q: BankQuestion, strictDifficulty: boolean, strictFocus: boolean) => {
    if (curriculum && q.curriculum !== curriculum && q.curriculum !== 'general') {
      return false;
    }
    if (stage !== 'all' && q.stage !== stage) {
      return false;
    }
    if (normalizedRequestedGrade && q.grade !== normalizedRequestedGrade) {
      return false;
    }
    if (unit && q.unit && !q.unit.toLowerCase().includes(unit.toLowerCase())) {
      return false;
    }
    if (strictFocus && focus && focus !== 'mixed' && q.focus !== focus) {
      return false;
    }
    if (strictDifficulty && difficulty && q.difficulty !== difficulty) {
      return false;
    }
    return true;
  };

  // Pass 1: Strict match excluding previously seen IDs
  let candidatePool = allQuestions.filter(
    (q) => !excludeSet.has(q.id) && matchesCoreCriteria(q, true, true)
  );

  // Pass 2: Strict match allowing previously seen IDs if pool < limit
  if (candidatePool.length < limit) {
    const fullStrict = allQuestions.filter((q) => matchesCoreCriteria(q, true, true));
    if (fullStrict.length > candidatePool.length) {
      candidatePool = fullStrict;
    }
  }

  // Pass 3: Relax difficulty filter within the same stage & grade if still < limit
  if (candidatePool.length < limit) {
    const relaxedDifficulty = allQuestions.filter((q) => matchesCoreCriteria(q, false, true));
    if (relaxedDifficulty.length > candidatePool.length) {
      candidatePool = relaxedDifficulty;
    }
  }

  // Pass 4: Relax focus filter within the same stage & grade if still < limit
  if (candidatePool.length < limit) {
    const relaxedFocus = allQuestions.filter((q) => matchesCoreCriteria(q, false, false));
    if (relaxedFocus.length > candidatePool.length) {
      candidatePool = relaxedFocus;
    }
  }

  return shuffle(candidatePool).slice(0, limit);
}

/**
 * Returns exact Question Bank coverage metrics for reporting and diagnostics.
 */
export function getQuestionBankStats() {
  const all = getAllAvailableQuestions();
  const byStage = {
    primary: all.filter((q) => q.stage === 'primary').length,
    intermediate: all.filter((q) => q.stage === 'intermediate').length,
    secondary: all.filter((q) => q.stage === 'secondary').length,
  };

  const byFocus = {
    vocabulary: all.filter((q) => q.focus === 'vocabulary').length,
    grammar: all.filter((q) => q.focus === 'grammar').length,
    spelling: all.filter((q) => q.focus === 'spelling').length,
  };

  const byDifficulty = {
    easy: all.filter((q) => q.difficulty === 'easy').length,
    medium: all.filter((q) => q.difficulty === 'medium').length,
    hard: all.filter((q) => q.difficulty === 'hard').length,
  };

  return {
    totalQuestions: all.length,
    jsonBankQuestions: (questionBankData.questions || []).length,
    supplementalVerifiedQuestions: all.length - (questionBankData.questions || []).length,
    byStage,
    byFocus,
    byDifficulty,
  };
}
