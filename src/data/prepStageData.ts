// =========================================================================
// EngliMensh.EG - Preparatory Stage Master Data Model & Database
// Aligned with the Egyptian Ministry of Education (New Hello Prep 1, 2, 3)
// System Architect: Mohammad El-Menshawy (محمد المنشاوي)
// =========================================================================

import { VocabularyItem, GrammarRuleItem } from './primaryStageData.ts';
import { UnitCurriculum, PrepExamBlueprint, PrepDialogue } from '../types/curriculum.ts';

export interface PrepExamQuestion {
  id: string;
  type: 'mcq' | 'dialogue_turn' | 'fill_in_the_blank' | 'error_correction' | 'guided_writing' | 'reading_mcq' | 'reading_open';
  questionPrompt: string;
  options?: string[];
  correctAnswer: string | string[];
  explanationAr: string;
  marks: number;
  subSkill?: 'Vocabulary' | 'Grammar' | 'Dialogue' | 'Reading' | 'Writing';
}

export interface PrepLessonContent {
  unitId: string;
  grade: 'prep_1' | 'prep_2' | 'prep_3';
  gradeNumber: 7 | 8 | 9;
  term: 1 | 2;
  unitNumber: number;
  unitTitleEn: string;
  unitTitleAr: string;
  theme: string;
  tab1_Vocabulary: {
    words: VocabularyItem[];
    collocations: { phrase: string; meaningAr: string; example: string }[];
    conversationTerms: { en: string; ar: string }[];
  };
  tab2_Grammar: {
    rules: GrammarRuleItem[];
    sentenceBuilderDrills: {
      jumbledParts: string[];
      correctOrder: string[];
      translationAr: string;
    }[];
    errorCorrectionDrills: {
      sentence: string;
      wrongWord: string;
      correctWord: string;
      explanationAr: string;
    }[];
  };
  tab3_Skills: {
    dialogue: PrepDialogue;
    readingPassage: {
      title: string;
      text: string;
      translationAr?: string;
    };
    writingPrompt: {
      title: string;
      prompt: string;
      targetWordsCount: number;
      rubric: string[];
      modelAnswer: string;
    };
  };
  examSuite: {
    level1_Foundation: PrepExamQuestion[];
    level2_Contextual: PrepExamQuestion[];
    level3_AdvancedStructure: PrepExamQuestion[];
    level4_MoeMockExam: PrepExamQuestion[];
    level5_HigherThinking: PrepExamQuestion[];
  };
}

export const prepCurriculumDatabase: PrepLessonContent[] = [
  // =========================================================================
  // PREP 1 (GRADE 7) - UNIT 1: My Family and Me
  // =========================================================================
  {
    unitId: 'prep1_t1_u1',
    grade: 'prep_1',
    gradeNumber: 7,
    term: 1,
    unitNumber: 1,
    unitTitleEn: 'My Family and Me',
    unitTitleAr: 'عائلتي وأنا (العمل التطوعي والهوايات)',
    theme: 'Family relations, voluntary work, musical instruments, chess, orphanages',
    tab1_Vocabulary: {
      words: [
        {
          id: 'p1_u1_w1',
          word: 'Voluntary work',
          phonetics: '/ˈvɒl.ən.tər.i wɜːk/',
          arabicMeaning: 'عمل تطوعي (بدون مقابل مادي)',
          partOfSpeech: 'phrase',
          exampleSentence: 'Doing voluntary work at the children hospital makes me feel proud.',
          visualCue: 'volunteers_team'
        },
        {
          id: 'p1_u1_w2',
          word: 'Orphan',
          phonetics: '/ˈɔː.fən/',
          arabicMeaning: 'يتيم (فقد والديه)',
          partOfSpeech: 'noun',
          exampleSentence: 'Heidi was an orphan girl who lived with her grandfather in the Alps.',
          visualCue: 'kind_smile'
        },
        {
          id: 'p1_u1_w3',
          word: 'Twin',
          phonetics: '/twɪn/',
          arabicMeaning: 'توأم',
          partOfSpeech: 'noun',
          exampleSentence: 'Hany and Hazem are twins; they have the same age and look alike.',
          visualCue: 'friends_group'
        },
        {
          id: 'p1_u1_w4',
          word: 'Drums',
          phonetics: '/drʌmz/',
          arabicMeaning: 'طبول (آلة موسيقية إيقاعية)',
          partOfSpeech: 'noun',
          exampleSentence: 'My brother loves playing the drums in the school band.',
          visualCue: 'music_singing'
        }
      ],
      collocations: [
        { phrase: 'do voluntary work', meaningAr: 'يقوم بعمل تطوعي', example: 'We do voluntary work to assist children.' },
        { phrase: 'play chess', meaningAr: 'يلعب شطرنج', example: 'Grandfather teaches me how to play chess.' }
      ],
      conversationTerms: [
        { en: 'What musical instruments do you play?', ar: 'ما الآلات الموسيقية التي تعزف عليها؟' },
        { en: 'Voluntary work is work you do for no money.', ar: 'العمل التطوعي هو عمل تقوم به دون مقابل مادي.' },
        { en: 'Both of my brothers are keen on sports.', ar: 'كلا شقيقيّ شغوفان بالرياضة.' }
      ]
    },
    tab2_Grammar: {
      rules: [
        {
          title: 'Possessive Adjectives vs. Possessive Pronouns',
          ruleExplanationAr: 'صفات الملكية (my, your, his, her, our, their) يتبعها اسم، بينما ضمائر الملكية (mine, yours, his, hers, ours, theirs) تأتي بمفردها دون اسم.',
          structureFormula: 'Possessive Adj + Noun | Possessive Pronoun (No Noun)',
          examples: [
            { en: 'This is my bag, and that bag is yours.', ar: 'هذه حقيبتي وتلك الحقيبة حقيبتك.' },
            { en: 'Whose pen is this? It is mine.', ar: 'لمن هذا القلم؟ إنه لي.' }
          ],
          visualPatternBlocks: ['Possessive Adj (my/your/his) + Noun', 'Possessive Pronoun (mine/yours/his)']
        }
      ],
      sentenceBuilderDrills: [
        {
          jumbledParts: ['bag', 'This', 'is', 'mine', 'not', 'yours'],
          correctOrder: ['This', 'bag', 'is', 'mine', 'not', 'yours'],
          translationAr: 'هذه الحقيبة تخصني وليست لك'
        }
      ],
      errorCorrectionDrills: [
        {
          sentence: 'This book belongs to me. It is (my).',
          wrongWord: 'my',
          correctWord: 'mine',
          explanationAr: 'في نهاية الجملة بدون اسم نستخدم ضمير الملكية mine وليس صفة الملكية my.'
        }
      ]
    },
    tab3_Skills: {
      dialogue: {
        title: 'Complete the dialogue between Omar and Hazem:',
        context: 'Omar is telling Hazem about his hobbies and family voluntary work.',
        turns: [
          { speaker: 'Hazem', text: 'Hello Omar! What are your favourite hobbies?', isBlank: false },
          { speaker: 'Omar', isBlank: true, blankNumber: 1, expectedAnswer: 'I like playing drums and doing voluntary work.', hintAr: 'اذكر هوايتك المفضلة' },
          { speaker: 'Hazem', text: 'Where do you do voluntary work?', isBlank: false },
          { speaker: 'Omar', isBlank: true, blankNumber: 2, expectedAnswer: 'At the children hospital.', hintAr: 'حدد المكان (مستشفى الأطفال)' }
        ]
      },
      readingPassage: {
        title: 'Heidi: The Story of an Orphan Girl',
        text: 'Heidi is an orphan girl who goes to live with her grandfather in the Swiss mountains. Her grandfather lives in a small wooden house with his goats. Heidi loves nature, fresh air, and watching the birds. Later, she travels to the city of Frankfurt to help Clara, a disabled girl in a wheelchair. Heidi teaches Clara courage and kindness.',
        translationAr: 'قصة هايدي الفتاة اليتيمة التي عاشت مع جدها في جبال سويسرا.'
      },
      writingPrompt: {
        title: 'A Paragraph on Voluntary Work (العمل التطوعي)',
        prompt: 'Write a paragraph of about 80 words about why Egyptian teenagers should do voluntary work in their community.',
        targetWordsCount: 80,
        rubric: ['Relevance to topic', 'Grammar and tense accuracy', 'Appropriate lexical range', 'Correct punctuation'],
        modelAnswer: 'Voluntary work is of paramount importance to our community. When teenagers volunteer in hospitals, orphanages, or public gardens, they learn cooperation and empathy. It teaches us responsibility and builds our character. We do not receive money, but we receive happiness and gratitude from those we help.'
      }
    },
    examSuite: {
      level1_Foundation: [
        {
          id: 'prep1_u1_l1_q1',
          type: 'mcq',
          questionPrompt: 'A child who has no mother or father is an ______.',
          options: ['orphan', 'engineer', 'athlete', 'musician'],
          correctAnswer: 'orphan',
          explanationAr: 'الطفل الذي فقد والديه يُدعى يتيماً (orphan).',
          marks: 1,
          subSkill: 'Vocabulary'
        },
        {
          id: 'prep1_u1_l1_q2',
          type: 'mcq',
          questionPrompt: 'Voluntary work is work that you do ______ money.',
          options: ['without', 'for lots of', 'for earning', 'with high'],
          correctAnswer: 'without',
          explanationAr: 'العمل التطوعي يُؤدى بدون مقابل مالي (without money).',
          marks: 1,
          subSkill: 'Vocabulary'
        }
      ],
      level2_Contextual: [
        {
          id: 'prep1_u1_l2_q1',
          type: 'fill_in_the_blank',
          questionPrompt: 'Whose racket is this? — It belongs to Mona. It is ______.',
          options: ['hers', 'her', 'she', 'him'],
          correctAnswer: 'hers',
          explanationAr: 'نستخدم ضمير الملكية hers ليعود على اسم منى المؤنث دون أن يتبعه اسم.',
          marks: 1,
          subSkill: 'Grammar'
        }
      ],
      level3_AdvancedStructure: [
        {
          id: 'prep1_u1_l3_q1',
          type: 'error_correction',
          questionPrompt: 'Correct the word between brackets: "That camera is (my); I bought it yesterday."',
          correctAnswer: 'mine',
          explanationAr: 'التصحيح mine لأنها تأتي بعد فعل to be منفردة كضمير ملكية.',
          marks: 2,
          subSkill: 'Grammar'
        }
      ],
      level4_MoeMockExam: [
        {
          id: 'prep1_u1_l4_q1',
          type: 'mcq',
          questionPrompt: 'Practice MOE Mock: Hany and Ali have the same parents and birthday. They are ______.',
          options: ['twins', 'strangers', 'cousins', 'grandparents'],
          correctAnswer: 'twins',
          explanationAr: 'الأخوان المولودان في نفس اليوم لنفس الأبوين هما توأم (twins).',
          marks: 2,
          subSkill: 'Vocabulary'
        }
      ],
      level5_HigherThinking: [
        {
          id: 'prep1_u1_l5_q1',
          type: 'guided_writing',
          questionPrompt: 'Reflect on Heidi\'s attitude toward nature in two analytical sentences:',
          correctAnswer: 'Heidi found peace and resilience in the mountains because nature taught her simplicity and gratitude. Her connection with animals and open spaces helped her heal from loneliness.',
          explanationAr: 'تحليل نقدي لشخصية هايدي وعلاقتها بالطبيعة الإنسانية والبيئية.',
          marks: 3,
          subSkill: 'Writing'
        }
      ]
    }
  },

  // =========================================================================
  // PREP 2 (GRADE 8) - UNIT 1: Coming Home
  // =========================================================================
  {
    unitId: 'prep2_t1_u1',
    grade: 'prep_2',
    gradeNumber: 8,
    term: 1,
    unitNumber: 1,
    unitTitleEn: 'Coming Home',
    unitTitleAr: 'العودة إلى المنزل (الروتين اليومي والمساعدة المنزلية)',
    theme: 'Daily routines, leisure activities, chores, texting friends, bakeries',
    tab1_Vocabulary: {
      words: [
        {
          id: 'p2_u1_w1',
          word: 'Daily routine',
          phonetics: '/ˈdeɪ.li ruːˈtiːn/',
          arabicMeaning: 'الروتين اليومي المعتاد',
          partOfSpeech: 'phrase',
          exampleSentence: 'My daily routine is the same every school morning.',
          visualCue: 'open_book'
        },
        {
          id: 'p2_u1_w2',
          word: 'Sofa',
          phonetics: '/ˈsəʊ.fə/',
          arabicMeaning: 'أريكة / كنبة مريحة',
          partOfSpeech: 'noun',
          exampleSentence: 'Grandfather sits comfortably on the large sofa to read his newspaper.',
          visualCue: 'happy_face'
        },
        {
          id: 'p2_u1_w3',
          word: 'Text',
          phonetics: '/tekst/',
          arabicMeaning: 'يراسل نصياً عبر الهاتف',
          partOfSpeech: 'verb',
          exampleSentence: 'I always text my classmates on the sofa after doing homework.',
          visualCue: 'hand_wave'
        },
        {
          id: 'p2_u1_w4',
          word: 'Railway line',
          phonetics: '/ˈreɪl.weɪ laɪn/',
          arabicMeaning: 'خط السكة الحديد',
          partOfSpeech: 'noun',
          exampleSentence: 'The Railway Children lived in a house near the railway line.',
          visualCue: 'desert_safari'
        }
      ],
      collocations: [
        { phrase: 'have a routine', meaningAr: 'يمتلك روتيناً يومياً', example: 'Do you have the same daily routine every week?' },
        { phrase: 'make breakfast', meaningAr: 'يعد وجبة الإفطار', example: 'My mum helps me make breakfast before school.' }
      ],
      conversationTerms: [
        { en: 'What time do you usually wake up?', ar: 'في أي وقت تستيقظ عادةً؟' },
        { en: 'I always catch the bus at seven sharp.', ar: 'أنا دائماً أستقل الحافلة في تمام السابعة.' },
        { en: 'How do you spend your free time?', ar: 'كيف تقضي وقت فراغك؟' }
      ]
    },
    tab2_Grammar: {
      rules: [
        {
          title: 'Adverbs of Frequency & Present Simple',
          ruleExplanationAr: 'ظروف التكرار (always, usually, often, sometimes, never) تأتي قبل الفعل الأساسي وبعد فعل to be (am, is, are).',
          structureFormula: 'Subject + Adverb of Frequency + Main Verb | Subject + am/is/are + Adverb',
          examples: [
            { en: 'Mariam always listens to the teacher attentively.', ar: 'مريم دائماً تستمع إلى المعلم بانتباه.' },
            { en: 'We are never late for our morning lessons.', ar: 'نحن لا نتأخر أبداً عن حصص الصباح.' }
          ],
          visualPatternBlocks: ['Subject', 'Adverb of Frequency (always 100% -> never 0%)', 'Base Verb']
        }
      ],
      sentenceBuilderDrills: [
        {
          jumbledParts: ['late', 'are', 'We', 'never', 'for', 'school'],
          correctOrder: ['We', 'are', 'never', 'late', 'for', 'school'],
          translationAr: 'نحن لا نتأخر أبداً عن المدرسة'
        }
      ],
      errorCorrectionDrills: [
        {
          sentence: 'He (always is) cheerful and polite.',
          wrongWord: 'always is',
          correctWord: 'is always',
          explanationAr: 'يأتي فعل to be قبل ظرف التكرار دائماً: is always.'
        }
      ]
    },
    tab3_Skills: {
      dialogue: {
        title: 'Dialogue: Discussing daily morning routine',
        context: 'Nader and Tamer meet on the bus to school.',
        turns: [
          { speaker: 'Nader', text: 'Good morning Tamer! How do you get to school?', isBlank: false },
          { speaker: 'Tamer', isBlank: true, blankNumber: 1, expectedAnswer: 'I always take the school bus.', hintAr: 'أجب بأنك تستقل الحافلة المدرسية' },
          { speaker: 'Nader', text: 'Does your mother make your breakfast?', isBlank: false },
          { speaker: 'Tamer', isBlank: true, blankNumber: 2, expectedAnswer: 'Yes, she always prepares healthy breakfast for me.', hintAr: 'أجب بالإيجاب' }
        ]
      },
      readingPassage: {
        title: 'The Railway Children (Edith Nesbit)',
        text: 'Roberta, Peter, and Phyllis lived happily with their parents in London. Suddenly, their father was taken away from their comfortable home. The children and their mother moved to a small, poor house near a railway line. Life was difficult, but the children helped poor people and waved to the trains, making friends with an old gentleman who helped prove their father\'s innocence.',
        translationAr: 'قصة أطفال السكة الحديد وكفاحهم الشجاع في الريف.'
      },
      writingPrompt: {
        title: 'Paragraph: My Daily Routine (روتيني اليومي)',
        prompt: 'Write 80-90 words about your typical daily routine on school days.',
        targetWordsCount: 85,
        rubric: ['Accurate adverbs of frequency', 'Correct present simple', 'Logical sequence of daily events'],
        modelAnswer: 'On school days, my alarm goes off at six o\'clock. I always wash my face and brush my teeth before breakfast. My mother usually prepares warm milk and cheese sandwiches. At half past seven, I walk to school with my classmates. After school, I rest, do my homework, and sometimes text my friends. I never stay up late because sleep keeps me healthy.'
      }
    },
    examSuite: {
      level1_Foundation: [
        {
          id: 'prep2_u1_l1_q1',
          type: 'mcq',
          questionPrompt: 'A comfortable long seat for two or more people in the living room is a ______.',
          options: ['sofa', 'shelf', 'wardrobe', 'fridge'],
          correctAnswer: 'sofa',
          explanationAr: 'الأريكة المريحة في غرفة المعيشة تُسمى sofa.',
          marks: 1,
          subSkill: 'Vocabulary'
        }
      ],
      level2_Contextual: [
        {
          id: 'prep2_u1_l2_q1',
          type: 'fill_in_the_blank',
          questionPrompt: 'They ______ go to school on Fridays because it is a weekend.',
          options: ['never', 'always', 'usually', 'often'],
          correctAnswer: 'never',
          explanationAr: 'يوم الجمعة إجازة رسمية، فالطلاب لا يذهبون أبداً (never).',
          marks: 1,
          subSkill: 'Grammar'
        }
      ],
      level3_AdvancedStructure: [
        {
          id: 'prep2_u1_l3_q1',
          type: 'error_correction',
          questionPrompt: 'Correct: "Hany (listen usually) to the morning news."',
          correctAnswer: 'usually listens',
          explanationAr: 'يأتي ظرف التكرار قبل الفعل الأساسي، ومع المفرد نضيف s: usually listens.',
          marks: 2,
          subSkill: 'Grammar'
        }
      ],
      level4_MoeMockExam: [
        {
          id: 'prep2_u1_l4_q1',
          type: 'mcq',
          questionPrompt: 'Practice MOE Mock: The Railway Children had to leave their big house because their father ______.',
          options: ['was taken away unjustly', 'bought a new car', 'went on a holiday', 'built a factory'],
          correctAnswer: 'was taken away unjustly',
          explanationAr: 'اقتيد والدهم ظلماً بعيداً عن أسرته في القصة المقررة.',
          marks: 2,
          subSkill: 'Reading'
        }
      ],
      level5_HigherThinking: [
        {
          id: 'prep2_u1_l5_q1',
          type: 'guided_writing',
          questionPrompt: 'Explain how having an organized daily routine improves academic achievement:',
          correctAnswer: 'A consistent daily routine enhances discipline and reduces stress. Allocating dedicated study slots ensures tasks are finished on time, fostering academic excellence.',
          explanationAr: 'تحليل أهمية تنظيم الوقت والروتين الإيجابي في التفوق الدراسي.',
          marks: 3,
          subSkill: 'Writing'
        }
      ]
    }
  },

  // =========================================================================
  // PREP 3 (GRADE 9) - UNIT 1: Around Town
  // =========================================================================
  {
    unitId: 'prep3_t1_u1',
    grade: 'prep_3',
    gradeNumber: 9,
    term: 1,
    unitNumber: 1,
    unitTitleEn: 'Around Town',
    unitTitleAr: 'حول المدينة (معالم الإسماعيلية ووسائل النقل)',
    theme: 'Directions, public transport, Lake Timsah, Ismailia monuments, botanical gardens',
    tab1_Vocabulary: {
      words: [
        {
          id: 'p3_u1_w1',
          word: 'Botanical garden',
          phonetics: '/bəˈtæn.ɪ.kəl ˈɡɑː.dən/',
          arabicMeaning: 'حديقة نباتية عامة',
          partOfSpeech: 'noun',
          exampleSentence: 'The Orman Botanical Garden in Giza has rare trees and flowers.',
          visualCue: 'rooftop_garden'
        },
        {
          id: 'p3_u1_w2',
          word: 'Monuments',
          phonetics: '/ˈmɒn.jə.mənts/',
          arabicMeaning: 'آثار تاريخية وصروح تذكارية',
          partOfSpeech: 'noun',
          exampleSentence: 'Luxor contains one third of the world historical monuments.',
          visualCue: 'ancient_pyramids'
        },
        {
          id: 'p3_u1_w3',
          word: 'Aquarium',
          phonetics: '/əˈkweə.ri.əm/',
          arabicMeaning: 'متحف الأحياء المائية / حديقة الأسماك',
          partOfSpeech: 'noun',
          exampleSentence: 'Children love observing colourful marine life at the aquarium.',
          visualCue: 'river_nile'
        },
        {
          id: 'p3_u1_w4',
          word: 'Platform',
          phonetics: '/ˈplæt.fɔːm/',
          arabicMeaning: 'رصيف قطار محدد',
          partOfSpeech: 'noun',
          exampleSentence: 'The express train to Alexandria departs from platform number four.',
          visualCue: 'goodbye_door'
        }
      ],
      collocations: [
        { phrase: 'go straight on', meaningAr: 'سر بشكل مستقيم للأمام', example: 'Go straight on and then turn left at the traffic lights.' },
        { phrase: 'take the first turning', meaningAr: 'ادخل في أول منعطف', example: 'Take the first turning on your right.' }
      ],
      conversationTerms: [
        { en: 'Could you tell me the way to the library, please?', ar: 'هل يمكنك إخباري بالطريق إلى المكتبة من فضلك؟' },
        { en: 'The train to Aswan leaves at eight o’clock tonight.', ar: 'القطار المتجه إلى أسوان يغادر في تمام الثامنة مساءً.' },
        { en: 'Ismailia is peaceful and known for attractive gardens.', ar: 'تتميز الإسماعيلية بالهدوء والحدائق الجذابة.' }
      ]
    },
    tab2_Grammar: {
      rules: [
        {
          title: 'Prepositions of Place & Present Simple for Scheduled Timetables',
          ruleExplanationAr: 'نستخدم المضارع البسيط للتعبير عن المواعيد والجداول الزمنية الرسمية للقطارات والحافلات والافتتاح والختام. ونستخدم حروف جر المكان (next to, opposite, between, on the corner).',
          structureFormula: 'Timetabled Subject (train/plane/library) + Verb (-s/-es) + Scheduled Time',
          examples: [
            { en: 'The train departs at 07:15 AM tomorrow morning.', ar: 'يغادر القطار في تمام الساعة 7:15 صباح الغد.' },
            { en: 'The science museum opens at nine o\'clock.', ar: 'يفتح متحف العلوم في تمام الساعة التاسعة.' }
          ],
          visualPatternBlocks: ['Public Vehicle / Event', 'Present Simple Verb (-s)', 'Fixed Official Time']
        }
      ],
      sentenceBuilderDrills: [
        {
          jumbledParts: ['train', 'leaves', 'The', 'seven', 'at', 'o\'clock'],
          correctOrder: ['The', 'train', 'leaves', 'at', 'seven', 'o\'clock'],
          translationAr: 'القطار يغادر في تمام السابعة'
        }
      ],
      errorCorrectionDrills: [
        {
          sentence: 'The metro train (leave) at 8:30 AM tomorrow.',
          wrongWord: 'leave',
          correctWord: 'leaves',
          explanationAr: 'جداول المواعيد الثابتة للمواصلات العامة تصاغ في المضارع البسيط مع المفرد: leaves.'
        }
      ]
    },
    tab3_Skills: {
      dialogue: {
        title: 'Dialogue: Asking for and giving directions in town',
        context: 'A tourist asks a local Egyptian student for directions to the railway station.',
        turns: [
          { speaker: 'Tourist', text: 'Excuse me, could you direct me to the railway station?', isBlank: false },
          { speaker: 'Student', isBlank: true, blankNumber: 1, expectedAnswer: 'Go straight on and take the second turning on your left.', hintAr: 'أعطِ توجيهاً واضحاً ومحدداً' },
          { speaker: 'Tourist', text: 'How far is it from here?', isBlank: false },
          { speaker: 'Student', isBlank: true, blankNumber: 2, expectedAnswer: 'It is about five minutes on foot.', hintAr: 'حدد المسافة أو المدة الزمنية' }
        ]
      },
      readingPassage: {
        title: 'Ismailia: The Jewel of the Suez Canal',
        text: 'Ismailia is a beautiful, peaceful city situated on Lake Timsah between Port Said and Suez. It has historic French and British architecture, wide streets, and over thirty public parks. It is quiet with very little pollution. Many tourists visit the Natural Science Museum and enjoy swimming in Lake Timsah.',
        translationAr: 'نص القراءة الرسمي عن مدينة الإسماعيلية وتاريخها المتميز.'
      },
      writingPrompt: {
        title: 'A Review of Your City / Town (مقال عن مدينتي)',
        prompt: 'Write an article of about 110 words describing your hometown, its monuments, and transport system.',
        targetWordsCount: 110,
        rubric: ['Accurate prepositions', 'Present simple for attractions', 'Clear structure (intro, body, conclusion)'],
        modelAnswer: 'I live in Ismailia, which is one of the most attractive cities in Egypt. It is located on the Suez Canal. There are many historical monuments and botanical gardens with majestic trees. The public transport system is efficient and punctual; trains and buses connect the city smoothly with Cairo and Port Said. I am proud to live in such a peaceful place.'
      }
    },
    examSuite: {
      level1_Foundation: [
        {
          id: 'prep3_u1_l1_q1',
          type: 'mcq',
          questionPrompt: 'A place where you can see live fish and marine creatures is an ______.',
          options: ['aquarium', 'library', 'bank', 'stadium'],
          correctAnswer: 'aquarium',
          explanationAr: 'متحف الأحياء المائية هو aquarium.',
          marks: 1,
          subSkill: 'Vocabulary'
        }
      ],
      level2_Contextual: [
        {
          id: 'prep3_u1_l2_q1',
          type: 'fill_in_the_blank',
          questionPrompt: 'The express train to Alexandria ______ at platform six in ten minutes.',
          options: ['arrives', 'arrived', 'is arriving', 'arrive'],
          correctAnswer: 'arrives',
          explanationAr: 'مواعيد وسائل النقل العامة المجدولة نستخدم فيها المضارع البسيط: arrives.',
          marks: 1,
          subSkill: 'Grammar'
        }
      ],
      level3_AdvancedStructure: [
        {
          id: 'prep3_u1_l3_q1',
          type: 'error_correction',
          questionPrompt: 'Correct: "The exhibition (finish) at 4:00 PM this afternoon."',
          correctAnswer: 'finishes',
          explanationAr: 'مواعيد إغلاق المعارض والفعاليات الثابتة تصاغ في المضارع البسيط: finishes.',
          marks: 2,
          subSkill: 'Grammar'
        }
      ],
      level4_MoeMockExam: [
        {
          id: 'prep3_u1_l4_q1',
          type: 'mcq',
          questionPrompt: 'Practice MOE Mock: Lake Timsah is a famous natural landmark located in the city of ______.',
          options: ['Ismailia', 'Aswan', 'Matrouh', 'Tanta'],
          correctAnswer: 'Ismailia',
          explanationAr: 'بحيرة التمساح تقع في مدينة الإسماعيلية كما ورد في منهج New Hello.',
          marks: 2,
          subSkill: 'Reading'
        }
      ],
      level5_HigherThinking: [
        {
          id: 'prep3_u1_l5_q1',
          type: 'guided_writing',
          questionPrompt: 'Evaluate why electric public transport (monorail & electric trains) is essential for Egypt\'s modern green cities:',
          correctAnswer: 'Electric transport reduces carbon emissions and eases traffic congestion in metropolitan centers. It supports sustainable urban growth by offering punctual and eco-friendly mobility.',
          explanationAr: 'تقييم بيئي وتنموي لأهمية وسائل النقل الكهربائي الحديثة في مصر.',
          marks: 3,
          subSkill: 'Writing'
        }
      ]
    }
  },

  // =========================================================================
  // PREP 1 (GRADE 7) - UNIT 2: It's My Favourite Subject
  // =========================================================================
  {
    unitId: 'prep1_t1_u2',
    grade: 'prep_1',
    gradeNumber: 7,
    term: 1,
    unitNumber: 2,
    unitTitleEn: "It's My Favourite Subject",
    unitTitleAr: 'إنها مادتي المفضلة (المواد الدراسية والجدول المدرسي)',
    theme: 'School subjects, timetable, school bell, library, telling the time, typical school day in different countries',
    tab1_Vocabulary: {
      words: [
        {
          id: 'p1_u2_w1',
          word: 'Timetable',
          phonetics: '/ˈtaɪmˌteɪ.bəl/',
          arabicMeaning: 'جدول المواعيد / جدول الحصص',
          partOfSpeech: 'noun',
          exampleSentence: 'Look at the school timetable to see which subject we have next.',
          visualCue: 'open_book'
        },
        {
          id: 'p1_u2_w2',
          word: 'Bell',
          phonetics: '/bel/',
          arabicMeaning: 'جرس المدرسة',
          partOfSpeech: 'noun',
          exampleSentence: 'When the bell rings, the break time begins.',
          visualCue: 'clock_alarm'
        },
        {
          id: 'p1_u2_w3',
          word: 'Drama',
          phonetics: '/ˈdrɑː.mə/',
          arabicMeaning: 'مادة التمثيل المسرحي والدراما',
          partOfSpeech: 'noun',
          exampleSentence: 'In drama lessons, we learn how to act and speak confidently on stage.',
          visualCue: 'trophy_cup'
        },
        {
          id: 'p1_u2_w4',
          word: 'Typical',
          phonetics: '/ˈtɪp.ɪ.kəl/',
          arabicMeaning: 'نموذجي / معتاد',
          partOfSpeech: 'adjective',
          exampleSentence: 'On a typical school day, we have seven lessons.',
          visualCue: 'star_badge'
        }
      ],
      collocations: [
        { phrase: 'have a lesson', meaningAr: 'يأخذ حصة دراسية', example: 'We have English lessons four times a week.' },
        { phrase: 'ring the bell', meaningAr: 'يرن الجرس', example: 'The teacher rings the bell at break.' }
      ],
      conversationTerms: [
        { en: 'What is your favourite subject?', ar: 'ما هي مادتك المفضلة؟' },
        { en: 'What time does the science lesson start?', ar: 'في أي وقت تبدأ حصة العلوم؟' },
        { en: 'We have computer studies in the multimedia lab.', ar: 'لدينا حاسب آلي في معمل التطوير.' }
      ]
    },
    tab2_Grammar: {
      rules: [
        {
          title: "Apostrophe of Possession ('s / s')",
          ruleExplanationAr: "نضع 's للمفرد والجموع الشاذة (boy's book / children's games)، ونضع الفاصلة فقط ' بعد الأسماء والجموع المنتهية بحرف s مثل (the girls' school / boys' bags).",
          structureFormula: "Singular Noun + 's | Regular Plural (-s) + ' | Irregular Plural + 's",
          examples: [
            { en: "This is Ali's notebook.", ar: "هذا دفتر علي." },
            { en: "The teachers' room is on the first floor.", ar: "غرفة المعلمين في الطابق الأول." }
          ],
          visualPatternBlocks: ["Ali + 's = Ali's (Singular)", "Teachers + ' = Teachers' (Plural with -s)"]
        }
      ],
      sentenceBuilderDrills: [
        {
          jumbledParts: ["teachers'", "room", "The", "is", "upstairs"],
          correctOrder: ["The", "teachers'", "room", "is", "upstairs"],
          translationAr: "غرفة المعلمين تقع في الطابق العلوي"
        }
      ],
      errorCorrectionDrills: [
        {
          sentence: "This is my (brother) car. It is brand new.",
          wrongWord: "brother",
          correctWord: "brother's",
          explanationAr: "لإثبات الملكية لمفرد نستخدم فاصلة عليا وحرف s: brother's."
        }
      ]
    },
    tab3_Skills: {
      dialogue: {
        title: "Dialogue: Asking about school subjects and timetable",
        context: "Lina and Sarah are talking after the first period.",
        turns: [
          { speaker: "Lina", text: "Hi Sarah! What is your favourite subject today?", isBlank: false },
          { speaker: "Sarah", isBlank: true, blankNumber: 1, expectedAnswer: "My favourite subject is English because it is interesting.", hintAr: "أخبريها بمادتك المفضلة (اللغة الإنجليزية)" },
          { speaker: "Lina", text: "When do we have maths?", isBlank: false },
          { speaker: "Sarah", isBlank: true, blankNumber: 2, expectedAnswer: "We have maths after the break.", hintAr: "حددي الموعد (بعد الفسحة)" }
        ]
      },
      readingPassage: {
        title: "A Typical School Day in Nairobi, Kenya",
        text: "In Nairobi, students wake up early. Many children walk for an hour to get to school. Lessons start at eight o'clock and finish at four in the afternoon. Students study English, Kiswahili, maths, and science. During break, they play football in the yard. They love learning because education opens doors to great careers.",
        translationAr: "يوم دراسي نموذجي في نيروبي، كينيا وحرص الطلاب على التعليم."
      },
      writingPrompt: {
        title: "Paragraph: My Favourite School Day (يومي الدراسي المفضل)",
        prompt: "Write 80 words about your favourite day at school, mentioning your subjects and activities.",
        targetWordsCount: 80,
        rubric: ["Correct use of possessive apostrophe", "Accurate subject names", "Logical flow of timetable"],
        modelAnswer: "Thursday is my favourite day of the week. We have our English lesson in the morning, followed by science and computer studies. I enjoy English because our teacher, Mr. Mohammad, explains grammar clearly. At break time, I chat with my friends in the playground and eat healthy snacks. In the afternoon, we have physical education and play volleyball. I return home feeling energetic and satisfied."
      }
    },
    examSuite: {
      level1_Foundation: [
        {
          id: 'prep1_u2_l1_q1',
          type: 'mcq',
          questionPrompt: 'In a ______ lesson, students learn how to act in plays and perform on stage.',
          options: ['drama', 'science', 'geography', 'maths'],
          correctAnswer: 'drama',
          explanationAr: 'في حصة الدراما (drama) يتعلم الطلاب التمثيل المسرحي.',
          marks: 1,
          subSkill: 'Vocabulary'
        }
      ],
      level2_Contextual: [
        {
          id: 'prep1_u2_l2_q1',
          type: 'fill_in_the_blank',
          questionPrompt: 'These are the ______ bags; they left them in the girls\' changing room.',
          options: ["girls'", "girl's", "girls", "girles"],
          correctAnswer: "girls'",
          explanationAr: "جمع البنات ينتهي بحرف s، فنضيف الفاصلة العليا فقط بعد s: girls'.",
          marks: 1,
          subSkill: 'Grammar'
        }
      ],
      level3_AdvancedStructure: [
        {
          id: 'prep1_u2_l3_q1',
          type: 'error_correction',
          questionPrompt: 'Correct the word between brackets: "That is the (childrens) playground."',
          correctAnswer: "children's",
          explanationAr: "كلمة children جمع غير منتظم (شاذ)، فنضع لها 's لإثبات الملكية: children's.",
          marks: 2,
          subSkill: 'Grammar'
        }
      ],
      level4_MoeMockExam: [
        {
          id: 'prep1_u2_l4_q1',
          type: 'mcq',
          questionPrompt: 'Practice MOE Mock: We know the lesson has finished when the school ______ rings loudly.',
          options: ['bell', 'ball', 'bull', 'bill'],
          correctAnswer: 'bell',
          explanationAr: 'جرس المدرسة يُدعى bell.',
          marks: 2,
          subSkill: 'Vocabulary'
        }
      ],
      level5_HigherThinking: [
        {
          id: 'prep1_u2_l5_q1',
          type: 'guided_writing',
          questionPrompt: 'Why is having a structured timetable vital for student academic achievement?',
          correctAnswer: 'A structured timetable instills punctuality, balanced subject allocation, and cognitive focus. It prevents burnout by pacing academic demands and physical recreation evenly.',
          explanationAr: 'أهمية الجدول الدراسي المنظم في تعزيز التحصيل الأكاديمي وتنظيم الوقت.',
          marks: 3,
          subSkill: 'Writing'
        }
      ]
    }
  },

  // =========================================================================
  // PREP 2 (GRADE 8) - UNIT 2: How Are You Feeling?
  // =========================================================================
  {
    unitId: 'prep2_t1_u2',
    grade: 'prep_2',
    gradeNumber: 8,
    term: 1,
    unitNumber: 2,
    unitTitleEn: 'How Are You Feeling?',
    unitTitleAr: 'كيف تشعر؟ (المشاعر والوظائف الخدمية ومساعدة الآخرين)',
    theme: 'Feelings, street-food stalls, sign language, hospitals, call-centre workers, empathy',
    tab1_Vocabulary: {
      words: [
        {
          id: 'p2_u2_w1',
          word: 'Street-food stall',
          phonetics: '/striːt fuːd stɔːl/',
          arabicMeaning: 'كشك بيع طعام الشارع',
          partOfSpeech: 'noun',
          exampleSentence: 'The chef prepares delicious falafel at his street-food stall every morning.',
          visualCue: 'food_lunch'
        },
        {
          id: 'p2_u2_w2',
          word: 'Sign language',
          phonetics: '/saɪn ˈlæŋ.ɡwɪdʒ/',
          arabicMeaning: 'لغة الإشارة للصم والبكم',
          partOfSpeech: 'noun',
          exampleSentence: 'My aunt teaches sign language to help deaf people communicate easily.',
          visualCue: 'hand_wave'
        },
        {
          id: 'p2_u2_w3',
          word: 'Grateful',
          phonetics: '/ˈɡreɪt.fəl/',
          arabicMeaning: 'ممتن / شاكر للجميل',
          partOfSpeech: 'adjective',
          exampleSentence: 'I am always grateful to my parents for their unconditional care.',
          visualCue: 'happy_face'
        },
        {
          id: 'p2_u2_w4',
          word: 'Call-centre worker',
          phonetics: '/kɔːl ˈsen.tər ˈwɜː.kər/',
          arabicMeaning: 'موظف خدمة عملاء بالهاتف',
          partOfSpeech: 'noun',
          exampleSentence: 'The call-centre worker answers customers\' questions politely.',
          visualCue: 'phone_call'
        }
      ],
      collocations: [
        { phrase: 'park a food stall', meaningAr: 'يوقف كشك الطعام في مكان مخصص', example: 'Street vendors park their stalls along the promenade.' },
        { phrase: 'communicate in sign language', meaningAr: 'يتواصل بلغة الإشارة', example: 'Deaf students communicate in sign language fluently.' }
      ],
      conversationTerms: [
        { en: 'How are you feeling today?', ar: 'كيف تشعر اليوم؟' },
        { en: 'I am feeling proud and grateful.', ar: 'أشعر بالفخر والامتنان.' },
        { en: 'She is looking after sick patients with tenderness.', ar: 'إنها ترعى المرضى بحنان وعناية.' }
      ]
    },
    tab2_Grammar: {
      rules: [
        {
          title: 'Present Continuous vs. Present Simple & Adverbs of Manner',
          ruleExplanationAr: 'المضارع البسيط يعبر عن الحقائق والعادات، بينما المضارع المستمر (am/is/are + v-ing) يعبر عن أحداث تقع الآن أو مؤقتة. كما نضيف ly للصفة لتكوين الظرف الدال على الكيفية (slow -> slowly, careful -> carefully).',
          structureFormula: 'Present Simple: S + V(s) | Present Continuous: S + am/is/are + V-ing | Adverb: Adj + ly',
          examples: [
            { en: 'He usually walks to work, but today he is taking a taxi.', ar: 'هو يمشي عادةً للعمل، ولكنه اليوم يستقل تاكسي.' },
            { en: 'She speaks English fluently and drives carefully.', ar: 'تتحدث الإنجليزية بطلاقة وتقود بحذر.' }
          ],
          visualPatternBlocks: ['Fact/Habit -> Present Simple', 'Action Right Now -> am/is/are + V-ing', 'Manner -> Verb + Adverb (-ly)']
        }
      ],
      sentenceBuilderDrills: [
        {
          jumbledParts: ['speaking', 'is', 'He', 'politely', 'to', 'customers'],
          correctOrder: ['He', 'is', 'speaking', 'politely', 'to', 'customers'],
          translationAr: 'هو يتحدث بأدب مع الزبائن'
        }
      ],
      errorCorrectionDrills: [
        {
          sentence: 'She sings (beautiful) in the school concert.',
          wrongWord: 'beautiful',
          correctWord: 'beautifully',
          explanationAr: 'نصف الفعل بالظرف المنتهي بـ ly: beautifully.'
        }
      ]
    },
    tab3_Skills: {
      dialogue: {
        title: 'Dialogue: Checking in on a friend who is working at a charity',
        context: 'Maged meets Tarek near a medical center.',
        turns: [
          { speaker: 'Maged', text: 'Hi Tarek, why are you wearing a uniform today?', isBlank: false },
          { speaker: 'Tarek', isBlank: true, blankNumber: 1, expectedAnswer: 'Because I am volunteering at the children hospital ward.', hintAr: 'أخبره بأنك تتطوع في عنبر الأطفال' },
          { speaker: 'Maged', text: 'How do you communicate with hearing-impaired kids?', isBlank: false },
          { speaker: 'Tarek', isBlank: true, blankNumber: 2, expectedAnswer: 'I use sign language to talk with them.', hintAr: 'أخبره باستخدام لغة الإشارة' }
        ]
      },
      readingPassage: {
        title: 'Street Food in Cairo and Modern Urban Life',
        text: 'Early in the morning, street vendors park their food stalls in busy areas of Cairo. They prepare delicious foul and tameya sandwiches for workers and commuters. These workers wake up before dawn to ensure the food is fresh and hygienic. Customers smile and thank them for their continuous hard work.',
        translationAr: 'طعام الشارع في القاهرة وكفاح البائعين في الصباح الباكر.'
      },
      writingPrompt: {
        title: 'Paragraph: A Job That Helps Our Community (وظيفة تخدم المجتمع)',
        prompt: 'Write 80-90 words about the role of nurses and healthcare workers in hospitals.',
        targetWordsCount: 85,
        rubric: ['Accurate adverbs of manner', 'Contrast between habits and temporary actions', 'Rich emotional vocabulary'],
        modelAnswer: 'Nurses are true heroes in our healthcare system. They look after sick patients day and night with immense patience. Even during difficult emergencies, they speak softly and act calmly to soothe worried families. Today, many nurses are working extra shifts to keep hospital wards sterile and safe. We should always treat them respectfully and feel grateful for their noble contributions.'
      }
    },
    examSuite: {
      level1_Foundation: [
        {
          id: 'prep2_u2_l1_q1',
          type: 'mcq',
          questionPrompt: 'People who cannot hear or speak communicate with each other using ______ language.',
          options: ['sign', 'secret', 'foreign', 'loud'],
          correctAnswer: 'sign',
          explanationAr: 'لغة الإشارة للصم والبكم هي sign language.',
          marks: 1,
          subSkill: 'Vocabulary'
        }
      ],
      level2_Contextual: [
        {
          id: 'prep2_u2_l2_q1',
          type: 'fill_in_the_blank',
          questionPrompt: 'Look! The street vendor ______ hot sandwiches for hungry workers right now.',
          options: ['is preparing', 'prepares', 'prepared', 'was prepared'],
          correctAnswer: 'is preparing',
          explanationAr: 'كلمة Look! تدل على المضارع المستمر: is preparing.',
          marks: 1,
          subSkill: 'Grammar'
        }
      ],
      level3_AdvancedStructure: [
        {
          id: 'prep2_u2_l3_q1',
          type: 'error_correction',
          questionPrompt: 'Correct the word between brackets: "Ahmed did his homework very (careful) yesterday."',
          correctAnswer: 'carefully',
          explanationAr: 'لوصف طريقة أداء الفعل نستخدم ظرف الكيفية المنتهي بـ ly: carefully.',
          marks: 2,
          subSkill: 'Grammar'
        }
      ],
      level4_MoeMockExam: [
        {
          id: 'prep2_u2_l4_q1',
          type: 'mcq',
          questionPrompt: 'Practice MOE Mock: When someone does you a favour, you should feel ______ and thank them.',
          options: ['grateful', 'greedy', 'careless', 'jealous'],
          correctAnswer: 'grateful',
          explanationAr: 'عندما يسدي لك أحد معروفاً يجب أن تكون ممتناً وشاكراً (grateful).',
          marks: 2,
          subSkill: 'Vocabulary'
        }
      ],
      level5_HigherThinking: [
        {
          id: 'prep2_u2_l5_q1',
          type: 'guided_writing',
          questionPrompt: 'Analyze how learning sign language in schools fosters social inclusion for disabled citizens:',
          correctAnswer: 'Teaching sign language breaks communicative barriers, dismantles prejudice, and guarantees equal social participation for the deaf community. It nurtures an empathetic societal fabric rooted in mutual respect.',
          explanationAr: 'تحليل أثر تعلم لغة الإشارة في دمج الصم في المجتمع وتعزيز التكافل الاجتماعي.',
          marks: 3,
          subSkill: 'Writing'
        }
      ]
    }
  },

  // =========================================================================
  // PREP 3 (GRADE 9) - UNIT 2: Let's Go Shopping
  // =========================================================================
  {
    unitId: 'prep3_t1_u2',
    grade: 'prep_3',
    gradeNumber: 9,
    term: 1,
    unitNumber: 2,
    unitTitleEn: "Let's Go Shopping",
    unitTitleAr: 'هيا نتسوق (الأجهزة المنزلية والتسوق الإلكتروني والعروض)',
    theme: 'Consumer technology, smart home devices, online shopping, customer reviews, complaints, delivery',
    tab1_Vocabulary: {
      words: [
        {
          id: 'p3_u2_w1',
          word: 'Microwave',
          phonetics: '/ˈmaɪ.krə.weɪv/',
          arabicMeaning: 'فرن الميكروويف (لتسخين الطعام بسرعة)',
          partOfSpeech: 'noun',
          exampleSentence: 'Use the microwave to warm the soup in two minutes.',
          visualCue: 'trophy_cup'
        },
        {
          id: 'p3_u2_w2',
          word: 'Kettle',
          phonetics: '/ˈket.əl/',
          arabicMeaning: 'غلاية مياه كهربائية',
          partOfSpeech: 'noun',
          exampleSentence: 'He boiled water in the electric kettle to make hot mint tea.',
          visualCue: 'clock_alarm'
        },
        {
          id: 'p3_u2_w3',
          word: 'Special offer',
          phonetics: '/ˈspeʃ.əl ˈɒf.ər/',
          arabicMeaning: 'عرض خاص / تخفيض ترويجي',
          partOfSpeech: 'phrase',
          exampleSentence: 'The electronics store has a special offer: buy one speaker, get one free.',
          visualCue: 'star_badge'
        },
        {
          id: 'p3_u2_w4',
          word: 'Complaint',
          phonetics: '/kəmˈpleɪnt/',
          arabicMeaning: 'شكوى رسمية من خدمة أو منتج',
          partOfSpeech: 'noun',
          exampleSentence: 'She made a polite complaint to the customer service department about the late delivery.',
          visualCue: 'phone_call'
        }
      ],
      collocations: [
        { phrase: 'make a complaint', meaningAr: 'يقدم شكوى رسمية', example: 'Customers can make a complaint via email or phone.' },
        { phrase: 'on special offer', meaningAr: 'في عرض خاص أو تخفيض', example: 'These smart televisions are currently on special offer.' }
      ],
      conversationTerms: [
        { en: 'Could I speak to the manager, please?', ar: 'هل يمكنني التحدث إلى المدير من فضلك؟' },
        { en: 'The item arrived damaged in the package.', ar: 'وصلت السلعة تالفة داخل الطرد.' },
        { en: 'We apologize and will deliver a replacement immediately.', ar: 'نعتذر وسنرسل بديلاً فوراً.' }
      ]
    },
    tab2_Grammar: {
      rules: [
        {
          title: 'Comparative / Superlative & (Both...and / Either...or / Neither...nor / None of)',
          ruleExplanationAr: 'للمقارنة بين شيئين: (Adj-er than / more + adj + than). وللتفضيل: (the Adj-est / the most + adj). وتراكيب الربط: both...and (فعل جمع دائماً)، either...or (إما...أو)، neither...nor (لا هذا ولا ذاك والفعل يتبع الفاعل الثاني)، none of (لا أحد من أكثر من اثنين).',
          structureFormula: 'Both X and Y + Plural Verb | Neither X nor Y + Verb matches Y | Either X or Y',
          examples: [
            { en: 'Both the kettle and the microwave are on sale.', ar: 'كلا الغلاية والميكروويف معروضان في التخفيضات.' },
            { en: 'Neither the toaster nor the speakers were working.', ar: 'لا المحمصة ولا مكبرات الصوت كانت تعمل.' }
          ],
          visualPatternBlocks: ['Both + A + and + B + Plural Verb', 'Neither + A + nor + B + Verb agrees with B']
        }
      ],
      sentenceBuilderDrills: [
        {
          jumbledParts: ['Both', 'laptops', 'on', 'sale', 'are', 'today'],
          correctOrder: ['Both', 'laptops', 'are', 'on', 'sale', 'today'],
          translationAr: 'كلا الجهازين المحمولين معروضان في التخفيضات اليوم'
        }
      ],
      errorCorrectionDrills: [
        {
          sentence: 'Both Mona and her sister (is) clever at English.',
          wrongWord: 'is',
          correctWord: 'are',
          explanationAr: 'التركيب both...and يأخذ دائماً فعلاً في صيغة الجمع: are.'
        }
      ]
    },
    tab3_Skills: {
      dialogue: {
        title: 'Dialogue: Filing a polite complaint about an online purchase',
        context: 'Heba is phoning customer service regarding a faulty kettle.',
        turns: [
          { speaker: 'Agent', text: 'Hello, Modern Appliances customer care. How can I help you?', isBlank: false },
          { speaker: 'Heba', isBlank: true, blankNumber: 1, expectedAnswer: 'I would like to make a complaint about an electric kettle I ordered.', hintAr: 'أخبره برغبتك في تقديم شكوى بشأن غلاية مياه' },
          { speaker: 'Agent', text: 'What exactly is the problem with it?', isBlank: false },
          { speaker: 'Heba', isBlank: true, blankNumber: 2, expectedAnswer: 'It does not heat water and the power cord is broken.', hintAr: 'صفي العطل (لا تسخن الماء وسلك الكهرباء تالف)' }
        ]
      },
      readingPassage: {
        title: 'Smart Consumer Choices: Online Shopping vs. In-Store Buying',
        text: 'Online shopping has transformed commerce in Egypt. Customers can compare prices across dozens of websites in seconds, read verified user reviews, and take advantage of seasonal discounts like White Friday. However, online shoppers must verify website authenticity to avoid counterfeit merchandise and delayed courier deliveries.',
        translationAr: 'التسوق عبر الإنترنت وتأثيره على المستهلك المصري.'
      },
      writingPrompt: {
        title: 'Review: An Online Purchase You Made (مراجعة تجربة شراء إلكترونية)',
        prompt: 'Write a review of 100-110 words about an electronic device you bought online, evaluating its performance.',
        targetWordsCount: 105,
        rubric: ['Accurate comparative and correlative conjunctions', 'Balanced evaluation of pros and cons', 'Clear purchasing recommendation'],
        modelAnswer: 'Last month, I ordered a smart microwave from a certified online retailer during their White Friday sale. The package arrived within forty-eight hours, which was commendable. The microwave heats food evenly and features multiple intuitive digital presets. Both the build quality and the energy-saving mode exceeded my expectations. The only minor drawback was the short power cable, which required an extension. Overall, it is one of the most reliable kitchen appliances I have ever purchased, and I strongly recommend it to busy households seeking rapid, hygienic cooking.'
      }
    },
    examSuite: {
      level1_Foundation: [
        {
          id: 'prep3_u2_l1_q1',
          type: 'mcq',
          questionPrompt: 'An electrical kitchen appliance used specifically to heat food rapidly using electromagnetic waves is a ______.',
          options: ['microwave', 'toaster', 'washing machine', 'iron'],
          correctAnswer: 'microwave',
          explanationAr: 'جهاز تسخين الطعام السريع بالموجات الكهرومغناطيسية هو الميكروويف (microwave).',
          marks: 1,
          subSkill: 'Vocabulary'
        }
      ],
      level2_Contextual: [
        {
          id: 'prep3_u2_l2_q1',
          type: 'fill_in_the_blank',
          questionPrompt: 'Neither the seller ______ the delivery courier answered my urgent messages.',
          options: ['nor', 'or', 'and', 'with'],
          correctAnswer: 'nor',
          explanationAr: 'تأتي nor مكملة لـ Neither في صيغة النفي المزدوج: Neither...nor.',
          marks: 1,
          subSkill: 'Grammar'
        }
      ],
      level3_AdvancedStructure: [
        {
          id: 'prep3_u2_l3_q1',
          type: 'error_correction',
          questionPrompt: 'Correct the word between brackets: "Both the red toaster and the blender (is) discounted by 30%."',
          correctAnswer: 'are',
          explanationAr: 'الرابط both...and يتبعه دائماً فعل جمع: are.',
          marks: 2,
          subSkill: 'Grammar'
        }
      ],
      level4_MoeMockExam: [
        {
          id: 'prep3_u2_l4_q1',
          type: 'mcq',
          questionPrompt: 'Practice MOE Mock: When a customer is dissatisfied with defective goods, they have the legal right to submit a ______.',
          options: ['complaint', 'reward', 'donation', 'medal'],
          correctAnswer: 'complaint',
          explanationAr: 'الشكوى الرسمية عند وجود عيب في السلعة تسمى complaint.',
          marks: 2,
          subSkill: 'Vocabulary'
        }
      ],
      level5_HigherThinking: [
        {
          id: 'prep3_u2_l5_q1',
          type: 'guided_writing',
          questionPrompt: 'Critique how digital payment security and transparent return policies empower electronic commerce in developing economies:',
          correctAnswer: 'Robust cybersecurity encryption and friction-free return guarantees establish consumer trust, encouraging reluctant traditional buyers to embrace e-commerce. This drives micro-business revenues and integrates unbanked segments into the digital economy.',
          explanationAr: 'تحليل دور أمان الدفع الإلكتروني وسياسات الإرجاع في دعم التجارة الرقمية.',
          marks: 3,
          subSkill: 'Writing'
        }
      ]
    }
  },

  // =========================================================================
  // PREP 3 (GRADE 9) - UNIT 3: My Community
  // =========================================================================
  {
    unitId: 'prep3_t1_u3',
    grade: 'prep_3',
    gradeNumber: 9,
    term: 1,
    unitNumber: 3,
    unitTitleEn: 'My Community',
    unitTitleAr: 'مجتمعي (مبادرة حياة كريمة ومرافق الأحياء والتطوع)',
    theme: 'Decent Life initiative (حياة كريمة), public facilities, neighborhood improvements, social networking, elderly care',
    tab1_Vocabulary: {
      words: [
        {
          id: 'p3_u3_w1',
          word: 'Decent Life initiative',
          phonetics: '/ˈdiː.sənt laɪf ɪˈnɪʃ.ə.tɪv/',
          arabicMeaning: 'مبادرة حياة كريمة الرئاسية لتطوير الريف',
          partOfSpeech: 'phrase',
          exampleSentence: 'The Decent Life initiative builds schools and hospitals in rural villages across Egypt.',
          visualCue: 'trophy_cup'
        },
        {
          id: 'p3_u3_w2',
          word: 'Facilities',
          phonetics: '/fəˈsɪl.ə.tiz/',
          arabicMeaning: 'مرافق وخدمات عامة (مستشفيات، نوادٍ، حدائق)',
          partOfSpeech: 'noun',
          exampleSentence: 'Our town boasts modern sports facilities and accessible libraries.',
          visualCue: 'star_badge'
        },
        {
          id: 'p3_u3_w3',
          word: 'Pavement',
          phonetics: '/ˈpeɪv.mənt/',
          arabicMeaning: 'رصيف المشاة',
          partOfSpeech: 'noun',
          exampleSentence: 'Pedestrians should safely walk on the wide pavement rather than the highway.',
          visualCue: 'desert_safari'
        },
        {
          id: 'p3_u3_w4',
          word: 'Social networking service',
          phonetics: '/ˌsəʊ.ʃəl ˈnet.wɜː.kɪŋ ˈsɜː.vɪs/',
          arabicMeaning: 'موقع أو خدمة التواصل الاجتماعي',
          partOfSpeech: 'phrase',
          exampleSentence: 'Neighbors created a social networking service group to coordinate street cleaning.',
          visualCue: 'phone_call'
        }
      ],
      collocations: [
        { phrase: 'deliver public services', meaningAr: 'يقدم خدمات عامة للمواطنين', example: 'The local council delivers clean water and electricity to every hamlet.' },
        { phrase: 'have equal opportunities', meaningAr: 'يمتلك فرصاً متكافئة', example: 'All rural youth must have equal educational opportunities.' }
      ],
      conversationTerms: [
        { en: 'What facilities does your neighborhood need most?', ar: 'ما أكثر المرافق التي يحتاجها حيك السكني؟' },
        { en: 'We are repainting the walls to brighten our street.', ar: 'نحن نعيد طلاء الجدران لتجميل شارعنا.' },
        { en: 'Community cooperation creates lasting change.', ar: 'التعاون المجتمعي يصنع تغييراً دائماً.' }
      ]
    },
    tab2_Grammar: {
      rules: [
        {
          title: 'Adjectives ending in -ed vs. -ing & Present Continuous for Future Arrangements',
          ruleExplanationAr: 'الصفات المنتهية بـ -ed تعبر عن الشعور (I am excited = أشعر بالحماس)، بينما المنتهية بـ -ing تعبر عن المسبب أو الشيء المؤثر (The match is exciting = المباراة ممتعة ومحمسة). والمضارع المستمر (am/is/are + v-ing) يعبر عن ترتيبات مستقبلية تم حجزها وتجهيزها.',
          structureFormula: 'Feelings: S + feel/be + Adj-ed | Cause: S + be + Adj-ing | Future: S + am/is/are + V-ing + time',
          examples: [
            { en: 'The villagers were amazed by the speed of the renovations.', ar: 'شعر القرويون بالدهشة لسرعة أعمال التطوير.' },
            { en: 'We are holding a community meeting next Monday at six.', ar: 'نحن نقيم اجتماعاً مجتمعياً الاثنين القادم في السادسة.' }
          ],
          visualPatternBlocks: ['Person feels -> -ed (surprised, bored, interested)', 'Thing causes -> -ing (surprising, boring, interesting)', 'Arrangement -> am/is/are + V-ing']
        }
      ],
      sentenceBuilderDrills: [
        {
          jumbledParts: ['meeting', 'are', 'We', 'the', 'mayor', 'tomorrow'],
          correctOrder: ['We', 'are', 'meeting', 'the', 'mayor', 'tomorrow'],
          translationAr: 'نحن سنقابل رئيس المدينة غداً'
        }
      ],
      errorCorrectionDrills: [
        {
          sentence: 'The historical documentary about Egyptian villages was very (interested).',
          wrongWord: 'interested',
          correctWord: 'interesting',
          explanationAr: 'الفيلم الوثائقي هو مسبب الاهتمام، فنستخدم الصفة المنتهية بـ ing: interesting.'
        }
      ]
    },
    tab3_Skills: {
      dialogue: {
        title: 'Dialogue: Discussing rural development and Hayah Kareema',
        context: 'Karim and Sherif are discussing their grandfather\'s village in Upper Egypt.',
        turns: [
          { speaker: 'Karim', text: 'Hi Sherif! Have you visited your grandfather\'s village recently?', isBlank: false },
          { speaker: 'Sherif', isBlank: true, blankNumber: 1, expectedAnswer: 'Yes, the village has changed completely thanks to the Decent Life initiative.', hintAr: 'أخبره بالتغيير الكبير بفضل حياة كريمة' },
          { speaker: 'Karim', text: 'What new facilities have they established there?', isBlank: false },
          { speaker: 'Sherif', isBlank: true, blankNumber: 2, expectedAnswer: 'They paved new roads and built a primary healthcare centre.', hintAr: 'اذكر رصف الطرق وبناء وحدة رعاية صحية' }
        ]
      },
      readingPassage: {
        title: 'Hayah Kareema (The Decent Life Initiative)',
        text: 'The Decent Life initiative is one of the most ambitious social welfare projects in modern Egyptian history. Launched by the government, it targets thousands of underserved villages across Egypt to eliminate rural poverty. Engineers, healthcare workers, and voluntary youths coordinate to renovate houses, pave roads, deliver potable drinking water, and install broadband fiber cables.',
        translationAr: 'مبادرة حياة كريمة التاريخية لتطوير القرى المصرية.'
      },
      writingPrompt: {
        title: 'Paragraph: Improving Facilities in My Neighborhood (تطوير مرافق الحي)',
        prompt: 'Write 100-110 words describing practical initiatives teenagers can undertake to improve their local community.',
        targetWordsCount: 105,
        rubric: ['Accurate use of -ed / -ing adjectives', 'Future arrangements with present continuous', 'Cohesive community theme'],
        modelAnswer: 'Every citizen has a civic duty to elevate their local community. In our neighborhood, teenagers have launched an inspiring greening initiative. Next Saturday, we are planting thirty evergreen trees along the main pavement to provide shade and reduce air pollutants. We are also collaborating with the municipal council to renovate the dilapidated public playground so younger children have safe recreational space. Older residents were genuinely touched and offered us refreshing drinks. When community members unite with clear objectives, they foster solidarity, safeguard public property, and create cleaner surroundings for future generations.'
      }
    },
    examSuite: {
      level1_Foundation: [
        {
          id: 'prep3_u3_l1_q1',
          type: 'mcq',
          questionPrompt: 'Public buildings, equipment, and medical services provided for public use are called ______.',
          options: ['facilities', 'factories', 'accidents', 'arguments'],
          correctAnswer: 'facilities',
          explanationAr: 'المرافق والخدمات العامة تُسمى facilities.',
          marks: 1,
          subSkill: 'Vocabulary'
        }
      ],
      level2_Contextual: [
        {
          id: 'prep3_u3_l2_q1',
          type: 'fill_in_the_blank',
          questionPrompt: 'The students were so ______ when they heard that the new community library opened.',
          options: ['excited', 'exciting', 'excite', 'excitement'],
          correctAnswer: 'excited',
          explanationAr: 'لوصف مشاعر الطلاب نستخدم الصفة المنتهية بـ ed: excited.',
          marks: 1,
          subSkill: 'Grammar'
        }
      ],
      level3_AdvancedStructure: [
        {
          id: 'prep3_u3_l3_q1',
          type: 'error_correction',
          questionPrompt: 'Correct the word between brackets: "We (travel) to Luxor next Tuesday; all tickets are booked."',
          correctAnswer: 'are travelling',
          explanationAr: 'للترتيبات المستقبلية المؤكدة (التذاكر محجوزة) نستخدم المضارع المستمر: are travelling.',
          marks: 2,
          subSkill: 'Grammar'
        }
      ],
      level4_MoeMockExam: [
        {
          id: 'prep3_u3_l4_q1',
          type: 'mcq',
          questionPrompt: 'Practice MOE Mock: The Decent Life initiative primarily aims to improve living standards in rural ______ across Egypt.',
          options: ['villages', 'islands', 'capitals', 'airports'],
          correctAnswer: 'villages',
          explanationAr: 'تهدف مبادرة حياة كريمة في المقام الأول لتطوير قرى الريف المصري (villages).',
          marks: 2,
          subSkill: 'Vocabulary'
        }
      ],
      level5_HigherThinking: [
        {
          id: 'prep3_u3_l5_q1',
          type: 'guided_writing',
          questionPrompt: 'Assess the long-term socio-economic return of investing in rural educational and healthcare infrastructure:',
          correctAnswer: 'Investing in rural schools and clinics eradicates multi-generational poverty, curtails urban migration pressures, and unlocks the latent workforce potential of rural youth. It guarantees balanced regional prosperity and economic resilience.',
          explanationAr: 'تقييم الأثر التنموي والاقتصادي طويل المدى للاستثمار في البنية التحتية التعليمية والصحية بالريف.',
          marks: 3,
          subSkill: 'Writing'
        }
      ]
    }
  }
];

// Helper functions for accessing preparatory curriculum data
export function getPrepLesson(
  grade: string | number,
  unitNumber: number,
  term: 1 | 2 = 1
): PrepLessonContent | undefined {
  const gradeKey = typeof grade === 'number'
    ? (grade === 7 ? 'prep_1' : grade === 8 ? 'prep_2' : 'prep_3')
    : grade;
  
  return prepCurriculumDatabase.find(
    lesson =>
      lesson.grade === gradeKey &&
      lesson.unitNumber === unitNumber &&
      lesson.term === term
  ) || prepCurriculumDatabase.find(
    lesson => lesson.grade === gradeKey && lesson.unitNumber === unitNumber
  ) || prepCurriculumDatabase.find(
    lesson => lesson.grade === gradeKey
  );
}

export function getPrepLessonsByGrade(grade: string | number): PrepLessonContent[] {
  const gradeKey = typeof grade === 'number'
    ? (grade === 7 ? 'prep_1' : grade === 8 ? 'prep_2' : 'prep_3')
    : grade;
  return prepCurriculumDatabase.filter(lesson => lesson.grade === gradeKey);
}

export function registerPrepLesson(lesson: PrepLessonContent): void {
  const existingIndex = prepCurriculumDatabase.findIndex(l => l.unitId === lesson.unitId);
  if (existingIndex >= 0) {
    prepCurriculumDatabase[existingIndex] = lesson;
  } else {
    prepCurriculumDatabase.push(lesson);
  }
}

export function getAllPrepLessons(): PrepLessonContent[] {
  return prepCurriculumDatabase;
}
