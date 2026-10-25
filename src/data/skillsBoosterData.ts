/**
 * Skills, Punctuation, Essay Writing & Translation Booster
 * Specifically aligned with Egyptian Ministry of Education Secondary Specifications (2026/2027)
 */

export interface PunctuationRule {
  id: string;
  symbol: string;
  name: string;
  nameAr: string;
  usageRules: string[];
  examTraps: {
    trapTitle: string;
    incorrect: string;
    correct: string;
    explanation: string;
  }[];
}

export interface EssayWritingGuide {
  sectionTitle: string;
  sectionTitleAr: string;
  hookStrategies: {
    type: string;
    typeAr: string;
    example: string;
    tips: string;
  }[];
  thesisFormula: {
    description: string;
    formula: string;
    example: string;
  };
  paragraphPEEL: {
    letter: string;
    meaning: string;
    meaningAr: string;
    explanation: string;
    example: string;
  }[];
  transitionCategories: {
    category: string;
    categoryAr: string;
    words: string[];
  }[];
}

export interface ContextualTranslationItem {
  id: string;
  direction: 'en_to_ar' | 'ar_to_en';
  sourceText: string;
  modelAnswer: string;
  keyVocabulary: { en: string; ar: string }[];
  grammaticalNotes: string;
  commonPitfall: string;
}

export const secondaryPunctuationRules: PunctuationRule[] = [
  {
    id: 'comma',
    symbol: ',',
    name: 'The Comma (الفصلة)',
    nameAr: 'استخدامات الفصلة وأفخاخ الامتحانات الوزارية',
    usageRules: [
      'Separates items in a list of 3 or more (Oxford comma is accepted): "We need papyrus, ink, and reeds."',
      'Separates an introductory adverbial clause or phrase: "Although Egypt is ancient, its youth lead the technological revolution."',
      'Encloses non-defining relative clauses: "Dr. Ahmed Zewail, who won the Nobel Prize, inspired generations."',
      'Follows introductory transitional adverbs: "However, Moreover, Furthermore, In addition,".',
      'Separates tag questions from the main statement: "You have visited Karnak before, haven’t you?"',
    ],
    examTraps: [
      {
        trapTitle: 'The Comma Splice Trap (فصل جملتين مستقلتين بفصلة فقط دون رابط)',
        incorrect: 'The Great Pyramid is colossal, it took twenty years to construct.',
        correct: 'The Great Pyramid is colossal; it took twenty years to construct. OR: The Great Pyramid is colossal, and it took twenty years to construct.',
        explanation: 'Two independent clauses cannot be joined by a comma alone. Use a semicolon (;) or a coordinating conjunction (FANBOYS: for, and, nor, but, or, yet, so).',
      },
      {
        trapTitle: 'Defining vs. Non-Defining Relative Clauses (فصلات جمل الوصل)',
        incorrect: 'The Egyptian artifacts, that were excavated recently, are displayed in the GEM.',
        correct: 'The Egyptian artifacts that were excavated recently are displayed in the GEM.',
        explanation: 'Do NOT use commas with "that" in defining relative clauses. Commas are only used with non-defining information with "which", "who", or "whose".',
      },
    ],
  },
  {
    id: 'semicolon_colon',
    symbol: '; / :',
    name: 'Semicolon vs. Colon (الفصلة المنقوطة والنقطتان الرأسيتان)',
    nameAr: 'الفرق الدقيق بين الفصلة المنقوطة والنقطتين الرأسيتين',
    usageRules: [
      'Semicolon (;): Connects two independent clauses that are closely related in thought without a conjunction.',
      'Semicolon (;): Precedes conjunctive adverbs connecting main clauses (e.g., "; however,", "; therefore,").',
      'Colon (:): Introduces a list, explanation, amplification, or formal quotation following a complete independent clause.',
    ],
    examTraps: [
      {
        trapTitle: 'Premature Colon Trap (وضع النقطتين بعد فعل ناقص أو حرف جر)',
        incorrect: 'The primary green projects include: solar farms, wind parks, and electric monorails.',
        correct: 'The primary green projects include solar farms, wind parks, and electric monorails. OR: Egypt launched several green projects: solar farms, wind parks, and electric monorails.',
        explanation: 'Never place a colon directly after a verb (include, are) or preposition. The clause before a colon must be grammatically complete on its own.',
      },
      {
        trapTitle: 'Semicolon with Transitional Adverbs',
        incorrect: 'Modern education emphasizes robotics, however traditional literacy remains vital.',
        correct: 'Modern education emphasizes robotics; however, traditional literacy remains vital.',
        explanation: '"However" joining two sentences requires a semicolon before it and a comma after it.',
      },
    ],
  },
  {
    id: 'apostrophe',
    symbol: "'",
    name: 'The Apostrophe (فاصلة الحذف والملكية)',
    nameAr: 'الملكية والاختصارات والخلط الشائع',
    usageRules: [
      'Singular possession: noun + ’s ("the scholar’s papyrus", "Charles’s book").',
      'Plural possession ending in -s: plural noun + ’ ("the Pharaohs’ tombs", "the teachers’ room").',
      'Irregular plural possession not ending in -s: word + ’s ("children’s rights", "women’s achievements").',
      'Omission / Contraction: replaces missing letters ("it’s = it is / it has", "who’s = who is").',
    ],
    examTraps: [
      {
        trapTitle: "It's vs Its Trap (الخلط الوزاري الأكثر تكراراً)",
        incorrect: "The Sphinx lost it's nose during medieval cannon drills.",
        correct: 'The Sphinx lost its nose during medieval cannon drills.',
        explanation: '"Its" is a possessive determiner (no apostrophe!). "It\'s" is exclusively short for "it is" or "it has".',
      },
      {
        trapTitle: "Who's vs Whose Trap",
        incorrect: "The researcher who's paper won first prize will present tomorrow.",
        correct: 'The researcher whose paper won first prize will present tomorrow.',
        explanation: '"Whose" indicates possession. "Who\'s" means "who is" or "who has".',
      },
    ],
  },
  {
    id: 'capitalization',
    symbol: 'ABC',
    name: 'Capitalization Rules (قواعد كتابة الحروف الكبيرة)',
    nameAr: 'الحالات الإلزامية لاستخدام Capital Letters في أسئلة البوكليت',
    usageRules: [
      'The first letter of every sentence and direct quote.',
      'Proper nouns: names of people, specific geographic features, countries, cities, planets ("the Nile River", "Mars").',
      'Nationalities and languages: "Egyptian", "Arabic", "English", "Nubian".',
      'Days of the week, months, and public holidays: "Friday", "October", "Sinai Liberation Day". (Note: Seasons like spring/summer are lowercase unless personified).',
      'Official titles before a name: "President El-Sisi", "Doctor Magdi Yacoub" (lowercase when used alone: "the doctor").',
    ],
    examTraps: [
      {
        trapTitle: 'Seasons vs. Months Trap',
        incorrect: 'Tourism peaks in Egypt during Autumn and Winter.',
        correct: 'Tourism peaks in Egypt during autumn and winter, especially in November.',
        explanation: 'Names of seasons (summer, autumn, winter, spring) are NOT capitalized in English unless they begin a sentence.',
      },
    ],
  },
];

export const secondaryEssayGuide: EssayWritingGuide = {
  sectionTitle: 'Academic Essay Architecture (Thanaweya Amma 14-Mark Rubric)',
  sectionTitleAr: 'الهيكل البنائي للمقال الأكاديمي وفق نموذج الإجابة الوزاري (14 درجة)',
  hookStrategies: [
    {
      type: 'Provocative Rhetorical Question',
      typeAr: 'سؤال بلاغي مثير للتفكير',
      example: '“Can a nation truly modernize without safeguarding the monumental pillars of its past?”',
      tips: 'Engages the reader immediately without answering it too early in the introductory sentence.',
    },
    {
      type: 'Fascinating Historical or Statistical Fact',
      typeAr: 'حقيقة إحصائية أو تاريخية بارزة',
      example: '“Home to one-third of the world’s ancient antiquities, Egypt stands as an open-air museum confronting twenty-first-century climate shifts.”',
      tips: 'Grounds the essay in credible, objective reality and establishes immediate authority.',
    },
    {
      type: 'Universal Philosophical Quote or Epigram',
      typeAr: 'حكمة أو اقتباس فلسفي معتمد',
      example: '“As the great historian Herodotus chronicled centuries ago, ‘Egypt is the gift of the Nile,’ a statement whose modern ecological relevance resonates louder than ever.”',
      tips: 'Shows cultural literacy; always weave the quote organically into the prompt’s theme.',
    },
  ],
  thesisFormula: {
    description: 'The Thesis Statement is the central backbone of the essay. Placed at the very end of the introduction paragraph, it states your exact stance and outlines the 2 to 3 main arguments.',
    formula: 'Although [Opposing Counterargument], [Your Strong Claim] because [Reason 1] and [Reason 2].',
    example: '“Although digital globalization poses risks to local cultures, integrating smart technologies into Egyptian museums revitalizes national heritage by engaging younger generations and boosting international cultural diplomacy.”',
  },
  paragraphPEEL: [
    {
      letter: 'P',
      meaning: 'Point (Topic Sentence)',
      meaningAr: 'الفكرة الرئيسية للفقرة',
      explanation: 'States clearly what the paragraph will prove. Never start a body paragraph with raw statistics or isolated facts.',
      example: 'To begin with, investing in green renewable infrastructure drastically curtails national carbon emissions.',
    },
    {
      letter: 'E',
      meaning: 'Evidence (Concrete Proof & Data)',
      meaningAr: 'الدليل والشاهد الواقعي',
      explanation: 'Provides factual backing, real-world Egyptian projects (e.g., Benban Solar Park, Green Hydrogen projects in the Suez Canal).',
      example: 'For instance, Egypt’s Benban Solar Park in Aswan generates over 1,465 megawatts of clean energy annually.',
    },
    {
      letter: 'E',
      meaning: 'Explanation (Analysis & Significance)',
      meaningAr: 'التحليل والشرح والتعليل',
      explanation: 'Explains how the evidence proves the topic sentence and connects back to the overarching thesis statement.',
      example: 'This substantial output not only decreases dependency on fossil fuels but also insulates the economy against volatile energy prices.',
    },
    {
      letter: 'L',
      meaning: 'Link (Transition to Next Paragraph)',
      meaningAr: 'الربط والتمهيد للفكرة التالية',
      explanation: 'Rounds off the paragraph by reinforcing the core point and preparing the transition to the next body paragraph.',
      example: 'Consequently, sustainable energy serves as an indispensable prerequisite for lasting socioeconomic prosperity.',
    },
  ],
  transitionCategories: [
    {
      category: 'Additive & Expanding (إضافة فكرة جديدة)',
      categoryAr: 'علاوة على ذلك / بالإضافة إلى',
      words: ['Furthermore', 'Moreover', 'In addition to this', 'Not only... but also', 'Equally important'],
    },
    {
      category: 'Adversative & Contrast (التناقض والمقارنة)',
      categoryAr: 'على الجانب الآخر / بالرغم من',
      words: ['However', 'On the contrary', 'Conversely', 'Nevertheless', 'While', 'Whereas', 'Despite this'],
    },
    {
      category: 'Causal & Resultative (السبب والنتيجة)',
      categoryAr: 'وبناءً على ذلك / نتيجة لذلك',
      words: ['Consequently', 'As a direct result', 'Therefore', 'Thus', 'Owing to', 'Due to the fact that'],
    },
    {
      category: 'Exemplification & Emphasis (التدليل والتأكيد)',
      categoryAr: 'على سبيل المثال / بلا شك',
      words: ['For instance', 'To illustrate', 'Particularly', 'Undoubtedly', 'Indeed', 'Crucially'],
    },
    {
      category: 'Concluding Synthesis (الخاتمة والتلخيص)',
      categoryAr: 'وفي الختام / مجمل القول',
      words: ['In conclusion', 'To recapitulate', 'All things considered', 'Ultimately', 'Taking everything into account'],
    },
  ],
};

export const secondaryTranslationExercises: ContextualTranslationItem[] = [
  {
    id: 'trans_1',
    direction: 'en_to_ar',
    sourceText: 'Egypt has taken resolute strides toward sustainable green transition by establishing the Benban Solar Complex, positioning the nation as a regional beacon of renewable energy.',
    modelAnswer: 'لقد اتخذت مصر خطوات حاسمة نحو التحول الأخضر المستدام من خلال إنشاء مجمع بنبان للطاقة الشمسية، مما يضع الدولة كمنارة إقليمية للطاقة المتجددة.',
    keyVocabulary: [
      { en: 'resolute strides', ar: 'خطوات حاسمة / وثبات جادة' },
      { en: 'sustainable green transition', ar: 'التحول الأخضر المستدام' },
      { en: 'regional beacon', ar: 'منارة إقليمية / نموذج رائد' },
      { en: 'renewable energy', ar: 'الطاقة المتجددة' },
    ],
    grammaticalNotes: 'Notice the use of Present Perfect ("has taken") indicating an accomplished action with enduring present relevance, best rendered in Arabic using "لقد اتخذت".',
    commonPitfall: 'Translating "strides" literally as "خطوات واسعة بالقدم" instead of the idiomatic "خطوات حاسمة / وثبات ملموسة".',
  },
  {
    id: 'trans_2',
    direction: 'en_to_ar',
    sourceText: 'Artificial intelligence cannot replace authentic human teachers because critical thinking, empathy, and moral guidance stem from personal interaction rather than mere algorithmic computation.',
    modelAnswer: 'لا يمكن للذكاء الاصطناعي أن يحل محل المعلمين الحقيقيين، لأن التفكير النقدي والتعاطف والتوجيه الأخلاقي تنبع جميعها من التفاعل الإنساني الشخصي وليس مجرد الحسابات الخوارزمية.',
    keyVocabulary: [
      { en: 'authentic teachers', ar: 'المعلمون الحقيقيون / التربويون' },
      { en: 'moral guidance', ar: 'التوجيه الأخلاقي والقيمي' },
      { en: 'stem from', ar: 'تنبع من / ترجع إلى' },
      { en: 'algorithmic computation', ar: 'الحسابات والمعالجات الخوارزمية' },
    ],
    grammaticalNotes: 'The phrase "stem from personal interaction rather than..." translates smoothly to "تنبع من... وليس مجرد...".',
    commonPitfall: 'Using "حسابات اللوغاريتمات" for "algorithmic computation" instead of "الحسابات الخوارزمية".',
  },
  {
    id: 'trans_3',
    direction: 'ar_to_en',
    sourceText: 'تلعب المشروعات القومية الكبرى دوراً حيوياً في توفير فرص العمل للشباب ودفع عجلة التنمية الاقتصادية في ظل التحديات العالمية الراهنة.',
    modelAnswer: 'Mega national projects play a vital role in creating job opportunities for the youth and driving economic development amidst current global challenges.',
    keyVocabulary: [
      { en: 'mega national projects', ar: 'المشروعات القومية الكبرى' },
      { en: 'play a vital role', ar: 'تلعب دوراً حيوياً' },
      { en: 'driving economic development', ar: 'دفع عجلة التنمية الاقتصادية' },
      { en: 'amidst current global challenges', ar: 'في ظل التحديات العالمية الراهنة' },
    ],
    grammaticalNotes: 'In English, "المشروعات القومية الكبرى" places adjectives before the noun: "Mega national projects". The preposition phrase "in creating" correctly uses gerund after preposition.',
    commonPitfall: 'Translating "دفع عجلة التنمية" literally as "pushing the wheel of development". The standard idiomatic English idiom is "driving economic development / boosting economic progress".',
  },
  {
    id: 'trans_4',
    direction: 'ar_to_en',
    sourceText: 'إن الحفاظ على الهوية الثقافية والتراث الحضاري لا يتعارض إطلاقاً مع تبني أحدث وسائل التكنولوجيا والابتكار الرقمي.',
    modelAnswer: 'Preserving cultural identity and civilizational heritage does not contradict at all embracing the latest technological advancements and digital innovation.',
    keyVocabulary: [
      { en: 'preserving cultural identity', ar: 'الحفاظ على الهوية الثقافية' },
      { en: 'civilizational heritage', ar: 'التراث الحضاري' },
      { en: 'does not contradict', ar: 'لا يتعارض / لا يتنافى' },
      { en: 'digital innovation', ar: 'الابتكار والتحول الرقمي' },
    ],
    grammaticalNotes: 'Starting an Arabic sentence with "إن" requires no literal English equivalent; rather, the English sentence begins with the gerund subject "Preserving cultural identity...".',
    commonPitfall: 'Translating "إن" as "Indeed" or "That" at the beginning of the sentence. In formal academic English, simply use the substantive subject.',
  },
  {
    id: 'trans_5',
    direction: 'ar_to_en',
    sourceText: 'يجب على أفراد المجتمع ترشيد استهلاك المياه والكهرباء لضمان حقوق الأجيال القادمة في الموارد الطبيعية.',
    modelAnswer: 'Community members must rationalize the consumption of water and electricity to safeguard the rights of future generations to natural resources.',
    keyVocabulary: [
      { en: 'rationalize consumption', ar: 'يرشد الاستهلاك' },
      { en: 'safeguard rights', ar: 'يضمن / يصون الحقوق' },
      { en: 'future generations', ar: 'الأجيال القادمة' },
      { en: 'natural resources', ar: 'الموارد الطبيعية' },
    ],
    grammaticalNotes: 'Modal verb "must" followed by bare infinitive "rationalize". The infinitive of purpose "to safeguard / to ensure" translates "لضمان".',
    commonPitfall: 'Using "guidance" for "ترشيد". In the context of utility consumption, "rationalize consumption" or "curb waste" is the authentic term.',
  },
];
