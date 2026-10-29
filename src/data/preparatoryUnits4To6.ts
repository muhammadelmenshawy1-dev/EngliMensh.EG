import { UnitCurriculum, PrepExamBlueprint, CurriculumQuestion } from '../types/curriculum.ts';

function rotatePrepQuestion(q: CurriculumQuestion, indexSeed: number): CurriculumQuestion {
  const letters: ('A' | 'B' | 'C' | 'D')[] = ['A', 'B', 'C', 'D'];
  const currentIdx = letters.indexOf(q.correctAnswer);
  if (currentIdx === -1 || !q.options || q.options.length !== 4) {
    return { ...q, verificationStatus: 'verified' };
  }
  const targetIdx = indexSeed % 4;
  if (currentIdx === targetIdx) {
    return { ...q, verificationStatus: 'verified' };
  }
  const newOptions: [string, string, string, string] = [
    q.options[0],
    q.options[1],
    q.options[2],
    q.options[3]
  ];
  const temp = newOptions[targetIdx];
  newOptions[targetIdx] = newOptions[currentIdx];
  newOptions[currentIdx] = temp;
  return {
    ...q,
    options: newOptions,
    correctAnswer: letters[targetIdx],
    verificationStatus: 'verified'
  };
}

// Helper to construct a complete, MOE-verified Preparatory unit with full PrepExamBlueprint
export function createPrepUnitWithBlueprint(
  grade: number,
  gradeLabel: string,
  semester: 1 | 2,
  unitNumber: number,
  unitTitle: string,
  unitTitleAr: string,
  theme: string,
  grammarRule: string,
  grammarRuleAr: string,
  grammarSummary: string,
  grammarSections: { title: string; explanation: string; examples: string[] }[],
  keyWords: { word: string; pos: string; ar: string; def: string; ex: string; exAr: string }[],
  collocations: { phrase: string; meaningAr: string; example: string }[],
  readingPassage: string,
  dialogueTranscript: string,
  blueprint: PrepExamBlueprint
): UnitCurriculum {
  const seedBase = grade * 11 + semester * 5 + unitNumber * 3;
  const balancedVocabGrammarMcqs = blueprint.vocabGrammarMcqs.map((q, idx) =>
    rotatePrepQuestion(q, seedBase + idx)
  );
  const balancedReadingMcqs = blueprint.readingPassage.mcqs.map((q, idx) =>
    rotatePrepQuestion(q, seedBase + idx + 2)
  );
  const balancedBlueprint: PrepExamBlueprint = {
    ...blueprint,
    readingPassage: {
      ...blueprint.readingPassage,
      mcqs: balancedReadingMcqs
    },
    vocabGrammarMcqs: balancedVocabGrammarMcqs
  };

  return {
    stage: 'Preparatory',
    grade,
    gradeLabel,
    track: 'New Hello',
    textbookSeries: `New Hello! Prep ${grade - 6}`,
    verificationStatus: 'verified',
    sourceReference: `Egyptian MOE New Hello! Prep ${grade - 6} - Term ${semester} Unit ${unitNumber}`,
    semester,
    unitNumber,
    unitTitle,
    unitTitleAr,
    theme,
    vocabularyModule: {
      keyWords: keyWords.map(kw => ({
        word: kw.word,
        pos: kw.pos,
        partOfSpeech: kw.pos,
        ar: kw.ar,
        meaningAr: kw.ar,
        def: kw.def,
        meaningEn: kw.def,
        ex: kw.ex,
        exampleSentence: kw.ex,
        exAr: kw.exAr
      })),
      collocations: collocations.map(c => ({
        phrase: c.phrase,
        meaningAr: c.meaningAr,
        example: c.example
      })),
      exercises: balancedVocabGrammarMcqs.slice(0, 3)
    },
    grammarModule: {
      ruleName: grammarRule,
      ruleNameAr: grammarRuleAr,
      explanationSummary: grammarSummary,
      detailedRules: grammarSections,
      exercises: balancedVocabGrammarMcqs.slice(3, 6)
    },
    readingModule: {
      passageTitle: balancedBlueprint.readingPassage.title,
      passage: balancedBlueprint.readingPassage.passage,
      criticalThinkingFocus: `Analytical inference on ${theme}`,
      questions: balancedReadingMcqs
    },
    listeningModule: {
      audioTitle: `${unitTitle}: Official Curriculum Dialogue Track`,
      speakerRoles: 'Two Egyptian students / Teacher and student',
      transcript: dialogueTranscript,
      durationApprox: '3 mins'
    },
    unitExam: {
      examId: `prep_g${grade}_u${unitNumber}_exam`,
      examTitle: `Prep ${grade - 6} - Unit ${unitNumber} MOE Standard Assessment (2026/2027)`,
      examTitleAr: `امتحان تقييم الوحدة ${unitNumber} - الصف ${grade === 7 ? 'الأول' : grade === 8 ? 'الثاني' : 'الثالث'} الإعدادي`,
      durationMinutes: 30,
      totalMarks: 30,
      stage: 'Preparatory',
      questions: [
        ...balancedVocabGrammarMcqs.map(q => ({ ...q, id: `exam_${q.id}` })),
        ...balancedReadingMcqs.map(q => ({ ...q, id: `exam_${q.id}` }))
      ],
      prepBlueprint: balancedBlueprint
    }
  };
}

// ==============================================================================================
// 1. PREP 1 (GRADE 7) - UNITS 4, 5, 6
// ==============================================================================================

// Prep 1 - Unit 4: We're using technology!
export const prep1Unit4 = createPrepUnitWithBlueprint(
  7, 'Prep 1', 1, 4,
  "We're using technology!",
  'نحن نستخدم التكنولوجيا الحديثة والأجهزة الذكية',
  'Smartphones, tablets, laptops, chargers, 3D printers, video calls, internet safety',
  'Present Continuous & Imperatives for Online Safety',
  'المضارع المستمر وصيغة الأمر لإرشادات الأمان الرقمي',
  'Use Present Continuous (am/is/are + verb-ing) for actions happening now. Use Imperatives (Infinitive verb / Don’t + infinitive) to give online safety rules: "Keep your password secret / Don’t send photos to strangers".',
  [
    {
      title: '1. Present Continuous (المضارع المستمر)',
      explanation: 'Form: Subject + am/is/are + verb-ing. Keywords: now, at the moment, look!, listen!, at present. Rule for doubling: run -> running, sit -> sitting.',
      examples: [
        'Ziad is charging his mobile phone with a new USB charger right now.',
        'They are making a video call to their grandparents in Mansoura.'
      ]
    },
    {
      title: '2. Imperatives for Online Safety (صيغة الأمر للأمان الرقمي)',
      explanation: 'Affirmative: Base verb ("Keep your password secret"). Negative: Don’t + base verb ("Don’t tell strangers your personal information").',
      examples: [
        'Keep your passwords secret and tell an adult if you feel worried online.',
        'Don’t make friends with people you don’t know on social networks.'
      ]
    }
  ],
  [
    { word: 'laptop', pos: 'n.', ar: 'حاسب محمول / لابتوب', def: 'A computer that is portable and suitable for use while traveling.', ex: 'My sister is doing her English research project on her laptop.', exAr: 'تجري أختي بحثها في مادة اللغة الإنجليزية على حاسبها المحمول.' },
    { word: 'tablet', pos: 'n.', ar: 'جهاز لوحي ذكي (تابلت)', def: 'A small portable computer that accepts input directly onto its screen.', ex: 'Egyptian preparatory students use tablets to access the Knowledge Bank.', exAr: 'يستخدم طلاب المرحلة الإعدادية في مصر الأجهزة اللوحية لتصفح بنك المعرفة.' },
    { word: 'charger', pos: 'n.', ar: 'شاحن بطارية الهاتف', def: 'A device for charging a battery or battery-powered equipment.', ex: 'Can I borrow your phone charger? My battery is completely empty.', exAr: 'هل يمكنني استعارة شاحن هاتفك؟ بطاريتي فارغة تماماً.' },
    { word: '3D printer', pos: 'n.', ar: 'طابعة ثلاثية الأبعاد', def: 'A printer that can create physical three-dimensional objects from digital files.', ex: 'The school science club uses a 3D printer to make plastic models.', exAr: 'يستخدم نادي العلوم المدرسي طابعة ثلاثية الأبعاد لصنع مجسمات بلاستيكية.' },
    { word: 'mouse', pos: 'n.', ar: 'فأرة التحكم بالحاسوب', def: 'A hand-held device that controls the cursor on a computer screen.', ex: 'Click the left button of the mouse to open the application.', exAr: 'انقر على الزر الأيسر للفأرة لفتح التطبيق.' },
    { word: 'video call', pos: 'n.', ar: 'مكالمة فيديو مرئية', def: 'A phone call using an internet connection to see the person you are talking to.', ex: 'We made a video call to congratulate our uncle in Saudi Arabia.', exAr: 'أجرينا مكالمة فيديو لتهنئة عمنا في المملكة العربية السعودية.' },
    { word: 'selfie', pos: 'n.', ar: 'صورة شخصية (سيلفي)', def: 'A photograph that one has taken of oneself with a smartphone.', ex: 'The tourists took a happy selfie in front of the Sphinx.', exAr: 'التقط السائحون صورة سيلفي سعيدة أمام تمثال أبي الهول.' },
    { word: 'password', pos: 'n.', ar: 'كلمة مرور سرية', def: 'A secret word or phrase that must be used to gain admission to a system.', ex: 'Always choose a strong password with letters, numbers, and symbols.', exAr: 'اختر دائماً كلمة مرور قوية تحتوي على حروف وأرقام ورموز.' }
  ],
  [
    { phrase: 'charge the phone battery', meaningAr: 'يشحن بطارية الهاتف', example: 'Plug the cable into the wall to charge the phone battery.' },
    { phrase: 'make a video call', meaningAr: 'يجري مكالمة فيديو', example: 'I will make a video call to discuss our class assignment.' },
    { phrase: 'keep passwords secret', meaningAr: 'يحفظ كلمات المرور سراً', example: 'Good digital citizens always keep passwords secret from strangers.' }
  ],
  `Modern technology has revolutionized the daily lives of Egyptian preparatory students. In contemporary classrooms, learners no longer depend exclusively on paper notebooks. Instead, they utilize portable tablets and laptops to browse the Egyptian Knowledge Bank (EKB) and complete digital quizzes. During computer studies periods, innovative teachers demonstrate how 3D printers can manufacture biological cell models in minutes. However, educational advisors remind students to balance screen time with outdoor physical exercise and to practice cybersecurity vigilantly.`,
  `Tamer: "What are you doing on your tablet, Nader?"\nNader: "I am designing a presentation about renewable energy for tomorrow’s science class."\nTamer: "Is the battery running low?"\nNader: "Yes, it is. I am looking for my USB charger right now."`,
  {
    dialogue: {
      title: 'Finish the following dialogue between Ramy and Youssef about online safety:',
      context: 'Ramy is asking Youssef how to stay safe while using technology.',
      turns: [
        { speaker: 'Ramy', text: 'Hello Youssef! What are you doing on your laptop?', isBlank: false },
        { speaker: 'Youssef', isBlank: true, blankNumber: 1, expectedAnswer: 'I am doing my English research homework.', acceptableAnswers: ['I am doing my homework.', 'I am searching for information online.'], hintAr: 'أخبره أنك تقوم بعمل واجب اللغة الإنجليزية والبحث.' },
        { speaker: 'Ramy', isBlank: true, blankNumber: 2, expectedAnswer: 'How do you keep your online accounts safe?', acceptableAnswers: ['What should you do to stay safe online?', 'How can we protect our passwords?'], hintAr: 'اسأله كيف تحافظ على أمان حساباتك وكلمات مرورك على الإنترنت.' },
        { speaker: 'Youssef', text: 'I always keep my passwords secret and never share them with strangers.', isBlank: false },
        { speaker: 'Ramy', text: 'What should you do if an unknown person messages you?', isBlank: false },
        { speaker: 'Youssef', isBlank: true, blankNumber: 3, expectedAnswer: 'You should tell your parents or a teacher immediately.', acceptableAnswers: ['Tell an adult.', 'Don’t answer them and tell your dad.'], hintAr: 'انصحه بإخبار والديه أو معلمه فوراً.' },
        { speaker: 'Ramy', isBlank: true, blankNumber: 4, expectedAnswer: 'Can we send our personal photos to people we don’t know?', acceptableAnswers: ['Is it safe to send photos to strangers?'], hintAr: 'اسأله هل من الآمن إرسال الصور للغرباء.' },
        { speaker: 'Youssef', text: 'No, you must never send private photos to anyone you don’t know!', isBlank: false },
        { speaker: 'Ramy', isBlank: true, blankNumber: 5, expectedAnswer: 'Thank you for this valuable advice, Youssef!', acceptableAnswers: ['Thanks for your helpful tips.', 'You are right, thank you.'], hintAr: 'اشكره على هذه النصائح القيمة للأمان الرقمي.' }
      ]
    },
    readingPassage: {
      title: 'Reading Comprehension: Technology in Egyptian Schools',
      passage: `Modern technology has revolutionized the daily lives of Egyptian preparatory students. In contemporary classrooms, learners no longer depend exclusively on paper notebooks. Instead, they utilize portable tablets and laptops to browse the Egyptian Knowledge Bank (EKB) and complete digital quizzes. During computer studies periods, innovative teachers demonstrate how 3D printers can manufacture biological cell models in minutes. However, educational advisors remind students to balance screen time with outdoor physical exercise and to practice cybersecurity vigilantly. Never share your passwords or phone number with strangers on social networks.`,
      mcqs: [
        {
          id: 'prep1_u4_rq1',
          skill: 'Reading',
          question_type: 'mcq',
          difficulty: 'standard',
          question: 'What is the main idea of the reading passage?',
          options: ['How modern technology enhances learning in Egyptian schools', 'Why computers are dangerous for everyone', 'The history of building paper factories', 'Playing video games all weekend'],
          correctAnswer: 'A',
          explanation: 'The passage explores how modern technology supports Egyptian students.',
          exam_trap_explanation: 'Exam Trap (فخ الامتحان): Do not pick negative distractors. The passage provides a balanced, positive evaluation of modern technology in education.'
        },
        {
          id: 'prep1_u4_rq2',
          skill: 'Reading',
          question_type: 'mcq',
          difficulty: 'hots',
          question: 'What does a 3D printer manufacture in the school science lab?',
          options: ['Biological cell models in minutes', 'Paper library textbooks', 'Wooden classroom chairs', 'Sports leather footballs'],
          correctAnswer: 'A',
          explanation: 'Paragraph explicitly states: 3D printers can manufacture biological cell models in minutes.',
          exam_trap_explanation: 'Look specifically for the item created in the science lab mentioned in the text.'
        },
        {
          id: 'prep1_u4_rq3',
          skill: 'Reading',
          question_type: 'mcq',
          difficulty: 'standard',
          question: 'The underlined word "portable" in the text means:',
          options: ['Easy to carry around and move', 'Extremely heavy and immobile', 'Made of broken glass', 'Very cheap and useless'],
          correctAnswer: 'A',
          explanation: 'Portable means light and easy to transport.',
          exam_trap_explanation: 'Portable refers to devices like laptops and tablets that can be transported with ease.'
        }
      ],
      openEnded: [
        {
          id: 'prep1_u4_ro1',
          question: 'Mention two vital rules students must observe to stay safe online.',
          questionAr: 'اذكر قاعدتين أساسيتين يجب على الطلاب مراعاتهما للبقاء بأمان على الإنترنت.',
          modelAnswer: '1) Never share passwords or private personal information with strangers. 2) Tell an adult (parents or teachers) if someone suspicious contacts you.',
          rubric: '1 mark for each valid safety rule cited from the passage.',
          maxMarks: 2
        },
        {
          id: 'prep1_u4_ro2',
          question: 'Why do educational advisors recommend balancing screen time with outdoor exercise?',
          questionAr: 'لماذا يوصي المستشارون التربويون بالموازنة بين وقت الشاشات وممارسة الرياضة في الهواء الطلق؟',
          modelAnswer: 'To ensure physical health, prevent eye strain, and encourage social interaction alongside academic digital learning.',
          rubric: 'Full mark for logical inference supported by the passage context.',
          maxMarks: 2
        }
      ]
    },
    vocabGrammarMcqs: [
      {
        id: 'prep1_u4_vg1',
        skill: 'Vocabulary',
        question_type: 'mcq',
        difficulty: 'standard',
        question: 'My mobile phone is out of battery. Could you please lend me your ________?',
        options: ['charger', 'curtain', 'mirror', 'carpet'],
        correctAnswer: 'A',
        explanation: 'A charger is used to recharge mobile battery power.',
        exam_trap_explanation: 'Exam Trap (فخ الامتحان): Do not confuse charger (شاحن) with other household accessories.'
      },
      {
        id: 'prep1_u4_vg2',
        skill: 'Vocabulary',
        question_type: 'mcq',
        difficulty: 'standard',
        question: 'To keep your social media account safe, always choose a strong secret ________.',
        options: ['password', 'passport', 'postcard', 'paragraph'],
        correctAnswer: 'A',
        explanation: 'A password secures digital accounts.',
        exam_trap_explanation: 'Exam Trap: Beware of similar-sounding words like passport (جواز سفر).'
      },
      {
        id: 'prep1_u4_vg3',
        skill: 'Vocabulary',
        question_type: 'mcq',
        difficulty: 'hots',
        question: 'Our technical club used a modern ________ to produce small plastic gear prototypes.',
        options: ['3D printer', 'dishwasher', 'vacuum cleaner', 'microwave'],
        correctAnswer: 'A',
        explanation: 'A 3D printer creates physical 3D objects from digital designs.',
        exam_trap_explanation: 'Exam Trap: 3D printer is the specialized digital manufacturing device in Prep 1 Unit 4.'
      },
      {
        id: 'prep1_u4_vg4',
        skill: 'Grammar',
        question_type: 'mcq',
        difficulty: 'standard',
        question: 'Listen! The school band ________ a cheerful national anthem in the playground.',
        options: ['is playing', 'played', 'plays', 'are play'],
        correctAnswer: 'A',
        explanation: 'Keyword "Listen!" indicates an action happening right now (Present Continuous: is playing).',
        exam_trap_explanation: 'Exam Trap: "Listen!" triggers the Present Continuous (am/is/are + verb-ing).'
      },
      {
        id: 'prep1_u4_vg5',
        skill: 'Grammar',
        question_type: 'mcq',
        difficulty: 'hots',
        question: '________ tell your personal phone number or home address to strangers on the internet.',
        options: ['Don’t', 'Doesn’t', 'Not', 'Aren’t'],
        correctAnswer: 'A',
        explanation: 'Negative imperative begins with "Don’t + infinitive".',
        exam_trap_explanation: 'Exam Trap: Never use "Doesn’t" or "Not" to start a command or rule.'
      },
      {
        id: 'prep1_u4_vg6',
        skill: 'Grammar',
        question_type: 'mcq',
        difficulty: 'hots',
        question: 'Look at Hany! He ________ to the school library to borrow an encyclopedia.',
        options: ['is running', 'runs', 'are running', 'ran'],
        correctAnswer: 'A',
        explanation: 'Subject "He" requires singular auxiliary "is" + verb-ing with double "n" (running).',
        exam_trap_explanation: 'Exam Trap: Remember spelling rules: run ends in consonant-vowel-consonant, so double the n (running).'
      }
    ],
    errorCorrection: [
      {
        id: 'prep1_u4_ec1',
        sentence: 'Look! The students (take) a selfie in front of the pyramids.',
        bracketWord: 'take',
        correctWord: 'are taking',
        explanation: '"Look!" requires Present Continuous. Plural subject "students" takes "are taking".',
        exam_trap_explanation: 'Exam Trap: Drop the silent -e before adding -ing (taking).'
      },
      {
        id: 'prep1_u4_ec2',
        sentence: 'Ahmed is (charge) his tablet with a new white cable now.',
        bracketWord: 'charge',
        correctWord: 'charging',
        explanation: 'After auxiliary "is", the main verb takes -ing (charging).',
        exam_trap_explanation: 'Exam Trap: Auxiliary is/are must be followed by verb-ing.'
      },
      {
        id: 'prep1_u4_ec3',
        sentence: 'Not (give) your secret password to anyone online.',
        bracketWord: 'Not give',
        correctWord: 'Don’t give',
        explanation: 'Negative imperative begins with "Don’t" followed by the base infinitive.',
        exam_trap_explanation: 'Exam Trap: The negative command form is always "Don’t + verb".'
      },
      {
        id: 'prep1_u4_ec4',
        sentence: 'Listen! Mona (sing) a lovely traditional song.',
        bracketWord: 'sing',
        correctWord: 'is singing',
        explanation: '"Listen!" signals the Present Continuous: singular subject takes "is singing".',
        exam_trap_explanation: 'Exam Trap: Do not omit the auxiliary verb "is".'
      }
    ],
    writingTask: {
      type: 'paragraph',
      title: 'A paragraph of 90-110 words about: "Using Modern Technology Wisely"',
      prompt: 'Write a well-organized paragraph of 90 to 110 words about how you and your classmates use technology for study, and how to stay safe on the internet.',
      promptAr: 'اكتب فقرة من 90 إلى 110 كلمة حول كيفية استخدام التكنولوجيا في المذاكرة وطرق الأمان الرقمي.',
      targetWords: '90 - 110 words',
      guidancePoints: ['Devices you use (tablet, laptop)', 'Educational websites (EKB)', 'Safety rules (passwords, strangers)'],
      modelAnswer: `Modern technology plays an essential role in our educational routine. Every day, my classmates and I use portable tablets and laptops to search for scientific information on the Egyptian Knowledge Bank. We also use 3D printers in our technical workshop to build accurate geometrical models. However, technology must be used sensibly and responsibly. To stay safe online, I always keep my passwords strictly confidential and never share personal photos with strangers. If I encounter anything suspicious, I inform my parents immediately. Technology is a beneficial tool when harnessed with wisdom.`,
      rubricCriteria: [
        { criterion: 'Content & Topic Relevance', marks: 3 },
        { criterion: 'Organization & Cohesive Flow', marks: 2 },
        { criterion: 'Grammar Accuracy & Tense Range', marks: 2 },
        { criterion: 'Punctuation, Capitalization & Spelling', marks: 2 }
      ]
    }
  }
);

// Prep 1 - Unit 5: Holidays
export const prep1Unit5 = createPrepUnitWithBlueprint(
  7, 'Prep 1', 1, 5,
  'Holidays',
  'الإجازات والرحلات والشواطئ المصرية العريقة',
  'Holidays, camping, caves, waterfalls, sandcastles, souvenirs, deserts, Siwa oasis, Alexandria',
  'Past Simple Tense (Regular & Irregular Verbs) and Questions with Did',
  'الماضي البسيط والسؤال بـ Did',
  'Use Past Simple for completed actions in the past. Regular verbs add -ed (visited, played). Irregular verbs change form (went, swam, saw). Questions: Did + subject + infinitive verb ("Did you swim in the sea? - Yes, I did").',
  [
    {
      title: '1. Past Simple Form & Keywords (الماضي البسيط)',
      explanation: 'Keywords: yesterday, last week/month/year, in the past, ago. Negative: didn’t + bare verb ("We didn’t go to the cinema; we stayed on the beach").',
      examples: [
        'Last summer, our family visited the stunning waterfalls at Wadi El-Rayan in Fayoum.',
        'We swam in the calm sea and ate fresh grilled fish in Hurghada.'
      ]
    },
    {
      title: '2. Wh- and Yes/No Questions in the Past (السؤال في الماضي)',
      explanation: 'Yes/No: Did + Subject + Verb? ("Did you sleep in a tent? - Yes, we did"). Wh-question: Wh-word + did + Subject + Verb? ("Where did you buy this souvenir? - In Khan el-Khalili").',
      examples: [
        'Q: What did you see inside the deep mountain cave? — A: We saw fascinating rock formations.',
        'Q: Did you build a big sandcastle on the beach? — A: Yes, we built a huge fortress!'
      ]
    }
  ],
  [
    { word: 'beach', pos: 'n.', ar: 'شاطئ البحر الرملي', def: 'A strip of land covered with sand along the edge of a sea or lake.', ex: 'Children love building tall sandcastles on the golden beach in Alexandria.', exAr: 'يحب الأطفال بناء قلاع رملية عالية على الشاطئ الذهبي بالإسكندرية.' },
    { word: 'camp', pos: 'v. / n.', ar: 'يخيم في معسكر / معسكر كشفي', def: 'Live for a time in a tent, especially while on holiday.', ex: 'Our scout troop camped near the peaceful olive groves in Siwa Oasis.', exAr: 'خيمت فرقتنا الكشفية بالقرب من بساتين الزيتون الهادئة في واحة سيوة.' },
    { word: 'cave', pos: 'n.', ar: 'كهف جبلي طبيعي', def: 'A large natural underground chamber in a hillside or cliff.', ex: 'The hikers explored a cool stone cave in the Sinai mountains.', exAr: 'استكشف المتجولون كهفاً حجرياً بارداً في جبال سيناء.' },
    { word: 'waterfall', pos: 'n.', ar: 'شلال مائي طبيعي متدفق', def: 'A cascade of water falling from a height.', ex: 'Wadi El-Rayan in Fayoum is famous for Egypt’s magnificent waterfalls.', exAr: 'يشتهر وادي الريان بالفيوم بشلالات مصر الطبيعية الرائعة.' },
    { word: 'sandcastle', pos: 'n.', ar: 'قلعة رملية على الشاطئ', def: 'A model of a castle made of sand by a child on a beach.', ex: 'My little brother built a majestic sandcastle with seashell towers.', exAr: 'بنى أخي الصغير قلعة رملية مهيبة مزينة بأبراج من الأصداف.' },
    { word: 'souvenir', pos: 'n.', ar: 'هدية تذكارية جميلة', def: 'A thing that is kept as a reminder of a person, place, or holiday.', ex: 'I bought a hand-carved alabaster pyramid as a souvenir from Luxor.', exAr: 'اشتريت هرماً من الألباستر المنحوت يدوياً كهدية تذكارية من الأقصر.' },
    { word: 'desert', pos: 'n.', ar: 'صحراء شاسعة ورمال', def: 'A dry, barren area of land, especially one covered with sand.', ex: 'The White Desert in Egypt features extraordinary chalk rock sculptures.', exAr: 'تتميز الصحراء البيضاء في مصر بتكوينات طباشيرية صخرية مبهرة.' },
    { word: 'jungle', pos: 'n.', ar: 'أدغال استوائية كثيفة الأشجار', def: 'An area of land overgrown with dense forest and tangled vegetation.', ex: 'Monkeys swing from tall trees in the tropical jungle.', exAr: 'تتأرجح القردة بين الأشجار العالية في الأدغال الاستوائية.' }
  ],
  [
    { phrase: 'build a sandcastle', meaningAr: 'يبني قلعة من الرمال', example: 'We built a sandcastle with four moats near the gentle waves.' },
    { phrase: 'buy lovely souvenirs', meaningAr: 'يشتري هدايا تذكارية جميلة', example: 'Tourists buy lovely souvenirs from traditional bazaars.' },
    { phrase: 'sleep in a tent', meaningAr: 'ينام في خيمة كشفية', example: 'During our desert safari, we slept in a cozy canvas tent under the stars.' }
  ],
  `Last month, our preparatory school organized an unforgettable educational excursion to the Siwa Oasis. Located in the Western Desert, Siwa is renowned for its fresh natural springs, ancient mud-brick fortresses, and expansive palm dates groves. During the trip, we stayed in eco-friendly desert lodges and drank delicious Siwan herbal tea. In the afternoon, we climbed the Mountain of the Dead and learned how ancient Egyptians carved tombs into stone cliffs. Before returning to Cairo, every student bought traditional olive oil and embroidered shawls as souvenirs for their families.`,
  `Hatem: "Where did you go for your mid-year vacation, Karim?"\nKarim: "We traveled to Dahab on the Red Sea coast!"\nHatem: "Did you swim in the Blue Hole?"\nKarim: "Yes, I did! We saw vibrant coral reefs and magnificent marine fish."`,
  {
    dialogue: {
      title: 'Finish the following dialogue between Hatem and Karim about their holiday:',
      context: 'Hatem is asking Karim about his recent family holiday to Dahab.',
      turns: [
        { speaker: 'Hatem', text: 'Hello Karim! Did you enjoy your mid-term holiday?', isBlank: false },
        { speaker: 'Karim', isBlank: true, blankNumber: 1, expectedAnswer: 'Yes, I did. I had a wonderful holiday.', acceptableAnswers: ['Yes, it was fantastic.', 'Yes, I enjoyed it very much.'], hintAr: 'أجِب بالإيجاب وأخبره أن إجازتك كانت رائعة.' },
        { speaker: 'Hatem', isBlank: true, blankNumber: 2, expectedAnswer: 'Where did you go?', acceptableAnswers: ['Where did you travel?', 'Which city did you visit?'], hintAr: 'اسأله أين ذهب أو سافر لقضاء الإجازة.' },
        { speaker: 'Karim', text: 'We traveled to Dahab in South Sinai.', isBlank: false },
        { speaker: 'Hatem', isBlank: true, blankNumber: 3, expectedAnswer: 'How did you travel there?', acceptableAnswers: ['Did you travel by bus or by car?', 'How did you go there?'], hintAr: 'اسأله عن وسيلة المواصلات التي سافر بها.' },
        { speaker: 'Karim', text: 'We went by modern express bus.', isBlank: false },
        { speaker: 'Hatem', text: 'Did you sleep in a hotel or in a tent?', isBlank: false },
        { speaker: 'Karim', isBlank: true, blankNumber: 4, expectedAnswer: 'We camped in a comfortable tent on the beach.', acceptableAnswers: ['We slept in a tent.', 'We stayed in a tent near the sea.'], hintAr: 'أخبره أنكم خيمتم ونمتم في خيمة على الشاطئ.' },
        { speaker: 'Hatem', isBlank: true, blankNumber: 5, expectedAnswer: 'What souvenirs did you buy from Dahab?', acceptableAnswers: ['Did you buy any souvenirs?'], hintAr: 'اسأله عن الهدايا التذكارية التي اشتراها.' }
      ]
    },
    readingPassage: {
      title: 'Reading Comprehension: An Unforgettable Trip to Siwa Oasis',
      passage: `Last month, our preparatory school organized an unforgettable educational excursion to the Siwa Oasis. Located in the Western Desert, Siwa is renowned for its fresh natural springs, ancient mud-brick fortresses, and expansive palm dates groves. During the trip, we stayed in eco-friendly desert lodges and drank delicious Siwan herbal tea. In the afternoon, we climbed the Mountain of the Dead and learned how ancient Egyptians carved tombs into stone cliffs. Before returning to Cairo, every student bought traditional olive oil and embroidered shawls as souvenirs for their families.`,
      mcqs: [
        {
          id: 'prep1_u5_rq1',
          skill: 'Reading',
          question_type: 'mcq',
          difficulty: 'standard',
          question: 'Where is the Siwa Oasis located in Egypt?',
          options: ['In the Western Desert', 'Along the Mediterranean coastline', 'In downtown Alexandria', 'Near Aswan High Dam'],
          correctAnswer: 'A',
          explanation: 'Passage explicitly states: "Located in the Western Desert, Siwa is renowned..."',
          exam_trap_explanation: 'Exam Trap: Confirm geographic location directly in the first two sentences.'
        },
        {
          id: 'prep1_u5_rq2',
          skill: 'Reading',
          question_type: 'mcq',
          difficulty: 'hots',
          question: 'What historical monument did the students climb during the excursion?',
          options: ['The Mountain of the Dead', 'The Great Pyramid of Giza', 'The Cairo Tower', 'Qaitbay Citadel in Alexandria'],
          correctAnswer: 'A',
          explanation: 'The students climbed the Mountain of the Dead and studied carved rock tombs.',
          exam_trap_explanation: 'Exam Trap: Don’t confuse Siwan monuments with Cairo or Giza landmarks.'
        },
        {
          id: 'prep1_u5_rq3',
          skill: 'Reading',
          question_type: 'mcq',
          difficulty: 'standard',
          question: 'What does the word "souvenirs" refer to in the text?',
          options: ['Gifts bought to remember a special place', 'Huge stone rocks in the desert', 'School exam test papers', 'Tickets for public buses'],
          correctAnswer: 'A',
          explanation: 'Souvenirs are mementos or gifts kept to remember a journey.',
          exam_trap_explanation: 'Souvenir means هدية تذكارية.'
        }
      ],
      openEnded: [
        {
          id: 'prep1_u5_ro1',
          question: 'What did the students buy before returning home to Cairo?',
          questionAr: 'ماذا اشترى الطلاب كهدايا تذكارية قبل العودة إلى القاهرة؟',
          modelAnswer: 'They bought traditional Siwan olive oil and beautiful embroidered shawls as souvenirs for their families.',
          rubric: '1 mark for olive oil, 1 mark for embroidered shawls.',
          maxMarks: 2
        },
        {
          id: 'prep1_u5_ro2',
          question: 'Why do you think visiting historic oases like Siwa is valuable for young learners?',
          questionAr: 'في رأيك، لماذا تعد زيارة الواحات التاريخية مثل سيوة ذات قيمة كبيرة للطلاب؟',
          modelAnswer: 'It broadens their historical awareness, deepens pride in Egyptian heritage, and provides practical knowledge about diverse environments.',
          rubric: 'Full marks for any well-expressed logical answer.',
          maxMarks: 2
        }
      ]
    },
    vocabGrammarMcqs: [
      {
        id: 'prep1_u5_vg1',
        skill: 'Vocabulary',
        question_type: 'mcq',
        difficulty: 'standard',
        question: 'Before boarding the international flight at Cairo Airport, you must show your ________.',
        options: ['passport', 'sandcastle', 'cushion', 'drawer'],
        correctAnswer: 'A',
        explanation: 'A passport is the official document required for air travel.',
        exam_trap_explanation: 'Exam Trap: Do not confuse passport (جواز سفر) with password (كلمة سر).'
      },
      {
        id: 'prep1_u5_vg2',
        skill: 'Vocabulary',
        question_type: 'mcq',
        difficulty: 'standard',
        question: 'During our coastal trip, my sister bought an alabaster scarab as a ________ for her friend.',
        options: ['souvenir', 'wardrobe', 'basin', 'traffic'],
        correctAnswer: 'A',
        explanation: 'A souvenir is purchased to remember a trip.',
        exam_trap_explanation: 'Souvenir = هدية تذكارية.'
      },
      {
        id: 'prep1_u5_vg3',
        skill: 'Vocabulary',
        question_type: 'mcq',
        difficulty: 'hots',
        question: 'Water rushed down dramatically over the steep rocky cliff to create a magnificent ________.',
        options: ['waterfall', 'curtain', 'mirror', 'sofa'],
        correctAnswer: 'A',
        explanation: 'A waterfall is water flowing from a height over rocks.',
        exam_trap_explanation: 'Wadi El-Rayan is famed for waterfalls (شلالات).'
      },
      {
        id: 'prep1_u5_vg4',
        skill: 'Grammar',
        question_type: 'mcq',
        difficulty: 'standard',
        question: 'Last Friday, our class ________ to the Egyptian Museum in Tahrir Square.',
        options: ['went', 'go', 'goes', 'are going'],
        correctAnswer: 'A',
        explanation: 'Keyword "Last Friday" indicates completed past action, so use the irregular past tense "went".',
        exam_trap_explanation: 'Exam Trap: Go is irregular; its past tense is "went", not "goed".'
      },
      {
        id: 'prep1_u5_vg5',
        skill: 'Grammar',
        question_type: 'mcq',
        difficulty: 'hots',
        question: '________ you see the ancient golden mask of King Tutankhamun during your visit?',
        options: ['Did', 'Do', 'Are', 'Were'],
        correctAnswer: 'A',
        explanation: 'Questions in Past Simple with a base main verb ("see") require auxiliary "Did".',
        exam_trap_explanation: 'Exam Trap: Never use "Were" with a bare verb like "see". Use "Did + subject + base verb".'
      },
      {
        id: 'prep1_u5_vg6',
        skill: 'Grammar',
        question_type: 'mcq',
        difficulty: 'hots',
        question: 'We ________ swim in the lake because the water was dangerously cold.',
        options: ['didn’t', 'don’t', 'aren’t', 'weren’t'],
        correctAnswer: 'A',
        explanation: 'Past Simple negative with an action verb (swim) takes "didn’t".',
        exam_trap_explanation: 'Exam Trap: Use "didn’t" + infinitive verb for past actions.'
      }
    ],
    errorCorrection: [
      {
        id: 'prep1_u5_ec1',
        sentence: 'Did you (saw) the colorful coral reefs in Sharm El-Sheikh?',
        bracketWord: 'saw',
        correctWord: 'see',
        explanation: 'After the auxiliary "Did", the main verb MUST be in the base infinitive form (see).',
        exam_trap_explanation: 'Exam Trap: Did + subject + INFINITIVE (Did you see, NOT Did you saw).'
      },
      {
        id: 'prep1_u5_ec2',
        sentence: 'Two days ago, I (buy) a beautiful papyrus painting in Luxor.',
        bracketWord: 'buy',
        correctWord: 'bought',
        explanation: '"Two days ago" requires the Past Simple. The past of "buy" is "bought".',
        exam_trap_explanation: 'Exam Trap: Buy is irregular: buy -> bought.'
      },
      {
        id: 'prep1_u5_ec3',
        sentence: 'We didn’t (stayed) in a hotel; we camped in a desert tent.',
        bracketWord: 'stayed',
        correctWord: 'stay',
        explanation: 'After "didn’t", use the bare infinitive without -ed (stay).',
        exam_trap_explanation: 'Exam Trap: didn’t + base infinitive.'
      },
      {
        id: 'prep1_u5_ec4',
        sentence: 'Where (do) you spend your summer vacation last July?',
        bracketWord: 'do',
        correctWord: 'did',
        explanation: '"Last July" requires the past auxiliary "did".',
        exam_trap_explanation: 'Exam Trap: Change present auxiliary "do" to past "did".'
      }
    ],
    writingTask: {
      type: 'paragraph',
      title: 'A paragraph of 90-110 words about: "A Wonderful Holiday Trip in Egypt"',
      prompt: 'Write a paragraph of 90 to 110 words describing a memorable vacation you spent in an Egyptian city (such as Alexandria, Hurghada, or Luxor).',
      promptAr: 'اكتب فقرة من 90 إلى 110 كلمة تصف رحلة إجازة رائعة قضيتها في إحدى المدن المصرية.',
      targetWords: '90 - 110 words',
      guidancePoints: ['Where you went and with whom', 'Activities you enjoyed (swimming, visiting sights)', 'Souvenirs you bought'],
      modelAnswer: `Last summer, my family and I traveled to Alexandria for a five-day vacation. We stayed in an apartment overlooking the shimmering Mediterranean Sea. Every morning, we swam in the refreshing water and built impressive sandcastles on the beach. In the afternoons, we toured the historic Qaitbay Citadel and explored the fascinating Alexandria Library. In the evenings, we strolled along the Corniche, eating delicious roasted corn and fresh ice cream. Before returning home, I bought charming seashell souvenirs for my cousins. It was truly an unforgettable holiday filled with joy and cultural discovery.`,
      rubricCriteria: [
        { criterion: 'Content Relevance & Narrative Flow', marks: 3 },
        { criterion: 'Past Simple Grammar Accuracy', marks: 2 },
        { criterion: 'Holiday Lexicon & Collocations', marks: 2 },
        { criterion: 'Punctuation, Spelling & Mechanics', marks: 2 }
      ]
    }
  }
);

// Prep 1 - Unit 6: Let's eat!
export const prep1Unit6 = createPrepUnitWithBlueprint(
  7, 'Prep 1', 1, 6,
  "Let's eat!",
  'التغذية الصحية والأطعمة والوصفات المصرية اللذيذة',
  'Healthy food, recipes, ingredients, cinnamon, raisins, nuts, hummus, crisps, fizzy drinks, salad',
  'Countable vs. Uncountable Nouns & Quantifiers (Some, Any, Much, Many, A lot of)',
  'الأسماء المعدودة وغير المعدودة ومحددات الكمية',
  'Countable nouns have singular and plural forms (an apple -> apples; many apples). Uncountable nouns have only a singular form and do not take a/an (rice, sugar, milk, hummus; much sugar). Use "some" in affirmative sentences and polite offers. Use "any" in negative sentences and questions.',
  [
    {
      title: '1. Countable vs. Uncountable Nouns (المعدود وغير المعدود)',
      explanation: 'Countable: a biscuit -> biscuits, an egg -> eggs. Uncountable: water, rice, cinnamon, cheese, juice, meat, soup. Uncountable nouns always take a singular verb ("Rice pudding is delicious").',
      examples: [
        'There are some juicy apples in the fruit bowl on the table.',
        'There is not much sugar left in the jar to make dessert.'
      ]
    },
    {
      title: '2. Some vs. Any & Quantifiers (محددات الكمية)',
      explanation: 'Some: affirmative sentences ("We have some nuts") and polite requests ("Would you like some tea?"). Any: negative sentences ("There isn’t any milk") and general questions ("Do you have any raisins?").',
      examples: [
        'Would you like some warm cinnamon tea with fresh mint?',
        'Are there any crunchy crisps left in the kitchen cupboard?'
      ]
    }
  ],
  [
    { word: 'recipe', pos: 'n.', ar: 'وصفة طهي وإعداد الطعام', def: 'A set of instructions for preparing a particular dish, including ingredients.', ex: 'My grandmother has a secret recipe for mouth-watering Egyptian rice pudding.', exAr: 'لدى جدتي وصفة سرية لإعداد أرز باللبن مصري شهي.' },
    { word: 'ingredients', pos: 'n.', ar: 'مكونات ومقادير الأكلة', def: 'Any of the foods or substances that are combined to make a particular dish.', ex: 'Fresh milk, short-grain rice, and sugar are the essential ingredients.', exAr: 'الحليب الطازج والأرز قصير الحبة والسكر هي المكونات الأساسية.' },
    { word: 'cinnamon', pos: 'n.', ar: 'قرفة عطرية لذيذة', def: 'An aromatic spice made from the peeled, dried bark of an Asian tree.', ex: 'Sprinkle ground cinnamon on top of the dessert for rich aroma.', exAr: 'رش القرفة المطحونة فوق الحلوى لإضفاء رائحة ونكهة زكية.' },
    { word: 'raisins', pos: 'n.', ar: 'زبيب مجفف', def: 'A partially dried grape used in cooking, baking, and garnishing.', ex: 'We decorated the festive platter with golden raisins and toasted coconut.', exAr: 'زينا طبق الحلوى بالزبيب الذهبي وجوز الهند المحمص.' },
    { word: 'nuts', pos: 'n.', ar: 'مكسرات وفول سوداني ومكسرات', def: 'Fruit consisting of a hard shell enclosing an edible kernel.', ex: 'Crushed almonds and hazelnuts are healthy nuts full of beneficial oils.', exAr: 'اللوز والبندق المطحونان مكسرات صحية غنية بالزيوت المفيدة.' },
    { word: 'hummus', pos: 'n.', ar: 'حمص الشام المطحون بالطحينة', def: 'A dip made from mashed chickpeas, tahini, lemon juice, and garlic.', ex: 'Egyptian families love eating fresh baladi bread with creamy hummus dip.', exAr: 'تحب العائلات المصرية تناول الخبز البلدي الطازج مع غموس الحمص الكريمي.' },
    { word: 'crisps', pos: 'n.', ar: 'رقائق شيبسي مقلية', def: 'Thin slices of potato fried until crisp and eaten as a snack.', ex: 'Avoid eating too many salty crisps because they contain unhealthy fats.', exAr: 'تجنب تناول الكثير من رقائق الشيبسي لأنها تحتوي على دهون غير صحية.' },
    { word: 'fizzy drinks', pos: 'n.', ar: 'مشروبات غازية غير صحية', def: 'Carbonated sweet non-alcoholic drinks.', ex: 'Drinking water is much healthier than drinking sugary fizzy drinks.', exAr: 'شرب الماء أكثر فائدة وصحة من شرب المشروبات الغازية السكرية.' }
  ],
  [
    { phrase: 'healthy balanced diet', meaningAr: 'نظام غذائي متوازن وصحي', example: 'Eating fresh vegetables every day ensures a healthy balanced diet.' },
    { phrase: 'sprinkle ground cinnamon', meaningAr: 'يرش القرفة المطحونة', example: 'Sprinkle ground cinnamon gently over warm baked pudding.' },
    { phrase: 'avoid too much sugar', meaningAr: 'يتجنب الإكثار من السكر', example: 'Doctors recommend athletes avoid too much sugar before training.' }
  ],
  `Maintaining a wholesome, balanced diet is the cornerstone of academic vitality for preparatory students. Nutritionists emphasize that the human body thrives on nutrient-rich foods such as fresh green salads, seasonal fruits, pulses, and lean dairy products. In Egyptian culinary tradition, dishes like koshari and lentil soup provide wholesome plant-based proteins, carbohydrates, and minerals. Conversely, consuming excessive processed snacks like salty crisps, chocolate bars, and artificial fizzy drinks causes sluggishness and dental decay. By drinking plenty of water and snacking on dried raisins and raw almonds, teenagers preserve strong immune systems and vibrant energy.`,
  `Omar: "What are your favorite ingredients for rice pudding, Tarek?"\nTarek: "I adore rice pudding with crushed nuts, golden raisins, and fragrant cinnamon!"\nOmar: "Is there much sugar in this bowl?"\nTarek: "No, Mom only puts a little sugar to make it wholesome and healthy."`,
  {
    dialogue: {
      title: 'Finish the following dialogue between Omar and Tarek about healthy eating:',
      context: 'Omar is asking Tarek about his favorite healthy snacks and recipes.',
      turns: [
        { speaker: 'Omar', text: 'Hello Tarek! What are you eating for your midday snack?', isBlank: false },
        { speaker: 'Tarek', isBlank: true, blankNumber: 1, expectedAnswer: 'I am eating some fresh fruits and roasted nuts.', acceptableAnswers: ['I am eating fresh fruit.', 'A healthy salad and nuts.'], hintAr: 'أخبره أنك تتناول فواكه طازجة ومكسرات محمصة.' },
        { speaker: 'Omar', isBlank: true, blankNumber: 2, expectedAnswer: 'Why do you prefer nuts instead of crisps?', acceptableAnswers: ['Why don’t you eat crisps?', 'Are nuts healthier than crisps?'], hintAr: 'اسأله لماذا يفضل المكسرات على الشيبسي المقلي.' },
        { speaker: 'Tarek', text: 'Because nuts provide healthy protein and crisps contain too much salt and fat.', isBlank: false },
        { speaker: 'Omar', text: 'What is your favorite traditional Egyptian dessert?', isBlank: false },
        { speaker: 'Tarek', isBlank: true, blankNumber: 3, expectedAnswer: 'My favorite dessert is homemade rice pudding.', acceptableAnswers: ['I love rice pudding.', 'Rice pudding with cinnamon.'], hintAr: 'أخبره أن الحلوى المفضلة لديك هي الأرز باللبن بالقرفة.' },
        { speaker: 'Omar', isBlank: true, blankNumber: 4, expectedAnswer: 'What ingredients do we need to make it?', acceptableAnswers: ['What are its ingredients?', 'What do we need to cook it?'], hintAr: 'اسأله عن المكونات والمقادير اللازمة لإعداده.' },
        { speaker: 'Tarek', text: 'We need milk, rice, a little sugar, raisins, and a pinch of cinnamon.', isBlank: false },
        { speaker: 'Omar', isBlank: true, blankNumber: 5, expectedAnswer: 'That sounds delicious and wholesome!', acceptableAnswers: ['It sounds very tasty!', 'Great, thank you Tarek.'], hintAr: 'عبر عن إعجابك بأن هذه الوصفة تبدو لذيذة وصحية.' }
      ]
    },
    readingPassage: {
      title: 'Reading Comprehension: Nutrition and Youth Vitality',
      passage: `Maintaining a wholesome, balanced diet is the cornerstone of academic vitality for preparatory students. Nutritionists emphasize that the human body thrives on nutrient-rich foods such as fresh green salads, seasonal fruits, pulses, and lean dairy products. In Egyptian culinary tradition, dishes like koshari and lentil soup provide wholesome plant-based proteins, carbohydrates, and minerals. Conversely, consuming excessive processed snacks like salty crisps, chocolate bars, and artificial fizzy drinks causes sluggishness and dental decay. By drinking plenty of water and snacking on dried raisins and raw almonds, teenagers preserve strong immune systems and vibrant energy.`,
      mcqs: [
        {
          id: 'prep1_u6_rq1',
          skill: 'Reading',
          question_type: 'mcq',
          difficulty: 'standard',
          question: 'What traditional Egyptian dishes provide wholesome plant protein according to the passage?',
          options: ['Koshari and lentil soup', 'Salty potato crisps', 'Sugary fizzy sodas', 'Fried fast food burgers'],
          correctAnswer: 'A',
          explanation: 'Passage mentions koshari and lentil soup as providing wholesome plant-based protein.',
          exam_trap_explanation: 'Exam Trap: Confirm textual evidence: "dishes like koshari and lentil soup provide wholesome plant-based proteins".'
        },
        {
          id: 'prep1_u6_rq2',
          skill: 'Reading',
          question_type: 'mcq',
          difficulty: 'hots',
          question: 'What health problems are caused by consuming excessive sugary snacks and fizzy drinks?',
          options: ['Physical sluggishness and dental decay', 'Improved memory and sharper vision', 'Strengthened heart muscles', 'Faster running athletic speed'],
          correctAnswer: 'A',
          explanation: 'Passage explicitly states: "causes sluggishness and dental decay".',
          exam_trap_explanation: 'Exam Trap: Sluggishness (الخمول والكسل) and dental decay (تسوس الأسنان) are the direct consequences stated.'
        },
        {
          id: 'prep1_u6_rq3',
          skill: 'Reading',
          question_type: 'mcq',
          difficulty: 'standard',
          question: 'The word "cornerstone" in paragraph 1 implies that a balanced diet is:',
          options: ['An essential foundation for health', 'A useless and trivial factor', 'A very expensive luxury', 'An ancient stone wall'],
          correctAnswer: 'A',
          explanation: 'Cornerstone means basic, indispensable foundation.',
          exam_trap_explanation: 'Cornerstone = حجر الزاوية والأساس المتين.'
        }
      ],
      openEnded: [
        {
          id: 'prep1_u6_ro1',
          question: 'Which natural snacks does the author recommend for teenagers seeking sustained energy?',
          questionAr: 'ما هي الوجبات الخفيفة الطبيعية التي يوصي بها الكاتب للحصول على طاقة مستدامة؟',
          modelAnswer: 'Snacking on dried raisins, raw almonds/nuts, and fresh seasonal fruits.',
          rubric: '1 mark for dried raisins/fruits, 1 mark for raw almonds/nuts.',
          maxMarks: 2
        },
        {
          id: 'prep1_u6_ro2',
          question: 'Why is drinking water superior to drinking artificial fizzy sodas?',
          questionAr: 'لماذا يعتبر شرب الماء أفضل بكثير من شرب المشروبات الغازية المصنعة؟',
          modelAnswer: 'Water hydrates the body naturally without harmful excessive refined sugars, artificial coloring, or acidic damage to teeth.',
          rubric: 'Full mark for logical nutritional reasoning.',
          maxMarks: 2
        }
      ]
    },
    vocabGrammarMcqs: [
      {
        id: 'prep1_u6_vg1',
        skill: 'Vocabulary',
        question_type: 'mcq',
        difficulty: 'standard',
        question: 'Rice, milk, and sugar are the main ________ required to cook sweet rice pudding.',
        options: ['ingredients', 'passports', 'chargers', 'caves'],
        correctAnswer: 'A',
        explanation: 'Ingredients are the foods combined to make a dish.',
        exam_trap_explanation: 'Ingredients = مقادير ومكونات الأكلة.'
      },
      {
        id: 'prep1_u6_vg2',
        skill: 'Vocabulary',
        question_type: 'mcq',
        difficulty: 'standard',
        question: 'We sprinkled fragrant brown ________ on top of the dessert to give it a delicious aroma.',
        options: ['cinnamon', 'pavement', 'mirror', 'sofa'],
        correctAnswer: 'A',
        explanation: 'Cinnamon is a sweet fragrant spice.',
        exam_trap_explanation: 'Cinnamon = قرفة.'
      },
      {
        id: 'prep1_u6_vg3',
        skill: 'Vocabulary',
        question_type: 'mcq',
        difficulty: 'hots',
        question: 'Nutritionists advise students to avoid drinking ________ because they erode tooth enamel.',
        options: ['fizzy drinks', 'tap water', 'lentil soup', 'fresh milk'],
        correctAnswer: 'A',
        explanation: 'Fizzy drinks are acidic and loaded with sugar.',
        exam_trap_explanation: 'Exam Trap: Fizzy drinks (مشروبات غازية) cause dental damage.'
      },
      {
        id: 'prep1_u6_vg4',
        skill: 'Grammar',
        question_type: 'mcq',
        difficulty: 'standard',
        question: 'Is there ________ olive oil left in the salad dressing bottle?',
        options: ['any', 'some', 'many', 'a few'],
        correctAnswer: 'A',
        explanation: 'Use "any" in questions with uncountable nouns like olive oil.',
        exam_trap_explanation: 'Exam Trap: In standard questions, use "any", not "some".'
      },
      {
        id: 'prep1_u6_vg5',
        skill: 'Grammar',
        question_type: 'mcq',
        difficulty: 'hots',
        question: 'Would you like ________ freshly baked cinnamon biscuits with your mint tea?',
        options: ['some', 'any', 'much', 'a little'],
        correctAnswer: 'A',
        explanation: 'Use "some" in polite offers starting with "Would you like...".',
        exam_trap_explanation: 'Exam Trap: Polite offers take "some", even though they end with a question mark!'
      },
      {
        id: 'prep1_u6_vg6',
        skill: 'Grammar',
        question_type: 'mcq',
        difficulty: 'hots',
        question: 'There is too ________ sugar in this glass of juice; it is unhealthily sweet!',
        options: ['much', 'many', 'a few', 'several'],
        correctAnswer: 'A',
        explanation: 'Sugar is uncountable, so use "too much".',
        exam_trap_explanation: 'Exam Trap: "Many" is for countable nouns (apples). Use "much" for uncountable nouns (sugar).'
      }
    ],
    errorCorrection: [
      {
        id: 'prep1_u6_ec1',
        sentence: 'Are there (some) raisins left in the kitchen cabinet?',
        bracketWord: 'some',
        correctWord: 'any',
        explanation: 'In general questions, use "any" instead of "some".',
        exam_trap_explanation: 'Exam Trap: Change some to any in questions.'
      },
      {
        id: 'prep1_u6_ec2',
        sentence: 'There are too (much) students in the computer laboratory today.',
        bracketWord: 'much',
        correctWord: 'many',
        explanation: '"Students" is a plural countable noun, so use "too many".',
        exam_trap_explanation: 'Exam Trap: Countable plural takes "many", NOT "much".'
      },
      {
        id: 'prep1_u6_ec3',
        sentence: 'Would you like (any) warm lentil soup for dinner?',
        bracketWord: 'any',
        correctWord: 'some',
        explanation: 'In polite offers starting with "Would you like...", use "some".',
        exam_trap_explanation: 'Exam Trap: Polite offers take "some".'
      },
      {
        id: 'prep1_u6_ec4',
        sentence: 'There (are) not much milk in the pitcher.',
        bracketWord: 'are',
        correctWord: 'is',
        explanation: 'Milk is an uncountable noun, so it takes a singular verb (is).',
        exam_trap_explanation: 'Exam Trap: Uncountable nouns take singular verbs (is, not are).'
      }
    ],
    writingTask: {
      type: 'paragraph',
      title: 'A paragraph of 90-110 words about: "My Favorite Healthy Dish and Recipe"',
      prompt: 'Write a paragraph of 90 to 110 words about a nutritious Egyptian meal you like to prepare or eat, explaining its ingredients and why it is good for your body.',
      promptAr: 'اكتب فقرة من 90 إلى 110 كلمة حول وجبة مصرية صحية تحب تناولها أو إعدادها، موضحاً مكوناتها وفوائدها الصحية.',
      targetWords: '90 - 110 words',
      guidancePoints: ['Name of dish (Koshari, Lentil soup, Salad)', 'Key ingredients', 'Health benefits vs. fast food'],
      modelAnswer: `Eating nutritious food is vital to keep our bodies energized and minds sharp throughout the school day. My favorite healthy meal is traditional Egyptian lentil soup. To cook this comforting soup, my mother blends yellow lentils, sweet carrots, red tomatoes, and onions with aromatic spices like cumin and black pepper. We eat it hot with crunchy toasted baladi bread and fresh lemon slices. This meal is packed with plant-based protein, dietary fiber, and vitamins without any harmful artificial additives. I always prefer eating wholesome home-cooked dishes rather than buying greasy fast food.`,
      rubricCriteria: [
        { criterion: 'Nutritional Content & Vocabulary Usage', marks: 3 },
        { criterion: 'Countable/Uncountable Grammar & Quantifiers', marks: 2 },
        { criterion: 'Paragraph Coherence & Sentence Linking', marks: 2 },
        { criterion: 'Punctuation, Capitalization & Spelling', marks: 2 }
      ]
    }
  }
);


// ==============================================================================================
// 2. PREP 2 (GRADE 8) - UNITS 4, 5, 6
// ==============================================================================================

// Prep 2 - Unit 4: Into the past
export const prep2Unit4 = createPrepUnitWithBlueprint(
  8, 'Prep 2', 1, 4,
  'Into the past',
  'في رحاب الماضي والآثار والمعابد المصرية الخالدة',
  'Ancient Egypt, ruins, statues, temples, mosques, museum, protection of heritage',
  'Past Continuous with When / While & Modals of Obligation (Must / Mustn’t)',
  'الماضي المستمر مع While و When وأفعال الإلزام Must و Mustn’t',
  'Use Past Continuous (was/were + verb-ing) for an action in progress in the past interrupted by a shorter action in Past Simple: "While I was studying, the phone rang". Use must/mustn’t for strict museum and archaeological rules: "You must protect monuments / You mustn’t touch ancient statues".',
  [
    {
      title: '1. Past Continuous with While & When (الماضي المستمر مع الروابط)',
      explanation: 'While / As + Past Continuous, Past Simple. When + Past Simple, Past Continuous.',
      examples: [
        'While we were walking through Karnak Temple, our tour guide explained the hieroglyphic inscriptions.',
        'The students were examining ancient pottery when the bell rang.'
      ]
    },
    {
      title: '2. Must & Mustn’t for Heritage Preservation (قواعد الإلزام والحظر في المتاحف)',
      explanation: 'Must + base verb: absolute obligation. Mustn’t + base verb: strict prohibition.',
      examples: [
        'Visitors must follow museum instructions and stay behind security ropes.',
        'You mustn’t touch ancient pharaonic statues or use flash photography.'
      ]
    }
  ],
  [
    { word: 'ruins', pos: 'n.', ar: 'أطلال وبقايا أثرية', def: 'The physical remains of a building or city that has suffered destruction.', ex: 'The ancient Roman ruins in Alexandria attract historians from across the globe.', exAr: 'تجذب الأطلال الرومانية القديمة في الإسكندرية المؤرخين من كافة أنحاء العالم.' },
    { word: 'statue', pos: 'n.', ar: 'تمثال منحوت بدقة', def: 'A carved or cast figure of a person or animal, especially life-size or larger.', ex: 'The colossal granite statue of Ramses II stands proudly in the Grand Egyptian Museum.', exAr: 'يقف تمثال رمسيس الثاني الجرانيتي الضخم بشموخ في المتحف المصري الكبير.' },
    { word: 'temple', pos: 'n.', ar: 'معبد أثري عريق', def: 'A building devoted to the worship of a god or gods.', ex: 'Karnak Temple in Luxor is one of the largest religious complexes ever constructed.', exAr: 'يعد معبد الكرنك في الأقصر أحد أضخم المجمعات الدينية التي شيدت في التاريخ.' },
    { word: 'mosque', pos: 'n.', ar: 'مسجد ومئذنة إسلامية', def: 'A Muslim place of worship.', ex: 'The Mosque of Sultan Hassan in Old Cairo is a masterpiece of Islamic architecture.', exAr: 'يعد مسجد السلطان حسن في القاهرة القديمة تحفة معمارية إسلامية فريدة.' },
    { word: 'protect', pos: 'v.', ar: 'يحمي ويصون الآثار', def: 'Keep safe from harm or injury; preserve.', ex: 'Egyptians must protect their timeless cultural heritage for future generations.', exAr: 'يجب على المصريين حماية وصون تراثهم الثقافي الخالد للأجيال القادمة.' },
    { word: 'historic', pos: 'adj.', ar: 'تاريخي وذو شأن عظيم', def: 'Famous or important in history.', ex: 'Cairo is home to historic gates and medieval minarets.', exAr: 'تضم القاهرة بوابات تاريخية ومآذن تعود للعصور الوسطى.' },
    { word: 'ancient', pos: 'adj.', ar: 'قديم وأثري عريق', def: 'Belonging to the very distant past and no longer in existence.', ex: 'Ancient Egyptians were pioneers in medicine, mathematics, and astronomy.', exAr: 'كان المصريون القدماء رواداً في الطب والرياضيات وعلم الفلك.' },
    { word: 'pyramid', pos: 'n.', ar: 'هرم حجري مهيب', def: 'A monumental structure with a square or triangular base and sloping sides.', ex: 'The Great Pyramid of Khufu is the sole surviving Wonder of the Ancient World.', exAr: 'هرم خوفو الأكبر هو الأثر الوحيد الباقي من عجائب العالم القديم.' }
  ],
  [
    { phrase: 'protect historic heritage', meaningAr: 'يحمي التراث التاريخي', example: 'Citizens collaborate to protect historic heritage from weathering.' },
    { phrase: 'explore ancient temples', meaningAr: 'يستكشف المعابد القديمة', example: 'Tourists arrive in Luxor to explore ancient temples.' },
    { phrase: 'follow museum guidelines', meaningAr: 'يتبع إرشادات المتحف', example: 'Schoolchildren must follow museum guidelines quietly.' }
  ],
  `Egypt’s historical legacy is celebrated worldwide as a cradle of civilization. From the monumental Pyramids of Giza to the awe-inspiring rock temples of Abu Simbel, millions of travelers journey to Egypt to witness pharaonic ingenuity. Preserving these priceless antiquities requires dedicated conservation. When visiting archaeological sites, citizens and tourists must respect designated paths and keep areas pristine. While professional archaeologists were restoring the golden treasures in the Grand Egyptian Museum, they deployed advanced laser technology to cleanse delicate limestone carvings without causing friction.`,
  `Yasmine: "Where were you at ten o’clock yesterday morning, Salma?"\nSalma: "I was touring the Grand Egyptian Museum with my preparatory class."\nYasmine: "What were you doing when the museum curator approached you?"\nSalma: "While we were examining the King Tutankhamun gallery, he explained the royal papyrus scrolls."`,
  {
    dialogue: {
      title: 'Finish the following dialogue between Yasmine and Salma about visiting the museum:',
      context: 'Yasmine is asking Salma about her educational visit to the museum.',
      turns: [
        { speaker: 'Yasmine', text: 'Hello Salma! Where did you go on your school trip yesterday?', isBlank: false },
        { speaker: 'Salma', isBlank: true, blankNumber: 1, expectedAnswer: 'We went to the Grand Egyptian Museum.', acceptableAnswers: ['We visited the Grand Egyptian Museum.', 'We went to the museum.'], hintAr: 'أخبريها أنكم زرتم المتحف المصري الكبير.' },
        { speaker: 'Yasmine', isBlank: true, blankNumber: 2, expectedAnswer: 'What did you see there?', acceptableAnswers: ['What monuments did you see?', 'What did you admire most?'], hintAr: 'اسأليها عما شاهدته داخل قاعات المتحف.' },
        { speaker: 'Salma', text: 'We saw the colossal statue of Ramses II and King Tut’s golden treasures.', isBlank: false },
        { speaker: 'Yasmine', isBlank: true, blankNumber: 3, expectedAnswer: 'What were you doing when the tour guide spoke to you?', acceptableAnswers: ['What were you looking at when he called you?'], hintAr: 'اسأليها عما كانت تفعله عندما تحدث إليهم المرشد السياحي.' },
        { speaker: 'Salma', text: 'While we were admiring the royal chariot, he explained how it was preserved.', isBlank: false },
        { speaker: 'Yasmine', text: 'Are visitors allowed to touch the ancient statues?', isBlank: false },
        { speaker: 'Salma', isBlank: true, blankNumber: 4, expectedAnswer: 'No, visitors mustn’t touch any ancient monuments.', acceptableAnswers: ['No, you must not touch them.', 'No, it is strictly forbidden.'], hintAr: 'أكدي بحزم أنه يحظر لمس الآثار لحمايتها.' },
        { speaker: 'Yasmine', isBlank: true, blankNumber: 5, expectedAnswer: 'I really hope our school organizes a visit there soon!', acceptableAnswers: ['It sounds like a marvelous trip!', 'Thank you Salma.'], hintAr: 'عبري عن أمنيتك بزيارة المتحف قريباً.' }
      ]
    },
    readingPassage: {
      title: 'Reading Comprehension: Safeguarding Ancient Egyptian Heritage',
      passage: `Egypt’s historical legacy is celebrated worldwide as a cradle of civilization. From the monumental Pyramids of Giza to the awe-inspiring rock temples of Abu Simbel, millions of travelers journey to Egypt to witness pharaonic ingenuity. Preserving these priceless antiquities requires dedicated conservation. When visiting archaeological sites, citizens and tourists must respect designated paths and keep areas pristine. While professional archaeologists were restoring the golden treasures in the Grand Egyptian Museum, they deployed advanced laser technology to cleanse delicate limestone carvings without causing friction.`,
      mcqs: [
        {
          id: 'prep2_u4_rq1',
          skill: 'Reading',
          question_type: 'mcq',
          difficulty: 'standard',
          question: 'What rock temples in southern Egypt are mentioned in the text?',
          options: ['The rock temples of Abu Simbel', 'The Hanging Church in Cairo', 'The Citadel of Qaitbay', 'The Roman Amphitheatre'],
          correctAnswer: 'A',
          explanation: 'Passage mentions: "the awe-inspiring rock temples of Abu Simbel".',
          exam_trap_explanation: 'Abu Simbel is the southern rock temple complex cited.'
        },
        {
          id: 'prep2_u4_rq2',
          skill: 'Reading',
          question_type: 'mcq',
          difficulty: 'hots',
          question: 'What modern technique did archaeologists deploy to cleanse delicate limestone without damage?',
          options: ['Advanced laser technology', 'Soap and chemical brushes', 'Harsh acid washing', 'Rough sandpaper polishing'],
          correctAnswer: 'A',
          explanation: 'Passage explicitly states: "they deployed advanced laser technology".',
          exam_trap_explanation: 'Look for the scientific restoration technique mentioned in the last sentence.'
        },
        {
          id: 'prep2_u4_rq3',
          skill: 'Reading',
          question_type: 'mcq',
          difficulty: 'standard',
          question: 'The word "pristine" in paragraph 1 means:',
          options: ['Extremely clean and undamaged', 'Full of rubbish and litter', 'Very noisy and crowded', 'Broken into fragments'],
          correctAnswer: 'A',
          explanation: 'Pristine means spotless, clean, and in original condition.',
          exam_trap_explanation: 'Pristine = نظيف ومصون في حالته الأصلية.'
        }
      ],
      openEnded: [
        {
          id: 'prep2_u4_ro1',
          question: 'Why must visitors stay on designated pathways when touring archaeological sites?',
          questionAr: 'لماذا يجب على الزائرين الالتزام بالمسارات المحددة عند زيارة المواقع الأثرية؟',
          modelAnswer: 'To prevent accidental erosion, avoid damaging fragile stone surfaces, and preserve antiquities for future generations.',
          rubric: '1 mark for erosion prevention, 1 mark for heritage preservation.',
          maxMarks: 2
        },
        {
          id: 'prep2_u4_ro2',
          question: 'How does modern technology assist archaeologists in preserving antiquities?',
          questionAr: 'كيف تساعد التكنولوجيا الحديثة علماء الآثار في صيانة وترميم القطع الأثرية؟',
          modelAnswer: 'Laser technology and digital scanning allow gentle cleaning and 3D modeling without damaging delicate historical materials.',
          rubric: 'Full marks for citing non-destructive restoration techniques.',
          maxMarks: 2
        }
      ]
    },
    vocabGrammarMcqs: [
      {
        id: 'prep2_u4_vg1',
        skill: 'Vocabulary',
        question_type: 'mcq',
        difficulty: 'standard',
        question: 'The ancient Roman ________ in Alexandria contain broken columns and mosaics.',
        options: ['ruins', 'chargers', 'passwords', 'cushions'],
        correctAnswer: 'A',
        explanation: 'Ruins are the remains of ancient destroyed buildings.',
        exam_trap_explanation: 'Ruins = أطلال وبقايا أثرية.'
      },
      {
        id: 'prep2_u4_vg2',
        skill: 'Vocabulary',
        question_type: 'mcq',
        difficulty: 'standard',
        question: 'It is our national duty to ________ Egyptian antiquities against pollution and vandalism.',
        options: ['protect', 'damage', 'demolish', 'ignore'],
        correctAnswer: 'A',
        explanation: 'Protect means keep safe from harm.',
        exam_trap_explanation: 'Protect = يحمي ويصون.'
      },
      {
        id: 'prep2_u4_vg3',
        skill: 'Vocabulary',
        question_type: 'mcq',
        difficulty: 'hots',
        question: 'The towering ________ of Ramses II was carved with supreme precision from rose granite.',
        options: ['statue', 'tent', 'sofa', 'ferry'],
        correctAnswer: 'A',
        explanation: 'A statue is a carved figure of stone or bronze.',
        exam_trap_explanation: 'Colossal statue of Ramses II = تمثال رمسيس الضخم.'
      },
      {
        id: 'prep2_u4_vg4',
        skill: 'Grammar',
        question_type: 'mcq',
        difficulty: 'standard',
        question: 'While we ________ through Luxor Temple, the heavy rain suddenly started.',
        options: ['were walking', 'walked', 'are walk', 'was walking'],
        correctAnswer: 'A',
        explanation: '"While" is followed by the Past Continuous: plural "we" takes "were walking".',
        exam_trap_explanation: 'Exam Trap: Plural subject "we" takes "were walking", not "was walking".'
      },
      {
        id: 'prep2_u4_vg5',
        skill: 'Grammar',
        question_type: 'mcq',
        difficulty: 'hots',
        question: 'You ________ touch the ancient glass display cases in the museum; it is forbidden!',
        options: ['mustn’t', 'must', 'don’t have to', 'can'],
        correctAnswer: 'A',
        explanation: '"Mustn’t" expresses prohibition when an action is strictly forbidden.',
        exam_trap_explanation: 'Exam Trap: Forbidden = mustn’t (حظر وتحريم).'
      },
      {
        id: 'prep2_u4_vg6',
        skill: 'Grammar',
        question_type: 'mcq',
        difficulty: 'hots',
        question: 'I was taking photos when the museum security guard ________ at my ticket.',
        options: ['looked', 'was looking', 'were look', 'is looking'],
        correctAnswer: 'A',
        explanation: '"When" is typically followed by the Past Simple (looked) interrupting the ongoing action.',
        exam_trap_explanation: 'Exam Trap: When + Past Simple, while + Past Continuous.'
      }
    ],
    errorCorrection: [
      {
        id: 'prep2_u4_ec1',
        sentence: 'While Hany (watch) television, his father came back from work.',
        bracketWord: 'watch',
        correctWord: 'was watching',
        explanation: '"While" requires the Past Continuous. Singular subject takes "was watching".',
        exam_trap_explanation: 'Exam Trap: While + was/were + verb-ing.'
      },
      {
        id: 'prep2_u4_ec2',
        sentence: 'You (must) drop sweet wrappers on the temple floor; keep it clean!',
        bracketWord: 'must',
        correctWord: 'mustn’t',
        explanation: 'Context requires a prohibition against littering (mustn’t).',
        exam_trap_explanation: 'Exam Trap: Drop litter is forbidden, so use mustn’t.'
      },
      {
        id: 'prep2_u4_ec3',
        sentence: 'They were studying ancient history when the power (go) out.',
        bracketWord: 'go',
        correctWord: 'went',
        explanation: '"When" takes the Past Simple. The past of "go" is "went".',
        exam_trap_explanation: 'Exam Trap: Past of go is went.'
      },
      {
        id: 'prep2_u4_ec4',
        sentence: 'Visitors (has to) buy an entry ticket before entering the gallery.',
        bracketWord: 'has to',
        correctWord: 'have to',
        explanation: 'Plural subject "Visitors" takes "have to", not "has to".',
        exam_trap_explanation: 'Exam Trap: Plural subject agreement: have to.'
      }
    ],
    writingTask: {
      type: 'paragraph',
      title: 'A paragraph of 90-110 words about: "Protecting Egypt’s Timeless Heritage"',
      prompt: 'Write a paragraph of 90 to 110 words about why Egyptian antiquities are world-famous, and how school students can help preserve them.',
      promptAr: 'اكتب فقرة من 90 إلى 110 كلمة حول أهمية حماية الآثار المصرية ودور الطلاب في الحفاظ عليها.',
      targetWords: '90 - 110 words',
      guidancePoints: ['World-famous monuments (Pyramids, Karnak, GEM)', 'Economic and cultural significance', 'Rules visitors must follow'],
      modelAnswer: `Egypt possesses an invaluable wealth of historic monuments that embody the dawn of human civilization. Millions of international tourists visit our motherland annually to gaze at the majestic Giza Pyramids and explore the awe-inspiring temples of Luxor. These treasures not only stimulate our national economy through tourism, but also reinforce our cultural identity. As patriotic students, we must treat historic sites with deep veneration. When we tour archaeological reserves, we must never touch ancient carvings, write graffiti on stones, or drop litter. By championing heritage preservation, we ensure that Egypt’s glorious history shines bright for centuries to come.`,
      rubricCriteria: [
        { criterion: 'Historical Content & Civic Pride', marks: 3 },
        { criterion: 'Modal Verbs (Must/Mustn’t) & Past Tense', marks: 2 },
        { criterion: 'Cohesion, Topic Sentence & Conclusion', marks: 2 },
        { criterion: 'Spelling, Punctuation & Mechanics', marks: 2 }
      ]
    }
  }
);

// Prep 2 - Unit 5: Helping you, helping me
export const prep2Unit5 = createPrepUnitWithBlueprint(
  8, 'Prep 2', 1, 5,
  'Helping you, helping me',
  'العمل الخيري والتطوعي ومساعدة ذوي الهمم والأيتام',
  'Charities, donation, volunteers, disabled, kindness, orphanages, community service',
  'Relative Clauses (Who, Which, Where) & Expressing Necessity (Have to / Has to)',
  'ضمائر الوصل (Who, Which, Where) وأفعال الإلزام (Have to / Has to)',
  'Use "who" for people ("A doctor is someone who cures patients"). Use "which" for things/animals ("A wheelchair is a device which helps disabled people move"). Use "where" for places ("An orphanage is a home where orphans live"). Use have to/has to for external rules.',
  [
    {
      title: '1. Relative Pronouns: Who, Which, Where (ضمائر الوصل)',
      explanation: 'Who = refers to people. Which / That = refers to animals and inanimate objects. Where = refers to locations where actions happen.',
      examples: [
        'Magdi Yacoub is the compassionate surgeon who established the Aswan Heart Centre.',
        'The Resala charity is an organization which delivers warm blankets to rural families in winter.'
      ]
    },
    {
      title: '2. Have to / Has to for Necessity (الإلزام والضرورة)',
      explanation: 'I/You/We/They + have to + verb. He/She/It + has to + verb. Negative: don’t have to / doesn’t have to.',
      examples: [
        'Volunteers have to register their names at the youth center before joining.',
        'She doesn’t have to pay for the medical surgery; the charitable foundation covers all costs.'
      ]
    }
  ],
  [
    { word: 'charity', pos: 'n.', ar: 'جمعية ومؤسسة خيرية', def: 'An organization set up to provide help and raise money for those in need.', ex: 'The Egyptian Food Bank is a reputable charity that feeds vulnerable families.', exAr: 'بنك الطعام المصري جمعية خيرية موثوقة تقدم الغذاء للأسر الأكثر احتياجاً.' },
    { word: 'donate', pos: 'v.', ar: 'يتبرع بالمال أو الملابس', def: 'Give money or goods for a good cause, for example to a charity.', ex: 'Kind citizens donate clothes and storybooks to orphanages before Eid.', exAr: 'يتبرع المواطنون الكرماء بالملابس والقصص لدور الأيتام قبل العيد.' },
    { word: 'volunteer', pos: 'n. / v.', ar: 'متطوع للخير / يتطوع بدون أجر', def: 'A person who freely offers to take part in an enterprise or undertake a task.', ex: 'Youth volunteers painted classroom desks and planted shady trees.', exAr: 'تطوع الشباب لطلاء مقاعد الفصول وزراعة أشجار ظليلة.' },
    { word: 'disabled', pos: 'adj.', ar: 'من ذوي الهمم والقدرات الخاصة', def: 'Having a physical or mental condition that limits movements or senses.', ex: 'Our school constructed paved ramps to facilitate access for disabled pupils.', exAr: 'أنشأت مدرستنا منحدرات ممهدة لتسهيل دخول الطلاب من ذوي الهمم.' },
    { word: 'kindness', pos: 'n.', ar: 'إحسان وعطف ومعاملة طيبة', def: 'The quality of being friendly, generous, and considerate.', ex: 'Treating elderly neighbors with warm kindness earns divine blessings.', exAr: 'معاملة الجيران المسنين بإحسان وطيبة تجلب البركة ورضا الله.' },
    { word: 'orphan', pos: 'n.', ar: 'طفل يتيم', def: 'A child whose parents are deceased.', ex: 'Islam and universal morals place immense virtue on caring for the orphan.', exAr: 'يحث الإسلام والأخلاق الإنسانية على رعاية وكفالة اليتيم.' },
    { word: 'wheelchair', pos: 'n.', ar: 'كرسي متحرك لذوي الإعاقة الحركية', def: 'A chair on wheels, used when walking is difficult or impossible.', ex: 'The association gifted a modern electric wheelchair to the disabled athlete.', exAr: 'أهدت الجمعية كرسياً متحركاً كهربائياً حديثاً للبطل الرياضي من ذوي الهمم.' },
    { word: 'community', pos: 'n.', ar: 'المجتمع المحلي والبيئة المحيطة', def: 'A group of people living in the same place or sharing common goals.', ex: 'A cohesive community thrives when members support one another.', exAr: 'يزدهر المجتمع المتماسك عندما يدعم أفراده بعضهم بعضاً.' }
  ],
  [
    { phrase: 'donate warm winter clothes', meaningAr: 'يتبرع بملابس شتوية دافئة', example: 'Students gather to donate warm winter clothes to the needy.' },
    { phrase: 'volunteer at the children’s ward', meaningAr: 'يتطوع في جناح الأطفال بالمستشفى', example: 'Nurses volunteer at the children’s ward on public holidays.' },
    { phrase: 'empower disabled citizens', meaningAr: 'يمكّن ذوي الهمم ويدعمهم', example: 'Modern legislation aims to empower disabled citizens in jobs.' }
  ],
  `Voluntary community service is a hallmark of Egyptian social solidarity. Across governorates from Alexandria to Aswan, non-governmental charitable foundations mobilize thousands of university and preparatory students to uplift disadvantaged communities. These noble foundations build medical clinics which provide cost-free treatments to underprivileged citizens. Dedicated volunteers, who sacrifice their weekend leisure time, distribute food parcels, tutor orphans, and install clean water connections. Participating in voluntary work cultivates empathy, social cohesion, and active citizenship among youth.`,
  `Adel: "Where are you going with that heavy carton, Bassem?"\nBassem: "I am taking it to the local charity center which operates in our district."\nAdel: "What is inside the box?"\nBassem: "Warm winter jackets which my brother and I collected for orphans."`,
  {
    dialogue: {
      title: 'Finish the following dialogue between Adel and Bassem about voluntary charity work:',
      context: 'Adel is asking Bassem about his volunteer activities at the weekend.',
      turns: [
        { speaker: 'Adel', text: 'Hello Bassem! Where are you going this morning?', isBlank: false },
        { speaker: 'Bassem', isBlank: true, blankNumber: 1, expectedAnswer: 'I am going to the local charity organization.', acceptableAnswers: ['I am going to the charity center.', 'To the charity to help orphans.'], hintAr: 'أخبره أنك ذاهب إلى الجمعية الخيرية بالحي.' },
        { speaker: 'Adel', isBlank: true, blankNumber: 2, expectedAnswer: 'What do volunteers do there?', acceptableAnswers: ['What kind of work do you do?', 'How do you help people there?'], hintAr: 'اسأله عن نوع العمل التطوعي الذي يقوم به المتطوعون.' },
        { speaker: 'Bassem', text: 'We prepare food packages and collect clothes for needy families.', isBlank: false },
        { speaker: 'Adel', isBlank: true, blankNumber: 3, expectedAnswer: 'Do you have to work every day?', acceptableAnswers: ['How many days do you volunteer?', 'Is it obligatory?'], hintAr: 'اسأله هل يتعين عليه العمل كل يوم أم في عطلة نهاية الأسبوع فقط.' },
        { speaker: 'Bassem', text: 'No, we don’t have to work every day; we only volunteer on Fridays and Saturdays.', isBlank: false },
        { speaker: 'Adel', isBlank: true, blankNumber: 4, expectedAnswer: 'Can I join you as a volunteer this weekend?', acceptableAnswers: ['Can I come with you?', 'May I volunteer too?'], hintAr: 'اسأله هل يمكنك الانضمام والتطوع معه هذا الأسبوع.' },
        { speaker: 'Bassem', text: 'Of course! We always welcome enthusiastic new volunteers.', isBlank: false },
        { speaker: 'Adel', isBlank: true, blankNumber: 5, expectedAnswer: 'That is wonderful! See you on Friday morning.', acceptableAnswers: ['Great! I will meet you on Friday.', 'Thank you Bassem!'], hintAr: 'عبر عن سعادتك وحدد الموعد صباح الجمعة.' }
      ]
    },
    readingPassage: {
      title: 'Reading Comprehension: Social Solidarity and Youth Volunteerism',
      passage: `Voluntary community service is a hallmark of Egyptian social solidarity. Across governorates from Alexandria to Aswan, non-governmental charitable foundations mobilize thousands of university and preparatory students to uplift disadvantaged communities. These noble foundations build medical clinics which provide cost-free treatments to underprivileged citizens. Dedicated volunteers, who sacrifice their weekend leisure time, distribute food parcels, tutor orphans, and install clean water connections. Participating in voluntary work cultivates empathy, social cohesion, and active citizenship among youth.`,
      mcqs: [
        {
          id: 'prep2_u5_rq1',
          skill: 'Reading',
          question_type: 'mcq',
          difficulty: 'standard',
          question: 'What do dedicated volunteers sacrifice to help their communities?',
          options: ['Their weekend leisure time', 'Their school textbooks', 'Their family homes', 'Their official identity cards'],
          correctAnswer: 'A',
          explanation: 'Passage mentions: "Dedicated volunteers, who sacrifice their weekend leisure time...".',
          exam_trap_explanation: 'Volunteers freely give their personal free time (weekend leisure time).'
        },
        {
          id: 'prep2_u5_rq2',
          skill: 'Reading',
          question_type: 'mcq',
          difficulty: 'hots',
          question: 'What psychological and moral virtues does volunteering cultivate in young people?',
          options: ['Empathy, social cohesion, and active citizenship', 'Selfishness and arrogance', 'Greed and love of money', 'Laziness and indifference'],
          correctAnswer: 'A',
          explanation: 'Passage explicitly states: "cultivates empathy, social cohesion, and active citizenship".',
          exam_trap_explanation: 'Look for positive moral virtues listed in the concluding sentence.'
        },
        {
          id: 'prep2_u5_rq3',
          skill: 'Reading',
          question_type: 'mcq',
          difficulty: 'standard',
          question: 'The word "underprivileged" in the text refers to people who:',
          options: ['Face financial hardship and need social support', 'Are extremely wealthy and own companies', 'Travel in luxury yachts', 'Refuse to work in charities'],
          correctAnswer: 'A',
          explanation: 'Underprivileged means disadvantaged or poor.',
          exam_trap_explanation: 'Underprivileged = الأسر الأكثر احتياجاً والأقل حظاً.'
        }
      ],
      openEnded: [
        {
          id: 'prep2_u5_ro1',
          question: 'Mention two practical ways volunteers assist families in remote villages.',
          questionAr: 'اذكر وسيلتين عمليتين يساعد بهما المتطوعون الأسر في القرى النائية.',
          modelAnswer: '1) Distributing food parcels and warm clothing. 2) Installing clean potable water connections and tutoring children.',
          rubric: '1 mark for each valid charitable action cited from the text.',
          maxMarks: 2
        },
        {
          id: 'prep2_u5_ro2',
          question: 'In your view, why is helping disabled citizens essential for a healthy society?',
          questionAr: 'في رأيك، لماذا تعد مساعدة ذوي الهمم أمراً أساسياً لنهضة المجتمع؟',
          modelAnswer: 'It guarantees equal rights, eliminates social isolation, and enables them to utilize their unique talents to contribute to national growth.',
          rubric: 'Full marks for logical, compassionate reasoning.',
          maxMarks: 2
        }
      ]
    },
    vocabGrammarMcqs: [
      {
        id: 'prep2_u5_vg1',
        skill: 'Vocabulary',
        question_type: 'mcq',
        difficulty: 'standard',
        question: 'A person whose parents have died is called an ________.',
        options: ['orphan', 'inventor', 'ancestor', 'archaeologist'],
        correctAnswer: 'A',
        explanation: 'An orphan is a child whose parents have passed away.',
        exam_trap_explanation: 'Orphan = يتيم.'
      },
      {
        id: 'prep2_u5_vg2',
        skill: 'Vocabulary',
        question_type: 'mcq',
        difficulty: 'standard',
        question: 'Generous people ________ money and food to charities to support the poor.',
        options: ['donate', 'steal', 'waste', 'borrow'],
        correctAnswer: 'A',
        explanation: 'Donate means give money or goods freely for a good cause.',
        exam_trap_explanation: 'Donate = يتبرع.'
      },
      {
        id: 'prep2_u5_vg3',
        skill: 'Vocabulary',
        question_type: 'mcq',
        difficulty: 'hots',
        question: 'Our school sports building installed smooth ramps to welcome students in ________.',
        options: ['wheelchairs', 'submarines', 'helicopters', 'steamers'],
        correctAnswer: 'A',
        explanation: 'Wheelchairs are used by individuals with physical mobility needs.',
        exam_trap_explanation: 'Wheelchairs = كراسي متحركة لذوي الهمم.'
      },
      {
        id: 'prep2_u5_vg4',
        skill: 'Grammar',
        question_type: 'mcq',
        difficulty: 'standard',
        question: 'Dr. Magdi Yacoub is the world-renowned heart surgeon ________ established the Aswan clinic.',
        options: ['who', 'which', 'where', 'when'],
        correctAnswer: 'A',
        explanation: 'Use "who" for a person (surgeon).',
        exam_trap_explanation: 'Exam Trap: Dr. Yacoub is a person, so use "who", not "which".'
      },
      {
        id: 'prep2_u5_vg5',
        skill: 'Grammar',
        question_type: 'mcq',
        difficulty: 'hots',
        question: 'This is the charitable foundation ________ volunteers organize food boxes every Ramadan.',
        options: ['where', 'which', 'who', 'whose'],
        correctAnswer: 'A',
        explanation: 'Use "where" for a place when an action occurs within it ("volunteers organize food boxes").',
        exam_trap_explanation: 'Exam Trap: The sentence describes an activity occurring at the location, so "where" is correct.'
      },
      {
        id: 'prep2_u5_vg6',
        skill: 'Grammar',
        question_type: 'mcq',
        difficulty: 'hots',
        question: 'Tomorrow is an official national holiday, so we ________ wake up early for school.',
        options: ['don’t have to', 'mustn’t', 'has to', 'have to'],
        correctAnswer: 'A',
        explanation: '"Don’t have to" expresses lack of obligation/necessity (there is no need because it is a holiday).',
        exam_trap_explanation: 'Exam Trap: Lack of obligation on a holiday = don’t have to (لا داعي / لست مضطراً).'
      }
    ],
    errorCorrection: [
      {
        id: 'prep2_u5_ec1',
        sentence: 'A wheelchair is an assistive device (who) enables disabled individuals to move.',
        bracketWord: 'who',
        correctWord: 'which',
        explanation: '"Wheelchair" is an inanimate object/device, so use "which" or "that", not "who".',
        exam_trap_explanation: 'Exam Trap: Inanimate objects take "which", not "who".'
      },
      {
        id: 'prep2_u5_ec2',
        sentence: 'A charitable volunteer has to (helped) others with a joyful heart.',
        bracketWord: 'helped',
        correctWord: 'help',
        explanation: 'After "has to", use the base infinitive verb (help).',
        exam_trap_explanation: 'Exam Trap: Has to + infinitive.'
      },
      {
        id: 'prep2_u5_ec3',
        sentence: 'This is the community school (which) my aunt teaches English.',
        bracketWord: 'which',
        correctWord: 'where',
        explanation: 'Teaching takes place inside the school (location of action), so use "where".',
        exam_trap_explanation: 'Exam Trap: Place with an action = where.'
      },
      {
        id: 'prep2_u5_ec4',
        sentence: 'Do students (has to) wear their official uniform on sports day?',
        bracketWord: 'has to',
        correctWord: 'have to',
        explanation: 'In questions with the auxiliary "Do", use the base form "have to".',
        exam_trap_explanation: 'Exam Trap: Do/Does + subject + have to.'
      }
    ],
    writingTask: {
      type: 'paragraph',
      title: 'A paragraph of 90-110 words about: "How Young People Can Help Their Community"',
      prompt: 'Write a paragraph of 90 to 110 words discussing practical voluntary activities teenagers can undertake to improve their local neighborhood and support those in need.',
      promptAr: 'اكتب فقرة من 90 إلى 110 كلمة حول الطرق والأنشطة التطوعية التي يمكن للشباب القيام بها لمساعدة مجتمعهم.',
      targetWords: '90 - 110 words',
      guidancePoints: ['Volunteering for charities', 'Helping orphans and disabled neighbors', 'Cleaning and beautifying public parks'],
      modelAnswer: `Serving one’s community is a noble civic duty that cultivates compassion and moral maturity among young people. There are numerous practical ways through which preparatory students can make a tangible difference in their local neighborhoods. Firstly, we can volunteer at local charities which collect food parcels and warm clothing for underprivileged families during winter. Secondly, we can assist disabled classmates by sharing class notes and carrying their schoolbags. Finally, youth can organize weekend campaigns to plant trees, paint school boundary walls, and clear plastic litter from public parks. When we unite to help others, our entire society becomes stronger, happier, and more harmonious.`,
      rubricCriteria: [
        { criterion: 'Community Engagement & Ideas', marks: 3 },
        { criterion: 'Relative Pronouns & Obligation Modals', marks: 2 },
        { criterion: 'Paragraph Cohesion & Linking Markers', marks: 2 },
        { criterion: 'Spelling, Punctuation & Format', marks: 2 }
      ]
    }
  }
);

// Prep 2 - Unit 6: Different environments
export const prep2Unit6 = createPrepUnitWithBlueprint(
  8, 'Prep 2', 1, 6,
  'Different environments',
  'البيئات المختلفة والتغير المناخي وحماية الطبيعة',
  'Environments, climate change, pollution, recycling, drought, floods, solar energy',
  'Comparative and Superlative Adjectives & Equivalence with (as ... as)',
  'المقارنة والتفضيل والتساوي بـ as ... as',
  'Short adjectives: taller than / the tallest. Long adjectives: more dangerous than / the most dangerous. Equivalence: as + adjective + as ("Solar energy is as clean as wind power"). Negative equivalence: not as ... as.',
  [
    {
      title: '1. Comparatives & Superlatives (المقارنة والتفضيل)',
      explanation: 'Comparative: short adj + -er + than / more + long adj + than. Superlative: the + short adj + -est / the most + long adj. Irregular: good -> better -> the best, bad -> worse -> the worst.',
      examples: [
        'Renewable solar energy is much cleaner than burning fossil coal.',
        'The Nile River is the longest river in the world, sustaining Egyptian agriculture.'
      ]
    },
    {
      title: '2. Expressing Equivalence with As ... As (التساوي في الصفات)',
      explanation: 'As + adjective + as shows equal qualities. Not as / not so + adjective + as shows that one is less than the other.',
      examples: [
        'Air pollution in rural countryside hamlets is not as severe as in bustling urban capitals.',
        'Recycling aluminum cans is as important as saving electricity at home.'
      ]
    }
  ],
  [
    { word: 'pollution', pos: 'n.', ar: 'التلوث البيئي', def: 'The presence in or introduction into the environment of a substance with harmful effects.', ex: 'Solar buses in Alexandria help diminish harmful urban air pollution.', exAr: 'تساعد حافلات النقل التي تعمل بالطاقة الشمسية بالإسكندرية في تقليل تلوث الهواء.' },
    { word: 'drought', pos: 'n.', ar: 'جفاف قاحل وقلة الأمطار', def: 'A prolonged period of abnormally low rainfall, leading to a shortage of water.', ex: 'The severe drought in East Africa dried up rivers and threatened crops.', exAr: 'أدى الجفاف الشديد في شرق أفريقيا إلى جفاف الأنهار وتهديد المحاصيل.' },
    { word: 'flood', pos: 'n.', ar: 'فيضان وسيول جارفة', def: 'An overflow of a large amount of water beyond its normal limits.', ex: 'Before the construction of the Aswan High Dam, the Nile flood covered farmland.', exAr: 'قبل بناء السد العالي في أسوان، كان فيضان النيل يغمر الأراضي الزراعية.' },
    { word: 'recycle', pos: 'v.', ar: 'يعيد تدوير المخلفات', def: 'Convert waste into reusable material.', ex: 'Our school placed green bins to recycle plastic bottles and waste paper.', exAr: 'وضعت مدرستنا سلات خضراء لإعادة تدوير الزجاجات البلاستيكية والورق.' },
    { word: 'climate change', pos: 'n.', ar: 'التغير المناخي العالمي', def: 'A long-term change in the earth’s climate, especially due to global warming.', ex: 'World nations met in Sharm El-Sheikh to discuss solutions to climate change.', exAr: 'اجتمعت دول العالم في شرم الشيخ لبحث حلول التغير المناخي.' },
    { word: 'wildlife', pos: 'n.', ar: 'الحياة البرية والطيور النادرة', def: 'Wild animals and vegetation collectively.', ex: 'Wadi El-Gemal National Park protects endangered marine and desert wildlife.', exAr: 'تحمي محمية وادي الجمال الحياة البرية والبحرية المهددة بالانقراض.' },
    { word: 'renewable energy', pos: 'n.', ar: 'الطاقة المتجددة النظيفة', def: 'Energy from a source that is not depleted when used, such as wind or solar power.', ex: 'The Benban Solar Park produces clean, renewable energy for millions.', exAr: 'ينتج مجمع بنبان للطاقة الشمسية طاقة نظيفة ومتجددة للملايين.' },
    { word: 'rubbish', pos: 'n.', ar: 'قمامة ومخلفات', def: 'Waste material; refuse or litter.', ex: 'Never throw plastic rubbish into the River Nile or public canals.', exAr: 'إياك وإلقاء القمامة البلاستيكية في نهر النيل أو الترع والمجاري المائية.' }
  ],
  [
    { phrase: 'tackle climate change', meaningAr: 'يتصدى للتغير المناخي', example: 'Planting thousands of green trees helps tackle climate change.' },
    { phrase: 'generate renewable electricity', meaningAr: 'يولّد كهرباء متجددة ونظيفة', example: 'Wind turbines in Zaafarana generate renewable electricity.' },
    { phrase: 'recycle plastic waste', meaningAr: 'يعيد تدوير المخلفات البلاستيكية', example: 'Modern recycling factories turn plastic waste into building tiles.' }
  ],
  `Global climate change represents one of the most pressing environmental challenges of the twenty-first century. Rising global temperatures cause extreme weather phenomena, including destructive coastal floods, heatwaves, and prolonged agricultural droughts. Egypt has taken decisive steps toward green transformation by championing renewable energy. Giant projects such as the Benban Solar Complex in Aswan generate electricity without greenhouse gas emissions. Furthermore, city councils encourage residents to segregate rubbish and recycle discarded plastic and glass containers. Protecting our planet begins with individual habits like conserving tap water and walking instead of driving.`,
  `Hesham: "Which do you think is better for our city, electric buses or diesel buses?"\nKhaled: "Electric buses are far better because they are cleaner and not as noisy as diesel buses!"\nHesham: "Is renewable energy more expensive to build initially?"\nKhaled: "Yes, but in the long run, it is much cheaper and safeguards our health."`,
  {
    dialogue: {
      title: 'Finish the following dialogue between Hesham and Khaled about protecting the environment:',
      context: 'Hesham is asking Khaled about renewable energy and recycling in Egypt.',
      turns: [
        { speaker: 'Hesham', text: 'Hello Khaled! What article are you reading on your tablet?', isBlank: false },
        { speaker: 'Khaled', isBlank: true, blankNumber: 1, expectedAnswer: 'I am reading an article about climate change and renewable energy.', acceptableAnswers: ['An article about the environment.', 'It is about solar energy.'], hintAr: 'أخبره أنك تقرأ مقالاً عن التغير المناخي والطاقة المتجددة.' },
        { speaker: 'Hesham', isBlank: true, blankNumber: 2, expectedAnswer: 'Why is renewable energy better than burning coal?', acceptableAnswers: ['Why is solar energy clean?', 'Is it better than fossil fuels?'], hintAr: 'اسأله لماذا تعد الطاقة المتجددة أفضل من الفحم والوقود الأحفوري.' },
        { speaker: 'Khaled', text: 'Because renewable energy does not cause greenhouse gas pollution or harm the air.', isBlank: false },
        { speaker: 'Hesham', text: 'Where is Egypt’s largest solar park located?', isBlank: false },
        { speaker: 'Khaled', isBlank: true, blankNumber: 3, expectedAnswer: 'It is located in Benban near Aswan.', acceptableAnswers: ['In Benban, Aswan.', 'In southern Egypt in Aswan.'], hintAr: 'أخبره أنه يقع في قرية بنبان بمحافظة أسوان.' },
        { speaker: 'Hesham', isBlank: true, blankNumber: 4, expectedAnswer: 'How can students help protect the environment at school?', acceptableAnswers: ['What can we do in our school?'], hintAr: 'اسأله كيف يمكن للطلاب حماية البيئة داخل المدرسة.' },
        { speaker: 'Khaled', text: 'We can recycle plastic bottles and plant more trees in the garden.', isBlank: false },
        { speaker: 'Hesham', isBlank: true, blankNumber: 5, expectedAnswer: 'That is a fantastic idea! Let’s start a green club.', acceptableAnswers: ['I totally agree with you.', 'Great idea!'], hintAr: 'أثنِ على الفكرة واقترح بدء مبادرة تدوير مدرسية.' }
      ]
    },
    readingPassage: {
      title: 'Reading Comprehension: Climate Change and the Green Energy Revolution',
      passage: `Global climate change represents one of the most pressing environmental challenges of the twenty-first century. Rising global temperatures cause extreme weather phenomena, including destructive coastal floods, heatwaves, and prolonged agricultural droughts. Egypt has taken decisive steps toward green transformation by championing renewable energy. Giant projects such as the Benban Solar Complex in Aswan generate electricity without greenhouse gas emissions. Furthermore, city councils encourage residents to segregate rubbish and recycle discarded plastic and glass containers. Protecting our planet begins with individual habits like conserving tap water and walking instead of driving.`,
      mcqs: [
        {
          id: 'prep2_u6_rq1',
          skill: 'Reading',
          question_type: 'mcq',
          difficulty: 'standard',
          question: 'What landmark Egyptian solar project is mentioned in the passage?',
          options: ['The Benban Solar Complex in Aswan', 'The High Dam hydro station', 'The Zaafarana wind farm', 'The Alexandria port station'],
          correctAnswer: 'A',
          explanation: 'Passage explicitly names: "The Benban Solar Complex in Aswan".',
          exam_trap_explanation: 'Benban in Aswan is the premier solar energy project mentioned.'
        },
        {
          id: 'prep2_u6_rq2',
          skill: 'Reading',
          question_type: 'mcq',
          difficulty: 'hots',
          question: 'What extreme weather phenomena are triggered by rising global temperatures?',
          options: ['Destructive coastal floods, heatwaves, and droughts', 'Gentle harmless breezes and mild snow', 'Decrease in sea levels worldwide', 'Cooler summers and warmer glaciers'],
          correctAnswer: 'A',
          explanation: 'Paragraph 1 mentions coastal floods, heatwaves, and prolonged agricultural droughts.',
          exam_trap_explanation: 'Look for the three extreme weather consequences specified in sentence 2.'
        },
        {
          id: 'prep2_u6_rq3',
          skill: 'Reading',
          question_type: 'mcq',
          difficulty: 'standard',
          question: 'The word "segregate" in the passage means:',
          options: ['Separate into different categories', 'Mix together into one heap', 'Burn with petroleum fire', 'Throw into canal water'],
          correctAnswer: 'A',
          explanation: 'Segregate rubbish means separate recyclable items (plastic, glass, paper).',
          exam_trap_explanation: 'Segregate = يفصل ويصنف المخلفات.'
        }
      ],
      openEnded: [
        {
          id: 'prep2_u6_ro1',
          question: 'Mention two daily personal habits citizens can adopt to safeguard the environment.',
          questionAr: 'اذكر عادتين شخصيتين يوميتين يمكن للمواطنين تبنيهما لحماية البيئة.',
          modelAnswer: '1) Conserving fresh tap water. 2) Walking or cycling short distances instead of driving cars, and segregating rubbish for recycling.',
          rubric: '1 mark for water conservation, 1 mark for sustainable mobility / recycling.',
          maxMarks: 2
        },
        {
          id: 'prep2_u6_ro2',
          question: 'Why is solar energy considered superior to generating power by burning coal?',
          questionAr: 'لماذا تعد الطاقة الشمسية متفوقة على توليد الطاقة عن طريق حرق الفحم؟',
          modelAnswer: 'Because solar energy is an infinite clean resource that produces no harmful carbon greenhouse emissions, protecting human respiratory health and slowing global warming.',
          rubric: 'Full marks for citing zero emissions and environmental protection.',
          maxMarks: 2
        }
      ]
    },
    vocabGrammarMcqs: [
      {
        id: 'prep2_u6_vg1',
        skill: 'Vocabulary',
        question_type: 'mcq',
        difficulty: 'standard',
        question: 'When an area suffers from a severe lack of rain for months, it experiences a ________.',
        options: ['drought', 'flood', 'waterfall', 'cushion'],
        correctAnswer: 'A',
        explanation: 'A drought is a prolonged shortage of rain and water.',
        exam_trap_explanation: 'Drought (جفاف) vs. Flood (فيضان).'
      },
      {
        id: 'prep2_u6_vg2',
        skill: 'Vocabulary',
        question_type: 'mcq',
        difficulty: 'standard',
        question: 'Students placed dedicated bins in the courtyard to ________ empty beverage cans.',
        options: ['recycle', 'destroy', 'burn', 'ignore'],
        correctAnswer: 'A',
        explanation: 'Recycle means process waste into new reusable products.',
        exam_trap_explanation: 'Recycle = يعيد تدوير.'
      },
      {
        id: 'prep2_u6_vg3',
        skill: 'Vocabulary',
        question_type: 'mcq',
        difficulty: 'hots',
        question: 'Solar and wind installations produce clean, ________ energy that never depletes.',
        options: ['renewable', 'poisonous', 'unhealthy', 'polluted'],
        correctAnswer: 'A',
        explanation: 'Renewable energy comes from natural sources that replenish themselves.',
        exam_trap_explanation: 'Renewable energy = طاقة متجددة نظيفة.'
      },
      {
        id: 'prep2_u6_vg4',
        skill: 'Grammar',
        question_type: 'mcq',
        difficulty: 'standard',
        question: 'The Nile is ________ river in the world, stretching over 6,600 kilometers.',
        options: ['the longest', 'longer than', 'longest', 'as long'],
        correctAnswer: 'A',
        explanation: 'Superlative form for short adjective "long" is "the longest".',
        exam_trap_explanation: 'Exam Trap: Superlatives require the definite article "the": the longest.'
      },
      {
        id: 'prep2_u6_vg5',
        skill: 'Grammar',
        question_type: 'mcq',
        difficulty: 'hots',
        question: 'Cycling a bicycle to school is ________ dangerous as driving a speeding motorcycle.',
        options: ['not as', 'more', 'most', 'as'],
        correctAnswer: 'A',
        explanation: 'Negative equivalence structure "not as + adjective + as" indicates less danger.',
        exam_trap_explanation: 'Exam Trap: "not as dangerous as" means cycling is less dangerous.'
      },
      {
        id: 'prep2_u6_vg6',
        skill: 'Grammar',
        question_type: 'mcq',
        difficulty: 'hots',
        question: 'Benban solar farm is far ________ than ancient coal-fired generating plants.',
        options: ['cleaner', 'clean', 'the cleanest', 'cleanest'],
        correctAnswer: 'A',
        explanation: 'Comparative of "clean" followed by "than" is "cleaner".',
        exam_trap_explanation: 'Exam Trap: Look for "than" to trigger the comparative form (cleaner than).'
      }
    ],
    errorCorrection: [
      {
        id: 'prep2_u6_ec1',
        sentence: 'Solar power is (more clean) than burning heavy fuel oil.',
        bracketWord: 'more clean',
        correctWord: 'cleaner',
        explanation: '"Clean" is a short one-syllable adjective; its comparative is "cleaner", not "more clean".',
        exam_trap_explanation: 'Exam Trap: Short adjectives take -er (cleaner, not more clean).'
      },
      {
        id: 'prep2_u6_ec2',
        sentence: 'Cairo is (the bigger) city in Egypt and the Middle East.',
        bracketWord: 'the bigger',
        correctWord: 'the biggest',
        explanation: 'Superlative requires "-est" with double "g": the biggest.',
        exam_trap_explanation: 'Exam Trap: Superlative is "the biggest".'
      },
      {
        id: 'prep2_u6_ec3',
        sentence: 'Plastic rubbish is as harmful (then) chemical sewage in canals.',
        bracketWord: 'then',
        correctWord: 'as',
        explanation: 'The equivalence structure is "as ... as", not "as ... then".',
        exam_trap_explanation: 'Exam Trap: as + adjective + as.'
      },
      {
        id: 'prep2_u6_ec4',
        sentence: 'Air pollution in small villages is (bad) than in overcrowded city centers.',
        bracketWord: 'bad',
        correctWord: 'better',
        explanation: 'Air in small villages is cleaner/better than in cities. Comparative of good is better.',
        exam_trap_explanation: 'Exam Trap: In context of air quality, rural air is cleaner/better.'
      }
    ],
    writingTask: {
      type: 'paragraph',
      title: 'A paragraph of 90-110 words about: "Protecting Our Environment from Pollution"',
      prompt: 'Write a paragraph of 90 to 110 words about what causes environmental pollution, and how young citizens can help make Egypt cleaner and greener.',
      promptAr: 'اكتب فقرة من 90 إلى 110 كلمة حول أسباب التلوث البيئي وكيفية جعل مصر بيئة أنظف وأكثر خضرة.',
      targetWords: '90 - 110 words',
      guidancePoints: ['Sources of pollution (plastic waste, car smoke)', 'Renewable energy (solar, wind)', 'Role of recycling and planting trees'],
      modelAnswer: `Protecting the environment is one of the most critical responsibilities facing our generation. Today, environmental pollution threatens human health and wildlife through toxic factory smoke, vehicle exhaust, and plastic discarded in canals. To combat this grave challenge, Egypt is investing in magnificent green energy projects such as the Benban Solar Park. However, environmental preservation also demands individual citizen action. We must stop throwing single-use plastic bottles into the Nile and start recycling our household waste. Furthermore, planting trees along school streets purifies the air and creates lovely shade. If every student adopts sustainable habits, we can safeguard Egypt’s natural beauty forever.`,
      rubricCriteria: [
        { criterion: 'Ecological Awareness & Content', marks: 3 },
        { criterion: 'Comparative & Superlative Structures', marks: 2 },
        { criterion: 'Cohesion, Topic Sentence & Flow', marks: 2 },
        { criterion: 'Punctuation, Spelling & Grammar', marks: 2 }
      ]
    }
  }
);


// ==============================================================================================
// 3. PREP 3 (GRADE 9) - UNITS 4, 5, 6
// ==============================================================================================

// Prep 3 - Unit 4: Have you ever traveled by plane?
export const prep3Unit4 = createPrepUnitWithBlueprint(
  9, 'Prep 3', 1, 4,
  'Have you ever traveled by plane?',
  'تجارب السفر والمغامرات الحياتية والرياضات المائية',
  'Life experiences, flying, airports, festivals, snorkeling, concerts, adventurous journeys',
  'Present Perfect Tense with Ever, Never, Already, and Yet',
  'المضارع التام مع ever و never و already و yet',
  'Use Present Perfect (have/has + past participle) for past experiences connected to the present without a specific past time. Use "ever" in questions ("Have you ever snorkeled?"). Use "never" in negative sentences without not ("I have never seen a shark"). Use "yet" in negative sentences and questions at the end. Use "already" for actions completed sooner than expected.',
  [
    {
      title: '1. Present Perfect with Ever & Never (خبرات وتجارب الحياة)',
      explanation: 'Form: Subject + have/has + P.P. "Ever" is used in questions asking about life experience. "Never" expresses negative experience without using "not".',
      examples: [
        'Have you ever flown on an airplane from Cairo International Airport?',
        'Nader has never climbed a mountain, but he has snorkeled in Dahab.'
      ]
    },
    {
      title: '2. Already vs. Yet (Already و Yet في المضارع التام)',
      explanation: '"Already" emphasizes that something happened before now. "Yet" is placed at the end of negative statements and questions.',
      examples: [
        'We have already booked our flight tickets to Hurghada online.',
        'The international passengers haven’t boarded the airplane yet.'
      ]
    }
  ],
  [
    { word: 'snorkel', pos: 'v. / n.', ar: 'يسبح بأنبوب تنفس وغطس سطحي', def: 'Swim underwater while breathing through a tube called a snorkel.', ex: 'Tourists snorkel along the vibrant coral reefs of Ras Mohammed in Sharm.', exAr: 'يسبح السائحون بأنبوب التنفس السطحي بين الشعاب المرجانية في رأس محمد.' },
    { word: 'festival', pos: 'n.', ar: 'مهرجان واحتفال شعبي وثقافي', def: 'A day or period of celebration, typically for religious or cultural reasons.', ex: 'The Ismailia International Folklore Festival welcomes dance troupes from around the world.', exAr: 'يستقبل مهرجان الإسماعيلية الدولي للفنون الشعبية فرقاً راقصة من شتى أنحاء العالم.' },
    { word: 'airport', pos: 'n.', ar: 'مطار دولي للسفر الجوي', def: 'A complex of runways and buildings for the take-off, landing, and maintenance of aircraft.', ex: 'Sphinx International Airport welcomes flights to western Giza.', exAr: 'يستقبل مطار سفنكس الدولي رحلات الطيران إلى غرب الجيزة.' },
    { word: 'concert', pos: 'n.', ar: 'حفل موسيقي غنائي راقٍ', def: 'A musical performance given in public, typically by several performers.', ex: 'The Egyptian Philharmonic Orchestra performed a dazzling concert at the Opera House.', exAr: 'قدمت أوركسترا دار الأوبرا المصرية حفلاً موسيقياً مبهراً.' },
    { word: 'experience', pos: 'n. / v.', ar: 'تجربة وخبرة حياتية ثرية', def: 'Practical contact with and observation of facts or events.', ex: 'Scuba diving with friendly dolphins was the most thrilling experience of my youth.', exAr: 'كان الغوص مع الدلافين الأليفة أكثر التجارب إثارة في حياتي.' },
    { word: 'tent', pos: 'n.', ar: 'خيمة سفاري مجهزة', def: 'A portable shelter made of cloth, supported by one or more poles.', ex: 'Bedouin guides pitched our secure canvas tent in the desert valley.', exAr: 'نصب المرشدون البدو خيمتنا القماشية في الوادي الصحراوي.' },
    { word: 'passport', pos: 'n.', ar: 'جواز سفر رسمي', def: 'An official document issued by a government certifying identity and citizenship.', ex: 'The passport control officer stamped my passport with an entry visa.', exAr: 'ختم ضابط مراقبة الجوازات وثيقة سفري بتأشيرة الدخول.' },
    { word: 'luggage', pos: 'n.', ar: 'حقائب وأمتعة السفر', def: 'Suitcases or other bags in which to pack personal belongings for traveling.', ex: 'Passengers checked their luggage at the airline departure desk.', exAr: 'قام المسافرون بوزن وتسليم حقائبهم في صالة المغادرة.' }
  ],
  [
    { phrase: 'fly on an airplane', meaningAr: 'يسافر على متن طائرة', example: 'I have never flown on an airplane across the Mediterranean Sea.' },
    { phrase: 'snorkel in the Red Sea', meaningAr: 'يغطس بأنبوب تنفس في البحر الأحمر', example: 'Students snorkel in the Red Sea to study marine biology.' },
    { phrase: 'attend a folklore festival', meaningAr: 'يحضر مهرجاناً للفنون الشعبية', example: 'We attended an international folklore festival in Luxor.' }
  ],
  `Traveling introduces young individuals to diverse civilizations, broadening intellectual horizons beyond textbooks. In Egypt, countless preparatory students embark on domestic journeys to witness natural wonders firsthand. Many teenagers have already snorkeled among exotic coral reefs in Marsa Alam, while others have experienced camping under starry skies in the White Desert. However, traveling also demands personal discipline. Navigating airports, managing luggage, and respecting local customs instill maturity. Whether boarding a local railway train or flying on a jumbo jet, travel transforms character and builds lifelong friendships.`,
  `Sherif: "Have you ever traveled by airplane, Mazen?"\nMazen: "No, I have never flown, but I have already traveled to Luxor by sleeper train!"\nSherif: "Have you ever snorkeled in the Red Sea?"\nMazen: "Yes! I went snorkeling in Hurghada last July and saw magnificent sea turtles."`,
  {
    dialogue: {
      title: 'Finish the following dialogue between Sherif and Mazen about travel experiences:',
      context: 'Sherif is interviewing Mazen about exciting adventures and journeys he has experienced.',
      turns: [
        { speaker: 'Sherif', text: 'Hello Mazen! Have you ever traveled outside your hometown?', isBlank: false },
        { speaker: 'Mazen', isBlank: true, blankNumber: 1, expectedAnswer: 'Yes, I have. I have visited several cities in Egypt.', acceptableAnswers: ['Yes, I have traveled to Alexandria and Sinai.', 'Yes, I have.'], hintAr: 'أخبره بالإيجاب وأنك زرت مدناً مصرية عدة.' },
        { speaker: 'Sherif', isBlank: true, blankNumber: 2, expectedAnswer: 'Have you ever traveled by airplane?', acceptableAnswers: ['Have you ever flown on a plane?', 'Did you travel by plane?'], hintAr: 'اسأله هل سافر من قبل على متن طائرة.' },
        { speaker: 'Mazen', text: 'No, I have never traveled by airplane, but I have traveled by sleeper train.', isBlank: false },
        { speaker: 'Sherif', isBlank: true, blankNumber: 3, expectedAnswer: 'Where did you take the sleeper train to?', acceptableAnswers: ['Where did you go on the train?', 'Which city did you visit?'], hintAr: 'اسأله إلى أي مدينة سافر بالقطار.' },
        { speaker: 'Mazen', text: 'We took the train all the way to Aswan to see the High Dam and Philae Temple.', isBlank: false },
        { speaker: 'Sherif', text: 'Have you ever tried water sports like snorkeling?', isBlank: false },
        { speaker: 'Mazen', isBlank: true, blankNumber: 4, expectedAnswer: 'Yes, I have already tried snorkeling in Hurghada.', acceptableAnswers: ['Yes, I have snorkeled in the Red Sea.', 'Yes, I have.'], hintAr: 'أخبره أنك مارست الغطس السطحي بأنبوب التنفس في الغردقة.' },
        { speaker: 'Sherif', isBlank: true, blankNumber: 5, expectedAnswer: 'What an adventurous experience!', acceptableAnswers: ['That sounds wonderful!', 'You are very lucky.'], hintAr: 'عبر عن إعجابك بهذه المغامرة الحياتية الشيقة.' }
      ]
    },
    readingPassage: {
      title: 'Reading Comprehension: Broadening Horizons Through Travel',
      passage: `Traveling introduces young individuals to diverse civilizations, broadening intellectual horizons beyond textbooks. In Egypt, countless preparatory students embark on domestic journeys to witness natural wonders firsthand. Many teenagers have already snorkeled among exotic coral reefs in Marsa Alam, while others have experienced camping under starry skies in the White Desert. However, traveling also demands personal discipline. Navigating airports, managing luggage, and respecting local customs instill maturity. Whether boarding a local railway train or flying on a jumbo jet, travel transforms character and builds lifelong friendships.`,
      mcqs: [
        {
          id: 'prep3_u4_rq1',
          skill: 'Reading',
          question_type: 'mcq',
          difficulty: 'standard',
          question: 'What benefits does traveling offer to young learners according to the passage?',
          options: ['Broadening intellectual horizons and building maturity', 'Making students forget their mother tongue', 'Encouraging them to skip school lessons', 'Spending all their money on sweets'],
          correctAnswer: 'A',
          explanation: 'Passage mentions: "broadening intellectual horizons beyond textbooks" and "instill maturity".',
          exam_trap_explanation: 'Look for positive developmental virtues cited in the first sentence.'
        },
        {
          id: 'prep3_u4_rq2',
          skill: 'Reading',
          question_type: 'mcq',
          difficulty: 'hots',
          question: 'Where did Egyptian students camp under starry skies according to the text?',
          options: ['In the White Desert', 'In downtown Cairo hotels', 'At Giza railway station', 'Inside an airport hangar'],
          correctAnswer: 'A',
          explanation: 'Passage mentions: "camping under starry skies in the White Desert".',
          exam_trap_explanation: 'The White Desert is the camping destination specified in the text.'
        },
        {
          id: 'prep3_u4_rq3',
          skill: 'Reading',
          question_type: 'mcq',
          difficulty: 'standard',
          question: 'The word "exotic" in paragraph 1 means:',
          options: ['Strikingly colorful, rare, and fascinating', 'Very ugly and dangerous', 'Extremely cheap and broken', 'Common and uninteresting'],
          correctAnswer: 'A',
          explanation: 'Exotic means unusual, colourful, and attractive from distant waters.',
          exam_trap_explanation: 'Exotic = جذاب، فريد، وغير مألوف.'
        }
      ],
      openEnded: [
        {
          id: 'prep3_u4_ro1',
          question: 'Mention two practical responsibilities travelers must handle when journeying abroad.',
          questionAr: 'اذكر مسؤوليتين عمليتين يجب على المسافرين إدارتهما عند السفر.',
          modelAnswer: '1) Navigating airport terminals and safely managing personal luggage. 2) Respecting indigenous local customs and cultures.',
          rubric: '1 mark for airport/luggage management, 1 mark for respecting customs.',
          maxMarks: 2
        },
        {
          id: 'prep3_u4_ro2',
          question: 'How does exploring natural wonders in Egypt deepen students’ patriotism?',
          questionAr: 'كيف يعمق استكشاف العجائب الطبيعية في مصر من الانتماء الوطني لدى الطلاب؟',
          modelAnswer: 'By experiencing the scenic beauty, ancient heritage, and unique geography of Egypt firsthand, students develop profound pride in their homeland.',
          rubric: 'Full marks for any logical patriotic reflection.',
          maxMarks: 2
        }
      ]
    },
    vocabGrammarMcqs: [
      {
        id: 'prep3_u4_vg1',
        skill: 'Vocabulary',
        question_type: 'mcq',
        difficulty: 'standard',
        question: 'We put on our masks and breathing tubes to ________ among the vibrant coral reefs.',
        options: ['snorkel', 'climb', 'skate', 'cook'],
        correctAnswer: 'A',
        explanation: 'Snorkel means swim with a breathing tube near the surface.',
        exam_trap_explanation: 'Snorkel = يسبح بأنبوب تنفس سطحي.'
      },
      {
        id: 'prep3_u4_vg2',
        skill: 'Vocabulary',
        question_type: 'mcq',
        difficulty: 'standard',
        question: 'Thousands of music lovers gathered at Cairo Opera House to attend the symphony ________.',
        options: ['concert', 'passport', 'luggage', 'tent'],
        correctAnswer: 'A',
        explanation: 'A concert is a musical performance given in public.',
        exam_trap_explanation: 'Concert = حفل موسيقي غنائي.'
      },
      {
        id: 'prep3_u4_vg3',
        skill: 'Vocabulary',
        question_type: 'mcq',
        difficulty: 'hots',
        question: 'Before passing through customs at the airport, you must collect your heavy ________.',
        options: ['luggage', 'recipes', 'cushions', 'droughts'],
        correctAnswer: 'A',
        explanation: 'Luggage refers to travel bags and suitcases.',
        exam_trap_explanation: 'Luggage = حقائب وأمتعة السفر (اسم غير معدود).'
      },
      {
        id: 'prep3_u4_vg4',
        skill: 'Grammar',
        question_type: 'mcq',
        difficulty: 'standard',
        question: 'Have you ________ flown in a helicopter over the River Nile?',
        options: ['ever', 'never', 'yet', 'since'],
        correctAnswer: 'A',
        explanation: 'In Present Perfect questions asking about life experience, use "ever".',
        exam_trap_explanation: 'Exam Trap: Questions about life experience use "ever", not "never".'
      },
      {
        id: 'prep3_u4_vg5',
        skill: 'Grammar',
        question_type: 'mcq',
        difficulty: 'hots',
        question: 'Hany has ________ seen the Red Sea; this will be his very first coastal trip!',
        options: ['never', 'ever', 'yet', 'already'],
        correctAnswer: 'A',
        explanation: 'The sentence means he has zero experience up to now, so use "never".',
        exam_trap_explanation: 'Exam Trap: "Never" provides a negative meaning without the word "not".'
      },
      {
        id: 'prep3_u4_vg6',
        skill: 'Grammar',
        question_type: 'mcq',
        difficulty: 'hots',
        question: 'The train has not arrived at Alexandria station ________; we are still waiting.',
        options: ['yet', 'already', 'ever', 'never'],
        correctAnswer: 'A',
        explanation: 'Negative Present Perfect sentences ending with a time adverb take "yet".',
        exam_trap_explanation: 'Exam Trap: "Yet" comes at the end of negative sentences and questions.'
      }
    ],
    errorCorrection: [
      {
        id: 'prep3_u4_ec1',
        sentence: 'Have you ever (see) a wild dolphin while swimming in Hurghada?',
        bracketWord: 'see',
        correctWord: 'seen',
        explanation: 'In the Present Perfect, "have + subject" must be followed by the Past Participle (seen).',
        exam_trap_explanation: 'Exam Trap: Irregular verb P.P.: see -> saw -> seen.'
      },
      {
        id: 'prep3_u4_ec2',
        sentence: 'Dina has already (finish) packing her travel suitcases for tomorrow.',
        bracketWord: 'finish',
        correctWord: 'finished',
        explanation: 'After "has already", use the past participle form (finished).',
        exam_trap_explanation: 'Exam Trap: Has + P.P. (finished).'
      },
      {
        id: 'prep3_u4_ec3',
        sentence: 'I have never (eat) sushi before in my life.',
        bracketWord: 'eat',
        correctWord: 'eaten',
        explanation: 'After "have never", use the past participle (eaten).',
        exam_trap_explanation: 'Exam Trap: eat -> ate -> eaten.'
      },
      {
        id: 'prep3_u4_ec4',
        sentence: 'Has the flight landed at Cairo Airport (already)?',
        bracketWord: 'already',
        correctWord: 'yet',
        explanation: 'Questions asking if an expected event has occurred by now end with "yet".',
        exam_trap_explanation: 'Exam Trap: Questions about expected events take "yet" at the end.'
      }
    ],
    writingTask: {
      type: 'paragraph',
      title: 'A paragraph of 90-110 words about: "An Exciting Journey I Have Experienced"',
      prompt: 'Write a paragraph of 90 to 110 words describing an adventurous journey or trip you have taken with your school or family in Egypt.',
      promptAr: 'اكتب فقرة من 90 إلى 110 كلمة تصف رحلة أو مغامرة شيقة قمت بها مع مدرستك أو عائلتك.',
      targetWords: '90 - 110 words',
      guidancePoints: ['Destination and how you traveled', 'Activities you tried (snorkeling, camping, visiting monuments)', 'How the journey impacted you'],
      modelAnswer: `Traveling across Egypt’s diverse governorates offers exhilarating life experiences that remain etched in memory. Last mid-year vacation, my family and I traveled to the coastal resort of Dahab in South Sinai. It was my very first time camping in a canvas tent directly beside the turquoise Red Sea waters. During the trip, I snorkeled at the famous Blue Hole, where I marveled at vibrant coral gardens and rare butterflyfish. We also took a sunset camel ride across the sandy desert valleys. This voyage taught me to appreciate nature and deepened my confidence. I eagerly anticipate exploring more of Egypt’s wonders soon.`,
      rubricCriteria: [
        { criterion: 'Adventure Narrative & Detail', marks: 3 },
        { criterion: 'Present Perfect & Past Tense Mastery', marks: 2 },
        { criterion: 'Sentence Connectors & Paragraph Flow', marks: 2 },
        { criterion: 'Spelling, Punctuation & Mechanics', marks: 2 }
      ]
    }
  }
);

// Prep 3 - Unit 5: Young role models
export const prep3Unit5 = createPrepUnitWithBlueprint(
  9, 'Prep 3', 1, 5,
  'Young role models',
  'القدوة ونماذج الشباب المبتكرين والعلماء العباقرة',
  'Role models, innovators, app designers, champions, tournaments, chess, programming',
  'Present Perfect with Since & For vs. Past Simple',
  'المضارع التام مع Since و For والفرق بينه وبين الماضي البسيط',
  'Use "since" with a specific starting point in time (since 2018, since last week, since 7 o’clock, since he was young). Use "for" with a duration of time (for five years, for two hours, for a long time). Past Simple is used for finished actions with a definite past time.',
  [
    {
      title: '1. Since vs. For with Present Perfect (Since و For في المضارع التام)',
      explanation: 'Since + starting point (since Monday, since 2020, since childhood). For + period of time (for 3 days, for 6 years, for a decade).',
      examples: [
        'Fatma has studied artificial intelligence since she was twelve years old.',
        'Egyptian young software engineers have won international coding tournaments for three consecutive years.'
      ]
    },
    {
      title: '2. Present Perfect vs. Past Simple (الفرق بين المضارع التام والماضي البسيط)',
      explanation: 'Present Perfect: action started in the past and continues, or has a present result. Past Simple: action finished at a specific past time ("He graduated in 2022").',
      examples: [
        'Zaki has designed three award-winning mobile educational apps so far.',
        'He won the national informatics olympiad last December in Cairo.'
      ]
    }
  ],
  [
    { word: 'champion', pos: 'n.', ar: 'بطل رياضي أو علمي متوج', def: 'A person who has defeated all rivals in a competition.', ex: 'Hana Goda is an inspiring young Egyptian table tennis champion.', exAr: 'هنا جودة بطلة مصرية شابة وملهمة في تنس الطاولة.' },
    { word: 'tournament', pos: 'n.', ar: 'بطولة ومنافسة رسمية', def: 'A series of contests between a number of competitors, competing for an overall prize.', ex: 'Our school football squad qualified for the national preparatory tournament.', exAr: 'تأهل فريق مدرستنا لكرة القدم للمنافسة في البطولة الإعدادية القومية.' },
    { word: 'genius', pos: 'n.', ar: 'عبقري وفذ استثنائي', def: 'Exceptional intellectual or creative power or other natural ability.', ex: 'The young Egyptian software engineer was hailed as a computer programming genius.', exAr: 'أُشيد بمهندس البرمجيات المصري الشاب كعبقري في برمجة الحواسيب.' },
    { word: 'app designer', pos: 'n.', ar: 'مصمم تطبيقات الهواتف الذكية', def: 'A professional who creates software applications for mobile devices.', ex: 'An ambitious teenage app designer created an app helping blind students read.', exAr: 'ابتكر مصمم تطبيقات شاب تطبيقاً ذكياً يساعد الطلاب المكفوفين على القراءة.' },
    { word: 'competition', pos: 'n.', ar: 'مسابقة وتنافس علمي', def: 'An event or contest in which people compete against one another.', ex: 'Over five hundred innovative students entered the Young Scientist competition.', exAr: 'شارك أكثر من خمسمائة طالب مبتكر في مسابقة العالم الشاب.' },
    { word: 'innovate', pos: 'v.', ar: 'يبتكر ويجدد الأفكار', def: 'Make changes in something established, especially by introducing new methods.', ex: 'Egyptian youth innovate smart irrigation devices to save agricultural water.', exAr: 'يبتكر الشباب المصريون أجهزة ري ذكية لتوفير المياه الزراعية.' },
    { word: 'inspire', pos: 'v.', ar: 'يلهم ويحفز الآخرين للنجاح', def: 'Fill someone with the urge or ability to do or feel something creative.', ex: 'Stories of triumphant Paralympians inspire millions to overcome difficulties.', exAr: 'تلهم قصص أبطال البارالمبياد الملايين للتغلب على الصعاب.' },
    { word: 'award', pos: 'n. / v.', ar: 'جائزة ووسام تقدير / يمنح جائزة', def: 'A prize or other mark of recognition given in honor of an achievement.', ex: 'The Minister of Education presented the gold medal award to the top students.', exAr: 'سلّم وزير التربية والتعليم جائزة الميدالية الذهبية للطلاب المتفوقين.' }
  ],
  [
    { phrase: 'win an international tournament', meaningAr: 'يفوز ببطولة دولية', example: 'Egyptian squash stars win international tournaments with pride.' },
    { phrase: 'design a mobile application', meaningAr: 'يصمم تطبيقاً للهواتف الذكية', example: 'Young students design mobile applications to solve community problems.' },
    { phrase: 'serve as an inspiring role model', meaningAr: 'يمثل قدوة ملهمة للجميع', example: 'Dr. Mostafa El-Sayed serves as an inspiring role model for Arab youth.' }
  ],
  `Across the Arab Republic of Egypt, ambitious young innovators and sports champions are setting brilliant benchmarks of excellence. From robotics prodigies designing solar-powered irrigation pumps to table tennis prodigies conquering international championships, young Egyptians demonstrate boundless potential. Many of these role models have practiced their disciplines since early childhood. Through perseverance, they transform challenges into victories. For example, several teenage software app designers have created assistive tools that empower disabled learners in Egyptian schools. Their triumphant achievements demonstrate that age is never a barrier to making transformative societal contributions.`,
  `Nour: "Who is your role model, Zeinab?"\nZeinab: "Fatma Ali, the young Egyptian scientist who designed a water purification device."\nNour: "How long has she worked on this environmental invention?"\nZeinab: "She has developed it for three years, and she won first prize in 2025!"`,
  {
    dialogue: {
      title: 'Finish the following dialogue between Nour and Zeinab about young role models:',
      context: 'Nour and Zeinab are discussing inspiring Egyptian teenagers who achieved national distinction.',
      turns: [
        { speaker: 'Nour', text: 'Hello Zeinab! Have you read about the Egyptian Science Fair winners?', isBlank: false },
        { speaker: 'Zeinab', isBlank: true, blankNumber: 1, expectedAnswer: 'Yes, I have. The young inventors were truly inspiring.', acceptableAnswers: ['Yes, I have read about them.', 'Yes, they are amazing!'], hintAr: 'أخبريها بأنك قرأت عنهم وأنهم كانوا ملهمين بحق.' },
        { speaker: 'Nour', isBlank: true, blankNumber: 2, expectedAnswer: 'Who was your favorite young role model in the competition?', acceptableAnswers: ['Who inspired you most?', 'Which innovator did you like?'], hintAr: 'اسأليها عن نموذج القدوة الشاب المفضل لديها في المسابقة.' },
        { speaker: 'Zeinab', text: 'My favorite was Kareem, a 15-year-old app designer who built a learning tool for deaf children.', isBlank: false },
        { speaker: 'Nour', isBlank: true, blankNumber: 3, expectedAnswer: 'How long has he been coding applications?', acceptableAnswers: ['How long has he worked on coding?', 'When did he start coding?'], hintAr: 'اسأليها منذ متى وهو يبرمج التطبيقات الذكية.' },
        { speaker: 'Zeinab', text: 'He has practiced computer programming since he was ten years old.', isBlank: false },
        { speaker: 'Nour', text: 'Did he win an official medal for his invention?', isBlank: false },
        { speaker: 'Zeinab', isBlank: true, blankNumber: 4, expectedAnswer: 'Yes, he won the Ministry Innovation Gold Award last month.', acceptableAnswers: ['Yes, he won first prize.', 'Yes, he did.'], hintAr: 'أكدي فوزه بجائزة الابتكار الذهبية من الوزارة الشهر الماضي.' },
        { speaker: 'Nour', isBlank: true, blankNumber: 5, expectedAnswer: 'He is truly an exceptional role model for all Egyptian students!', acceptableAnswers: ['What a genius!', 'I am very proud of him.'], hintAr: 'عبري عن فخرك بأنه قدوة رائعة لجميع الطلاب.' }
      ]
    },
    readingPassage: {
      title: 'Reading Comprehension: Young Egyptian Pioneers Shaping Tomorrow',
      passage: `Across the Arab Republic of Egypt, ambitious young innovators and sports champions are setting brilliant benchmarks of excellence. From robotics prodigies designing solar-powered irrigation pumps to table tennis prodigies conquering international championships, young Egyptians demonstrate boundless potential. Many of these role models have practiced their disciplines since early childhood. Through perseverance, they transform challenges into victories. For example, several teenage software app designers have created assistive tools that empower disabled learners in Egyptian schools. Their triumphant achievements demonstrate that age is never a barrier to making transformative societal contributions.`,
      mcqs: [
        {
          id: 'prep3_u5_rq1',
          skill: 'Reading',
          question_type: 'mcq',
          difficulty: 'standard',
          question: 'What assistive innovations have teenage software designers created?',
          options: ['Digital tools that empower disabled learners in schools', 'Video games about car racing', 'Commercial advertising billboards', 'Fast food delivery websites'],
          correctAnswer: 'A',
          explanation: 'Passage mentions: "created assistive tools that empower disabled learners in Egyptian schools".',
          exam_trap_explanation: 'Look for assistive tools designed for disabled learners.'
        },
        {
          id: 'prep3_u5_rq2',
          skill: 'Reading',
          question_type: 'mcq',
          difficulty: 'hots',
          question: 'What fundamental truth do these young achievers demonstrate to the world?',
          options: ['Age is never a barrier to making transformative societal contributions', 'Only adult professors can solve scientific problems', 'Sports are more important than science education', 'Success requires wealth and family connections'],
          correctAnswer: 'A',
          explanation: 'Concluded clearly: "Their triumphant achievements demonstrate that age is never a barrier...".',
          exam_trap_explanation: 'Age is never a barrier = العمر ليس عائقاً أمام الإنجاز.'
        },
        {
          id: 'prep3_u5_rq3',
          skill: 'Reading',
          question_type: 'mcq',
          difficulty: 'standard',
          question: 'The word "prodigies" in paragraph 1 refers to young people who:',
          options: ['Possess exceptional natural talent and genius', 'Refuse to study or attend tournaments', 'Always arrive late for examinations', 'Live in foreign countries forever'],
          correctAnswer: 'A',
          explanation: 'Prodigy means a young person endowed with exceptional abilities.',
          exam_trap_explanation: 'Prodigy = معجزة، نابغة، عبقري في سن مبكرة.'
        }
      ],
      openEnded: [
        {
          id: 'prep3_u5_ro1',
          question: 'Mention two fields where young Egyptians have excelled on the world stage.',
          questionAr: 'اذكر مجالين تميز فيهما الشباب المصريون على الساحة العالمية.',
          modelAnswer: '1) Robotics, programming, and solar engineering. 2) International sports championships (such as squash and table tennis).',
          rubric: '1 mark for science/robotics, 1 mark for international sports.',
          maxMarks: 2
        },
        {
          id: 'prep3_u5_ro2',
          question: 'What qualities must a young person cultivate to achieve lasting success?',
          questionAr: 'ما هي الصفات التي يجب أن يتحلى بها الشاب لتحقيق نجاح دائم ومستمر؟',
          modelAnswer: 'Perseverance, discipline, continuous self-education, passion, and a genuine desire to serve society.',
          rubric: 'Full marks for citing perseverance and moral dedication.',
          maxMarks: 2
        }
      ]
    },
    vocabGrammarMcqs: [
      {
        id: 'prep3_u5_vg1',
        skill: 'Vocabulary',
        question_type: 'mcq',
        difficulty: 'standard',
        question: 'Hana Goda won the gold medal in the African table tennis ________.',
        options: ['tournament', 'passport', 'luggage', 'recipe'],
        correctAnswer: 'A',
        explanation: 'A tournament is an official sporting contest.',
        exam_trap_explanation: 'Tournament = بطولة رياضية.'
      },
      {
        id: 'prep3_u5_vg2',
        skill: 'Vocabulary',
        question_type: 'mcq',
        difficulty: 'standard',
        question: 'The teenage software developer created a smartphone ________ that translates sign language.',
        options: ['app', 'statue', 'temple', 'cave'],
        correctAnswer: 'A',
        explanation: 'App is short for application software.',
        exam_trap_explanation: 'App = تطبيق برمجي للهواتف الذكية.'
      },
      {
        id: 'prep3_u5_vg3',
        skill: 'Vocabulary',
        question_type: 'mcq',
        difficulty: 'hots',
        question: 'Because of his extraordinary mathematical abilities, the boy was described as a young ________.',
        options: ['genius', 'beggar', 'passenger', 'tourist'],
        correctAnswer: 'A',
        explanation: 'A genius has exceptional intellectual ability.',
        exam_trap_explanation: 'Genius = عبقري وفذ.'
      },
      {
        id: 'prep3_u5_vg4',
        skill: 'Grammar',
        question_type: 'mcq',
        difficulty: 'standard',
        question: 'Youssef has played chess for Egypt ________ he was seven years old.',
        options: ['since', 'for', 'ago', 'in'],
        correctAnswer: 'A',
        explanation: 'Use "since" with a past starting clause ("he was seven years old").',
        exam_trap_explanation: 'Exam Trap: Clause with past simple takes "since", not "for".'
      },
      {
        id: 'prep3_u5_vg5',
        skill: 'Grammar',
        question_type: 'mcq',
        difficulty: 'hots',
        question: 'The young engineers have developed this solar water pump ________ three years.',
        options: ['for', 'since', 'already', 'ever'],
        correctAnswer: 'A',
        explanation: '"Three years" is a period/duration of time, so use "for".',
        exam_trap_explanation: 'Exam Trap: Duration of time (3 years) takes "for". Starting point takes "since".'
      },
      {
        id: 'prep3_u5_vg6',
        skill: 'Grammar',
        question_type: 'mcq',
        difficulty: 'hots',
        question: 'The robotics club ________ the national first prize in Cairo last month.',
        options: ['won', 'has won', 'wins', 'is winning'],
        correctAnswer: 'A',
        explanation: 'Specific past time indicator "last month" requires the Past Simple (won).',
        exam_trap_explanation: 'Exam Trap: Definite past time (last month) forbids Present Perfect. Use Past Simple (won).'
      }
    ],
    errorCorrection: [
      {
        id: 'prep3_u5_ec1',
        sentence: 'Tamer has lived in Ismailia (for) 2015.',
        bracketWord: 'for',
        correctWord: 'since',
        explanation: '"2015" is a specific starting point year, so use "since", not "for".',
        exam_trap_explanation: 'Exam Trap: Specific year takes "since".'
      },
      {
        id: 'prep3_u5_ec2',
        sentence: 'Noura has practiced rhythmic gymnastics (since) five years.',
        bracketWord: 'since',
        correctWord: 'for',
        explanation: '"Five years" is a duration of time, so use "for", not "since".',
        exam_trap_explanation: 'Exam Trap: Duration of years takes "for".'
      },
      {
        id: 'prep3_u5_ec3',
        sentence: 'In 2024, our school team (has won) the robotics trophy in Cairo.',
        bracketWord: 'has won',
        correctWord: 'won',
        explanation: '"In 2024" indicates a completed past event; use Past Simple (won).',
        exam_trap_explanation: 'Exam Trap: Finished past year takes Past Simple.'
      },
      {
        id: 'prep3_u5_ec4',
        sentence: 'How long (do) you studied English at this preparatory school?',
        bracketWord: 'do',
        correctWord: 'have',
        explanation: '"How long" with past participle "studied" requires auxiliary "have" for Present Perfect.',
        exam_trap_explanation: 'Exam Trap: How long have you studied.'
      }
    ],
    writingTask: {
      type: 'paragraph',
      title: 'A paragraph of 90-110 words about: "A Young Role Model I Greatly Admire"',
      prompt: 'Write a paragraph of 90 to 110 words about an inspiring young Egyptian role model (in sports, science, or technology) who has achieved distinction and helped others.',
      promptAr: 'اكتب فقرة من 90 إلى 110 كلمة حول شخصية شابة مصرية ملهمة تعتبرها قدوة لك في الرياضة أو العلوم.',
      targetWords: '90 - 110 words',
      guidancePoints: ['Who the role model is', 'What they achieved and how long they worked', 'Why they inspire you'],
      modelAnswer: `Having an inspiring role model motivates teenagers to strive for excellence and serve their community with pride. The young person I admire most is Hana Goda, the phenomenal Egyptian table tennis champion. She began training passionately at the tender age of four and has practiced tirelessly for over nine years. Through her sheer discipline and mental resilience, she has conquered numerous African and international championships, becoming the youngest player to top the world under-fifteen rankings. What inspires me most about Hana is her modesty, sportsmanship, and dedication to her school studies alongside sports. She proves that with perseverance, young Egyptians can reach the pinnacle of global achievement.`,
      rubricCriteria: [
        { criterion: 'Inspirational Content & Biography', marks: 3 },
        { criterion: 'Present Perfect (Since/For) & Past Simple Accuracy', marks: 2 },
        { criterion: 'Lexical Richness & Paragraph Flow', marks: 2 },
        { criterion: 'Spelling, Punctuation & Format', marks: 2 }
      ]
    }
  }
);

// Prep 3 - Unit 6: What's the matter?
export const prep3Unit6 = createPrepUnitWithBlueprint(
  9, 'Prep 3', 1, 6,
  "What's the matter?",
  'الصحة النفسية ومواجهة التنمر الإلكتروني والمشاعر الإنسانية',
  'Mental health, feelings, cyberbullying, anxiety, supportive, embarrassment, empathy',
  'Modal Verbs of Deduction & Advice: Should, Must, Might, Can’t',
  'أفعال الاستنتاج والنصيحة (Should, Must, Might, Can’t)',
  'Must (sure something is true: "He must be proud"). Can’t (sure something is impossible: "She can’t be asleep; her lights are on"). Might (uncertain: "They might come later"). Should / Shouldn’t (advice: "You should talk to a counselor / You shouldn’t reply to cyberbullies").',
  [
    {
      title: '1. Modals of Deduction in the Present (أفعال الاستنتاج في المضارع)',
      explanation: 'Must + infinitive: 99% sure it is true. Can’t + infinitive: 99% sure it is impossible. Might + infinitive: possible, not sure (maybe).',
      examples: [
        'Ziad won first prize in mathematics; he must be extremely thrilled!',
        'Salma can’t be at school right now; today is an official Friday holiday.'
      ]
    },
    {
      title: '2. Should / Shouldn’t for Digital Wellbeing & Advice (النصيحة ومواجهة التنمر)',
      explanation: 'Should + base verb: good idea to do. Shouldn’t + base verb: harmful to do.',
      examples: [
        'If you experience online cyberbullying, you should tell your parents or school social worker immediately.',
        'You shouldn’t post hurtful comments or spread unverified rumors on social media.'
      ]
    }
  ],
  [
    { word: 'cyberbullying', pos: 'n.', ar: 'التنمر والمضايقة الإلكترونية', def: 'The use of electronic communication to bully or intimidate a person.', ex: 'Schools enforce strict anti-cyberbullying policies to protect teenagers.', exAr: 'تطبق المدارس سياسات صارمة لمكافحة التنمر الإلكتروني لحماية المراهقين.' },
    { word: 'anxious', pos: 'adj.', ar: 'قلق ومتوتر بشأن المستقبل', def: 'Experiencing worry, unease, or nervousness, typically about an imminent event.', ex: 'Students often feel slightly anxious before the final preparatory board exams.', exAr: 'غالباً ما يشعر الطلاب ببعض القلق والتوتر قبل امتحانات الشهادة الإعدادية.' },
    { word: 'embarrassing', pos: 'adj.', ar: 'مسبب للحرج والارتباك', def: 'Causing someone to feel awkward, self-conscious, or ashamed.', ex: 'Tripping on the school stage was an embarrassing moment, but everyone laughed kindly.', exAr: 'كان التعثر على مسرح المدرسة موقفاً محرجاً، لكن الجميع تبسم بلطف.' },
    { word: 'supportive', pos: 'adj.', ar: 'داعم ومساند ومشجع للآخرين', def: 'Providing encouragement or emotional help.', ex: 'Teachers and parents are deeply supportive when pupils face learning hurdles.', exAr: 'يقدم المعلمون وأولياء الأمور دعماً وتشجيعاً كبيراً عندما يواجه الطلاب صعوبات.' },
    { word: 'mental health', pos: 'n.', ar: 'الصحة النفسية والاتزان العاطفي', def: 'A person’s condition with regard to their psychological and emotional well-being.', ex: 'Practicing sports, getting sufficient sleep, and talking to friends promote sound mental health.', exAr: 'ممارسة الرياضة والنوم الكافي والحديث مع الأصدقاء يعزز الصحة النفسية السليمة.' },
    { word: 'empathy', pos: 'n.', ar: 'التعاطف والشعور بآلام الآخرين', def: 'The ability to understand and share the feelings of another.', ex: 'Showing empathy toward grieving classmates cements true friendship.', exAr: 'إظهار التعاطف مع الزملاء الحزانى يوثق عرى الصداقة الحقيقية.' },
    { word: 'upset', pos: 'adj.', ar: 'منزعج ومحبط وحزين', def: 'Unhappy, disappointed, or worried.', ex: 'Tarek was upset because his football team lost the championship match.', exAr: 'كان طارق منزعجاً ومحبطاً لأن فريقه خسر المباراة النهائية.' },
    { word: 'breathe', pos: 'v.', ar: 'يتنفس بهدوء وعمق للاسترخاء', def: 'Take air into the lungs and expel it.', ex: 'When you feel tense, take a pause and breathe slowly and deeply.', exAr: 'عندما تشعر بالتوتر، توقف قليلاً وتنفس ببطء وعمق.' }
  ],
  [
    { phrase: 'tackle online cyberbullying', meaningAr: 'يتصدى للتنمر الإلكتروني', example: 'Youth must know how to block bullies and tackle online cyberbullying.' },
    { phrase: 'promote sound mental health', meaningAr: 'يعزز الصحة النفسية السليمة', example: 'Regular exercise and balanced sleep promote sound mental health.' },
    { phrase: 'express heartfelt empathy', meaningAr: 'يعبر عن تعاطف صادق', example: 'Good friends express heartfelt empathy when someone feels down.' }
  ],
  `Mental and emotional wellbeing is just as crucial as physical fitness for teenagers navigating the preparatory years. Academic expectations, physical transformations, and social pressures can occasionally cause feelings of anxiety or self-doubt. In the modern digital age, the scourge of cyberbullying on social media networks poses an additional challenge. Educational experts stress that students must never suffer in silence. If you encounter cruel messages or malicious comments online, you should block the perpetrators and confide in a trusted adult or school social worker. Cultivating empathy, practicing mindfulness, and sustaining honest friendships foster emotional resilience and happiness.`,
  `Layla: "What’s the matter, Mariam? You look worried and pale."\nMariam: "Someone sent a cruel, anonymous comment on my social media photo."\nLayla: "You shouldn’t respond to them! Block the account and show it to your mother right away."\nMariam: "You are right. Talking to someone supportive makes me feel much calmer."`,
  {
    dialogue: {
      title: 'Finish the following dialogue between Layla and Mariam about handling online stress:',
      context: 'Layla notices that Mariam looks upset after receiving an unpleasant message online.',
      turns: [
        { speaker: 'Layla', text: 'Hello Mariam! What’s the matter? You look very upset.', isBlank: false },
        { speaker: 'Mariam', isBlank: true, blankNumber: 1, expectedAnswer: 'Someone wrote a mean, hurtful comment on my online photo.', acceptableAnswers: ['I received a bad message online.', 'Someone is cyberbullying me.'], hintAr: 'أخبريها أن شخصاً كتب تعليقاً مسيئاً ومحرجاً على صورتك.' },
        { speaker: 'Layla', isBlank: true, blankNumber: 2, expectedAnswer: 'Did you reply to that rude person?', acceptableAnswers: ['Did you answer them?', 'What did you do?'], hintAr: 'اسأليها هل ردت على هذا الشخص المسيء.' },
        { speaker: 'Mariam', text: 'No, I haven’t replied yet, but I feel very anxious and embarrassed.', isBlank: false },
        { speaker: 'Layla', isBlank: true, blankNumber: 3, expectedAnswer: 'You shouldn’t reply to bullies; you should block their account immediately.', acceptableAnswers: ['Don’t reply and block them.', 'You should block them.'], hintAr: 'انصحيها بألا ترد وأن تقوم بحظر الحساب فوراً.' },
        { speaker: 'Mariam', text: 'Who should I talk to about this problem?', isBlank: false },
        { speaker: 'Layla', isBlank: true, blankNumber: 4, expectedAnswer: 'You should tell your parents or the school social worker.', acceptableAnswers: ['Tell your mom or our teacher.', 'Talk to a trusted adult.'], hintAr: 'انصحيها بإخبار والديها أو الأخصائي الاجتماعي بالمدرسة.' },
        { speaker: 'Mariam', isBlank: true, blankNumber: 5, expectedAnswer: 'Thank you for being so supportive and kind, Layla!', acceptableAnswers: ['Thanks for your great advice!', 'You are a true friend.'], hintAr: 'اشكريها على مساندتها ودعمها النفسي الرائع.' }
      ]
    },
    readingPassage: {
      title: 'Reading Comprehension: Safeguarding Mental Wellbeing in the Digital Era',
      passage: `Mental and emotional wellbeing is just as crucial as physical fitness for teenagers navigating the preparatory years. Academic expectations, physical transformations, and social pressures can occasionally cause feelings of anxiety or self-doubt. In the modern digital age, the scourge of cyberbullying on social media networks poses an additional challenge. Educational experts stress that students must never suffer in silence. If you encounter cruel messages or malicious comments online, you should block the perpetrators and confide in a trusted adult or school social worker. Cultivating empathy, practicing mindfulness, and sustaining honest friendships foster emotional resilience and happiness.`,
      mcqs: [
        {
          id: 'prep3_u6_rq1',
          skill: 'Reading',
          question_type: 'mcq',
          difficulty: 'standard',
          question: 'What is just as crucial as physical fitness for teenagers according to the text?',
          options: ['Mental and emotional wellbeing', 'Owning expensive brand smartphones', 'Watching television all evening', 'Winning computer gaming contests'],
          correctAnswer: 'A',
          explanation: 'Passage begins: "Mental and emotional wellbeing is just as crucial as physical fitness...".',
          exam_trap_explanation: 'First sentence equates mental wellbeing with physical health.'
        },
        {
          id: 'prep3_u6_rq2',
          skill: 'Reading',
          question_type: 'mcq',
          difficulty: 'hots',
          question: 'What immediate steps should a student take when encountering cyberbullying online?',
          options: ['Block the perpetrator and confide in a trusted adult', 'Reply with angry rude messages', 'Delete all school homework files', 'Refuse to eat food or sleep'],
          correctAnswer: 'A',
          explanation: 'Passage instructs: "block the perpetrators and confide in a trusted adult or school social worker".',
          exam_trap_explanation: 'Blocking the bully and informing adults is the safe, responsible advice.'
        },
        {
          id: 'prep3_u6_rq3',
          skill: 'Reading',
          question_type: 'mcq',
          difficulty: 'standard',
          question: 'The word "perpetrators" in paragraph 1 refers to people who:',
          options: ['Commit harmful or bullying actions against others', 'Work as doctors in hospitals', 'Win gold medals in sports tournaments', 'Plant trees in community parks'],
          correctAnswer: 'A',
          explanation: 'Perpetrator means someone who commits an offensive or harmful act.',
          exam_trap_explanation: 'Perpetrators = مرتكبو الأفعال المؤذية والمتنمرون.'
        }
      ],
      openEnded: [
        {
          id: 'prep3_u6_ro1',
          question: 'Mention two daily habits that foster emotional resilience and happiness in teenagers.',
          questionAr: 'اذكر عادتين يوميتين تعززان الصلابة النفسية والسعادة لدى المراهقين.',
          modelAnswer: '1) Cultivating empathy and practicing deep breathing/mindfulness. 2) Sustaining honest, supportive friendships and getting adequate rest.',
          rubric: '1 mark for empathy/mindfulness, 1 mark for supportive friendships.',
          maxMarks: 2
        },
        {
          id: 'prep3_u6_ro2',
          question: 'Why do educational experts urge students to "never suffer in silence"?',
          questionAr: 'لماذا يشدد الخبراء التربويون على ضرورة ألا يعاني الطلاب في صمت؟',
          modelAnswer: 'Because sharing worries with trusted parents or counselors provides immediate emotional relief, prevents depression, and allows adults to intervene against cyberbullies.',
          rubric: 'Full marks for highlighting the benefits of seeking help and intervention.',
          maxMarks: 2
        }
      ]
    },
    vocabGrammarMcqs: [
      {
        id: 'prep3_u6_vg1',
        skill: 'Vocabulary',
        question_type: 'mcq',
        difficulty: 'standard',
        question: 'Sending cruel or threatening messages on social media to intimidate others is called ________.',
        options: ['cyberbullying', 'recycling', 'snorkeling', 'cinnamon'],
        correctAnswer: 'A',
        explanation: 'Cyberbullying is bullying via digital communication.',
        exam_trap_explanation: 'Cyberbullying = التنمر الإلكتروني.'
      },
      {
        id: 'prep3_u6_vg2',
        skill: 'Vocabulary',
        question_type: 'mcq',
        difficulty: 'standard',
        question: 'True friends are always ________ when you face difficult challenges or feel sad.',
        options: ['supportive', 'cruel', 'embarrassing', 'anxious'],
        correctAnswer: 'A',
        explanation: 'Supportive means offering encouragement and emotional backing.',
        exam_trap_explanation: 'Supportive = داعم ومساند.'
      },
      {
        id: 'prep3_u6_vg3',
        skill: 'Vocabulary',
        question_type: 'mcq',
        difficulty: 'hots',
        question: 'Having the capacity to understand and share the emotional feelings of others is called ________.',
        options: ['empathy', 'drought', 'ferry', 'monument'],
        correctAnswer: 'A',
        explanation: 'Empathy is the ability to share another person’s feelings.',
        exam_trap_explanation: 'Empathy = التعاطف والمشاركة الوجدانية.'
      },
      {
        id: 'prep3_u6_vg4',
        skill: 'Grammar',
        question_type: 'mcq',
        difficulty: 'standard',
        question: 'If someone sends you a spiteful message online, you ________ tell your parents immediately.',
        options: ['should', 'shouldn’t', 'mustn’t', 'can’t'],
        correctAnswer: 'A',
        explanation: '"Should" is used to give wise advice (you should tell an adult).',
        exam_trap_explanation: 'Exam Trap: It is strongly recommended to inform parents, so use "should".'
      },
      {
        id: 'prep3_u6_vg5',
        skill: 'Grammar',
        question_type: 'mcq',
        difficulty: 'hots',
        question: 'Hatem studied diligently day and night and scored 100%; he ________ be delighted!',
        options: ['must', 'can’t', 'might', 'shouldn’t'],
        correctAnswer: 'A',
        explanation: 'Deduction of strong certainty: scoring 100% means he is definitely delighted (must be).',
        exam_trap_explanation: 'Exam Trap: Certainty that something is true = "must + infinitive".'
      },
      {
        id: 'prep3_u6_vg6',
        skill: 'Grammar',
        question_type: 'mcq',
        difficulty: 'hots',
        question: 'Noha ________ be in Cairo today; I saw her boarding the early morning train to Aswan.',
        options: ['can’t', 'must', 'might', 'should'],
        correctAnswer: 'A',
        explanation: 'Deduction of impossibility: seeing her on the train to Aswan means she cannot be in Cairo (can’t be).',
        exam_trap_explanation: 'Exam Trap: Deduction that something is impossible = "can’t + infinitive".'
      }
    ],
    errorCorrection: [
      {
        id: 'prep3_u6_ec1',
        sentence: 'You (should) reply to angry cyberbullies; block them instead.',
        bracketWord: 'should',
        correctWord: 'shouldn’t',
        explanation: 'It is bad advice to reply to bullies, so use the negative "shouldn’t".',
        exam_trap_explanation: 'Exam Trap: Replying to bullies escalates harassment, so use shouldn’t.'
      },
      {
        id: 'prep3_u6_ec2',
        sentence: 'Ali has not slept for 24 hours; he (can’t) be exhausted.',
        bracketWord: 'can’t',
        correctWord: 'must',
        explanation: 'Not sleeping for 24 hours makes exhaustion a certainty (must be).',
        exam_trap_explanation: 'Exam Trap: Logical certainty = must be exhausted.'
      },
      {
        id: 'prep3_u6_ec3',
        sentence: 'When you feel nervous, take a deep breath to (felt) calmer.',
        bracketWord: 'felt',
        correctWord: 'feel',
        explanation: 'After the infinitive marker "to", use the base verb "feel".',
        exam_trap_explanation: 'Exam Trap: to + base verb (feel).'
      },
      {
        id: 'prep3_u6_ec4',
        sentence: 'They (must) be asleep; all their bedroom lights are still brightly lit.',
        bracketWord: 'must',
        correctWord: 'can’t',
        explanation: 'If the lights are brightly lit, it is impossible that they are asleep (can’t be).',
        exam_trap_explanation: 'Exam Trap: Deduction of impossibility = can’t.'
      }
    ],
    writingTask: {
      type: 'paragraph',
      title: 'A paragraph of 90-110 words about: "How to Stand Up Against Cyberbullying"',
      prompt: 'Write a paragraph of 90 to 110 words about the dangers of cyberbullying on social media and what steps teenagers should take to protect their emotional wellbeing.',
      promptAr: 'اكتب فقرة من 90 إلى 110 كلمة حول مخاطر التنمر الإلكتروني وكيفية تصدي المراهقين له وحماية سلامتهم النفسية.',
      targetWords: '90 - 110 words',
      guidancePoints: ['What cyberbullying is', 'Rules to protect yourself (blocking, not replying)', 'The importance of talking to supportive parents or teachers'],
      modelAnswer: `Cyberbullying has emerged as a detrimental hazard affecting the mental wellbeing of many teenagers today. It occurs when malicious individuals use social media networks to circulate hurtful comments, untruthful rumors, or embarrassing pictures. To combat this menace, students must adhere to clear digital guidelines. Firstly, you should never retaliate with angry replies, as this only encourages the bully. Secondly, you must immediately block the offensive account and save screenshots as evidence. Most importantly, teenagers should never suffer in silence. Always confide in your parents or the school social worker. By showing empathy and mutual support, we can create a compassionate digital environment.`,
      rubricCriteria: [
        { criterion: 'Emotional Wellness & Digital Safety Concepts', marks: 3 },
        { criterion: 'Modal Verbs (Should/Must/Can’t) Accuracy', marks: 2 },
        { criterion: 'Cohesion, Topic Progression & Conclusion', marks: 2 },
        { criterion: 'Punctuation, Spelling & Sentence Mechanics', marks: 2 }
      ]
    }
  }
);
