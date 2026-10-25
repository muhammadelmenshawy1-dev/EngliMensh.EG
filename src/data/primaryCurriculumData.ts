import { GradeCurriculumCatalog, UnitCurriculum } from '../types/curriculum.ts';

// Helper to create age-appropriate, beautifully structured Primary units (Connect 1 - 6)
function createPrimaryUnit(
  grade: number,
  gradeLabel: string,
  semester: 1 | 2,
  unitNumber: number,
  unitTitle: string,
  unitTitleAr: string,
  theme: string,
  grammarRule: string,
  grammarRuleAr: string,
  grammarExplanation: string,
  grammarExamples: string[],
  keyWords: { word: string; pos: string; ar: string; def: string; ex: string; exAr: string }[],
  collocations: { phrase: string; meaningAr: string; example: string }[],
  readingPassage: string,
  readingAr: string,
  dialogueTranscript: string
): UnitCurriculum {
  return {
    stage: 'Primary',
    grade,
    gradeLabel,
    track: 'Connect',
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
      exercises: [
        {
          id: `pri_g${grade}_u${unitNumber}_v1`,
          skill: 'Vocabulary',
          question: `What is the meaning of the word "${keyWords[0]?.word}" in Arabic?`,
          options: [keyWords[0]?.ar || 'الكلمة الأولى', 'سيارة سريعة', 'طعام صحي', 'حديقة عامة'],
          correctAnswer: 'A',
          explanation: `The word "${keyWords[0]?.word}" means "${keyWords[0]?.ar}".`
        },
        {
          id: `pri_g${grade}_u${unitNumber}_v2`,
          skill: 'Vocabulary',
          question: `Complete the sentence: "${keyWords[1]?.ex || 'Sentence'}"`,
          options: [keyWords[1]?.word || 'Word', 'pencil', 'elephant', 'computer'],
          correctAnswer: 'A',
          explanation: `The correct target word is "${keyWords[1]?.word}".`
        },
        {
          id: `pri_g${grade}_u${unitNumber}_v3`,
          skill: 'Vocabulary',
          question: `Which item belongs to ${theme}?`,
          options: [keyWords[2]?.word || 'Item', 'spaceship', 'submarine', 'satellite'],
          correctAnswer: 'A',
          explanation: `"${keyWords[2]?.word}" relates directly to ${theme}.`
        }
      ]
    },
    grammarModule: {
      ruleName: grammarRule,
      ruleNameAr: grammarRuleAr,
      explanationSummary: grammarExplanation,
      detailedRules: [
        {
          title: 'Easy Grammar Rule (قاعدة مبسطة وموضحة للأبطال الصغار)',
          explanation: grammarExplanation,
          examples: grammarExamples
        }
      ],
      exercises: [
        {
          id: `pri_g${grade}_u${unitNumber}_g1`,
          skill: 'Grammar',
          question: `Choose the correct form according to: ${grammarRule}`,
          options: [grammarExamples[0] || 'Correct sentence', 'He not like it', 'They is happy', 'She have three cat'],
          correctAnswer: 'A',
          explanation: `The model sentence is: "${grammarExamples[0]}".`
        },
        {
          id: `pri_g${grade}_u${unitNumber}_g2`,
          skill: 'Grammar',
          question: `Which sentence is grammatically correct?`,
          options: [grammarExamples[1] || 'Second correct model', 'I is a student', 'We plays football', 'She do not run'],
          correctAnswer: 'A',
          explanation: 'Choice A follows proper grammatical agreement.'
        }
      ]
    },
    readingModule: {
      passageTitle: `${unitTitle} (قصة القراءة المصورة)`,
      passage: readingPassage,
      criticalThinkingFocus: `Observation and comprehension for ${theme}`,
      questions: [
        {
          id: `pri_g${grade}_u${unitNumber}_r1`,
          skill: 'Reading',
          question: `What is the main topic of this story?`,
          options: [theme, 'Playing video games all night', 'Building airplanes in space', 'Driving heavy trucks'],
          correctAnswer: 'A',
          explanation: `The passage describes ${theme}.`
        },
        {
          id: `pri_g${grade}_u${unitNumber}_r2`,
          skill: 'Reading',
          question: `What positive value do we learn from this lesson?`,
          options: ['Kindness, curiosity, and good habits', 'Being lazy and staying in bed', 'Wasting food and water', 'Ignoring friends'],
          correctAnswer: 'A',
          explanation: 'The unit fosters positive values and healthy habits.'
        }
      ]
    },
    listeningModule: {
      audioTitle: `${unitTitle}: Fun Classroom Dialogue`,
      speakerRoles: 'Hany & Amira (Classmates)',
      transcript: dialogueTranscript,
      durationApprox: '2 mins',
      questions: [
        {
          id: `pri_g${grade}_u${unitNumber}_l1`,
          skill: 'Listening',
          question: 'What are the children talking about in the conversation?',
          options: [unitTitle, 'Buying a giant yacht', 'Watching a scary movie', 'Sleeping in class'],
          correctAnswer: 'A',
          explanation: `The speakers practice the themes of ${unitTitle}.`
        }
      ]
    },
    unitExam: {
      examId: `pri_g${grade}_u${unitNumber}_exam`,
      examTitle: `${gradeLabel} - Unit ${unitNumber} Fun Exam: ${unitTitle}`,
      examTitleAr: `امتحان تقييم ممتع - ${gradeLabel} - الوحدة ${unitNumber}`,
      durationMinutes: 20,
      totalMarks: 20,
      questions: [
        {
          id: `pri_g${grade}_u${unitNumber}_e1`,
          skill: 'Vocabulary',
          question: `What is "${keyWords[0]?.word}" in Arabic?`,
          options: [keyWords[0]?.ar || 'المعنى', 'شجرة', 'سيارة', 'قلم'],
          correctAnswer: 'A',
          explanation: `"${keyWords[0]?.word}" means ${keyWords[0]?.ar}.`
        },
        {
          id: `pri_g${grade}_u${unitNumber}_e2`,
          skill: 'Grammar',
          question: `Choose the correct option:`,
          options: [grammarExamples[0] || 'Correct model', 'Option B', 'Option C', 'Option D'],
          correctAnswer: 'A',
          explanation: 'Follows the lesson grammar rule.'
        },
        {
          id: `pri_g${grade}_u${unitNumber}_e3`,
          skill: 'Reading',
          question: `In our lesson about ${theme}, we learned that:`,
          options: ['Good habits help us grow healthy and smart', 'We should never do homework', 'Vegetables are not good', 'We shouldn’t help our family'],
          correctAnswer: 'A',
          explanation: 'Learning about good habits helps us grow healthy.'
        },
        {
          id: `pri_g${grade}_u${unitNumber}_e4`,
          skill: 'Vocabulary',
          question: `Choose the right word: "${keyWords[2]?.def || 'Definition'}"`,
          options: [keyWords[2]?.word || 'Word', 'computer', 'aeroplane', 'dinosaur'],
          correctAnswer: 'A',
          explanation: `The correct word is ${keyWords[2]?.word}.`
        }
      ]
    }
  };
}

// ------------------------------------------------------------------------------------------------
// PRIMARY 1 TO 6 CATALOG (CONNECT SERIES - OFFICIAL EGYPTIAN MOE CURRICULUM)
// ------------------------------------------------------------------------------------------------
export const primaryCurriculumCatalog: GradeCurriculumCatalog[] = [
  // Primary 1 (Grade 1 - Connect 1)
  {
    stage: 'Primary',
    grade: 1,
    gradeLabel: 'Primary 1 - الصف الأول الابتدائي',
    gradeLabelAr: 'الصف الأول الابتدائي (Connect 1 - المنهج الوزاري الجديد)',
    track: 'Connect',
    description: 'Foundational English phonics, letter sounds (B, P, H, N), polite greetings, school objects, colors, and loving family members.',
    semesters: [
      {
        semester: 1,
        semesterLabel: 'Term 1 - الفصل الدراسي الأول (Connect 1)',
        units: [
          createPrimaryUnit(
            1, 'Primary 1', 1, 1, 'Hello!', 'أهلاً بكم والتعريف بالنفس',
            'Greetings, Introducing Oneself, Phonics (Letter B)',
            'Verb to BE: "I am / I’m + Name"', 'استخدام I am لتقديم النفس',
            'To tell someone your name, say: "I am + your name" or "Hello, I’m Hany!" To ask someone their name, say: "What’s your name?"',
            ['Hello! I am Hany. (مرحباً! أنا هاني)', 'I’m Miss Mona. What’s your name? (أنا مس منى. ما اسمك؟)', 'Goodbye, Amira! (مع السلامة يا أميرة)'],
            [
              { word: 'hello', pos: 'interj.', ar: 'مرحباً / أهلاً', def: 'A friendly greeting when meeting someone.', ex: 'Hello! Welcome to our school.', exAr: 'مرحباً! أهلاً بكم في مدرستنا.' },
              { word: 'goodbye', pos: 'interj.', ar: 'مع السلامة / وداعاً', def: 'Said when leaving or parting from friends.', ex: 'Goodbye, see you tomorrow!', exAr: 'مع السلامة، أراك غداً!' },
              { word: 'teacher', pos: 'n.', ar: 'معلم / معلمة', def: 'A person who helps students learn in class.', ex: 'Miss Mona is our kind English teacher.', exAr: 'مس منى هي معلمة اللغة الإنجليزية اللطيفة.' },
              { word: 'bag', pos: 'n.', ar: 'حقيبة مدرسية', def: 'A container used to carry school books.', ex: 'My school bag is blue and yellow.', exAr: 'حقيبتي المدرسية لونها أزرق وأصفر.' },
              { word: 'book', pos: 'n.', ar: 'كتاب القراءة', def: 'Pages with words and pictures to read.', ex: 'Open your English book, please.', exAr: 'افتح كتاب اللغة الإنجليزية من فضلك.' },
              { word: 'pen', pos: 'n.', ar: 'قلم حبر جاف', def: 'An instrument used for writing with ink.', ex: 'I write neatly with my blue pen.', exAr: 'أنا أكتب بخط جميل بقلمي الأزرق.' },
              { word: 'pencil', pos: 'n.', ar: 'قلم رصاص', def: 'A wooden instrument used for drawing and writing.', ex: 'Sharpen your pencil before drawing.', exAr: 'ابْرِ قلمك الرصاص قبل أن ترسم.' },
              { word: 'busy bee', pos: 'n.', ar: 'النحلة النشيطة (شخصية المنهج)', def: 'The cheerful character that teaches letter sounds.', ex: 'The Busy Bee teaches us fun letter sounds.', exAr: 'النحلة النشيطة تعلمنا أصوات الحروف الممتعة.' },
              { word: 'blue', pos: 'adj.', ar: 'اللون الأزرق', def: 'The color of the clear sky and Nile waters.', ex: 'The sky is a bright blue today.', exAr: 'السماء زرقاء ومشرقة اليوم.' },
              { word: 'yellow', pos: 'adj.', ar: 'اللون الأصفر', def: 'The bright sunny color of the warm sun.', ex: 'The sun is warm and yellow.', exAr: 'الشمس دافئة ولونها أصفر.' },
              { word: 'red', pos: 'adj.', ar: 'اللون الأحمر', def: 'The cheerful color of ripe red apples.', ex: 'I eat a tasty red apple every morning.', exAr: 'أتناول تفاحة حمراء لذيذة كل صباح.' },
              { word: 'green', pos: 'adj.', ar: 'اللون الأخضر', def: 'The color of fresh tree leaves and grass.', ex: 'The grass in the park is fresh and green.', exAr: 'العشب في الحديقة نضر وأخضر.' }
            ],
            [
              { phrase: 'shake hands', meaningAr: 'يصافح باليد بأدب', example: 'Hany and Youssef shake hands cheerfully.' },
              { phrase: 'open your bag', meaningAr: 'افتح حقيبتك المدرسية', example: 'Open your bag and take out your book.' },
              { phrase: 'close your book', meaningAr: 'أغلق كتابك المدرسي', example: 'Close your book when the lesson is finished.' }
            ],
            'Welcome to Primary 1! Miss Mona smiles at the classroom door. "Hello, children! I am Miss Mona." Hany smiles and waves his hand. "Hello, Miss Mona! I am Hany." Amira opens her red bag and takes out her pencil. "Look! It is a blue pen." The children shake hands and play happily together.',
            'أهلاً بكم في الصف الأول! تبتسم مس منى عند باب الفصل وتقول: "مرحباً يا أطفال! أنا مس منى." يبتسم هاني ويقول: "مرحباً يا مس منى! أنا هاني." تفتح أميرة حقيبتها الحمراء وتخرج قلمها الرصاص.',
            'Miss Mona: "Hello! What’s your name?"\nHany: "Hello, Miss Mona! I am Hany."\nMiss Mona: "Nice to meet you, Hany. Open your bag, please."\nHany: "Yes, Miss Mona. Here is my book and pencil."'
          ),
          createPrimaryUnit(
            1, 'Primary 1', 1, 2, 'My School Bag', 'حقيبتي المدرسية وأدواتي',
            'Classroom stationery, pencil case, counting 1 to 5',
            'Demonstratives: "What’s this? It’s a / an..."', 'السؤال والإشارة للمفرد القريب',
            'Use "What’s this?" to ask about an object near you. Answer with "It’s a + object". (e.g., It’s a pen / It’s an eraser).',
            ['What’s this? It’s a pencil. (ما هذا؟ إنه قلم رصاص)', 'It’s a red pencil case. (إنها مقلمة حمراء)', 'I have one ruler and two pens. (لدي مسطرة واحدة وقلمان)'],
            [
              { word: 'pencil case', pos: 'n.', ar: 'مقلمة للأدوات', def: 'A small bag used to store pencils and pens.', ex: 'Put your crayons inside your pencil case.', exAr: 'ضع ألوانك الخشبية داخل مقلمتك.' },
              { word: 'ruler', pos: 'n.', ar: 'مسطرة للقياس والتسطير', def: 'A straight plastic strip used to measure and draw lines.', ex: 'Draw a straight line with your ruler.', exAr: 'ارسم خطاً مستقيماً باستخدام مسطرتك.' },
              { word: 'sharpener', pos: 'n.', ar: 'براية أقلام', def: 'A tool used to sharpen pencils to a fine point.', ex: 'My sharpener makes my pencil sharp.', exAr: 'برايتي تجعل سن القلم الرصاص حاداً ومضبوطاً.' },
              { word: 'eraser', pos: 'n.', ar: 'ممحاة / أستيكة', def: 'A rubber tool used to remove pencil marks.', ex: 'Use your eraser to fix the mistake.', exAr: 'استخدم الممحاة لتصحيح الخطأ.' },
              { word: 'one', pos: 'num.', ar: 'الرقم واحد (1)', def: 'The number 1.', ex: 'I have one nose and one mouth.', exAr: 'لدي أنف واحد وفم واحد.' },
              { word: 'two', pos: 'num.', ar: 'الرقم اثنان (2)', def: 'The number 2.', ex: 'I have two eyes to see clearly.', exAr: 'لدي عينان اثنتان لأرى بهما بوضوح.' },
              { word: 'three', pos: 'num.', ar: 'الرقم ثلاثة (3)', def: 'The number 3.', ex: 'Look at the three blue birds.', exAr: 'انظر إلى العصافير الزرقاء الثلاثة.' },
              { word: 'four', pos: 'num.', ar: 'الرقم أربعة (4)', def: 'The number 4.', ex: 'A table has four strong legs.', exAr: 'المنضدة لها أربعة أرجل قوية.' },
              { word: 'five', pos: 'num.', ar: 'الرقم خمسة (5)', def: 'The number 5.', ex: 'I have five fingers on my hand.', exAr: 'لدي خمسة أصابع في يدي.' }
            ],
            [
              { phrase: 'count with me', meaningAr: 'عد واحسب معي', example: 'Count with me: one, two, three, four, five!' },
              { phrase: 'point to the pen', meaningAr: 'أشر إلى القلم', example: 'Point to the pencil on your school desk.' }
            ],
            'Youssef sits at his desk. "What’s this, Amira?" Amira smiles. "It is my new sharpener! It is green." Youssef counts his pencils: "One, two, three pencils in my pencil case." Learning in our classroom is so much fun!',
            'يجلس يوسف على مقعده ويسأل أميرة: "ما هذا يا أميرة؟" تبتسم أميرة: "إنها برايتي الجديدة ولونها أخضر!" يعد يوسف أقلامه: "واحد، اثنان، ثلاثة أقلام في مقلمتي!"',
            'Youssef: "What’s this in your hand, Amira?"\nAmira: "It’s a ruler. I use it for math."\nYoussef: "How many pens do you have?"\nAmira: "I have two pens: one red and one blue!"'
          ),
          createPrimaryUnit(
            1, 'Primary 1', 1, 3, 'My Family', 'عائلتي الحبيبة والتعاون في المنزل',
            'Family members, helping parents, kindness',
            'Possessives: "This is my father / mother"', 'الإشارة لأفراد العائلة',
            'Use "This is my + family member" to politely introduce your beloved family members.',
            ['This is my mother. (هذه أمي الحبيبة)', 'This is my father. He is kind. (هذا أبي. إنه عطوف)', 'This is my sister, Hannah. (هذه أختي هنا)'],
            [
              { word: 'father', pos: 'n.', ar: 'الأب', def: 'A male parent who cares for his children.', ex: 'My father helps me read my school story.', exAr: 'يساعدني أبي في قراءة قصة المدرسة.' },
              { word: 'mother', pos: 'n.', ar: 'الأم', def: 'A female parent full of love and warmth.', ex: 'My mother prepares healthy, delicious food.', exAr: 'تعد أمي طعاماً صحياً ولذيذاً.' },
              { word: 'brother', pos: 'n.', ar: 'الأخ', def: 'A boy who has the same parents as you.', ex: 'My brother plays with me in the garden.', exAr: 'يلعب أخي معي في الحديقة.' },
              { word: 'sister', pos: 'n.', ar: 'الأخت', def: 'A girl who has the same parents as you.', ex: 'My sister Hannah is sweet and cheerful.', exAr: 'أختي هنا لطيفة ومرحة.' },
              { word: 'grandfather', pos: 'n.', ar: 'الجد', def: 'The father of your father or mother.', ex: 'My grandfather tells us wonderful bedtime tales.', exAr: 'يحكي لنا جدي حكايات نوم رائعة.' },
              { word: 'grandmother', pos: 'n.', ar: 'الجدة', def: 'The mother of your father or mother.', ex: 'My grandmother gives me warm hugs.', exAr: 'تغمرني جدتي بالحنان والأحضان الدافئة.' },
              { word: 'family', pos: 'n.', ar: 'الأسرة والعائلة', def: 'Parents and children living together with love.', ex: 'I love my family very much.', exAr: 'أنا أحب عائلتي كثيراً جداً.' }
            ],
            [
              { phrase: 'help my family', meaningAr: 'أساعد عائلتي في المنزل', example: 'I help my family tidy up the living room.' },
              { phrase: 'have tea together', meaningAr: 'نشرب الشاي معاً بمودة', example: 'Grandpa and Grandma have warm mint tea together.' }
            ],
            'Today is Friday! Hannah and Hany are at home. "Look, Amira, this is my grandfather! He is wearing his glasses." Mother brings warm tea to grandmother. Hany helps his father water the green plants on the balcony. We love our caring family.',
            'اليوم هو الجمعة! هنا وهاني في المنزل مع الجد والجدة. تساعد أميرة الأم في تقديم الشاي، بينما يساعد هاني والده في سقي نباتات الشرفة الخضراء.',
            'Hannah: "Hello, Amira! Come in. This is my grandmother."\nAmira: "Good morning, Grandmother!"\nGrandmother: "Good morning, Amira. Welcome to our home!"'
          )
        ]
      },
      {
        semester: 2,
        semesterLabel: 'Term 2 - الفصل الدراسي الثاني (Connect 1)',
        units: [
          createPrimaryUnit(
            1, 'Primary 1', 2, 4, 'It’s My Birthday!', 'إنه عيد ميلادي والأعداد',
            'Numbers 6 to 10, birthday candles, cake, ages',
            'Asking Age: "How old are you? I’m six."', 'السؤال عن العمر والأعداد',
            'To ask age: "How old are you?" Answer: "I am / I’m + age" (e.g. I’m six years old).',
            ['How old are you? I’m seven! (كم عمرك؟ عمري سبع سنوات)', 'There are six candles on the cake. (توجد ست شمعات على الكعكة)'],
            [
              { word: 'cake', pos: 'n.', ar: 'كعكة وتورتة لذيذة', def: 'A sweet baked birthday dessert.', ex: 'The birthday cake has chocolate and strawberries.', exAr: 'تورتة عيد الميلاد عليها شوكولاتة وفراولة.' },
              { word: 'candle', pos: 'n.', ar: 'شمعة مضيئة', def: 'A stick of wax burned to give light on birthdays.', ex: 'Blow out the seven candles on the cake!', exAr: 'أطفئ الشمعات السبع على التورتة!' },
              { word: 'present', pos: 'n.', ar: 'هدية جميلة', def: 'A gift given to someone on a special day.', ex: 'Thank you for the lovely birthday present!', exAr: 'شكراً لك على الهدية الرائعة في عيد ميلادي!' },
              { word: 'card', pos: 'n.', ar: 'بطاقة تهنئة ملونة', def: 'A paper card with best wishes written inside.', ex: 'I made a colorful birthday card for my friend.', exAr: 'صنعت بطاقة تهنئة ملونة لصديقي.' },
              { word: 'six', pos: 'num.', ar: 'الرقم ستة (6)', def: 'The number 6.', ex: 'I have six colored pencils.', exAr: 'لدي ستة أقلام تلوين.' },
              { word: 'seven', pos: 'num.', ar: 'الرقم سبعة (7)', def: 'The number 7.', ex: 'Hannah is seven years old today.', exAr: 'عمر هنا سبع سنوات اليوم.' },
              { word: 'eight', pos: 'num.', ar: 'الرقم ثمانية (8)', def: 'The number 8.', ex: 'There are eight balloons in the room.', exAr: 'يوجد ثمانية بالونات في الغرفة.' },
              { word: 'nine', pos: 'num.', ar: 'الرقم تسعة (9)', def: 'The number 9.', ex: 'Count up to nine with me.', exAr: 'عُد حتى الرقم تسعة معي.' },
              { word: 'ten', pos: 'num.', ar: 'الرقم عشرة (10)', def: 'The number 10.', ex: 'Ten cheerful friends sing Happy Birthday!', exAr: 'عشرة أصدقاء يغنون أغنية عيد الميلاد بمرح!' }
            ],
            [
              { phrase: 'blow out the candles', meaningAr: 'يطفئ شمعات الكعكة', example: 'Make a wish and blow out the candles!' },
              { phrase: 'sing happy birthday', meaningAr: 'يغني أغنية عيد الميلاد', example: 'We all sing happy birthday to Youssef.' }
            ],
            'Happy Birthday, Youssef! Youssef is wearing a party hat. There are seven yellow candles on the sweet chocolate cake. All his friends clap their hands. "Happy Birthday to you, Youssef!" Youssef makes a wish and blows out the candles happily.',
            'عيد ميلاد سعيد يا يوسف! يوسف يرتدي قبعة الحفلة، وهناك سبع شمعات على الكعكة. يصفق الأصدقاء بحرارة ويغنون معاً في جو من البهجة.',
            'Amira: "Happy Birthday, Youssef! How old are you today?"\nYoussef: "Thank you, Amira! I am seven years old today."\nAmira: "Here is a colorful present for you!"'
          )
        ]
      }
    ]
  },

  // Primary 2 (Grade 2 - Connect 2)
  {
    stage: 'Primary',
    grade: 2,
    gradeLabel: 'Primary 2 - الصف الثاني الابتدائي',
    gradeLabelAr: 'الصف الثاني الابتدائي (Connect 2)',
    track: 'Connect',
    description: 'Human body parts, five senses, extended family, animal adaptations, daily routines, and healthy food habits.',
    semesters: [
      {
        semester: 1,
        semesterLabel: 'Term 1 - الفصل الدراسي الأول (Connect 2)',
        units: [
          createPrimaryUnit(
            2, 'Primary 2', 1, 1, 'Meet My Family', 'تعرف على عائلتي والأجداد',
            'Extended family: grandparents, cousins, polite morning greetings',
            'Demonstratives Plural: "These are my + Plural"', 'أسماء الإشارة للجمع القريب',
            'Use "This is my..." for ONE person (singular), and "These are my..." for TWO OR MORE people (plural).',
            ['This is my grandfather. (هذا جدي)', 'These are my parents: my father and mother. (هذان والداي)', 'These are my cousins. (هؤلاء أولاد عمي)'],
            [
              { word: 'grandparents', pos: 'n.', ar: 'الجد والجدة معاً', def: 'Both grandfather and grandmother.', ex: 'I visit my loving grandparents every weekend.', exAr: 'أزور جدي وجدتي المحبين في نهاية كل أسبوع.' },
              { word: 'parents', pos: 'n.', ar: 'الوالدان (الأب والأم)', def: 'Father and mother together.', ex: 'My parents encourage me to study hard.', exAr: 'يشجعني والداي على الاجتهاد في المذاكرة.' },
              { word: 'cousin', pos: 'n.', ar: 'ابن / ابنة العم أو العمة أو الخال', def: 'The child of your uncle or aunt.', ex: 'My cousin Mazen plays football with me.', exAr: 'يلعب ابن عمي مازن كرة القدم معي.' },
              { word: 'uncle', pos: 'n.', ar: 'العم أو الخال', def: 'The brother of your mother or father.', ex: 'Uncle Amr is an engineer in Cairo.', exAr: 'عمي عمرو مهندس في القاهرة.' },
              { word: 'aunt', pos: 'n.', ar: 'العمة أو الخالة', def: 'The sister of your mother or father.', ex: 'Aunt Mona bakes delicious cookies for us.', exAr: 'تخبز عمتي منى بسكويتاً شهياً لنا.' },
              { word: 'morning', pos: 'n.', ar: 'فترة الصباح المشرقة', def: 'The early part of the day when the sun rises.', ex: 'We say "Good morning" with a warm smile.', exAr: 'نقول "صباح الخير" بابتسامة دافئة.' },
              { word: 'evening', pos: 'n.', ar: 'فترة المساء', def: 'The end of the day before night falls.', ex: 'In the evening, my family reads together.', exAr: 'في المساء، تقرأ عائلتي معاً بهدوء.' }
            ],
            [
              { phrase: 'say good morning', meaningAr: 'يلقي تحية الصباح', example: 'Always say good morning to your teacher.' },
              { phrase: 'help at home', meaningAr: 'يساعد في الأعمال المنزلية', example: 'I help at home by setting the dining table.' }
            ],
            'In the sunny morning, Hany introduces his family in the park: "Look, grandfather is sitting on the bench. These are my parents. My father is wearing a blue shirt. These are my cousins, Mazen and Rana. We all play tag under the tall green trees."',
            'في الصباح المشرق، يُعرّف هاني عائلته في الحديقة: "انظر، جدي يجلس على المقعد. وهذان والداي. وهؤلاء أولاد عمي مازن ورنا، نلعب جميعاً بمرح."',
            'Hany: "Good morning, Mazen! Meet my friend Youssef."\nMazen: "Hello, Youssef! Nice to meet you."\nYoussef: "Nice to meet you, Mazen. Are these your grandparents?"\nHany: "Yes! These are my kind grandparents."'
          ),
          createPrimaryUnit(
            2, 'Primary 2', 1, 2, 'My Body', 'جسمي وصحتي وأجزاء الكائنات',
            'Human body, senses, animal features (beak, wings, legs)',
            'Verb to Have: "I have got / A bird has got"', 'فعل الملكية Have got / Has got',
            'I / You / We / They use HAVE GOT. He / She / It use HAS GOT. (e.g., A bird has got two legs and a beak).',
            ['I have got two arms and two legs. (لدي ذراعان ورجلان)', 'A bird has got a beak and wings. (الطائر لديه منقار وجناحان)', 'A monkey has got a long tail. (القرد لديه ذيل طويل)'],
            [
              { word: 'head', pos: 'n.', ar: 'الرأس', def: 'The top part of the body with brain, eyes, and ears.', ex: 'Wear a cap on your head in sunny weather.', exAr: 'ارتدِ قبعة على رأسك في الطقس المشمس.' },
              { word: 'face', pos: 'n.', ar: 'الوجه', def: 'The front part of the head with eyes, nose, and mouth.', ex: 'Wash your face with fresh clean water.', exAr: 'اغسل وجهك بالماء العذب النظيف.' },
              { word: 'arms', pos: 'n.', ar: 'الذراعان', def: 'The upper limbs used for holding and hugging.', ex: 'I have two strong arms to carry my bag.', exAr: 'لدي ذراعان قويتان لحمل حقيبتي.' },
              { word: 'legs', pos: 'n.', ar: 'الساقان', def: 'The lower limbs used for walking and running.', ex: 'Running strengthens our leg muscles.', exAr: 'الجري يقوي عضلات الساقين لدينا.' },
              { word: 'feet', pos: 'n.', ar: 'القدمان (جمع غير منتظم)', def: 'Plural of foot; used for standing on the ground.', ex: 'I put my shoes on my clean feet.', exAr: 'أرتدي حذائي في قدمي النظيفتين.' },
              { word: 'teeth', pos: 'n.', ar: 'الأسنان (جمع غير منتظم)', def: 'Plural of tooth; used to chew healthy food.', ex: 'Brush your white teeth twice every day.', exAr: 'اغسل أسنانك البيضاء مرتين يومياً.' },
              { word: 'beak', pos: 'n.', ar: 'منقار الطائر', def: 'The hard mouthparts of a bird.', ex: 'The sparrow uses its beak to pick up seeds.', exAr: 'يستخدم العصفور منقاره لالتقاط الحبوب.' },
              { word: 'healthy', pos: 'adj.', ar: 'صحي ومعافى بدنياً', def: 'Strong, well, and free from sickness.', ex: 'Eating fresh fruit keeps our bodies healthy.', exAr: 'تناول الفواكه الطازجة يحافظ على صحة أجسامنا.' }
            ],
            [
              { phrase: 'brush your teeth', meaningAr: 'يغسل أسنانه بالفرشاة والمعجون', example: 'Brush your teeth in the morning and evening.' },
              { phrase: 'wash your hands', meaningAr: 'يغسل يديه بالماء والصابون', example: 'Wash your hands with soap before eating lunch.' }
            ],
            'Humans and animals have amazing bodies! I have got one head, two eyes, two ears, and one mouth. I have got two arms and two legs. Look at the little bird on the branch: it hasn’t got arms. It has got two wings to fly and a strong beak to eat seeds.',
            'للإنسان والحيوانات أجسام مدهشة! لدي رأس واحد وعينان وأذنان وفم. انظر إلى العصفور الصغير على الغصن: ليس لديه أذرع، بل لديه جناحان يطير بهما ومنقار قوي يلتقط به البذور.',
            'Teacher: "Hany, how many legs has a cat got?"\nHany: "A cat has got four legs and a warm furry tail!"\nTeacher: "Excellent! And how many wings has a bird got?"\nHany: "A bird has got two wings to fly high in the sky!"'
          )
        ]
      }
    ]
  },

  // Primary 3 (Grade 3 - Connect 3)
  {
    stage: 'Primary',
    grade: 3,
    gradeLabel: 'Primary 3 - الصف الثالث الابتدائي',
    gradeLabelAr: 'الصف الثالث الابتدائي (Connect 3)',
    track: 'Connect',
    description: 'Feelings and emotional wellbeing, common health ailments, taking medicine responsibly, sports, nutrition, and nature.',
    semesters: [
      {
        semester: 1,
        semesterLabel: 'Term 1 - الفصل الدراسي الأول (Connect 3)',
        units: [
          createPrimaryUnit(
            3, 'Primary 3', 1, 1, 'I Feel Happy!', 'أشعر بالسعادة والمشاعر الإيجابية',
            'Expressing feelings: happy, excited, tired, hungry, thirsty, angry',
            'Expressing Feelings: "I feel + Adjective"', 'التعبير عن المشاعر والأحاسيس',
            'To express how you feel, say: "I feel + adjective". To ask a friend: "How do you feel?"',
            ['How do you feel? I feel happy! (كيف تشعر؟ أشعر بالسعادة!)', 'I feel thirsty. Can I have some water? (أشعر بالعطش. هل يمكنني شرب ماء؟)', 'Hany feels excited because today is the match. (يشعر هاني بالحماس لأن اليوم موعد المباراة)'],
            [
              { word: 'happy', pos: 'adj.', ar: 'سعيد ومبتهج', def: 'Feeling joy, delight, and contentment.', ex: 'I feel happy when I play with my friends.', exAr: 'أشعر بالسعادة عندما ألعب مع أصدقائي.' },
              { word: 'excited', pos: 'adj.', ar: 'متحمس ومترقب بفرح', def: 'Very enthusiastic and eager.', ex: 'We feel excited about our weekend school trip.', exAr: 'نشعر بالحماس لرحلتنا المدرسية في عطلة الأسبوع.' },
              { word: 'tired', pos: 'adj.', ar: 'تعبان ومرهق بحاجة للراحة', def: 'Needing sleep or rest after hard activity.', ex: 'After running in the playground, I feel tired.', exAr: 'بعد الجري في الفناء، أشعر بالتعب والراحة.' },
              { word: 'hungry', pos: 'adj.', ar: 'جائع بحاجة للطعام', def: 'Wanting or needing food to eat.', ex: 'I am hungry, let’s make a fresh sandwich.', exAr: 'أنا جائع، هيا نصنع شطيرة طازجة.' },
              { word: 'thirsty', pos: 'adj.', ar: 'عطشان بحاجة للماء', def: 'Needing water or juice to drink.', ex: 'Drink pure water when you feel thirsty.', exAr: 'اشرب ماءً نقياً عندما تشعر بالعطش.' },
              { word: 'kind', pos: 'adj.', ar: 'عطوف وطيب القلب', def: 'Helpful, caring, and considerate of others.', ex: 'Be kind to your friends and share your toys.', exAr: 'كن طيباً مع أصدقائك وشاركهم ألعابك.' }
            ],
            [
              { phrase: 'drink pure water', meaningAr: 'يشرب ماءً نقياً وصحياً', example: 'Drink plenty of water on hot sunny days.' },
              { phrase: 'make a sandwich', meaningAr: 'يصنع شطيرة خضراوات طازجة', example: 'Hannah helps make a fresh cheese sandwich.' }
            ],
            'Hany and Hana are in the kitchen. Hana says: "I feel thirsty and hungry, Hany!" Hany smiles kindly: "I can make you a delicious cheese and cucumber sandwich, Hana! And here is a glass of cool water." Hana smiles: "Thank you, Hany! You are very kind."',
            'هاني وهنا في المطبخ. تقول هنا: "أشعر بالعطش والجوع يا هاني!" يبتسم هاني بلطف: "سأصنع لكِ شطيرة جبن وخيار طازجة وكوب ماء بارد." تشكره هنا: "أنت عطوف جداً يا هاني."',
            'Hany: "How do you feel today, Youssef?"\nYoussef: "I feel excited! Our team has a championship game today."\nHany: "Wonderful! Drink water so you don’t feel tired."'
          ),
          createPrimaryUnit(
            3, 'Primary 3', 1, 2, 'What’s the Matter?', 'ما المشكلة الصحية؟ والعناية بالمرضى',
            'Health ailments: headache, cold, fever, cough, taking medicine',
            'Asking About Health: "What’s the matter? I have a..."', 'السؤال والاطمئنان على صحة الآخرين',
            'To ask someone who looks unwell: "What’s the matter?" They reply: "I have a headache / cold / fever."',
            ['What’s the matter, Dad? I have a headache. (ما الأمر يا أبي؟ لدي صداع)', 'Take your medicine and rest in bed. (تناول دواءك واسترح في الفراش)'],
            [
              { word: 'headache', pos: 'n.', ar: 'صداع وألم بالرأس', def: 'A pain located in the head.', ex: 'I have a headache, so I need to rest quietly.', exAr: 'لدي صداع، لذا أحتاج للراحة في هدوء.' },
              { word: 'fever', pos: 'n.', ar: 'حمى وارتفاع درجة الحرارة', def: 'A body temperature higher than normal.', ex: 'The doctor checks my temperature when I have a fever.', exAr: 'يقيس الطبيب حرارتي عندما أكون مصاباً بالحمى.' },
              { word: 'cold', pos: 'n.', ar: 'نزلة برد وسيلان الأنف', def: 'A common viral illness with sneezing and coughing.', ex: 'Drink warm lemon tea when you catch a cold.', exAr: 'اشرب شاياً دافئاً بالليمون عند إصابتك بنزلة برد.' },
              { word: 'cough', pos: 'n.', ar: 'سعال وكحة', def: 'An expulsion of air from the lungs to clear the throat.', ex: 'Cover your mouth with a tissue when you cough.', exAr: 'غطِّ فمك بمنديل ورقي عندما تسعل.' },
              { word: 'medicine', pos: 'n.', ar: 'دواء موصوف من الطبيب', def: 'A substance used to cure illness or relieve pain.', ex: 'Take your prescribed medicine with an adult’s help.', exAr: 'تناول دواءك الموصوف بمساعدة شخص بالغ دائماً.' },
              { word: 'stomachache', pos: 'n.', ar: 'مغص وألم في المعدة', def: 'Pain in the stomach or abdomen.', ex: 'Eating too much candy can cause a stomachache.', exAr: 'تناول الكثير من الحلوى يسبب ألماً في المعدة.' }
            ],
            [
              { phrase: 'get a glass of water', meaningAr: 'يحضر كوب ماء للمريض', example: 'Can I get you a glass of water, Dad?' },
              { phrase: 'take your medicine', meaningAr: 'يتناول الدواء بانتظام', example: 'Take your medicine on time to feel better.' }
            ],
            'Dad is lying on the sofa. Hana asks softly: "Are you okay, Dad? What’s the matter?" Dad whispers: "No, I feel sick. I have a headache." Hany says: "Can I get you your medicine and a glass of cool water, Dad?" Dad smiles: "Yes, please, my dear children. Thank you for caring."',
            'الأب يستريح على الأريكة. تسأله هنا برقة: "هل أنت بخير يا أبي؟ ما المشكلة؟" يهمس الأب: "لدي صداع." يقول هاني: "هل أحضر لك دواءك وكوب ماء؟" يشكرهما الأب بحنان.',
            'Hana: "What’s the matter, Dad?"\nDad: "I have a headache and a slight fever."\nHana: "I will bring you your medicine and call mom right away!"'
          )
        ]
      }
    ]
  },

  // Primary 4 (Grade 4 - Connect 4)
  {
    stage: 'Primary',
    grade: 4,
    gradeLabel: 'Primary 4 - الصف الرابع الابتدائي',
    gradeLabelAr: 'الصف الرابع الابتدائي (Connect 4)',
    track: 'Connect',
    description: 'Egyptian farming, crops, digestive system, desert habitats, camels, fennec foxes, and renewable energy.',
    semesters: [
      {
        semester: 1,
        semesterLabel: 'Term 1 - الفصل الدراسي الأول (Connect 4)',
        units: [
          createPrimaryUnit(
            4, 'Primary 4', 1, 1, 'I Feel Good!', 'أشعر بالصحة والزراعة في مصر',
            'Egyptian agriculture: sugarcane, rice, tomatoes, digestive system',
            'Conjunctions: "and" (addition) vs. "but" (contrast)', 'روابط الإضافة والتناقض and و but',
            'Use "and" to join two similar positive ideas. Use "but" to show a surprising difference or contrast.',
            ['I practice football and I drink fresh water. (أمارس كرة القدم وأشرب ماءً نقياً)', 'I want to play tennis, but I hurt my leg. (أريد لعب التنس، لكن ساقي تؤلمني)'],
            [
              { word: 'farmers', pos: 'n.', ar: 'الفلاحون والمزارعون المصريون', def: 'People who cultivate crops and raise livestock.', ex: 'Egyptian farmers grow delicious fruits and vegetables.', exAr: 'يزرع الفلاحون المصريون فواكه وخضراوات لذيذة.' },
              { word: 'sugarcane', pos: 'n.', ar: 'قصب السكر الغني بالحلاوة', def: 'A tall tropical grass grown to extract sugar.', ex: 'Upper Egypt is famous for growing sweet sugarcane.', exAr: 'يشتهر صعيد مصر بزراعة قصب السكر اللذيذ.' },
              { word: 'watermelons', pos: 'n.', ar: 'البطيخ المنعش الصيفي', def: 'Large green fruit with sweet juicy red flesh.', ex: 'Chilled watermelon is refreshing in hot summer.', exAr: 'البطيخ المثلج منعش ولذيذ في حر الصيف.' },
              { word: 'digest', pos: 'v.', ar: 'يهضم الطعام في المعدة', def: 'To break down food in the stomach for energy.', ex: 'Our stomach uses gastric juices to digest food.', exAr: 'تستخدم معدتنا العصارة الهضمية لهضم الطعام.' },
              { word: 'nutrients', pos: 'n.', ar: 'عناصر غذائية وفيتامينات', def: 'Substances that provide nourishment essential for life.', ex: 'Vegetables provide vital nutrients for our muscles.', exAr: 'توفر الخضراوات عناصر غذائية ضرورية لعضلاتنا.' },
              { word: 'stomach', pos: 'n.', ar: 'المعدة في الجهاز الهضمي', def: 'The organ where food is digested by acid.', ex: 'Food moves from the esophagus down into the stomach.', exAr: 'ينتقل الطعام من المريء نزولاً إلى المعدة.' }
            ],
            [
              { phrase: 'grow crops', meaningAr: 'يزرع المحاصيل الزراعية', example: 'Egyptian farmers grow crops along the fertile Nile delta.' },
              { phrase: 'raise chickens', meaningAr: 'يربي الدجاج للبيض واللحم', example: 'Many farmers raise chickens to produce fresh eggs.' }
            ],
            'Egypt produces the best food in the world! Look at our fertile fields in the Delta: farmers grow rice, onions, tomatoes, and wheat. When we eat, food goes into our mouth, down the esophagus, and into the stomach. Our body absorbs essential nutrients to grow tall and strong.',
            'تنتج مصر أشهى وأجود الأطعمة! في دلتا النيل الخصبة يزرع الفلاحون الأرز والطماطم والقمح. وعندما نأكل، يمر الطعام إلى المعدة ليمتص الجسم العناصر الغذائية لنمو قوي.',
            'Mom: "Lunch is ready, Tarek! I made some special food for us."\nTarek: "It looks delicious, Mom! Which food comes from our country?"\nMom: "We grow rice, onions, and sweet sugarcane right here in Egypt!"'
          ),
          createPrimaryUnit(
            4, 'Primary 4', 1, 2, 'Desert Animals', 'حيوانات الصحراء المصرية والتكيف',
            'Desert ecosystem: fennec fox, steppe eagle, camels, adaptations',
            'Comparative Adjectives: "Short adj + er + than"', 'مقارنة الصفات القصيرة',
            'When comparing two animals, add "-er" to short adjectives + "than". (e.g. The camel is taller than the horse).',
            ['The camel is stronger than the horse. (الجمل أقوى من الحصان)', 'The fennec fox has bigger ears than other foxes. (ثعلب الفنك أذناه أكبر من باقي الثعالب)'],
            [
              { word: 'fennec fox', pos: 'n.', ar: 'ثعلب الفنك الصحراوي', def: 'A small desert fox with large ears to stay cool.', ex: 'The fennec fox lives in the sandy desert burrows.', exAr: 'يعيش ثعلب الفنك في جحور الصحراء الرملية.' },
              { word: 'camel', pos: 'n.', ar: 'الجمل (سفينة الصحراء)', def: 'A large desert mammal adapted to survive without water.', ex: 'Camels have flat padded feet to walk on soft sand.', exAr: 'للجمال خفاف عريضة للسير بسهولة على الرمال الناعمة.' },
              { word: 'steppe eagle', pos: 'n.', ar: 'عقاب السهول المهاجر', def: 'A magnificent bird of prey that migrates over Egypt.', ex: 'The steppe eagle flies gracefully over Sinai mountains.', exAr: 'يحلق عقاب السهول بروعة فوق جبال سيناء.' },
              { word: 'fur', pos: 'n.', ar: 'الفراء الناعم الواقي', def: 'The thick coat of soft hair covering an animal.', ex: 'Thick fur keeps desert mammals warm during cold nights.', exAr: 'يحافظ الفراء الكثيف على دفء الحيوانات في ليالي الصحراء الباردة.' },
              { word: 'adapt', pos: 'v.', ar: 'يتكيف ويتأقلم مع البيئة', def: 'To change physical traits to suit an environment.', ex: 'Desert creatures adapt cleverly to survive extreme heat.', exAr: 'تتكيف كائنات الصحراء بذكاء للبقاء في درجات الحرارة الشديدة.' },
              { word: 'feather', pos: 'n.', ar: 'ريش الطيور', def: 'The light flat structures forming the plumage of birds.', ex: 'Eagles have strong waterproof feathers for flight.', exAr: 'تمتلك النسور ريشاً قوياً مقاوماً للماء يساعدها على الطيران.' }
            ],
            [
              { phrase: 'ship of the desert', meaningAr: 'سفينة الصحراء (لقب الجمل)', example: 'The camel is known as the patient ship of the desert.' },
              { phrase: 'survive without water', meaningAr: 'يعيش بدون ماء لفترة طويلة', example: 'Camels can survive without water for many days.' }
            ],
            'The Egyptian desert is full of remarkable wildlife! The fennec fox is smaller than other foxes, but its ears are much bigger. Why? Big ears help it hear insects and keep its body cool under the desert sun. Camels are perfect for desert journeys because their large flat feet do not sink in the sand.',
            'تزخر الصحراء المصرية بحياة برية مذهلة! ثعلب الفنك أصغر حجماً من الثعالب الأخرى، لكن أذنيه كبيرتان لمساعدته على تبريد جسمه وسماع الحشرات. والجمال مثالية للصحراء بفضل خفافها العريضة.',
            'Sara: "Look at that little animal with giant ears! What is it?"\nGuide: "That is the fennec fox! It weighs only about one kilogram."\nSara: "Are its ears bigger than a normal fox’s ears?"\nGuide: "Yes, exactly! They help it lose heat and stay cool."'
          )
        ]
      }
    ]
  },

  // Primary 5 (Grade 5 - Connect 5)
  {
    stage: 'Primary',
    grade: 5,
    gradeLabel: 'Primary 5 - الصف الخامس الابتدائي',
    gradeLabelAr: 'الصف الخامس الابتدائي (Connect 5)',
    track: 'Connect',
    description: 'Sustainable food production, chickpeas, mango orchards, eco-tourism, Red Sea reefs, and healthy eating plates.',
    semesters: [
      {
        semester: 1,
        semesterLabel: 'Term 1 - الفصل الدراسي الأول (Connect 5)',
        units: [
          createPrimaryUnit(
            5, 'Primary 5', 1, 1, 'We Plant Our Food', 'نزرع طعامنا ونعتني بالمحاصيل',
            'Planting legumes, chickpeas, mangoes, lime trees, soil, harvesting',
            'Quantifiers: "Some" vs. "Any" & Polite Requests', 'استخدام Some و Any والطلب المهذب',
            'Use "Some" in positive statements and polite offers ("Would you like some mangoes?"). Use "Any" in negative sentences and questions ("Have we got any limes?").',
            ['We have got some fresh chickpeas in the kitchen. (لدينا بعض الحمص الطازج في المطبخ)', 'We haven’t got any onions left. (ليس لدينا أي بصل متبقٍ)', 'Would you like some sweet mango? (هل تود بعض المانجو اللذيذة؟)'],
            [
              { word: 'chickpeas', pos: 'n.', ar: 'الحمص (بقوليات مغذية)', def: 'Nutritious round yellow seeds from the legume family.', ex: 'Chickpeas are the key ingredient in delicious koshari.', exAr: 'يعد الحمص مكوناً رئيسياً في طبق الكشري اللذيذ.' },
              { word: 'harvest', pos: 'v.', ar: 'يحصد الثمار والمحاصيل', def: 'To gather in a ripe crop from fields or trees.', ex: 'Farmers harvest golden wheat in late spring.', exAr: 'يحصد المزارعون القمح الذهبي في أواخر فصل الربيع.' },
              { word: 'ingredient', pos: 'n.', ar: 'مكون غذائي في الوصفة', def: 'Any of the foods combined together to make a dish.', ex: 'Fresh lime juice is an essential ingredient in salads.', exAr: 'عصير الليمون الطازج مكون أساسي في طبق السلطة.' },
              { word: 'orchard', pos: 'n.', ar: 'بستان للأشجار المثمرة', def: 'A piece of land planted with fruit trees.', ex: 'My uncle grows mangoes in his sunny Ismailia orchard.', exAr: 'يزرع عمي المانجو في بستانه المشمس بالإسماعيلية.' },
              { word: 'legumes', pos: 'n.', ar: 'البقوليات المغذية', def: 'Plants like beans, lentils, and chickpeas rich in protein.', ex: 'Legumes are healthy plant foods that help us grow.', exAr: 'البقوليات أطعمة نباتية صحية تساعدنا على النمو.' },
              { word: 'seeds', pos: 'n.', ar: 'البذور الزراعية', def: 'Small units produced by plants capable of growing new plants.', ex: 'Plant the seeds in rich soil and water them daily.', exAr: 'اغرس البذور في تربة خصبة واسقها يومياً.' }
            ],
            [
              { phrase: 'grow in rows', meaningAr: 'ينمو في صفوف منتظمة', example: 'Chickpeas grow in neat green rows in the farm.' },
              { phrase: 'rich fertile soil', meaningAr: 'تربة زراعية خصبة وغنية', example: 'The Nile delta is celebrated for its rich fertile soil.' }
            ],
            'Ashraf loves planting vegetables in his garden! He plants chickpea seeds in small pots with dark soil. He waters them every morning and puts them in sunlight. Soon, green shoots emerge! Chickpeas are not fruits or vegetables; they belong to a special food group called legumes. They make meals like hummus and koshari nutritious and delicious.',
            'يحب أشرف زراعة الخضراوات في حديقته! يغرس بذور الحمص في أوانٍ صغيرة ويرعاها بالماء والشمس حتى تنمو براعم خضراء. الحمص ينتمي لمجموعة البقوليات ويمنحنا طاقة وبروتيناً صحياً.',
            'Ashraf: "Mom, would you like some freshly harvested limes from our tree?"\nMom: "Yes, please, Ashraf! Have we got any chickpeas left for koshari?"\nAshraf: "Yes, we have got plenty of chickpeas in the pantry!"'
          )
        ]
      }
    ]
  },

  // Primary 6 (Grade 6 - Connect 6)
  {
    stage: 'Primary',
    grade: 6,
    gradeLabel: 'Primary 6 - الصف السادس الابتدائي',
    gradeLabelAr: 'الصف السادس الابتدائي (Connect 6 - المنهج الحديث)',
    track: 'Connect',
    description: 'Community rooftop gardens, urban greening, volunteering, ancient Egyptian artifacts, tourism, and environmental action.',
    semesters: [
      {
        semester: 1,
        semesterLabel: 'Term 1 - الفصل الدراسي الأول (Connect 6)',
        units: [
          createPrimaryUnit(
            6, 'Primary 6', 1, 1, 'Green Cities & Community Gardens', 'المدن الخضراء والحدائق المجتمعية',
            'Roof gardens, urban agriculture, organic fertilizer, harvesting vegetables, community spirit',
            'Adverbs of Frequency: "always, usually, often, sometimes, never"', 'ظروف التكرار مع المضارع البسيط',
            'Adverbs of frequency go BEFORE the main verb, but AFTER the verb "to be". (e.g. We always volunteer on Fridays / She is always helpful).',
            ['We always grow organic vegetables on our apartment roof. (نحن نزرع دائماً خضراوات عضوية على سطح البناية)', 'I never use chemical pesticides on my plants. (أنا لا أستخدم أبداً مبيدات كيميائية على نباتاتي)', 'The community garden is usually full of cheerful volunteers. (الحديقة المجتمعية تكون عادة مليئة بالمتطوعين)'],
            [
              { word: 'roof garden', pos: 'n.', ar: 'حديقة فوق أسطح المنازل', def: 'A garden cultivated on the flat roof of a building.', ex: 'Our roof garden cools down our building in summer.', exAr: 'حديقة السطح ترطب أجواء بنايتنا في حر الصيف.' },
              { word: 'community', pos: 'n.', ar: 'المجتمع المحلي والحي السكني', def: 'A group of people living together in one area.', ex: 'The local community works together to clean our street.', exAr: 'يعمل المجتمع المحلي معاً لتنظيف وتجميل شارعنا.' },
              { word: 'volunteer', pos: 'n. / v.', ar: 'متطوع / يتطوع للخير', def: 'A person who freely offers to take part in an enterprise.', ex: 'Many young volunteers help plant trees in Cairo.', exAr: 'يساعد العديد من المتطوعين الشباب في زراعة الأشجار بالقاهرة.' },
              { word: 'organic', pos: 'adj.', ar: 'عضوي وطبيعي بدون كيماويات', def: 'Produced without the use of chemical fertilizers.', ex: 'Organic tomatoes taste sweet, fresh, and natural.', exAr: 'الطماطم العضوية مذاقها حلو وطازج وطبيعي.' },
              { word: 'fertilizer', pos: 'n.', ar: 'سماد طبيعي مغذٍ للتربة', def: 'A natural substance added to soil to increase fertility.', ex: 'Natural compost makes an excellent organic fertilizer.', exAr: 'السماد الطبيعي المحضر منزلياً يغذي التربة بامتياز.' },
              { word: 'harvest', pos: 'v.', ar: 'يجني ويحصد المحصول', def: 'To collect ripe crops from the soil.', ex: 'We harvest twenty kilos of crisp lettuce each season.', exAr: 'نحصد عشرين كيلوجراماً من الخس الطازج كل موسم.' },
              { word: 'apartment', pos: 'n.', ar: 'شقة سكنية', def: 'A suite of rooms forming one residence in a building.', ex: 'We live in an airy apartment overlooking the park.', exAr: 'نحن نعيش في شقة سكنية مبهجة تطل على الحديقة.' },
              { word: 'space', pos: 'n.', ar: 'مساحة وفضاء مفتوح', def: 'A continuous area or expanse which is free and available.', ex: 'We turned an empty roof space into a green oasis.', exAr: 'حولنا مساحة السطح الفارغة إلى واحة خضراء يانعة.' }
            ],
            [
              { phrase: 'clean the air', meaningAr: 'ينقي وينظف الهواء الجوي', example: 'Green roof plants absorb carbon dioxide and clean the city air.' },
              { phrase: 'make new friends', meaningAr: 'يكوّن صداقات جديدة جميلة', example: 'Volunteering in the garden is a wonderful way to make new friends.' }
            ],
            'Maryam visits her friend Nabila. Nabila lives in an apartment in Cairo, but her building has a secret treasure: a community roof garden! Volunteers from the neighborhood plant peppers, onions, tomatoes, and dates. "We never use chemical pesticides," Nabila explains proudly. "We only use organic fertilizer. Our roof garden produces healthy food and cleans the city air!"',
            'تزور مريم صديقتها نبيلة في القاهرة. تمتلك عمارة نبيلة كنزاً حقيقياً: حديقة خضراء فوق السطح! يزرع المتطوعون الطماطم والبصل دون أي كيماويات، مما يوفر طعاماً صحياً وينقي هواء المدينة.',
            'Maryam: "Do you go to the roof garden every day, Nabila?"\nNabila: "I usually go on Fridays to water the lettuce with my grandmother."\nMaryam: "Do you sell your harvest?"\nNabila: "We eat some at home, and sometimes we sell the rest in the local market!"'
          )
        ]
      }
    ]
  }
];
