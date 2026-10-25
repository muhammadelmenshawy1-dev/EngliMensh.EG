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
          options: curQ.opts,
          correctAnswers: curQ.ans,
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
          question: `Regarding ${cfg.grammarRule}, identify the sentence demonstrating impeccable formal syntax:`,
          options: [
            `The scholar deployed ${cfg.grammarRule} to elevate the rhetorical persuasion of the thesis.`,
            `The scholar deploying without observing subject-verb agreement principles.`,
            `The scholar had not applying the formal rules correctly during the symposium.`,
            `The scholar do not understood the structural nuances.`
          ],
          correctAnswers: [0],
          explanation: `Demonstrates precise academic register and syntax under ${cfg.grammarRule} rules.`,
          exam_trap_explanation: 'Exam Trap: Distractors often introduce dangling participles or invalid auxiliary-verb combinations (e.g. "had not applying").',
          points: 2
        },
        {
          id: `bac_s${gradeCode}_u${cfg.unitId}_l${level}_q3`,
          type: 'single',
          question_type: 'mcq',
          difficulty: level >= 3 ? 'hots' : 'standard',
          skill: 'Vocabulary',
          question: `Which option demonstrates the most sophisticated academic collocation for the theme of ${cfg.unitTitle}?`,
          options: [
            'demonstrate empirical validity through peer-reviewed methodologies',
            'write random opinions without checking any sources',
            'ignore scientific telemetry to save time',
            'copy answers from unverified social blogs'
          ],
          correctAnswers: [0],
          explanation: 'Standard high-register Baccalaureate academic phrasing.',
          exam_trap_explanation: 'Exam Trap: Do not choose colloquial conversational expressions when an elevated formal academic register is required.',
          points: 2
        },
        {
          id: `bac_s${gradeCode}_u${cfg.unitId}_l${level}_q4`,
          type: 'single',
          question_type: 'mcq',
          difficulty: level >= 3 ? 'hots' : 'standard',
          skill: 'Reading',
          question: `In formal discourse analysis, how does the author establish cohesive argumentative progression?`,
          options: [
            'By linking premises through logical discourse markers and empirical corroboration',
            'By repeating identical slogans without advancing supporting evidence',
            'By using colloquial internet slang throughout the text',
            'By abruptly changing topics without transition phrases'
          ],
          correctAnswers: [0],
          explanation: 'Logical transitions and evidentiary support define academic coherence.',
          exam_trap_explanation: 'Exam Trap: Surface repetition is a rhetorical defect, not cohesive argumentative progression.',
          points: 2
        }
      ]
    };

    // Levels 3, 4, 5 include reading comprehension and translation
    if (level >= 3) {
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
            options: cfg.readingPassage.opts,
            correctAnswers: cfg.readingPassage.ans,
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
            options: level === 5 ? [
              'Holistic policy requires integrating empirical state infrastructure with grassroots community empowerment',
              'Technological automation renders all human local participation completely obsolete',
              'Both paradigms should be completely abandoned in favor of historical folklore',
              'Governments should ignore scientific data and rely solely on commercial advertising'
            ] : [
              'Systematic deconstruction of counter-arguments supported by verifiable telemetry',
              'Emotional hyperbole intended to mislead the reader',
              'Anecdotal folklore devoid of empirical data',
              'Commercial advertising for private corporate products'
            ],
            correctAnswers: [0],
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
