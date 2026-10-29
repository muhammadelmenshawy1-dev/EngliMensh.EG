import { Exam, ExamLevel } from '../types.ts';

export interface BaccalaureateUnitExamsConfig {
  grade: 10 | 11 | 12;
  unitId: number;
  unitTitle: string;
  unitTitleAr: string;
  theme: string;
  grammarRule: string;
  novelReference: string;
  novelReferenceAr: string;
  sampleQuestions: {
    l1: { q: string; opts: string[]; ans: number[]; exp: string };
    l2: { q: string; opts: string[]; ans: number[]; exp: string };
    l3: { q: string; opts: string[]; ans: number[]; exp: string };
    l4: { q: string; opts: string[]; ans: number[]; exp: string };
    l5: { q: string; opts: string[]; ans: number[]; exp: string };
  };
  readingPassage: {
    title: string;
    text: string;
    q: string;
    opts: string[];
    ans: number[];
    exp: string;
  };
  translationPair: {
    enToAr: { src: string; opts: string[]; ans: number; exp: string };
    arToEn: { src: string; opts: string[]; ans: number; exp: string };
  };
  literatureTask: {
    chapterOrAct: number;
    q: string;
    qAr: string;
    modelAnswer: string;
    criteria: string[];
  };
  essayTask: {
    title: string;
    prompt: string;
    outline: string[];
    model: string;
  };
}

export function generateBaccalaureate5LevelExams(cfg: BaccalaureateUnitExamsConfig): Exam[] {
  const levels: ExamLevel[] = [1, 2, 3, 4, 5];
  const levelNames: Record<ExamLevel, { en: string; ar: string }> = {
    1: { en: 'Core Academic Lexicon & Inversion Drills', ar: 'المستوى الأول: المعجم الأكاديمي والأسلوب المقلوب' },
    2: { en: 'Advanced Contextual Cohesion & Transitional Logic', ar: 'المستوى الثاني: الترابط السياقي والمنطق الانتقالي' },
    3: { en: 'Literary Criticism & Thematic HOTS', ar: 'المستوى الثالث: النقد الأدبي والتحليل الرفيع' },
    4: { en: 'Full Egyptian Baccalaureate Simulation Exam', ar: 'المستوى الرابع: المحاكاة الشاملة للبكالوريا المصرية' },
    5: { en: 'Elite Academic Challenge (Research Synthesis & Timed Essay)', ar: 'المستوى الخامس: التحدي الأكاديمي وصياغة الأطروحة' }
  };

  const gradeCode = cfg.grade === 10 ? '1' : cfg.grade === 11 ? '2' : '3';

  return levels.map(level => {
    const qKey = `l${level}` as keyof typeof cfg.sampleQuestions;
    const curQ = cfg.sampleQuestions[qKey];
    const nextLevel = ((level % 5) + 1) as ExamLevel;
    const nextQ = cfg.sampleQuestions[`l${nextLevel}` as keyof typeof cfg.sampleQuestions];

    const baseOpts = curQ.opts.length === 4 ? [...curQ.opts] : ['Option A', 'Option B', 'Option C', 'Option D'];
    const origAnsText = baseOpts[curQ.ans[0] ?? 0] || baseOpts[0];
    const shift1 = (cfg.unitId + level) % 4;
    const rotOpts1 = [
      baseOpts[(0 - shift1 + 4) % 4],
      baseOpts[(1 - shift1 + 4) % 4],
      baseOpts[(2 - shift1 + 4) % 4],
      baseOpts[(3 - shift1 + 4) % 4]
    ];
    const newAns1 = [Math.max(0, rotOpts1.indexOf(origAnsText))];

    const nextBaseOpts = nextQ.opts.length === 4 ? [...nextQ.opts] : ['Option A', 'Option B', 'Option C', 'Option D'];
    const nextOrigAnsText = nextBaseOpts[nextQ.ans[0] ?? 0] || nextBaseOpts[0];
    const shift2 = (cfg.unitId + level + 1) % 4;
    const rotOpts2 = [
      nextBaseOpts[(0 - shift2 + 4) % 4],
      nextBaseOpts[(1 - shift2 + 4) % 4],
      nextBaseOpts[(2 - shift2 + 4) % 4],
      nextBaseOpts[(3 - shift2 + 4) % 4]
    ];
    const newAns2 = [Math.max(0, rotOpts2.indexOf(nextOrigAnsText))];

    const vocabByLevel: Record<ExamLevel, { q: string; opts: string[]; ans: number; exp: string }> = {
      1: {
        q: `Choose the most precise academic collocation related to "${cfg.unitTitle}": "Researchers must ______ empirical validity before publishing policy recommendations."`,
        opts: ['fabricate', 'demonstrate', 'neglect', 'trivialize'],
        ans: 1,
        exp: '"Demonstrate empirical validity" is the standard formal academic collocation.'
      },
      2: {
        q: `In the context of ${cfg.theme}, which noun phrase best denotes rigorous evidence-based evaluation?`,
        opts: ['unverified anecdotal speculation', 'systematic empirical scrutiny', 'impulsive commercial bias', 'superficial rhetorical deflection'],
        ans: 1,
        exp: '"Systematic empirical scrutiny" means thorough, evidence-based examination.'
      },
      3: {
        q: `Complete the formal statement on ${cfg.unitTitle}: "Breakthrough innovations often ______ the prevailing paradigm in scientific governance."`,
        opts: ['stagnate', 'obstruct', 'shift', 'conceal'],
        ans: 2,
        exp: 'The idiom "shift the paradigm" means to fundamentally transform the standard approach.'
      },
      4: {
        q: `Which adjective best characterizes a scholarly argument on ${cfg.unitTitle} that is supported by verifiable data?`,
        opts: ['substantiated', 'conjectural', 'fallacious', 'arbitrary'],
        ans: 0,
        exp: '"Substantiated" means supported by proven, verifiable evidence.'
      },
      5: {
        q: `Select the appropriate academic verb: "When competing ethical priorities arise in ${cfg.unitTitle}, policymakers must ______ every variable in the balance."`,
        opts: ['dismiss', 'weigh', 'distort', 'suppress'],
        ans: 1,
        exp: '"Weigh in the balance" means to carefully evaluate competing priorities before deciding.'
      }
    };

    const discourseByLevel: Record<ExamLevel, { q: string; opts: string[]; ans: number; exp: string }> = {
      1: {
        q: `In formal academic writing on "${cfg.unitTitle}", which transition marker introduces a contrasting counter-argument?`,
        opts: ['Consequently,', 'Furthermore,', 'Nevertheless,', 'For instance,'],
        ans: 2,
        exp: '"Nevertheless" signals concession and contrast against a preceding premise.'
      },
      2: {
        q: `How does an author establish logical cause-and-effect progression in an analytical essay on ${cfg.theme}?`,
        opts: [
          'By linking corroborated premises with causal conjunctive adverbs such as "consequently" and "hence"',
          'By inserting unrelated personal anecdotes without transitions',
          'By repeating the thesis verbatim in every sentence',
          'By replacing factual citations with colloquial idioms'
        ],
        ans: 0,
        exp: 'Causal conjunctive adverbs and corroborated premises build logical progression.'
      },
      3: {
        q: `When evaluating authorial tone in "${cfg.readingPassage.title}", what indicates an objective scholarly register?`,
        opts: [
          'Reliance on emotional hyperbole and exclamation marks',
          'Balanced synthesis of empirical evidence and measured qualification',
          'Use of conversational slang and first-person rants',
          'Complete omission of counter-perspectives'
        ],
        ans: 1,
        exp: 'Objective scholarly register relies on empirical evidence and measured qualification.'
      },
      4: {
        q: `Which sentence demonstrates correct punctuation and subordination for a formal thesis on ${cfg.unitTitle}?`,
        opts: [
          'Although technological integration accelerates efficiency, ethical safeguards remain indispensable.',
          'Although technological integration accelerates efficiency ethical safeguards, remain indispensable',
          'Technological integration accelerates efficiency, ethical safeguards remain indispensable.',
          'Although, technological integration accelerates efficiency; ethical safeguards remain indispensable.'
        ],
        ans: 0,
        exp: 'A fronted adverbial clause ("Although...") is followed by a comma before the main clause.'
      },
      5: {
        q: `In a multi-source synthesis essay on ${cfg.unitTitle}, what is the primary rhetorical purpose of a concession clause?`,
        opts: [
          'To contradict the writer’s own thesis and abandon the argument',
          'To acknowledge valid aspects of an opposing view before refuting its limitations with stronger evidence',
          'To pad the word count with repetitive definitions',
          'To avoid citing peer-reviewed data'
        ],
        ans: 1,
        exp: 'A concession clause acknowledges complexity and strengthens refutation.'
      }
    };

    const vItem = vocabByLevel[level];
    const dItem = discourseByLevel[level];

    const exam: Exam = {
      id: `bac_s${gradeCode}_u${cfg.unitId}_l${level}`,
      unitId: cfg.unitId,
      trackType: 'baccalaureate',
      grade: cfg.grade,
      level,
      levelTitle: `Sec ${gradeCode} Baccalaureate — Level ${level}: ${levelNames[level].en}`,
      levelTitleAr: `بكالوريا الصف ${cfg.grade === 10 ? 'الأول' : cfg.grade === 11 ? 'الثاني' : 'الثالث'} الثانوي — ${levelNames[level].ar}`,
      durationMinutes: level === 4 ? 60 : level === 5 ? 75 : 20 + level * 5,
      totalMarks: 24 + level * 4,
      mcqWeightPercent: level >= 4 ? 70 : 85,
      writtenWeightPercent: level >= 4 ? 30 : 15,
      governorate: 'Egyptian Baccalaureate Examination Board (2026/2027)',
      term: 1,
      category: 'unit_level',
      mcqs: [
        {
          id: `bac_s${gradeCode}_u${cfg.unitId}_l${level}_q1`,
          type: 'single',
          question_type: 'mcq',
          difficulty: level >= 3 ? 'hots' : 'standard',
          skill: 'Grammar',
          question: curQ.q,
          options: rotOpts1,
          correctAnswers: newAns1,
          explanation: curQ.exp,
          exam_trap_explanation: `Exam Trap: When dealing with ${cfg.grammarRule}, students frequently fail to place the auxiliary verb before the subject or incorrectly inflect the main verb.`,
          examTrapExplanationAr: `فخ الامتحان: يقع الكثير من الطلاب في خطأ عدم تقديم الفعل المساعد على الفاعل أو تصريف الفعل الأساسي في وجود أداة الحصر أو النفي.`,
          points: 2
        },
        {
          id: `bac_s${gradeCode}_u${cfg.unitId}_l${level}_q2`,
          type: 'single',
          question_type: 'mcq',
          difficulty: level >= 3 ? 'hots' : 'standard',
          skill: 'Grammar',
          question: `[${cfg.unitTitle} — Structural Synthesis] ${nextQ.q}`,
          options: rotOpts2,
          correctAnswers: newAns2,
          explanation: nextQ.exp,
          exam_trap_explanation: 'Exam Trap: Distractors often introduce dangling participles or invalid auxiliary-verb combinations.',
          points: 2
        },
        {
          id: `bac_s${gradeCode}_u${cfg.unitId}_l${level}_q3`,
          type: 'single',
          question_type: 'mcq',
          difficulty: level >= 3 ? 'hots' : 'standard',
          skill: 'Vocabulary',
          question: vItem.q,
          options: vItem.opts,
          correctAnswers: [vItem.ans],
          explanation: vItem.exp,
          exam_trap_explanation: 'Exam Trap: Do not choose colloquial conversational expressions when an elevated formal academic register is required.',
          points: 2
        },
        {
          id: `bac_s${gradeCode}_u${cfg.unitId}_l${level}_q4`,
          type: 'single',
          question_type: 'mcq',
          difficulty: level >= 3 ? 'hots' : 'standard',
          skill: 'Reading',
          question: dItem.q,
          options: dItem.opts,
          correctAnswers: [dItem.ans],
          explanation: dItem.exp,
          exam_trap_explanation: 'Exam Trap: Surface repetition is a rhetorical defect, not cohesive argumentative progression.',
          points: 2
        }
      ]
    };

    // Levels 3, 4, 5 include reading comprehension and translation
    if (level >= 3) {
      const r1BaseOpts = cfg.readingPassage.opts.length === 4 ? [...cfg.readingPassage.opts] : ['Option A', 'Option B', 'Option C', 'Option D'];
      const r1OrigText = r1BaseOpts[cfg.readingPassage.ans[0] ?? 0] || r1BaseOpts[0];
      const rShift = (cfg.unitId + level + 2) % 4;
      const r1RotOpts = [
        r1BaseOpts[(0 - rShift + 4) % 4],
        r1BaseOpts[(1 - rShift + 4) % 4],
        r1BaseOpts[(2 - rShift + 4) % 4],
        r1BaseOpts[(3 - rShift + 4) % 4]
      ];
      const r1NewAns = [Math.max(0, r1RotOpts.indexOf(r1OrigText))];

      const r2BaseOpts = level === 5 ? [
        'Holistic policy requires integrating empirical state infrastructure with grassroots community empowerment',
        'Technological automation renders all human local participation completely obsolete',
        'Both paradigms should be completely abandoned in favor of historical folklore',
        'Governments should ignore scientific data and rely solely on commercial advertising'
      ] : [
        'Systematic deconstruction of counter-arguments supported by verifiable telemetry',
        'Emotional hyperbole intended to mislead the reader',
        'Anecdotal folklore devoid of empirical data',
        'Commercial advertising for private corporate products'
      ];
      const r2OrigText = r2BaseOpts[0];
      const r2Shift = (cfg.unitId + level + 3) % 4;
      const r2RotOpts = [
        r2BaseOpts[(0 - r2Shift + 4) % 4],
        r2BaseOpts[(1 - r2Shift + 4) % 4],
        r2BaseOpts[(2 - r2Shift + 4) % 4],
        r2BaseOpts[(3 - r2Shift + 4) % 4]
      ];
      const r2NewAns = [Math.max(0, r2RotOpts.indexOf(r2OrigText))];

      exam.reading = {
        passageTitle: cfg.readingPassage.title,
        passageText: cfg.readingPassage.text,
        passageType: level === 5 ? 'dual_synthesis' : 'analytical',
        wordCount: 160,
        secondaryPassage: level === 5 ? {
          title: `Counter-Perspective: Critiques and Alternative Paradigms on ${cfg.unitTitle}`,
          perspective: 'Passage B: Multi-variable Critical Synthesis',
          text: `Critics argue that uncritical reliance on centralized technical frameworks risks marginalizing localized indigenous paradigms. While empirical telemetry and macro-infrastructural policies yield quantifiable gains, true systemic resilience necessitates decentralized grassroots empowerment. Synthesizing both paradigms bridges high-level administrative directives with authentic community stewardship.`,
          wordCount: 75
        } : undefined,
        questions: [
          {
            id: `bac_s${gradeCode}_u${cfg.unitId}_l${level}_r1`,
            type: 'single',
            question_type: 'reading_comprehension',
            difficulty: 'hots',
            skill: 'Reading',
            question: cfg.readingPassage.q,
            options: r1RotOpts,
            correctAnswers: r1NewAns,
            explanation: cfg.readingPassage.exp,
            exam_trap_explanation: 'Exam Trap: Be vigilant against options containing extreme universal qualifiers ("always", "never", "only") that oversimplify the author\'s nuanced premise.',
            points: 2
          },
          {
            id: `bac_s${gradeCode}_u${cfg.unitId}_l${level}_r2`,
            type: 'single',
            question_type: 'reading_comprehension',
            difficulty: 'hots',
            skill: 'Reading',
            question: level === 5 
              ? 'When synthesizing both passages, what overarching consensus emerges regarding sustainable governance?'
              : 'What higher-order authorial technique is demonstrated throughout the passage?',
            options: r2RotOpts,
            correctAnswers: r2NewAns,
            explanation: level === 5 
              ? 'Multi-text synthesis reconciles top-down empirical data with bottom-up community stewardship.'
              : 'The passage exhibits empirical rigor and balanced scholarly deconstruction.',
            exam_trap_explanation: 'Exam Trap: Synthesis questions require identifying common ground across both texts rather than summarizing only one perspective.',
            points: 2
          }
        ]
      };

      exam.translation = [
        {
          id: `bac_s${gradeCode}_u${cfg.unitId}_l${level}_t1`,
          direction: 'en-to-ar',
          sourceText: cfg.translationPair.enToAr.src,
          options: cfg.translationPair.enToAr.opts,
          correctIndex: cfg.translationPair.enToAr.ans,
          explanation: cfg.translationPair.enToAr.exp,
          exam_trap_explanation: 'Exam Trap: Beware of false cognates and literal word-for-word translations that violate formal Arabic syntax.'
        },
        {
          id: `bac_s${gradeCode}_u${cfg.unitId}_l${level}_t2`,
          direction: 'ar-to-en',
          sourceText: cfg.translationPair.arToEn.src,
          options: cfg.translationPair.arToEn.opts,
          correctIndex: cfg.translationPair.arToEn.ans,
          explanation: cfg.translationPair.arToEn.exp,
          exam_trap_explanation: 'Exam Trap: Verify proper verb transitivity and prepositions in the target English construction.'
        }
      ];
    }

    // Levels 4 & 5 include literature HOTS and essay writing
    if (level >= 4) {
      exam.storyQuestions = [
        {
          id: `bac_s${gradeCode}_u${cfg.unitId}_l${level}_lit1`,
          chapter: cfg.literatureTask.chapterOrAct,
          question: cfg.literatureTask.q,
          questionAr: cfg.literatureTask.qAr,
          question_type: 'short_answer',
          difficulty: 'hots',
          modelAnswer: cfg.literatureTask.modelAnswer,
          keyCriteria: cfg.literatureTask.criteria,
          maxMarks: 4
        }
      ];

      exam.writingTask = {
        type: 'essay',
        title: cfg.essayTask.title,
        prompt: cfg.essayTask.prompt,
        wordCountTarget: level === 5 ? '200-250 words' : '180-200 words',
        rubric: { ideas: 4, grammarVocab: 4, organization: 4, mechanics: 2 },
        sampleOutline: cfg.essayTask.outline,
        modelResponse: cfg.essayTask.model
      };
    }

    // Level 5: Elite Academic Challenge with Academic Research & Capstone Defense Module
    if (level === 5) {
      exam.academicResearchTask = {
        title: `Academic Thesis Formulation & Evidence Defense (${cfg.unitTitle})`,
        thesisPrompt: `Formulate an argumentative, defensible thesis statement addressing the societal and empirical imperatives of ${cfg.unitTitle}.`,
        evidenceData: `Peer-reviewed data published in the Egyptian Educational Journal (2026) indicates that integrating empirical telemetry with institutional frameworks boosts operational sustainability by 42%.`,
        citationPrompt: `Synthesize the statistical finding above with the core theoretical thesis of ${cfg.unitTitle} into a cohesive scholarly defense.`,
        modelDefense: cfg.essayTask.model,
        maxMarks: 6
      };
    }

    return exam;
  });
}
