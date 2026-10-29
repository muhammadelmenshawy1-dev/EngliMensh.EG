// =========================================================================
// EngliMensh.EG - Primary 3 & Primary 4 Comprehensive 5-Level Exam Banks
// Connect 3 & Connect 4 (Term 1) - Official Egyptian MOE Curriculum
// System Architect: Mohammad El-Menshawy (محمد المنشاوي)
// 12 Units Total (P3 U1-U6 & P4 U1-U6)
// Each Unit contains:
//   Level 1: 10 Foundation & Recognition Questions
//   Level 2: 10 Contextual & Practice Questions
//   Level 3: 10 Advanced Structure & Grammar Questions
//   Level 4: Complete MOE Mock Exam (Listening, Reading, MCQ, Reorder, Punctuation)
//   Level 5: 8 Higher-Order Thinking Skills Questions with Arabic Explanations
// =========================================================================

import { buildVerifiedP1P2Suite, type UnitExamSuite } from './primary1And2Exams.ts';

// -------------------------------------------------------------------------
// Primary 3 Exam Suites (Units 1 to 6 - Connect 3)
// -------------------------------------------------------------------------
export const p3_u1_exams: UnitExamSuite = buildVerifiedP1P2Suite({
  unitId: 'p3_u1',
  unitIndex: 13,
  unitTitleEn: 'I Feel Happy!',
  unitTitleAr: 'أشعر بالسعادة والمشاعر والحياة الصحية',
  grammarTopic: 'How do you feel? I feel + Adjective / Healthy lifestyle habits',
  vocab: [
    { word: 'Happy', meaning: 'سعيد ومبتهج', phonetic: '/ˈhæpi/', pos: 'Adjective', clozeSentence: 'Hany smiles because he feels ______ today.', clozeDistractors: ['chair', 'table', 'window'] },
    { word: 'Excited', meaning: 'متحمس جداً', phonetic: '/ɪkˈsaɪtɪd/', pos: 'Adjective', clozeSentence: 'Daddy is coming home soon! I feel very ______.', clozeDistractors: ['wooden', 'paper', 'glass'] },
    { word: 'Thirsty', meaning: 'عطشان', phonetic: '/ˈθɜːsti/', pos: 'Adjective', clozeSentence: 'It is hot in the playground. I feel ______ and need water.', clozeDistractors: ['ruler', 'pencil', 'bookcase'] },
    { word: 'Hungry', meaning: 'جائع', phonetic: '/ˈhʌŋɡri/', pos: 'Adjective', clozeSentence: 'I feel ______. Let\'s go to the kitchen to have a sandwich.', clozeDistractors: ['carpet', 'curtain', 'lamp'] },
    { word: 'Tired', meaning: 'متعب ومرهق', phonetic: '/ˈtaɪəd/', pos: 'Adjective', clozeSentence: 'After playing football for two hours, Youssef feels ______.', clozeDistractors: ['plastic', 'metal', 'cotton'] }
  ],
  phonics: {
    soundLabel: 'long /iː/ (ee and ea)',
    targetWord: 'Feel',
    targetMeaningAr: 'يشعر (تحتوي على المقطع الطويل ee /iː/)',
    distractors: ['Hot', 'Sad', 'Cup'],
    matchingPair: ['Bee', 'Leaf'],
    pairDistractors: ['Bee and Cat', 'Leaf and Dog', 'Meat and Sun']
  },
  dialogueQ: {
    prompt: '"How do you feel, Hana?" — "______"',
    correct: 'I feel thirsty and hungry.',
    distractors: ['It is a bookcase.', 'Next to the museum.', 'By the plumber.'],
    explanationAr: 'عند السؤال عن المشاعر بـ How do you feel نجيب بـ I feel متبوعة بصفة شعورية.'
  },
  grammarMcqs: [
    { prompt: 'Complete the question about feelings: "How ______ you feel today?"', correct: 'do', distractors: ['does', 'are', 'is'], explanationAr: 'مع الضمير you في المضارع البسيط نستخدم الفعل المساعد do.' },
    { prompt: 'Choose the correct linking word: "I feel thirsty, ______ I drink a glass of water."', correct: 'so', distractors: ['but', 'who', 'where'], explanationAr: 'نستخدم الرابط so للتعبير عن النتيجة.' },
    { prompt: 'Measure and choose: "There are 10 millimeters in one ______."', correct: 'centimeter', distractors: ['kilogram', 'liter', 'hour'], explanationAr: 'السنتيمتر الواحد يساوي عشرة مليمترات (10 mm = 1 cm).' }
  ],
  reorders: [
    { prompt: 'Reorder the question: [do - How - feel - you - ?].', correct: 'How do you feel?', distractors: ['You do feel how?', 'Do how you feel?', 'Feel how do you?'], explanationAr: 'السؤال عن المشاعر: How do you feel?' },
    { prompt: 'Reorder the answer: [feel - I - excited - very].', correct: 'I feel very excited', distractors: ['Very excited I feel', 'Feel I very excited', 'Excited very feel I'], explanationAr: 'الترتيب الصحيح: I feel very excited.' },
    { prompt: 'Reorder: [sleeps - She - eight - for - hours].', correct: 'She sleeps for eight hours', distractors: ['Eight hours she sleeps for', 'Sleeps she for eight hours', 'For eight hours sleeps she'], explanationAr: 'الترتيب الصحيح: She sleeps for eight hours.' },
    { prompt: 'Reorder: [water - Drink - every - day].', correct: 'Drink water every day', distractors: ['Every day water drink', 'Water drink every day', 'Day every drink water'], explanationAr: 'جملة الأمر الصحية: Drink water every day.' }
  ],
  readingPassage: {
    passage: 'Amira follows a healthy lifestyle. She sleeps for 8 hours every night, eats bananas and apples, drinks plenty of water, and plays tennis with her friends. She feels happy and strong!',
    question: 'Why does Amira feel happy and strong?',
    correct: 'Because she follows a healthy lifestyle.',
    distractors: ['Because she eats only candy.', 'Because she never sleeps.', 'Because she watches TV all night.'],
    explanationAr: 'تشعر أميرة بالسعادة والقوة لأنها تتبع أسلوب حياة صحياً.'
  },
  punctuationQ: {
    correct: 'I feel very excited!',
    distractors: ['i feel very excited', 'i Feel Very Excited?', 'I feel very excited'],
    explanationAr: 'تبدأ الجملة بالضمير I بحرف كبير وتنتهي بعلامة تعجب للتعبير عن الحماس القوي.'
  }
});

export const p3_u2_exams: UnitExamSuite = buildVerifiedP1P2Suite({
  unitId: 'p3_u2',
  unitIndex: 14,
  unitTitleEn: "What's the Matter?",
  unitTitleAr: 'ما الأمر؟ والصحة والأعضاء والعلاج',
  grammarTopic: "What's the matter? I have a... / Body organs & Health advice",
  vocab: [
    { word: 'Headache', meaning: 'صداع في الرأس', phonetic: '/ˈhɛdeɪk/', pos: 'Noun', clozeSentence: 'The music is too loud; I have a ______.', clozeDistractors: ['bookcase', 'giraffe', 'balcony'] },
    { word: 'Fever', meaning: 'حمى وارتفاع في درجة الحرارة', phonetic: '/ˈfiːvə/', pos: 'Noun', clozeSentence: 'His forehead is very hot; he has a ______ and needs a cold towel.', clozeDistractors: ['magnet', 'penguin', 'tent'] },
    { word: 'Cold', meaning: 'نزلة برد وزكام', phonetic: '/kəʊld/', pos: 'Noun', clozeSentence: 'Stay at home and cover your nose with a tissue if you have a ______.', clozeDistractors: ['clown', 'sofa', 'carpet'] },
    { word: 'Cough', meaning: 'سعال وكحة', phonetic: '/kɒf/', pos: 'Noun', clozeSentence: 'Drink warm water with lemon and honey when you have a ______.', clozeDistractors: ['wardrobe', 'lion', 'juggler'] },
    { word: 'Medicine', meaning: 'دواء وعلاج', phonetic: '/ˈmɛdsən/', pos: 'Noun', clozeSentence: 'Take your ______ with an adult and rest in bed.', clozeDistractors: ['sandstorm', 'balloon', 'kite'] }
  ],
  phonics: {
    soundLabel: '/k/ (ck) and /sk/ (sk)',
    targetWord: 'Sick',
    targetMeaningAr: 'مريض (ينتهي بصوت ck /k/)',
    distractors: ['Nose', 'Feel', 'Leaf'],
    matchingPair: ['Skin', 'Skirt'],
    pairDistractors: ['Skin and Nose', 'Sick and Bee', 'Duck and Leaf']
  },
  dialogueQ: {
    prompt: 'Dad asks Hany: "What\'s the matter, Hany?" — Hany replies: "______"',
    correct: 'I have a headache.',
    distractors: ['I like collecting magnets.', 'It is in the living room.', 'A giraffe has a long neck.'],
    explanationAr: 'السؤال عن الشكوى الصحية بـ What\'s the matter جوابه: I have a headache.'
  },
  grammarMcqs: [
    { prompt: 'Choose the correct verb for illnesses: "She ______ a cold and a cough."', correct: 'has', distractors: ['have', 'am', 'are'], explanationAr: 'مع الضمير المفرد الغائب She نستخدم الفعل has للتعبير عن الإصابة بالبرد.' },
    { prompt: 'What is the function of our heart? "My heart ______ blood around my body."', correct: 'pumps', distractors: ['digests', 'draws', 'wears'], explanationAr: 'وظيفة القلب هي ضخ الدم إلى جميع أجزاء الجسم (pumps blood).' },
    { prompt: 'What protects our body on the outside? "My ______ protects my body."', correct: 'skin', distractors: ['stomach', 'cough', 'fever'], explanationAr: 'الجلد (skin) هو العضو الذي يغطي الجسم ويحميه.' }
  ],
  reorders: [
    { prompt: 'Reorder the health question: [matter - What\'s - the - ?].', correct: "What's the matter?", distractors: ["The matter what's?", "Matter what's the?", "What's matter the?"], explanationAr: "السؤال عن الحالة الصحية: What's the matter?" },
    { prompt: 'Reorder the answer: [have - I - a - headache].', correct: 'I have a headache', distractors: ['A headache have I', 'Have I a headache', 'Headache a I have'], explanationAr: 'الترتيب الصحيح: I have a headache.' },
    { prompt: 'Reorder the organ function: [blood - My - heart - pumps].', correct: 'My heart pumps blood', distractors: ['Pumps blood my heart', 'Blood my heart pumps', 'Heart my blood pumps'], explanationAr: 'الترتيب الصحيح: My heart pumps blood.' },
    { prompt: 'Reorder the safety rule: [hands - Wash - soap - your - with].', correct: 'Wash your hands with soap', distractors: ['With soap your hands wash', 'Your hands with soap wash', 'Soap with wash your hands'], explanationAr: 'الترتيب الصحيح: Wash your hands with soap.' }
  ],
  readingPassage: {
    passage: 'Our body has amazing organs! Our heart pumps blood to all parts of the body. Our stomach digests food. Our bones help us move, and our skin protects us.',
    question: 'What does our stomach do?',
    correct: 'It digests food.',
    distractors: ['It pumps blood.', 'It takes photos.', 'It repairs electricity.'],
    explanationAr: 'تقوم المعدة بهضم الطعام (Our stomach digests food).'
  },
  punctuationQ: {
    correct: "What's the matter, Hany?",
    distractors: ['whats the matter hany', "What's the matter hany.", "what's The Matter, Hany?"],
    explanationAr: 'يبدأ السؤال بحرف كبير مع وضع الفاصلة العليا في What\'s وفاصلة قبل المخاطب Hany وعلامة استفهام.'
  }
});

export const p3_u3_exams: UnitExamSuite = buildVerifiedP1P2Suite({
  unitId: 'p3_u3',
  unitIndex: 15,
  unitTitleEn: 'On the Weekend',
  unitTitleAr: 'في عطلة نهاية الأسبوع والهوايات والمغناطيس',
  grammarTopic: 'Present Continuous (am/is/are + v-ing) & like/don\'t like + v-ing',
  vocab: [
    { word: 'Music', meaning: 'موسيقى', phonetic: '/ˈmjuːzɪk/', pos: 'Noun', clozeSentence: 'I like listening to pop ______ on the weekend.', clozeDistractors: ['fever', 'stomach', 'cough'] },
    { word: 'Photos', meaning: 'صور فوتوغرافية', phonetic: '/ˈfəʊtəʊz/', pos: 'Noun', clozeSentence: 'Amira is taking ______ of the flowers with her camera.', clozeDistractors: ['medicines', 'headaches', 'colds'] },
    { word: 'Pictures', meaning: 'لوحات ورسومات فنية', phonetic: '/ˈpɪktʃəz/', pos: 'Noun', clozeSentence: 'Youssef likes drawing ______ and coloring them in art class.', clozeDistractors: ['fevers', 'bones', 'pills'] },
    { word: 'Magnets', meaning: 'قطع المغناطيس', phonetic: '/ˈmæɡnɪts/', pos: 'Noun', clozeSentence: '______ attract metal objects like iron nails and paperclips.', clozeDistractors: ['Pillows', 'Bananas', 'Tissues'] },
    { word: 'Sports', meaning: 'الألعاب الرياضية', phonetic: '/spɔːts/', pos: 'Noun', clozeSentence: 'We do ______ at the club every Saturday morning.', clozeDistractors: ['headaches', 'fevers', 'wardrobes'] }
  ],
  phonics: {
    soundLabel: '/ŋ/ (ng) and /sp/ (sp)',
    targetWord: 'Singing',
    targetMeaningAr: 'الغناء (ينتهي بصوت ng /ŋ/)',
    distractors: ['Sick', 'Feel', 'Skin'],
    matchingPair: ['Sports', 'Spider'],
    pairDistractors: ['Sports and Sick', 'Singing and Leaf', 'King and Duck']
  },
  dialogueQ: {
    prompt: '"What are you doing, Hany?" — "______"',
    correct: 'I am drawing a picture of a cat.',
    distractors: ['I have a high fever.', 'My stomach digests food.', 'It is a giraffe.'],
    explanationAr: 'السؤال في المضارع المستمر What are you doing جوابه: I am + verb-ing.'
  },
  grammarMcqs: [
    { prompt: 'Choose the correct form after "like": "I like ______ magnets with my brother."', correct: 'collecting', distractors: ['collect', 'collects', 'collected'], explanationAr: 'بعد الفعل like نستخدم الفعل مضافاً إليه ing (collecting) للتعبير عن الهوايات.' },
    { prompt: 'Choose the correct conjunction of contrast: "I like playing sports, ______ I don\'t like drawing pictures."', correct: 'but', distractors: ['and', 'so', 'because'], explanationAr: 'عند الربط بين جملتين متناقضتين (إثبات ونفي) نستخدم الرابط but.' },
    { prompt: 'Science fact: "Two north poles of a magnet ______ each other."', correct: 'repel', distractors: ['pull', 'eat', 'sleep'], explanationAr: 'الأقطاب المتشابهة في المغناطيس تتنافر (repel)، بينما الأقطاب المختلفة تتجاذب (attract).' }
  ],
  reorders: [
    { prompt: 'Reorder the hobby sentence: [collecting - I - like - magnets].', correct: 'I like collecting magnets', distractors: ['Magnets I like collecting', 'Collecting magnets like I', 'Like I collecting magnets'], explanationAr: 'الترتيب الصحيح: I like collecting magnets.' },
    { prompt: 'Reorder the Present Continuous sentence: [is - She - listening - music - to].', correct: 'She is listening to music', distractors: ['Listening to music she is', 'Is she listening to music', 'Music she is listening to'], explanationAr: 'الترتيب الصحيح: She is listening to music.' },
    { prompt: 'Reorder the question: [are - What - doing - you - ?].', correct: 'What are you doing?', distractors: ['You are doing what?', 'Are what you doing?', 'Doing what are you?'], explanationAr: 'السؤال عن الحدث الجاري: What are you doing?' },
    { prompt: 'Reorder: [attract - Magnets - metal - objects].', correct: 'Magnets attract metal objects', distractors: ['Metal objects attract magnets', 'Attract magnets metal objects', 'Objects metal magnets attract'], explanationAr: 'حقيقة علمية: Magnets attract metal objects.' }
  ],
  readingPassage: {
    passage: 'On Friday afternoon, Hany and Hana enjoy their hobbies. Hany likes playing sports and collecting magnets, and he likes singing songs, too. Hana likes drawing pictures, but she doesn\'t like listening to loud pop music.',
    question: 'What does Hana like doing on Friday afternoon?',
    correct: 'She likes drawing pictures.',
    distractors: ['She likes listening to loud pop music.', 'She likes repairing cars.', 'She likes climbing mountains.'],
    explanationAr: 'ذكر النص أن هنا تحب رسم الصور (Hana likes drawing pictures).'
  },
  punctuationQ: {
    correct: 'I like singing songs, and I like drawing pictures.',
    distractors: ['i like singing songs and i like drawing pictures', 'I like singing songs and i like drawing pictures?', 'i Like Singing Songs, And I Like Drawing Pictures.'],
    explanationAr: 'الضمير I يكتب دائماً بحرف كبير وتنتهي الجملة الخبرية بنقطة.'
  }
});

export const p3_u4_exams: UnitExamSuite = buildVerifiedP1P2Suite({
  unitId: 'p3_u4',
  unitIndex: 16,
  unitTitleEn: 'I Love My Home',
  unitTitleAr: 'أحب بيتي والغرف والأثاث والموارد الطبيعية',
  grammarTopic: 'What\'s in the living room? There\'s a... / Prepositions of place (next to, behind, between)',
  vocab: [
    { word: 'Living room', meaning: 'غرفة المعيشة', phonetic: '/ˈlɪvɪŋ ruːm/', pos: 'Noun', clozeSentence: 'Our family sits on the couch and watches television in the ______.', clozeDistractors: ['hospital', 'desert', 'circus'] },
    { word: 'Cupboard', meaning: 'دولاب / خزانة', phonetic: '/ˈkʌbəd/', pos: 'Noun', clozeSentence: 'Mom puts the clean plates and glasses inside the kitchen ______.', clozeDistractors: ['headache', 'penguin', 'cough'] },
    { word: 'Bookcase', meaning: 'خزانة ومكتبة الكتب', phonetic: '/ˈbʊkkeɪs/', pos: 'Noun', clozeSentence: 'I arrange my English storybooks neatly in the wooden ______.', clozeDistractors: ['stomach', 'fever', 'giraffe'] },
    { word: 'Armchair', meaning: 'كرسي بذراعين مريح', phonetic: '/ˈɑːmtʃeə/', pos: 'Noun', clozeSentence: 'Grandpa sits in a comfortable ______ next to the lamp to read.', clozeDistractors: ['magnet', 'medicine', 'acrobat'] },
    { word: 'Clock', meaning: 'ساعة حائط', phonetic: '/klɒk/', pos: 'Noun', clozeSentence: 'There is a round ______ on the wall above the television.', clozeDistractors: ['elephant', 'cough', 'panda'] }
  ],
  phonics: {
    soundLabel: '/eə/ (air and ear)',
    targetWord: 'Chair',
    targetMeaningAr: 'كرسي (يحتوي على المقطع الصوتي air /eə/)',
    distractors: ['Sick', 'Bee', 'Cup'],
    matchingPair: ['Hair', 'Chair'],
    pairDistractors: ['Hair and Book', 'Chair and Dog', 'Ear and Sun']
  },
  dialogueQ: {
    prompt: '"What\'s in your living room, Amira?" — "______"',
    correct: 'There is an armchair next to the bookcase.',
    distractors: ['I have a cough and cold.', 'A penguin eats fish.', 'I feel very thirsty.'],
    explanationAr: 'السؤال عن محتويات غرفة المعيشة جوابه: There is an armchair next to the bookcase.'
  },
  grammarMcqs: [
    { prompt: 'Choose the correct preposition: "The television is ______ the two armchairs."', correct: 'between', distractors: ['next', 'front', 'in front'], explanationAr: 'عند وجود شيئين على الجانبين نستخدم حرف الجر between (بين).' },
    { prompt: 'Complete the household chore: "I help my mother ______ my bed every morning."', correct: 'make', distractors: ['sweep', 'feed', 'cut'], explanationAr: 'المتلازمة اللفظية لترتيب السرير هي make my bed.' },
    { prompt: 'Natural resources in Egypt: "Knives, forks, and bikes are made from ______ mined from rocks."', correct: 'iron', distractors: ['water', 'cotton', 'paper'], explanationAr: 'يصنع الحديد (iron) المستخرج من الصخور في صناعة الدراجات وأدوات المائدة.' }
  ],
  reorders: [
    { prompt: 'Reorder the description: [is - There - a - bookcase - behind - the - table].', correct: 'There is a bookcase behind the table', distractors: ['Behind the table a bookcase is there', 'Is there a bookcase behind the table', 'A bookcase there is table behind the'], explanationAr: 'الترتيب الصحيح: There is a bookcase behind the table.' },
    { prompt: 'Reorder the chore sentence: [sweep - I - the - floor].', correct: 'I sweep the floor', distractors: ['The floor sweep I', 'Sweep I the floor', 'Floor the I sweep'], explanationAr: 'جملة الأعمال المنزلية: I sweep the floor (أكنس الأرضية).' },
    { prompt: 'Reorder: [make - I - my - bed].', correct: 'I make my bed', distractors: ['My bed make I', 'Make I my bed', 'Bed my I make'], explanationAr: 'الترتيب الصحيح: I make my bed.' },
    { prompt: 'Reorder the question: [in - What\'s - the - living - room - ?].', correct: "What's in the living room?", distractors: ["In the living room what's?", "Living room what's in the?", "What's the living room in?"], explanationAr: "السؤال الصحيح: What's in the living room?" }
  ],
  readingPassage: {
    passage: 'Hany loves helping at home. In the morning, he makes his bed. In the afternoon, he sweeps the kitchen floor, sets the table for lunch, and feeds the cat.',
    question: 'What does Hany do in the morning?',
    correct: 'He makes his bed.',
    distractors: ['He visits the circus.', 'He swims in the sea.', 'He climbs a tall tree.'],
    explanationAr: 'يرتب هاني سريره في الصباح (In the morning, he makes his bed).'
  },
  punctuationQ: {
    correct: 'There is a lamp on the table.',
    distractors: ['there is a lamp on the table', 'There is a lamp on the table?', 'there Is A Lamp On The Table.'],
    explanationAr: 'تبدأ الجملة الخبرية بحرف كبير وتنتهي بنقطة.'
  }
});

export const p3_u5_exams: UnitExamSuite = buildVerifiedP1P2Suite({
  unitId: 'p3_u5',
  unitIndex: 17,
  unitTitleEn: 'At the Zoo',
  unitTitleAr: 'في حديقة الحيوان والبيئات الطبيعية وحماية البيئة',
  grammarTopic: 'How about + v-ing? / Where does the ... live? It lives in...',
  vocab: [
    { word: 'Lion', meaning: 'أسد قوي', phonetic: '/ˈlaɪən/', pos: 'Noun', clozeSentence: 'The ______ is a strong wild animal that lives in the grasslands.', clozeDistractors: ['bookcase', 'cupboard', 'headache'] },
    { word: 'Elephant', meaning: 'فيل ضخم', phonetic: '/ˈɛlɪfənt/', pos: 'Noun', clozeSentence: 'The ______ is the biggest land animal; it has a long trunk and big ears.', clozeDistractors: ['armchair', 'magnet', 'fever'] },
    { word: 'Giraffe', meaning: 'زرافة طويلة العنق', phonetic: '/dʒɪˈrɑːf/', pos: 'Noun', clozeSentence: 'The ______ has a very long neck so it can eat leaves from tall trees.', clozeDistractors: ['penguin', 'couch', 'medicine'] },
    { word: 'Penguin', meaning: 'طائر البطريق', phonetic: '/ˈpɛŋɡwɪn/', pos: 'Noun', clozeSentence: 'The ______ is black and white; it lives near the sea and swims well.', clozeDistractors: ['camel', 'clock', 'carpet'] },
    { word: 'Panda', meaning: 'دب الباندا', phonetic: '/ˈpændə/', pos: 'Noun', clozeSentence: 'The giant ______ lives in the bamboo forest in China.', clozeDistractors: ['hippo', 'wardrobe', 'lamp'] }
  ],
  phonics: {
    soundLabel: 'digraphs /f/ (ph) and /w/ (wh)',
    targetWord: 'Elephant',
    targetMeaningAr: 'فيل (يحتوي على المقطع ph الذي ينطق /f/)',
    distractors: ['Lion', 'Panda', 'Bear'],
    matchingPair: ['Whale', 'White'],
    pairDistractors: ['Whale and Lion', 'Photo and Panda', 'Elephant and Bear']
  },
  dialogueQ: {
    prompt: '"How about going to see the giraffes, Youssef?" — "______"',
    correct: 'Good idea! Let\'s go.',
    distractors: ['I have a headache.', 'It is in the cupboard.', 'My heart pumps blood.'],
    explanationAr: 'الرد المناسب للموافقة على الاقتراح بـ How about هو: Good idea! Let\'s go.'
  },
  grammarMcqs: [
    { prompt: 'Choose the correct form after "How about": "How about ______ to the hippos?"', correct: 'going', distractors: ['go', 'goes', 'went'], explanationAr: 'بعد صيغة الاقتراح How about يأتي الفعل مضافاً إليه ing (going).' },
    { prompt: 'Where does the hippo live? "The hippo lives in ______ and lakes."', correct: 'rivers', distractors: ['bamboo forests', 'bookcases', 'sky'], explanationAr: 'يعيش فرس النهر (hippo) في البحيرات والأنهار (lakes and rivers).' },
    { prompt: 'Environmental responsibility: "We should plant trees and ______ plastic and glass."', correct: 'recycle', distractors: ['pollute', 'throw on the street', 'burn'], explanationAr: 'للحفاظ على البيئة نعيد تدوير (recycle) البلاستيك والزجاج.' }
  ],
  reorders: [
    { prompt: 'Reorder the suggestion: [going - How - about - to - the - elephants - ?].', correct: 'How about going to the elephants?', distractors: ['Going to the elephants how about?', 'About how going to the elephants?', 'To the elephants how about going?'], explanationAr: 'صيغة الاقتراح: How about going to the elephants?' },
    { prompt: 'Reorder the habitat question: [does - Where - the - panda - live - ?].', correct: 'Where does the panda live?', distractors: ['The panda does live where?', 'Live where does the panda?', 'Does where the panda live?'], explanationAr: 'السؤال عن موطن الحيوان: Where does the panda live?' },
    { prompt: 'Reorder the answer: [lives - It - in - the - grasslands].', correct: 'It lives in the grasslands', distractors: ['In the grasslands lives it', 'Lives it in the grasslands', 'The grasslands it lives in'], explanationAr: 'الترتيب الصحيح: It lives in the grasslands.' },
    { prompt: 'Reorder: [favorite - My - animal - the - is - penguin].', correct: 'My favorite animal is the penguin', distractors: ['The penguin my favorite animal is', 'Is my favorite animal the penguin', 'Animal my favorite the penguin is'], explanationAr: 'الترتيب الصحيح: My favorite animal is the penguin.' }
  ],
  readingPassage: {
    passage: 'Today our class is at the Giza Zoo! There are so many animals here. The lion and the giraffe live in the grasslands. The panda eats bamboo, and the hippo spends almost all day in the water.',
    question: 'What does the panda eat?',
    correct: 'Bamboo.',
    distractors: ['Fish and meat.', 'Sandwiches and pizza.', 'Iron and metal.'],
    explanationAr: 'يتغذى دب الباندا على نبات الخيزران (Bamboo).'
  },
  punctuationQ: {
    correct: 'How about going to the zoo?',
    distractors: ['how about going to the zoo', 'How about going to the zoo.', 'how About Going To The Zoo?'],
    explanationAr: 'يبدأ سؤال الاقتراح بحرف كبير وينتهي بعلامة استفهام.'
  }
});

export const p3_u6_exams: UnitExamSuite = buildVerifiedP1P2Suite({
  unitId: 'p3_u6',
  unitIndex: 18,
  unitTitleEn: "Let's Go to the Circus!",
  unitTitleAr: 'هيا نذهب إلى السيرك ووصف الشخصيات',
  grammarTopic: 'What does he/she look like? He/She is + Adjective',
  vocab: [
    { word: 'Clown', meaning: 'مهرج السيرك المرح', phonetic: '/klaʊn/', pos: 'Noun', clozeSentence: 'The ______ is very funny; he wears big shoes and makes us laugh.', clozeDistractors: ['bookcase', 'stomach', 'cupboard'] },
    { word: 'Ringmaster', meaning: 'مدير حلبة السيرك', phonetic: '/ˈrɪŋˌmɑːstə/', pos: 'Noun', clozeSentence: 'The ______ wears a tall hat and talks to everyone at the circus.', clozeDistractors: ['headache', 'penguin', 'magnet'] },
    { word: 'Acrobat', meaning: 'لاعب الأكروبات والجمباز', phonetic: '/ˈækrəbæt/', pos: 'Noun', clozeSentence: 'The ______ can jump and swing high in the air above the tent.', clozeDistractors: ['armchair', 'fever', 'clock'] },
    { word: 'Juggler', meaning: 'لاعب خفة الكرات', phonetic: '/ˈdʒʌɡlə/', pos: 'Noun', clozeSentence: 'The ______ can throw five colorful balls and rings in the air.', clozeDistractors: ['giraffe', 'cough', 'carpet'] },
    { word: 'Dog trainer', meaning: 'مدرب الكلاب الاستعراضية', phonetic: '/dɒɡ ˈtreɪnə/', pos: 'Noun', clozeSentence: 'The ______ loves animals and teaches clever dogs to jump through hoops.', clozeDistractors: ['panda', 'medicine', 'couch'] }
  ],
  phonics: {
    soundLabel: 'diphthong /aʊ/ (ow and ou)',
    targetWord: 'Clown',
    targetMeaningAr: 'مهرج (يحتوي على المقطع ow الذي ينطق /aʊ/)',
    distractors: ['Sick', 'Feel', 'Chair'],
    matchingPair: ['Clown', 'Cloud'],
    pairDistractors: ['Clown and Bee', 'Cloud and Sick', 'Mouse and Leaf']
  },
  dialogueQ: {
    prompt: '"What does the clown look like?" — "______"',
    correct: 'He is tall and thin, and he has a red nose.',
    distractors: ['It lives in the bamboo forest.', 'There is a bookcase behind the couch.', 'I have a high fever.'],
    explanationAr: 'السؤال عن المظهر الخارجي What does he look like جوابه وصف الشكل الجسدي.'
  },
  grammarMcqs: [
    { prompt: 'Complete the appearance question: "What ______ the ringmaster look like?"', correct: 'does', distractors: ['do', 'is', 'are'], explanationAr: 'مع الفاعل المفرد الغائب (the ringmaster) نستخدم الفعل المساعد does.' },
    { prompt: 'Choose the right verb: "The dog trainer ______ short and young."', correct: 'is', distractors: ['has', 'are', 'do'], explanationAr: 'مع الصفات (short and young) نستخدم verb to be (is).' },
    { prompt: 'Art & geometry: "A square has four equal sides and four right ______."', correct: 'angles', distractors: ['circles', 'clowns', 'tents'], explanationAr: 'للمربع أربعة أضلاع متساوية وأربع زوايا قائمة (four right angles).' }
  ],
  reorders: [
    { prompt: 'Reorder the appearance question: [does - What - he - look - like - ?].', correct: 'What does he look like?', distractors: ['He does look like what?', 'Look like what does he?', 'Does what he look like?'], explanationAr: 'السؤال عن المظهر الخارجي: What does he look like?' },
    { prompt: 'Reorder the answer: [is - He - tall - and - funny].', correct: 'He is tall and funny', distractors: ['Tall and funny he is', 'Is he tall and funny', 'Funny and tall is he'], explanationAr: 'الترتيب الصحيح: He is tall and funny.' },
    { prompt: 'Reorder: [throw - The - juggler - can - rings].', correct: 'The juggler can throw rings', distractors: ['Rings the juggler can throw', 'Can the juggler throw rings', 'Throw rings the juggler can'], explanationAr: 'الترتيب الصحيح: The juggler can throw rings.' },
    { prompt: 'Reorder: [are - We - at - the - circus].', correct: 'We are at the circus', distractors: ['At the circus are we', 'Are we at the circus', 'The circus we are at'], explanationAr: 'الترتيب الصحيح: We are at the circus.' }
  ],
  readingPassage: {
    passage: 'Hana and her grandfather are at the circus tent. There are five performers in the ring. The clown is tall and very funny. The young dog trainer wears a pink dress, and the juggler throws six balls at the same time!',
    question: 'Who is tall and very funny at the circus?',
    correct: 'The clown.',
    distractors: ['The hippo.', 'The bookcase.', 'The dentist.'],
    explanationAr: 'ذكر النص أن المهرج طويل ومضحك جداً (The clown is tall and very funny).'
  },
  punctuationQ: {
    correct: 'What does the acrobat look like?',
    distractors: ['what does the acrobat look like', 'What does the acrobat look like.', 'what Does The Acrobat Look Like?'],
    explanationAr: 'يبدأ السؤال بحرف كبير وينتهي بعلامة استفهام.'
  }
});

// -------------------------------------------------------------------------
// Primary 4 Exam Suites (Units 1 to 6 - Connect 4)
// -------------------------------------------------------------------------
export const p4_u1_exams: UnitExamSuite = buildVerifiedP1P2Suite({
  unitId: 'p4_u1',
  unitIndex: 19,
  unitTitleEn: 'I Feel Good',
  unitTitleAr: 'الطعام المصري وأجهزة الجسم الهضمي والتنفسي',
  grammarTopic: 'Coordinating Conjunctions (and / but) & Digestive/Respiratory Systems',
  vocab: [
    { word: 'Digestive system', meaning: 'الجهاز الهضمي في جسم الإنسان', phonetic: '/daɪˈdʒɛstɪv ˈsɪstəm/', pos: 'Noun', clozeSentence: 'We use our ______ to digest what we eat and drink.', clozeDistractors: ['apartment', 'electrician', 'balcony'] },
    { word: 'Nutrients', meaning: 'العناصر الغذائية المفيدة للجسم', phonetic: '/ˈnjuːtriənts/', pos: 'Noun', clozeSentence: 'Gastric juice changes food into energy and ______ for our body.', clozeDistractors: ['caves', 'sockets', 'tents'] },
    { word: 'Esophagus', meaning: 'المريء (أنبوب يصل الفم بالمعدة)', phonetic: '/ɪˈsɒfəɡəs/', pos: 'Noun', clozeSentence: 'The ______ goes from the mouth down to the stomach.', clozeDistractors: ['balcony', 'sunflower', 'pelican'] },
    { word: 'Damietta cheese', meaning: 'الجبن الدمياطي المصري الشهير', phonetic: '/ˌdæmiˈɛtə tʃiːz/', pos: 'Noun', clozeSentence: 'The land in Damietta is rich in nutrients, and ______ is very famous.', clozeDistractors: ['fennec fox', 'garbage truck', 'steppe eagle'] },
    { word: 'Sugarcane', meaning: 'محصول قصب السكر', phonetic: '/ˈʃʊɡəkeɪn/', pos: 'Noun', clozeSentence: 'Farmers in Upper Egypt grow sweet ______ and wheat.', clozeDistractors: ['houseboat', 'plumber', 'spider'] }
  ],
  phonics: {
    soundLabel: 'short vowel /æ/ vs long vowel /eɪ/ (bag/cake, mom/nose)',
    targetWord: 'Cake',
    targetMeaningAr: 'كعكة (تحتوي على صوت المد الطويل /eɪ/)',
    distractors: ['Bag', 'Mix', 'Mom'],
    matchingPair: ['Cake', 'Snake'],
    pairDistractors: ['Cake and Bag', 'Nose and Mom', 'Rice and Mix']
  },
  dialogueQ: {
    prompt: '"Which food comes from our country, Maged?" — "______"',
    correct: 'Egyptian farmers grow rice, onions, tomatoes, and mangoes.',
    distractors: ['The fennec fox lives in the desert.', 'An electrician fixes sockets.', 'I live on a houseboat.'],
    explanationAr: 'يزرع الفلاحون المصريون الأرز والبصل والطماطم والمانجو.'
  },
  grammarMcqs: [
    { prompt: 'Choose the correct conjunction: "I like playing football, ______ I hurt my leg, so I can\'t play today."', correct: 'but', distractors: ['and', 'or', 'who'], explanationAr: 'نستخدم الرابط but للتعبير عن التناقض بين الرغبة والعائق.' },
    { prompt: 'Choose the correct conjunction to add two similar ideas: "We eat healthy vegetables ______ we exercise every day."', correct: 'and', distractors: ['but', 'because of', 'which'], explanationAr: 'نستخدم الرابط and لإضافة فكرتين متوافقتين.' },
    { prompt: 'Respiratory system fact: "Under the lungs, the ______ is a muscle that pulls air into our lungs."', correct: 'diaphragm', distractors: ['esophagus', 'large intestine', 'tooth'], explanationAr: 'الحجاب الحاجز (diaphragm) عضلة تقع أسفل الرئتين تساعد على سحب الهواء.' }
  ],
  reorders: [
    { prompt: 'Reorder the sentence: [farmers - Egyptian - produce - many - things].', correct: 'Egyptian farmers produce many things', distractors: ['Produce many things Egyptian farmers', 'Many things Egyptian farmers produce', 'Farmers Egyptian many things produce'], explanationAr: 'الترتيب الصحيح: Egyptian farmers produce many things.' },
    { prompt: 'Reorder the scientific fact: [chew - We - food - our - teeth - with].', correct: 'We chew food with our teeth', distractors: ['With our teeth chew we food', 'Food we chew with our teeth', 'Teeth our with we chew food'], explanationAr: 'الترتيب الصحيح: We chew food with our teeth.' },
    { prompt: 'Reorder: [is - Damietta - famous - cheese - for].', correct: 'Damietta is famous for cheese', distractors: ['Famous for cheese Damietta is', 'Is Damietta famous for cheese', 'Cheese for famous is Damietta'], explanationAr: 'الترتيب الصحيح: Damietta is famous for cheese.' },
    { prompt: 'Reorder: [breathe - We - air - our - through - nose].', correct: 'We breathe air through our nose', distractors: ['Through our nose breathe we air', 'Air we breathe through our nose', 'Our nose through we breathe air'], explanationAr: 'الترتيب الصحيح: We breathe air through our nose.' }
  ],
  readingPassage: {
    passage: 'The land in Damietta governorate is rich in nutrients. The farmers can grow rice, tomatoes, potatoes, wheat, lemons, grapes, and guavas. Fishermen catch thousands of fish in the sea. Damietta cheese is very famous!',
    question: 'Why can farmers in Damietta grow many crops?',
    correct: 'Because the land is rich in nutrients.',
    distractors: ['Because it snows all year.', 'Because there is no water.', 'Because it is inside a cave.'],
    explanationAr: 'لأن أرض محافظة دمياط غنية بالعناصر الغذائية (The land is rich in nutrients).'
  },
  punctuationQ: {
    correct: 'Egyptian farmers grow rice, onions, and tomatoes.',
    distractors: ['egyptian farmers grow rice onions and tomatoes', 'Egyptian farmers grow rice, onions and tomatoes?', 'egyptian Farmers Grow Rice, Onions, And Tomatoes.'],
    explanationAr: 'تبدأ الجملة بحرف كبير وتوضع الفواصل بين عناصر القائمة وتنتهي بنقطة.'
  }
});

export const p4_u2_exams: UnitExamSuite = buildVerifiedP1P2Suite({
  unitId: 'p4_u2',
  unitIndex: 20,
  unitTitleEn: 'Desert Animals',
  unitTitleAr: 'حيوانات الصحراء المصرية والمقارنات والتكيف',
  grammarTopic: 'Comparative Adjectives (er + than / more + adj + than)',
  vocab: [
    { word: 'Fennec fox', meaning: 'ثعلب الفنك الصحراوي', phonetic: '/ˈfɛnɪk fɒks/', pos: 'Noun', clozeSentence: 'The ______ lives in the Sahara Desert and has big ears to lose heat.', clozeDistractors: ['plumber', 'esophagus', 'houseboat'] },
    { word: 'Steppe eagle', meaning: 'عقاب السهول الجارح', phonetic: '/stɛp ˈiːɡl/', pos: 'Noun', clozeSentence: 'The ______ travels from Europe to Africa in winter and eats small mammals.', clozeDistractors: ['balcony', 'sugarcane', 'screwdriver'] },
    { word: 'Rhim gazelle', meaning: 'غزال الريم الصحراوي', phonetic: '/riːm ɡəˈzɛl/', pos: 'Noun', clozeSentence: 'The ______ has long horns and yellow-white coats that protect it from the sun.', clozeDistractors: ['garbage collector', 'diaphragm', 'apartment'] },
    { word: 'Pelican', meaning: 'طائر البجع المائي', phonetic: '/ˈpɛlɪkən/', pos: 'Noun', clozeSentence: 'A ______ uses its long beak to scoop juicy fish out of the river.', clozeDistractors: ['electrician', 'sunflower', 'tent'] },
    { word: 'Spider', meaning: 'العنكبوت آكل الحشرات', phonetic: '/ˈspaɪdə/', pos: 'Noun', clozeSentence: 'Farmers like the ______ because it eats insects that harm crops.', clozeDistractors: ['mail carrier', 'biscuit', 'couch'] }
  ],
  phonics: {
    soundLabel: '/p/ vs /b/ (pea/bee, pin/bin, pear/bear)',
    targetWord: 'Pelican',
    targetMeaningAr: 'بجعة (تبدأ بصوت الحرف /p/)',
    distractors: ['Bear', 'Bird', 'Beak'],
    matchingPair: ['Pear', 'Peas'],
    pairDistractors: ['Pear and Bear', 'Pelican and Bird', 'Pin and Bin']
  },
  dialogueQ: {
    prompt: '"Why does the fennec fox have big ears?" — "______"',
    correct: 'To lose heat from its body and hear insects and small animals.',
    distractors: ['To digest food in the stomach.', 'To fix electrical wires.', 'To sail on the Nile River.'],
    explanationAr: 'أذنا ثعلب الفنك الكبيرتان تساعدانه على فقدان الحرارة وسماع الحشرات والحيوانات الصغيرة.'
  },
  grammarMcqs: [
    { prompt: 'Choose the correct comparative form (short adjective): "A mouse is ______ than an elephant."', correct: 'smaller', distractors: ['small', 'smallest', 'more small'], explanationAr: 'عند المقارنة بين اثنين بصفة قصيرة نضيف er متبوعة بـ than (smaller than).' },
    { prompt: 'Choose the correct comparative form (long adjective): "A snake is ______ than a fox."', correct: 'more dangerous', distractors: ['dangerouser', 'most dangerous', 'dangerous'], explanationAr: 'الصفة الطويلة (dangerous) تسبقها كلمة more قبل than في المقارنة.' },
    { prompt: 'Compare camels and horses: "Camels are ______ for the desert than horses."', correct: 'better', distractors: ['good', 'gooder', 'best'], explanationAr: 'صيغة المقارنة من الصفة غير المنتظمة good هي better than.' }
  ],
  reorders: [
    { prompt: 'Reorder the comparison: [are - Camels - taller - horses - than].', correct: 'Camels are taller than horses', distractors: ['Taller than horses camels are', 'Are camels taller than horses', 'Horses than taller are camels'], explanationAr: 'الترتيب الصحيح للمقارنة: Camels are taller than horses.' },
    { prompt: 'Reorder: [lives - The - fennec - fox - in - the - desert].', correct: 'The fennec fox lives in the desert', distractors: ['In the desert lives the fennec fox', 'Lives the fennec fox in the desert', 'Desert the in the fennec fox lives'], explanationAr: 'الترتيب الصحيح: The fennec fox lives in the desert.' },
    { prompt: 'Reorder the question: [heavy - How - is - the - camel - ?].', correct: 'How heavy is the camel?', distractors: ['The camel is how heavy?', 'Is how heavy the camel?', 'Heavy how is the camel?'], explanationAr: 'السؤال عن الوزن: How heavy is the camel?' },
    { prompt: 'Reorder: [have - Camels - large - flat - feet].', correct: 'Camels have large flat feet', distractors: ['Large flat feet have camels', 'Have camels large flat feet', 'Feet flat large camels have'], explanationAr: 'الترتيب الصحيح: Camels have large flat feet.' }
  ],
  readingPassage: {
    passage: 'Camels are amazing animals! They help us carry things and people across the desert. Camels have large, flat feet so they can walk on the sand. They have special ways to close their noses and eyes to stop the sand from coming in.',
    question: 'Why do camels have special ways to close their noses and eyes?',
    correct: 'To stop the desert sand from coming in.',
    distractors: ['To breathe under deep ocean water.', 'To climb tall bamboo trees.', 'To make Damietta cheese.'],
    explanationAr: 'تغلق الجمال أنوفها وعيونها لمنع دخول رمال الصحراء (to stop the sand from coming in).'
  },
  punctuationQ: {
    correct: 'A fennec fox is smaller than a camel.',
    distractors: ['a fennec fox is smaller than a camel', 'A fennec fox is smaller than a camel?', 'a Fennec Fox Is Smaller Than A Camel.'],
    explanationAr: 'تبدأ الجملة الخبرية بحرف كبير وتنتهي بنقطة.'
  }
});

export const p4_u3_exams: UnitExamSuite = buildVerifiedP1P2Suite({
  unitId: 'p4_u3',
  unitIndex: 21,
  unitTitleEn: 'Why Are Plants Green?',
  unitTitleAr: 'لماذا النباتات خضراء؟ ودورة حياة النبات والتفضيل',
  grammarTopic: 'Superlative Adjectives (the + adj-est / the most + adj) & Plant Life Cycle',
  vocab: [
    { word: 'Germination', meaning: 'عملية الإنبات لبذور النبات', phonetic: '/ˌdʒɜːmɪˈneɪʃən/', pos: 'Noun', clozeSentence: 'We put a seed in soil and water it; when it starts to grow roots, this is called ______.', clozeDistractors: ['digestion', 'electricity', 'tourism'] },
    { word: 'Pollen', meaning: 'حبوب اللقاح في الأزهار', phonetic: '/ˈpɒlən/', pos: 'Noun', clozeSentence: 'Plants produce ______ in a flower, and the wind or insects move it to make new seeds.', clozeDistractors: ['cement', 'garbage', 'leather'] },
    { word: 'Roots', meaning: 'جذور النبات تحت التربة', phonetic: '/ruːts/', pos: 'Noun', clozeSentence: 'The ______ of a plant grow under the soil and absorb water and nutrients.', clozeDistractors: ['balconies', 'feathers', 'beaks'] },
    { word: 'Sunflower', meaning: 'زهرة عباد الشمس', phonetic: '/ˈsʌnˌflaʊə/', pos: 'Noun', clozeSentence: 'The ______ is the tallest and biggest yellow flower in the garden.', clozeDistractors: ['fennec fox', 'esophagus', 'houseboat'] },
    { word: 'Agricultural habitat', meaning: 'البيئة الزراعية الخصبة', phonetic: '/ˌæɡrɪˈkʌltʃərəl ˈhæbɪtæt/', pos: 'Noun', clozeSentence: 'Farmers work in the ______ to grow bean plants and orange trees for us to eat.', clozeDistractors: ['shopping mall', 'hospital ward', 'circus tent'] }
  ],
  phonics: {
    soundLabel: 'consonant blends /sl/ and /sw/ + suffix -ful',
    targetWord: 'Colorful',
    targetMeaningAr: 'ملون وزاهٍ (ينتهي باللاحقة -ful)',
    distractors: ['Sick', 'Cold', 'Tent'],
    matchingPair: ['Sweep', 'Sweet'],
    pairDistractors: ['Sweep and Tent', 'Slice and Dog', 'Swan and Cat']
  },
  dialogueQ: {
    prompt: '"Why do plants need sunlight and water?" — "______"',
    correct: 'To grow and make their own food in their green leaves.',
    distractors: ['To walk on the hot desert sand.', 'To deliver letters to offices.', 'To catch fish in the sea.'],
    explanationAr: 'تحتاج النباتات للضوء والماء لتنمو وتصنع غذاءها في أوراقها الخضراء.'
  },
  grammarMcqs: [
    { prompt: 'Choose the correct superlative form (short adjective): "The giraffe is ______ land animal."', correct: 'the tallest', distractors: ['taller', 'tall', 'more tall'], explanationAr: 'صيغة التفضيل العليا للصفة القصيرة: the + adj + est (the tallest).' },
    { prompt: 'Choose the correct superlative form (long adjective): "The rose is ______ flower in our garden."', correct: 'the most beautiful', distractors: ['more beautiful', 'beautifulest', 'beautiful'], explanationAr: 'مع الصفات الطويلة في التفضيل نستخدم the most + الصفة (the most beautiful).' },
    { prompt: 'Where do lotus flowers and reeds grow? "They grow in the ______ habitat near rivers and lakes."', correct: 'river and lake', distractors: ['dry desert', 'dark cave', 'metal factory'], explanationAr: 'ينمو نبات اللوتس والغاب (reeds) بجوار الأنهار والبحيرات لأنها تحتاج لمياه وفيرة.' }
  ],
  reorders: [
    { prompt: 'Reorder the superlative sentence: [the - is - The - sunflower - biggest - flower].', correct: 'The sunflower is the biggest flower', distractors: ['Biggest flower is the sunflower the', 'Is the sunflower the biggest flower', 'Flower the biggest the sunflower is'], explanationAr: 'الترتيب الصحيح للتفضيل: The sunflower is the biggest flower.' },
    { prompt: 'Reorder the plant growth fact: [grow - Roots - under - the - soil].', correct: 'Roots grow under the soil', distractors: ['Under the soil grow roots', 'Grow roots under the soil', 'Soil the under roots grow'], explanationAr: 'تنمو الجذور تحت التربة: Roots grow under the soil.' },
    { prompt: 'Reorder: [need - Plants - water - and - sunlight].', correct: 'Plants need water and sunlight', distractors: ['Water and sunlight need plants', 'Need plants water and sunlight', 'Sunlight and water plants need'], explanationAr: 'الترتيب الصحيح: Plants need water and sunlight.' },
    { prompt: 'Reorder: [produce - Green - plants - oxygen].', correct: 'Green plants produce oxygen', distractors: ['Oxygen produce green plants', 'Produce green plants oxygen', 'Plants green oxygen produce'], explanationAr: 'الترتيب الصحيح: Green plants produce oxygen.' }
  ],
  readingPassage: {
    passage: 'Papyrus is a very special plant. It is famous because Ancient Egyptians used papyrus to make paper! They also made sandals and baskets from papyrus. Papyrus needs a lot of water and warm weather to grow quickly in the Nile Delta.',
    question: 'Why was papyrus famous in Ancient Egypt?',
    correct: 'Because Ancient Egyptians used it to make paper, sandals, and baskets.',
    distractors: ['Because they used it to build airplanes.', 'Because it grows without any water in ice.', 'Because it is a desert mammal.'],
    explanationAr: 'استخدم المصريون القدماء نبات البردي في صناعة الورق والصنادل والسلال.'
  },
  punctuationQ: {
    correct: 'The sunflower is the tallest flower.',
    distractors: ['the sunflower is the tallest flower', 'The sunflower is the tallest flower?', 'the Sunflower Is The Tallest Flower.'],
    explanationAr: 'تبدأ الجملة بحرف كبير وتنتهي بنقطة.'
  }
});

export const p4_u4_exams: UnitExamSuite = buildVerifiedP1P2Suite({
  unitId: 'p4_u4',
  unitIndex: 22,
  unitTitleEn: 'Where Do You Live?',
  unitTitleAr: 'أين تعيش؟ وأنواع المنازل والاتجاهات وحروف الجر',
  grammarTopic: 'Prepositions of Place (on, in, under, above, next to, between, in front of, behind) & Directions',
  vocab: [
    { word: 'Apartment', meaning: 'شقة سكنية في عمارة', phonetic: '/əˈpɑːtmənt/', pos: 'Noun', clozeSentence: 'My family moved to a modern ______ on the third floor in Cairo.', clozeDistractors: ['esophagus', 'sunflower', 'pelican'] },
    { word: 'Houseboat', meaning: 'منزل عائم (عوامة على النيل)', phonetic: '/ˈhaʊsbəʊt/', pos: 'Noun', clozeSentence: 'My friend Sherif lives on a ______ on the Nile River; he loves the water.', clozeDistractors: ['diaphragm', 'fennec fox', 'garbage truck'] },
    { word: 'Balcony', meaning: 'شرفة الشقة (البلكونة)', phonetic: '/ˈbælkəni/', pos: 'Noun', clozeSentence: 'I like sitting outside on the ______ so I can see the whole street.', clozeDistractors: ['stomach', 'root', 'pollen'] },
    { word: 'Tent', meaning: 'خيمة صحراوية من القماش', phonetic: '/tɛnt/', pos: 'Noun', clozeSentence: 'In the desert, some people live in a ______ made of cloth.', clozeDistractors: ['refrigerator', 'hospital', 'supermarket'] },
    { word: 'Cave', meaning: 'كهف منحوت في الصخور', phonetic: '/keɪv/', pos: 'Noun', clozeSentence: 'In some places, there are houses inside a rock ______ where it is never too hot or too cold.', clozeDistractors: ['balcony', 'bicycle', 'pencil case'] }
  ],
  phonics: {
    soundLabel: '/f/ vs /v/ (fan/van, face/vase, fish/vegetables)',
    targetWord: 'Village',
    targetMeaningAr: 'قرية (تبدأ بصوت الحرف /v/)',
    distractors: ['Fan', 'Fish', 'Foot'],
    matchingPair: ['Van', 'Vase'],
    pairDistractors: ['Van and Fan', 'Vase and Face', 'Village and Fish']
  },
  dialogueQ: {
    prompt: '"Excuse me, where is the post office?" — "______"',
    correct: 'Go straight ahead and turn right. It is on the corner, next to the school.',
    distractors: ['A sunflower is the biggest flower.', 'Camels have flat feet.', 'We chew food with our teeth.'],
    explanationAr: 'عند السؤال عن الاتجاهات نجيب بـ Go straight ahead, turn right, it is next to...'
  },
  grammarMcqs: [
    { prompt: 'Choose the correct preposition of place: "The hospital is ______ the school and the shopping mall."', correct: 'between', distractors: ['under', 'in', 'on'], explanationAr: 'لوجود مكانين (the school and the shopping mall) نستخدم حرف الجر between (بين).' },
    { prompt: 'Give clear directions: "______ straight ahead, then take the second right."', correct: 'Go', distractors: ['Goes', 'Going', 'Went'], explanationAr: 'عند إعطاء الاتجاهات نستخدم صيغة الأمر التي تبدأ بالفعل في المصدر (Go straight ahead).' },
    { prompt: 'Choose the right preposition: "There is a green tree ______ front of our house."', correct: 'in', distractors: ['on', 'at', 'between'], explanationAr: 'التعبير المركب الصحيح هو in front of (أمام).' }
  ],
  reorders: [
    { prompt: 'Reorder the question: [do - Where - you - live - ?].', correct: 'Where do you live?', distractors: ['You do live where?', 'Live where do you?', 'Do where you live?'], explanationAr: 'السؤال عن مكان السكن: Where do you live?' },
    { prompt: 'Reorder the direction: [straight - Go - ahead - and - turn - left].', correct: 'Go straight ahead and turn left', distractors: ['Ahead go straight and left turn', 'Turn left go straight ahead and', 'Straight ahead go and turn left'], explanationAr: 'الترتيب الصحيح لإعطاء الاتجاهات: Go straight ahead and turn left.' },
    { prompt: 'Reorder: [is - The - museum - next - to - the - park].', correct: 'The museum is next to the park', distractors: ['Next to the park the museum is', 'Is the museum next to the park', 'Park the next to is the museum'], explanationAr: 'الترتيب الصحيح: The museum is next to the park.' },
    { prompt: 'Reorder: [live - I - in - an - apartment].', correct: 'I live in an apartment', distractors: ['In an apartment live I', 'Live I in an apartment', 'An apartment I live in'], explanationAr: 'الترتيب الصحيح: I live in an apartment.' }
  ],
  readingPassage: {
    passage: 'Hurghada is a beautiful city in the east of Egypt on the Red Sea. About 190,000 people live there. In Hurghada, there is a beach and there are lots of interesting things to do. There is the Sahara Desert where many tourists go on safaris, and there is Sahl Hasheesh with beautiful houses and bazaars.',
    question: 'Where is the city of Hurghada located?',
    correct: 'In the east of Egypt on the Red Sea.',
    distractors: ['In the west of Europe.', 'Inside a mountain cave.', 'In the middle of the Amazon forest.'],
    explanationAr: 'تقع مدينة الغردقة في شرق مصر على ساحل البحر الأحمر.'
  },
  punctuationQ: {
    correct: 'Hurghada is on the Red Sea in Egypt.',
    distractors: ['hurghada is on the red sea in egypt', 'Hurghada is on the red sea in egypt?', 'hurghada Is On The Red Sea In Egypt.'],
    explanationAr: 'أسماء المدن والبحار والدول (Hurghada, Red Sea, Egypt) تبدأ بحروف كبيرة.'
  }
});

export const p4_u5_exams: UnitExamSuite = buildVerifiedP1P2Suite({
  unitId: 'p4_u5',
  unitIndex: 23,
  unitTitleEn: 'Where Do You Work?',
  unitTitleAr: 'أين تعمل؟ والمهن المجتمعية والكهرباء وأسماء الإشارة',
  grammarTopic: 'Demonstratives (This / That / These / Those) & Job Responsibilities',
  vocab: [
    { word: 'Electrician', meaning: 'فني الكهرباء', phonetic: '/ɪˌlɛkˈtrɪʃən/', pos: 'Noun', clozeSentence: 'An ______ connects electricity so we can use lights and watch TV.', clozeDistractors: ['pelican', 'sunflower', 'esophagus'] },
    { word: 'Plumber', meaning: 'سباك يصلح المواسير والصنابير', phonetic: '/ˈplʌmə/', pos: 'Noun', clozeSentence: 'A ______ connects the pipes and faucets so we have water for a shower.', clozeDistractors: ['fennec fox', 'houseboat', 'steppe eagle'] },
    { word: 'Mail carrier', meaning: 'ساعي البريد', phonetic: '/meɪl ˈkæriə/', pos: 'Noun', clozeSentence: 'A ______ delivers your letters and packages every day.', clozeDistractors: ['diaphragm', 'spider', 'balcony'] },
    { word: 'Garbage collector', meaning: 'عامل النظافة وجمع القمامة', phonetic: '/ˈɡɑːbɪdʒ kəˈlɛktə/', pos: 'Noun', clozeSentence: 'A ______ takes away all the garbage so you can keep your house clean.', clozeDistractors: ['rhim gazelle', 'sugarcane', 'tent'] },
    { word: 'Builder', meaning: 'عامل البناء', phonetic: '/ˈbɪldə/', pos: 'Noun', clozeSentence: 'A ______ makes the walls strong and safe when constructing a school.', clozeDistractors: ['pollen', 'cough', 'penguin'] }
  ],
  phonics: {
    soundLabel: 'word stress in multi-syllable job nouns (plumber, builder, mechanic, electrician)',
    targetWord: 'Plumber',
    targetMeaningAr: 'سباك (يحتوي على حرف b صامت والشدة على المقطع الأول)',
    distractors: ['Cake', 'Nose', 'Bee'],
    matchingPair: ['Builder', 'Doctor'],
    pairDistractors: ['Builder and Cake', 'Plumber and Nose', 'Teacher and Bee']
  },
  dialogueQ: {
    prompt: '"Why is it dangerous to touch a broken wire with wet hands?" — "______"',
    correct: 'Because water conducts electricity and you can get an electric shock!',
    distractors: ['Because the mail carrier walks a lot.', 'Because sunflowers need sunlight.', 'Because camels live in the desert.'],
    explanationAr: 'الماء موصل للكهرباء ولمس الأسلاك بأيدٍ مبللة يسبب صدمة كهربائية خطيرة.'
  },
  grammarMcqs: [
    { prompt: 'Choose the correct demonstrative for plural objects far away: "______ are the wind turbines over there in the distance."', correct: 'Those', distractors: ['This', 'That', 'These'], explanationAr: 'للجمع البعيد (over there) نستخدم اسم الإشارة Those.' },
    { prompt: 'Choose the correct demonstrative for one tool in your hand: "______ is the mechanic\'s screwdriver right here."', correct: 'This', distractors: ['These', 'Those', 'They'], explanationAr: 'للمفرد القريب نستخدم اسم الإشارة This.' },
    { prompt: 'Electrical safety rule: "Never touch anything electrical with ______ hands!"', correct: 'wet', distractors: ['dry', 'clean', 'warm'], explanationAr: 'من قواعد السلامة عدم لمس أي شيء كهربائي بأيدٍ مبللة (wet hands).' }
  ],
  reorders: [
    { prompt: 'Reorder the demonstrative sentence: [are - These - the - plumber\'s - tools].', correct: "These are the plumber's tools", distractors: ["The plumber's tools these are", "Are these the plumber's tools", "Tools the plumber's these are"], explanationAr: "الترتيب الصحيح للجمع القريب: These are the plumber's tools." },
    { prompt: 'Reorder the job sentence: [fixes - A - mechanic - cars - and - buses].', correct: 'A mechanic fixes cars and buses', distractors: ['Cars and buses fixes a mechanic', 'Fixes a mechanic cars and buses', 'Buses and cars a mechanic fixes'], explanationAr: 'الترتيب الصحيح: A mechanic fixes cars and buses.' },
    { prompt: 'Reorder the safety rule: [touch - Never - broken - wires].', correct: 'Never touch broken wires', distractors: ['Broken wires never touch', 'Touch never broken wires', 'Wires broken touch never'], explanationAr: 'تحذير السلامة: Never touch broken wires.' },
    { prompt: 'Reorder: [delivers - The - mail - carrier - letters].', correct: 'The mail carrier delivers letters', distractors: ['Letters the mail carrier delivers', 'Delivers the mail carrier letters', 'Carrier the mail letters delivers'], explanationAr: 'الترتيب الصحيح: The mail carrier delivers letters.' }
  ],
  readingPassage: {
    passage: 'Amira wants to be an electrician when she grows up. She learned how to work safely with electricity: never touch anything electrical with wet hands, never put anything into a socket, only use plugs, and always unplug electrical items slowly.',
    question: 'What should you never put into an electrical socket?',
    correct: 'Anything except a proper electrical plug.',
    distractors: ['A plug when your hands are dry.', 'Clean air.', 'Sunlight.'],
    explanationAr: 'لا تضع أي شيء داخل المقبس الكهربائي سوى القابس المخصص (only use plugs).'
  },
  punctuationQ: {
    correct: 'An electrician connects electricity safely.',
    distractors: ['an electrician connects electricity safely', 'An electrician connects electricity safely?', 'an Electrician Connects Electricity Safely.'],
    explanationAr: 'تبدأ الجملة الخبرية بحرف كبير وتنتهي بنقطة.'
  }
});

export const p4_u6_exams: UnitExamSuite = buildVerifiedP1P2Suite({
  unitId: 'p4_u6',
  unitIndex: 24,
  unitTitleEn: 'What Do You Do?',
  unitTitleAr: 'ماذا تعمل؟ والقطاعات الاقتصادية والطاقة المتجددة',
  grammarTopic: 'Present Simple for Jobs & Renewable vs. Non-renewable Energy Sources',
  vocab: [
    { word: 'Fishing industry', meaning: 'قطاع صيد الأسماك', phonetic: '/ˈfɪʃɪŋ ˈɪndəstri/', pos: 'Noun', clozeSentence: 'A fisherman works in the ______; he catches fish on his boat and sells them at the market.', clozeDistractors: ['mining sector', 'library', 'hospital'] },
    { word: 'Tourism industry', meaning: 'قطاع السياحة والفنادق والإرشاد', phonetic: '/ˈtʊərɪzəm ˈɪndəstri/', pos: 'Noun', clozeSentence: 'A tour guide works in the ______; he explains history and tells tourists lots of interesting information.', clozeDistractors: ['digestive system', 'germination', 'plumbing'] },
    { word: 'Farming', meaning: 'قطاع الزراعة والفلاحة', phonetic: '/ˈfɑːmɪŋ/', pos: 'Noun', clozeSentence: 'Farmers work in ______; they plant fruit trees, pick oranges, and send them to the factory.', clozeDistractors: ['cave', 'balcony', 'socket'] },
    { word: 'Mining', meaning: 'قطاع التعدين واستخراج المعادن', phonetic: '/ˈmaɪnɪŋ/', pos: 'Noun', clozeSentence: 'Engineers in the ______ industry take copper, iron, and coal out of the ground.', clozeDistractors: ['bakery', 'library', 'classroom'] },
    { word: 'Renewable energy', meaning: 'الطاقة المتجددة النظيفة كالشمس والرياح', phonetic: '/rɪˈnjuːəbl ˈɛnədʒi/', pos: 'Noun', clozeSentence: 'Solar energy, wind energy, and wave energy are clean ______ resources that never run out.', clozeDistractors: ['coal and oil', 'plastic bags', 'broken wires'] }
  ],
  phonics: {
    soundLabel: 'short vowels /ɪ/, /e/, /æ/, /ʌ/ & prefix dis- (disappear, dislike, disobey, disagree)',
    targetWord: 'Disagree',
    targetMeaningAr: 'لا يتفق / يختلف في الرأي (تبدأ بالبادئة السلبية dis-)',
    distractors: ['Agree', 'Obey', 'Like'],
    matchingPair: ['Dislike', 'Disobey'],
    pairDistractors: ['Dislike and Like', 'Disobey and Obey', 'Disagree and Sun']
  },
  dialogueQ: {
    prompt: '"What do you do, Uncle Tarek?" — "______"',
    correct: 'I am a librarian. I work in a school library and help children find the books they need.',
    distractors: ['A fennec fox has big ears.', 'The sunflower is the tallest flower.', 'Go straight ahead and turn left.'],
    explanationAr: 'السؤال عن الوظيفة What do you do نجيب عنه بذكر المهنة وطبيعة العمل.'
  },
  grammarMcqs: [
    { prompt: 'Choose the correct prefix to give the opposite of "obey": "The boy did not listen; he ______ his teacher."', correct: 'disobeyed', distractors: ['unobeyed', 'reobeyed', 'inobeyed'], explanationAr: 'نضيف البادئة dis- للفعل obey لتعطي عكس المعنى (disobey = يعصي/يخالف).' },
    { prompt: 'Classify energy resources: "Coal, oil, and gas are ______ energy resources because they can run out."', correct: 'non-renewable', distractors: ['renewable', 'solar', 'wind'], explanationAr: 'الفحم والبترول والغاز مصادر طاقة غير متجددة (non-renewable) لأنها تنفد.' },
    { prompt: 'Present Simple question: "Where ______ a geologist work?"', correct: 'does', distractors: ['do', 'are', 'have'], explanationAr: 'مع الفاعل المفرد (a geologist) نستخدم الفعل المساعد does في المضارع البسيط.' }
  ],
  reorders: [
    { prompt: 'Reorder the job question: [do - What - you - do - ?].', correct: 'What do you do?', distractors: ['Do what you do?', 'You do what do?', 'What you do do?'], explanationAr: 'السؤال عن المهنة: What do you do?' },
    { prompt: 'Reorder the answer: [work - I - in - the - tourism - industry].', correct: 'I work in the tourism industry', distractors: ['In the tourism industry work I', 'Work I in the tourism industry', 'Tourism industry in the I work'], explanationAr: 'الترتيب الصحيح: I work in the tourism industry.' },
    { prompt: 'Reorder: [catches - A - fisherman - fresh - fish].', correct: 'A fisherman catches fresh fish', distractors: ['Fresh fish catches a fisherman', 'Catches a fisherman fresh fish', 'Fish fresh a fisherman catches'], explanationAr: 'الترتيب الصحيح: A fisherman catches fresh fish.' },
    { prompt: 'Reorder: [energy - Solar - is - renewable].', correct: 'Solar energy is renewable', distractors: ['Renewable is solar energy', 'Is solar energy renewable', 'Energy solar renewable is'], explanationAr: 'الترتيب الصحيح: Solar energy is renewable.' }
  ],
  readingPassage: {
    passage: 'A farmer looks after orange trees on his farm. He waters the trees and picks the ripe fruit. Then he sends a lot of the fruit to the factory to make orange juice. He also sells some of his oranges directly to the supermarket.',
    question: 'Why does the farmer send oranges to the factory?',
    correct: 'To make fresh orange juice.',
    distractors: ['To make copper wires.', 'To build a houseboat.', 'To repair broken pipes.'],
    explanationAr: 'يرسل المزارع البرتقال إلى المصنع لصناعة عصير البرتقال (to make orange juice).'
  },
  punctuationQ: {
    correct: 'A tour guide works in the tourism industry.',
    distractors: ['a tour guide works in the tourism industry', 'A tour guide works in the tourism industry?', 'a Tour Guide Works In The Tourism Industry.'],
    explanationAr: 'تبدأ الجملة الخبرية بحرف كبير وتنتهي بنقطة.'
  }
});
