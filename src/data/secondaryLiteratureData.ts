import { LiteratureChapterModule } from '../types/curriculum.ts';

// ------------------------------------------------------------------------------------------------
// 1. SECONDARY 1 (GRADE 10): THE OLD MAN AND THE SEA by Ernest Hemingway
// Chapters 1 to 6 (Term 1)
// Themes: Resilience, Pride vs. Humility, Manhood, Friendship, Respect for Nature
// ------------------------------------------------------------------------------------------------
export const oldManAndTheSeaChapters: LiteratureChapterModule[] = [
  // Chapter 1
  {
    workTitle: 'The Old Man and the Sea',
    workTitleAr: 'رواية العجوز والبحر',
    author: 'Ernest Hemingway',
    chapterNumber: 1,
    chapterTitle: 'Chapter 1: Santiago’s Solitude & Manolin’s Unwavering Loyalty',
    chapterTitleAr: 'الفصل الأول: عزلة سانتياجو ووفاء الصبي مانولين',
    keyVocabulary: [
      { word: 'salao', pos: 'adj.', meaningEn: 'The worst form of unlucky in Spanish Cuban dialect.', meaningAr: 'أسوأ درجات النحس وسوء الحظ', contextSentence: 'The boy’s parents forbade him from sailing with Santiago because the old man was salao.' },
      { word: 'skiff', pos: 'n.', meaningEn: 'A shallow, flat-bottomed open wooden fishing boat.', meaningAr: 'قارب صيد خشبي صغير ومكشوف', contextSentence: 'Santiago sailed his battered skiff alone into the deep Gulf Stream every morning.' },
      { word: 'gaff', pos: 'n.', meaningEn: 'A sharp iron hook on a pole for landing large fish.', meaningAr: 'مخطاف حديدي لرفع الأسماك الضخمة', contextSentence: 'Manolin helped carry the heavy gaff and harpoon up the hill to the old man’s shack.' },
      { word: 'shack', pos: 'n.', meaningEn: 'A roughly built small wooden hut or cabin.', meaningAr: 'كوخ خشبي بسيط ومتواضع', contextSentence: 'Inside the humble shack, Santiago had only a bed, a table, and sacred religious pictures.' },
      { word: 'benevolent', pos: 'adj.', meaningEn: 'Well-meaning, kindly, and full of goodwill.', meaningAr: 'عطوف ومحب للخير وودود', contextSentence: 'Santiago’s eyes remained cheerful, undefeated, and benevolent despite eighty-four days of failure.' },
      { word: 'resolution', pos: 'n.', meaningEn: 'Firm determination to accomplish a chosen purpose.', meaningAr: 'عزيمة راسخة وإصرار لا يلين', contextSentence: 'His deep resolution gave him strength when ordinary fishermen would have surrendered.' },
      { word: 'humility', pos: 'n.', meaningEn: 'A modest or low view of one’s own importance; lack of false pride.', meaningAr: 'التواضع والزهد الأصيل', contextSentence: 'Santiago attained true humility without losing his self-respect or fisherman’s pride.' },
      { word: 'furled', pos: 'adj.', meaningEn: 'Neatly rolled up and secured to a mast or yardarm.', meaningAr: 'شراع مطوي ومربوط بالسارية', contextSentence: 'The furled sail looked like the banner of permanent defeat patched with flour sacks.' }
    ],
    synopsis: 'Eighty-four days have passed without Santiago catching a single fish. Deemed "salao" (the worst form of bad luck) by his village, he is forced to sail alone after young Manolin’s parents order the boy to join a more prosperous boat. Despite this agonizing streak, Manolin remains devoted to the old man, bringing him fresh bait, coffee, and baseball news about the great Joe DiMaggio. Santiago refuses to surrender to despair; he maintains dignified humility and prepares his lines meticulously for the eighty-fifth day, believing his luck is bound to change.',
    synopsisAr: 'مرت أربعة وثمانون يوماً دون أن يصطاد العجوز سانتياجو سمكة واحدة، فاعتبره أهل القرية مصاباً بأشد درجات النحس. منعه والدا الصبي مانولين من مرافقته، لكن الصبي ظل وفياً لأستاذه، يقدم له الطعم والطعام ويحدثه عن بطل البيسبول جو ديماجيو. يتمسك سانتياجو بالأمل والتواضع دون أن يفقد كرامته، ويجهز خيوطه بدقة لليوم الخامس والثمانين.',
    centralThemes: [
      { theme: 'Loyalty & Mentorship', themeAr: 'الوفاء والعلاقة الإنسانية بين الأستاذ والتلميذ', explanation: 'Manolin represents pure filial love and unwavering faith, refusing to let the old man’s bad luck diminish his reverence.' },
      { theme: 'Dignity in Defeat', themeAr: 'الكرامة والصمود في مواجهة العثرات', explanation: 'Santiago’s patched sails resemble a flag of defeat, yet his cheerful eyes remain undefeated.' }
    ],
    hotsQuestions: [
      {
        id: 'sec1_lit_ch1_q1',
        question: '“Everything about him was old except his eyes and they were the same color as the sea and were cheerful and undefeated.” Analyze this quotation to explain how Santiago’s physical decay contrasts with his spiritual resilience.',
        questionAr: 'حلل المقولة الشهيرة مبيناً التناقض بين شيخوخة جسد سانتياجو وصلابة روحه وعزيمته التي لا تُقهر.',
        focusTheme: 'Spiritual Resilience vs. Physical Aging',
        quotation: 'Everything about him was old except his eyes and they were the same color as the sea and were cheerful and undefeated.',
        modelAnswer: 'Hemingway deliberately contrasts Santiago’s scarred, weathered body with his vibrant eyes. While eighty-four days of drought and decades of labor have physically aged him, his sea-blue eyes symbolize boundless spiritual hope, endurance, and an eternal connection with nature. Unlike defeated men, Santiago draws inner fortitude from acceptance of hardship without bitterness.',
        modelAnswerAr: 'يُبرز همنجواي التباين بين الجسد المنهك والعيون الحية التي تعكس لون البحر؛ فالجسد يخضع لعوامل الزمن، لكن الروح تظل متصلة بالطبيعة وممتلئة بالأمل والتصميم الذي لا ينكسر.',
        rubricCriteria: ['Contrast between physical scars and spiritual youth', 'Symbolism of the sea-colored eyes', 'Explanation of undefeated perseverance']
      },
      {
        id: 'sec1_lit_ch1_q2',
        question: 'Why did Santiago consider humility not shameful? How does true humility differ from weakness or loss of pride according to the narrative?',
        questionAr: 'لماذا لم يجد سانتياجو في التواضع أي عار؟ وكيف يختلف التواضع الحقيقي عن الضعف أو فقدان الكبرياء؟',
        focusTheme: 'Humility vs. False Pride',
        modelAnswer: 'Santiago recognizes that authentic humility carries no loss of true dignity. It simply means understanding one’s place in the vast universe and facing reality without vanity or arrogance. Accepting help from Manolin is not weakness; it is an affirmation of mutual love and respect.',
        modelAnswerAr: 'التواضع الحقيقي عند سانتياجو يعني الإدراك الواقعي لمكانة الإنسان في الكون دون غرور؛ قبول مساعدة الصبي ليس استسلاماً بل تقديراً لعلاقة المحبة والاحترام.',
        rubricCriteria: ['Clear definition of humility in Hemingway’s philosophy', 'Distinction between humility and humiliation', 'Role of Manolin’s care']
      }
    ]
  },

  // Chapter 2
  {
    workTitle: 'The Old Man and the Sea',
    workTitleAr: 'رواية العجوز والبحر',
    author: 'Ernest Hemingway',
    chapterNumber: 2,
    chapterTitle: 'Chapter 2: Rowing into the Deep Gulf Stream at Dawn',
    chapterTitleAr: 'الفصل الثاني: الإبحار وحيداً في مياه تيار الخليج العميقة عند الفجر',
    keyVocabulary: [
      { word: 'phosphorescence', pos: 'n.', meaningEn: 'Light emitted by living organisms in the sea without heat.', meaningAr: 'الوميض والتلألؤ الفسفوري في مياه البحر', contextSentence: 'The phosphorescence of Gulf weed glowed softly as Santiago rowed in the predawn dark.' },
      { word: 'fathom', pos: 'n.', meaningEn: 'A unit of length equal to six feet (approx. 1.8 m) used in water depth measurement.', meaningAr: 'قامة (وحدة قياس عمق البحر = 1.8 متر)', contextSentence: 'He lowered his four lines precisely to depths of forty, seventy-five, one hundred, and one hundred and twenty-five fathoms.' },
      { word: 'drift', pos: 'v.', meaningEn: 'To be carried along by currents of water or air slowly.', meaningAr: 'ينجرف وينساب مع تيار الماء', contextSentence: 'Santiago kept his lines straight and true so they would drift exactly where the giant fish fed.' },
      { word: 'la mar', pos: 'noun phrase', meaningEn: 'The sea considered feminine and affectionate in Spanish.', meaningAr: 'البحر المؤنث المحبوب الذي يهب الخير والعطف', contextSentence: 'Santiago always thought of the ocean as la mar, something that gave or withheld great favors.' },
      { word: 'buoyant', pos: 'adj.', meaningEn: 'Able or apt to stay afloat or rise to the top of a liquid.', meaningAr: 'طافٍ على سطح الماء وقادر على الطفو', contextSentence: 'Green fresh sticks held the buoyant cork floats upright on the smooth surface.' },
      { word: 'albacore', pos: 'n.', meaningEn: 'A small prized species of tuna fish.', meaningAr: 'سمك التونة البيضاء', contextSentence: 'A small albacore struck one of his trailing lines, giving Santiago fresh bait and sustenance.' },
      { word: 'man-of-war', pos: 'n.', meaningEn: 'A venomous jellyfish-like marine siphonophore with stinging tentacles.', meaningAr: 'قنديل البحر البرتغالي السام', contextSentence: 'Santiago detested the Portuguese man-of-war whose stinging purple filaments poisoned swimmers.' },
      { word: 'precision', pos: 'n.', meaningEn: 'The quality of being exact, accurate, and meticulously careful.', meaningAr: 'الدقة المتناهية والمهارة الحرفية', contextSentence: 'It is better to be lucky, he thought, but I would rather be exact; then when luck comes you are ready.' }
    ],
    synopsis: 'Before dawn on the eighty-fifth day, Santiago drinks his morning coffee, takes his fresh bait provided by Manolin, and rows out beyond the coastal shelf into the deep Gulf Stream. He views the sea tenderly as "la mar" — a woman who gives or withholds favors — contrasting himself with younger fishermen who view the ocean harshly as a rival ("el mar"). With consummate professional precision, Santiago sets his baits at exact depths, refusing to let them drift haphazardly. When a man-of-war bird guides him to school of tuna, he lands an albacore, reinforcing his readiness when fortune arrives.',
    synopsisAr: 'قبل بزوغ الفجر، ينطلق سانتياجو في قاربته إلى أعماق تيار الخليج. ينظر إلى البحر بحنان كأنثى تهب الخيرات (la mar)، على عكس الصيادين الشباب الذين يعاملونه كخصم عدائي (el mar). يضبط خيوطه عند أعماق دقيقة للغاية، ويصطاد سمكة تونة صغيرة يستعين بها كطعام وطعم إضافي، مؤكداً أن الاستعداد والمهارة أهم من انتظار الحظ المجرد.',
    centralThemes: [
      { theme: 'Professionalism & Precision', themeAr: 'الدقة الاحترافية والاستعداد المتقن', explanation: 'Santiago prioritizes craft and exactitude: "It is better to be lucky, but I would rather be exact."' },
      { theme: 'Harmony with Nature', themeAr: 'التناغم والانسجام الروحي مع الطبيعة', explanation: 'Unlike commercial fishermen, Santiago treats marine creatures, birds, and sea currents as companions and kin.' }
    ],
    hotsQuestions: [
      {
        id: 'sec1_lit_ch2_q1',
        question: 'Contrast Santiago’s perception of the sea as “la mar” with the younger fishermen’s view of it as “el mar”. How does this linguistic distinction reveal conflicting philosophies of life?',
        questionAr: 'قارن بين رؤية سانتياجو للبحر كأنثى (la mar) ورؤية الصيادين الشباب له كعدو ومنافس (el mar). كيف يكشف هذا الاختلاف عن فلسفتين متناقضتين للحياة؟',
        focusTheme: 'Respect for Nature vs. Commercial Exploitation',
        modelAnswer: 'Older fishermen like Santiago use the feminine Spanish form "la mar" because they love, revere, and sympathize with the ocean as a living maternal entity that bestows or withholds blessings. In contrast, the young commercial fishermen with motorboats view the ocean in the masculine "el mar" as an adversary, contest, or commercial resource to conquer for profit.',
        modelAnswerAr: 'ينظر سانتياجو للبحر ككيان أمومي محب ومانح للحياة والرزق، بينما ينظر إليه الصيادون الشباب ذوو القوارب الحديثة كعدو تجاري ومصدر للمكاسب المادية يجب قهره.',
        rubricCriteria: ['Explanation of "la mar" as feminine and loving', 'Explanation of "el mar" as masculine and combative', 'Impact on ethical character']
      },
      {
        id: 'sec1_lit_ch2_q2',
        question: '“It is better to be lucky. But I would rather be exact. Then when luck comes you are ready.” Evaluate this statement in terms of personal responsibility versus superstition.',
        questionAr: '“من الأفضل أن تكون محظوظاً، لكني أفضل أن أكون دقيقاً، فعندما يأتي الحظ تكون مستعداً”. قيّم هذه المقولة مبيناً علاقة المسؤولية الشخصية بالحظ.',
        focusTheme: 'Craftsmanship & Preparedness',
        quotation: 'It is better to be lucky. But I would rather be exact. Then when luck comes you are ready.',
        modelAnswer: 'Santiago refutes the passive fatalism of his neighbors. While acknowledging luck exists, he refuses to rely on it. Instead, he maintains rigorous technical discipline — setting his hooks at the exact fathom marks. His philosophy emphasizes that human triumph depends on preparedness; when opportunity strikes, only disciplined competence can seize it.',
        modelAnswerAr: 'يرفض سانتياجو التواكل السلبي على الحظ؛ فالإتقان والجاهزية هما الأساس، بحيث إذا واتته الفرصة وجدته مستعداً بكامل مهارته وخبرته.',
        rubricCriteria: ['Analysis of preparedness over blind chance', 'Connection to Santiago’s fishing technique', 'Application to student discipline']
      }
    ]
  },

  // Chapter 3
  {
    workTitle: 'The Old Man and the Sea',
    workTitleAr: 'رواية العجوز والبحر',
    author: 'Ernest Hemingway',
    chapterNumber: 3,
    chapterTitle: 'Chapter 3: The Strike of the Giant Marlin & The Trial of Strength',
    chapterTitleAr: 'الفصل الثالث: لدغة سمكة المارلين العملاقة وبدء اختبار القوة والتحمل',
    keyVocabulary: [
      { word: 'marlin', pos: 'n.', meaningEn: 'A large oceanic billfish with an elongated spear-like snout.', meaningAr: 'سمكة المارلين (الشراع) الضخمة ذات الخطم الرمحي', contextSentence: 'At one hundred fathoms, a colossal marlin tasted the sardines on Santiago’s hook.' },
      { word: 'tension', pos: 'n.', meaningEn: 'The state of being stretched tight or under severe physical strain.', meaningAr: 'شد وتوتر الحبل تحت وطأة الوزن الهائل', contextSentence: 'He felt the faint delicate tension on the line and knew the fish was nibbling miles below.' },
      { word: 'buttocks', pos: 'n.', meaningEn: 'The fleshy parts of the back of the human hips.', meaningAr: 'منطقة الظهر والورك التي يرتكز عليها الصياد', contextSentence: 'He braced the line across his back and shoulders, easing the strain against his buttocks.' },
      { word: 'taut', pos: 'adj.', meaningEn: 'Stretched or pulled tight; not slack.', meaningAr: 'مشدود بإحكام دون أي ارتخاء', contextSentence: 'The cord was taut as a wire and dripping water as the giant fish began towing the boat.' },
      { word: 'tow', pos: 'v.', meaningEn: 'To pull along behind by means of a rope or line.', meaningAr: 'يسحب ويجر القارب وراءه في البحر', contextSentence: 'The invisible marlin began to tow the small skiff relentlessly toward the north-west.' },
      { word: 'cramp', pos: 'n./v.', meaningEn: 'A painful, involuntary contraction of a muscle.', meaningAr: 'تقلص وتشنج عضلي مؤلم', contextSentence: 'Santiago prayed that his stiff left hand would not cramp during the prolonged contest.' },
      { word: 'brotherhood', pos: 'n.', meaningEn: 'The feeling of kinship, closeness, and mutual respect.', meaningAr: 'رابطة الأخوة والشراكة مع المخلوقات', contextSentence: 'He spoke aloud to the fish, feeling deep brotherhood with this magnificent creature.' },
      { word: 'solitary', pos: 'adj.', meaningEn: 'Existing alone without companions; single.', meaningAr: 'منعزل وحيد في عرض اليم', contextSentence: 'Santiago realized how utterly solitary he was upon the vast dark waters of the sea.' }
    ],
    synopsis: 'At noon, one of the deep hundred-fathom lines tugs delicately. With veteran intuition, Santiago realizes a monster marlin is nibbling the bait. He lets the fish swallow the hook before striking hard. Instead of surfacing, the mighty fish begins to tow the skiff steadily toward the open ocean. Hours pass as darkness descends. Santiago braces the line across his aching back, acting as a human shock absorber to prevent the heavy line from snapping. Experiencing loneliness, he repeatedly wishes: "I wish I had the boy with me."',
    synopsisAr: 'عند الظهيرة، تهتز الصنارة العميقة عند مائة قامة. يدرك سانتياجو بحسه الخبير أن سمكة مارلين عملاقة تتذوق الطعم. يثبت الخطاف بقوة، لكن السمكة الهائلة تبدأ بجر القارب نحو الشمال الغربي في عرض البحر. يحل الليل وسانتياجو يشد الحبل عبر كتفيه وظهره متحملًا آلاماً قاسية، ويردد بحسرة: "ليت الصبي كان معي ليساعدني ويعاين هذا المشهد".',
    centralThemes: [
      { theme: 'Endurance & The Test of Manhood', themeAr: 'قوة التحمل واختبار الرجولة', explanation: 'Santiago turns his body into a physical bridge connecting the boat to the submerged titan.' },
      { theme: 'Isolation & Longing for Companionship', themeAr: 'العزلة والحنين إلى الأنيس والمعين', explanation: 'The recurring plea "I wish the boy were here" underscores human vulnerability despite heroic stamina.' }
    ],
    hotsQuestions: [
      {
        id: 'sec1_lit_ch3_q1',
        question: 'Why does Santiago repeatedly repeat the phrase “I wish the boy were here” throughout the ordeal? What does Manolin symbolize for him during the lonely struggle?',
        questionAr: 'لماذا كرر سانتياجو عبارة “ليت الصبي كان معي” مراراً خلال الصراع؟ وماذا يمثل مانولين بالنسبة للعجوز في عزلته؟',
        focusTheme: 'Human Interdependence vs. Existential Isolation',
        quotation: 'I wish I had the boy. To help me and to see this.',
        modelAnswer: 'Manolin represents more than physical assistance; he embodies youthful vitality, emotional warmth, faith, and continuity. In the abyss of the open sea, the memory of the boy keeps Santiago anchored to human society. Furthermore, Santiago wishes the boy could witness his mastery and validate that the old man is still an authentic fisherman, not an unlucky has-been.',
        modelAnswerAr: 'يمثل مانولين الدفء الإنساني واستمرارية الأجيال؛ وجوده يمنح العجوز طاقة معنوية ويعيد ربطه بالمجتمع الإنساني، كما يتمنى أن يرى الصبي براعته وصموده ليتعلم منه ويثق بأنه صياد حقيقي لا يشق له غبار.',
        rubricCriteria: ['Recognition of physical versus emotional need', 'Manolin as a symbol of youth and legacy', 'Validation of self-worth']
      },
      {
        id: 'sec1_lit_ch3_q2',
        question: 'Analyze how Santiago regards the fish he is trying to kill as a “brother”. How can love and killing coexist in Hemingway’s heroic code?',
        questionAr: 'كيف يعتبر سانتياجو السمكة التي يحاول قتلها “أخاً” ونداً شريفاً؟ وكيف يجتمع الحب مع القتل في ميثاق البطولة عند همنجواي؟',
        focusTheme: 'Respectful Adversary & Natural Balance',
        modelAnswer: 'In Hemingway’s worldview, true conflict does not stem from hatred but from natural destiny. Santiago loves and admires the marlin’s noble strength, beauty, and courage. He kills it not out of malice, but because fishing is his calling and subsistence. Thus, adversary becomes brother: both are bound by duty, honor, and mutual endurance in the theatre of nature.',
        modelAnswerAr: 'الصراع عند همنجواي لا ينبع من الكراهية بل من قدر الكائنات وتكامل الطبيعة؛ سانتياجو يحب السمكة لفروسيتها ونبلها، ويقتلها كواجب ومهنة للعيش، ولذا يعتبرها نداً شريفاً وأخاً في ساحة الصمود.',
        rubricCriteria: ['Absence of malice in the struggle', 'Mutual nobility between hunter and hunted', 'Execution of duty within natural order']
      }
    ]
  },

  // Chapter 4
  {
    workTitle: 'The Old Man and the Sea',
    workTitleAr: 'رواية العجوز والبحر',
    author: 'Ernest Hemingway',
    chapterNumber: 4,
    chapterTitle: 'Chapter 4: The Agony of the Cramped Hand & The First Leap',
    chapterTitleAr: 'الفصل الرابع: معاناة تشنج اليد اليسرى والقفزة الأسطورية الأولى للمارلين',
    keyVocabulary: [
      { word: 'cramp', pos: 'n.', meaningEn: 'A sudden, painful contraction of a muscle that refuses to relax.', meaningAr: 'تشنج عضلي حاد يعوق الحركة', contextSentence: 'His left hand seized up into a tight claw; Santiago rubbed it in seawater to ease the cramp.' },
      { word: 'treachery', pos: 'n.', meaningEn: 'Betrayal of trust, deceptive disloyalty.', meaningAr: 'الخيانة ونكث العهد (تخاذل الجسد)', contextSentence: 'He considered his cramped hand a humiliating treachery committed by his own body.' },
      { word: 'scythe', pos: 'n.', meaningEn: 'A long curved blade for cutting grain or grass.', meaningAr: 'المنجل المقوس ذو النصل الحاد', contextSentence: 'The marlin’s massive tail cut through the waves like a giant purple scythe.' },
      { word: 'lance', pos: 'n./v.', meaningEn: 'A long weapon with a wooden shaft and pointed steel head.', meaningAr: 'رمح حاد للطعن', contextSentence: 'The spear of the marlin was as hard and long as a baseball bat or an ancient lance.' },
      { word: 'humiliation', pos: 'n.', meaningEn: 'A painful loss of pride, dignity, or self-respect.', meaningAr: 'الشعور بالخزي والمهانة', contextSentence: 'A bodily failure in front of an adversary was the ultimate humiliation for Santiago.' },
      { word: 'rapier', pos: 'n.', meaningEn: 'A thin, light, sharp-pointed sword used for thrusting.', meaningAr: 'سيف رفيع ومستدق ذو نصل حاد', contextSentence: 'The marlin’s bill looked like a dark rapier glistening with seawater.' },
      { word: 'stamina', pos: 'n.', meaningEn: 'The ability to sustain prolonged physical or mental effort.', meaningAr: 'قوة التحمل والمطاولة البدنية', contextSentence: 'He fed on raw pieces of albacore to maintain his stamina through the second cold night.' },
      { word: 'solace', pos: 'n.', meaningEn: 'Comfort or consolation in a time of distress or sadness.', meaningAr: 'السلوى والتعزية في الشدة', contextSentence: 'Remembering his arm-wrestling contest in Casablanca gave him mental solace and courage.' }
    ],
    synopsis: 'As the battle enters its second dawn, Santiago’s left hand seizes up into an agonizing cramp, which he berates as treacherous disloyalty from his own body. He washes it in salt water and forces himself to chew raw chunks of tuna to nourish his muscles. Suddenly, the deep line rises: the giant marlin leaps into the sunlight, revealing a body longer than the skiff itself with a gleaming purple sword. Awed by the fish’s grandeur, Santiago draws courage by recalling his legendary 24-hour arm-wrestling victory in Casablanca against a mighty dockworker, affirming his identity as “El Campeón.”',
    synopsisAr: 'في الفجر الثاني، تتشنج يد سانتياجو اليسرى كالمخلب، فيشعر بالخزي من تخاذل جسده. يغسلها بماء البحر ويأكل قطعاً نيئة من التونة ليستعيد طاقته. فجأة ترتفع السمكة وتقفز في الهواء بكامل مهابتها، فيبدو جسدها البنفسجي أطول من القارب بسنتيمترات عديدة. يستمد سانتياجو العزيمة من تذكر مباراته الأسطورية في مصارعة الذراعين بكازابلانكا، حين هزم أقوى بحار بعد 24 ساعة من الصمود ليلقب بـ "البطل".',
    centralThemes: [
      { theme: 'Mastery over Bodily Weakness', themeAr: 'السيطرة الذهنية على تخاذل الجسد', explanation: 'Santiago commands his cramped hand and weary limbs with absolute mental willpower.' },
      { theme: 'Past Glories as Present Inspiration', themeAr: 'استدعاء أمجاد الماضي لشحن عزيمة الحاضر', explanation: 'Recalling the Casablanca arm-wrestling duel reminds Santiago of his inner champion.' }
    ],
    hotsQuestions: [
      {
        id: 'sec1_lit_ch4_q1',
        question: 'Why did Santiago consider the cramping of his left hand a “treachery”? What does this reveal about his expectations of his own body during crisis?',
        questionAr: 'لماذا اعتبر سانتياجو تشنج يده اليسرى “خيانة”؟ وماذا يكشف ذلك عن توقعاته الصارمة من جسده في أوقات الشدة؟',
        focusTheme: 'Physical Discipline & Self-Command',
        modelAnswer: 'To Santiago, the human body is an instrument bound by honor to obey the master’s will. A cramp is viewed not merely as a biological reflex, but as a shameful betrayal of duty in the face of a noble opponent. He refuses to indulge in self-pity, immediately eating raw fish and soaking his hand to force it back into submission.',
        modelAnswerAr: 'يرى سانتياجو أن الجسد أداة يجب أن تطيع الإرادة دون تذمر؛ وتشنج اليد خذلان غير مقبول أمام خصم شريف. لذلك لا يرثي لحاله بل يجبر نفسه على أكل اللحم النيئ وعلاجها فوراً.',
        rubricCriteria: ['Strict standard of personal accountability', 'Rejection of self-pity and weakness', 'The concept of body as a tool of honor']
      },
      {
        id: 'sec1_lit_ch4_q2',
        question: 'Examine the dramatic function of Santiago’s flashback to the arm-wrestling contest in Casablanca. How does memory restore his physical and psychological stamina?',
        questionAr: 'ما الوظيفة الدرامية لاسترجاع سانتياجو لذكريات مصارعة الذراعين في حانة كازابلانكا؟ وكيف جددت تلك الذكرى عزيمته البدنية والنفسية؟',
        focusTheme: 'Psychological Fortitude & Identity',
        modelAnswer: 'The Casablanca flashback is a psychological lifeline. Physically exhausted and doubting his aged strength, remembering how he defeated the powerful Negro dockworker over a grueling day and night proves that he has endured worse trials. This memory resurrects his identity as “El Campeón,” reassuring him that will and endurance triumph over raw youth and size.',
        modelAnswerAr: 'استرجاع مباراة كازابلانكا هو طوق نجاة نفسي؛ فعندما شعر بالضعف، تذكر كيف قهر أقوى بحار بعد صمود 24 ساعة، مما أعاد إليه يقينه بأنه “البطل” وأن قوة الإرادة تهزم الشباب والحجم المجرد.',
        rubricCriteria: ['Role of memory in renewing morale', 'Parallel between the arm-wrestling duel and the fish contest', 'Restoration of identity as "El Campeón"']
      }
    ]
  },

  // Chapter 5
  {
    workTitle: 'The Old Man and the Sea',
    workTitleAr: 'رواية العجوز والبحر',
    author: 'Ernest Hemingway',
    chapterNumber: 5,
    chapterTitle: 'Chapter 5: The Climax — Circling the Skiff & The Harpoon Strike',
    chapterTitleAr: 'الفصل الخامس: ذروة الملحمة — دوران السمكة حول القارب وضربة الحربة القاضية',
    keyVocabulary: [
      { word: 'circling', pos: 'n.', meaningEn: 'Moving in a circle around a central point.', meaningAr: 'الدوران في حلقات متتالية حول القارب', contextSentence: 'On the third morning, the marlin began circling, signaling that it was tiring and nearing the surface.' },
      { word: 'dizzy', pos: 'adj.', meaningEn: 'Having a sensation of spinning around and losing balance.', meaningAr: 'دوار ودوخة شديدة تفقده الاتزان', contextSentence: 'Black spots danced before Santiago’s eyes and he felt dizzy, but he commanded his head to clear.' },
      { word: 'harpoon', pos: 'n.', meaningEn: 'A barbed spear-like missile used in catching whales and large fish.', meaningAr: 'الحربة المعدنية المسننة لصيد الأسماك الكبيرة', contextSentence: 'He raised the harpoon high and drove it down with all his remaining strength into the marlin’s heart.' },
      { word: 'silver', pos: 'adj.', meaningEn: 'A shiny grayish-white metallic color.', meaningAr: 'فضي لامع وبراق', contextSentence: 'The marlin rose up silver and purple, hanging suspended in the air before crashing into the sea.' },
      { word: 'lash', pos: 'v.', meaningEn: 'To fasten or tie something securely with a cord or rope.', meaningAr: 'يربط ويثبت بإحكام بالحبال إلى جانب القارب', contextSentence: 'Because the fish was larger than the boat, Santiago lashed it alongside the skiff with hemp cords.' },
      { word: 'crimson', pos: 'adj.', meaningEn: 'Of a rich deep red color inclining to purple.', meaningAr: 'قرمزي داكن مشوب بالحمرة (لون الدم المتدفق)', contextSentence: 'A crimson cloud of blood spread into the azure water as the fish died with nobility.' },
      { word: 'nobility', pos: 'n.', meaningEn: 'The quality of being noble in character, mind, or birth.', meaningAr: 'النبل والشهامة وعزة النفس', contextSentence: 'The marlin died with immense nobility, fighting with every ounce of its titanic spirit.' },
      { word: 'rig', pos: 'v.', meaningEn: 'To equip with sails and cables ready for sailing.', meaningAr: 'يجهز ويرفع الشراع للإبحار عائدًا', contextSentence: 'He rigged the sail, caught the favorable trade wind, and headed homeward toward Cuba.' }
    ],
    synopsis: 'On the third morning, the marlin begins to circle the boat, proving it is growing exhausted. Santiago, battling intense dizziness, fainting spells, and excruciating pain across his lacerated hands, draws upon every ounce of his remaining life force. As the leviathan passes alongside the gunwale, Santiago gathers all his pain and pride, raising the harpoon and driving it straight through the fish’s heart. The marlin leaps into the air in a final majestic death convulsion before sinking belly-up. Because the giant creature is eighteen feet long and cannot fit inside the skiff, Santiago lashes it securely along the hull, rigs his sail, and turns homeward.',
    synopsisAr: 'في صباح اليوم الثالث، تبدأ السمكة بالدوران حول القارب، إيذاناً باقتراب نهايتها وإنهاك قواها. يقاوم سانتياجو الدوار وفقدان الوعي، ويجمع كل ما تبقى لديه من طاقة وكبرياء. عندما اقتربت السمكة من حافة القارب، يرفع الحربة ويسددها بكل قوته إلى قلبها مباشرة. تقفز السمكة قفزة موت مهيبة قبل أن تطفو على ظهرها بلونها الفضي والبنفسجي. يربطها سانتياجو إلى جانب القارب لضخامتها، ويرفع شراعه متجهاً نحو كوبا بروح المنتصر.',
    centralThemes: [
      { theme: 'Triumph through Suffering', themeAr: 'النصر من رحم المعاناة والألم', explanation: 'Santiago demonstrates that a man can endure limitless pain to achieve his purpose.' },
      { theme: 'Reverence for the Fallen Adversary', themeAr: 'إجلال الخصم الساقط والاعتزاز بجماله', explanation: 'The death of the marlin is solemn, beautiful, and deeply honored by the victor.' }
    ],
    hotsQuestions: [
      {
        id: 'sec1_lit_ch5_q1',
        question: '“You are killing me, fish, the old man thought. But you have a right to. Never have I seen a greater, or more noble, or a calmer thing than you, brother.” Discuss the philosophical dimensions of this mutual sacrifice.',
        questionAr: '“إنك تقتلني أيتها السمكة، ولكن هذا من حقك؛ لم أرَ في حياتي شيئاً أنبل ولا أهدأ منك يا أخي”. ناقش الأبعاد الفلسفية للتضحية المتبادلة بين الصياد وفريسته.',
        focusTheme: 'Existential Kinship & Shared Mortality',
        quotation: 'You are killing me, fish... But you have a right to. Never have I seen a greater, or more noble, or a calmer thing than you, brother.',
        modelAnswer: 'Hemingway depicts nature not as a battleground of cruelty, but as a sacred arena of mutual respect. Santiago acknowledges that the fish has equal right to kill him; both exist within the same ecological and spiritual law. By calling the fish "brother" at the moment of fatal conflict, Santiago elevates the hunt from a commercial act to an existential communion where victor and victim share equal nobility.',
        modelAnswerAr: 'يجعل همنجواي من الصراع طقساً مقدساً للمحبة والتبجيل؛ فسانتياجو يعترف بحق السمكة في الدفاع عن حياتها، ويخاطبها كأخ وند، مما يرفع عملية الصيد من مجرد كسب مادي إلى تجربة وجودية توحد بين المنتصر والضحية في ميزان الشرف.',
        rubricCriteria: ['Analysis of mutual rights in the natural order', 'Significance of calling the fish "brother"', 'Elevation of physical death into spiritual transcendence']
      },
      {
        id: 'sec1_lit_ch5_q2',
        question: 'Why did Santiago feel that he had to lash the fish to the side of the skiff rather than hauling it aboard? What practical and symbolic implications does this arrangement carry?',
        questionAr: 'لماذا اضطر سانتياجو لربط السمكة بجانب القارب بدلاً من رفعها إلى الداخل؟ وما الدلالات العملية والرمزية لهذا الوضع؟',
        focusTheme: 'Magnitude & Shared Voyage',
        modelAnswer: 'Practically, the marlin is eighteen feet long and weighs over a thousand pounds, far exceeding the skiff’s capacity. Symbolically, sailing side-by-side portrays them as fraternal partners rather than hunter and carcass. They embark on the homeward voyage together as equals bound by blood and struggle.',
        modelAnswerAr: 'عملياً، يفوق طول السمكة حجم القارب بمسافة ويزيد وزنها عن نصف طن؛ ورمزياً، إبحارهما جنباً إلى جنب يجعلهما رفيقين في رحلة واحدة كأخوين توحدا في الدم والجهاد.',
        rubricCriteria: ['Physical reality of the marlin’s immense size', 'Symbolism of sailing side-by-side as brothers', 'Foreshadowing vulnerability to predators']
      }
    ]
  },

  // Chapter 6
  {
    workTitle: 'The Old Man and the Sea',
    workTitleAr: 'رواية العجوز والبحر',
    author: 'Ernest Hemingway',
    chapterNumber: 6,
    chapterTitle: 'Chapter 6: The Shark Assaults & The Undefeated Spirit',
    chapterTitleAr: 'الفصل السادس: هجمات أسماك القرش الضارية والروح التي لا تقهر',
    keyVocabulary: [
      { word: 'scavenger', pos: 'n.', meaningEn: 'An animal that feeds on carrion, dead plant material, or refuse.', meaningAr: 'حيوان أو كائن قمّام يقتات على الجيف والبقايا', contextSentence: 'Unlike the noble marlin, the shovel-nosed sharks were hateful, vile scavengers.' },
      { word: 'galanos', pos: 'n.', meaningEn: 'Spanish term for the hateful, brown-nosed oceanic shovel-head sharks.', meaningAr: 'قروش الجالانوس البنية المقيتة ذات الخطم العريض', contextSentence: 'The brown galanos came in packs, driven mad by the trail of marlin blood.' },
      { word: 'mutilated', pos: 'adj.', meaningEn: 'Inflicted with a violent and disfiguring injury; hacked up.', meaningAr: 'مشوه وممزق بفعل هجمات الوحوش', contextSentence: 'Santiago could not bear to look at the mutilated carcass of his noble brother.' },
      { word: 'tiller', pos: 'n.', meaningEn: 'A horizontal bar fitted to the head of a boat’s rudder for steering.', meaningAr: 'ذراع الدفة الخشبي المستخدم للتوجيه والضرب', contextSentence: 'When his knife snapped, Santiago tore the tiller from the rudder to club the attacking sharks.' },
      { word: 'carcass', pos: 'n.', meaningEn: 'The dead body of an animal after slaughter or predation.', meaningAr: 'هيكل عظمي عارٍ أو جثة ممزقة', contextSentence: 'Only the white skeleton and the great spear remained of the eighteen-foot marlin.' },
      { word: 'salvage', pos: 'v./n.', meaningEn: 'To rescue or retain something of value from destruction.', meaningAr: 'ينقذ ويستبقي ما تبقى من حطام أو ضياع', contextSentence: 'He sailed into the harbor carrying nothing of commercial value except the great white spine.' },
      { word: 'undefeated', pos: 'adj.', meaningEn: 'Not having been defeated; unconquered in spirit.', meaningAr: 'غير مهزوم في معركته الروحية والوجدانية', contextSentence: 'Though stripped of meat, Santiago arrived home spiritually victorious and undefeated.' },
      { word: 'resilience', pos: 'n.', meaningEn: 'The capacity to recover quickly from difficulties; toughness.', meaningAr: 'الصمود والصلابة في مواجهة أقسى الكوارث', contextSentence: 'The boy wept at the sight of Santiago’s scarred hands and monumental resilience.' }
    ],
    synopsis: 'The scent of blood trails for miles through the deep ocean, drawing predatory sharks. First comes a solitary Mako shark, which Santiago slays with his harpoon, but loses the weapon in the process. Soon, packs of vile shovel-nosed sharks (galanos) attack the lashed marlin. With desperate ferocity, Santiago fights them off using a knife lashed to an oar, then a club, and finally the boat’s wooden tiller. By nightfall, the sharks have devoured every strip of flesh, leaving only the gleaming white backbone and the towering spear. Santiago sails into the dark harbor, carries his heavy mast up to his shack, and collapses into exhausted sleep. The next morning, villagers and tourists marvel at the giant eighteen-foot skeleton. Manolin weeps over the old man’s lacerated hands and vows to sail with him always, while Santiago dreams peacefully of the lions on the African beaches.',
    synopsisAr: 'تنتشر رائحة الدماء في مياه البحر فتجتذب أسماك القرش الجائعة. يهاجم قرش الماكو أولاً، فيقتله العجوز بحربته ولكنه يفقد الحربة في جسده. تتوالى أسراب قروش الجالانوس القمامة، فيقاتلها سانتياجو بسكين مربوط بمجداف، ثم بهراوة، ثم بذراع الدفة بعد أن كسر السكين. تفترس القروش كل لحم السمكة، فلا يتبقى سوى الهيكل العظمي الأبيض ورأسها برمحها الشامخ. يدخل سانتياجو الميناء ليلاً، ويحمل ساريته الثقيلة إلى كوخه وينام نوماً عميقاً. يبكي الصبي مانولين متأثراً بجراح يديه ويقسم بملازمته في البحر دائماً، بينما يحلم العجوز بالأسود الشابة تلعب على شواطئ إفريقيا.',
    centralThemes: [
      { theme: 'Defeat vs. Destruction', themeAr: 'الفرق بين التحطيم المادي والهزيمة الروحية', explanation: '“A man can be destroyed but not defeated.” True victory is measured by moral courage, not material gain.' },
      { theme: 'Legacy, Rebirth & Peace', themeAr: 'الخلود واستمرارية الرسالة والسلام الداخلي', explanation: 'Santiago dreams of the lions, symbolizing renewed vitality, youthful strength, and untamed pride.' }
    ],
    hotsQuestions: [
      {
        id: 'sec1_lit_ch6_q1',
        question: '“A man can be destroyed but not defeated.” Evaluate this quintessential Hemingway maxim in the context of Santiago’s tragic return with only a skeleton.',
        questionAr: '“الإنسان قد يُدمَّر لكنه لا يُهزَم”. قيّم هذا المبدأ الفلسفي الخالد لهمنجواي في ضوء عودة سانتياجو بهيكل عظمي عارٍ فقط.',
        focusTheme: 'Moral Triumph over Material Loss',
        quotation: 'A man can be destroyed but not defeated.',
        modelAnswer: 'This maxim forms the core message of the novella. Material destruction (physical exhaustion, loss of the marlin’s meat, ruined gear) is merely external circumstance. Defeat, however, is an internal surrender of the soul, which Santiago never permits. By battling until his weapons shattered and protecting his dignity to the last breath, Santiago achieves transcendent moral triumph. The skeleton proves his unmatched mastery; he returns physically broken but spiritually unconquered.',
        modelAnswerAr: 'يمثل هذا المبدأ جوهر الرواية؛ فالدمار المادي (فقدان لحم السمكة، تمزق الشباك، الإنهاك البدني) أمر خارجي، أما الهزيمة فهي استسلام داخلي لم يعرفه سانتياجو. لقد قاوم حتى كُسرت أسلحته وحافظ على شرفه لآخر رمق، فرجع محطماً جسدياً لكنه منتصر روحياً وخالداً في ضمير تلميذه وأهل قريته.',
        rubricCriteria: ['Clear contrast between physical destruction and moral defeat', 'Santiago’s refusal to yield against impossible odds', 'The skeleton as an enduring emblem of greatness']
      },
      {
        id: 'sec1_lit_ch6_q2',
        question: 'Why does the novella conclude with Santiago dreaming of the lions playing on the African beaches? What do the lions symbolize for the aged fisherman?',
        questionAr: 'لماذا اختتم همنجواي الرواية بمشهد حلم سانتياجو بالأسود تلعب على شواطئ إفريقيا؟ وماذا ترمز تلك الأسود للصياد العجوز؟',
        focusTheme: 'Youth, Renewal & Peaceful Immortality',
        modelAnswer: 'The lions from Santiago’s boyhood voyage to Africa represent youthful vigor, innocence, untamed nobility, and harmony with nature. Notice that the lions are not hunting or fighting; they are playing like kittens. This dream signifies peace of conscience, spiritual rebirth, and the continuity of life. Santiago sleeps contentedly because his soul remains young, pure, and ready for future voyages with Manolin.',
        modelAnswerAr: 'ترمز الأسود إلى ذكريات الشباب والفتوة والبراءة والتناغم مع الطبيعة؛ فالأسود في حلمه لا تقتل ولا تفترس، بل تلعب كالأطفال في وداعة. يعكس الحلم السلام الداخلي وراحة الضمير والتجدد الروحي، مؤكداً أن روح سانتياجو ما زالت فتية ومستعدة لرحلات قادمة برفقة الصبي مانولين.',
        rubricCriteria: ['Symbolism of lions as youth, vitality, and innocence', 'Contrast between peaceful playing lions and oceanic violence', 'Resolution of spiritual peace and enduring hope']
      }
    ]
  }
];

// ------------------------------------------------------------------------------------------------
// 2. SECONDARY 2 (GRADE 11): KING LEAR by William Shakespeare
// Acts 1 to 3 (Term 1 Checkpoints)
// Themes: Blind Vanity, True vs. Flattering Love, Filial Ingratitude, Madness, Justice
// ------------------------------------------------------------------------------------------------
export const kingLearActs: LiteratureChapterModule[] = [
  // Act 1 Checkpoint (Units 1 & 2)
  {
    workTitle: 'King Lear',
    workTitleAr: 'مسرحية الملك لير',
    author: 'William Shakespeare',
    chapterNumber: 1,
    chapterTitle: 'Act 1: The Love Test, Cordelia’s Banishment & Edmund’s Machinations',
    chapterTitleAr: 'الفصل الأول: اختبار المحبة الزائف، نفي كورديليا، ومؤامرة إدموند غير الشرعي',
    keyVocabulary: [
      { word: 'abdicate', pos: 'v.', meaningEn: 'To renounce or relinquish royal throne, power, or responsibility.', meaningAr: 'يتنازل عن العرش والسلطة الملكية', contextSentence: 'King Lear decided to abdicate his throne to unburden his crawling age.' },
      { word: 'adulation', pos: 'n.', meaningEn: 'Excessive devotion, praise, or servile flattery.', meaningAr: 'النفاق والتملق الزائف المبالغ فيه', contextSentence: 'Goneril and Regan shower Lear with extravagant adulation to secure large tracts of kingdom.' },
      { word: 'banish', pos: 'v.', meaningEn: 'To expel or send someone away from a country as an official punishment.', meaningAr: 'ينفي ويطرد قسراً من البلاد', contextSentence: 'In a furious rage, Lear banishes his truthful daughter Cordelia and his loyal advisor Kent.' },
      { word: 'dowry', pos: 'n.', meaningEn: 'Property or money brought by a bride to her husband on their marriage.', meaningAr: 'المهر والنحيزة التي تمنح للعروس', contextSentence: 'Lear strips Cordelia of all royal dowry, yet the noble King of France marries her for pure virtue.' },
      { word: 'bastard', pos: 'n.', meaningEn: 'An illegitimate child born outside wedlock.', meaningAr: 'ابن غير شرعي محروم من الميراث', contextSentence: 'Edmund resents his status as Gloucester’s bastard son and schemes to displace Edgar.' },
      { word: 'ingratitude', pos: 'n.', meaningEn: 'Discreditable lack of gratitude; unthankfulness.', meaningAr: 'الجحود ونكران الجميل الأليم', contextSentence: 'Filial ingratitude is described by Lear as more hideous than the sea-monster.' },
      { word: 'folly', pos: 'n.', meaningEn: 'Lack of good sense; foolishness and rash misjudgment.', meaningAr: 'الحماقة والطيش وقصر النظر', contextSentence: 'The Fool relentlessly mocks Lear’s folly for surrendering his crown and authority.' },
      { word: 'integrity', pos: 'n.', meaningEn: 'The quality of being honest and having strong moral principles.', meaningAr: 'النزاهة والاستقامة الأخلاقية', contextSentence: 'Cordelia’s moral integrity forbids her from exaggerating her genuine filial love.' }
    ],
    synopsis: 'Aging King Lear decides to divide Britain among his three daughters according to who professes to love him most. Goneril and Regan deliver hyperbolic, deceitful speeches of adoration and are rewarded with vast lands. Cordelia, knowing real love cannot be quantified in empty words, states that she loves her father according to her bond — neither more nor less. Enraged by her honesty, Lear disowns and banishes Cordelia, while also exiling the loyal Earl of Kent for defending her. The noble King of France recognizes Cordelia’s priceless virtue and marries her without a dowry. Meanwhile, Edmund, the illegitimate son of Gloucester, forges a treasonous letter to frame his legitimate brother Edgar, launching a parallel plot of filial betrayal.',
    synopsisAr: 'يقرر الملك لير العجوز تقسيم مملكته بين بناته الثلاث بناءً على مدى حبهن له في اختبار لفظي زائف. تتملق جونريل وريجان والدهما بكلمات نفاق مبالغ فيها فتظفران بثلثي المملكة، بينما ترفض الصغرى كورديليا النفاق وتعلن أنها تحبه كواجب البنوة الطبيعي دون زيادة أو نقيصة. يشتعل لير غضباً وينفي كورديليا ويحرمها من الميراث، كما ينفي مخلصه كنت لدفاعه عنها، فيتزوجها ملك فرنسا تقديراً لنبلها. بالتوازي، يدبر إدموند الابن غير الشرعي لدوق جلوستر مكيدة للإيقاع بأخيه الشريف إدجار عبر رسالة مزورة للاستيلاء على الميراث.',
    centralThemes: [
      { theme: 'Appearance vs. Reality (Flattery vs. Truth)', themeAr: 'الظاهر الخادع في مواجهة الحقيقة والجوهر', explanation: 'Lear values verbal flattery over genuine silent devotion, blinding himself to true virtue.' },
      { theme: 'Tragic Blindness (Hamartia)', themeAr: 'العمى البصيري والخطيئة التراجيدية', explanation: 'Lear and Gloucester are both metaphorically blind to the deceit of their predatory offspring.' }
    ],
    hotsQuestions: [
      {
        id: 'sec2_lit_act1_q1',
        question: '“Unhappy that I am, I cannot heave my heart into my mouth: I love your majesty according to my bond; no more nor less.” Analyze Cordelia’s refusal to flatter Lear. Is her stubborn honesty a virtue or a flaw?',
        questionAr: '“وا حسرتاه، لا أستطيع أن ألقي بقلبي في فمي، إنني أحب جلالتك بحكم واجبي البنوي لا أكثر ولا أقل”. حلل رفض كورديليا لتملق والدها؛ هل صراحتها فضيلة مطلقة أم خطأ في التقدير؟',
        focusTheme: 'Honesty vs. Diplomatic Flattery',
        quotation: 'Unhappy that I am, I cannot heave my heart into my mouth: I love your majesty according to my bond; no more nor less.',
        modelAnswer: 'Cordelia embodies absolute moral integrity. Disgusted by her sisters’ blatant hypocrisy, she refuses to degrade filial affection into competitive market rhetoric. However, Shakespeare paints her honesty with tragic realism: while morally sublime, her blunt phrasing in public court wounds the proud, narcissistic old monarch and triggers the tragic catastrophe. Thus, virtue divorced from pragmatic tact becomes catalyst for catastrophe.',
        modelAnswerAr: 'تجسد كورديليا النزاهة المطلقة؛ إذ تشمئز من نفاق أختيها وترفض تحويل المحبة لبضاعة كلامية رخيصة. غير أن صراحتها الجافة أمام الحاشية جرحت كبرياء والدها النرجسي وأشعلت المأساة، مما يوضح أن الفضيلة الخالية من الدبلوماسية قد تفتح أبواب الكارثة التراجيدية.',
        rubricCriteria: ['Analysis of Cordelia’s moral rejection of flattery', 'Recognition of how Lear’s vanity blinded his judgment', 'Evaluation of the consequences of her rigid bluntness']
      },
      {
        id: 'sec2_lit_act1_q2',
        question: 'Compare Lear’s misjudgment of Cordelia with Gloucester’s misjudgment of Edgar. Why does Shakespeare employ this parallel double plot?',
        questionAr: 'قارن بين سوء تقدير لير لكورديليا وسوء تقدير جلوستر لإدجار. ولماذا استخدم شكسبير هذه الحبكة المزدوجة المتوازية؟',
        focusTheme: 'The Double Plot & Universal Filial Blindness',
        modelAnswer: 'Shakespeare mirrors the royal court tragedy with the domestic tragedy of the Gloucester family to universalize the theme of parental blindness and filial betrayal. Lear is blinded by vanity to Cordelia’s truth; Gloucester is blinded by gullibility to Edgar’s innocence. In both households, deceitful offspring (Goneril/Regan and Edmund) feign devotion while virtuous children (Cordelia and Edgar) are unjustly banished.',
        modelAnswerAr: 'يوظف شكسبير الحبكة المزدوجة ليؤكد أن عمى الآباء وجحود الأبناء قضية إنسانية شاملة لا تقتصر على الملوك؛ فلير يعمى بالغرور عن كورديليا، وجلوستر يعمى بالسذاجة عن إدجار، بينما ينعم المنافقون بالسلطة مؤقتاً.',
        rubricCriteria: ['Identification of Lear/Cordelia and Gloucester/Edgar parallels', 'Thematic function of universalizing human folly', 'Contrast between appearance and reality']
      }
    ]
  },

  // Act 2 Checkpoint (Units 3 & 4)
  {
    workTitle: 'King Lear',
    workTitleAr: 'مسرحية الملك لير',
    author: 'William Shakespeare',
    chapterNumber: 2,
    chapterTitle: 'Act 2: The Stripping of Knights, Filial Cruelty & The Locked Gates',
    chapterTitleAr: 'الفصل الثاني: تجريد الملك من حراسه، قسوة الشقيقتين، وإغلاق أبواب القلعة في وجهه',
    keyVocabulary: [
      { word: 'retinue', pos: 'n.', meaningEn: 'A group of advisers, assistants, or knights accompanying an important person.', meaningAr: 'حاشية الملك وفرسانه المرافقون', contextSentence: 'Lear demanded to retain a retinue of one hundred loyal knights to maintain royal dignity.' },
      { word: 'disdain', pos: 'n./v.', meaningEn: 'The feeling that someone or something is unworthy of one’s respect; contempt.', meaningAr: 'الازدراء والاحتقار الشديد', contextSentence: 'Goneril treats her elderly father with calculated disdain and orders servants to disobey him.' },
      { word: 'stocks', pos: 'n.', meaningEn: 'A wooden framework with holes for locking feet and hands as public humiliation.', meaningAr: 'المقطرة الخشبية لمعاقبة المجرمين وإذلالهم', contextSentence: 'Regan and Cornwall insult Lear by putting his royal messenger Kent in the public stocks.' },
      { word: 'parsimony', pos: 'n.', meaningEn: 'Extreme unwillingness to spend money or provide resources; stinginess.', meaningAr: 'البخل والتقتير الشديد وتجريد الحقوق', contextSentence: 'The sisters demonstrate cruel parsimony, bargaining down Lear’s knights from 100 to fifty, then twenty-five, then none.' },
      { word: 'vulnerable', pos: 'adj.', meaningEn: 'Exposed to the possibility of being attacked or harmed physically or emotionally.', meaningAr: 'ضعيف ومعرض للأذى والخذلان', contextSentence: 'Stripped of political authority, the proud monarch is completely vulnerable to cruelty.' },
      { word: 'hysterica passio', pos: 'n.', meaningEn: 'Suffocating emotional grief and rising hysteria.', meaningAr: 'خناق الصدر ولوعة الحزن المتصاعدة لدرجة الجنون', contextSentence: 'Lear clutches his chest in agony as hysterica passio threatens to shatter his mind.' },
      { word: 'insolence', pos: 'n.', meaningEn: 'Rude and disrespectful behavior.', meaningAr: 'الوقاحة والتطاول وسوء الأدب', contextSentence: 'Lear cannot endure the brazen insolence of Oswald and his merciless daughters.' },
      { word: 'tempest', pos: 'n.', meaningEn: 'A violent, windy storm with rain or hail.', meaningAr: 'العاصفة الهوجاء والنوء الشديد', contextSentence: 'As a terrifying tempest gathers, Goneril and Regan order the castle gates locked against their father.' }
    ],
    synopsis: 'Lear arrives at Gloucester’s castle seeking refuge with Regan, only to find his loyal disguised messenger Kent locked in the humiliating public stocks. When Regan and Goneril unite, they coldly dismantle their father’s remaining semblance of sovereignty: they reduce his retinue from one hundred knights to fifty, then twenty-five, and finally ask why he needs even a single follower. Realizing they desire his utter subjugation, Lear cries out against their unnatural cruelty, declaring he will not weep even as his sanity begins to fracture. As night falls and a monstrous storm begins to howl, the sisters command Gloucester to shut the castle gates, leaving the eighty-year-old king exposed to the wild tempest.',
    synopsisAr: 'يصل لير إلى قصر جلوستر باحثاً عن مأوى عند ريجان، فيفاجأ بوضع رسوله المخلص كنت في المقطرة إمعاناً في إذلاله. تتحد الشقيقتان جونريل وريجان لتجريد والدهما من حراسه المائة، فتساومانه على خفضهم إلى 50 ثم 25، ثم تتساءلان: “ما حاجتك لخادم واحد؟”. يدرك لير قسوة جحودهما ويعلن أنه لن يذرف دمعة استعطاف رغم أن عقله يشارف على الانهيار. ومع هبوط الليل واندلاع عاصفة رعدية مرعبة، تأمر الشقيقتان بإغلاق أبواب القلعة بالمزاليج وترك الملك العجوز في العراء.',
    centralThemes: [
      { theme: 'Cruelty of Unchecked Power', themeAr: 'قسوة السلطة المطلقة وتجريد الضعفاء', explanation: 'Once gifted sovereignty, Goneril and Regan discard natural filial gratitude and systematically humiliate their benefactor.' },
      { theme: 'Identity Stripped to Nothingness', themeAr: 'تجريد الإنسان من مظاهر المكانة إلى العدم', explanation: 'Lear’s knights are not mere luxury; they represent his identity as king, man, and father.' }
    ],
    hotsQuestions: [
      {
        id: 'sec2_lit_act2_q1',
        question: '“O reason not the need: our basest beggars are in the poorest thing superfluous: allow not nature more than nature needs, man’s life’s as cheap as beast’s.” Explain Lear’s philosophical defense of his retinue.',
        questionAr: '“لا تسألي عن الحاجة؛ فحتى أفقر الشحاذين يملكون ما يفيض عن حاجتهم المجردة؛ فإن لم تسمحوا للطبيعة بأكثر مما يكفيها صار عيش الإنسان رخيصاً كالبهائم”. وضح دفاع لير الفلسفي عن حراسه.',
        focusTheme: 'Human Dignity vs. Animal Subsistence',
        quotation: 'O reason not the need: our basest beggars are in the poorest thing superfluous...',
        modelAnswer: 'Lear refutes his daughters’ cold utilitarian argument that he does not "need" knights. He asserts that human civilization and dignity reside in having more than mere biological survival requirements. Stripping away respect, symbols of honor, and status reduces human existence to animalistic squalor. The knights symbolize his humanity and sovereign dignity, which his daughters are actively erasing.',
        modelAnswerAr: 'يرفض لير منطق المنفعة البارد؛ فالإنسانية والكرامة لا تقاسان بما يحتاجه الجسد للبقاء بيولوجياً، بل بما يحفظ للمرء كرامته وقيمته كإنسان. تجريد الملك من رموزه ورجاله هو تجريد لإنسانيته وإرجاعه لمستوى البهائم.',
        rubricCriteria: ['Distinction between biological survival and human dignity', 'Symbolic value of the 100 knights', 'Critique of cold utilitarian cruelty']
      },
      {
        id: 'sec2_lit_act2_q2',
        question: 'How does the shutting of the castle gates against King Lear symbolize the complete breakdown of the moral, domestic, and political order?',
        questionAr: 'كيف يرمز إغلاق أبواب القلعة بالمزاليج في وجه الملك لير إلى الانهيار الكامل للنظام الأخلاقي والأسري والسياسي؟',
        focusTheme: 'Total Moral & Cosmic Collapse',
        modelAnswer: 'In Shakespeare’s era, sacred hospitality toward an aging father and reigning monarch was paramount. Locking the gates amidst a ferocious storm violates the laws of God, family, and state. It marks the total inversion of natural order: children lock out their parents, subjects lock out their sovereign, and civilization locks out humanity, leaving the fragile king to the merciless elements.',
        modelAnswerAr: 'يمثل إغلاق الأبواب بالمزاليج في وجه أب عجوز وملك مخلوع انتهاكاً صارخاً لقوانين السماء والأرض وأصول الضيافة؛ إنه قلب للنظام الطبيعي حيث يطرد الأبناء آباءهم خارج الحضارة ليواجهوا غضب الطبيعة والهلاك.',
        rubricCriteria: ['Violation of sacred domestic hospitality', 'Inversion of parental and royal hierarchies', 'Foreshadowing of the cosmic storm on the heath']
      }
    ]
  },

  // Act 3 Checkpoint (Units 5 & 6)
  {
    workTitle: 'King Lear',
    workTitleAr: 'مسرحية الملك لير',
    author: 'William Shakespeare',
    chapterNumber: 3,
    chapterTitle: 'Act 3: The Storm on the Heath, Mad King & Gloucester’s Blinding',
    chapterTitleAr: 'الفصل الثالث: العاصفة الهوجاء على الخلاء، جنون الملك، وجريمة سمل عيني جلوستر',
    keyVocabulary: [
      { word: 'heath', pos: 'n.', meaningEn: 'An open area of uncultivated desolate land with coarse grasses.', meaningAr: 'الخلاء والبرية الموحشة القاحلة', contextSentence: 'Lear wanders the desolate heath raging against the howling thunder and lightning.' },
      { word: 'cataracts', pos: 'n.', meaningEn: 'Downpours of torrential water; furious waterfalls.', meaningAr: 'طوفان وسيول المياه المنهمرة من السماء', contextSentence: '“Blow, winds, and crack your cheeks! rage! blow! You cataracts and hurricanoes!” cried Lear.' },
      { word: 'unaccommodated', pos: 'adj.', meaningEn: 'Unprovided with physical comforts, clothing, or shelter.', meaningAr: 'مجرد وعارٍ من مظاهر الحضارة والملبس', contextSentence: 'Lear tears off his royal robes, declaring that unaccommodated man is no more than a bare, forked animal.' },
      { word: 'treason', pos: 'n.', meaningEn: 'The crime of betraying one’s sovereign or country.', meaningAr: 'الخيانة العظمى للوطن أو الملك', contextSentence: 'Edmund betrays his own father Gloucester to Cornwall by revealing Gloucester’s contact with France as treason.' },
      { word: 'heinous', pos: 'adj.', meaningEn: 'Utterly odious, wicked, and shockingly monstrous.', meaningAr: 'بشع وشنيع ومروع في القسوة', contextSentence: 'Cornwall and Regan commit a heinous atrocity by gouging out Gloucester’s eyes.' },
      { word: 'madness', pos: 'n.', meaningEn: 'The state of having a serious mental illness; severe insanity.', meaningAr: 'الجنون وفقدان الرشاد العقلي', contextSentence: 'Lear’s outward madness allows him to perceive deep moral truths about social injustice.' },
      { word: 'bedlam', pos: 'n.', meaningEn: 'An asylum for the insane; a scene of uproar and confusion.', meaningAr: 'مأوى المجاذيب والمشردين البائسين', contextSentence: 'Edgar disguises himself as “Poor Tom,” a bedlam beggar wandering in filthy rags.' },
      { word: 'redemption', pos: 'n.', meaningEn: 'The action of saving or being saved from sin, error, or evil.', meaningAr: 'الخلاص الروحي والتطهر من الخطايا', contextSentence: 'Through suffering, Lear attains spiritual redemption and realizes his former vanity.' }
    ],
    synopsis: 'On the storm-blasted heath, Lear challenges the cosmic tempest, begging the thunderbolts to strike his daughters’ ingratitude. Accompanied only by the loyal Fool and disguised Kent, Lear meets Edgar disguised as “Poor Tom,” an impoverished madman. Seeing Tom naked in the mud, Lear has a profound epiphany: stripped of robes and titles, man is merely a “bare, forked animal.” In compassion, the once-proud monarch tears off his own clothes, achieving true sanity in madness. Meanwhile, inside the castle, Edmund betrays his father Gloucester to Cornwall and Regan. In one of drama’s most brutal scenes, Cornwall gouges out Gloucester’s eyes for assisting Lear. In his physical blindness, Gloucester finally learns the truth: Edmund is the traitor, and the banished Edgar is his loyal son.',
    synopsisAr: 'في قلب العاصفة الهوجاء على الخلاء الموحش، يتحدى الملك لير الرعود والبروق مطالباً السماء بسحق جحود بناته. يرافقه مهرجه الوفي وكنت المتخفي، ويلتقون بـ “إدجار” متنكراً في هيئة الشحاذ المجنون “توم المسكين”. عند رؤيته عارياً في الوحل، يدرك لير حقيقة الوجود الإنساني؛ فالإنسان المجرد ليس سوى “حيوان عارٍ ذي شعبتين”. يمزق لير ثيابه الملكية متضامناً مع البؤساء، فيصل إلى قمة الحكمة عبر جنونه الظاهري. في القصر، يخون إدموند والده جلوستر، فيقوم كورنوال وريجان بسمل عيني جلوستر في مشهد وحشي، ليدرك جلوستر وهو أعمى الحقيقة: إدموند هو الخائن، وإدجار المنفي هو الابن البار.',
    centralThemes: [
      { theme: 'The Cosmic Storm as Psychological Mirror', themeAr: 'العاصفة الكونية كمرآة للعاصفة النفسية', explanation: 'The howling tempest mirrors the raging chaos in Lear’s fractured mind.' },
      { theme: 'Sight vs. Insight (Blindness & Truth)', themeAr: 'البصر والعمى في مواجهة البصيرة والحقيقة', explanation: 'Gloucester famously laments: “I stumbled when I saw.” Physical blindness gives him spiritual sight.' }
    ],
    hotsQuestions: [
      {
        id: 'sec2_lit_act3_q1',
        question: '“Is man no more than this? Consider him well... Unaccommodated man is no more but such a bare, forked animal as thou art. Off, off, you lendings!” Analyze Lear’s moral transformation during his encounter with Poor Tom.',
        questionAr: '“أليس الإنسان أكثر من هذا؟ انظروا إليه جيداً... الإنسان المجرد ليس سوى حيوان عارٍ ذي شعبتين مثلك؛ اخلعي أيتها الثياب المستعارة!”. حلل التحول الفكري والأخلاقي للير عند لقائه بتوم المسكين.',
        focusTheme: 'Existential Epiphany & The Naked Human Condition',
        quotation: 'Is man no more than this? Consider him well... Unaccommodated man is no more but such a bare, forked animal as thou art. Off, off, you lendings!',
        modelAnswer: 'This scene is the emotional and philosophical turning point of the tragedy. Confronting Poor Tom’s utter destitution strips away all Lear’s aristocratic delusions of regal superiority. Lear realizes that kings, beggars, and outcasts share the exact same fragile, naked humanity. By tearing off his royal "lendings" (clothes), Lear strips off the false trappings of social power, renouncing vanity and achieving true empathy for the forgotten and downtrodden of the earth.',
        modelAnswerAr: 'يمثل هذا المشهد نقطة التحول الكبرى في المسرحية؛ فرؤية بؤس توم تطهر لير من أوهام العظمة الملكية، ويدرك أن الملك والشحاذ يتساويان في هشاشة الجسد وضعف الطبيعة البشرية. خلع ثيابه هو خلع لزيف الألقاب، وتدشين لولادة إنسانية جديدة تمتلئ بالتعاطف الصادق مع المعذبين في الأرض.',
        rubricCriteria: ['Recognition of Poor Tom as mirror of naked humanity', 'Symbolism of stripping off royal robes', 'Shift from royal arrogance to deep democratic compassion']
      },
      {
        id: 'sec2_lit_act3_q2',
        question: 'Gloucester states: “I have no way, and therefore want no eyes; I stumbled when I saw.” How does physical blinding operate as an ironic metaphor for moral awakening in the play?',
        questionAr: 'يقول جلوستر: “لم يعد لي طريق، ولذا لا أريد عينين؛ لقد تعثرت حين كنت مبصراً”. كيف يعمل سمل العينين كمفارقة درامية للاستنارة الأخلاقية والبصيرة؟',
        focusTheme: 'Irony of Blindness vs. True Insight',
        quotation: 'I have no way, and therefore want no eyes; I stumbled when I saw.',
        modelAnswer: 'Shakespeare crafts a profound paradox: when Gloucester had physical eyesight, he was spiritually blind to Edmund’s treacherous malice and Edgar’s innocent loyalty. Only when his physical eyes are horrifically gouged out does his spiritual insight awaken to moral reality. True vision belongs to the soul, not the optic nerve; physical deprivation purges folly and reveals authentic truth.',
        modelAnswerAr: 'يصنع شكسبير مفارقة فلسفية بالغة العمق؛ فعندما كان جلوستر يملك عينين سليمين، كان أعمى البصيرة صدق نفاق إدموند وكذب إخلاص إدجار. وعندما فُقد بصره بالتعذيب، انفتحت بصيرته على حقيقة الأمور، ليثبت أن الرؤية الحقيقية تنبع من نقاء الروح لا من حاسة النظر.',
        rubricCriteria: ['Analysis of physical sight versus spiritual insight', 'Gloucester’s tragic realization of Edmund’s treason', 'Thematic connection with Lear’s sanity in madness']
      }
    ]
  }
];

// ------------------------------------------------------------------------------------------------
// 3. SECONDARY 3 (GRADE 12): GREAT EXPECTATIONS by Charles Dickens
// Chapters 1 to 6 (Term 1 Core Syllabus)
// Themes: Social Class & Ambition, Guilt & Conscience, True Gentleman vs. Snobbery, Loyalty
// ------------------------------------------------------------------------------------------------
export const greatExpectationsChapters: LiteratureChapterModule[] = [
  // Chapter 1
  {
    workTitle: 'Great Expectations',
    workTitleAr: 'رواية آمال كبرى',
    author: 'Charles Dickens',
    chapterNumber: 1,
    chapterTitle: 'Chapter 1: The Terrifying Encounter in the Marshes',
    chapterTitleAr: 'الفصل الأول: اللقاء المرعب بين الطفل بيب والمدان الهارب في المستنقعات',
    keyVocabulary: [
      { word: 'marshes', pos: 'n.', meaningEn: 'Low, wet, swampy coastal land overgrown with grasses and reeds.', meaningAr: 'المستنقعات الساحلية الرطبة والموحلة', contextSentence: 'Young Pip lived in the bleak, misty marsh country down by the winding river.' },
      { word: 'convict', pos: 'n.', meaningEn: 'A person found guilty of a criminal offense and serving a prison sentence.', meaningAr: 'سجين ومدان ومحكوم عليه قضائياً', contextSentence: 'An escaped convict with a heavy leg-iron seized Pip in the lonely churchyard.' },
      { word: 'churchyard', pos: 'n.', meaningEn: 'The burial ground surrounding a parochial church; cemetery.', meaningAr: 'فناء الكنيسة والمقبرة المجاورة لها', contextSentence: 'Pip was crying by his parents’ tombstones in the bleak churchyard when Magwitch appeared.' },
      { word: 'iron', pos: 'n.', meaningEn: 'A heavy metal ring or fetter locked around a prisoner’s ankle.', meaningAr: 'القيد الحديدي المربوط بكاحل السجين', contextSentence: 'The escaped convict limped painfully, dragging his rusted iron shackle across the graves.' },
      { word: 'file', pos: 'n.', meaningEn: 'A hardened steel hand tool with rough ridges for smoothing or cutting metal.', meaningAr: 'مبرد حديدي لقطع وتآكل السلاسل', contextSentence: 'The ferocious convict threatened to cut Pip’s throat unless the boy brought him food and a file.' },
      { word: 'orphan', pos: 'n.', meaningEn: 'A child whose parents are dead.', meaningAr: 'يتيم الأبوين محروم من حنان الوالدين', contextSentence: 'Pip was a lonely orphan raised “by hand” by his harsh older sister, Mrs. Joe Gargery.' },
      { word: 'gibbet', pos: 'n.', meaningEn: 'An upright gallows where executed pirates or felons were hung as a public warning.', meaningAr: 'المشنقة العامة لتعليق القراصنة والمجرمين', contextSentence: 'Against the bleak sunset sky, the black wooden gibbet stood on the edge of the marshes.' },
      { word: 'hulks', pos: 'n.', meaningEn: 'Old decommissioned ships anchored in rivers used as floating prisons for convicts.', meaningAr: 'سفن السجون العائمة للمدانين في النهر', contextSentence: 'The Hulks lay across the marshes, housing hundreds of chained convicts awaiting transport.' }
    ],
    synopsis: 'On a bleak Christmas Eve afternoon, seven-year-old orphan Philip Pirrip (Pip) visits the lonely churchyard where his parents and five infant siblings lie buried. Suddenly, a terrifying, shivering man in coarse gray rags with a rusted iron on his leg leaps from behind the tombstones. This escaped convict (Abel Magwitch) grabs Pip, turns him upside down, and threatens that an imaginary savage companion will tear out his heart and liver unless the boy returns the following dawn with “wittles” (food) and a metal file from the blacksmith’s forge. Terrified for his life, Pip promises to obey and flees home across the gloomy, misty marshes.',
    synopsisAr: 'في عشية عيد الميلاد، يزور الطفل اليتيم فيليب بيريب (بيب) مقبرة القرية الكئيبة في المستنقعات ليبكي فوق قبور والديه وإخوته. فجأة، يخرج من خلف شواهد القبور رجل مرعب بثياب خشنة وساق مقيدة بالحديد (ماجويتش)، فيمسك بالطفل ويهدده بالذبح وتناول كبده ما لم يسرق له طعاماً ومبرداً لقطع القيد من ورشة الحداد جو جارجري. يرتعد بيب خوفاً ويعد بتنفيذ الأوامر، ويهرب مذعوراً عبر الضباب.',
    centralThemes: [
      { theme: 'Innocence & Childhood Terror', themeAr: 'براءة الطفولة ورعب المجهول', explanation: 'Dickens masterfully depicts a child’s vulnerability when confronted by an incomprehensible, menacing adult world.' },
      { theme: 'Crime, Punishment & Social Outcasts', themeAr: 'الجريمة والعقاب ونبذ المجتمع للمدانين', explanation: 'Magwitch’s animalistic desperation highlights the brutal cruelty of Victorian penal systems.' }
    ],
    hotsQuestions: [
      {
        id: 'sec3_lit_ch1_q1',
        question: 'How does Dickens use the bleak setting of the marshes and the churchyard in Chapter 1 to establish Pip’s emotional isolation and foreshadow his future struggles?',
        questionAr: 'كيف وظف تشارلز ديكنز البيئة الكئيبة للمستنقعات وفناء الكنيسة في الفصل الأول لعكس عزلة بيب والتنبؤ بصراعاته القادمة؟',
        focusTheme: 'Gothic Atmosphere & Psychological Landscape',
        modelAnswer: 'The desolate marsh country — damp, misty, bounded by black rivers and decaying wooden gibbets — functions as an objective correlative for Pip’s psychological state. As an orphan lacking parental affection, the cold cemetery symbolizes his emotional deprivation. The sudden arrival of the convict from among the dead illustrates that Pip’s life will be haunted and defined by forces of crime, guilt, and social ostracism.',
        modelAnswerAr: 'تعمل بيئة المستنقعات الكئيبة والموحلة كمرآة عاكسة للوحدة النفسية التي يعيشها الطفل اليتيم؛ فالمقبرة الباردة والمشانق المعلقة في الأفق تعكس حرمانه العاطفي، وخروج المدان من بين القبور ينبئ بأن حياة بيب ستظل مرتبطة بالجريمة والشعور بالذنب.',
        rubricCriteria: ['Connection between marshland atmosphere and Pip’s inner sadness', 'Symbolic role of the cemetery and tombstones', 'Foreshadowing of the convict’s lifelong impact on Pip’s destiny']
      },
      {
        id: 'sec3_lit_ch1_q2',
        question: 'Despite his sheer terror, what early signs of natural empathy or moral sensitivity does young Pip display toward the savage convict?',
        questionAr: 'على الرغم من رعبه الشديد، ما العلامات المبكرة للتعاطف الإنساني والحس الأخلاقي التي أظهرها بيب نحو المدان الشرس؟',
        focusTheme: 'Instinctive Compassion vs. Fear',
        modelAnswer: 'Even while terrified for his life, Pip notices that the convict is shivering violently from cold, limping on a bleeding leg, and teeth chattering from starvation. Pip wishes him a timid "Good night, sir" when released, revealing an innate gentleness and courtesy that transcends fear. This foundational compassion establishes the moral seed that will later redeem both Pip and Magwitch.',
        modelAnswerAr: 'رغم رعبه، لاحظ بيب ارتعاد المدان من البرد وعرجه الدامي وجوعه القارص، فخاطبه بأدب فطري قائلاً: “طابت ليلتك يا سيدي”. هذا التعاطف الفطري يظهر نقاء سريرة الطفل وهو البذرة التي ستقود لخلاص ماجويتش لاحقاً.',
        rubricCriteria: ['Specific textual details of the convict’s misery', 'Pip’s courteous and sympathetic behavior despite danger', 'Thematic significance of innate moral goodness']
      }
    ]
  },

  // Chapter 2 & 3 Combined Checkpoint (Units 2 & 3)
  {
    workTitle: 'Great Expectations',
    workTitleAr: 'رواية آمال كبرى',
    author: 'Charles Dickens',
    chapterNumber: 2,
    chapterTitle: 'Chapters 2 & 3: The Stolen Pork Pie & Pity on the Battery',
    chapterTitleAr: 'الفصلان 2 و3: سرقة فطيرة اللحم والشعور بالشفقة والذنب في المستنقعات',
    keyVocabulary: [
      { word: 'blacksmith', pos: 'n.', meaningEn: 'A person who makes and repairs things in iron by hand.', meaningAr: 'الحداد صانع المشغولات والأدوات الحديدية', contextSentence: 'Kind Joe Gargery was the village blacksmith, a gentle giant of immense goodness.' },
      { word: 'forge', pos: 'n.', meaningEn: 'A blacksmith’s workshop containing a hearth for heating metal.', meaningAr: 'ورشة الحدادة والكير', contextSentence: 'Pip tiptoed into the dark forge at dawn to steal Joe’s file for the desperate convict.' },
      { word: 'pantry', pos: 'n.', meaningEn: 'A small room or closet where food, provisions, and dishes are stored.', meaningAr: 'خزانة حفظ المؤن والأطعمة في المنزل', contextSentence: 'Filled with terror, Pip crept into the pantry and took bread, cheese, mincemeat, and a savoury pork pie.' },
      { word: 'guilt', pos: 'n.', meaningEn: 'A feeling of having committed wrong or violated moral law.', meaningAr: 'الإحساس بالذنب وتأنيب الضمير', contextSentence: 'Pip’s agonizing guilt made him imagine the wooden floorboards and misty cattle were shouting “Thief!”' },
      { word: 'battery', pos: 'n.', meaningEn: 'An artillery fortification mounting cannons along the marsh coast.', meaningAr: 'الحصن والمدفعية الساحلية القديمة', contextSentence: 'Pip carried the stolen food and file out to the old stone battery in the freezing fog.' },
      { word: 'compassion', pos: 'n.', meaningEn: 'Sympathetic pity and concern for the sufferings or misfortunes of others.', meaningAr: 'الرحمة والشفقة الإنسانية العميقة', contextSentence: 'Seeing the starving convict wolf down the food, Pip felt spontaneous compassion: “I am glad you enjoy it.”' },
      { word: 'larceny', pos: 'n.', meaningEn: 'Theft of personal property; stealing.', meaningAr: 'السرقة والاختلاس الجنائي', contextSentence: 'Pip felt like a criminal guilty of petty larceny against his beloved brother-in-law Joe.' },
      { word: 'tickler', pos: 'n.', meaningEn: 'A wax-ended cane used by Mrs. Joe to beat young Pip.', meaningAr: 'عصا الخيزران المكسوة بالشمع للضرب والتأديب', contextSentence: 'Mrs. Joe frequently disciplined Pip with “Tickler,” instilling constant fear in the household.' }
    ],
    synopsis: 'Pip returns to the forge where he lives with his fiery, abusive sister Mrs. Joe and her gentle, saintly husband Joe Gargery. Plagued by immense moral terror, Pip steals a pork pie, brandy, bread, and a file from the pantry and forge before sunrise. Running through the dense fog, he encounters a second bruised convict with a slashed face before reaching Magwitch at the ruined battery. Magwitch devours the food ravenously like a famished dog. When Pip politely says, “I am glad you enjoy it,” Magwitch is visibly moved by the child’s gentle kindness. When Pip mentions the other escaped convict with the bruised face, Magwitch flies into a violent, jealous rage and begins furiously filing at his leg-iron, swearing vengeance.',
    synopsisAr: 'يعود بيب إلى المنزل حيث يعيش مع أخته القاسية وزوجها الحداد الطيب جو جارجري. مع بزوغ فجر عيد الميلاد، يدفعه الرعب والضمير لسرقة فطيرة لحم وجبن ومبرد من الورشة. في طريقه بالمستنقعات يقابل مداناً آخر مشوه الوجه، قبل أن يصل إلى ماجويتش الذي يلتهم الطعام بنهم شديد. يعامله بيب برقة قائلاً: “يسعدني أنك تستمتع به”، فيتأثر ماجويتش بعطف الصبي. وعندما يخبره بيب عن المدان الآخر، يشتعل ماجويتش غضباً ويبدأ بنشر قيده بالمبرد مقسماً على الانتقام من غريمه.',
    centralThemes: [
      { theme: 'Guilt & The Tortured Conscience', themeAr: 'عذاب الضمير والشعور المكبوت بالإثم', explanation: 'Pip’s acute moral sensibility makes him perceive the entire natural world accusing him of theft.' },
      { theme: 'The Transformative Power of Kindness', themeAr: 'قوة العطف والإحسان في تحويل القلوب القاسية', explanation: 'Pip’s simple, courteous words awaken humanity inside the hardened criminal Magwitch.' }
    ],
    hotsQuestions: [
      {
        id: 'sec3_lit_ch2_q1',
        question: '“I am glad you enjoy it.” How does this simple, spontaneous statement by Pip alter Magwitch’s perception of the human race?',
        questionAr: '“يسعدني أنك تستمتع بطعامك”. كيف غيرت هذه العبارة العفوية البسيطة من بيب نظرة ماجويتش للعالم والإنسانية؟',
        focusTheme: 'Gratitude, Grace & The Seed of Devotion',
        quotation: 'I am glad you enjoy it.',
        modelAnswer: 'Throughout his brutal existence in Victorian prisons and streets, Magwitch had experienced only violence, hatred, and persecution. He expected cruelty and deceit. Pip’s courteous words — spoken without condescension or hypocrisy — are the first gentle, human words ever directed to him. This unprompted grace touches the hardened convict’s soul, planting the seed of lifelong gratitude that leads him years later to secretly make Pip a gentleman.',
        modelAnswerAr: 'عاش ماجويتش حياة بائسة لم يعرف فيها سوى القسوة والسياط والمطاردة؛ لذا شكلت كلمات بيب الرقيقة أول ومضة إنسانية وعطف حقيقي يصادفه في حياته. غرست تلك العبارة في قلبه امتناناً أبدياً دفعه بعد سنوات لتسخير كل ثروته لخدمة بيب وجعله نبيلاً مرموقاً.',
        rubricCriteria: ['Contrast between Magwitch’s brutalized past and Pip’s kindness', 'The psychological impact of unconditional courtesy', 'The link between this moment and Magwitch becoming Pip’s secret benefactor']
      },
      {
        id: 'sec3_lit_ch2_q2',
        question: 'Analyze how Dickens portrays Pip’s guilt as psychological projection onto the natural landscape of the marshes.',
        questionAr: 'حلل كيف صور تشارلز ديكنز شعور بيب بالذنب كإسقاط نفسي على طبيعة المستنقعات والحيوانات من حوله.',
        focusTheme: 'Psychological Projection & Childish Conscience',
        modelAnswer: 'Dickens demonstrates his mastery of psychological realism through Pip’s guilty conscience. To Pip’s terrified imagination, inanimate nature comes alive to denounce his crime: the damp mist appears like a spectral witness, the wooden fence posts seem to grab his coat, and the grazing marsh cows appear to glare at him and moo "Stop, thief!" This anthropomorphic projection proves Pip’s innate moral purity; he cannot commit even a coerced theft without profound internal torment.',
        modelAnswerAr: 'يجسد ديكنز براعته النفسية في تصوير عذاب الضمير؛ حيث تخيل بيب أن الطبيعة كلها تلاحقه: الضباب يشهد ضده، وخشب السياج يجذبه كشرطي، والماشية تصيح فيه “أيها اللص”. هذا الإسقاط يؤكد نقاء ضمير بيب الفطري الذي لا يحتمل الإثم حتى لو كان مرغماً.',
        rubricCriteria: ['Examples of nature anthropomorphized by Pip’s guilt', 'Psychological realism of childhood conscience', 'Indication of innate moral sensitivity']
      }
    ]
  },

  // Chapter 4, 5 & 6 Checkpoint (Units 4, 5 & 6)
  {
    workTitle: 'Great Expectations',
    workTitleAr: 'رواية آمال كبرى',
    author: 'Charles Dickens',
    chapterNumber: 4,
    chapterTitle: 'Chapters 4 - 6: The Christmas Dinner, The Soldiers’ Arrest & Magwitch’s Noble Sacrifice',
    chapterTitleAr: 'الفصول 4-6: عشاء الميلاد المتوتر، اقتحام الجنود، وتضحية ماجويتش النبيلة لإنقاذ بيب',
    keyVocabulary: [
      { word: 'apprehension', pos: 'n.', meaningEn: 'Anxiety or fear that something bad or unpleasant will happen.', meaningAr: 'التوجس والخوف من اكتشاف السر', contextSentence: 'Pip sat through Christmas dinner in agonizing apprehension that the missing pie would be exposed.' },
      { word: 'sanctimonious', pos: 'adj.', meaningEn: 'Making a hypocritical show of religious or moral superiority.', meaningAr: 'مراءٍ متظاهر بالتقوى والفضيلة الزائفة', contextSentence: 'Uncle Pumblechook delivered sanctimonious moral lectures criticizing ungrateful young boys.' },
      { word: 'handcuffs', pos: 'n.', meaningEn: 'A pair of lockable metal rings joined by a chain used on prisoners.', meaningAr: 'الأصفاد والكلبشات الحديدية', contextSentence: 'Soldiers suddenly pounded on the forge door holding broken handcuffs that needed mending.' },
      { word: 'scuffle', pos: 'n./v.', meaningEn: 'A short, confused fight or struggle at close quarters.', meaningAr: 'عراك واشتباك بالأيدي في الوحل', contextSentence: 'In the deep ditch, the soldiers discovered Magwitch and the other convict locked in a savage scuffle.' },
      { word: 'exculpate', pos: 'v.', meaningEn: 'Show or declare that someone is not guilty of wrongdoing.', meaningAr: 'يبرئ ساحة شخص آخر وينفي عنه التهمة', contextSentence: 'Magwitch generously exculpates young Pip by falsely confessing that he stole the pie himself.' },
      { word: 'chivalry', pos: 'n.', meaningEn: 'Courteous and honorable behavior, especially towards the weak.', meaningAr: 'الفروسية والمروءة والشهامة الأخلاقية', contextSentence: 'The coarse convict demonstrated true moral chivalry by taking the blame upon his own shoulders.' },
      { word: 'penitence', pos: 'n.', meaningEn: 'The action of feeling or showing sorrow and regret for having done wrong.', meaningAr: 'التوبة والندم الحقيقي', contextSentence: 'Pip watched with deep penitence as Magwitch was rowed back to the black prison ship.' },
      { word: 'hulk', pos: 'n.', meaningEn: 'A black floating prison ship moored in the estuary.', meaningAr: 'سفينة السجن العائمة المظلمة', contextSentence: 'The Hulks swallowed the convict back into darkness, but Magwitch’s sacrifice remained etched in Pip’s soul.' }
    ],
    synopsis: 'During a miserable Christmas dinner with Mrs. Joe, Joe, Uncle Pumblechook, and Mr. Wopsle, the adults continuously torment Pip with moralizing insults. Just as Mrs. Joe goes to the pantry to retrieve the pork pie and Pip is about to bolt in terror, red-coated soldiers burst in holding broken handcuffs for Joe to repair. Joining the soldiers on a marsh manhunt, Pip and Joe witness Magwitch tackling the second convict (his hated enemy Compeyson) in a muddy ditch. Instead of fleeing, Magwitch ensures Compeyson is recaptured. Then, meeting Pip’s terrified gaze, Magwitch publicly confesses to the sergeant that he stole the food and file from the blacksmith himself, deliberately exculpating Pip and saving the boy from punishment. Magwitch is rowed away into the dark hulks, leaving Pip profoundly moved by the criminal’s selfless nobility.',
    synopsisAr: 'أثناء عشاء عيد الميلاد، يتناوب الضيوف (العم بومبلشوك والسيد ووبسل) على توبيخ بيب وإهانته. وحين همت أخته بإحضار الفطيرة المفقودة ليوشك بيب على الهرب، يقتحم جنود يحملون أصفاداً تالفة الورشة ليصلحها جو. ينطلق بيب وجو مع الجنود في المستنقعات بحثاً عن الهاربين، فيعثرون على ماجويتش وهو يصارع غريمه كومبيسون في خندق موحل. وقبل اقتياده لسفينة السجن، يلمح ماجويتش نظرات بيب المرتعدة، فيعلن أمام الجميع بشهامة أنه هو من سرق الفطيرة والمبرد من ورشة الحداد، مضحياً بنفسه ليبرئ ساحة الطفل. يُنقل ماجويتش إلى سفينة السجون في الليل تاركاً أثراً نبيلاً لا يُمحى في وجدان بيب.',
    centralThemes: [
      { theme: 'True Nobility vs. Social Respectability', themeAr: 'النبل الحقيقي في مواجهة الوجاهة الاجتماعية الزائفة', explanation: 'The self-righteous churchgoers (Pumblechook, Mrs. Joe) are cruel hypocrites, whereas the chained convict exhibits sacrificial honor.' },
      { theme: 'Complicity & Loyalty to the Outcast', themeAr: 'الوفاء للمظلومين والارتباط الأخلاقي', explanation: 'Pip’s loyalty to Joe and Magwitch becomes the defining crucible of his character.' }
    ],
    hotsQuestions: [
      {
        id: 'sec3_lit_ch4_q1',
        question: 'Contrast the behavior of the “respectable” adults at the Christmas dinner table (Mrs. Joe, Uncle Pumblechook, Mr. Wopsle) with the behavior of the outlaw Magwitch when arrested.',
        questionAr: 'قارن بين سلوك البالغين “المحترمين” على مائدة العيد (الأخت، العم بومبلشوك، ووبسل) وسلوك المدان الخارج عن القانون ماجويتش لحظة القبض عليه.',
        focusTheme: 'Dickensian Social Satire: True vs. False Morality',
        modelAnswer: 'Dickens delivers biting social satire through this dramatic contrast. The so-called respectable citizens — landowners, church clerks, and pious homemakers — display cruelty, vanity, emotional sadism, and hypocrisy, constantly berating an innocent orphan boy. In stark contrast, the despised, chained felon Magwitch exhibits genuine Christian charity and moral chivalry by taking the blame for the stolen food to protect a terrified child from a beating. Dickens demonstrates that authentic nobility is found in the heart, not in social status.',
        modelAnswerAr: 'يقدم ديكنز هجاءً اجتماعياً لاذعاً؛ فالشخصيات “المحترمة” ظاهرياً تتظاهر بالتقوى لكنها تمارس القسوة والتنمر على طفل يتيم، بينما المدان المنبوذ والمكبل بالأصفاد يظهر شهامة وفروسية أخلاقية نادرة حين يعترف كذباً بالسرقة ليفدي بيب ويحميه من العقاب، مؤكداً أن النبل الحقيقي ينبع من نقاء السريرة لا المكانة الاجتماعية.',
        rubricCriteria: ['Contrast between adult cruelty and Magwitch’s sacrifice', 'Dickensian critique of sanctimonious Victorian respectability', 'The reversal of conventional moral expectations']
      },
      {
        id: 'sec3_lit_ch4_q2',
        question: 'Why does Magwitch prioritize capturing and punishing his rival Compeyson over securing his own freedom? What does this rivalry foreshadow about Victorian social class and justice?',
        questionAr: 'لماذا فضل ماجويتش إسقاط غريمه كومبيسون والانتقام منه على الهروب بحريته؟ وماذا تنبئ هذه العداوة عن الطبقية والعدالة في العصر الفيكتوري؟',
        focusTheme: 'Class Injustice & Vengeance',
        modelAnswer: 'Magwitch’s obsession with capturing Compeyson reveals deep, unhealed trauma born of systemic class injustice. Compeyson is an educated gentleman swindler whose refined appearance previously earned him a light prison sentence, whereas common, impoverished Magwitch received brutal penal servitude. Magwitch cares more about dragging down his aristocratic betrayer than saving his own skin. This dynamic foreshadows the central premise of the novel: the corrupt privilege of the upper classes contrasted with the exploited lower orders.',
        modelAnswerAr: 'تفضيل ماجويتش للانتقام من كومبيسون ينبع من مرارة الظلم الطبقي؛ فكومبيسون نصاب متعلم يرتدي ثياب النبلاء فنال حكماً مخففاً، بينما نال ماجويتش البائس أقسى العقوبات. هذا الصراع يمهد للقضية الكبرى في الرواية حول زيف العدالة الفيكتورية وتواطؤ القانون مع الأثرياء ضد الفقراء.',
        rubricCriteria: ['Explanation of Compeyson as the educated gentleman criminal', 'The class bias of the Victorian legal system', 'Foreshadowing of Pip’s quest to become a "gentleman"']
      }
    ]
  }
];
