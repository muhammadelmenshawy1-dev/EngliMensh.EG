import { UnitInfo, Exam, ReadingSection } from '../types.ts';
import { unit1, unit2 } from './units1_2.ts';
import { unit3, unit4 } from './units3_4.ts';
import { unit5, unit6 } from './units5_6.ts';
import {
  baccalaureateExamsSec1,
  baccalaureateExamsSec2,
  baccalaureateExamsSec3,
  allBaccalaureateExams
} from './baccalaureateExams.ts';
import { governmentalExams } from './governmentalExams.ts';
import { term1RevisionExams, term2RevisionExams } from './termRevisions.ts';

// ------------------------------------------------------------------------------------------------
// 1. SECONDARY 1 (GRADE 10) GENERAL TRACK (2026/2027 SPECIFICATIONS)
// Novel: The Old Man and the Sea by Ernest Hemingway (Chapters 1 to 6)
// ------------------------------------------------------------------------------------------------
export const secondary1GeneralUnits: UnitInfo[] = [
  unit1,
  unit2,
  unit3,
  unit4,
  unit5,
  unit6
];

// ------------------------------------------------------------------------------------------------
// 2. SECONDARY 2 (GRADE 11) GENERAL TRACK (2026/2027 SPECIFICATIONS)
// Novel: King Lear by William Shakespeare (Acts 1 to 5)
// ------------------------------------------------------------------------------------------------

// Helper to construct complete 5-level exam tiers for Sec 2 & Sec 3 units
function createStandardExams(
  unitId: number,
  grade: number,
  unitTitle: string,
  unitTitleAr: string,
  grammarRule: string,
  novelReference: string,
  sampleQuestions: {
    l1: { q: string; opts: string[]; ans: number[]; exp: string };
    l2: { q: string; opts: string[]; ans: number[]; exp: string };
    l3: { q: string; opts: string[]; ans: number[]; exp: string };
    l4: { q: string; opts: string[]; ans: number[]; exp: string };
    l5: { q: string; opts: string[]; ans: number[]; exp: string };
  },
  readingPassage: { title: string; text: string; q: string; opts: string[]; ans: number[]; exp: string },
  storyQ: { act: number; q: string; qAr: string; model: string; criteria: string[] },
  writingEssay: { title: string; prompt: string; outline: string[]; model: string }
): Exam[] {
  const levels: (1 | 2 | 3 | 4 | 5)[] = [1, 2, 3, 4, 5];
  const levelNames: Record<1 | 2 | 3 | 4 | 5, { en: string; ar: string }> = {
    1: { en: 'Foundation & Core Lexis/Grammar', ar: 'المستوى الأول: التأسيس والمفردات والقواعد الأساسية' },
    2: { en: 'Standard Ministerial Practice', ar: 'المستوى الثاني: التطبيق الوزاري القياسي وحل التمارين' },
    3: { en: 'Applied Synthesis & Reading HOTS', ar: 'المستوى الثالث: التطبيق التركيبي والقراءة التحليلية المتقدمة' },
    4: { en: 'High-Order Analytical Distinction', ar: 'المستوى الرابع: التميز التحليلي ومستويات التفكير العليا' },
    5: { en: 'Ministerial Mastery & Capstone Paper', ar: 'المستوى الخامس: إتقان الامتحان الوزاري والورقة الشاملة' }
  };

  return levels.map(level => {
    const qKey = `l${level}` as keyof typeof sampleQuestions;
    const curQ = sampleQuestions[qKey];
    const nextLevel = ((level % 5) + 1) as 1 | 2 | 3 | 4 | 5;
    const nextQ = sampleQuestions[`l${nextLevel}` as keyof typeof sampleQuestions];

    // Deterministically rotate curQ options so correct answer is distributed across 0, 1, 2, 3
    const baseOpts = curQ.opts.length === 4 ? [...curQ.opts] : ['Option A', 'Option B', 'Option C', 'Option D'];
    const origAnsText = baseOpts[curQ.ans[0] ?? 0] || baseOpts[0];
    const shift1 = (unitId + level) % 4;
    const rotOpts1 = [
      baseOpts[(0 - shift1 + 4) % 4],
      baseOpts[(1 - shift1 + 4) % 4],
      baseOpts[(2 - shift1 + 4) % 4],
      baseOpts[(3 - shift1 + 4) % 4]
    ];
    const newAns1 = [Math.max(0, rotOpts1.indexOf(origAnsText))];

    // Rotate nextQ options for q2 so each level has a genuine unit-specific second question
    const nextBaseOpts = nextQ.opts.length === 4 ? [...nextQ.opts] : ['Option A', 'Option B', 'Option C', 'Option D'];
    const nextOrigAnsText = nextBaseOpts[nextQ.ans[0] ?? 0] || nextBaseOpts[0];
    const shift2 = (unitId + level + 1) % 4;
    const rotOpts2 = [
      nextBaseOpts[(0 - shift2 + 4) % 4],
      nextBaseOpts[(1 - shift2 + 4) % 4],
      nextBaseOpts[(2 - shift2 + 4) % 4],
      nextBaseOpts[(3 - shift2 + 4) % 4]
    ];
    const newAns2 = [Math.max(0, rotOpts2.indexOf(nextOrigAnsText))];

    const grammarBankByLevel: Record<1 | 2 | 3 | 4 | 5, { q: string; opts: string[]; ans: number[]; exp: string }> = {
      1: {
        q: `Choose the grammatically accurate completion: "Hardly had the medical team arrived at the emergency ward __________ the triage procedure began."`,
        opts: ['than', 'when', 'then', 'where'],
        ans: [1],
        exp: 'The correlative past perfect inversion structure is "Hardly had + subject + P.P. ... when + Past Simple".'
      },
      2: {
        q: `Complete the sentence: "No sooner __________ the research findings than international universities invited her to lecture."`,
        opts: ['she had published', 'did she published', 'had she published', 'has she publish'],
        ans: [2],
        exp: 'After "No sooner" at the beginning of a sentence, we invert the past perfect auxiliary: "had + subject + P.P.".'
      },
      3: {
        q: `Identify the correct structure: "Not only __________ the national archive, but it also digitized rare historical manuscripts."`,
        opts: ['the ministry restored', 'restored the ministry', 'has the ministry restore', 'did the ministry restore'],
        ans: [3],
        exp: 'When a sentence begins with "Not only", the first clause takes inverted auxiliary order: "did + subject + base verb".'
      },
      4: {
        q: `In formal examination style, what is the best completion for: "Never before __________ such groundbreaking scientific developments in renewable energy."?`,
        opts: ['have we witnessed', 'we have witnessed', 'did we witnessed', 'we had witnessing'],
        ans: [0],
        exp: 'Inversion after negative adverbial "Never before": auxiliary verb + subject + past participle.'
      },
      5: {
        q: `Choose the grammatically accurate clause: "Were the committee __________ the proposal today, construction would commence next month."`,
        opts: ['approving', 'to approve', 'approved', 'approve'],
        ans: [1],
        exp: 'In inverted Second Conditional structures beginning with "Were", we use "Were + subject + to + infinitive".'
      }
    };

    const vocabBankByLevel: Record<1 | 2 | 3 | 4 | 5, { q: string; opts: string[]; ans: number[]; exp: string }> = {
      1: {
        q: `In formal academic writing on "${unitTitle}", which pair of adjectives best describes evidence-based conclusions?`,
        opts: ['reckless and speculative', 'obsolete and fraudulent', 'indispensable and substantiated', 'negligent and superficial'],
        ans: [2],
        exp: '"Indispensable and substantiated" means essential and supported by verified proof.'
      },
      2: {
        q: `Choose the correct formal collocation related to "${unitTitle}": "Citizens and institutions must ______ sustainable initiatives to achieve lasting progress."`,
        opts: ['implement', 'fabricate', 'squander', 'undermine'],
        ans: [0],
        exp: '"Implement initiatives" is the standard formal collocation meaning to put plans into effect.'
      },
      3: {
        q: `Which noun best completes the sentence on "${unitTitle}": "Overcoming modern challenges requires strong ______ and continuous skill development."`,
        opts: ['resilience', 'negligence', 'complacency', 'obscurity'],
        ans: [0],
        exp: '"Resilience" means the capacity to recover quickly from difficulties and adapt.'
      },
      4: {
        q: `Select the closest academic synonym for "crucial" in the context of "${unitTitle}": "Accurate data analysis plays a ______ role in national development."`,
        opts: ['trivial', 'pivotal', 'redundant', 'dubious'],
        ans: [1],
        exp: '"Pivotal" means of crucial importance in relation to the development or success of something.'
      },
      5: {
        q: `Choose the correct adverbial collocation: "Researchers ______ evaluated the long-term impact of the project before publishing their report."`,
        opts: ['rigorously', 'carelessly', 'reluctantly', 'superficially'],
        ans: [0],
        exp: '"Rigorously evaluated" means assessed thoroughly and accurately.'
      }
    };

    const gItem = grammarBankByLevel[level];
    const vItem = vocabBankByLevel[level];

    const exam: Exam = {
      id: `s${grade === 11 ? '2' : '3'}_u${unitId}_l${level}`,
      unitId,
      trackType: 'general_secondary',
      grade,
      level,
      levelTitle: `Level ${level}: ${levelNames[level].en} — ${unitTitle}`,
      levelTitleAr: `${levelNames[level].ar} (${unitTitleAr})`,
      durationMinutes: level === 5 ? 180 : level === 4 ? 45 : 20 + level * 5,
      totalMarks: level === 5 ? 50 : 20 + level * 2,
      mcqWeightPercent: 85, // Official MOE Tablet/Paper Specification: 85% MCQs
      writtenWeightPercent: 15, // Official MOE Specification: 15% Written / Novel & Essay
      mcqs: [
        {
          id: `s${grade}_u${unitId}_l${level}_q1`,
          type: 'single',
          question_type: 'mcq',
          difficulty: level >= 3 ? 'hots' : 'standard',
          skill: 'Vocabulary',
          question: curQ.q,
          options: rotOpts1,
          correctAnswers: newAns1,
          explanation: curQ.exp,
          exam_trap_explanation: 'Exam Trap (فخ الامتحان): Do not choose options based solely on familiar sound. Confirm contextual connotation and idiomatic collocation.',
          examTrapExplanationAr: 'فخ الامتحان: تجنب اختيار الكلمات المألوفة سمعياً دون التأكد من السياق الدلالي وحروف الجر المصاحبة.',
          points: 2
        },
        {
          id: `s${grade}_u${unitId}_l${level}_q2`,
          type: 'single',
          question_type: 'mcq',
          difficulty: level >= 3 ? 'hots' : 'standard',
          skill: 'Grammar',
          question: `[${unitTitle} — Applied Focus] ${nextQ.q}`,
          options: rotOpts2,
          correctAnswers: newAns2,
          explanation: nextQ.exp,
          exam_trap_explanation: `Exam Trap (فخ الامتحان): Verify both the grammatical time marker and the structural rule for ${grammarRule}.`,
          points: 2
        },
        {
          id: `s${grade}_u${unitId}_l${level}_q3`,
          type: 'single',
          question_type: 'mcq',
          difficulty: level >= 3 ? 'hots' : 'standard',
          skill: 'Vocabulary',
          question: vItem.q,
          options: vItem.opts,
          correctAnswers: vItem.ans,
          explanation: vItem.exp,
          exam_trap_explanation: 'Exam Trap: Antonyms often look identical in length and formality; double-check whether the context requires positive or negative connotation.',
          points: 2
        },
        {
          id: `s${grade}_u${unitId}_l${level}_q4`,
          type: 'single',
          question_type: 'mcq',
          difficulty: 'hots',
          skill: 'Grammar',
          question: gItem.q,
          options: gItem.opts,
          correctAnswers: gItem.ans,
          explanation: gItem.exp,
          exam_trap_explanation: 'Exam Trap (فخ الامتحان): After negative or restrictive adverbials at the beginning of a clause, use inverted question order (Auxiliary + Subject + Verb).',
          points: 2
        }
      ]
    };

    if (level >= 3) {
      const r1BaseOpts = readingPassage.opts.length === 4 ? [...readingPassage.opts] : ['Option A', 'Option B', 'Option C', 'Option D'];
      const r1OrigText = r1BaseOpts[readingPassage.ans[0] ?? 0] || r1BaseOpts[0];
      const r1Shift = (unitId + level + 2) % 4;
      const r1RotOpts = [
        r1BaseOpts[(0 - r1Shift + 4) % 4],
        r1BaseOpts[(1 - r1Shift + 4) % 4],
        r1BaseOpts[(2 - r1Shift + 4) % 4],
        r1BaseOpts[(3 - r1Shift + 4) % 4]
      ];
      const r1NewAns = [Math.max(0, r1RotOpts.indexOf(r1OrigText))];

      const r2BaseOpts = [
        'To analyze systemic societal and scientific transformations with empirical rigor',
        'To promote commercial brand advertising without factual basis',
        'To discourage young learners from studying modern technology',
        'To entertain readers with unverified urban legends'
      ];
      const r2OrigText = r2BaseOpts[0];
      const r2Shift = (unitId + level + 3) % 4;
      const r2RotOpts = [
        r2BaseOpts[(0 - r2Shift + 4) % 4],
        r2BaseOpts[(1 - r2Shift + 4) % 4],
        r2BaseOpts[(2 - r2Shift + 4) % 4],
        r2BaseOpts[(3 - r2Shift + 4) % 4]
      ];
      const r2NewAns = [Math.max(0, r2RotOpts.indexOf(r2OrigText))];

      // 2 Unseen Reading Comprehension Passages for Level 4 & 5 (Factual/Narrative + Analytical)
      const primaryPassage: ReadingSection = {
        passageTitle: readingPassage.title,
        passageTitleAr: 'قطعة القراءة الأولى: الفهم والتحليل',
        passageText: readingPassage.text,
        passageType: 'factual',
        wordCount: 150,
        questions: [
          {
            id: `s${grade}_u${unitId}_l${level}_r1`,
            type: 'single',
            question_type: 'reading_comprehension',
            difficulty: 'standard',
            skill: 'Reading',
            question: readingPassage.q,
            options: r1RotOpts,
            correctAnswers: r1NewAns,
            explanation: readingPassage.exp,
            exam_trap_explanation: 'Exam Trap: Look for direct textual evidence rather than applying your own external personal assumptions.',
            points: 2
          },
          {
            id: `s${grade}_u${unitId}_l${level}_r2`,
            type: 'single',
            question_type: 'reading_comprehension',
            difficulty: 'hots',
            skill: 'Reading',
            question: 'What is the primary rhetorical objective and author’s tone in the passage?',
            options: r2RotOpts,
            correctAnswers: r2NewAns,
            explanation: 'The passage adopts an analytical, evidence-based academic approach to societal transformation.',
            exam_trap_explanation: 'Exam Trap: Distinguish between the central thesis and minor illustrative anecdotes used as supporting examples.',
            points: 2
          }
        ]
      };

      exam.reading = primaryPassage;

      // For Level 4 and 5: embed dual reading passages (Factual & Analytical)
      if (level >= 4) {
        exam.readingPassages = [
          primaryPassage,
          {
            passageTitle: `Analytical Study: Critical Dimensions of ${unitTitle}`,
            passageTitleAr: 'قطعة القراءة الثانية: التحليل النقدي واستخلاص النتائج',
            passageText: `In contemporary pedagogical discourse, mastering the dynamics of ${unitTitle} requires balancing technological integration with ethical literacy. When students synthesize empirical datasets with structured argumentative composition, their capacity for high-order inference expands markedly. Empirical evaluations demonstrate that candidates who consistently analyze text structures outperform peers on standardized reading comprehension matrices.`,
            passageType: 'analytical',
            wordCount: 75,
            questions: [
              {
                id: `s${grade}_u${unitId}_l${level}_r3`,
                type: 'single',
                question_type: 'reading_comprehension',
                difficulty: 'hots',
                skill: 'Reading',
                question: 'What central conclusion does the secondary analytical passage substantiate?',
                options: [
                  'Technological integration must be balanced with ethical and structured textual literacy',
                  'Standardized reading matrices should be eliminated from Egyptian schools',
                  'Argumentative composition has no measurable impact on cognitive inference',
                  'Empirical datasets are completely irrelevant to secondary school learning'
                ],
                correctAnswers: [0],
                explanation: 'The analytical text explicitly emphasizes balancing tech integration with ethical literacy.',
                exam_trap_explanation: 'Exam Trap: Beware of options contradicting the stated empirical evidence.',
                points: 2
              }
            ]
          }
        ];
      }

      exam.translation = [
        {
          id: `s${grade}_u${unitId}_l${level}_t1`,
          direction: 'en-to-ar',
          sourceText: `Investing in scientific research and modern youth education is the most effective safeguard for sustainable national development.`,
          options: [
            'إن الاستثمار في البحث العلمي والتعليم العصري للشباب هو الضمانة الأكثر فاعلية لتحقيق التنمية الوطنية المستدامة.',
            'البحث العلمي مكلف جداً ولذلك يجب تقليص ميزانيات الجامعات والمدارس في كافة المحافظات.',
            'التنمية المستدامة تعتمد فقط على الاستيراد دون حاجة لتعليم الكوادر الوطنية الشابة.',
            'التعليم القديم أفضل دائماً من التكنولوجيا المعاصرة في مجالات التطوير الاقتصادي.'
          ],
          correctIndex: 0,
          explanation: 'Option A provides the precise, solemn Arabic translation conveying the exact meaning and tone.',
          exam_trap_explanation: 'Exam Trap: Check the tense of the source verb and the exact meaning of "safeguard" (ضمانة / حماية).'
        },
        {
          id: `s${grade}_u${unitId}_l${level}_t2`,
          direction: 'ar-to-en',
          sourceText: `يتطلب بناء مجتمع المعرفة ترسيخ قيم التفكير النقدي والابتكار والعمل الجماعي لدى أجيال المستقبل.`,
          options: [
            'Building a knowledge society necessitates instilling values of critical thinking, innovation, and teamwork in future generations.',
            'Future generations must avoid critical thinking and only accept traditional opinions without questioning.',
            'Knowledge societies can be constructed without any innovation or collaborative educational teamwork.',
            'Students should memorize facts rather than acquiring critical problem-solving skills.'
          ],
          correctIndex: 0,
          explanation: 'Option A renders the sophisticated vocabulary ("knowledge society", "instilling", "critical thinking") flawlessly.',
          exam_trap_explanation: 'Exam Trap: Watch out for false negative verbs like "avoid" or incorrect modal inflections.'
        }
      ];

      exam.storyQuestions = [
        {
          id: `s${grade}_u${unitId}_l${level}_sq1`,
          chapter: storyQ.act,
          question: storyQ.q,
          questionAr: storyQ.qAr,
          question_type: 'short_answer',
          difficulty: 'hots',
          modelAnswer: storyQ.model,
          keyCriteria: storyQ.criteria,
          maxMarks: 4
        }
      ];

      exam.writingTask = {
        type: 'essay',
        title: writingEssay.title,
        prompt: writingEssay.prompt,
        wordCountTarget: '150-200 words (MOE Standard)',
        rubric: { ideas: 4, grammarVocab: 4, organization: 4, mechanics: 3 },
        sampleOutline: writingEssay.outline,
        modelResponse: writingEssay.model
      };
    }

    return exam;
  });
}

// 6 Units for Secondary 2 (Grade 11 General)
export const secondary2GeneralUnits: UnitInfo[] = [
  {
    id: 1,
    title: 'Staying Healthy',
    titleAr: 'الحفاظ على الصحة والمناعة والإسعافات الأولية',
    theme: 'Cellular Immunity, Emergency Rescue, Viral Containment & Public Health Protocols',
    grammarFocus: 'Modals of Necessity, Obligation & Regret (must, have to, need to, should have + P.P., shouldn’t have)',
    novelChapter: 'King Lear: Act 1 (Division of the Realm, Cordelia’s Banishment & False Flattery)',
    exams: createStandardExams(
      1,
      11,
      'Staying Healthy',
      'الحفاظ على الصحة والإسعافات',
      'Modals of Necessity and Obligation',
      'King Lear Act 1',
      {
        l1: {
          q: 'The biological mechanism through which white blood cells defend the human body against pathogens is the __________ system.',
          opts: ['immune', 'digestive', 'respiratory', 'muscular'],
          ans: [0],
          exp: 'The "immune system" (الجهاز المناعي) protects against microbial infections.'
        },
        l2: {
          q: 'The patient had severe chest pains, so the paramedic team __________ administer oxygen immediately.',
          opts: ['had to', 'must', 'have to', 'should'],
          ans: [0],
          exp: '"Had to" is the required past form for past external obligation and medical necessity.'
        },
        l3: {
          q: 'You __________ driven so fast in the dense fog; it was reckless and almost caused a head-on collision.',
          opts: ['shouldn’t have', 'must have', 'needn’t have', 'could have'],
          ans: [0],
          exp: '"Shouldn’t have + P.P." expresses past blame, reproach, and regret for a hazardous action.'
        },
        l4: {
          q: 'To curb the rapid transmission of seasonal influenza, schools must enforce strict sanitization and health __________.',
          opts: ['protocols', 'scams', 'monuments', 'hesitations'],
          ans: [0],
          exp: '"Health protocols" (بروتوكولات صحية) are standard preventive regulations.'
        },
        l5: {
          q: 'Had the clinical triage unit __________ the antiviral serum promptly, the viral outbreak would have been contained.',
          opts: ['administered', 'administering', 'administers', 'to administer'],
          ans: [0],
          exp: 'Inverted third conditional: Had + subject + P.P. (Had the unit administered...).'
        }
      },
      {
        title: 'Immunological Resilience and Modern Public Health Infrastructure',
        text: 'The twenty-first century has witnessed an unprecedented convergence between cellular immunology and preventative medicine. While pharmaceutical vaccines train memory T-cells to neutralize invasive antigens, societal resilience relies equally upon modern sanitation infrastructure and rapid triage protocols.',
        q: 'How do pharmaceutical vaccines train the immune system according to the passage?',
        opts: [
          'By priming memory T-cells to neutralize invasive antigens',
          'By destroying all white blood cells permanently',
          'By replacing human blood with synthetic plasma',
          'By lowering body temperature below zero degrees'
        ],
        ans: [0],
        exp: 'The passage explicitly states that vaccines prime memory T-cells to recognize and neutralize invasive antigens.'
      },
      {
        act: 1,
        q: 'In Shakespeare’s King Lear, how does the Love Test in Act 1 expose Lear’s catastrophic vanity and tragic blindness to true filial devotion?',
        qAr: 'في مسرحية الملك لير لشكسبير، كيف يكشف "اختبار الحب" في الفصل الأول عن غرور لير الكارثي وعماه المأساوي عن الوفاء البنوي الحقيقي؟',
        model: 'In Act 1, Lear demands that his three daughters publically compete in rhetorical flattery to earn their territorial dowries. Goneril and Regan offer lavish, hyperbolic praise born of pure hypocrisy and greed. Cordelia, however, refuses to manipulate language, declaring that she loves her father according to her sacred filial bond—no more, no less. Lear’s monstrous egotism mistakes honest devotion for cold insubordination. By banishing Cordelia and rewarding deceptive flatterers, Lear dismantles his own kingdom and initiates his agonizing psychological and political downfall.',
        criteria: ['Love Test flattery vs honest filial bond', 'Cordelia’s refusal to flatter', 'Lear’s tragic vanity initiating downfall']
      },
      {
        title: 'Analytical Discursive Essay: Preventative Healthcare vs Reactive Medicine',
        prompt: 'Write an argumentative essay (150-180 words) evaluating why national investment in preventative public health protocols delivers superior societal well-being compared to relying solely on curative hospitals.',
        outline: [
          'Introduction: Defining preventative vs curative healthcare; thesis statement on societal longevity.',
          'Body Paragraph 1: Cost efficiency and health equity of early immunization, clean sanitation, and nutrition.',
          'Body Paragraph 2: Reducing economic strain on intensive care units during pandemics.',
          'Conclusion: Synthesis and recommendation for Egypt’s 2026/2027 health vision.'
        ],
        model: 'Modern healthcare philosophy has fundamentally shifted from reactive emergency intervention to proactive preventive medicine. While state-of-the-art hospitals and surgical wards remain indispensable for trauma and acute illness, an over-reliance on curative treatment is both economically unsustainable and socially inefficient.\n\nFirst and foremost, preventive public health initiatives—such as universal childhood immunizations, clean drinking water filtration, and mobile cancer screenings—neutralize diseases before irreversible biological damage occurs. In Egypt, national campaigns targeting hepatitis C and non-communicable diseases demonstrate that early detection spares millions of citizens chronic suffering while drastically curtailing healthcare expenditures.\n\nConversely, treating advanced illnesses in intensive care units drains billions in public resources. When governments allocate substantial budgetary resources to health literacy, physical education, and environmental sanitation, hospitals remain unburdened, allowing physicians to deliver superior care to acute casualties.\n\nIn conclusion, preventive healthcare constitutes the cornerstone of a prosperous, resilient nation. Investing in the prevention of disease is incomparably wiser than treating its devastating aftermath.'
      }
    )
  },
  {
    id: 2,
    title: 'Eating Around the World',
    titleAr: 'عادات الغذاء وتغذية الشعوب والأمن الغذائي',
    theme: 'Global Diets, Nutritional Diversity, Food Sovereignty & Cultural Hospitality',
    grammarFocus: 'Gradable vs Non-gradable Adjectives & Comparative Structures (far more, slightly less, double comparatives)',
    novelChapter: 'King Lear: Act 2 (The Storm Gathers, Disrespect at Gloucester’s Castle & Sibling Rivalry)',
    exams: createStandardExams(
      2,
      11,
      'Eating Around the World',
      'عادات الغذاء وتغذية الشعوب',
      'Nuanced Comparatives and Intensifiers',
      'King Lear Act 2',
      {
        l1: {
          q: 'Traditional Mediterranean cuisine is widely renowned for its __________ culinary diversity and health benefits.',
          opts: ['exceptional', 'monument', 'scam', 'paramedic'],
          ans: [0],
          exp: '"Exceptional" (استثنائي) is an extreme, ungradable adjective.'
        },
        l2: {
          q: 'Organic vegetables cultivated using hydroponics are __________ more nutritious than greenhouse plants treated with chemical pesticides.',
          opts: ['far', 'more', 'too', 'as'],
          ans: [0],
          exp: '"Far" acts as an intensifier modifying the comparative adjective "more nutritious".'
        },
        l3: {
          q: 'The more balanced your daily nutritional intake is, the __________ your physical stamina will become.',
          opts: ['better', 'good', 'best', 'more good'],
          ans: [0],
          exp: 'Double comparative: "The more... the better...".'
        },
        l4: {
          q: 'Maintaining national food __________ ensures a country never depends entirely on volatile foreign grain imports.',
          opts: ['sovereignty', 'emissions', 'monuments', 'hesitations'],
          ans: [0],
          exp: '"Food sovereignty" (السيادة الغذائية) denotes national self-sufficiency in nutrition.'
        },
        l5: {
          q: 'Hardly __________ the banquet commenced when news of the impending drought reached the provincial council.',
          opts: ['had', 'did', 'was', 'were'],
          ans: [0],
          exp: 'Negative inversion: Hardly had + subject + past participle... when...'
        }
      },
      {
        title: 'Nutritional Anthropology and the Modern Food Renaissance',
        text: 'Food is far more than physiological sustenance; it embodies ancestral heritage, ecology, and social solidarity. Ancient Egyptian agricultural wisdom domesticating emmer wheat and barley along the Nile provided the caloric bedrock for monumental civilization.',
        q: 'What role did early Nile agriculture play in pharaonic civilization?',
        opts: [
          'It provided the caloric and economic bedrock that allowed monumental civilization to thrive',
          'It destroyed all native flora across Upper Egypt',
          'It forced ancient Egyptians to import grain from Europe',
          'It caused ancient farmers to abandon writing'
        ],
        ans: [0],
        exp: 'Paragraph 1 explains that domesticating emmer wheat and barley provided the caloric foundation for civilization.'
      },
      {
        act: 2,
        q: 'In Act 2 of King Lear, how do Goneril and Regan systematically strip their father of his royal retinue, and what does this reveal about their moral nature?',
        qAr: 'في الفصل الثاني من مسرحية الملك لير، كيف تجرد جونريل وريجان والدهما بصورة ممنهجة من حرسه ومظاهر ملكه؟',
        model: 'In Act 2, Goneril and Regan engage in a callous psychological dissection of Lear’s dignity. Lear enters hoping for filial sanctuary, but his daughters unite against him. First Goneril demands he dismiss half of his one hundred knights; then Regan insists on fifty, then twenty-five, and finally asks: "What need one?" This ruthless reduction proves that their declarations of love in Act 1 were cold calculation. Stripping him of his knights is an intentional humiliation designed to reduce the monarch to a helpless, dependent beggar.',
        criteria: ['Systematic reduction of 100 knights', 'Goneril and Regan’s unified cruelty', 'Contrast with Act 1 hypocritical flattery']
      },
      {
        title: 'Expository Essay: Food Waste and Global Redistribution Systems',
        prompt: 'Write an essay (150-180 words) analyzing the causes of catastrophic food waste in modern cities and outlining practical community solutions.',
        outline: [
          'Introduction: Global paradox of severe food waste alongside food insecurity.',
          'Body Paragraph 1: Supply chain inefficiencies, retail cosmetic standards, and consumer over-purchasing.',
          'Body Paragraph 2: Technological food-rescue apps, community food banks, and composting initiatives.',
          'Conclusion: Ethical obligation to achieve zero hunger.'
        ],
        model: 'In our contemporary world, humanity faces an intolerable ethical paradox: while hundreds of millions suffer from chronic malnutrition, nearly one-third of all food produced globally is discarded into municipal landfills. Addressing this catastrophic squandering of calories is an urgent moral and environmental imperative.\n\nFood waste occurs across every link of the supply chain. In agricultural harvesting, crops are often rejected purely for aesthetic imperfections. In urban households, consumer over-purchasing and confusing expiration labels result in perfectly edible nourishment being thrown away. When organic matter rots in landfills, it emits colossal volumes of methane, accelerating climate destabilization.\n\nTo counteract this crisis, societies must institute smart food redistribution networks. Mobile applications now connect surplus supermarket bakery items with local charities in real-time. In Egypt, national food banks collect untouched banquet meals from hotels, packaging them under strict hygienic standards for underprivileged families.\n\nIn conclusion, eliminating food waste requires both systemic supply-chain modernization and conscious individual responsibility. By valuing food as a sacred communal gift, we can foster a world where hunger is eradicated forever.'
      }
    )
  },
  {
    id: 3,
    title: 'The Future of Agriculture',
    titleAr: 'مستقبل الزراعة المائية والأمن الغذائي المستدام',
    theme: 'Hydroponics, Vertical Farming, Sustainable Desalination & Desert Greenery',
    grammarFocus: 'Future Continuous (will be doing) & Future Perfect (will have done) + Time Clauses',
    novelChapter: 'King Lear: Act 3 (The Mad King on the Stormy Heath, Edgar’s Disguise & The Trial)',
    exams: createStandardExams(
      3,
      11,
      'The Future of Agriculture',
      'مستقبل الزراعة المائية',
      'Future Continuous and Future Perfect',
      'King Lear Act 3',
      {
        l1: {
          q: 'The innovative method of growing crops in nutrient-enriched water solutions without soil is known as __________.',
          opts: ['hydroponics', 'monument', 'scam', 'paramedic'],
          ans: [0],
          exp: '"Hydroponics" (الزراعة المائية بدون تربة) conserves up to 90% of water.'
        },
        l2: {
          q: 'By the year 2030, the national agricultural authority __________ three million feddans of reclaimed desert.',
          opts: ['will have cultivated', 'will cultivate', 'is cultivating', 'cultivated'],
          ans: [0],
          exp: 'Future Perfect (will have + P.P.) indicates an action completed before a specific future deadline ("By 2030").'
        },
        l3: {
          q: 'This time tomorrow, the agronomy researchers __________ soil salinity levels in the Toshka project.',
          opts: ['will be testing', 'will have tested', 'test', 'tested'],
          ans: [0],
          exp: 'Future Continuous (will be + V-ing) expresses an ongoing action at a specific future moment.'
        },
        l4: {
          q: 'Vertical indoor farms utilize artificial LED lighting to maximize photosynthetic __________ throughout the winter.',
          opts: ['efficiency', 'pollution', 'hesitation', 'disappointment'],
          ans: [0],
          exp: '"Photosynthetic efficiency" (كفاءة البناء الضوئي) describes plant energy conversion.'
        },
        l5: {
          q: 'No sooner __________ the automated drip-irrigation grid been activated than the water sensors stabilized.',
          opts: ['had', 'did', 'was', 'were'],
          ans: [0],
          exp: 'No sooner had + subject + past participle... than...'
        }
      },
      {
        title: 'Agricultural Engineering in the Toshka and New Delta Megaprojects',
        text: 'Facing an expanding population and arid climate realities, Egypt has embarked upon monumental agricultural engineering works in Toshka and the New Delta. By recycling agricultural drainage water through cutting-edge treatment facilities, millions of feddans of barren sand are being transformed into fertile grain fields.',
        q: 'How does the New Delta project secure water for desert land reclamation?',
        opts: [
          'By recycling agricultural drainage through advanced treatment facilities',
          'By importing icebergs from the Antarctic',
          'By pumping untreated sewage directly onto crops',
          'By draining the Nile completely'
        ],
        ans: [0],
        exp: 'Paragraph 1 explains that agricultural drainage water is recycled through mega treatment facilities.'
      },
      {
        act: 3,
        q: 'In Act 3 of King Lear, analyze the dramatic and psychological significance of the Storm on the Heath.',
        qAr: 'في الفصل الثالث من مسرحية الملك لير، حلل الدلالة الدرامية والنفسية لمشهد العاصفة الهوجاء في البرية.',
        model: 'The storm in Act 3 is one of the most powerful externalizations of inner psychological turmoil in dramatic literature. The raging winds, lightning, and torrential rain mirror Lear’s inner descent into madness as he recognizes his daughters’ monstrous ingratitude. Stripped of crown, robes, and royal authority, Lear is reduced to "unaccommodated man"—a bare, forked animal exposed to the ruthless elements. Paradoxically, this descent into madness sparks his moral awakening: for the first time in his life, Lear feels profound empathy for the "poor naked wretches" who have no shelter from the storm.',
        criteria: ['Storm mirroring internal psychological madness', 'Reduction to "unaccommodated man"', 'Moral awakening and empathy for poor']
      },
      {
        title: 'Argumentative Essay: Vertical Urban Farming vs Traditional Rural Agriculture',
        prompt: 'Write an analytical essay (150-180 words) evaluating whether high-tech vertical farms in smart cities can realistically supplant traditional soil agriculture.',
        outline: [
          'Introduction: Defining vertical farming; thesis on complementary coexistence.',
          'Body Paragraph 1: Advantages of vertical indoor farming (90% water saving, zero pesticide use, zero transport emissions).',
          'Body Paragraph 2: Limitations (high electrical energy costs, limited staple crop suitability like wheat/rice).',
          'Conclusion: A balanced dual approach for 2026/2027 national food security.'
        ],
        model: 'The rapid urbanization of the global populace, combined with escalating freshwater scarcity, has ignited a fierce debate concerning the viability of vertical farming as a replacement for conventional soil agriculture. While vertical hydroponic facilities offer revolutionary environmental efficiencies, they should be perceived as a powerful complement to, rather than an outright replacement for, rural agrarian farming.\n\nOn one hand, indoor vertical facilities located within smart metropolises drastically conserve resources. They consume ninety percent less water than conventional flood irrigation and require zero chemical pesticides due to sealed, sterilized microclimates. Furthermore, growing produce within city borders eliminates thousands of miles of refrigerated transit, slashing carbon emissions and providing fresh leafy greens directly to urban consumers.\n\nConversely, vertical facilities face formidable economic and biological hurdles. The colossal electrical expenditure required to power artificial LED illumination and computerized climate chillers makes vertical farming costly. More crucially, high-volume staple carbohydrates that sustain nations—such as wheat, corn, and rice—cannot yet be economically cultivated inside vertical warehouses.\n\nIn conclusion, the future of food security relies on an integrated agrarian paradigm. Traditional farmers must adopt modern drip irrigation for extensive staple crops, while vertical urban farms supply urban centers with fresh horticulture.'
      }
    )
  },
  {
    id: 4,
    title: 'Living and Working Abroad',
    titleAr: 'العمل والإقامة في الخارج والتكيف الثقافي',
    theme: 'Culture Shock, Expatriates, International Work Ethic & Cross-Cultural Competence',
    grammarFocus: 'Present Perfect Simple vs. Present Perfect Continuous (duration, result, state verbs)',
    novelChapter: 'King Lear: Act 4 (Cordelia’s Return, The Dover Cliff Illusion & Lear’s Recovery)',
    exams: createStandardExams(
      4,
      11,
      'Living and Working Abroad',
      'العمل والإقامة في الخارج',
      'Present Perfect Simple vs Continuous',
      'King Lear Act 4',
      {
        l1: {
          q: 'The psychological disorientation experienced by individuals suddenly immersed in an unfamiliar cultural environment is termed culture __________.',
          opts: ['shock', 'monument', 'scam', 'donation'],
          ans: [0],
          exp: '"Culture shock" (صدمة ثقافية) describes the psychological adjustment period when living abroad.'
        },
        l2: {
          q: 'Dr. Youssef __________ at the European Molecular Biology Laboratory for eight years, publishing ten landmark papers.',
          opts: ['has been working', 'works', 'was working', 'is working'],
          ans: [0],
          exp: 'Present Perfect Continuous (has been working) highlights uninterrupted ongoing duration extending up to the present.'
        },
        l3: {
          q: 'She has already __________ her foreign visa credentials and residency permit.',
          opts: ['renewed', 'renewing', 'renew', 'been renewed'],
          ans: [0],
          exp: 'Present Perfect Simple (has renewed) emphasizes a completed result with present relevance.'
        },
        l4: {
          q: 'A citizen living and working professionally outside their native country is designated as an __________.',
          opts: ['expatriate', 'monument', 'scam', 'paramedic'],
          ans: [0],
          exp: 'An "expatriate" (مغترب) resides abroad for professional or personal reasons.'
        },
        l5: {
          q: 'Scarcely had the young diplomat landed in Geneva __________ bilateral trade deliberations commenced.',
          opts: ['when', 'than', 'that', 'where'],
          ans: [0],
          exp: 'Correlative pairing: Scarcely had... when...'
        }
      },
      {
        title: 'The Egyptian Diaspora: Catalysts for National Innovation',
        text: 'Across six continents, millions of Egyptian expatriates serve as doctors, software architects, and university professors. Rather than representing an irreversible "brain drain", contemporary digital connectivity transforms this global diaspora into a powerhouse of knowledge transfer and sovereign investment.',
        q: 'How does modern digital connectivity redefine the role of the Egyptian diaspora?',
        opts: [
          'It facilitates continuous knowledge transfer, academic mentorship, and investment into the homeland',
          'It forces expatriates to sever all ties with their birthplace',
          'It eliminates all need for scientific research in Egypt',
          'It prevents expatriates from visiting Cairo'
        ],
        ans: [0],
        exp: 'Paragraph 1 explains digital networks enable the diaspora to transfer knowledge, mentor youth, and invest.'
      },
      {
        act: 4,
        q: 'In Act 4 of King Lear, how does Edgar use the theatrical illusion of the "Dover Cliff" to cure his blinded father Gloucester of suicidal despair?',
        qAr: 'في الفصل الرابع من مسرحية الملك لير، كيف وظف إدجار الخداع المسرحي "لحافة دوفر" لإنقاذ والده الأعمى جلوستر من اليأس والانتحار؟',
        model: 'In Act 4, Gloucester, blinded and shattered by the betrayal of his illegitimate son Edmund, wishes only to plunge to his death from the high cliffs of Dover. Edgar, disguised as Poor Tom, leads his father across flat ground while using vivid poetic descriptions to convince him they are standing on the dizzying precipice. Gloucester falls forward onto level grass. Edgar then pretends to be a stranger at the bottom, telling Gloucester that he miraculously survived a monstrous drop through divine intervention. Through this compassionate psychological drama, Edgar restores Gloucester’s faith in providence, showing that despair can be conquered through loving filial devotion.',
        criteria: ['Gloucester’s suicidal despair after blinding', 'Edgar’s sensory illusion of Dover Cliff', 'Spiritual cure restoring faith in life']
      },
      {
        title: 'Reflective Discursive Essay: The Cultural Ambassador Mindset Abroad',
        prompt: 'Write an essay (150-180 words) evaluating how students living abroad can preserve their cultural values while enthusiastically assimilating into foreign academic societies.',
        outline: [
          'Introduction: Dual challenge of living abroad; thesis on cultural rootedness combined with open-minded engagement.',
          'Body Paragraph 1: Rootedness in ancestral language, ethics, and civic pride.',
          'Body Paragraph 2: Respectful integration into host community norms, academic collaboration, and language mastery.',
          'Conclusion: Synthesis: the expatriate as an enlightened bridge between civilizations.'
        ],
        model: 'Venturing abroad to pursue higher education or professional careers represents one of the most transformative journeys a young person can undertake. While immersion in an unfamiliar society presents undeniable challenges—including linguistic barriers and culture shock—it offers an extraordinary opportunity to act as an enlightened cultural ambassador.\n\nTo navigate this journey successfully, individuals must maintain a firm anchor in their ancestral cultural identity. Preserving one’s mother tongue, moral values, and communal traditions provides psychological resilience and a profound sense of purpose. When Egyptian students take pride in their illustrious heritage, they command natural respect from international peers rather than feeling lost in an alien environment.\n\nSimultaneously, true cultural representation requires proactive, open-minded engagement with the host society. Rejecting cultural integration out of fear breeds unhealthy isolation. Expatriates should actively participate in university societies, master the local language, respect host customs, and collaborate on multinational research teams. By demonstrating integrity, intellectual rigor, and empathy, expatriates dismantle stereotypes and build enduring bridges between civilizations.\n\nIn conclusion, living abroad should never mean abandoning one’s roots; it means expanding one’s horizons to enrich both oneself and one’s homeland.'
      }
    )
  },
  {
    id: 5,
    title: 'The Power of the Press',
    titleAr: 'سلطة الصحافة والإعلام الرقمي وأخلاقيات النشر',
    theme: 'Investigative Journalism, Media Ethics, Fact-Checking & Digital Press Freedom',
    grammarFocus: 'Advanced Passive Voice across all continuous and perfect forms + Impersonal Passive (It is said that...)',
    novelChapter: 'King Lear: Act 5 (The Tragic Climax, Edmund’s Downfall & Cordelia’s Death)',
    exams: createStandardExams(
      5,
      11,
      'The Power of the Press',
      'سلطة الصحافة والإعلام',
      'Advanced Passive Voice and Impersonal Reporting',
      'King Lear Act 5',
      {
        l1: {
          q: 'Journalistic investigation that exposes corruption and public deception is termed __________ journalism.',
          opts: ['investigative', 'monument', 'scam', 'paramedic'],
          ans: [0],
          exp: '"Investigative journalism" (الصحافة الاستقصائية) relies on deep factual documentation.'
        },
        l2: {
          q: 'The breaking investigative story __________ by editorial fact-checkers right now before publication.',
          opts: ['is being scrutinized', 'is scrutinizing', 'was scrutinized', 'has scrutinized'],
          ans: [0],
          exp: 'Present continuous passive: is/are being + past participle (is being scrutinized).'
        },
        l3: {
          q: 'It __________ that trustworthy independent newspapers are the bedrock of an informed democratic populace.',
          opts: ['is believed', 'believes', 'was believing', 'has believing'],
          ans: [0],
          exp: 'Impersonal passive reporting: "It is believed that..."'
        },
        l4: {
          q: 'Responsible reporters adhere to a strict ethical __________ of conduct to safeguard journalistic integrity.',
          opts: ['code', 'monument', 'scam', 'disappointment'],
          ans: [0],
          exp: 'An "ethical code" (ميثاق شرف أخلاقي) governs professional journalistic practice.'
        },
        l5: {
          q: 'Under no circumstances __________ confidential journalistic sources be revealed without judicial authorization.',
          opts: ['should', 'they should', 'did they', 'ought'],
          ans: [0],
          exp: 'Negative inversion: Under no circumstances should + subject + base verb...'
        }
      },
      {
        title: 'Algorithmic Journalism and the Crisis of Objectivity',
        text: 'The proliferation of digital news aggregation and social media feeds has altered the democratic role of the press. When corporate algorithms prioritize sensational "clickbait" over rigorous investigative reporting, public trust in journalistic institutions erodes precipitously.',
        q: 'Why does algorithmic prioritization of sensational clickbait threaten journalism?',
        opts: [
          'Because it prioritizes emotional engagement over factual accuracy, eroding public trust in truth',
          'Because all newspapers have run out of printing paper',
          'Because journalists are forbidden from using the internet',
          'Because computers can only write poetry'
        ],
        ans: [0],
        exp: 'Paragraph 1 explains that sensational clickbait destroys public trust and sacrifices rigorous fact-checking.'
      },
      {
        act: 5,
        q: 'In the tragic climax of Act 5 of King Lear, what moral message does Shakespeare communicate through the death of Cordelia and Lear’s final grief?',
        qAr: 'في ذروة المأساة في الفصل الخامس من مسرحية الملك لير، ما الرسالة الأخلاقية والفلسفية التي يجسدها شكسبير بموت كورديليا وموت لير كمداً؟',
        model: 'Act 5 brings Shakespeare’s darkest and most profound tragic vision to its devastating conclusion. Although the villains (Edmund, Goneril, and Regan) are destroyed by their own treacherous machinations, justice arrives too late to save the innocent Cordelia, who is murdered in prison. Lear enters holding Cordelia’s dead body in his arms, uttering the heartbreaking cry: "Howl, howl, howl, howl! O, you are men of stones!" Lear’s ultimate collapse over his dead daughter strips away all illusions of earthly power and pride. Shakespeare demonstrates that tragic hubris and moral blindness unleash destructive forces that consume the innocent alongside the guilty, leaving humanity with only the solemn duty to speak what we feel, not what we ought to say.',
        criteria: ['Tragic death of innocent Cordelia despite villains’ demise', 'Lear’s howl of ultimate grief over his daughter', 'Human vulnerability and moral truth over false pride']
      },
      {
        title: 'Analytical Essay: Citizen Journalism vs Professional News Organizations',
        prompt: 'Write an argumentative essay (150-180 words) evaluating whether smartphone citizen journalism can ever replace professional investigative news agencies.',
        outline: [
          'Introduction: Rise of smartphone recording and instant social publishing.',
          'Body Paragraph 1: Benefits of citizen journalism (real-time eyewitness footage, uncurated coverage of remote events).',
          'Body Paragraph 2: Critical flaws (absence of ethical fact-checking, confirmation bias, susceptibility to deepfakes and manipulation).',
          'Conclusion: Essential symbiosis between eyewitness citizens and verified professional editors.'
        ],
        model: 'The proliferation of high-definition smartphones and decentralized social networks has empowered ordinary citizens to broadcast breaking news events instantaneously across the globe. While this phenomenon—often termed "citizen journalism"—has democratized the flow of information, it can never entirely replace professional, accredited news agencies.\n\nOn one hand, citizen journalism provides immediate, uncurated eyewitness perspectives. During natural disasters or unexpected street accidents, bystanders capture raw visual documentation hours before conventional television crews arrive on the scene. This rapid reporting bypasses bureaucratic delays and exposes realities that might otherwise go unnoticed.\n\nHowever, citizen journalists rarely possess the professional training required to verify sources, cross-examine claims, or understand media law. Without institutional editorial oversight, unverified rumors, partisan bias, and synthesized deepfake imagery spread rapidly under the guise of citizen reporting. Professional journalists, by contrast, are bound by statutory ethical codes, legal liabilities, and multi-layered fact-checking procedures that protect the public from dangerous misinformation.\n\nIn conclusion, citizen journalism should be regarded as a valuable source of raw frontline data, not the final arbiter of truth. Professional journalists remain the indispensable guardians of accuracy, integrity, and investigative depth in democratic societies.'
      }
    )
  },
  {
    id: 6,
    title: 'The Future of Energy',
    titleAr: 'مستقبل الطاقة البديلة والنووية النظيفة',
    theme: 'Clean Energy Transition, Green Hydrogen, El-Dabaa Nuclear Plant & Smart Grids',
    grammarFocus: 'Relative Clauses (Defining vs Non-defining) & Prepositions with Relative Pronouns (in which, to whom)',
    novelChapter: 'King Lear: Comprehensive Literary Reflection (Vanity, Divine Justice & Redemption)',
    exams: createStandardExams(
      6,
      11,
      'The Future of Energy',
      'مستقبل الطاقة البديلة',
      'Relative Clauses and Prepositions',
      'King Lear Reflection',
      {
        l1: {
          q: 'The El-Dabaa Nuclear Power Plant, __________ is currently under construction on the Mediterranean coast, will generate clean baseload electricity.',
          opts: ['which', 'that', 'where', 'whose'],
          ans: [0],
          exp: 'Non-defining relative clause with commas referring to a thing/plant requires "which".'
        },
        l2: {
          q: 'Green hydrogen is produced through the process of water electrolysis, __________ renewable electricity is utilized.',
          opts: ['in which', 'to which', 'at which', 'whose'],
          ans: [0],
          exp: 'Formal prepositional relative structure: "in which" (= in the course of which).'
        },
        l3: {
          q: 'The engineers __________ designed the smart electrical grid received the National Science Excellence Medal.',
          opts: ['who', 'whom', 'which', 'whose'],
          ans: [0],
          exp: 'Defining relative pronoun for human subjects: "who".'
        },
        l4: {
          q: 'Transitioning to nuclear baseload power eliminates reliance on combustible __________ fuels.',
          opts: ['fossil', 'renewable', 'solar', 'hydro'],
          ans: [0],
          exp: '"Fossil fuels" (الوقود الأحفوري) produce greenhouse gas emissions.'
        },
        l5: {
          q: 'Not only __________ the Benban and Zafarana facilities generate gigawatts of clean power, but they also lower carbon tariffs.',
          opts: ['do', 'are', 'did', 'have'],
          ans: [0],
          exp: 'Inversion after "Not only": Not only do + subject + base verb...'
        }
      },
      {
        title: 'The Egyptian Clean Energy Crossroads: Hydrogen and Nuclear Synthesis',
        text: 'Situated at the crossroads of Africa, the Mediterranean, and the Middle East, Egypt is transforming into a regional green energy interconnection hub. By pairing the gigawatt solar output of Upper Egypt with the El-Dabaa peaceful nuclear plant and the Suez Canal green hydrogen corridor, the nation is establishing an unassailable green infrastructure.',
        q: 'What makes Egypt uniquely suited to become a regional green energy hub?',
        opts: [
          'Its strategic geographic location, immense solar/wind capacity, and El-Dabaa nuclear baseload integration',
          'Its complete dependence on imported coal',
          'Its decision to shut down the Aswan High Dam',
          'The absence of any modern electricity transmission grids'
        ],
        ans: [0],
        exp: 'Paragraph 1 highlights its strategic geography, massive solar/wind capacity, and nuclear baseload integration.'
      },
      {
        act: 5,
        q: 'Evaluate the overarching tragedy of King Lear: Is the play ultimately a narrative of nihilistic despair or a testament to the redeeming power of human love?',
        qAr: 'قيّم المأساة الكلية لمسرحية الملك لير: هل هي مسرحية عن اليأس والعدمية أم شهادة على قوة الفداء والحب الإنساني؟',
        model: 'While King Lear depicts unprecedented human cruelty, physical agony (Gloucester’s blinding), and cosmic indifference, it is ultimately redeemed by the transcendent moral triumph of selfless love. Characters like Cordelia, Edgar, and Kent prove that moral goodness can endure the most horrific cruelties. Cordelia’s unconditional forgiveness of the broken, humble Lear in Act 4 elevates the play beyond mere nihilism. Lear is transformed from a tyrannical monarch obsessed with vanity into a spiritually awakened father who cherishes love above worldly power. Though the ending is agonizingly tragic, the spiritual illumination gained through suffering asserts that love, loyalty, and empathy are humanity’s supreme, indestructible treasures.',
        criteria: ['Tragic cruelty vs transcendent moral love', 'Cordelia and Edgar’s unconditional loyalty', 'Lear’s spiritual redemption from vanity to humility']
      },
      {
        title: 'Analytical Essay: The Role of Nuclear Clean Energy in Reaching Carbon Neutrality',
        prompt: 'Write an analytical essay (150-180 words) evaluating why modern peaceful nuclear energy is an essential component of the global transition to net-zero carbon emissions.',
        outline: [
          'Introduction: Global urgency of decarbonization; thesis on nuclear power as vital clean baseload.',
          'Body Paragraph 1: High energy density, zero direct greenhouse gas emissions, and continuous 24/7 reliability.',
          'Body Paragraph 2: Addressing historical safety concerns through modern Generation III+ reactor technologies.',
          'Conclusion: Synthesis of nuclear energy and renewables for an enduring green future.'
        ],
        model: 'As the catastrophic ramifications of planetary climate change intensify, international policymakers recognize that decarbonizing national electrical grids requires a multifaceted clean energy matrix. While variable renewables like solar and wind are indispensable, they suffer from natural intermittency—the sun does not shine at night, and wind currents fluctuate. To achieve net-zero carbon neutrality, modern peaceful nuclear energy must serve as the clean baseload foundation.\n\nFirst and foremost, nuclear power stations generate colossal quantities of electricity with zero direct greenhouse gas emissions during operation. A single uranium fuel pellet produces the energy equivalent of one ton of coal without releasing carbon dioxide into the atmosphere. Unlike solar installations that demand sprawling land expanses, nuclear plants possess an exceptionally compact footprint while operating continuously twenty-four hours a day, three hundred and sixty-five days a year.\n\nFurthermore, contemporary Generation III+ nuclear reactors—such as those engineered for Egypt’s El-Dabaa project—incorporate advanced passive safety architectures. In the event of an electrical failure, these cooling mechanisms operate automatically using gravity and natural convection without human intervention, neutralizing historical catastrophic risks.\n\nIn conclusion, achieving climate stability demands combining the agility of solar and wind with the relentless baseload power of nuclear technology. Together, they offer humanity a viable pathway toward an emission-free, prosperous industrial future.'
      }
    )
  }
];

// ------------------------------------------------------------------------------------------------
// 3. SECONDARY 3 (GRADE 12) GENERAL TRACK - THANAWEYA AMMA CERTIFICATE
// Novel: Great Expectations by Charles Dickens (Chapters 1 to 12)
// ------------------------------------------------------------------------------------------------
export const secondary3GeneralUnits: UnitInfo[] = [
  {
    id: 1,
    title: 'Read All About It!',
    titleAr: 'اقرأ كل شيء عن الحدث! (الصحافة وحقوق الملكية الفكرية)',
    theme: 'Intellectual Property, Digital Piracy, Tabloid vs Broadsheet Journalism & Media Bias',
    grammarFocus: 'Past Simple, Past Continuous & Past Perfect narrative mastery (had done / had been doing)',
    novelChapter: 'Great Expectations: Chapters 1-2 (The Marshes, Pip’s Encounter with Magwitch & Theft of the File)',
    exams: createStandardExams(
      1,
      12,
      'Read All About It!',
      'اقرأ كل شيء عن الحدث!',
      'Past Perfect and Narrative Tenses',
      'Great Expectations Ch 1-2',
      {
        l1: {
          q: 'The illegal duplication, distribution, or commercial exploitation of copyrighted digital literature is termed digital __________.',
          opts: ['piracy', 'monument', 'scam', 'donation'],
          ans: [0],
          exp: '"Digital piracy" (القرصنة الرقمية) violates copyright intellectual property.'
        },
        l2: {
          q: 'By the time the police raided the illicit printing press, the counterfeiters __________ thousands of pirated textbooks.',
          opts: ['had distributed', 'distributed', 'have distributed', 'were distributing'],
          ans: [0],
          exp: 'Past Perfect (had distributed) indicates an action completed before another past event ("By the time they raided").'
        },
        l3: {
          q: 'A newspaper characterized by sensational celebrity gossip, dramatic headlines, and large photographs is a __________.',
          opts: ['tabloid', 'broadsheet', 'peer-reviewed journal', 'monograph'],
          ans: [0],
          exp: 'A "tabloid" (صحيفة إثارة شعبية) contrasts with an analytical "broadsheet".'
        },
        l4: {
          q: 'While the investigative reporter __________ through the archives, she discovered evidence of embezzlement.',
          opts: ['had been searching', 'searched', 'was searching', 'has searched'],
          ans: [2],
          exp: 'Past Continuous (was searching) for the continuous background action interrupted by discovery.'
        },
        l5: {
          q: 'Hardly had the controversial news article gone viral __________ the publishing board issued a formal retraction.',
          opts: ['when', 'than', 'that', 'where'],
          ans: [0],
          exp: 'Inversion pairing: Hardly had... when...'
        }
      },
      {
        title: 'Intellectual Property and the Digital Commons in Egypt',
        text: 'The protection of intellectual property rights (IPR) is foundational to national economic competitiveness and literary innovation. When creative authors and scientific researchers are shielded from digital piracy, they are empowered to produce groundbreaking literature and patented technologies.',
        q: 'Why is intellectual property protection vital for national competitiveness?',
        opts: [
          'It shields innovators from theft, encouraging research and cultural production',
          'It bans the publication of all school textbooks',
          'It prevents foreign tourists from reading newspapers',
          'It makes computers illegal in universities'
        ],
        ans: [0],
        exp: 'Paragraph 1 explains that IPR protection empowers creators and drives scientific and literary innovation.'
      },
      {
        act: 1,
        q: 'In Charles Dickens’s Great Expectations (Chapters 1-2), analyze how the gloomy setting of the desolate marshland mirrors Pip’s psychological terror during his encounter with the escaped convict Magwitch.',
        qAr: 'في رواية آمال كبرى لتشارلز ديكنز (الفصلين 1-2)، حلل كيف تعكس الطبيعة الكئيبة للمستنقعات الرعب النفسي للطفل بيب عند لقائه بالسجين الهارب ماجويتش.',
        model: 'Dickens masterfully uses the bleak, fog-shrouded Kent marshes and graveyard to externalize Pip’s overwhelming vulnerability and childhood terror. Surrounded by cold gravestones, stinging nettles, and rotting dikes, Pip feels completely abandoned. Magwitch suddenly erupts from among the graves like a terrifying specter—shivering, limping, and starved. The harsh, threatening language Magwitch uses, threatening to tear out Pip’s heart and liver, violently shatters the child’s innocent domestic world. This nightmarish encounter plants the seeds of moral guilt that will torment Pip throughout his youth.',
        criteria: ['Bleak Kent marshes mirroring vulnerability', 'Magwitch’s monstrous sudden emergence', 'Seeding Pip’s lifelong guilt and moral trauma']
      },
      {
        title: 'Analytical Essay: The Economic and Moral Toll of Digital Piracy',
        prompt: 'Write an argumentative essay (150-180 words) evaluating how digital copyright infringement undermines creative industries and national economic development.',
        outline: [
          'Introduction: Ubiquity of illegal digital downloads; thesis on the destruction of intellectual capital.',
          'Body Paragraph 1: Direct economic harm to authors, publishers, and software engineers.',
          'Body Paragraph 2: Long-term cultural consequences: decline in high-quality investigative and academic publishing.',
          'Conclusion: The imperative for stringent cyber legislation and ethical digital consumer literacy.'
        ],
        model: 'In our interconnected digital age, the unauthorized downloading and distribution of copyrighted works—commonly termed digital piracy—is frequently dismissed by consumers as a harmless act. However, a rigorous examination reveals that copyright infringement inflicts catastrophic economic and cultural devastation upon societies.\n\nFirst and foremost, intellectual theft deprives creative professionals of their rightful livelihoods. Authors, software developers, and independent filmmakers invest thousands of hours and substantial financial capital into producing original intellectual property. When pirated copies circulate freely on illicit file-sharing platforms, revenue collapses, forcing publishing houses and tech studios into bankruptcy. Consequently, young artists and engineers are deterred from pursuing creative professions.\n\nFurthermore, pervasive piracy erodes national economic innovation. Foreign corporations hesitate to invest in jurisdictions where patents and copyrights are not vigorously protected by the rule of law. Ultimately, when creators cannot monetize their labor, the intellectual and cultural output of an entire nation languishes.\n\nIn conclusion, combating digital piracy requires more than statutory legal penalties; it demands a collective moral awakening. Respecting intellectual property is the fundamental prerequisite for a vibrant, thriving knowledge economy.'
      }
    )
  },
  {
    id: 2,
    title: 'Her Story: Pioneering Women',
    titleAr: 'قصتها: رائدات ملهمات غيرن مجرى التاريخ',
    theme: 'Egyptian Women Pioneers (Dr. Hikmat Abu Zayd, Dr. Samira Moussa), Overcoming Prejudice & Scholarly Grit',
    grammarFocus: 'Comparative and Superlative Structures & Adjective Order (Opinion, Size, Age, Shape, Color, Origin, Material)',
    novelChapter: 'Great Expectations: Chapters 3-4 (Satis House, Miss Havisham’s Bitter World & Estella’s Contempt)',
    exams: createStandardExams(
      2,
      12,
      'Her Story: Pioneering Women',
      'قصتها: رائدات ملهمات',
      'Comparative Nuances and Adjective Order',
      'Great Expectations Ch 3-4',
      {
        l1: {
          q: 'An outstanding trailblazer who shatters societal prejudice and establishes new frontiers in science is a __________.',
          opts: ['pioneer', 'scam', 'monument', 'hesitation'],
          ans: [0],
          exp: 'A "pioneer" (رائدة / رائد) leads the way in a field of inquiry or social reform.'
        },
        l2: {
          q: 'Choose the correct adjective order: "Dr. Hikmat Abu Zayd wore an __________ silk scarf at the ministerial inauguration."',
          opts: [
            'elegant long new Egyptian',
            'Egyptian elegant new long',
            'new long elegant Egyptian',
            'long new Egyptian elegant'
          ],
          ans: [0],
          exp: 'Adjective order: Opinion (elegant) + Size/Length (long) + Age (new) + Origin (Egyptian).'
        },
        l3: {
          q: 'Dr. Samira Moussa was __________ the most brilliant nuclear physicist of her generation.',
          opts: ['by far', 'far', 'as', 'too'],
          ans: [0],
          exp: '"By far" modifies superlative adjectives ("by far the most brilliant").'
        },
        l4: {
          q: 'Overcoming entrenched gender __________ requires persistent scientific excellence and institutional policy reform.',
          opts: ['stereotypes', 'monuments', 'scams', 'emissions'],
          ans: [0],
          exp: '"Stereotypes" (صور نمطية مسبقة) are oversimplified, discriminatory assumptions.'
        },
        l5: {
          q: 'Seldom __________ a female scholar exhibited such extraordinary mathematical fortitude as Dr. Sameera Moussa.',
          opts: ['had', 'did', 'was', 'were'],
          ans: [0],
          exp: 'Inversion after Seldom: Seldom had + subject + past participle...'
        }
      },
      {
        title: 'Dr. Sameera Moussa: The Atoms for Peace Visionary',
        text: 'Born in Gharbia in 1917, Dr. Sameera Moussa became the first female Egyptian nuclear scientist and the first woman to earn a doctorate from Cairo University. Renowned for discovering a formula that made nuclear medicine radically accessible, she famously proclaimed: "I will make nuclear treatment as available as aspirin."',
        q: 'What revolutionary humanitarian goal did Dr. Sameera Moussa pursue?',
        opts: [
          'To make nuclear cancer medical treatments as accessible as common aspirin',
          'To manufacture nuclear weapons for international sale',
          'To ban women from attending scientific universities',
          'To eliminate all medical hospitals in Egypt'
        ],
        ans: [0],
        exp: 'Paragraph 1 quotes her noble pledge to make nuclear cancer therapy as accessible and affordable as aspirin.'
      },
      {
        act: 2,
        q: 'In Chapters 3-4 of Great Expectations, analyze the atmosphere of Satis House and how Miss Havisham uses Estella as an instrument of vengeance against mankind.',
        qAr: 'في الفصلين 3-4 من رواية آمال كبرى، حلل الأجواء الكئيبة لمنزل "ساتيس هاوس" وكيف وظفت الآنسة هافيشام إستيلا للانتقام من جنس الرجال.',
        model: 'Satis House is a grotesque physical monument to frozen time, decaying grief, and bitter revenge. Everything inside the darkened manor has stopped at twenty minutes to nine—the exact moment Miss Havisham was abandoned on her wedding day. The yellowed bridal dress, cobwebbed wedding cake crawling with mice, and barred windows represent a living mausoleum. Consumed by hatred for the groom who betrayed her, Miss Havisham adopts the beautiful Estella, deliberately rearing her with a cold, heartless demeanor to break men’s hearts. When Pip arrives, Estella insults his coarse hands and thick boots, igniting in Pip a devastating sense of social inadequacy and unrequited infatuation.',
        criteria: ['Satis House as a monument to frozen time', 'Miss Havisham rearing Estella as a weapon of vengeance', 'Pip’s resulting social shame and class inadequacy']
      },
      {
        title: 'Expository Essay: The Legacy of Pioneering Egyptian Female Scholars',
        prompt: 'Write an essay (150-180 words) honoring the historic contributions of Egyptian women pioneers to public administration, medicine, and human rights.',
        outline: [
          'Introduction: Historical legacy of Egyptian women from antiquity to modern statehood.',
          'Body Paragraph 1: Dr. Hikmat Abu Zayd as the first female minister and social reformer.',
          'Body Paragraph 2: Dr. Sameera Moussa and female scientific breakthroughs in STEM fields.',
          'Conclusion: Inspiring contemporary female generations in the 2026/2027 educational era.'
        ],
        model: 'Throughout the millennia, Egyptian women have played a pivotal role in shaping human civilization, from ancient pharaonic queens to modern academic trailblazers. In the twentieth century, pioneering Egyptian women shattered entrenched societal prejudices, asserting themselves as formidable leaders in scientific discovery, public administration, and social reform.\n\nA prominent exemplar is Dr. Hikmat Abu Zayd, appointed in 1962 as the first female cabinet minister in modern Egyptian history. As Minister of Social Affairs, she spearheaded transformative rural welfare programs, establishing community development cooperatives that empowered millions of impoverished women across Upper Egypt. Her unyielding dedication earned her the admiration of the nation and established a lasting precedent for female political governance.\n\nEqually inspiring was Dr. Sameera Moussa, whose groundbreaking achievements in nuclear physics demonstrated that intellectual genius knows no gender boundaries. Her research aimed to harness atomic energy for affordable medical therapy, exemplifying the ethical deployment of science for humanitarian uplift.\n\nIn conclusion, the legacy of these remarkable pioneers continues to illuminate the path for modern Egyptian women. By cultivating grit and academic excellence, today’s female scholars are redefining the boundaries of human potential.'
      }
    )
  },
  {
    id: 3,
    title: 'Beyond Imagination',
    titleAr: 'ما وراء الخيال: الفضاء واستكشاف الكون والذكاء الاصطناعي',
    theme: 'Astronomy, James Webb Space Telescope, Interplanetary Exploration & Artificial Intelligence',
    grammarFocus: 'Advanced Future Forms: Future Continuous, Future Perfect & Future Time Clauses (by the time / as soon as / once)',
    novelChapter: 'Great Expectations: Chapters 5-6 (The Secret Benefactor, Jaggers’ Announcement & Pip Leaves the Forge)',
    exams: createStandardExams(
      3,
      12,
      'Beyond Imagination',
      'ما وراء الخيال: الفضاء والكون',
      'Advanced Future Forms and Time Conjunctions',
      'Great Expectations Ch 5-6',
      {
        l1: {
          q: 'The branch of science that studies celestial bodies, interplanetary space, and the physical cosmos is __________.',
          opts: ['astronomy', 'astrology', 'monument', 'scam'],
          ans: [0],
          exp: '"Astronomy" (علم الفلك) is the scientific study of the universe and celestial objects.'
        },
        l2: {
          q: 'By the end of this decade, international aerospace agencies __________ permanent manned research habitats on the Moon.',
          opts: ['will have established', 'will establish', 'establish', 'were establishing'],
          ans: [0],
          exp: 'Future Perfect (will have established) denotes completion before a specified future deadline.'
        },
        l3: {
          q: 'This time next month, the James Webb Space Telescope __________ spectroscopic data from distant exoplanets.',
          opts: ['will be recording', 'will have recorded', 'records', 'recorded'],
          ans: [0],
          exp: 'Future Continuous (will be recording) denotes an action in progress at a specific future moment.'
        },
        l4: {
          q: 'Once the autonomous robotic rover __________ on Mars, it will immediately transmit high-resolution topography.',
          opts: ['lands', 'will land', 'landed', 'had landed'],
          ans: [0],
          exp: 'Future time clause: "Once + Present Simple, will + base verb" (Once it lands).'
        },
        l5: {
          q: 'Never before in human history __________ astrophysicists observed gravitational waves with such precision.',
          opts: ['have', 'did', 'was', 'were'],
          ans: [0],
          exp: 'Negative inversion: Never before have + subject + past participle...'
        }
      },
      {
        title: 'The James Webb Space Telescope: Peering into the Cosmic Dawn',
        text: 'Stationed one million miles from Earth at the Second Lagrange Point (L2), the James Webb Space Telescope (JWST) represents the apex of astronomical engineering. Using infrared sensors cooled to near absolute zero, it captures photons emitted over thirteen billion years ago by the earliest infant galaxies.',
        q: 'What technological capability allows JWST to observe the earliest infant galaxies?',
        opts: [
          'High-sensitivity infrared sensors cooled near absolute zero to capture archaic light',
          'A giant magnifying glass held by astronauts in orbit',
          'Solar mirrors that reflect bright green laser beams to Mars',
          'Nuclear rocket engines that fly to the edge of the universe'
        ],
        ans: [0],
        exp: 'Paragraph 1 explains that infrared sensors cooled near absolute zero detect photons emitted billions of years ago.'
      },
      {
        act: 3,
        q: 'In Chapters 5-6 of Great Expectations, analyze the dramatic and moral transformation in Pip when lawyer Jaggers announces his "great expectations".',
        qAr: 'في الفصلين 5-6 من رواية آمال كبرى، حلل التحول الدرامي والأخلاقي في شخصية بيب عندما يخبره المحامي جاجرز بثروته وتوقعاته العظيمة.',
        model: 'Jaggers’ announcement represents the pivotal turning point in Pip’s moral trajectory. Pip learns he has inherited a colossal fortune and must relocate to London to be educated as an elite gentleman, on the condition that he never inquires about his anonymous benefactor. Pip immediately assumes his patron is Miss Havisham, believing he is destined to marry Estella. Tragically, this sudden wealth corrupts Pip’s natural moral innocence. He begins looking down on the honest blacksmith Joe Gargery with snobbish condescension and feels ashamed of the forge. Wealth, rather than elevating Pip, infects him with false vanity and social hypocrisy.',
        criteria: ['Jaggers’ announcement of anonymous wealth', 'Pip’s false assumption that Miss Havisham is his benefactor', 'Snobbish condescension toward honest Joe Gargery']
      },
      {
        title: 'Analytical Essay: The Societal Value of Deep Space Exploration',
        prompt: 'Write an argumentative essay (150-180 words) evaluating whether allocating billions of dollars to interplanetary astrophysics is justified given pressing terrestrial problems.',
        outline: [
          'Introduction: Terrestrial crises vs cosmic exploration expenditures; thesis on space technology as essential catalyst.',
          'Body Paragraph 1: Technological spin-offs (satellite telemetry, solar cells, clean water filters, GPS systems).',
          'Body Paragraph 2: Planetary defense against asteroid collisions and understanding climate dynamics.',
          'Conclusion: Space science as an investment in humanity’s long-term survival.'
        ],
        model: 'In an era characterized by terrestrial challenges—including economic inflation, environmental degradation, and resource depletion—critics frequently question the wisdom of investing billions into deep space exploration. However, a comprehensive analysis reveals that astrophysics is not an extravagant luxury, but an indispensable driver of terrestrial technological innovation.\n\nFirst and foremost, the formidable engineering challenges of space exploration yield invaluable technological spin-offs that transform everyday life on Earth. Photovoltaic solar panels, digital image sensors in smartphones, lightweight insulation materials, and advanced water purification systems were all originally conceived for space expeditions. Furthermore, satellite constellations orbiting Earth provide real-time meteorological telemetry that optimizes global agriculture, monitors oceanic pollution, and saves countless lives during catastrophic hurricanes.\n\nMoreover, astrophysics addresses fundamental existential questions. By examining the runaway greenhouse effect on Venus, scientists decipher the mechanics of terrestrial global warming. Understanding our cosmic neighborhood is essential for developing planetary defense mechanisms against asteroid impacts.\n\nIn conclusion, space exploration does not divert resources from Earth; it enriches our understanding of our fragile planetary sanctuary. To cease looking outward is to surrender the very curiosity that defines the human spirit.'
      }
    )
  },
  {
    id: 4,
    title: 'Taking Care of Ourselves',
    titleAr: 'العناية بالنفس والصحة النفسية وإدارة الضغوط',
    theme: 'Mental Well-being, Burnout Prevention, Work-Life Balance & Psychological Resilience',
    grammarFocus: 'Modal Verbs of Deduction in Past & Present (must have, can’t have, might have, could have been)',
    novelChapter: 'Great Expectations: Chapters 7-8 (London Life, Herbert Pocket’s Friendship & Pip’s Mounting Debts)',
    exams: createStandardExams(
      4,
      12,
      'Taking Care of Ourselves',
      'العناية بالنفس وإدارة الضغوط',
      'Modals of Past Deduction',
      'Great Expectations Ch 7-8',
      {
        l1: {
          q: 'The state of emotional, physical, and mental exhaustion caused by prolonged chronic stress is termed __________.',
          opts: ['burnout', 'monument', 'scam', 'donation'],
          ans: [0],
          exp: '"Burnout" (الاحتراق النفسي والإجهاد) is chronic work-related exhaustion.'
        },
        l2: {
          q: 'Karim looked completely energized and cheerful this morning; he __________ slept deeply throughout the night.',
          opts: ['must have', 'can’t have', 'shouldn’t have', 'couldn’t'],
          ans: [0],
          exp: '"Must have + P.P." indicates a logical deduction of strong probability based on positive evidence.'
        },
        l3: {
          q: 'Nadia __________ forgotten about the online seminar; she highlighted it in her diary with red ink yesterday.',
          opts: ['can’t have', 'must have', 'should have', 'might'],
          ans: [0],
          exp: '"Can’t have + P.P." indicates an impossible past event based on conflicting evidence.'
        },
        l4: {
          q: 'Practicing mindfulness and physical exercise cultivates psychological __________ when confronting high-stakes examinations.',
          opts: ['resilience', 'pollution', 'hesitation', 'disappointment'],
          ans: [0],
          exp: '"Psychological resilience" (المرونة والصلابة النفسية) is the ability to adapt to adversity.'
        },
        l5: {
          q: 'Under no circumstances __________ individuals ignore persistent symptoms of acute chronic anxiety.',
          opts: ['should', 'they should', 'did they', 'ought'],
          ans: [0],
          exp: 'Negative inversion: Under no circumstances should + subject + base verb...'
        }
      },
      {
        title: 'Cognitive Hygiene and Stress Management in the Digital Era',
        text: 'In our hyper-connected society, cognitive overload has emerged as a pervasive threat to adolescent mental health. The relentless bombardment of social media notifications and academic deadlines triggers chronic cortisol release, impairing executive concentration and sleep quality.',
        q: 'What physiological consequence results from relentless digital notification bombardment?',
        opts: [
          'Chronic cortisol release impairing concentration and sleep quality',
          'Immediate physical blindness',
          'Total loss of tooth enamel',
          'Uncontrolled body growth'
        ],
        ans: [0],
        exp: 'Paragraph 1 explains that chronic cortisol elevation undermines executive focus and sleep architecture.'
      },
      {
        act: 4,
        q: 'In Chapters 7-8 of Great Expectations, analyze how Pip’s extravagant lifestyle in London and growing financial debts reflect his moral decline and superficial values.',
        qAr: 'في الفصلين 7-8 من رواية آمال كبرى، حلل كيف يعكس نمط حياة بيب الباذخ في لندن وتراكم ديونه تدهوره الأخلاقي وقيمه السطحية الزائفة.',
        model: 'In London, Pip rooms with the good-natured Herbert Pocket and attempts to adopt the mannerisms of the aristocratic elite. However, Pip’s concept of a "gentleman" is shallow, defined entirely by fine tailored clothes, expensive clubs, and extravagant spending rather than moral integrity. Pip and Herbert accumulate reckless debts, attempting to balance their books through humorous, futile paperwork rituals. When the loyal Joe Gargery visits Pip in London, Pip treats Joe with cold embarrassment and social snobbery. Pip’s pursuit of superficial status hollows out his character, demonstrating that artificial social expectations corrupt true human empathy.',
        criteria: ['Reckless expenditure and mounting debts', 'Superficial definition of gentlemanhood', 'Cold snobbery toward the visiting Joe Gargery']
      },
      {
        title: 'Reflective Essay: Cultivating Emotional Well-Being During Academic Milestones',
        prompt: 'Write an essay (150-180 words) evaluating the importance of balanced lifestyle habits and mental health awareness for high school seniors.',
        outline: [
          'Introduction: Intense academic pressure on Thanaweya Amma students; thesis on emotional balance as key to true success.',
          'Body Paragraph 1: Negative impacts of sleep deprivation, cramming, and isolated anxiety.',
          'Body Paragraph 2: Constructive strategies: consistent sleep hygiene, physical exercise, and supportive peer dialogue.',
          'Conclusion: Holistic well-being as the true foundation of academic distinction.'
        ],
        model: 'The final year of secondary education—culminating in the high-stakes Thanaweya Amma examinations—is often perceived by students and parents as a relentless academic marathon. In their pursuit of competitive university scores, countless seniors sacrifice sleep, physical health, and emotional well-being. However, educational psychologists demonstrate that neglecting self-care is counterproductive, leading inevitably to cognitive exhaustion and burnout.\n\nFirst and foremost, biological health is the foundation of cognitive performance. The human brain consolidates memories and clears metabolic toxins during deep sleep. Students who habitually study through the night suffer impaired neural recall, heightened anxiety, and compromised problem-solving agility during examinations. Memorization acquired at the expense of restorative sleep is rapidly forgotten under exam stress.\n\nTo achieve true distinction, students must adopt rigorous habits of mental hygiene. Incorporating daily physical exercise, maintaining a nutritious diet, and taking short, structured breaks revitalizes neural pathways. Furthermore, speaking openly with mentors and family members alleviates the debilitating psychological burden of perfectionism.\n\nIn conclusion, academic success should never come at the expense of mental health. A healthy mind within a resilient body is the ultimate prerequisite for academic excellence and lifelong flourishing.'
      }
    )
  },
  {
    id: 5,
    title: 'The Future of Work',
    titleAr: 'مستقبل العمل والوظائف الرقمية والذكاء الاصطناعي',
    theme: 'Gig Economy, Automation, Remote Collaboration, Reskilling & Technological Transformation',
    grammarFocus: 'Phrasal Verbs (Separable, Inseparable, Transitive, Intransitive & Three-part Phrasal Verbs)',
    novelChapter: 'Great Expectations: Chapters 9-10 (Magwitch Returns, The Shocking Truth & Pip’s World Shattered)',
    exams: createStandardExams(
      5,
      12,
      'The Future of Work',
      'مستقبل العمل والوظائف',
      'Phrasal Verbs and Idiomatic Particles',
      'Great Expectations Ch 9-10',
      {
        l1: {
          q: 'To succeed in the algorithmic workplace, professionals must constantly __________ new technical competencies through lifelong learning.',
          opts: ['pick up', 'give up', 'call off', 'put off'],
          ans: [0],
          exp: '"Pick up" is a phrasal verb meaning to acquire a skill or knowledge naturally.'
        },
        l2: {
          q: 'The tech company decided to __________ the launch of their artificial intelligence application until security testing was concluded.',
          opts: ['put off', 'put on', 'put out', 'put up'],
          ans: [0],
          exp: '"Put off" means to postpone or delay an event.'
        },
        l3: {
          q: 'Because of severe budget constraints, the software engineering startup had to __________ on unnecessary operational expenditures.',
          opts: ['cut down', 'cut off', 'cut in', 'cut through'],
          ans: [0],
          exp: '"Cut down on" means to reduce consumption or expenditure.'
        },
        l4: {
          q: 'Automation and machine learning require widespread workforce __________ to prepare citizens for high-tech careers.',
          opts: ['reskilling', 'pollution', 'hesitation', 'disappointment'],
          ans: [0],
          exp: '"Reskilling" (إعادة التأهيل المهني) equips workers with updated digital skills.'
        },
        l5: {
          q: 'Rarely __________ an technological revolution disrupted employment sectors as rapidly as generative artificial intelligence.',
          opts: ['has', 'did', 'was', 'were'],
          ans: [0],
          exp: 'Negative inversion: Rarely has + subject + past participle...'
        }
      },
      {
        title: 'The Augmented Workforce: Human-AI Collaboration',
        text: 'Contrary to alarmist predictions that automation will render human labor obsolete, contemporary labor economists argue that artificial intelligence is ushering in the era of the "augmented workforce". AI automates repetitive data retrieval, liberating human professionals to focus on creative synthesis and strategic leadership.',
        q: 'What is the primary thesis of the "augmented workforce" model?',
        opts: [
          'AI handles routine mechanical tasks while humans leverage creativity, empathy, and strategic thinking',
          'Robots will completely replace all human beings within six months',
          'All companies will revert to manual typewriter machines',
          'Computers cannot perform arithmetic equations'
        ],
        ans: [0],
        exp: 'Paragraph 1 explains AI automates routine tasks, allowing human workers to concentrate on higher-order synthesis and empathy.'
      },
      {
        act: 5,
        q: 'In Chapters 9-10 of Great Expectations, analyze the devastating climax when Magwitch arrives in London and reveals himself as Pip’s true benefactor.',
        qAr: 'في الفصلين 9-10 من رواية آمال كبرى، حلل اللحظة الدرامية الصادمة عندما يظهر ماجويتش في لندن ويكشف أنه ولي نعمة بيب الحقيقي.',
        model: 'On a dark and stormy night in London, an aged, weathered traveler climbs Pip’s staircase. To Pip’s utter horror, the man is Abel Magwitch, the terrifying convict from the graveyard. Magwitch reveals with ecstatic paternal pride that he has laboured for years in the Australian penal colony as a sheep farmer, starving and toiling solely to make Pip a "gentleman". This revelation completely shatters Pip’s illusions: Miss Havisham was never his benefactor, and Estella was never intended for him. All of Pip’s social grandeur, fine clothes, and snobbery were funded by a hunted convict. Though Pip initially recoils with disgust, this shocking climax marks the beginning of his true moral awakening as he realizes the profound, self-sacrificing love of the man he despised.',
        criteria: ['Magwitch reveals he funded Pip’s wealth through exile labor', 'Shattering Pip’s illusions of Miss Havisham and Estella', 'Beginning of Pip’s true moral redemption through empathy']
      },
      {
        title: 'Analytical Essay: Navigating Career Automation in the 2026/2027 Economy',
        prompt: 'Write an argumentative essay (150-180 words) evaluating the essential competencies future graduates must cultivate to remain irreplaceable in an automated labor market.',
        outline: [
          'Introduction: Pervasiveness of artificial intelligence in recruitment and workflow.',
          'Body Paragraph 1: Obsolescence of routine calculation and rote data entry.',
          'Body Paragraph 2: Primacy of irreplaceable human soft skills: emotional intelligence, ethical discernment, and interdisciplinary creativity.',
          'Conclusion: Embracing technology as a tool while cultivating distinctively human virtues.'
        ],
        model: 'The relentless evolution of generative artificial intelligence and autonomous robotics has fundamentally upended traditional assumptions regarding career security. Professions previously considered immune to technological disruption—including legal research, software coding, and financial analysis—are being systematically transformed by machine learning algorithms. In this new landscape, future graduates must deliberately cultivate capabilities that silicon neural networks cannot emulate.\n\nFirst and foremost, routine analytical tasks and repetitive memorization have lost their economic premium. Algorithms can process gigabytes of legal precedent or medical imaging data with speeds and precision unattainable by humans. Therefore, workers whose value proposition rests solely on procedural compliance risk rapid displacement.\n\nConversely, distinctly human virtues—such as emotional intelligence, ethical judgment, cross-cultural empathy, and divergent creative synthesis—have become profoundly valuable. A machine can draft a contractual template, but only an empathetic human can mediate complex interpersonal negotiations. Similarly, algorithms cannot exercise moral wisdom when technological applications threaten public privacy.\n\nIn conclusion, the future of work belongs not to those who compete against artificial intelligence, but to those who master it. By fusing technical literacy with profound human empathy, graduates will remain indispensable architects of the global economy.'
      }
    )
  },
  {
    id: 6,
    title: "Let's Get It Done",
    titleAr: 'فلننجز العمل: الإنتاجية العالية وإدارة المشاريع القومية',
    theme: 'High Productivity, Time Management, Agile Project Execution & National Megaprojects',
    grammarFocus: 'Causative Verbs: Have / Get something done (Passive) & Have someone do / Get someone to do (Active)',
    novelChapter: 'Great Expectations: Chapters 11-12 (The River Escape, Magwitch’s Trial & Pip’s True Maturity)',
    exams: createStandardExams(
      6,
      12,
      "Let's Get It Done",
      'فلننجز العمل: الإنتاجية والمشاريع',
      'Causative Structures (Have and Get)',
      'Great Expectations Ch 11-12',
      {
        l1: {
          q: 'The project manager decided to __________ the engineering schematics reviewed by an external architectural consultant.',
          opts: ['have', 'make', 'force', 'allow'],
          ans: [0],
          exp: 'Causative passive structure: have + object + past participle (have the schematics reviewed).'
        },
        l2: {
          q: 'The director managed to get the contractors __________ the monorail track ahead of schedule.',
          opts: ['to finish', 'finish', 'finishing', 'finished'],
          ans: [0],
          exp: 'Active causative with "get": get + person + to + infinitive (get the contractors to finish).'
        },
        l3: {
          q: 'The hospital administrator had the biomedical technicians __________ all intensive care ventilators yesterday.',
          opts: ['calibrate', 'to calibrate', 'calibrating', 'calibrated'],
          ans: [0],
          exp: 'Active causative with "have": have + person + base verb (had the technicians calibrate).'
        },
        l4: {
          q: 'Applying agile time-management techniques prevents chronic procrastination and maximizes team __________.',
          opts: ['productivity', 'pollution', 'hesitation', 'disappointment'],
          ans: [0],
          exp: '"Productivity" (الإنتاجية) denotes the efficient output of high-quality work.'
        },
        l5: {
          q: 'Little __________ the project supervisor imagine that the national tunnel project would be completed in record time.',
          opts: ['did', 'had', 'was', 'were'],
          ans: [0],
          exp: 'Inversion after Little: Little did + subject + base verb...'
        }
      },
      {
        title: 'Project Management and Engineering Feats in Egypt’s New Capital',
        text: 'The construction of the New Administrative Capital represents an unprecedented masterclass in national project execution. Spanning seven hundred square kilometers, the megaproject coordinated hundreds of thousands of specialized engineers, deploying computerized Building Information Modeling (BIM) to synchronize monorail corridors and sustainable skyscrapers.',
        q: 'What technological system was deployed to synchronize infrastructure in the New Capital?',
        opts: [
          'Building Information Modeling (BIM) to harmonize engineering systems in real-time',
          'Manual chalkboard drawings carried on horseback',
          'Imported paper catalogs from the nineteenth century',
          'Unverified internet blogs'
        ],
        ans: [0],
        exp: 'Paragraph 1 notes computerized Building Information Modeling (BIM) synchronized infrastructure in real-time.'
      },
      {
        act: 6,
        q: 'In the final chapters of Great Expectations (Chapters 11-12), analyze Pip’s dramatic transformation into a genuine gentleman through his selfless loyalty to the dying Magwitch.',
        qAr: 'في الفصول الأخيرة من رواية آمال كبرى (الفصلين 11-12)، حلل تحول بيب إلى رجل نبيل حقيقي من خلال ولائه وتضحيته من أجل ماجويتش المحتضر.',
        model: 'The climax of Great Expectations redefines the true meaning of a "gentleman". When the river escape is intercepted and Magwitch is fatally injured and captured, Pip’s snobbery and vanity evaporate completely. Pip stays faithfully beside the dying convict throughout his trial and imprisonment, holding his hand with filial tenderness. Pip whispers to the dying Magwitch that his lost daughter Estella is alive, beautiful, and loved by Pip. Forfeiting the entire fortune to the Crown, Pip ends up penniless but morally redeemed. Dickens proves that true gentlemanliness is not measured by high social birth, immaculate clothing, or inherited wealth, but by unyielding empathy, loyalty, and loving self-sacrifice.',
        criteria: ['Pip faithfully standing beside the dying Magwitch', 'Comforting Magwitch with the truth about his daughter Estella', 'True gentlemanhood defined by moral love, not worldly wealth']
      },
      {
        title: 'Analytical Essay: The True Definition of Success and Moral Greatness',
        prompt: 'Write an argumentative essay (150-180 words) evaluating whether true human nobility is derived from material wealth and social prestige or from integrity and selfless service.',
        outline: [
          'Introduction: Society’s fixation on wealth and superficial prestige; thesis on moral nobility as the supreme virtue.',
          'Body Paragraph 1: The fragility and emptiness of material fortune divorced from integrity.',
          'Body Paragraph 2: Enduring impact of ethical conduct, compassion, and communal service.',
          'Conclusion: Synthesis of Dickensian wisdom for 2026/2027 learners.'
        ],
        model: 'In contemporary society, success is frequently measured by superficial metrics: extravagant financial wealth, viral social media notoriety, and prestigious corporate titles. However, literary masterworks and historical wisdom consistently demonstrate that material abundance divorced from moral integrity is an empty illusion. True nobility resides not in what an individual possesses, but in the depth of their character and their dedication to uplifting others.\n\nFirst and foremost, material fortune is inherently precarious and morally neutral. A person may inherit vast financial riches or achieve sudden status without possessing genuine empathy, wisdom, or kindness. As Dickens immortalized in Great Expectations, individuals who chase shallow luxury often succumb to vanity, treating loyal friends with cold condescension. Wealth cannot purchase genuine peace of mind or authentic human affection.\n\nConversely, true greatness is defined by integrity, selflessness, and moral courage. The individuals who leave an indelible legacy upon humanity are those who dedicate their talents to alleviating suffering, expanding knowledge, and defending justice. From selfless doctors serving in rural clinics to teachers inspiring underprivileged youth, genuine nobility is measured by the lives one enriches.\n\nIn conclusion, worldly prestige is ephemeral, but moral character endures forever. True success lies in living with honor, empathy, and generous service to one’s community.'
      }
    )
  }
];

// ------------------------------------------------------------------------------------------------
// 4. EGYPTIAN BACCALAUREATE UNITS (GRADES 10, 11, 12)
// Aligned with the High-Stakes Egyptian Baccalaureate Dual-Stream Specifications
// ------------------------------------------------------------------------------------------------

// Import & re-export dedicated, full 5-level adaptive Baccalaureate units
import {
  baccalaureateUnits10,
  baccalaureateUnits11,
  baccalaureateUnits12
} from './baccalaureateAllUnitExams.ts';

export {
  baccalaureateUnits10,
  baccalaureateUnits11,
  baccalaureateUnits12
};

// ------------------------------------------------------------------------------------------------
// 5. HELPER DISPATCHERS FOR EXAM NAVIGATION & METADATA
// ------------------------------------------------------------------------------------------------

export function getExamsUnits(grade: number, path: 'general' | 'baccalaureate'): UnitInfo[] {
  if (path === 'baccalaureate') {
    if (grade === 10) return baccalaureateUnits10;
    if (grade === 11) return baccalaureateUnits11;
    if (grade === 12) return baccalaureateUnits12;
    return baccalaureateUnits10;
  }

  // General Secondary Track
  if (grade === 11) return secondary2GeneralUnits;
  if (grade === 12) return secondary3GeneralUnits;
  return secondary1GeneralUnits; // default grade 10
}

export interface ExamsHeaderMeta {
  badge: string;
  badgeAr: string;
  title: string;
  titleAr: string;
  description: string;
  literatureNovel: string;
  literatureNovelAr: string;
  grammarFocusSummary: string;
  trackLabel: string;
}

export function getExamsHeaderMeta(grade: number, path: 'general' | 'baccalaureate'): ExamsHeaderMeta {
  if (path === 'baccalaureate') {
    if (grade === 10) {
      return {
        badge: 'SEC 1 EGYPTIAN BACCALAUREATE (2026/2027)',
        badgeAr: 'بكالوريا الصف الأول الثانوي (2026/2027)',
        title: 'Sec 1 Baccalaureate Dual-Stream Examination Papers',
        titleAr: 'امتحانات بكالوريا الصف الأول الثانوي المتقدمة',
        description: 'Rigorous standardized papers aligned with international dual standards: syntactic inversion, emphatic clefts, discursive essays, and real-time AI rubric scoring.',
        literatureNovel: 'World Literature: The Old Man and the Sea by Ernest Hemingway',
        literatureNovelAr: 'الأدب العالمي: رواية العجوز والبحر',
        grammarFocusSummary: 'Syntactic Inversions, Emphatic Clefts & Subjunctive Forms',
        trackLabel: 'Egyptian Baccalaureate Path'
      };
    }
    if (grade === 11) {
      return {
        badge: 'SEC 2 EGYPTIAN BACCALAUREATE (2026/2027)',
        badgeAr: 'بكالوريا الصف الثاني الثانوي (2026/2027)',
        title: 'Sec 2 Baccalaureate Multi-Variable Research Papers',
        titleAr: 'أوراق بحث وامتحانات بكالوريا الصف الثاني الثانوي',
        description: 'Advanced epistemology, nominalisation, mixed conditionals, and literary dramaturgy evaluated with automated high-order AI scoring.',
        literatureNovel: 'Tragic Dramaturgy: King Lear by William Shakespeare',
        literatureNovelAr: 'المسرح التراجيدي: مسرحية الملك لير',
        grammarFocusSummary: 'Wh-Clefts, Nominalisation, Mixed Conditionals & Relative Participles',
        trackLabel: 'Egyptian Baccalaureate Path'
      };
    }
    return {
      badge: 'SEC 3 BACCALAUREATE CAPSTONE (2026/2027)',
      badgeAr: 'المستوى الرفيع لإتمام البكالوريا المصرية (2026/2027)',
      title: 'Sec 3 Baccalaureate Higher Level (HL) Capstone Papers',
      titleAr: 'امتحانات المستوى الرفيع (HL) لشهادة إتمام البكالوريا',
      description: 'Senior capstone examinations: global jurisprudence, bioethics governance, perfect participles, and analytical thesis defense.',
      literatureNovel: 'Victorian Social Hierarchy: Great Expectations by Charles Dickens',
      literatureNovelAr: 'الأدب الفيكتوري: رواية آمال كبرى',
      grammarFocusSummary: 'Perfect Participle Clauses, Modal Stance & Rhetorical Discourse',
      trackLabel: 'Egyptian Baccalaureate Path'
    };
  }

  // General Secondary Track (Thanaweya Amma)
  if (grade === 11) {
    return {
      badge: '2ND SECONDARY (2026/2027)',
      badgeAr: 'الصف الثاني الثانوي (مواصفات 2026/2027)',
      title: 'Secondary 2 Progressive Curriculum Unit Exams (Levels 1 - 5)',
      titleAr: 'امتحانات وحدات الصف الثاني الثانوي التدريجية (المستويات 1 - 5)',
      description: 'Official 2026/2027 syllabus: Staying Healthy, Eating Around the World, Future Agriculture, Living Abroad, Power of the Press, and Future Energy with King Lear.',
      literatureNovel: 'King Lear by William Shakespeare (Acts 1-5)',
      literatureNovelAr: 'مسرحية الملك لير لوليام شكسبير (الفصول 1-5)',
      grammarFocusSummary: 'Modals of Necessity, Gradable Adjectives, Future Perfect/Continuous, Passive Voice & Relative Clauses',
      trackLabel: 'General Secondary Path (الثانوية العامة)'
    };
  }

  if (grade === 12) {
    return {
      badge: '3RD SECONDARY - THANAWEYA AMMA (2026/2027)',
      badgeAr: 'الصف الثالث الثانوي - الثانوية العامة (2026/2027)',
      title: 'Secondary 3 High-Stakes National Certificate Exams (Levels 1 - 5)',
      titleAr: 'امتحانات شهادة إتمام الثانوية العامة المقررة (المستويات 1 - 5)',
      description: 'High-stakes ministerial curriculum: Read All About It!, Her Story, Beyond Imagination, Taking Care of Ourselves, Future of Work, and Great Expectations.',
      literatureNovel: 'Great Expectations by Charles Dickens (Chapters 1-12)',
      literatureNovelAr: 'رواية آمال كبرى لتشارلز ديكنز (الفصول 1-12)',
      grammarFocusSummary: 'Past Perfect Narratives, Superlatives, Modal Deductions, Phrasal Verbs & Causatives',
      trackLabel: 'General Secondary Path (الثانوية العامة)'
    };
  }

  // Default Grade 10
  return {
    badge: '1ST SECONDARY (2026/2027)',
    badgeAr: 'الصف الأول الثانوي (مواصفات 2026/2027)',
    title: 'Secondary 1 Progressive Curriculum Unit Exams (Levels 1 - 5)',
    titleAr: 'امتحانات وحدات الصف الأول الثانوي التدريجية (المستويات 1 - 5)',
    description: 'Each unit contains 5 progressive examination tiers from Foundation (Level 1) through Advanced Mastery (Level 5) following the official 2026/2027 syllabus.',
    literatureNovel: 'The Old Man and the Sea by Ernest Hemingway (Chapters 1-6)',
    literatureNovelAr: 'رواية العجوز والبحر لإرنست همنجواي (الفصول 1-6)',
    grammarFocusSummary: 'Past Habits, Modals, Conditionals, Gerund/Infinitive, Countables & Articles',
    trackLabel: 'General Secondary Path (الثانوية العامة)'
  };
}

// Global search across all grades, tracks, and revision banks
export function findAnyExamAcrossAllGrades(examId: string): Exam | undefined {
  const allUnitGroups = [
    secondary1GeneralUnits,
    secondary2GeneralUnits,
    secondary3GeneralUnits,
    baccalaureateUnits10,
    baccalaureateUnits11,
    baccalaureateUnits12
  ];

  for (const group of allUnitGroups) {
    for (const u of group) {
      const found = u.exams.find((e: Exam) => e.id === examId);
      if (found) return found;
    }
  }

  const gov = governmentalExams.find(e => e.id === examId);
  if (gov) return gov;

  const t1 = term1RevisionExams.find(e => e.id === examId);
  if (t1) return t1;

  const t2 = term2RevisionExams.find(e => e.id === examId);
  if (t2) return t2;

  const bac = allBaccalaureateExams.find(e => e.id === examId);
  if (bac) return bac;

  return undefined;
}
