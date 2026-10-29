// =========================================================================
// EngliMensh.EG - Primary 1 & Primary 2 Complete Curriculum (Connect 1 & 2)
// Official Egyptian Ministry of Education (MOE) Specifications - Term 1
// System Architect: Mohammad El-Menshawy (محمد المنشاوي)
// Units: P1 (1 to 6) and P2 (1 to 6) - All with 3 Tabs & 5-Level Exam Suite
// =========================================================================

import { PrimaryLessonContent } from './primaryStageData.ts';

export const primary1And2Curriculum: PrimaryLessonContent[] = [
  // =========================================================================
  // PRIMARY 1 - UNIT 1: Hello! (أهلاً وسهلاً!)
  // =========================================================================
  {
    unitId: 'p1_t1_c_u1',
    grade: 'primary_1',
    track: 'connect',
    term: 1,
    unitNumber: 1,
    unitTitleEn: 'Hello!',
    unitTitleAr: 'أهلاً وسهلاً والتعريف بالنفس',
    tab1_Vocabulary: {
      words: [
        {
          id: 'p1_u1_w1',
          word: 'Hello',
          phonetics: '/həˈləʊ/',
          arabicMeaning: 'أهلاً / مرحباً',
          partOfSpeech: 'phrase',
          exampleSentence: 'Hello, I am Miss Mona.',
          visualCue: 'hand_wave'
        },
        {
          id: 'p1_u1_w2',
          word: 'Goodbye',
          phonetics: '/ˌɡʊdˈbaɪ/',
          arabicMeaning: 'مع السلامة',
          partOfSpeech: 'phrase',
          exampleSentence: 'Goodbye, children!',
          visualCue: 'goodbye_door'
        },
        {
          id: 'p1_u1_w3',
          word: 'Bag',
          phonetics: '/bæɡ/',
          arabicMeaning: 'حقيبة مدرسية',
          partOfSpeech: 'noun',
          exampleSentence: 'Open your bag, please.',
          visualCue: 'school_bag'
        },
        {
          id: 'p1_u1_w4',
          word: 'Book',
          phonetics: '/bʊk/',
          arabicMeaning: 'كتاب مدرسي',
          partOfSpeech: 'noun',
          exampleSentence: 'Close your book, Hany.',
          visualCue: 'open_book'
        },
        {
          id: 'p1_u1_w5',
          word: 'Busy Bee',
          phonetics: '/ˈbɪz.i biː/',
          arabicMeaning: 'النحلة النشيطة',
          partOfSpeech: 'noun',
          exampleSentence: 'The Busy Bee flies to the flowers.',
          visualCue: 'flower_garden'
        }
      ],
      phonics: [
        {
          letterSound: 'Sound of letter B /b/',
          sampleWords: ['Bag', 'Book', 'Bee', 'Bus', 'Blue'],
          rhymingPair: ['Bee', 'See']
        },
        {
          letterSound: 'Sound of letter H /h/',
          sampleWords: ['Hello', 'Hand', 'Hany', 'Hat'],
          rhymingPair: ['Hand', 'Band']
        }
      ],
      conversationTerms: [
        { en: "Hello! I'm Miss Mona. What's your name?", ar: "أهلاً! أنا مس منى. ما اسمك؟" },
        { en: "I'm Hany. / I'm Amira.", ar: "أنا هاني. / أنا أميرة." },
        { en: 'Shake hands, please.', ar: 'صافح زميلك بيدك من فضلك.' }
      ]
    },
    tab2_Grammar: {
      rules: [
        {
          title: "Self-Introduction & Polite Greetings (I'm + Name)",
          ruleExplanationAr: "للتعريف بالنفس نستخدم التركيب I'm متبوعاً بالاسم الشخصي: I'm + Name.",
          structureFormula: "Hello! I'm + [Name] / What's your name?",
          examples: [
            { en: "Hello! I'm Youssef.", ar: "أهلاً! أنا يوسف." },
            { en: "What's your name? - I'm Hana.", ar: "ما اسمك؟ - أنا هنا." }
          ],
          visualPatternBlocks: ["Hello!", "I'm [Name]", "What's your name?"]
        }
      ],
      sentenceBuilderDrills: [
        {
          jumbledParts: ['am', 'I', 'Hany'],
          correctOrder: ['I', 'am', 'Hany'],
          translationAr: 'أنا هاني'
        },
        {
          jumbledParts: ['your', "What's", 'name?'],
          correctOrder: ["What's", 'your', 'name?'],
          translationAr: 'ما اسمك؟'
        }
      ]
    },
    tab3_Skills: [
      {
        type: 'phonics_drill',
        instruction: 'Listen and repeat the target initial sound /b/ in Bag, Book, and Bee.',
        prompt: 'Which word starts with the /b/ sound?',
        targetResponses: ['Bag', 'Book', 'Bee', 'Bus'],
        scaffoldingHints: ['Listen to the first sound: /b/ like Busy Bee']
      },
      {
        type: 'dictation',
        instruction: 'Write the missing greeting word in English:',
        prompt: '______! I am Amira.',
        targetResponses: ['Hello', 'Hi'],
        scaffoldingHints: ['Say hello when meeting someone']
      }
    ],
    examSuite: {
      level1_Foundation: [
        {
          id: 'p1_u1_l1_q1',
          type: 'mcq',
          questionPrompt: 'Look at the picture: Someone waving a friendly hand says ______.',
          options: ['Hello', 'Car', 'Apple', 'Pen'],
          correctAnswer: 'Hello',
          explanationAr: 'عند لقاء شخص نقول مرحباً (Hello).',
          marks: 1
        },
        {
          id: 'p1_u1_l1_q2',
          type: 'mcq',
          questionPrompt: 'Which word starts with the letter sound /b/?',
          options: ['Book', 'Hand', 'Hat', 'Orange'],
          correctAnswer: 'Book',
          explanationAr: 'كلمة Book تبدأ بصوت حرف الـ B /b/.',
          marks: 1
        }
      ],
      level2_Contextual: [
        {
          id: 'p1_u1_l2_q1',
          type: 'matching',
          questionPrompt: 'Complete the greeting: "______ your name? — I am Hany."',
          options: ["What's", 'Where', 'Who', 'How'],
          correctAnswer: "What's",
          explanationAr: 'للسؤال عن الاسم نستخدم What\'s your name?.',
          marks: 1
        }
      ],
      level3_AdvancedStructure: [
        {
          id: 'p1_u1_l3_q1',
          type: 'reorder',
          questionPrompt: 'Reorder to form a correct sentence: [Mona - I - am - Miss].',
          correctAnswer: 'I am Miss Mona',
          explanationAr: 'الترتيب الصحيح هو: I am Miss Mona.',
          marks: 2
        }
      ],
      level4_MoeMockExam: [
        {
          id: 'p1_u1_l4_q1',
          type: 'mcq',
          questionPrompt: 'Practice MOE Mock: When class finishes and we leave, we say ______.',
          options: ['Goodbye', 'Morning', 'Open', 'Bag'],
          correctAnswer: 'Goodbye',
          explanationAr: 'عند الانصراف نقول مع السلامة (Goodbye).',
          marks: 1
        }
      ],
      level5_HigherThinking: [
        {
          id: 'p1_u1_l5_q1',
          type: 'guided_sentence',
          questionPrompt: 'Complete your own English introduction: "Hello! I am ______."',
          correctAnswer: 'a student',
          explanationAr: 'يكتب الطالب اسمه أو صفته (I am + name/student).',
          marks: 3
        }
      ]
    }
  },

  // =========================================================================
  // PRIMARY 1 - UNIT 2: This is me! (هذا أنا!)
  // =========================================================================
  {
    unitId: 'p1_t1_c_u2',
    grade: 'primary_1',
    track: 'connect',
    term: 1,
    unitNumber: 2,
    unitTitleEn: 'This is me!',
    unitTitleAr: 'هذا أنا وأجزاء الجسم',
    tab1_Vocabulary: {
      words: [
        {
          id: 'p1_u2_w1',
          word: 'Eye',
          phonetics: '/aɪ/',
          arabicMeaning: 'عين',
          partOfSpeech: 'noun',
          exampleSentence: 'Touch your eye carefully.',
          visualCue: 'happy_face'
        },
        {
          id: 'p1_u2_w2',
          word: 'Nose',
          phonetics: '/nəʊz/',
          arabicMeaning: 'أنف',
          partOfSpeech: 'noun',
          exampleSentence: 'This is my nose.',
          visualCue: 'happy_face'
        },
        {
          id: 'p1_u2_w3',
          word: 'Ear',
          phonetics: '/ɪər/',
          arabicMeaning: 'أذن',
          partOfSpeech: 'noun',
          exampleSentence: 'I listen with my ear.',
          visualCue: 'music_singing'
        },
        {
          id: 'p1_u2_w4',
          word: 'Mouth',
          phonetics: '/maʊθ/',
          arabicMeaning: 'فم',
          partOfSpeech: 'noun',
          exampleSentence: 'Open your mouth and smile.',
          visualCue: 'happy_face'
        },
        {
          id: 'p1_u2_w5',
          word: 'Hand',
          phonetics: '/hænd/',
          arabicMeaning: 'يد',
          partOfSpeech: 'noun',
          exampleSentence: 'Wash your hand with soap.',
          visualCue: 'hand_wave'
        }
      ],
      phonics: [
        {
          letterSound: 'Sound of letter N /n/',
          sampleWords: ['Nose', 'Neck', 'Nut', 'Nine'],
          rhymingPair: ['Neck', 'Deck']
        },
        {
          letterSound: 'Sound of letter H /h/',
          sampleWords: ['Hand', 'Hair', 'Hat', 'Head'],
          rhymingPair: ['Hat', 'Cat']
        }
      ],
      conversationTerms: [
        { en: 'Touch your nose, Hany!', ar: 'المس أنفك يا هاني!' },
        { en: 'Well done, Amira!', ar: 'أحسنتِ صنعاً يا أميرة!' },
        { en: 'This is my nose. / This is my mouth.', ar: 'هذا أنفي. / هذا فمي.' }
      ]
    },
    tab2_Grammar: {
      rules: [
        {
          title: "Demonstrative Singular & Commands (This is my... / Touch your...)",
          ruleExplanationAr: "للإشارة إلى جزء مفرد من الجسم نستخدم: This is my + [body part]. ولإعطاء أمر مهذب: Touch your + [body part].",
          structureFormula: "This is my + [singular noun] | Touch your + [noun]",
          examples: [
            { en: "This is my ear.", ar: "هذه أذني." },
            { en: "Touch your nose.", ar: "المس أنفك." }
          ],
          visualPatternBlocks: ["This is my...", "Touch your..."]
        }
      ],
      sentenceBuilderDrills: [
        {
          jumbledParts: ['is', 'This', 'nose', 'my'],
          correctOrder: ['This', 'is', 'my', 'nose'],
          translationAr: 'هذا أنفي'
        },
        {
          jumbledParts: ['your', 'Touch', 'ear'],
          correctOrder: ['Touch', 'your', 'ear'],
          translationAr: 'المس أذنك'
        }
      ]
    },
    tab3_Skills: [
      {
        type: 'phonics_drill',
        instruction: 'Identify words starting with letter N /n/:',
        prompt: 'Which word starts with the sound /n/?',
        targetResponses: ['Nose', 'Neck', 'Nut'],
        scaffoldingHints: ['Think of the body part you smell with']
      },
      {
        type: 'dictation',
        instruction: 'Complete the sentence:',
        prompt: 'This is my ______ (عين).',
        targetResponses: ['eye'],
        scaffoldingHints: ['Word is spelled e-y-e']
      }
    ],
    examSuite: {
      level1_Foundation: [
        {
          id: 'p1_u2_l1_q1',
          type: 'mcq',
          questionPrompt: 'We use our ______ to see beautiful pictures.',
          options: ['eyes', 'ears', 'nose', 'feet'],
          correctAnswer: 'eyes',
          explanationAr: 'نرى الأشياء بأعيننا (eyes).',
          marks: 1
        }
      ],
      level2_Contextual: [
        {
          id: 'p1_u2_l2_q1',
          type: 'matching',
          questionPrompt: 'Match the command: "______ your hand with water and soap."',
          options: ['Wash', 'Touch', 'Listen', 'See'],
          correctAnswer: 'Wash',
          explanationAr: 'نغسل اليد بالماء والصابون (Wash your hand).',
          marks: 1
        }
      ],
      level3_AdvancedStructure: [
        {
          id: 'p1_u2_l3_q1',
          type: 'reorder',
          questionPrompt: 'Reorder: [my - is - This - eye].',
          correctAnswer: 'This is my eye',
          explanationAr: 'الترتيب الصحيح: This is my eye.',
          marks: 2
        }
      ],
      level4_MoeMockExam: [
        {
          id: 'p1_u2_l4_q1',
          type: 'mcq',
          questionPrompt: 'Practice MOE Mock: "Touch your ______!" — Hany touches his ear.',
          options: ['ear', 'bag', 'book', 'bus'],
          correctAnswer: 'ear',
          explanationAr: 'المس أذنك تعني Touch your ear.',
          marks: 1
        }
      ],
      level5_HigherThinking: [
        {
          id: 'p1_u2_l5_q1',
          type: 'guided_sentence',
          questionPrompt: 'Write what body part you smile with: "This is my ______."',
          correctAnswer: 'mouth',
          explanationAr: 'نبتسم بالفم (mouth).',
          marks: 3
        }
      ]
    }
  },

  // =========================================================================
  // PRIMARY 1 - UNIT 3: My School Bag (حقيبتي المدرسية)
  // =========================================================================
  {
    unitId: 'p1_t1_c_u3',
    grade: 'primary_1',
    track: 'connect',
    term: 1,
    unitNumber: 3,
    unitTitleEn: 'My School Bag',
    unitTitleAr: 'حقيبتي المدرسية والأدوات',
    tab1_Vocabulary: {
      words: [
        {
          id: 'p1_u3_w1',
          word: 'Pen',
          phonetics: '/pen/',
          arabicMeaning: 'قلم جاف',
          partOfSpeech: 'noun',
          exampleSentence: 'I write with a blue pen.',
          visualCue: 'open_book'
        },
        {
          id: 'p1_u3_w2',
          word: 'Pencil',
          phonetics: '/ˈpen.səl/',
          arabicMeaning: 'قلم رصاص',
          partOfSpeech: 'noun',
          exampleSentence: 'Sharpen your pencil, please.',
          visualCue: 'open_book'
        },
        {
          id: 'p1_u3_w3',
          word: 'Ruler',
          phonetics: '/ˈruː.lər/',
          arabicMeaning: 'مسطرة',
          partOfSpeech: 'noun',
          exampleSentence: 'Use the ruler to draw a straight line.',
          visualCue: 'school_bag'
        },
        {
          id: 'p1_u3_w4',
          word: 'Sharpener',
          phonetics: '/ˈʃɑː.pən.ər/',
          arabicMeaning: 'براية أقلام',
          partOfSpeech: 'noun',
          exampleSentence: 'My sharpener is red and small.',
          visualCue: 'school_bag'
        },
        {
          id: 'p1_u3_w5',
          word: 'Pencil case',
          phonetics: '/ˈpen.səl keɪs/',
          arabicMeaning: 'مقلمة للأدوات',
          partOfSpeech: 'noun',
          exampleSentence: 'Put your pens inside the pencil case.',
          visualCue: 'school_bag'
        }
      ],
      phonics: [
        {
          letterSound: 'Sound of letter P /p/',
          sampleWords: ['Pen', 'Pencil', 'Peter', 'Pink'],
          rhymingPair: ['Pen', 'Hen']
        },
        {
          letterSound: 'Sound of letter B /b/ vs P /p/',
          sampleWords: ['Bag', 'Book', 'Pen', 'Pencil'],
          rhymingPair: ['Pin', 'Bin']
        }
      ],
      conversationTerms: [
        { en: "What's this? — It's a pencil.", ar: "ما هذا؟ — إنه قلم رصاص." },
        { en: "Is it a pen? — Yes, it is.", ar: "هل هو قلم جاف؟ — نعم، هو كذلك." },
        { en: "Open your pencil case.", ar: "افتح مقلمتك." }
      ]
    },
    tab2_Grammar: {
      rules: [
        {
          title: "Inquiring about Objects (What's this? / It's a...)",
          ruleExplanationAr: "للسؤال عن شيء مفرد قريب غير عاقل نسأل بـ What's this? وتكون الإجابة It's a + الاسم.",
          structureFormula: "What's this? -> It's a/an + [singular noun]",
          examples: [
            { en: "What's this? - It's a pen.", ar: "ما هذا؟ - إنه قلم جاف." },
            { en: "What's this? - It's a ruler.", ar: "ما هذا؟ - إنها مسطرة." }
          ],
          visualPatternBlocks: ["What's this?", "It's a [Noun]"]
        }
      ],
      sentenceBuilderDrills: [
        {
          jumbledParts: ['this?', "What's", 'is'],
          correctOrder: ["What's", 'this?'],
          translationAr: 'ما هذا؟'
        },
        {
          jumbledParts: ['a', "It's", 'ruler'],
          correctOrder: ["It's", 'a', 'ruler'],
          translationAr: 'إنها مسطرة'
        }
      ]
    },
    tab3_Skills: [
      {
        type: 'phonics_drill',
        instruction: 'Pronounce the /p/ sound with a puff of air:',
        prompt: 'Which word starts with letter P?',
        targetResponses: ['Pen', 'Pencil', 'Pink'],
        scaffoldingHints: ['Feel the air on your hand when you say /p/']
      },
      {
        type: 'dictation',
        instruction: 'Fill in the blank:',
        prompt: "It's a ______ (مسطرة).",
        targetResponses: ['ruler'],
        scaffoldingHints: ['Starts with letter R']
      }
    ],
    examSuite: {
      level1_Foundation: [
        {
          id: 'p1_u3_l1_q1',
          type: 'mcq',
          questionPrompt: 'We use a ______ to sharpen our pencils.',
          options: ['sharpener', 'ruler', 'book', 'bus'],
          correctAnswer: 'sharpener',
          explanationAr: 'نستخدم البراية (sharpener) لبري الأقلام الرصاص.',
          marks: 1
        }
      ],
      level2_Contextual: [
        {
          id: 'p1_u3_l2_q1',
          type: 'fill_in_the_blank',
          questionPrompt: "What's this? — It's ______ pencil case.",
          options: ['a', 'an', 'two', 'many'],
          correctAnswer: 'a',
          explanationAr: 'قبل الاسم المفرد المبتدئ بصوت ساكن نضع أداة النكرة a.',
          marks: 1
        }
      ],
      level3_AdvancedStructure: [
        {
          id: 'p1_u3_l3_q1',
          type: 'reorder',
          questionPrompt: 'Reorder: [pen - It - is - a].',
          correctAnswer: 'It is a pen',
          explanationAr: 'الترتيب الصحيح: It is a pen.',
          marks: 2
        }
      ],
      level4_MoeMockExam: [
        {
          id: 'p1_u3_l4_q1',
          type: 'mcq',
          questionPrompt: 'Practice MOE Mock: We keep all our pens, pencils, and erasers in a ______.',
          options: ['pencil case', 'tea cup', 'guitar', 'garden'],
          correctAnswer: 'pencil case',
          explanationAr: 'نحفظ الأقلام في المقلمة (pencil case).',
          marks: 1
        }
      ],
      level5_HigherThinking: [
        {
          id: 'p1_u3_l5_q1',
          type: 'guided_sentence',
          questionPrompt: 'Write what you have in your bag: "In my bag, I have a ______."',
          correctAnswer: 'book and a pen',
          explanationAr: 'يكتب الطالب محتويات حقيبته المدرسية.',
          marks: 3
        }
      ]
    }
  },

  // =========================================================================
  // PRIMARY 1 - UNIT 4: It's My Birthday! (إنه عيد ميلادي!)
  // =========================================================================
  {
    unitId: 'p1_t1_c_u4',
    grade: 'primary_1',
    track: 'connect',
    term: 1,
    unitNumber: 4,
    unitTitleEn: "It's My Birthday!",
    unitTitleAr: 'إنه عيد ميلادي والأرقام من 1 إلى 10',
    tab1_Vocabulary: {
      words: [
        {
          id: 'p1_u4_w1',
          word: 'Cake',
          phonetics: '/keɪk/',
          arabicMeaning: 'كعكة عيد الميلاد',
          partOfSpeech: 'noun',
          exampleSentence: 'The birthday cake has six candles.',
          visualCue: 'trophy_cup'
        },
        {
          id: 'p1_u4_w2',
          word: 'Candle',
          phonetics: '/ˈkæn.dəl/',
          arabicMeaning: 'شمعة',
          partOfSpeech: 'noun',
          exampleSentence: 'Blow out the candle and make a wish.',
          visualCue: 'clock_alarm'
        },
        {
          id: 'p1_u4_w3',
          word: 'One to Ten',
          phonetics: '/wʌn tuː ten/',
          arabicMeaning: 'الأرقام من 1 إلى 10',
          partOfSpeech: 'phrase',
          exampleSentence: 'Count the candles: one, two, three, four, five, six, seven, eight, nine, ten.',
          visualCue: 'star_badge'
        },
        {
          id: 'p1_u4_w4',
          word: 'Card',
          phonetics: '/kɑːd/',
          arabicMeaning: 'بطاقة تهنئة',
          partOfSpeech: 'noun',
          exampleSentence: 'I made a colourful birthday card for my friend.',
          visualCue: 'open_book'
        }
      ],
      phonics: [
        {
          letterSound: 'Sound of letter C /k/',
          sampleWords: ['Cake', 'Candle', 'Card', 'Car'],
          rhymingPair: ['Car', 'Star']
        },
        {
          letterSound: 'Sound of letter O /ɒ/',
          sampleWords: ['Orange', 'Oil', 'Olive', 'On'],
          rhymingPair: ['Hot', 'Pot']
        }
      ],
      conversationTerms: [
        { en: 'How old are you? — I am seven years old.', ar: 'كم عمرك؟ — أنا عمري سبع سنوات.' },
        { en: 'Happy birthday to you!', ar: 'عيد ميلاد سعيد لك!' },
        { en: 'How many candles are on the cake?', ar: 'كم عدد الشموع على الكعكة؟' }
      ]
    },
    tab2_Grammar: {
      rules: [
        {
          title: "Asking and Stating Age (How old are you? / I am [number])",
          ruleExplanationAr: "للسؤال عن العمر نستخدم: How old are you? والإجابة: I am + [الرقم] + years old.",
          structureFormula: "How old are you? -> I am + [Number] (years old)",
          examples: [
            { en: "How old are you? - I am six.", ar: "كم عمرك؟ - أنا في السادسة." },
            { en: "How old are you? - I am seven years old.", ar: "كم عمرك؟ - عمري سبع سنوات." }
          ],
          visualPatternBlocks: ["How old are you?", "I am [Age] years old"]
        }
      ],
      sentenceBuilderDrills: [
        {
          jumbledParts: ['six', 'am', 'I'],
          correctOrder: ['I', 'am', 'six'],
          translationAr: 'أنا عمري ست سنوات'
        },
        {
          jumbledParts: ['old', 'How', 'you?', 'are'],
          correctOrder: ['How', 'old', 'are', 'you?'],
          translationAr: 'كم عمرك؟'
        }
      ]
    },
    tab3_Skills: [
      {
        type: 'phonics_drill',
        instruction: 'Pronounce letter C /k/ as in Cake, Candle, and Card:',
        prompt: 'Which word starts with the /k/ sound of letter C?',
        targetResponses: ['Cake', 'Candle', 'Card'],
        scaffoldingHints: ['Think of what you eat at a birthday']
      },
      {
        type: 'dictation',
        instruction: 'Write the number word in English:',
        prompt: 'I have ______ (خمسة) candles.',
        targetResponses: ['five', '5'],
        scaffoldingHints: ['Spelled f-i-v-e']
      }
    ],
    examSuite: {
      level1_Foundation: [
        {
          id: 'p1_u4_l1_q1',
          type: 'mcq',
          questionPrompt: 'On a birthday, we put lit ______ on top of the sweet cake.',
          options: ['candles', 'pens', 'bags', 'rulers'],
          correctAnswer: 'candles',
          explanationAr: 'نضع الشموع (candles) فوق كعكة عيد الميلاد.',
          marks: 1
        }
      ],
      level2_Contextual: [
        {
          id: 'p1_u4_l2_q1',
          type: 'fill_in_the_blank',
          questionPrompt: 'How ______ are you? — I am six.',
          options: ['old', 'many', 'much', 'color'],
          correctAnswer: 'old',
          explanationAr: 'السؤال عن العمر هو How old are you?.',
          marks: 1
        }
      ],
      level3_AdvancedStructure: [
        {
          id: 'p1_u4_l3_q1',
          type: 'reorder',
          questionPrompt: 'Reorder: [seven - am - I - old - years].',
          correctAnswer: 'I am seven years old',
          explanationAr: 'الترتيب الصحيح: I am seven years old.',
          marks: 2
        }
      ],
      level4_MoeMockExam: [
        {
          id: 'p1_u4_l4_q1',
          type: 'mcq',
          questionPrompt: 'Practice MOE Mock: Count: 1, 2, 3, 4, ______ , 6.',
          options: ['five', 'ten', 'zero', 'seven'],
          correctAnswer: 'five',
          explanationAr: 'العدد الذي يلي 4 هو خمسة (five).',
          marks: 1
        }
      ],
      level5_HigherThinking: [
        {
          id: 'p1_u4_l5_q1',
          type: 'guided_sentence',
          questionPrompt: 'Write how old you are: "I am ______ years old."',
          correctAnswer: 'six',
          explanationAr: 'يكتب الطالب عمره بالإنجليزية (e.g. six, seven).',
          marks: 3
        }
      ]
    }
  },

  // =========================================================================
  // PRIMARY 1 - UNIT 5: With My Family (مع عائلتي)
  // =========================================================================
  {
    unitId: 'p1_t1_c_u5',
    grade: 'primary_1',
    track: 'connect',
    term: 1,
    unitNumber: 5,
    unitTitleEn: 'With My Family',
    unitTitleAr: 'مع عائلتي وأفراد الأسرة',
    tab1_Vocabulary: {
      words: [
        {
          id: 'p1_u5_w1',
          word: 'Mother',
          phonetics: '/ˈmʌð.ər/',
          arabicMeaning: 'أم',
          partOfSpeech: 'noun',
          exampleSentence: 'My mother makes delicious tea.',
          visualCue: 'happy_face'
        },
        {
          id: 'p1_u5_w2',
          word: 'Father',
          phonetics: '/ˈfɑː.ðər/',
          arabicMeaning: 'أب',
          partOfSpeech: 'noun',
          exampleSentence: 'My father reads the newspaper.',
          visualCue: 'happy_face'
        },
        {
          id: 'p1_u5_w3',
          word: 'Brother',
          phonetics: '/ˈbrʌð.ər/',
          arabicMeaning: 'أخ',
          partOfSpeech: 'noun',
          exampleSentence: 'Hany is my kind brother.',
          visualCue: 'friends_group'
        },
        {
          id: 'p1_u5_w4',
          word: 'Sister',
          phonetics: '/ˈsɪs.tər/',
          arabicMeaning: 'أخت',
          partOfSpeech: 'noun',
          exampleSentence: 'Hana is my cheerful sister.',
          visualCue: 'friends_group'
        },
        {
          id: 'p1_u5_w5',
          word: 'Grandmother',
          phonetics: '/ˈɡrænˌmʌð.ər/',
          arabicMeaning: 'جدة',
          partOfSpeech: 'noun',
          exampleSentence: 'Grandmother tells us lovely stories.',
          visualCue: 'happy_face'
        }
      ],
      phonics: [
        {
          letterSound: 'Sound of letter F /f/',
          sampleWords: ['Father', 'Flag', 'Family', 'Fish'],
          rhymingPair: ['Fish', 'Dish']
        },
        {
          letterSound: 'Sound of letter T /t/',
          sampleWords: ['Tea', 'Tree', 'Ten', 'Teacher'],
          rhymingPair: ['Tea', 'Sea']
        }
      ],
      conversationTerms: [
        { en: 'Have some tea, Grandmother.', ar: 'تناولي بعض الشاي يا جدتي.' },
        { en: 'Thank you, Hana.', ar: 'شكراً لكِ يا هنا.' },
        { en: 'This is my family.', ar: 'هذه عائلتي.' }
      ]
    },
    tab2_Grammar: {
      rules: [
        {
          title: "Polite Offering & Family Introductions (Have some... / This is my...)",
          ruleExplanationAr: "لتقديم شيء بأدب نقول: Have some + [اسم]، ولتقديم أحد أفراد الأسرة نقول: This is my + [فرد العائلة].",
          structureFormula: "Have some [food/drink], please | This is my [mother/father]",
          examples: [
            { en: "Have some cake, please.", ar: "تناول بعض الكعك من فضلك." },
            { en: "This is my mother.", ar: "هذه أمي." }
          ],
          visualPatternBlocks: ["Have some...", "This is my [Family Member]"]
        }
      ],
      sentenceBuilderDrills: [
        {
          jumbledParts: ['mother', 'my', 'is', 'This'],
          correctOrder: ['This', 'is', 'my', 'mother'],
          translationAr: 'هذه أمي'
        },
        {
          jumbledParts: ['tea', 'some', 'Have'],
          correctOrder: ['Have', 'some', 'tea'],
          translationAr: 'تناول بعض الشاي'
        }
      ]
    },
    tab3_Skills: [
      {
        type: 'phonics_drill',
        instruction: 'Distinguish between /f/ and /t/ sounds:',
        prompt: 'Which word starts with letter F sound?',
        targetResponses: ['Father', 'Family', 'Flag'],
        scaffoldingHints: ['Listen to the first sound of Father']
      },
      {
        type: 'dictation',
        instruction: 'Fill in the blank:',
        prompt: 'This is my ______ (أب).',
        targetResponses: ['father', 'dad'],
        scaffoldingHints: ['Starts with letter F']
      }
    ],
    examSuite: {
      level1_Foundation: [
        {
          id: 'p1_u5_l1_q1',
          type: 'mcq',
          questionPrompt: 'Your mother and father together are your ______.',
          options: ['parents', 'books', 'pencils', 'bags'],
          correctAnswer: 'parents',
          explanationAr: 'الأب والأم معاً هما الوالدان (parents).',
          marks: 1
        }
      ],
      level2_Contextual: [
        {
          id: 'p1_u5_l2_q1',
          type: 'matching',
          questionPrompt: 'Polite offering: "Have some tea, Grandmother." — She replies: "______."',
          options: ['Thank you', 'Goodbye', 'No', 'Bad'],
          correctAnswer: 'Thank you',
          explanationAr: 'عندما يقدم لك أحد شيئاً تشكره (Thank you).',
          marks: 1
        }
      ],
      level3_AdvancedStructure: [
        {
          id: 'p1_u5_l3_q1',
          type: 'reorder',
          questionPrompt: 'Reorder: [my - is - father - This].',
          correctAnswer: 'This is my father',
          explanationAr: 'الترتيب الصحيح: This is my father.',
          marks: 2
        }
      ],
      level4_MoeMockExam: [
        {
          id: 'p1_u5_l4_q1',
          type: 'mcq',
          questionPrompt: 'Practice MOE Mock: The mother of your mother is your ______.',
          options: ['grandmother', 'brother', 'sister', 'uncle'],
          correctAnswer: 'grandmother',
          explanationAr: 'أم والدتك هي جدتك (grandmother).',
          marks: 1
        }
      ],
      level5_HigherThinking: [
        {
          id: 'p1_u5_l5_q1',
          type: 'guided_sentence',
          questionPrompt: 'Write a sentence about your family: "I love my ______."',
          correctAnswer: 'family',
          explanationAr: 'يكتب الطالب حبه لأسرته (I love my family).',
          marks: 3
        }
      ]
    }
  },

  // =========================================================================
  // PRIMARY 1 - UNIT 6: Let's Play Music! (هيا نعزف الموسيقى!)
  // =========================================================================
  {
    unitId: 'p1_t1_c_u6',
    grade: 'primary_1',
    track: 'connect',
    term: 1,
    unitNumber: 6,
    unitTitleEn: "Let's Play Music!",
    unitTitleAr: 'هيا نعزف الموسيقى والآلات الموسيقية',
    tab1_Vocabulary: {
      words: [
        {
          id: 'p1_u6_w1',
          word: 'Guitar',
          phonetics: '/ɡɪˈtɑːr/',
          arabicMeaning: 'جيتار (آلة وترية)',
          partOfSpeech: 'noun',
          exampleSentence: 'I can play the guitar nicely.',
          visualCue: 'music_singing'
        },
        {
          id: 'p1_u6_w2',
          word: 'Flute',
          phonetics: '/fluːt/',
          arabicMeaning: 'ناي / مزمار',
          partOfSpeech: 'noun',
          exampleSentence: 'She plays the flute in the music room.',
          visualCue: 'music_singing'
        },
        {
          id: 'p1_u6_w3',
          word: 'Drum',
          phonetics: '/drʌm/',
          arabicMeaning: 'طبلة',
          partOfSpeech: 'noun',
          exampleSentence: 'He bangs the drum loudly.',
          visualCue: 'music_singing'
        },
        {
          id: 'p1_u6_w4',
          word: 'Piano',
          phonetics: '/piˈæn.əʊ/',
          arabicMeaning: 'بيانو',
          partOfSpeech: 'noun',
          exampleSentence: 'My sister plays the piano gracefully.',
          visualCue: 'music_singing'
        },
        {
          id: 'p1_u6_w5',
          word: 'Triangle',
          phonetics: '/ˈtraɪ.æŋ.ɡəl/',
          arabicMeaning: 'آلة المثلث الموسيقي',
          partOfSpeech: 'noun',
          exampleSentence: 'Hit the triangle with the metal rod.',
          visualCue: 'music_singing'
        }
      ],
      phonics: [
        {
          letterSound: 'Sound of letter D /d/',
          sampleWords: ['Drum', 'Dog', 'Door', 'Duck'],
          rhymingPair: ['Dog', 'Log']
        },
        {
          letterSound: 'Sound of letter G /ɡ/',
          sampleWords: ['Guitar', 'Green', 'Girl', 'Garden'],
          rhymingPair: ['Pig', 'Big']
        }
      ],
      conversationTerms: [
        { en: 'I can play the guitar.', ar: 'أنا أستطيع عزف الجيتار.' },
        { en: "Let's play music together!", ar: "هيا نعزف الموسيقى معاً!" },
        { en: 'Listen to the drum.', ar: 'استمع إلى صوت الطبلة.' }
      ]
    },
    tab2_Grammar: {
      rules: [
        {
          title: "Ability with Musical Instruments (I can play the...)",
          ruleExplanationAr: "للتعبير عن القدرة على عزف آلة موسيقية نستخدم: I can play the + [اسم الآلة]. نلاحظ استخدام أداة التعريف the قبل الآلات الموسيقية.",
          structureFormula: "I can play the + [musical instrument]",
          examples: [
            { en: "I can play the drum.", ar: "أنا أستطيع أن أعزف على الطبلة." },
            { en: "I can play the piano.", ar: "أنا أستطيع أن أعزف على البيانو." }
          ],
          visualPatternBlocks: ["I can play", "the [Instrument]"]
        }
      ],
      sentenceBuilderDrills: [
        {
          jumbledParts: ['play', 'I', 'can', 'guitar', 'the'],
          correctOrder: ['I', 'can', 'play', 'the', 'guitar'],
          translationAr: 'أنا أستطيع عزف الجيتار'
        },
        {
          jumbledParts: ['music', "Let's", 'play'],
          correctOrder: ["Let's", 'play', 'music'],
          translationAr: 'هيا نعزف الموسيقى'
        }
      ]
    },
    tab3_Skills: [
      {
        type: 'phonics_drill',
        instruction: 'Identify words starting with sound /d/ vs /g/:',
        prompt: 'Which musical instrument starts with letter D?',
        targetResponses: ['Drum'],
        scaffoldingHints: ['You hit it with drumsticks']
      },
      {
        type: 'dictation',
        instruction: 'Complete the sentence:',
        prompt: 'I can play the ______ (بيانو).',
        targetResponses: ['piano'],
        scaffoldingHints: ['Has black and white keys']
      }
    ],
    examSuite: {
      level1_Foundation: [
        {
          id: 'p1_u6_l1_q1',
          type: 'mcq',
          questionPrompt: 'A musical instrument with strings that you strum is a ______.',
          options: ['guitar', 'drum', 'pencil', 'sharpener'],
          correctAnswer: 'guitar',
          explanationAr: 'الجيتار (guitar) آلة موسيقية وترية.',
          marks: 1
        }
      ],
      level2_Contextual: [
        {
          id: 'p1_u6_l2_q1',
          type: 'fill_in_the_blank',
          questionPrompt: 'I can play ______ drum in the school band.',
          options: ['the', 'a', 'an', 'some'],
          correctAnswer: 'the',
          explanationAr: 'قبل الآلات الموسيقية بعد فعل play نستخدم the.',
          marks: 1
        }
      ],
      level3_AdvancedStructure: [
        {
          id: 'p1_u6_l3_q1',
          type: 'reorder',
          questionPrompt: 'Reorder: [flute - can - the - I - play].',
          correctAnswer: 'I can play the flute',
          explanationAr: 'الترتيب الصحيح: I can play the flute.',
          marks: 2
        }
      ],
      level4_MoeMockExam: [
        {
          id: 'p1_u6_l4_q1',
          type: 'mcq',
          questionPrompt: 'Practice MOE Mock: Let\'s ______ music together in class!',
          options: ['play', 'sleep', 'wash', 'drink'],
          correctAnswer: 'play',
          explanationAr: 'نعزف موسيقى تعني play music.',
          marks: 1
        }
      ],
      level5_HigherThinking: [
        {
          id: 'p1_u6_l5_q1',
          type: 'guided_sentence',
          questionPrompt: 'Write which instrument you like: "I like the ______."',
          correctAnswer: 'piano',
          explanationAr: 'يكتب الطالب آلته الموسيقية المفضلة.',
          marks: 3
        }
      ]
    }
  },

  // =========================================================================
  // PRIMARY 2 - UNIT 1: Meet My Family (تعرف على عائلتي)
  // =========================================================================
  {
    unitId: 'p2_t1_c_u1',
    grade: 'primary_2',
    track: 'connect',
    term: 1,
    unitNumber: 1,
    unitTitleEn: 'Meet My Family',
    unitTitleAr: 'تعرف على عائلتي والتحيات اليومية',
    tab1_Vocabulary: {
      words: [
        {
          id: 'p2_u1_w1',
          word: 'Parents',
          phonetics: '/ˈpeə.rənts/',
          arabicMeaning: 'الوالدان (الأب والأم)',
          partOfSpeech: 'noun',
          exampleSentence: 'These are my loving parents.',
          visualCue: 'happy_face'
        },
        {
          id: 'p2_u1_w2',
          word: 'Grandparents',
          phonetics: '/ˈɡrænˌpeə.rənts/',
          arabicMeaning: 'الجد والجدة معاً',
          partOfSpeech: 'noun',
          exampleSentence: 'My grandparents live in a quiet countryside house.',
          visualCue: 'happy_face'
        },
        {
          id: 'p2_u1_w3',
          word: 'Cousin',
          phonetics: '/ˈkʌz.ən/',
          arabicMeaning: 'ابن/ابنة العم أو العمة أو الخال أو الخالة',
          partOfSpeech: 'noun',
          exampleSentence: 'Amr is my cousin; he is five years old.',
          visualCue: 'friends_group'
        },
        {
          id: 'p2_u1_w4',
          word: 'Uncle',
          phonetics: '/ˈʌŋ.kəl/',
          arabicMeaning: 'عم أو خال',
          partOfSpeech: 'noun',
          exampleSentence: 'My uncle drives a yellow taxi.',
          visualCue: 'happy_face'
        },
        {
          id: 'p2_u1_w5',
          word: 'Good morning',
          phonetics: '/ɡʊd ˈmɔː.nɪŋ/',
          arabicMeaning: 'صباح الخير',
          partOfSpeech: 'phrase',
          exampleSentence: 'Good morning, teacher!',
          visualCue: 'sun_rise'
        }
      ],
      phonics: [
        {
          letterSound: 'Digraph CH /tʃ/',
          sampleWords: ['Children', 'Chicken', 'Beach', 'Chips'],
          rhymingPair: ['Beach', 'Peach']
        }
      ],
      conversationTerms: [
        { en: 'Let me introduce my family.', ar: 'دعني أقدم لك عائلتي.' },
        { en: 'This is my cousin, Amr.', ar: 'هذا ابن عمي عمرو.' },
        { en: 'These are my friends.', ar: 'هؤلاء أصدقائي.' }
      ]
    },
    tab2_Grammar: {
      rules: [
        {
          title: "Singular vs. Plural Demonstratives (This is / These are)",
          ruleExplanationAr: "للمفرد القريب نستخدم: This is my + [singular noun]. وللجمع القريب نستخدم: These are my + [plural noun].",
          structureFormula: "This is my + [Singular] | These are my + [Plural]",
          examples: [
            { en: "This is my brother.", ar: "هذا أخي." },
            { en: "These are my parents.", ar: "هؤلاء والداي." }
          ],
          visualPatternBlocks: ["This is my + Singular", "These are my + Plural"]
        }
      ],
      sentenceBuilderDrills: [
        {
          jumbledParts: ['parents', 'are', 'my', 'These'],
          correctOrder: ['These', 'are', 'my', 'parents'],
          translationAr: 'هؤلاء والداي'
        },
        {
          jumbledParts: ['This', 'my', 'cousin', 'is'],
          correctOrder: ['This', 'is', 'my', 'cousin'],
          translationAr: 'هذا ابن عمي'
        }
      ]
    },
    tab3_Skills: [
      {
        type: 'phonics_drill',
        instruction: 'Identify words containing digraph /tʃ/ (ch):',
        prompt: 'Which word contains the /tʃ/ sound as in chicken?',
        targetResponses: ['Children', 'Chips', 'Beach'],
        scaffoldingHints: ['Listen to the ch sound']
      },
      {
        type: 'dictation',
        instruction: 'Fill in the correct demonstrative:',
        prompt: '______ are my friends (جمع).',
        targetResponses: ['These'],
        scaffoldingHints: ['Starts with T-h-e-s-e']
      }
    ],
    examSuite: {
      level1_Foundation: [
        {
          id: 'p2_u1_l1_q1',
          type: 'mcq',
          questionPrompt: 'In the morning when the sun rises, we say ______.',
          options: ['Good morning', 'Good night', 'Goodbye', 'Good evening'],
          correctAnswer: 'Good morning',
          explanationAr: 'في الصباح نقول صباح الخير (Good morning).',
          marks: 1
        }
      ],
      level2_Contextual: [
        {
          id: 'p2_u1_l2_q1',
          type: 'matching',
          questionPrompt: 'Choose the correct word: "______ is my sister."',
          options: ['This', 'These', 'Those', 'They'],
          correctAnswer: 'This',
          explanationAr: 'أختي مفرد فنستخدم This is.',
          marks: 1
        }
      ],
      level3_AdvancedStructure: [
        {
          id: 'p2_u1_l3_q1',
          type: 'reorder',
          questionPrompt: 'Reorder: [grandparents - are - my - These].',
          correctAnswer: 'These are my grandparents',
          explanationAr: 'الترتيب الصحيح: These are my grandparents.',
          marks: 2
        }
      ],
      level4_MoeMockExam: [
        {
          id: 'p2_u1_l4_q1',
          type: 'mcq',
          questionPrompt: 'Practice MOE Mock: The son of my uncle is my ______.',
          options: ['cousin', 'sister', 'grandmother', 'mother'],
          correctAnswer: 'cousin',
          explanationAr: 'ابن العم أو الخال هو cousin.',
          marks: 1
        }
      ],
      level5_HigherThinking: [
        {
          id: 'p2_u1_l5_q1',
          type: 'guided_sentence',
          questionPrompt: 'Introduce your friends politely: "These are my ______."',
          correctAnswer: 'friends',
          explanationAr: 'يكتب الطالب تقديم أصدقائه (These are my friends).',
          marks: 3
        }
      ]
    }
  },

  // =========================================================================
  // PRIMARY 2 - UNIT 2: My Body (جسمي)
  // =========================================================================
  {
    unitId: 'p2_t1_c_u2',
    grade: 'primary_2',
    track: 'connect',
    term: 1,
    unitNumber: 2,
    unitTitleEn: 'My Body',
    unitTitleAr: 'جسمي والجمع الشاذ وأعضاء الكائنات',
    tab1_Vocabulary: {
      words: [
        {
          id: 'p2_u2_w1',
          word: 'Head',
          phonetics: '/hed/',
          arabicMeaning: 'رأس',
          partOfSpeech: 'noun',
          exampleSentence: 'I have one head.',
          visualCue: 'happy_face'
        },
        {
          id: 'p2_u2_w2',
          word: 'Foot / Feet',
          phonetics: '/fʊt / fiːt/',
          arabicMeaning: 'قدم / أقدام (جمع غير منتظم)',
          partOfSpeech: 'noun',
          exampleSentence: 'I have two feet to run and walk.',
          visualCue: 'foot_steps'
        },
        {
          id: 'p2_u2_w3',
          word: 'Tooth / Teeth',
          phonetics: '/tuːθ / tiːθ/',
          arabicMeaning: 'سنّة / أسنان (جمع غير منتظم)',
          partOfSpeech: 'noun',
          exampleSentence: 'Brush your white teeth twice a day.',
          visualCue: 'happy_face'
        },
        {
          id: 'p2_u2_w4',
          word: 'Beak',
          phonetics: '/biːk/',
          arabicMeaning: 'منقار الطائر',
          partOfSpeech: 'noun',
          exampleSentence: 'The bird has a sharp yellow beak.',
          visualCue: 'flower_garden'
        },
        {
          id: 'p2_u2_w5',
          word: 'Arm',
          phonetics: '/ɑːm/',
          arabicMeaning: 'ذراع',
          partOfSpeech: 'noun',
          exampleSentence: 'He has strong arms to throw the ball.',
          visualCue: 'hand_wave'
        }
      ],
      phonics: [
        {
          letterSound: 'Sound of TH /θ/ (unvoiced)',
          sampleWords: ['Three', 'Mouth', 'Teeth', 'Bath'],
          rhymingPair: ['Path', 'Bath']
        },
        {
          letterSound: 'Sound of TH /ð/ (voiced)',
          sampleWords: ['This', 'That', 'These', 'Mother'],
          rhymingPair: ['Then', 'When']
        }
      ],
      conversationTerms: [
        { en: 'I have two eyes, two ears, and one nose.', ar: 'لدي عينان وأذنان وأنف واحد.' },
        { en: 'A bird has two legs and a beak.', ar: 'الطائر له رجلان ومنقار.' },
        { en: 'A monkey has a face and big ears.', ar: 'القرد له وجه وأذنان كبيرتان.' }
      ]
    },
    tab2_Grammar: {
      rules: [
        {
          title: "Possession with Have/Has got & Irregular Plurals (foot->feet, tooth->teeth)",
          ruleExplanationAr: "نستخدم have got مع (I, we, they, you) ونستخدم has got مع (he, she, it). وجمع foot هو feet، وجمع tooth هو teeth.",
          structureFormula: "I/We/You/They + have got | He/She/It + has got",
          examples: [
            { en: "I have got two arms and two legs.", ar: "لدي ذراعان ورجلان." },
            { en: "The bird has got a beak.", ar: "الطائر لديه منقار." }
          ],
          visualPatternBlocks: ["I have got...", "He/She/It has got..."]
        }
      ],
      sentenceBuilderDrills: [
        {
          jumbledParts: ['has', 'The', 'bird', 'beak', 'a'],
          correctOrder: ['The', 'bird', 'has', 'a', 'beak'],
          translationAr: 'الطائر لديه منقار'
        },
        {
          jumbledParts: ['have', 'I', 'feet', 'two'],
          correctOrder: ['I', 'have', 'two', 'feet'],
          translationAr: 'أنا لدي قدمان'
        }
      ]
    },
    tab3_Skills: [
      {
        type: 'phonics_drill',
        instruction: 'Pronounce the unvoiced /θ/ sound with tongue between teeth:',
        prompt: 'Which word contains the /θ/ sound as in three?',
        targetResponses: ['Three', 'Teeth', 'Mouth'],
        scaffoldingHints: ['Put your tongue between your teeth']
      },
      {
        type: 'dictation',
        instruction: 'Write the plural form:',
        prompt: 'One foot, two ______ (أقدام).',
        targetResponses: ['feet'],
        scaffoldingHints: ['Change oo to ee']
      }
    ],
    examSuite: {
      level1_Foundation: [
        {
          id: 'p2_u2_l1_q1',
          type: 'mcq',
          questionPrompt: 'Birds eat seeds using their ______.',
          options: ['beak', 'arm', 'book', 'bag'],
          correctAnswer: 'beak',
          explanationAr: 'تأكل الطيور بالمنقار (beak).',
          marks: 1
        }
      ],
      level2_Contextual: [
        {
          id: 'p2_u2_l2_q1',
          type: 'matching',
          questionPrompt: 'Complete: "The dentist checks my ______."',
          options: ['teeth', 'bags', 'cars', 'clocks'],
          correctAnswer: 'teeth',
          explanationAr: 'طبيب الأسنان يفحص الأسنان (teeth).',
          marks: 1
        }
      ],
      level3_AdvancedStructure: [
        {
          id: 'p2_u2_l3_q1',
          type: 'reorder',
          questionPrompt: 'Reorder: [two - I - have - feet].',
          correctAnswer: 'I have two feet',
          explanationAr: 'الترتيب الصحيح: I have two feet.',
          marks: 2
        }
      ],
      level4_MoeMockExam: [
        {
          id: 'p2_u2_l4_q1',
          type: 'mcq',
          questionPrompt: 'Practice MOE Mock: Plural of tooth is ______.',
          options: ['teeth', 'tooths', 'toothes', 'teethes'],
          correctAnswer: 'teeth',
          explanationAr: 'جمع tooth هو جمع غير منتظم: teeth.',
          marks: 1
        }
      ],
      level5_HigherThinking: [
        {
          id: 'p2_u2_l5_q1',
          type: 'guided_sentence',
          questionPrompt: 'Describe a bird in one sentence: "A bird has ______."',
          correctAnswer: 'two wings and a beak',
          explanationAr: 'يصف الطالب جسم الطائر (wings, beak).',
          marks: 3
        }
      ]
    }
  },

  // =========================================================================
  // PRIMARY 2 - UNIT 3: Off to School (إلى المدرسة)
  // =========================================================================
  {
    unitId: 'p2_t1_c_u3',
    grade: 'primary_2',
    track: 'connect',
    term: 1,
    unitNumber: 3,
    unitTitleEn: 'Off to School',
    unitTitleAr: 'إلى المدرسة والملابس وأوقات الساعة',
    tab1_Vocabulary: {
      words: [
        {
          id: 'p2_u3_w1',
          word: 'Dress',
          phonetics: '/dres/',
          arabicMeaning: 'فستان',
          partOfSpeech: 'noun',
          exampleSentence: 'Hana wears a pretty yellow dress.',
          visualCue: 'star_badge'
        },
        {
          id: 'p2_u3_w2',
          word: 'Hat',
          phonetics: '/hæt/',
          arabicMeaning: 'قبعة',
          partOfSpeech: 'noun',
          exampleSentence: 'Put on your hat under the hot sun.',
          visualCue: 'star_badge'
        },
        {
          id: 'p2_u3_w3',
          word: 'Glasses',
          phonetics: '/ˈɡlɑː.sɪz/',
          arabicMeaning: 'نظارة طبية أو شمسية',
          partOfSpeech: 'noun',
          exampleSentence: 'Grandfather wears glasses to read.',
          visualCue: 'happy_face'
        },
        {
          id: 'p2_u3_w4',
          word: 'Coat',
          phonetics: '/kəʊt/',
          arabicMeaning: 'معطف شتوي',
          partOfSpeech: 'noun',
          exampleSentence: 'In cold winter, wear your warm coat.',
          visualCue: 'star_badge'
        },
        {
          id: 'p2_u3_w5',
          word: 'Watch',
          phonetics: '/wɒtʃ/',
          arabicMeaning: 'ساعة يد',
          partOfSpeech: 'noun',
          exampleSentence: 'Look at your watch; it is eight o’clock.',
          visualCue: 'clock_alarm'
        }
      ],
      phonics: [
        {
          letterSound: 'Sound of AR /ɑː/',
          sampleWords: ['Car', 'Park', 'Star', 'Art', 'Arm'],
          rhymingPair: ['Car', 'Star']
        },
        {
          letterSound: 'Sound of SH /ʃ/',
          sampleWords: ['Shirt', 'Shoes', 'Fish', 'Sheep'],
          rhymingPair: ['Fish', 'Dish']
        }
      ],
      conversationTerms: [
        { en: "It's seven o'clock. Time for school!", ar: "الساعة السابعة تماماً. وقت الذهاب للمدرسة!" },
        { en: "What are these? — These are my boots.", ar: "ما هؤلاء؟ — هذه أحذيتي ذات الرقبة." },
        { en: "Is this your hat? — Yes, it is.", ar: "هل هذه قبعتك؟ — نعم، هي كذلك." }
      ]
    },
    tab2_Grammar: {
      rules: [
        {
          title: "Telling Time & Plural Clothes (It's [time] o'clock / These are my [clothes])",
          ruleExplanationAr: "لقراءة الساعة تماماً: It's + [number] + o'clock. والملابس المكونة من جزأين تعامل كجمع مثل: glasses, boots, shoes فنقول: These are my glasses.",
          structureFormula: "It's + [Number] o'clock | These are my + [Plural item]",
          examples: [
            { en: "It's eight o'clock.", ar: "إنها الساعة الثامنة تماماً." },
            { en: "These are my brown boots.", ar: "هذه أحذيتي البنية." }
          ],
          visualPatternBlocks: ["It's [Hour] o'clock", "These are my [Clothes]"]
        }
      ],
      sentenceBuilderDrills: [
        {
          jumbledParts: ['o\'clock', "It's", 'seven'],
          correctOrder: ["It's", 'seven', 'o\'clock'],
          translationAr: 'إنها الساعة السابعة تماماً'
        },
        {
          jumbledParts: ['These', 'my', 'are', 'glasses'],
          correctOrder: ['These', 'are', 'my', 'glasses'],
          translationAr: 'هذه نظارتي'
        }
      ]
    },
    tab3_Skills: [
      {
        type: 'phonics_drill',
        instruction: 'Pronounce the SH /ʃ/ sound as in shirt and shoes:',
        prompt: 'Which clothing word begins with /ʃ/?',
        targetResponses: ['Shirt', 'Shoes'],
        scaffoldingHints: ['You wear it on your feet or body']
      },
      {
        type: 'dictation',
        instruction: 'Complete the sentence:',
        prompt: "It's three ______ (تماماً).",
        targetResponses: ["o'clock"],
        scaffoldingHints: ['Spelled o-apostrophe-c-l-o-c-k']
      }
    ],
    examSuite: {
      level1_Foundation: [
        {
          id: 'p2_u3_l1_q1',
          type: 'mcq',
          questionPrompt: 'On a sunny day, we wear a ______ on our head for shade.',
          options: ['hat', 'pencil', 'book', 'bus'],
          correctAnswer: 'hat',
          explanationAr: 'نرتدي القبعة (hat) لحماية الرأس من الشمس.',
          marks: 1
        }
      ],
      level2_Contextual: [
        {
          id: 'p2_u3_l2_q1',
          type: 'matching',
          questionPrompt: 'Telling time: "What time is it?" — "It\'s seven ______."',
          options: ["o'clock", 'boots', 'coat', 'dress'],
          correctAnswer: "o'clock",
          explanationAr: 'لتحديد الوقت بالتمام نستخدم o\'clock.',
          marks: 1
        }
      ],
      level3_AdvancedStructure: [
        {
          id: 'p2_u3_l3_q1',
          type: 'reorder',
          questionPrompt: 'Reorder: [glasses - are - my - These].',
          correctAnswer: 'These are my glasses',
          explanationAr: 'كلمة glasses تعامل معاملة الجمع: These are my glasses.',
          marks: 2
        }
      ],
      level4_MoeMockExam: [
        {
          id: 'p2_u3_l4_q1',
          type: 'mcq',
          questionPrompt: 'Practice MOE Mock: We check the current time on a wrist ______.',
          options: ['watch', 'coat', 'dress', 'hat'],
          correctAnswer: 'watch',
          explanationAr: 'ساعة اليد تسمى watch.',
          marks: 1
        }
      ],
      level5_HigherThinking: [
        {
          id: 'p2_u3_l5_q1',
          type: 'guided_sentence',
          questionPrompt: 'Describe what you wear to school: "I wear my ______ to school."',
          correctAnswer: 'school uniform',
          explanationAr: 'يكتب الطالب ملابسه المدرسية (uniform, shirt, shoes).',
          marks: 3
        }
      ]
    }
  },

  // =========================================================================
  // PRIMARY 2 - UNIT 4: Time to Play Sports! (وقت ممارسة الرياضة!)
  // =========================================================================
  {
    unitId: 'p2_t1_c_u4',
    grade: 'primary_2',
    track: 'connect',
    term: 1,
    unitNumber: 4,
    unitTitleEn: 'Time to Play Sports!',
    unitTitleAr: 'وقت ممارسة الرياضة والأفعال الحركية',
    tab1_Vocabulary: {
      words: [
        {
          id: 'p2_u4_w1',
          word: 'Football',
          phonetics: '/ˈfʊt.bɔːl/',
          arabicMeaning: 'كرة القدم',
          partOfSpeech: 'noun',
          exampleSentence: 'We play football in the sports club.',
          visualCue: 'trophy_cup'
        },
        {
          id: 'p2_u4_w2',
          word: 'Basketball',
          phonetics: '/ˈbɑː.skɪt.bɔːl/',
          arabicMeaning: 'كرة السلة',
          partOfSpeech: 'noun',
          exampleSentence: 'Throw the orange ball into the basket.',
          visualCue: 'trophy_cup'
        },
        {
          id: 'p2_u4_w3',
          word: 'Tennis',
          phonetics: '/ˈten.ɪs/',
          arabicMeaning: 'تنس',
          partOfSpeech: 'noun',
          exampleSentence: 'Hit the tennis ball with your racket.',
          visualCue: 'trophy_cup'
        },
        {
          id: 'p2_u4_w4',
          word: 'Swimming',
          phonetics: '/ˈswɪm.ɪŋ/',
          arabicMeaning: 'سباحة',
          partOfSpeech: 'noun',
          exampleSentence: 'Swimming in the cool pool is refreshing.',
          visualCue: 'trophy_cup'
        },
        {
          id: 'p2_u4_w5',
          word: 'Kick',
          phonetics: '/kɪk/',
          arabicMeaning: 'يركل الكرة بالقدم',
          partOfSpeech: 'verb',
          exampleSentence: 'Kick the ball hard into the goal.',
          visualCue: 'foot_steps'
        }
      ],
      phonics: [
        {
          letterSound: 'Blends GR /ɡr/ and PL /pl/',
          sampleWords: ['Green', 'Gray', 'Play', 'Plane'],
          rhymingPair: ['Play', 'Day']
        }
      ],
      conversationTerms: [
        { en: 'Can you kick the ball? — Yes, I can.', ar: 'هل تستطيع ركل الكرة؟ — نعم، أستطيع.' },
        { en: 'I can run fast and score a goal.', ar: 'أنا أستطيع الجري بسرعة وإحراز هدف.' },
        { en: "Let's play basketball together!", ar: "هيا نلعب كرة السلة معاً!" }
      ]
    },
    tab2_Grammar: {
      rules: [
        {
          title: "Ability with Can / Can't (Can you...? / I can...)",
          ruleExplanationAr: "للسؤال عن القدرة: Can you + مصدر الفعل؟ والإجابة: Yes, I can / No, I can't.",
          structureFormula: "Can you + [verb]? -> Yes, I can / No, I can't",
          examples: [
            { en: "Can you swim? - Yes, I can.", ar: "هل تستطيع السباحة؟ - نعم، أستطيع." },
            { en: "I can hit the ball.", ar: "أنا أستطيع ضرب الكرة." }
          ],
          visualPatternBlocks: ["Can you [Action]?", "Yes, I can / No, I can't"]
        }
      ],
      sentenceBuilderDrills: [
        {
          jumbledParts: ['can', 'I', 'swim'],
          correctOrder: ['I', 'can', 'swim'],
          translationAr: 'أنا أستطيع السباحة'
        },
        {
          jumbledParts: ['you', 'Can', 'kick', 'ball?', 'the'],
          correctOrder: ['Can', 'you', 'kick', 'the', 'ball?'],
          translationAr: 'هل تستطيع ركل الكرة؟'
        }
      ]
    },
    tab3_Skills: [
      {
        type: 'phonics_drill',
        instruction: 'Pronounce the blend /pl/ as in play and plane:',
        prompt: 'Which word starts with the /pl/ blend?',
        targetResponses: ['Play', 'Plane', 'Plate'],
        scaffoldingHints: ['Starts with p-l']
      },
      {
        type: 'dictation',
        instruction: 'Complete the response:',
        prompt: 'Can you run fast? — Yes, I ______.',
        targetResponses: ['can'],
        scaffoldingHints: ['Spelled c-a-n']
      }
    ],
    examSuite: {
      level1_Foundation: [
        {
          id: 'p2_u4_l1_q1',
          type: 'mcq',
          questionPrompt: 'In football, players use their feet to ______ the ball.',
          options: ['kick', 'read', 'draw', 'sleep'],
          correctAnswer: 'kick',
          explanationAr: 'في كرة القدم يركل اللاعبون الكرة (kick).',
          marks: 1
        }
      ],
      level2_Contextual: [
        {
          id: 'p2_u4_l2_q1',
          type: 'matching',
          questionPrompt: 'Can you swim? — "Yes, I ______."',
          options: ['can', 'am', 'is', 'have'],
          correctAnswer: 'can',
          explanationAr: 'الإجابة المثبتة عن سؤال Can you هي Yes, I can.',
          marks: 1
        }
      ],
      level3_AdvancedStructure: [
        {
          id: 'p2_u4_l3_q1',
          type: 'reorder',
          questionPrompt: 'Reorder: [play - I - tennis - can].',
          correctAnswer: 'I can play tennis',
          explanationAr: 'الترتيب الصحيح: I can play tennis.',
          marks: 2
        }
      ],
      level4_MoeMockExam: [
        {
          id: 'p2_u4_l4_q1',
          type: 'mcq',
          questionPrompt: 'Practice MOE Mock: In tennis, players hit the ball with a ______.',
          options: ['racket', 'book', 'bag', 'clock'],
          correctAnswer: 'racket',
          explanationAr: 'يضرب لاعبو التنس الكرة بالمضرب (racket).',
          marks: 1
        }
      ],
      level5_HigherThinking: [
        {
          id: 'p2_u4_l5_q1',
          type: 'guided_sentence',
          questionPrompt: 'Write your favourite sport: "My favourite sport is ______."',
          correctAnswer: 'football',
          explanationAr: 'يكتب الطالب رياضته المفضلة.',
          marks: 3
        }
      ]
    }
  },

  // =========================================================================
  // PRIMARY 2 - UNIT 5: My Day (يومي)
  // =========================================================================
  {
    unitId: 'p2_t1_c_u5',
    grade: 'primary_2',
    track: 'connect',
    term: 1,
    unitNumber: 5,
    unitTitleEn: 'My Day',
    unitTitleAr: 'يومي والروتين اليومي',
    tab1_Vocabulary: {
      words: [
        {
          id: 'p2_u5_w1',
          word: 'Wake up',
          phonetics: '/weɪk ʌp/',
          arabicMeaning: 'يستيقظ من النوم',
          partOfSpeech: 'verb',
          exampleSentence: 'I wake up at six o’clock in the morning.',
          visualCue: 'clock_alarm'
        },
        {
          id: 'p2_u5_w2',
          word: 'Eat breakfast',
          phonetics: '/iːt ˈbrek.fəst/',
          arabicMeaning: 'يتناول وجبة الإفطار',
          partOfSpeech: 'phrase',
          exampleSentence: 'I eat healthy breakfast with my family.',
          visualCue: 'food_lunch'
        },
        {
          id: 'p2_u5_w3',
          word: 'Drink tea with milk',
          phonetics: '/drɪŋk tiː wɪð mɪlk/',
          arabicMeaning: 'يشرب الشاي بالحليب',
          partOfSpeech: 'phrase',
          exampleSentence: 'Grandfather drinks tea with milk every morning.',
          visualCue: 'food_lunch'
        },
        {
          id: 'p2_u5_w4',
          word: 'Go to school',
          phonetics: '/ɡəʊ tuː skuːl/',
          arabicMeaning: 'يذهب إلى المدرسة',
          partOfSpeech: 'phrase',
          exampleSentence: 'We walk and go to school at seven o’clock.',
          visualCue: 'school_bag'
        },
        {
          id: 'p2_u5_w5',
          word: 'Play with friends',
          phonetics: '/pleɪ wɪð frendz/',
          arabicMeaning: 'يلعب مع الأصدقاء',
          partOfSpeech: 'phrase',
          exampleSentence: 'At break time, I play with friends happily.',
          visualCue: 'friends_group'
        }
      ],
      phonics: [
        {
          letterSound: 'Blends CL /kl/ and FL /fl/',
          sampleWords: ['Clock', 'Classroom', 'Flag', 'Flower'],
          rhymingPair: ['Clock', 'Rock']
        }
      ],
      conversationTerms: [
        { en: 'What time do you wake up? — At 6 o’clock.', ar: 'في أي وقت تستيقظ؟ — في الساعة السادسة.' },
        { en: 'I wash my face and brush my teeth.', ar: 'أغسل وجهي وأنظف أسناني بالفرشاة.' },
        { en: 'I go home at half past two.', ar: 'أعود للمنزل في الثانية والنصف.' }
      ]
    },
    tab2_Grammar: {
      rules: [
        {
          title: "Present Simple Routine & Half past (I + base verb at [time])",
          ruleExplanationAr: "للتعبير عن الروتين اليومي: I + الفعل في المصدر + at + الوقت. وللساعة والنصف: half past + [الساعة].",
          structureFormula: "I + [Verb] + at + [Time] (e.g., half past seven)",
          examples: [
            { en: "I wake up at six o'clock.", ar: "أستيقظ في الساعة السادسة." },
            { en: "It's half past seven.", ar: "إنها السابعة والنصف." }
          ],
          visualPatternBlocks: ["I [Action] at [Time]", "It's half past [Hour]"]
        }
      ],
      sentenceBuilderDrills: [
        {
          jumbledParts: ['up', 'wake', 'at', 'I', 'six'],
          correctOrder: ['I', 'wake', 'up', 'at', 'six'],
          translationAr: 'أنا أستيقظ في السادسة'
        },
        {
          jumbledParts: ['past', "It's", 'half', 'two'],
          correctOrder: ["It's", 'half', 'past', 'two'],
          translationAr: 'إنها الثانية والنصف'
        }
      ]
    },
    tab3_Skills: [
      {
        type: 'phonics_drill',
        instruction: 'Recognize the /kl/ blend in Clock and Classroom:',
        prompt: 'Which word starts with /kl/?',
        targetResponses: ['Clock', 'Classroom', 'Clean'],
        scaffoldingHints: ['Tells the time on the wall']
      },
      {
        type: 'dictation',
        instruction: 'Complete the sentence:',
        prompt: 'I eat ______ (الإفطار) in the morning.',
        targetResponses: ['breakfast'],
        scaffoldingHints: ['First meal of the day']
      }
    ],
    examSuite: {
      level1_Foundation: [
        {
          id: 'p2_u5_l1_q1',
          type: 'mcq',
          questionPrompt: 'The first meal we eat in the morning is ______.',
          options: ['breakfast', 'dinner', 'cake', 'ice cream'],
          correctAnswer: 'breakfast',
          explanationAr: 'وجبة الصباح هي الإفطار (breakfast).',
          marks: 1
        }
      ],
      level2_Contextual: [
        {
          id: 'p2_u5_l2_q1',
          type: 'matching',
          questionPrompt: 'Complete: "I wake ______ at six o’clock."',
          options: ['up', 'in', 'on', 'at'],
          correctAnswer: 'up',
          explanationAr: 'يستيقظ من النوم هي wake up.',
          marks: 1
        }
      ],
      level3_AdvancedStructure: [
        {
          id: 'p2_u5_l3_q1',
          type: 'reorder',
          questionPrompt: 'Reorder: [school - go - to - I].',
          correctAnswer: 'I go to school',
          explanationAr: 'الترتيب الصحيح: I go to school.',
          marks: 2
        }
      ],
      level4_MoeMockExam: [
        {
          id: 'p2_u5_l4_q1',
          type: 'mcq',
          questionPrompt: 'Practice MOE Mock: "Half past two" means ______.',
          options: ['2:30', '2:00', '3:00', '12:00'],
          correctAnswer: '2:30',
          explanationAr: 'Half past two تعني الثانية وثلاثون دقيقة (2:30).',
          marks: 1
        }
      ],
      level5_HigherThinking: [
        {
          id: 'p2_u5_l5_q1',
          type: 'guided_sentence',
          questionPrompt: 'Write what time you wake up: "I wake up at ______ o\'clock."',
          correctAnswer: 'six',
          explanationAr: 'يكتب الطالب ساعة استيقاظه.',
          marks: 3
        }
      ]
    }
  },

  // =========================================================================
  // PRIMARY 2 - UNIT 6: Healthy Habits (عادات صحية)
  // =========================================================================
  {
    unitId: 'p2_t1_c_u6',
    grade: 'primary_2',
    track: 'connect',
    term: 1,
    unitNumber: 6,
    unitTitleEn: 'Healthy Habits',
    unitTitleAr: 'عادات صحية والتغذية السليمة',
    tab1_Vocabulary: {
      words: [
        {
          id: 'p2_u6_w1',
          word: 'Wash hands',
          phonetics: '/wɒʃ hændz/',
          arabicMeaning: 'يغسل يديه بالماء والصابون',
          partOfSpeech: 'phrase',
          exampleSentence: 'Always wash your hands before eating.',
          visualCue: 'hand_wave'
        },
        {
          id: 'p2_u6_w2',
          word: 'Brush teeth',
          phonetics: '/brʌʃ tiːθ/',
          arabicMeaning: 'ينظف أسنانه بالفرشاة',
          partOfSpeech: 'phrase',
          exampleSentence: 'Brush your teeth in the morning and at night.',
          visualCue: 'happy_face'
        },
        {
          id: 'p2_u6_w3',
          word: 'Vegetables',
          phonetics: '/ˈvedʒ.tə.bəlz/',
          arabicMeaning: 'خضراوات طازجة',
          partOfSpeech: 'noun',
          exampleSentence: 'Carrots and cucumbers are healthy vegetables.',
          visualCue: 'food_lunch'
        },
        {
          id: 'p2_u6_w4',
          word: 'Clean water',
          phonetics: '/kliːn ˈwɔː.tər/',
          arabicMeaning: 'مياه نظيفة ونقية',
          partOfSpeech: 'phrase',
          exampleSentence: 'Drink plenty of clean water every day.',
          visualCue: 'water_bottle'
        },
        {
          id: 'p2_u6_w5',
          word: 'Sleep',
          phonetics: '/sliːp/',
          arabicMeaning: 'ينام نوماً كافياً',
          partOfSpeech: 'verb',
          exampleSentence: 'Children should sleep eight hours every night.',
          visualCue: 'clock_alarm'
        }
      ],
      phonics: [
        {
          letterSound: 'Long E vowel /iː/ (EE and EA)',
          sampleWords: ['Sleep', 'Green', 'Meet', 'Clean', 'Eat'],
          rhymingPair: ['Sleep', 'Deep']
        }
      ],
      conversationTerms: [
        { en: 'Eat healthy food to be strong.', ar: 'تناول طعاماً صحياً لتكون قوياً.' },
        { en: 'Drink clean water and exercise.', ar: 'اشرب مياهاً نظيفة ومارس الرياضة.' },
        { en: 'Don’t stay up late!', ar: 'لا تسهر لوقت متأخر!' }
      ]
    },
    tab2_Grammar: {
      rules: [
        {
          title: "Imperatives for Healthy Instructions (Eat... / Don't eat...)",
          ruleExplanationAr: "لإعطاء نصيحة أو تعليمات صحية نستخدم الفعل في المصدر: Eat healthy food / Wash your hands. وللنهي: Don't + مصدر الفعل.",
          structureFormula: "[Base Verb] + ... | Don't + [Base Verb] + ...",
          examples: [
            { en: "Wash your hands before eating.", ar: "اغسل يديك قبل الأكل." },
            { en: "Don't eat too much candy.", ar: "لا تأكل الكثير من الحلوى." }
          ],
          visualPatternBlocks: ["Do this: [Verb]...", "Don't do: Don't [Verb]..."]
        }
      ],
      sentenceBuilderDrills: [
        {
          jumbledParts: ['hands', 'Wash', 'your'],
          correctOrder: ['Wash', 'your', 'hands'],
          translationAr: 'اغسل يديك'
        },
        {
          jumbledParts: ['healthy', 'Eat', 'food'],
          correctOrder: ['Eat', 'healthy', 'food'],
          translationAr: 'تناول طعاماً صحياً'
        }
      ]
    },
    tab3_Skills: [
      {
        type: 'phonics_drill',
        instruction: 'Pronounce the long vowel /iː/ in Sleep, Green, and Clean:',
        prompt: 'Which word contains the long /iː/ vowel sound?',
        targetResponses: ['Sleep', 'Clean', 'Eat'],
        scaffoldingHints: ['Sounds like ee']
      },
      {
        type: 'dictation',
        instruction: 'Complete the healthy instruction:',
        prompt: 'Drink clean ______ (ماء).',
        targetResponses: ['water'],
        scaffoldingHints: ['Spelled w-a-t-e-r']
      }
    ],
    examSuite: {
      level1_Foundation: [
        {
          id: 'p2_u6_l1_q1',
          type: 'mcq',
          questionPrompt: 'To keep our bodies healthy, we must drink clean ______.',
          options: ['water', 'cola', 'tea', 'ink'],
          correctAnswer: 'water',
          explanationAr: 'شرب المياه النظيفة (clean water) ضروري لصحة الجسم.',
          marks: 1
        }
      ],
      level2_Contextual: [
        {
          id: 'p2_u6_l2_q1',
          type: 'matching',
          questionPrompt: 'Healthy habit: "______ your teeth twice a day."',
          options: ['Brush', 'Write', 'Play', 'Kick'],
          correctAnswer: 'Brush',
          explanationAr: 'تنظيف الأسنان بالفرشاة هو Brush your teeth.',
          marks: 1
        }
      ],
      level3_AdvancedStructure: [
        {
          id: 'p2_u6_l3_q1',
          type: 'reorder',
          questionPrompt: 'Reorder: [food - healthy - Eat].',
          correctAnswer: 'Eat healthy food',
          explanationAr: 'الترتيب الصحيح لصيغة الأمر: Eat healthy food.',
          marks: 2
        }
      ],
      level4_MoeMockExam: [
        {
          id: 'p2_u6_l4_q1',
          type: 'mcq',
          questionPrompt: 'Practice MOE Mock: Fresh vegetables and fruits are examples of ______ food.',
          options: ['healthy', 'bad', 'dirty', 'heavy'],
          correctAnswer: 'healthy',
          explanationAr: 'الخضروات والفواكه طعام صحي (healthy food).',
          marks: 1
        }
      ],
      level5_HigherThinking: [
        {
          id: 'p2_u6_l5_q1',
          type: 'guided_sentence',
          questionPrompt: 'Write one healthy habit you do every day: "Every day, I ______."',
          correctAnswer: 'wash my hands and sleep early',
          explanationAr: 'يكتب الطالب عادة صحية يقوم بها.',
          marks: 3
        }
      ]
    }
  }
];
