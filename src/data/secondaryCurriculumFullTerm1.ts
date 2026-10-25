import { UnitCurriculum } from '../types/curriculum.ts';
import {
  oldManAndTheSeaChapters,
  kingLearActs,
  greatExpectationsChapters
} from './secondaryLiteratureData.ts';
import { secondary1Term1Units } from './secondary1CurriculumTerm1.ts';

// ------------------------------------------------------------------------------------------------
// 1. SECONDARY 1 (GRADE 10) TERM 1 UNITS (ENRICHED WITH 20+ VOCAB & LITERATURE CHAPTERS 1-6)
// ------------------------------------------------------------------------------------------------
export const fullSecondary1Units: UnitCurriculum[] = secondary1Term1Units.map((u, idx) => {
  const litChapter = oldManAndTheSeaChapters[idx] || oldManAndTheSeaChapters[0];
  return {
    ...u,
    literatureModule: litChapter
  };
});

// ------------------------------------------------------------------------------------------------
// 2. SECONDARY 2 (GRADE 11) TERM 1 UNITS (UNITS 1 - 6)
// Literature: King Lear by William Shakespeare (Acts 1 to 3)
// ------------------------------------------------------------------------------------------------
export const fullSecondary2Units: UnitCurriculum[] = [
  // Unit 1: Staying Healthy
  {
    stage: 'Secondary',
    grade: 11,
    gradeLabel: 'Secondary 2 - الصف الثاني الثانوي',
    track: 'General Secondary',
    secondaryPath: 'general_secondary',
    semester: 1,
    unitNumber: 1,
    unitTitle: 'Staying Healthy',
    unitTitleAr: 'الحفاظ على الصحة والمناعة والإسعافات الأولية',
    theme: 'Cellular Immunity, Emergency Triage, Public Health Protocols & Medical Ethics',
    literatureModule: kingLearActs[0],
    vocabularyModule: {
      keyWords: [
        { word: 'immune system', pos: 'n.', ar: 'الجهاز المناعي', def: 'The biological structures and processes that protect against disease.', ex: 'A balanced diet strengthens the human immune system against viral infections.', exAr: 'يعزز النظام الغذائي المتوازن الجهاز المناعي البشري ضد العدوى الفيروسية.' },
        { word: 'infection', pos: 'n.', ar: 'عدوى ميكروبية', def: 'The invasion of bodily tissue by pathogenic microorganisms.', ex: 'Sterilizing surgical equipment prevents serious bacterial infection.', exAr: 'يعمل تعقيم الأدوات الجراحية على منع العدوى البكتيرية الخطيرة.' },
        { word: 'CPR', pos: 'n.', ar: 'الإنعاش القلبي الرئوي', def: 'Cardiopulmonary resuscitation: an emergency life-saving procedure.', ex: 'Trained bystanders performed CPR until the paramedics arrived.', exAr: 'أجرى المسعفون الحاضرون الإنعاش القلبي الرئوي حتى وصول سيارة الإسعاف.' },
        { word: 'boost', pos: 'v.', ar: 'يعزز / يقوي', def: 'To help or encourage something to increase, improve, or flourish.', ex: 'Regular aerobic exercise boosts white blood cell production.', exAr: 'ممارسة التمارين الهوائية بانتظام تعزز إنتاج خلايا الدم البيضاء.' },
        { word: 'hygiene', pos: 'n.', ar: 'النظافة الصحية الوقائية', def: 'Conditions or practices conducive to maintaining health and preventing disease.', ex: 'Strict hospital hygiene protocols dramatically reduce viral transmission.', exAr: 'تقلل بروتوكولات النظافة الصحية الصارمة بالمستشفيات من انتقال الفيروسات بشكل كبير.' },
        { word: 'severe', pos: 'adj.', ar: 'حاد / وخيم', def: 'Very great, intense, or critical in severity.', ex: 'The patient suffered from severe chest pains requiring emergency triage.', exAr: 'عانى المريض من آلام حادة في الصدر استدعت تدخلاً إسعافياً عاجلاً.' },
        { word: 'technique', pos: 'n.', ar: 'تقنية وأسلوب فني', def: 'A skillful or efficient way of doing or achieving something.', ex: 'Chest compression requires precise hand placement and rhythmic technique.', exAr: 'يتطلب الضغط على الصدر وضعية يد دقيقة وتقنية إيقاعية صحيحة.' },
        { word: 'perform', pos: 'v.', ar: 'يؤدي / ينجز عملاً', def: 'To carry out, execute, or conduct an action or procedure.', ex: 'First responders must perform basic triage calmly under pressure.', exAr: 'يجب على المستجيبين الأوائل تأدية الفرز الطبي الميداني بهدوء تحت الضغط.' },
        { word: 'wrap', pos: 'v.', ar: 'يلف / يضمد', def: 'To cover or enclose in folded material or bandage.', ex: 'The nurse carefully wrapped the sprained ankle in a firm elastic bandage.', exAr: 'قامت الممرضة بلف الكاحل الملتوي بضمادة مرنة ومحكمة بعناية.' },
        { word: 'triage', pos: 'n.', ar: 'الفرز الطبي للمصابين', def: 'The preliminary assessment of patients to determine urgency of treatment.', ex: 'Emergency triage prioritizes victims with life-threatening airway blockages.', exAr: 'يمنح الفرز الطبي في الطوارئ الأولوية للمصابين بانسداد المجاري الهوائية.' },
        { word: 'antibody', pos: 'n.', ar: 'جسم مضاد حيوي', def: 'A blood protein produced in response to and counteracting a specific antigen.', ex: 'Vaccination stimulates the synthesis of protective neutralizing antibodies.', exAr: 'يحفز التطعيم تخليق أجسام مضادة واقية ومحيّدة للعدوى.' },
        { word: 'pathogen', pos: 'n.', ar: 'ميكروب مسبب للمرض', def: 'A bacterium, virus, or other microorganism that can cause disease.', ex: 'White blood cells engulf and neutralize invasive biological pathogens.', exAr: 'تبتلع خلايا الدم البيضاء الميكروبات الممرضة الغازية وتحيدها.' },
        { word: 'sanitize', pos: 'v.', ar: 'يطهر ويعقم الأسطح', def: 'To make clean and hygienic by chemical disinfection.', ex: 'Paramedics sanitize the ambulance interior after transporting contagious patients.', exAr: 'يعقم المسعفون مقصورة سيارة الإسعاف بعد نقل المصابين بأمراض معدية.' },
        { word: 'bleeding', pos: 'n.', ar: 'نزيف دموي', def: 'The loss of blood from damaged blood vessels.', ex: 'Direct continuous pressure on the wound stops arterial bleeding effectively.', exAr: 'الضغط المباشر المستمر على الجرح يوقف النزيف الشرياني بفعالية.' },
        { word: 'vital', pos: 'adj.', ar: 'حيوي / حاسم', def: 'Absolutely necessary or essential for sustaining life.', ex: 'Monitoring vital signs such as pulse and respiration is critical.', exAr: 'تعد مراقبة العلامات الحيوية مثل النبض والتنفس أمراً في غاية الأهمية.' },
        { word: 'bandage', pos: 'n.', ar: 'ضمادة طبية', def: 'A strip of woven material used to bind up wounds or protect injuries.', ex: 'Apply a sterile bandage to prevent airborne bacterial contamination.', exAr: 'ضع ضمادة معقمة لمنع التلوث البكتيري المنقول بالهواء.' },
        { word: 'collarbone', pos: 'n.', ar: 'عظمة الترقوة', def: 'The clavicle bone joining the sternum and scapula.', ex: 'The cyclist sustained a fractured collarbone after falling off his bicycle.', exAr: 'أصيب راكب الدراجة بكسر في عظمة الترقوة إثر سقوطه من فوق دراجته.' },
        { word: 'unconscious', pos: 'adj.', ar: 'فاقد للوعي', def: 'Temporarily deprived of awareness through injury or shock.', ex: 'Place the unconscious casualty into the recovery position immediately.', exAr: 'ضع المصاب الفاقد للوعي في وضعية الإفاقة فوراً للحفاظ على مجرى التنفس.' },
        { word: 'paramedic', pos: 'n.', ar: 'مسعف طوارئ متخصص', def: 'A healthcare professional trained in emergency pre-hospital care.', ex: 'The paramedic administered emergency intravenous fluids during the ride.', exAr: 'أعطى المسعف محاليل وريدية طارئة أثناء نقل المريض.' },
        { word: 'respiration', pos: 'n.', ar: 'عملية التنفس الحيوي', def: 'The action of breathing oxygen into and expelling carbon dioxide from lungs.', ex: 'Artificial respiration restores vital oxygenation to oxygen-deprived brains.', exAr: 'يعيد التنفس الاصطناعي الأكسجين الحيوي إلى خلايا الدماغ المحرومة منه.' }
      ],
      collocations: [
        { phrase: 'perform CPR', meaningAr: 'يجري الإنعاش القلبي الرئوي', example: 'You should perform CPR immediately if breathing ceases.', exampleAr: 'ينبغي عليك إجراء الإنعاش القلبي فوراً إذا توقف التنفس.' },
        { phrase: 'boost the immune system', meaningAr: 'يقوي ويعزز الجهاز المناعي', example: 'Adequate sleep boosts the immune system remarkably.', exampleAr: 'النوم الكافي يعزز مناعة الجسم بشكل ملحوظ.' },
        { phrase: 'fall unconscious', meaningAr: 'يفقد وعيه ويسقط مغشياً عليه', example: 'The dehydrated athlete fell unconscious at the finish line.', exampleAr: 'سقط الرياضي المصاب بالجفاف مغشياً عليه عند خط النهاية.' },
        { phrase: 'follow health protocols', meaningAr: 'يتبع الإجراءات والبروتوكولات الصحية', example: 'Citizens must follow health protocols to curb epidemics.', exampleAr: 'يجب على المواطنين اتباع البروتوكولات الصحية للحد من الأوبئة.' },
        { phrase: 'apply direct pressure', meaningAr: 'يضغط مباشرة على الجرح لوقف النزف', example: 'Apply direct pressure with a clean cloth to halt bleeding.', exampleAr: 'اضغط مباشرة بقطعة قماش نظيفة لوقف تدفق الدم.' }
      ],
      exercises: [
        { id: 's2_u1_q1', skill: 'Grammar', question: 'The patient had severe respiratory failure, so the triage doctors __________ intubate him immediately.', options: ['had to', 'must', 'have to', 'should'], correctAnswer: 'A', explanation: '"Had to" is the required past form for external medical necessity and obligation in the past.' },
        { id: 's2_u1_q2', skill: 'Grammar', question: 'You __________ driven so fast in the dense fog; it was reckless and almost caused a fatal collision.', options: ['shouldn’t have', 'mustn’t have', 'needn’t have', 'couldn’t have'], correctAnswer: 'A', explanation: '"Shouldn’t have + P.P." expresses past reproach, regret, and criticism for an unwise past action.' },
        { id: 's2_u1_q3', skill: 'Vocabulary', question: 'Which term refers to the procedure where a rescuer breathes into a patient’s mouth and presses on their chest?', options: ['CPR', 'Triage', 'Vaccination', 'Biopsy'], correctAnswer: 'A', explanation: 'CPR (Cardiopulmonary Resuscitation) combines chest compressions with rescue breaths.' }
      ]
    },
    grammarModule: {
      ruleName: 'Modals of Necessity, Obligation & Regret (must, have to, should have)',
      ruleNameAr: 'أفعال الضرورة والإلزام والتعبير عن اللوم والندم في الماضي',
      explanationSummary: 'Differentiating internal obligation (must) from external rules (have to), past necessity (had to), prohibition (mustn’t), absence of necessity (don’t have to / needn’t have done), and moral reproach (should have + P.P.).',
      detailedRules: [
        {
          title: 'Must vs. Have To (Present & Future Obligations)',
          explanation: '"Must" expresses personal feeling, internal obligation, or urgent warm invitation (e.g. "I must visit grandmother"). "Have to / Has to" expresses external rules, laws, institutional requirements, or school regulations over which the speaker has no control (e.g. "Students have to wear school uniforms").',
          examples: [
            'Internal desire: I must exercise regularly to strengthen my immune system.',
            'External official law: Drivers have to carry a valid license according to national traffic laws.',
            'Warm invitation: You must come and have dinner with our family this evening!'
          ]
        },
        {
          title: 'Past Necessity & The Crucial Distinction: Didn’t have to vs. Needn’t have done',
          explanation: 'Past obligation is always "had to + inf" ("We had to call an ambulance"). In negation: (1) "didn’t have to / didn’t need to + inf" means the action was NOT necessary, so it was NOT done. (2) "needn’t have + P.P." means the action was performed, but in hindsight it was completely unnecessary (wasted effort).',
          examples: [
            'Action not done: It was a national holiday, so Ali didn’t have to go to school.',
            'Action done unnecessarily: You needn’t have bought bread; we already had five loaves in the kitchen!'
          ]
        },
        {
          title: 'Past Regret & Blame: Should have / Shouldn’t have + P.P.',
          explanation: '"Should have + P.P." denotes that an advisable or moral action was not performed in the past (regret or blame). "Shouldn’t have + P.P." criticizes an improper or harmful action that was committed.',
          examples: [
            'Blame: You should have consulted a specialist doctor before taking that heavy medication.',
            'Regret: The driver shouldn’t have ignored the stop signal; now his car is totaled.'
          ]
        }
      ],
      exercises: [
        { id: 's2_u1_g1', skill: 'Grammar', question: 'Yesterday was Friday and the clinic was closed, so the nurse __________ report to duty.', options: ['didn’t have to', 'mustn’t', 'needn’t have', 'shouldn’t'], correctAnswer: 'A', explanation: '"Didn’t have to" indicates that something was unnecessary in the past and therefore was not performed.' },
        { id: 's2_u1_g2', skill: 'Grammar', question: 'You __________ taken a taxi to the hospital; my brother was parked outside and could have driven you for free.', options: ['needn’t have', 'didn’t have to', 'mustn’t have', 'should have'], correctAnswer: 'A', explanation: '"Needn’t have + P.P." means the action (taking the taxi) was done unnecessarily.' },
        { id: 's2_u1_g3', skill: 'Grammar', question: 'In Egypt, all citizens __________ renew their national identity cards when they turn sixteen.', options: ['have to', 'must', 'had to', 'should have'], correctAnswer: 'A', explanation: 'External legal obligation decreed by the state requires "have to".' }
      ]
    },
    readingModule: { passageTitle: 'Reading Module', passage: '', questions: [] },
    listeningModule: { audioTitle: 'Listening Module', speakerRoles: '', transcript: '' },
    unitExam: { examId: 's2_u1_exam', examTitle: 'Unit 1 Standard Exam', durationMinutes: 30, totalMarks: 30, questions: [] }
  },

  // Unit 2: Eating Around the World
  {
    stage: 'Secondary',
    grade: 11,
    gradeLabel: 'Secondary 2 - الصف الثاني الثانوي',
    track: 'General Secondary',
    secondaryPath: 'general_secondary',
    semester: 1,
    unitNumber: 2,
    unitTitle: 'Eating Around the World',
    unitTitleAr: 'عادات الغذاء وتغذية الشعوب وفنون الطهي',
    theme: 'Global Diets, Nutritional Diversity, Food Preservation & Cultural Hospitality',
    literatureModule: kingLearActs[0],
    vocabularyModule: {
      keyWords: [
        { word: 'cuisine', pos: 'n.', ar: 'فنون الطهي والمطبخ القومي', def: 'A style or method of cooking, especially as characteristic of a country or region.', ex: 'Traditional Egyptian cuisine features legumes, fresh herbs, and aromatic spices.', exAr: 'يتميز المطبخ المصري التقليدي بالبقوليات والأعشاب الطازجة والتوابل العطرية.' },
        { word: 'ingredient', pos: 'n.', ar: 'مكون غذائي أساسي', def: 'Any of the foods or substances that are combined to make a particular dish.', ex: 'Fava beans and crushed garlic are core ingredients in authentic koshari.', exAr: 'الفول المدمس والثوم المهروس من المكونات الأساسية في الكشري الأصيل.' },
        { word: 'portion', pos: 'n.', ar: 'حصة طعام / وجبة', def: 'An amount of food served for one person, especially in a restaurant.', ex: 'Nutritionists advise controlling carbohydrate portion sizes to prevent obesity.', exAr: 'ينصح خبراء التغذية بضبط أحجام حصص الكربوهيدرات لتجنب السمنة.' },
        { word: 'ferment', pos: 'v.', ar: 'يتخمر حيوياً', def: 'To undergo chemical breakdown of a substance by bacteria or yeasts.', ex: 'Yogurt and sourdough bread ferment through beneficial lactic acid cultures.', exAr: 'يتخمر الزبادي وخبز العجين المخمر بفعل مزارع بكتيريا حمض اللاكتيك النافعة.' },
        { word: 'spicy', pos: 'adj.', ar: 'حار ومتبل بالبهارات', def: 'Flavored with or fragrant with spices; piquantly pungent.', ex: 'Indian curry dishes are famously spicy, containing chili, turmeric, and ginger.', exAr: 'تشتهر أطباق الكاري الهندية بكونها حارة ومتبلة بالكركم والزنجبيل والفلفل.' },
        { word: 'delicacy', pos: 'n.', ar: 'طعام شهي ونادر', def: 'Something delightful or pleasing, especially a choice or costly food.', ex: 'Stuffed pigeon with cracked green wheat (freek) is a celebrated Egyptian delicacy.', exAr: 'الحمام المحشو بالفريك الأخضر وجبة مصرية شهية ومميزة للغاية.' },
        { word: 'staple', pos: 'n./adj.', ar: 'غذاء رئيسي معتمد', def: 'A main or important element of something, especially principal food.', ex: 'Rice, wheat, and maize form the dietary staple of over half humanity.', exAr: 'يشكل الأرز والقمح والذرة الغذاء الرئيسي لأكثر من نصف البشرية.' },
        { word: 'nutritious', pos: 'adj.', ar: 'مغذٍ وغني بالعناصر', def: 'Nourishing; containing substances with high nutritional value.', ex: 'Lentil soup provides an economical, highly nutritious winter meal.', exAr: 'يوفر حساء العدس وجبة شتوية اقتصادية ومغذية للغاية وغنية بالبروتين.' },
        { word: 'hospitality', pos: 'n.', ar: 'كرم الضيافة وحسن الاستقبال', def: 'The friendly and generous reception and entertainment of guests.', ex: 'Egyptian hospitality dictates welcoming visitors with fragrant mint tea.', exAr: 'يقضي كرم الضيافة المصري باستقبال الضيوف بالشاي المنعنع الفواح.' },
        { word: 'preserve', pos: 'v.', ar: 'يحفظ الأغذية من التلف', def: 'To treat food to prevent decomposition and allow long-term storage.', ex: 'Salt-curing and dehydration preserve fish and meats across arid regions.', exAr: 'التمليح والتجفيف يحفظان الأسماك واللحوم في المناطق الجافة.' },
        { word: 'appetite', pos: 'n.', ar: 'الشهية والإقبال على الطعام', def: 'A natural desire to satisfy a bodily need, especially for food.', ex: 'Fresh citrus aromas stimulate gastric juices and improve appetite.', exAr: 'تنشط روائح الحمضيات الطازجة العصارات الهضمية وتفتح الشهية.' },
        { word: 'feast', pos: 'n.', ar: 'وليمة فاخرة واحتفالية', def: 'A large meal, typically a celebratory one in honor of an event.', ex: 'During Eid celebrations, families gather around a lavish festive feast.', exAr: 'في احتفالات الأعياد، تجتمع العائلات حول وليمة احتفالية عامرة.' },
        { word: 'beverage', pos: 'n.', ar: 'مشروب منعش', def: 'A drink, especially one other than water (tea, coffee, juice).', ex: 'Hibiscus tea (karkadeh) is a popular refreshing herbal beverage in Egypt.', exAr: 'شاي الكركديه مشروب عشبي منعش وواسع الانتشار في مصر.' },
        { word: 'digest', pos: 'v.', ar: 'يهضم الطعام في المعدة', def: 'To break down food in the alimentary canal into substances absorbed by the body.', ex: 'Whole grains take longer to digest, keeping blood sugar levels stable.', exAr: 'تستغرق الحبوب الكاملة وقتاً أطول في الهضم، مما يحافظ على استقرار السكر في الدم.' },
        { word: 'flavor', pos: 'n.', ar: 'نكهة وطعم مميز', def: 'The distinctive taste of a food or drink produced by aroma and taste buds.', ex: 'Cardamom pods lend a rich, warm flavor to Arabic coffee.', exAr: 'تضفي حبات الحبهان نكهة دافئة وغنية على القهوة العربية.' },
        { word: 'bitter', pos: 'adj.', ar: 'مر المذاق', def: 'Having a sharp, pungent taste; not sweet.', ex: 'Dark chocolate containing ninety percent cocoa has an intensely bitter taste.', exAr: 'تتميز الشوكولاتة الداكنة بنسبة 90% كاكاو بطعم مر ولاذع للغاية.' },
        { word: 'dietary', pos: 'adj.', ar: 'متعلق بالنظام الغذائي', def: 'Relating to diets and nutritional choices.', ex: 'Strict dietary fiber intake lowers serum cholesterol significantly.', exAr: 'تناول الألياف الغذائية بانتظام يخفض نسبة الكوليسترول في الدم.' },
        { word: 'roast', pos: 'v.', ar: 'يشوي في الفرن', def: 'To cook food, especially meat, by prolonged exposure to heat in an oven.', ex: 'Slow-roasted lamb shanks with rosemary are tender and succulent.', exAr: 'لحم الضأن المشوي ببطء مع إكليل الجبل في الفرن طري وشهي.' },
        { word: 'utensil', pos: 'n.', ar: 'أداة مطبخية أو مائدة', def: 'An implement, container, or other article in common household use.', ex: 'In many Asian cultures, wooden chopsticks serve as primary dining utensils.', exAr: 'في العديد من الثقافات الآسيوية، تعد عيدان تناول الطعام الخشبية أدوات المائدة الرئيسية.' },
        { word: 'recipe', pos: 'n.', ar: 'وصفة طهي دقيقة', def: 'A set of instructions for preparing a particular dish, including ingredients.', ex: 'Grandmother passed down her secret holiday biscuit recipe through generations.', exAr: 'ورثت الجدة وصفة بسكويت العيد السرية عبر الأجيال.' }
      ],
      collocations: [
        { phrase: 'serve a portion', meaningAr: 'يقدم حصة من الطعام', example: 'Restaurants serve generous portions during celebrations.', exampleAr: 'تقدم المطاعم حصصاً سخية من الطعام في المناسبات.' },
        { phrase: 'show warm hospitality', meaningAr: 'يظهر كرم ضيافة وترحيباً حاراً', example: 'Bedouin hosts show warm hospitality to desert travelers.', exampleAr: 'يظهر المضيفون البدو كرماً وترحيباً حاراً بمسافري الصحراء.' },
        { phrase: 'traditional national cuisine', meaningAr: 'المطبخ القومي التقليدي', example: 'Tagine is integral to North African national cuisine.', exampleAr: 'يعد الطاجين جزءاً لا يتجزأ من المطبخ القومي لشمال إفريقيا.' },
        { phrase: 'rich in nutrients', meaningAr: 'غني بالعناصر الغذائية الأساسية', example: 'Spinach and leafy greens are rich in vital nutrients.', exampleAr: 'تعتبر السبانخ والخضراوات الورقية غنية بالعناصر الغذائية الحيوية.' },
        { phrase: 'follow a strict diet', meaningAr: 'يتبع حمية ونظاماً غذائياً صارماً', example: 'Diabetic patients must follow a strict low-sugar diet.', exampleAr: 'يجب على مرضى السكري اتباع حمية غذائية صارمة قليلة السكر.' }
      ],
      exercises: [
        { id: 's2_u2_q1', skill: 'Grammar', question: 'The spicy seafood soup in Alexandria is __________ hotter than the vegetable soup served in Cairo.', options: ['far', 'more', 'as', 'too'], correctAnswer: 'A', explanation: '"Far" modifies comparative adjectives (far hotter) to denote a substantial degree of difference.' },
        { id: 's2_u2_q2', skill: 'Grammar', question: 'The more balanced your daily nutritional intake is, __________ your immune defenses will function.', options: ['the better', 'better', 'the best', 'more good'], correctAnswer: 'A', explanation: 'Double comparative structure: "The + comparative..., the + comparative..." (The more balanced..., the better...).' },
        { id: 's2_u2_q3', skill: 'Vocabulary', question: 'What is the term for a rare, choice, and highly prized food item characteristic of a country?', options: ['Delicacy', 'Pathogen', 'Utensil', 'Allergy'], correctAnswer: 'A', explanation: '"Delicacy" (أكلة شهية فاخرة) denotes a prized or choice gastronomic dish.' }
      ]
    },
    grammarModule: {
      ruleName: 'Comparative Forms, Modifiers & Graded Adjectives (far more, slightly less)',
      ruleNameAr: 'صيغ المقارنة المتدرجة، درجات الصفات، وروابط التناسب (The more... the more)',
      explanationSummary: 'Mastering degree modifiers with comparatives (far, much, a lot, slightly, a bit), proportional structures ("The more..., the more..."), equality comparisons (as... as, not as/so... as), and gradable vs. non-gradable extreme adjectives.',
      detailedRules: [
        {
          title: 'Comparative Modifiers: Expressing Big vs. Small Differences',
          explanation: 'To express a large difference with comparatives, use: far, much, a lot, significantly (e.g. "Tokyo is far more expensive than Cairo"). To express a minor or subtle difference, use: slightly, a bit, a little (e.g. "This soup is slightly hotter than that one"). NEVER use "very" directly with comparatives (✗ very taller).',
          examples: [
            'Big difference: Organic free-range chicken is significantly more expensive than commercial poultry.',
            'Small difference: Today’s dessert is slightly less sweet than yesterday’s pudding.',
            'Prohibited error: ✗ very faster → ✓ much faster / far faster.'
          ]
        },
        {
          title: 'Proportional Double Comparatives: The more... the more...',
          explanation: 'To show that one change causes or parallels another, use: "The + comparative..., the + comparative...". This operates as a balanced syntactic cause-and-effect structure.',
          examples: [
            'The fresher the ingredients are, the more delicious the soup tastes.',
            'The less saturated fat you consume, the lower your risk of cardiac ailment.'
          ]
        },
        {
          title: 'Gradable vs. Extreme Non-Gradable Adjectives',
          explanation: 'Gradable adjectives (hot, cold, tasty, good) take modifiers like "very, quite, extremely". Extreme non-gradable adjectives (boiling, freezing, delicious, fantastic, dreadful) already contain the meaning of "very" and MUST be modified by absolute adverbs like "absolutely, completely, totally".',
          examples: [
            'Gradable: The tea was very hot.',
            'Non-gradable: The banquet was absolutely magnificent (NOT: very magnificent).'
          ]
        }
      ],
      exercises: [
        { id: 's2_u2_g1', skill: 'Grammar', question: 'The traditional koshari here is __________ tastier than the quick meal we had at the airport.', options: ['much', 'very', 'more', 'too'], correctAnswer: 'A', explanation: '"Much" is the correct modifier for comparative adjectives (much tastier); "very" cannot modify comparatives.' },
        { id: 's2_u2_g2', skill: 'Grammar', question: 'The __________ you practice Mediterranean culinary recipes, the easier cooking becomes.', options: ['more', 'most', 'much', 'many'], correctAnswer: 'A', explanation: 'Proportional comparison formula: "The more... the easier...".' },
        { id: 's2_u2_g3', skill: 'Grammar', question: 'The newly inaugurated oriental restaurant was __________ delicious, according to international culinary critics.', options: ['absolutely', 'very', 'fairly', 'slightly'], correctAnswer: 'A', explanation: '"Delicious" is an extreme non-gradable adjective and must be modified by "absolutely".' }
      ]
    },
    readingModule: { passageTitle: 'Reading Module', passage: '', questions: [] },
    listeningModule: { audioTitle: 'Listening Module', speakerRoles: '', transcript: '' },
    unitExam: { examId: 's2_u2_exam', examTitle: 'Unit 2 Standard Exam', durationMinutes: 30, totalMarks: 30, questions: [] }
  },

  // Unit 3: The Future of Agriculture
  {
    stage: 'Secondary',
    grade: 11,
    gradeLabel: 'Secondary 2 - الصف الثاني الثانوي',
    track: 'General Secondary',
    secondaryPath: 'general_secondary',
    semester: 1,
    unitNumber: 3,
    unitTitle: 'The Future of Agriculture',
    unitTitleAr: 'مستقبل الزراعة المائية والأمن الغذائي المستدام',
    theme: 'Hydroponics, Vertical Farming, Desert Reclamation & Agritech Innovation',
    literatureModule: kingLearActs[1],
    vocabularyModule: {
      keyWords: [
        { word: 'hydroponics', pos: 'n.', ar: 'الزراعة المائية بدون تربة', def: 'The process of growing plants in sand, gravel, or liquid with added nutrients but without soil.', ex: 'Hydroponics conserves up to ninety percent of irrigation water compared to open fields.', exAr: 'توفر الزراعة المائية ما يصل إلى 90% من مياه الري مقارنة بالحقول المكشوفة.' },
        { word: 'vertical farming', pos: 'n.', ar: 'الزراعة الرأسية البرجية', def: 'The practice of growing crops in vertically stacked layers in controlled indoor environments.', ex: 'Urban vertical farming utilizes skyscrapers to cultivate leafy greens near city centers.', exAr: 'تستغل الزراعة الرأسية الحضرية ناطحات السحاب لزراعة الخضراوات بالقرب من مراكز المدن.' },
        { word: 'sustainable', pos: 'adj.', ar: 'مستدام وصديق للبيئة', def: 'Able to be maintained at a certain rate without depleting natural resources.', ex: 'Drip irrigation ensures sustainable water conservation across Egypt’s New Delta.', exAr: 'يضمن الري بالتنقيط حفظاً مستداماً للمياه في مشروع الدلتا الجديدة بمصر.' },
        { word: 'yield', pos: 'n./v.', ar: 'المحصول والإنتاجية الزراعية', def: 'The amount of an agricultural product produced; to produce or provide.', ex: 'Genetically improved drought-resistant wheat yields thirty percent more grain per acre.', exAr: 'ينتج القمح المحسن والمقاوم للجفاف محصولاً إضافياً بنسبة 30% للفدان.' },
        { word: 'cultivate', pos: 'v.', ar: 'يستصلح ويزرع المحاصيل', def: 'To prepare and use land for crops or gardening.', ex: 'Egyptian agricultural engineers cultivate reclaimed desert tracts near Toshka.', exAr: 'يزرع المهندسون الزراعيون المصريون مساحات صحراوية مستصلحة بالقرب من توشكى.' },
        { word: 'fertilizer', pos: 'n.', ar: 'سماد عضوي أو كيميائي', def: 'A chemical or natural substance added to soil or land to increase its fertility.', ex: 'Organic compost acts as an eco-friendly fertilizer without contaminating groundwater.', exAr: 'يعمل السماد العضوي كسماد صديق للبيئة دون تلويث المياه الجوفية.' },
        { word: 'pesticide', pos: 'n.', ar: 'مبيد حشري كيميائي', def: 'A substance used for destroying insects or other organisms harmful to cultivated plants.', ex: 'Controlled biological pest management reduces reliance on toxic chemical pesticides.', exAr: 'تقلل المكافحة الحيوية للآفات من الاعتماد على المبيدات الكيميائية السامة.' },
        { word: 'irrigation', pos: 'n.', ar: 'الري وإمداد الأراضي بالماء', def: 'The supply of water to land or crops to help growth, typically by means of channels.', ex: 'Automated solar drip irrigation channels water directly to plant root zones.', exAr: 'يوجه الري الآلي بالتنقيط المعتمد على الطاقة الشمسية المياه مباشرة إلى جذور النباتات.' },
        { word: 'greenhouse', pos: 'n.', ar: 'صوبة زراعية محمية', def: 'A glass or plastic building in which plants are grown under controlled climate.', ex: 'The Mohamed Naguib Agricultural Greenhouse Complex produces vegetables year-round.', exAr: 'ينتج مجمع صُوَب محمد نجيب الزراعية الخضراوات على مدار العام.' },
        { word: 'arable', pos: 'adj.', ar: 'أرض خصبة صالحة للزراعة', def: 'Land suitable for growing crops through plowing and cultivation.', ex: 'Preserving precious arable land in the Nile Valley is a vital national security priority.', exAr: 'تعد حماية الأراضي الزراعية الخصبة في وادي النيل أولوية أمن قومي حيوية.' },
        { word: 'drought', pos: 'n.', ar: 'الجفاف وندرة الأمطار', def: 'A prolonged period of abnormally low rainfall, leading to a shortage of water.', ex: 'Developing drought-tolerant barley safeguards pastoral communities against dry spells.', exAr: 'تطوير شعير مقاوم للجفاف يحمي المجتمعات الرعوية من مواسم القحط.' },
        { word: 'reclaim', pos: 'v.', ar: 'يستصلح أراضي صحراوية', def: 'To bring waste land or desert into a condition for cultivation.', ex: 'National megaprojects aim to reclaim two million acres of desert wilderness.', exAr: 'تهدف المشروعات القومية الكبرى إلى استصلاح مليوني فدان من الصحراء.' },
        { word: 'aeroponics', pos: 'n.', ar: 'الزراعة الهوائية المائية', def: 'A plant-cultivation technique in which roots hang in the air and are misted with nutrient solution.', ex: 'Aeroponics delivers oxygen and minerals mist directly to exposed roots.', exAr: 'توفر الزراعة الهوائية رذاذ الأكسجين والمعادن مباشرة للجذور المعلقة.' },
        { word: 'crop', pos: 'n.', ar: 'محصول زراعي رئيسي', def: 'A cultivated plant that is grown as food, especially a grain, fruit, or vegetable.', ex: 'Cotton and sugarcane are prominent economic cash crops in Upper Egypt.', exAr: 'يعد القطن وقصب السكر من المحاصيل النقدية الاقتصادية البارزة في صعيد مصر.' },
        { word: 'soil', pos: 'n.', ar: 'التربة الزراعية', def: 'The upper layer of earth in which plants grow, a black or dark brown material.', ex: 'Soil salinity can be mitigated through specialized subterranean drainage systems.', exAr: 'يمكن تخفيف ملوحة التربة من خلال أنظمة صرف زراعي مغطاة ومتخصصة.' },
        { word: 'ecosystem', pos: 'n.', ar: 'نظام بيئي متكامل', def: 'A biological community of interacting organisms and their physical environment.', ex: 'Agrochemical runoff can disrupt fragile river and wetland ecosystems.', exAr: 'يمكن للمخلفات الزراعية الكيميائية أن تعطل النظم البيئية النهرية والرمال الرطبة الهشة.' },
        { word: 'automation', pos: 'n.', ar: 'الميكنة والتشغيل الآلي', def: 'The use of largely automatic equipment in an agricultural system.', ex: 'Farm automation incorporates drones to monitor field moisture and chlorophyll levels.', exAr: 'تدمج الميكنة الزراعية طائرات الدرون لمراقبة رطوبة الحقول ومستويات الكلوروفيل.' },
        { word: 'salinity', pos: 'n.', ar: 'نسبة الملوحة في الماء أو التربة', def: 'The concentration of dissolved salts in water or soil.', ex: 'Desalination technology reduces brackish water salinity for greenhouse irrigation.', exAr: 'تقلل تكنولوجيا تحلية المياه من ملوحة المياه الجوفية لري الصوب.' },
        { word: 'livestock', pos: 'n.', ar: 'المواشي والثروة الحيوانية', def: 'Farm animals regarded as an asset (cattle, sheep, goats).', ex: 'Veterinary care and selective breeding enhance domestic livestock yields.', exAr: 'الرعاية البيطرية والتحسين الوراثي يعززان إنتاجية الثروة الحيوانية المحلية.' },
        { word: 'harvest', pos: 'n./v.', ar: 'موسم الحصاد وجني الثمار', def: 'The season for gathering in agricultural crops; to gather a crop.', ex: 'Combine harvesters gather the national golden wheat harvest rapidly in April.', exAr: 'تجمع الحصادات الآلية محصول القمح الذهبي القومي بسرعة خلال شهر أبريل.' }
      ],
      collocations: [
        { phrase: 'reclaim desert land', meaningAr: 'يستصلح الأراضي الصحراوية', example: 'Egypt continues to reclaim desert land through modern canals.', exampleAr: 'تواصل مصر استصلاح الأراضي الصحراوية عبر شق الترع الحديثة.' },
        { phrase: 'sustainable agriculture', meaningAr: 'الزراعة المستدامة', example: 'Hydroponic systems ensure sustainable agriculture in dry zones.', exampleAr: 'تضمن أنظمة الزراعة المائية زراعة مستدامة في المناطق الجافة.' },
        { phrase: 'conserve irrigation water', meaningAr: 'يوفر ويرشد مياه الري', example: 'Modern computerized drippers conserve irrigation water effectively.', exampleAr: 'ترشد منقطات الري المحوسبة مياه الري بفعالية عالية.' },
        { phrase: 'boost crop yield', meaningAr: 'يزيد ويعزز إنتاجية المحاصيل', example: 'Enriched compost fertilizers boost crop yield substantially.', exampleAr: 'تعمل الأسمدة العضوية المركبة على تعزيز إنتاجية المحاصيل بصورة ملحوظة.' },
        { phrase: 'ensure food security', meaningAr: 'يضمن الأمن الغذائي القومي', example: 'National grain silos ensure food security during global shortages.', exampleAr: 'تضمن صوامع الغلال القومية الأمن الغذائي أثناء الأزمات العالمية.' }
      ],
      exercises: [
        { id: 's2_u3_q1', skill: 'Grammar', question: 'By the year 2030, Egyptian agritech engineers __________ two million acres of arid desert into fertile farmland.', options: ['will have reclaimed', 'will be reclaiming', 'will reclaim', 'reclaim'], correctAnswer: 'A', explanation: 'Future Perfect (will have + P.P.) is used because the action will be completed "by" a specific future date (by 2030).' },
        { id: 's2_u3_q2', skill: 'Grammar', question: 'Tomorrow at ten o’clock in the morning, the minister __________ the newly constructed Toshka irrigation canals.', options: ['will be inspecting', 'will have inspected', 'inspected', 'inspects'], correctAnswer: 'A', explanation: 'Future Continuous (will be + V-ing) denotes an action that will be in progress at a precise point in the future.' },
        { id: 's2_u3_q3', skill: 'Vocabulary', question: 'Growing plants in nutrient-rich water solutions without natural soil is termed:', options: ['Hydroponics', 'Fossilization', 'Deforestation', 'Sedimentation'], correctAnswer: 'A', explanation: 'Hydroponics (الزراعة المائية) grows plants without soil in water solutions.' }
      ]
    },
    grammarModule: {
      ruleName: 'Future Continuous (will be doing) vs. Future Perfect (will have done)',
      ruleNameAr: 'المستقبل المستمر (will be doing) والمستقبل التام (will have done)',
      explanationSummary: 'Differentiating actions that will be ongoing at a specific future moment (Future Continuous: will be + V-ing) from actions that will be accomplished and finished before a future benchmark (Future Perfect: will have + P.P.).',
      detailedRules: [
        {
          title: 'Future Continuous (will be + V-ing): Action in Progress at a Future Moment',
          explanation: 'Used for an action that will be happening or ongoing at a particular future time. Signal words: "at this time tomorrow", "between 5 and 7 PM next Sunday", "at 9 o’clock tomorrow". Also used for polite inquiries about future plans.',
          examples: [
            'Specific point in future: Tomorrow at noon, the research team will be harvesting the greenhouse crops.',
            'Continuous duration: Between 2026 and 2030, Egypt will be modernizing its central irrigation network.'
          ]
        },
        {
          title: 'Future Perfect (will have + P.P.): Action Completed BEFORE a Future Benchmark',
          explanation: 'Used for an action that will be completed, finished, or achieved prior to a specific deadline or time in the future. Signal words: "by + future date" (e.g. by 2030, by next month), "by the time + Present Simple", "before tomorrow", "in two weeks’ time".',
          examples: [
            'By the end of this decade, engineers will have completed the New Delta agricultural corridor.',
            'By the time the foreign delegation lands in Cairo, the minister will have approved the farm expansion grant.'
          ]
        },
        {
          title: 'Negative & Question Forms',
          explanation: 'Future Continuous: won’t be + V-ing ("Will you be using your drone tomorrow?"). Future Perfect: won’t have + P.P. ("By next Friday, we won’t have finished the plowing yet").',
          examples: [
            'Will you be working in the laboratory tomorrow morning?',
            'By this evening, the combine harvesters will not have finished harvesting the entire field.'
          ]
        }
      ],
      exercises: [
        { id: 's2_u3_g1', skill: 'Grammar', question: 'Don’t call Dr. Farouk at 8 PM tonight; he __________ a live television conference on hydroponic crops.', options: ['will be broadcasting', 'will have broadcast', 'broadcasts', 'is broadcast'], correctAnswer: 'A', explanation: 'Action in progress at a specific future time (at 8 PM tonight) requires Future Continuous.' },
        { id: 's2_u3_g2', skill: 'Grammar', question: 'By next December, the ministry of agriculture __________ three hundred modern vertical farming units in Giza.', options: ['will have constructed', 'will be constructing', 'is constructed', 'constructed'], correctAnswer: 'A', explanation: '"By next December" is the definitive trigger for Future Perfect (will have constructed).' },
        { id: 's2_u3_g3', skill: 'Grammar', question: 'In five years’ time, clean solar-powered desalination __________ the main source of greenhouse irrigation.', options: ['will have become', 'will be become', 'becomes', 'is becoming'], correctAnswer: 'A', explanation: '"In five years’ time" denotes completion before or by that period, requiring Future Perfect.' }
      ]
    },
    readingModule: { passageTitle: 'Reading Module', passage: '', questions: [] },
    listeningModule: { audioTitle: 'Listening Module', speakerRoles: '', transcript: '' },
    unitExam: { examId: 's2_u3_exam', examTitle: 'Unit 3 Standard Exam', durationMinutes: 30, totalMarks: 30, questions: [] }
  },

  // Unit 4: Sports & Fitness
  {
    stage: 'Secondary',
    grade: 11,
    gradeLabel: 'Secondary 2 - الصف الثاني الثانوي',
    track: 'General Secondary',
    secondaryPath: 'general_secondary',
    semester: 1,
    unitNumber: 4,
    unitTitle: 'Sports, Fitness & Physical Endurance',
    unitTitleAr: 'الرياضة واللياقة البدنية وقوة التحمل الرياضي',
    theme: 'Athletic Excellence, Sportsmanship, Cardiovascular Health & Olympic Grit',
    literatureModule: kingLearActs[1],
    vocabularyModule: {
      keyWords: [
        { word: 'endurance', pos: 'n.', ar: 'قوة التحمل والمطاولة', def: 'The ability to endure an unpleasant or difficult process or activity with stamina.', ex: 'Long-distance marathon runners develop extraordinary cardiovascular endurance.', exAr: 'يطور عداؤو الماراثون لمسافات طويلة قوة تحمل قلبية وعضلية استثنائية.' },
        { word: 'athletics', pos: 'n.', ar: 'ألعاب القوى والمسابقات الرياضية', def: 'Physical sports and games of any kind, especially track and field.', ex: 'Egyptian athletes earned gold medals in modern pentathlon and weightlifting.', exAr: 'حصد الرياضيون المصريون ميداليات ذهبية في الخماسي الحديث ورفع الأثقال.' },
        { word: 'tournament', pos: 'n.', ar: 'بطولة ومنافسة رياضية رسمية', def: 'A series of contests between a number of competitors, competing for an overall prize.', ex: 'The African Cup of Nations is the most prestigious football tournament on the continent.', exAr: 'تعد كأس الأمم الإفريقية أرقى بطولة كرة قدم في القارة بأسرها.' },
        { word: 'referee', pos: 'n.', ar: 'حكم المباراة الرياضية', def: 'An official who watches a game or match closely to enforce the rules.', ex: 'The referee consulted the VAR monitor before awarding the decisive penalty.', exAr: 'استشار حكم المباراة شاشة تقنية الفيديو المساعد قبل احتساب ركلة الجزاء الحاسمة.' },
        { word: 'sportsmanship', pos: 'n.', ar: 'الروح الرياضية النبيلة', def: 'Fair, generous, and polite behavior or treatment of others, especially in a sports contest.', ex: 'Consoling a defeated opponent exemplifies the highest standard of sportsmanship.', exAr: 'مواساة الخصم المهزوم تجسد أسمى معايير الروح الرياضية الأصيلة.' },
        { word: 'cardiovascular', pos: 'adj.', ar: 'مرتبط بالقلب والأوعية الدموية', def: 'Relating to the heart and blood vessels.', ex: 'Brisk walking thirty minutes daily prevents cardiovascular disease.', exAr: 'المشي السريع لمدة ثلاثين دقيقة يومياً يقي من أمراض القلب والأوعية الدموية.' },
        { word: 'aerobic', pos: 'adj.', ar: 'تمارين هوائية معتمدة على الأكسجين', def: 'Relating to, involving, or requiring free oxygen in exercise.', ex: 'Swimming and cycling are premier aerobic workouts that strengthen lung capacity.', exAr: 'السباحة وركوب الدراجات من أفضل التمارين الهوائية التي تزيد من سعة الرئتين.' },
        { word: 'stamina', pos: 'n.', ar: 'اللياقة البدنية وطاقة التحمل', def: 'The ability to sustain prolonged physical or mental effort.', ex: 'Continuous interval training builds the stamina required for ninety-minute football matches.', exAr: 'يبني التدريب المتقطع عالي الكثافة طاقة التحمل المطلوبة لمباريات الـ 90 دقيقة.' },
        { word: 'spectator', pos: 'n.', ar: 'مشاهد ومتفرج في الملعب', def: 'A person who watches at a show, game, or other sports event.', ex: 'Eighty thousand cheering spectators filled Cairo International Stadium for the final.', exAr: 'ملأ 80 ألف متفرج يهتفون مدرجات ستاد القاهرة الدولي في المباراة النهائية.' },
        { word: 'competitor', pos: 'n.', ar: 'متنافس ومتبارٍ', def: 'A person who takes part in a sports contest.', ex: 'Every Olympic competitor must pass stringent anti-doping medical tests.', exAr: 'يجب على كل متنافس أولمبي اجتياز فحوصات المنشطات الطبية الصارمة.' },
        { word: 'medal', pos: 'n.', ar: 'ميدالية ونوط تكريمي', def: 'A metal disc awarded as a prize in a competition.', ex: 'The Egyptian weightlifter proudly hoisted her Olympic gold medal on the podium.', exAr: 'رفعت رباعة الأثقال المصرية ميداليتها الذهبية الأولمبية بفخر على منصة التتويج.' },
        { word: 'coach', pos: 'n.', ar: 'مدرب وموجه فني رياضي', def: 'An instructor or trainer in sport.', ex: 'The tactical coach devised a formidable pressing strategy against the visiting squad.', exAr: 'ابتكر المدرب التكتيكي استراتيجية ضغط قوية لمواجهة الفريق الضيف.' },
        { word: 'opponent', pos: 'n.', ar: 'الخصم والمنافس في اللعبة', def: 'Someone who competes against or fights another in a contest, game, or argument.', ex: 'Acknowledge your opponent’s skill graciously regardless of the final score.', exAr: 'اعترف بمهارة خصمك بروح نبيلة بغض النظر عن النتيجة النهائية.' },
        { word: 'hydrate', pos: 'v.', ar: 'يروي الجسم بالسوائل', def: 'To cause to absorb water; supply water to a person in order to maintain a healthy balance.', ex: 'Athletes must hydrate adequately with electrolytes during intense summer training.', exAr: 'يجب على الرياضيين ترطيب أجسامهم بالأملاح الكهرلية خلال تدريبات الصيف القاسية.' },
        { word: 'discipline', pos: 'n.', ar: 'الانضباط والالتزام الصارم', def: 'The practice of training people to obey rules or a code of behavior.', ex: 'Athletic supremacy demands unwavering dietary and sleep discipline.', exAr: 'يتطلب التفوق الرياضي انضباطاً صارماً في مواعيد النوم والحمية الغذائية.' },
        { word: 'injury', pos: 'n.', ar: 'إصابة جسدية أو عضلية', def: 'Physical damage to the body caused by violence, accident, or overexertion.', ex: 'The striker underwent surgical rehabilitation for a ruptured cruciate ligament injury.', exAr: 'خضع المهاجم لعملية جراحية وتأهيلية إثر إصابة بقطع في الرباط الصليبي.' },
        { word: 'tactic', pos: 'n.', ar: 'خطة وتكتيك تحرك ميداني', def: 'An action or strategy carefully planned to achieve a specific sports end.', ex: 'Zonal defensive tactics neutralized the opponent’s counter-attacking speed.', exAr: 'نجحت تكتيكات الدفاع بالمنطقة في تحييد سرعة الهجمات المرتدة للخصم.' },
        { word: 'strenuous', pos: 'adj.', ar: 'شاق ومجهد ويتطلب جهداً عنيفاً', def: 'Requiring or using great exertion; arduous.', ex: 'Avoid strenuous weight training without proper warm-up stretches.', exAr: 'تجنب تدريبات رفع الأثقال الشاقة والمجهدة دون إحماء وتمدد عضلي سليم.' },
        { word: 'trophy', pos: 'n.', ar: 'كأس البطولة والتتويج', def: 'A cup or other decorative object awarded as a prize for a victory.', ex: 'The team captain hoisted the championship trophy amidst jubilant celebrations.', exAr: 'رفع قائد الفريق كأس البطولة عالياً وسط احتفالات الجماهير البهيجة.' },
        { word: 'qualify', pos: 'v.', ar: 'يتأهل رسمياً للأدوار التالية', def: 'To become eligible or entitled for a later round of a competition.', ex: 'Egypt scored in extra time to qualify for the World Cup finals.', exAr: 'سجلت مصر هدفاً في الوقت الإضافي لتتأهل رسمياً إلى نهائيات كأس العالم.' }
      ],
      collocations: [
        { phrase: 'demonstrate sportsmanship', meaningAr: 'يتحلى بالروح الرياضية النبيلة', example: 'Champions always demonstrate sportsmanship in victory and defeat.', exampleAr: 'يتحلى الأبطال دائماً بالروح الرياضية في النصر والهزيمة.' },
        { phrase: 'qualify for the finals', meaningAr: 'يتأهل للمباريات النهائية', example: 'The national handball squad qualified for the Olympic semi-finals.', exampleAr: 'تأهل منتخب كرة اليد الوطني إلى الدور نصف النهائي للأولمبياد.' },
        { phrase: 'build physical stamina', meaningAr: 'يبني اللياقة وطاقة التحمل', example: 'Swimming laps daily builds physical stamina efficiently.', exampleAr: 'السباحة يومياً تبني طاقة التحمل واللياقة البدنية بكفاءة.' },
        { phrase: 'sustain an injury', meaningAr: 'يتعرض لإصابة جسدية أو عضلية', example: 'The goalkeeper sustained an ankle injury during practice.', exampleAr: 'تعرض حارس المرمى لإصابة في الكاحل أثناء التدريب.' },
        { phrase: 'break a world record', meaningAr: 'يحطم رقماً قياسياً عالمياً', example: 'The swimmer broke a world record in the 100m freestyle.', exampleAr: 'حطم السباح رقماً قياسياً عالمياً في سباق 100 متر حرة.' }
      ],
      exercises: [
        { id: 's2_u4_q1', skill: 'Grammar', question: 'Despite slipping in the mud during the race, Karim __________ get up and win the medal.', options: ['was able to', 'could', 'can', 'is able to'], correctAnswer: 'A', explanation: '"Was able to" (or managed to) is used for successfully achieving something difficult in a specific past situation; "could" denotes general ability only.' },
        { id: 's2_u4_q2', skill: 'Grammar', question: 'When Nada was ten years old, she __________ swim across the Nile easily without tiring.', options: ['could', 'was able to', 'managed to', 'succeeded in'], correctAnswer: 'A', explanation: '"Could" is used for general past ability over a prolonged period in childhood.' },
        { id: 's2_u4_q3', skill: 'Vocabulary', question: 'Conduct marked by fairness, respect for opponents, and graciousness in defeat is called:', options: ['Sportsmanship', 'Hydroponics', 'Hygiene', 'Triage'], correctAnswer: 'A', explanation: 'Sportsmanship (الروح الرياضية) denotes fairness and grace in athletic competition.' }
      ]
    },
    grammarModule: {
      ruleName: 'Modals of Ability & Possibility in Past & Present (could, was able to, managed to)',
      ruleNameAr: 'أفعال القدرة والاستطاعة في الماضي والحاضر (الفارق بين could و was able to و managed to)',
      explanationSummary: 'Mastering general past ability (could) versus specific past success against obstacles (was/were able to + inf, managed to + inf, succeeded in + V-ing), present capability (can, be able to), and negative forms (couldn’t / wasn’t able to).',
      detailedRules: [
        {
          title: 'General Ability vs. Specific Achievement in the Past',
          explanation: '"Could" expresses general past ability or talent possessed over time (e.g. "My grandfather could speak four languages"). When talking about a specific event or achievement where someone overcame an obstacle or difficulty on a single occasion, you MUST use "was/were able to + inf" or "managed to + inf" (NOT could).',
          examples: [
            'General talent: When Hesham was fifteen, he could run five kilometers without pausing.',
            'Specific crisis: Although the fire spread quickly, all the athletes were able to escape safely (NOT: could escape).'
          ]
        },
        {
          title: 'Managed to vs. Succeeded in',
          explanation: '"Managed to" is followed by a bare infinitive ("managed to win"). "Succeeded in" is followed by a gerund / V-ing ("succeeded in winning"). Both imply overcoming difficulty.',
          examples: [
            'He managed to score the winning goal in the 94th minute.',
            'The swimmer succeeded in breaking the continental record despite cold water.'
          ]
        },
        {
          title: 'Negative Forms: Couldn’t vs. Wasn’t able to',
          explanation: 'In negative sentences, both "couldn’t" and "wasn’t/weren’t able to" are interchangeable for both general inability and specific failures.',
          examples: [
            'Specific failure: Because of heavy snow, the team couldn’t / wasn’t able to travel to the stadium.',
            'General inability: In ancient times, people couldn’t measure athletic times in milliseconds.'
          ]
        }
      ],
      exercises: [
        { id: 's2_u4_g1', skill: 'Grammar', question: 'Although the defensive wall was tight, Salah __________ find space and score in the final minute.', options: ['managed to', 'could', 'can', 'succeeded to'], correctAnswer: 'A', explanation: '"Managed to + bare infinitive" describes overcoming an obstacle on a specific occasion.' },
        { id: 's2_u4_g2', skill: 'Grammar', question: 'The injured gymnast __________ in completing her routine through sheer willpower.', options: ['succeeded', 'managed', 'was able', 'could'], correctAnswer: 'A', explanation: '"Succeeded in + V-ing" is the only correct construction with the preposition "in".' },
        { id: 's2_u4_g3', skill: 'Grammar', question: 'When my uncle was young, he __________ run ten miles every morning before dawn.', options: ['could', 'succeeded in', 'manages to', 'is able to'], correctAnswer: 'A', explanation: 'General past ability over time in youth is expressed with "could".' }
      ]
    },
    readingModule: { passageTitle: 'Reading Module', passage: '', questions: [] },
    listeningModule: { audioTitle: 'Listening Module', speakerRoles: '', transcript: '' },
    unitExam: { examId: 's2_u4_exam', examTitle: 'Unit 4 Standard Exam', durationMinutes: 30, totalMarks: 30, questions: [] }
  },

  // Unit 5: Modern Society & The Power of the Press
  {
    stage: 'Secondary',
    grade: 11,
    gradeLabel: 'Secondary 2 - الصف الثاني الثانوي',
    track: 'General Secondary',
    secondaryPath: 'general_secondary',
    semester: 1,
    unitNumber: 5,
    unitTitle: 'Modern Society & The Power of the Press',
    unitTitleAr: 'المجتمع المعاصر وسلطة الصحافة والإعلام الرقمي',
    theme: 'Investigative Journalism, Free Press Ethics, Digital Misinformation & Civic Duty',
    literatureModule: kingLearActs[2],
    vocabularyModule: {
      keyWords: [
        { word: 'investigative', pos: 'adj.', ar: 'صحافة استقصائية دقيقة', def: 'Systematic inquiry or examination of matters of public interest or wrongdoing.', ex: 'Investigative reporters exposed fraudulent financial corruption in local charities.', exAr: 'كشف الصحفيون الاستقصائيون الفساد المالي وعمليات الاحتيال في الجمعيات الخيرية.' },
        { word: 'censorship', pos: 'n.', ar: 'الرقابة وحجب النشر', def: 'The suppression or prohibition of any parts of books, films, or news considered obscene or politically unacceptable.', ex: 'Ethical journalism champions truth while respecting legal national security restrictions.', exAr: 'تدافع الصحافة الأخلاقية عن الحقيقة مع احترام القيود القانونية للأمن القومي.' },
        { word: 'tabloid', pos: 'n.', ar: 'صحيفة شعبية مثيرة مصورة', def: 'A newspaper having pages half the size of those of a broadsheet, typically popular in style and dominated by sensational news.', ex: 'Tabloids often focus on celebrity gossip rather than international political analysis.', exAr: 'تركز الصحف الشعبية الصفراء على شائعات المشاهير بدلاً من التحليل السياسي الدولي.' },
        { word: 'broadsheet', pos: 'n.', ar: 'صحيفة رسمية جادة ورصينة', def: 'A newspaper with a large format, regarded as more serious and reliable than a tabloid.', ex: 'Respected broadsheets publish verified investigative articles and economic indices.', exAr: 'تنشر الصحف الرصينة مقالات استقصائية موثقة ومؤشرات اقتصادية دقيقة.' },
        { word: 'objective', pos: 'adj.', ar: 'محايد وموضوعي غير منحاز', def: 'Not influenced by personal feelings or opinions in considering and representing facts.', ex: 'A journalist must remain strictly objective when reporting election debates.', exAr: 'يجب أن يظل الصحفي موضوعياً ومحايداً تماماً عند تغطية المناظرات الانتخابية.' },
        { word: 'bias', pos: 'n.', ar: 'التحيز والمحاباة الفكرية', def: 'Prejudice in favor of or against one thing, person, or group compared with another, usually considered unfair.', ex: 'Media literacy trains readers to detect political bias and selective spin.', exAr: 'تدرب الثقافة الإعلامية القراء على اكتشاف التحيز السياسي والتوجيه الانتقائي للأخبار.' },
        { word: 'headline', pos: 'n.', ar: 'مانشيت وعنوان رئيسي بالصحيفة', def: 'A heading at the top of an article or page in a newspaper or magazine.', ex: 'The front-page headline announced the discovery of an ancient pharaonic cemetery.', exAr: 'أعلن المانشيت الرئيسي في الصفحة الأولى عن اكتشاف مقبرة فرعونية قديمة.' },
        { word: 'source', pos: 'n.', ar: 'مصدر موثوق للمعلومات', def: 'A person, publication, or document that supplies information.', ex: 'Professional correspondents cross-examine at least two independent sources before publishing.', exAr: 'يتحقق المراسلون المحترفون من مصدرين مستقلين على الأقل قبل النشر.' },
        { word: 'circulate', pos: 'v.', ar: 'ينتشر ويتداول بين الناس', def: 'To pass from person to person or place to place; spread.', ex: 'Sensational rumors circulate rapidly across unregulated social media platforms.', exAr: 'تنتشر الشائعات المثيرة بسرعة فائقة عبر منصات التواصل الاجتماعي غير الخاضعة للرقابة.' },
        { word: 'editorial', pos: 'n.', ar: 'مقال افتتاحي يعبر عن رأي الجريدة', def: 'A newspaper article written by or on behalf of an editor that gives an opinion on a topical issue.', ex: 'The editor-in-chief authored a compelling editorial on combating digital piracy.', exAr: 'كتب رئيس التحرير مقالاً افتتاحياً مؤثراً حول مكافحة القرصنة الرقمية.' },
        { word: 'misinformation', pos: 'n.', ar: 'معلومات مضللة وغير صحيحة', def: 'False or inaccurate information, especially that which is deliberately intended to deceive.', ex: 'Fact-checking units debunk digital misinformation during global health crises.', exAr: 'تدحض وحدات تدقيق الحقائق المعلومات المضللة خلال الأزمات الصحية العالمية.' },
        { word: 'defamation', pos: 'n.', ar: 'التشهير والقذف العلني', def: 'The action of damaging the good reputation of someone through slander or libel.', ex: 'Publishing unverified accusations constitutes illegal defamation punishable by civil law.', exAr: 'يشكل نشر اتهامات غير موثقة تشهيراً غير قانوني يعاقب عليه القانون المدني.' },
        { word: 'coverage', pos: 'n.', ar: 'تغطية إعلامية وصحفية', def: 'The treatment of an issue, especially by the media.', ex: 'International news channels provided comprehensive live coverage of the peace summit.', exAr: 'قدمت القنوات الإخبارية الدولية تغطية حية وشاملة لقمة السلام.' },
        { word: 'correspondent', pos: 'n.', ar: 'مراسل صحفي ميداني', def: 'A person employed by a news organization to report on a particular topic or from a foreign location.', ex: 'The foreign correspondent reported live from the flood-ravaged delta region.', exAr: 'نقل المراسل الخارجي تقاريره مباشرة من منطقة الدلتا التي غمرتها الفيضانات.' },
        { word: 'ethics', pos: 'n.', ar: 'ميثاق الشرف والأخلاقيات المهنية', def: 'Moral principles that govern a person’s behavior or the conducting of an activity.', ex: 'Journalistic ethics require protecting confidential whistleblowers.', exAr: 'تتطلب أخلاقيات الصحافة حماية المصادر السرية والمبلغين عن الفساد.' },
        { word: 'spin', pos: 'n.', ar: 'التضليل والالتفاف الإعلامي', def: 'A particular bias, interpretation, or point of view, intended to create a favorable impression.', ex: 'Public relations agencies placed positive spin on the economic deficit report.', exAr: 'أضفت وكالات العلاقات العامة التفافاً إيجابياً مضللاً على تقرير العجز الاقتصادي.' },
        { word: 'anonymous', pos: 'adj.', ar: 'مجهول الهوية / غير مسمى', def: 'Not identified by name; of unknown name.', ex: 'An anonymous insider leaked the suppressed industrial pollution audit.', exAr: 'سرب مصدر مجهول الهوية التقرير البيئي السري حول التلوث الصناعي.' },
        { word: 'columnist', pos: 'n.', ar: 'كاتب عمود صحفي دوري', def: 'A journalist who contributes regularly to a newspaper or magazine.', ex: 'The seasoned political columnist dissects diplomatic treaties every Thursday.', exAr: 'يحلل كاتب العمود السياسي المخضرم المعاهدات الدبلوماسية كل يوم خميس.' },
        { word: 'eyewitness', pos: 'n.', ar: 'شاهد عيان على الحدث', def: 'A person who has personally seen something happen and so can give a first-hand description of it.', ex: 'Eyewitness accounts confirmed that the fire started in the storage basement.', exAr: 'أكدت روايات شهود العيان أن الحريق اندلع في قبو التخزين.' },
        { word: 'paparazzi', pos: 'n.', ar: 'مصورو المشاهير المتطفلون', def: 'Freelance photographers who pursue celebrities to take photographs of them.', ex: 'Aggressive paparazzi pursued the visiting actress through the hotel lobby.', exAr: 'طارد مصورو الباباراتزي المتطفلون الممثلة الزائرة عبر ردهة الفندق.' }
      ],
      collocations: [
        { phrase: 'cover a breaking story', meaningAr: 'يغطي خبراً عاجلاً وحصرياً', example: 'Journalists rushed to cover a breaking diplomatic story in Geneva.', exampleAr: 'سارع الصحفيون لتغطية خبر دبلوماسي عاجل في جنيف.' },
        { phrase: 'verify sources', meaningAr: 'يتحقق من دقة المصادر', example: 'Reputable news outlets always verify sources meticulously.', exampleAr: 'تتحقق وسائل الإعلام المرموقة دائماً من مصادرها بدقة بالغة.' },
        { phrase: 'combat digital misinformation', meaningAr: 'يكافح التضليل والشائعات الرقمية', example: 'Social networks deploy algorithms to combat digital misinformation.', exampleAr: 'تنشر الشبكات الاجتماعية خوارزميات لمكافحة التضليل الرقمي.' },
        { phrase: 'publish an editorial', meaningAr: 'ينشر مقالاً افتتاحياً', example: 'The newspaper published an editorial calling for green investments.', exampleAr: 'نشرت الجريدة مقالاً افتتاحياً يدعو إلى الاستثمارات الخضراء.' },
        { phrase: 'freedom of expression', meaningAr: 'حرية التعبير والرأي', example: 'Responsible freedom of expression underpins a healthy civil society.', exampleAr: 'حرية التعبير المسؤولة تدعم وجود مجتمع مدني معافى ومستقر.' }
      ],
      exercises: [
        { id: 's2_u5_q1', skill: 'Grammar', question: 'It __________ reported by international correspondents that ancient artifacts were recovered safely.', options: ['is', 'has', 'does', 'was being'], correctAnswer: 'A', explanation: 'Impersonal passive structure: "It is reported / believed / thought that + clause".' },
        { id: 's2_u5_q2', skill: 'Grammar', question: 'The investigative report __________ by the editorial board while new evidence was being verified.', options: ['was being revised', 'revised', 'is revising', 'has been revised'], correctAnswer: 'A', explanation: 'Past Continuous Passive: "was/were being + P.P." describes an action being performed on a subject in the past.' },
        { id: 's2_u5_q3', skill: 'Vocabulary', question: 'A newspaper that covers serious politics, business, and economics in a large format is called a:', options: ['Broadsheet', 'Tabloid', 'Flyer', 'Pamphlet'], correctAnswer: 'A', explanation: 'A broadsheet (صحيفة رصينة) is a serious, authoritative newspaper format.' }
      ]
    },
    grammarModule: {
      ruleName: 'Passive Voice in Continuous & Perfect Tenses + Impersonal Passive ("It is reported that...")',
      ruleNameAr: 'المبني للمجهول في الأزمنة المستمرة والتامة وصيغ النقل الإخباري غير الشخصي',
      explanationSummary: 'Mastering the conversion of advanced tenses into the passive voice (Past/Present Continuous: being + P.P.; Past/Present Perfect: been + P.P.) and formal journalistic reporting structures ("It is said/believed that..." and "Subject is said to + inf / to have + P.P.").',
      detailedRules: [
        {
          title: 'Passive in Continuous Tenses (being + P.P.)',
          explanation: 'Present Continuous Passive: am/is/are + being + P.P. ("The article is being written"). Past Continuous Passive: was/were + being + P.P. ("The suspect was being questioned when the lawyer arrived").',
          examples: [
            'While the press conference was being broadcast, millions of citizens watched online.',
            'The museum murals are currently being restored by specialized conservators.'
          ]
        },
        {
          title: 'Passive in Perfect Tenses (been + P.P.)',
          explanation: 'Present Perfect Passive: have/has + been + P.P. ("The contract has been signed"). Past Perfect Passive: had + been + P.P. ("The news had been leaked before the official statement was released").',
          examples: [
            'All the historical documents have been authenticated by the national archives.',
            'By the time the press arrived, the leaked memo had already been removed from the website.'
          ]
        },
        {
          title: 'Journalistic Impersonal Passive (It is thought / Subject is said to)',
          explanation: 'Two formal reporting patterns: Pattern 1: "It + passive reporting verb (is believed/said/thought/reported) + that + clause". Pattern 2: "Subject + passive reporting verb + to + infinitive (for present) / to have + P.P. (for past)".',
          examples: [
            'Pattern 1: It is believed that the minister will address the symposium tomorrow.',
            'Pattern 2 (Present): The company is expected to announce massive profits this quarter.',
            'Pattern 2 (Past): The suspect is said to have escaped across the border last night.'
          ]
        }
      ],
      exercises: [
        { id: 's2_u5_g1', skill: 'Grammar', question: 'The ancient papyri __________ by Italian specialists before they were exhibited in Cairo.', options: ['had been examined', 'have been examined', 'were examining', 'examined'], correctAnswer: 'A', explanation: 'Past Perfect Passive (had been + P.P.) is needed for the prior action before "were exhibited".' },
        { id: 's2_u5_g2', skill: 'Grammar', question: 'The legendary Egyptian author is reported __________ three unpublished manuscripts before his passing.', options: ['to have written', 'to write', 'writing', 'having written'], correctAnswer: 'A', explanation: '"Subject is reported + to have + P.P." expresses that the reported action happened in the past.' },
        { id: 's2_u5_g3', skill: 'Grammar', question: 'Look at the printing press! The morning broadsheets __________ right now.', options: ['are being printed', 'are printed', 'were being printed', 'have been printing'], correctAnswer: 'A', explanation: 'Present Continuous Passive (are being + P.P.) is triggered by "right now".' }
      ]
    },
    readingModule: { passageTitle: 'Reading Module', passage: '', questions: [] },
    listeningModule: { audioTitle: 'Listening Module', speakerRoles: '', transcript: '' },
    unitExam: { examId: 's2_u5_exam', examTitle: 'Unit 5 Standard Exam', durationMinutes: 30, totalMarks: 30, questions: [] }
  },

  // Unit 6: Life Journeys & Future Energy
  {
    stage: 'Secondary',
    grade: 11,
    gradeLabel: 'Secondary 2 - الصف الثاني الثانوي',
    track: 'General Secondary',
    secondaryPath: 'general_secondary',
    semester: 1,
    unitNumber: 6,
    unitTitle: 'Life Journeys, Renewable Energy & Global Frontiers',
    unitTitleAr: 'رحلات الحياة والطاقة المتجددة والآفاق العالمية',
    theme: 'Clean Energy Transition, Hydrogen Fuel, Solar Fields & International Careers',
    literatureModule: kingLearActs[2],
    vocabularyModule: {
      keyWords: [
        { word: 'renewable', pos: 'adj.', ar: 'طاقة متجددة ونظيفة', def: 'Capable of being replenished naturally within human timescales (solar, wind, hydro).', ex: 'Benban Solar Park produces gigawatts of clean renewable electricity in Aswan.', exAr: 'تنتج محطة بنبان للطاقة الشمسية جيجاوات من الكهرباء النظيفة المتجددة في أسوان.' },
        { word: 'turbine', pos: 'n.', ar: 'توربين توليد الطاقة بالرياح', def: 'A machine for producing continuous power in which a rotor is made to revolve by a fast-moving flow of water, steam, or air.', ex: 'Wind turbines on the Red Sea coast harness fierce desert gales efficiently.', exAr: 'تستغل توربينات الرياح على ساحل البحر الأحمر الرياح الصحراوية القوية بكفاءة.' },
        { word: 'hydrogen', pos: 'n.', ar: 'الهيدروجين الأخضر كوقود', def: 'A colorless, odorless, highly flammable gas; green hydrogen is produced through water electrolysis.', ex: 'Green hydrogen represents the cleanest zero-emission fuel for future heavy transport.', exAr: 'يمثل الهيدروجين الأخضر أنظف وقود خالي من الانبعاثات لقطاع النقل الثقيل في المستقبل.' },
        { word: 'fossil fuel', pos: 'n.', ar: 'الوقود الأحفوري (الفحم والنفط والغاز)', def: 'A natural fuel such as coal or gas, formed in the geological past from the remains of living organisms.', ex: 'Transitioning away from fossil fuels combats devastating global atmospheric warming.', exAr: 'التحول بعيداً عن الوقود الأحفوري يكافح ظاهرة الاحتباس الحراري المدمرة.' },
        { word: 'geothermal', pos: 'adj.', ar: 'الطاقة الحرارية الجوفية للأرض', def: 'Relating to or produced by the internal heat of the earth.', ex: 'Geothermal energy provides subterranean heating for volcanic communities in Iceland.', exAr: 'توفر الطاقة الحرارية الجوفية تدفئة من باطن الأرض للمجتمعات البركانية في أيسلندا.' },
        { word: 'photovoltaic', pos: 'adj.', ar: 'الخلايا الكهروضوئية الشمسية', def: 'Relating to the production of electric current at the junction of two substances exposed to light.', ex: 'Photovoltaic silicon cells convert intense sunlight directly into direct current electricity.', exAr: 'تحول الخلايا الكهروضوئية المصنوعة من السيليكون ضوء الشمس مباشرة إلى تيار كهربائي.' },
        { word: 'megaproject', pos: 'n.', ar: 'مشروع قومي عملاق', def: 'An extremely large-scale, complex venture that typically takes many years to build.', ex: 'The Dabaa nuclear energy station is an ambitious Egyptian national megaproject.', exAr: 'تعد محطة الضبعة للطاقة النووية السلمية مشروعاً قومياً مصرياً عملاقاً وطموحاً.' },
        { word: 'decarbonize', pos: 'v.', ar: 'يزيل ويخفض الانبعاثات الكربونية', def: 'To reduce the amount of gaseous carbon compounds released into the atmosphere.', ex: 'Heavy industries must decarbonize production to satisfy Paris Climate Accords.', exAr: 'يجب على الصناعات الثقيلة خفض انبعاثاتها الكربونية للوفاء باتفاقات باريس للمناخ.' },
        { word: 'grid', pos: 'n.', ar: 'الشبكة القومية لنقل وتوزيع الكهرباء', def: 'A network of cables or pipes by which electricity, gas, or other services are distributed to an area.', ex: 'The unified national power grid distributes surplus energy to neighboring states.', exAr: 'توزع الشبكة القومية الموحدة فائض الطاقة الكهربائية إلى الدول المجاورة.' },
        { word: 'emission', pos: 'n.', ar: 'انبعاثات الغازات والعوادم', def: 'The production and discharge of something, especially gas or radiation.', ex: 'Electric vehicles produce zero tailpipe greenhouse gas emissions.', exAr: 'لا تنتج المركبات الكهربائية أي انبعاثات غازية ضارة من عوادمها.' },
        { word: 'catalyst', pos: 'n.', ar: 'محفز وعامل مساعد على التغيير', def: 'A substance that increases the rate of a chemical reaction without undergoing permanent change; a person or thing that precipitates an event.', ex: 'Investments in green technology act as an economic catalyst for job growth.', exAr: 'تعمل الاستثمارات في التكنولوجيا الخضراء كمحفز اقتصادي لخلق فرص العمل.' },
        { word: 'expatriate', pos: 'n.', ar: 'مغترب يعمل خارج موطنه الأصلي', def: 'A person who lives outside their native country.', ex: 'Many skilled Egyptian engineers thrive as respected expatriates in global tech hubs.', exAr: 'يزدهر العديد من المهندسين المصريين المهرة كمغتربين مرموقين في مراكز التقنية العالمية.' },
        { word: 'diplomacy', pos: 'n.', ar: 'الدبلوماسية والعلاقات الدولية', def: 'The profession, activity, or skill of managing international relations.', ex: 'Climate diplomacy unites nations to mitigate worldwide environmental catastrophes.', exAr: 'توحد الدبلوماسية المناخية دول العالم للحد من الكوارث البيئية العالمية.' },
        { word: 'adapt', pos: 'v.', ar: 'يتكيف ويتأقلم مع البيئات الجديدة', def: 'To become adjusted to new conditions, cultures, or environments.', ex: 'Migrant professionals must adapt quickly to multicultural corporate dynamics.', exAr: 'يجب على المهنيين المغتربين التكيف بسرعة مع بيئات العمل متعددة الثقافات.' },
        { word: 'pioneer', pos: 'n./v.', ar: 'رائد ومبتكر سباق', def: 'A person who is among the first to explore or settle a new country or area of knowledge.', ex: 'Egyptian researchers are pioneers in seawater desalination via reverse osmosis.', exAr: 'يعتبر الباحثون المصريون رواداً في تحلية مياه البحر عبر التناضح العكسي.' },
        { word: 'frontier', pos: 'n.', ar: 'آفاق وحدود الاستكشاف الجديدة', def: 'The extreme limit of settled land or of technological and scientific achievement.', ex: 'Clean nuclear fusion represents the ultimate frontier of limitless clean energy.', exAr: 'يمثل الاندماج النووي النظيف أقصى آفاق الطاقة النظيفة التي لا تنضب.' },
        { word: 'transition', pos: 'n.', ar: 'التحول والانتقال التدريجي', def: 'The process or a period of changing from one state or condition to another.', ex: 'The global energy transition prioritizes replacing coal with wind and solar power.', exAr: 'يعطي التحول العالمي في مجال الطاقة الأولوية لإحلال الرياح والشمس محل الفحم.' },
        { word: 'hydroelectric', pos: 'adj.', ar: 'الطاقة الكهرومائية (المولدة من السدود)', def: 'Relating to the generation of electricity using flowing water.', ex: 'The Aswan High Dam generates cheap, reliable hydroelectric power for Egypt.', exAr: 'يولد السد العالي بأسوان طاقة كهرومائية رخيصة وموثوقة لكافة محافظات مصر.' },
        { word: 'carbon footprint', pos: 'n.', ar: 'البصمة الكربونية للفرد أو المنشأة', def: 'The amount of carbon dioxide and other carbon compounds emitted due to the consumption of fossil fuels by a particular person, group, etc.', ex: 'Commuting by metro drastically shrinks an urban citizen’s personal carbon footprint.', exAr: 'يقلل التنقل بمترو الأنفاق البصمة الكربونية الشخصية للمواطن في المدن بشكل كبير.' },
        { word: 'efficient', pos: 'adj.', ar: 'كفء وذو كفاءة إنتاجية عالية', def: 'Achieving maximum productivity with minimum wasted effort or expense.', ex: 'LED lighting is ten times more energy-efficient than incandescent filament bulbs.', exAr: 'تعد إضاءة الليد أكثر كفاءة في استخدام الطاقة بعشر مرات من المصابيح التقليدية.' }
      ],
      collocations: [
        { phrase: 'generate renewable electricity', meaningAr: 'يولد الكهرباء المتجددة النظيفة', example: 'Solar farms in Upper Egypt generate renewable electricity year-round.', exampleAr: 'تولد مزارع الطاقة الشمسية في صعيد مصر كهرباء متجددة على مدار العام.' },
        { phrase: 'reduce carbon footprint', meaningAr: 'يقلل البصمة الكربونية الضارة', example: 'Industries switch to green hydrogen to reduce their carbon footprint.', exampleAr: 'تتحول المصانع إلى الهيدروجين الأخضر لتقليل بصمتها الكربونية.' },
        { phrase: 'transition to clean energy', meaningAr: 'يتحول نحو الطاقة النظيفة', example: 'Developing nations require international financing to transition to clean energy.', exampleAr: 'تحتاج الدول النامية إلى تمويل دولي للتحول نحو الطاقة النظيفة.' },
        { phrase: 'pursue a global career', meaningAr: 'يسعى وراء مسار مهني دولي', example: 'Bilingual university graduates are equipped to pursue a global career.', exampleAr: 'الخريجون متعددو اللغات مؤهلون لمتابعة مسار مهني دولي مرموق.' },
        { phrase: 'adapt to new environments', meaningAr: 'يتأقلم مع البيئات والثقافات الجديدة', example: 'Expatriate scholars adapt to new environments through mutual respect.', exampleAr: 'يتأقلم الباحثون المغتربون مع البيئات الجديدة عبر الاحترام المتبادل.' }
      ],
      exercises: [
        { id: 's2_u6_q1', skill: 'Grammar', question: 'Benban Solar Park, __________ was inaugurated in Aswan, is one of the largest solar power installations on Earth.', options: ['which', 'that', 'where', 'whose'], correctAnswer: 'A', explanation: 'Non-defining relative clause (separated by commas) giving non-essential information about a thing requires "which", never "that".' },
        { id: 's2_u6_q2', skill: 'Grammar', question: 'The engineer with __________ we conferred yesterday designed the green hydrogen electrolysis pipeline.', options: ['whom', 'who', 'which', 'that'], correctAnswer: 'A', explanation: 'When a preposition directly precedes a relative pronoun referring to a person ("with..."), "whom" is mandatory in formal English.' },
        { id: 's2_u6_q3', skill: 'Vocabulary', question: 'What clean energy fuel is created by splitting water into oxygen and hydrogen via renewable electricity?', options: ['Green hydrogen', 'Crude oil', 'Anthracite coal', 'Natural gas'], correctAnswer: 'A', explanation: 'Green hydrogen (الهيدروجين الأخضر) is synthesized through renewable water electrolysis.' }
      ]
    },
    grammarModule: {
      ruleName: 'Relative Clauses (Defining vs. Non-Defining) & Formal Preposition Placement',
      ruleNameAr: 'عبارات الوصل المحددة وغير المحددة، ضمائر الوصل، وموضع حروف الجر مع Whom و Which',
      explanationSummary: 'Distinguishing defining relative clauses (essential information, no commas, "that" permitted) from non-defining relative clauses (extra information, commas mandatory, "that" prohibited), and formal fronting of prepositions (to whom, in which) versus informal ending.',
      detailedRules: [
        {
          title: 'Defining vs. Non-Defining Relative Clauses',
          explanation: 'Defining clauses identify which specific noun is meant; they have NO commas, and "that" can replace "who/which" (e.g. "The solar panel that was installed yesterday is working"). Non-defining clauses provide extra, non-essential biographical or descriptive details; they MUST have commas, and "that" is STRICTLY FORBIDDEN (✗ Dr. Zewail, that won the Nobel Prize...).',
          examples: [
            'Defining (no commas, essential): Engineers who specialize in green hydrogen are in high demand.',
            'Non-defining (commas, extra info): The Aswan Dam, which was completed in 1970, generates clean hydropower.',
            'Forbidden error: ✗ The High Dam, that was built in 1970... → ✓ which was built...'
          ]
        },
        {
          title: 'Whom and Which after Prepositions (Formal Syntax)',
          explanation: 'In formal ministerial and academic English, when a relative pronoun is the object of a preposition, the preposition precedes the pronoun: use "preposition + whom" for persons, and "preposition + which" for things/places. "Who" and "that" CANNOT follow a preposition directly (✗ with who, ✗ in that).',
          examples: [
            'For persons: The minister with whom we discussed the solar subsidy was very encouraging.',
            'For things: The wind turbine farm from which we receive electricity is located in Zafarana.',
            'Informal variation (preposition at end): The minister who we discussed the solar subsidy with...'
          ]
        },
        {
          title: 'Whose, Where, When & Omitting Relative Pronouns',
          explanation: '"Whose" shows possession ("The inventor whose patent was approved"). "Where" refers to a place where an action occurs ("The laboratory where we test solar cells"). Note: if there is a preposition, use "which" ("The laboratory which we work in"). When the relative pronoun is the object of the verb, it can be omitted ("The project (which) we completed").',
          examples: [
            'Possession: The researcher whose thesis examined biofuel won a scholarship.',
            'Place with verb: The desert field where the solar arrays stand receives 4,000 sunshine hours annually.',
            'Place with preposition: The desert field in which the panels stand...'
          ]
        }
      ],
      exercises: [
        { id: 's2_u6_g1', skill: 'Grammar', question: 'The diplomat, __________ father was an ambassador to the UN, led the climate change negotiations.', options: ['whose', 'whom', 'who', 'which'], correctAnswer: 'A', explanation: '"Whose" expresses possession relating the diplomat to his father.' },
        { id: 's2_u6_g2', skill: 'Grammar', question: 'The laboratory in __________ the new solar battery was developed has received a government grant.', options: ['which', 'where', 'that', 'whom'], correctAnswer: 'A', explanation: 'Prepositions ("in...") referring to a facility or thing require "which" (in which = where).' },
        { id: 's2_u6_g3', skill: 'Grammar', question: 'The clean energy technician __________ we interviewed yesterday possessed outstanding credentials.', options: ['(no pronoun)', 'which', 'whose', 'where'], correctAnswer: 'A', explanation: 'When the relative pronoun functions as the direct object of the verb ("we interviewed [him]"), it can be omitted.' }
      ]
    },
    readingModule: { passageTitle: 'Reading Module', passage: '', questions: [] },
    listeningModule: { audioTitle: 'Listening Module', speakerRoles: '', transcript: '' },
    unitExam: { examId: 's2_u6_exam', examTitle: 'Unit 6 Standard Exam', durationMinutes: 30, totalMarks: 30, questions: [] }
  }
];

// ------------------------------------------------------------------------------------------------
// 3. SECONDARY 3 (GRADE 12 / THANAWEYA AMMA) TERM 1 UNITS (UNITS 1 - 6)
// Literature: Great Expectations by Charles Dickens (Chapters 1 to 6)
// ------------------------------------------------------------------------------------------------
export const fullSecondary3Units: UnitCurriculum[] = [
  // Unit 1: Read All About It!
  {
    stage: 'Secondary',
    grade: 12,
    gradeLabel: 'Secondary 3 - الصف الثالث الثانوي (الثانوية العامة)',
    track: 'General Secondary',
    secondaryPath: 'general_secondary',
    semester: 1,
    unitNumber: 1,
    unitTitle: 'Read All About It!',
    unitTitleAr: 'اقرأ كل شيء عن الحدث! (الصحافة والإعلام وحقوق النشر)',
    theme: 'Journalistic Integrity, Copyright Piracy, Tabloids vs. Broadsheets & Digital Media Ethics',
    literatureModule: greatExpectationsChapters[0],
    vocabularyModule: {
      keyWords: [
        { word: 'piracy', pos: 'n.', ar: 'القرصنة والسطو على حقوق الملكية الفكرية', def: 'The unauthorized reproduction, distribution, or copying of copyrighted books, music, or films.', ex: 'Online textbook piracy causes millions in revenue loss to legitimate educational publishing houses.', exAr: 'تسبب قرصنة الكتب الدراسية عبر الإنترنت خسائر بملايين الجنيهات لدور النشر التعليمية.' },
        { word: 'broadsheet', pos: 'n.', ar: 'صحيفة رسمية جادة ورصينة', def: 'A newspaper printed on large sheets of paper, focusing on in-depth political and economic analysis.', ex: 'Discerning readers prefer broadsheets for objective geopolitical analysis.', exAr: 'يفضل القراء الواعون الصحف الرصينة لما تقدمه من تحليلات جيوسياسية موضوعية.' },
        { word: 'tabloid', pos: 'n.', ar: 'صحيفة شعبية مثيرة ومختصرة', def: 'A newspaper having small pages with short sensational stories and prominent photographs.', ex: 'The tabloid featured screaming bold headlines about the celebrity divorce.', exAr: 'تصدرت الصحيفة الشعبية مانشيتات عريضة ومثيرة حول طلاق أحد المشاهير.' },
        { word: 'bias', pos: 'n.', ar: 'التحيز والمحاباة الفكرية', def: 'An inclination or prejudice for or against one person, group, or viewpoint, especially in an unfair way.', ex: 'Reporters must eliminate personal bias to deliver balanced election reportage.', exAr: 'يجب على الصحفيين التخلص من التحيز الشخصي لتقديم تقارير انتخابية متوازنة.' },
        { word: 'mislead', pos: 'v.', ar: 'يضلل ويخدع الجمهور', def: 'To cause someone to have a wrong idea or impression about someone or something.', ex: 'Cropped photographs can mislead readers regarding the actual crowd size.', exAr: 'يمكن للصور الفوتوغرافية المجتزأة أن تضلل القراء بشأن حجم الحشود الفعلي.' },
        { word: 'spin', pos: 'n./v.', ar: 'التوجيه الدعائي والالتفاف الإعلامي', def: 'A form of propaganda achieved through providing a biased interpretation of an event to influence public opinion.', ex: 'The spokesperson put a diplomatic spin on the stalled trade negotiations.', exAr: 'وضع المتحدث الرسمي صبغة دعائية التفافية على المفاوضات التجارية المتعثرة.' },
        { word: 'omission', pos: 'n.', ar: 'الإغفال والحذف المتعمد للحقائق', def: 'The action of leaving out or excluding someone or something.', ex: 'Bias by omission occurs when relevant contextual facts are deliberately concealed.', exAr: 'يحدث التحيز بالحذف عندما تُحجب الحقائق والسياقات الجوهرية عمداً.' },
        { word: 'placement', pos: 'n.', ar: 'موضع وتنسيق الخبر بالصفحة', def: 'The action of putting something in a particular place, especially on a page to show prominence.', ex: 'Bias by placement buries crucial economic news deep inside page fourteen.', exAr: 'يؤدي التحيز بالموضع إلى دفن الأخبار الاقتصادية الهامة في ذيل الصفحة الرابعة عشرة.' },
        { word: 'compensate', pos: 'v.', ar: 'يعوض مالياً أو معنوياً', def: 'To give someone money or other recognition in order to make up for loss, injury, or damage.', ex: 'The court ordered the rogue website to compensate the author for copyright violations.', exAr: 'أمرت المحكمة الموقع الإلكتروني المخالف بتعويض المؤلف عن انتهاكات حقوق النشر.' },
        { word: 'casualty', pos: 'n.', ar: 'ضحية أو مصاب في حادث', def: 'A person killed or injured in a war, accident, or natural disaster.', ex: 'Fortunately, the train collision resulted in zero civilian casualties.', exAr: 'لحسن الحظ، لم يسفر حادث تصادم القطار عن أي ضحايا أو مصابين من المدنيين.' },
        { word: 'ruin', pos: 'v./n.', ar: 'يدمر / حطام وخراب', def: 'The physical destruction or disintegration of something; to cause grave damage.', ex: 'Fabricated digital scandals can permanently ruin an innocent executive’s reputation.', exAr: 'يمكن للفضائح الرقمية المفبركة أن تدمر سمعة مسؤول بريء بشكل دائم.' },
        { word: 'affair', pos: 'n.', ar: 'شأن أو قضية عامة', def: 'An event or sequence of events of a specified kind or that is previously referred to.', ex: 'The foreign affairs minister held a bilateral briefing with his Arab counterparts.', exAr: 'عقد وزير الشؤون الخارجية إحاطة ثنائية مع نظرائه من الدول العربية.' },
        { word: 'convict', pos: 'n./v.', ar: 'مدان ومسجون / يدين قضائياً', def: 'A person found guilty of a criminal offense; to declare someone guilty.', ex: 'The jury voted unanimously to convict the hacker of intellectual property espionage.', exAr: 'صوتت هيئة المحلفين بالإجماع على إدانة المخترق بالتجسس وسرقة الملكية الفكرية.' },
        { word: 'incident', pos: 'n.', ar: 'واقعة أو حادثة غير متوقعة', def: 'An event or occurrence, especially one that is unusual, important, or violent.', ex: 'Police launched an investigation into the mysterious bridge collapse incident.', exAr: 'فتحت الشرطة تحقيقاً موسعاً في واقعة انهيار الجسر الغامضة.' },
        { word: 'claim', pos: 'v./n.', ar: 'يدعي ويزعم دون برهان', def: 'To state or assert that something is the case, typically without providing proof.', ex: 'The anonymous blogger claimed that the vaccine contained synthetic tracking chips.', exAr: 'ادعى المدون المجهول أن اللقاح يحتوي على شرائح تتبع صناعية دون دليل.' },
        { word: 'shocked', pos: 'adj.', ar: 'مصدوم ومذهول من هول النبأ', def: 'Surprised and upset by something very unexpected and unpleasant.', ex: 'Citizens were shocked by the sudden fire that consumed the heritage market.', exAr: 'صُدم المواطنون من الحريق المفاجئ الذي التهم السوق التراثي العريق.' },
        { word: 'occur', pos: 'v.', ar: 'يحدث ويقع في زمان محدد', def: 'To happen; take place.', ex: 'The earthquake occurred at 3 AM when most residents were sleeping soundly.', exAr: 'وقع الزلزال في تمام الثالثة صباحاً حين كان أغلب السكان يغطون في نوم عميق.' },
        { word: 'investigate', pos: 'v.', ar: 'يحقق ويفحص الأدلة', def: 'To carry out a systematic or formal inquiry to discover and examine the facts.', ex: 'Detectives investigate the digital footprints left by the cybercrime network.', exAr: 'يحقق المحققون الجنائيون في الآثار الرقمية التي خلفتها شبكة الجرائم الإلكترونية.' },
        { word: 'punish', pos: 'v.', ar: 'يعاقب قانونياً', def: 'To inflict a penalty or sanction on someone as retribution for an offense.', ex: 'Intellectual property courts punish counterfeit textbook distributors severely.', exAr: 'تعاقب محاكم الملكية الفكرية موزعي الكتب الدراسية المقلدة بأشد العقوبات.' },
        { word: 'warn', pos: 'v.', ar: 'يحذر وينذر من الخطر', def: 'To inform someone in advance of an impending or possible danger, problem, or other situation.', ex: 'Cybersecurity agencies warn internet users against downloading pirated software.', exAr: 'تحذر أجهزة الأمن السيبراني مستخدمي الإنترنت من تحميل البرمجيات المقرصنة.' }
      ],
      collocations: [
        { phrase: 'commit digital piracy', meaningAr: 'يرتكب جريمة القرصنة الإلكترونية', example: 'Websites that commit digital piracy face international legal prosecution.', exampleAr: 'المواقع التي ترتكب القرصنة الإلكترونية تواجه ملاحقات قضائية دولية.' },
        { phrase: 'compensate for financial loss', meaningAr: 'يعوض عن الخسائر المالية', example: 'Publishers demand compensation for financial loss caused by book leaks.', exampleAr: 'يطالب الناشرون بتعويض عن الخسائر المالية الناجمة عن تسريب الكتب.' },
        { phrase: 'bias by omission', meaningAr: 'التحيز بحذف وإخفاء الحقائق', example: 'Omitting the defender’s statement is a classic example of bias by omission.', exampleAr: 'إغفال بيان الدفاع يعد نموذجاً كلاسيكياً للتحيز بحذف الحقائق.' },
        { phrase: 'demand strict punishment', meaningAr: 'يطالب بعقوبات رادعة وصارمة', example: 'Authors demand strict punishment for copyright infringers.', exampleAr: 'يطالب المؤلفون بعقوبات رادعة وصارمة لمنتهكي حقوق النشر.' },
        { phrase: 'verify investigative sources', meaningAr: 'يتحقق من دقة المصادر الصحفية', example: 'Broadsheet journalists meticulously verify investigative sources.', exampleAr: 'يتحقق صحفيو الجرائد الرصينة من مصادرهم الاستقصائية بدقة بالغة.' }
      ],
      exercises: [
        { id: 's3_u1_q1', skill: 'Grammar', question: 'By the time the police officer reached the riverbank, the escaped convict __________ across the marsh.', options: ['had swum', 'swam', 'has swum', 'was swimming'], correctAnswer: 'A', explanation: 'Past Perfect (had + P.P.) is required for an event that happened BEFORE another past action ("by the time the officer reached").' },
        { id: 's3_u1_q2', skill: 'Grammar', question: 'No sooner __________ the morning broadsheet than he noticed the front-page scandal.', options: ['had he opened', 'he had opened', 'did he open', 'has he opened'], correctAnswer: 'A', explanation: 'Negative inversion: "No sooner had + subject + P.P. ... than". Fronting "No sooner" requires question inversion.' },
        { id: 's3_u1_q3', skill: 'Vocabulary', question: 'Deliberately leaving out key facts in a news report to skew public opinion is termed:', options: ['Bias by omission', 'Copyright piracy', 'Compensatory spin', 'Editorial placement'], correctAnswer: 'A', explanation: '"Bias by omission" (التحيز بالحذف) occurs when relevant facts are purposefully excluded.' }
      ]
    },
    grammarModule: {
      ruleName: 'Narrative Tenses & Past Perfect vs. Past Continuous with Time Linkers',
      ruleNameAr: 'أزمنة السرد والماضي التام في مواجهة الماضي البسيط والروابط الزمنية المتقدمة',
      explanationSummary: 'Mastering sequential narrative tenses: Past Perfect (had + P.P.) for the earlier past event, Past Simple for the subsequent event, and key time linkers: After, As soon as, Before, By the time, Having + P.P., It was only when... that, No sooner... than.',
      detailedRules: [
        {
          title: 'The Time Machine Tense: Past Perfect (had + P.P.)',
          explanation: 'When two events occurred in the past, the earlier event takes the Past Perfect (had + P.P.), while the subsequent event takes the Past Simple. Formula: "After / As soon as + Past Perfect, Past Simple" AND "Before / By the time + Past Simple, Past Perfect".',
          examples: [
            'Earlier action: The pirate website had illegally uploaded the manuscript before the publisher announced the release date.',
            'By the time: By the time the cyber police arrived at the warehouse, the counterfeiters had fled.'
          ]
        },
        {
          title: 'Participle Clause Shortcut: Having + P.P.',
          explanation: '"Having + P.P." replaces "After + Subject + Past Perfect" when the subject of both clauses is identical (Active). Passive form: "Having been + P.P.".',
          examples: [
            'Active: Having investigated the leaked documents, the editor approved the front-page report. (= After he had investigated...)',
            'Passive: Having been convicted of intellectual piracy, the hacker was sentenced to three years in prison.'
          ]
        },
        {
          title: 'Cleft Time Structures: It was only when... that / It wasn’t until... that',
          explanation: 'Emphasis structures: "It was only when + Past Perfect + THAT + Past Simple" AND "It wasn’t until + Past Perfect + THAT + Past Simple".',
          examples: [
            'It was only when the author had received official copyright papers that he felt legally secure.',
            'It wasn’t until the evidence had been verified that the reporter published the explosive scoop.'
          ]
        }
      ],
      exercises: [
        { id: 's3_u1_g1', skill: 'Grammar', question: '__________ the stolen manuscript thoroughly, the editor contacted the cybercrime department.', options: ['Having examined', 'Examining', 'Had examined', 'Having been examined'], correctAnswer: 'A', explanation: '"Having + P.P." replaces "After he had examined".' },
        { id: 's3_u1_g2', skill: 'Grammar', question: 'It wasn’t until the detective __________ the digital logs that the identity of the hacker was discovered.', options: ['had decoded', 'has decoded', 'decodes', 'was decoding'], correctAnswer: 'A', explanation: 'Structure: "It wasn’t until + Past Perfect (had decoded) + that + Past Simple".' },
        { id: 's3_u1_g3', skill: 'Grammar', question: 'Hardly __________ the printing press when a major power outage halted newspaper production.', options: ['had the engineers started', 'the engineers had started', 'did the engineers start', 'have the engineers started'], correctAnswer: 'A', explanation: 'Negative inversion: "Hardly had + subject + P.P. ... when".' }
      ]
    },
    readingModule: { passageTitle: 'Reading Module', passage: '', questions: [] },
    listeningModule: { audioTitle: 'Listening Module', speakerRoles: '', transcript: '' },
    unitExam: { examId: 's3_u1_exam', examTitle: 'Unit 1 Standard Exam', durationMinutes: 30, totalMarks: 30, questions: [] }
  },

  // Unit 2: Her Story: Pioneering Women
  {
    stage: 'Secondary',
    grade: 12,
    gradeLabel: 'Secondary 3 - الصف الثالث الثانوي (الثانوية العامة)',
    track: 'General Secondary',
    secondaryPath: 'general_secondary',
    semester: 1,
    unitNumber: 2,
    unitTitle: 'Her Story: Pioneering Women',
    unitTitleAr: 'قصتها: رائدات مصريات غيرن التاريخ وكسرن الصور النمطية',
    theme: 'Gender Equality, Female Pioneers in STEM, Overcoming Prejudice & Social Reform',
    literatureModule: greatExpectationsChapters[1],
    vocabularyModule: {
      keyWords: [
        { word: 'pioneer', pos: 'n.', ar: 'رائد / رائدة ملهمة في مجالها', def: 'A person who is among the first to explore or settle a new area of intellectual knowledge or social reform.', ex: 'Dr. Hikmat Abu Zayd was an illustrious pioneer as Egypt’s first female government minister.', exAr: 'كانت الدكتورة حكمت أبو زيد رائدة ملهمة كأول وزيرة في الحكومة المصرية.' },
        { word: 'stereotype', pos: 'n.', ar: 'صورة نمطية مسبقة وغير منصفة', def: 'A widely held but fixed and oversimplified image or idea of a particular type of person or thing.', ex: 'Female aerospace engineers shatter outdated stereotypes about gender and science.', exAr: 'تحطم مهندسات الفضاء الصور النمطية القديمة والمجحفة حول المرأة والعلوم.' },
        { word: 'prejudice', pos: 'n.', ar: 'التحامل والتمييز المسبق', def: 'Preconceived opinion that is not based on reason or actual experience.', ex: 'Pioneering women overcame institutional prejudice through intellectual distinction.', exAr: 'تغلبت الرائدات على التحامل والتمييز المؤسسي من خلال التفوق الفكري.' },
        { word: 'role model', pos: 'n.', ar: 'قدوة ومثل أعلى يُحتذى به', def: 'A person looked to by others as an example to be imitated.', ex: 'Dr. Sameera Moussa remains a timeless role model for young female nuclear physicists.', exAr: 'تظل الدكتورة سميرة موسى قدوة خالدة وملهمة للفيزيائيات النوويات الشابات.' },
        { word: 'contribute', pos: 'v.', ar: 'يسهم ويشارك في البناء', def: 'To give something in order to help achieve or provide something.', ex: 'Egyptian female scientists contribute groundbreaking research in solar nanotechnology.', exAr: 'تسهم العالمات المصريات بأبحاث رائدة في تكنولوجيا النانو لتوليد الطاقة الشمسية.' },
        { word: 'defy', pos: 'v.', ar: 'يتحدى الصعاب والمعتقدات الخاطئة', def: 'To openly resist or refuse to obey; challenge expectations.', ex: 'Malak Hifni Nasif defied conservative cultural obstacles to champion women’s literacy.', exAr: 'تحدت ملك حفني ناصف العوائق الثقافية المحافظة للدفاع عن تعليم المرأة.' },
        { word: 'inspire', pos: 'v.', ar: 'يلهم ويشحذ الهمم', def: 'To fill someone with the urge or ability to do or feel something, especially something creative.', ex: 'Stories of triumph over adversity inspire generations of university scholars.', exAr: 'تلهم قصص الانتصار على الشدائد أجيالاً متعاقبة من طلبة الجامعات.' },
        { word: 'prestigious', pos: 'adj.', ar: 'مرموق وذو مكانة رفيعة', def: 'Inspiring respect and admiration; having high status.', ex: 'She was awarded a prestigious state medal of distinction in pharmacology.', exAr: 'مُنحت وسام الدولة التقديري المرموق في العلوم الصيدلية.' },
        { word: 'remarkable', pos: 'adj.', ar: 'استثنائي وجدير بالثناء', def: 'Worthy of attention; striking or extraordinary.', ex: 'Her remarkable dissertation revolutionized pediatric oncology treatments in Cairo.', exAr: 'أحدثت رسالتها الاستثنائية ثورة في علاجات أورام الأطفال بالقاهرة.' },
        { word: 'recognition', pos: 'n.', ar: 'الاعتراف والتقدير الرسمي بالفضل', def: 'Identification of someone or something’s achievements; acknowledgment of validity.', ex: 'International recognition followed her discovery of the ancient desert papyrus tomb.', exAr: 'توالى التقدير الدولي إثر اكتشافها مقبرة البرديات الصحراوية القديمة.' },
        { word: 'empower', pos: 'v.', ar: 'يمكّن ويعزز القدرات', def: 'To make someone stronger and more confident, especially in controlling their life.', ex: 'Micro-finance agricultural initiatives empower rural women across Upper Egypt.', exAr: 'تمكّن مبادرات التمويل الأصغر الزراعية نساء الريف في صعيد مصر اقتصادياً.' },
        { word: 'perseverance', pos: 'n.', ar: 'المثابرة والصمود حتى النجاح', def: 'Persistence in doing something despite difficulty or delay in achieving success.', ex: 'Her unwavering perseverance carried her through twelve years of doctoral research.', exAr: 'عبرت بها مثابرتها الراسخة سنوات البحث الشاق حتى نيل الدكتوراه.' },
        { word: 'advocate', pos: 'n./v.', ar: 'مدافع ومناصر لقضية / يناصر', def: 'A person who publicly supports or recommends a particular cause or policy.', ex: 'Hoda Shaarawi was an outspoken advocate for universal public education for girls.', exAr: 'كانت هدى شعراوي مدافعة بارزة عن التعليم العام الإلزامي للفتيات.' },
        { word: 'diploma', pos: 'n.', ar: 'شهادة ودبلومة دراسية تخصصية', def: 'A certificate awarded by an educational establishment to show that someone has successfully completed a course.', ex: 'She earned an advanced postgraduate diploma in molecular epidemiology.', exAr: 'نالت دبلومة دراسات عليا متقدمة في علم الأوبئة الجزيئية.' },
        { word: 'significant', pos: 'adj.', ar: 'هام ومؤثر وذو دلالة', def: 'Sufficiently great or important to be worthy of attention.', ex: 'Female representation in the Egyptian parliament has reached a significant milestone.', exAr: 'حققت نسبة تمثيل المرأة في البرلمان المصري علامة فارقة ومهمة.' },
        { word: 'obstacle', pos: 'n.', ar: 'عقبة وعائق في الطريق', def: 'A thing that blocks one’s way or prevents or hinders progress.', ex: 'Poverty and geographical isolation are formidable obstacles to female literacy.', exAr: 'يمثل الفقر والعزلة الجغرافية عقبات صعبة أمام محو أمية الفتيات.' },
        { word: 'distinction', pos: 'n.', ar: 'الامتياز والتفوق الدراسي', def: 'Excellence that sets someone apart from others.', ex: 'The young surgeon passed her fellowship examination with summa cum laude distinction.', exAr: 'اجتازت الجراحة الشابة امتحان الزمالة بدرجة الامتياز مع مرتبة الشرف الأولى.' },
        { word: 'reform', pos: 'n./v.', ar: 'إصلاح وتطوير مجتمعي', def: 'The improvement or amendment of what is wrong, corrupt, or unsatisfactory.', ex: 'Judicial reform granted women equal standing in administrative courts.', exAr: 'منح الإصلاح القضائي المرأة مكانة متساوية في دوائر المحاكم الإدارية.' },
        { word: 'trailblazer', pos: 'n.', ar: 'ممهد الطريق وصاحب السبق', def: 'A person who makes a new track through wild country; a pioneer or innovator.', ex: 'Lotfia ElNadi was a courageous trailblazer as the first Arab female pilot in 1933.', exAr: 'كانت لطفية النادي رائدة وممهدة للطريق كأول طيارة عربية عام 1933.' },
        { word: 'scholarship', pos: 'n.', ar: 'منحة دراسية ممولة', def: 'A grant or payment made to support a student’s education, awarded on the basis of academic achievement.', ex: 'She secured a competitive Fulbright scholarship to study nuclear astrophysics in Boston.', exAr: 'فازت بمنحة فولبرايت التنافسية لدراسة الفيزياء الفلكية النووية في بوسطن.' }
      ],
      collocations: [
        { phrase: 'shatter outdated stereotypes', meaningAr: 'يحطم الصور النمطية البالية', example: 'Female astronauts shatter outdated stereotypes in STEM.', exampleAr: 'تحطم رائدات الفضاء الصور النمطية البالية في مجالات العلوم والتكنولوجيا.' },
        { phrase: 'act as a role model', meaningAr: 'يكون قدوة ومثلاً أعلى للأجيال', example: 'Accomplished educators act as a role model for young students.', exampleAr: 'يمثل المعلمون المتميزون قدوة ومثلاً أعلى للطلاب الصغار.' },
        { phrase: 'overcome formidable obstacles', meaningAr: 'يتغلب على العقبات الصعبة', example: 'She overcame formidable obstacles to establish the children’s hospital.', exampleAr: 'تغلبت على عقبات صعبة لتأسيس مستشفى الأطفال التخصصي.' },
        { phrase: 'make a significant contribution', meaningAr: 'يقدم إسهاماً كبيراً ومؤثراً', example: 'Egyptian female inventors make a significant contribution to green tech.', exampleAr: 'تقدم المخترعات المصريات إسهاماً كبيراً في التكنولوجيا الخضراء.' },
        { phrase: 'earn prestigious recognition', meaningAr: 'ينال تكريماً واعترافاً دولياً مرموقاً', example: 'Her medical research earned prestigious international recognition.', exampleAr: 'نالت أبحاثها الطبية تقديراً وتكريماً دولياً مرموقاً.' }
      ],
      exercises: [
        { id: 's3_u2_q1', skill: 'Grammar', question: 'Dr. Hikmat Abu Zayd, who was born in 1922, __________ as Minister of Social Affairs until 1965.', options: ['served', 'has served', 'had been serving', 'is serving'], correctAnswer: 'A', explanation: 'A completed past historical action with a definite finished time period (1922 - 1965) requires Past Simple (served).' },
        { id: 's3_u2_q2', skill: 'Grammar', question: 'Since her appointment as chief geneticist, Dr. Laila __________ five groundbreaking clinical studies.', options: ['has published', 'published', 'had published', 'publishes'], correctAnswer: 'A', explanation: 'Since + past time clause is followed in the main clause by Present Perfect (has published) to indicate actions continuing up to the present.' },
        { id: 's3_u2_q3', skill: 'Vocabulary', question: 'A fixed, unfair, and oversimplified societal belief about a group of people is called a:', options: ['Stereotype', 'Scholarship', 'Delicacy', 'Piracy'], correctAnswer: 'A', explanation: 'A stereotype (صورة نمطية مسبقة) is an oversimplified, biased concept.' }
      ]
    },
    grammarModule: {
      ruleName: 'Present Perfect vs. Past Simple Nuances (since/for, It has been... since)',
      ruleNameAr: 'المضارع التام في مواجهة الماضي البسيط والتراكيب المتقدمة مع Since و For',
      explanationSummary: 'Mastering the boundary between completed past events (Past Simple with finished time markers) and actions connected to the present (Present Perfect: have/has + P.P.). Detailed examination of "Since" formulas: (1) Since + Past Simple, Present Perfect; (2) It is / has been + time duration + since + Past Simple; and "have been to" vs. "have gone to".',
      detailedRules: [
        {
          title: 'The Great Divide: Finished Past vs. Unfinished Present Reality',
          explanation: 'Past Simple is bound to finished time: yesterday, in 1999, two years ago, when I was young. Present Perfect connects the past to the present: so far, up to now, over the past decade, recently, lately, ever, never, already, yet.',
          examples: [
            'Finished: Dr. Sameera Moussa died tragically in 1952. (Past Simple - finished year)',
            'Connected to now: Egyptian female scientists have made extraordinary breakthroughs this century. (Unfinished century)'
          ]
        },
        {
          title: 'Advanced "Since" Formulas in Ministry Exams',
          explanation: 'Formula 1: Present Perfect + since + Past Simple ("She has worked here since she graduated"). Formula 2: "It is / has been + duration + since + Past Simple (or Subject + last + V2)" ("It has been three years since I visited Aswan"). Formula 3: Since when / Ever since.',
          examples: [
            'Formula 1: We haven’t heard from Dr. Mona since she arrived in London.',
            'Formula 2: It has been five months since we last attended a physics seminar.'
          ]
        },
        {
          title: 'Have been to vs. Have gone to vs. Have been in',
          explanation: '"Have been to": Went and returned ("She has been to Luxor; she is back in Cairo now"). "Have gone to": Went and is still there ("She has gone to Luxor; she will return next week"). "Have been in": Has resided/stayed in a place for a period ("I have been in Alexandria for six years").',
          examples: [
            'Returned: Reham has been to the library; her bag is full of borrowed books.',
            'Still away: The manager has gone to Paris on business; he is not at his desk today.'
          ]
        }
      ],
      exercises: [
        { id: 's3_u2_g1', skill: 'Grammar', question: 'It is almost two years since the university __________ the new nanotechnology research laboratory.', options: ['opened', 'has opened', 'had opened', 'is opening'], correctAnswer: 'A', explanation: 'Structure: "It is/has been + duration + since + Past Simple (opened)".' },
        { id: 's3_u2_g2', skill: 'Grammar', question: 'My sister is currently not in Egypt; she __________ to Cambridge University to complete her doctorate.', options: ['has gone', 'has been', 'went to', 'had been'], correctAnswer: 'A', explanation: '"Has gone" means she is still there and has not yet returned.' },
        { id: 's3_u2_g3', skill: 'Grammar', question: 'Never in her distinguished career __________ such an inspiring humanitarian address.', options: ['has she delivered', 'she has delivered', 'she delivered', 'did she delivered'], correctAnswer: 'A', explanation: 'Negative inversion: "Never + auxiliary (has) + subject (she) + P.P. (delivered)".' }
      ]
    },
    readingModule: { passageTitle: 'Reading Module', passage: '', questions: [] },
    listeningModule: { audioTitle: 'Listening Module', speakerRoles: '', transcript: '' },
    unitExam: { examId: 's3_u2_exam', examTitle: 'Unit 2 Standard Exam', durationMinutes: 30, totalMarks: 30, questions: [] }
  },

  // Unit 3: Beyond Imagination: Sci-Fi & Space
  {
    stage: 'Secondary',
    grade: 12,
    gradeLabel: 'Secondary 3 - الصف الثالث الثانوي (الثانوية العامة)',
    track: 'General Secondary',
    secondaryPath: 'general_secondary',
    semester: 1,
    unitNumber: 3,
    unitTitle: 'Beyond Imagination: Sci-Fi & Space',
    unitTitleAr: 'ما وراء الخيال: الفضاء واستكشاف الكون والتكنولوجيا المستقبلية',
    theme: 'Astrophysics, Mars Colonization, James Webb Telescope & Artificial Consciousness',
    literatureModule: greatExpectationsChapters[1],
    vocabularyModule: {
      keyWords: [
        { word: 'astronomy', pos: 'n.', ar: 'علم الفلك ودراسة الأجرام السماوية', def: 'The branch of science that deals with celestial objects, space, and the physical universe as a whole.', ex: 'Modern astronomy relies on space-borne multispectral telescopes.', exAr: 'يعتمد علم الفلك الحديث على التلسكوبات الفضائية متعددة الأطياف.' },
        { word: 'telescope', pos: 'n.', ar: 'تلسكوب ومقراب فضائي فلكي', def: 'An optical instrument designed to make distant objects appear nearer.', ex: 'The James Webb Space Telescope captures infrared images of the earliest galaxies.', exAr: 'يلتقط تلسكوب جيمس ويب الفضائي صوراً بالأشعة تحت الحمراء لأقدم المجرات في الكون.' },
        { word: 'astronaut', pos: 'n.', ar: 'رائد فضاء مدرب', def: 'A person who is trained to travel in a spacecraft.', ex: 'Astronauts undergo rigorous zero-gravity training inside underwater neutral buoyancy tanks.', exAr: 'يخضع رواد الفضاء لتدريبات شاقة على انعدام الجاذبية في خزانات مائية خاصة.' },
        { word: 'gravity', pos: 'n.', ar: 'قوة الجاذبية الكونية', def: 'The force that attracts a body toward the center of the earth, or toward any other physical body having mass.', ex: 'Lunar gravity is merely one-sixth as strong as Earth’s gravitational pull.', exAr: 'تعادل جاذبية القمر سُدس قوة الجاذبية الأرضية فقط.' },
        { word: 'weightlessness', pos: 'n.', ar: 'انعدام الوزن والطفو في الفضاء', def: 'The state of being free from the effects of gravity; zero gravity.', ex: 'Prolonged weightlessness causes bone density loss in orbiting space crews.', exAr: 'يسبب انعدام الوزن لفترات طويلة فقداناً في كثافة العظام لدى أطقم الفضاء.' },
        { word: 'spacecraft', pos: 'n.', ar: 'مركبة ومسبار فضائي', def: 'A vehicle used for traveling in space.', ex: 'The robotic spacecraft landed safely on the rocky Martian crater.', exAr: 'هبطت المركبة الفضائية الروبوتية بسلام على فوهة بركان المريخ الصخرية.' },
        { word: 'orbit', pos: 'n./v.', ar: 'مدار كوكبي / يدور في فلك محدد', def: 'The curved path of a celestial object or spacecraft around a star, planet, or moon.', ex: 'The International Space Station orbits Earth every ninety minutes at hyper-speed.', exAr: 'تدور محطة الفضاء الدولية حول الأرض كل 90 دقيقة بسرعة هائلة.' },
        { word: 'launch', pos: 'v./n.', ar: 'يطلق صاروخاً / عملية إطلاق', def: 'To send a missile, satellite, or spacecraft into the air or into space.', ex: 'Engineers launched the communications satellite into geostationary orbit.', exAr: 'أطلق المهندسون قمر الاتصالات الصناعي إلى مداره الثابت بالنسبة للأرض.' },
        { word: 'solar system', pos: 'n.', ar: 'المجموعة والمجرة الشمسية', def: 'The collection of eight planets and their moons in orbit around the sun.', ex: 'Neptune is the coldest and most distant gas giant in our solar system.', exAr: 'يعد نبتون أبرد وأبعد عملاق غازي في مجموعتنا الشمسية.' },
        { word: 'mission', pos: 'n.', ar: 'مهمة استكشافية رسمية', def: 'An important assignment carried out for political, scientific, or military purposes.', ex: 'NASA’s Artemis mission aims to establish a permanent human outpost on the moon.', exAr: 'تهدف مهمة أرتميس التابعة لناسا إلى إنشاء قاعدة بشرية دائمة على سطح القمر.' },
        { word: 'spinoff', pos: 'n.', ar: 'تطبيق تقني مشتق من أبحاث الفضاء', def: 'A commercial product or service derived from earlier research in another field.', ex: 'Memory foam and scratch-resistant lenses are commercial spinoffs of space exploration.', exAr: 'مراتب الإسفنج الذكي وعدسات النظارات المقاومة للخدش تطبيقات مشتقة من أبحاث الفضاء.' },
        { word: 'cosmos', pos: 'n.', ar: 'الكون الفسيح المتناسق', def: 'The universe seen as a well-ordered whole.', ex: 'Philosophers and physicists contemplate the mysterious origins of the cosmos.', exAr: 'يتأمل الفلاسفة وعلماء الفيزياء الأصول الغامضة لنشأة الكون الفسيح.' },
        { word: 'terrestrial', pos: 'adj.', ar: 'أرضي / متعلق بكوكب الأرض', def: 'Relating to the earth or to land as opposed to space or water.', ex: 'Scientists compare Martian mineral soil samples with terrestrial basalt rocks.', exAr: 'يقارن العلماء عينات تربة المريخ المعدنية بصخور البازلت الأرضية.' },
        { word: 'extraterrestrial', pos: 'adj.', ar: 'كائن أو حياة خارج كوكب الأرض', def: 'Originating or existing outside the earth or its atmosphere.', ex: 'Astrobiologists search for signs of microbial extraterrestrial life on Jupiter’s moon Europa.', exAr: 'يبحث علماء الأحياء الفلكية عن علامات لحياة ميكروبية خارج كوكب الأرض على قمر المشتري أوروبا.' },
        { word: 'atmosphere', pos: 'n.', ar: 'الغلاف الجوي للكوكب', def: 'The envelope of gases surrounding the earth or another planet.', ex: 'Mars possesses a thin atmosphere composed predominantly of carbon dioxide.', exAr: 'يمتلك كوكب المريخ غلافاً جوياً رقيقاً يتكون في معظمه من غاز ثاني أكسيد الكربون.' },
        { word: 'debris', pos: 'n.', ar: 'حطام وشظايا فضائية مهملة', def: 'Scattered fragments, typically of something wrecked or destroyed; space junk.', ex: 'Defunct satellites generate dangerous orbiting space debris that threatens active missions.', exAr: 'تولد الأقمار الصناعية المعطلة حطاماً فضائياً مدارياً خطيراً يهدد المهمات النشطة.' },
        { word: 'propulsion', pos: 'n.', ar: 'الدفع الصاروخي والمحركات النفاثة', def: 'The action of driving or pushing forwards.', ex: 'Ion propulsion engines provide efficient deep-space acceleration for interplanetary probes.', exAr: 'توفر محركات الدفع الأيوني تسارعاً فائق الكفاءة في الفضاء السحيق للمسابير بين الكواكب.' },
        { word: 'eclipse', pos: 'n.', ar: 'كسوف الشمس أو خسوف القمر', def: 'An obscuring of the light from one celestial body by the passage of another between it and the observer.', ex: 'A total solar eclipse plunges daytime landscapes into eerie temporary twilight.', exAr: 'يغرق الكسوف الكلي للشمس أرجاء النهار في غسق مؤقت مذهل.' },
        { word: 'crater', pos: 'n.', ar: 'فوهة نيزكية وبركانية على سطح الكوكب', def: 'A large, bowl-shaped cavity in the ground or on the surface of a planet or the moon.', ex: 'Meteorite impacts gouged massive deep craters across the barren lunar surface.', exAr: 'حفرت اصطدامات النيازك فوهات عميقة وضخمة عبر سطح القمر القاحل.' },
        { word: 'galaxy', pos: 'n.', ar: 'مجرة كونية هائلة تضم مليارات النجوم', def: 'A system of millions or billions of stars, together with gas and dust, held together by gravitational attraction.', ex: 'Our solar system resides on a spiral arm of the Milky Way galaxy.', exAr: 'تقع مجموعتنا الشمسية على أحد الأذرع الحلزونية لمجرة درب التبانة.' }
      ],
      collocations: [
        { phrase: 'orbit the Earth', meaningAr: 'يدور في مدار حول كوكب الأرض', example: 'Communication satellites orbit the Earth at high altitudes.', exampleAr: 'تدور أقمار الاتصالات في مدار حول الأرض على ارتفاعات شاهقة.' },
        { phrase: 'launch a space mission', meaningAr: 'يطلق مهمة فضائية استكشافية', example: 'Egypt launched a space mission to deploy Earth-observation satellites.', exampleAr: 'أطلقت مصر مهمة فضائية لنشر أقمار صناعية لمراقبة الأرض.' },
        { phrase: 'experience zero gravity', meaningAr: 'يجرب انعدام الجاذبية والوزن', example: 'Astronauts experience zero gravity aboard the orbiting laboratory.', exampleAr: 'يعايش رواد الفضاء انعدام الجاذبية على متن المختبر المداري.' },
        { phrase: 'search for extraterrestrial life', meaningAr: 'يبحث عن حياة خارج كوكب الأرض', example: 'Radio telescopes search for extraterrestrial life across distant nebulae.', exampleAr: 'تبحث التلسكوبات اللاسلكية عن حياة خارج كوكب الأرض عبر السدم البعيدة.' },
        { phrase: 'derive practical spinoffs', meaningAr: 'يستنبط تطبيقات تقنية مشتقة من الفضاء', example: 'Medical diagnostics derive practical spinoffs from satellite imaging sensors.', exampleAr: 'تستنبط التشخيصات الطبية تطبيقات عملية مشتقة من مستشعرات التصوير الفضائي.' }
      ],
      exercises: [
        { id: 's3_u3_q1', skill: 'Grammar', question: 'As soon as the ground engineers __________ the fuel pressure, the rocket will be launched into space.', options: ['check', 'will check', 'checked', 'are checking'], correctAnswer: 'A', explanation: 'Time clause rule: "As soon as / When / After + Present Simple / Present Perfect", the main clause takes the Future (will be launched).' },
        { id: 's3_u3_q2', skill: 'Grammar', question: 'Tomorrow at this exact time, the rover __________ through the red Martian dust.', options: ['will be driving', 'will have driven', 'drove', 'is driving'], correctAnswer: 'A', explanation: 'Future Continuous (will be + V-ing) denotes an ongoing event at a specific future moment ("tomorrow at this exact time").' },
        { id: 's3_u3_q3', skill: 'Vocabulary', question: 'A commercial product or everyday technology derived from space exploration research is termed a:', options: ['Spinoff', 'Telescope', 'Caterpillar', 'Pesticide'], correctAnswer: 'A', explanation: 'A spinoff (تطبيق مشتق) is a commercial technology derived from space research.' }
      ]
    },
    grammarModule: {
      ruleName: 'Advanced Future Forms & Time Clauses (when, after + Present -> Future)',
      ruleNameAr: 'صيغ المستقبل المتقدمة والروابط الزمنية (المضارع البسيط والتام بعد أدوات الربط)',
      explanationSummary: 'Mastering the golden rule of time linkers: When, As soon as, After, Before, By the time, Once, Until CANNOT take future tenses (will/shall). They MUST take Present Simple or Present Perfect to link to a future main clause (e.g. "When he arrives / has arrived, we will start"). Also covers Future Continuous vs. Future Perfect.',
      detailedRules: [
        {
          title: 'The Golden Time Clause Rule: NO "WILL" after Time Conjunctions',
          explanation: 'After conjunctions of time (when, after, as soon as, before, by the time, once, till, until) or condition (if, unless, in case), NEVER use "will" or "would". Instead, use: (1) Present Simple OR (2) Present Perfect. The main clause will use: will + inf, be going to, a modal, or an imperative.',
          examples: [
            'Correct Present Simple: As soon as the spacecraft enters orbit, the solar panels will unfold.',
            'Correct Present Perfect: After the engineers have calibrated the lens, the telescope will transmit high-res images.',
            'Fatal Exam Error: ✗ As soon as the spacecraft will enter orbit... (STRICTLY FORBIDDEN)'
          ]
        },
        {
          title: 'Future Continuous (will be + V-ing) in Astronomical Contexts',
          explanation: 'Used for events that will be unfolding continuously at a specific future benchmark or during a future period.',
          examples: [
            'Next month, astronauts will be conducting spacewalks outside the station.',
            'This time tomorrow, the satellite will be passing over Cairo.'
          ]
        },
        {
          title: 'Future Perfect (will have + P.P.) with Deadlines',
          explanation: 'Used when an achievement will be concluded prior to a designated future milestone ("by 2040", "by the time + Present Simple").',
          examples: [
            'By 2040, humans will have established an automated habitat on the Moon.',
            'By the time the probe reaches Jupiter, scientists will have synthesized new lightweight solar sails.'
          ]
        }
      ],
      exercises: [
        { id: 's3_u3_g1', skill: 'Grammar', question: 'We cannot launch the weather satellite until the meteorological team __________ optimal atmospheric stability.', options: ['confirms', 'will confirm', 'confirmed', 'is confirming'], correctAnswer: 'A', explanation: 'After "until" in future contexts, use Present Simple (confirms) or Present Perfect (has confirmed).' },
        { id: 's3_u3_g2', skill: 'Grammar', question: 'By the time the spaceship reaches Mars in eight months, the crew __________ hundreds of biological experiments.', options: ['will have completed', 'will be completing', 'completed', 'completes'], correctAnswer: 'A', explanation: 'Structure: "By the time + Present Simple..., Future Perfect (will have completed)".' },
        { id: 's3_u3_g3', skill: 'Grammar', question: 'At 10 PM tonight, the observatory team __________ the lunar eclipse through the main telescope.', options: ['will be observing', 'will have observed', 'observed', 'observes'], correctAnswer: 'A', explanation: 'Specific future point in time ("At 10 PM tonight") requires Future Continuous.' }
      ]
    },
    readingModule: { passageTitle: 'Reading Module', passage: '', questions: [] },
    listeningModule: { audioTitle: 'Listening Module', speakerRoles: '', transcript: '' },
    unitExam: { examId: 's3_u3_exam', examTitle: 'Unit 3 Standard Exam', durationMinutes: 30, totalMarks: 30, questions: [] }
  },

  // Unit 4: Taking Care of Ourselves (Mental Health & Well-being)
  {
    stage: 'Secondary',
    grade: 12,
    gradeLabel: 'Secondary 3 - الصف الثالث الثانوي (الثانوية العامة)',
    track: 'General Secondary',
    secondaryPath: 'general_secondary',
    semester: 1,
    unitNumber: 4,
    unitTitle: 'Taking Care of Ourselves: Mental Health & Well-being',
    unitTitleAr: 'الاعتناء بأنفسنا: الصحة النفسية، التوازن الحياتي، وتجنب الاحتراق الوظيفي',
    theme: 'Burnout Prevention, Stress Management, Work-Life Balance & Mindfulness',
    literatureModule: greatExpectationsChapters[2],
    vocabularyModule: {
      keyWords: [
        { word: 'burnout', pos: 'n.', ar: 'الاحتراق النفسي والإنهاك المهني', def: 'A state of physical, emotional, and mental exhaustion caused by excessive and prolonged stress.', ex: 'Continuous overtime without rest leads to chronic workplace burnout.', exAr: 'يؤدي العمل الإضافي المستمر دون راحة إلى الاحتراق النفسي والإنهاك المهني المزمن.' },
        { word: 'well-being', pos: 'n.', ar: 'العافية النفسية والراحة الجسدية', def: 'The state of being comfortable, healthy, or happy.', ex: 'Regular meditation and family time enhance emotional and psychological well-being.', exAr: 'يعزز التأمل المنتظم وقضاء الوقت مع العائلة العافية النفسية والسعادة الوجدانية.' },
        { word: 'cope', pos: 'v.', ar: 'يتأقلم ويتعامل بنجاح مع الضغوط', def: 'To deal effectively with something difficult; manage stress.', ex: 'Deep breathing exercises help high school students cope with pre-exam anxiety.', exAr: 'تساعد تمارين التنفس العميق طلاب الثانوية العامة على التأقلم مع قلق ما قبل الامتحانات.' },
        { word: 'exhaustion', pos: 'n.', ar: 'الإجهاد والإنهاك التام للقوى', def: 'A state of extreme physical or mental fatigue.', ex: 'The doctor collapsed from sheer physical exhaustion after performing four consecutive surgeries.', exAr: 'انهار الطبيب من شدة الإنهاك البدني بعد إجرائه أربع جراحات متتالية.' },
        { word: 'resilience', pos: 'n.', ar: 'الصلابة النفسية والقدرة على التعافي', def: 'The capacity to recover quickly from difficulties; psychological toughness.', ex: 'Emotional resilience enables scholars to bounce back after academic setbacks.', exAr: 'تمكّن الصلابة النفسية الباحثين من التعافي السريع بعد الإخفاقات الأكاديمية.' },
        { word: 'mindfulness', pos: 'n.', ar: 'اليقظة الذهنية والوعي الآني', def: 'A mental state achieved by focusing one’s awareness on the present moment calmly.', ex: 'Practicing mindfulness reduces blood pressure and sharpens cognitive focus.', exAr: 'تقلل ممارسة اليقظة الذهنية ضغط الدم وتزيد من حدة التركيز المعرفي.' },
        { word: 'stressor', pos: 'n.', ar: 'مسبب ومثير الضغط النفسي', def: 'A chemical or biological agent, environmental condition, or stimulus that causes stress.', ex: 'Financial instability and looming deadlines are major modern psychological stressors.', exAr: 'يمثل عدم الاستقرار المالي والمواعيد النهائية الضاغطة أهم مسببات التوتر الحديثة.' },
        { word: 'counseling', pos: 'n.', ar: 'الإرشاد والعلاج النفسي المتخصص', def: 'The provision of professional assistance and guidance in resolving personal or psychological problems.', ex: 'Universities provide confidential psychological counseling services to anxious freshmen.', exAr: 'توفر الجامعات خدمات إرشاد نفسي سرية للطلاب المستجدين الذين يعانون من القلق.' },
        { word: 'fatigue', pos: 'n.', ar: 'الإعياء والتعب المزمن', def: 'Extreme tiredness resulting from mental or physical exertion or illness.', ex: 'Chronic fatigue impairs an executive’s decision-making faculties significantly.', exAr: 'يضعف الإعياء المزمن قدرات اتخاذ القرار لدى المديرين التنفيذيين بشكل ملحوظ.' },
        { word: 'procrastinate', pos: 'v.', ar: 'يسوّف ويؤجل الواجبات عبثاً', def: 'To delay or postpone action; put off doing something needlessly.', ex: 'Unprepared candidates procrastinate instead of revising their biology curriculum.', exAr: 'يسوّف الطلاب غير المستعدين ويؤجلون المذاكرة بدلاً من مراجعة منهج الأحياء.' },
        { word: 'balance', pos: 'n./v.', ar: 'التوازن الحياتي السليم', def: 'An even distribution of weight enabling someone or something to remain steady; work-life equilibrium.', ex: 'Maintaining healthy work-life balance safeguards personal relationships and mental health.', exAr: 'يحمي الحفاظ على التوازن السليم بين العمل والحياة العلاقات الشخصية والصحة النفسية.' },
        { word: 'overwhelmed', pos: 'adj.', ar: 'مثقل بالهموم ومستنزف عاطفياً', def: 'Overcome by superior force or an excessive amount of work or emotion.', ex: 'The young teacher felt utterly overwhelmed by the chaotic classroom workload.', exAr: 'شعر المعلم الشاب بأنه مثقل ومستنزف تماماً تحت وطأة الأعباء الدراسية المرهقة.' },
        { word: 'recharge', pos: 'v.', ar: 'يشحن طاقته وحيويته من جديد', def: 'To restore one’s energy or strength through rest and leisure.', ex: 'A weekend camping retreat in the Sinai mountains allowed the surgeon to recharge.', exAr: 'أتاحت رحلة التخييم في عطلة نهاية الأسبوع بجبال سيناء للجراح شحن طاقته من جديد.' },
        { word: 'self-care', pos: 'n.', ar: 'الرعاية الذاتية والاهتمام بالنفس', def: 'The practice of taking action to preserve or improve one’s own health.', ex: 'Adequate hydration, sleep, and physical exercise are fundamental pillars of self-care.', exAr: 'شرب الماء الكافي والنوم والرياضة هي الركائز الأساسية للعناية الذاتية بالصحة.' },
        { word: 'productivity', pos: 'n.', ar: 'الإنتاجية وكفاءة الأداء', def: 'The effectiveness of productive effort, especially in industry or personal tasks.', ex: 'Taking brief hourly micro-breaks revitalizes mental productivity at work.', exAr: 'أخذ فترات استراحة قصيرة كل ساعة ينعش الإنتاجية الذهنية في العمل.' },
        { word: 'therapy', pos: 'n.', ar: 'العلاج النفسي أو التأهيلي', def: 'Treatment intended to relieve or heal a disorder or emotional trauma.', ex: 'Cognitive behavioral therapy equips individuals with positive coping mechanisms.', exAr: 'يزود العلاج السلوكي المعرفي الأفراد بآليات تأقلم وتكيف إيجابية مع المشكلات.' },
        { word: 'anxiety', pos: 'n.', ar: 'القلق والتوتر العصبي', def: 'A feeling of worry, nervousness, or unease about something with an uncertain outcome.', ex: 'Controlled aerobic exercise alleviates panic disorders and general anxiety.', exAr: 'تخفف التمارين الهوائية المنتظمة من نوبات الهلع والقلق العصبي العام.' },
        { word: 'isolate', pos: 'v.', ar: 'يعزل نفسه ويبتعد عن الناس', def: 'To cause a person to remain alone or apart from others.', ex: 'Depressed individuals often isolate themselves from supportive friends and family.', exAr: 'غالباً ما يعزل الأفراد المكتئبون أنفسهم عن أصدقائهم وعائلاتهم الداعمة.' },
        { word: 'leisure', pos: 'n.', ar: 'وقت الفراغ والاسترخاء', def: 'Free time spent away from work or domestic duties for enjoyment.', ex: 'Engaging in creative hobbies during leisure hours stimulates positive endorphins.', exAr: 'ممارسة الهوايات الإبداعية في أوقات الفراغ تحفز إفراز هرمونات السعادة الإندورفين.' },
        { word: 'unwind', pos: 'v.', ar: 'يسترخي ويزيل التوتر', def: 'To relax after a period of work or tension.', ex: 'Listening to classical Arabic music helps the tired lawyer unwind at night.', exAr: 'يساعد الاستماع إلى الموسيقى الكلاسيكية العربية المحامي المرهق على الاسترخاء ليلاً.' }
      ],
      collocations: [
        { phrase: 'suffer from chronic burnout', meaningAr: 'يعاني من الاحتراق النفسي المزمن', example: 'Healthcare workers may suffer from chronic burnout during epidemics.', exampleAr: 'قد يعاني العاملون في الرعاية الصحية من الاحتراق النفسي المزمن خلال الأوبئة.' },
        { phrase: 'cope with stressful situations', meaningAr: 'يتأقلم ويتعامل مع المواقف الضاغطة', example: 'Mindfulness training helps managers cope with stressful situations calmly.', exampleAr: 'يساعد تدريب اليقظة الذهنية المديرين على التعامل مع المواقف الضاغطة بهدوء.' },
        { phrase: 'maintain work-life balance', meaningAr: 'يحافظ على التوازن بين العمل والحياة', example: 'To avoid exhaustion, you must maintain work-life balance strictly.', exampleAr: 'لتجنب الإرهاق، يجب عليك الحفاظ على التوازن بين العمل والحياة الشخصية بصرامة.' },
        { phrase: 'recharge mental batteries', meaningAr: 'يشحن طاقته وقواه الذهنية', example: 'A peaceful nature walk allows thinkers to recharge mental batteries.', exampleAr: 'المشي في أحضان الطبيعة الهادئة يتيح للمفكرين شحن طاقاتهم الذهنية.' },
        { phrase: 'alleviate severe anxiety', meaningAr: 'يخفف من حدة القلق والتوتر العصبي', example: 'Proper physical exercise alleviates severe anxiety naturally.', exampleAr: 'تساعد التمارين البدنية السليمة على تخفيف القلق الحاد والتوتر بشكل طبيعي.' }
      ],
      exercises: [
        { id: 's3_u4_q1', skill: 'Grammar', question: 'Omar looks pale and exhausted; he __________ working non-stop without sleep for twenty-four hours.', options: ['must have been', 'can’t have been', 'might not have been', 'should have been'], correctAnswer: 'A', explanation: 'Strong logical deduction in the past based on obvious present evidence (pale and exhausted) requires "must have been".' },
        { id: 's3_u4_q2', skill: 'Grammar', question: 'The report was submitted on time, so Hazem __________ stayed up all night worrying about the deadline.', options: ['needn’t have', 'mustn’t have', 'can’t have', 'shouldn’t'], correctAnswer: 'A', explanation: '"Needn’t have + P.P." means he did stay up and worry, but it was completely unnecessary in hindsight.' },
        { id: 's3_u4_q3', skill: 'Vocabulary', question: 'Severe physical, mental, and emotional collapse resulting from chronic unmanaged workplace stress is termed:', options: ['Burnout', 'Astronomy', 'Piracy', 'Cuisine'], correctAnswer: 'A', explanation: 'Burnout (الاحتراق النفسي والمهني) is physical and emotional exhaustion from unmanaged stress.' }
      ]
    },
    grammarModule: {
      ruleName: 'Modals of Deduction in Present & Past (must have, can’t have, might have)',
      ruleNameAr: 'أفعال الاستنتاج والترجيح في الحاضر والماضي (must have, can’t have, might have + P.P.)',
      explanationSummary: 'Differentiating certain positive deduction (must / must have + P.P.), certain negative deduction (can’t / can’t have + P.P.), and uncertain possibility (might / could / might have + P.P.). Note: "mustn’t have" is NEVER used for deduction!',
      detailedRules: [
        {
          title: 'Certain Affirmative Deduction: Must / Must have + P.P. (100% Certain YES)',
          explanation: 'Present: "must + inf" ("He has worked 16 hours; he must be exhausted"). Past: "must have + P.P." ("He scored 100%; the exam must have been easy for him"). Trigger: obvious evidence, sure, certain.',
          examples: [
            'Present deduction: The lights are on and music is playing; they must be inside the house.',
            'Past deduction: Tarek’s lab coat is covered in chemical stains; he must have conducted the experiment himself.'
          ]
        },
        {
          title: 'Certain Negative Deduction: Can’t / Can’t have + P.P. (100% Certain NO)',
          explanation: 'Present: "can’t / couldn’t + inf" ("He can’t be a doctor; he has never studied biology"). Past: "can’t have / couldn’t have + P.P." ("She can’t have stolen the file; she was hospitalized in Aswan that entire day"). Remember: "Mustn’t have" is NEVER a deduction!',
          examples: [
            'Present impossibility: He can’t be thirty; he looks barely nineteen!',
            'Past impossibility: The thief can’t have entered through the locked window; the glass is completely intact.'
          ]
        },
        {
          title: 'Uncertain Possibility: Might / May / Could have + P.P. (50% Maybe)',
          explanation: 'Used when the speaker is not sure: "might / may have + P.P." ("Perhaps he forgot his keys"). "Could have + P.P." can also mean an action was possible, but was not chosen ("I could have taken the train, but I preferred to drive").',
          examples: [
            'Uncertainty: I am not sure where Salma is; she might have gone to the psychological counseling clinic.',
            'Unused opportunity: You could have consulted Dr. Magdi before buying that pill, but you didn’t.'
          ]
        }
      ],
      exercises: [
        { id: 's3_u4_g1', skill: 'Grammar', question: 'The front door was bolted from the inside, so the intruder __________ entered through the balcony.', options: ['must have', 'can’t have', 'should have', 'mustn’t have'], correctAnswer: 'A', explanation: 'Since the door was bolted from inside, logical affirmative deduction requires "must have".' },
        { id: 's3_u4_g2', skill: 'Grammar', question: 'Mona __________ attended the medical conference in Cairo yesterday because I saw her lecturing in Alexandria at that exact hour.', options: ['can’t have', 'must have', 'should have', 'might have'], correctAnswer: 'A', explanation: 'Conclusive negative proof (she was seen in Alexandria) makes it impossible: "can’t have attended".' },
        { id: 's3_u4_g3', skill: 'Grammar', question: 'I don’t know where my medical textbook is; I __________ left it on the study desk in the faculty library.', options: ['might have', 'must have', 'can’t have', 'should have'], correctAnswer: 'A', explanation: '"I don’t know" signals uncertainty and possibility: "might have left".' }
      ]
    },
    readingModule: { passageTitle: 'Reading Module', passage: '', questions: [] },
    listeningModule: { audioTitle: 'Listening Module', speakerRoles: '', transcript: '' },
    unitExam: { examId: 's3_u4_exam', examTitle: 'Unit 4 Standard Exam', durationMinutes: 30, totalMarks: 30, questions: [] }
  },

  // Unit 5: The Future of Work
  {
    stage: 'Secondary',
    grade: 12,
    gradeLabel: 'Secondary 3 - الصف الثالث الثانوي (الثانوية العامة)',
    track: 'General Secondary',
    secondaryPath: 'general_secondary',
    semester: 1,
    unitNumber: 5,
    unitTitle: 'The Future of Work: AI, Freelancing & Hybrid Careers',
    unitTitleAr: 'مستقبل العمل: الذكاء الاصطناعي، العمل الحر، والوظائف الهجينة',
    theme: 'Artificial Intelligence, Remote Employment, Soft Skills & Lifelong Reskilling',
    literatureModule: greatExpectationsChapters[2],
    vocabularyModule: {
      keyWords: [
        { word: 'freelance', pos: 'adj./v.', ar: 'العمل الحر المستقل', def: 'Working for different companies at different times rather than being permanently employed by one.', ex: 'Many graphic designers and software developers prefer flexible freelance contracts.', exAr: 'يفضل العديد من مصممي الجرافيك ومطوري البرمجيات عقود العمل الحر المرنة.' },
        { word: 'hybrid', pos: 'adj.', ar: 'هجين (يجمع بين العمل المكتبي وعن بعد)', def: 'Combining two different elements; hybrid work mixes in-office days with remote work.', ex: 'A hybrid work schedule grants employees two remote days per week.', exAr: 'يمنح جدول العمل الهجين الموظفين يومين من العمل عن بعد أسبوعياً.' },
        { word: 'artificial intelligence', pos: 'n.', ar: 'الذكاء الاصطناعي التوليدي والآلي', def: 'The theory and development of computer systems able to perform tasks normally requiring human intelligence.', ex: 'Generative artificial intelligence automates routine code refactoring and data entry.', exAr: 'يعمل الذكاء الاصطناعي التوليدي على أتمتة إعادة هيكلة الأكواد وإدخال البيانات الروتينية.' },
        { word: 'reskill', pos: 'v.', ar: 'يعيد تأهيل وتدريب الموظفين لمهارات جديدة', def: 'To teach someone new skills so that they can do a different job.', ex: 'Corporations must reskill manufacturing workers to operate complex robotic machinery.', exAr: 'يجب على الشركات إعادة تأهيل وتدريب عمال المصانع لتشغيل الآلات الروبوتية المعقدة.' },
        { word: 'remote', pos: 'adj.', ar: 'العمل عن بُعد من المنزل', def: 'Operating or situated away from the primary workplace; working from home.', ex: 'High-speed fiber internet enabled millions to transition smoothly to remote employment.', exAr: 'مكّنت شبكات الألياف الضوئية عالية السرعة الملايين من التحول بسلاسة نحو العمل عن بعد.' },
        { word: 'automation', pos: 'n.', ar: 'الميكنة والتشغيل الآلي الذاتي', def: 'The use of largely automatic equipment in a system of manufacturing or work.', ex: 'Industrial automation accelerates factory assembly while reducing occupational hazards.', exAr: 'تسرع الأتمتة الصناعية من عمليات التجميع في المصانع وتقلل من مخاطر بيئة العمل.' },
        { word: 'gig economy', pos: 'n.', ar: 'اقتصاد الأعمال المؤقتة والمستقلة', def: 'A labor market characterized by the prevalence of short-term contracts or freelance work.', ex: 'Ride-sharing apps and delivery platforms are prominent drivers of the modern gig economy.', exAr: 'تعتبر تطبيقات النقل الذكي وتوصيل الطلبات من أبرز محركات اقتصاد الأعمال المؤقتة الحديث.' },
        { word: 'upskill', pos: 'v.', ar: 'يطور ويرفع كفاءة المهارات الحالية', def: 'To teach an employee additional skills to perform their current role more effectively.', ex: 'Employees should upskill constantly in digital analytics to stay competitive.', exAr: 'ينبغي على الموظفين رفع كفاءة مهاراتهم في التحليل الرقمي باستمرار للحفاظ على تنافسيتهم.' },
        { word: 'adaptability', pos: 'n.', ar: 'المرونة والقدرة على التكيف مع المتغيرات', def: 'The quality of being able to adjust to new conditions and technologies.', ex: 'Adaptability is ranked among the top three soft skills demanded by international employers.', exAr: 'تأتي المرونة والتكيف على رأس أهم ثلاث مهارات شخصية يطلبها أصحاب الأعمال الدوليون.' },
        { word: 'soft skills', pos: 'n.', ar: 'المهارات الشخصية والقيادية والاجتماعية', def: 'Personal attributes that enable someone to interact effectively and harmoniously with other people.', ex: 'Communication, empathy, and active listening are indispensable soft skills in leadership.', exAr: 'التواصل والتعاطف والاستماع الفعال مهارات شخصية واجتماعية لا غنى عنها في القيادة.' },
        { word: 'telecommute', pos: 'v.', ar: 'يعمل من المنزل عبر الاتصال الرقمي', def: 'To work from home, making use of the internet, email, and telephone.', ex: 'Software architects telecommute across multiple time zones seamlessly.', exAr: 'يعمل مهندسو البرمجيات من منازلهم عبر مناطق زمنية متعددة بكل سلاسة.' },
        { word: 'colleague', pos: 'n.', ar: 'زميل العمل أو المهنة', def: 'A person with whom one works in a profession or business.', ex: 'Collaborating respectfully with diverse colleagues drives innovative problem-solving.', exAr: 'يعزز التعاون المحترم مع زملاء العمل المتنوعين من حل المشكلات بطرق مبتكرة.' },
        { word: 'obsolete', pos: 'adj.', ar: 'مهجور وعفا عليه الزمن', def: 'No longer produced or used; out of date.', ex: 'Manual typewriters and paper filing systems have become completely obsolete.', exAr: 'أصبحت الآلات الكاتبة اليدوية وأنظمة الحفظ الورقية من المخلفات التي عفا عليها الزمن.' },
        { word: 'algorithmic', pos: 'adj.', ar: 'خوارزمي وحسابي برمجي', def: 'Relating to or using a set of computational rules to be followed in calculations.', ex: 'Algorithmic hiring tools screen thousands of candidate resumes in seconds.', exAr: 'تفحص أدوات التوظيف الخوارزمية آلاف السير الذاتية للمرشحين في ثوانٍ معدودة.' },
        { word: 'entrepreneur', pos: 'n.', ar: 'رائد أعمال ومؤسس مشروعات ناشئة', def: 'A person who sets up a business, taking on financial risks in the hope of profit.', ex: 'The ambitious young entrepreneur launched an agritech smartphone startup in Cairo.', exAr: 'أطلق رائد الأعمال الشاب الطموح شركة ناشئة لتطبيقات الزراعة الذكية في القاهرة.' },
        { word: 'flexibility', pos: 'n.', ar: 'المرونة وسهولة التعديل', def: 'The ability to easily be modified to respond to altered circumstances.', ex: 'Remote contracts offer geographical flexibility, letting staff live outside major cities.', exAr: 'توفر عقود العمل عن بعد مرونة جغرافية تتيح للموظفين العيش بعيداً عن صخب العواصم.' },
        { word: 'contractor', pos: 'n.', ar: 'مقاول أو متعهد مستقل بعقد محدد', def: 'A person or firm that undertakes a contract to provide materials or perform for a job.', ex: 'The multinational firm hired an independent cybersecurity contractor to audit servers.', exAr: 'عينت الشركة متعددة الجنسيات خبيراً متعهداً مستقلاً في الأمن السيبراني لمراجعة الخوادم.' },
        { word: 'redundant', pos: 'adj.', ar: 'فائض عن حاجة العمل ومستغنى عنه', def: 'No longer needed or useful; laid off because a job no longer exists.', ex: 'Automating the sorting facility made twenty manual conveyor jobs redundant.', exAr: 'أدت أتمتة منشأة الفرز إلى الاستغناء عن عشرين عاملاً يدوياً لعدم الحاجة لمهامهم.' },
        { word: 'vocational', pos: 'adj.', ar: 'مهني وحرفي تطبيقي', def: 'Relating to an occupation or employment; directed towards practical trade training.', ex: 'Dual vocational technology schools equip Egyptian teenagers with advanced technical crafts.', exAr: 'تزود مدارس التكنولوجيا التطبيقية المهنية المزدوجة الشباب المصري بحرف تقنية متقدمة.' },
        { word: 'workforce', pos: 'n.', ar: 'القوى العاملة وسوق العمل', def: 'The people engaged in or available for work, either in a country, area, or company.', ex: 'Investing in technological education empowers the national youth workforce.', exAr: 'يسهم الاستثمار في التعليم التكنولوجي في تمكين القوى العاملة الشابة في الدولة.' }
      ],
      collocations: [
        { phrase: 'reskill the workforce', meaningAr: 'يعيد تأهيل وتدريب القوى العاملة', example: 'Governments invest in AI academies to reskill the workforce.', exampleAr: 'تستثمر الحكومات في أكاديميات الذكاء الاصطناعي لإعادة تأهيل القوى العاملة.' },
        { phrase: 'adopt a hybrid model', meaningAr: 'يتبنى نموذج العمل الهجين', example: 'Modern tech enterprises adopt a hybrid model to retain top talent.', exampleAr: 'تتبنى شركات التقنية الحديثة نموذج العمل الهجين للحفاظ على أفضل الكفاءات.' },
        { phrase: 'make jobs redundant', meaningAr: 'يجعل الوظائف زائدة عن الحاجة ويستغني عنها', example: 'Robotic automation may make repetitive manual jobs redundant.', exampleAr: 'قد تؤدي الأتمتة الروبوتية إلى الاستغناء عن الوظائف اليدوية المتكررة.' },
        { phrase: 'pursue freelance opportunities', meaningAr: 'يسعى وراء فرص العمل الحر المستقل', example: 'Skilled translators pursue freelance opportunities on digital platforms.', exampleAr: 'يسعى المترجمون المهرة وراء فرص العمل الحر عبر المنصات الرقمية العالمية.' },
        { phrase: 'develop essential soft skills', meaningAr: 'يطور المهارات الشخصية والاجتماعية الأساسية', example: 'University students must develop essential soft skills alongside engineering.', exampleAr: 'يجب على طلاب الجامعات تطوير المهارات الشخصية الأساسية جنباً إلى جنب مع دراسة الهندسة.' }
      ],
      exercises: [
        { id: 's3_u5_q1', skill: 'Grammar', question: 'The business manager had to __________ the meeting until Friday because three key board members were traveling.', options: ['put off', 'put on', 'put out', 'put up'], correctAnswer: 'A', explanation: 'The separable phrasal verb "put off" means to postpone or delay an event.' },
        { id: 's3_u5_q2', skill: 'Grammar', question: 'When you arrive at the corporate office for your job interview, please __________ your mobile phone.', options: ['turn off', 'turn in', 'turn over', 'turn to'], correctAnswer: 'A', explanation: '"Turn off" means to deactivate an electronic device.' },
        { id: 's3_u5_q3', skill: 'Vocabulary', question: 'Working independently for multiple clients on short-term projects instead of a single employer is called:', options: ['Freelancing', 'Automation', 'Redundancy', 'Censorship'], correctAnswer: 'A', explanation: 'Freelancing (العمل الحر المستقل) involves independent contract work for various clients.' }
      ]
    },
    grammarModule: {
      ruleName: 'Phrasal Verbs (Separable vs. Inseparable & Transitive vs. Intransitive)',
      ruleNameAr: 'الأفعال الاصطلاحية (المركبة مع حروف الجر: القابلة للفصل وغير القابلة للفصل)',
      explanationSummary: 'Mastering verb + particle combinations: (1) Transitive Separable verbs (can split noun object, MUST split pronoun object: "turn it off" NOT "turn off it"); (2) Transitive Inseparable verbs (preposition stays welded to verb: "look after him"); (3) Three-word phrasal verbs (always inseparable: "look forward to", "run out of"); and (4) Intransitive verbs with no object.',
      detailedRules: [
        {
          title: 'Separable Phrasal Verbs (The Pronoun In-the-Middle Rule)',
          explanation: 'With separable verbs (turn off, pick up, put away, fill in, throw away, give up): If the object is a noun, it can go after the particle OR in the middle ("turn off the light" OR "turn the light off"). BUT if the object is a pronoun (it, him, her, them), it MUST GO IN THE MIDDLE ("turn it off"). Fatal error: ✗ turn off it.',
          examples: [
            'Noun object: Please turn off the laptop. / Please turn the laptop off.',
            'Pronoun object: Here is your laptop; please turn it off immediately. (Never: turn off it)',
            'Common separable verbs: pick up, give up, put off (postpone), call off (cancel), fill out.'
          ]
        },
        {
          title: 'Inseparable Phrasal Verbs (Preposition Welded to Verb)',
          explanation: 'The object (whether noun or pronoun) must ALWAYS follow the particle: look after, come across, run into, care for. You CANNOT split them (✗ look him after is impossible; it must be "look after him").',
          examples: [
            'Noun: The nurse looked after the elderly patient diligently.',
            'Pronoun: The nurse looked after him diligently. (Never: looked him after)'
          ]
        },
        {
          title: 'Three-Word Phrasal Verbs (Verb + Adverb + Preposition)',
          explanation: 'These take two particles and are ALWAYS inseparable: look forward to, run out of, catch up with, put up with, cut down on. Pronouns and nouns always follow at the end.',
          examples: [
            'We ran out of printer ink during the night shift. / We ran out of it.',
            'I look forward to meeting the new remote engineering colleagues.'
          ]
        }
      ],
      exercises: [
        { id: 's3_u5_g1', skill: 'Grammar', question: 'Your new wireless headphones are very loud; could you please __________?', options: ['turn them down', 'turn down them', 'turn down it', 'turn it down'], correctAnswer: 'A', explanation: 'Headphones is plural ("them"), and pronouns MUST go in the middle of separable phrasal verbs: "turn them down".' },
        { id: 's3_u5_g2', skill: 'Grammar', question: 'While researching artificial intelligence online, Dr. Tarek __________ an extraordinary open-source robotics paper.', options: ['came across', 'came across it', 'came it across', 'came over'], correctAnswer: 'A', explanation: '"Come across" (to find by chance) is an inseparable phrasal verb followed directly by the noun.' },
        { id: 's3_u5_g3', skill: 'Grammar', question: 'I cannot __________ this endless noise from the construction site any longer; I cannot concentrate on my remote work.', options: ['put up with', 'put up', 'put down to', 'put off with'], correctAnswer: 'A', explanation: 'The 3-word inseparable phrasal verb "put up with" means to tolerate or endure.' }
      ]
    },
    readingModule: { passageTitle: 'Reading Module', passage: '', questions: [] },
    listeningModule: { audioTitle: 'Listening Module', speakerRoles: '', transcript: '' },
    unitExam: { examId: 's3_u5_exam', examTitle: 'Unit 5 Standard Exam', durationMinutes: 30, totalMarks: 30, questions: [] }
  },

  // Unit 6: Ambition & Success
  {
    stage: 'Secondary',
    grade: 12,
    gradeLabel: 'Secondary 3 - الصف الثالث الثانوي (الثانوية العامة)',
    track: 'General Secondary',
    secondaryPath: 'general_secondary',
    semester: 1,
    unitNumber: 6,
    unitTitle: 'Ambition, True Success & Personal Mastery',
    unitTitleAr: 'الطموح والنجاح الحقيقي والإتقان الشخصي (Let’s Get It Done)',
    theme: 'Moral Integrity vs. Shallow Vanity, Time Management, Causative Agency & Dickensian Virtue',
    literatureModule: greatExpectationsChapters[2],
    vocabularyModule: {
      keyWords: [
        { word: 'ambition', pos: 'n.', ar: 'الطموح المشروع والرغبة في النجاح', def: 'A strong desire to do or to achieve something, typically requiring determination and hard work.', ex: 'Pip harbored an intense youthful ambition to transcend his humble blacksmith origins.', exAr: 'راود بيب طموح جارف في شبابه لتجاوز أصوله المتواضعة في ورشة الحدادة.' },
        { word: 'gentleman', pos: 'n.', ar: 'رجل نبيل رفيع الأخلاق والمقام', def: 'A chivalrous, courteous, or honorable man; in Victorian times, a man of high social standing who did not work with his hands.', ex: 'Joe Gargery proved that a true gentleman is defined by moral integrity, not expensive clothes.', exAr: 'أثبت جو جارجري أن النبيل الحقيقي يُعرف بنزاهته الأخلاقية لا بثيابه الفاخرة.' },
        { word: 'integrity', pos: 'n.', ar: 'النزاهة والاستقامة الأخلاقية', def: 'The quality of being honest and having strong moral principles; moral uprightness.', ex: 'Academic integrity requires citing every intellectual reference honestly.', exAr: 'تتطلب النزاهة الأكاديمية توثيق كل مرجع فكري بأمانة وإخلاص.' },
        { word: 'snobbery', pos: 'n.', ar: 'التعالي والغرور الطبقي الأجوف', def: 'The behavior or attitude of people who think they are better than other people.', ex: 'Pip felt deep shame after indulging in shallow snobbery toward his true friend Joe.', exAr: 'شعر بيب بالخزي الشديد بعدما انساق وراء التعالي والغرور الطبقي الأجوف ضد صديقه الوفي جو.' },
        { word: 'benefactor', pos: 'n.', ar: 'ولي النعمة والمحسن المالي السري', def: 'A person who gives money or other help to a person or cause.', ex: 'Pip mistakenly assumed Miss Havisham was his secret aristocratic benefactor.', exAr: 'ظن بيب خطأً أن الآنسة هافيشام هي ولي نعمته الثري والغامض.' },
        { word: 'reputation', pos: 'n.', ar: 'السمعة والمكانة بين الناس', def: 'The beliefs or opinions that are generally held about someone or something.', ex: 'A pristine professional reputation is earned through decades of honest dedication.', exAr: 'تُكتسب السمعة المهنية الناصعة عبر عقود من الإخلاص والعمل الدؤوب.' },
        { word: 'wealth', pos: 'n.', ar: 'الثروة والوفرة المالية', def: 'An abundance of valuable possessions or money.', ex: 'Dickens demonstrates that material wealth without love leads to spiritual decay.', exAr: 'يوضح ديكنز أن الثروة المادية الخالية من المحبة تقود إلى الخواء والدمار الروحي.' },
        { word: 'status', pos: 'n.', ar: 'المكانة والمنزلة الاجتماعية', def: 'The relative social, professional, or other standing of someone or something.', ex: 'Obsession with social status blinded young Pip to the golden heart of Joe.', exAr: 'أعمى الهوس بالمكانة الاجتماعية بيب الصغير عن طيبة قلب جو الذهبي.' },
        { word: 'gratitude', pos: 'n.', ar: 'الامتنان والشكر وعرفان الجميل', def: 'The quality of being thankful; readiness to show appreciation for and to return kindness.', ex: 'True maturity lies in expressing humble gratitude toward those who supported your journey.', exAr: 'يكمن النضج الحقيقي في التعبير عن الامتنان الصادق لمن ساندوك في مسيرتك.' },
        { word: 'vanity', pos: 'n.', ar: 'الغرور والزهو الباطل بالنفس', def: 'Excessive pride in or admiration of one’s own appearance or achievements.', ex: 'Miss Havisham allowed vengeful vanity to wither her soul inside Satis House.', exAr: 'سمحت الآنسة هافيشام للغرور الانتقامي بإذبال روحها داخل قصر ساتيس.' },
        { word: 'humility', pos: 'n.', ar: 'التواضع ونكران الذات', def: 'A modest or low view of one’s own importance; lack of arrogance.', ex: 'Genuine intellectual greatness is always accompanied by quiet humility.', exAr: 'يقترن التفوق الفكري الحقيقي دائماً بالتواضع الجم والهدوء.' },
        { word: 'apprentice', pos: 'n.', ar: 'صبي يتعلم المهنة تحت يد معلم', def: 'A person who is learning a trade from a skilled employer, having agreed to work for a fixed period at low wages.', ex: 'Pip was legally bound as an apprentice blacksmith at Joe’s forge.', exAr: 'تم تقييد بيب قانونياً كصبي يتعلم حرفة الحدادة في ورشة جو.' },
        { word: 'destiny', pos: 'n.', ar: 'القدر والمصير المحتوم', def: 'The events that will necessarily happen to a particular person or thing in the future.', ex: 'Character is destiny; our ethical choices shape our ultimate path in life.', exAr: 'الأخلاق هي المصير؛ فاختياراتنا الأخلاقية هي التي تصنع مسار حياتنا النهائي.' },
        { word: 'fortune', pos: 'n.', ar: 'الثروة الضخمة أو الحظ العاثر', def: 'A large amount of money or assets; chance or luck as an external force.', ex: 'Inheriting an unexpected fortune tested Pip’s loyalty and moral character.', exAr: 'اختبرت وراثة ثروة طائلة مفاجئة مدى وفاء بيب وصلابة معدنه الأخلاقي.' },
        { word: 'guilt', pos: 'n.', ar: 'تأنيب الضمير والشعور بالذنب', def: 'The fact of having committed a specified or implied offense or crime; a feeling of remorse.', ex: 'Pip was haunted by guilt after treating simple, loving Joe with cold condescension.', exAr: 'طارد بيب تأنيب ضمير حاد بعدما عامل جو الطيب البسيط بتعالٍ وبرود.' },
        { word: 'repentance', pos: 'n.', ar: 'التوبة والندم الصادق على الخطأ', def: 'The action of repenting; sincere regret or remorse for past wrongdoing.', ex: 'Through suffering and repentance, Pip rediscovered his authentic moral compass.', exAr: 'استعاد بيب بوصلته الأخلاقية الأصيلة من خلال المعاناة والندم والتوبة الصادقة.' },
        { word: 'chivalry', pos: 'n.', ar: 'الشهامة والمروءة وحسن الخلق', def: 'Courteous behavior, especially that of a man towards others.', ex: 'The condemned convict Magwitch demonstrated true chivalry by exculpating Pip.', exAr: 'أظهر السجين المحكوم عليه ماجويتش مروءة وفروسية حقيقية حين برّأ ساحة بيب.' },
        { word: 'redemption', pos: 'n.', ar: 'الخلاص والتطهر من الإثم', def: 'The action of saving or being saved from sin, error, or evil.', ex: 'Nursing Magwitch with loving tenderness in the prison infirmary was Pip’s redemption.', exAr: 'كانت رعاية بيب لماجويتش بحنان في مستشفى السجن بمثابة خلاصه وتطهره الأخلاقي.' },
        { word: 'deceive', pos: 'v.', ar: 'يخدع ويضلل الآخرين', def: 'To cause someone to believe something that is not true, typically in order to gain some personal advantage.', ex: 'Compeyson used his gentlemanly manners to deceive court juries and business partners.', exAr: 'استغل كومبيسون مظهره كنبيل مخادع لتضليل هيئات المحلفين وشركائه التجاريين.' },
        { word: 'substance', pos: 'n.', ar: 'الجوهر الحقيقي والعمق الإنساني', def: 'The real physical matter of which a person or thing consists and which has a tangible, solid presence.', ex: 'Dickens urges readers to value internal moral substance over superficial social varnish.', exAr: 'يحث ديكنز القراء على تقدير الجوهر الأخلاقي الداخلي بدلاً من البريق الاجتماعي الزائف.' }
      ],
      collocations: [
        { phrase: 'achieve true success', meaningAr: 'يحقق النجاح الحقيقي المتوازن', example: 'Integrity and kindness are required to achieve true success.', exampleAr: 'النزاهة واللطف مطلوبان لتحقيق النجاح الحقيقي المتوازن.' },
        { phrase: 'transcend humble origins', meaningAr: 'يتجاوز أصوله الاجتماعية البسيطة', example: 'Ambitious scholars work diligently to transcend humble origins.', exampleAr: 'يعمل الطلاب الطموحون بجد لتجاوز أصولهم الاجتماعية البسيطة.' },
        { phrase: 'maintain moral integrity', meaningAr: 'يحافظ على نزاهته واستقامته الأخلاقية', example: 'Joe Gargery refused to compromise his moral integrity for money.', exampleAr: 'رفض جو جارجري التنازل عن نزاهته واستقامته الأخلاقية مقابل المال.' },
        { phrase: 'feel deep gratitude', meaningAr: 'يشعر بامتنان وعرفان عميق بالجميل', example: 'Pip learned to feel deep gratitude toward his selfless guardian Joe.', exampleAr: 'تعلم بيب أن يشعر بامتنان عميق وعرفان بالجميل تجاه كفيله المخلص جو.' },
        { phrase: 'shatter false vanity', meaningAr: 'يحطم الغرور والادعاء الزائف', example: 'Hardships shattered Pip’s false vanity and revealed what truly matters.', exampleAr: 'حطمت الشدائد غرور بيب الزائف وكشفت له ما يهم حقاً في الحياة.' }
      ],
      exercises: [
        { id: 's3_u6_q1', skill: 'Grammar', question: 'Because he was busy studying for Thanaweya Amma, Omar __________ his graduation suit tailored by a master craftsman.', options: ['had', 'made', 'did', 'got to'], correctAnswer: 'A', explanation: 'Causative structure: "had + object (his suit) + P.P. (tailored)".' },
        { id: 's3_u6_q2', skill: 'Grammar', question: 'The professor __________ his assistant to re-check the laboratory data before publication.', options: ['got', 'had', 'made', 'let'], correctAnswer: 'A', explanation: 'Active causative: "got + person + TO + infinitive" ("got his assistant to re-check"). Note that "had" takes a bare infinitive ("had his assistant re-check").' },
        { id: 's3_u6_q3', skill: 'Vocabulary', question: 'A person who secretly provides immense financial support or inheritance to another is called a:', options: ['Benefactor', 'Pioneer', 'Competitor', 'Paparazzi'], correctAnswer: 'A', explanation: 'A benefactor (ولي النعمة والمحسن المالي) donates funds or support generously.' }
      ]
    },
    grammarModule: {
      ruleName: 'Causative Verbs (Have / Get something done & Active Causatives)',
      ruleNameAr: 'الأفعال السببية: المبني للمجهول السببي (Have/Get something done) والسببي المعلوم',
      explanationSummary: 'Mastering causative expressions: (1) Passive Causative: Have / Get + Object + P.P. (arranging for a professional to perform a task: "I had my car repaired"); (2) Active Causative with HAVE: Subject + have + person + BARE INFINITIVE ("The teacher had us write an essay"); and (3) Active Causative with GET: Subject + get + person + TO + INFINITIVE ("I got the plumber to fix the leak"). Also covers: Make/Let + person + bare inf, Force/Allow + person + to + inf.',
      detailedRules: [
        {
          title: 'Passive Causative: HAVE / GET + Object + Past Participle (P.P.)',
          explanation: 'Used when someone does not perform an action personally, but arranges for a specialist, artisan, or service to do it. Structure: Subject + have/get (in any tense) + object + P.P. ("I have my teeth checked twice a year"; "Yesterday she had her hair cut"; "Tomorrow we will get our air-conditioner serviced").',
          examples: [
            'Present Simple: He has his suits cleaned at the dry-cleaner every Saturday.',
            'Past Simple: Pip had his gentlemanly wardrobe tailored in London.',
            'Present Continuous: We are getting our house painted this week.'
          ]
        },
        {
          title: 'Active Causative 1: HAVE + Person + BARE INFINITIVE',
          explanation: 'When you ask, employ, or instruct someone to do something. Formula: Subject + have + person + BARE INFINITIVE (without to).',
          examples: [
            'The engineer had the technician inspect the solar inverter. (NOT: to inspect)',
            'Dr. Hoda had her students summarize the Dickensian novel.'
          ]
        },
        {
          title: 'Active Causative 2: GET + Person + TO + INFINITIVE',
          explanation: 'When you persuade, convince, or hire someone to do something. Formula: Subject + get + person + TO + INFINITIVE.',
          examples: [
            'I finally got my younger brother to tidy his bedroom. (With TO)',
            'The publisher got the author to revise the final chapter before printing.'
          ]
        },
        {
          title: 'Make vs. Let vs. Allow vs. Force',
          explanation: 'Make + person + bare inf ("He made me redo the exam"). Let + person + bare inf ("She let me borrow her car"). Allow / Permit / Force + person + TO + inf ("She allowed me to borrow her car"). Note: In the passive, "make" TAKES TO: "I was made TO redo the exam".',
          examples: [
            'Active: The harsh teacher made Pip stand in the corner for an hour.',
            'Passive: Pip was made TO stand in the corner.'
          ]
        }
      ],
      exercises: [
        { id: 's3_u6_g1', skill: 'Grammar', question: 'I don’t know how to fix my broken smartphone screen, so I will have it __________ at the authorized center.', options: ['repaired', 'repair', 'repairing', 'to repair'], correctAnswer: 'A', explanation: 'Passive causative: "have + object (it) + P.P. (repaired)".' },
        { id: 's3_u6_g2', skill: 'Grammar', question: 'The inspector had the contractor __________ the foundation blueprints immediately.', options: ['show', 'to show', 'showing', 'showed'], correctAnswer: 'A', explanation: 'Active causative with HAVE: "had + person (contractor) + bare infinitive (show)".' },
        { id: 's3_u6_g3', skill: 'Grammar', question: 'During the harsh interrogation, the criminal was made __________ the location of the stolen files.', options: ['to reveal', 'reveal', 'revealing', 'revealed'], correctAnswer: 'A', explanation: 'Passive of "make" requires "to + infinitive": "was made TO reveal".' }
      ]
    },
    readingModule: { passageTitle: 'Reading Module', passage: '', questions: [] },
    listeningModule: { audioTitle: 'Listening Module', speakerRoles: '', transcript: '' },
    unitExam: { examId: 's3_u6_exam', examTitle: 'Unit 6 Standard Exam', durationMinutes: 30, totalMarks: 30, questions: [] }
  }
];

// Combine all secondary units for master resolution
export const allSecondaryGeneralUnits: UnitCurriculum[] = [
  ...fullSecondary1Units,
  ...fullSecondary2Units,
  ...fullSecondary3Units
];
