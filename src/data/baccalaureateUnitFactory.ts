import { UnitCurriculum, CurriculumQuestion, LiteratureChapterModule } from '../types/curriculum.ts';

function rotateBaccalaureateQuestion(
  q: CurriculumQuestion,
  shift: number,
  idOverride?: string
): CurriculumQuestion {
  const letters: ('A' | 'B' | 'C' | 'D')[] = ['A', 'B', 'C', 'D'];
  if (!q.options || q.options.length !== 4) {
    return {
      ...q,
      id: idOverride || q.id,
      verificationStatus: 'corrected_pending_verification'
    };
  }
  const origIdx = Math.max(0, letters.indexOf(q.correctAnswer));
  const correctText = q.options[origIdx] ?? q.options[0];
  const s = ((shift % 4) + 4) % 4;
  const rotatedOptions: [string, string, string, string] = [
    q.options[(0 - s + 4) % 4],
    q.options[(1 - s + 4) % 4],
    q.options[(2 - s + 4) % 4],
    q.options[(3 - s + 4) % 4]
  ];
  const newIdx = Math.max(0, rotatedOptions.indexOf(correctText));
  return {
    ...q,
    id: idOverride || q.id,
    options: rotatedOptions,
    correctAnswer: letters[newIdx],
    verificationStatus: 'corrected_pending_verification'
  };
}

// Helper to create high-order thinking Egyptian Baccalaureate units
export function createBaccalaureateUnit(
  grade: number,
  gradeLabel: string,
  semester: 1 | 2,
  unitNumber: number,
  unitTitle: string,
  unitTitleAr: string,
  theme: string,
  ruleName: string,
  ruleNameAr: string,
  ruleExplanation: string,
  keyWordsList: { word: string; meaningAr: string; partOfSpeech: string; collocation?: string; synonym?: string; antonym?: string; def?: string; ex?: string; exAr?: string }[],
  readingTitle: string,
  readingPassage: string,
  listeningTitle: string,
  listeningRoles: string,
  listeningTranscript: string,
  exercises: {
    vocab: CurriculumQuestion[];
    grammar: CurriculumQuestion[];
    reading: CurriculumQuestion[];
    listening: CurriculumQuestion[];
    exam: CurriculumQuestion[];
  },
  literatureModule?: LiteratureChapterModule
): UnitCurriculum {
  const baseSeed = grade * 7 + semester * 3 + unitNumber;
  const vocabExercises = exercises.vocab.map((q, idx) =>
    rotateBaccalaureateQuestion(q, baseSeed + idx)
  );
  const grammarExercises = exercises.grammar.map((q, idx) =>
    rotateBaccalaureateQuestion(q, baseSeed + idx + 1)
  );
  const readingExercises = exercises.reading.map((q, idx) =>
    rotateBaccalaureateQuestion(q, baseSeed + idx + 2)
  );
  const listeningExercises = exercises.listening.map((q, idx) =>
    rotateBaccalaureateQuestion(q, baseSeed + idx + 3)
  );
  const combinedExamQuestions: CurriculumQuestion[] = [
    ...exercises.exam.map((q, idx) =>
      rotateBaccalaureateQuestion(q, baseSeed + idx, `exam_${q.id}`)
    ),
    ...exercises.vocab.map((q, idx) =>
      rotateBaccalaureateQuestion(q, baseSeed + idx + 1, `exam_voc_${q.id}`)
    ),
    ...exercises.grammar.map((q, idx) =>
      rotateBaccalaureateQuestion(q, baseSeed + idx + 2, `exam_gram_${q.id}`)
    ),
    ...exercises.reading.map((q, idx) =>
      rotateBaccalaureateQuestion(q, baseSeed + idx + 3, `exam_read_${q.id}`)
    )
  ];

  return {
    stage: 'Secondary',
    grade,
    gradeLabel,
    track: 'Egyptian Baccalaureate',
    secondaryPath: 'egyptian_baccalaureate',
    textbookSeries: 'Egyptian Baccalaureate Advanced Enrichment Track',
    verificationStatus: 'corrected_pending_verification',
    semester,
    unitNumber,
    unitTitle,
    unitTitleAr,
    theme,
    vocabularyModule: {
      keyWords: keyWordsList.map(kw => ({
        word: kw.word,
        pos: kw.partOfSpeech,
        partOfSpeech: kw.partOfSpeech,
        ar: kw.meaningAr,
        meaningAr: kw.meaningAr,
        def: kw.def || `Advanced Baccalaureate lexical item for ${unitTitle}`,
        meaningEn: kw.def || `Advanced Baccalaureate lexical item for ${unitTitle}`,
        ex: kw.ex || `In academic discourse, students synthesize "${kw.word}" to formulate cohesive analytical arguments.`,
        exampleSentence: kw.ex || `In academic discourse, students synthesize "${kw.word}" to formulate cohesive analytical arguments.`,
        exAr: kw.exAr,
        collocation: kw.collocation || `rigorous ${kw.word}`,
        synonym: kw.synonym || 'academic equivalent',
        antonym: kw.antonym || 'opposing concept'
      })),
      collocations: [
        {
          phrase: `scrutinize ${keyWordsList[0]?.word || 'evidence'}`,
          meaningAr: `يفحص ويدقق في ${keyWordsList[0]?.meaningAr || 'الأدلة'}`,
          example: `Scholars rigorously scrutinize ${keyWordsList[0]?.word || 'evidence'} before publishing findings.`
        },
        {
          phrase: 'demonstrate empirical validity',
          meaningAr: 'يبرهن على الصدق التجريبي والعلمي',
          example: 'The research must demonstrate empirical validity through peer-reviewed methodologies.'
        }
      ],
      idiomsAndExpressions: [
        {
          idiom: 'shift the paradigm',
          meaningEn: 'To fundamentally change the underlying assumptions or standard approach.',
          meaningAr: 'يحدث تحولاً جذرياً في المفاهيم والنظريات',
          example: 'The discovery of CRISPR shifted the biological paradigm irreversibly.'
        },
        {
          idiom: 'weigh in the balance',
          meaningEn: 'To carefully evaluate crucial competing priorities before making a decision.',
          meaningAr: 'يزن الأمور بدقة بالغة',
          example: 'Ethical considerations must be weighed in the balance against rapid commercial gain.'
        }
      ],
      exercises: vocabExercises
    },
    grammarModule: {
      ruleName,
      ruleNameAr,
      explanationSummary: ruleExplanation,
      detailedRules: [
        {
          title: 'Advanced Syntactic Structure & Register',
          explanation: `In the Egyptian Baccalaureate track, ${ruleName} is employed to elevate formal academic register, clarify rhetorical emphasis, and maintain argumentative cohesion.`,
          examples: [
            'Seldom have researchers observed such profound correlation between linguistic mastery and cognitive agility.',
            'It was the deliberate inversion of conventional logic that enabled the team to resolve the paradox.'
          ]
        },
        {
          title: 'Stylistic Nuances and Common Traps',
          explanation: 'Pay rigorous attention to auxiliary verb placement, subject-verb agreement, and polarity markers when deploying this advanced structure.',
          examples: [
            'Not only did the policy curtail carbon emissions, but it also catalyzed technological innovation.',
            'Were the committee to approve the framework, implementation would commence forthwith.'
          ]
        }
      ],
      exercises: grammarExercises
    },
    readingModule: {
      passageTitle: readingTitle,
      passage: readingPassage,
      wordCount: 420,
      criticalThinkingFocus: 'Higher-Order Thinking Skills (HOTS): Evaluation of authorial bias, deduction of unstated presuppositions, structural coherence, and argumentative counter-claims.',
      questions: readingExercises
    },
    listeningModule: {
      audioTitle: listeningTitle,
      speakerRoles: listeningRoles,
      transcript: listeningTranscript,
      durationApprox: '3 min 45 sec',
      questions: listeningExercises
    },
    unitExam: {
      examId: `bac_sec_g${grade}_u${unitNumber}_exam`,
      examTitle: `Baccalaureate Grade ${grade} - Unit ${unitNumber} Standard Assessment (2026/2027)`,
      examTitleAr: `اختبار البكالوريا المصرية المتقدم - الصف ${grade === 10 ? 'الأول' : grade === 11 ? 'الثاني' : 'الثالث'} الثانوي - الوحدة ${unitNumber}`,
      durationMinutes: 30,
      totalMarks: 32,
      questions: combinedExamQuestions
    },
    literatureModule
  };
}

