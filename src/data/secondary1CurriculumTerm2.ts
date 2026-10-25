import { UnitCurriculum, UnitExam } from '../types/curriculum.ts';

// Secondary 1 - Term 2: Units 7 to 12 + Term 2 Final Revision according to Egyptian MOE specifications

// UNIT 7: Health and Safety
export const sec1Unit7: UnitCurriculum = {
  stage: 'Secondary',
  grade: 10,
  gradeLabel: 'Secondary 1 - الصف الأول الثانوي',
  track: 'National / Baccalaureate',
  semester: 2,
  unitNumber: 7,
  unitTitle: 'Health and Safety',
  unitTitleAr: 'الصحة والسلامة (الإسعافات الأولية والنظافة)',
  theme: 'Hygiene, allergen reduction, dust mites, bacteria, first aid CPR, kitchen safety',
  vocabularyModule: {
    keyWords: [
      {
        word: 'hygiene',
        partOfSpeech: 'noun [uncountable]',
        meaningEn: 'Conditions or practices conducive to maintaining health and preventing disease, especially cleanliness.',
        meaningAr: 'النظافة الصحية / قواعد النظافة',
        collocation: 'personal hygiene',
        synonym: 'sanitation / cleanliness',
        antonym: 'filth / contamination',
        exampleSentence: 'Observing strict kitchen hygiene prevents bacterial proliferation on chopping boards.'
      },
      {
        word: 'first aid',
        partOfSpeech: 'noun [uncountable]',
        meaningEn: 'Emergency care or treatment given to an ill or injured person before regular medical aid can be obtained.',
        meaningAr: 'الإسعافات الأولية',
        collocation: 'administer first aid',
        synonym: 'emergency treatment',
        antonym: 'neglect',
        exampleSentence: 'Every secondary school student should be trained to administer basic first aid in emergencies.'
      },
      {
        word: 'allergy',
        partOfSpeech: 'noun [countable/uncountable]',
        meaningEn: 'A damaging immune response by the body to a substance, especially pollen, fur, or particular foods.',
        meaningAr: 'حساسية مفرطة',
        collocation: 'suffer from a severe allergy',
        synonym: 'hypersensitivity',
        antonym: 'immunity / tolerance',
        exampleSentence: 'Dust mites trapped inside unwashed bedding frequently trigger respiratory allergies in children.'
      },
      {
        word: 'CPR',
        partOfSpeech: 'noun [uncountable]',
        meaningEn: 'Cardiopulmonary resuscitation: an emergency procedure consisting of chest compressions often combined with rescue breaths.',
        meaningAr: 'الإنعاش القلبي الرئوي',
        collocation: 'perform CPR',
        synonym: 'cardiac resuscitation',
        antonym: 'inaction',
        exampleSentence: 'The trained lifeguard performed immediate CPR when the swimmer was pulled unconscious from the pool.'
      },
      {
        word: 'bacteria',
        partOfSpeech: 'noun [plural] (singular: bacterium)',
        meaningEn: 'Microscopic single-celled organisms that exist in vast numbers in every environment, some of which cause disease.',
        meaningAr: 'البكتيريا / الجراثيم',
        collocation: 'harmful bacteria',
        synonym: 'microbes / pathogens',
        antonym: 'antiseptic',
        exampleSentence: 'Washing hands with warm soapy water for twenty seconds eliminates pathogenic bacteria.'
      },
      {
        word: 'burn',
        partOfSpeech: 'noun / verb',
        meaningEn: 'An injury caused by exposure to heat, flame, chemicals, electricity, or radiation.',
        meaningAr: 'حرق / يصاب بحرق',
        collocation: 'treat a minor burn',
        synonym: 'scald / injury',
        antonym: 'healing',
        exampleSentence: 'If you suffer a thermal burn, place the affected area under cool running water immediately.'
      }
    ],
    collocations: [
      {
        phrase: 'perform CPR',
        meaningAr: 'يُجري إنعاشاً قلبياً رئوياً',
        example: 'Paramedics performed CPR for ten minutes until the patient regained a pulse.'
      },
      {
        phrase: 'wash hands thoroughly',
        meaningAr: 'يغسل يديه جيداً وبدقة',
        example: 'Surgeons wash hands thoroughly with antiseptic solution before operation.'
      },
      {
        phrase: 'change the bedding',
        meaningAr: 'يُغيّر أغطية الفراش والفرش',
        example: 'Health experts advise changing the bedding weekly to eliminate dust mites.'
      },
      {
        phrase: 'wrap in a clean bandage',
        meaningAr: 'يلف في ضمادة نظيفة ومعقمة',
        example: 'After disinfecting the laceration, wrap it gently in a sterile bandage.'
      }
    ],
    idiomsAndExpressions: [
      {
        idiom: 'safe and sound',
        meaningEn: 'Completely unhurt, unharmed, and secure after danger.',
        meaningAr: 'سالم ومعافى / في أمان تام',
        example: 'The lost desert hikers were returned to their families safe and sound.'
      },
      {
        idiom: 'prevention is better than cure',
        meaningEn: 'It is far wiser and easier to stop a problem from happening than to treat it afterwards.',
        meaningAr: 'الوقاية خير من العلاج',
        example: 'Regular sanitation and vaccine adherence prove that prevention is better than cure.'
      }
    ],
    exercises: [
      {
        id: 'sec1_u7_vocab_q1',
        skill: 'Vocabulary',
        question: 'Maintaining meticulous domestic __________ minimizes the proliferation of disease-carrying microbes.',
        options: ['hygiene', 'poverty', 'arrogance', 'recklessness'],
        correctAnswer: 'A',
        explanation: '"Hygiene" refers to practices conducive to maintaining health and cleanliness.'
      },
      {
        id: 'sec1_u7_vocab_q2',
        skill: 'Vocabulary',
        question: 'When an individual collapses without breathing or pulse, witnesses must immediately perform __________.',
        options: ['hypnosis', 'CPR', 'gymnastics', 'meditation'],
        correctAnswer: 'B',
        explanation: 'Cardiopulmonary Resuscitation (CPR) is the emergency protocol for cardiac arrest.'
      },
      {
        id: 'sec1_u7_vocab_q3',
        skill: 'Vocabulary',
        question: 'Dust mites thriving in unwashed carpets and pillows often provoke an acute __________ reaction in asthmatics.',
        options: ['appetite', 'satisfaction', 'allergic', 'athletic'],
        correctAnswer: 'C',
        explanation: 'Dust mites are common environmental triggers for "allergic" reactions.'
      },
      {
        id: 'sec1_u7_vocab_q4',
        skill: 'Vocabulary',
        question: 'When treating a minor kitchen scald, the medical rule is to place it under cool __________ water.',
        options: ['boiling', 'salty', 'frozen', 'running'],
        correctAnswer: 'D',
        explanation: 'Standard first aid protocol dictates holding a minor thermal burn under cool running water.'
      }
    ]
  },
  grammarModule: {
    ruleName: 'Modals for Advice & Obligation (Should, Must, Have to, Need to, Imperatives)',
    ruleNameAr: 'أفعال النصيحة والإلزام والتحريم والأوامر المباشرة',
    explanationSummary: 'Using should/ought to for advice, must for personal or strong internal obligation, have to for external institutional rules, mustn’t for strict prohibition, and imperative verbs for immediate procedural steps.',
    detailedRules: [
      {
        title: 'Should / Shouldn’t / Ought to: Recommendations & Advice',
        explanation: 'Expresses opinions on what is desirable, beneficial, or wise.',
        examples: [
          'You should wash kitchen surfaces regularly with disinfectant.',
          'Students ought not to skip nutritious breakfast before exams.'
        ]
      },
      {
        title: 'Must vs. Have to vs. Need to: Obligation',
        explanation: 'Must indicates strong personal conviction or formal legal mandates. Have to / Has to indicates external rules imposed by authorities.',
        examples: [
          'I must call the doctor today; my fever has not subsided.',
          'Paramedics have to wear sterile protective gloves during operations.'
        ]
      },
      {
        title: 'Mustn’t vs. Don’t have to: Prohibition vs. Lack of Obligation',
        explanation: 'Mustn’t = strictly forbidden, illegal, or dangerous. Don’t have to / Needn’t = optional, not necessary.',
        examples: [
          'You mustn’t touch live electrical wiring with wet hands (Dangerous!).',
          'Tomorrow is a national holiday, so we don’t have to wake up early.'
        ]
      }
    ],
    exercises: [
      {
        id: 'sec1_u7_gram_q1',
        skill: 'Grammar',
        question: 'You __________ touch that boiling kettle with bare hands; it will cause severe tissue scalds!',
        options: ['mustn’t', 'don’t have to', 'should', 'needn’t'],
        correctAnswer: 'A',
        explanation: '"Mustn’t" expresses strict prohibition against a dangerous action.'
      },
      {
        id: 'sec1_u7_gram_q2',
        skill: 'Grammar',
        question: 'To prevent cross-contamination, cooks __________ use separate chopping boards for raw poultry and vegetables.',
        options: ['might', 'should', 'could', 'mustn’t'],
        correctAnswer: 'B',
        explanation: '"Should" offers recommended hygienic advice to avoid foodborne infections.'
      },
      {
        id: 'sec1_u7_gram_q3',
        skill: 'Grammar',
        question: 'Because the injury was minor and bleeding stopped immediately, the doctor said we __________ visit the clinic.',
        options: ['must', 'should', 'didn’t have to', 'mustn’t'],
        correctAnswer: 'C',
        explanation: '"Didn’t have to" expresses that an action was unnecessary in the past.'
      },
      {
        id: 'sec1_u7_gram_q4',
        skill: 'Grammar',
        question: 'In operating theaters, surgical personnel __________ wear certified sterile gowns at all times.',
        options: ['can', 'might', 'may', 'have to'],
        correctAnswer: 'D',
        explanation: '"Have to" conveys an external institutional mandate and hospital regulation.'
      }
    ]
  },
  readingModule: {
    passageTitle: 'Invisible Inhabitants: The Science of Domestic Hygiene',
    passage: `Human homes, while appearing serene and immaculate, are teeming ecosystems occupied by trillions of microorganisms. While the vast majority of domestic bacteria are innocuous or beneficial, certain micro-habitats within residential dwellings pose genuine health hazards if neglected. Epidemiological investigations reveal that the dampest areas in homes—namely kitchen sponges, bathroom sink aerators, and washing machine seals—harbor greater bacterial concentrations than toilet seats.

A kitchen sponge, continually moist and laden with organic food residues, provides an ideal incubator for pathogens such as Salmonella and E. coli. Slicing raw poultry on a wooden board and subsequently preparing fresh salad with the same unwashed knife is the primary catalyst for domestic food poisoning. Microbiologists recommend replacing sponges weekly or microwaving damp sponges for one minute to destroy bacterial cell walls.

Similarly, bedrooms harbor microscopic arachnids known as dust mites. Feeding on desquamated human skin flakes, dust mites populate mattresses, duvets, and pillows in their millions. While they do not bite, their digestive enzymes and feces become airborne allergens, precipitating nocturnal coughing, chronic rhinitis, and asthma exacerbations. Laundering bed linens at temperatures of sixty degrees Celsius or higher denatures these allergen proteins, transforming our domestic spaces into safe sanctuaries.`,
    criticalThinkingFocus: 'Evaluating pathogen vectors, cross-contamination mechanisms, and evidence-based sanitization in daily life.',
    questions: [
      {
        id: 'sec1_u7_read_q1',
        skill: 'Reading',
        question: 'Why do kitchen sponges frequently harbor more pathogens than toilet bowls according to microbiologists?',
        options: [
          'Because their perpetual moisture and food residues create optimal incubation environments',
          'Because they are manufactured from radioactive synthetic compounds',
          'Because people never add soap or water to them',
          'Because they attract outdoor rodents into the kitchen cupboards'
        ],
        correctAnswer: 'A',
        explanation: 'Paragraph 2 highlights perpetual moisture and organic food residues as ideal incubators.'
      },
      {
        id: 'sec1_u7_read_q2',
        skill: 'Reading',
        question: 'What constitutes the dangerous mechanism of kitchen "cross-contamination" described in the passage?',
        options: [
          'Washing vegetables in sparkling mineral water',
          'Using the same unwashed utensil for raw poultry and subsequent ready-to-eat salad',
          'Cooking meals on electric induction stoves instead of gas stoves',
          'Storing unopened canned beans in the refrigerator'
        ],
        correctAnswer: 'B',
        explanation: 'Paragraph 2 specifies using unwashed knives on both raw meat and fresh salad.'
      },
      {
        id: 'sec1_u7_read_q3',
        skill: 'Reading',
        question: 'How do dust mites impact human health inside residential bedrooms?',
        options: [
          'They sting human eyes and cause temporary blindness',
          'They chew holes through wooden furniture during the day',
          'Their airborne feces and enzymes provoke chronic allergies and asthma symptoms',
          'They absorb human body heat and cause hypothermia'
        ],
        correctAnswer: 'C',
        explanation: 'Paragraph 3 notes their digestive enzymes and feces become airborne allergens provoking asthma.'
      },
      {
        id: 'sec1_u7_read_q4',
        skill: 'Reading',
        question: 'What specific sanitization protocol eradicates dust mite allergens from bedding?',
        options: [
          'Freezing pillows in the refrigerator for ten seconds',
          'Spraying heavy perfume over unwashed mattresses',
          'Ironing blankets without any water vapor',
          'Laundering linens at sixty degrees Celsius or higher to denature protein allergens'
        ],
        correctAnswer: 'D',
        explanation: 'Paragraph 3 specifies washing at 60°C or higher to denature allergen proteins.'
      },
      {
        id: 'sec1_u7_read_q5',
        skill: 'Reading',
        question: 'What fundamental message does the author impart regarding maintaining home health?',
        options: [
          'Evidence-based hygiene practices and proactive sanitation neutralize concealed biological hazards',
          'All household microorganisms can be exterminated using air fresheners',
          'People should eliminate all furniture and live on bare concrete floors',
          'Cleaning homes more than once a year causes immune system collapse'
        ],
        correctAnswer: 'A',
        explanation: 'The conclusion emphasizes that disciplined, evidence-based practices maintain health.'
      }
    ]
  },
  listeningModule: {
    audioTitle: 'First Aid Emergency Hotline: Responding to Choking and Burns',
    speakerRoles: 'Emergency Dispatcher (Nurse Mona) & Panicked Caller (Ramy)',
    transcript: `Dispatcher: Emergency Medical Services, what is your location and emergency?
Caller: Help! My eleven-year-old brother was eating an apple and suddenly started choking! He can’t breathe or speak, and his face is turning blue!
Dispatcher: Stay calm, I will guide you through the Heimlich maneuver right now. Stand behind your brother. Wrap your arms around his waist. Make a fist with one hand and place the thumb side against his abdomen, just above the navel.
Caller: Okay, my arms are in position!
Dispatcher: Now grasp your fist with your other hand and press inward and upward with quick, forceful thrusts. Repeat firmly until the obstruction dislodges.
Caller: It worked! A chunk of apple flew out! He’s coughing and breathing again!
Dispatcher: Excellent job! Keep him sitting upright and give him sips of water. Our paramedic ambulance is still arriving to assess his airways.`,
    durationApprox: '2 mins 10 secs',
    exercises: [
      {
        id: 'sec1_u7_listen_q1',
        skill: 'Listening',
        question: 'What critical clinical signs indicated that the brother was experiencing total airway obstruction?',
        options: [
          'Inability to breathe or speak alongside facial cyanosis (turning blue)',
          'He was laughing loudly and doing push-ups',
          'He was complaining of a sprained ankle',
          'He asked for another bowl of fruit soup'
        ],
        correctAnswer: 'A',
        explanation: 'The caller said: "He can’t breathe or speak, and his face is turning blue!"'
      },
      {
        id: 'sec1_u7_listen_q2',
        skill: 'Listening',
        question: 'Where must the rescuer position their fist when executing the Heimlich maneuver?',
        options: [
          'Directly on the victim’s throat',
          'Just above the navel, pressing inward and upward into the abdomen',
          'On the lower back near the spine',
          'Beneath the kneecaps'
        ],
        correctAnswer: 'B',
        explanation: 'Nurse Mona instructed: "place the thumb side against his abdomen, just above the navel."'
      },
      {
        id: 'sec1_u7_listen_q3',
        skill: 'Listening',
        question: 'What vector direction must the rescuer’s abdominal thrusts follow?',
        options: [
          'Downwards toward the floor',
          'Outwards away from the chest',
          'Inward and upward with quick, forceful motions',
          'Gentle circular rubs on the stomach'
        ],
        correctAnswer: 'C',
        explanation: 'Dispatcher ordered: "press inward and upward with quick, forceful thrusts."'
      },
      {
        id: 'sec1_u7_listen_q4',
        skill: 'Listening',
        question: 'What protocol did the dispatcher maintain even after the apple chunk was dislodged?',
        options: [
          'Telling the caller to cancel all medical assistance permanently',
          'Ordering the boy to go to sleep immediately',
          'Instructing the caller to perform chest compressions',
          'Keeping the boy sitting upright while paramedics arrive to examine airway health'
        ],
        correctAnswer: 'D',
        explanation: 'Mona instructed to keep him upright while paramedics still arrive to evaluate him.'
      }
    ]
  },
  unitExam: {
    examId: 'sec1_u7_exam',
    examTitle: 'Secondary 1 - Unit 7 Comprehensive Assessment: Health and Safety',
    examTitleAr: 'امتحان الوحدة السابعة الشامل - الصف الأول الثانوي',
    durationMinutes: 30,
    totalMarks: 32,
    questions: [
      {
        id: 'sec1_u7_ex_q1',
        skill: 'Vocabulary',
        question: 'Adhering to rigorous personal and domestic __________ prevents the transmission of infectious pathogens.',
        options: ['hygiene', 'vanity', 'indifference', 'hesitation'],
        correctAnswer: 'A',
        explanation: '"Hygiene" encompasses preventative cleanliness practices.'
      },
      {
        id: 'sec1_u7_ex_q2',
        skill: 'Grammar',
        question: 'You __________ wash your hands with soap before handling baby food; it is an essential sanitary rule.',
        options: ['might', 'must', 'could', 'mustn’t'],
        correctAnswer: 'B',
        explanation: '"Must" indicates strong ethical and health necessity.'
      },
      {
        id: 'sec1_u7_ex_q3',
        skill: 'Reading',
        question: 'Why are kitchen sponges designated as primary focal points for dangerous bacterial proliferation?',
        options: ['Because they are stored in dry sunlight', 'Because they are washed with hot bleach hourly', 'Because their constant dampness and trapped food particles provide ideal microbial incubators', 'Because they contain metal wires that attract bacteria'],
        correctAnswer: 'C',
        explanation: 'The reading passage explains that sponges provide perpetual moisture and organic residues.'
      },
      {
        id: 'sec1_u7_ex_q4',
        skill: 'Listening',
        question: 'When administering abdominal thrusts during choking, the rescuer’s hand movement should be directed __________.',
        options: ['downward toward the hips', 'sideways toward the ribs', 'in gentle horizontal circles', 'inward and upward just above the navel'],
        correctAnswer: 'D',
        explanation: 'Heimlich thrusts must be directed inward and upward.'
      },
      {
        id: 'sec1_u7_ex_q5',
        skill: 'Vocabulary',
        question: 'Every certified lifeguard is trained in cardiopulmonary resuscitation, universally abbreviated as __________.',
        options: ['CPR', 'GPS', 'USB', 'VIP'],
        correctAnswer: 'A',
        explanation: 'CPR stands for Cardiopulmonary Resuscitation.'
      },
      {
        id: 'sec1_u7_ex_q6',
        skill: 'Grammar',
        question: 'Children __________ play with flammable matches or cigarette lighters; it is extremely dangerous.',
        options: ['don’t have to', 'mustn’t', 'should', 'needn’t'],
        correctAnswer: 'B',
        explanation: '"Mustn’t" is used for strict prohibitions against dangerous conduct.'
      },
      {
        id: 'sec1_u7_ex_q7',
        skill: 'Reading',
        question: 'What is the primary airborne irritant generated by dust mites that triggers asthma in bedrooms?',
        options: ['Carbon monoxide fumes', 'Poisonous chemical venoms', 'Their digestive enzymes and microscopic fecal pellets', 'Microscopic metal filings'],
        correctAnswer: 'C',
        explanation: 'Dust mite fecal pellets and digestive enzymes constitute the airborne allergen.'
      },
      {
        id: 'sec1_u7_ex_q8',
        skill: 'Listening',
        question: 'What physiological symptom signaled that the choking child was deprived of oxygen?',
        options: ['He was coughing softly', 'He asked for a glass of warm milk', 'He smiled and waved at his brother', 'His facial complexion turned blue (cyanosis)'],
        correctAnswer: 'D',
        explanation: 'Cyanosis (turning blue) is the cardinal indicator of severe hypoxemia.'
      },
      {
        id: 'sec1_u7_ex_q9',
        skill: 'Vocabulary',
        question: 'Washing bed sheets weekly in hot water eradicates dust mites and mitigates severe __________ symptoms.',
        options: ['allergy', 'generosity', 'adventure', 'appetite'],
        correctAnswer: 'A',
        explanation: 'Allergies are hypersensitive immune responses to substances like dust mite feces.'
      },
      {
        id: 'sec1_u7_ex_q10',
        skill: 'Grammar',
        question: 'Hany’s headache vanished completely, so he __________ take the strong painkiller prescribed by the clinic.',
        options: ['must', 'didn’t have to', 'has to', 'should'],
        correctAnswer: 'B',
        explanation: '"Didn’t have to" indicates lack of past obligation/necessity.'
      },
      {
        id: 'sec1_u7_ex_q11',
        skill: 'Reading',
        question: 'How can cooks prevent cross-contamination when preparing poultry and raw vegetables?',
        options: ['By using the same wooden cutting board simultaneously', 'By washing raw chicken with scented laundry soap', 'By maintaining dedicated separate chopping boards and sanitizing knives between uses', 'By storing food on the floor under the sink'],
        correctAnswer: 'C',
        explanation: 'Separating cutting boards and washing knives prevents bacterial cross-contamination.'
      },
      {
        id: 'sec1_u7_ex_q12',
        skill: 'Listening',
        question: 'What should a caregiver do immediately after a choking victim expels the obstructed object?',
        options: ['Give them dry bread to swallow', 'Force them to run around the room', 'Place them in a cold ice bath', 'Keep them seated upright and offer sips of water while monitoring airways'],
        correctAnswer: 'D',
        explanation: 'Nurse Mona directed keeping him upright and giving small sips of water.'
      },
      {
        id: 'sec1_u7_ex_q13',
        skill: 'Vocabulary',
        question: 'If you burn your hand on hot steam, the correct initial remedy is placing it under cool __________ water.',
        options: ['running', 'boiling', 'salty', 'frozen'],
        correctAnswer: 'A',
        explanation: 'Cool running water dissipates thermal energy without causing tissue shock.'
      },
      {
        id: 'sec1_u7_ex_q14',
        skill: 'Grammar',
        question: 'You __________ wear protective laboratory goggles when handling volatile hydrochloric acid.',
        options: ['might', 'have to', 'could', 'may'],
        correctAnswer: 'B',
        explanation: '"Have to" conveys mandatory external safety compliance.'
      },
      {
        id: 'sec1_u7_ex_q15',
        skill: 'Reading',
        question: 'Microbiologists explain that heating a damp kitchen sponge in a microwave for 60 seconds __________.',
        options: ['destroys the microwave appliance', 'makes the sponge completely toxic', 'destroys the cellular membranes of trapped pathogenic bacteria', 'freezes all water inside the sponge'],
        correctAnswer: 'C',
        explanation: 'Microwaving damp sponges boils moisture and destroys bacterial cell walls.'
      },
      {
        id: 'sec1_u7_ex_q16',
        skill: 'Listening',
        question: 'What is the primary role of an emergency phone dispatcher in acute crisis moments?',
        options: ['To argue with callers about medical costs', 'To disconnect calls if the caller is distressed', 'To sell commercial first aid equipment', 'To maintain composure and guide callers through life-saving interventions step by step'],
        correctAnswer: 'D',
        explanation: 'Dispatchers provide clear, composed, life-saving coaching.'
      }
    ]
  }
};

// UNIT 8: Robots & Future Technology
export const sec1Unit8: UnitCurriculum = {
  stage: 'Secondary',
  grade: 10,
  gradeLabel: 'Secondary 1 - الصف الأول الثانوي',
  track: 'National / Baccalaureate',
  semester: 2,
  unitNumber: 8,
  unitTitle: 'Robots & Technology',
  unitTitleAr: 'الروبوتات وتكنولوجيا المستقبل (الذكاء الاصطناعي والأتمتة)',
  theme: 'Robotics, artificial intelligence, GPS navigation, autonomous vehicles, ethical algorithms',
  vocabularyModule: {
    keyWords: [
      {
        word: 'autonomous',
        partOfSpeech: 'adjective',
        meaningEn: 'Having the freedom to act independently; self-governing and capable of operating without human intervention.',
        meaningAr: 'ذاتي القيادة / يعمل باستقلالية تامة',
        collocation: 'autonomous vehicle',
        synonym: 'self-driving / automated',
        antonym: 'manually operated',
        exampleSentence: 'Autonomous vehicles utilize lidar sensors and neural networks to navigate congested city streets.'
      },
      {
        word: 'GPS',
        partOfSpeech: 'noun [uncountable]',
        meaningEn: 'Global Positioning System: a satellite-based radionavigation system providing geolocation and time information.',
        meaningAr: 'نظام تحديد المواقع العالمي',
        collocation: 'GPS navigation',
        synonym: 'satellite navigation',
        antonym: 'dead reckoning',
        exampleSentence: 'Delivery couriers rely on GPS to chart the most fuel-efficient routes through Cairo.'
      },
      {
        word: 'artificial intelligence',
        partOfSpeech: 'noun [uncountable]',
        meaningEn: 'The simulation of human intelligence processes by computer systems, such as learning, reasoning, and self-correction.',
        meaningAr: 'الذكاء الاصطناعي',
        collocation: 'generative artificial intelligence',
        synonym: 'AI / machine learning',
        antonym: 'human intuition',
        exampleSentence: 'Artificial intelligence aids radiologists in detecting minute cellular abnormalities in MRI scans.'
      },
      {
        word: 'algorithm',
        partOfSpeech: 'noun [countable]',
        meaningEn: 'A process or set of rules to be followed in calculations or other problem-solving operations, especially by a computer.',
        meaningAr: 'خوارزمية حسابية',
        collocation: 'complex search algorithm',
        synonym: 'procedural formula',
        antonym: 'random choice',
        exampleSentence: 'Social media platforms employ recommendation algorithms to personalize user feeds.'
      },
      {
        word: 'sensor',
        partOfSpeech: 'noun [countable]',
        meaningEn: 'A device which detects or measures a physical property and records, indicates, or otherwise responds to it.',
        meaningAr: 'مستشعر / جهاز استشعار',
        collocation: 'optical sensor',
        synonym: 'detector / monitor',
        antonym: 'actuator',
        exampleSentence: 'Robotic surgical arms are equipped with tactile sensors that measure micro-levels of tissue resistance.'
      },
      {
        word: 'consequence',
        partOfSpeech: 'noun [countable]',
        meaningEn: 'A result or effect of an action or condition.',
        meaningAr: 'عاقبة / نتيجة مترتبة',
        collocation: 'unintended consequences',
        synonym: 'outcome / repercussion',
        antonym: 'origin / cause',
        exampleSentence: 'Automating industrial factories has profound economic consequences for low-skilled manual laborers.'
      }
    ],
    collocations: [
      {
        phrase: 'chart a route',
        meaningAr: 'يحدد أو يرسم مسار الرحلة',
        example: 'Modern GPS navigation charts the fastest route avoiding highway construction.'
      },
      {
        phrase: 'replace human workers',
        meaningAr: 'يحل محل العمال البشريين',
        example: 'Robots will assist rather than entirely replace human workers in creative industries.'
      },
      {
        phrase: 'solve complex problems',
        meaningAr: 'يحل مشكلات معقدة',
        example: 'Quantum algorithms are engineered to solve complex problems in cryptanalysis.'
      },
      {
        phrase: 'rely heavily on',
        meaningAr: 'يعتمد بشكل كبير على',
        example: 'Automated warehouse systems rely heavily on optical sensors and robotic lifts.'
      }
    ],
    idiomsAndExpressions: [
      {
        idiom: 'cutting edge',
        meaningEn: 'The most modern, advanced stage of development in a particular field.',
        meaningAr: 'أحدث ما توصل إليه العلم / قمة التطور',
        example: 'The new Cairo AI lab is conducting research at the cutting edge of robotics.'
      },
      {
        idiom: 'ahead of its time',
        meaningEn: 'Too advanced or innovative to be easily accepted or understood by contemporaries.',
        meaningAr: 'سابق لعصره / متقدم جداً',
        example: 'Da Vinci’s mechanical knight design was centuries ahead of its time.'
      }
    ],
    exercises: [
      {
        id: 'sec1_u8_vocab_q1',
        skill: 'Vocabulary',
        question: 'A vehicle capable of sensing its surroundings and navigating without human intervention is called an __________ vehicle.',
        options: ['autonomous', 'exhausted', 'accidental', 'archaic'],
        correctAnswer: 'A',
        explanation: '"Autonomous" denotes self-governing and operating without direct human control.'
      },
      {
        id: 'sec1_u8_vocab_q2',
        skill: 'Vocabulary',
        question: 'Smartphones utilize satellite-based __________ to determine your exact geographic coordinates anywhere on Earth.',
        options: ['CPR', 'GPS', 'PDF', 'LED'],
        correctAnswer: 'B',
        explanation: 'Global Positioning System (GPS) calculates exact planetary coordinates via satellites.'
      },
      {
        id: 'sec1_u8_vocab_q3',
        skill: 'Vocabulary',
        question: 'Modern hospital laboratories deploy __________ intelligence to diagnose rare genetic disorders with extreme accuracy.',
        options: ['artificial', 'arrogant', 'awkward', 'accidental'],
        correctAnswer: 'C',
        explanation: '"Artificial intelligence" is machine-based cognition and pattern recognition.'
      },
      {
        id: 'sec1_u8_vocab_q4',
        skill: 'Vocabulary',
        question: 'The research lab is celebrated globally for pioneering innovations at the __________ edge of nanorobotics.',
        options: ['blunt', 'dull', 'outer', 'cutting'],
        correctAnswer: 'D',
        explanation: 'The idiom is "cutting edge", signifying the most advanced technological tier.'
      }
    ]
  },
  grammarModule: {
    ruleName: 'Conditional Clauses: Zero, First, Second & Third Conditionals + Unless',
    ruleNameAr: 'الجمل الشرطية (الحالة الصفرية والأولى والثانية والثالثة وروابط الشرط)',
    explanationSummary: 'Zero (facts): If + present, present. First (real future): If + present, will + inf. Second (hypothetical present): If + past simple, would + inf. Third (past regret/impossible): If + had + PP, would have + PP. Unless = If not.',
    detailedRules: [
      {
        title: 'Zero Conditional: Scientific Realities & General Facts',
        explanation: 'If / When + Present Simple, Present Simple. Expresses universal physical truths.',
        examples: [
          'If you heat ice, it melts into water.',
          'When autonomous cars detect an obstacle, their brakes activate automatically.'
        ]
      },
      {
        title: 'First Conditional: Probable Future Possibilities',
        explanation: 'If + Present Simple, Will / Can / May / Should + Infinitive.',
        examples: [
          'If engineers optimize the battery algorithms, the robot will operate for twenty hours.',
          'Unless we upgrade our firewall, hackers might infiltrate our servers (Unless = If we don’t).'
        ]
      },
      {
        title: 'Second vs. Third Conditionals: Imaginary Present vs. Unchangeable Past',
        explanation: 'Second: If + Past Simple, Would + inf (Unreal present). Third: If + Past Perfect, Would have + P.P. (Impossible past counterfactual).',
        examples: [
          'If I had a humanoid robot assistant, I would delegate all tedious chores (Second).',
          'If the technicians had tested the software yesterday, the system would not have crashed (Third).'
        ]
      }
    ],
    exercises: [
      {
        id: 'sec1_u8_gram_q1',
        skill: 'Grammar',
        question: 'If you expose microchips to extreme heat, their silicone transistors __________.',
        options: ['malfunction', 'would malfunction', 'malfunctioned', 'would have malfunctioned'],
        correctAnswer: 'A',
        explanation: 'Zero conditional is used for scientific physical facts: If + present, present.'
      },
      {
        id: 'sec1_u8_gram_q2',
        skill: 'Grammar',
        question: 'If the battery level drops below ten percent, the cleaning robot __________ to its charging dock automatically.',
        options: ['returned', 'will return', 'would return', 'had returned'],
        correctAnswer: 'B',
        explanation: 'First conditional represents real future causality: If + present simple, will + base verb.'
      },
      {
        id: 'sec1_u8_gram_q3',
        skill: 'Grammar',
        question: 'If our school had higher funding, we __________ advanced robotics kits for every student.',
        options: ['buy', 'will buy', 'would purchase', 'purchased'],
        correctAnswer: 'C',
        explanation: 'Second conditional for hypothetical present situation: If + past simple (had), would + base verb.'
      },
      {
        id: 'sec1_u8_gram_q4',
        skill: 'Grammar',
        question: '__________ you install the critical security patch, your computer will remain susceptible to cyberattacks.',
        options: ['If', 'In case of', 'Provided that', 'Unless'],
        correctAnswer: 'D',
        explanation: '"Unless" equals "If you do not"; it conveys the negative conditional necessity.'
      }
    ]
  },
  readingModule: {
    passageTitle: 'The Algorithmic Horizon: Artificial Intelligence and Society',
    passage: `Over the span of a single generation, robotics has migrated from the pages of science fiction into the fabric of everyday life. In automated fulfillment centers across the globe, swarms of wheeled robots navigate massive warehouses, retrieving and packaging consumer goods with micron precision. In medicine, surgical robotic consoles translate the hand movements of a surgeon into micro-movements inside the human body, reducing patient recovery times from weeks to mere days.

However, the advent of generative artificial intelligence and autonomous systems has sparked intense ethical debates. As algorithms assume responsibility for autonomous driving, medical diagnostics, and financial lending, societies must confront the dilemma of accountability. If a self-driving vehicle encounters an unavoidable collision, how should its neural network prioritize competing safety choices? Who bears legal culpability when an algorithmic diagnostic makes a catastrophic error?

Furthermore, the economic implications are bifurcated. Proponents argue that automation eliminates repetitive, hazardous labor and creates high-skilled engineering jobs. Critics counter that without substantial educational reform and workforce reskilling programs, lower-skilled workers will be marginalized. To reap the benefits of the robotic revolution, humanity must ensure that algorithmic development remains anchored in transparent ethical guardrails.`,
    criticalThinkingFocus: 'Analyzing algorithmic accountability, workforce displacement, and ethical governance of artificial intelligence.',
    questions: [
      {
        id: 'sec1_u8_read_q1',
        skill: 'Reading',
        question: 'What tangible medical benefit has surgical robotics introduced according to the passage?',
        options: [
          'Translating surgeon hand gestures into micro-movements, substantially diminishing patient recovery periods',
          'Replacing the need for human doctors and nurses permanently',
          'Allowing patients to operate on themselves from home',
          'Eliminating the need for medical sterilizing equipment'
        ],
        correctAnswer: 'A',
        explanation: 'Paragraph 1 specifies micro-movements inside the body reducing recovery times from weeks to days.'
      },
      {
        id: 'sec1_u8_read_q2',
        skill: 'Reading',
        question: 'What ethical conundrum arises from the widespread deployment of autonomous driving algorithms?',
        options: [
          'Autonomous vehicles refuse to drive in sunny weather',
          'Deciding accountability and programming moral choices during unavoidable collisions',
          'Autonomous cars require drivers to pedal during uphill climbs',
          'They cannot connect to wireless satellite systems'
        ],
        correctAnswer: 'B',
        explanation: 'Paragraph 2 highlights the dilemma of legal accountability and competing safety choices in crashes.'
      },
      {
        id: 'sec1_u8_read_q3',
        skill: 'Reading',
        question: 'What does the term "bifurcated" mean when describing the economic implications of automation?',
        options: [
          'Entirely negative with no positive qualities',
          'Costing billions of dollars in foreign currency',
          'Split into two contrasting branches or perspectives',
          'Completed within five minutes'
        ],
        correctAnswer: 'C',
        explanation: '"Bifurcated" means divided into two distinct branches: optimism for new jobs versus fear of worker displacement.'
      },
      {
        id: 'sec1_u8_read_q4',
        skill: 'Reading',
        question: 'What proactive social measure must governments undertake to prevent worker marginalization?',
        options: [
          'Outlawing all computers and electronic devices nationwide',
          'Closing all secondary schools and colleges',
          'Instituting massive educational reform and workforce reskilling programs',
          'Doubling the working hours of manual laborers'
        ],
        correctAnswer: 'C',
        explanation: 'Paragraph 3 stresses substantial educational reform and workforce reskilling programs.'
      },
      {
        id: 'sec1_u8_read_q5',
        skill: 'Reading',
        question: 'What is the author’s primary overarching conclusion concerning artificial intelligence?',
        options: [
          'AI should be developed within transparent ethical guardrails to serve human welfare',
          'Robots will inevitably destroy human civilization within five years',
          'All scientific research in computer science should be terminated immediately',
          'Artificial intelligence has no practical applications outside video games'
        ],
        correctAnswer: 'A',
        explanation: 'The conclusion emphasizes that AI must remain anchored in transparent ethical guardrails.'
      }
    ]
  },
  listeningModule: {
    audioTitle: 'Podcast: The Future of Autonomous Transportation in Egypt',
    speakerRoles: 'Tech Journalist (Nader) & AI Engineer (Eng. Yasmine)',
    transcript: `Journalist: Good afternoon, tech enthusiasts. Today we are exploring autonomous transit with Eng. Yasmine, lead autonomous systems developer. Yasmine, how close is Egypt to seeing self-driving public transport?
Eng. Yasmine: Much closer than many people assume, Nader. Autonomous electric feeder shuttles are already undergoing controlled trials in the New Administrative Capital and smart business districts.
Journalist: How do these vehicles navigate unpredictable traffic conditions?
Eng. Yasmine: They deploy multi-modal sensor fusion: lidar scanners bounce laser beams to map 3D surroundings, optical cameras read Arabic traffic signs, and high-precision GPS monitors route lanes down to two centimeters.
Journalist: What happens if an obstacle suddenly darts into the shuttle’s path?
Eng. Yasmine: The onboard AI processes sensor data in twenty milliseconds—five times faster than human reflex speed—and initiates a controlled emergency stop.
Journalist: Remarkable! The future is truly unfolding today.`,
    durationApprox: '2 mins 20 secs',
    exercises: [
      {
        id: 'sec1_u8_listen_q1',
        skill: 'Listening',
        question: 'Where are autonomous electric shuttles currently undergoing controlled operational trials in Egypt?',
        options: [
          'Inside the New Administrative Capital and smart business districts',
          'On unpaved agricultural dirt roads in Upper Egypt',
          'Along the coastal beaches of North Sinai',
          'In underground subway tunnels beneath the Nile'
        ],
        correctAnswer: 'A',
        explanation: 'Eng. Yasmine stated trials are running in the New Administrative Capital and smart districts.'
      },
      {
        id: 'sec1_u8_listen_q2',
        skill: 'Listening',
        question: 'What technology allows autonomous shuttles to map their three-dimensional physical surroundings?',
        options: [
          'Chemical smell detectors',
          'Lidar scanners projecting laser beams to generate 3D spatial maps',
          'Analog magnetic compasses',
          'Radio antenna music receivers'
        ],
        correctAnswer: 'B',
        explanation: 'Yasmine explained lidar scanners bounce laser beams to map 3D surroundings.'
      },
      {
        id: 'sec1_u8_listen_q3',
        skill: 'Listening',
        question: 'How fast can the onboard AI detect an obstacle and execute an emergency brake sequence?',
        options: [
          'Within twenty minutes',
          'Within twenty seconds',
          'Within twenty milliseconds (five times faster than human reflex)',
          'After waiting for an hour to confirm'
        ],
        correctAnswer: 'C',
        explanation: 'Yasmine noted the AI processes data in 20 milliseconds, 5x faster than human reflexes.'
      },
      {
        id: 'sec1_u8_listen_q4',
        skill: 'Listening',
        question: 'What function do optical cameras perform on autonomous transit vehicles?',
        options: [
          'Playing movies for passengers on screen',
          'Taking artistic selfies of pedestrians',
          'Recording audio conversations of bystanders',
          'Reading and interpreting traffic signs and visual road markings'
        ],
        correctAnswer: 'D',
        explanation: 'Yasmine mentioned optical cameras read traffic signs and visual lanes.'
      }
    ]
  },
  unitExam: {
    examId: 'sec1_u8_exam',
    examTitle: 'Secondary 1 - Unit 8 Comprehensive Assessment: Robots & Technology',
    examTitleAr: 'امتحان الوحدة الثامنة الشامل - الصف الأول الثانوي',
    durationMinutes: 30,
    totalMarks: 32,
    questions: [
      {
        id: 'sec1_u8_ex_q1',
        skill: 'Vocabulary',
        question: 'Self-driving vehicles navigate roads through __________ systems that process sensor data independently.',
        options: ['autonomous', 'exhausted', 'accidental', 'antiquated'],
        correctAnswer: 'A',
        explanation: '"Autonomous" denotes self-directing and capable of independent action.'
      },
      {
        id: 'sec1_u8_ex_q2',
        skill: 'Grammar',
        question: 'If scientists develop more efficient solar cells, renewable power __________ significantly cheaper.',
        options: ['became', 'will become', 'had become', 'would have become'],
        correctAnswer: 'B',
        explanation: 'First conditional represents real future probability: If + present simple, will + base verb.'
      },
      {
        id: 'sec1_u8_ex_q3',
        skill: 'Reading',
        question: 'Surgical robotic systems enhance clinical precision primarily because they __________.',
        options: ['operate completely without any doctors present', 'allow operations to take place in noisy shopping malls', 'translate human surgeon gestures into tremor-free micro-movements', 'require zero electricity to function'],
        correctAnswer: 'C',
        explanation: 'Robotic consoles eliminate micro-tremors and translate surgeon hand motions precisely.'
      },
      {
        id: 'sec1_u8_ex_q4',
        skill: 'Listening',
        question: 'How quickly does the onboard autonomous shuttle processor initiate emergency braking when an obstacle appears?',
        options: ['In five hours', 'In two minutes', 'In one second', 'In twenty milliseconds'],
        correctAnswer: 'D',
        explanation: 'Eng. Yasmine specified that the AI acts in 20 milliseconds.'
      },
      {
        id: 'sec1_u8_ex_q5',
        skill: 'Vocabulary',
        question: 'The car navigation screen charts the quickest route to Alexandria using satellite __________ data.',
        options: ['GPS', 'CPR', 'ATM', 'PIN'],
        correctAnswer: 'A',
        explanation: 'GPS provides satellite navigational location.'
      },
      {
        id: 'sec1_u8_ex_q6',
        skill: 'Grammar',
        question: 'If you boil water under normal atmospheric pressure, it __________ into steam.',
        options: ['turned', 'turns', 'would turn', 'would have turned'],
        correctAnswer: 'B',
        explanation: 'Zero conditional for invariable physical scientific facts: If + present, present.'
      },
      {
        id: 'sec1_u8_ex_q7',
        skill: 'Reading',
        question: 'What ethical problem arises if an autonomous car causes a traffic collision?',
        options: ['Determining whether to paint the car a different color', 'Deciding which radio station to tune into', 'Establishing legal accountability and algorithmic liability', 'Banning all passengers from traveling permanently'],
        correctAnswer: 'C',
        explanation: 'The passage highlights accountability and algorithmic culpability during accidents.'
      },
      {
        id: 'sec1_u8_ex_q8',
        skill: 'Listening',
        question: 'Lidar sensors deployed on autonomous shuttles generate three-dimensional spatial maps by __________.',
        options: ['recording underwater sound waves', 'measuring engine fuel consumption', 'broadcasting television signals', 'projecting safe laser pulses and calculating return reflections'],
        correctAnswer: 'D',
        explanation: 'Lidar uses laser beams to measure distances and create detailed 3D spatial models.'
      },
      {
        id: 'sec1_u8_ex_q9',
        skill: 'Vocabulary',
        question: 'Recommendation __________ analyze your previous viewing habits to suggest relevant educational lectures.',
        options: ['algorithms', 'conflicts', 'hesitations', 'scandals'],
        correctAnswer: 'A',
        explanation: 'An "algorithm" is a computational ruleset for data processing.'
      },
      {
        id: 'sec1_u8_ex_q10',
        skill: 'Grammar',
        question: 'If I were an aerospace robotics engineer, I __________ exploration probes for distant planets.',
        options: ['design', 'would design', 'will design', 'designed'],
        correctAnswer: 'B',
        explanation: 'Second conditional for hypothetical counterfactual present: If + past simple, would + base verb.'
      },
      {
        id: 'sec1_u8_ex_q11',
        skill: 'Reading',
        question: 'What proactive policy prevents low-skilled laborers from being left behind by industrial automation?',
        options: ['Banning all technological innovation', 'Forcing workers to emigrate to other countries', 'Extensive educational reform and national workforce reskilling programs', 'Replacing all schools with automated robot stores'],
        correctAnswer: 'C',
        explanation: 'The text emphasizes workforce reskilling to equip workers for modern automated economies.'
      },
      {
        id: 'sec1_u8_ex_q12',
        skill: 'Listening',
        question: 'Autonomous shuttle trials in Egypt are currently focused on which specialized geographical sector?',
        options: ['Mountain hiking tracks in Sinai', 'Rural agricultural canals in the Delta', 'International shipping lanes in the Red Sea', 'The New Administrative Capital and smart business developments'],
        correctAnswer: 'D',
        explanation: 'Trials are being conducted in the New Administrative Capital and smart zones.'
      },
      {
        id: 'sec1_u8_ex_q13',
        skill: 'Vocabulary',
        question: 'Surgical robotic equipment contains delicate tactile __________ that gauge tissue resistance during operations.',
        options: ['sensors', 'complaints', 'suspicions', 'mutinies'],
        correctAnswer: 'A',
        explanation: 'Tactile "sensors" detect physical pressure and touch.'
      },
      {
        id: 'sec1_u8_ex_q14',
        skill: 'Grammar',
        question: 'If the team had installed the antivirus updates last night, the virus __________ the database.',
        options: ['would not infect', 'would not have infected', 'will not infect', 'does not infect'],
        correctAnswer: 'B',
        explanation: 'Third conditional for past unfulfilled condition: If + past perfect, would have + P.P.'
      },
      {
        id: 'sec1_u8_ex_q15',
        skill: 'Reading',
        question: 'What is the consensus among ethical technologists regarding the governance of artificial intelligence?',
        options: ['Algorithms should be free from any legal regulation', 'AI should only be programmed by teenagers', 'AI development must be governed by transparent, human-centered ethical safeguards', 'All robotic technologies should be kept secret from the public'],
        correctAnswer: 'C',
        explanation: 'Ethical governance ensures that technological advancement aligns with human rights.'
      },
      {
        id: 'sec1_u8_ex_q16',
        skill: 'Listening',
        question: 'Eng. Yasmine noted that autonomous shuttles combine optical cameras with GPS and lidar in a process termed __________.',
        options: ['manual driving', 'analog mechanical tuning', 'battery discharging', 'multi-modal sensor fusion'],
        correctAnswer: 'D',
        explanation: 'Sensor fusion combines inputs from lidar, cameras, and GPS for complete situational awareness.'
      }
    ]
  }
};

// UNIT 9: What is an Adventure?
export const sec1Unit9: UnitCurriculum = {
  stage: 'Secondary',
  grade: 10,
  gradeLabel: 'Secondary 1 - الصف الأول الثانوي',
  track: 'National / Baccalaureate',
  semester: 2,
  unitNumber: 9,
  unitTitle: 'What is an Adventure?',
  unitTitleAr: 'ما هي المغامرة؟ (الاستكشاف وتحدي الصعاب)',
  theme: 'Exploration, extreme sports, psychological resilience, David Copperfield abroad, past perfect narrative tenses',
  vocabularyModule: {
    keyWords: [
      {
        word: 'expedition',
        partOfSpeech: 'noun [countable]',
        meaningEn: 'A journey undertaken by a group of people with a particular purpose, especially that of exploration or scientific research.',
        meaningAr: 'بعثة استكشافية / رحلة علمية',
        collocation: 'scientific expedition',
        synonym: 'exploration / trek',
        antonym: 'stagnation',
        exampleSentence: 'The scientific expedition surveyed the deep geological canyons of the Sinai Peninsula.'
      },
      {
        word: 'resilience',
        partOfSpeech: 'noun [uncountable]',
        meaningEn: 'The capacity to recover quickly from difficulties, tough circumstances, or mental trauma; toughness.',
        meaningAr: 'المرونة والقدرة على الصمود وتجاوز الأزمات',
        collocation: 'psychological resilience',
        synonym: 'perseverance / grit',
        antonym: 'fragility / vulnerability',
        exampleSentence: 'Mountaineers must demonstrate physical endurance and immense psychological resilience.'
      },
      {
        word: 'perilous',
        partOfSpeech: 'adjective',
        meaningEn: 'Full of danger or risk; hazardous.',
        meaningAr: 'محفوف بالمخاطر / مهلك',
        collocation: 'perilous journey',
        synonym: 'hazardous / treacherous',
        antonym: 'secure / safe',
        exampleSentence: 'Crossing the desert during summer midday without water is a perilous venture.'
      },
      {
        word: 'wilderness',
        partOfSpeech: 'noun [countable/uncountable]',
        meaningEn: 'An uncultivated, uninhabited, and inhospitable region left in its natural state.',
        meaningAr: 'البرية / القفار الطبيعية',
        collocation: 'untamed wilderness',
        synonym: 'wilds / hinterland',
        antonym: 'civilized city',
        exampleSentence: 'The White Desert offers an ethereal wilderness of chalk rock formations under the stars.'
      },
      {
        word: 'summit',
        partOfSpeech: 'noun [countable]',
        meaningEn: 'The highest point of a hill or mountain; the peak or apex.',
        meaningAr: 'قمة الجبل / ذروة',
        collocation: 'reach the mountain summit',
        synonym: 'peak / pinnacle',
        antonym: 'base / valley',
        exampleSentence: 'After six hours of climbing, the trekkers reached the summit of Mount Catherine at dawn.'
      },
      {
        word: 'courage',
        partOfSpeech: 'noun [uncountable]',
        meaningEn: 'The ability to do something that frightens one; bravery and mental resolve.',
        meaningAr: 'الشجاعة / الجرأة الأدبية',
        collocation: 'summon the courage',
        synonym: 'bravery / fortitude',
        antonym: 'cowardice / fear',
        exampleSentence: 'It took tremendous courage for David to confront his tormentors and start a new life.'
      }
    ],
    collocations: [
      {
        phrase: 'reach the summit',
        meaningAr: 'يصل إلى القمة',
        example: 'The climbers wept with triumph as they reached the snowy summit.'
      },
      {
        phrase: 'face hardships',
        meaningAr: 'يواجه الصعاب والمحن',
        example: 'Explorers must be mentally prepared to face unexpected hardships in the wild.'
      },
      {
        phrase: 'embark on an adventure',
        meaningAr: 'يشرع في خوض مغامرة',
        example: 'The university students embarked on a week-long diving adventure in Dahab.'
      },
      {
        phrase: 'overcome obstacles',
        meaningAr: 'يتغلب على العقبات والعراقيل',
        example: 'Resilient individuals cultivate problem-solving skills to overcome obstacles.'
      }
    ],
    idiomsAndExpressions: [
      {
        idiom: 'push the boundaries',
        meaningEn: 'To extend the limits of what is normal, acceptable, or possible.',
        meaningAr: 'يتجاوز الحدود المألوفة / يبتكر',
        example: 'Modern explorers push the boundaries of human endurance in extreme climates.'
      },
      {
        idiom: 'test one’s mettle',
        meaningEn: 'To evaluate someone’s ability to cope well with difficulties and face danger with courage.',
        meaningAr: 'يختبر معدنه الحقيقي وصلابته',
        example: 'Surviving four days in the freezing wilderness truly tested the mountaineer’s mettle.'
      }
    ],
    exercises: [
      {
        id: 'sec1_u9_vocab_q1',
        skill: 'Vocabulary',
        question: 'The research team organized a six-month scientific __________ to study endemic flora in the Sinai mountains.',
        options: ['expedition', 'eviction', 'hesitation', 'orphanage'],
        correctAnswer: 'A',
        explanation: 'An "expedition" is a voyage undertaken by an organized team for a specific purpose.'
      },
      {
        id: 'sec1_u9_vocab_q2',
        skill: 'Vocabulary',
        question: 'Athletes who conquer extreme physical challenges possess not only stamina but formidable mental __________.',
        options: ['cowardice', 'resilience', 'arrogance', 'fragility'],
        correctAnswer: 'B',
        explanation: '"Resilience" is the psychological and physical grit to withstand and overcome hardship.'
      },
      {
        id: 'sec1_u9_vocab_q3',
        skill: 'Vocabulary',
        question: 'Trekking across unstable sand dunes during a sandstorm is a highly __________ undertaking.',
        options: ['harmless', 'comfortable', 'perilous', 'monotonous'],
        correctAnswer: 'C',
        explanation: '"Perilous" means fraught with severe danger and hazard.'
      },
      {
        id: 'sec1_u9_vocab_q4',
        skill: 'Vocabulary',
        question: 'Exhausted but jubilant, the Egyptian climbing team finally reached the __________ of Mount Saint Catherine.',
        options: ['foot', 'crevice', 'tunnel', 'summit'],
        correctAnswer: 'D',
        explanation: 'The "summit" is the highest peak of a mountain.'
      }
    ]
  },
  grammarModule: {
    ruleName: 'Past Perfect Simple & Continuous (Had + P.P. / Had been + V-ing) & Conjunctions of Time',
    ruleNameAr: 'الماضي التام البسيط والماضي التام المستمر وروابط الزمن في السرد',
    explanationSummary: 'The Past Perfect Simple denotes an action completed before another past event. The Past Perfect Continuous emphasizes the ongoing duration of an action before a subsequent past event. Time linkers: After, Before, By the time, As soon as, Having + P.P.',
    detailedRules: [
      {
        title: 'Past Perfect Simple: The Earlier Past Event',
        explanation: 'Had + Past Participle. Clarifies chronological order when discussing two past actions; the earlier action takes Past Perfect.',
        examples: [
          'After the climbers had checked their safety harnesses, they commenced the ascent.',
          'By the time the rescue helicopter landed, the storm had already ceased.'
        ]
      },
      {
        title: 'Past Perfect Continuous: Prior Duration & Side Effects',
        explanation: 'Had been + Verb-ing. Stresses duration before a past milestone or explains the root cause of a past physical condition.',
        examples: [
          'The explorers were breathless because they had been ascending the steep ridge for five hours.',
          'Nour had been training rigorously for months before she entered the international marathon.'
        ]
      },
      {
        title: 'Key Time Conjunctions & Participle Clauses',
        explanation: 'After / As soon as + Past Perfect, Past Simple. Before / By the time + Past Simple, Past Perfect. Having + Past Participle (Participle clause replacing "After he had...").',
        examples: [
          'Having completed the desert survey, the team packed up their tents.',
          'No sooner had we reached the summit than the fog rolled in.'
        ]
      }
    ],
    exercises: [
      {
        id: 'sec1_u9_gram_q1',
        skill: 'Grammar',
        question: 'After the mountaineers __________ the base camp, they began their final push toward the peak.',
        options: ['had secured', 'secure', 'are securing', 'have secured'],
        correctAnswer: 'A',
        explanation: 'The earlier completed past action after "after" takes the Past Perfect (had secured).'
      },
      {
        id: 'sec1_u9_gram_q2',
        skill: 'Grammar',
        question: 'By the time the rescue team located the stranded safari truck, the passengers __________ all their emergency water.',
        options: ['drank', 'had finished', 'have finished', 'are drinking'],
        correctAnswer: 'B',
        explanation: '"By the time" + Past Simple clause is paired with Past Perfect (had finished) for the prior action.'
      },
      {
        id: 'sec1_u9_gram_q3',
        skill: 'Grammar',
        question: 'The trekker was shivering uncontrollably because he __________ in the freezing mountain drizzle for hours.',
        options: ['walks', 'is walking', 'had been walking', 'will walk'],
        correctAnswer: 'C',
        explanation: 'Past Perfect Continuous (had been walking) explains a past physical symptom resulting from prior duration.'
      },
      {
        id: 'sec1_u9_gram_q4',
        skill: 'Grammar',
        question: '__________ passed the national medical board exams, Dr. Sherif applied for the rural surgical fellowship.',
        options: ['Before', 'Since', 'While', 'Having'],
        correctAnswer: 'D',
        explanation: '"Having + Past Participle" (Having passed) forms a perfect participle clause indicating completed prior action.'
      }
    ]
  },
  readingModule: {
    passageTitle: 'The Anatomy of Adventure: Why Humans Seek the Edge',
    passage: `Throughout human history, curiosity has impelled men and women beyond the safety of their ancestral boundaries. From ancient navigators who sailed uncharted waters to modern astronauts venturing into the cold expanse of space, the instinct to explore is deeply ingrained in human nature. However, contemporary sociologists distinguish between reckless thrill-seeking and authentic adventure.

A true adventure is characterized not merely by physical peril, but by the confrontation with the unknown and the cultivation of inner resilience. When extreme explorer Omar Samra became the first Egyptian to summit Mount Everest and later reach both the North and South Poles, his objective was not boastful prestige. Rather, he documented that prolonged exposure to extreme hardship strips away vanity and reveals an individual’s foundational character. In sub-zero temperatures and thin atmospheres, decision-making requires profound mental clarity and unconditional trust in one’s teammates.

Furthermore, adventure holds a transformative psychological mirror to everyday life. Individuals who have overcome physical adversity in the wilderness frequently return with enhanced emotional maturity. They perceive urban stresses with greater perspective and approach personal challenges with patience and composure. Ultimately, adventure is not about conquering nature, but about mastering the doubts, fears, and limitations within ourselves.`,
    criticalThinkingFocus: 'Evaluating the psychological dividends of extreme endurance versus reckless bravado.',
    questions: [
      {
        id: 'sec1_u9_read_q1',
        skill: 'Reading',
        question: 'How do modern sociologists differentiate between reckless thrill-seeking and genuine adventure?',
        options: [
          'Genuine adventure focuses on confronting the unknown and cultivating inner resilience and humility',
          'Thrill-seeking requires climbing only mountains that are less than one hundred meters high',
          'Genuine adventure is only performed by people with military ranks',
          'Thrill-seeking always generates enormous financial profit for explorers'
        ],
        correctAnswer: 'A',
        explanation: 'Paragraph 2 highlights confronting the unknown and cultivating inner resilience rather than vanity.'
      },
      {
        id: 'sec1_u9_read_q2',
        skill: 'Reading',
        question: 'What psychological revelation did Egyptian mountaineer Omar Samra experience during his polar and Himalayan journeys?',
        options: [
          'That extreme sports should be outlawed by the United Nations',
          'That extreme conditions strip away vanity and lay bare an individual’s foundational character',
          'That humans do not require oxygen at high altitudes',
          'That exploring alone without teammates is the safest strategy'
        ],
        correctAnswer: 'B',
        explanation: 'Paragraph 2 notes that extreme hardship strips away vanity and reveals foundational character.'
      },
      {
        id: 'sec1_u9_read_q3',
        skill: 'Reading',
        question: 'What psychological dividend do adventurers carry back to their daily urban routines?',
        options: [
          'Permanent inability to live in modern apartments',
          'Disdain for anyone who does not climb mountains',
          'Enhanced perspective, emotional patience, and composure when navigating personal stresses',
          'Loss of memory regarding their past childhood experiences'
        ],
        correctAnswer: 'C',
        explanation: 'Paragraph 3 notes they view urban stresses with perspective, patience, and composure.'
      },
      {
        id: 'sec1_u9_read_q4',
        skill: 'Reading',
        question: 'What is the core philosophical aphorism articulated in the final sentence of the passage?',
        options: [
          'Nature must be subjugated and destroyed for economic profit',
          'Only wealthy individuals can understand the meaning of life',
          'Adventure should only be pursued in warm tropical locations',
          'Adventure is fundamentally about conquering our internal doubts and limitations rather than nature'
        ],
        correctAnswer: 'D',
        explanation: 'The conclusion states: "adventure is not about conquering nature, but about mastering the doubts, fears, and limitations within ourselves."'
      },
      {
        id: 'sec1_u9_read_q5',
        skill: 'Reading',
        question: 'Which literary tone best characterizes the author’s portrayal of extreme exploration?',
        options: [
          'Philosophical, introspective, and celebratory of human endurance',
          'Dismissive, mocking, and skeptical of human ambition',
          'Alarmist, predicting imminent doom for all travelers',
          'Bored, expressing indifference toward mountaineering'
        ],
        correctAnswer: 'A',
        explanation: 'The passage explores psychological depth and celebrates resilience philosophically.'
      }
    ]
  },
  listeningModule: {
    audioTitle: 'Interview: Conquering the Sinai Trail on Foot',
    speakerRoles: 'Host (Hassan) & Long-Distance Hiker (Malak)',
    transcript: `Host: Welcome, Malak. You recently completed the historic 550-kilometer Sinai Trail on foot. What motivated you to undertake such an arduous journey?
Malak: Hello Hassan. In our hyper-connected modern world, we are constantly glued to screens and notifications. I wanted to disconnect from the digital noise and test my physical and mental endurance in the ancient wilderness of Sinai.
Host: How did you prepare for the logistical challenges?
Malak: Before setting out, my Bedouin guides and I had calculated water caches along the trail weeks in advance. In the desert, water planning is literally a matter of survival.
Host: What was the most emotionally demanding moment during your 45-day trek?
Malak: Crossing the High Mountain region during a flash hail storm. Temperatures plummeted below freezing, and my pack weighed twenty kilograms. When I finally reached the summit of Mount Sinai at sunrise, all exhaustion dissolved into pure awe.
Host: What an unforgettable life achievement, Malak!`,
    durationApprox: '2 mins 15 secs',
    exercises: [
      {
        id: 'sec1_u9_listen_q1',
        skill: 'Listening',
        question: 'What primary motive spurred Malak to trek the 550-kilometer Sinai Trail?',
        options: [
          'To disconnect from digital distraction and test her physical and mental endurance',
          'To film an advertisement for commercial hiking footwear',
          'To evade tax inspectors in Cairo',
          'Because all train and bus services across Egypt were suspended'
        ],
        correctAnswer: 'A',
        explanation: 'Malak explained she wanted to disconnect from digital noise and test her endurance.'
      },
      {
        id: 'sec1_u9_listen_q2',
        skill: 'Listening',
        question: 'What vital survival preparation did Malak and her Bedouin guides arrange beforehand?',
        options: [
          'Carrying thirty smartphones in case of broken screens',
          'Strategically calculating and depositing water caches along the route',
          'Booking five-star hotels at every mountain pass',
          'Relying entirely on drinking seawater along the trail'
        ],
        correctAnswer: 'B',
        explanation: 'Malak stated: "we had calculated water caches along the trail weeks in advance."'
      },
      {
        id: 'sec1_u9_listen_q3',
        skill: 'Listening',
        question: 'What unexpected meteorological adversity struck during her ascent in the High Mountain region?',
        options: [
          'A sudden volcanic eruption',
          'An extreme desert heatwave reaching 60 degrees Celsius',
          'A severe freezing hail storm with plummeting temperatures',
          'A tropical hurricane coming from the Mediterranean'
        ],
        correctAnswer: 'C',
        explanation: 'Malak described crossing the mountain region during a sudden freezing hail storm.'
      },
      {
        id: 'sec1_u9_listen_q4',
        skill: 'Listening',
        question: 'How did Malak feel when she reached the summit of Mount Sinai at sunrise?',
        options: [
          'Bored and eager to take an airplane home',
          'Angry at her guides for waking her up early',
          'Disappointed that there was no cellular internet signal',
          'All physical exhaustion dissolved into pure spiritual awe and triumph'
        ],
        correctAnswer: 'D',
        explanation: 'She stated: "all exhaustion dissolved into pure awe."'
      }
    ]
  },
  unitExam: {
    examId: 'sec1_u9_exam',
    examTitle: 'Secondary 1 - Unit 9 Comprehensive Assessment: What is an Adventure?',
    examTitleAr: 'امتحان الوحدة التاسعة الشامل - الصف الأول الثانوي',
    durationMinutes: 30,
    totalMarks: 32,
    questions: [
      {
        id: 'sec1_u9_ex_q1',
        skill: 'Vocabulary',
        question: 'The geological research team launched an arduous __________ to study limestone formations in the Western Desert.',
        options: ['expedition', 'eviction', 'hesitation', 'orphanage'],
        correctAnswer: 'A',
        explanation: 'An "expedition" is an organized exploratory journey.'
      },
      {
        id: 'sec1_u9_ex_q2',
        skill: 'Grammar',
        question: 'When the rescue team arrived at the canyon, the lost backpackers __________ all their flares.',
        options: ['fire', 'had fired', 'have fired', 'are firing'],
        correctAnswer: 'B',
        explanation: 'Past Perfect (had fired) indicates the action finished prior to the rescue team’s arrival.'
      },
      {
        id: 'sec1_u9_ex_q3',
        skill: 'Reading',
        question: 'According to philosophical writers, extreme adventure reveals true character because __________.',
        options: ['it is broadcast live on international television channels', 'it earns explorers millions in corporate sponsorships', 'it strips away trivial vanity and demands absolute mental clarity and cooperation', 'it allows travelers to ignore government safety regulations'],
        correctAnswer: 'C',
        explanation: 'The passage highlights that hardship strips away vanity and exposes authentic inner character.'
      },
      {
        id: 'sec1_u9_ex_q4',
        skill: 'Listening',
        question: 'Why is precise water logistics the most vital priority when hiking across the Sinai Trail?',
        options: ['Water bottles are too heavy to carry in backpacks', 'Water is only used for washing boots', 'Desert water cannot be boiled safely', 'Natural water sources are scarce and dehydration can prove fatal in the desert'],
        correctAnswer: 'D',
        explanation: 'In desert climates, water planning is a non-negotiable matter of life or death.'
      },
      {
        id: 'sec1_u9_ex_q5',
        skill: 'Vocabulary',
        question: 'Surviving extreme physical adversity in polar climates demands immense psychological __________.',
        options: ['resilience', 'arrogance', 'cruelty', 'treachery'],
        correctAnswer: 'A',
        explanation: '"Resilience" is the inner fortitude to bounce back from stress and trauma.'
      },
      {
        id: 'sec1_u9_ex_q6',
        skill: 'Grammar',
        question: 'The young athlete was out of breath because she __________ across the rocky dunes for an hour.',
        options: ['runs', 'had been running', 'will run', 'is running'],
        correctAnswer: 'B',
        explanation: 'Past Perfect Continuous (had been running) highlights the duration of past exertion.'
      },
      {
        id: 'sec1_u9_ex_q7',
        skill: 'Reading',
        question: 'What psychological dividend do individuals gain after facing adversity in the wilderness?',
        options: ['They become aggressive and refuse to talk to friends', 'They lose interest in all academic books', 'They develop greater emotional patience and resilience when facing everyday urban problems', 'They demand that all cities be abandoned'],
        correctAnswer: 'C',
        explanation: 'Overcoming wild adversity fosters emotional patience, composure, and perspective.'
      },
      {
        id: 'sec1_u9_ex_q8',
        skill: 'Listening',
        question: 'What motivated Malak to leave Cairo and embark on the 550-kilometer Sinai Trail on foot?',
        options: ['She had lost her university identification card', 'Her car broke down on the highway', 'She was escaping an international criminal investigation', 'She wanted to disconnect from digital distraction and test her inner mettle'],
        correctAnswer: 'D',
        explanation: 'Malak sought to disconnect from screens and test her physical and mental grit.'
      },
      {
        id: 'sec1_u9_ex_q9',
        skill: 'Vocabulary',
        question: 'Descending steep icy cliffs during a blustery blizzard is a remarkably __________ maneuver.',
        options: ['perilous', 'secure', 'harmless', 'relaxing'],
        correctAnswer: 'A',
        explanation: '"Perilous" means full of hazard and grave danger.'
      },
      {
        id: 'sec1_u9_ex_q10',
        skill: 'Grammar',
        question: 'By the time the sun set behind the dunes, the expedition team __________ their protective tents.',
        options: ['pitched', 'had pitched', 'have pitched', 'pitch'],
        correctAnswer: 'B',
        explanation: '"By the time" + past simple takes Past Perfect (had pitched) for the prior milestone.'
      },
      {
        id: 'sec1_u9_ex_q11',
        skill: 'Reading',
        question: 'What distinction does the author emphasize regarding modern adventure vs. reckless thrill-seeking?',
        options: ['Thrill-seeking is much more respected by scientists', 'There is zero difference between the two concepts', 'Adventure emphasizes internal self-discovery, ethical discipline, and conquering personal limits', 'Thrill-seeking is only practiced by elderly philosophers'],
        correctAnswer: 'C',
        explanation: 'Genuine adventure seeks inner mastery and self-discovery rather than shallow bravado.'
      },
      {
        id: 'sec1_u9_ex_q12',
        skill: 'Listening',
        question: 'How did Malak and her guides ensure they did not run out of water during the forty-five-day trek?',
        options: ['They carried forty liters of water each day on their shoulders', 'They drank morning dew from desert cacti', 'They hired a helicopter to drop water every fifteen minutes', 'They strategically deposited water caches along the trail weeks prior to departure'],
        correctAnswer: 'D',
        explanation: 'They pre-calculated and cached water supplies along the trail in advance.'
      },
      {
        id: 'sec1_u9_ex_q13',
        skill: 'Vocabulary',
        question: 'After five hours of strenuous climbing, the adventurers raised the Egyptian flag on the mountain __________.',
        options: ['summit', 'crevice', 'valley', 'dungeon'],
        correctAnswer: 'A',
        explanation: 'The "summit" is the apex peak of a mountain.'
      },
      {
        id: 'sec1_u9_ex_q14',
        skill: 'Grammar',
        question: '__________ checked the weather forecasts on their satellite radios, the sailors pulled out of the harbor.',
        options: ['While', 'Having', 'Before', 'Since'],
        correctAnswer: 'B',
        explanation: '"Having checked" forms a perfect participle clause indicating completed prior action.'
      },
      {
        id: 'sec1_u9_ex_q15',
        skill: 'Reading',
        question: 'The passage concludes that true adventure is fundamentally an endeavor of __________.',
        options: ['destroying rare wilderness reserves for profit', 'proving that one is physically superior to everyone else', 'mastering the fears, insecurities, and internal limitations of the self', 'earning commercial endorsement contracts from shoe companies'],
        correctAnswer: 'C',
        explanation: 'The text concludes that adventure is about mastering the doubts and limitations within ourselves.'
      },
      {
        id: 'sec1_u9_ex_q16',
        skill: 'Listening',
        question: 'What emotional transformation washed over Malak as dawn broke over Mount Sinai?',
        options: ['She regretted walking the trail completely', 'She decided never to go hiking again', 'She felt terrified of the Bedouin guides', 'Her physical exhaustion dissolved into profound spiritual awe and triumph'],
        correctAnswer: 'D',
        explanation: 'Malak described all exhaustion dissolving into pure awe at the summit sunrise.'
      }
    ]
  }
};

// UNIT 10: What's Your Job?
export const sec1Unit10: UnitCurriculum = {
  stage: 'Secondary',
  grade: 10,
  gradeLabel: 'Secondary 1 - الصف الأول الثانوي',
  track: 'National / Baccalaureate',
  semester: 2,
  unitNumber: 10,
  unitTitle: 'What’s Your Job?',
  unitTitleAr: 'ما هي مهنتك؟ (مهارات المستقبل وسوق العمل)',
  theme: 'Careers, internships, artificial intelligence workplace impact, professional communication, reported speech',
  vocabularyModule: {
    keyWords: [
      {
        word: 'internship',
        partOfSpeech: 'noun [countable]',
        meaningEn: 'A period of work experience offered by an organization for a limited period of time to gain practical workplace skills.',
        meaningAr: 'فترة تدريب عملي / تدريب مهني',
        collocation: 'summer internship',
        synonym: 'traineeship / apprenticeship',
        antonym: 'permanent tenure',
        exampleSentence: 'Completing a summer internship at a software engineering firm boosted his job prospects immensely.'
      },
      {
        word: 'freelancer',
        partOfSpeech: 'noun [person]',
        meaningEn: 'A person who works self-employed for different companies on particular assignments rather than being permanently employed by one.',
        meaningAr: 'مستقل / يعمل لحسابه الخاص',
        collocation: 'independent freelancer',
        synonym: 'contractor / gig worker',
        antonym: 'salaried employee',
        exampleSentence: 'Many Egyptian digital illustrators and translators operate as successful global freelancers.'
      },
      {
        word: 'qualification',
        partOfSpeech: 'noun [countable/uncountable]',
        meaningEn: 'An official record of achievement awarded on the successful completion of a course of training or study.',
        meaningAr: 'مؤهل دراسي أو علمي',
        collocation: 'academic qualifications',
        synonym: 'credentials / certification',
        antonym: 'lack of training',
        exampleSentence: 'In modern tech industries, demonstrable coding aptitude often matters as much as formal qualifications.'
      },
      {
        word: 'deadline',
        partOfSpeech: 'noun [countable]',
        meaningEn: 'The latest time or date by which something should be completed or submitted.',
        meaningAr: 'الموعد النهائي لتسليم العمل',
        collocation: 'meet a tight deadline',
        synonym: 'target date / cut-off',
        antonym: 'open timeframe',
        exampleSentence: 'Project managers must coordinate their teams diligently to meet strict client deadlines.'
      },
      {
        word: 'adaptable',
        partOfSpeech: 'adjective',
        meaningEn: 'Able to adjust to new conditions, environments, or technologies rapidly and effectively.',
        meaningAr: 'قادر على التكيف والمرونة',
        collocation: 'highly adaptable mindset',
        synonym: 'flexible / versatile',
        antonym: 'rigid / obstinate',
        exampleSentence: 'Modern graduates must be adaptable, as workplace technologies undergo rapid annual disruption.'
      },
      {
        word: 'interview',
        partOfSpeech: 'noun / verb',
        meaningEn: 'A formal meeting in which one or more persons question, consult, or evaluate an applicant for a job or position.',
        meaningAr: 'مقابلة شخصية للتوظيف / يُجري مقابلة',
        collocation: 'job interview',
        synonym: 'assessment / oral evaluation',
        antonym: 'dismissal',
        exampleSentence: 'Dina practiced mock interview questions with her mentor to overcome her speaking nervousness.'
      }
    ],
    collocations: [
      {
        phrase: 'meet a deadline',
        meaningAr: 'يلتزم بموعد التسليم المحدد',
        example: 'Engineers worked overtime throughout the weekend to meet the client’s project deadline.'
      },
      {
        phrase: 'gain work experience',
        meaningAr: 'يكتسب خبرة عملية',
        example: 'Volunteering at the youth sports club enabled him to gain hands-on managerial experience.'
      },
      {
        phrase: 'apply for a vacancy',
        meaningAr: 'يتقدم لشغل وظيفة شاغرة',
        example: 'Over three hundred candidates applied for the junior marketing vacancy.'
      },
      {
        phrase: 'possess interpersonal skills',
        meaningAr: 'يمتلك مهارات التواصل مع الآخرين',
        example: 'A successful hospital administrator must possess exceptional interpersonal skills.'
      }
    ],
    idiomsAndExpressions: [
      {
        idiom: 'learn the ropes',
        meaningEn: 'To learn how to do a particular job or activity correctly.',
        meaningAr: 'يتعلم أصول ومبادئ العمل',
        example: 'It took the new banking intern a couple of weeks to learn the ropes.'
      },
      {
        idiom: 'think on one’s feet',
        meaningEn: 'To react quickly and make decisions without prior preparation.',
        meaningAr: 'يتصرف ببديهة وسرعة تحت الضغط',
        example: 'During intense client negotiations, consultants must think on their feet.'
      }
    ],
    exercises: [
      {
        id: 'sec1_u10_vocab_q1',
        skill: 'Vocabulary',
        question: 'Undergraduates are encouraged to complete a summer __________ to acquire practical industry experience.',
        options: ['internship', 'orphanage', 'eviction', 'hesitation'],
        correctAnswer: 'A',
        explanation: 'An "internship" offers real-world vocational training for students.'
      },
      {
        id: 'sec1_u10_vocab_q2',
        skill: 'Vocabulary',
        question: 'Instead of signing a permanent contract, Youssef works as a digital __________ for multiple international clients.',
        options: ['dictator', 'freelancer', 'referee', 'monopolist'],
        correctAnswer: 'B',
        explanation: 'A "freelancer" is self-employed and performs contractual work for various clients.'
      },
      {
        id: 'sec1_u10_vocab_q3',
        skill: 'Vocabulary',
        question: 'Due to severe supply chain delays, the construction firm struggled to __________ the contract deadline.',
        options: ['ignore', 'cancel', 'meet', 'destroy'],
        correctAnswer: 'C',
        explanation: 'The collocation is "meet a deadline", meaning to finish on or before the due date.'
      },
      {
        id: 'sec1_u10_vocab_q4',
        skill: 'Vocabulary',
        question: 'In a rapidly automating economy, employees must be __________ and eager to master emerging digital platforms.',
        options: ['stubborn', 'lethargic', 'careless', 'adaptable'],
        correctAnswer: 'D',
        explanation: '"Adaptable" describes individuals able to evolve and adjust to changing demands.'
      }
    ]
  },
  grammarModule: {
    ruleName: 'Reported / Indirect Speech (Statements, Questions, and Commands)',
    ruleNameAr: 'الكلام المنقول (الجمل الخبرية والاستفهامية والطلبية وأفعال الإبلاغ)',
    explanationSummary: 'Tense shifting (backshifting: Present -> Past, Past -> Past Perfect), pronoun changes, and time/place adverb transformations. Reporting verbs: said, told + object, asked + if/whether, advised + to + infinitive.',
    detailedRules: [
      {
        title: 'Reported Statements: Said vs. Told',
        explanation: 'Said (no object required). Told + indirect object (He told me that...). Tenses shift backwards one step when the reporting verb is in the past.',
        examples: [
          '“I am applying for an internship,” he said. -> He said that he was applying for an internship.',
          '“We will launch the project next week,” she told the team. -> She told the team that they would launch the project the following week.'
        ]
      },
      {
        title: 'Reported Questions: Wh- questions & Yes/No questions',
        explanation: 'Yes/No questions: asked + if / whether + subject + verb (statement word order). Wh- questions: asked + Wh-word + subject + verb.',
        examples: [
          '“Do you speak German?” the manager asked. -> The manager asked if I spoke German.',
          '“Where did you study robotics?” she enquired. -> She enquired where I had studied robotics.'
        ]
      },
      {
        title: 'Reported Commands, Requests & Advice',
        explanation: 'Told / ordered / warned / advised + Object + to + infinitive (or not to + infinitive).',
        examples: [
          '“Please submit your resume by Friday,” the director said. -> The director advised us to submit our resume by Friday.',
          '“Do not share confidential client passwords,” he warned. -> He warned them not to share confidential client passwords.'
        ]
      }
    ],
    exercises: [
      {
        id: 'sec1_u10_gram_q1',
        skill: 'Grammar',
        question: 'The HR interviewer __________ me if I had previous experience in mobile application development.',
        options: ['asked', 'told', 'said', 'spoke'],
        correctAnswer: 'A',
        explanation: '"Asked" introduces an indirect question followed by "if" and statement word order.'
      },
      {
        id: 'sec1_u10_gram_q2',
        skill: 'Grammar',
        question: 'Sara said that she __________ for her upcoming job interview the following morning.',
        options: ['prepares', 'was preparing', 'will prepare', 'is preparing'],
        correctAnswer: 'B',
        explanation: 'Backshifting in reported speech transforms Present Continuous ("am preparing") into Past Continuous ("was preparing").'
      },
      {
        id: 'sec1_u10_gram_q3',
        skill: 'Grammar',
        question: 'The professor advised the graduates __________ procrastinating on their postgraduate applications.',
        options: ['to stop not', 'stop', 'not to stop', 'to stop'],
        correctAnswer: 'D',
        explanation: '"Advised + object + to + infinitive" (advised them to stop procrastinating).'
      },
      {
        id: 'sec1_u10_gram_q4',
        skill: 'Grammar',
        question: 'The supervisor told his engineering team that they __________ the blueprints by the end of that day.',
        options: ['must finish', 'finish', 'had to finish', 'will finish'],
        correctAnswer: 'C',
        explanation: 'In reported speech, modal "must" of necessity backshifts to "had to".'
      }
    ]
  },
  readingModule: {
    passageTitle: 'The Future of Work: Navigating the Twenty-First Century Job Market',
    passage: `The global marketplace is undergoing the most profound restructuring since the dawn of the industrial era. Driven by artificial intelligence, cloud computing, and green energy transitions, traditional definitions of lifelong linear employment are rapidly becoming obsolete. In earlier generations, a university diploma secured a forty-year career within a single corporate or governmental institution. Today, economic forecasters estimate that current secondary school graduates will transition through five distinct career sectors throughout their working lives.

In this volatile landscape, technical specialization alone is no longer an absolute guarantee of employment security. Algorithms can generate computer code, draft legal contracts, and interpret medical radiography faster than humans. Consequently, employers increasingly prioritize hybrid competencies—often described as "durable soft skills." These encompass creative problem-solving, cognitive empathy, cross-cultural communication, and emotional resilience under pressure.

Moreover, the rise of the decentralized freelance economy allows talented Egyptian youth to work for multinational corporations from their home offices in Giza or Mansoura. However, freelancing demands self-discipline, time auditing, and continuous self-directed upskilling. Rather than viewing technology as a rival, tomorrow’s professionals must view intelligent tools as cognitive partners that amplify human ingenuity.`,
    criticalThinkingFocus: 'Analyzing career agility, transferable soft skills, and remote economic opportunities in the AI era.',
    questions: [
      {
        id: 'sec1_u10_read_q1',
        skill: 'Reading',
        question: 'How does modern employment fundamentally diverge from the career patterns of earlier generations?',
        options: [
          'Modern graduates will transition through multiple career sectors rather than holding a single lifelong job',
          'Modern workers are prohibited from ever using digital computers in offices',
          'Everyone is now required to retire at age twenty-five',
          'Salaries are paid exclusively in gold coins'
        ],
        correctAnswer: 'A',
        explanation: 'Paragraph 1 indicates graduates will navigate multiple career sectors across their working lives.'
      },
      {
        id: 'sec1_u10_read_q2',
        skill: 'Reading',
        question: 'Why are "durable soft skills" gaining heightened prominence among twenty-first-century employers?',
        options: [
          'They allow companies to avoid paying any salaries to workers',
          'Because routine technical calculations are increasingly automated by AI, making empathy and creativity uniquely human',
          'They eliminate the need for employees to show up at work',
          'They require zero practice or education to master'
        ],
        correctAnswer: 'B',
        explanation: 'Paragraph 2 highlights that automated algorithms make human creativity, empathy, and resilience paramount.'
      },
      {
        id: 'sec1_u10_read_q3',
        skill: 'Reading',
        question: 'What unprecedented economic opportunity does the decentralized freelance economy offer Egyptian youth?',
        options: [
          'Receiving free airline tickets to every European capital',
          'Working for international multinational firms remotely from Egyptian cities',
          'Banning foreign companies from investing in Egyptian infrastructure',
          'Eliminating the need to learn English or foreign languages'
        ],
        correctAnswer: 'B',
        explanation: 'Paragraph 3 notes youth can collaborate with multinational corporations remotely from Egyptian hometowns.'
      },
      {
        id: 'sec1_u10_read_q4',
        skill: 'Reading',
        question: 'What personal attributes are indispensable for sustaining a successful freelance career according to the text?',
        options: [
          'Depending entirely on parents to pay for monthly rent',
          'Avoiding all communication with clients',
          'Refusing to learn new computer operating systems',
          'Rigorous self-discipline, meticulous time management, and proactive continuous upskilling'
        ],
        correctAnswer: 'D',
        explanation: 'Paragraph 3 emphasizes self-discipline, time auditing, and continuous self-directed upskilling.'
      },
      {
        id: 'sec1_u10_read_q5',
        skill: 'Reading',
        question: 'What attitude toward artificial intelligence does the author advocate for tomorrow’s workforce?',
        options: [
          'Viewing intelligent digital tools as collaborative partners that augment and empower human creativity',
          'Attempting to physically destroy all computer servers',
          'Surrendering all decision-making unconditionally to autonomous machines',
          'Pretending that artificial intelligence does not exist'
        ],
        correctAnswer: 'A',
        explanation: 'The conclusion urges professionals to view intelligent tools as cognitive partners that amplify ingenuity.'
      }
    ]
  },
  listeningModule: {
    audioTitle: 'Career Counseling Workshop: Acing the Modern Job Interview',
    speakerRoles: 'HR Recruiter (Mr. Tamer) & Job Applicant (Zeinab)',
    transcript: `Recruiter: Welcome, Zeinab. Today we will conduct a practice simulation of a competency-based job interview. Are you ready?
Applicant: Yes, Mr. Tamer. I have researched your corporate mission and brought copies of my resume.
Recruiter: Excellent. Tell me about a time when you faced a high-pressure deadline while leading a student team.
Applicant: During my graduation project, our database server crashed two days before the submission deadline. Instead of panicking, I called an emergency huddle. I redistributed the data recovery tasks, stayed up with the backend programmer to reconstruct lost records, and we delivered the functioning portal four hours before the deadline.
Recruiter: Outstanding response! You utilized the STAR method: Situation, Task, Action, and Result. That illustrates leadership, composure, and problem-solving.
Applicant: Thank you, Mr. Tamer! Practicing structured articulation makes all the difference.`,
    durationApprox: '2 mins 15 secs',
    exercises: [
      {
        id: 'sec1_u10_listen_q1',
        skill: 'Listening',
        question: 'What crisis confronted Zeinab’s team forty-eight hours before their project submission deadline?',
        options: [
          'Their central database server suffered a catastrophic system crash',
          'Their faculty building was completely flooded by rain',
          'Their team members refused to speak English',
          'Their university was permanently closed'
        ],
        correctAnswer: 'A',
        explanation: 'Zeinab stated: "our database server crashed two days before the submission deadline."'
      },
      {
        id: 'sec1_u10_listen_q2',
        skill: 'Listening',
        question: 'How did Zeinab handle the crisis instead of giving in to panic?',
        options: [
          'She blamed other students and left the project',
          'She convened an emergency huddle, delegated recovery roles, and reconstructed lost data',
          'She requested a two-year extension from the dean',
          'She paid someone else to write the project from scratch'
        ],
        correctAnswer: 'B',
        explanation: 'She redistributed tasks and worked directly with the programmer to reconstruct the data.'
      },
      {
        id: 'sec1_u10_listen_q3',
        skill: 'Listening',
        question: 'What established behavioral framework did Zeinab’s response follow according to Mr. Tamer?',
        options: [
          'The Fibonacci sequence calculation',
          'The SMART goal framework',
          'The STAR method: Situation, Task, Action, and Result',
          'The SWOT marketing matrix'
        ],
        correctAnswer: 'C',
        explanation: 'Mr. Tamer praised her for using the STAR method (Situation, Task, Action, Result).'
      },
      {
        id: 'sec1_u10_listen_q4',
        skill: 'Listening',
        question: 'What core professional qualities did Zeinab’s story demonstrate to the recruiter?',
        options: [
          'Physical athletic strength and swimming speed',
          'Fluency in five classical ancient dialects',
          'Ability to write calligraphy on parchment',
          'Leadership composure, crisis management, and practical problem-solving'
        ],
        correctAnswer: 'D',
        explanation: 'Mr. Tamer affirmed: "That illustrates leadership, composure, and problem-solving."'
      }
    ]
  },
  unitExam: {
    examId: 'sec1_u10_exam',
    examTitle: 'Secondary 1 - Unit 10 Comprehensive Assessment: What’s Your Job?',
    examTitleAr: 'امتحان الوحدة العاشرة الشامل - الصف الأول الثانوي',
    durationMinutes: 30,
    totalMarks: 32,
    questions: [
      {
        id: 'sec1_u10_ex_q1',
        skill: 'Vocabulary',
        question: 'Undergraduates who complete a summer __________ gain invaluable insights into real-world corporate operations.',
        options: ['internship', 'orphanage', 'eviction', 'hesitation'],
        correctAnswer: 'A',
        explanation: 'An "internship" is practical experiential work training.'
      },
      {
        id: 'sec1_u10_ex_q2',
        skill: 'Grammar',
        question: 'The hiring director asked Omar if he __________ proficient in data analytics software.',
        options: ['is', 'was', 'will be', 'has been'],
        correctAnswer: 'B',
        explanation: 'In indirect reported questions introduced by "asked", the present "is" backshifts to "was".'
      },
      {
        id: 'sec1_u10_ex_q3',
        skill: 'Reading',
        question: 'Why are human soft skills such as empathy and creative problem-solving increasingly prized by recruiters?',
        options: ['Because soft skills can be calculated on a pocket calculator', 'Because computers refuse to work with humans who lack soft skills', 'Because repetitive analytical calculations are increasingly executed by automated algorithms', 'Because soft skills allow employees to avoid paying taxes'],
        correctAnswer: 'C',
        explanation: 'As routine computation is automated, unique human empathy and creative adaptability become indispensable.'
      },
      {
        id: 'sec1_u10_ex_q4',
        skill: 'Listening',
        question: 'What structured framework did Zeinab use to narrate her crisis-management experience in the interview?',
        options: ['The Venn diagram', 'The Pareto distribution', 'The Golden Ratio', 'The STAR method (Situation, Task, Action, Result)'],
        correctAnswer: 'D',
        explanation: 'The STAR method is the industry-standard structure for answering competency-based interview questions.'
      },
      {
        id: 'sec1_u10_ex_q5',
        skill: 'Vocabulary',
        question: 'Rather than binding himself to one corporation, Farouk works as a __________ programmer for international clients.',
        options: ['freelance', 'bystander', 'dictator', 'monopolist'],
        correctAnswer: 'A',
        explanation: '"Freelance" denotes contractual self-employment.'
      },
      {
        id: 'sec1_u10_ex_q6',
        skill: 'Grammar',
        question: 'Noha told her colleague that she __________ the presentation slides the previous evening.',
        options: ['completes', 'had completed', 'will complete', 'is completing'],
        correctAnswer: 'B',
        explanation: 'Past Simple ("completed") backshifts to Past Perfect ("had completed") in reported speech.'
      },
      {
        id: 'sec1_u10_ex_q7',
        skill: 'Reading',
        question: 'The decentralized freelance economy empowers educated Egyptian youth primarily by __________.',
        options: ['forcing everyone to leave the country permanently', 'banning international corporations from operating in Egypt', 'enabling them to access high-paying international remote employment from their hometowns', 'requiring zero computer or internet literacy'],
        correctAnswer: 'C',
        explanation: 'Remote freelancing connects domestic talent to global economic opportunities.'
      },
      {
        id: 'sec1_u10_ex_q8',
        skill: 'Listening',
        question: 'When the database server collapsed two days before the submission deadline, Zeinab responded by __________.',
        options: ['canceling the project and complaining to the dean', 'deleting all remaining files in despair', 'accusing her classmates of sabotage', 'convening an emergency meeting and delegating data recovery roles calmly'],
        correctAnswer: 'D',
        explanation: 'Zeinab called an emergency huddle and calmly coordinated data reconstruction.'
      },
      {
        id: 'sec1_u10_ex_q9',
        skill: 'Vocabulary',
        question: 'The publishing team labored diligently through the night to ensure they would __________ the morning deadline.',
        options: ['meet', 'cancel', 'postpone', 'destroy'],
        correctAnswer: 'A',
        explanation: 'The collocation is "meet a deadline".'
      },
      {
        id: 'sec1_u10_ex_q10',
        skill: 'Grammar',
        question: 'The career coach advised the students __________ their digital portfolios before contacting employers.',
        options: ['updating', 'to update', 'update', 'updated'],
        correctAnswer: 'B',
        explanation: '"Advised + object + to + infinitive" (advised students to update).'
      },
      {
        id: 'sec1_u10_ex_q11',
        skill: 'Reading',
        question: 'What mental disposition must twenty-first-century professionals adopt toward emerging technologies?',
        options: ['Boycotting all new inventions', 'Assuming machines will make all human thought unnecessary', 'Viewing intelligent tools as cognitive partners that expand and elevate human capability', 'Refusing to use smartphones or digital communications'],
        correctAnswer: 'C',
        explanation: 'The text urges workers to view smart algorithms as cognitive partners.'
      },
      {
        id: 'sec1_u10_ex_q12',
        skill: 'Listening',
        question: 'What practical outcome resulted from Zeinab’s prompt and disciplined crisis management?',
        options: ['The team lost their scholarships', 'The database was stolen by hackers', 'The team was forced to repeat the academic year', 'The operational portal was delivered successfully four hours ahead of the deadline'],
        correctAnswer: 'D',
        explanation: 'The portal was handed in four hours prior to the official cut-off.'
      },
      {
        id: 'sec1_u10_ex_q13',
        skill: 'Vocabulary',
        question: 'In a dynamic modern job market, employees who are intellectually __________ thrive across changing environments.',
        options: ['adaptable', 'rigid', 'stubborn', 'lethargic'],
        correctAnswer: 'A',
        explanation: '"Adaptable" individuals adjust flexibly to new realities.'
      },
      {
        id: 'sec1_u10_ex_q14',
        skill: 'Grammar',
        question: 'The manager warned the warehouse staff __________ smoking inside the chemical storage hangar.',
        options: ['to not', 'not to', 'don’t', 'not'],
        correctAnswer: 'B',
        explanation: 'Negative reported commands take "warned + object + not to + infinitive".'
      },
      {
        id: 'sec1_u10_ex_q15',
        skill: 'Reading',
        question: 'Why is linear lifelong employment becoming obsolete in contemporary economies?',
        options: ['Governments have banned people from working after age thirty', 'Universities refuse to teach engineering or medicine', 'Rapid disruption from AI, green tech, and automation constantly reconfigures industry sectors', 'All factories around the world have been replaced by robots'],
        correctAnswer: 'C',
        explanation: 'Technological acceleration reshapes the nature of work, demanding career mobility.'
      },
      {
        id: 'sec1_u10_ex_q16',
        skill: 'Listening',
        question: 'Why is mastering structured articulation vital for candidate success during job interviews?',
        options: ['It proves the candidate has memorized an entire dictionary', 'It guarantees the applicant will be paid double the standard salary', 'It allows the applicant to speak for three hours without stopping', 'It demonstrates clarity of thought, professional composure, and effective communication'],
        correctAnswer: 'D',
        explanation: 'Structured articulation conveys organized thinking, poise, and clear communication under scrutiny.'
      }
    ]
  }
};

// UNIT 11: Finding Culture
export const sec1Unit11: UnitCurriculum = {
  stage: 'Secondary',
  grade: 10,
  gradeLabel: 'Secondary 1 - الصف الأول الثانوي',
  track: 'National / Baccalaureate',
  semester: 2,
  unitNumber: 11,
  unitTitle: 'Finding Culture',
  unitTitleAr: 'اكتشاف الثقافة (التراث المصري والحضارات الإنسانية)',
  theme: 'Cultural heritage, Egyptian monumental architecture, folklore, UNESCO World Heritage sites, relative clauses',
  vocabularyModule: {
    keyWords: [
      {
        word: 'heritage',
        partOfSpeech: 'noun [uncountable]',
        meaningEn: 'Valued objects, qualities, and traditions such as historic buildings, culture, and folklore passed down from previous generations.',
        meaningAr: 'التراث الحضاري والثقافي',
        collocation: 'cultural heritage',
        synonym: 'legacy / inheritance',
        antonym: 'modern innovation',
        exampleSentence: 'Egypt’s multifaceted cultural heritage spans millennia of Pharaonic, Coptic, and Islamic architectural genius.'
      },
      {
        word: 'monument',
        partOfSpeech: 'noun [countable]',
        meaningEn: 'A statue, building, or other structure erected to commemorate a notable person or event, or surviving from the past.',
        meaningAr: 'أثر تاريخي / صرح تذكاري',
        collocation: 'ancient monument',
        synonym: 'memorial / landmark',
        antonym: 'ephemeral structure',
        exampleSentence: 'The Karnak Temple complex in Luxor is arguably the most colossal religious monument ever constructed.'
      },
      {
        word: 'folklore',
        partOfSpeech: 'noun [uncountable]',
        meaningEn: 'The traditional beliefs, customs, and stories of a community, passed through the generations by word of mouth.',
        meaningAr: 'الفلكلور / التراث الشعبي',
        collocation: 'traditional Egyptian folklore',
        synonym: 'mythology / oral tradition',
        antonym: 'written documentary law',
        exampleSentence: 'The epic folk tale of Sirat Bani Hilal is a jewel of Upper Egyptian musical folklore.'
      },
      {
        word: 'restoration',
        partOfSpeech: 'noun [uncountable]',
        meaningEn: 'The action of returning something to a former condition, place, or position, especially ancient art and buildings.',
        meaningAr: 'الترميم والصيانة الأثرية',
        collocation: 'architectural restoration',
        synonym: 'renovation / conservation',
        antonym: 'demolition / destruction',
        exampleSentence: 'The meticulous restoration of the Avenue of Sphinxes restored Luxor’s ancient ceremonial splendor.'
      },
      {
        word: 'civilization',
        partOfSpeech: 'noun [countable/uncountable]',
        meaningEn: 'The stage of human social and cultural development and organization that is considered most advanced.',
        meaningAr: 'الحضارة',
        collocation: 'ancient civilization',
        synonym: 'culture / society',
        antonym: 'barbarism / savagery',
        exampleSentence: 'The ancient Egyptian civilization flourished along the Nile thanks to agricultural engineering and astronomy.'
      },
      {
        word: 'intangible',
        partOfSpeech: 'adjective',
        meaningEn: 'Unable to be touched; not having physical presence, yet holding profound cultural value (e.g. music, crafts, poetry).',
        meaningAr: 'غير مادي / معنوي',
        collocation: 'intangible cultural heritage',
        synonym: 'non-material / spiritual',
        antonym: 'tangible / concrete',
        exampleSentence: 'Egyptian Aragoz puppetry and Tahtib stick-dancing are recognized on UNESCO’s Intangible Heritage list.'
      }
    ],
    collocations: [
      {
        phrase: 'preserve our heritage',
        meaningAr: 'يحافظ على تراثنا الوطني',
        example: 'It is the civic duty of every citizen to preserve our heritage for future generations.'
      },
      {
        phrase: 'carry out restoration work',
        meaningAr: 'يُجري أعمال الترميم الأثري',
        example: 'Specialized archaeological teams carried out restoration work inside the King Tutankhamun tomb.'
      },
      {
        phrase: 'pass down through generations',
        meaningAr: 'يتوارث عبر الأجيال',
        example: 'Bedouin weaving and embroidery techniques are passed down through generations of mothers and daughters.'
      },
      {
        phrase: 'attract international tourists',
        meaningAr: 'يجذب السياح من شتى بقاع العالم',
        example: 'The Grand Egyptian Museum in Giza will attract international tourists and researchers alike.'
      }
    ],
    idiomsAndExpressions: [
      {
        idiom: 'steeped in history',
        meaningEn: 'Having a great amount of historical significance or tradition associated with it.',
        meaningAr: 'ضارب في أعماق التاريخ / مفعم بالتاريخ',
        example: 'Moez Street in Islamic Cairo is steeped in history and architectural beauty.'
      },
      {
        idiom: 'test of time',
        meaningEn: 'The ability of something to remain respected, durable, or valued over a very long period.',
        meaningAr: 'يصمد أمام اختبار الزمن',
        example: 'The Great Pyramid of Khufu has stood the test of time for more than four thousand five hundred years.'
      }
    ],
    exercises: [
      {
        id: 'sec1_u11_vocab_q1',
        skill: 'Vocabulary',
        question: 'UNESCO safeguards both monumental stone palaces and __________ cultural traditions such as folk dances and crafts.',
        options: ['intangible', 'hazardous', 'aggressive', 'disposable'],
        correctAnswer: 'A',
        explanation: '"Intangible heritage" encompasses non-physical practices, expressions, folklore, and crafts.'
      },
      {
        id: 'sec1_u11_vocab_q2',
        skill: 'Vocabulary',
        question: 'Cairo’s Al-Moez Street is an open-air museum __________ in medieval history and Fatimid architecture.',
        options: ['lost', 'steeped', 'frightened', 'frozen'],
        correctAnswer: 'B',
        explanation: 'The idiom is "steeped in history", meaning rich with historical heritage.'
      },
      {
        id: 'sec1_u11_vocab_q3',
        skill: 'Vocabulary',
        question: 'The ministry undertook the delicate __________ of ancient papyrus manuscripts discovered in Saqqara.',
        options: ['demolition', 'hesitation', 'restoration', 'eviction'],
        correctAnswer: 'C',
        explanation: '"Restoration" is the scientific conservation of historic artifacts.'
      },
      {
        id: 'sec1_u11_vocab_q4',
        skill: 'Vocabulary',
        question: 'The Great Pyramids have stood the test of __________ for over forty-five centuries, defying weather and decay.',
        options: ['stone', 'sand', 'weather', 'time'],
        correctAnswer: 'D',
        explanation: 'The expression "stand the test of time" denotes enduring resilience across centuries.'
      }
    ]
  },
  grammarModule: {
    ruleName: 'Relative Clauses & Relative Pronouns (Who, Whom, Which, That, Where, When, Whose)',
    ruleNameAr: 'ضمائر وجمل الوصل المحددة وغير المحددة',
    explanationSummary: 'Defining relative clauses (essential information, no commas, "that" can replace who/which) vs. Non-defining relative clauses (extra information, separated by commas, "that" cannot be used). Proper pronoun selection: who/whom (people), which (things), where (places), when (time), whose (possession).',
    detailedRules: [
      {
        title: 'Defining Relative Clauses: Essential Identification',
        explanation: 'Provides information essential to identify the antecedent. No commas. "That" is permissible.',
        examples: [
          'The architect who / that designed the museum won an international prize.',
          'The ancient scroll which / that was discovered in Luxor dates back to the Eighteenth Dynasty.'
        ]
      },
      {
        title: 'Non-Defining Relative Clauses: Extra Descriptive Information',
        explanation: 'Provides non-essential bonus details between commas. Cannot use "that"; must use who, which, where, when, whose.',
        examples: [
          'The Grand Egyptian Museum, which overlooks the Giza plateau, houses the entire Tutankhamun collection.',
          'Dr. Zahi Hawass, whose archaeological discoveries are celebrated worldwide, delivered a keynote lecture.'
        ]
      },
      {
        title: 'Where vs. Which for Places & Whose for Possession',
        explanation: 'Where = in which (indicates an event occurring at a location). Which = refers to the place as an object/subject itself. Whose = possessive connector.',
        examples: [
          'Luxor is the glorious city where the Avenue of Sphinxes was restored (Action happens there).',
          'Luxor is a glorious city which attracts millions of culture lovers every winter (Which is subject of verb attracts).',
          'The scholar whose research unraveled the hieroglyphic inscription was felicitated.'
        ]
      }
    ],
    exercises: [
      {
        id: 'sec1_u11_gram_q1',
        skill: 'Grammar',
        question: 'Jean-François Champollion was the brilliant linguist __________ deciphered the Rosetta Stone in 1822.',
        options: ['who', 'which', 'where', 'whose'],
        correctAnswer: 'A',
        explanation: '"Who" is the relative pronoun referring to people as the subject of the clause.'
      },
      {
        id: 'sec1_u11_gram_q2',
        skill: 'Grammar',
        question: 'The Karnak Temple, __________ construction spanned over two thousand years, is an architectural wonder.',
        options: ['where', 'whose', 'who', 'that'],
        correctAnswer: 'B',
        explanation: '"Whose" expresses possession relating to the temple’s construction period.'
      },
      {
        id: 'sec1_u11_gram_q3',
        skill: 'Grammar',
        question: 'The Grand Egyptian Museum, __________ houses over one hundred thousand antiquities, will boost cultural tourism.',
        options: ['where', 'that', 'which', 'who'],
        correctAnswer: 'C',
        explanation: 'In non-defining relative clauses (between commas), "which" is mandatory for objects ("that" is ungrammatical).'
      },
      {
        id: 'sec1_u11_gram_q4',
        skill: 'Grammar',
        question: 'Aswan is the peaceful Nile city __________ tourists witness majestic Nubian architecture and hospitality.',
        options: ['which', 'that', 'whom', 'where'],
        correctAnswer: 'D',
        explanation: '"Where" refers to a place where an action/event takes place.'
      }
    ]
  },
  readingModule: {
    passageTitle: 'Guardians of Memory: Rescuing Nubia and Preserving Heritage',
    passage: `In the late 1950s, when Egypt resolved to construct the Aswan High Dam to regulate the Nile’s annual inundations and electrify the republic, an unforeseen cultural catastrophe loomed. The rising waters of Lake Nasser threatened to submerge twenty ancient temples and monumental rock shrines, including the peerless temples of Ramses II and Nefertari at Abu Simbel, as well as the sacred island of Philae.

Confronted with the irreversible annihilation of priceless global heritage, Egypt partnered with UNESCO in 1960 to launch the International Campaign to Save the Monuments of Nubia. Over a span of twenty years, an unprecedented coalition of fifty nations contributed funding, engineers, and master stonemasons. In an engineering miracle that astounded the world, archaeologists sliced the massive temples of Abu Simbel into individual blocks weighing up to thirty tons each, transported them two hundred meters inland and sixty-five meters higher up a sandstone cliff, and reassembled them inside artificial concrete domes.

The Nubian rescue campaign marked a watershed moment in human history. It established the revolutionary premise that certain cultural monuments belong not solely to the nation within whose borders they stand, but represent the collective patrimony of all humankind. This global solidarity gave birth to the 1972 World Heritage Convention, ensuring that humanity’s shared treasures are preserved for generations yet unborn.`,
    criticalThinkingFocus: 'Evaluating international solidarity, technological relocation of heritage, and the concept of universal human patrimony.',
    questions: [
      {
        id: 'sec1_u11_read_q1',
        skill: 'Reading',
        question: 'What imminent catastrophe prompted the launch of the UNESCO Nubia campaign in 1960?',
        options: [
          'The rising floodwaters of Lake Nasser behind the High Dam threatening to submerge ancient Nubian temples',
          'An active volcanic eruption on Elephantine Island',
          'A catastrophic earthquake destroying all buildings in Cairo',
          'An army of European pirates attempting to steal the pyramids'
        ],
        correctAnswer: 'A',
        explanation: 'Paragraph 1 explains the High Dam reservoir threatened to submerge twenty temples.'
      },
      {
        id: 'sec1_u11_read_q2',
        skill: 'Reading',
        question: 'How did international engineers and archaeologists salvage the colossal Abu Simbel temples?',
        options: [
          'By building a gigantic glass dome underwater and letting tourists dive',
          'By dismantling the temples into multi-ton stone blocks, lifting them 65 meters higher, and reconstructing them inside artificial hills',
          'By painting replicas of the temples on canvas and letting the originals drown',
          'By carrying the stone statues on wooden boats to Alexandria'
        ],
        correctAnswer: 'B',
        explanation: 'Paragraph 2 details slicing the temples into thirty-ton blocks and reassembling them 65 meters higher.'
      },
      {
        id: 'sec1_u11_read_q3',
        skill: 'Reading',
        question: 'What revolutionary philosophical premise emerged from the international Nubian rescue campaign?',
        options: [
          'Ancient monuments should be dismantled and sold to private collectors',
          'Dams should never be constructed for electrical energy generation',
          'Certain cultural monuments constitute the collective inheritance and responsibility of all humanity',
          'Only one nation should ever pay for historical conservation'
        ],
        correctAnswer: 'C',
        explanation: 'Paragraph 3 notes monuments belong not just to one nation, but represent the collective patrimony of humankind.'
      },
      {
        id: 'sec1_u11_read_q4',
        skill: 'Reading',
        question: 'What historic international framework was directly born out of the Nubian preservation effort?',
        options: [
          'The International Monetary Banking Accord',
          'The Olympic Games Charter',
          'The Universal Postal Convention',
          'The 1972 UNESCO World Heritage Convention'
        ],
        correctAnswer: 'D',
        explanation: 'Paragraph 3 explicitly states the campaign gave birth to the 1972 World Heritage Convention.'
      },
      {
        id: 'sec1_u11_read_q5',
        skill: 'Reading',
        question: 'What central value does the author celebrate throughout the passage?',
        options: [
          'International collaboration and technological ingenuity in the service of preserving human cultural legacy',
          'The superiority of modern concrete over ancient carved sandstone',
          'The necessity of prioritizing industrial factories over all historical art',
          'The inevitability of cultural destruction during modernization'
        ],
        correctAnswer: 'A',
        explanation: 'The passage celebrates global solidarity, engineering brilliance, and universal cultural preservation.'
      }
    ]
  },
  listeningModule: {
    audioTitle: 'Cultural Broadcast: The Living Art of Egyptian Tahtib and Aragoz',
    speakerRoles: 'Documentary Narrator (Karim) & Folklorist (Dr. Shahira)',
    transcript: `Narrator: Welcome to Heritage Alive. Today we explore Egypt’s intangible treasures with folklorist Dr. Shahira. Dr. Shahira, what makes non-monumental culture so vital?
Dr. Shahira: Stone temples are magnificent, Karim, but culture truly breathes through living practices passed from mouth to ear and hand to hand. Consider Tahtib—the ancient martial stick-dance depicted on the fifth-dynasty walls of Abusir. It is not merely performance; it teaches chivalry, respectful combat, and community cohesion.
Narrator: And what about traditional Aragoz puppet theater?
Dr. Shahira: Aragoz is the voice of the Egyptian street! With his iconic pointed conical hat and high-pitched copper whistle, the Aragoz puppet has satirized injustice, expressed folk wisdom, and entertained rural village squares for centuries.
Narrator: How has UNESCO recognized these arts?
Dr. Shahira: Both Tahtib and Aragoz are officially inscribed on the UNESCO Representative List of Intangible Cultural Heritage of Humanity, ensuring national preservation initiatives and youth apprenticeship workshops.`,
    durationApprox: '2 mins 20 secs',
    exercises: [
      {
        id: 'sec1_u11_listen_q1',
        skill: 'Listening',
        question: 'Where can the earliest historical depictions of Egyptian stick-dancing (Tahtib) be observed?',
        options: [
          'On the Fifth Dynasty tomb reliefs of Abusir',
          'Inside modern Cairo shopping malls',
          'On nineteenth-century postal stamps',
          'In ancient Roman amphitheaters in Spain'
        ],
        correctAnswer: 'A',
        explanation: 'Dr. Shahira noted Tahtib is depicted on the Fifth Dynasty walls of Abusir.'
      },
      {
        id: 'sec1_u11_listen_q2',
        skill: 'Listening',
        question: 'What moral values does the martial art of Tahtib instill in its practitioners?',
        options: [
          'Violent street fighting and property destruction',
          'Chivalry, ethical restraint, mutual respect, and social solidarity',
          'Refusing to cooperate with elder community members',
          'Earning money through underground gambling'
        ],
        correctAnswer: 'B',
        explanation: 'Dr. Shahira highlighted chivalry, respectful combat, and community cohesion.'
      },
      {
        id: 'sec1_u11_listen_q3',
        skill: 'Listening',
        question: 'What distinctive acoustic device creates the signature voice of the traditional Aragoz puppet?',
        options: [
          'An electronic voice synthesizer with Bluetooth',
          'A classical acoustic violin',
          'A traditional copper whistle held inside the puppeteer’s mouth',
          'A giant brass megaphone'
        ],
        correctAnswer: 'C',
        explanation: 'Dr. Shahira specified the puppeteer uses a high-pitched copper whistle.'
      },
      {
        id: 'sec1_u11_listen_q4',
        skill: 'Listening',
        question: 'What official international status did UNESCO confer upon both Tahtib and Aragoz?',
        options: [
          'Banning both arts from being performed in public',
          'Requiring spectators to pay fifty dollars per show',
          'Replacing live human puppeteers with automated androids',
          'Inscribing them on the Representative List of the Intangible Cultural Heritage of Humanity'
        ],
        correctAnswer: 'D',
        explanation: 'Both arts are inscribed on the UNESCO Intangible Cultural Heritage List.'
      }
    ]
  },
  unitExam: {
    examId: 'sec1_u11_exam',
    examTitle: 'Secondary 1 - Unit 11 Comprehensive Assessment: Finding Culture',
    examTitleAr: 'امتحان الوحدة الحادية عشرة الشامل - الصف الأول الثانوي',
    durationMinutes: 30,
    totalMarks: 32,
    questions: [
      {
        id: 'sec1_u11_ex_q1',
        skill: 'Vocabulary',
        question: 'Egypt possesses an extraordinary cultural __________ encompassing Pharaonic, Coptic, and Islamic treasures.',
        options: ['heritage', 'hesitation', 'orphanage', 'monopoly'],
        correctAnswer: 'A',
        explanation: '"Heritage" refers to inherited traditions, architecture, and cultural legacy.'
      },
      {
        id: 'sec1_u11_ex_q2',
        skill: 'Grammar',
        question: 'Dr. Zahi Hawass is the renowned archaeologist __________ spearheaded excavations in the Valley of the Golden Mummies.',
        options: ['which', 'who', 'where', 'whose'],
        correctAnswer: 'B',
        explanation: '"Who" is the relative pronoun used for human subjects.'
      },
      {
        id: 'sec1_u11_ex_q3',
        skill: 'Reading',
        question: 'The UNESCO rescue of Abu Simbel set a historic precedent by demonstrating that __________.',
        options: ['dams should never be constructed on rivers', 'ancient temples should always be painted in bright colors', 'great cultural landmarks represent the common patrimony and duty of all humanity', 'archaeologists should work without government funding'],
        correctAnswer: 'C',
        explanation: 'The campaign established that world heritage is the collective patrimony of humankind.'
      },
      {
        id: 'sec1_u11_ex_q4',
        skill: 'Listening',
        question: 'Traditional stick-dancing (Tahtib) is celebrated not merely as a dance but as an ancient art imparting __________.',
        options: ['military weapons manufacturing', 'swimming techniques across the Nile', 'mathematical navigation calculations', 'chivalry, respectful sportsmanship, and communal solidarity'],
        correctAnswer: 'D',
        explanation: 'Tahtib embodies chivalry, respect, and community bond.'
      },
      {
        id: 'sec1_u11_ex_q5',
        skill: 'Vocabulary',
        question: 'The Karnak Temple complex in Luxor is arguably the most imposing religious __________ of antiquity.',
        options: ['monument', 'hesitation', 'eviction', 'scandal'],
        correctAnswer: 'A',
        explanation: 'A "monument" is a structure of historical or commemorative importance.'
      },
      {
        id: 'sec1_u11_ex_q6',
        skill: 'Grammar',
        question: 'The Rosetta Stone, __________ decipherment unlocked ancient Egyptian hieroglyphs, is preserved in the British Museum.',
        options: ['which', 'whose', 'who', 'where'],
        correctAnswer: 'B',
        explanation: '"Whose decipherment" indicates possession linking the Rosetta Stone to its decoding.'
      },
      {
        id: 'sec1_u11_ex_q7',
        skill: 'Reading',
        question: 'How did civil engineers prevent the Abu Simbel temples from drowning beneath Lake Nasser?',
        options: ['By building an earthen dam around the statues', 'By draining Lake Nasser into the desert sands', 'By sawing the temples into multi-ton blocks and reassembling them on higher cliff ground', 'By transporting the temples on cargo ships to Europe'],
        correctAnswer: 'C',
        explanation: 'Engineers sliced the monuments into blocks and raised them 65 meters onto higher ground.'
      },
      {
        id: 'sec1_u11_ex_q8',
        skill: 'Listening',
        question: 'What acoustic mechanism characterizes the comic Aragoz puppet in Egyptian street theater?',
        options: ['An electronic loudspeaker', 'A wooden violin bow', 'A battery-powered drum', 'A traditional high-pitched copper whistle held in the puppeteer’s mouth'],
        correctAnswer: 'D',
        explanation: 'The signature sound is produced via a copper whistle in the puppeteer’s palate.'
      },
      {
        id: 'sec1_u11_ex_q9',
        skill: 'Vocabulary',
        question: 'Living oral traditions, folk epics, and traditional crafts are formally categorized as __________ cultural heritage.',
        options: ['intangible', 'hazardous', 'temporary', 'disposable'],
        correctAnswer: 'A',
        explanation: '"Intangible heritage" encompasses non-physical practices, expressions, and oral lore.'
      },
      {
        id: 'sec1_u11_ex_q10',
        skill: 'Grammar',
        question: 'The Grand Egyptian Museum, __________ construction cost over one billion dollars, will house fifty thousand artifacts.',
        options: ['where', 'whose', 'that', 'who'],
        correctAnswer: 'B',
        explanation: '"Whose construction" indicates possession in a non-defining relative clause.'
      },
      {
        id: 'sec1_u11_ex_q11',
        skill: 'Reading',
        question: 'The international coalition that rescued the Nubian temples in the 1960s ultimately led to __________.',
        options: ['the total cessation of international tourism to Egypt', 'the creation of private museums on Lake Nasser', 'the creation of the 1972 UNESCO World Heritage Convention', 'the closure of all archaeological faculties across Africa'],
        correctAnswer: 'C',
        explanation: 'The Nubia campaign inspired the creation of the 1972 World Heritage Convention.'
      },
      {
        id: 'sec1_u11_ex_q12',
        skill: 'Listening',
        question: 'Why did UNESCO inscribe Tahtib and Aragoz on the Representative List of Intangible Cultural Heritage?',
        options: ['To ban them from being performed in village squares', 'To ensure that performers pay licensing taxes to Paris', 'To replace them with European pantomime performances', 'To recognize their universal value and support national preservation initiatives'],
        correctAnswer: 'D',
        explanation: 'UNESCO inscription safeguards living heritage and stimulates training and documentation.'
      },
      {
        id: 'sec1_u11_ex_q13',
        skill: 'Vocabulary',
        question: 'The Avenue of Sphinxes in Luxor underwent a majestic __________ that restored its ancient ceremonial glory.',
        options: ['restoration', 'demolition', 'hesitation', 'eviction'],
        correctAnswer: 'A',
        explanation: '"Restoration" refers to the conservation and rebuilding of historic structures.'
      },
      {
        id: 'sec1_u11_ex_q14',
        skill: 'Grammar',
        question: 'Saqqara is the ancient necropolis __________ archaeologists unearthed dozens of gilded anthropoid coffins.',
        options: ['which', 'where', 'whom', 'that'],
        correctAnswer: 'B',
        explanation: '"Where" refers to a geographical location where actions/events occurred.'
      },
      {
        id: 'sec1_u11_ex_q15',
        skill: 'Reading',
        question: 'What does the term "patrimony" mean in the context of international heritage preservation?',
        options: ['An inheritance or legacy belonging to humanity as a whole', 'A monetary debt owed to foreign banks', 'A military fortification built on coastal borders', 'A tax levied on tourists visiting museums'],
        correctAnswer: 'A',
        explanation: 'Cultural patrimony refers to the collective spiritual and physical heritage of mankind.'
      },
      {
        id: 'sec1_u11_ex_q16',
        skill: 'Listening',
        question: 'How does intangible folklore like the Aragoz puppet play an active social role in communities?',
        options: ['By advertising commercial luxury cars', 'By forcing people to leave their village squares', 'By teaching foreign military marching drills', 'By reflecting folk wisdom, expressing popular humor, and critiquing social injustice'],
        correctAnswer: 'D',
        explanation: 'Aragoz serves as the satirical, wise voice of common citizens in public squares.'
      }
    ]
  }
};

// UNIT 12: Achieving Goals
export const sec1Unit12: UnitCurriculum = {
  stage: 'Secondary',
  grade: 10,
  gradeLabel: 'Secondary 1 - الصف الأول الثانوي',
  track: 'National / Baccalaureate',
  semester: 2,
  unitNumber: 12,
  unitTitle: 'Achieving Goals',
  unitTitleAr: 'تحقيق الأهداف (الإصرار والنجاح وإدارة الذات)',
  theme: 'Ambition, perseverance, time management, grit, SMART goals, verb patterns (gerund vs. infinitive)',
  vocabularyModule: {
    keyWords: [
      {
        word: 'perseverance',
        partOfSpeech: 'noun [uncountable]',
        meaningEn: 'Persistence in doing something despite difficulty or delay in achieving success; steadfastness.',
        meaningAr: 'المثابرة / الإصرار والعزيمة',
        collocation: 'unyielding perseverance',
        synonym: 'persistence / tenacity',
        antonym: 'quitting / apathy',
        exampleSentence: 'Through unyielding perseverance and nightly study, Mariam earned a scholarship to Cambridge.'
      },
      {
        word: 'determination',
        partOfSpeech: 'noun [uncountable]',
        meaningEn: 'The quality of being determined; firmness of purpose and will.',
        meaningAr: 'العزيمة القوية / الإصرار',
        collocation: 'sheer determination',
        synonym: 'resolve / fortitude',
        antonym: 'indecision / weakness',
        exampleSentence: 'With sheer determination, the Egyptian paralympic athletes captured gold medals in Paris.'
      },
      {
        word: 'procrastination',
        partOfSpeech: 'noun [uncountable]',
        meaningEn: 'The action of delaying or postponing something that needs to be done, often out of habit.',
        meaningAr: 'المماطلة والتسويف وتأجيل العمل',
        collocation: 'overcome chronic procrastination',
        synonym: 'delay / hesitance',
        antonym: 'prompt action / diligence',
        exampleSentence: 'Procrastination is the thief of time; students should complete difficult assignments first.'
      },
      {
        word: 'milestone',
        partOfSpeech: 'noun [countable]',
        meaningEn: 'A significant event or stage in the life, progress, or development of a person or project.',
        meaningAr: 'محطة هامة / إنجاز فارق',
        collocation: 'major milestone',
        synonym: 'landmark achievement',
        antonym: 'trivial setback',
        exampleSentence: 'Passing the Secondary 1 national examinations is a pivotal milestone in every student’s academic life.'
      },
      {
        word: 'prioritize',
        partOfSpeech: 'verb',
        meaningEn: 'Designate or treat something as being comparatively more important than other things.',
        meaningAr: 'يرتب الأولويات / يقدم الأهم',
        collocation: 'prioritize academic tasks',
        synonym: 'rank in importance',
        antonym: 'neglect / disregard',
        exampleSentence: 'Successful scholars learn to prioritize revision sessions over recreational video games.'
      },
      {
        word: 'grit',
        partOfSpeech: 'noun [uncountable]',
        meaningEn: 'Courage and resolve; strength of character combined with passion for long-term goals.',
        meaningAr: 'الصلابة الذهنية / قوة الشكيمة',
        collocation: 'demonstrate remarkable grit',
        synonym: 'toughness / mettle',
        antonym: 'fragility / cowardice',
        exampleSentence: 'Psychologists identify grit as the single most reliable predictor of lifelong achievement.'
      }
    ],
    collocations: [
      {
        phrase: 'set realistic goals',
        meaningAr: 'يضع أهدافاً واقعية وقابلة للتحقيق',
        example: 'Coaches advise trainees to set realistic goals to maintain consistent motivation.'
      },
      {
        phrase: 'reach a milestone',
        meaningAr: 'يصل إلى محطة إنجاز بارزة',
        example: 'Our startup company reached a major milestone by onboarding one hundred thousand users.'
      },
      {
        phrase: 'overcome adversity',
        meaningAr: 'يتغلب على الشدائد والمحن',
        example: 'Inspirational leaders inspire others by their exceptional ability to overcome adversity.'
      },
      {
        phrase: 'manage time efficiently',
        meaningAr: 'يدير الوقت بكفاءة وفاعلية',
        example: 'Students who manage time efficiently experience far less anxiety during final exams.'
      }
    ],
    idiomsAndExpressions: [
      {
        idiom: 'where there is a will, there is a way',
        meaningEn: 'If someone is determined to do something, they will always find a method to accomplish it.',
        meaningAr: 'من أراد استطاع / العزيمة تصنع المعجزات',
        example: 'Despite lacking internet at home, he walked to the library daily; where there is a will, there is a way.'
      },
      {
        idiom: 'burn the midnight oil',
        meaningEn: 'To read, work, or study late into the night.',
        meaningAr: 'يسهر ويكد في المذاكرة أو العمل حتى ساعة متأخرة',
        example: 'Secondary students burned the midnight oil revising their grammar rules before the test.'
      }
    ],
    exercises: [
      {
        id: 'sec1_u12_vocab_q1',
        skill: 'Vocabulary',
        question: 'Consistent __________ and resilience are far more predictive of academic success than raw IQ alone.',
        options: ['perseverance', 'hesitation', 'arrogance', 'orphanage'],
        correctAnswer: 'A',
        explanation: '"Perseverance" is steadfast continuance in a course of action despite obstacles.'
      },
      {
        id: 'sec1_u12_vocab_q2',
        skill: 'Vocabulary',
        question: 'Chronic __________ leads students to defer studying until the eve of the examination, causing intense panic.',
        options: ['generosity', 'procrastination', 'hygiene', 'compassion'],
        correctAnswer: 'B',
        explanation: '"Procrastination" is the habitual delay of necessary duties.'
      },
      {
        id: 'sec1_u12_vocab_q3',
        skill: 'Vocabulary',
        question: 'Graduating from secondary school with academic honors constitutes a defining __________ in a youth’s journey.',
        options: ['scandal', 'setback', 'milestone', 'collision'],
        correctAnswer: 'C',
        explanation: 'A "milestone" is a monumental developmental benchmark or accomplishment.'
      },
      {
        id: 'sec1_u12_vocab_q4',
        skill: 'Vocabulary',
        question: 'Before launching your study session, make sure to __________ assignments according to urgency and difficulty.',
        options: ['destroy', 'cancel', 'forget', 'prioritize'],
        correctAnswer: 'D',
        explanation: 'To "prioritize" means to evaluate and organize tasks in order of importance.'
      }
    ]
  },
  grammarModule: {
    ruleName: 'Verb Patterns: Verbs Followed by Gerund (-ing) vs. To + Infinitive & Meaning Shift Verbs',
    ruleNameAr: 'صيغ الأفعال (الأفعال المتبوعة بالمصدر أو اسم الفاعل وتغير المعنى)',
    explanationSummary: 'Verbs + Gerund (enjoy, avoid, mind, admit, suggest, keep, practise, deny). Verbs + To-Infinitive (hope, decide, promise, refuse, plan, agree, want, manage). Verbs with dual patterns and crucial semantic shifts: remember, forget, stop, regret, try.',
    detailedRules: [
      {
        title: 'Verbs Followed Strictly by Gerund (-ing)',
        explanation: 'Actions or general concepts: avoid, consider, delay, enjoy, finish, imagine, keep, mind, practice, suggest.',
        examples: [
          'Hossam avoids procrastinating on his biology research paper.',
          'They enjoy participating in academic debate competitions.'
        ]
      },
      {
        title: 'Verbs Followed Strictly by To + Infinitive',
        explanation: 'Future aspirations, decisions, intentions: agree, decide, expect, hope, manage, plan, promise, refuse, threaten, want.',
        examples: [
          'She decided to apply for the national mathematics olympiad.',
          'We managed to submit the project before the midnight deadline.'
        ]
      },
      {
        title: 'Crucial Semantic Shifts: Stop, Remember, Forget, Regret',
        explanation: 'Stop + to-inf: pause an activity IN ORDER TO do another. Stop + -ing: terminate the activity entirely. Remember + to-inf: remember duties before doing them. Remember + -ing: recall past memories.',
        examples: [
          'On his way home, Dr. Tarek stopped to buy an English newspaper (purpose).',
          'He stopped smoking five years ago to protect his cardiovascular health (abandoned habit).',
          'Please remember to lock the laboratory door tonight (duty).',
          'I distinctly remember visiting the Pyramids when I was eight years old (past memory).'
        ]
      }
    ],
    exercises: [
      {
        id: 'sec1_u12_gram_q1',
        skill: 'Grammar',
        question: 'To avoid fatigue, students should avoid __________ late into the night before important examinations.',
        options: ['studying', 'to study', 'study', 'studied'],
        correctAnswer: 'A',
        explanation: 'The verb "avoid" is strictly followed by the gerund (-ing form: studying).'
      },
      {
        id: 'sec1_u12_gram_q2',
        skill: 'Grammar',
        question: 'After extensive contemplation, Youssef decided __________ computer science at Cairo University.',
        options: ['studying', 'to study', 'study', 'studied'],
        correctAnswer: 'B',
        explanation: '"Decide" requires the to-infinitive (to study).'
      },
      {
        id: 'sec1_u12_gram_q3',
        skill: 'Grammar',
        question: 'While cycling through the park, Tamer stopped __________ a lost kitten trapped in the bushes.',
        options: ['helping', 'helped', 'to help', 'help'],
        correctAnswer: 'C',
        explanation: '"Stop + to + infinitive" indicates pausing an ongoing action in order to perform another purpose.'
      },
      {
        id: 'sec1_u12_gram_q4',
        skill: 'Grammar',
        question: 'I vividly remember __________ the majestic sunrise over Mount Sinai during our school trip last year.',
        options: ['to watch', 'watch', 'watched', 'watching'],
        correctAnswer: 'D',
        explanation: '"Remember + gerund" (watching) refers to recalling a vivid experiential memory from the past.'
      }
    ]
  },
  readingModule: {
    passageTitle: 'The Architecture of Achievement: Grit, Habit, and Growth Mindset',
    passage: `In contemporary psychology, the quest to identify the core determinants of human triumph has undergone a paradigm shift. For decades, conventional wisdom held that innate intelligence, gifted genetic talent, or privileged socioeconomic status were the indisputable keys to success. However, pioneering empirical studies spearheaded by Dr. Angela Duckworth have demonstrated that intellectual ability is a poor predictor of ultimate life outcomes. Instead, the paramount determinant of enduring accomplishment is a psychological construct termed "grit."

Grit is defined as perseverance and sustained passion for long-term goals. It entails viewing life as an endurance marathon rather than a sprint. Individuals endowed with grit do not abandon their aspirations when confronted with setbacks, failed examinations, or public skepticism. Rather, they perceive failure not as an indelible judgment of their worth, but as formative feedback necessary for growth.

Closely intertwined with grit is Stanford psychologist Carol Dweck’s concept of the "growth mindset." Individuals with a fixed mindset believe that cognitive ability is static and unalterable. In contrast, those possessing a growth mindset recognize that neural pathways expand and cognitive capacities sharpen through deliberate effort, rigorous coaching, and strategic iteration. When students transition from saying "I cannot do this" to "I cannot do this yet," they unlock the latent reservoirs of human potential and build the habits that turn ambitious dreams into reality.`,
    criticalThinkingFocus: 'Deconstructing grit, growth mindset vs. fixed mindset, and deliberate practice as engines of success.',
    questions: [
      {
        id: 'sec1_u12_read_q1',
        skill: 'Reading',
        question: 'What revolutionary finding did contemporary psychological research establish regarding human achievement?',
        options: [
          'Grit and sustained perseverance are far superior predictors of lifelong success than innate intelligence alone',
          'Only individuals born into aristocratic families can achieve success',
          'Talent never requires any effort or practice to flourish',
          'Studying books actually damages the human brain'
        ],
        correctAnswer: 'A',
        explanation: 'Paragraph 1 demonstrates that intellectual ability is a poor predictor compared to grit.'
      },
      {
        id: 'sec1_u12_read_q2',
        skill: 'Reading',
        question: 'How do individuals possessing "grit" respond when confronted with inevitable life setbacks?',
        options: [
          'They immediately abandon their dreams and blame others',
          'They interpret setbacks as formative learning feedback rather than permanent judgments of capability',
          'They complain on social media without taking action',
          'They stop studying permanently'
        ],
        correctAnswer: 'B',
        explanation: 'Paragraph 2 notes gritty individuals view failure as formative feedback necessary for growth.'
      },
      {
        id: 'sec1_u12_read_q3',
        skill: 'Reading',
        question: 'What distinction separates a "growth mindset" from a "fixed mindset" according to Dr. Carol Dweck?',
        options: [
          'Fixed mindsets are found only in athletes, while growth mindsets belong to doctors',
          'There is no functional distinction between the two concepts',
          'Fixed mindsets believe intelligence is static, whereas growth mindsets view capability as expandible through effort',
          'Growth mindsets believe humans should never sleep'
        ],
        correctAnswer: 'C',
        explanation: 'Paragraph 3 defines fixed mindset as believing ability is static, while growth mindset embraces expansion through effort.'
      },
      {
        id: 'sec1_u12_read_q4',
        skill: 'Reading',
        question: 'How does the linguistic addition of the word "yet" transform student self-perception?',
        options: [
          'It signals that failure is eternal and unchangeable',
          'It makes examination questions disappear',
          'It excuses students from doing homework',
          'It shifts current difficulty into a temporary, surmountable stage on the continuum of mastery'
        ],
        correctAnswer: 'D',
        explanation: 'Saying "not yet" frames difficulty as a temporary phase before eventual mastery.'
      },
      {
        id: 'sec1_u12_read_q5',
        skill: 'Reading',
        question: 'What core message does the passage advocate for secondary school students?',
        options: [
          'Cultivating deliberate habits, perseverance, and a growth mindset unlocks authentic academic and personal potential',
          'Students should only study subjects that require zero mental exertion',
          'Intelligence is unalterably fixed at birth and cannot be cultivated',
          'Success depends purely on random good fortune'
        ],
        correctAnswer: 'A',
        explanation: 'The conclusion emphasizes that habits, grit, and growth mindsets transform ambitious dreams into reality.'
      }
    ]
  },
  listeningModule: {
    audioTitle: 'Masterclass: Implementing the SMART Goal Framework',
    speakerRoles: 'Success Coach (Dr. Walid) & Student Mentee (Nour)',
    transcript: `Coach: Good morning Nour. In our academic coaching session today, we are converting vague intentions into actionable SMART goals. How do you currently set your goals?
Mentee: Well, Dr. Walid, I usually just tell myself: “I want to do well in English this term.”
Coach: That is an admirable aspiration, but it lacks operational precision. SMART stands for Specific, Measurable, Achievable, Relevant, and Time-bound. Let’s calibrate your goal together.
Mentee: How would I make “doing well in English” specific and measurable?
Coach: You could formulate it as: “I will score 90% or higher on the Secondary 1 Term 2 final English exam by completing thirty minutes of daily vocabulary flashcards and two practice mock exams every weekend for the next ten weeks.”
Mentee: Wow! Now I know exactly what actions to execute every single day, and I can objectively measure my progress.
Coach: Exactly. Precision in goal design eliminates ambiguity and defeats procrastination.`,
    durationApprox: '2 mins 15 secs',
    exercises: [
      {
        id: 'sec1_u12_listen_q1',
        skill: 'Listening',
        question: 'What structural defect characterized Nour’s initial academic aspiration according to Dr. Walid?',
        options: [
          'It was overly vague, lacked actionable precision, and provided no measurable roadmap',
          'It was written in the French language',
          'It demanded sixteen hours of continuous daily revision',
          'It required buying ten expensive laptops'
        ],
        correctAnswer: 'A',
        explanation: 'Dr. Walid noted that "doing well" is admirable but lacks operational precision.'
      },
      {
        id: 'sec1_u12_listen_q2',
        skill: 'Listening',
        question: 'What does the acronym SMART stand for in professional goal-setting methodology?',
        options: [
          'Silent, Moderate, Average, Rapid, Temporary',
          'Specific, Measurable, Achievable, Relevant, and Time-bound',
          'Strict, Military, Absolute, Rigid, Tactical',
          'Scientific, Modern, Automated, Robotic, Technical'
        ],
        correctAnswer: 'B',
        explanation: 'SMART stands for Specific, Measurable, Achievable, Relevant, and Time-bound.'
      },
      {
        id: 'sec1_u12_listen_q3',
        skill: 'Listening',
        question: 'What concrete measurable daily habit did Dr. Walid integrate into Nour’s calibrated goal?',
        options: [
          'Running five kilometers before dawn',
          'Watching four hours of television comedy',
          'Dedicate thirty minutes daily to vocabulary flashcard practice alongside weekend mock exams',
          'Refusing to speak Arabic for three months'
        ],
        correctAnswer: 'C',
        explanation: 'The coach formulated 30 minutes of daily vocabulary flashcards plus two weekly mock exams.'
      },
      {
        id: 'sec1_u12_listen_q4',
        skill: 'Listening',
        question: 'Why does precision in goal formulation systematically defeat procrastination?',
        options: [
          'It automatically pays for private tutoring sessions',
          'It forces teachers to cancel all surprise classroom quizzes',
          'It allows students to skip all homework',
          'It eliminates ambiguity by establishing crystal-clear, actionable daily steps'
        ],
        correctAnswer: 'D',
        explanation: 'Dr. Walid explained that precision eliminates ambiguity and defeats procrastination.'
      }
    ]
  },
  unitExam: {
    examId: 'sec1_u12_exam',
    examTitle: 'Secondary 1 - Unit 12 Comprehensive Assessment: Achieving Goals',
    examTitleAr: 'امتحان الوحدة الثانية عشرة الشامل - الصف الأول الثانوي',
    durationMinutes: 30,
    totalMarks: 32,
    questions: [
      {
        id: 'sec1_u12_ex_q1',
        skill: 'Vocabulary',
        question: 'Through unwavering __________ and nocturnal study, Ahmed triumphed over adversity and graduated top of his class.',
        options: ['perseverance', 'hesitation', 'arrogance', 'orphanage'],
        correctAnswer: 'A',
        explanation: '"Perseverance" is steadfast continuance toward goals.'
      },
      {
        id: 'sec1_u12_ex_q2',
        skill: 'Grammar',
        question: 'Salma managed __________ all her chemistry revision cards before the deadline arrived.',
        options: ['finishing', 'to finish', 'finish', 'finished'],
        correctAnswer: 'B',
        explanation: '"Manage" takes the to-infinitive (managed to finish).'
      },
      {
        id: 'sec1_u12_ex_q3',
        skill: 'Reading',
        question: 'Why does psychologist Angela Duckworth identify "grit" as paramount for life triumph?',
        options: ['Because grit allows people to win lotteries effortlessly', 'Because grit requires zero physical stamina or patience', 'Because passion and perseverance enable individuals to sustain long-term commitment through inevitable setbacks', 'Because grit is only possessed by Olympic marathon runners'],
        correctAnswer: 'C',
        explanation: 'Grit maintains commitment and passion across long-term goals despite setbacks.'
      },
      {
        id: 'sec1_u12_ex_q4',
        skill: 'Listening',
        question: 'In the SMART framework, a goal must be "Time-bound," which means that it must have __________.',
        options: ['no relation to clocks or calendars', 'an expiration date set fifty years in the future', 'the ability to stop time permanently', 'a clear, established deadline to spur timely action and accountability'],
        correctAnswer: 'D',
        explanation: 'Time-bound means anchored to a concrete target deadline.'
      },
      {
        id: 'sec1_u12_ex_q5',
        skill: 'Vocabulary',
        question: 'Psychologists define __________ as the chronic, self-defeating habit of postponing necessary tasks.',
        options: ['procrastination', 'generosity', 'hygiene', 'compassion'],
        correctAnswer: 'A',
        explanation: '"Procrastination" is the deferral of important obligations.'
      },
      {
        id: 'sec1_u12_ex_q6',
        skill: 'Grammar',
        question: 'Do you mind __________ the window? The chilly night wind is blowing into the study hall.',
        options: ['to close', 'closing', 'close', 'closed'],
        correctAnswer: 'B',
        explanation: '"Mind" is followed by the gerund (closing).'
      },
      {
        id: 'sec1_u12_ex_q7',
        skill: 'Reading',
        question: 'How do individuals who embody a "growth mindset" perceive mistakes and difficulties?',
        options: ['As proof that they are genetically incapable of learning', 'As reasons to drop out of school immediately', 'As formative developmental feedback that strengthens neural networks', 'As punishments inflicted by cruel teachers'],
        correctAnswer: 'C',
        explanation: 'A growth mindset treats difficulties as opportunities for neural expansion and mastery.'
      },
      {
        id: 'sec1_u12_ex_q8',
        skill: 'Listening',
        question: 'Why did Dr. Walid criticize Nour’s original goal: “I want to do well in English”?',
        options: ['Because studying English is unimportant', 'Because Nour had already graduated from university', 'Because Dr. Walid only teaches mathematics', 'Because it lacked operational precision, measurable benchmarks, and a timeline'],
        correctAnswer: 'D',
        explanation: 'Vague aspirations lack the operational clarity needed for execution.'
      },
      {
        id: 'sec1_u12_ex_q9',
        skill: 'Vocabulary',
        question: 'Achieving a score of 95% in the secondary exams is an unforgettable academic __________.',
        options: ['milestone', 'collision', 'hesitation', 'setback'],
        correctAnswer: 'A',
        explanation: 'A "milestone" is a momentous achievement.'
      },
      {
        id: 'sec1_u12_ex_q10',
        skill: 'Grammar',
        question: 'Don’t forget __________ off the computer before leaving the school computer laboratory.',
        options: ['turn', 'to turn', 'turning', 'turned'],
        correctAnswer: 'B',
        explanation: '"Forget + to-infinitive" refers to remembering a prospective duty before doing it.'
      },
      {
        id: 'sec1_u12_ex_q11',
        skill: 'Reading',
        question: 'The transformation from “I can’t do this” to “I can’t do this yet” fosters resilience by __________.',
        options: ['eliminating the need to ever study again', 'guaranteeing that students will never fail a quiz', 'framing current struggle as a transitional stage on the pathway to eventual competence', 'making exams three hours shorter'],
        correctAnswer: 'C',
        explanation: 'The word "yet" validates struggle as a temporary precursor to mastery.'
      },
      {
        id: 'sec1_u12_ex_q12',
        skill: 'Listening',
        question: 'What immediate benefit did Nour identify once her goal was calibrated into SMART metrics?',
        options: ['She could sleep for twelve hours each day', 'Her parents gave her a cash prize immediately', 'She no longer had to take exams', 'She knew precisely what daily actions to execute and could measure progress objectively'],
        correctAnswer: 'D',
        explanation: 'SMART goals provide clear daily execution steps and objective benchmarks.'
      },
      {
        id: 'sec1_u12_ex_q13',
        skill: 'Vocabulary',
        question: 'Organized scholars always __________ their study sessions according to subject difficulty and upcoming deadlines.',
        options: ['prioritize', 'cancel', 'destroy', 'forget'],
        correctAnswer: 'A',
        explanation: 'To "prioritize" is to rank tasks by order of importance.'
      },
      {
        id: 'sec1_u12_ex_q14',
        skill: 'Grammar',
        question: 'Hany stopped __________ with his pen when the examiner requested absolute silence.',
        options: ['to click', 'clicking', 'clicked', 'click'],
        correctAnswer: 'B',
        explanation: '"Stop + gerund" (clicking) means halting and ceasing an ongoing action completely.'
      },
      {
        id: 'sec1_u12_ex_q15',
        skill: 'Reading',
        question: 'What is the overarching conclusion articulated by contemporary psychologists regarding human triumph?',
        options: ['Genetics is the sole factor that determines human happiness', 'Hard work has zero impact on learning', 'Deliberate practice, enduring perseverance, and a growth mindset unlock latent reservoirs of capability', 'Students should never set ambitious goals for themselves'],
        correctAnswer: 'C',
        explanation: 'Perseverance, deliberate practice, and a growth mindset unlock human potential.'
      },
      {
        id: 'sec1_u12_ex_q16',
        skill: 'Listening',
        question: 'What is the ultimate psychological benefit of converting vague aspirations into SMART goals?',
        options: ['It guarantees instantaneous fame without work', 'It replaces all teachers with smartphones', 'It forces schools to eliminate all homework', 'It eliminates debilitating ambiguity and equips learners with disciplined daily execution'],
        correctAnswer: 'D',
        explanation: 'SMART goals eliminate ambiguity and replace paralysis with disciplined execution.'
      }
    ]
  }
};

// Term 2 Comprehensive Cumulative Revision Exam (Units 7 - 12)
// Strict balance: Exactly 4 A, 4 B, 4 C, 4 D (25% each)
export const sec1Term2RevisionExam: UnitExam = {
  examId: 'sec1_term2_final_revision_exam',
  examTitle: 'Secondary 1 - Term 2 Comprehensive Final Assessment (Units 7 - 12)',
  examTitleAr: 'امتحان نهاية الفصل الدراسي الثاني الشامل - الصف الأول الثانوي',
  durationMinutes: 45,
  totalMarks: 40,
  questions: [
    {
      id: 'sec1_t2_rev_q1',
      skill: 'Vocabulary',
      question: 'Maintaining meticulous domestic __________ minimizes microbial contamination in kitchens and bathrooms.',
      options: ['hygiene', 'arrogance', 'poverty', 'hesitation'],
      correctAnswer: 'A',
      explanation: '"Hygiene" encompasses cleanliness practices that preserve health.'
    },
    {
      id: 'sec1_t2_rev_q2',
      skill: 'Grammar',
      question: 'If you heat copper to its melting point, it __________ into liquid state.',
      options: ['turned', 'turns', 'would turn', 'had turned'],
      correctAnswer: 'B',
      explanation: 'Zero conditional represents invariable scientific physical truths.'
    },
    {
      id: 'sec1_t2_rev_q3',
      skill: 'Reading',
      question: 'The UNESCO international campaign to salvage the temples of Nubia in 1960 affirmed that __________.',
      options: ['dams should never be constructed for electricity', 'ancient temples should be relocated to European capitals', 'exceptional cultural monuments represent the common patrimony and collective duty of all humankind', 'archaeology has no relevance to modern civilization'],
      correctAnswer: 'C',
      explanation: 'The Nubia rescue demonstrated that universal cultural heritage belongs to all humanity.'
    },
    {
      id: 'sec1_t2_rev_q4',
      skill: 'Listening',
      question: 'In the Heimlich maneuver, the rescuer’s fist is positioned just above the navel and thrusts are directed __________.',
      options: ['downward toward the floor', 'outward toward the sides', 'in horizontal circles', 'inward and upward with quick, forceful motion'],
      correctAnswer: 'D',
      explanation: 'Abdominal thrusts must be applied inward and upward to dislodge obstructions.'
    },
    {
      id: 'sec1_t2_rev_q5',
      skill: 'Vocabulary',
      question: 'Autonomous vehicles utilize satellite __________ to navigate city roads with centimetre-level precision.',
      options: ['GPS', 'CPR', 'ATM', 'PIN'],
      correctAnswer: 'A',
      explanation: 'Global Positioning System (GPS) provides geospatial navigation.'
    },
    {
      id: 'sec1_t2_rev_q6',
      skill: 'Grammar',
      question: 'By the time the rescue team reached the stranded desert hikers, they __________ all their emergency flares.',
      options: ['fired', 'had fired', 'have fired', 'are firing'],
      correctAnswer: 'B',
      explanation: 'Past Perfect (had fired) expresses the action completed prior to the rescue team’s arrival.'
    },
    {
      id: 'sec1_t2_rev_q7',
      skill: 'Reading',
      question: 'Why do modern employers place extraordinary value on transferable "soft skills" alongside technical expertise?',
      options: ['Because soft skills allow companies to pay lower salaries', 'Because computers refuse to operate in modern offices', 'Because routine technical tasks are increasingly automated by AI, making empathy and agility uniquely human', 'Because soft skills can be memorized in ten minutes'],
      correctAnswer: 'C',
      explanation: 'Automation shifts priority toward human creativity, adaptability, and emotional intelligence.'
    },
    {
      id: 'sec1_t2_rev_q8',
      skill: 'Listening',
      question: 'In an autonomous shuttle, the multi-modal sensor fusion system processes data in 20 milliseconds, which is __________.',
      options: ['slower than a bicycle rider', 'identical to ancient mechanical clocks', 'too slow to avoid collisions', 'five times faster than human reflex speed'],
      correctAnswer: 'D',
      explanation: 'Onboard processors act 5x faster than typical human reaction times.'
    },
    {
      id: 'sec1_t2_rev_q9',
      skill: 'Vocabulary',
      question: 'Passing the Secondary 1 national examinations is a momentous developmental __________ in a scholar’s path.',
      options: ['milestone', 'collision', 'hesitation', 'setback'],
      correctAnswer: 'A',
      explanation: 'A "milestone" is a landmark achievement.'
    },
    {
      id: 'sec1_t2_rev_q10',
      skill: 'Grammar',
      question: 'The interviewer asked Zeinab if she __________ comfortable communicating in multicultural teams.',
      options: ['is', 'was', 'will be', 'has been'],
      correctAnswer: 'B',
      explanation: 'In indirect questions introduced by "asked", present "is" backshifts to "was".'
    },
    {
      id: 'sec1_t2_rev_q11',
      skill: 'Reading',
      question: 'According to empirical psychology, why is "grit" the most reliable predictor of enduring life achievement?',
      options: ['Because it guarantees immediate wealth without effort', 'Because gritty individuals never experience any failures', 'Because perseverance and long-term passion enable individuals to overcome inevitable setbacks and sustain focus', 'Because grit is only possessed by astronauts'],
      correctAnswer: 'C',
      explanation: 'Grit sustains dedication and resilience through long marathons toward significant goals.'
    },
    {
      id: 'sec1_t2_rev_q12',
      skill: 'Listening',
      question: 'What acoustic mechanism gives the traditional Egyptian Aragoz puppet its iconic high-pitched comedic voice?',
      options: ['A digital microphone hidden under the stage', 'A small wooden drum', 'An electrical voice synthesizer', 'A traditional copper whistle held inside the puppeteer’s mouth'],
      correctAnswer: 'D',
      explanation: 'The copper whistle creates the characteristic voice of Aragoz.'
    },
    {
      id: 'sec1_t2_rev_q13',
      skill: 'Vocabulary',
      question: 'Living folklore, artisanal crafts, and oral epics are recognized by UNESCO as __________ cultural heritage.',
      options: ['intangible', 'disposable', 'hazardous', 'temporary'],
      correctAnswer: 'A',
      explanation: '"Intangible heritage" represents living cultural traditions and non-physical practices.'
    },
    {
      id: 'sec1_t2_rev_q14',
      skill: 'Grammar',
      question: 'Champollion was the French scholar __________ brilliant linguistic insight deciphered Egyptian hieroglyphics.',
      options: ['who', 'whose', 'which', 'where'],
      correctAnswer: 'B',
      explanation: '"Whose brilliant linguistic insight" indicates possessive relationship.'
    },
    {
      id: 'sec1_t2_rev_q15',
      skill: 'Reading',
      question: 'How does framing self-talk from “I can’t do this” to “I can’t do this yet” cultivate a growth mindset?',
      options: ['It proves the task is fundamentally impossible', 'It excuses students from attempting difficult examinations', 'It transforms perceived failure into a temporary surmountable phase on the pathway to mastery', 'It eliminates the need for further coaching'],
      correctAnswer: 'C',
      explanation: 'Adding "yet" turns current limitation into an incremental stage of learning.'
    },
    {
      id: 'sec1_t2_rev_q16',
      skill: 'Listening',
      question: 'In the SMART framework, converting vague intentions into actionable goals systematically overcomes __________.',
      options: ['the need for examination grading', 'the need to learn vocabulary', 'all university tuition costs', 'paralyzing ambiguity and chronic procrastination'],
      correctAnswer: 'D',
      explanation: 'SMART goals eliminate vagueness, replacing procrastination with clear execution.'
    }
  ]
};

// All Secondary 1 Term 2 Units (Units 7 - 12)
export const secondary1Term2Units: UnitCurriculum[] = [
  sec1Unit7,
  sec1Unit8,
  sec1Unit9,
  sec1Unit10,
  sec1Unit11,
  sec1Unit12
];
