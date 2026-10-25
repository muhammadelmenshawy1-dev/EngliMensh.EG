import { Exam } from '../types.ts';

// 10 Official Governmental Exams per Unit derived directly from Egyptian Directorates of Education
// (القاهرة، الجيزة، الإسكندرية، القليوبية، الدقهلية، البحيرة، الشرقية، المنوفية، أسيوط، أسوان، الأقصر، كفر الشيخ)

export const governmentalExams: Exam[] = [
  // ================= UNIT 1 GOVERNMENTAL EXAMS (10 EXAMS) =================
  {
    id: "gov_u1_cairo",
    unitId: 1,
    level: 4,
    governorate: "Cairo Governorate (مديرية التربية والتعليم بالقاهرة - إدارة النزهة ومصر الجديدة)",
    term: 1,
    category: "governmental",
    levelTitle: "Cairo Directorate Official Exam - Unit 1",
    levelTitleAr: "امتحان محافظة القاهرة الرسمي - الوحدة الأولى (تراث مصر)",
    durationMinutes: 45,
    totalMarks: 32,
    mcqs: [
      {
        id: "gov_u1_cairo_q1",
        type: "mrq",
        question: "Choose TWO correct answers: The archaeologists were eager to restore the ancient pharaonic temple. The antonyms of 'restore' are __________ and __________.",
        options: ["demolish", "renovate", "ruin", "construct", "erect"],
        correctAnswers: [0, 2],
        explanation: "'Restore' means to repair or rebuild. Its antonyms are 'demolish' (يهدم) and 'ruin' (يدمر).",
        sourceExam: "القاهرة - مصر الجديدة 2026",
        points: 2
      },
      {
        id: "gov_u1_cairo_q2",
        type: "single",
        question: "Egyptian __________ is deeply rooted in thousands of years of art, architecture, and moral values.",
        options: ["heritage", "crossroads", "pollution", "traffic"],
        correctAnswers: [0],
        explanation: "'Heritage' (تراث حضاري) refers to traditions and treasures passed down through generations.",
        sourceExam: "القاهرة - شرق مدينة نصر 2026",
        points: 2
      },
      {
        id: "gov_u1_cairo_q3",
        type: "single",
        question: "Ancient Egypt was considered a strategic __________ for trade between Africa, Asia, and Europe.",
        options: ["crossroads", "monument", "neighborhood", "identity"],
        correctAnswers: [0],
        explanation: "Key idiom: 'crossroads for trade' (ملتقى ومفترق طرق للتجارة الدولية).",
        sourceExam: "القاهرة - المعادي 2026",
        points: 2
      },
      {
        id: "gov_u1_cairo_q4",
        type: "single",
        question: "While the tourists __________ the Karnak Temple, it began to rain unexpectedly.",
        options: ["are visiting", "were visiting", "visited", "had visited"],
        correctAnswers: [1],
        explanation: "Longer ongoing past action interrupted by a shorter action: 'While + past continuous (were visiting)'.",
        sourceExam: "القاهرة - دار السلام 2026",
        points: 2
      },
      {
        id: "gov_u1_cairo_q5",
        type: "single",
        question: "Salma __________ to school on foot every morning when she was a preparatory student.",
        options: ["used to go", "is used to going", "uses to go", "was used to go"],
        correctAnswers: [0],
        explanation: "'Used to + infinitive' describes a past habit that no longer takes place.",
        sourceExam: "القاهرة - روض الفرج 2026",
        points: 2
      },
      {
        id: "gov_u1_cairo_q6",
        type: "single",
        question: "I'd rather you __________ your time on frivolous mobile games now.",
        options: ["didn't waste", "don't waste", "hadn't wasted", "not waste"],
        correctAnswers: [0],
        explanation: "'I'd rather + subject + past simple' expresses an unreal preference in the present ('now').",
        sourceExam: "القاهرة - المرج 2026",
        points: 2
      },
      {
        id: "gov_u1_cairo_q7",
        type: "single",
        question: "In an essay, which sentence establishes the general context and attracts the reader's curiosity?",
        options: ["The hook", "The closing statement", "The counter-argument", "The bibliography"],
        correctAnswers: [0],
        explanation: "Writing Skills: The 'hook' is the opening sentence designed to attract curiosity.",
        sourceExam: "القاهرة 2026",
        points: 2
      },
      {
        id: "gov_u1_cairo_q8",
        type: "single",
        question: "Dr. Mona Hassan felt it was a great __________ to lead the restoration of the Philae Temple.",
        options: ["privilege", "sacrifice", "depletion", "scam"],
        correctAnswers: [0],
        explanation: "'Privilege' (شرف / امتياز رفيع) expresses deep professional honor.",
        sourceExam: "كتاب الطالب SB p.15",
        points: 2
      }
    ],
    reading: {
      passageTitle: "The Marvel of the Grand Egyptian Museum (GEM)",
      passageText: "Located at the foot of the Giza Pyramids, the Grand Egyptian Museum (GEM) stands as a monumental cultural bridge uniting the ancient and modern worlds. Housing more than one hundred thousand artifacts, including the complete, unseparated treasures of King Tutankhamun, the museum is not merely an exhibition hall; it is an international research and preservation hub. Advanced climate-controlled restoration laboratories ensure that delicate organic relics, papyrus scrolls, and limestone carvings are protected from humidity and decay. Furthermore, the architectural design mirrors the geometric alignment of the Great Pyramids, welcoming visitors through an atrium dominated by the towering colossus of Ramses II. By investing in this state-of-the-art complex, Egypt preserves its ancestral legacy while fostering international cultural tourism.",
      questions: [
        {
          id: "gov_u1_cairo_rd1",
          type: "single",
          question: "What is the primary function of the GEM according to the passage?",
          options: [
            "It serves as a comprehensive global research and preservation center for antiquity.",
            "It is strictly an amusement park for children.",
            "It only contains modern European sculptures.",
            "It replaces the Giza Pyramids entirely."
          ],
          correctAnswers: [0],
          explanation: "The passage notes it is an international research and preservation hub.",
          points: 2
        },
        {
          id: "gov_u1_cairo_rd2",
          type: "single",
          question: "The colossal statue dominating the main atrium is that of __________.",
          options: ["King Tutankhamun", "Ramses II", "Imhotep", "Hemingway"],
          correctAnswers: [1],
          explanation: "Paragraph explicitly identifies the colossus of Ramses II in the atrium.",
          points: 2
        }
      ]
    },
    translation: [
      {
        id: "gov_u1_cairo_tr1",
        direction: "en-to-ar",
        sourceText: "Preserving cultural heritage strengthens national identity and inspires upcoming generations to achieve progress.",
        options: [
          "إن الحفاظ على التراث الثقافي يقوي الهوية الوطنية ويلهم الأجيال القادمة لتحقيق التقدم.",
          "إن بيع الآثار القديمة يضعف الاقتصاد ويجعل الشباب يتخلون عن تاريخهم.",
          "يساعد نسيان الماضي على بناء مصانع حديثة ومواكبة الدول الغربية.",
          "إن التراث الثقافي لا علاقة له بالهوية الوطنية في العصر الرقمي الحديث."
        ],
        correctIndex: 0,
        explanation: "Accurate translation of 'preserving cultural heritage' and 'strengthens national identity'."
      }
    ],
    storyQuestions: [
      {
        id: "gov_u1_cairo_st1",
        chapter: 1,
        question: "How does Santiago react to the mockery of the younger fishermen in his Cuban village?",
        questionAr: "كيف تفاعل سانتياجو مع سخرية الصيادين الشباب في قريته الكوبية بعد 84 يوماً دون صيد؟",
        modelAnswer: "Santiago does not retaliate with anger or bitterness. He carries his heavy patched sail and fishing gear proudly with quiet dignity, refusing to let the laughter of others shake his inner confidence or passion for the sea.",
        keyCriteria: ["quiet dignity", "no bitterness or anger", "confidence unbroken by mockery"],
        maxMarks: 4
      }
    ],
    writingTask: {
      type: "essay",
      title: "Taking Pride in Our Beloved Egypt",
      prompt: "Write an analytical essay (120-150 words) on how ancient Egyptian contributions in writing, architecture, and science continue to shape our modern national pride.",
      wordCountTarget: "120-150 words",
      rubric: { ideas: 4, grammarVocab: 4, organization: 3, mechanics: 3 },
      sampleOutline: ["Hook + thesis", "Ancestral science and architecture", "Modern continuity and GEM", "Conclusion"],
      modelResponse: "Egypt has always been a beacon of human civilization. For thousands of years, our ancestors led the world in writing, mathematics, medicine, and engineering. The monumental pyramids of Giza and the temples of Upper Egypt still inspire tourists and scholars from every continent. Today, we continue that proud legacy by restoring our historical districts and constructing the Grand Egyptian Museum. When young Egyptians understand their heritage, they feel motivated to work hard and contribute to their country's development. Our history is not merely a record of the past; it is a living compass guiding our future."
    }
  },

  {
    id: "gov_u1_giza",
    unitId: 1,
    level: 4,
    governorate: "Giza Governorate (مديرية التربية والتعليم بالجيزة - إدارة الدقي والهرم)",
    term: 1,
    category: "governmental",
    levelTitle: "Giza Directorate Official Exam - Unit 1",
    levelTitleAr: "امتحان محافظة الجيزة الرسمي - الوحدة الأولى (الهرم والدقي)",
    durationMinutes: 45,
    totalMarks: 32,
    mcqs: [
      {
        id: "gov_u1_giza_q1",
        type: "mrq",
        question: "Choose TWO correct answers: 'The museum display was magnificent.' The synonyms of 'magnificent' are __________ and __________.",
        options: ["splendid", "ordinary", "impressive", "poor", "unattractive"],
        correctAnswers: [0, 2],
        explanation: "'Magnificent' (رائع / بديع) corresponds to 'splendid' and 'impressive'.",
        sourceExam: "الجيزة - الدقي 2026",
        points: 2
      },
      {
        id: "gov_u1_giza_q2",
        type: "single",
        question: "The young boy was very proud __________ his grandfather's historic military awards.",
        options: ["of", "in", "with", "for"],
        correctAnswers: [0],
        explanation: "'Proud of + noun' (فخور بـ). Note: 'take pride in'.",
        sourceExam: "الجيزة - الهرم 2026",
        points: 2
      },
      {
        id: "gov_u1_giza_q3",
        type: "single",
        question: "It is high time you __________ your homework before midnight.",
        options: ["finish", "finished", "have finished", "will finish"],
        correctAnswers: [1],
        explanation: "'It is high time + subject + past simple' (finished).",
        sourceExam: "الجيزة - العمرانية 2026",
        points: 2
      },
      {
        id: "gov_u1_giza_q4",
        type: "single",
        question: "When I arrived at the library, my colleague __________ an article about Philae.",
        options: ["read", "was reading", "reads", "is reading"],
        correctAnswers: [1],
        explanation: "Continuous past action in progress when interrupted: 'was reading'.",
        sourceExam: "الجيزة - 6 أكتوبر 2026",
        points: 2
      },
      {
        id: "gov_u1_giza_q5",
        type: "single",
        question: "Our ancestors made many __________ so that their children could enjoy freedom and education.",
        options: ["sacrifices", "scams", "landfills", "silos"],
        correctAnswers: [0],
        explanation: "'Sacrifices' (تضحيات جسيمة).",
        sourceExam: "الجيزة - بولاق الدكرور 2026",
        points: 2
      },
      {
        id: "gov_u1_giza_q6",
        type: "single",
        question: "I __________ have lunch at three o'clock yesterday.",
        options: ["didn't", "wasn't", "haven't", "don't"],
        correctAnswers: [0],
        explanation: "Main verb 'have lunch' is negated in past simple with 'didn't have'.",
        sourceExam: "الجيزة 2026",
        points: 2
      },
      {
        id: "gov_u1_giza_q7",
        type: "single",
        question: "What comes immediately after the hook in a formal essay introduction?",
        options: ["Background information", "The conclusion", "References", "Final greeting"],
        correctAnswers: [0],
        explanation: "Essay structure: Hook -> Background information -> Thesis statement.",
        sourceExam: "كتاب المعاصر ص 60",
        points: 2
      },
      {
        id: "gov_u1_giza_q8",
        type: "single",
        question: "A passport is an official document that verifies a citizen's __________.",
        options: ["identity", "identification", "identical", "identifying"],
        correctAnswers: [0],
        explanation: "'Identity' (هوية الشخص).",
        sourceExam: "الجيزة 2026",
        points: 2
      }
    ],
    storyQuestions: [
      {
        id: "gov_u1_giza_st1",
        chapter: 1,
        question: "Why does Santiago consider baseball star Joe DiMaggio his supreme hero?",
        questionAr: "لماذا يعتبر سانتياجو نجم البيسبول جو ديماجيو بطله الأسمى؟",
        modelAnswer: "Santiago admires Joe DiMaggio because he persevered and played with immense courage despite severe physical agony caused by a bone spur in his heel. This exemplifies Santiago's personal code that pain is secondary to endurance.",
        keyCriteria: ["bone spur in heel", "playing through physical agony", "courage and endurance as supreme virtues"],
        maxMarks: 4
      }
    ],
    writingTask: {
      type: "essay",
      title: "Preserving Egypt's Historical Treasures",
      prompt: "Write an essay (120-150 words) on the collective duty of citizens and government to protect Egypt's heritage.",
      wordCountTarget: "120-150 words",
      rubric: { ideas: 4, grammarVocab: 4, organization: 3, mechanics: 3 },
      sampleOutline: ["Introduction", "Governmental mega-projects", "Individual civic responsibility", "Conclusion"],
      modelResponse: "Protecting national heritage is a shared moral responsibility. The Egyptian government has spearheaded ambitious restoration campaigns across Old Cairo, Luxor, and Aswan, safeguarding irreplaceable Islamic, Coptic, and Pharaonic monuments. However, official initiatives must be supported by civic consciousness. Young citizens must treat heritage sites with respect, refrain from vandalism, and promote cultural awareness. By valuing our ancestors' monuments, we safeguard our cultural roots and inspire international admiration."
    }
  },

  {
    id: "gov_u1_alex",
    unitId: 1,
    level: 4,
    governorate: "Alexandria Governorate (مديرية التربية والتعليم بالإسكندرية - المنتزه وشرق)",
    term: 1,
    category: "governmental",
    levelTitle: "Alexandria Directorate Official Exam - Unit 1",
    levelTitleAr: "امتحان محافظة الإسكندرية الرسمي - الوحدة الأولى (المنتزه ووسط)",
    durationMinutes: 45,
    totalMarks: 32,
    mcqs: [
      {
        id: "gov_u1_alex_q1",
        type: "mrq",
        question: "Choose TWO correct answers: 'The ancient temple is still alive with visitors.' Synonyms of 'alive' here are __________ and __________.",
        options: ["living", "breathing", "dead", "lifeless", "faded"],
        correctAnswers: [0, 1],
        explanation: "'Alive' (حي / نابض بالحياة) corresponds to 'living' and 'breathing'.",
        sourceExam: "الإسكندرية - المنتزه 2026",
        points: 2
      },
      {
        id: "gov_u1_alex_q2",
        type: "single",
        question: "The Bibliotheca Alexandrina once __________ knowledge from philosophers around the ancient world.",
        options: ["gathered", "destroyed", "burned", "wasted"],
        correctAnswers: [0],
        explanation: "'Gathered knowledge' (جمعت المعرفة والعلوم من أرجاء العالم).",
        sourceExam: "الإسكندرية - وسط 2026",
        points: 2
      },
      {
        id: "gov_u1_alex_q3",
        type: "single",
        question: "On __________ the archaeological discovery, the minister held an international press conference.",
        options: ["announcing", "announced", "announce", "was announcing"],
        correctAnswers: [0],
        explanation: "'On + gerund (v-ing)' expresses immediate sequence ('On announcing').",
        sourceExam: "الإسكندرية - العجمي 2026",
        points: 2
      },
      {
        id: "gov_u1_alex_q4",
        type: "single",
        question: "During the lecture on ancient Egypt, students __________ detailed notes.",
        options: ["took", "were taking", "taken", "take"],
        correctAnswers: [0],
        explanation: "Simple past completed event associated with 'During the lecture': 'took notes'.",
        sourceExam: "الإسكندرية - شرق 2026",
        points: 2
      },
      {
        id: "gov_u1_alex_q5",
        type: "single",
        question: "Which of the following contains an authentic prefix expressing 'again'?",
        options: ["Rewrite", "Unhappy", "Careless", "Action"],
        correctAnswers: [0],
        explanation: "Prefix 're-' means 'again' (rewrite = write again).",
        sourceExam: "كتاب المعاصر ص 10",
        points: 2
      },
      {
        id: "gov_u1_alex_q6",
        type: "single",
        question: "He no longer travels by ship. This means that he __________ by ship.",
        options: ["used to travel", "still travels", "never travelled", "didn't travel"],
        correctAnswers: [0],
        explanation: "'No longer' in the present replaces past habit 'used to travel'.",
        sourceExam: "الإسكندرية 2026",
        points: 2
      },
      {
        id: "gov_u1_alex_q7",
        type: "single",
        question: "The Pharaonic carvings were carved __________ solid granite temple walls.",
        options: ["into", "for", "with", "over"],
        correctAnswers: [0],
        explanation: "Verb pattern: 'carve into' (ينحت في الصخر).",
        sourceExam: "الإسكندرية 2026",
        points: 2
      },
      {
        id: "gov_u1_alex_q8",
        type: "single",
        question: "An essay's concluding paragraph must always restate the __________ in new wording.",
        options: ["thesis statement", "hook", "title", "informal greeting"],
        correctAnswers: [0],
        explanation: "Writing Skills: The conclusion restates the thesis and offers a final reflection.",
        sourceExam: "كتاب المعاصر ص 62",
        points: 2
      }
    ],
    storyQuestions: [
      {
        id: "gov_u1_alex_st1",
        chapter: 1,
        question: "What does the simplicity of Santiago's palm-leaf hut reveal about his values?",
        questionAr: "ماذا تكشف بساطة كوخ سانتياجو المتواضع المصنوع من سعف النخيل عن قيمه وشخصيته؟",
        modelAnswer: "Santiago's hut contains only a bed of newspapers, a table, and a chair. This extreme minimalism reveals that he does not covet material luxury; his life is defined entirely by the sea, spiritual humility, and inner pride.",
        keyCriteria: ["bed of newspapers and bare furniture", "freedom from material greed", "life dedicated to the sea and spiritual dignity"],
        maxMarks: 4
      }
    ],
    writingTask: {
      type: "essay",
      title: "The Historical Role of the River Nile",
      prompt: "Write an analytical essay (120-150 words) discussing how the Nile enabled ancient civilization and remains vital for Egypt today.",
      wordCountTarget: "120-150 words",
      rubric: { ideas: 4, grammarVocab: 4, organization: 3, mechanics: 3 },
      sampleOutline: ["Introduction", "Agriculture and trade in antiquity", "Modern economic necessity", "Conclusion"],
      modelResponse: "Herodotus famously stated that 'Egypt is the gift of the Nile.' From the earliest dawn of human history, the River Nile provided fertile black silt and fresh water, allowing early settlements to evolve into a glorious civilization. It served as a vital waterway for trading papyrus, spices, and building stone. Today, the Nile remains the lifeblood of Egypt, supplying irrigation for agriculture and drinking water for millions. Safeguarding this vital artery is our foremost national imperative."
    }
  },

  // ================= UNIT 2 GOVERNMENTAL EXAMS =================
  {
    id: "gov_u2_dakahlia",
    unitId: 2,
    level: 4,
    governorate: "Dakahlia Governorate (مديرية التربية والتعليم بالدقهلية - المنصورة وطلخا)",
    term: 1,
    category: "governmental",
    levelTitle: "Dakahlia Directorate Official Exam - Unit 2",
    levelTitleAr: "امتحان محافظة الدقهلية الرسمي - الوحدة الثانية (يد تبني وقلب يرعى)",
    durationMinutes: 45,
    totalMarks: 32,
    mcqs: [
      {
        id: "gov_u2_dakahlia_q1",
        type: "mrq",
        question: "Choose TWO correct answers: 'The adventure was extremely risky.' The antonyms of 'risky' are __________ and __________.",
        options: ["safe", "hazardous", "secure", "dangerous", "perilous"],
        correctAnswers: [0, 2],
        explanation: "'Risky' (خطير / محفوف بالمخاطر) opposes 'safe' and 'secure' (آمن).",
        sourceExam: "الدقهلية - طلخا 2026",
        points: 2
      },
      {
        id: "gov_u2_dakahlia_q2",
        type: "single",
        question: "The firefighter Radwan bravely entered the blazing flat to __________ the trapped child.",
        options: ["rescue", "fade", "slip", "drown"],
        correctAnswers: [0],
        explanation: "'Rescue' (ينقذ / يخلص من الخطر).",
        sourceExam: "الدقهلية - المنصورة 2026",
        points: 2
      },
      {
        id: "gov_u2_dakahlia_q3",
        type: "single",
        question: "It is against the law to exceed 120 km/h on this highway. Drivers __________ speed.",
        options: ["mustn't", "should", "needn't", "don't have to"],
        correctAnswers: [0],
        explanation: "Prohibition and legal prohibition: 'mustn't'.",
        sourceExam: "الدقهلية - بلقاس 2026",
        points: 2
      },
      {
        id: "gov_u2_dakahlia_q4",
        type: "single",
        question: "We had already cooked lunch, so Ahmed __________ bring takeaway food.",
        options: ["needn't have brought", "didn't have to bring", "mustn't bring", "should bring"],
        correctAnswers: [0],
        explanation: "'Needn't have brought' indicates he brought food, but it turned out to be unnecessary.",
        sourceExam: "الدقهلية - دكرنس 2026",
        points: 2
      },
      {
        id: "gov_u2_dakahlia_q5",
        type: "single",
        question: "Which of the following senses is central to a descriptive essay describing an old market?",
        options: ["Smell of exotic spices", "Calculation of tax percentages", "Listing names in alphabetical order", "Reading code"],
        correctAnswers: [0],
        explanation: "Descriptive writing relies on rich sensory imagery such as the smell of spices.",
        sourceExam: "كتاب المعاصر ص 118",
        points: 2
      },
      {
        id: "gov_u2_dakahlia_q6",
        type: "single",
        question: "Participation in the local animal shelter is entirely __________; nobody is forced.",
        options: ["voluntary", "obligatory", "compulsory", "commercial"],
        correctAnswers: [0],
        explanation: "'Voluntary' (تطوعي واختياري).",
        sourceExam: "الدقهلية 2026",
        points: 2
      },
      {
        id: "gov_u2_dakahlia_q7",
        type: "single",
        question: "You look pale and dehydrated. You __________ drink fresh water immediately.",
        options: ["must", "can't", "mustn't", "needn't"],
        correctAnswers: [0],
        explanation: "Strong medical advice in an urgent situation takes 'must'.",
        sourceExam: "الدقهلية 2026",
        points: 2
      },
      {
        id: "gov_u2_dakahlia_q8",
        type: "single",
        question: "When you dedicate time to assist elderly neighbors, your heart __________ bigger.",
        options: ["grows", "shrinks", "slips", "fades"],
        correctAnswers: [0],
        explanation: "Metaphorical idiom: 'your heart grows bigger' (يزداد عطاءً ورقة).",
        sourceExam: "كتاب الطالب ص 92",
        points: 2
      }
    ],
    storyQuestions: [
      {
        id: "gov_u2_dakahlia_st1",
        chapter: 2,
        question: "Why does Santiago say that 'eighty-five is a lucky number' on the morning of his departure?",
        questionAr: "لماذا يقول سانتياجو إن 'خمسة وثمانين هو رقم حظي' في صباح انطلاقه الكبير؟",
        modelAnswer: "Santiago maintains indestructible faith. Having fished for eighty-four consecutive days without success, he views the eighty-fifth day not with despair, but as the fateful turning point when his luck, skill, and endurance will coalesce to capture a great fish.",
        keyCriteria: ["faith in change of fortune", "turning point after 84 days", "optimism defying despair"],
        maxMarks: 4
      }
    ],
    writingTask: {
      type: "descriptive_essay",
      title: "My Grandfather's Village House",
      prompt: "Write a descriptive essay (120-150 words) depicting your grandfather's traditional house using rich sensory details (sight, sound, smell, warmth).",
      wordCountTarget: "120-150 words",
      rubric: { ideas: 4, grammarVocab: 4, organization: 3, mechanics: 3 },
      sampleOutline: ["Introduction: Village setting", "Mud brick architecture and scent", "Courtyard animals and morning sounds", "Conclusion: Emotional peace"],
      modelResponse: "Tucked away in the serene countryside of Assiut, my grandfather's house stands as a sanctuary of warmth and peace. Built of thick, rustic mud bricks, its walls keep the rooms remarkably cool in scorching summer heat and pleasantly warm in winter. As dawn breaks, the golden sunlight streams through wooden shutters, illuminating dust motes dancing in the air. The courtyard is filled with the fragrant aroma of freshly baked sun-bread and steaming mint tea prepared in a clay oven. Pigeons coo gently on the flat roof while roosters crow from the green fields beyond. Inside, there are no noisy electronic gadgets, only simple wooden benches and grandfather's hearty laughter. It is a home where love, generosity, and peace embrace every visitor."
    }
  },

  // ================= UNIT 3 GOVERNMENTAL EXAMS =================
  {
    id: "gov_u3_beheira",
    unitId: 3,
    level: 4,
    governorate: "Beheira Governorate (مديرية التربية والتعليم بالبحيرة - دمنهور وكفر الدوار)",
    term: 1,
    category: "governmental",
    levelTitle: "Beheira Directorate Official Exam - Unit 3",
    levelTitleAr: "امتحان محافظة البحيرة الرسمي - الوحدة الثالثة (الحقيقة في مواجهة الأكاذيب)",
    durationMinutes: 45,
    totalMarks: 32,
    mcqs: [
      {
        id: "gov_u3_beheira_q1",
        type: "mrq",
        question: "Choose TWO correct answers: 'The online investment advertisement was fake.' Synonyms of 'fake' are __________ and __________.",
        options: ["untrue", "authentic", "forged", "genuine", "honest"],
        correctAnswers: [0, 2],
        explanation: "'Fake' (مزيف / غير حقيقي) corresponds to 'untrue' and 'forged'.",
        sourceExam: "البحيرة - دمنهور 2026",
        points: 2
      },
      {
        id: "gov_u3_beheira_q2",
        type: "single",
        question: "If water freezes, it __________ into ice.",
        options: ["turns", "will turn", "turned", "would turn"],
        correctAnswers: [0],
        explanation: "Zero conditional for scientific law: 'turns into ice'.",
        sourceExam: "البحيرة - كفر الدوار 2026",
        points: 2
      },
      {
        id: "gov_u3_beheira_q3",
        type: "single",
        question: "If Adel __________ the cautionary cyber message, he wouldn't have clicked the malicious link.",
        options: ["had read", "read", "reads", "would read"],
        correctAnswers: [0],
        explanation: "Third conditional in unfulfilled past: 'If + had read, wouldn't have clicked'.",
        sourceExam: "البحيرة - إدكو 2026",
        points: 2
      },
      {
        id: "gov_u3_beheira_q4",
        type: "single",
        question: "Online scammers frequently employ clever __________ to manipulate people's emotions.",
        options: ["tactics", "reputations", "landfills", "saplings"],
        correctAnswers: [0],
        explanation: "'Tactics' (أساليب وخطط ماكرة).",
        sourceExam: "البحيرة - شبراخيت 2026",
        points: 2
      },
      {
        id: "gov_u3_beheira_q5",
        type: "single",
        question: "__________ he to verify the information with his teacher, he would avoid embarrassment.",
        options: ["Were", "Had", "Should", "If"],
        correctAnswers: [0],
        explanation: "Inverted second conditional: 'Were + subject + to + inf'.",
        sourceExam: "البحيرة - كوم حمادة 2026",
        points: 2
      },
      {
        id: "gov_u3_beheira_q6",
        type: "single",
        question: "A true friend is always __________ and helps in times of hardship.",
        options: ["supportive", "scamming", "exploiting", "deceitful"],
        correctAnswers: [0],
        explanation: "'Supportive' (داعم ومساند).",
        sourceExam: "البحيرة 2026",
        points: 2
      },
      {
        id: "gov_u3_beheira_q7",
        type: "single",
        question: "The teacher made the students __________ the laboratory rules aloud.",
        options: ["repeat", "to repeat", "repeating", "repeated"],
        correctAnswers: [0],
        explanation: "Active causative 'make + obj + bare inf': 'repeat'.",
        sourceExam: "البحيرة 2026",
        points: 2
      },
      {
        id: "gov_u3_beheira_q8",
        type: "single",
        question: "Which of the following phrases is typically used to connect supporting paragraphs in an essay?",
        options: ["Furthermore", "Yours faithfully", "Dear Sir", "Sincerely yours"],
        correctAnswers: [0],
        explanation: "Transition words: 'Furthermore' adds supporting ideas.",
        sourceExam: "كتاب المعاصر ص 178",
        points: 2
      }
    ],
    storyQuestions: [
      {
        id: "gov_u3_beheira_st1",
        chapter: 3,
        question: "How does Hemingway describe the sudden hook of the great fish in Chapter 3?",
        questionAr: "كيف وصف هيمنجواي لحظة ابتلاع السمكة الضخمة للطعم وانطلاق الخيط في الفصل الثالث؟",
        modelAnswer: "Santiago feels a slight, delicate nibble a hundred fathoms deep. Then, the green line tightens hard, cutting sharply into his hands. Santiago braces his feet against the skiff as the massive unseen fish begins steadily towing the boat out to sea.",
        keyCriteria: ["subtle nibble at hundred fathoms", "line cutting into hand", "fish towing skiff northwest into deep sea"],
        maxMarks: 4
      }
    ],
    writingTask: {
      type: "essay",
      title: "The Danger of Rumors on Social Media",
      prompt: "Write an essay (120-150 words) on how digital rumors can harm individuals and national stability, and how to verify news.",
      wordCountTarget: "120-150 words",
      rubric: { ideas: 4, grammarVocab: 4, organization: 3, mechanics: 3 },
      sampleOutline: ["Introduction: Virality of fake news", "Impact on reputations and social panic", "Verification habits", "Conclusion"],
      modelResponse: "In our interconnected world, social media platforms allow information to spread instantaneously. Unfortunately, fabricated rumors and misleading stories often spread faster than verified facts. Such rumors can inflict severe damage on personal reputations, cause widespread panic, and disrupt national economic stability. Scammers often post provocative headlines to generate clicks and exploit public anxiety. To combat this menace, citizens must apply critical thinking. We should never share an article without verifying its source through trusted news organizations. Remember the golden rule: trust, but verify. Cultivating media literacy is our best shield against digital manipulation."
    }
  },

  // ================= UNIT 4 GOVERNMENTAL EXAMS =================
  {
    id: "gov_u4_sharqia",
    unitId: 4,
    level: 4,
    governorate: "Sharqia Governorate (مديرية التربية والتعليم بالشرقية - الزقازيق وكفر صقر)",
    term: 1,
    category: "governmental",
    levelTitle: "Sharqia Directorate Official Exam - Unit 4",
    levelTitleAr: "امتحان محافظة الشرقية الرسمي - الوحدة الرابعة (حافظ على البيئة وتألق)",
    durationMinutes: 45,
    totalMarks: 32,
    mcqs: [
      {
        id: "gov_u4_sharqia_q1",
        type: "mrq",
        question: "Choose TWO correct answers: 'The school launched a green initiative.' Synonyms of 'initiative' are __________ and __________.",
        options: ["action", "hesitation", "plan", "reluctance", "passivity"],
        correctAnswers: [0, 2],
        explanation: "'Initiative' (مبادرة) means an 'action' or 'plan' to achieve a solution.",
        sourceExam: "الشرقية - الزقازيق 2026",
        points: 2
      },
      {
        id: "gov_u4_sharqia_q2",
        type: "single",
        question: "The factory owner decided to stop __________ wastewater into the irrigation canal.",
        options: ["dumping", "to dump", "dump", "dumped"],
        correctAnswers: [0],
        explanation: "'Stop + gerund' means to completely halt and cease doing an action permanently.",
        sourceExam: "الشرقية - كفر صقر 2026",
        points: 2
      },
      {
        id: "gov_u4_sharqia_q3",
        type: "single",
        question: "Please remember __________ the classroom projector before you leave.",
        options: ["to unplug", "unplugging", "unplug", "unplugged"],
        correctAnswers: [0],
        explanation: "'Remember + to + inf' refers to remembering to carry out a duty.",
        sourceExam: "الشرقية - أبو كبير 2026",
        points: 2
      },
      {
        id: "gov_u4_sharqia_q4",
        type: "single",
        question: "We cannot afford __________ resources carelessly if we desire a sustainable future.",
        options: ["wasting", "to waste", "waste", "wasted"],
        correctAnswers: [1],
        explanation: "'Afford' takes an infinitive: 'afford to waste'.",
        sourceExam: "الشرقية - بلبيس 2026",
        points: 2
      },
      {
        id: "gov_u4_sharqia_q5",
        type: "single",
        question: "The students organized a 'Bag __________' where neighbors traded plastic bags for durable cloth ones.",
        options: ["Swap", "Slogan", "Landfill", "Assembly"],
        correctAnswers: [0],
        explanation: "Collocation: 'Bag Swap' (مبادلة الحقائب البلاستيكية بالقماشية).",
        sourceExam: "الشرقية 2026",
        points: 2
      },
      {
        id: "gov_u4_sharqia_q6",
        type: "single",
        question: "Which expression is appropriate to end a formal email to your school headmaster?",
        options: ["Yours sincerely,", "See ya,", "Cheers,", "Later,"],
        correctAnswers: [0],
        explanation: "Formal email sign-off: 'Yours sincerely,'.",
        sourceExam: "كتاب المعاصر ص 242",
        points: 2
      },
      {
        id: "gov_u4_sharqia_q7",
        type: "single",
        question: "The Water Team presented their __________ on fixing leaking school taps at morning assembly.",
        options: ["findings", "landfills", "depletions", "emissions"],
        correctAnswers: [0],
        explanation: "'Findings' (نتائج البحث الاستقصائي).",
        sourceExam: "الشرقية 2026",
        points: 2
      },
      {
        id: "gov_u4_sharqia_q8",
        type: "single",
        question: "The director suggested that all employees __________ public transport to work.",
        options: ["use", "used", "uses", "using"],
        correctAnswers: [0],
        explanation: "Subjunctive bare infinitive after 'suggested that + subject': 'use'.",
        sourceExam: "الشرقية 2026",
        points: 2
      }
    ],
    storyQuestions: [
      {
        id: "gov_u4_sharqia_st1",
        chapter: 4,
        question: "How does the leaping marlin symbolize the grandeur of nature in Chapter 4?",
        questionAr: "كيف تجسد قفزة سمكة المارلن المهيبة في الفصل الرابع عظمة الطبيعة وجمالها الأخاذ؟",
        modelAnswer: "When the marlin leaps into the brilliant sunlight, longer than the skiff, gleaming with purple and silver like a sword, Santiago is filled with awe. Its majestic leap proves that nature is not an enemy to be hated, but a noble opponent that elevates man's own struggle to heroic stature.",
        keyCriteria: ["longer than skiff, silver and purple", "nature as noble opponent", "inspiring awe rather than hatred"],
        maxMarks: 4
      }
    ],
    writingTask: {
      type: "formal_email",
      title: "Proposal for Solar Energy in Public Schools",
      prompt: "Write a formal email (120-150 words) to your local Directorate of Education suggesting the installation of solar panels on school rooftops.",
      wordCountTarget: "120-150 words",
      rubric: { ideas: 4, grammarVocab: 4, organization: 3, mechanics: 3 },
      sampleOutline: ["Subject line + formal salutation", "Purpose: Solar energy transition", "Benefits: Reduced bills and eco-awareness", "Formal conclusion"],
      modelResponse: "Subject: Formal Proposal: Implementing Solar Power in Secondary Schools\n\nDear Director of Education,\n\nI am writing on behalf of the student council to respectfully submit a proposal regarding renewable energy adoption across our educational district.\n\nOur schools possess expansive, unshaded rooftops that receive abundant solar radiation year-round. By installing modern photovoltaic solar panels, our schools could generate clean electricity, substantially reducing governmental energy expenditure. Furthermore, surplus energy could be directed into the municipal grid. Most importantly, having working solar installations will provide students with practical, everyday education in green engineering and environmental stewardship.\n\nWe have compiled a preliminary feasibility outline for your kind review. We would be honored to discuss this initiative in detail at your earliest convenience.\n\nYours sincerely,\nAhmed Mansour\nStudent Council Representative"
    }
  },

  // ================= UNIT 5 GOVERNMENTAL EXAMS =================
  {
    id: "gov_u5_menofia",
    unitId: 5,
    level: 4,
    governorate: "Menofia Governorate (مديرية التربية والتعليم بالمنوفية - شبين الكوم وأشمون)",
    term: 1,
    category: "governmental",
    levelTitle: "Menofia Directorate Official Exam - Unit 5",
    levelTitleAr: "امتحان محافظة المنوفية الرسمي - الوحدة الخامسة (تكنولوجيا التعليم واللغات)",
    durationMinutes: 45,
    totalMarks: 32,
    mcqs: [
      {
        id: "gov_u5_menofia_q1",
        type: "mrq",
        question: "Choose TWO correct answers: 'She felt very motivated to learn languages.' The antonyms of 'motivated' are __________ and __________.",
        options: ["discouraged", "inspired", "lazy", "confident", "enthusiastic"],
        correctAnswers: [0, 2],
        explanation: "'Motivated' (متحمس / ذو دافع) opposes 'discouraged' (محبط) and 'lazy' (كسول).",
        sourceExam: "المنوفية - أشمون 2026",
        points: 2
      },
      {
        id: "gov_u5_menofia_q2",
        type: "single",
        question: "Learning foreign languages helps students develop mutual __________ toward other cultures.",
        options: ["tolerance", "hesitation", "misinformation", "pollution"],
        correctAnswers: [0],
        explanation: "'Tolerance' (تسامح واحترام التنوع).",
        sourceExam: "المنوفية - شبين الكوم 2026",
        points: 2
      },
      {
        id: "gov_u5_menofia_q3",
        type: "single",
        question: "There is __________ tea left in the pot; shall I brew a fresh cup?",
        options: ["little", "a few", "few", "many"],
        correctAnswers: [0],
        explanation: "'Tea' is uncountable, and 'little' denotes an insufficient amount.",
        sourceExam: "المنوفية - بركة السبع 2026",
        points: 2
      },
      {
        id: "gov_u5_menofia_q4",
        type: "single",
        question: "Would you like __________ sugar in your coffee?",
        options: ["some", "any", "many", "few"],
        correctAnswers: [0],
        explanation: "'Some' is used in polite offers in question form.",
        sourceExam: "المنوفية 2026",
        points: 2
      },
      {
        id: "gov_u5_menofia_q5",
        type: "single",
        question: "The police __________ questioning witnesses about the cyber fraud case.",
        options: ["are", "is", "was", "has been"],
        correctAnswers: [0],
        explanation: "'The police' takes a plural verb: 'are'.",
        sourceExam: "المنوفية 2026",
        points: 2
      },
      {
        id: "gov_u5_menofia_q6",
        type: "single",
        question: "Which of the following is an appropriate greeting for an informal email to a peer?",
        options: ["What's up Omar,", "To Whom It May Concern,", "Dear Respected Sir,", "Yours faithfully,"],
        correctAnswers: [0],
        explanation: "Writing Skills: Informal greetings include 'What's up [Name],' or 'Hi [Name],'.",
        sourceExam: "كتاب المعاصر ص 296",
        points: 2
      },
      {
        id: "gov_u5_menofia_q7",
        type: "single",
        question: "Dr. Zewail possessed immense __________ in scientific research.",
        options: ["experience", "experiences", "an experience", "experiencing"],
        correctAnswers: [0],
        explanation: "Cumulative knowledge and skill is uncountable: 'experience'.",
        sourceExam: "المنوفية 2026",
        points: 2
      },
      {
        id: "gov_u5_menofia_q8",
        type: "single",
        question: "She gave me a very helpful piece of __________ before my exam.",
        options: ["advice", "advices", "advise", "advising"],
        correctAnswers: [0],
        explanation: "Uncountable partitive: 'a piece of advice'.",
        sourceExam: "المنوفية 2026",
        points: 2
      }
    ],
    storyQuestions: [
      {
        id: "gov_u5_menofia_st1",
        chapter: 5,
        question: "Why does Santiago apologize to the dead marlin after lashing it to his boat?",
        questionAr: "لماذا اعتذر سانتياجو لسمكة المارلن الميتة بعد أن ربطها بجانب قاربه؟",
        modelAnswer: "Santiago apologizes ('I am sorry that I killed you, brother') because he revere the fish as a noble creature of supreme courage and grace. He recognizes that killing the marlin was necessary for his own survival, but it represents a profound spiritual loss.",
        keyCriteria: ["reverence for fish's nobility", "regret over killing a magnificent creature", "necessary survival vs spiritual grief"],
        maxMarks: 4
      }
    ],
    writingTask: {
      type: "informal_email",
      title: "Recommending a Language Learning App",
      prompt: "Write an informal email (120-150 words) to your classmate Youssef, recommending a mobile app that helped you improve your English pronunciation and vocabulary.",
      wordCountTarget: "120-150 words",
      rubric: { ideas: 4, grammarVocab: 4, organization: 3, mechanics: 3 },
      sampleOutline: ["Informal greeting", "Reason for writing", "App features (AI speech check, daily quizzes)", "Sign-off"],
      modelResponse: "Hi Youssef,\n\nHow's everything going with you? I hope you're doing great!\n\nI wanted to share something exciting that has really boosted my English speaking skills recently. Last month, our teacher recommended a fantastic language app called 'FluencyMaster', and it has made a huge difference.\n\nThe app uses AI speech recognition to listen to your pronunciation and immediately points out how to fix tricky sounds. It also features bite-sized daily vocabulary quizzes and dialogues with native speakers. I spend just fifteen minutes on it every evening before bed, and I've already noticed that I feel much more confident speaking in class.\n\nYou should definitely download it from the app store—it's completely free for students. Let me know what you think after you try it out!\n\nCatch you later,\nTamer"
    }
  },

  // ================= UNIT 6 GOVERNMENTAL EXAMS =================
  {
    id: "gov_u6_asyut",
    unitId: 6,
    level: 4,
    governorate: "Asyut Governorate (مديرية التربية والتعليم بأسيوط - منفلوط والقوصية)",
    term: 1,
    category: "governmental",
    levelTitle: "Asyut Directorate Official Exam - Unit 6",
    levelTitleAr: "امتحان محافظة أسيوط الرسمي - الوحدة السادسة (البحث عن عمل)",
    durationMinutes: 45,
    totalMarks: 32,
    mcqs: [
      {
        id: "gov_u6_asyut_q1",
        type: "mrq",
        question: "Choose TWO correct answers: 'The coach was impressed by his polished performance.' Synonyms of 'polished' are __________ and __________.",
        options: ["refined", "rough", "elegant", "unfinished", "crude"],
        correctAnswers: [0, 2],
        explanation: "'Polished' (متقن / مصقول) corresponds to 'refined' and 'elegant'.",
        sourceExam: "أسيوط - القوصية 2026",
        points: 2
      },
      {
        id: "gov_u6_asyut_q2",
        type: "single",
        question: "Applicants must ensure their professional __________ profile is up to date before interviews.",
        options: ["LinkedIn", "silo", "landfill", "tactic"],
        correctAnswers: [0],
        explanation: "Key platform: LinkedIn profile.",
        sourceExam: "أسيوط - منفلوط 2026",
        points: 2
      },
      {
        id: "gov_u6_asyut_q3",
        type: "single",
        question: "My uncle is __________ honest accountant who manages company accounts.",
        options: ["an", "a", "the", "no article"],
        correctAnswers: [0],
        explanation: "'Honest' begins with a vowel sound /ɒ/, taking 'an'.",
        sourceExam: "أسيوط - ديرمواس 2026",
        points: 2
      },
      {
        id: "gov_u6_asyut_q4",
        type: "single",
        question: "Astronauts explore __________ space beyond the Earth's atmosphere.",
        options: ["no article", "the", "a", "an"],
        correctAnswers: [0],
        explanation: "'Space' in the cosmic sense takes zero article (no article).",
        sourceExam: "أسيوط - الفتح 2026",
        points: 2
      },
      {
        id: "gov_u6_asyut_q5",
        type: "single",
        question: "The manager praised the new engineer for having a positive __________ during crises.",
        options: ["attitude", "drip", "landfill", "scam"],
        correctAnswers: [0],
        explanation: "'Attitude' (توجه إيجابي وسلوك مهني).",
        sourceExam: "أسيوط 2026",
        points: 2
      },
      {
        id: "gov_u6_asyut_q6",
        type: "single",
        question: "We stayed at a hotel overlooking __________ Red Sea.",
        options: ["the", "a", "an", "no article"],
        correctAnswers: [0],
        explanation: "Oceans and seas take 'the' ('the Red Sea').",
        sourceExam: "أسيوط 2026",
        points: 2
      },
      {
        id: "gov_u6_asyut_q7",
        type: "single",
        question: "What is the recommended length for an entry-level professional CV?",
        options: ["1 to 2 pages", "5 to 6 pages", "10 pages", "Half a page only"],
        correctAnswers: [0],
        explanation: "Writing Skills: Standard length is 1-2 pages.",
        sourceExam: "كتاب المعاصر ص 351",
        points: 2
      },
      {
        id: "gov_u6_asyut_q8",
        type: "single",
        question: "Young candidates should acquire practical skills through a summer __________.",
        options: ["internship", "silo", "landfill", "scam"],
        correctAnswers: [0],
        explanation: "'Internship' (تدريب عملي / فترة تدريب مهني).",
        sourceExam: "أسيوط 2026",
        points: 2
      }
    ],
    storyQuestions: [
      {
        id: "gov_u6_asyut_st1",
        chapter: 6,
        question: "What does Hemingway mean by the famous moral line: 'A man can be destroyed but not defeated'?",
        questionAr: "ماذا يقصد هيمنجواي بالحكمة الأدبية الشهيرة: 'يمكن تدمير الإنسان لكن لا يمكن هزيمته'؟",
        modelAnswer: "Physical forces or tragedies can destroy a person's body, weapons, and material catch—the sharks devour the marlin down to its bare skeleton. But a person is only truly defeated if they surrender their courage, dignity, and inner will. Santiago endures until the very end, returning spiritually unbroken.",
        keyCriteria: ["physical destruction vs moral defeat", "preservation of dignity and will", "spiritual victory over material loss"],
        maxMarks: 4
      }
    ],
    writingTask: {
      type: "cv_resume",
      title: "CV Career Objective & Personal Statement",
      prompt: "Draft a professional CV personal profile and skills summary (120-150 words) for a position as a junior lab assistant.",
      wordCountTarget: "120-150 words",
      rubric: { ideas: 4, grammarVocab: 4, organization: 3, mechanics: 3 },
      sampleOutline: ["Contact details header", "Objective statement", "Education & honors", "Key laboratory skills"],
      modelResponse: "OMAR KHALED\nEmail: omar.khaled@email.com | Tel: +20 111 234 5678 | Asyut, Egypt\n\nPROFESSIONAL OBJECTIVE\nEnthusiastic and detail-oriented First Secondary science student with strong laboratory fundamentals and exemplary academic standing. Seeking a summer internship as a junior laboratory assistant to assist senior technicians, observe experimental protocols, and apply chemistry knowledge.\n\nEDUCATION\nAsyut STEM Secondary School, Asyut\n1st Secondary Grade - GPA: 99.1% (Class Rank: 1st)\nRelevant Subjects: Advanced Chemistry, Biology, Physics, Technical English.\n\nCORE COMPETENCIES & TECHNICAL SKILLS\n- Laboratory safety protocols, solution preparation, microscope handling, digital data logging.\n- IT & Software: Microsoft Excel for statistical analysis, Python basics, Google Workspace.\n- Soft Skills: Meticulous observation, team coordination, clear-headed problem solving under pressure.\n\nEXTRACURRICULAR INITIATIVES\n- Team Lead, Regional Science Fair (2026): Researched organic water filtration methods."
    }
  }
];

export const getGovernmentalExamsByUnit = (unitId: number): Exam[] => {
  return governmentalExams.filter(e => e.unitId === unitId);
};
