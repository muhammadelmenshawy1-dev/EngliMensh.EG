// =========================================================================
// EngliMensh.EG - Primary 5 & Primary 6 Comprehensive 5-Level Exam Banks
// Connect 5 & Connect 6 (Term 1) - Official Egyptian MOE Curriculum
// System Architect: Mohammad El-Menshawy (محمد المنشاوي)
// 12 Units Total (P5 U1-U6 & P6 U1-U6)
// Each Unit contains:
//   Level 1: 10 Foundation & Recognition Questions
//   Level 2: 10 Contextual & Practice Questions
//   Level 3: 10 Advanced Structure & Grammar Questions
//   Level 4: Complete MOE Mock Exam (Listening, Reading, MCQ, Reorder, Punctuation)
//   Level 5: 8 Higher-Order Thinking Skills Questions with Arabic Explanations
// =========================================================================

import { buildVerifiedP1P2Suite, type UnitExamSuite } from './primary1And2Exams.ts';

// -------------------------------------------------------------------------
// Primary 5 Exam Suites (Units 1 to 6 - Connect 5)
// -------------------------------------------------------------------------
export const p5_u1_exams: UnitExamSuite = buildVerifiedP1P2Suite({
  unitId: 'p5_u1',
  unitIndex: 25,
  unitTitleEn: 'We Plant Our Food',
  unitTitleAr: 'نحن نزرع طعامنا والسلسلة الغذائية والكميات',
  grammarTopic: 'Countable & Uncountable Nouns / a, an, some, any / Polite Offers & Requests',
  vocab: [
    { word: 'Chickpeas', meaning: 'حمص الشام الغني بالبروتين', phonetic: '/ˈtʃɪkpiːz/', pos: 'Noun', clozeSentence: '______ are an important ingredient in many delicious recipes like koshari and hummus.', clozeDistractors: ['Tornadoes', 'Rackets', 'Minarets'] },
    { word: 'Producers', meaning: 'الكائنات المنتجة للغذاء كالنباتات', phonetic: '/prəˈdjuːsəz/', pos: 'Noun', clozeSentence: 'In the food chain, plants and trees are called ______ because they use sunlight to make food.', clozeDistractors: ['Suitcases', 'Goggles', 'Caravans'] },
    { word: 'Consumers', meaning: 'الكائنات المستهلكة في السلسلة الغذائية', phonetic: '/kənˈsjuːməz/', pos: 'Noun', clozeSentence: 'Animals are called ______ because they eat plants or other animals for energy.', clozeDistractors: ['Sandstorms', 'Streamers', 'Candles'] },
    { word: 'Decomposers', meaning: 'الكائنات المحللة كالفطريات', phonetic: '/ˌdiːkəmˈpəʊzəz/', pos: 'Noun', clozeSentence: 'Fungi and bacteria are ______ that return nutrients back to the ecosystem.', clozeDistractors: ['Sunglasses', 'Balloons', 'Playlists'] },
    { word: 'Ingredients', meaning: 'المكونات والمقادير لتحضير الطعام', phonetic: '/ɪnˈɡriːdiənts/', pos: 'Noun', clozeSentence: 'We bought all the fresh ______ from the market to bake a basbousa.', clozeDistractors: ['Floods', 'Courts', 'Helmets'] }
  ],
  phonics: {
    soundLabel: 'short vs. long vowels (cake/candy, grape/mango, milk/rice)',
    targetWord: 'Grape',
    targetMeaningAr: 'عنبة (تحتوي على صوت المد الطويل a_e /eɪ/)',
    distractors: ['Milk', 'Egg', 'Nut'],
    matchingPair: ['Cake', 'Lime'],
    pairDistractors: ['Cake and Milk', 'Grape and Egg', 'Rice and Nut']
  },
  dialogueQ: {
    prompt: 'Market Seller: "Hello, would you like some fresh carrots?" — Mom: "______"',
    correct: 'Yes, please! And how about buying some lemons and pineapples, too?',
    distractors: ['A tornado is a dark spinning cloud.', 'I wear my karate suit.', 'We sailed on a felucca in Aswan.'],
    explanationAr: 'في حوار السوق نرد بقبول العرض المهذب بـ Yes, please واقتراح شراء أصناف أخرى بـ How about + v-ing.'
  },
  grammarMcqs: [
    { prompt: 'Choose the correct quantifier for a polite offer: "Would you like ______ orange juice?"', correct: 'some', distractors: ['any', 'an', 'a'], explanationAr: 'في حالة العرض المهذب (Would you like...?) نستخدم some حتى في السؤال.' },
    { prompt: 'Choose the correct quantifier for a negative sentence: "We don\'t have ______ mangoes left in the kitchen."', correct: 'any', distractors: ['some', 'a', 'an'], explanationAr: 'في الجملة المنفية (don\'t have) نستخدم any مع الأسماء الجمع أو غير المعدودة.' },
    { prompt: 'Choose the right article for a singular vowel-initial noun: "Can I have ______ apple, please?"', correct: 'an', distractors: ['a', 'some', 'any'], explanationAr: 'كلمة apple مفرد معدود يبدأ بصوت متحرك فتأخذ أداة النكرة an.' }
  ],
  reorders: [
    { prompt: 'Reorder the polite offer: [you - Would - like - some - carrots - ?].', correct: 'Would you like some carrots?', distractors: ['Some carrots would you like?', 'Like you would some carrots?', 'Carrots some would you like?'], explanationAr: 'صيغة العرض المهذب: Would you like some carrots?' },
    { prompt: 'Reorder the negative statement: [aren\'t - There - any - tomatoes - left].', correct: "There aren't any tomatoes left", distractors: ["Any tomatoes left there aren't", "Aren't there any tomatoes left", "Tomatoes any there aren't left"], explanationAr: "الترتيب الصحيح للنفي: There aren't any tomatoes left." },
    { prompt: 'Reorder: [grows - My - uncle - onions - and - potatoes].', correct: 'My uncle grows onions and potatoes', distractors: ['Onions and potatoes grows my uncle', 'Grows my uncle onions and potatoes', 'Uncle my onions and potatoes grows'], explanationAr: 'الترتيب الصحيح: My uncle grows onions and potatoes.' },
    { prompt: 'Reorder the suggestion: [buying - How - about - some - lemons - ?].', correct: 'How about buying some lemons?', distractors: ['Buying some lemons how about?', 'Some lemons how about buying?', 'About how buying some lemons?'], explanationAr: 'صيغة الاقتراح: How about buying some lemons?' }
  ],
  readingPassage: {
    passage: 'Ashraf grows chickpeas! Chickpeas are an important ingredient in many recipes such as koshari and hummus. Chickpeas aren\'t a fruit or a vegetable. They belong to a group of foods called legumes. Other legumes are lentils and peanuts. Chickpeas are a healthy food that can help to keep our digestive system working properly.',
    question: 'Which food group do chickpeas, lentils, and peanuts belong to?',
    correct: 'Legumes.',
    distractors: ['Dairy products.', 'Fossil fuels.', 'Sporting equipment.'],
    explanationAr: 'ينتمي الحمص والعدس والفول السوداني إلى مجموعة البقوليات (legumes).'
  },
  punctuationQ: {
    correct: 'Would you like some chickpeas, Hany?',
    distractors: ['would you like some chickpeas hany', 'Would you like some chickpeas, Hany.', 'would You Like Some Chickpeas, Hany?'],
    explanationAr: 'يبدأ سؤال العرض بـ Would بحرف كبير وينتهي بعلامة استفهام مع فاصلة قبل المخاطب.'
  }
});

export const p5_u2_exams: UnitExamSuite = buildVerifiedP1P2Suite({
  unitId: 'p5_u2',
  unitIndex: 26,
  unitTitleEn: 'I Want to Be Healthy!',
  unitTitleAr: 'أريد أن أكون بصحة جيدة والرياضة والملاعب',
  grammarTopic: 'good at / bad at / great at + Verb-ing or Noun & Sports Equipment',
  vocab: [
    { word: 'Football pitch', meaning: 'ملعب كرة القدم العشبي', phonetic: '/ˈfʊtbɔːl pɪtʃ/', pos: 'Noun', clozeSentence: 'We play football on a green ______ because there is lots of space.', clozeDistractors: ['swimming pool', 'bakery', 'prescription'] },
    { word: 'Tennis court', meaning: 'ملعب التنس', phonetic: '/ˈtɛnɪs kɔːt/', pos: 'Noun', clozeSentence: 'Players use rackets to hit the ball over the net on a ______.', clozeDistractors: ['hieroglyphic', 'sandstorm', 'caravan'] },
    { word: 'Swimming goggles', meaning: 'نظارات السباحة المائية', phonetic: '/ˈswɪmɪŋ ˈɡɒɡəlz/', pos: 'Noun', clozeSentence: 'I wear my ______ to protect my eyes when I swim in the pool.', clozeDistractors: ['football boots', 'karate suits', 'feluccas'] },
    { word: 'Karate suit', meaning: 'بدلة الكاراتيه البيضاء', phonetic: '/kəˈrɑːti suːt/', pos: 'Noun', clozeSentence: 'When I do karate, I wear a clean white ______.', clozeDistractors: ['squash racket', 'chickpea', 'tornado'] },
    { word: 'Squash racket', meaning: 'مضرب الاسكواش', phonetic: '/skwɒʃ ˈrækɪt/', pos: 'Noun', clozeSentence: 'You need a small black ball and a ______ to play squash in a walled court.', clozeDistractors: ['galabeya', 'compass', 'minaret'] }
  ],
  phonics: {
    soundLabel: 'word blends and syllable counting (one, two, and three-syllable words)',
    targetWord: 'Karate',
    targetMeaningAr: 'كاراتيه (كلمة مكونة من ثلاثة مقاطع صوتية ka-ra-te)',
    distractors: ['Cat', 'Pen', 'Sun'],
    matchingPair: ['Spider', 'Teacher'],
    pairDistractors: ['Spider and Cat', 'Teacher and Pen', 'Karate and Sun']
  },
  dialogueQ: {
    prompt: '"What sports are you good at, Wael?" — "______"',
    correct: 'I\'m very good at playing squash, but I\'m bad at playing handball.',
    distractors: ['Chickpeas belong to legumes.', 'A scribe wrote hieroglyphics.', 'Ibn Battuta was a famous explorer.'],
    explanationAr: 'السؤال عن المهارة الرياضية بـ What sports are you good at نجيب عنه بـ I\'m good at + v-ing.'
  },
  grammarMcqs: [
    { prompt: 'Choose the correct form after "good at": "My sister is very good at ______ kung fu."', correct: 'doing', distractors: ['do', 'does', 'did'], explanationAr: 'بعد التعبيرات good at / bad at / great at يأتي الفعل مضافاً إليه ing (doing).' },
    { prompt: 'Choose the correct preposition: "My brother is great ______ swimming in the pool."', correct: 'at', distractors: ['on', 'in', 'to'], explanationAr: 'التعبير الصحيح للبراعة في شيء هو great at.' },
    { prompt: 'Sports verb collocation: "We ______ karate and kung fu, we ______ swimming, and we ______ tennis."', correct: 'do / go / play', distractors: ['play / play / play', 'go / do / go', 'make / eat / sleep'], explanationAr: 'نستخدم do مع الرياضات القتالية والفردية (karate)، و go مع الرياضات المنتهية بـ ing (swimming)، و play مع ألعاب الكرة (tennis).' }
  ],
  reorders: [
    { prompt: 'Reorder the skill sentence: [good - I\'m - at - playing - football].', correct: "I'm good at playing football", distractors: ["Playing football I'm good at", "Good at I'm playing football", "Football playing at good I'm"], explanationAr: "الترتيب الصحيح: I'm good at playing football." },
    { prompt: 'Reorder the negative skill sentence: [bad - He - is - at - making - cakes].', correct: 'He is bad at making cakes', distractors: ['Making cakes he is bad at', 'Is he bad at making cakes', 'Bad at he is making cakes'], explanationAr: 'الترتيب الصحيح: He is bad at making cakes.' },
    { prompt: 'Reorder: [wear - I - swimming - goggles - in - the - pool].', correct: 'I wear swimming goggles in the pool', distractors: ['In the pool wear I swimming goggles', 'Swimming goggles I wear in the pool', 'Pool the in I wear swimming goggles'], explanationAr: 'الترتيب الصحيح: I wear swimming goggles in the pool.' },
    { prompt: 'Reorder the question: [sport - What - are - you - good - at - ?].', correct: 'What sport are you good at?', distractors: ['You are good at what sport?', 'Good at what sport are you?', 'Are you what sport good at?'], explanationAr: 'السؤال عن المهارة الرياضية: What sport are you good at?' }
  ],
  readingPassage: {
    passage: 'Hedaya Malak is a famous Egyptian taekwondo player. She was one of the two people who carried the Egyptian flag at the Tokyo Olympic Games in 2021. She won the bronze medal at the Rio Olympics in 2016 and another bronze medal in Tokyo in 2021. She practices hard every day and helps a Moroccan athlete with special needs.',
    question: 'What sport does the Egyptian champion Hedaya Malak practice?',
    correct: 'Taekwondo.',
    distractors: ['Ice hockey.', 'Skiing.', 'Golf.'],
    explanationAr: 'هداية ملاك بطلة مصرية أولمبية في رياضة التايكوندو (Taekwondo).'
  },
  punctuationQ: {
    correct: 'Hedaya Malak is a famous Egyptian athlete.',
    distractors: ['hedaya malak is a famous egyptian athlete', 'Hedaya malak is a famous egyptian athlete?', 'hedaya Malak Is A Famous Egyptian Athlete.'],
    explanationAr: 'اسم العلم (Hedaya Malak) والجنسية (Egyptian) يكتبان بحروف كبيرة.'
  }
});

export const p5_u3_exams: UnitExamSuite = buildVerifiedP1P2Suite({
  unitId: 'p5_u3',
  unitIndex: 27,
  unitTitleEn: 'How Do I Look?',
  unitTitleAr: 'كيف أبدو؟ والملابس المصرية التقليدية والغرض والماضي',
  grammarTopic: 'Infinitive of Purpose (to + base verb) / Past Simple & Adjective Order',
  vocab: [
    { word: 'Galabeya', meaning: 'الجلباب المصري التقليدي المريح', phonetic: '/ɡæləˈbiːjə/', pos: 'Noun', clozeSentence: 'Many men in Egypt wear a white cotton ______ because it is cool in the sun.', clozeDistractors: ['squash racket', 'decomposer', 'tornado'] },
    { word: 'Suitcase', meaning: 'حقيبة السفر', phonetic: '/ˈsuːtkeɪs/', pos: 'Noun', clozeSentence: 'We need to pack our ______s for our holiday in Al Fayoum tomorrow.', clozeDistractors: ['chickpeas', 'hieroglyphics', 'floods'] },
    { word: 'Sweater', meaning: 'بلوفر / سترة صوفية شتوية', phonetic: '/ˈswɛtə/', pos: 'Noun', clozeSentence: 'It will be cold in the evening, so pack your warm ______.', clozeDistractors: ['swimming goggles', 'felucca', 'minaret'] },
    { word: 'Striped', meaning: 'مخطط / مقلم', phonetic: '/straɪpt/', pos: 'Adjective', clozeSentence: 'Noha is wearing a blue and white ______ dress.', clozeDistractors: ['producer', 'scribe', 'heatwave'] },
    { word: 'Sunglasses', meaning: 'نظارة شمسية', phonetic: '/ˈsʌnˌɡlɑːsɪz/', pos: 'Noun', clozeSentence: 'I will pack my ______ to protect my eyes when it is sunny.', clozeDistractors: ['caravans', 'fertilizers', 'tornadoes'] }
  ],
  phonics: {
    soundLabel: '-ed endings in Past Simple verbs: /t/ (walked), /d/ (cleaned), /ɪd/ (needed, waited)',
    targetWord: 'Needed',
    targetMeaningAr: 'احتاج (ينتهي بالمقطع الصوتي /ɪd/ لأن الفعل ينتهي بصوت d)',
    distractors: ['Walk', 'Clean', 'Help'],
    matchingPair: ['Needed', 'Waited'],
    pairDistractors: ['Needed and Walked', 'Waited and Helped', 'Wanted and Dressed']
  },
  dialogueQ: {
    prompt: '"Why did Tarek go to the library yesterday?" — "______"',
    correct: 'He went to the library to borrow a book about Ancient Egypt.',
    distractors: ['Because chickpeas are legumes.', 'I am good at playing squash.', 'A sandstorm is blowing outside.'],
    explanationAr: 'نستخدم مصدر الغرض (to + infinitive) لبيان سبب الذهاب إلى المكتبة.'
  },
  grammarMcqs: [
    { prompt: 'Choose the correct infinitive of purpose: "She went to town ______ a new dress for the party."', correct: 'to buy', distractors: ['buying', 'bought', 'buys'], explanationAr: 'للتعبير عن الغرض والهدف نستخدم to + الفعل في المصدر (to buy).' },
    { prompt: 'Choose the correct order of adjectives (Size -> Age -> Color -> Material): "He is wearing a ______ galabeya."', correct: 'long, white, cotton', distractors: ['cotton, white, long', 'white, cotton, long', 'cotton, long, white'], explanationAr: 'ترتيب الصفات قبل الاسم: الحجم/الطول (long) ثم اللون (white) ثم المادة الخام (cotton).' },
    { prompt: 'Past Simple verb form: "Yesterday, Injy ______ a warm sweater because it was cool."', correct: 'wore', distractors: ['wear', 'wears', 'wearing'], explanationAr: 'مع الكلمة الدالة على الماضي Yesterday نستخدم التصريف الثاني للفعل غير المنتظم wear وهو wore.' }
  ],
  reorders: [
    { prompt: 'Reorder the purpose sentence: [went - I - to - my - bedroom - to - sleep].', correct: 'I went to my bedroom to sleep', distractors: ['To sleep I went to my bedroom', 'Went I to my bedroom to sleep', 'My bedroom to sleep I went to'], explanationAr: 'الترتيب الصحيح مع مصدر الغرض: I went to my bedroom to sleep.' },
    { prompt: 'Reorder the packing sentence: [need - We - to - pack - our - suitcases].', correct: 'We need to pack our suitcases', distractors: ['Our suitcases we need to pack', 'Need we to pack our suitcases', 'Pack our suitcases we need to'], explanationAr: 'الترتيب الصحيح: We need to pack our suitcases.' },
    { prompt: 'Reorder the adjective order: [bought - She - new - green - a - dress].', correct: 'She bought a new green dress', distractors: ['A green new dress she bought', 'Bought she a new green dress', 'Dress a new green she bought'], explanationAr: 'الترتيب الصحيح للصفات: العمر (new) قبل اللون (green): a new green dress.' },
    { prompt: 'Reorder: [are - Galabeyas - made - cotton - from].', correct: 'Galabeyas are made from cotton', distractors: ['From cotton galabeyas are made', 'Are galabeyas made from cotton', 'Cotton from made are galabeyas'], explanationAr: 'الترتيب الصحيح: Galabeyas are made from cotton.' }
  ],
  readingPassage: {
    passage: 'Galabeyas are traditional Egyptian clothes. They are very popular! They are long robes made from cotton. They are usually white, but you can get other colors too. The sleeves are long so we don\'t get sunburned! They have hidden pockets, and the patterns on the neck are very beautiful.',
    question: 'Why are the sleeves of a galabeya long?',
    correct: 'So we don\'t get sunburned in the hot sun.',
    distractors: ['So we can swim faster in the pool.', 'To carry heavy suitcases.', 'To play squash on a court.'],
    explanationAr: 'أكمام الجلباب طويلة لحماية الذراعين من حروق الشمس (so we don\'t get sunburned).'
  },
  punctuationQ: {
    correct: 'We are traveling to Al Fayoum tomorrow.',
    distractors: ['we are traveling to al fayoum tomorrow', 'We are traveling to al fayoum tomorrow?', 'we Are Traveling To Al Fayoum Tomorrow.'],
    explanationAr: 'تبدأ الجملة بحرف كبير ويكتب اسم محافظة الفيوم (Al Fayoum) بحروف كبيرة.'
  }
});

export const p5_u4_exams: UnitExamSuite = buildVerifiedP1P2Suite({
  unitId: 'p5_u4',
  unitIndex: 28,
  unitTitleEn: 'Looking After Our World',
  unitTitleAr: 'الاعتناء بعالمنا وجزيرة إلفنتين والسياحة البيئية',
  grammarTopic: 'Past Continuous Tense (was / were + Verb-ing)',
  vocab: [
    { word: 'Elephantine Island', meaning: 'جزيرة إلفنتين التاريخية في أسوان', phonetic: '/ˌɛlɪfənˈtaɪn ˈaɪlənd/', pos: 'Noun', clozeSentence: '______ is the oldest part of Aswan; it is full of history and has no traffic.', clozeDistractors: ['A football pitch', 'A squash racket', 'A karate suit'] },
    { word: 'Ecotourism', meaning: 'السياحة البيئية المسؤولة التي تحمي الطبيعة', phonetic: '/ˌiːkəʊˈtʊərɪzəm/', pos: 'Noun', clozeSentence: '______ is an exciting idea that looks after the environment and helps local people.', clozeDistractors: ['Pollution', 'Deforestation', 'Flooding'] },
    { word: 'Coral reefs', meaning: 'الشعاب المرجانية البحرية في البحر الأحمر', phonetic: '/ˈkɒrəl riːfs/', pos: 'Noun', clozeSentence: 'Tourists can dive in the Red Sea in Taba to see the colorful ______.', clozeDistractors: ['sandstorms', 'chickpeas', 'sweaters'] },
    { word: 'Botanical garden', meaning: 'الحديقة النباتية في أسوان', phonetic: '/bəˈtænɪkəl ˈɡɑːdən/', pos: 'Noun', clozeSentence: 'We took a boat to the Aswan ______ to see rare trees and plants.', clozeDistractors: ['tennis court', 'pencil case', 'wardrobe'] },
    { word: 'Felucca', meaning: 'الفلوكة الشراعية النيلية', phonetic: '/fəˈlʊkə/', pos: 'Noun', clozeSentence: 'At sunset, we sailed peacefully on the Nile in a traditional ______.', clozeDistractors: ['suitcase', 'tornado', 'helicopter'] }
  ],
  phonics: {
    soundLabel: 'three-consonant clusters /str/, /scr/, /thr/ (strawberry, string, scratch, screen, throne, three)',
    targetWord: 'Strawberry',
    targetMeaningAr: 'فراولة (تبدأ بالعنقود الصوتي الثلاثي str /str/)',
    distractors: ['Cake', 'Milk', 'Book'],
    matchingPair: ['Scratch', 'Screen'],
    pairDistractors: ['Scratch and Cake', 'Three and Milk', 'String and Book']
  },
  dialogueQ: {
    prompt: '"What were you doing at four o\'clock yesterday afternoon, Nagwa?" — "______"',
    correct: 'I was traveling by boat to Elephantine Island with my family.',
    distractors: ['Would you like some chickpeas?', 'I wear a white karate suit.', 'A scribe writes hieroglyphics.'],
    explanationAr: 'السؤال في الماضي المستمر (What were you doing at 4 o\'clock yesterday?) جوابه: I was + verb-ing.'
  },
  grammarMcqs: [
    { prompt: 'Choose the correct Past Continuous form: "At 10 AM yesterday, we ______ walking in one of the Nubian villages."', correct: 'were', distractors: ['was', 'are', 'is'], explanationAr: 'مع الضمير We في زمن الماضي المستمر نستخدم الفعل المساعد were قبل الفعل المضاف له ing.' },
    { prompt: 'Choose the correct form: "Was she ______ in the lake yesterday morning?"', correct: 'swimming', distractors: ['swim', 'swims', 'swam'], explanationAr: 'في السؤال بالماضي المستمر (Was she...?) يأتي الفعل مضافاً له ing (swimming).' },
    { prompt: 'Why do ecotourists stay in small local hotels instead of big resorts? "Because they want to ______ the local environment and wildlife."', correct: 'protect', distractors: ['damage', 'pollute', 'destroy'], explanationAr: 'الهدف الأساسي للسياحة البيئية (ecotourism) هو حماية البيئة والحياة البرية (protect).' }
  ],
  reorders: [
    { prompt: 'Reorder the Past Continuous sentence: [was - She - watching - the - sunset].', correct: 'She was watching the sunset', distractors: ['The sunset she was watching', 'Was she watching the sunset', 'Watching the sunset was she'], explanationAr: 'الترتيب الصحيح: She was watching the sunset.' },
    { prompt: 'Reorder the question: [were - What - they - doing - yesterday - ?].', correct: 'What were they doing yesterday?', distractors: ['They were doing what yesterday?', 'Doing what were they yesterday?', 'Yesterday what they were doing?'], explanationAr: 'السؤال في الماضي المستمر: What were they doing yesterday?' },
    { prompt: 'Reorder: [looks - Ecotourism - after - the - environment].', correct: 'Ecotourism looks after the environment', distractors: ['The environment ecotourism looks after', 'Looks after ecotourism the environment', 'After the environment looks ecotourism'], explanationAr: 'الترتيب الصحيح: Ecotourism looks after the environment.' },
    { prompt: 'Reorder: [is - Aswan - calm - and - peaceful].', correct: 'Aswan is calm and peaceful', distractors: ['Calm and peaceful Aswan is', 'Is Aswan calm and peaceful', 'Peaceful and calm is Aswan'], explanationAr: 'الترتيب الصحيح: Aswan is calm and peaceful.' }
  ],
  readingPassage: {
    passage: 'Ecotourism is an exciting idea. It looks after the environment and helps local people. Ecotourists don\'t like to travel by plane because of the pollution planes cause. They travel by train, on foot, or by bike. In Taba, Egypt, ecotourists can stay in eco-lodges, dive in the Red Sea to see coral reefs, and hike in the valleys.',
    question: 'Why don\'t ecotourists like to travel by plane?',
    correct: 'Because of the pollution that planes cause.',
    distractors: ['Because planes are slower than bikes.', 'Because planes only fly under water.', 'Because there are no airports in the world.'],
    explanationAr: 'يتجنب السياح البيئيون السفر بالطائرات قدر الإمكان بسبب التلوث الذي تسببه.'
  },
  punctuationQ: {
    correct: 'We visited Elephantine Island in Aswan.',
    distractors: ['we visited elephantine island in aswan', 'We visited elephantine island in aswan?', 'we Visited Elephantine Island In Aswan.'],
    explanationAr: 'تبدأ الجملة بحرف كبير وتكتب أسماء الأماكن الجغرافية (Elephantine Island, Aswan) بحروف كبيرة.'
  }
});

export const p5_u5_exams: UnitExamSuite = buildVerifiedP1P2Suite({
  unitId: 'p5_u5',
  unitIndex: 29,
  unitTitleEn: 'Jobs We Do',
  unitTitleAr: 'الوظائف والمهن في مصر القديمة والحديثة وعمل الفريق',
  grammarTopic: 'Present Simple (s / es / ies & don\'t / doesn\'t) + must / mustn\'t',
  vocab: [
    { word: 'Scribe', meaning: 'الكاتب في مصر القديمة', phonetic: '/skraɪb/', pos: 'Noun', clozeSentence: 'In Ancient Egypt, a ______ knew how to read and write hieroglyphics well.', clozeDistractors: ['tornado', 'chickpea', 'goggle'] },
    { word: 'Craftsman', meaning: 'الحرفي والصانع الماهر', phonetic: '/ˈkrɑːftsmən/', pos: 'Noun', clozeSentence: 'An Ancient Egyptian ______ made beautiful gold jewelry, sculptures, and pottery.', clozeDistractors: ['decomposer', 'heatwave', 'felucca'] },
    { word: 'Hieroglyphics', meaning: 'الكتابة الهيروغليفية المصرية القديمة', phonetic: '/ˌhaɪərəʊˈɡlɪfɪks/', pos: 'Noun', clozeSentence: 'Egyptian writing was called ______; it consisted of about 500 signs and pictures.', clozeDistractors: ['sunglasses', 'suitcases', 'ingredients'] },
    { word: 'Trader', meaning: 'التاجر الذي يبيع ويشتري البضائع', phonetic: '/ˈtreɪdə/', pos: 'Noun', clozeSentence: 'A ______ traveled up and down the Nile buying and selling gold, linen, and grains.', clozeDistractors: ['coral reef', 'squash racket', 'sweater'] },
    { word: 'Ecosystem', meaning: 'النظام البيئي المتكامل', phonetic: '/ˈiːkəʊˌsɪstəm/', pos: 'Noun', clozeSentence: 'An ______ is the connection between living things (like plants and animals) and non-living things (like water and soil).', clozeDistractors: ['galabeya', 'football pitch', 'suitcase'] }
  ],
  phonics: {
    soundLabel: 'diphthongs /aʊ/, /aɪ/, /ɔɪ/ & suffix -ist (dentist, biologist, journalist, receptionist, pianist, scientist)',
    targetWord: 'Scientist',
    targetMeaningAr: 'عالِم (ينتهي باللاحقة المهنية -ist)',
    distractors: ['Table', 'Cloud', 'River'],
    matchingPair: ['Dentist', 'Biologist'],
    pairDistractors: ['Dentist and Cloud', 'Pianist and River', 'Journalist and Table']
  },
  dialogueQ: {
    prompt: '"Which job would you like to do when you grow up, Walid?" — "______"',
    correct: 'I want to be a vet because I love looking after injured animals.',
    distractors: ['Would you like some chickpeas?', 'It was raining yesterday at 5 PM.', 'Pack your green sweater.'],
    explanationAr: 'السؤال عن مهنة المستقبل جوابه ذكر الوظيفة وسبب اختيارها.'
  },
  grammarMcqs: [
    { prompt: 'Choose the correct Present Simple verb for a singular subject: "A vet ______ sick animals in the clinic."', correct: 'helps', distractors: ['help', 'helping', 'to help'], explanationAr: 'مع الفاعل المفرد الغائب (A vet) نضيف s للفعل في المضارع البسيط (helps).' },
    { prompt: 'Choose the correct modal of obligation: "I ______ do my English homework before watching TV."', correct: 'must', distractors: ['mustn\'t', 'doesn\'t', 'aren\'t'], explanationAr: 'للتعبير عن الالتزام والضرورة الإيجابية نستخدم must + الفعل في المصدر.' },
    { prompt: 'Choose the correct modal of prohibition: "You ______ walk on the green grass in the park."', correct: "mustn't", distractors: ['must', 'does', 'are'], explanationAr: "للمنع والتحريم نستخدم mustn't + الفعل في المصدر." }
  ],
  reorders: [
    { prompt: 'Reorder the Ancient Egypt sentence: [wrote - Scribes - everything - down - carefully].', correct: 'Scribes wrote everything down carefully', distractors: ['Everything down carefully scribes wrote', 'Wrote scribes everything down carefully', 'Carefully everything down wrote scribes'], explanationAr: 'الترتيب الصحيح: Scribes wrote everything down carefully.' },
    { prompt: 'Reorder the obligation sentence: [must - We - look - after - our - ecosystem].', correct: 'We must look after our ecosystem', distractors: ['Our ecosystem we must look after', 'Must we look after our ecosystem', 'Look after our ecosystem must we'], explanationAr: 'الترتيب الصحيح: We must look after our ecosystem.' },
    { prompt: 'Reorder: [works - A - computer - programmer - in - an - office].', correct: 'A computer programmer works in an office', distractors: ['In an office works a computer programmer', 'Works a computer programmer in an office', 'Office an in a computer programmer works'], explanationAr: 'الترتيب الصحيح: A computer programmer works in an office.' },
    { prompt: 'Reorder: [in - We - work - a - team - science - in].', correct: 'We work in a team in science', distractors: ['In a team in science work we', 'Work we in a team in science', 'A team in we work in science'], explanationAr: 'الترتيب الصحيح: We work in a team in science.' }
  ],
  readingPassage: {
    passage: 'People in Ancient Egypt worked very hard! Everyone had a job. Farmers planted crops, usually grains like wheat, corn, and flax. Craftsmen made beautiful paintings and gold jewelry. Scribes knew how to read and write well; they kept records and lists for important things. Ancient Egyptian women could also weave baskets, bake bread, and even become pharaohs like Hatshepsut!',
    question: 'Who kept written records and lists in Ancient Egypt?',
    correct: 'The scribes.',
    distractors: ['The football players.', 'The computer programmers.', 'The scuba divers.'],
    explanationAr: 'الكتبة (Scribes) هم من كانوا يتقنون القراءة والكتابة ويدونون السجلات في مصر القديمة.'
  },
  punctuationQ: {
    correct: 'Hatshepsut was a famous queen in Ancient Egypt.',
    distractors: ['hatshepsut was a famous queen in ancient egypt', 'Hatshepsut was a famous queen in ancient egypt?', 'hatshepsut Was A Famous Queen In Ancient Egypt.'],
    explanationAr: 'اسم الملكة حتشبسوت (Hatshepsut) ومصر القديمة (Ancient Egypt) يكتبان بحروف كبيرة.'
  }
});

export const p5_u6_exams: UnitExamSuite = buildVerifiedP1P2Suite({
  unitId: 'p5_u6',
  unitIndex: 30,
  unitTitleEn: "What's the Weather Like?",
  unitTitleAr: 'كيف تبدو حالة الطقس؟ والظواهر الجوية وظروف التكرار',
  grammarTopic: 'Adverbs of Frequency (always, usually, often, sometimes, never) & How often...?',
  vocab: [
    { word: 'Tornado', meaning: 'إعصار قمعي شديد الرياح', phonetic: '/tɔːˈneɪdəʊ/', pos: 'Noun', clozeSentence: 'A ______ is a very big, wide, dark cloud that spins violently in the sky.', clozeDistractors: ['chickpea', 'galabeya', 'felucca'] },
    { word: 'Sandstorm', meaning: 'عاصفة رملية محملة بالأتربة', phonetic: '/ˈsændstɔːm/', pos: 'Noun', clozeSentence: 'During a ______, strong winds blow sand in the desert and it is hard to see.', clozeDistractors: ['squash racket', 'botanical garden', 'scribe'] },
    { word: 'Heatwave', meaning: 'موجة حارة شديدة', phonetic: '/ˈhiːtweɪv/', pos: 'Noun', clozeSentence: 'In a ______, the temperature goes very high, above 40 degrees, so we stay in the shade.', clozeDistractors: ['karate suit', 'suitcase', 'craftsman'] },
    { word: 'Tidal wave', meaning: 'موجة مد بحري عاتية', phonetic: '/ˈtaɪdəl weɪv/', pos: 'Noun', clozeSentence: 'A ______ is a huge wall of sea water that crashes onto the coast.', clozeDistractors: ['football pitch', 'producer', 'sweater'] },
    { word: 'Shade', meaning: 'الظل الوارف بعيداً عن الشمس', phonetic: '/ʃeɪd/', pos: 'Noun', clozeSentence: 'When it is very hot and sunny, we sit in the cool ______ under a tree.', clozeDistractors: ['flood', 'lightning', 'sandstorm'] }
  ],
  phonics: {
    soundLabel: '/b/ vs /p/ (bull/pull, bear/pear, beach/peach) & silent letters (lamb, wrist, knife, island, climb, castle)',
    targetWord: 'Island',
    targetMeaningAr: 'جزيرة (تحتوي على حرف s صامت لا ينطق)',
    distractors: ['Sun', 'Dog', 'Pen'],
    matchingPair: ['Climb', 'Lamb'],
    pairDistractors: ['Climb and Sun', 'Knife and Dog', 'Castle and Pen']
  },
  dialogueQ: {
    prompt: '"What\'s the weather like in Cairo today?" — "______"',
    correct: 'It is sunny and warm, around 25 degrees.',
    distractors: ['Would you like some chickpeas?', 'Scribes wrote hieroglyphics.', 'I wear swimming goggles.'],
    explanationAr: 'السؤال عن حالة الطقس بـ What\'s the weather like جوابه وصف الجو ودرجة الحرارة.'
  },
  grammarMcqs: [
    { prompt: 'Choose the correct word order with an adverb of frequency and verb "to be": "It ______ very hot in Aswan in summer."', correct: 'is always', distractors: ['always is', 'always be', 'are always'], explanationAr: 'ظروف التكرار (always, usually, never) تأتي بعد verb to be (am/is/are) وقبل الأفعال الأساسية.' },
    { prompt: 'Choose the correct word order with a main verb: "It ______ rains in the Western Desert."', correct: 'never', distractors: ['don\'t', 'isn\'t', 'aren\'t'], explanationAr: 'نستخدم ظرف التكرار never قبل الفعل المصرف (rains) للدلالة على ندرة أو انعدام المطر.' },
    { prompt: 'Ask about frequency: "______ often do you go to the park in spring?"', correct: 'How', distractors: ['What', 'Who', 'Where'], explanationAr: 'نسأل عن عدد مرات التكرار باستخدام أداة الاستفهام How often.' }
  ],
  reorders: [
    { prompt: 'Reorder the weather question: [the - What\'s - weather - like - today - ?].', correct: "What's the weather like today?", distractors: ["The weather what's like today?", "Like today what's the weather?", "Weather the like what's today?"], explanationAr: "السؤال عن حالة الجو: What's the weather like today?" },
    { prompt: 'Reorder the frequency sentence: [always - I - drink - water - in - a - heatwave].', correct: 'I always drink water in a heatwave', distractors: ['Drink water always I in a heatwave', 'In a heatwave always drink I water', 'Water I always drink in a heatwave'], explanationAr: 'الترتيب الصحيح: I always drink water in a heatwave.' },
    { prompt: 'Reorder the question: [often - How - does - it - rain - in - Cairo - ?].', correct: 'How often does it rain in Cairo?', distractors: ['Does it rain how often in Cairo?', 'In Cairo how often it does rain?', 'Rain how often does it in Cairo?'], explanationAr: 'السؤال عن التكرار: How often does it rain in Cairo?' },
    { prompt: 'Reorder: [stay - in - a - sandstorm - indoors].', correct: 'Stay indoors in a sandstorm', distractors: ['Indoors in a sandstorm stay', 'A sandstorm stay indoors in', 'In a sandstorm indoors stay'], explanationAr: 'نصيحة السلامة: Stay indoors in a sandstorm.' }
  ],
  readingPassage: {
    passage: 'We have a nice variety of weather in Egypt, although it is usually very dry. In Alexandria, it often rains in winter and it is cool and windy. In Cairo, it doesn\'t often rain; there\'s only about 25 mm of rain every year. The desert has a very special climate, with very hot days and very cold nights!',
    question: 'What is the climate like in the Egyptian desert?',
    correct: 'It has very hot days and very cold nights.',
    distractors: ['It snows heavily all day and night.', 'It rains every single hour.', 'It is covered by deep oceans.'],
    explanationAr: 'يتميز مناخ الصحراء بنهار شديد الحرارة وليالٍ شديدة البرودة.'
  },
  punctuationQ: {
    correct: "What's the weather like in Alexandria?",
    distractors: ['whats the weather like in alexandria', "What's the weather like in alexandria.", "what's The Weather Like In Alexandria?"],
    explanationAr: 'يبدأ السؤال بحرف كبير مع الفاصلة العليا في What\'s وكتابة اسم المدينة Alexandria بحرف كبير.'
  }
});

// -------------------------------------------------------------------------
// Primary 6 Exam Suites (Units 1 to 6 - Connect 6)
// -------------------------------------------------------------------------
export const p6_u1_exams: UnitExamSuite = buildVerifiedP1P2Suite({
  unitId: 'p6_u1',
  unitIndex: 31,
  unitTitleEn: 'Green Cities',
  unitTitleAr: 'مدن خضراء وحديقة المجتمع والغابة المصغرة',
  grammarTopic: 'Present Simple & Adverbs of Frequency (always, usually, often, sometimes, rarely, never)',
  vocab: [
    { word: 'Community garden', meaning: 'حديقة المجتمع فوق سطح المبنى', phonetic: '/kəˈmjuːnɪti ˈɡɑːdən/', pos: 'Noun', clozeSentence: 'A ______ is a big green space on the roof of an apartment block where volunteers grow vegetables.', clozeDistractors: ['caravan', 'firework', 'tornado'] },
    { word: 'Apartment block', meaning: 'عمارة سكنية متعددة الطوابق', phonetic: '/əˈpɑːtmənt blɒk/', pos: 'Noun', clozeSentence: 'Nabila and Maryam live in a tall ______ in the city neighborhood.', clozeDistractors: ['candle wax', 'minaret', 'quad bike'] },
    { word: 'Natural fertilizer', meaning: 'سماد طبيعي عضوي بدون كيماويات', phonetic: '/ˈnætʃərəl ˈfɜːtɪlaɪzə/', pos: 'Noun', clozeSentence: 'We only use ______, so our tomatoes and peppers are 100% organic and healthy.', clozeDistractors: ['plastic waste', 'fireworks', 'playlists'] },
    { word: 'Harvest', meaning: 'يحصد المحاصيل الزراعية', phonetic: '/ˈhɑːvɪst/', pos: 'Verb', clozeSentence: 'In one year, our rooftop volunteers can ______ twenty kilos of fresh vegetables.', clozeDistractors: ['hang up', 'blow up', 'unplug'] },
    { word: 'Mini-forest', meaning: 'الغابة الحضرية المصغرة', phonetic: '/ˈmɪni ˈfɒrɪst/', pos: 'Noun', clozeSentence: 'An organization called ______ plants small areas of local trees in the middle of cities.', clozeDistractors: ['Souk', 'Compass', 'Streamers'] }
  ],
  phonics: {
    soundLabel: '/θ/ (thin, thumb, think) vs /s/ (sin, sum, sink)',
    targetWord: 'Think',
    targetMeaningAr: 'يفكر (يبدأ بصوت th /θ/)',
    distractors: ['Sink', 'Sun', 'Sit'],
    matchingPair: ['Thumb', 'Thick'],
    pairDistractors: ['Thumb and Sum', 'Thick and Sick', 'Think and Sink']
  },
  dialogueQ: {
    prompt: '"How often do you go to help at the community garden, Nabila?" — "______"',
    correct: 'I go there every Friday afternoon to weed the garden and water the tomatoes.',
    distractors: ['Ibn Battuta traveled in a caravan.', 'We set off fireworks at night.', 'Press the brake on your bike.'],
    explanationAr: 'السؤال بـ How often نجيب عنه بذكر عدد المرات أو الموعد المنتظم.'
  },
  grammarMcqs: [
    { prompt: 'Choose the correct Present Simple form: "The Mini-Forest organization rarely ______enough volunteers for all its projects, so we need more people."', correct: 'has', distractors: ['have', 'having', 'are'], explanationAr: 'الفاعل المفرد (The Mini-Forest organization) يأخذ الفعل المفرد has حتى مع وجود ظرف التكرار rarely قبله.' },
    { prompt: 'Choose the correct negative Present Simple form: "We ______ use chemicals in our community garden; everything is organic."', correct: 'never', distractors: ['always', 'usually', 'often'], explanationAr: 'بما أن كل شيء عضوي طبيعي فنحن لا نستخدم الكيماويات أبداً (never).' },
    { prompt: 'Why do Mini-Forest volunteers only plant native local trees? "Because foreign trees don\'t ______ naturally in our local climate."', correct: 'grow', distractors: ['grows', 'growing', 'grew'], explanationAr: 'بعد الفعل المساعد المنفي don\'t يأتي الفعل الأساسي في المصدر (grow).' }
  ],
  reorders: [
    { prompt: 'Reorder the frequency sentence: [never - We - grow - foreign - plants].', correct: 'We never grow foreign plants', distractors: ['Foreign plants we never grow', 'Never we grow foreign plants', 'Grow foreign plants never we'], explanationAr: 'يأتي ظرف التكرار never بين الفاعل We والفعل الأساسي grow.' },
    { prompt: 'Reorder the question: [often - How - do - you - help - in - the - garden - ?].', correct: 'How often do you help in the garden?', distractors: ['Do you help how often in the garden?', 'In the garden how often you do help?', 'Help in the garden how often do you?'], explanationAr: 'السؤال عن عدد مرات المساعدة: How often do you help in the garden?' },
    { prompt: 'Reorder: [clean - Roof - gardens - help - the - air].', correct: 'Roof gardens help clean the air', distractors: ['Clean the air roof gardens help', 'Help roof gardens clean the air', 'The air clean help roof gardens'], explanationAr: 'الترتيب الصحيح: Roof gardens help clean the air.' },
    { prompt: 'Reorder: [use - We - only - natural - fertilizer].', correct: 'We use only natural fertilizer', distractors: ['Natural fertilizer only we use', 'Use we only natural fertilizer', 'Fertilizer natural only we use'], explanationAr: 'الترتيب الصحيح: We use only natural fertilizer.' }
  ],
  readingPassage: {
    passage: 'Maryam visits her aunt Samira on Fridays. Aunt Samira helps at a community garden on the roof of her apartment block. The volunteers grow tomatoes, peppers, onions, lettuce, and even lemon and date trees! Roof gardens help clean the air in the city, and they are a great place to meet people and make friends.',
    question: 'What are two benefits of roof gardens in the city?',
    correct: 'They help clean the air and are a great place to make friends.',
    distractors: ['They pollute the city and waste water.', 'They only grow plastic flowers.', 'They are used for quad biking.'],
    explanationAr: 'تنقي حدائق الأسطح هواء المدينة وتعد مكاناً رائعاً للتعاون وتكوين الصداقات.'
  },
  punctuationQ: {
    correct: 'Do you help at the community garden on Fridays?',
    distractors: ['do you help at the community garden on fridays', 'Do you help at the community garden on Fridays.', 'do You Help At The Community Garden On Fridays?'],
    explanationAr: 'يبدأ السؤال بـ Do بحرف كبير وتكتب أيام الأسبوع (Fridays) بحرف كبير وينتهي بعلامة استفهام.'
  }
});

export const p6_u2_exams: UnitExamSuite = buildVerifiedP1P2Suite({
  unitId: 'p6_u2',
  unitIndex: 32,
  unitTitleEn: 'We Are All Different',
  unitTitleAr: 'كلنا مختلفون والسمات الشخصية وضمائر الوصل والصفات',
  grammarTopic: 'Relative Clauses (who, which, where) & -ed vs. -ing Adjectives',
  vocab: [
    { word: 'Polite', meaning: 'مهذب ولبق', phonetic: '/pəˈlaɪt/', pos: 'Adjective', clozeSentence: 'Hatem is very ______; he always shows respect to his teachers and classmates.', clozeDistractors: ['messy', 'Broken', 'salty'] },
    { word: 'Helpful', meaning: 'متعاون ويحب المساعدة', phonetic: '/ˈhɛlpfʊl/', pos: 'Adjective', clozeSentence: 'Zein is kind and ______; he shows the new student around the school.', clozeDistractors: ['caravan', 'minaret', 'fertilizer'] },
    { word: 'Clever', meaning: 'ذكي وماهر في الدراسة', phonetic: '/ˈklɛvə/', pos: 'Adjective', clozeSentence: 'Nadine is ______ and good at math; she helps her friends understand difficult sums.', clozeDistractors: ['streamer', 'incense', 'compass'] },
    { word: 'Nervous', meaning: 'متوتر وقلق قليلاً', phonetic: '/ˈnɜːvəs/', pos: 'Adjective', clozeSentence: 'On his first day at a new school, Asser felt a bit shy and ______.', clozeDistractors: ['rooftop', 'organic', 'wooden'] },
    { word: 'Organized', meaning: 'منظم ومرتب', phonetic: '/ˈɔːɡənaɪzd/', pos: 'Adjective', clozeSentence: 'Salma is very tidy and ______; she always knows where her books and pens are.', clozeDistractors: ['firework', 'camel', 'sandstorm'] }
  ],
  phonics: {
    soundLabel: 'vowel sounds /æ/ (hat, cat) vs /ʌ/ (hut, cut, truck, stuck)',
    targetWord: 'Truck',
    targetMeaningAr: 'شاحنة (تحتوي على الصوت المتحرك القصير /ʌ/)',
    distractors: ['Tree', 'Time', 'Boat'],
    matchingPair: ['Cut', 'Hut'],
    pairDistractors: ['Cut and Cat', 'Hut and Hat', 'Truck and Track']
  },
  dialogueQ: {
    prompt: '"Welcome to our school, Hazem! Do you know where the science laboratories are?" — "______"',
    correct: 'No, I don\'t. Could you show me where they are, please?',
    distractors: ['We harvest twenty kilos of tomatoes.', 'Blow up the colorful balloons.', 'Light the candle wick carefully.'],
    explanationAr: 'الطالب الجديد يرد بأدب سائلاً زميله إرشاده إلى مكان معامل العلوم.'
  },
  grammarMcqs: [
    { prompt: 'Choose the correct relative pronoun for a person: "Mr. Afifi is the teacher ______ runs the after-school football club."', correct: 'who', distractors: ['which', 'where', 'when'], explanationAr: 'مع الاسم العاقل (the teacher) نستخدم ضمير الوصل who.' },
    { prompt: 'Choose the correct relative pronoun for a place where an action happens: "This is the building ______ we do physical education."', correct: 'where', distractors: ['who', 'whose', 'whom'], explanationAr: 'مع اسم المكان الذي يحدث بداخله الفعل نستخدم ضمير الوصل where.' },
    { prompt: 'Choose between -ed and -ing adjectives: "The history book is very ______, so the students are ______ in reading it."', correct: 'interesting / interested', distractors: ['interested / interesting', 'interest / interests', 'interesting / interest'], explanationAr: 'الصفة المنتهية بـ ing (interesting) تصف الشيء المسبب للشعور (الكتاب)، بينما المنتهية بـ ed (interested) تصف شعور الأشخاص.' }
  ],
  reorders: [
    { prompt: 'Reorder the relative clause sentence: [is - Dalia - the - girl - who - sits - next - to - me].', correct: 'Dalia is the girl who sits next to me', distractors: ['Who sits next to me Dalia is the girl', 'The girl Dalia is who sits next to me', 'Next to me sits the girl who is Dalia'], explanationAr: 'الترتيب الصحيح مع ضمير الوصل who: Dalia is the girl who sits next to me.' },
    { prompt: 'Reorder: [are - Ostriches - birds - which - fast - run].', correct: 'Ostriches are birds which run fast', distractors: ['Birds which run fast ostriches are', 'Which run fast are ostriches birds', 'Run fast ostriches are birds which'], explanationAr: 'الترتيب الصحيح مع which لغير العاقل: Ostriches are birds which run fast.' },
    { prompt: 'Reorder: [is - He - polite - and - helpful].', correct: 'He is polite and helpful', distractors: ['Polite and helpful he is', 'Is he polite and helpful', 'Helpful and polite is he'], explanationAr: 'الترتيب الصحيح: He is polite and helpful.' },
    { prompt: 'Reorder: [excited - I - am - to - see - the - school].', correct: 'I am excited to see the school', distractors: ['To see the school I am excited', 'Excited am I to see the school', 'The school to see I am excited'], explanationAr: 'نستخدم excited لوصف شعور المتحدث.' }
  ],
  readingPassage: {
    passage: 'El Fouad School is a large modern school in Cairo. We are proud of our new, modern buildings. The Ahmed Zewail Building is the place where students study science in four laboratories. The West Court is a large open area where students have break and play in the playground. We also have IT lessons in the computer building which has over 50 desktop computers!',
    question: 'Where do students study science at El Fouad School?',
    correct: 'In the Ahmed Zewail Building.',
    distractors: ['On a desert caravan.', 'At Khan el-Khalili bazaar.', 'Inside a rooftop tent.'],
    explanationAr: 'يدرس الطلاب العلوم في مبنى أحمد زويل (The Ahmed Zewail Building).'
  },
  punctuationQ: {
    correct: 'Mr. Afifi is the teacher who teaches math.',
    distractors: ['mr afifi is the teacher who teaches math', 'Mr. afifi is the teacher who teaches math?', 'mr. Afifi Is The Teacher Who Teaches Math.'],
    explanationAr: 'اللقب Mr. واسم العلم Afifi يكتبان بحروف كبيرة وتنتهي الجملة الخبرية بنقطة.'
  }
});

export const p6_u3_exams: UnitExamSuite = buildVerifiedP1P2Suite({
  unitId: 'p6_u3',
  unitIndex: 33,
  unitTitleEn: 'Vacation Plans',
  unitTitleAr: 'خطط الإجازة واستكشاف معالم مصر والجمل الشرطية الصفرية',
  grammarTopic: 'Zero Conditional (If / When + Present Simple, Present Simple) & Prepositions of Time (at, on, in)',
  vocab: [
    { word: 'Khan el-Khalili', meaning: 'سوق خان الخليلي التاريخي بالقاهرة', phonetic: '/xɑːn ɛl xəˈliːli/', pos: 'Noun', clozeSentence: 'In Cairo, we can visit the Manial Palace Museum and shop at the famous ______ bazaar.', clozeDistractors: ['Mini-forest', 'Esophagus', 'Fennec fox'] },
    { word: 'Quad biking', meaning: 'ركوب دراجات الدفع الرباعي في الصحراء', phonetic: '/kwɒd ˈbaɪkɪŋ/', pos: 'Noun', clozeSentence: 'On Tuesday afternoon, we can go ______ in the desert in Giza; wear a helmet!', clozeDistractors: ['making candles', 'weeding gardens', 'chewing food'] },
    { word: 'Minaret', meaning: 'مئذنة باب زويلة التاريخية', phonetic: '/ˌmɪnəˈrɛt/', pos: 'Noun', clozeSentence: 'Let\'s climb the Bab Zuweila ______ at sunset to get a spectacular view of Cairo!', clozeDistractors: ['swimming pool', 'tennis court', 'bookcase'] },
    { word: 'Rollercoaster', meaning: 'قطار الملاهي السريع', phonetic: '/ˈrəʊləˌkəʊstə/', pos: 'Noun', clozeSentence: 'Let\'s go to the theme park and ride on a fast ______!', clozeDistractors: ['fertilizer', 'dictionary', 'laboratory'] },
    { word: 'Sharm El-Sheikh', meaning: 'مدينة شرم الشيخ الساحلية بجنوب سيناء', phonetic: '/ʃɑːm ɛl ʃeɪk/', pos: 'Noun', clozeSentence: 'Many tourists travel to ______ on the Red Sea to go diving and snorkeling.', clozeDistractors: ['the kitchen cupboard', 'the school desk', 'the pencil case'] }
  ],
  phonics: {
    soundLabel: 'initial /w/ (wet, whale, west) vs /v/ (vet, veil, vest)',
    targetWord: 'Vest',
    targetMeaningAr: 'سترة / صديري (تبدأ بصوت الحرف /v/)',
    distractors: ['Wet', 'Whale', 'Water'],
    matchingPair: ['Vet', 'Vest'],
    pairDistractors: ['Vet and Wet', 'Vest and West', 'Veil and Whale']
  },
  dialogueQ: {
    prompt: '"What happens if you don\'t wear a helmet when you go quad biking?" — "______"',
    correct: 'If you fall off the quad bike without a helmet, you can hurt your head.',
    distractors: ['We use natural fertilizer on the roof.', 'Ibn Battuta was a great explorer.', 'Melt the wax to make a candle.'],
    explanationAr: 'تستخدم الحالة الشرطية الصفرية/الأولى لبيان نتيجة عدم ارتداء الخوذة الواقية.'
  },
  grammarMcqs: [
    { prompt: 'Choose the correct Zero Conditional verb: "When you ______ water to 100 degrees Celsius, it boils."', correct: 'heat', distractors: ['heated', 'will heating', 'heats'], explanationAr: 'في الحالة الشرطية الصفرية (If/When + Present Simple, Present Simple) مع الفاعل you نستخدم المصدر heat.' },
    { prompt: 'Choose the correct preposition of time: "Our family is traveling to Sharm El-Sheikh ______ July."', correct: 'in', distractors: ['on', 'at', 'between'], explanationAr: 'مع شهور السنة والفصول والسنوات نستخدم حرف الجر in (in July).' },
    { prompt: 'Choose the correct preposition of time: "We are visiting the Manial Palace Museum ______ Sunday morning."', correct: 'on', distractors: ['in', 'at', 'under'], explanationAr: 'مع أيام الأسبوع أو الأيام المحددة نستخدم حرف الجر on (on Sunday morning).' }
  ],
  reorders: [
    { prompt: 'Reorder the Zero Conditional sentence: [can\'t - If - you - don\'t - have - a - pen, - you - write].', correct: "If you don't have a pen, you can't write", distractors: ["You can't write if you don't have a pen,", "Don't have a pen if you, you can't write", "Write you can't if you don't have a pen"], explanationAr: "الترتيب الصحيح لشرط الحقيقة: If you don't have a pen, you can't write." },
    { prompt: 'Reorder the suggestion: [climb - Let\'s - the - Bab - Zuweila - minaret].', correct: "Let's climb the Bab Zuweila minaret", distractors: ["The Bab Zuweila minaret let's climb", "Climb let's the Bab Zuweila minaret", "Minaret the Bab Zuweila climb let's"], explanationAr: "الترتيب الصحيح: Let's climb the Bab Zuweila minaret." },
    { prompt: 'Reorder: [meet - We - at - midday - on - Saturday].', correct: 'We meet at midday on Saturday', distractors: ['At midday on Saturday meet we', 'Meet we at midday on Saturday', 'Saturday on at midday we meet'], explanationAr: 'نستخدم at مع midday و on مع أيام الأسبوع (Saturday).' },
    { prompt: 'Reorder: [afraid - Fatima - is - of - heights].', correct: 'Fatima is afraid of heights', distractors: ['Of heights Fatima is afraid', 'Is Fatima afraid of heights', 'Heights of afraid is Fatima'], explanationAr: 'الترتيب الصحيح: Fatima is afraid of heights (تخاف من المرتفعات).' }
  ],
  readingPassage: {
    passage: 'Samer is excited about his vacation in Cairo with his cousins! On Monday, they can visit the Manial Palace Museum and take photos. On Tuesday, they can go quad biking in the desert in Giza. On Wednesday, they want to ride on a rollercoaster at a theme park and climb the Bab Zuweila minaret at sunset to watch the city lights!',
    question: 'Why do Samer and his cousins want to climb the Bab Zuweila minaret at sunset?',
    correct: 'To watch the beautiful view and city lights of Cairo.',
    distractors: ['To plant tomatoes on the roof.', 'To catch fish in the Red Sea.', 'To study in the science laboratory.'],
    explanationAr: 'يتسلقون مئذنة باب زويلة وقت الغروب لمشاهدة منظر القاهرة الخلاب وأضواء المدينة.'
  },
  punctuationQ: {
    correct: 'We are visiting Khan el-Khalili on Monday.',
    distractors: ['we are visiting khan el-khalili on monday', 'We are visiting khan el-khalili on monday?', 'we Are Visiting Khan El-Khalili On Monday.'],
    explanationAr: 'اسم المعلم التاريخي (Khan el-Khalili) ويوم الأسبوع (Monday) يكتبان بحروف كبيرة.'
  }
});

export const p6_u4_exams: UnitExamSuite = buildVerifiedP1P2Suite({
  unitId: 'p6_u4',
  unitIndex: 34,
  unitTitleEn: 'Celebrate Good Times!',
  unitTitleAr: 'احتفل بالأوقات السعيدة والتحضير للحفلات والمضارع المستمر',
  grammarTopic: 'Present Continuous Tense for Actions Happening Now (am / is / are + Verb-ing)',
  vocab: [
    { word: 'Balloons', meaning: 'البالونات الملونة للزينة', phonetic: '/bəˈluːnz/', pos: 'Noun', clozeSentence: 'Hani is blowing up colorful ______ for his grandfather\'s birthday party.', clozeDistractors: ['fertilizers', 'laboratories', 'caravans'] },
    { word: 'Streamers', meaning: 'أشرطة الزينة الورقية الملونة', phonetic: '/ˈstriːməz/', pos: 'Noun', clozeSentence: 'Amina and Dalida are hanging up the ______ on the ceiling using string.', clozeDistractors: ['hieroglyphics', 'chickpeas', 'tornadoes'] },
    { word: 'Invitations', meaning: 'بطاقات الدعوة للحفل', phonetic: '/ˌɪnvɪˈteɪʃənz/', pos: 'Noun', clozeSentence: 'Nessma is writing and sending the email ______ to all our cousins and friends.', clozeDistractors: ['goggles', 'minarets', 'feluccas'] },
    { word: 'Playlist', meaning: 'قائمة الأغاني والموسيقى المختارة', phonetic: '/ˈpleɪlɪst/', pos: 'Noun', clozeSentence: 'Abbas is making a ______ of happy songs on his phone for the party.', clozeDistractors: ['sandstorm', 'galabeya', 'esophagus'] },
    { word: 'Fireworks', meaning: 'الألعاب النارية المضيئة في السماء', phonetic: '/ˈfaɪəwɜːks/', pos: 'Noun', clozeSentence: 'When it gets dark, Youssef and Dad are letting off the ______ in the yard.', clozeDistractors: ['dictionaries', 'notebooks', 'toothbrushes'] }
  ],
  phonics: {
    soundLabel: '/e/ (bed, head, bread, ledge) vs /iː/ (feed, eat, clean,dream)',
    targetWord: 'Bread',
    targetMeaningAr: 'خبز (الحرفان ea ينطقان صوتاً قصيراً /e/ مثل bed)',
    distractors: ['Clean', 'Dream', 'Feed'],
    matchingPair: ['Bread', 'Head'],
    pairDistractors: ['Bread and Clean', 'Head and Dream', 'Bed and Eat']
  },
  dialogueQ: {
    prompt: '"Hi Youssef, what are you doing right now?" — "______"',
    correct: 'I am helping Hani blow up the balloons and hang up the streamers!',
    distractors: ['If you heat ice, it melts.', 'We never use chemicals in the garden.', 'Marco Polo traveled to China.'],
    explanationAr: 'السؤال في زمن المضارع المستمر عن اللحظة الحالية (right now) جوابه I am + verb-ing.'
  },
  grammarMcqs: [
    { prompt: 'Choose the correct Present Continuous form: "Look! Dalida and Amina ______ hanging up the streamers."', correct: 'are', distractors: ['is', 'am', 'was'], explanationAr: 'الفاعل الجمع (Dalida and Amina) يأخذ الفعل المساعد are في المضارع المستمر.' },
    { prompt: 'Choose the correct verb collocation for party preparations: "Who is going to ______ the cake with candles?"', correct: 'decorate', distractors: ['blow up', 'hang up', 'let off'], explanationAr: 'المتلازمة اللفظية الصحيحة هي: decorate the cake (يزين الكعكة).' },
    { prompt: 'Choose the correct verb collocation for balloons: "Can you help me ______ the balloons?"', correct: 'blow up', distractors: ['send', 'write', 'melt'], explanationAr: 'المتلازمة اللفظية لنفخ البالونات هي blow up the balloons.' }
  ],
  reorders: [
    { prompt: 'Reorder the Present Continuous question: [you - Are - sending - the - invitations - now - ?].', correct: 'Are you sending the invitations now?', distractors: ['You are sending the invitations now?', 'Sending the invitations are you now?', 'The invitations are you sending now?'], explanationAr: 'السؤال في المضارع المستمر يبدأ بـ Are + الفاعل + v-ing.' },
    { prompt: 'Reorder the statement: [is - Mom - decorating - the - birthday - cake].', correct: 'Mom is decorating the birthday cake', distractors: ['The birthday cake Mom is decorating', 'Is Mom decorating the birthday cake', 'Decorating the birthday cake is Mom'], explanationAr: 'الترتيب الصحيح: Mom is decorating the birthday cake.' },
    { prompt: 'Reorder: [up - He - is - blowing - the - balloons].', correct: 'He is blowing up the balloons', distractors: ['The balloons he is blowing up', 'Is he blowing up the balloons', 'Blowing up the balloons is he'], explanationAr: 'الترتيب الصحيح: He is blowing up the balloons.' },
    { prompt: 'Reorder: [having - We - are - a - family - party].', correct: 'We are having a family party', distractors: ['A family party we are having', 'Are we having a family party', 'Party a family we are having'], explanationAr: 'الترتيب الصحيح: We are having a family party.' }
  ],
  readingPassage: {
    passage: 'around the world, people celebrate birthdays in interesting ways! In Egypt and the USA, families often put candles on a cake; the number of candles shows the person\'s age. In China, people like to eat long noodles on their birthdays because long noodles mean a long life! In India, children often give chocolates to all their classmates at school.',
    question: 'Why do people in China eat long noodles on their birthdays?',
    correct: 'Because long noodles symbolize a long life.',
    distractors: ['Because they don\'t have any plates.', 'Because noodles grow on roof gardens.', 'Because it helps them ride quad bikes.'],
    explanationAr: 'يتناول الصينيون المكرونة الطويلة (long noodles) في أعياد الميلاد لأنها ترمز إلى طول العمر.'
  },
  punctuationQ: {
    correct: 'Are you hanging up the streamers, Amina?',
    distractors: ['are you hanging up the streamers amina', 'Are you hanging up the streamers, Amina.', 'are You Hanging Up The Streamers, Amina?'],
    explanationAr: 'يبدأ السؤال بـ Are بحرف كبير وتوضع فاصلة قبل المخاطب Amina وعلامة استفهام في النهاية.'
  }
});

export const p6_u5_exams: UnitExamSuite = buildVerifiedP1P2Suite({
  unitId: 'p6_u5',
  unitIndex: 35,
  unitTitleEn: 'Amazing Journeys',
  unitTitleAr: 'رحلات مدهشة عبر التاريخ وماركو بولو وحضارة النوق والماضي البسيط',
  grammarTopic: 'Past Simple Tense (was / were, regular & irregular verbs, Did + subject + infinitive?)',
  vocab: [
    { word: 'Caravan', meaning: 'قافلة الجمال المسافرة عبر الصحراء', phonetic: '/ˈkærəvæn/', pos: 'Noun', clozeSentence: 'A ______ is a group of camels and people traveling together across the desert.', clozeDistractors: ['playlist', 'community garden', 'rollercoaster'] },
    { word: 'Marco Polo', meaning: 'الرحالة الإيطالي الشهير ماركو بولو', phonetic: '/ˈmɑːkəʊ ˈpəʊləʊ/', pos: 'Noun', clozeSentence: '______ was a twenty-one-year-old Italian explorer who crossed the Gobi Desert to China in 1275.', clozeDistractors: ['Ahmed Zewail', 'Hedaya Malak', 'Miss Mona'] },
    { word: 'Dunes', meaning: 'الكثبان الرملية الصحراوية المتحركة', phonetic: '/djuːnz/', pos: 'Noun', clozeSentence: 'The sand ______ in the desert moved with every step the camels made, like huge yellow waves.', clozeDistractors: ['streamers', 'laboratories', 'invitations'] },
    { word: 'Felucca', meaning: 'الفلوكة الشراعية الخشبية على النيل', phonetic: '/fəˈlʊkə/', pos: 'Noun', clozeSentence: 'Today I had a wonderful experience on a traditional Egyptian ______ with a big white sail on the Nile.', clozeDistractors: ['quad bike', 'rollercoaster', 'spaceship'] },
    { word: 'Sculptures', meaning: 'المنحوتات والتماثيل الفخارية والتاريخية', phonetic: '/ˈskʌlptʃəz/', pos: 'Noun', clozeSentence: 'In Nigeria, archaeologists found amazing Nok terracotta ______ made of clay from 2,500 years ago.', clozeDistractors: ['fireworks', 'balloons', 'Fertilizers'] }
  ],
  phonics: {
    soundLabel: '/dʒ/ (jump,itage, bridge, fridge) vs /ʒ/ (treasure, measure, television, usually)',
    targetWord: 'Treasure',
    targetMeaningAr: 'كنز (يحتوي على الصوت /ʒ/)',
    distractors: ['Tree', 'Tent', 'Boat'],
    matchingPair: ['Treasure', 'Measure'],
    pairDistractors: ['Treasure and Tent', 'Measure and Boat', 'Television and Tree']
  },
  dialogueQ: {
    prompt: '"Where did you go on vacation last year, Rami?" — "______"',
    correct: 'We went to Luxor and sailed on the River Nile in a traditional felucca!',
    distractors: ['I am blowing up the balloons now.', 'We never use chemicals in our garden.', 'If you heat water, it boils.'],
    explanationAr: 'السؤال في الماضي البسيط (Where did you go last year?) نجيب عنه بفعل في التصريف الثاني (We went... and sailed...).'
  },
  grammarMcqs: [
    { prompt: 'Choose the correct Past Simple verb in a question after "Did": "Did Marco Polo ______ across the Gobi Desert by camel?"', correct: 'travel', distractors: ['traveled', 'traveling', 'travels'], explanationAr: 'في السؤال الذي يبدأ بـ Did يأتي الفعل الأساسي في المصدر بدون إضافات (travel).' },
    { prompt: 'Choose the correct Past Simple form of "be" for a plural subject: "The Nok people ______ famous for making terracotta sculptures and iron tools."', correct: 'were', distractors: ['was', 'are', 'is'], explanationAr: 'مع الفاعل الجمع في الماضي البسيط (The Nok people) نستخدم were.' },
    { prompt: 'Choose the correct irregular Past Simple verb: "The caravan ______ a green oasis with palm trees and fresh water."', correct: 'found', distractors: ['find', 'finds', 'finding'], explanationAr: 'الماضي البسيط من الفعل غير المنتظم find هو found.' }
  ],
  reorders: [
    { prompt: 'Reorder the Past Simple question: [go - Did - you - on - the - felucca - ?].', correct: 'Did you go on the felucca?', distractors: ['You did go on the felucca?', 'Go did you on the felucca?', 'On the felucca did you go?'], explanationAr: 'السؤال في الماضي البسيط: Did + الفاعل + المصدر (go).' },
    { prompt: 'Reorder the historical sentence: [went - Marco - Polo - to - China].', correct: 'Marco Polo went to China', distractors: ['To China Marco Polo went', 'Went Marco Polo to China', 'China to went Marco Polo'], explanationAr: 'الترتيب الصحيح: Marco Polo went to China.' },
    { prompt: 'Reorder: [sailed - The - ship - slowly - on - the - Nile].', correct: 'The ship sailed slowly on the Nile', distractors: ['On the Nile sailed slowly the ship', 'Sailed the ship slowly on the Nile', 'Slowly on the Nile the ship sailed'], explanationAr: 'الترتيب الصحيح: The ship sailed slowly on the Nile.' },
    { prompt: 'Reorder: [had - We - a - wonderful - experience].', correct: 'We had a wonderful experience', distractors: ['A wonderful experience we had', 'Had we a wonderful experience', 'Experience a wonderful had we'], explanationAr: 'الترتيب الصحيح: We had a wonderful experience.' }
  ],
  readingPassage: {
    passage: 'Almost 100 years ago, local people in the small village of Nok in Nigeria found some unusual objects under the ground. These objects were beautiful clay sculptures of humans! The sculptures were all in the same style: they had large eyes and complicated hair styles. They were usually in a sitting position with their hands on their legs. Archaeologists found iron and stone farming tools from the Nok civilization from around 500 BCE.',
    question: 'What were the famous Nok sculptures made of?',
    correct: 'They were made of clay (terracotta).',
    distractors: ['They were made of plastic and glass.', 'They were made of paper streamers.', 'They were made of ice and snow.'],
    explanationAr: 'صُنعت تماثيل حضارة النوق من الطين/الفخار (clay / terracotta).'
  },
  punctuationQ: {
    correct: 'Did Marco Polo travel to China in 1275?',
    distractors: ['did marco polo travel to china in 1275', 'Did marco polo travel to china in 1275.', 'did Marco Polo Travel To China In 1275?'],
    explanationAr: 'يبدأ السؤال بـ Did بحرف كبير ويكتب اسم العلم Marco Polo والدولة China بحروف كبيرة وينتهي بعلامة استفهام.'
  }
});

export const p6_u6_exams: UnitExamSuite = buildVerifiedP1P2Suite({
  unitId: 'p6_u6',
  unitIndex: 36,
  unitTitleEn: 'Taking Care',
  unitTitleAr: 'الاعتناء بالنفس وصناعة الشموع والعطور والتوابل المصرية',
  grammarTopic: 'How many (Countable) vs. How much (Uncountable) & Quantifiers (a few, a little, a lot of)',
  vocab: [
    { word: 'Perfume oil', meaning: 'الزيت العطري لتعطير الشموع', phonetic: '/ˈpɜːfjuːm ɔɪl/', pos: 'Noun', clozeSentence: 'Add twenty drops of lemon ______ so the candles smell lovely!', clozeDistractors: ['scooter', 'caravan', 'minaret'] },
    { word: 'Palm wax', meaning: 'شمع النخيل الطبيعي لصناعة الشموع', phonetic: '/pɑːm wæks/', pos: 'Noun', clozeSentence: 'We use 450 grams of ______ from Egyptian palm trees to make nice tropical candles.', clozeDistractors: ['playlist', 'rollercoaster', 'laboratory'] },
    { word: 'Wick', meaning: 'فتيل الشمعة القطني', phonetic: '/wɪk/', pos: 'Noun', clozeSentence: 'A ______ is the little cotton rope inside the candle that you light.', clozeDistractors: ['dune', 'streamer', 'helmet'] },
    { word: 'Popsicle sticks', meaning: 'أعواد الخشب لحمل الفتيل', phonetic: '/ˈpɒpsɪkəl stɪks/', pos: 'Noun', clozeSentence: 'We need three wooden ______ to hold the wicks up in the glasses.', clozeDistractors: ['fireworks', 'sculptures', 'chickpeas'] },
    { word: 'Cardamom', meaning: 'حب الهال (الحبهان) من التوابل العطرية', phonetic: '/ˈkɑːdəməm/', pos: 'Noun', clozeSentence: 'Ancient Egyptians chewed ______ to clean their teeth and keep their breath fresh.', clozeDistractors: ['sandstorm', 'quad bike', 'fertilizer'] }
  ],
  phonics: {
    soundLabel: 'stress in two-syllable nouns vs verbs & suffix -ly / -ful (carefully, slowly, colorful, beautiful)',
    targetWord: 'Carefully',
    targetMeaningAr: 'بحذر وعناية (ظرف ينتهي باللاحقة -ly)',
    distractors: ['Wax', 'Oil', 'Cup'],
    matchingPair: ['Slowly', 'Quickly'],
    pairDistractors: ['Slowly and Wax', 'Quickly and Oil', 'Carefully and Cup']
  },
  dialogueQ: {
    prompt: '"How much palm wax do we need to make the three candles, Laila?" — "______"',
    correct: 'Mom says we need 450 grams of wax and a little lemon oil.',
    distractors: ['Marco Polo crossed the Gobi Desert.', 'Amina is hanging up the streamers.', 'We play football on a pitch.'],
    explanationAr: 'نسأل عن كمية الشمع (اسم لا يعد) بـ How much wax ونجيب بالكمية مع a little للزيت غير المعدود.'
  },
  grammarMcqs: [
    { prompt: 'Choose the correct question word for an uncountable noun: "How ______ perfume oil do we need for the recipe?"', correct: 'much', distractors: ['many', 'few', 'often'], explanationAr: 'كلمة oil اسم غير معدود (uncountable)، لذلك نسأل عن كميته بـ How much.' },
    { prompt: 'Choose the correct quantifier for a small uncountable amount: "There is ______ milk in the fridge, and we only need ______ drops of lemon oil."', correct: 'a little / a few', distractors: ['a few / a little', 'many / much', 'a / an'], explanationAr: 'نستخدم a little مع غير المعدود (milk) و a few مع الجمع المعدود (drops).' },
    { prompt: 'Choose the correct question word for a countable plural noun: "How ______ popsicle sticks are there on the table?"', correct: 'many', distractors: ['much', 'little', 'long'], explanationAr: 'كلمة popsicle sticks جمع معدود، فنسأل عن عددها بـ How many.' }
  ],
  reorders: [
    { prompt: 'Reorder the quantity question: [much - How - wax - do - we - need - ?].', correct: 'How much wax do we need?', distractors: ['Do we need how much wax?', 'Wax how much do we need?', 'Need we how much wax do?'], explanationAr: 'السؤال عن كمية غير المعدود: How much wax do we need?' },
    { prompt: 'Reorder the instruction: [Heat - the - wax - to - melt - it].', correct: 'Heat the wax to melt it', distractors: ['To melt it heat the wax', 'The wax heat to melt it', 'Melt it to heat the wax'], explanationAr: 'تعليمات صناعة الشموع: Heat the wax to melt it.' },
    { prompt: 'Reorder: [are - There - a - few - lemons - on - the - table].', correct: 'There are a few lemons on the table', distractors: ['On the table a few lemons there are', 'Are there a few lemons on the table', 'A few lemons on the table are there'], explanationAr: 'الترتيب الصحيح مع الجمع المعدود: There are a few lemons on the table.' },
    { prompt: 'Reorder: [used - Ancient - Egyptians - mint - and - cinnamon].', correct: 'Ancient Egyptians used mint and cinnamon', distractors: ['Mint and cinnamon used Ancient Egyptians', 'Used Ancient Egyptians mint and cinnamon', 'Egyptians Ancient mint and cinnamon used'], explanationAr: 'الترتيب الصحيح: Ancient Egyptians used mint and cinnamon.' }
  ],
  readingPassage: {
    passage: 'Ancient Egyptians knew how to take care of their bodies! To clean their teeth, they used a stick with frayed ends as a toothbrush, and they made toothpaste from rock salt, mint, dried iris flowers, and pepper! To keep their breath fresh, they chewed frankincense, cinnamon, and cardamom. Egypt is also famous for its spices that are used in cooking, medicine, and perfumes.',
    question: 'What ingredients did Ancient Egyptians use to make toothpaste?',
    correct: 'Rock salt, mint, dried iris flowers, and pepper.',
    distractors: ['Plastic, gasoline, and coal.', 'Chocolate, soda, and ice cream.', 'Cement, iron, and copper.'],
    explanationAr: 'صنع المصريون القدماء معجون الأسنان من الملح الصخري والنعناع وزهور السوسن المجففة والفلفل.'
  },
  punctuationQ: {
    correct: 'How much lemon oil do we need, Mom?',
    distractors: ['how much lemon oil do we need mom', 'How much lemon oil do we need, Mom.', 'how Much Lemon Oil Do We Need, Mom?'],
    explanationAr: 'يبدأ السؤال بـ How بحرف كبير مع فاصلة قبل المخاطب Mom وعلامة استفهام في النهاية.'
  }
});
