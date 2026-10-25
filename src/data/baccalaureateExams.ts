import { Exam } from '../types.ts';

// ------------------------------------------------------------------------------------------------
// EGYPTIAN BACCALAUREATE EXAMINATION SERIES (2026/2027 SPECIFICATIONS)
// Dual-Stream & International Standards Aligned with the Egyptian Ministry of Education
// ------------------------------------------------------------------------------------------------

export const baccalaureateExamsSec1: Exam[] = [
  // Grade 10 - Paper 1
  {
    id: 'bac_s1_paper1_2026',
    unitId: 1,
    level: 5,
    levelTitle: 'Sec 1 Baccalaureate Paper 1: Lexis & Analytical Reading',
    levelTitleAr: 'الورقة الأولى لبكالوريا الصف الأول الثانوي: المعجم المتقدم والقراءة التحليلية (2026/2027)',
    durationMinutes: 45,
    totalMarks: 32,
    governorate: 'Egyptian Baccalaureate Examination Board',
    term: 1,
    category: 'unit_level',
    mcqs: [
      {
        id: 'bac_s1_p1_q1',
        type: 'single',
        question: 'Under no circumstances __________ unauthorized industrial vessels to operate adjacent to pristine marine sanctuaries.',
        questionAr: 'تحت أي ظرف من الظروف لا يُسمح للسفن الصناعية غير المصرح لها بالعمل بجوار المحميات البحرية.',
        options: [
          'the maritime coastguard permits',
          'will the maritime coastguard permit',
          'did permit the maritime coastguard',
          'the maritime coastguard will permit'
        ],
        correctAnswers: [1],
        explanation: 'Inversion after "Under no circumstances": negative adverbial + auxiliary (will) + subject + base verb.',
        points: 2
      },
      {
        id: 'bac_s1_p1_q2',
        type: 'single',
        question: 'The conservationist’s argument was anchored in __________ evidence collected across two decades.',
        questionAr: 'كانت حجة ناشط حماية البيئة مرتكزة على أدلة تجريبية تم جمعها على مدار عقدين.',
        options: [
          'anecdotal',
          'empirical',
          'speculative',
          'ambiguous'
        ],
        correctAnswers: [1],
        explanation: '"Empirical" denotes verifiable, data-driven evidence derived from observation or experimentation.',
        points: 2
      },
      {
        id: 'bac_s1_p1_q3',
        type: 'single',
        question: 'Seldom __________ such profound ecological fortitude in warm-water coral biomes.',
        questionAr: 'نادراً ما شهد علماء المحيطات مثل هذه القدرة البيئية العالية على الصمود في بيئات الشعاب المرجانية.',
        options: [
          'oceanographers have observed',
          'oceanographers observed',
          'have oceanographers observed',
          'were observing oceanographers'
        ],
        correctAnswers: [2],
        explanation: 'Inverted word order following Seldom: Seldom + have + oceanographers + observed.',
        points: 2
      },
      {
        id: 'bac_s1_p1_q4',
        type: 'single',
        question: 'The minister demanded that the environmental remediation protocol __________ without delay.',
        questionAr: 'طلب الوزير أن يتم تنفيذ بروتوكول المعالجة البيئية فوراً دون أدنى تأخير.',
        options: [
          'is implemented',
          'be implemented',
          'implements',
          'was implemented'
        ],
        correctAnswers: [1],
        explanation: 'Subjunctive passive: demanded that + subject + be + past participle.',
        points: 2
      }
    ],
    reading: {
      passageTitle: 'Thermal Resilience and Ecological Refugia in the Northern Red Sea',
      passageText: 'The Gulf of Aqaba and Ras Mohammed Marine Sanctuary host scleractinian coral reefs demonstrating an extraordinary physiological anomaly. While equatorial oceanic reefs have experienced catastrophic bleaching episodes driven by rising sea surface temperatures, northern Red Sea corals thrive at temperatures 3°C above baseline averages. Marine evolutionary biologists hypothesize that post-glacial larval colonization forced ancestral colonies through the high-temperature gateway of the southern Bab El-Mandeb strait, systematically selecting for heat-resilient phenotypes. Nevertheless, thermal fortitude provides no shield against acute localized stressors: untreated municipal wastewater discharge, unmanaged tourist traffic, and plastic sedimentation threaten the very genetic reservoir that could rehabilitate global oceans.',
      questions: [
        {
          id: 'bac_s1_p1_r1',
          type: 'single',
          question: 'What biological mechanism accounts for the northern Red Sea corals’ thermal tolerance?',
          questionAr: 'ما هي الآلية الحيوية التي تفسر التحمل الحراري لشعاب شمال البحر الأحمر؟',
          options: [
            'Artificial genetic modification conducted by contemporary researchers',
            'Evolutionary selection during post-glacial larval migration through southern thermal gateways',
            'Constant cloud cover in the Gulf of Aqaba shielding reefs from solar radiation',
            'The total absence of maritime shipping vessels in the Red Sea'
          ],
          correctAnswers: [1],
          explanation: 'The passage highlights post-glacial migration filtering for heat-hardy phenotypes.',
          points: 2
        },
        {
          id: 'bac_s1_p1_r2',
          type: 'single',
          question: 'What is the author’s primary warning regarding the future of these reefs?',
          questionAr: 'ما هو التحذير الأساسي الذي يطلقه الكاتب بشأن مستقبل هذه الشعاب؟',
          options: [
            'They will inevitably freeze during upcoming winter anomalies',
            'Natural thermal resistance cannot prevent destruction from localized anthropogenic pollution',
            'Corals have permanently ceased producing calcium carbonate',
            'Scientific monitoring buoys cause severe electromagnetic damage'
          ],
          correctAnswers: [1],
          explanation: 'The author emphasizes that local human pollution can negate evolutionary thermal resilience.',
          points: 2
        }
      ]
    },
    translation: [
      {
        id: 'bac_s1_p1_t1',
        direction: 'en-to-ar',
        sourceText: 'Preserving biodiversity is not merely an aesthetic prerogative; it is an indispensable foundation for planetary stability and economic security.',
        options: [
          'إن الحفاظ على التنوع البيولوجي ليس مجرد خيار جمالي، بل هو أساس لا غنى عنه للاستقرار الكوكبي والأمن الاقتصادي.',
          'الحفاظ على الحيوانات مجرد هواية لطيفة ولكنها تكلف الدول الكثير من الأموال الاقتصادية غير المبررة.',
          'التنوع البيولوجي مهم فقط للسياح الأجانب لكي يشاهدوا المناظر الطبيعية في المنتجعات الساحلية.',
          'الاستقرار الكوكبي يعتمد بشكل كامل على بناء المصانع وتشغيل السفن التجارية دون قيود بيئية.'
        ],
        correctIndex: 0,
        explanation: 'Option A conveys the exact academic meaning and solemn rhetorical tone of the English statement.'
      },
      {
        id: 'bac_s1_p1_t2',
        direction: 'ar-to-en',
        sourceText: 'يتطلب ترسيخ مبادئ التفكير النقدي لدى الطلاب تمكينهم من تحليل الأدلة التجريبية وفصل الحقائق عن الآراء المسبقة.',
        options: [
          'Instilling critical thinking principles in students necessitates empowering them to analyze empirical evidence and separate facts from preconceived biases.',
          'Students must only memorize textbooks without asking any critical questions about evidence.',
          'Critical thinking is when students read newspapers and accept all opinions without checking data.',
          'Teachers should prevent students from analyzing empirical data to avoid classroom arguments.'
        ],
        correctIndex: 0,
        explanation: 'Option A accurately translates the sophisticated vocabulary ("instilling", "empowering", "empirical evidence", "preconceived biases").'
      }
    ],
    storyQuestions: [
      {
        id: 'bac_s1_p1_sq1',
        chapter: 1,
        question: 'In Treasure Island, how does Robert Louis Stevenson utilize the sea-chest as both a physical artifact and a psychological symbol of greed and mystery?',
        questionAr: 'في رواية جزيرة الكنز، كيف وظف ستيفنسون صندوق البحر كعنصر مادي ورمز نفسي للجشع والغموض؟',
        modelAnswer: 'Stevenson crafts Billy Bones’s sea-chest as a multidimensional narrative catalyst. Materially, it contains the oilskin packet holding the fateful treasure map, igniting Jim Hawkins’s journey. Symbolically, its secrecy, strange foreign coins, and the blind Pew’s tap represent the corrupting aura of pirate greed and impending menace that intrudes upon the tranquil domestic order of the Admiral Benbow Inn.',
        keyCriteria: ['Physical contents (map/packet)', 'Symbolic greed/danger', 'Narrative catalyst for Jim Hawkins'],
        maxMarks: 4
      }
    ],
    writingTask: {
      type: 'essay',
      title: 'Discursive Academic Essay: Ecotourism vs Mass Tourism',
      prompt: 'Write an argumentative academic essay (200-250 words) evaluating whether ecotourism can realistically reconcile economic prosperity with biosphere preservation in developing nations.',
      wordCountTarget: '200-250 words',
      rubric: {
        ideas: 4,
        grammarVocab: 4,
        organization: 4,
        mechanics: 2
      },
      sampleOutline: [
        'Introduction: Definition of ecotourism; thesis on sustainable reconciliation of economy and ecology.',
        'Body Paragraph 1: Economic empowerment of indigenous communities and conservation funding.',
        'Body Paragraph 2: Potential pitfalls (greenwashing, infrastructure degradation) and necessary regulatory safeguards.',
        'Conclusion: Synthesis and forward-looking policy recommendation for the 2026/2027 decade.'
      ],
      modelResponse: 'The accelerating degradation of global ecosystems has precipitated a crucial inquiry into the viability of ecotourism as a development paradigm. Unlike conventional mass tourism, which routinely inflicts irreparable harm upon fragile biomes through unregulated urbanization and resource depletion, authentic ecotourism aspires to harmonize economic vitality with biological preservation.\n\nFirst and foremost, ecotourism empowers indigenous communities by generating sustainable livelihoods that incentivize environmental guardianship. In marine sanctuaries such as Ras Mohammed, revenue garnered from conscientious eco-travelers directly funds scientific surveillance buoys and anti-poaching patrols, transforming local populations into active ecological stewards rather than passive observers. Furthermore, exposure to pristine biomes fosters global biocentric consciousness among international travelers.\n\nConversely, critics contend that unchecked commercialization risks devolving into "greenwashing," where unsustainable visitor volumes exceed the carrying capacity of vulnerable reserves. To counteract this peril, governments must enact rigorous regulatory statutes, establishing statutory visitor caps, enforcing zero-emission transportation mandates, and mandating transparent environmental audits.\n\nIn conclusion, ecotourism represents a formidable instrument for sustainable development, provided it remains subordinated to strict empirical conservation standards rather than unbridled commercial profit.'
    }
  },

  // Grade 10 - Paper 2 (Comparative Analysis & Rhetoric)
  {
    id: 'bac_s1_paper2_2026',
    unitId: 2,
    level: 5,
    levelTitle: 'Sec 1 Baccalaureate Paper 2: Rhetoric & Civic Leadership',
    levelTitleAr: 'الورقة الثانية لبكالوريا الصف الأول الثانوي: البلاغة والقيادة المدنية (2026/2027)',
    durationMinutes: 45,
    totalMarks: 30,
    governorate: 'Egyptian Baccalaureate Examination Board',
    term: 1,
    category: 'unit_level',
    mcqs: [
      {
        id: 'bac_s1_p2_q1',
        type: 'single',
        question: 'It was the philanthropist’s unyielding dedication __________ catalyzed systemic education reform across Upper Egypt.',
        questionAr: 'كان إخلاص المحسن الدؤوب هو الذي حفز الإصلاح التعليمي الجذري في صعيد مصر.',
        options: ['that', 'which', 'what', 'whom'],
        correctAnswers: [0],
        explanation: 'Cleft sentence structure: It was [focus] that [clause].',
        points: 2
      },
      {
        id: 'bac_s1_p2_q2',
        type: 'single',
        question: 'An individual displaying exceptional "altruism" is motivated by __________.',
        options: [
          'pure commercial profit and personal vanity',
          'disinterested, self-sacrificing concern for the well-being of others',
          'a desire to avoid all civic responsibility',
          'hostility toward community charity'
        ],
        correctAnswers: [1],
        explanation: 'Altruism denotes selfless devotion to the welfare of fellow humans.',
        points: 2
      },
      {
        id: 'bac_s1_p2_q3',
        type: 'single',
        question: 'Scarcely had the civic volunteers initiated the campaign __________ donations surged exponentially.',
        questionAr: 'لم يكد المتطوعون يطلقون الحملة حتى تدفقت التبرعات بشكل تصاعدي.',
        options: ['than', 'when', 'then', 'that'],
        correctAnswers: [1],
        explanation: 'Correlative pairing: Scarcely had... when...',
        points: 2
      },
      {
        id: 'bac_s1_p2_q4',
        type: 'single',
        question: 'The term "social cohesion" denotes the strength of __________ within a civilized polity.',
        questionAr: 'يشير مصطلح "التماسك الاجتماعي" إلى قوة الروابط والتضامن داخل المجتمع المتحضر.',
        options: [
          'corporate legal contracts',
          'interpersonal trust, solidarity, and shared civic values',
          'military fortifications',
          'private financial assets'
        ],
        correctAnswers: [1],
        explanation: 'Social cohesion describes communal bonds, trust, and mutual solidarity.',
        points: 2
      }
    ]
  }
];

export const baccalaureateExamsSec2: Exam[] = [
  // Grade 11 - Paper 1
  {
    id: 'bac_s2_paper1_2026',
    unitId: 1,
    level: 5,
    levelTitle: 'Sec 2 Baccalaureate Paper 1: Epistemology & Scientific Method',
    levelTitleAr: 'الورقة الأولى لبكالوريا الصف الثاني الثانوي: نظرية المعرفة والمنهج العلمي (2026/2027)',
    durationMinutes: 50,
    totalMarks: 36,
    governorate: 'Egyptian Baccalaureate Examination Board',
    term: 1,
    category: 'unit_level',
    mcqs: [
      {
        id: 'bac_s2_p1_q1',
        type: 'single',
        question: 'What Karl Popper emphasized in his philosophy of science __________ that scientific theories must be falsifiable.',
        options: ['was', 'were', 'being', 'had been'],
        correctAnswers: [0],
        explanation: 'Wh-cleft with singular nominal clause subject: What Karl Popper emphasized was...',
        points: 2
      },
      {
        id: 'bac_s2_p1_q2',
        type: 'single',
        question: 'The cognitive bias wherein individuals anchor excessively upon the initial piece of information encountered is termed the __________ effect.',
        options: ['confirmation', 'anchoring', 'availability', 'hindsight'],
        correctAnswers: [1],
        explanation: 'Anchoring heuristic causes people to disproportionately weight initial data.',
        points: 2
      },
      {
        id: 'bac_s2_p1_q3',
        type: 'single',
        question: 'Had the scientific team not instituted double-blind peer scrutiny, the systematic error __________ undetected.',
        options: [
          'would have remained',
          'remained',
          'will remain',
          'has remained'
        ],
        correctAnswers: [0],
        explanation: 'Inverted third conditional: Had [subject] not [p.p.], [subject] would have [p.p.].',
        points: 2
      },
      {
        id: 'bac_s2_p1_q4',
        type: 'single',
        question: 'The linguistic term "nominalisation" refers to the conversion of verbs or adjectives into __________.',
        options: ['conjunctions', 'abstract nouns', 'modal auxiliaries', 'exclamations'],
        correctAnswers: [1],
        explanation: 'Nominalisation transforms actions or qualities into nouns (e.g. assess -> assessment).',
        points: 2
      }
    ]
  }
];

export const baccalaureateExamsSec3: Exam[] = [
  // Grade 12 - Higher Level Capstone Simulation Paper
  {
    id: 'bac_s3_hl_capstone_2026',
    unitId: 1,
    level: 5,
    levelTitle: 'Sec 3 Baccalaureate Higher Level (HL) Capstone Examination',
    levelTitleAr: 'امتحان المستوى الرفيع (HL) الشامل لشهادة إتمام البكالوريا المصرية (2026/2027)',
    durationMinutes: 60,
    totalMarks: 50,
    governorate: 'Egyptian Baccalaureate Central Examination Syndicate',
    term: 2,
    category: 'term_revision',
    mcqs: [
      {
        id: 'bac_s3_c1',
        type: 'single',
        question: 'Having ratified the international maritime covenant, the sovereign state __________ its naval protocols accordingly.',
        options: ['aligned', 'aligning', 'was aligned', 'had aligned'],
        correctAnswers: [0],
        explanation: 'Perfect participle clause modifying main clause past simple verb "aligned".',
        points: 2
      },
      {
        id: 'bac_s3_c2',
        type: 'single',
        question: 'The doctrine of "universal jurisprudence" asserts that fundamental legal norms __________ all statutory boundaries.',
        options: ['transcend', 'subjugate', 'abbreviate', 'corrode'],
        correctAnswers: [0],
        explanation: 'Transcend = exceed, go beyond human-made local boundaries.',
        points: 2
      },
      {
        id: 'bac_s3_c3',
        type: 'single',
        question: 'Were any state __________ its multilateral treaty obligations, binding international sanctions would follow.',
        options: ['to breach', 'breached', 'breaches', 'breaching'],
        correctAnswers: [0],
        explanation: 'Inverted second conditional: Were + subject + to + base verb.',
        points: 2
      },
      {
        id: 'bac_s3_c4',
        type: 'single',
        question: 'The term "discourse marker" identifies words and expressions used to __________.',
        options: [
          'connect, organize, and manage the flow of spoken or written communication',
          'calculate astronomical trajectories',
          'measure blood pressure in clinical patients',
          'manufacture synthetic microchips'
        ],
        correctAnswers: [0],
        explanation: 'Discourse markers structure logical transitions and argumentation.',
        points: 2
      }
    ]
  }
];

// All Baccalaureate Exams consolidated
export const allBaccalaureateExams: Exam[] = [
  ...baccalaureateExamsSec1,
  ...baccalaureateExamsSec2,
  ...baccalaureateExamsSec3
];

export const getBaccalaureateExamsByGrade = (grade: number): Exam[] => {
  if (grade === 10) return baccalaureateExamsSec1;
  if (grade === 11) return baccalaureateExamsSec2;
  if (grade === 12) return baccalaureateExamsSec3;
  return baccalaureateExamsSec1;
};
