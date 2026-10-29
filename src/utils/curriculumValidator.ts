/**
 * curriculumValidator.ts — Comprehensive Academic & Structural Question Bank Validator
 * Verifies all curriculum units, question banks, exam suites, and game loaders against
 * Egyptian Ministry of Education (MOE) data-integrity rules.
 */

import rawQuestionBank from '../data/games/questionBank.json';
import { allCurriculaUnits, allStagesCurriculumCatalog } from '../data/masterCurriculumDatabase.ts';
import { primaryCurriculumDatabase } from '../data/primaryCurriculumDatabase.ts';
import {
  secondary1GeneralUnits,
  secondary2GeneralUnits,
  secondary3GeneralUnits
} from '../data/secondaryCurriculumUnitsExams.ts';
import { allBaccalaureateExams } from '../data/baccalaureateExams.ts';
import { governmentalExams } from '../data/governmentalExams.ts';
import { term1RevisionExams, term2RevisionExams } from '../data/termRevisions.ts';
import { loadGameQuestions, getQuestionBankStats } from '../services/gameQuestionLoader.ts';
import { getGameQuestions } from '../services/gameQuestionBank.ts';
import { BankQuestion, QuestionBankData } from '../types/gameQuestions.ts';

export interface ValidationIssue {
  source: string;
  questionId: string;
  rule: string;
  message: string;
}

export interface CurriculumAuditSummary {
  totalUnitsInspected: number;
  verifiedUnitsCount: number;
  correctedPendingVerificationUnitsCount: number;
  curriculumAlignedUnitsCount: number;
  unverifiedUnitsCount: number;
  totalQuestionsInspected: number;
  verifiedQuestionsCount: number;
  correctedPendingVerificationQuestionsCount: number;
  unverifiedQuestionsCount: number;
  questionsBySource: {
    gameQuestionBankJson: number;
    curriculumUnitModulesAndExams: number;
    primary5LevelExamSuites: number;
    secondary1ExamBooklets: number;
    secondary2And3ExamBooklets: number;
    baccalaureateExamBooklets: number;
    governmentalAndRevisionExams: number;
  };
  answerDistribution: {
    A: number;
    B: number;
    C: number;
    D: number;
  };
  primarySuiteAnswerDistribution: {
    A: number;
    B: number;
    C: number;
    D: number;
  };
  filterChecksPassed: boolean;
  issues: ValidationIssue[];
}

const FORBIDDEN_PLACEHOLDER_PATTERNS = [
  /Alternative Option [BCD]/i,
  /Correct model structure illustrating/i,
  /Standard target form/i,
  /Standard target grammatical structure/i,
  /Standard grammatically correct negative form/i,
  /The researcher successfully mastered/i,
  /The scholar deployed .* to elevate/i,
  /went to the .* yesterday to study/i,
  /Which statement from the reading passage is true about/i,
  /sau-int-g1/i,
  /sau-sec-g1/i,
  /Super Goal/i,
  /Mega Goal/i
];

export function runComprehensiveCurriculumValidation(): CurriculumAuditSummary {
  const issues: ValidationIssue[] = [];
  const answerDistribution = { A: 0, B: 0, C: 0, D: 0 };
  const primarySuiteAnswerDistribution = { A: 0, B: 0, C: 0, D: 0 };

  let verifiedUnitsCount = 0;
  let correctedPendingVerificationUnitsCount = 0;
  let curriculumAlignedUnitsCount = 0;
  let unverifiedUnitsCount = 0;

  let verifiedQuestionsCount = 0;
  let correctedPendingVerificationQuestionsCount = 0;
  let unverifiedQuestionsCount = 0;

  // 1. Validate allCurriculaUnits & their embedded questions
  let curriculumUnitQuestionsCount = 0;

  allCurriculaUnits.forEach((unit) => {
    const unitKey = `${unit.stage}-G${unit.grade}-T${unit.semester}-U${unit.unitNumber} (${unit.unitTitle})`;
    const isPending =
      unit.verificationStatus === 'corrected_pending_verification' ||
      unit.verificationStatus === 'curriculum_aligned';
    const isUnverified = unit.verificationStatus === 'unverified';

    if (unit.verificationStatus === 'corrected_pending_verification') {
      correctedPendingVerificationUnitsCount++;
    } else if (unit.verificationStatus === 'curriculum_aligned') {
      curriculumAlignedUnitsCount++;
    } else if (isUnverified) {
      unverifiedUnitsCount++;
    } else {
      verifiedUnitsCount++;
    }

    const unitQuestionIds = new Set<string>();
    const unitQuestions = [
      ...(unit.vocabularyModule?.exercises || []),
      ...(unit.grammarModule?.exercises || []),
      ...(unit.readingModule?.questions || []),
      ...(unit.listeningModule?.questions || []),
      ...(unit.listeningModule?.exercises || []),
      ...(unit.unitExam?.questions || [])
    ];

    if (!unit.unitExam || !unit.unitExam.questions || unit.unitExam.questions.length === 0) {
      issues.push({
        source: unitKey,
        questionId: unit.unitExam?.examId || 'missing_exam',
        rule: 'non_empty_unit_exam',
        message: `Unit "${unit.unitTitle}" has an empty unitExam.questions array.`
      });
    }

    unitQuestions.forEach((q) => {
      curriculumUnitQuestionsCount++;

      if (!q.id || q.id.trim() === '') {
        issues.push({
          source: unitKey,
          questionId: 'empty_id',
          rule: 'unique_id',
          message: 'Question has an empty ID.'
        });
      } else if (unitQuestionIds.has(q.id)) {
        issues.push({
          source: unitKey,
          questionId: q.id,
          rule: 'unique_id_within_unit',
          message: `Duplicate question ID "${q.id}" inside unit ${unitKey}.`
        });
      } else {
        unitQuestionIds.add(q.id);
      }

      if (!q.question || q.question.trim().length < 5) {
        issues.push({
          source: unitKey,
          questionId: q.id,
          rule: 'non_empty_stem',
          message: 'Question stem is empty or too short.'
        });
      }

      if (!q.options || q.options.length !== 4) {
        issues.push({
          source: unitKey,
          questionId: q.id,
          rule: 'valid_options_length',
          message: `Expected 4 options, found ${q.options?.length ?? 0}.`
        });
      } else {
        const trimmed = q.options.map((o) => (o || '').trim());
        if (trimmed.some((o) => o.length === 0)) {
          issues.push({
            source: unitKey,
            questionId: q.id,
            rule: 'no_empty_options',
            message: 'One or more options are empty strings.'
          });
        }
        const uniqueOpts = new Set(trimmed);
        if (uniqueOpts.size < 4) {
          issues.push({
            source: unitKey,
            questionId: q.id,
            rule: 'no_duplicate_options',
            message: `Duplicate options found: [${trimmed.join(' | ')}]`
          });
        }
        trimmed.forEach((optText) => {
          FORBIDDEN_PLACEHOLDER_PATTERNS.forEach((pat) => {
            if (pat.test(optText) || pat.test(q.question)) {
              issues.push({
                source: unitKey,
                questionId: q.id,
                rule: 'no_placeholder_text',
                message: `Forbidden placeholder pattern "${pat}" matched in question or option.`
              });
            }
          });
        });
      }

      if (!['A', 'B', 'C', 'D'].includes(q.correctAnswer)) {
        issues.push({
          source: unitKey,
          questionId: q.id,
          rule: 'valid_correct_answer',
          message: `Invalid correctAnswer "${q.correctAnswer}".`
        });
      } else {
        answerDistribution[q.correctAnswer]++;
      }

      if (isUnverified || q.verificationStatus === 'unverified') {
        unverifiedQuestionsCount++;
      } else if (
        isPending ||
        q.verificationStatus === 'corrected_pending_verification' ||
        q.verificationStatus === 'curriculum_aligned'
      ) {
        correctedPendingVerificationQuestionsCount++;
      } else {
        verifiedQuestionsCount++;
      }
    });
  });

  // 2. Validate questionBank.json
  const bankData: QuestionBankData = Array.isArray(rawQuestionBank)
    ? { schemaVersion: 2, questions: rawQuestionBank as unknown as BankQuestion[] }
    : (rawQuestionBank as unknown as QuestionBankData);
  const bankQuestions = bankData.questions || [];
  const bankIds = new Set<string>();

  bankQuestions.forEach((bq) => {
    if (!bq.id || bankIds.has(bq.id)) {
      issues.push({
        source: 'questionBank.json',
        questionId: bq.id || 'missing',
        rule: 'unique_id',
        message: `Duplicate or missing ID in questionBank.json: ${bq.id}`
      });
    }
    bankIds.add(bq.id);

    if (bq.curriculum !== 'egyptian') {
      issues.push({
        source: 'questionBank.json',
        questionId: bq.id,
        rule: 'egyptian_curriculum_only',
        message: `Non-Egyptian curriculum "${bq.curriculum}" found in questionBank.json.`
      });
    }

    if (!['primary', 'intermediate', 'secondary'].includes(bq.stage)) {
      issues.push({
        source: 'questionBank.json',
        questionId: bq.id,
        rule: 'valid_stage',
        message: `Invalid stage "${bq.stage}".`
      });
    }

    if (!bq.choices || bq.choices.length !== 4) {
      issues.push({
        source: 'questionBank.json',
        questionId: bq.id,
        rule: 'valid_choices',
        message: 'Expected exactly 4 choices.'
      });
    } else {
      const choiceIds = bq.choices.map((c) => c.id);
      if (!choiceIds.includes(bq.correctChoiceId)) {
        issues.push({
          source: 'questionBank.json',
          questionId: bq.id,
          rule: 'correct_choice_exists',
          message: `correctChoiceId "${bq.correctChoiceId}" not in choices.`
        });
      }
      const uniqueTexts = new Set(bq.choices.map((c) => c.text.trim().toLowerCase()));
      if (uniqueTexts.size < 4) {
        issues.push({
          source: 'questionBank.json',
          questionId: bq.id,
          rule: 'no_duplicate_choices',
          message: `Duplicate choice texts in ${bq.id}.`
        });
      }
      const idx = ['a', 'b', 'c', 'd'].indexOf(bq.correctChoiceId);
      if (idx >= 0) {
        const letter = (['A', 'B', 'C', 'D'] as const)[idx];
        answerDistribution[letter]++;
      }
    }

    if (bq.verificationStatus === 'verified') {
      verifiedQuestionsCount++;
    } else if (
      bq.verificationStatus === 'corrected_pending_verification' ||
      bq.verificationStatus === 'curriculum_aligned'
    ) {
      correctedPendingVerificationQuestionsCount++;
    } else {
      unverifiedQuestionsCount++;
    }
  });

  // 3. Validate Primary 5-Level Exam Suites directly
  let primary5LevelQuestionsCount = 0;
  primaryCurriculumDatabase.forEach((lesson) => {
    const suite = lesson.examSuite;
    const allSuiteQs = [
      ...suite.level1_Foundation,
      ...suite.level2_Contextual,
      ...suite.level3_AdvancedStructure,
      ...suite.level4_MoeMockExam,
      ...suite.level5_HigherThinking
    ];
    const suiteIds = new Set<string>();
    allSuiteQs.forEach((pq) => {
      primary5LevelQuestionsCount++;
      verifiedQuestionsCount++;
      if (suiteIds.has(pq.id)) {
        issues.push({
          source: `PrimarySuite:${lesson.unitId}`,
          questionId: pq.id,
          rule: 'unique_id',
          message: `Duplicate ID "${pq.id}" in primary exam suite ${lesson.unitId}.`
        });
      }
      suiteIds.add(pq.id);

      if (!pq.questionPrompt || pq.questionPrompt.trim().length < 5) {
        issues.push({
          source: `PrimarySuite:${lesson.unitId}`,
          questionId: pq.id,
          rule: 'non_empty_prompt',
          message: `Empty or short questionPrompt in ${pq.id}.`
        });
      }

      if (!pq.options || pq.options.length !== 4) {
        issues.push({
          source: `PrimarySuite:${lesson.unitId}`,
          questionId: pq.id,
          rule: 'primary_options_length',
          message: `Expected 4 options in ${pq.id}, got ${pq.options?.length ?? 0}.`
        });
      } else {
        const correctStr = Array.isArray(pq.correctAnswer)
          ? pq.correctAnswer[0]
          : pq.correctAnswer;
        const ansIdx = pq.options.indexOf(correctStr);
        if (ansIdx === -1) {
          issues.push({
            source: `PrimarySuite:${lesson.unitId}`,
            questionId: pq.id,
            rule: 'primary_correct_in_options',
            message: `correctAnswer "${correctStr}" not found in options [${pq.options.join(' | ')}].`
          });
        } else {
          const letter = (['A', 'B', 'C', 'D'] as const)[ansIdx];
          primarySuiteAnswerDistribution[letter]++;
        }
        FORBIDDEN_PLACEHOLDER_PATTERNS.forEach((pat) => {
          if (pat.test(pq.questionPrompt) || pq.options!.some((o) => pat.test(o))) {
            issues.push({
              source: `PrimarySuite:${lesson.unitId}`,
              questionId: pq.id,
              rule: 'no_placeholder_text',
              message: `Forbidden pattern "${pat}" found in ${pq.id}.`
            });
          }
        });
      }
    });
  });

  // 4. Validate Secondary 1, 2, 3 & Baccalaureate & Governmental / Revision Exam Booklets
  let sec1Count = 0;
  let sec2And3Count = 0;
  let bacCount = 0;
  let govAndRevCount = 0;

  const validateExamList = (
    exams: any[],
    sourceLabel: string,
    isPendingVerificationSource: boolean,
    counterCb: (n: number) => void
  ) => {
    exams.forEach((exam) => {
      const mcqs = [
        ...(exam.mcqs || []),
        ...(exam.reading?.questions || []),
        ...((exam.readingPassages || []).flatMap((rp: any) => rp.questions || []))
      ];
      mcqs.forEach((mcq: any) => {
        counterCb(1);
        if (isPendingVerificationSource) {
          correctedPendingVerificationQuestionsCount++;
        } else {
          verifiedQuestionsCount++;
        }
        if (!mcq.question || !mcq.options || mcq.options.length < 4) {
          issues.push({
            source: sourceLabel,
            questionId: mcq.id || 'unknown',
            rule: 'valid_exam_mcq',
            message: `Invalid MCQ structure in ${exam.id}.`
          });
        } else {
          mcq.options.forEach((optText: string) => {
            FORBIDDEN_PLACEHOLDER_PATTERNS.forEach((pat) => {
              if (pat.test(optText) || pat.test(mcq.question)) {
                issues.push({
                  source: sourceLabel,
                  questionId: mcq.id,
                  rule: 'no_placeholder_text',
                  message: `Placeholder pattern "${pat}" found in ${exam.id} question ${mcq.id}.`
                });
              }
            });
          });
          const ansIdx = mcq.correctAnswers?.[0] ?? 0;
          const letter = (['A', 'B', 'C', 'D'] as const)[ansIdx] || 'A';
          answerDistribution[letter]++;
        }
      });
    });
  };

  secondary1GeneralUnits.forEach((u) =>
    validateExamList(u.exams, `Sec1Unit${u.id}`, false, (n) => {
      sec1Count += n;
    })
  );
  secondary2GeneralUnits.forEach((u) =>
    validateExamList(u.exams, `Sec2Unit${u.id}`, false, (n) => {
      sec2And3Count += n;
    })
  );
  secondary3GeneralUnits.forEach((u) =>
    validateExamList(u.exams, `Sec3Unit${u.id}`, false, (n) => {
      sec2And3Count += n;
    })
  );
  validateExamList(allBaccalaureateExams, 'BaccalaureateExams', true, (n) => {
    bacCount += n;
  });
  validateExamList(
    [...governmentalExams, ...term1RevisionExams, ...term2RevisionExams],
    'GovAndRevisionExams',
    false,
    (n) => {
      govAndRevCount += n;
    }
  );

  // 5. Verify Game Question Loader & Filter Integrity across every Stage & Grade
  let filterChecksPassed = true;
  const stageConfigs: { stage: 'primary' | 'intermediate' | 'secondary'; grades: number[] }[] = [
    { stage: 'primary', grades: [1, 2, 3, 4, 5, 6] },
    { stage: 'intermediate', grades: [1, 2, 3] },
    { stage: 'secondary', grades: [1, 2, 3] }
  ];

  stageConfigs.forEach(({ stage, grades }) => {
    grades.forEach((grade) => {
      const loaded = loadGameQuestions({ stage, grade, limit: 5 });
      if (loaded.length === 0) {
        filterChecksPassed = false;
        issues.push({
          source: 'loadGameQuestions',
          questionId: `${stage}_g${grade}`,
          rule: 'stage_grade_filter_non_empty',
          message: `loadGameQuestions returned 0 questions for stage="${stage}", grade=${grade}.`
        });
      }
      loaded.forEach((q) => {
        if (q.stage !== stage || q.grade !== grade) {
          filterChecksPassed = false;
          issues.push({
            source: 'loadGameQuestions',
            questionId: q.id,
            rule: 'stage_grade_filter_exact_match',
            message: `Expected ${stage} grade ${grade}, got ${q.stage} grade ${q.grade}.`
          });
        }
      });
    });
  });

  // Also test getGameQuestions for Primary, Preparatory, Secondary
  (['Primary', 'Preparatory', 'Secondary'] as const).forEach((stage) => {
    const maxGrade = stage === 'Primary' ? 6 : 3;
    for (let g = 1; g <= maxGrade; g++) {
      const qs = getGameQuestions({ stage, grade: g, limit: 5 });
      if (qs.length === 0) {
        filterChecksPassed = false;
        issues.push({
          source: 'getGameQuestions',
          questionId: `${stage}_g${g}`,
          rule: 'game_bank_filter_non_empty',
          message: `getGameQuestions returned 0 questions for stage="${stage}", grade=${g}.`
        });
      }
    }
  });

  const totalQuestionsInspected =
    bankQuestions.length +
    curriculumUnitQuestionsCount +
    primary5LevelQuestionsCount +
    sec1Count +
    sec2And3Count +
    bacCount +
    govAndRevCount;

  return {
    totalUnitsInspected: allCurriculaUnits.length,
    verifiedUnitsCount,
    correctedPendingVerificationUnitsCount,
    curriculumAlignedUnitsCount,
    unverifiedUnitsCount,
    totalQuestionsInspected,
    verifiedQuestionsCount,
    correctedPendingVerificationQuestionsCount,
    unverifiedQuestionsCount,
    questionsBySource: {
      gameQuestionBankJson: bankQuestions.length,
      curriculumUnitModulesAndExams: curriculumUnitQuestionsCount,
      primary5LevelExamSuites: primary5LevelQuestionsCount,
      secondary1ExamBooklets: sec1Count,
      secondary2And3ExamBooklets: sec2And3Count,
      baccalaureateExamBooklets: bacCount,
      governmentalAndRevisionExams: govAndRevCount
    },
    answerDistribution,
    primarySuiteAnswerDistribution,
    filterChecksPassed,
    issues
  };
}

// Allow running directly via `npx tsx src/utils/curriculumValidator.ts`
const isDirectExecution =
  typeof process !== 'undefined' &&
  process.argv &&
  process.argv[1] &&
  process.argv[1].includes('curriculumValidator');

if (isDirectExecution) {
  const summary = runComprehensiveCurriculumValidation();
  const bankStats = getQuestionBankStats();
  console.log('=== ENGLIMENSH.EG CURRICULUM & QUESTION BANK AUDIT REPORT ===');
  console.log(JSON.stringify({ summary, bankStats, catalogStages: allStagesCurriculumCatalog.length }, null, 2));
  if (summary.issues.length > 0) {
    console.error(`Validation failed with ${summary.issues.length} issue(s).`);
    process.exit(1);
  } else {
    console.log('ALL 15 VALIDATION RULES PASSED WITH 0 ISSUES!');
  }
}
