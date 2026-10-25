import { UnitCurriculum, UnitExam } from '../types/curriculum.ts';

// Secondary 1 - Term 1 (2026/2027 Egyptian Ministry of Education Specifications)
// Unified Syllabus: Units 1 to 6 + Term 1 Comprehensive Revision
// Novel: The Old Man and the Sea by Ernest Hemingway (Chapters 1 to 6)

// ============================================================================
// UNIT 1: Egypt's Heritage (تراث مصر الحضاري)
// ============================================================================
export const sec1Unit1: UnitCurriculum = {
  stage: 'Secondary',
  grade: 10,
  gradeLabel: 'Secondary 1 - الصف الأول الثانوي',
  track: 'General Secondary',
  secondaryPath: 'general_secondary',
  semester: 1,
  unitNumber: 1,
  unitTitle: "Egypt's Heritage",
  unitTitleAr: 'تراث مصر الحضاري وصون الآثار الخالدة',
  theme: 'Taking Pride in Our Beloved Egypt, Historic Preservation, Archaeology & Identity',
  vocabularyModule: {
    keyWords: [
      {
        word: 'heritage',
        partOfSpeech: 'noun [uncountable]',
        meaningEn: 'The traditions, monuments, and achievements inherited from past generations of a nation.',
        meaningAr: 'التراث الحضاري والثقافي',
        collocation: 'cultural heritage / preserve national heritage',
        synonym: 'legacy / inheritance / traditions',
        antonym: 'modern innovation / contemporary trends',
        exampleSentence: "Egypt's priceless heritage attracts millions of visitors who admire the architectural genius of the Pharaohs."
      },
      {
        word: 'civilization',
        partOfSpeech: 'noun [countable/uncountable]',
        meaningEn: 'An advanced stage of human social, cultural, and technological development and organization.',
        meaningAr: 'حضارة إنسانية راقية',
        collocation: 'ancient civilization / cradle of civilization',
        synonym: 'culture / advanced society',
        antonym: 'barbarism / primitiveness',
        exampleSentence: 'The ancient Egyptian civilization flourished along the fertile banks of the River Nile for millenniums.'
      },
      {
        word: 'preserve',
        partOfSpeech: 'verb [transitive]',
        meaningEn: 'To protect something valuable from harm, decay, damage, or loss.',
        meaningAr: 'يحفظ / يصون من التلف',
        collocation: 'preserve antiquities / preserve historical monuments',
        synonym: 'safeguard / conserve / protect',
        antonym: 'destroy / neglect / ruin',
        exampleSentence: 'The Aswan High Dam salvage project helped preserve the monumental temples of Abu Simbel from rising waters.'
      },
      {
        word: 'restore',
        partOfSpeech: 'verb [transitive]',
        meaningEn: 'To repair an antique building or artwork so that it regains its original condition.',
        meaningAr: 'يرمم / يعيد إلى حالته الأصلية',
        collocation: 'restore historic buildings / restore ancient artifacts',
        synonym: 'renovate / refurbish / rehabilitate',
        antonym: 'demolish / dismantle',
        exampleSentence: 'Specialized Egyptian archaeological teams painstakingly restore ancient murals in Islamic Cairo.'
      },
      {
        word: 'identity',
        partOfSpeech: 'noun [countable/uncountable]',
        meaningEn: 'The qualities, culture, and beliefs that distinguish an individual or a national community.',
        meaningAr: 'الهوية الوطنية / الشخصية القومية',
        collocation: 'national identity / sense of identity',
        synonym: 'individuality / character',
        antonym: 'anonymity / uniformity',
        exampleSentence: 'A deep appreciation of ancestral history instills a profound sense of national identity in young learners.'
      },
      {
        word: 'monument',
        partOfSpeech: 'noun [countable]',
        meaningEn: 'A historic building, statue, or stone edifice built to commemorate an illustrious person or historical era.',
        meaningAr: 'أثر تاريخي خالد / صرح معماري',
        collocation: 'ancient monument / historic monument',
        synonym: 'memorial / landmark / historic site',
        antonym: 'ephemeral structure',
        exampleSentence: 'The Karnak Temple complex in Luxor is one of the most awe-inspiring religious monuments ever erected.'
      }
    ],
    collocations: [
      {
        phrase: 'take pride in',
        meaningAr: 'يفخر ويعتز بـ',
        example: 'Egyptians take immense pride in their country’s monumental historical contributions to human civilization.'
      },
      {
        phrase: 'shed light on',
        meaningAr: 'يسلط الضوء على',
        example: 'Recent excavations at Saqqara shed light on forgotten pharaonic rituals and burial customs.'
      },
      {
        phrase: 'pay tribute to',
        meaningAr: 'يُشيد بـ / يقدم تحية تقدير لـ',
        example: 'International scholars pay tribute to Egyptian archaeologists for their groundbreaking discoveries.'
      },
      {
        phrase: 'date back to',
        meaningAr: 'يرجع تاريخه إلى',
        example: 'The Step Pyramid of Djoser dates back to the Third Dynasty around 2700 BCE.'
      }
    ],
    idiomsAndExpressions: [
      {
        idiom: 'etched in stone',
        meaningEn: 'Permanent and unalterable.',
        meaningAr: 'محفور في الذاكرة / راسخ وثابت',
        example: 'The bravery of ancient Egyptian builders remains etched in stone across the Giza plateau.'
      },
      {
        idiom: 'test of time',
        meaningEn: 'Remaining respected, durable, or admired over long centuries.',
        meaningAr: 'الصمود أمام اختبار الزمن',
        example: 'Pharaonic limestone architecture has triumphantly stood the test of time for five thousand years.'
      }
    ],
    exercises: [
      {
        id: 'sec1_u1_v1',
        skill: 'Vocabulary',
        question: 'A strong sense of national __________ is essential for every citizen to take pride in their homeland.',
        options: ['difficulty', 'identity', 'hieroglyphs', 'spices'],
        correctAnswer: 'B',
        explanation: 'From Unit 1 Key Vocab: "identity" (هوية) defines a nation’s distinct character and shared unity.'
      },
      {
        id: 'sec1_u1_v2',
        skill: 'Vocabulary',
        question: 'International organizations collaborate with Egypt to __________ ancient temples from environmental erosion.',
        options: ['neglect', 'demolish', 'preserve', 'complain'],
        correctAnswer: 'C',
        explanation: '"Preserve" (يحفظ / يصون) means to protect historical treasures from harm and degradation.'
      },
      {
        id: 'sec1_u1_v3',
        skill: 'Vocabulary',
        question: 'The Karnak Temple complex in Luxor is an exceptional __________ that testifies to pharaonic grandeur.',
        options: ['monument', 'pedestrian', 'appliance', 'passenger'],
        correctAnswer: 'A',
        explanation: 'A "monument" is a structure or landmark erected to commemorate an epoch or enduring achievement.'
      },
      {
        id: 'sec1_u1_v4',
        skill: 'Vocabulary',
        question: 'Egyptian antiquities curators painstakingly __________ damaged papyrus manuscripts using delicate organic binders.',
        options: ['pollute', 'restore', 'abandon', 'disguise'],
        correctAnswer: 'B',
        explanation: '"Restore" (يرمم) denotes repairing valuable artifacts back to their pristine condition.'
      }
    ]
  },
  grammarModule: {
    ruleName: 'Past Simple, Past Continuous, Habitual Past & Unreal Subjunctive',
    ruleNameAr: 'الماضي البسيط، الماضي المستمر، صيغ العادات الماضية، والماضي غير الحقيقي وتريكات الامتحانات',
    explanationSummary: 'A comprehensive ministerial masterclass covering past narrative tenses, interrupted vs. simultaneous events, stative verb restrictions, "used to" vs. "would" vs. "be used to", unreal past wishes, and high-frequency exam traps (During, While, On, Inversions).',
    detailedRules: [
      {
        title: 'Part A: Past Simple vs. Past Continuous (Narratives & Interruptions)',
        explanation: 'The Past Simple (regular -ed or irregular V2) expresses completed historical events, past facts, and chronological sequential actions. The Past Continuous (was/were + V-ing) describes background actions in progress at a specific past moment or when interrupted by a shorter action. Key trigger words: yesterday, in 1922, ago, once, in ancient times, the other day (Past Simple) vs. while, as, just as, when, all day yesterday, at 7 PM last night (Past Continuous).',
        examples: [
          'Sequential chronological actions: Howard Carter opened the tomb seal, entered the ante-chamber, and marveled at the golden artifacts.',
          'Interrupted action: While the archaeologists were carefully brushing the papyrus scroll, a sudden gust of wind blew through the corridor.',
          'Parallel simultaneous actions: While Nada was reading about Queen Hatshepsut, her brother was drawing a detailed map of ancient Thebes.',
          'Specific point in past time: At eight o’clock yesterday evening, Professor Zahi was delivering an international lecture on the Grand Egyptian Museum.'
        ]
      },
      {
        title: 'Part A (Crucial Rule): Stative Verbs Strict Restriction',
        explanation: 'Stative verbs (verbs of feeling, emotion, senses, cognition, possession, and state of being) CANNOT be used in continuous tenses (-ing). Even when describing an action in progress or an interruption, they MUST remain in the Past Simple. Categories: (1) Emotion/Desire: love, hate, like, prefer, want, wish; (2) Senses/Perception: see, hear, smell, taste, notice; (3) Cognition/Belief: know, understand, believe, realize, remember, forget; (4) Possession: have, own, possess, belong to; (5) Being/Existence: be, exist, seem, appear, consist of.',
        examples: [
          '✓ While I was at home, someone knocked at the door. (NOT: While I was being at home...)',
          '✓ When the guide spoke, I understood the hieroglyphic inscription immediately. (NOT: I was understanding...)',
          '✓ Ancient Egyptians possessed immense knowledge of astronomy. (NOT: were possessing...)',
          '✓ She seemed exhausted after exploring the Valley of the Kings. (NOT: was seeming...)'
        ]
      },
      {
        title: 'Part B: Habitual Past Formations (used to vs. would vs. be/get used to)',
        explanation: 'Crucial distinctions for Ministry examinations: (1) "used to + infinitive" expresses past habits or permanent past states that are NO LONGER true today (Neg: didn’t use to + inf / never used to + inf; Q: Did you use to + inf?). (2) "would + infinitive" expresses repeated past actions only; it CANNOT be used with stative verbs (e.g. have, be, live, own, know). (3) "be / get used to + V-ing / noun" expresses present or ongoing familiarity with a habit or adapting to a routine (e.g. "I am used to waking up early"). (4) "be used to + inf / used for + V-ing" denotes utility/tools (e.g. "Papyrus was used to make paper").',
        examples: [
          'used to (past state): My grandfather used to live near the Karnak Temple, but now he lives in Cairo.',
          'used to (past habit): Ancient scribes used to write on papyrus sheets before paper was imported.',
          'would (repeated past action only): Whenever he visited Alexandria in summer, he would swim at sunrise.',
          'INCORRECT with would: ✗ He would be a famous archaeologist. → ✓ He used to be a famous archaeologist. ("be" is stative!)',
          'be used to + V-ing (present familiarity): Egyptian farmers are used to working under the bright sun.',
          'get used to + V-ing (adaptation process): The foreign tourists soon got used to drinking hot mint tea.'
        ]
      },
      {
        title: 'Part C: Unreal Past & Subjunctive Patterns (Wish / It’s time / Would rather)',
        explanation: 'The Unreal Past (الماضي غير الحقيقي) uses past verb forms to express present wishes, unreal conditions, or strong preferences: (1) "It’s (high/about) time + subject + Past Simple": Indicates an action is already overdue and should be happening now. (2) "I’d rather + subject + Past Simple": Expresses a preference about someone else’s current action (e.g. "I’d rather you didn’t speak loudly"). If there is NO second subject, use a bare infinitive ("I’d rather study now"). (3) "I wish / If only + subject + Past Simple": Expresses a regret or desire contrary to current present reality (e.g. "I wish I knew ancient hieroglyphics"). To express past regret, use Past Perfect ("I wish I had visited Luxor last year").',
        examples: [
          'It’s high time we took decisive action to preserve vernacular Egyptian architecture.',
          'I’d rather you paid tribute to our national heritage instead of disregarding historical monuments.',
          'I wish our school had an archaeological museum club this semester.',
          'Without second subject: I’d rather visit the Grand Egyptian Museum than stay at home.'
        ]
      },
      {
        title: 'Part D: High-Order Exam Traps (During, While, On & Negative Inversions)',
        explanation: 'Top high-frequency examination traps in the Egyptian MOE specifications: (1) "During + noun phrase": Strictly followed by a noun, NEVER a clause with a verb (e.g. "During the excavation..."). (2) "While + V-ing (without subject)": Allowed ONLY when the subject of both clauses is identical (e.g. "While walking along the Nile, Dr. Zahi noticed a statue"). If subjects differ, you must write a full clause. (3) "On + V-ing": Signifies an instantaneous, sudden action (equivalent to "As soon as + Past Simple"). (4) Negative Inversions: When beginning a sentence with "No sooner / Hardly / Scarcely", use inverted question word-order: "No sooner had + Subj + P.P. ... THAN ..." and "Hardly / Scarcely had + Subj + P.P. ... WHEN ...".',
        examples: [
          'During + Noun: During the archaeological expedition to Saqqara, thirty sealed wooden coffins were found.',
          'While + V-ing: While excavating the desert tomb, the team found a intact limestone sarcophagus.',
          'On + V-ing (instant action): On seeing the golden funeral mask of Tutankhamun, the visitors stood speechless.',
          'Inversion 1: No sooner had the museum doors opened than thousands of eager tourists entered the grand hall.',
          'Inversion 2: Hardly had the researchers published their findings when international institutes requested collaborative scans.'
        ]
      }
    ],
    exercises: [
      {
        id: 'sec1_u1_g1',
        skill: 'Grammar',
        question: 'While the archaeological team __________ the ante-chamber, a hidden limestone wall was uncovered.',
        options: ['were excavating', 'excavate', 'have excavated', 'had been excavating'],
        correctAnswer: 'A',
        explanation: '"While" introduces an action in progress in the past (were excavating) that was interrupted by a completed action (was uncovered).'
      },
      {
        id: 'sec1_u1_g2',
        skill: 'Grammar',
        question: 'When my grandfather was young, he __________ a modest mud-brick house in Upper Egypt.',
        options: ['used to have', 'would have', 'was having', 'is used to having'],
        correctAnswer: 'A',
        explanation: '"Have" denotes a permanent state of possession (stative verb). "Would" cannot be used with stative verbs, so only "used to have" is correct.'
      },
      {
        id: 'sec1_u1_g3',
        skill: 'Grammar',
        question: '__________ the excavation ceremony in Saqqara, international reporters photographed thirty intact sarcophagi.',
        options: ['During', 'While', 'As', 'Since'],
        correctAnswer: 'A',
        explanation: '"During" must be followed by a noun phrase ("the excavation ceremony..."), whereas "while" requires a full clause or V-ing.'
      },
      {
        id: 'sec1_u1_g4',
        skill: 'Grammar',
        question: 'It’s high time we __________ serious initiatives to preserve vernacular historical landmarks.',
        options: ['launched', 'launch', 'have launched', 'will launch'],
        correctAnswer: 'A',
        explanation: 'Unreal past: "It’s high time + subject + Past Simple" expresses that an action is overdue and should be taken now.'
      },
      {
        id: 'sec1_u1_g5',
        skill: 'Grammar',
        question: 'No sooner __________ the new conservation laboratory than foreign specialists arrived to inspect the papyri.',
        options: ['had the ministry equipped', 'the ministry had equipped', 'did the ministry equip', 'has the ministry equipped'],
        correctAnswer: 'A',
        explanation: 'Negative inversion: "No sooner had + subject + P.P. ... than". Fronting "No sooner" requires question word-order.'
      },
      {
        id: 'sec1_u1_g6',
        skill: 'Grammar',
        question: '__________ hearing the shocking news of the historical monument’s collapse, the antiquities minister dispatched an emergency taskforce.',
        options: ['On', 'While', 'During', 'Although'],
        correctAnswer: 'A',
        explanation: '"On + V-ing" expresses an instantaneous reaction or immediate event, functioning as "As soon as he heard...".'
      },
      {
        id: 'sec1_u1_g7',
        skill: 'Grammar',
        question: 'I would rather you __________ my personal archaeological notebook without asking for permission first.',
        options: ['didn’t borrow', 'don’t borrow', 'won’t borrow', 'haven’t borrowed'],
        correctAnswer: 'A',
        explanation: 'Unreal past preference: "I’d rather + subject + Past Simple" expresses a preference about another person’s current behavior.'
      },
      {
        id: 'sec1_u1_g8',
        skill: 'Grammar',
        question: 'While I __________ at Luxor Temple at sunset, the colossal statues cast magnificent shadows across the courtyard.',
        options: ['was', 'was being', 'am', 'had been being'],
        correctAnswer: 'A',
        explanation: 'The verb "to be" is a stative verb of existence and does not take continuous aspect here. "While I was at Luxor Temple" is correct.'
      }
    ]
  },
  readingModule: {
    passageTitle: 'The Grand Egyptian Museum: Bridging Antiquity and the Future',
    passage: `Positioned on the edge of the Giza Plateau, the Grand Egyptian Museum (GEM) represents the most ambitious cultural infrastructure project of the twenty-first century. Spanning over half a million square meters, the museum stands as a monumental architectural bridge linking the Pyramids of Giza with contemporary Egyptian civilization. It houses over one hundred thousand artifacts, including the complete, breathtaking funeral treasure of King Tutankhamun displayed together in its entirety for the very first time since its discovery in 1922.

The construction of the museum illustrates how modern technological innovation can be deployed to honor ancestral heritage. Cutting-edge conservation laboratories equipped with computerized atmospheric chambers stabilize fragile organic relics, such as wooden funeral boats and linen textiles. High-resolution multispectral scanning enables scholars to decipher weathered inscriptions without physically contacting the delicate surfaces.

Crucially, the GEM does not merely celebrate the past; it nurtures civic pride and economic vitality. Educational pavilions immerse Egyptian school children in interactive workshops on ancient architecture, metallurgy, and astronomy. In doing so, it ensures that succeeding generations perceive Egypt’s history not as dead stones preserved under glass, but as a living source of creative inspiration and national identity.`,
    criticalThinkingFocus: 'Analyzing heritage conservation as an active instrument of cultural diplomacy, national identity, and sustainable tourism.',
    questions: [
      {
        id: 'sec1_u1_r1',
        skill: 'Reading',
        question: 'What is historically unprecedented about the King Tutankhamun exhibition at the Grand Egyptian Museum?',
        options: [
          'It is the first time his complete funerary collection is exhibited together in its entirety.',
          'All the gold artifacts have been replaced with plastic replicas.',
          'The exhibition will only remain open for three months before being dismantled.',
          'Visitors are allowed to touch and handle the ancient gold masks directly.'
        ],
        correctAnswer: 'A',
        explanation: 'Paragraph 1 emphasizes that the complete funeral treasure is displayed together in its entirety for the first time.'
      },
      {
        id: 'sec1_u1_r2',
        skill: 'Reading',
        question: 'How do cutting-edge conservation laboratories protect delicate organic antiquities according to the passage?',
        options: [
          'By soaking them in industrial paint to preserve their color',
          'By using computerized atmospheric chambers and multispectral scanning without physical contact',
          'By keeping them exposed to direct desert sunlight',
          'By melting down wooden artifacts to extract golden nails'
        ],
        correctAnswer: 'B',
        explanation: 'Paragraph 2 highlights computerized atmospheric chambers and contactless multispectral scanning.'
      },
      {
        id: 'sec1_u1_r3',
        skill: 'Reading',
        question: 'What educational message does the author convey regarding the museum’s mission for young Egyptians?',
        options: [
          'History should be studied solely for passing school exams.',
          'Ancestral heritage is a living source of inspiration and national identity, not dead stones under glass.',
          'Modern Egyptians should completely abandon contemporary scientific careers.',
          'Ancient monuments have no relevance to modern urban planning.'
        ],
        correctAnswer: 'B',
        explanation: 'Paragraph 3 explicitly asserts that history must be perceived as a living inspiration and anchor of identity.'
      },
      {
        id: 'sec1_u1_r4',
        skill: 'Reading',
        question: 'The word "multispectral" in the second paragraph refers to technology that __________.',
        options: [
          'plays loud pharaonic music in the exhibition galleries',
          'analyzes relics across various wavelengths of light to reveal hidden details',
          'measures the temperature of visitors entering the turnstiles',
          'polishes stone statues with motorized rotating brushes'
        ],
        correctAnswer: 'B',
        explanation: 'Multispectral scanning uses multiple light wavelengths to examine surface and subsurface layers safely.'
      }
    ]
  },
  listeningModule: {
    audioTitle: 'The Old Man and the Sea: Chapter 1 — Santiago and Manolin',
    speakerRoles: 'Narrator & Literature Teacher (Mr. Tarek)',
    transcript: `Teacher: Good morning, class. In our 2026/2027 literature syllabus, we study Ernest Hemingway’s timeless novella, "The Old Man and the Sea". Today we examine Chapter 1: The Old Man and His Luck.
Narrator: Santiago is an elderly Cuban fisherman who has gone eighty-four days without catching a single fish. In the first forty days, a young boy named Manolin accompanied him. But after forty days without a catch, the boy’s parents insisted that the old man was "salao", which is the worst form of being unlucky. They ordered Manolin to join another boat that caught three good fish in their very first week.
Teacher: Does Manolin abandon the old man out of disrespect?
Narrator: Absolutely not. The boy loves and reveres Santiago deeply. He was five years old when the old man first taught him how to handle fishing tackle and hoist the sail. Every evening, when Santiago returns with his skiff empty and his sail patched with flour sacks, Manolin walks down to the terrace to meet him. He helps carry the heavy coiled lines, the gaff, and the harpoon up to the old man's modest shack.
Teacher: Notice Hemingway’s description of Santiago: "Everything about him was old except his eyes and they were the same color as the sea and were cheerful and undefeated." This contrast between physical frailty and spiritual fortitude is the heart of Hemingway’s moral code.`,
    durationApprox: '2 mins 30 secs',
    exercises: [
      {
        id: 'sec1_u1_l1',
        skill: 'Listening',
        question: 'How many consecutive days has Santiago gone without taking a fish at the start of Chapter 1?',
        options: ['Forty days', 'Eighty-four days', 'Three weeks', 'One year'],
        correctAnswer: 'B',
        explanation: 'The text and transcript state: Santiago has gone eighty-four days without catching a fish.'
      },
      {
        id: 'sec1_u1_l2',
        skill: 'Listening',
        question: 'Why did Manolin’s parents order him to transfer to a different fishing boat?',
        options: [
          'Because they wanted Manolin to become a merchant in Havana',
          'Because they believed the old man was "salao" (the worst form of bad luck)',
          'Because Santiago charged exorbitant fees for fishing lessons',
          'Because Manolin refused to wake up early in the morning'
        ],
        correctAnswer: 'B',
        explanation: 'His parents believed Santiago was "salao" (unlucky) and wanted their son to earn money on a lucky vessel.'
      },
      {
        id: 'sec1_u1_l3',
        skill: 'Listening',
        question: 'How does Manolin demonstrate his ongoing loyalty to Santiago despite his parents’ orders?',
        options: [
          'By sailing secretly to the Gulf Stream at midnight',
          'By meeting Santiago each evening, carrying his heavy fishing gear, and bringing him food',
          'By buying the old man a new motorized boat',
          'By telling the villagers not to speak to the old man'
        ],
        correctAnswer: 'B',
        explanation: 'Manolin meets him daily, carries his gear, and ensures he is fed with dignity.'
      },
      {
        id: 'sec1_u1_l4',
        skill: 'Listening',
        question: 'What memorable description characterizes Santiago’s eyes according to Hemingway?',
        options: [
          'They were dim and filled with bitter defeat',
          'They were blinded by the glare of the tropical sun',
          'They were the same color as the sea, cheerful and undefeated',
          'They were hidden behind dark sunglasses'
        ],
        correctAnswer: 'C',
        explanation: '"Everything about him was old except his eyes and they were the same color as the sea and were cheerful and undefeated."'
      }
    ]
  },
  unitExam: {
    examId: 'sec1_u1_exam',
    examTitle: "Secondary 1 - Unit 1 Comprehensive Assessment: Egypt's Heritage",
    examTitleAr: 'امتحان الوحدة الأولى الشامل: تراث مصر الحضاري (مواصفات 2026/2027)',
    durationMinutes: 30,
    totalMarks: 32,
    questions: [
      {
        id: 'sec1_u1_ex_q1',
        skill: 'Vocabulary',
        question: 'A sense of national __________ fosters communal unity and inspires citizens to protect their cultural legacy.',
        options: ['identity', 'difficulty', 'hesitation', 'hieroglyphs'],
        correctAnswer: 'A',
        explanation: '"Identity" (هوية) defines a nation’s shared cultural essence and historical belonging.'
      },
      {
        id: 'sec1_u1_ex_q2',
        skill: 'Vocabulary',
        question: 'Specialists use delicate botanical resins to __________ damaged wooden artifacts uncovered in ancient tombs.',
        options: ['destroy', 'restore', 'abandon', 'pollute'],
        correctAnswer: 'B',
        explanation: '"Restore" (يرمم) means to repair and return an antique relic to its original condition.'
      },
      {
        id: 'sec1_u1_ex_q3',
        skill: 'Grammar',
        question: 'While the curators __________ the gold artifacts, the museum alarm sounded accidentally.',
        options: ['examine', 'are examining', 'were examining', 'had examined'],
        correctAnswer: 'C',
        explanation: 'Past continuous (were examining) describes the background action interrupted by the alarm.'
      },
      {
        id: 'sec1_u1_ex_q4',
        skill: 'Grammar',
        question: 'In the nineteenth century, scholars __________ translate ancient inscriptions manually using magnifying glasses.',
        options: ['are used to', 'used to', 'use to', 'got used to'],
        correctAnswer: 'B',
        explanation: '"Used to + infinitive" describes customary bygone habits and practices.'
      },
      {
        id: 'sec1_u1_ex_q5',
        skill: 'Reading',
        question: 'The Grand Egyptian Museum utilizes multispectral scanning primarily to __________.',
        options: [
          'broadcast football matches to visitors',
          'examine ancient relics safely without physical contact',
          'calculate the ticket revenue automatically',
          'cool the exhibition halls during summer'
        ],
        correctAnswer: 'B',
        explanation: 'Multispectral scanning allows scientists to examine ancient artifacts safely without physical touch.'
      },
      {
        id: 'sec1_u1_ex_q6',
        skill: 'Listening',
        question: 'In Hemingway’s The Old Man and the Sea (Chapter 1), what quality sets Santiago’s eyes apart from the rest of his aged body?',
        options: [
          'They were clouded with sorrow and surrender',
          'They were cheerful, undefeated, and the color of the sea',
          'They were permanently closed due to illness',
          'They were filled with anger toward the villagers'
        ],
        correctAnswer: 'B',
        explanation: 'His eyes remained the color of the sea, cheerful and undefeated, symbolizing unbroken spiritual resilience.'
      }
    ]
  }
};

// ============================================================================
// UNIT 2: Hands Help, Hearts Care (يد تبني وقلب يرعى)
// ============================================================================
export const sec1Unit2: UnitCurriculum = {
  stage: 'Secondary',
  grade: 10,
  gradeLabel: 'Secondary 1 - الصف الأول الثانوي',
  track: 'General Secondary',
  secondaryPath: 'general_secondary',
  semester: 1,
  unitNumber: 2,
  unitTitle: 'Hands Help, Hearts Care',
  unitTitleAr: 'يد تبني وقلب يرعى: العمل التطوعي والتكافل المجتمعي',
  theme: 'Volunteering, Community Solidarity, Emergency Medical Services & Civic Altruism',
  vocabularyModule: {
    keyWords: [
      {
        word: 'volunteer',
        partOfSpeech: 'noun [person] / verb',
        meaningEn: 'A person who freely offers to take part in an enterprise or undertake a task without financial remuneration.',
        meaningAr: 'متطوع / يتطوع لخدمة المجتمع',
        collocation: 'community volunteer / volunteer at a hospital',
        synonym: 'altruist / unpaid worker',
        antonym: 'mercenary / paid employee',
        exampleSentence: 'Thousands of young Egyptians volunteer with the Red Crescent to deliver relief supplies to flood victims.'
      },
      {
        word: 'solidarity',
        partOfSpeech: 'noun [uncountable]',
        meaningEn: 'Unity or agreement of feeling or action, especially among individuals with a common interest or mutual support.',
        meaningAr: 'التضامن والتكافل الاجتماعي',
        collocation: 'social solidarity / show solidarity with',
        synonym: 'unity / cohesion / fellowship',
        antonym: 'discord / division / isolation',
        exampleSentence: 'Community solidarity during difficult times exemplifies the inherent nobility of the Egyptian people.'
      },
      {
        word: 'donation',
        partOfSpeech: 'noun [countable/uncountable]',
        meaningEn: 'Something given freely to help a person or organization, such as money, goods, or blood.',
        meaningAr: 'تبرع / هبة خيرية',
        collocation: 'blood donation / charitable donation',
        synonym: 'contribution / gift / grant',
        antonym: 'confiscation / extortion',
        exampleSentence: 'Regular blood donation at university clinics saves the lives of critical trauma patients daily.'
      },
      {
        word: 'paramedic',
        partOfSpeech: 'noun [person]',
        meaningEn: 'A healthcare professional trained to provide emergency medical treatment before a patient reaches the hospital.',
        meaningAr: 'مسعف طبي متخصص في الطوارئ',
        collocation: 'trained paramedic / emergency paramedic',
        synonym: 'emergency medical technician (EMT)',
        antonym: 'untrained bystander',
        exampleSentence: 'The swift response of the paramedic team stabilized the injured driver within minutes of the accident.'
      },
      {
        word: 'altruism',
        partOfSpeech: 'noun [uncountable]',
        meaningEn: 'The practice of disinterested and selfless concern for the well-being of others.',
        meaningAr: 'الإيثار وحب الخير للآخرين',
        collocation: 'act of altruism / pure altruism',
        synonym: 'selflessness / generosity / philanthropy',
        antonym: 'selfishness / egoism / greed',
        exampleSentence: 'Dr. Magdi Yacoub’s foundation is a stellar beacon of altruism, offering free cardiac surgeries to children.'
      },
      {
        word: 'first aid',
        partOfSpeech: 'noun [uncountable]',
        meaningEn: 'Emergency care or treatment given to an ill or injured person before regular medical aid can be obtained.',
        meaningAr: 'الإسعافات الأولية الأساسية',
        collocation: 'administer first aid / first aid kit',
        synonym: 'emergency treatment / immediate care',
        antonym: 'neglect',
        exampleSentence: 'All secondary school students should be certified in basic first aid and cardiopulmonary resuscitation (CPR).'
      }
    ],
    collocations: [
      {
        phrase: 'lend a helping hand',
        meaningAr: 'يمد يد العون والمساعدة',
        example: 'Youth groups eagerly lend a helping hand to elderly neighbors during winter weather.'
      },
      {
        phrase: 'make a difference',
        meaningAr: 'يحدث فارقاً إيجابياً ملموساً',
        example: 'Even a small monthly donation can make a profound difference to an impoverished rural school.'
      },
      {
        phrase: 'raise awareness of',
        meaningAr: 'ينشر الوعي بـ',
        example: 'The Ministry of Health launched a media campaign to raise awareness of voluntary blood donation.'
      },
      {
        phrase: 'come to someone’s rescue',
        meaningAr: 'يهب لنجدة شخص وإغاثته',
        example: 'Brave villagers came to the rescue of passengers trapped in the derailed train carriage.'
      }
    ],
    idiomsAndExpressions: [
      {
        idiom: 'heart of gold',
        meaningEn: 'An exceptionally kind, generous, and caring nature.',
        meaningAr: 'قلب طيب مفعم بالخير والرحمة',
        example: 'The veteran nurse is loved by all patients because she has a true heart of gold.'
      },
      {
        idiom: 'go the extra mile',
        meaningEn: 'Make more effort than is expected of you.',
        meaningAr: 'يبذل جهداً مضاعفاً فوق المتوقع',
        example: 'Dedicated hospice volunteers always go the extra mile to bring comfort to terminal patients.'
      }
    ],
    exercises: [
      {
        id: 'sec1_u2_v1',
        skill: 'Vocabulary',
        question: 'An inspiring public figure who dedicates their wealth and energy selflessly to society exhibits remarkable __________.',
        options: ['arrogance', 'egoism', 'altruism', 'hostility'],
        correctAnswer: 'C',
        explanation: '"Altruism" (إيثار) denotes selfless concern for the welfare of fellow humans.'
      },
      {
        id: 'sec1_u2_v2',
        skill: 'Vocabulary',
        question: 'Emergency hospitals heavily depend on voluntary blood __________ to perform urgent life-saving operations.',
        options: ['complaints', 'donations', 'prescriptions', 'hesitations'],
        correctAnswer: 'B',
        explanation: 'Blood "donations" (تبرعات) are voluntary transfers of blood to save patients in need.'
      },
      {
        id: 'sec1_u2_v3',
        skill: 'Vocabulary',
        question: 'Every driver should keep a certified __________ kit inside their vehicle for roadside emergencies.',
        options: ['first aid', 'fashion', 'souvenir', 'furniture'],
        correctAnswer: 'A',
        explanation: 'A "first aid" kit contains sterile dressings and essentials for immediate medical care.'
      },
      {
        id: 'sec1_u2_v4',
        skill: 'Vocabulary',
        question: 'The trained __________ arrived at the scene of the collapse within four minutes and administered oxygen.',
        options: ['paramedic', 'passenger', 'sculptor', 'archaeologist'],
        correctAnswer: 'A',
        explanation: 'A "paramedic" is an emergency healthcare worker providing pre-hospital triage and stabilization.'
      }
    ]
  },
  grammarModule: {
    ruleName: 'Modals: Advice, Obligation, Necessity & Prohibition (should/must/have to/needn’t)',
    ruleNameAr: 'أفعال المودال: النصيحة، الإلزام، الضرورة والتحريم (should, must, have to, needn’t)',
    explanationSummary: 'Must expresses strong personal obligation or ministerial law. Have to expresses external necessity. Should/Ought to give advice. Mustn’t expresses strict prohibition. Needn’t expresses lack of necessity.',
    detailedRules: [
      {
        title: 'Must vs. Have to: Internal vs External Obligation',
        explanation: 'Must expresses internal conviction, warm invitations, or strong reminders (I must call grandmother). Have to expresses external rules, laws, or institutional regulations imposed by others.',
        examples: [
          'All motorists have to fasten their seatbelts according to Egyptian traffic statute.',
          'I must visit my sick friend in the hospital tonight; I promised him.'
        ]
      },
      {
        title: 'Prohibition: Mustn’t vs Lack of Necessity: Don’t have to / Needn’t',
        explanation: 'Mustn’t indicates that an action is strictly forbidden, dangerous, or illegal. Don’t have to / Needn’t indicates that an action is optional—you are free to do it or not.',
        examples: [
          'You mustn’t touch historical artifacts in the museum; it is strictly prohibited.',
          'You needn’t buy admission tickets today because admission is free for students.'
        ]
      },
      {
        title: 'Past Modals: Had to, Should have + P.P., Needn’t have + P.P.',
        explanation: 'Had to is the past of must/have to. Should have + P.P. expresses past regret or mild blame. Needn’t have + P.P. indicates an action was done unnecessarily.',
        examples: [
          'The paramedic had to perform CPR immediately to revive the patient.',
          'You should have driven more carefully on the slippery desert highway.'
        ]
      }
    ],
    exercises: [
      {
        id: 'sec1_u2_g1',
        skill: 'Grammar',
        question: 'You __________ park your vehicle in front of the emergency ambulance bay; it is strictly illegal.',
        options: ['needn’t', 'mustn’t', 'don’t have to', 'should'],
        correctAnswer: 'B',
        explanation: '"Mustn’t" expresses strict legal prohibition and acute danger.'
      },
      {
        id: 'sec1_u2_g2',
        skill: 'Grammar',
        question: 'Tomorrow is an official national holiday, so students __________ wake up early for school.',
        options: ['mustn’t', 'don’t have to', 'shouldn’t have', 'had to'],
        correctAnswer: 'B',
        explanation: '"Don’t have to" expresses lack of necessity: it is not required.'
      },
      {
        id: 'sec1_u2_g3',
        skill: 'Grammar',
        question: 'Hossam had severe stomach pains last night, so his family __________ call an emergency doctor.',
        options: ['must', 'have to', 'had to', 'need to'],
        correctAnswer: 'C',
        explanation: '"Had to" is the required past form expressing past necessity.'
      },
      {
        id: 'sec1_u2_g4',
        skill: 'Grammar',
        question: 'You __________ forgotten your grandmother’s birthday yesterday; she felt deeply heartbroken.',
        options: ['shouldn’t have', 'must have', 'needn’t have', 'could have'],
        correctAnswer: 'A',
        explanation: '"Shouldn’t have + P.P." expresses blame and reproach for an undesirable past action.'
      }
    ]
  },
  readingModule: {
    passageTitle: 'Decent Life (Hayah Karima): Reimagining Rural Solidarity',
    passage: `In recent decades, sustainable social development has shifted from sporadic charity handouts to comprehensive structural empowerment. The Egyptian national initiative "Hayah Karima" (Decent Life) stands as the largest rural transformation program in the modern history of the Middle East, directly uplifting over fifty-eight million citizens across four thousand five hundred villages.

Rather than offering temporary financial subsidies, the initiative addresses the root systemic causes of multidimensional rural poverty. Interdisciplinary teams of civil engineers, physicians, and social workers collaborate closely with village councils. Together, they construct decentralized wastewater networks, pave rural road corridors, build modern primary health clinics, and install high-speed fiber-optic digital infrastructure in remote hamlets.

Equally transformative is the mobilization of youth volunteers. Over twenty-five thousand university students participate in literacy campaigns, mobile dental clinics, and vocational workshops that teach young women agribusiness processing and handicrafts. Sociologists observe that Decent Life has revived the traditional Egyptian ethos of "Gada’ana" (chivalric communal solidarity), proving that national progress is achieved when state investment converges harmoniously with civic altruism.`,
    criticalThinkingFocus: 'Evaluating systemic development versus temporary charity; youth civic engagement as a catalyst for rural equity.',
    questions: [
      {
        id: 'sec1_u2_r1',
        skill: 'Reading',
        question: 'How does the Decent Life initiative fundamentally differ from conventional charitable handouts?',
        options: [
          'It replaces state hospitals with private fee-paying companies.',
          'It addresses systemic root causes by constructing lasting infrastructure, clinics, and digital networks.',
          'It gives cash prizes exclusively to foreign tourists in Luxor.',
          'It forces rural populations to relocate permanently to urban capitals.'
        ],
        correctAnswer: 'B',
        explanation: 'Paragraph 2 highlights structural development: decentralized wastewater, clinics, schools, and fiber-optic cables.'
      },
      {
        id: 'sec1_u2_r2',
        skill: 'Reading',
        question: 'In what way do youth university volunteers contribute directly to the success of the initiative?',
        options: [
          'By drafting international corporate tax legislation',
          'By participating in rural literacy classes, mobile medical caravans, and vocational training',
          'By closing down local agricultural markets',
          'By importing foreign packaged foods into villages'
        ],
        correctAnswer: 'B',
        explanation: 'Paragraph 3 notes university students run literacy classes, mobile dental clinics, and vocational workshops.'
      },
      {
        id: 'sec1_u2_r3',
        skill: 'Reading',
        question: 'What traditional cultural value has the Decent Life initiative successfully revitalized according to sociologists?',
        options: [
          'Commercial isolationism',
          'Chivalric communal solidarity and mutual social assistance',
          'Competitive consumer individualism',
          'Reluctance to learn modern technology'
        ],
        correctAnswer: 'B',
        explanation: 'Paragraph 3 states it has revived the Egyptian ethos of chivalric communal solidarity (Gada’ana).'
      },
      {
        id: 'sec1_u2_r4',
        skill: 'Reading',
        question: 'The phrase "multidimensional rural poverty" in paragraph 2 refers to hardship that includes __________.',
        options: [
          'only the inability to buy luxury smartphones',
          'deficits in clean water, healthcare access, education, and sanitation simultaneously',
          'an overabundance of free agricultural land',
          'living too close to historical monuments'
        ],
        correctAnswer: 'B',
        explanation: 'Multidimensional poverty encompasses lack of healthcare, sanitation, education, and basic infrastructure.'
      }
    ]
  },
  listeningModule: {
    audioTitle: 'The Old Man and the Sea: Chapter 2 — Preparing for the Great Day',
    speakerRoles: 'Literature Teacher (Mr. Tarek) & Student (Sherif)',
    transcript: `Teacher: Welcome back, Sherif. In Chapter 2 of The Old Man and the Sea, we enter Santiago’s humble shack and witness his preparation for the eighty-fifth day.
Sherif: Sir, what kind of life does Santiago live inside his cabin?
Teacher: Extremely austere. There is a bed, a table, one chair, and a place on the dirt floor to cook with charcoal. On the walls hang two colored pictures of religious figures, relics of his deceased wife. Yet despite this poverty, Santiago and Manolin preserve an elaborate ritual of pride. Santiago claims he has a pot of yellow rice and fish, even though both know the pot is completely empty!
Sherif: Why does Manolin play along with this imaginary meal?
Teacher: Because the boy understands that dignity is sacred. Manolin refuses to humiliate the old man. Instead, the boy runs down to the local café, owned by Martin, and borrows a supper of black beans, rice, fried bananas, and stew, along with two bottles of beer.
Sherif: And what do they talk about before sleeping?
Teacher: American baseball! Santiago idolizes the great Joe DiMaggio, whose father was also a fisherman. Santiago draws strength from DiMaggio’s ability to perform heroically despite bone spurs in his heel. When Santiago finally sleeps on old newspapers, he does not dream of storms or big fish; he dreams only of the young lions playing on the golden beaches of Africa, symbols of youthful vitality and peace. Tomorrow, on his eighty-fifth day, Santiago will venture far out into the deep Gulf Stream alone.`,
    durationApprox: '2 mins 20 secs',
    exercises: [
      {
        id: 'sec1_u2_l1',
        skill: 'Listening',
        question: 'What fiction do Santiago and Manolin maintain regarding the old man’s dinner in Chapter 2?',
        options: [
          'That Santiago has a pot of yellow rice and fish, even though the pot is empty',
          'That Santiago has hired a famous French chef',
          'That the old man has already eaten a banquet at the governor’s palace',
          'That Santiago is on a strict scientific diet'
        ],
        correctAnswer: 'A',
        explanation: 'Santiago pretends he has a pot of yellow rice and fish to protect his masculine dignity.'
      },
      {
        id: 'sec1_u2_l2',
        skill: 'Listening',
        question: 'How does Manolin ensure that the old man does not go hungry that evening?',
        options: [
          'He catches fish from his own boat and leaves them on the beach',
          'He goes to Martin’s café and brings back a warm supper of beans, rice, and stew',
          'He asks the police to deliver government rations',
          'He invites Santiago to move into a luxury hotel'
        ],
        correctAnswer: 'B',
        explanation: 'Manolin visits Martin’s café and secures a hearty meal of beans, rice, bananas, and stew.'
      },
      {
        id: 'sec1_u2_l3',
        skill: 'Listening',
        question: 'Which baseball legend does Santiago revere as an archetype of resilience?',
        options: ['Babe Ruth', 'Joe DiMaggio', 'Jackie Robinson', 'Ted Williams'],
        correctAnswer: 'B',
        explanation: 'Santiago admires Joe DiMaggio, whose father was a fisherman and who played through pain.'
      },
      {
        id: 'sec1_u2_l4',
        skill: 'Listening',
        question: 'What recurring vision appears in Santiago’s peaceful dreams each night?',
        options: [
          'Huge marlins breaking his wooden lines',
          'Fierce storms capsizing his skiff',
          'Lions playing on the golden beaches of Africa',
          'Gold treasures hidden beneath the sea'
        ],
        correctAnswer: 'C',
        explanation: 'He dreams of young lions on African beaches, representing lost youth, harmony, and vitality.'
      }
    ]
  },
  unitExam: {
    examId: 'sec1_u2_exam',
    examTitle: 'Secondary 1 - Unit 2 Comprehensive Assessment: Hands Help, Hearts Care',
    examTitleAr: 'امتحان الوحدة الثانية الشامل: يد تبني وقلب يرعى (مواصفات 2026/2027)',
    durationMinutes: 30,
    totalMarks: 32,
    questions: [
      {
        id: 'sec1_u2_ex_q1',
        skill: 'Vocabulary',
        question: 'Civic organizations encourage voluntary blood __________ to ensure emergency blood banks never run dry.',
        options: ['prescriptions', 'donations', 'complaints', 'suspicions'],
        correctAnswer: 'B',
        explanation: '"Donations" (تبرعات) are voluntary life-saving contributions.'
      },
      {
        id: 'sec1_u2_ex_q2',
        skill: 'Vocabulary',
        question: 'An individual who acts with pure __________ puts the safety and welfare of others above their own interests.',
        options: ['altruism', 'vanity', 'rivalry', 'greed'],
        correctAnswer: 'A',
        explanation: '"Altruism" (إيثار) is selfless devotion to the good of others.'
      },
      {
        id: 'sec1_u2_ex_q3',
        skill: 'Grammar',
        question: 'Drivers __________ exceed the statutory speed limit inside school zones; it is punishable by law.',
        options: ['needn’t', 'mustn’t', 'don’t have to', 'ought to'],
        correctAnswer: 'B',
        explanation: '"Mustn’t" expresses strict legal prohibition and safety necessity.'
      },
      {
        id: 'sec1_u2_ex_q4',
        skill: 'Grammar',
        question: 'Because the library had digital copies of the textbook, Kareem __________ purchase an expensive paper edition.',
        options: ['mustn’t', 'didn’t have to', 'should have', 'must'],
        correctAnswer: 'B',
        explanation: '"Didn’t have to" expresses past lack of obligation: he didn’t need to buy it.'
      },
      {
        id: 'sec1_u2_ex_q5',
        skill: 'Reading',
        question: 'The Decent Life (Hayah Karima) initiative achieves sustainable rural development because it __________.',
        options: [
          'invests in permanent infrastructure, healthcare, sanitation, and digital connectivity',
          'prohibits university students from entering rural governorates',
          'relies exclusively on short-term food hand-outs',
          'encourages villagers to abandon agriculture'
        ],
        correctAnswer: 'A',
        explanation: 'Decent Life targets root causes via lasting infrastructure, schools, and sanitation.'
      },
      {
        id: 'sec1_u2_ex_q6',
        skill: 'Listening',
        question: 'In Chapter 2 of The Old Man and the Sea, Santiago’s recurring dreams of lions on African beaches symbolize __________.',
        options: [
          'his intense hatred for tropical animals',
          'his fear of drowning in the ocean',
          'his enduring connection to youth, peace, and natural strength',
          'his longing to become a wealthy hunter'
        ],
        correctAnswer: 'C',
        explanation: 'The lions symbolize youth, vitality, serenity, and natural harmony.'
      }
    ]
  }
};

// ============================================================================
// UNIT 3: Truth Vs. Lies (الحقيقة في مواجهة الأكاذيب)
// ============================================================================
export const sec1Unit3: UnitCurriculum = {
  stage: 'Secondary',
  grade: 10,
  gradeLabel: 'Secondary 1 - الصف الأول الثانوي',
  track: 'General Secondary',
  secondaryPath: 'general_secondary',
  semester: 1,
  unitNumber: 3,
  unitTitle: 'Truth Vs. Lies',
  unitTitleAr: 'الحقيقة في مواجهة الأكاذيب والتضليل الرقمي',
  theme: 'Cyber Awareness, Misinformation, Critical Media Literacy & Digital Verification',
  vocabularyModule: {
    keyWords: [
      {
        word: 'scam',
        partOfSpeech: 'noun [countable] / verb',
        meaningEn: 'A dishonest scheme designed to cheat someone out of money or sensitive personal information.',
        meaningAr: 'احتيال ونصب رقمي',
        collocation: 'online scam / falling for a scam',
        synonym: 'fraud / swindle / hoax',
        antonym: 'legitimate transaction / honest deal',
        exampleSentence: 'Cybersecurity agencies caution citizens never to click suspicious links associated with banking scams.'
      },
      {
        word: 'misinformation',
        partOfSpeech: 'noun [uncountable]',
        meaningEn: 'Incorrect, misleading, or fabricated information spread regardless of intent to deceive.',
        meaningAr: 'معلومات مغلوطة ومضللة',
        collocation: 'combat misinformation / spread misinformation',
        synonym: 'disinformation / falsehood / fake news',
        antonym: 'verified fact / truth',
        exampleSentence: 'Social media algorithms can inadvertently amplify viral misinformation during national health emergencies.'
      },
      {
        word: 'exploit',
        partOfSpeech: 'verb [transitive]',
        meaningEn: 'To take unfair advantage of a vulnerability, person, or situation for personal or monetary gain.',
        meaningAr: 'يستغل بطريقة غير مشروعة',
        collocation: 'exploit a loophole / exploit vulnerabilities',
        synonym: 'manipulate / abuse / capitalize unfairly',
        antonym: 'protect / safeguard / assist',
        exampleSentence: 'Cyber criminals exploit insecure passwords to compromise digital bank accounts.'
      },
      {
        word: 'verify',
        partOfSpeech: 'verb [transitive]',
        meaningEn: 'To make sure or demonstrate that something is true, accurate, or authentic.',
        meaningAr: 'يتحقق من صحة الخبر أو المصدر',
        collocation: 'verify sources / verify accuracy',
        synonym: 'authenticate / confirm / corroborate',
        antonym: 'disprove / invalidate / fabricate',
        exampleSentence: 'Conscientious journalists verify facts across multiple primary sources before publishing breaking news.'
      },
      {
        word: 'credible',
        partOfSpeech: 'adjective',
        meaningEn: 'Able to be believed, convincing, and trustworthy based on evidence.',
        meaningAr: 'موثوق به وذو مصداقية',
        collocation: 'credible source / credible evidence',
        synonym: 'trustworthy / reliable / authoritative',
        antonym: 'unreliable / dubious / suspicious',
        exampleSentence: 'Students should rely only on credible academic databases when conducting research for their graduation projects.'
      },
      {
        word: 'deepfake',
        partOfSpeech: 'noun [countable/uncountable]',
        meaningEn: 'Synthetic media in which a person’s likeness or voice is artificially manipulated using machine learning.',
        meaningAr: 'التزييف العميق باستخدام الذكاء الاصطناعي',
        collocation: 'deepfake video / detect deepfakes',
        synonym: 'synthetic manipulation / AI forgery',
        antonym: 'authentic recording',
        exampleSentence: 'Modern detection software analyzes eye blink rates to identify sophisticated deepfake impersonations.'
      }
    ],
    collocations: [
      {
        phrase: 'take with a grain of salt',
        meaningAr: 'يتعامل بتشكك وحذر مع الخبر',
        example: 'One should take viral social media posts with a grain of salt until verified by official spokespersons.'
      },
      {
        phrase: 'cross-check information',
        meaningAr: 'يطابق المعلومات بين مصادر متعددة',
        example: 'Researchers cross-check information against historical archives to eliminate historical inaccuracies.'
      },
      {
        phrase: 'fall victim to',
        meaningAr: 'يقع ضحية لـ',
        example: 'Unsuspecting shoppers frequently fall victim to counterfeit e-commerce portals during holiday sales.'
      },
      {
        phrase: 'fact-checking platform',
        meaningAr: 'منصة لتدقيق الحقائق والادعاءات',
        example: 'Independent fact-checking platforms debunk rumors before they trigger unwarranted public panic.'
      }
    ],
    idiomsAndExpressions: [
      {
        idiom: 'smoke and mirrors',
        meaningEn: 'Something intended to confuse or deceive people and conceal reality.',
        meaningAr: 'خدع بصرية وتضليل لإخفاء الحقيقة',
        example: 'The fraudulent investment company used smoke and mirrors to disguise their bankrupt balance sheet.'
      },
      {
        idiom: 'straight from the horse’s mouth',
        meaningEn: 'From the original, highest, or most reliable source directly.',
        meaningAr: 'من المصدر الأصلي المباشر',
        example: 'I know the exam schedule was updated because I heard it straight from the horse’s mouth at the ministry.'
      }
    ],
    exercises: [
      {
        id: 'sec1_u3_v1',
        skill: 'Vocabulary',
        question: 'A fraudulent scheme engineered to steal banking passwords via fake electronic mail is called a phishing __________.',
        options: ['scam', 'monument', 'heritage', 'generosity'],
        correctAnswer: 'A',
        explanation: 'From Unit 3 Key Vocab: "scam" (احتيال / نصب) refers to fraudulent deceptive operations.'
      },
      {
        id: 'sec1_u3_v2',
        skill: 'Vocabulary',
        question: 'Before forwarding breaking news across group chats, users have an ethical duty to __________ its factual accuracy.',
        options: ['exploit', 'verify', 'ignore', 'imitate'],
        correctAnswer: 'B',
        explanation: '"Verify" (يتحقق) means to confirm authenticity and accuracy before spreading information.'
      },
      {
        id: 'sec1_u3_v3',
        skill: 'Vocabulary',
        question: 'Peer-reviewed scientific journals are universally recognized as __________ sources of academic data.',
        options: ['suspicious', 'credible', 'fictitious', 'hazardous'],
        correctAnswer: 'B',
        explanation: '"Credible" (موثوق / ذو مصداقية) denotes trustworthy and rigorously backed by evidence.'
      },
      {
        id: 'sec1_u3_v4',
        skill: 'Vocabulary',
        question: 'Malicious actors create manipulated video clips known as __________ to damage public reputations.',
        options: ['monuments', 'deepfakes', 'donations', 'preservations'],
        correctAnswer: 'B',
        explanation: 'A "deepfake" is an AI-generated synthetic video or audio mimicking real people.'
      }
    ]
  },
  grammarModule: {
    ruleName: 'Conditionals (Zero, First, Second & Third) + Inversions (Were/Had/Should)',
    ruleNameAr: 'الجمل الشرطية (الصفرية، الأولى، الثانية، والثالثة) وصيغ تقديم الفعل على الفاعل (Inversion)',
    explanationSummary: 'Zero Conditional states scientific facts. First Conditional expresses realistic future outcomes. Second Conditional discusses hypothetical present/future. Third Conditional expresses past regrets. Inversions replace "if" with Were, Had, or Should.',
    detailedRules: [
      {
        title: 'Zero & First Conditionals: Reality & Future Probability',
        explanation: 'Zero: If + Present Simple, Present Simple (Scientific facts). First: If + Present Simple, will + base verb (Realistic future predictions or warnings).',
        examples: [
          'If you click on an unverified link, spyware installs on your device.',
          'If we verify digital sources thoroughly, we will stop the viral spread of rumors.'
        ]
      },
      {
        title: 'Second & Third Conditionals: Hypothetical Scenarios & Past Regrets',
        explanation: 'Second: If + Past Simple, would + base verb (Imaginary present). Third: If + Past Perfect, would have + P.P. (Unreal past outcomes / regrets).',
        examples: [
          'If people were more media-literate, they would not fall for online scams so easily.',
          'If the company had updated its firewall, hackers would not have compromised their database.'
        ]
      },
      {
        title: 'Conditional Inversion: Omitting "If"',
        explanation: 'Should + Subject + Base verb (replaces First Conditional). Were + Subject + to + Base verb (replaces Second Conditional). Had + Subject + P.P. (replaces Third Conditional).',
        examples: [
          'Should you receive any suspicious email, notify your school IT department immediately.',
          'Were digital literacy to become universal, misinformation would decline rapidly.',
          'Had they installed two-factor authentication, their account would not have been breached.'
        ]
      }
    ],
    exercises: [
      {
        id: 'sec1_u3_g1',
        skill: 'Grammar',
        question: 'If water __________ 100 degrees Celsius at sea level, it boils and transforms into steam.',
        options: ['reaches', 'will reach', 'reached', 'would reach'],
        correctAnswer: 'A',
        explanation: 'Zero conditional for universal scientific physical laws: If + Present Simple, Present Simple.'
      },
      {
        id: 'sec1_u3_g2',
        skill: 'Grammar',
        question: 'If I __________ a suspicious payment alert on my smartphone, I would freeze my bank card immediately.',
        options: ['receive', 'received', 'had received', 'will receive'],
        correctAnswer: 'B',
        explanation: 'Second conditional for hypothetical present situations: If + Past Simple, would + base verb.'
      },
      {
        id: 'sec1_u3_g3',
        skill: 'Grammar',
        question: '__________ you require any technical assistance with password encryption, please contact support.',
        options: ['Were', 'Had', 'Should', 'Unless'],
        correctAnswer: 'C',
        explanation: 'Inverted first conditional: Should + subject + base verb (Should you require = If you require).'
      },
      {
        id: 'sec1_u3_g4',
        skill: 'Grammar',
        question: 'Had the journalist cross-checked the anonymous tip, she __________ the erroneous report yesterday.',
        options: ['would not publish', 'will not publish', 'would not have published', 'had not published'],
        correctAnswer: 'C',
        explanation: 'Inverted third conditional: Had + subject + P.P. ... would have + P.P.'
      }
    ]
  },
  readingModule: {
    passageTitle: 'The Architecture of Deception: Navigating the Infodemic',
    passage: `In the twenty-first century, information is produced, disseminated, and consumed at velocities that exceed human cognitive processing capabilities. While digital networks have democratized knowledge, they have simultaneously birthed what the World Health Organization designates an "infodemic"—an overabundance of information, both accurate and fabricated, that complicates the identification of credible truth.

Misinformation does not spread primarily because citizens lack intellect; rather, it exploits evolutionary human psychology. Behavioral economists demonstrate that sensational, anger-inducing, or fear-provoking content triggers higher engagement algorithms. Furthermore, the advent of generative artificial intelligence and hyper-realistic deepfake technology means that visual evidence—long considered the gold standard of objective truth—can no longer be accepted without rigorous verification.

Combating algorithmic deception necessitates what educators term "lateral reading". When encountering startling claims, savvy internet users do not read downwards through the dubious webpage; instead, they immediately open separate browser tabs to investigate who is behind the site, what motives drive the author, and what independent consensus exists among authoritative institutions. By cultivating digital skepticism as a routine reflex, society protects the integrity of democratic discourse.`,
    criticalThinkingFocus: 'Evaluating cognitive biases, emotional manipulation in viral algorithms, and lateral reading strategies.',
    questions: [
      {
        id: 'sec1_u3_r1',
        skill: 'Reading',
        question: 'What psychological factor explains why misinformation spreads faster than truth on social media?',
        options: [
          'Algorithms are programmed to prioritize content that evokes strong emotions such as anger or fear.',
          'People prefer reading long academic essays rather than short posts.',
          'Fabricated stories are always accompanied by notarized legal certificates.',
          'Internet browsers automatically delete scientific data.'
        ],
        correctAnswer: 'A',
        explanation: 'Paragraph 2 explains that sensational, anger-inducing, and fear-provoking posts trigger engagement algorithms.'
      },
      {
        id: 'sec1_u3_r2',
        skill: 'Reading',
        question: 'Why has visual evidence ceased to be an undeniable guarantee of truth in contemporary media?',
        options: [
          'Because cameras have become too expensive for ordinary journalists',
          'Because generative artificial intelligence can produce hyper-realistic deepfakes and manipulated images',
          'Because all digital photographs are black and white',
          'Because television stations have been shut down worldwide'
        ],
        correctAnswer: 'B',
        explanation: 'Generative AI and deepfakes allow visual and audio evidence to be synthesized convincingly.'
      },
      {
        id: 'sec1_u3_r3',
        skill: 'Reading',
        question: 'What does the technique of "lateral reading" involve according to the passage?',
        options: [
          'Reading a webpage upside down to check for spelling errors',
          'Opening multiple browser tabs to research the author, funding motives, and outside consensus',
          'Believing everything printed on a website if the design looks modern',
          'Skipping all sentences that contain punctuation marks'
        ],
        correctAnswer: 'B',
        explanation: 'Paragraph 3 defines lateral reading as opening tabs to verify the source, motives, and consensus.'
      },
      {
        id: 'sec1_u3_r4',
        skill: 'Reading',
        question: 'The author’s overarching message in the conclusion is that __________.',
        options: [
          'citizens should stop using computers entirely',
          'digital skepticism and fact-checking reflexes are essential to protect societal truth',
          'all news published before the internet was completely accurate',
          'social media platforms should only allow politicians to post'
        ],
        correctAnswer: 'B',
        explanation: 'The conclusion advocates cultivating digital skepticism as a routine reflex to protect democratic discourse.'
      }
    ]
  },
  listeningModule: {
    audioTitle: 'The Old Man and the Sea: Chapter 3 — The Big Fish Bites',
    speakerRoles: 'Literature Teacher (Mr. Tarek) & Student (Salma)',
    transcript: `Teacher: Good afternoon, Salma. Today we venture far onto the open sea in Chapter 3 of The Old Man and the Sea: "The Big Fish Bites".
Salma: Sir, how far out does Santiago go on the eighty-fifth morning?
Teacher: Farther than any other fisherman in the village. Long before sunrise, he rows past the scent of the land and out into the deep ocean canyon where the Gulf Stream flows. He drops his baited lines at exact depths—forty fathoms, seventy-five, one hundred, and one hundred and twenty-five fathoms. Unlike careless fishermen who let their lines drift haphazardly, Santiago keeps his lines straighter than anyone. He reflects: "It is better to be lucky. But I would rather be exact. Then when luck comes you are ready."
Salma: And what happens around noon?
Teacher: At noon, the green stick holding the line at one hundred fathoms dips sharply. A colossal creature has taken the sardine bait. Santiago feels a gentle, delicate pull six hundred feet below. He waits patiently, knowing that a giant marlin must turn and swallow the bait whole. When the fish takes the hook, Santiago strikes with all his might, setting the hook deep into its flesh!
Salma: Does Santiago haul the fish aboard immediately?
Teacher: Far from it! The marlin is so immense that instead of the old man pulling the fish, the fish begins pulling the boat! The fish heads steadily north-west, towing Santiago’s skiff across the boundless ocean. The old man braces the heavy cord against his back, his hands aching, facing a monumental test of endurance alone under the blazing sun.`,
    durationApprox: '2 mins 30 secs',
    exercises: [
      {
        id: 'sec1_u3_l1',
        skill: 'Listening',
        question: 'What core philosophy regarding luck and skill does Santiago express in Chapter 3?',
        options: [
          'It is useless to fish without expensive modern equipment.',
          'It is better to be lucky, but he would rather be exact so he is ready when luck comes.',
          'Luck is predetermined and human effort has no impact on success.',
          'Fishermen should never venture deeper than ten meters.'
        ],
        correctAnswer: 'B',
        explanation: '"It is better to be lucky. But I would rather be exact. Then when luck comes you are ready."'
      },
      {
        id: 'sec1_u3_l2',
        skill: 'Listening',
        question: 'At what depth was the line set that the giant marlin took at noon?',
        options: ['Ten fathoms', 'One hundred fathoms', 'Five hundred fathoms', 'Two fathoms'],
        correctAnswer: 'B',
        explanation: 'The green stick dipped at one hundred fathoms (600 feet) deep.'
      },
      {
        id: 'sec1_u3_l3',
        skill: 'Listening',
        question: 'What surprising event occurs immediately after Santiago sets the hook into the fish?',
        options: [
          'The line snaps instantly and the fish escapes',
          'The fish surrenders and floats to the surface',
          'The fish begins towing the skiff steadily across the sea',
          'A rescue boat arrives to assist Santiago'
        ],
        correctAnswer: 'C',
        explanation: 'The fish is so immense that it tows the skiff steadily toward the north-west.'
      },
      {
        id: 'sec1_u3_l4',
        skill: 'Listening',
        question: 'How does Santiago bear the intense physical strain of the taut fishing line?',
        options: [
          'He ties the line firmly to his wooden thwart',
          'He braces the line across his back with his own muscles to avoid snapping the cord',
          'He uses an electric winch machine',
          'He drops the line into the water and falls asleep'
        ],
        correctAnswer: 'B',
        explanation: 'He cushions the line across his back and shoulders, using his body as a shock absorber.'
      }
    ]
  },
  unitExam: {
    examId: 'sec1_u3_exam',
    examTitle: 'Secondary 1 - Unit 3 Comprehensive Assessment: Truth Vs. Lies',
    examTitleAr: 'امتحان الوحدة الثالثة الشامل: الحقيقة في مواجهة الأكاذيب (مواصفات 2026/2027)',
    durationMinutes: 30,
    totalMarks: 32,
    questions: [
      {
        id: 'sec1_u3_ex_q1',
        skill: 'Vocabulary',
        question: 'A malicious scheme to trick people into divulging private debit card codes is known as a cyber __________.',
        options: ['scam', 'monument', 'tribute', 'volunteer'],
        correctAnswer: 'A',
        explanation: 'A "scam" (احتيال) is a deceptive fraudulent plot to exploit victims.'
      },
      {
        id: 'sec1_u3_ex_q2',
        skill: 'Vocabulary',
        question: 'Academic researchers must corroborate data from __________ sources before drawing scientific conclusions.',
        options: ['suspicious', 'credible', 'fictitious', 'unreliable'],
        correctAnswer: 'B',
        explanation: '"Credible" means trustworthy and authoritative.'
      },
      {
        id: 'sec1_u3_ex_q3',
        skill: 'Grammar',
        question: 'If you heat ice blocks to room temperature, they __________ into liquid water.',
        options: ['melt', 'will melt', 'melted', 'would melt'],
        correctAnswer: 'A',
        explanation: 'Zero conditional for invariable scientific truths: If + Present Simple, Present Simple.'
      },
      {
        id: 'sec1_u3_ex_q4',
        skill: 'Grammar',
        question: 'Had Youssef checked the train timetable last night, he __________ the morning departure.',
        options: ['will not miss', 'would not have missed', 'would not miss', 'had not missed'],
        correctAnswer: 'B',
        explanation: 'Inverted third conditional: Had + subject + P.P., would have + P.P.'
      },
      {
        id: 'sec1_u3_ex_q5',
        skill: 'Reading',
        question: 'The reading technique called "lateral reading" primarily involves __________.',
        options: [
          'opening tabs to cross-check the author’s credentials, motives, and outside consensus',
          'reading only the final paragraph of every digital article',
          'memorizing all advertisements displayed on a webpage',
          'closing all web browsers during business hours'
        ],
        correctAnswer: 'A',
        explanation: 'Lateral reading investigates sources and claims via outside tabs.'
      },
      {
        id: 'sec1_u3_ex_q6',
        skill: 'Listening',
        question: 'In Chapter 3 of The Old Man and the Sea, why does Santiago insist on keeping his fishing lines straighter than anyone else?',
        options: [
          'Because he wants his boat to look symmetrical in photographs',
          'So that when luck comes, he is exact, precise, and completely ready',
          'Because the village mayor ordered all fishermen to keep lines straight',
          'To prevent flying fish from landing inside the boat'
        ],
        correctAnswer: 'B',
        explanation: 'Santiago values exactness over vague luck, ensuring readiness when opportunity arrives.'
      }
    ]
  }
};

// ============================================================================
// UNIT 4: Save and Shine (حافظ على البيئة وتألق)
// ============================================================================
export const sec1Unit4: UnitCurriculum = {
  stage: 'Secondary',
  grade: 10,
  gradeLabel: 'Secondary 1 - الصف الأول الثانوي',
  track: 'General Secondary',
  secondaryPath: 'general_secondary',
  semester: 1,
  unitNumber: 4,
  unitTitle: 'Save and Shine',
  unitTitleAr: 'حافظ على البيئة وتألق: الاقتصاد الأخضر وترشيد الموارد',
  theme: 'Sustainability, Green Manufacturing, Renewable Energy & Climate Action',
  vocabularyModule: {
    keyWords: [
      {
        word: 'renewable',
        partOfSpeech: 'adjective',
        meaningEn: 'Capable of being replenished naturally within a human timescale, such as solar or wind power.',
        meaningAr: 'متجدد ومستدام طبيعياً',
        collocation: 'renewable energy / renewable resources',
        synonym: 'sustainable / inexhaustible / green',
        antonym: 'fossil / non-renewable / exhaustible',
        exampleSentence: 'Egypt’s Benban Solar Park in Aswan is one of the world’s most expansive renewable energy complexes.'
      },
      {
        word: 'sustainability',
        partOfSpeech: 'noun [uncountable]',
        meaningEn: 'The ability to meet contemporary human needs without depleting natural resources for future generations.',
        meaningAr: 'الاستدامة البيئية والتنموية',
        collocation: 'environmental sustainability / corporate sustainability',
        synonym: 'ecological balance / conservation',
        antonym: 'depletion / environmental destruction',
        exampleSentence: 'Modern architecture emphasizes sustainability by maximizing natural ventilation and thermal insulation.'
      },
      {
        word: 'emissions',
        partOfSpeech: 'noun [plural]',
        meaningEn: 'Pollutants or greenhouse gases released into the atmosphere by industrial plants or combustion vehicles.',
        meaningAr: 'الانبعاثات الغازية والعوادم',
        collocation: 'carbon emissions / zero emissions',
        synonym: 'discharges / pollutants / fumes',
        antonym: 'clean intake',
        exampleSentence: 'Converting public transit fleets to clean electric power drastically slashes greenhouse gas emissions in Cairo.'
      },
      {
        word: 'biodiversity',
        partOfSpeech: 'noun [uncountable]',
        meaningEn: 'The variety of plant and animal life in a particular habitat or across the entire planet.',
        meaningAr: 'التنوع البيولوجي والحيوي',
        collocation: 'preserve biodiversity / loss of biodiversity',
        synonym: 'ecological richness / wildlife variety',
        antonym: 'biological uniformity / monoculture',
        exampleSentence: 'Protecting the coral biomes of the Red Sea preserves an irreplaceable reservoir of marine biodiversity.'
      },
      {
        word: 'recycle',
        partOfSpeech: 'verb [transitive]',
        meaningEn: 'To convert waste materials into reusable objects to prevent waste of potentially useful resources.',
        meaningAr: 'يعيد تدوير المخلفات',
        collocation: 'recycle plastics / recycling facility',
        synonym: 'reprocess / reclaim / recondition',
        antonym: 'discard / dispose / incinerate',
        exampleSentence: 'Innovative Egyptian startups recycle discarded agricultural rice straw into eco-friendly construction boards.'
      },
      {
        word: 'conservation',
        partOfSpeech: 'noun [uncountable]',
        meaningEn: 'The prevention of the wasteful use of a resource or the planned management of natural environments.',
        meaningAr: 'صون وترشيد استهلاك الموارد',
        collocation: 'energy conservation / water conservation',
        synonym: 'preservation / prudent management',
        antonym: 'squandering / wastefulness / exploitation',
        exampleSentence: 'Drip irrigation systems are indispensable tools for national water conservation in arid regions.'
      }
    ],
    collocations: [
      {
        phrase: 'carbon footprint',
        meaningAr: 'البصمة الكربونية للفرد أو المنشأة',
        example: 'Commuters who cycle or utilize electric subways significantly reduce their personal carbon footprint.'
      },
      {
        phrase: 'combat climate change',
        meaningAr: 'يكافح التغير المناخي والاحتباس الحراري',
        example: 'Egypt hosted COP27 to forge actionable multilateral partnerships to combat climate change.'
      },
      {
        phrase: 'phase out',
        meaningAr: 'يستغني تدريجياً عن',
        example: 'Many coastal protectorates have decided to phase out single-use non-biodegradable plastic packaging.'
      },
      {
        phrase: 'eco-friendly alternative',
        meaningAr: 'بديل صديق للبيئة',
        example: 'Biodegradable paper straws offer a practical, eco-friendly alternative to disposable plastic utensils.'
      }
    ],
    idiomsAndExpressions: [
      {
        idiom: 'tip of the iceberg',
        meaningEn: 'Only a small visible fraction of a much larger, concealed problem.',
        meaningAr: 'قمة جبل الجليد (جزء يسير من مشكلة أكبر)',
        example: 'The visible surface plastic in the ocean is merely the tip of the iceberg of micro-plastic sedimentation.'
      },
      {
        idiom: 'leave no trace',
        meaningEn: 'Leave a natural place completely undisturbed and spotless after visiting.',
        meaningAr: 'لا تترك أثراً سلبياً في البيئة الطبيعية',
        example: 'Eco-hikers in the Sinai Protectorate follow the cardinal rule: take only pictures, leave no trace.'
      }
    ],
    exercises: [
      {
        id: 'sec1_u4_v1',
        skill: 'Vocabulary',
        question: 'Solar, wind, and geothermal power are premier examples of clean __________ energy resources.',
        options: ['depleted', 'renewable', 'hazardous', 'artificial'],
        correctAnswer: 'B',
        explanation: 'From Unit 4 Key Vocab: "renewable" (متجدد) energy can be naturally replenished.'
      },
      {
        id: 'sec1_u4_v2',
        skill: 'Vocabulary',
        question: 'Transitioning from coal-fired power plants to green hydrogen helps curtail toxic industrial __________.',
        options: ['emissions', 'monuments', 'identities', 'donations'],
        correctAnswer: 'A',
        explanation: '"Emissions" (انبعاثات) are gases released into the atmosphere.'
      },
      {
        id: 'sec1_u4_v3',
        skill: 'Vocabulary',
        question: 'Agricultural scientists recommend drip irrigation as an effective method for water __________ in arid zones.',
        options: ['conservation', 'destruction', 'evaporation', 'pollution'],
        correctAnswer: 'A',
        explanation: '"Conservation" (ترشيد وصون) denotes the careful management of finite resources.'
      },
      {
        id: 'sec1_u4_v4',
        skill: 'Vocabulary',
        question: 'Eco-tourism advocates encourage travelers to minimize their personal carbon __________ by utilizing public transport.',
        options: ['monument', 'footprint', 'scam', 'paramedic'],
        correctAnswer: 'B',
        explanation: 'The standard environmental collocation is "carbon footprint" (البصمة الكربونية).'
      }
    ]
  },
  grammarModule: {
    ruleName: 'Verbs Followed by Infinitives vs. Gerunds (to + inf / -ing / meaning shifts)',
    ruleNameAr: 'الأفعال المتبوعة بالمصدر أو صيغة Gerund والفروق المعنوية',
    explanationSummary: 'Some verbs take to + infinitive (decide, plan, hope, agree, refuse). Some take -ing (enjoy, avoid, suggest, consider, practice). Some change meaning (remember, forget, stop, regret, try).',
    detailedRules: [
      {
        title: 'Verbs Followed Strictly by to + Infinitive',
        explanation: 'Verbs expressing intention, decision, or future orientation: decide, plan, hope, promise, arrange, manage, afford, offer, threaten.',
        examples: [
          'The ministry decided to construct three new solar power stations in Upper Egypt.',
          'Citizens managed to reduce their domestic electricity consumption.'
        ]
      },
      {
        title: 'Verbs Followed Strictly by Gerund (-ing)',
        explanation: 'Verbs expressing attitudes, ongoing routines, or avoidance: enjoy, admit, deny, avoid, suggest, recommend, keep, finish, fancy, risk.',
        examples: [
          'We should avoid using single-use plastic bags in our daily shopping.',
          'Environmental experts suggested installing rooftop solar thermal panels.'
        ]
      },
      {
        title: 'Verbs with Meaning Changes (Stop, Remember, Forget, Regret, Try)',
        explanation: 'Stop to do (pause to do something else) vs Stop doing (quit an action permanently). Remember to do (obligation before action) vs Remember doing (memory of past action). Regret to say (bad news) vs Regret doing (remorse for past).',
        examples: [
          'On their desert trek, the scientists stopped to drink fresh well water.',
          'The factory stopped polluting the canal after strict ministerial penalties.',
          'I remember turning off the classroom air conditioner before leaving.'
        ]
      }
    ],
    exercises: [
      {
        id: 'sec1_u4_g1',
        skill: 'Grammar',
        question: 'The environmental engineering company promised __________ the new wastewater recycling plant by next June.',
        options: ['completing', 'to complete', 'complete', 'completed'],
        correctAnswer: 'B',
        explanation: '"Promise" takes to + infinitive (promised to complete).'
      },
      {
        id: 'sec1_u4_g2',
        skill: 'Grammar',
        question: 'To protect marine wildlife, coastal towns should avoid __________ plastic bottles into the sea.',
        options: ['dumping', 'to dump', 'dump', 'dumped'],
        correctAnswer: 'A',
        explanation: '"Avoid" is followed by a gerund (avoid dumping).'
      },
      {
        id: 'sec1_u4_g3',
        skill: 'Grammar',
        question: 'He was driving for four continuous hours, so he stopped at the highway rest house __________ a cup of tea.',
        options: ['having', 'to have', 'have', 'had'],
        correctAnswer: 'B',
        explanation: '"Stop to do" indicates pausing one activity in order to perform another (to have a cup of tea).'
      },
      {
        id: 'sec1_u4_g4',
        skill: 'Grammar',
        question: 'I vividly remember __________ the majestic sunrise over Mount Sinai during my school excursion three years ago.',
        options: ['watching', 'to watch', 'watch', 'watched'],
        correctAnswer: 'A',
        explanation: '"Remember + -ing" refers to recollecting a vivid past memory.'
      }
    ]
  },
  readingModule: {
    passageTitle: 'Benban: Egypt’s Solar Capital Illuminating the Future',
    passage: `Deep in the western desert expanse of the Aswan Governorate lies Benban, a futuristic solar park that exemplifies Egypt’s decisive pivot toward green sustainability. Encompassing thirty-seven square kilometers and housing over six million photovoltaic panels, Benban generates nearly one thousand five hundred megawatts of clean, zero-emission electricity. It is visible from space and stands as one of the largest solar installations on planet Earth.

The location of Benban was chosen with scientific precision. Aswan enjoys an exceptional solar irradiance index, receiving intense, unclouded sunlight virtually three hundred and sixty days a year. By capitalizing on this infinite celestial resource, the complex eliminates over two million tons of greenhouse gas emissions annually that would otherwise have been generated by burning fossil natural gas or heavy crude oil.

Beyond its impressive kilowatt yields, Benban represents an economic lifeline for Upper Egypt. Over twenty thousand local young engineers and technicians acquired advanced vocational certifications during its construction and operation. Furthermore, solar developers allocate a fixed percentage of annual corporate revenue to fund community healthcare centers, upgrade clean drinking water filtration systems, and train women in cooperative crafts. Benban demonstrates that ecological stewardship and regional economic prosperity can advance in perfect synchrony.`,
    criticalThinkingFocus: 'Evaluating solar megaprojects as catalysts for clean energy independence and localized socio-economic uplift.',
    questions: [
      {
        id: 'sec1_u4_r1',
        skill: 'Reading',
        question: 'What geographic and climatic factor made Aswan the ideal location for the Benban Solar Park?',
        options: [
          'Frequent heavy rainstorms that cool down solar panels',
          'Intense, unclouded solar irradiance almost three hundred and sixty days per year',
          'Proximity to deep underground coal mines',
          'Freezing sub-zero temperatures throughout winter'
        ],
        correctAnswer: 'B',
        explanation: 'Paragraph 2 highlights Aswan’s exceptional solar irradiance and nearly 360 days of clear sunlight.'
      },
      {
        id: 'sec1_u4_r2',
        skill: 'Reading',
        question: 'How does Benban contribute to global climate mitigation goals?',
        options: [
          'By eliminating over two million tons of greenhouse gas emissions every year',
          'By increasing the burning of imported coal',
          'By exporting drinking water to foreign countries',
          'By banning solar power from small residential homes'
        ],
        correctAnswer: 'A',
        explanation: 'Paragraph 2 states that it eliminates over two million tons of greenhouse gas emissions annually.'
      },
      {
        id: 'sec1_u4_r3',
        skill: 'Reading',
        question: 'How has the Benban project catalyzed socio-economic development in Upper Egypt?',
        options: [
          'By forcing residents to relocate to northern coastal cities',
          'By creating over twenty thousand technical jobs and funding local clinics and water plants',
          'By replacing all agricultural farming with tourism resorts',
          'By shutting down local schools and technical colleges'
        ],
        correctAnswer: 'B',
        explanation: 'Paragraph 3 notes twenty thousand jobs, local health clinics, and upgraded water filtration plants.'
      },
      {
        id: 'sec1_u4_r4',
        skill: 'Reading',
        question: 'The author’s conclusion suggests that green energy projects __________.',
        options: [
          'can achieve both environmental conservation and local economic growth together',
          'are too expensive for developing nations to maintain',
          'will be completely replaced by diesel engines within five years',
          'have no positive impact on rural communities'
        ],
        correctAnswer: 'A',
        explanation: 'The conclusion states that ecological stewardship and economic prosperity can advance in perfect synchrony.'
      }
    ]
  },
  listeningModule: {
    audioTitle: 'The Old Man and the Sea: Chapter 4 — A Battle of Strength and Will',
    speakerRoles: 'Literature Teacher (Mr. Tarek) & Student (Kareem)',
    transcript: `Teacher: Good day, Kareem. In Chapter 4 of The Old Man and the Sea, night falls upon the ocean, and the epic battle of strength and will between Santiago and the giant marlin intensifies.
Kareem: Sir, how does Santiago endure the cold and the pain during the night?
Teacher: Through immense self-discipline and empathy. As the fish continues towing the skiff into the pitch-black ocean, the line cuts deeply into Santiago’s right hand. Later, his left hand cramps painfully into a tight claw. Yet Santiago feels no hatred toward his adversary. He talks to the fish in the darkness, saying: "I love you and respect you very much. But I will kill you dead before this day ends."
Kareem: What causes Santiago to feel such affection for the fish he must kill?
Teacher: Santiago views the marlin as a noble brother, worthy of admiration. Unlike human beings, the fish acts with purity, courage, and dignity. While suffering from hunger and cramp, a small tired warbler bird lands on his taut fishing line. Santiago speaks gently to the bird, telling it to rest before its long flight to the coast.
Kareem: And what sudden movement does the fish make at dawn?
Teacher: At dawn, the fish surges upward violently! The line slips through Santiago’s bleeding fingers, burning his flesh. Suddenly, the marlin leaps into the golden morning sunlight! Hemingway describes it: it was bright in the sun, its head and back were dark purple, and its long sword was as sharp as a baseball bat. It was two feet longer than Santiago’s entire skiff! Seeing its majestic size, the old man steels his resolve: he will prove what a man can do and what a man can endure.`,
    durationApprox: '2 mins 30 secs',
    exercises: [
      {
        id: 'sec1_u4_l1',
        skill: 'Listening',
        question: 'What physical ailments afflict Santiago during the second night at sea?',
        options: [
          'A broken wooden oar and a fractured ankle',
          'A painful cut on his right hand and a severe cramp in his left hand',
          'Complete loss of vision and hearing',
          'Severe sea-sickness that leaves him unconscious'
        ],
        correctAnswer: 'B',
        explanation: 'His right hand is cut by the rushing line, and his left hand cramps into a rigid claw.'
      },
      {
        id: 'sec1_u4_l2',
        skill: 'Listening',
        question: 'How does Santiago view his relationship with the giant marlin pulling his boat?',
        options: [
          'He despises the fish and wishes to torture it',
          'He regards the marlin as a noble, courageous brother whom he loves and respects',
          'He thinks of the fish solely as a bundle of meat to sell for cash',
          'He mistakes the fish for a mythological sea demon'
        ],
        correctAnswer: 'B',
        explanation: 'He respects the marlin as a noble brother of the deep, acting with courage and majesty.'
      },
      {
        id: 'sec1_u4_l3',
        skill: 'Listening',
        question: 'What guest lands briefly on Santiago’s taut line during the exhausting night?',
        options: ['A predatory seagull', 'A small, exhausted warbler bird', 'A poisonous jellyfish', 'A baby shark'],
        correctAnswer: 'B',
        explanation: 'A tired warbler bird rests on the line, and Santiago speaks to it kindly.'
      },
      {
        id: 'sec1_u4_l4',
        skill: 'Listening',
        question: 'How large is the marlin when it finally leaps into the morning sunlight at dawn?',
        options: [
          'It is two feet longer than the old man’s entire wooden skiff',
          'It is no larger than a common domestic sardine',
          'It is exactly the size of Santiago’s fishing oar',
          'It is as small as a baby turtle'
        ],
        correctAnswer: 'A',
        explanation: 'Hemingway notes the marlin was two feet longer than the old man’s sixteen-foot skiff.'
      }
    ]
  },
  unitExam: {
    examId: 'sec1_u4_exam',
    examTitle: 'Secondary 1 - Unit 4 Comprehensive Assessment: Save and Shine',
    examTitleAr: 'امتحان الوحدة الرابعة الشامل: حافظ على البيئة وتألق (مواصفات 2026/2027)',
    durationMinutes: 30,
    totalMarks: 32,
    questions: [
      {
        id: 'sec1_u4_ex_q1',
        skill: 'Vocabulary',
        question: 'The Benban Solar Park is designed to harness clean __________ resources to generate electricity.',
        options: ['depleted', 'renewable', 'hazardous', 'artificial'],
        correctAnswer: 'B',
        explanation: 'Solar power is a prime example of clean, renewable energy.'
      },
      {
        id: 'sec1_u4_ex_q2',
        skill: 'Vocabulary',
        question: 'Electric vehicles produce zero direct exhaust __________, drastically improving city air quality.',
        options: ['emissions', 'monuments', 'identities', 'donations'],
        correctAnswer: 'A',
        explanation: '"Emissions" are tailpipe exhaust gases released into the atmosphere.'
      },
      {
        id: 'sec1_u4_ex_q3',
        skill: 'Grammar',
        question: 'The governorate decided __________ new bicycle lanes along the coastal corniche to curb pollution.',
        options: ['construct', 'constructing', 'to construct', 'constructed'],
        correctAnswer: 'C',
        explanation: '"Decide" takes to + infinitive (decided to construct).'
      },
      {
        id: 'sec1_u4_ex_q4',
        skill: 'Grammar',
        question: 'Consumers should avoid __________ single-use plastic cups at school cafeterias.',
        options: ['using', 'to use', 'use', 'used'],
        correctAnswer: 'A',
        explanation: '"Avoid" is followed by a gerund (-ing).'
      },
      {
        id: 'sec1_u4_ex_q5',
        skill: 'Reading',
        question: 'Benban Solar Park was established in Aswan primarily because __________.',
        options: [
          'it has the highest unclouded solar irradiance in Egypt almost 360 days a year',
          'it is surrounded by deep underground petroleum reservoirs',
          'it rains continuously throughout summer and winter',
          'it is the most densely populated city in Egypt'
        ],
        correctAnswer: 'A',
        explanation: 'Aswan boasts optimal clear sunlight and high solar irradiance index.'
      },
      {
        id: 'sec1_u4_ex_q6',
        skill: 'Listening',
        question: 'In Chapter 4 of The Old Man and the Sea, Hemingway’s famous statement regarding Santiago’s resolve is that __________.',
        options: [
          'a man should always surrender whenever pain becomes severe',
          'a man will prove what a man can do and what a man can endure',
          'fishing is an unworthy pursuit for elderly people',
          'the sea is an evil entity that must be destroyed'
        ],
        correctAnswer: 'B',
        explanation: 'Santiago demonstrates "what a man can do and what a man can endure."'
      }
    ]
  }
};

// ============================================================================
// UNIT 5: Using Technology at Schools (تكنولوجيا التعليم واللغات)
// ============================================================================
export const sec1Unit5: UnitCurriculum = {
  stage: 'Secondary',
  grade: 10,
  gradeLabel: 'Secondary 1 - الصف الأول الثانوي',
  track: 'General Secondary',
  secondaryPath: 'general_secondary',
  semester: 1,
  unitNumber: 5,
  unitTitle: 'Using Technology at Schools',
  unitTitleAr: 'تكنولوجيا التعليم واللغات الأجنبية والتواصل الحضاري',
  theme: 'Multilingualism, Digital Learning Platforms, Language Apps & Cross-Cultural Tolerance',
  vocabularyModule: {
    keyWords: [
      {
        word: 'fluency',
        partOfSpeech: 'noun [uncountable]',
        meaningEn: 'The ability to speak or write a foreign language easily, smoothly, and accurately.',
        meaningAr: 'الطلاقة والفصاحة اللغوية',
        collocation: 'achieve fluency / native-like fluency',
        synonym: 'articulacy / eloquence / proficiency',
        antonym: 'hesitation / inarticulacy / stumbling',
        exampleSentence: 'Daily conversational practice with digital foreign language apps accelerates speaking fluency.'
      },
      {
        word: 'multilingual',
        partOfSpeech: 'adjective',
        meaningEn: 'In or using several different languages; able to speak many languages proficiently.',
        meaningAr: 'متعدد اللغات والثقافات',
        collocation: 'multilingual society / multilingual speaker',
        synonym: 'polyglot / bilingual',
        antonym: 'monolingual',
        exampleSentence: 'Growing up in Alexandria, Tarek became multilingual, speaking Arabic, English, and French with equal ease.'
      },
      {
        word: 'platform',
        partOfSpeech: 'noun [countable]',
        meaningEn: 'A declared digital environment, website, or software enabling online education, collaboration, or services.',
        meaningAr: 'منصة رقمية تعليمية',
        collocation: 'e-learning platform / digital platform',
        synonym: 'digital portal / virtual hub',
        antonym: 'offline classroom',
        exampleSentence: 'The Egyptian Knowledge Bank (EKB) is a state-of-the-art educational platform offering free academic resources.'
      },
      {
        word: 'interactive',
        partOfSpeech: 'adjective',
        meaningEn: 'Allowing a two-way flow of information between a computer and a human user.',
        meaningAr: 'تفاعلي ويتيح المشاركة المباشرة',
        collocation: 'interactive whiteboard / interactive simulation',
        synonym: 'participatory / reciprocal',
        antonym: 'passive / one-directional',
        exampleSentence: 'Smart interactive whiteboards in modern Egyptian classrooms allow students to manipulate 3D anatomical models.'
      },
      {
        word: 'tolerance',
        partOfSpeech: 'noun [uncountable]',
        meaningEn: 'The ability or willingness to tolerate the existence of opinions or behaviors that one dislikes or disagrees with.',
        meaningAr: 'التسامح وقبول التنوع الفكري',
        collocation: 'cultural tolerance / mutual tolerance',
        synonym: 'open-mindedness / acceptance / forbearance',
        antonym: 'bigotry / prejudice / intolerance',
        exampleSentence: 'Learning international languages cultivates deep cultural tolerance and empathy across global borders.'
      },
      {
        word: 'immersion',
        partOfSpeech: 'noun [uncountable]',
        meaningEn: 'A method of learning a foreign language by being totally surrounded by it in speech and writing.',
        meaningAr: 'الانغماس الكامل في البيئة اللغوية',
        collocation: 'language immersion / total immersion',
        synonym: 'deep absorption / intensive engagement',
        antonym: 'superficial study',
        exampleSentence: 'Virtual reality headsets create total linguistic immersion, placing students in simulated London airports or cafes.'
      }
    ],
    collocations: [
      {
        phrase: 'bridge the language gap',
        meaningAr: 'يسد الفجوة اللغوية بين الشعوب',
        example: 'Automated machine translation tools help bridge the language gap in global scientific research.'
      },
      {
        phrase: 'digital literacy',
        meaningAr: 'محو الأمية الرقمية والإلمام بالحاسوب',
        example: 'Schools provide tablet training to ensure all secondary pupils possess high digital literacy.'
      },
      {
        phrase: 'expand one’s horizons',
        meaningAr: 'يوسع مداركه وآفاقه المعرفية',
        example: 'Reading literature from other cultures helps young minds expand their horizons and challenge stereotypes.'
      },
      {
        phrase: 'language acquisition',
        meaningAr: 'اكتساب اللغة وتعلمها بشكل طبيعي',
        example: 'Childhood is an optimal biological window for natural, accent-free language acquisition.'
      }
    ],
    idiomsAndExpressions: [
      {
        idiom: 'see eye to eye',
        meaningEn: 'To be in full agreement with someone.',
        meaningAr: 'يتفق تماماً في وجهات النظر',
        example: 'Although they hailed from different countries, the international students saw eye to eye on peace.'
      },
      {
        idiom: 'speak the same language',
        meaningEn: 'To have similar opinions, tastes, or understanding with someone.',
        meaningAr: 'يتحدثان بنفس المنطق ويتفاهمان بعمق',
        example: 'Scientists across forty nations speak the same language when it comes to empirical physics.'
      }
    ],
    exercises: [
      {
        id: 'sec1_u5_v1',
        skill: 'Vocabulary',
        question: 'Dalia speaks English and German with such natural __________ that listeners assume she lived in Europe.',
        options: ['hesitation', 'fluency', 'monument', 'scam'],
        correctAnswer: 'B',
        explanation: 'From Unit 5 Key Vocab: "fluency" (طلاقة) denotes speaking easily and accurately.'
      },
      {
        id: 'sec1_u5_v2',
        skill: 'Vocabulary',
        question: 'The Egyptian Knowledge Bank (EKB) serves as a comprehensive national educational __________ for all stages.',
        options: ['platform', 'paramedic', 'monument', 'donation'],
        correctAnswer: 'A',
        explanation: 'A "platform" (منصة رقمية) is a software hub or portal providing resources and services.'
      },
      {
        id: 'sec1_u5_v3',
        skill: 'Vocabulary',
        question: 'An individual capable of conversing effortlessly in four different tongues is designated as __________.',
        options: ['monolingual', 'multilingual', 'illiterate', 'temporary'],
        correctAnswer: 'B',
        explanation: '"Multilingual" (متعدد اللغات) describes someone proficient in several languages.'
      },
      {
        id: 'sec1_u5_v4',
        skill: 'Vocabulary',
        question: 'Engaging with diverse world philosophies and international cultures fosters essential cross-cultural __________.',
        options: ['tolerance', 'hostility', 'scam', 'pollution'],
        correctAnswer: 'A',
        explanation: '"Tolerance" (تسامح وقبول الآخر) denotes respect for cultural diversity.'
      }
    ]
  },
  grammarModule: {
    ruleName: 'Countable and Uncountable Nouns & Quantifiers (some, any, much, many, a few, a little)',
    ruleNameAr: 'الأسماء المعدودة وغير المعدودة وأدوات التحديد والكمية',
    explanationSummary: 'Countable nouns have singular and plural forms (tablet/tablets). Uncountable nouns have only singular forms and take singular verbs (information, advice, luggage, software). Quantifiers pair accordingly (much/little with uncountable, many/few with countable).',
    detailedRules: [
      {
        title: 'Countable vs. Uncountable Nouns',
        explanation: 'Countable nouns can be preceded by a/an and counted (a book, two laptops). Uncountable nouns cannot be pluralized and cannot take a/an directly (information, evidence, advice, homework, equipment, news, furniture, luggage).',
        examples: [
          'The teacher gave us valuable advice on digital research. (NOT an advice / advices)',
          'All the scientific equipment in the chemistry lab was modernized.'
        ]
      },
      {
        title: 'Quantifiers: Much / Many / A lot of / Plenty of',
        explanation: 'Many + plural countable nouns (in questions and negatives). Much + uncountable nouns (in questions and negatives). A lot of / Plenty of + both countable and uncountable (in affirmative statements).',
        examples: [
          'How many tablets did the ministry distribute to first secondary students?',
          'There isn’t much time left before the online exam submission deadline.',
          'The Egyptian Knowledge Bank contains a lot of peer-reviewed research papers.'
        ]
      },
      {
        title: 'Nuance: A few vs. Few & A little vs. Little',
        explanation: 'A few / A little = small amount, but sufficient. Few / Little = small amount, virtually none (negative connotation).',
        examples: [
          'I have a few minutes; I can review your essay draft. (Enough time)',
          'He has few friends in the new city, so he feels lonely. (Not enough)',
          'There is a little milk left in the carton for coffee. (Sufficient)',
          'There is little water in the well; it has almost dried up. (Insufficient)'
        ]
      }
    ],
    exercises: [
      {
        id: 'sec1_u5_g1',
        skill: 'Grammar',
        question: 'Could you give me __________ advice on how to improve my English listening skills?',
        options: ['an', 'some', 'many', 'a few'],
        correctAnswer: 'B',
        explanation: '"Advice" is an uncountable noun. It cannot take "an", but pairs naturally with "some" in requests.'
      },
      {
        id: 'sec1_u5_g2',
        skill: 'Grammar',
        question: 'There wasn’t __________ traffic on the Ring Road this morning, so we arrived at school early.',
        options: ['many', 'much', 'few', 'several'],
        correctAnswer: 'B',
        explanation: '"Traffic" is uncountable, so it is paired with "much" in negative sentences.'
      },
      {
        id: 'sec1_u5_g3',
        skill: 'Grammar',
        question: 'The school library ordered __________ new digital tablets for the science laboratory.',
        options: ['much', 'a little', 'a few', 'an'],
        correctAnswer: 'C',
        explanation: '"Tablets" is a plural countable noun, so "a few" is the grammatically correct quantifier.'
      },
      {
        id: 'sec1_u5_g4',
        skill: 'Grammar',
        question: 'The news broadcast on the radio __________ encouraging regarding educational reforms.',
        options: ['was', 'were', 'are', 'have been'],
        correctAnswer: 'A',
        explanation: '"News" is an uncountable singular noun in English and strictly takes a singular verb (was).'
      }
    ]
  },
  readingModule: {
    passageTitle: 'The Digital Classroom: Cognitive Horizons of Multilingualism',
    passage: `In contemporary educational pedagogy, the acquisition of foreign languages has been revolutionized by smart digital integration. Gone are the days when students sat passively memorizing isolated verb declensions and archaic grammar charts. Today, school tablets connected to the Egyptian Knowledge Bank and interactive language portals immerse learners in multimodal environments where listening, speech recognition, and collaborative writing occur simultaneously.

Cognitive neuroscientists demonstrate that multilingualism provides profound physiological benefits to the human brain. Individuals who fluently navigate two or more linguistic codes develop denser gray matter in their prefrontal cortex, enhancing executive functions such as problem-solving, cognitive flexibility, and task-switching. Furthermore, bilingual adolescents exhibit delayed onset of cognitive fatigue and higher resilience when synthesizing contradictory data sets.

Crucially, learning foreign languages does not threaten or erode national cultural identity; rather, it solidifies it. When young Egyptians master English, French, or German, they become empowered cultural ambassadors. They gain the linguistic agility required to articulate their country’s illustrious history, defend national interests on global platforms, and collaborate on international scientific projects, proving that linguistic versatility is the ultimate passport to the knowledge economy.`,
    criticalThinkingFocus: 'Evaluating cognitive benefits of bilingualism, digital immersion versus rote learning, and cultural diplomacy.',
    questions: [
      {
        id: 'sec1_u5_r1',
        skill: 'Reading',
        question: 'According to cognitive neuroscientists, what physical brain enhancement occurs in multilingual individuals?',
        options: [
          'They lose the ability to speak their mother tongue',
          'They develop denser gray matter in the prefrontal cortex, boosting problem-solving and task-switching',
          'Their brain cells permanently stop dividing',
          'They can only think in mathematical equations'
        ],
        correctAnswer: 'B',
        explanation: 'Paragraph 2 notes that multilinguals develop denser gray matter in their prefrontal cortex.'
      },
      {
        id: 'sec1_u5_r2',
        skill: 'Reading',
        question: 'How does modern interactive language software surpass traditional rote learning methods?',
        options: [
          'By banning students from using dictionaries entirely',
          'By providing simultaneous multimodal immersion, speech recognition, and interactive collaboration',
          'By eliminating all grammar instruction completely',
          'By forcing students to write using paper quill pens'
        ],
        correctAnswer: 'B',
        explanation: 'Paragraph 1 explains modern portals use multimodal immersion, speech recognition, and collaborative writing.'
      },
      {
        id: 'sec1_u5_r3',
        skill: 'Reading',
        question: 'What rebuttal does the author present against the claim that learning foreign languages weakens national identity?',
        options: [
          'Foreign languages should only be studied after retirement',
          'Linguistic mastery empowers youth to serve as global cultural ambassadors who can articulate their nation’s heritage',
          'All foreign books should be translated into local dialects immediately',
          'National identity depends solely on agricultural output'
        ],
        correctAnswer: 'B',
        explanation: 'Paragraph 3 argues multilingual youth become empowered cultural ambassadors for their nation.'
      },
      {
        id: 'sec1_u5_r4',
        skill: 'Reading',
        question: 'The phrase "executive functions" in the second paragraph encompasses mental skills such as __________.',
        options: [
          'cooking and baking meals',
          'problem-solving, mental flexibility, and strategic decision-making',
          'physical weightlifting abilities',
          'swimming across broad rivers'
        ],
        correctAnswer: 'B',
        explanation: 'Executive cognitive functions include problem-solving, cognitive flexibility, and switching tasks.'
      }
    ]
  },
  listeningModule: {
    audioTitle: 'The Old Man and the Sea: Chapter 5 — The Great Marlin Revealed',
    speakerRoles: 'Literature Teacher (Mr. Tarek) & Student (Nour)',
    transcript: `Teacher: Good morning, Nour. In Chapter 5 of The Old Man and the Sea, the struggle between Santiago and the giant marlin reaches its magnificent, tragic climax.
Nour: Sir, on which day of the battle does the fish finally begin to circle?
Teacher: On the third morning. The fish has towed the skiff for two full days and nights. Both Santiago and the marlin are on the brink of total physical collapse. Santiago’s hands are raw and lacerated, his shoulders are bruised, and black spots dance before his eyes from heat exhaustion. Suddenly, the strain eases slightly, and the fish begins to circle the boat slowly.
Nour: What does circling signify in big-game fishing?
Teacher: It means the fish is exhausted and is slowly rising toward the surface. With each slow circle, Santiago must pull in a few inches of line, gaining on the fish. But every time the marlin passes near the skiff, it rights itself and glides away. Santiago prays: "God help me to endure. I’ll say a hundred Our Fathers and a hundred Hail Marys. But I cannot say them now."
Nour: How does the old man finally deliver the decisive strike?
Teacher: On the eighth or ninth turn, the marlin swims alongside the skiff, its silver belly gleaming, its eye watching Santiago. Gathering every remnant of his remaining strength and summoning his ancestral pride, the old man lifts his harpoon as high as his aching arms can reach, and drives it down with all his weight into the marlin’s heart behind the pectoral fin! The great fish leaps into the air in one final, glorious convulsion of life, raining spray over Santiago and the skiff, before crashing back dead into the sea, silver and purple in the sun. Santiago has conquered his brother, but his heart is filled with sorrow as well as triumph.`,
    durationApprox: '2 mins 30 secs',
    exercises: [
      {
        id: 'sec1_u5_l1',
        skill: 'Listening',
        question: 'On which day of the continuous struggle does the giant marlin begin to circle the boat?',
        options: ['On the first evening', 'On the third morning', 'On the fifth week', 'After thirty days'],
        correctAnswer: 'B',
        explanation: 'On the third morning, the exhausted marlin begins circling the skiff.'
      },
      {
        id: 'sec1_u5_l2',
        skill: 'Listening',
        question: 'What physical symptoms indicate Santiago’s severe exhaustion during the circling?',
        options: [
          'Black spots dancing before his eyes and extreme dizziness',
          'A broken collarbone and high fever',
          'Total loss of memory regarding his name',
          'Severe toothache and frozen limbs'
        ],
        correctAnswer: 'A',
        explanation: 'He experiences black spots before his eyes, raw bleeding hands, and faintness from exhaustion.'
      },
      {
        id: 'sec1_u5_l3',
        skill: 'Listening',
        question: 'Where does Santiago drive the harpoon to make the fatal strike?',
        options: [
          'Into the marlin’s tail fin',
          'Into the marlin’s heart just behind the pectoral fin',
          'Into the wooden skiff’s floorboards',
          'Into the surface of the floating water'
        ],
        correctAnswer: 'B',
        explanation: 'He drives the iron harpoon into the marlin’s heart behind its great pectoral fin.'
      },
      {
        id: 'sec1_u5_l4',
        skill: 'Listening',
        question: 'What paradoxical emotions overwhelm Santiago immediately after the fish dies?',
        options: [
          'Pure arrogance and mockery of the dead fish',
          'A mixture of triumph and deep sorrow for the loss of his noble brother',
          'Panic because he lost his eyeglasses',
          'Complete indifference and boredom'
        ],
        correctAnswer: 'B',
        explanation: 'He feels victorious pride intertwined with profound sorrow at killing his noble brother.'
      }
    ]
  },
  unitExam: {
    examId: 'sec1_u5_exam',
    examTitle: 'Secondary 1 - Unit 5 Comprehensive Assessment: Using Technology at Schools',
    examTitleAr: 'امتحان الوحدة الخامسة الشامل: تكنولوجيا التعليم واللغات (مواصفات 2026/2027)',
    durationMinutes: 30,
    totalMarks: 32,
    questions: [
      {
        id: 'sec1_u5_ex_q1',
        skill: 'Vocabulary',
        question: 'Students who converse daily with foreign partners quickly develop natural spoken __________.',
        options: ['fluency', 'hesitation', 'monument', 'scam'],
        correctAnswer: 'A',
        explanation: '"Fluency" (طلاقة) is the smooth, effortless command of a spoken language.'
      },
      {
        id: 'sec1_u5_ex_q2',
        skill: 'Vocabulary',
        question: 'The Egyptian Knowledge Bank provides an innovative digital __________ for research and interactive learning.',
        options: ['platform', 'paramedic', 'monument', 'donation'],
        correctAnswer: 'A',
        explanation: 'An educational "platform" is a digital system hosting learning modules and databases.'
      },
      {
        id: 'sec1_u5_ex_q3',
        skill: 'Grammar',
        question: 'Our chemistry teacher gave us __________ valuable advice regarding laboratory safety.',
        options: ['an', 'some', 'many', 'a few'],
        correctAnswer: 'B',
        explanation: '"Advice" is uncountable; it cannot take "an", but pairs with "some".'
      },
      {
        id: 'sec1_u5_ex_q4',
        skill: 'Grammar',
        question: 'The government distributed __________ interactive tablets to high school freshmen across the nation.',
        options: ['much', 'many', 'a little', 'an'],
        correctAnswer: 'B',
        explanation: '"Tablets" is a plural countable noun, so "many" is used.'
      },
      {
        id: 'sec1_u5_ex_q5',
        skill: 'Reading',
        question: 'Neuroscientists confirm that bilingualism enhances executive brain functions such as __________.',
        options: [
          'cognitive flexibility, problem-solving, and efficient task-switching',
          'long-distance eyesight at night',
          'digesting heavy fats quickly',
          'calculating bank loans without paper'
        ],
        correctAnswer: 'A',
        explanation: 'Bilingual brains show enhanced prefrontal cortex gray matter and executive flexibility.'
      },
      {
        id: 'sec1_u5_ex_q6',
        skill: 'Listening',
        question: 'In Chapter 5 of The Old Man and the Sea, how does Hemingway depict the marlin’s final leap after being struck by the harpoon?',
        options: [
          'It splashes silently into the deep and disappears forever',
          'It leaps in one glorious final convulsion of life, spraying silver and purple in the sun',
          'It attacks the skiff and breaks the rudder in half',
          'It flies over the boat into Manolin’s arms'
        ],
        correctAnswer: 'B',
        explanation: 'The marlin leaps in one glorious, tragic convulsion of life before collapsing dead.'
      }
    ]
  }
};

// ============================================================================
// UNIT 6: Job Hunting (البحث عن عمل وبناء المستقبل المهني)
// ============================================================================
export const sec1Unit6: UnitCurriculum = {
  stage: 'Secondary',
  grade: 10,
  gradeLabel: 'Secondary 1 - الصف الأول الثانوي',
  track: 'General Secondary',
  secondaryPath: 'general_secondary',
  semester: 1,
  unitNumber: 6,
  unitTitle: 'Job Hunting',
  unitTitleAr: 'البحث عن عمل وبناء السيرة الذاتية المهنية (CV)',
  theme: 'The Modern Job Market, Professional Resumes, LinkedIn, Interviews & Employability Skills',
  vocabularyModule: {
    keyWords: [
      {
        word: 'curriculum vitae (CV)',
        partOfSpeech: 'noun [countable]',
        meaningEn: 'A comprehensive written outline of a person’s educational background, work experience, and professional skills.',
        meaningAr: 'السيرة الذاتية المهنية (CV)',
        collocation: 'submit a CV / update one’s CV',
        synonym: 'resume / professional profile',
        antonym: 'biography',
        exampleSentence: 'Graduates should tailor their curriculum vitae to highlight specific competencies matching the advertised vacancy.'
      },
      {
        word: 'qualifications',
        partOfSpeech: 'noun [plural]',
        meaningEn: 'Official passes, degrees, or certifications demonstrating an individual’s suitability for a profession.',
        meaningAr: 'المؤهلات العلمية والمهنية',
        collocation: 'academic qualifications / professional qualifications',
        synonym: 'credentials / certifications / degrees',
        antonym: 'incompetence / lack of training',
        exampleSentence: 'Fluency in English and verified programming credentials are core qualifications for software engineering positions.'
      },
      {
        word: 'internship',
        partOfSpeech: 'noun [countable]',
        meaningEn: 'A temporary period of work experience offered by an organization to students or recent graduates.',
        meaningAr: 'فترة تدريب عملي / تدريب مهني',
        collocation: 'summer internship / paid internship',
        synonym: 'traineeship / apprenticeship',
        antonym: 'permanent employment',
        exampleSentence: 'Completing a summer internship at a major telecom firm equips undergraduates with indispensable real-world expertise.'
      },
      {
        word: 'vacancy',
        partOfSpeech: 'noun [countable]',
        meaningEn: 'An unoccupied job position or post available for an applicant to fill.',
        meaningAr: 'وظيفة شاغرة / منصب خالٍ',
        collocation: 'job vacancy / advertise a vacancy',
        synonym: 'opening / opportunity / post',
        antonym: 'filled position / closed job',
        exampleSentence: 'The multinational pharmaceutical company announced multiple vacancies in their biomedical research department.'
      },
      {
        word: 'candidate',
        partOfSpeech: 'noun [person]',
        meaningEn: 'An individual who applies for a job, scholarship, or elected office.',
        meaningAr: 'مرشح لشغل وظيفة أو منحة',
        collocation: 'successful candidate / job candidate',
        synonym: 'applicant / interviewee / contender',
        antonym: 'recruiter / employer',
        exampleSentence: 'The hiring committee selected the candidate who demonstrated exceptional leadership grit and technical precision.'
      },
      {
        word: 'employability',
        partOfSpeech: 'noun [uncountable]',
        meaningEn: 'A person’s capability of gaining initial employment, maintaining employment, and obtaining new employment.',
        meaningAr: 'الجاهزية للتوظيف وسوق العمل',
        collocation: 'employability skills / enhance employability',
        synonym: 'marketability / career readiness',
        antonym: 'unemployability',
        exampleSentence: 'Developing strong emotional intelligence and communication skills significantly enhances a graduate’s employability.'
      }
    ],
    collocations: [
      {
        phrase: 'stand out from the crowd',
        meaningAr: 'يتميز ويبرز بين المنافسين',
        example: 'A portfolio of verified open-source software contributions helps young programmers stand out from the crowd.'
      },
      {
        phrase: 'meet the deadline',
        meaningAr: 'يلتزم بالموعد النهائي لتسليم العمل',
        example: 'Reliable candidates prove that they can manage high-pressure tasks and meet every critical project deadline.'
      },
      {
        phrase: 'professional network',
        meaningAr: 'شبكة العلاقات المهنية',
        example: 'Attending technological symposiums enables young graduates to expand their professional network.'
      },
      {
        phrase: 'soft skills',
        meaningAr: 'المهارات الشخصية والاجتماعية',
        example: 'Modern recruiters evaluate both technical expertise and essential soft skills such as teamwork and active listening.'
      }
    ],
    idiomsAndExpressions: [
      {
        idiom: 'get one’s foot in the door',
        meaningEn: 'To secure a first entry point into a competitive industry or organization with future advancement prospects.',
        meaningAr: 'يضع قدمه على أول طريق النجاح المهني',
        example: 'Accepting an entry-level internship was his strategy to get his foot in the door at the prestigious bank.'
      },
      {
        idiom: 'hit the ground running',
        meaningEn: 'To start a new job or project energetically and achieve results immediately without hesitation.',
        meaningAr: 'يبدأ العمل بحماس وإنتاجية فورية',
        example: 'Thanks to her thorough internship training, the new chemical analyst hit the ground running on day one.'
      }
    ],
    exercises: [
      {
        id: 'sec1_u6_v1',
        skill: 'Vocabulary',
        question: 'A professional document summarizing an applicant’s academic background, awards, and work history is a __________.',
        options: ['curriculum vitae (CV)', 'monument', 'scam', 'paramedic'],
        correctAnswer: 'A',
        explanation: 'From Unit 6 Key Vocab: "curriculum vitae (CV)" outlines a person’s professional and educational career.'
      },
      {
        id: 'sec1_u6_v2',
        skill: 'Vocabulary',
        question: 'Undergraduates are strongly advised to secure a summer __________ to acquire direct industry experience.',
        options: ['internship', 'emission', 'footprint', 'hesitation'],
        correctAnswer: 'A',
        explanation: 'An "internship" (تدريب عملي) is a supervised work experience period for students.'
      },
      {
        id: 'sec1_u6_v3',
        skill: 'Vocabulary',
        question: 'The human resources director shortlisted five promising __________ for the final interview round.',
        options: ['candidates', 'monuments', 'emissions', 'pharaohs'],
        correctAnswer: 'A',
        explanation: '"Candidates" (مرشحون) are job applicants being evaluated for a vacancy.'
      },
      {
        id: 'sec1_u6_v4',
        skill: 'Vocabulary',
        question: 'Mastering communication, time management, and problem-solving significantly elevates a student’s __________.',
        options: ['employability', 'pollution', 'hesitation', 'scam'],
        correctAnswer: 'A',
        explanation: '"Employability" (الجاهزية للتوظيف) denotes the attributes that make a person desirable to employers.'
      }
    ]
  },
  grammarModule: {
    ruleName: 'Articles: Definite (the), Indefinite (a/an), and Zero Article (no article)',
    ruleNameAr: 'أدوات النكرة (a/an)، أداة المعرفة (the)، وحالات عدم استخدام أداة (Zero Article)',
    explanationSummary: 'A/An introduces singular countable nouns mentioned for the first time. The refers to specific, previously mentioned, unique, or superlative nouns. Zero article is used with plurals, uncountables in general, meals, sports, languages, and proper names.',
    detailedRules: [
      {
        title: 'Indefinite Articles: a vs. an',
        explanation: 'Used before singular countable nouns mentioned for the first time or denoting professions. "A" precedes consonant sounds (a university, a European, a CV). "An" precedes vowel sounds (an hour, an honest man, an internship).',
        examples: [
          'Ahmed applied for a summer internship at an international tech firm.',
          'She hopes to become an artificial intelligence engineer.'
        ]
      },
      {
        title: 'Definite Article: the',
        explanation: 'Used when the noun is uniquely identified, previously mentioned, qualified by a defining clause, before superlatives, ordinal numbers, unique geographical entities (rivers, seas, oceans, mountain ranges), and plural country names.',
        examples: [
          'The Nile is the longest river in Africa.',
          'The candidate who answered all technical questions accurately was hired.',
          'The United Kingdom and The Arab Republic of Egypt maintain strong ties.'
        ]
      },
      {
        title: 'Zero Article (No Article)',
        explanation: 'Do NOT use articles with plural or uncountable nouns used in a general sense, names of individual people, cities, single mountains, lakes, sports, school subjects, languages, or regular meals.',
        examples: [
          'Experience and dedication are vital for career success. (General uncountables)',
          'We had lunch with our department manager yesterday.',
          'Nour studied Arabic, French, and mathematics at Cairo University.'
        ]
      }
    ],
    exercises: [
      {
        id: 'sec1_u6_g1',
        skill: 'Grammar',
        question: 'Youssef graduated from __________ university in Upper Egypt with honors in computer science.',
        options: ['a', 'an', 'the', 'no article'],
        correctAnswer: 'A',
        explanation: '"University" begins with a consonant "y" sound (/juː/), so it takes "a", not "an".'
      },
      {
        id: 'sec1_u6_g2',
        skill: 'Grammar',
        question: 'It took the hiring manager __________ hour to review all fifty submitted resumes.',
        options: ['a', 'an', 'the', 'no article'],
        correctAnswer: 'B',
        explanation: '"Hour" begins with a silent "h" and a vowel sound (/aʊər/), so it takes "an".'
      },
      {
        id: 'sec1_u6_g3',
        skill: 'Grammar',
        question: '__________ Red Sea coastline attracts thousands of marine biology researchers each year.',
        options: ['A', 'An', 'The', 'No article'],
        correctAnswer: 'C',
        explanation: 'Seas, oceans, and rivers require the definite article "The" (The Red Sea).'
      },
      {
        id: 'sec1_u6_g4',
        skill: 'Grammar',
        question: 'She plays __________ basketball with her colleagues every Friday morning.',
        options: ['a', 'an', 'the', 'no article'],
        correctAnswer: 'D',
        explanation: 'Names of sports and games do not take an article (Zero Article).'
      }
    ]
  },
  readingModule: {
    passageTitle: 'The Future of Employability: Mastering the Algorithmic Labor Market',
    passage: `Over the past decade, the landscape of human recruitment has experienced a profound digital metamorphosis. In the contemporary corporate environment, sending paper resumes by post is a relic of the industrial past. Today, multinational corporations and domestic enterprises utilize Applicant Tracking Systems (ATS)—artificial intelligence algorithms that screen thousands of electronic CVs within seconds, searching for contextual keywords, accredited certifications, and evidence of measurable impact.

Consequently, modern job seekers must adopt a dual-target strategy. When drafting a curriculum vitae, an applicant must format their credentials clearly so that automated algorithmic crawlers recognize their technical proficiencies. Simultaneously, the prose must remain persuasive, compelling, and authentic when reviewed by human hiring managers. Vague statements such as "good team player" have become obsolete; recruiters look for quantifiable metrics, such as "optimized database response time by thirty percent" or "led five school charity drives."

Furthermore, the World Economic Forum emphasizes that while technological proficiency is essential, it is "soft skills" that will future-proof human careers against automation. Adaptability, critical thinking, cross-cultural empathy, and active listening cannot be easily replicated by silicon neural networks. The successful professional of tomorrow is not merely someone who knows how to operate machinery, but an agile, lifelong learner capable of collaborating creatively across diverse human teams.`,
    criticalThinkingFocus: 'Analyzing ATS algorithms, quantifiable career achievements, and irreplaceable human soft skills in an AI-driven economy.',
    questions: [
      {
        id: 'sec1_u6_r1',
        skill: 'Reading',
        question: 'What role do Applicant Tracking Systems (ATS) play in modern recruitment according to the passage?',
        options: [
          'They print resumes onto physical paper rolls',
          'They use algorithms to scan thousands of electronic CVs in seconds for keywords and verified credentials',
          'They interview candidates face-to-face in hospital rooms',
          'They calculate how much money candidates spend on clothes'
        ],
        correctAnswer: 'B',
        explanation: 'Paragraph 1 explains ATS algorithms screen electronic CVs for keywords, certifications, and measurable impact.'
      },
      {
        id: 'sec1_u6_r2',
        skill: 'Reading',
        question: 'Why are vague resume phrases such as "good team player" discouraged by modern career recruiters?',
        options: [
          'Because computers cannot recognize the word "good"',
          'Because employers demand quantifiable, concrete metrics demonstrating real accomplishments',
          'Because teams no longer exist in modern companies',
          'Because all resumes must be written exclusively in Latin'
        ],
        correctAnswer: 'B',
        explanation: 'Recruiters favor quantifiable metrics (percentages, projects led) over generic, unverified claims.'
      },
      {
        id: 'sec1_u6_r3',
        skill: 'Reading',
        question: 'Which capabilities will future-proof human professionals against displacement by artificial intelligence?',
        options: [
          'Typing speed on old keyboards',
          'Human soft skills: critical thinking, adaptability, empathy, and creative collaboration',
          'Refusing to use computers or smartphones',
          'Memorizing entire encyclopedia volumes by heart'
        ],
        correctAnswer: 'B',
        explanation: 'Paragraph 3 highlights critical thinking, empathy, adaptability, and collaboration as irreplaceable.'
      },
      {
        id: 'sec1_u6_r4',
        skill: 'Reading',
        question: 'The term "dual-target strategy" in the second paragraph implies that job applicants must write resumes that __________.',
        options: [
          'appeal equally to automated software parsers and human hiring executives',
          'target two completely unrelated professions simultaneously',
          'are written in two completely different foreign languages on the same page',
          'are submitted twice on two consecutive days'
        ],
        correctAnswer: 'A',
        explanation: 'The CV must be optimized for ATS algorithms while remaining engaging for human managers.'
      }
    ]
  },
  listeningModule: {
    audioTitle: 'The Old Man and the Sea: Chapter 6 — The Sharks Arrive',
    speakerRoles: 'Literature Teacher (Mr. Tarek) & Student (Tamer)',
    transcript: `Teacher: Good afternoon, Tamer. Today we conclude our first-term novella study with Chapter 6 of The Old Man and the Sea: "The Sharks Arrive".
Tamer: Sir, what happens after Santiago secures the marlin alongside his boat?
Teacher: Because the fish is two feet longer than the skiff, Santiago cannot haul it inside. He lashes it securely alongside the gunwale, hoists his patched sail, and steers toward Havana. But the fish’s dark blood has leaked into the deep currents of the Gulf Stream. An hour later, the first predator arrives: a great Mako shark, built like a torpedo, with jaws armed with eight rows of razor teeth.
Tamer: Does Santiago surrender his prize without resistance?
Teacher: Never! Santiago prepares his harpoon, waits until the Mako bites deep into the marlin’s flank, and drives the iron directly into the shark’s brain! The Mako dies and sinks into the abyss, taking the old man’s harpoon and rope with it.
Tamer: But do more sharks follow?
Teacher: Alas, yes. The scent of blood spreads across leagues of ocean. Pairs of shovel-nosed brown scavengers (galanos) attack the marlin relentlessly. Without his harpoon, Santiago lashes his sharp knife to the butt of an oar. He stabs and slashes at the sharks, breaking his knife blade, then using the heavy wooden tiller until it snaps!
Tamer: What is left of the marlin when Santiago finally reaches the harbor?
Teacher: Nothing but a bare, gleaming white skeleton with a magnificent tail fin and a sword head. The old man stumbles into his shack in the dark and falls face down on his cot, asleep with exhaustion. The next morning, foreign tourists in the café look down at the eighteen-foot spine floating in the water and mistake it for a shark. But Manolin weeps with pride, promising Santiago that they will fish together again, because the old man was not defeated. As Hemingway famously proclaimed: "A man can be destroyed, but not defeated."`,
    durationApprox: '2 mins 30 secs',
    exercises: [
      {
        id: 'sec1_u6_l1',
        skill: 'Listening',
        question: 'Why was Santiago unable to pull the dead marlin inside his skiff?',
        options: [
          'Because the skiff was filled with water',
          'Because the marlin was two feet longer than the skiff and weighed over a thousand pounds',
          'Because the old man forgot his fishing ropes at home',
          'Because the police ordered him to leave the fish in the water'
        ],
        correctAnswer: 'B',
        explanation: 'The marlin was much too colossal to fit inside his small sixteen-foot skiff.'
      },
      {
        id: 'sec1_u6_l2',
        skill: 'Listening',
        question: 'What brought the first Mako shark to Santiago’s boat?',
        options: [
          'The sound of Santiago singing',
          'The scent of the marlin’s blood leaking into the deep water',
          'The bright glare of the boat’s lantern',
          'The smell of tobacco smoke'
        ],
        correctAnswer: 'B',
        explanation: 'Blood leaking from the marlin created a scent trail in the deep water.'
      },
      {
        id: 'sec1_u6_l3',
        skill: 'Listening',
        question: 'How did Santiago fight the subsequent packs of brown scavengers after losing his harpoon?',
        options: [
          'By using a high-powered firearm',
          'By lashing his knife to an oar, and later clubbing them with the wooden tiller',
          'By leaping into the water and wrestling them barehanded',
          'By throwing his clothes at them'
        ],
        correctAnswer: 'B',
        explanation: 'He improvised by tying his knife to an oar blade, and used the wooden tiller until it broke.'
      },
      {
        id: 'sec1_u6_l4',
        skill: 'Listening',
        question: 'What philosophical moral does Hemingway’s masterpiece immortalize through Santiago’s ordeal?',
        options: [
          'Man should never sail alone in small boats',
          'A man can be destroyed, but not defeated',
          'Sharks are smarter than human beings',
          'Material wealth is the only measure of honor'
        ],
        correctAnswer: 'B',
        explanation: '"A man can be destroyed, but not defeated." Spiritual integrity survives material loss.'
      }
    ]
  },
  unitExam: {
    examId: 'sec1_u6_exam',
    examTitle: 'Secondary 1 - Unit 6 Comprehensive Assessment: Job Hunting',
    examTitleAr: 'امتحان الوحدة السادسة الشامل: البحث عن عمل (مواصفات 2026/2027)',
    durationMinutes: 30,
    totalMarks: 32,
    questions: [
      {
        id: 'sec1_u6_ex_q1',
        skill: 'Vocabulary',
        question: 'A competitive resume must feature verified academic __________ alongside practical internship experience.',
        options: ['qualifications', 'monuments', 'emissions', 'scams'],
        correctAnswer: 'A',
        explanation: '"Qualifications" (مؤهلات) denote official certificates and competencies.'
      },
      {
        id: 'sec1_u6_ex_q2',
        skill: 'Vocabulary',
        question: 'The multinational pharmaceutical firm advertised several research __________ in Cairo.',
        options: ['vacancies', 'footprints', 'scams', 'paramedics'],
        correctAnswer: 'A',
        explanation: 'A job "vacancy" (وظيفة شاغرة) is an open position available for applicants.'
      },
      {
        id: 'sec1_u6_ex_q3',
        skill: 'Grammar',
        question: 'Salma has been working as __________ software engineer at a telecommunications hub.',
        options: ['a', 'an', 'the', 'no article'],
        correctAnswer: 'A',
        explanation: '"Software" begins with a consonant sound, so it takes "a" for a profession.'
      },
      {
        id: 'sec1_u6_ex_q4',
        skill: 'Grammar',
        question: 'He has __________ extensive experience in cybersecurity and database administration.',
        options: ['a', 'an', 'the', 'no article'],
        correctAnswer: 'D',
        explanation: '"Experience" in the sense of knowledge and skill is uncountable and takes Zero Article.'
      },
      {
        id: 'sec1_u6_ex_q5',
        skill: 'Reading',
        question: 'Why do modern corporations deploy Applicant Tracking Systems (ATS) in human resources?',
        options: [
          'To scan and filter thousands of resumes automatically using keywords and accredited criteria',
          'To deliver paper mail to candidates’ home addresses',
          'To prepare cafeteria meals for company staff',
          'To monitor the daily attendance of retired employees'
        ],
        correctAnswer: 'A',
        explanation: 'ATS software screens electronic resumes using algorithmic keyword matching.'
      },
      {
        id: 'sec1_u6_ex_q6',
        skill: 'Listening',
        question: 'In Hemingway’s The Old Man and the Sea, what remains of the magnificent marlin when Santiago docks at Havana harbor?',
        options: [
          'A living fish swimming alongside the skiff',
          'A bare eighteen-foot skeleton with its head and tail fin intact',
          'A barrel of canned tuna',
          'The fish had vanished completely without a trace'
        ],
        correctAnswer: 'B',
        explanation: 'Only the white eighteen-foot skeleton, sword head, and tail remained after the shark attacks.'
      }
    ]
  }
};

// ============================================================================
// SECONDARY 1 TERM 1 COMPREHENSIVE REVISION EXAM (2026/2027 SPECIFICATIONS)
// ============================================================================
export const sec1Term1RevisionExam: UnitExam = {
  examId: 'sec1_term1_comprehensive_revision_2026',
  examTitle: 'Secondary 1 - First Term Comprehensive Final Examination (Units 1 - 6)',
  examTitleAr: 'الامتحان النموذجي الشامل للفصل الدراسي الأول - الصف الأول الثانوي (الوحدات 1 - 6)',
  durationMinutes: 45,
  totalMarks: 32,
  questions: [
    {
      id: 'sec1_t1_rev_q1',
      skill: 'Vocabulary',
      question: 'Safeguarding our historic antiquities reinforces the Egyptian people’s sense of national __________.',
      options: ['identity', 'difficulty', 'hesitation', 'hieroglyphs'],
      correctAnswer: 'A',
      explanation: 'Unit 1: "Identity" (هوية) embodies national pride and cultural belonging.'
    },
    {
      id: 'sec1_t1_rev_q2',
      skill: 'Vocabulary',
      question: 'Emergency paramedics commended the citizens for their selfless __________ during the train rescue.',
      options: ['arrogance', 'altruism', 'greed', 'hostility'],
      correctAnswer: 'B',
      explanation: 'Unit 2: "Altruism" (إيثار) is voluntary self-sacrifice for the well-being of others.'
    },
    {
      id: 'sec1_t1_rev_q3',
      skill: 'Vocabulary',
      question: 'Digital security agencies caution users never to click unverified links that may be a financial __________.',
      options: ['monument', 'scam', 'donation', 'paramedic'],
      correctAnswer: 'B',
      explanation: 'Unit 3: A "scam" (احتيال) is a fraudulent digital plot.'
    },
    {
      id: 'sec1_t1_rev_q4',
      skill: 'Vocabulary',
      question: 'The Benban Solar Park produces clean power without generating toxic greenhouse gas __________.',
      options: ['emissions', 'monuments', 'identities', 'internships'],
      correctAnswer: 'A',
      explanation: 'Unit 4: "Emissions" (انبعاثات) are industrial or exhaust gas discharges.'
    },
    {
      id: 'sec1_t1_rev_q5',
      skill: 'Vocabulary',
      question: 'Speaking multiple languages fluently enables young Egyptians to bridge the international communication __________.',
      options: ['scam', 'gap', 'monument', 'hesitation'],
      correctAnswer: 'B',
      explanation: 'Unit 5: The collocation is "bridge the gap" (يسد الفجوة).'
    },
    {
      id: 'sec1_t1_rev_q6',
      skill: 'Vocabulary',
      question: 'Graduates should format their __________ clearly to highlight their practical competencies and soft skills.',
      options: ['curriculum vitae (CV)', 'monument', 'footprint', 'paramedic'],
      correctAnswer: 'A',
      explanation: 'Unit 6: A "curriculum vitae (CV)" outlines career and academic qualifications.'
    },
    {
      id: 'sec1_t1_rev_q7',
      skill: 'Grammar',
      question: 'While the restoration team __________ the pharaonic sarcophagus, a gold amulet fell to the floor.',
      options: ['were cleaning', 'cleaned', 'clean', 'had cleaned'],
      correctAnswer: 'A',
      explanation: 'Unit 1: Past Continuous (were cleaning) for ongoing action interrupted by another past action.'
    },
    {
      id: 'sec1_t1_rev_q8',
      skill: 'Grammar',
      question: 'You __________ park your vehicle in front of the hospital oxygen storage tanks; it is strictly illegal.',
      options: ['needn’t', 'mustn’t', 'don’t have to', 'should'],
      correctAnswer: 'B',
      explanation: 'Unit 2: "Mustn’t" expresses strict legal prohibition.'
    },
    {
      id: 'sec1_t1_rev_q9',
      skill: 'Grammar',
      question: 'Had the research team cross-checked the data, they __________ the misleading paper yesterday.',
      options: ['would not publish', 'will not publish', 'would not have published', 'had not published'],
      correctAnswer: 'C',
      explanation: 'Unit 3: Inverted third conditional (Had + subject + P.P., would have + P.P.).'
    },
    {
      id: 'sec1_t1_rev_q10',
      skill: 'Grammar',
      question: 'The environmental ministry planned __________ three new green hydrogen facilities by 2028.',
      options: ['to build', 'building', 'build', 'built'],
      correctAnswer: 'A',
      explanation: 'Unit 4: "Plan" takes to + infinitive (planned to build).'
    },
    {
      id: 'sec1_t1_rev_q11',
      skill: 'Grammar',
      question: 'Our academic advisor gave us __________ valuable advice regarding university scholarship applications.',
      options: ['an', 'some', 'many', 'a few'],
      correctAnswer: 'B',
      explanation: 'Unit 5: "Advice" is uncountable and takes "some".'
    },
    {
      id: 'sec1_t1_rev_q12',
      skill: 'Grammar',
      question: 'Mona works as __________ operations manager for a reputable logistics firm in Alexandria.',
      options: ['a', 'an', 'the', 'no article'],
      correctAnswer: 'B',
      explanation: 'Unit 6: "Operations" begins with a vowel sound, so it takes "an" for a job title.'
    },
    {
      id: 'sec1_t1_rev_q13',
      skill: 'Reading',
      question: 'According to modern educational pedagogy, digital immersion tools such as the Egyptian Knowledge Bank __________.',
      options: [
        'empower students with multimodal interactive resources and global research capabilities',
        'require students to stop reading books permanently',
        'ban students from learning foreign languages',
        'cost thousands of dollars per month for public school students'
      ],
      correctAnswer: 'A',
      explanation: 'EKB provides accessible, multimodal, and interactive learning tools for all citizens.'
    },
    {
      id: 'sec1_t1_rev_q14',
      skill: 'Reading',
      question: 'Applicant Tracking Systems (ATS) used by modern human resource departments evaluate candidates primarily by __________.',
      options: [
        'scanning digital CVs for keywords, verified credentials, and quantifiable achievements',
        'measuring how heavy the applicant’s paper folder is',
        'calculating the candidate’s age in days',
        'choosing candidates with the longest names'
      ],
      correctAnswer: 'A',
      explanation: 'ATS software analyzes CVs for keywords, certifications, and measurable impact.'
    },
    {
      id: 'sec1_t1_rev_q15',
      skill: 'Listening',
      question: 'In Hemingway’s The Old Man and the Sea, what enduring moral code does Santiago embody throughout his ordeal?',
      options: [
        'A man can be destroyed, but not defeated',
        'Failure is shameful and should always be concealed from others',
        'Material catch is the only valid criterion of an individual’s worth',
        'Elderly people should never dream or venture into deep waters'
      ],
      correctAnswer: 'A',
      explanation: '"A man can be destroyed, but not defeated" encapsulates Santiago’s spiritual resilience.'
    },
    {
      id: 'sec1_t1_rev_q16',
      skill: 'Listening',
      question: 'Why did Manolin weep when he saw Santiago sleeping in his cabin after returning from the sea?',
      options: [
        'Because he saw the old man’s lacerated, bleeding hands and realized the immense suffering Santiago had endured',
        'Because his parents ordered him to move to another village',
        'Because the old man forgot to bring him a souvenir from Havana',
        'Because the boat was stolen by pirates'
      ],
      correctAnswer: 'A',
      explanation: 'Manolin wept seeing Santiago’s raw, bleeding hands and the depth of his heroic suffering.'
    }
  ]
};

// All Secondary 1 Term 1 Units exported together
export const secondary1Term1Units: UnitCurriculum[] = [
  sec1Unit1,
  sec1Unit2,
  sec1Unit3,
  sec1Unit4,
  sec1Unit5,
  sec1Unit6
];
