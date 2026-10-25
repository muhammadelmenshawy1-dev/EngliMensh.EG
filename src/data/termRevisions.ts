import { Exam } from '../types.ts';

export const term1RevisionExams: Exam[] = [
  {
    id: "rev_t1_review1",
    unitId: 1, // Covering Units 1, 2, 3
    level: 4,
    term: 1,
    category: "term_revision",
    governorate: "General Secondary Education Board - Term 1 Comprehensive Review (Units 1-3)",
    levelTitle: "Term 1 Comprehensive Review 1 (Units 1, 2 & 3)",
    levelTitleAr: "المراجعة العامة الأولى للفصل الدراسي الأول (الوحدات 1، 2، 3)",
    durationMinutes: 45,
    totalMarks: 32,
    mcqs: [
      {
        id: "rev_t1_q1",
        type: "mrq",
        question: "Choose TWO correct answers: 'We must ensure tourism develops in harmony with the environment.' Synonyms of 'harmony' are __________ and __________.",
        options: ["conflict", "confusion", "coordination", "separation", "agreement"],
        correctAnswers: [2, 4],
        explanation: "'Harmony' (تناغم وانسجام) corresponds to 'coordination' and 'agreement'.",
        sourceExam: "Review 1 p.194",
        points: 2
      },
      {
        id: "rev_t1_q2",
        type: "mrq",
        question: "Choose TWO correct answers: 'Productivity in the factory has slipped quite noticeably.' Synonyms of 'slipped' are __________ and __________.",
        options: ["got better", "got worse", "escaped", "succeeded", "fallen"],
        correctAnswers: [1, 4],
        explanation: "'Slipped' (تراجع / انخفض) means 'got worse' and 'fallen'.",
        sourceExam: "Review 1 p.194",
        points: 2
      },
      {
        id: "rev_t1_q3",
        type: "single",
        question: "Egypt has a beating heart for thousands of years. The phrase 'beaten for' suggests __________.",
        options: ["continuous, ongoing life", "difficult struggle", "temporary event", "brief history"],
        correctAnswers: [0],
        explanation: "'Beaten for thousands of years' conveys vibrant, continuous national vitality.",
        sourceExam: "Review 1 p.194",
        points: 2
      },
      {
        id: "rev_t1_q4",
        type: "single",
        question: "Language games are usually intended to encourage student __________.",
        options: ["interactive", "interaction", "interact", "interactively"],
        correctAnswers: [1],
        explanation: "Noun form needed after noun adjunct 'student': 'student interaction' (تفاعل الطلاب).",
        sourceExam: "Review 1 p.195",
        points: 2
      },
      {
        id: "rev_t1_q5",
        type: "single",
        question: "If it rains tomorrow, we __________ the picnic to the weekend.",
        options: ["cancel", "will cancel", "cancels", "canceled"],
        correctAnswers: [1],
        explanation: "First conditional: 'If + present simple, will + inf' ('will cancel').",
        sourceExam: "Review 1 Language p.196",
        points: 2
      },
      {
        id: "rev_t1_q6",
        type: "single",
        question: "Students __________ wear school uniforms; it is compulsory by ministerial regulations.",
        options: ["must", "mustn't", "should", "shouldn't"],
        correctAnswers: [0],
        explanation: "'Must' denotes strict official obligation and school rules.",
        sourceExam: "Review 1 Language p.196",
        points: 2
      },
      {
        id: "rev_t1_q7",
        type: "single",
        question: "While the workers were restoring the temple, they __________ an ancient stone statue.",
        options: ["find", "found", "were finding", "have found"],
        correctAnswers: [1],
        explanation: "Shorter completed past action interrupting continuous action: 'found'.",
        sourceExam: "Review 1 Language p.197",
        points: 2
      },
      {
        id: "rev_t1_q8",
        type: "single",
        question: "What is the primary purpose of the introductory paragraph in an analytical essay?",
        options: ["List references", "Present the topic and thesis statement", "Summarize conclusion", "Include informal emojis"],
        correctAnswers: [1],
        explanation: "Writing Skills: Introduction introduces the topic, hook, and thesis statement.",
        sourceExam: "Review 1 Writing p.201",
        points: 2
      }
    ],
    reading: {
      passageTitle: "Eco-Friendly Urban Mobility: E-Scooters",
      passageText: "In many metropolitan cities around the world, urban planners are seeking innovative ways to commute efficiently while curbing pollution. One rapidly burgeoning solution is the proliferation of electric scooters, also known as e-scooters. These lightweight vehicles operate on rechargeable lithium batteries and are conveniently rented via smartphone applications. Riders can unlock them at one central location and deposit them at another, making short trips across town faster and more convenient than private cars or crowded buses. Advocates emphasize that e-scooters reduce greenhouse emissions and reduce vehicular traffic congestion. However, urban safety critics argue that e-scooters present hazards: riders frequently neglect helmets, and sidewalk collisions endanger pedestrians. Furthermore, gathering and charging thousands of dispersed scooters daily produces hidden logistical emissions. As cities update their bylaws, e-scooters remain a promising, yet hotly debated, pillar of modern green urban transit.",
      questions: [
        {
          id: "rev_t1_rd1",
          type: "single",
          question: "The main benefit of e-scooters emphasized by supporters is that they __________.",
          options: [
            "provide an efficient and eco-friendly travel option for short urban distances",
            "replace all airplanes and trains",
            "cost nothing to manufacture",
            "never require charging"
          ],
          correctAnswers: [0],
          explanation: "The passage notes they offer efficient, low-emission travel for short trips.",
          points: 2
        },
        {
          id: "rev_t1_rd2",
          type: "single",
          question: "Critics raise concerns regarding e-scooters primarily due to __________.",
          options: [
            "pedestrian safety risks, lack of helmets, and logistical charging demands",
            "their high ticket cost compared to luxury cars",
            "their inability to use modern smartphone apps",
            "their heavy weight"
          ],
          correctAnswers: [0],
          explanation: "Paragraph 3 notes riders neglect helmets, risk pedestrian collisions, and create charging demands.",
          points: 2
        }
      ]
    },
    translation: [
      {
        id: "rev_t1_tr1",
        direction: "en-to-ar",
        sourceText: "Egypt's heritage is deeply rooted in its ancient civilization, featuring iconic monuments that inspire global travelers.",
        options: [
          "يتمتع تراث مصر بجذور عميقة في حضارتها القديمة، ويضم آثاراً شهيرة تلهم المسافرين من جميع أنحاء العالم.",
          "تتميز مصر بصناعتها الحديثة فقط، وتتجاهل آثارها القديمة تماماً في القرن الحادي والعشرين.",
          "إن مناخ مصر معتدل طوال العام مما يجعل الرحلات الجوية مريحة للمسافرين.",
          "يعتمد اقتصاد مصر كلياً على بيع التماثيل الحجرية للسياح الأجانب."
        ],
        correctIndex: 0,
        explanation: "Accurate translation of 'deeply rooted', 'iconic monuments', and 'inspire global travelers'."
      }
    ],
    storyQuestions: [
      {
        id: "rev_t1_st1",
        chapter: 1,
        question: "How does Santiago demonstrate unbroken dignity in the face of persistent bad luck in Chapter 1?",
        questionAr: "كيف أظهر سانتياجو كرامة أصيلة لا تنكسر في مواجهة سوء الحظ المتواصل في الفصل الأول؟",
        modelAnswer: "Despite going eighty-four days without taking a fish and being branded 'salao' by the younger fishermen, Santiago carries himself with erect posture and clear, cheerful eyes. He never complains or surrenders to bitterness, preparing his lines each night with the precision of a master craftsman.",
        keyCriteria: ["cheerful undefeated eyes", "refusal to complain or yield to bitterness", "meticulous preparation of gear"],
        maxMarks: 4
      }
    ],
    writingTask: {
      type: "essay",
      title: "The Atmosphere of a Library on a Rainy Day",
      prompt: "Write a descriptive essay (120-150 words) depicting the tranquil sensory experience of studying inside a quiet library while rain patters against the glass.",
      wordCountTarget: "120-150 words",
      rubric: { ideas: 4, grammarVocab: 4, organization: 3, mechanics: 3 },
      sampleOutline: ["Introduction: Sanctuary from storm", "Sensory details: Rain on glass, scent of paper", "Atmosphere of collective focus", "Conclusion"],
      modelResponse: "Outside, heavy grey clouds unleash rhythmic sheets of rain, but stepping into the public library feels like entering an oasis of warm tranquility. The gentle tapping of raindrops against tall arched glass panes provides a soothing, natural acoustic backdrop. Inside, the comforting, timeless scent of aged paper, polished wood, and quiet coffee fills the air. Warm amber desk lamps cast soft golden pools over open manuscripts, where students and researchers sit in focused, communal contemplation. The only sounds are the occasional rustle of a turning page, the hushed slide of an oak chair, and the rhythmic drumming of storm winds outside. Sitting with a notebook in this peaceful haven, the world feels still, safe, and rich with wisdom."
    }
  }
];

export const term2RevisionExams: Exam[] = [
  {
    id: "rev_t2_review2",
    unitId: 4, // Covering Units 4, 5, 6
    level: 4,
    term: 2,
    category: "term_revision",
    governorate: "General Secondary Education Board - Term 2 Comprehensive Review (Units 4-6)",
    levelTitle: "Term 2 Comprehensive Review 2 (Units 4, 5 & 6)",
    levelTitleAr: "المراجعة العامة الثانية للفصل الدراسي الثاني (الوحدات 4، 5، 6)",
    durationMinutes: 45,
    totalMarks: 32,
    mcqs: [
      {
        id: "rev_t2_q1",
        type: "mrq",
        question: "Choose TWO correct answers: 'The candidate's speech was so impressive.' Synonyms of 'impressive' are __________ and __________.",
        options: ["remarkable", "ordinary", "influential", "weak", "unimpressive"],
        correctAnswers: [0, 2],
        explanation: "'Impressive' (مبهر / ذو أثر بالغ) corresponds to 'remarkable' and 'influential'.",
        sourceExam: "Review 2 p.368",
        points: 2
      },
      {
        id: "rev_t2_q2",
        type: "mrq",
        question: "Choose TWO correct answers: 'Recycling programs are key to a sustainable future.' Synonyms of 'sustainable' are __________ and __________.",
        options: ["maintainable", "complicated", "eco-friendly", "generic", "depleted"],
        correctAnswers: [0, 2],
        explanation: "'Sustainable' (مستدام) corresponds to 'maintainable' and 'eco-friendly'.",
        sourceExam: "Review 2 p.368",
        points: 2
      },
      {
        id: "rev_t2_q3",
        type: "single",
        question: "The enterprise aims to promote development that does not __________ the natural environment.",
        options: ["harm", "sustain", "polish", "coordinate"],
        correctAnswers: [0],
        explanation: "'Harm the environment' (يضر بالبيئة).",
        sourceExam: "Review 2 p.368",
        points: 2
      },
      {
        id: "rev_t2_q4",
        type: "single",
        question: "She decided __________ abroad after completing her university degree.",
        options: ["to go", "going", "goes", "gone"],
        correctAnswers: [0],
        explanation: "'Decide' is followed by 'to + inf': 'decided to go'.",
        sourceExam: "Review 2 p.370",
        points: 2
      },
      {
        id: "rev_t2_q5",
        type: "single",
        question: "I really enjoy __________ new modern languages in my leisure time.",
        options: ["learning", "to learn", "learn", "learned"],
        correctAnswers: [0],
        explanation: "'Enjoy' is followed by a gerund: 'learning'.",
        sourceExam: "Review 2 p.370",
        points: 2
      },
      {
        id: "rev_t2_q6",
        type: "single",
        question: "How __________ students attended the international robotics summit yesterday?",
        options: ["many", "much", "little", "lots"],
        correctAnswers: [0],
        explanation: "'Students' is plural countable, so 'How many' is required.",
        sourceExam: "Review 2 p.370",
        points: 2
      },
      {
        id: "rev_t2_q7",
        type: "single",
        question: "Technology in schools __________ interactive learning through smartboards and educational apps.",
        options: ["enhances", "depletes", "destroys", "scams"],
        correctAnswers: [0],
        explanation: "'Enhances learning' (يعزز ويطور العملية التعليمية).",
        sourceExam: "Review 2 Translation p.371",
        points: 2
      },
      {
        id: "rev_t2_q8",
        type: "single",
        question: "Which of the following elements is NOT typically included on a professional CV?",
        options: ["Childhood gossip and family quarrels", "Educational degrees", "Work experience", "Core technical skills"],
        correctAnswers: [0],
        explanation: "Writing Skills: Private family gossip is strictly excluded from professional CVs.",
        sourceExam: "Review 2 Writing p.374",
        points: 2
      }
    ],
    reading: {
      passageTitle: "Eco-Vision: Sustainable Industrial Enterprise",
      passageText: "In today's fast-changing commercial arena, visionary organizations are pioneering innovative paths to reduce environmental harm. One prominent enterprise, Eco-Vision, has garnered widespread acclaim for its green manufacturing model. Rather than measuring success solely through quarterly financial profit, Eco-Vision minimizes its carbon footprint by installing industrial-scale solar panels and wind turbines. The company encourages employees to avoid isolated operational 'silos' and collaborate across multidisciplinary teams. Furthermore, regular feedback check-ins allow stakeholders to share constructive proposals openly. Over the past three years, Eco-Vision has reduced its grid energy consumption by 40% while inspiring rival firms to adopt closed-loop recycling. Their trajectory demonstrates that commercial profitability and environmental stewardship can advance hand in hand.",
      questions: [
        {
          id: "rev_t2_rd1",
          type: "single",
          question: "Eco-Vision's primary environmental achievement noted in the text is that it __________.",
          options: [
            "reduced energy consumption by 40% through solar and wind installations",
            "stopped manufacturing products completely",
            "fired all corporate workers",
            "refused to use computers"
          ],
          correctAnswers: [0],
          explanation: "The passage specifies a 40% energy reduction using renewable solar and wind power.",
          points: 2
        },
        {
          id: "rev_t2_rd2",
          type: "single",
          question: "The word 'silos' in paragraph two refers to __________.",
          options: [
            "isolated departments that do not communicate or collaborate with others",
            "concrete grain storage towers on farms",
            "solar battery cells",
            "wind turbines"
          ],
          correctAnswers: [0],
          explanation: "'Silos' metaphorically denotes isolated departments lacking collaboration.",
          points: 2
        }
      ]
    },
    translation: [
      {
        id: "rev_t2_tr1",
        direction: "en-to-ar",
        sourceText: "The country is adopting strategic plans to develop renewable clean energy and curb industrial emissions.",
        options: [
          "تتبنى الدولة خططاً استراتيجية لتطوير الطاقة النظيفة المتجددة والحد من الانبعاثات الصناعية.",
          "تتجاهل الدولة الطاقة الشمسية وتعتمد فقط على الفحم المستورد لتشغيل المصانع.",
          "تفرض الحكومة ضرائب باهظة على كل من يركب الألواح الشمسية في المدن الجديدة.",
          "تسعى المصانع إلى زيادة التلوث الجوي لتحقيق أرباح مالية سريعة."
        ],
        correctIndex: 0,
        explanation: "Accurate translation of 'strategic plans', 'renewable clean energy', and 'curb industrial emissions'."
      }
    ],
    storyQuestions: [
      {
        id: "rev_t2_st1",
        chapter: 6,
        question: "What does the marlin's skeleton shining white in the moonlight symbolize at the end of the novella?",
        questionAr: "ماذا يرمز الهيكل العظمي للمارلن المشع بالبياض في ضوء القمر في ختام الرواية؟",
        modelAnswer: "The giant white skeleton represents both monumental loss and supreme victory. While the sharks devoured the flesh, they could not destroy Santiago's courage, pride, or craftsmanship. Tied to the skiff, the skeleton stands as an eternal monument to the triumph of the human spirit over insurmountable adversity.",
        keyCriteria: ["monument to spiritual triumph", "flesh devoured but honor intact", "triumph of human spirit over adversity"],
        maxMarks: 4
      }
    ],
    writingTask: {
      type: "formal_email",
      title: "Inquiring About an IT Internship Opportunity",
      prompt: "Write a formal email (120-150 words) to the Human Resources Manager of a technology firm, inquiring about summer internship openings in web development and data analytics.",
      wordCountTarget: "120-150 words",
      rubric: { ideas: 4, grammarVocab: 4, organization: 3, mechanics: 3 },
      sampleOutline: ["Subject line + greeting", "Purpose of inquiry", "Summary of academic skills and Python background", "Polite closing request"],
      modelResponse: "Subject: Inquiry Regarding Summer Web Development Internship - Karim Adel\n\nDear Hiring Manager,\n\nI hope this email finds you well. I am writing to respectfully inquire about potential summer internship opportunities within your software development and data analytics departments for ambitious secondary students.\n\nI am currently a First Secondary student at Alexandria STEM School, where I maintain an exemplary academic record in advanced mathematics and computer science. Over the past academic year, I have completed certified coursework in Python programming, HTML/CSS layout design, and SQL database fundamentals. I am deeply eager to apply these technical skills within a real-world enterprise setting while learning from your experienced software engineering mentors.\n\nI have attached my comprehensive resume and portfolio link for your consideration. I would be immensely grateful for the opportunity to discuss how I might contribute to your upcoming projects.\n\nYours sincerely,\nKarim Adel"
    }
  }
];
