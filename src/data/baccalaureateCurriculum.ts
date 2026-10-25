import { UnitCurriculum, UnitExam, GradeCurriculumCatalog, CurriculumQuestion, LiteratureChapterModule } from '../types/curriculum.ts';
import {
  bacLitSec1Ch1,
  bacLitSec1Ch2,
  bacLitSec1Ch3,
  bacLitSec2Act1,
  bacLitSec2Act2,
  bacLitSec2Act3,
  bacLitSec3Ch1,
  bacLitSec3Ch2,
  bacLitSec3Ch3
} from './baccalaureateLiterature.ts';

import { createBaccalaureateUnit } from './baccalaureateUnitFactory.ts';
import {
  bacSec1Unit2,
  bacSec1Unit3,
  bacSec1Unit4,
  bacSec1Unit5,
  bacSec1Unit6,
  bacSec2Unit2,
  bacSec2Unit3,
  bacSec2Unit4,
  bacSec2Unit5,
  bacSec2Unit6,
  bacSec3Unit2,
  bacSec3Unit3,
  bacSec3Unit4,
  bacSec3Unit5,
  bacSec3Unit6
} from './baccalaureateUnitsData.ts';

export {
  createBaccalaureateUnit,
  bacSec1Unit2,
  bacSec1Unit3,
  bacSec1Unit4,
  bacSec1Unit5,
  bacSec1Unit6,
  bacSec2Unit2,
  bacSec2Unit3,
  bacSec2Unit4,
  bacSec2Unit5,
  bacSec2Unit6,
  bacSec3Unit2,
  bacSec3Unit3,
  bacSec3Unit4,
  bacSec3Unit5,
  bacSec3Unit6
};

// =================================================================================================
// 1. SECONDARY 1 - EGYPTIAN BACCALAUREATE (GRADE 10)
// =================================================================================================

export const bacSec1Unit1 = createBaccalaureateUnit(
  10,
  'Secondary 1 (Baccalaureate) - الصف الأول الثانوي',
  1,
  1,
  'Sustainable Global Frontiers',
  'الحدود البيئية العالمية والتنمية المستدامة',
  'Ecosystem resilience, biocentric ethics, biodiversity stewardship, and international environmental conventions',
  'Inversion with Negative & Restrictive Adverbials',
  'الأسلوب المقلوب مع ظروف النفي والحصر (Inversion)',
  'Negative adverbials (e.g. Seldom, Rarely, Scarcely, Never, Under no circumstances) placed at the head of a clause necessitate auxiliary inversion (Auxiliary + Subject + Main Verb).',
  [
    { word: 'biocentric', meaningAr: 'مرتكز على قدسية الحياة البيئية وحمايتها', partOfSpeech: 'adjective', def: 'Viewing all living organisms as possessing intrinsic moral value.', ex: 'A biocentric philosophy prioritizes ecological health over commercial exploitation.', exAr: 'تقدم الفلسفة البيئية الحيوية سلامة النظم البيئية على الاستغلال التجاري.', collocation: 'biocentric worldview' },
    { word: 'depletion', meaningAr: 'استنزاف وتآكل الموارد الطبيعية', partOfSpeech: 'noun', def: 'Reduction in the number or quantity of something valuable.', ex: 'Over-irrigation leads to the depletion of ancient subterranean aquifers.', exAr: 'يؤدي الإفراط في الري إلى استنزاف الخزانات الجوفية القديمة.', collocation: 'resource depletion' },
    { word: 'resilience', meaningAr: 'مرونة وقدرة النظم البيئية على التعافي', partOfSpeech: 'noun', def: 'The capacity of an ecosystem to recover quickly from environmental trauma.', ex: 'Red Sea coral biomes demonstrate extraordinary evolutionary resilience against warming.', exAr: 'تُظهر حيود البحر الأحمر المرجانية مرونة تطورية استثنائية ضد الاحترار.', collocation: 'ecological resilience' },
    { word: 'stewardship', meaningAr: 'رعاية ومسؤولية بيئية مستدامة', partOfSpeech: 'noun', def: 'The responsible ethical planning and management of shared planetary resources.', ex: 'Environmental stewardship requires international accords and local community cooperation.', exAr: 'تتطلب الرعاية البيئية المستدامة اتفاقات دولية وتنسيقاً مع المجتمعات المحلية.', collocation: 'environmental stewardship' },
    { word: 'anthropogenic', meaningAr: 'بشري المنشأ ومسبب بفعل الإنسان', partOfSpeech: 'adjective', def: 'Originating from human activity, especially environmental impact.', ex: 'Anthropogenic carbon emissions accelerate ocean acidification drastically.', exAr: 'تعمل الانبعاثات الكربونية بشرية المنشأ على تسريع حمضية المحيطات بشكل حاد.' },
    { word: 'sedimentation', meaningAr: 'ترسيب الطمي والرواسب الضارة', partOfSpeech: 'noun', def: 'The accumulation of sediment that smothers delicate coral beds.', ex: 'Coastal construction causes sedimentation that blocks sunlight from reefs.', exAr: 'تسبب أعمال البناء الساحلية ترسيبات تعجب ضوء الشمس عن الشعاب المرجانية.' },
    { word: 'equilibrium', meaningAr: 'توازن واستقرار حيوي دقيق', partOfSpeech: 'noun', def: 'A state in which opposing forces or influences are balanced.', ex: 'Marine protected areas restore the natural equilibrium between predators and prey.', exAr: 'تستعيد المحميات البحرية التوازن الطبيعي بين الكائنات المفترسة وفرائسها.' },
    { word: 'biodiversity', meaningAr: 'التنوع البيولوجي والأحيائي', partOfSpeech: 'noun', def: 'The variety of plant and animal life in a particular biome.', ex: 'Ras Mohammed sanctuary shelters exceptional marine biodiversity.', exAr: 'تحتضن محمية رأس محمد تنوعاً بيولوجياً بحرياً استثنائياً وفريداً.' },
    { word: 'mitigate', meaningAr: 'يخفف ويلطف من وطأة الآثار السلبية', partOfSpeech: 'verb', def: 'To make something bad or dangerous less severe or harmful.', ex: 'Transitioning to solar power mitigates the severity of climate disruption.', exAr: 'يسهم التحول إلى الطاقة الشمسية في تخفيف وطأة الاضطرابات المناخية.' },
    { word: 'bleaching', meaningAr: 'ابيضاض وتلف الشعاب المرجانية', partOfSpeech: 'noun', def: 'The whitening of coral caused by thermal stress and algae expulsion.', ex: 'Marine heatwaves cause devastating coral bleaching across the tropics.', exAr: 'تتسبب موجات الحر البحرية في ابيضاض واسع ومدمّر للشعاب المرجانية.' },
    { word: 'telemetry', meaningAr: 'القياس والرصد التلقائي عن بعد', partOfSpeech: 'noun', def: 'The collection of data at remote points and transmission to receivers.', ex: 'Satellite telemetry monitors sea surface temperatures in real time.', exAr: 'تقوم أنظمة القياس عن بعد عبر الأقمار الصناعية بمراقبة حرارة البحر لحظياً.' },
    { word: 'phenotype', meaningAr: 'النمط الظاهري والخصائص الوراثية الملحوظة', partOfSpeech: 'noun', def: 'The set of observable characteristics of an individual from genes.', ex: 'Scientists isolated heat-tolerant coral phenotypes for restorative propagation.', exAr: 'عزل العلماء أنماطاً ظاهرية مرجانية مقاومة للحرارة لإعادة إكثارها.' },
    { word: 'refugium', meaningAr: 'ملاذ تطوري آمن للكائنات', partOfSpeech: 'noun', def: 'An area in which a population can survive periods of unfavorable conditions.', ex: 'The northern Red Sea serves as a planetary thermal refugium for corals.', exAr: 'يعد شمال البحر الأحمر ملاذاً حرارياً وتطورياً آمناً للشعاب المرجانية.' },
    { word: 'conservation', meaningAr: 'الحفاظ على البيئة الطبيعية', partOfSpeech: 'noun', def: 'The prevention of wasteful use of a resource or loss of species.', ex: 'Marine conservation projects protect rare dugongs and sea turtles.', exAr: 'تحمي مشاريع الصون البيئي البحري حيوانات أطوم البحر والسلاحف النادرة.' },
    { word: 'unscathed', meaningAr: 'سالم ومعافى دون أي أذى', partOfSpeech: 'adjective', def: 'Without suffering any injury, damage, or harm.', ex: 'Sinai reefs emerged unscathed from the extreme summer heatwave.', exAr: 'خرجت شعاب سيناء سالمة دون ضرر من الموجة الحارة الصيفية القياسية.' },
    { word: 'indigenous', meaningAr: 'سكان أصليون ومحليون في المنطقة', partOfSpeech: 'adjective', def: 'Originating or occurring naturally in a particular place; native.', ex: 'Indigenous Bedouin communities possess invaluable ecological lore.', exAr: 'يمتلك سكان البادية الأصليون معارف بيئية تراثية لا تقدر بثمن.' },
    { word: 'autonomous', meaningAr: 'ذاتي الحركة والتشغيل المستقل', partOfSpeech: 'adjective', def: 'Acting independently or having the freedom to operate autonomously.', ex: 'Autonomous solar buoys continuously transmit salinity readings.', exAr: 'ترسل العوامات الشمسية ذاتية التشغيل قياسات الملوحة البحرية باستمرار.' },
    { word: 'imperil', meaningAr: 'يعرض للخطر الشديد والهلاك', partOfSpeech: 'verb', def: 'To put at risk of being harmed, injured, or destroyed.', ex: 'Discharging untreated sewage imperils fragile coastal marine nurseries.', exAr: 'يُعرّف تصريف الصرف غير المعالج الحضانات البحرية الساحلية للهلاك.' },
    { word: 'fortitude', meaningAr: 'صلابة وصمود وقوة تحمل', partOfSpeech: 'noun', def: 'Courage or resilience in pain or adversity.', ex: 'The biological fortitude of northern corals surprises climate scientists.', exAr: 'تثير الصلابة البيولوجية للشعاب الشمالية دهشة علماء المناخ.' },
    { word: 'protocol', meaningAr: 'بروتوكول علمي ولوائح إجرائية معتمدة', partOfSpeech: 'noun', def: 'The official procedure or system of rules governing scientific affairs.', ex: 'Strict diving protocols prevent recreational damage to underwater pinnacles.', exAr: 'تمنع بروتوكولات الغوص الصارمة وقوع أضرار بالقمم الصخرية المرجانية.' }
  ],
  'The Fragile Equilibrium of Sinai Coral Reefs',
  'The Gulf of Aqaba and the Ras Mohammed Marine Sanctuary host some of the most resilient coral ecosystems in the contemporary world. While global ocean temperatures rise precipitously, northern Red Sea corals exhibit extraordinary thermal tolerance. Scientists hypothesize that post-glacial larval migration selected for heat-hardy phenotypes capable of surviving temperatures 3 to 4 degrees Celsius above global bleaching thresholds. However, thermal fortitude does not confer blanket immunity. Unchecked coastal urbanization, anthropogenic sedimentation, and micro-plastic pollution increasingly imperil reef integrity. Preserving these evolutionary refugia demands holistic stewardship transcending regional boundaries, coupling rigorous scientific surveillance with empowered indigenous coastal guardians.',
  'International Symposium on Red Sea Marine Conservation',
  'Dr. Tarek (Marine Biologist) & Professor Helen (Ecological Policy Director)',
  'Dr. Tarek: "Welcome to Sharm El-Sheikh, Professor Helen. Our telemetry shows northern Red Sea scleractinian corals have survived summer anomalies unscathed."\nHelen: "Remarkable data, Tarek. Yet local stressors like wastewater runoff and anchoring damage are accelerating. Seldom do we encounter a marine biome with such evolutionary promise coupled with such acute local vulnerability."\nDr. Tarek: "Precisely. Under no circumstances can we permit industrial discharge near the reef fringes. Our ministerial mandate for 2026/2027 establishes twenty-four autonomous monitoring buoys powered by solar wave energy."\nHelen: "If the Egyptian Baccalaureate scholars analyze this telemetry in real time, they will bridge academic inquiry with empirical conservation leadership."',
  {
    vocab: [
      {
        id: 'bac_s1_u1_v1',
        skill: 'Vocabulary',
        question: 'The term "stewardship" in environmental treaties denotes __________.',
        options: [
          'the responsible ethical care and management of common ecological resources',
          'the commercial privatization of national wildlife parks',
          'the complete prohibition of scientific research',
          'the rapid industrialization of agricultural areas'
        ],
        correctAnswer: 'A',
        explanation: 'Stewardship embodies ethical responsibility and sustainable preservation of shared natural heritage.'
      },
      {
        id: 'bac_s1_u1_v2',
        skill: 'Vocabulary',
        question: 'Coral species displaying high "resilience" are characterized by their ability to __________.',
        options: [
          'perish immediately when water salinity changes slightly',
          'withstand thermal anomalies and recover from environmental disturbances',
          'grow exclusively in freshwater rivers and lakes',
          'resist all forms of direct sunlight completely'
        ],
        correctAnswer: 'B',
        explanation: 'Resilience defines the physiological and ecological capability to rebound from shock or stress.'
      },
      {
        id: 'bac_s1_u1_v3',
        skill: 'Vocabulary',
        question: 'Which of the following phrases demonstrates the most academic collocation?',
        options: [
          'make resource depletion faster for profit',
          'mitigate anthropogenic sedimentation to preserve marine biomes',
          'throw plastics into the reef without thought',
          'build huge skyscrapers on coral reefs'
        ],
        correctAnswer: 'B',
        explanation: '"Mitigate anthropogenic sedimentation" represents high-level academic environmental register.'
      },
      {
        id: 'bac_s1_u1_v4',
        skill: 'Vocabulary',
        question: 'An antonym for "biocentric" in philosophical discourse is __________.',
        options: [
          'anthropocentric (human-centered dominance over nature)',
          'symbiotic',
          'sustainable',
          'biodiverse'
        ],
        correctAnswer: 'A',
        explanation: 'Anthropocentric (human-centered) stands in direct philosophical opposition to biocentric (life-centered).'
      }
    ],
    grammar: [
      {
        id: 'bac_s1_u1_g1',
        skill: 'Grammar',
        question: 'Choose the syntactically correct inverted sentence:',
        options: [
          'Rarely we have witnessed such astonishing biodiversity in arid ecosystems.',
          'Rarely have we witnessed such astonishing biodiversity in arid ecosystems.',
          'Rarely we did witnessed such astonishing biodiversity in arid ecosystems.',
          'Rarely have witnessed we such astonishing biodiversity in arid ecosystems.'
        ],
        correctAnswer: 'B',
        explanation: 'Inversion requires the auxiliary "have" before the subject "we": Rarely + have + we + witnessed.'
      },
      {
        id: 'bac_s1_u1_g2',
        skill: 'Grammar',
        question: 'Under no circumstances __________ unauthorized maritime vessels to anchor within the coral reserve zone.',
        options: [
          'will the maritime authority permit',
          'the maritime authority will permit',
          'did permit the maritime authority',
          'permits the maritime authority'
        ],
        correctAnswer: 'A',
        explanation: 'Following "Under no circumstances", auxiliary "will" precedes the subject "the maritime authority".'
      },
      {
        id: 'bac_s1_u1_g3',
        skill: 'Grammar',
        question: 'Scarcely __________ the telemetry sensors when the oceanic current shifted dramatically.',
        options: [
          'the divers had calibrated',
          'had calibrated the divers',
          'had the divers calibrated',
          'did calibrate the divers'
        ],
        correctAnswer: 'C',
        explanation: 'Scarcely + had + subject (the divers) + past participle (calibrated).'
      },
      {
        id: 'bac_s1_u1_g4',
        skill: 'Grammar',
        question: 'Not only __________ thermal stress, but they also synthesize defensive heat-shock proteins.',
        options: [
          'the Red Sea corals withstand',
          'do the Red Sea corals withstand',
          'are the Red Sea corals withstanding',
          'the Red Sea corals do withstand'
        ],
        correctAnswer: 'B',
        explanation: '"Not only" at clause head requires auxiliary do/does + subject + base verb.'
      }
    ],
    reading: [
      {
        id: 'bac_s1_u1_r1',
        skill: 'Reading',
        question: 'What is the central paradox identified regarding the northern Red Sea corals?',
        options: [
          'They possess evolutionary thermal fortitude, yet remain acutely vulnerable to local anthropogenic pressures.',
          'They grow faster in polluted runoff than in pristine maritime reserves.',
          'They bleach at 15 degrees Celsius but thrive at 50 degrees Celsius.',
          'They were planted artificially by scientists during the 19th century.'
        ],
        correctAnswer: 'A',
        explanation: 'The passage highlights that their high thermal threshold does not shield them from local pollution or construction.'
      },
      {
        id: 'bac_s1_u1_r2',
        skill: 'Reading',
        question: 'The author uses the phrase "evolutionary refugia" to signify that the Gulf of Aqaba corals __________.',
        options: [
          'are obsolete remnants of an ancient geological epoch with no modern significance',
          'serve as a critical sanctuary and reservoir of heat-tolerant genes for global reef rehabilitation',
          'cannot survive outside specialized university laboratory aquariums',
          'should be extracted and sold as commercial souvenirs'
        ],
        correctAnswer: 'B',
        explanation: 'Refugia denotes habitats that preserve species during periods of unfavorable regional/global conditions.'
      },
      {
        id: 'bac_s1_u1_r3',
        skill: 'Reading',
        question: 'Which inference is best supported by the passage?',
        options: [
          'Global warming poses zero threat to Red Sea marine life.',
          'Local conservation policy cannot rely solely on the corals’ natural biological resilience.',
          'Bedouin guardians should be excluded from future environmental policy.',
          'Micro-plastics dissolve harmlessly when exposed to coral larvae.'
        ],
        correctAnswer: 'B',
        explanation: 'Because local stressors can still destroy heat-hardy corals, proactive human stewardship is indispensable.'
      },
      {
        id: 'bac_s1_u1_r4',
        skill: 'Reading',
        question: 'The tone of the passage can best be described as __________.',
        options: [
          'dismissive and indifferent toward international ocean protocols',
          'alarmist without providing any scientific or empirical evidence',
          'analytically cautious yet optimistic about targeted stewardship',
          'purely nostalgic regarding historical naval expeditions'
        ],
        correctAnswer: 'C',
        explanation: 'The author balances analytical rigor and realistic danger with hope for empowered scientific stewardship.'
      },
      {
        id: 'bac_s1_u1_r5',
        skill: 'Reading',
        question: 'What rhetorical purpose does the reference to "larval migration" serve?',
        options: [
          'It provides a biological explanation for the corals’ anomalous thermal resistance.',
          'It demonstrates that corals cannot reproduce without human intervention.',
          'It argues that larval migration is the primary cause of coral bleaching.',
          'It proves that the Red Sea was created less than two centuries ago.'
        ],
        correctAnswer: 'A',
        explanation: 'The post-glacial migration bottleneck explains why only heat-tolerant genetic lineages populated the northern basin.'
      }
    ],
    listening: [
      {
        id: 'bac_s1_u1_l1',
        skill: 'Listening',
        question: 'According to Dr. Tarek, what does the latest telemetry reveal about the corals?',
        options: [
          'They suffered irreversible catastrophic bleaching during June.',
          'They survived summer temperature anomalies without undergoing bleaching.',
          'They migrated south toward the Indian Ocean.',
          'They stopped synthesizing calcium carbonate.'
        ],
        correctAnswer: 'B',
        explanation: 'Dr. Tarek states that corals survived summer anomalies unscathed.'
      },
      {
        id: 'bac_s1_u1_l2',
        skill: 'Listening',
        question: 'What specific technological solution is being deployed for the 2026/2027 ministerial mandate?',
        options: [
          'Diesel-powered fishing trawlers with tracking nets',
          'Twenty-four autonomous monitoring buoys powered by solar and wave energy',
          'Permanent concrete walls built around the coral perimeter',
          'Underwater satellite receivers that broadcast music to marine life'
        ],
        correctAnswer: 'B',
        explanation: 'The audio explicitly cites 24 autonomous buoys powered by solar wave energy.'
      },
      {
        id: 'bac_s1_u1_l3',
        skill: 'Listening',
        question: 'What role is envisioned for Egyptian Baccalaureate scholars?',
        options: [
          'Analyzing live telemetry data to connect academic inquiry with conservation leadership',
          'Financing the construction of coastal resorts',
          'Writing fictional novels about undersea monsters',
          'Working as tour guides on unregulated passenger boats'
        ],
        correctAnswer: 'A',
        explanation: 'Helen emphasizes that students analyzing telemetry bridges research with empirical leadership.'
      },
      {
        id: 'bac_s1_u1_l4',
        skill: 'Listening',
        question: 'What grammatical structure does Professor Helen use when highlighting the reef’s fragility?',
        options: [
          'Past continuous narrative',
          'Inversion with negative restrictive adverb: "Seldom do we encounter..."',
          'Imperative command for military maneuvers',
          'Future continuous passive'
        ],
        correctAnswer: 'B',
        explanation: 'Helen says: "Seldom do we encounter a marine biome with such evolutionary promise..."'
      }
    ],
    exam: [
      {
        id: 'bac_s1_u1_e1',
        skill: 'Vocabulary',
        question: 'The implementation of __________ measures is crucial to thwart irreparable damage to Egyptian biosphere reserves.',
        options: ['preemptive', 'negligent', 'cursory', 'obsolete'],
        correctAnswer: 'A',
        explanation: '"Preemptive" (taking action before an anticipated negative event) fits the academic preventative context.'
      },
      {
        id: 'bac_s1_u1_e2',
        skill: 'Grammar',
        question: 'Never before __________ so acutely aware of the existential threat posed by climatic instability.',
        options: ['have international bodies been', 'international bodies have been', 'were international bodies being', 'had been international bodies'],
        correctAnswer: 'A',
        explanation: 'Inverted word order: Never before + have + subject + been.'
      },
      {
        id: 'bac_s1_u1_e3',
        skill: 'Reading',
        question: 'In academic research, an "empirical hypothesis" must be capable of being __________.',
        options: ['falsified or corroborated through observable evidence', 'accepted unconditionally without data', 'hidden from peer reviewers', 'memorized without critical evaluation'],
        correctAnswer: 'A',
        explanation: 'Scientific hypotheses must be empirically testable and falsifiable.'
      },
      {
        id: 'bac_s1_u1_e4',
        skill: 'Listening',
        question: 'Solar and wave energy systems are classified as __________ power sources.',
        options: ['finite carbonaceous', 'renewable and non-emitting', 'chemically hazardous', 'depleting fossil'],
        correctAnswer: 'B',
        explanation: 'Solar and wave energy are quintessential renewable energy sources.'
      },
      {
        id: 'bac_s1_u1_e5',
        skill: 'Vocabulary',
        question: 'To "mitigate" the impacts of sea level rise means to __________.',
        options: ['exacerbate the vulnerability of low-lying deltas', 'lessen the gravity or severity of the impending consequences', 'deny the statistical validity of oceanographic data', 'relocate all industrial operations to mountain peaks'],
        correctAnswer: 'B',
        explanation: 'Mitigate = reduce, moderate, or alleviate negative impact.'
      },
      {
        id: 'bac_s1_u1_e6',
        skill: 'Grammar',
        question: 'Hardly __________ the conservation protocol when maritime shipping violations were detected.',
        options: ['the ministry ratified', 'did the ministry ratify', 'had the ministry ratified', 'was the ministry ratifying'],
        correctAnswer: 'C',
        explanation: 'Hardly + had + subject + past participle.'
      },
      {
        id: 'bac_s1_u1_e7',
        skill: 'Reading',
        question: 'Which factor poses the most immediate localized hazard to Sinai’s coastal reef systems?',
        options: ['Glacial melting in the Arctic circle', 'Direct anthropogenic sedimentation and unchecked coastal urbanization', 'Deep-sea geothermal vents', 'Astronomical lunar tides'],
        correctAnswer: 'B',
        explanation: 'The text highlights local anthropogenic sedimentation and urban runoff as immediate perils.'
      },
      {
        id: 'bac_s1_u1_e8',
        skill: 'Listening',
        question: 'Autonomous telemetry buoys provide researchers with __________ information.',
        options: ['delayed quarterly paper summaries', 'continuous real-time oceanographic and thermal data', 'commercial advertisements for maritime travelers', 'fictional naval narratives'],
        correctAnswer: 'B',
        explanation: 'Telemetry buoys transmit automated, continuous, real-time sensory data.'
      },
      {
        id: 'bac_s1_u1_e9',
        skill: 'Vocabulary',
        question: 'A scientist who embraces a "holistic" approach examines __________.',
        options: ['isolated components without regard to the larger system', 'the complex interconnections and overall cohesion of the ecosystem', 'only the economic profitability of maritime trade', 'ancient mythology rather than biological evidence'],
        correctAnswer: 'B',
        explanation: 'Holistic consideration addresses the interconnected totality rather than fractured parts.'
      },
      {
        id: 'bac_s1_u1_e10',
        skill: 'Grammar',
        question: 'Little __________ that their pioneering research would influence the 2026 international climate summit.',
        options: ['the young researchers realized', 'did the young researchers realize', 'have the young researchers realized', 'were the young researchers realizing'],
        correctAnswer: 'B',
        explanation: 'Little + auxiliary did + subject + base verb.'
      },
      {
        id: 'bac_s1_u1_e11',
        skill: 'Reading',
        question: 'Why did larval migration after the last glacial epoch select for heat-hardy coral phenotypes?',
        options: ['They had to traverse elevated thermal barriers in the southern Red Sea to colonize northern waters.', 'They were selectively bred in ancient Egyptian laboratories.', 'They mutated due to intense undersea volcanic eruptions.', 'They were shielded from all sunlight inside underwater caverns.'],
        correctAnswer: 'A',
        explanation: 'Larvae had to survive high temperatures at the southern gateway, filtering for heat-resilient genes.'
      },
      {
        id: 'bac_s1_u1_e12',
        skill: 'Listening',
        question: 'In Dr. Tarek’s symposium address, what is the primary prerequisite for effective coastal enforcement?',
        options: ['Ignoring local Bedouin coastal communities', 'Strict legal mandates prohibiting industrial discharge coupled with autonomous sensors', 'Allowing unmonitored commercial development', 'Relying exclusively on voluntary tourist cooperation'],
        correctAnswer: 'B',
        explanation: 'Strict mandates and autonomous sensor grids form the cornerstone of effective enforcement.'
      },
      {
        id: 'bac_s1_u1_e13',
        skill: 'Vocabulary',
        question: 'The word "fortitude" in the passage is most synonymous with __________.',
        options: ['fragility', 'endurance and strength', 'hesitation', 'apathy'],
        correctAnswer: 'B',
        explanation: 'Fortitude signifies moral or physical strength and endurance under duress.'
      },
      {
        id: 'bac_s1_u1_e14',
        skill: 'Grammar',
        question: 'Only after the committee inspected the marine sanctuary __________ the conservation accreditation.',
        options: ['they granted', 'did they grant', 'they had granted', 'were they granting'],
        correctAnswer: 'B',
        explanation: 'Only after [clause] + auxiliary did + subject + base verb.'
      },
      {
        id: 'bac_s1_u1_e15',
        skill: 'Reading',
        question: 'The author concludes that safeguarding the northern Red Sea coral reef requires __________.',
        options: ['transboundary cooperation bridging empirical science and indigenous community empowerment', 'closing the entire Red Sea to human transportation permanently', 'subsidizing oil refineries along the Gulf of Aqaba', 'discontinuing all international scientific research'],
        correctAnswer: 'A',
        explanation: 'The conclusion explicitly calls for holistic stewardship uniting science with local guardians.'
      },
      {
        id: 'bac_s1_u1_e16',
        skill: 'Listening',
        question: 'The tone of the collaborative dialogue between Dr. Tarek and Professor Helen is characterized by __________.',
        options: ['antagonistic scientific rivalry and mutual distrust', 'professional consensus and academic commitment to proactive youth leadership', 'sarcasm regarding ecological treaties', 'bureaucratic complacency'],
        correctAnswer: 'B',
        explanation: 'Both speakers collaborate constructively and agree on empowering Baccalaureate youth leaders.'
      }
    ]
  },
  bacLitSec1Ch1
);

// Secondary 1 Term 1 Revision Exam for Egyptian Baccalaureate
export const bacSec1Term1RevisionExam: UnitExam = {
  examId: 'bac_sec1_term1_comprehensive_exam_2026',
  examTitle: 'Egyptian Baccalaureate Sec 1 - Term 1 Comprehensive Mid-Year Examination (2026/2027)',
  examTitleAr: 'امتحان نصف العام الشامل للبكالوريا المصرية - الصف الأول الثانوي (مواصفات 2026/2027)',
  durationMinutes: 45,
  totalMarks: 40,
  questions: [
    {
      id: 'bac_s1_rev_q1',
      skill: 'Vocabulary',
      question: 'The synthesis of cutting-edge satellite telemetry and indigenous ecological knowledge represents a __________ paradigm in biosphere conservation.',
      options: ['consequential', 'negligible', 'superficial', 'derivative'],
      correctAnswer: 'A',
      explanation: '"Consequential" (having significant, momentous importance) fits the academic evaluation.'
    },
    {
      id: 'bac_s1_rev_q2',
      skill: 'Grammar',
      question: 'Seldom __________ such unanimity among international bioethicists regarding genetic privacy safeguards.',
      options: ['there has been', 'has there been', 'there was being', 'had been there'],
      correctAnswer: 'B',
      explanation: 'Inversion after Seldom: Seldom + has + there + been.'
    },
    {
      id: 'bac_s1_rev_q3',
      skill: 'Reading',
      question: 'When an academic author acknowledges an opposing argument before methodically deconstructing it, they are utilizing __________.',
      options: ['dogmatic assertion', 'concession and counter-argumentation', 'hyperbolic satire', 'circular reasoning'],
      correctAnswer: 'B',
      explanation: 'Concession followed by counter-argument is the hallmark of sophisticated academic discourse.'
    },
    {
      id: 'bac_s1_rev_q4',
      skill: 'Listening',
      question: 'In scholarly debate, active listening requires the evaluator to __________.',
      options: ['interrupt immediately whenever disagreements arise', 'discern nuanced premises, evaluate evidentiary validity, and synthesize counterpoints', 'focus solely on the speaker’s accent rather than argument', 'memorize verbatim every word without critique'],
      correctAnswer: 'B',
      explanation: 'Critical academic listening prioritizes discerning premises and evaluating evidence.'
    }
  ]
};

// =================================================================================================
// 2. COMPLETE BACCALAUREATE CATALOG FOR ALL SECONDARY GRADES (GRADES 10, 11, 12)
// =================================================================================================

export const baccalaureateSecondaryCatalog: GradeCurriculumCatalog[] = [
  // Secondary 1 (Grade 10) - Egyptian Baccalaureate
  {
    stage: 'Secondary',
    grade: 10,
    gradeLabel: 'Secondary 1 - الصف الأول الثانوي (البكالوريا المصرية)',
    gradeLabelAr: 'الصف الأول الثانوي (مسار البكالوريا المصرية المتقدم 2026/2027)',
    track: 'Egyptian Baccalaureate',
    secondaryPath: 'egyptian_baccalaureate',
    description: 'Egyptian Baccalaureate Grade 10 Track: Advanced syntactic inversion, academic lexis, HOTS critical comprehension, scientific symposia listening, and empirical research modules aligned with 2026/2027 standards.',
    semesters: [
      {
        semester: 1,
        semesterLabel: 'Term 1 - الفصل الدراسي الأول (Baccalaureate Track)',
        units: [bacSec1Unit1, bacSec1Unit2, bacSec1Unit3, bacSec1Unit4, bacSec1Unit5, bacSec1Unit6],
        revisionTitle: 'Term 1 Baccalaureate Comprehensive Assessment',
        revisionExam: bacSec1Term1RevisionExam
      },
      {
        semester: 2,
        semesterLabel: 'Term 2 - الفصل الدراسي الثاني (Baccalaureate Track)',
        units: [
          createBaccalaureateUnit(
            10,
            'Secondary 1 (Baccalaureate)',
            2,
            7,
            'Biosecurity & Pandemic Preparedness',
            'الأمن الحيوي والجاهزية للجوائح الصحية',
            'Epidemiological surveillance, vaccine diplomacy, microbiological hygiene, and bioethical jurisprudence',
            'The Subjunctive Mood in Formal Resolutions',
            'صيغة الطلب والإلزام المتقدمة (Subjunctive)',
            'In formal resolutions and executive recommendations (e.g. recommend, demand, insist that), the base form of the verb is employed without inflections.',
            [
              { word: 'pathogen', meaningAr: 'ميكروب ممرض ومسبب للمرض', partOfSpeech: 'noun', collocation: 'virulent pathogen' },
              { word: 'prophylaxis', meaningAr: 'وقاية طبية مانعة', partOfSpeech: 'noun', collocation: 'prophylactic intervention' }
            ],
            'Genomic Surveillance and Early Epidemic Interception in Alexandria',
            'Alexandria’s modern Mediterranean Centre for Disease Control has established an automated genomic sequencing network. By monitoring wastewater metagenomics and airborne particulate DNA, microbiologists can intercept microbial mutations weeks prior to symptomatic clinical surges.',
            'Global Health Policy Panel: Alexandria Summit',
            'Dr. Yasmine (Epidemiologist) & Dr. Arthur (WHO Delegate)',
            'Dr. Yasmine: "Our 2026 metagenomic surveillance protocol insists that every provincial healthcare facility submit wastewater isolates weekly."\nDr. Arthur: "An exemplary model, Yasmine. It is imperative that international funding sustain these proactive detection hubs."',
            {
              vocab: [
                {
                  id: 'bac_s1_u7_v1',
                  skill: 'Vocabulary',
                  question: 'The medical strategy of administering treatment to forestall disease onset is termed __________.',
                  options: ['prophylaxis', 'quackery', 'negligence', 'exacerbation'],
                  correctAnswer: 'A',
                  explanation: 'Prophylaxis denotes measures designed to preserve health and prevent disease spread.'
                },
                {
                  id: 'bac_s1_u7_v2',
                  skill: 'Vocabulary',
                  question: 'An organism that induces infectious pathology in its host is classified as a __________.',
                  options: ['pathogen', 'symbiont', 'herbivore', 'mineral'],
                  correctAnswer: 'A',
                  explanation: 'A pathogen is any biological agent that causes disease.'
                },
                {
                  id: 'bac_s1_u7_v3',
                  skill: 'Vocabulary',
                  question: 'Which word is the antonym of "virulent" in epidemiological studies?',
                  options: ['benign and innocuous', 'lethal', 'destructive', 'contagious'],
                  correctAnswer: 'A',
                  explanation: 'Benign/innocuous means mild and non-harmful, opposite of virulent.'
                },
                {
                  id: 'bac_s1_u7_v4',
                  skill: 'Vocabulary',
                  question: 'The term "metagenomics" refers to the analysis of __________.',
                  options: ['total genetic material recovered directly from environmental samples', 'ancient handwritten manuscripts', 'traditional folklore songs', 'astronomical radiation'],
                  correctAnswer: 'A',
                  explanation: 'Metagenomics is genomic analysis of community DNA extracted from environmental sources.'
                }
              ],
              grammar: [
                {
                  id: 'bac_s1_u7_g1',
                  skill: 'Grammar',
                  question: 'The ministerial health directive demands that every municipal clinic __________ wastewater samples weekly.',
                  options: ['submits', 'submit', 'submitted', 'would submit'],
                  correctAnswer: 'B',
                  explanation: 'The formal subjunctive after "demands that" uses the uninflected base verb "submit".'
                },
                {
                  id: 'bac_s1_u7_g2',
                  skill: 'Grammar',
                  question: 'It is imperative that the containment cordon __________ maintained without interruption.',
                  options: ['is', 'be', 'was', 'being'],
                  correctAnswer: 'B',
                  explanation: 'Subjunctive structure: It is imperative that + subject + base verb "be".'
                },
                {
                  id: 'bac_s1_u7_g3',
                  skill: 'Grammar',
                  question: 'The bioethics board recommended that the controversial experiment __________ immediately.',
                  options: ['be halted', 'is halted', 'halts', 'was halted'],
                  correctAnswer: 'A',
                  explanation: 'Passive subjunctive: recommended that + subject + be + past participle.'
                },
                {
                  id: 'bac_s1_u7_g4',
                  skill: 'Grammar',
                  question: 'We insist that the lead researcher __________ full transparency regarding clinical trial parameters.',
                  options: ['provides', 'provide', 'provided', 'shall provide'],
                  correctAnswer: 'B',
                  explanation: 'Subjunctive base form: insist that + subject + provide.'
                }
              ],
              reading: [
                {
                  id: 'bac_s1_u7_r1',
                  skill: 'Reading',
                  question: 'What distinctive advantage does metagenomic wastewater monitoring confer over conventional clinical diagnosis?',
                  options: [
                    'It intercepts outbreaks before clinical symptomatic surges occur in hospitals.',
                    'It eliminates the need for any laboratory reagents or personnel.',
                    'It guarantees that viruses can never mutate again.',
                    'It is completely free of charge and requires no electricity.'
                  ],
                  correctAnswer: 'A',
                  explanation: 'Wastewater metagenomics detects viral shedding in populations before symptomatic patients visit hospitals.'
                },
                {
                  id: 'bac_s1_u7_r2',
                  skill: 'Reading',
                  question: 'What is the primary implication of Alexandria’s Mediterranean Centre protocol?',
                  options: [
                    'Proactive surveillance replaces reactive emergency interventions.',
                    'All public hospitals will be closed in favor of online clinics.',
                    'Doctors will no longer examine individual patients.',
                    'Alexandria will ban all international shipping vessels.'
                  ],
                  correctAnswer: 'A',
                  explanation: 'Metagenomic monitoring shifts the health sector from reactive crisis response to proactive containment.'
                },
                {
                  id: 'bac_s1_u7_r3',
                  skill: 'Reading',
                  question: 'The author’s stance toward genetic surveillance can best be synthesized as __________.',
                  options: [
                    'wholly supportive of empirical prophylactic infrastructure',
                    'alarmist regarding modern scientific progress',
                    'skeptical of university-level research validity',
                    'advocating for the deregulation of pharmaceutical laboratories'
                  ],
                  correctAnswer: 'A',
                  explanation: 'The author clearly champions prophylactic scientific networks and evidence-based medicine.'
                },
                {
                  id: 'bac_s1_u7_r4',
                  skill: 'Reading',
                  question: 'The word "surges" in the context of the reading passage means __________.',
                  options: ['sudden, sharp escalations in patient admissions', 'gradual declines in illness', 'technical failures of sequencing software', 'water waves in the sea'],
                  correctAnswer: 'A',
                  explanation: 'Surges in clinical epidemiology denotes steep, sudden spikes in patient volume.'
                },
                {
                  id: 'bac_s1_u7_r5',
                  skill: 'Reading',
                  question: 'Which higher-order connection links Unit 1 (Ecosystems) and Unit 7 (Biosecurity)?',
                  options: [
                    'Both underscore that biological equilibrium requires rigorous empirical surveillance and preventative stewardship.',
                    'Neither topic has any relevance to modern Egyptian society.',
                    'Both argue that technology should replace all natural biological systems.',
                    'Both suggest that global warming is purely beneficial for all organisms.'
                  ],
                  correctAnswer: 'A',
                  explanation: 'Both units emphasize proactive stewardship, empirical surveillance, and planetary equilibrium.'
                }
              ],
              listening: [
                {
                  id: 'bac_s1_u7_l1',
                  skill: 'Listening',
                  question: 'What obligation does Dr. Yasmine’s protocol place upon municipal healthcare clinics?',
                  options: [
                    'Submitting wastewater isolates on a weekly basis',
                    'Purchasing private pharmaceutical stock',
                    'Halting all patient vaccinations',
                    'Publishing commercial advertisements'
                  ],
                  correctAnswer: 'A',
                  explanation: 'The dialogue specifies weekly submission of wastewater isolates.'
                },
                {
                  id: 'bac_s1_u7_l2',
                  skill: 'Listening',
                  question: 'How does Dr. Arthur characterize the Alexandria genomic surveillance model?',
                  options: [
                    'As an exemplary framework requiring sustained international funding',
                    'As an obsolete protocol that should be discarded',
                    'As an overly expensive experiment with no clinical benefit',
                    'As an unverified theoretical proposal'
                  ],
                  correctAnswer: 'A',
                  explanation: 'Arthur praises it as an exemplary model worthy of global partnership.'
                },
                {
                  id: 'bac_s1_u7_l3',
                  skill: 'Listening',
                  question: 'Which modal verb expressing recommendation is replaced by the subjunctive in the dialogue?',
                  options: ['must', 'should', 'could', 'might'],
                  correctAnswer: 'B',
                  explanation: 'The subjunctive construction ("insists that every clinic submit") replaces "should submit".'
                },
                {
                  id: 'bac_s1_u7_l4',
                  skill: 'Listening',
                  question: 'What tone characterizes Dr. Yasmine’s communication?',
                  options: ['Authoritative, professional, and scientifically rigorous', 'Hesitant and doubtful', 'Dismissive of foreign delegates', 'Hostile toward medical research'],
                  correctAnswer: 'A',
                  explanation: 'Dr. Yasmine communicates with scientific precision, clarity, and authority.'
                }
              ],
              exam: [
                {
                  id: 'bac_s1_u7_e1',
                  skill: 'Vocabulary',
                  question: 'A widespread occurrence of an infectious disease in a community at a particular time is an __________.',
                  options: ['epidemic', 'endotherm', 'epigram', 'epilogue'],
                  correctAnswer: 'A',
                  explanation: 'Epidemic refers to widespread infectious incidence.'
                },
                {
                  id: 'bac_s1_u7_e2',
                  skill: 'Grammar',
                  question: 'The treaty stipulates that all signatory nations __________ access to epidemiological data.',
                  options: ['grant', 'grants', 'granted', 'would grant'],
                  correctAnswer: 'A',
                  explanation: 'Formal subjunctive: stipulates that + subject + base verb "grant".'
                },
                {
                  id: 'bac_s1_u7_e3',
                  skill: 'Reading',
                  question: 'Preventative medicine yields superior long-term socioeconomic outcomes compared to __________ care.',
                  options: ['reactive emergency', 'collaborative', 'holistic', 'empirical'],
                  correctAnswer: 'A',
                  explanation: 'Reactive emergency medicine is far more costly and less effective than preventative health.'
                },
                {
                  id: 'bac_s1_u7_e4',
                  skill: 'Listening',
                  question: 'Global biosecurity networks rely upon __________ between national research bodies.',
                  options: ['seamless transparent collaboration', 'total secrecy and isolation', 'hostile military embargoes', 'refusal to share viral genomes'],
                  correctAnswer: 'A',
                  explanation: 'Transparent scientific collaboration is indispensable for global biosecurity.'
                }
              ]
            }
          )
        ]
      }
    ]
  },

  // Secondary 2 (Grade 11) - Egyptian Baccalaureate
  {
    stage: 'Secondary',
    grade: 11,
    gradeLabel: 'Secondary 2 - الصف الثاني الثانوي (البكالوريا المصرية)',
    gradeLabelAr: 'الصف الثاني الثانوي (مسار البكالوريا المصرية المتقدم 2026/2027)',
    track: 'Egyptian Baccalaureate',
    secondaryPath: 'egyptian_baccalaureate',
    description: 'Egyptian Baccalaureate Grade 11 Track: Comparative world literature, advanced discourse markers, epistemology, rhetoric analysis, and multi-variable analytical argumentation.',
    semesters: [
      {
        semester: 1,
        semesterLabel: 'Term 1 - الفصل الدراسي الأول (Baccalaureate Grade 11)',
        units: [
          createBaccalaureateUnit(
            11,
            'Secondary 2 (Baccalaureate)',
            1,
            1,
            'Epistemology & Cognitive Bias',
            'نظرية المعرفة والانحياز المعرفي (فلسفة العلوم)',
            'Confirmation bias, Cartesian skepticism, scientific falsifiability, and rational discourse',
            'Cleft Sentences for Rhetorical Emphasis',
            'الجمل المجزأة للتأكيد البلاغي (Cleft Sentences)',
            'Cleft sentences divide a message into two parts to highlight salient information (e.g. It was X that..., What X did was..., The reason why... is).',
            [
              { word: 'epistemology', meaningAr: 'نظرية المعرفة الفلسفية', partOfSpeech: 'noun', collocation: 'epistemological framework', def: 'The philosophical study of knowledge, its nature, justification, and scope.', ex: 'Epistemology investigates how empirical observation validates rational beliefs.', exAr: 'تبحث نظرية المعرفة في كيفية تأكيد الملاحظة التجريبية للمعتقدات العقلانية.' },
              { word: 'heuristics', meaningAr: 'قواعد استدلالية وتفكير حدسي سريع', partOfSpeech: 'noun', collocation: 'cognitive heuristics', def: 'Mental shortcuts and intuitive practical rules that ease cognitive load.', ex: 'Cognitive heuristics often accelerate choices but introduce systematic errors.', exAr: 'تسرع القواعد الاستدلالية اتخاذ القرارات لكنها تولد أخطاء منهجية.' },
              { word: 'confirmation bias', meaningAr: 'الانحياز التأكيدي والتعصب المسبق', partOfSpeech: 'noun', collocation: 'systemic confirmation bias', def: 'The tendency to favor information that corroborates pre-existing hypotheses.', ex: 'Confirmation bias impedes objective peer review in scientific debates.', exAr: 'يعيق الانحياز التأكيدي المراجعة النقدية الموضوعية في المناقشات العلمية.' },
              { word: 'insidious', meaningAr: 'خبيث ومستتر الأثر', partOfSpeech: 'adjective', collocation: 'insidious influence', def: 'Proceeding in a gradual, subtle way, but with harmful consequences.', ex: 'The insidious impact of misinformation destabilizes public discourse.', exAr: 'يزعزع الأثر الخبيث والمستتر للمعلومات المضللة استقرار الخطاب العام.' },
              { word: 'falsifiability', meaningAr: 'قابلية الدحض والاختبار التجريبي', partOfSpeech: 'noun', collocation: 'criterion of falsifiability', def: 'The capacity of a scientific proposition to be proven wrong by evidence.', ex: 'Karl Popper asserted that falsifiability is the hallmark of genuine science.', exAr: 'أكد كارل بوبر أن قابلية الدحض والتفنيد هي معيار العلم الحقيقي.' },
              { word: 'skepticism', meaningAr: 'الشك المنهجي النقدي', partOfSpeech: 'noun', collocation: 'methodological skepticism', def: 'A philosophical attitude of questioning assertions and demanding proof.', ex: 'Methodological skepticism prevents researchers from drawing premature conclusions.', exAr: 'يمنع الشك المنهجي الباحثين من التوصل إلى استنتاجات متسرعة.' },
              { word: 'empirical', meaningAr: 'تجريبي ومستند إلى الملاحظة والمختبر', partOfSpeech: 'adjective', collocation: 'empirical evidence', def: 'Based on, concerned with, or verifiable by observation or experiment.', ex: 'Empirical data corroborated the hypothesis across three international trials.', exAr: 'أيدت البيانات التجريبية الفرضية العلمية عبر ثلاث تجارب دولية.' },
              { word: 'fallacy', meaningAr: 'مغالطة منطقية وحجة باطلة', partOfSpeech: 'noun', collocation: 'logical fallacy', def: 'A mistaken belief or flawed argument based on unsound reasoning.', ex: 'The straw man fallacy misrepresents an opponent’s actual viewpoint.', exAr: 'تشوه مغالطة رجل القش المنطقية وجهة نظر الخصم الحقيقية.' },
              { word: 'dissonance', meaningAr: 'تنافر معرفي وصراع فكري داخلي', partOfSpeech: 'noun', collocation: 'cognitive dissonance', def: 'Psychological tension resulting from holding contradictory beliefs.', ex: 'Cognitive dissonance prompted the scholar to re-evaluate his assumptions.', exAr: 'دفع التنافر المعرفي الباحث إلى إعادة تقييم افتراضاته السابقة.' },
              { word: 'paradigm', meaningAr: 'نموذج فكري ونظرية حاكمة', partOfSpeech: 'noun', collocation: 'paradigm shift', def: 'A typical exemplar, pattern, or overarching conceptual framework.', ex: 'Quantum mechanics produced a monumental paradigm shift in modern physics.', exAr: 'أحدثت ميكانيكا الكم تحولاً نموذجياً هائلاً في الفيزياء الحديثة.' },
              { word: 'deduction', meaningAr: 'استدلال استنباطي من العام إلى الخاص', partOfSpeech: 'noun', collocation: 'logical deduction', def: 'Reasoning from general principles to reach specific, logically certain conclusions.', ex: 'Through mathematical deduction, the astrophysicist proved the theorem.', exAr: 'من خلال الاستدلال الاستنباطي الرياضي، برهن عالم الفيزياء على صحة النظرية.' },
              { word: 'induction', meaningAr: 'استقراء علمي من الخاص إلى العام', partOfSpeech: 'noun', collocation: 'empirical induction', def: 'Deriving general principles from specific recurring observations.', ex: 'Induction allows scientists to formulate universal laws from observed patterns.', exAr: 'يتيح الاستقراء العلمي صياغة قوانين عامة من الأنماط الملاحظة المتكررة.' },
              { word: 'presupposition', meaningAr: 'افتراض مسبق وغير مصرح به', partOfSpeech: 'noun', collocation: 'underlying presupposition', def: 'A tacit underlying assumption taken for granted at the outset.', ex: 'The interrogation rested on the false presupposition that data had been leaked.', exAr: 'ارتكز التحقيق على افتراض مسبق خاطئ بأن البيانات قد تم تسريبها.' },
              { word: 'rationality', meaningAr: 'العقلانية والمنطق السليم', partOfSpeech: 'noun', collocation: 'bounded rationality', def: 'The quality of being guided by reason, coherence, and sound evidence.', ex: 'Human rationality is bounded by emotional triggers and limited processing time.', exAr: 'تتقيد العقلانية الإنسانية بالمحفزات العاطفية ومحدودية وقت المعالجة الذهنية.' },
              { word: 'metacognition', meaningAr: 'ما وراء المعرفة والتفكير في التفكير', partOfSpeech: 'noun', collocation: 'metacognitive reflection', def: 'Awareness, monitoring, and deliberate analysis of one’s own thought processes.', ex: 'Developing metacognition enables students to detect flaws in their reasoning.', exAr: 'يمكّن تطوير مهارات ما وراء المعرفة الطلاب من اكتشاف الخلل في تفكيرهم.' },
              { word: 'bifurcated', meaningAr: 'منقسم إلى مسارين أو فرعين', partOfSpeech: 'adjective', collocation: 'bifurcated system', def: 'Divided or branched into two separate parts or pathways.', ex: 'Cognitive models propose a bifurcated system of rapid and analytical thinking.', exAr: 'تقترح النماذج المعرفية نظاماً منقسماً إلى نمطين: التفكير السريع والتحليلي.' },
              { word: 'cogent', meaningAr: 'حجة مقنعة ومفحمة وقوية', partOfSpeech: 'adjective', collocation: 'cogent argument', def: 'Clear, logical, and convincing in rhetorical presentation.', ex: 'The professor presented a cogent defense of epistemological realism.', exAr: 'قدم الأستاذ دفاعاً مقنعاً ومفحماً عن الواقعية المعرفية في الفلسفة.' },
              { word: 'corroborate', meaningAr: 'يؤيد ويعزز بأدلة دامغة', partOfSpeech: 'verb', collocation: 'corroborate findings', def: 'Confirm or give supportive evidence to a statement, theory, or finding.', ex: 'Multiple archaeological surveys corroborate the ancient historian’s accounts.', exAr: 'تؤيد المسوحات الأثرية المتعددة روايات المؤرخ القديم وتعززها.' },
              { word: 'dogmatic', meaningAr: 'متعصب للرأي وجزومي دون دليل', partOfSpeech: 'adjective', collocation: 'dogmatic stance', def: 'Inclined to lay down principles as incontrovertibly true without evidence.', ex: 'A dogmatic adherence to outdated doctrines impedes scientific discovery.', exAr: 'يعوق التمسك العقائدي المتعصب بالنظريات البالية الاكتشاف العلمي.' },
              { word: 'plausibility', meaningAr: 'وجاهة ومعقولية الاحتمال', partOfSpeech: 'noun', collocation: 'inherent plausibility', def: 'The quality of seeming reasonable, credible, or probable.', ex: 'The tribunal questioned the plausibility of the defendant’s convoluted alibi.', exAr: 'شككت المحكمة في معقولية ووجاهة الحجة الدفاعية المعقدة للمتهم.' }
            ],
            'The Architecture of Human Rationality',
            'In his seminal treatise on behavioural economics, Daniel Kahneman delineated the bifurcated architecture of human cognition: System 1, which operates automatically and heuristically, and System 2, which allocates deliberate, effortful attention. It is the insidious encroachment of cognitive biases—such as availability bias and anchoring—that persistently compromises objective decision-making.',
            'Philosophy of Science Seminar: Cairo University',
            'Professor Maged (Epistemologist) & Dr. Soraya (Cognitive Neuroscientist)',
            'Prof. Maged: "What Kahneman proved was that even highly credentialed statisticians succumb to cognitive heuristics."\nDr. Soraya: "Indeed. It was by instituting double-blind peer scrutiny that modern laboratory science managed to counteract systematic cognitive bias."',
            {
              vocab: [
                {
                  id: 'bac_s2_u1_v1',
                  skill: 'Vocabulary',
                  question: 'The philosophical discipline interrogating the nature, scope, and limits of human knowledge is __________.',
                  options: ['epistemology', 'etymology', 'entomology', 'echolocation'],
                  correctAnswer: 'A',
                  explanation: 'Epistemology is the philosophical study of knowledge and justified belief.'
                },
                {
                  id: 'bac_s2_u1_v2',
                  skill: 'Vocabulary',
                  question: 'Cognitive "heuristics" serve as __________.',
                  options: ['mental shortcuts that expedite problem-solving but may induce bias', 'surgical instruments for neural procedures', 'supercomputer mathematical processors', 'linguistic dictionaries'],
                  correctAnswer: 'A',
                  explanation: 'Heuristics are intuitive, quick decision-making strategies.'
                },
                {
                  id: 'bac_s2_u1_v3',
                  skill: 'Vocabulary',
                  question: 'To display "confirmation bias" is to __________.',
                  options: ['favor information that reinforces pre-existing hypotheses while disregarding discordant evidence', 'seek out opposing views with an open mind', 'rely exclusively on statistical calculus', 'refuse to make any decisions'],
                  correctAnswer: 'A',
                  explanation: 'Confirmation bias is cherry-picking data confirming prior beliefs.'
                },
                {
                  id: 'bac_s2_u1_v4',
                  skill: 'Vocabulary',
                  question: 'Which word is synonymous with "insidious"?',
                  options: ['subtly and gradually harmful', 'blatantly aggressive', 'overtly comical', 'genuinely philanthropic'],
                  correctAnswer: 'A',
                  explanation: 'Insidious describes treacherous, stealthy, gradual harm.'
                }
              ],
              grammar: [
                {
                  id: 'bac_s2_u1_g1',
                  skill: 'Grammar',
                  question: 'Convert for emphasis: "The lack of empirical replication undermined the theory." -> __________',
                  options: [
                    'It was the lack of empirical replication that undermined the theory.',
                    'What undermined was the lack of empirical replication the theory.',
                    'The theory was undermining because it lacked empirical replication.',
                    'Had the empirical replication lacked, the theory undermined.'
                  ],
                  correctAnswer: 'A',
                  explanation: 'Correct it-cleft structure: It was [focus] that [clause].'
                },
                {
                  id: 'bac_s2_u1_g2',
                  skill: 'Grammar',
                  question: '__________ astonished the evaluators was the meticulous consistency of the candidate’s argumentation.',
                  options: ['What', 'That', 'Which', 'It'],
                  correctAnswer: 'A',
                  explanation: 'Wh-cleft structure: What + verb phrase + was + focus.'
                },
                {
                  id: 'bac_s2_u1_g3',
                  skill: 'Grammar',
                  question: 'All __________ to resolve the dispute was an independent forensic audit.',
                  options: ['that they required', 'what was required them', 'it required', 'which requiring'],
                  correctAnswer: 'A',
                  explanation: 'All-cleft structure: All that they required was...'
                },
                {
                  id: 'bac_s2_u1_g4',
                  skill: 'Grammar',
                  question: 'The person __________ spearheaded the cognitive revolution in linguistic philosophy was Noam Chomsky.',
                  options: ['who', 'which', 'whom', 'whose'],
                  correctAnswer: 'A',
                  explanation: 'Wh-cleft with personal focus: The person who spearheaded...'
                }
              ],
              reading: [
                {
                  id: 'bac_s2_u1_r1',
                  skill: 'Reading',
                  question: 'According to Kahneman’s paradigm, System 2 cognitive processing is characterized by __________.',
                  options: [
                    'deliberate, slow, effortful, and analytical scrutiny',
                    'subconscious, lightning-fast instinctive reactions',
                    'spontaneous emotional reflexes',
                    'complete inactivity during waking hours'
                  ],
                  correctAnswer: 'A',
                  explanation: 'System 2 governs deliberate, effortful, analytical computation.'
                },
                {
                  id: 'bac_s2_u1_r2',
                  skill: 'Reading',
                  question: 'Why do double-blind peer procedures safeguard empirical integrity?',
                  options: [
                    'They systematically insulate research evaluation from subconscious biases and prestige cues.',
                    'They allow researchers to publish without showing their raw data.',
                    'They guarantee that scientific studies will never be challenged in the future.',
                    'They accelerate commercial advertising revenue.'
                  ],
                  correctAnswer: 'A',
                  explanation: 'Double-blind evaluation eliminates evaluator biases and reviewer preconceptions.'
                },
                {
                  id: 'bac_s2_u1_r3',
                  skill: 'Reading',
                  question: 'The author implies that objective judgment is __________.',
                  options: [
                    'an ongoing intellectual struggle requiring external cognitive safeguards and institutional rigor',
                    'naturally automatic for all human beings without training',
                    'completely impossible and futile to pursue',
                    'only achieved by automated computers with no human oversight'
                  ],
                  correctAnswer: 'A',
                  explanation: 'Human rationality requires methodical discipline and safeguards against biases.'
                },
                {
                  id: 'bac_s2_u1_r4',
                  skill: 'Reading',
                  question: 'The word "bifurcated" in the text means __________.',
                  options: ['divided into two distinct branches or systems', 'joined in a circular ring', 'shattered into microscopic fragments', 'magnified tenfold'],
                  correctAnswer: 'A',
                  explanation: 'Bifurcated = divided into two forks, parts, or streams.'
                },
                {
                  id: 'bac_s2_u1_r5',
                  skill: 'Reading',
                  question: 'What constitutes the rhetorical thesis of the passage?',
                  options: [
                    'Human cognitive architecture is prone to systematic biases that necessitate institutional scientific rigor.',
                    'System 1 thinking should be surgically eradicated from human biology.',
                    'Philosophy and psychology have no practical application in contemporary society.',
                    'All decisions should be made purely through gut instinct.'
                  ],
                  correctAnswer: 'A',
                  explanation: 'The passage synthesizes cognitive flaws with the necessity of rigorous empirical safeguards.'
                }
              ],
              listening: [
                {
                  id: 'bac_s2_u1_l1',
                  skill: 'Listening',
                  question: 'What surprised Professor Maged regarding Kahneman’s findings?',
                  options: [
                    'Even credentialed statisticians fall prey to cognitive heuristics.',
                    'Statisticians never make calculation errors.',
                    'Psychology cannot be studied with mathematics.',
                    'Computers are completely immune to data corruption.'
                  ],
                  correctAnswer: 'A',
                  explanation: 'Kahneman revealed that statistical experts frequently succumb to cognitive heuristics.'
                },
                {
                  id: 'bac_s2_u1_l2',
                  skill: 'Listening',
                  question: 'What methodological solution did Dr. Soraya cite to neutralize bias in modern laboratories?',
                  options: [
                    'Instituting double-blind peer scrutiny',
                    'Eliminating peer reviews entirely',
                    'Relying solely on intuition',
                    'Ignoring laboratory outliers'
                  ],
                  correctAnswer: 'A',
                  explanation: 'Dr. Soraya explicitly highlights double-blind peer scrutiny.'
                },
                {
                  id: 'bac_s2_u1_l3',
                  skill: 'Listening',
                  question: 'What syntactic device does Dr. Soraya deploy in her statement?',
                  options: [
                    'An it-cleft sentence: "It was by instituting double-blind peer scrutiny that..."',
                    'An imperative exclamation',
                    'A rhetorical question without an answer',
                    'A passive conditional inversion'
                  ],
                  correctAnswer: 'A',
                  explanation: 'She uses the it-cleft construction to emphasize the method.'
                },
                {
                  id: 'bac_s2_u1_l4',
                  skill: 'Listening',
                  question: 'The speakers’ exchange illustrates the convergence of __________.',
                  options: [
                    'epistemological philosophy and cognitive neuroscience',
                    'astronomy and agricultural economics',
                    'classical music and military engineering',
                    'mythological folklore and commercial real estate'
                  ],
                  correctAnswer: 'A',
                  explanation: 'The dialogue integrates philosophy of science with cognitive neuroscience.'
                }
              ],
              exam: [
                {
                  id: 'bac_s2_u1_e1',
                  skill: 'Vocabulary',
                  question: 'A theory that cannot be tested or refuted by any conceivable empirical evidence lacks scientific __________.',
                  options: ['falsifiability', 'verbosity', 'complacency', 'redundancy'],
                  correctAnswer: 'A',
                  explanation: 'Karl Popper established falsifiability as the demarcation of empirical science.'
                },
                {
                  id: 'bac_s2_u1_e2',
                  skill: 'Grammar',
                  question: 'It was her relentless dedication to evidentiary proof __________ earned her the prestigious fellowship.',
                  options: ['that', 'which', 'what', 'whom'],
                  correctAnswer: 'A',
                  explanation: 'Standard it-cleft formula: It was [focus] that [clause].'
                },
                {
                  id: 'bac_s2_u1_e3',
                  skill: 'Reading',
                  question: 'Critical thinking requires separating factual evidence from emotional __________.',
                  options: ['presupposition and prejudice', 'clarity and insight', 'empirical validation', 'logical deductions'],
                  correctAnswer: 'A',
                  explanation: 'Critical thinkers actively distinguish objective data from emotional prejudice.'
                },
                {
                  id: 'bac_s2_u1_e4',
                  skill: 'Listening',
                  question: 'In academic discourse, an argument must be grounded upon verifiable __________.',
                  options: ['empirical premises', 'fictional anecdotes', 'anonymous rumors', 'superstitious beliefs'],
                  correctAnswer: 'A',
                  explanation: 'Scholarly argumentation requires verified empirical premises.'
                }
              ]
            },
            bacLitSec2Act1
          ),
          bacSec2Unit2,
          bacSec2Unit3,
          bacSec2Unit4,
          bacSec2Unit5,
          bacSec2Unit6
        ]
      }
    ]
  },

  // Secondary 3 (Grade 12 - Egyptian Baccalaureate Capstone)
  {
    stage: 'Secondary',
    grade: 12,
    gradeLabel: 'Secondary 3 - الصف الثالث الثانوي (شهادة البكالوريا المصرية المتقدمة)',
    gradeLabelAr: 'الصف الثالث الثانوي (شهادة إتمام البكالوريا المصرية المتقدمة 2026/2027)',
    track: 'Egyptian Baccalaureate',
    secondaryPath: 'egyptian_baccalaureate',
    description: 'Egyptian Baccalaureate Grade 12 High-Stakes Capstone: Advanced rhetorical analysis, comparative global literature, research thesis formulation, international diplomacy discourse, and full Baccalaureate simulation papers.',
    semesters: [
      {
        semester: 1,
        semesterLabel: 'Term 1 - الفصل الدراسي الأول (Baccalaureate Grade 12)',
        units: [
          createBaccalaureateUnit(
            12,
            'Secondary 3 (Baccalaureate Capstone)',
            1,
            1,
            'Diplomatic Discourse & Global Jurisprudence',
            'الخطاب الدبلوماسي وفقه القانون الدولي',
            'International treaties, sovereignty, multilateral arbitration, rhetoric of persuasion, and human rights jurisprudence',
            'Participle Clauses & Nominalisation in Formal Academic Register',
            'الجمل الفعلية الإضافية (Participle Clauses) والأسلوب الاسمي الأكاديمي (Nominalisation)',
            'Participle clauses (Present, Past, and Perfect: Having achieved..., Situated upon...) replace adverbial clauses to produce sophisticated, dense academic prose.',
            [
              { word: 'jurisprudence', meaningAr: 'فلسفة القانون والفقه التشريعي', partOfSpeech: 'noun', collocation: 'comparative jurisprudence', def: 'The theoretical philosophy, science, and comparative study of law.', ex: 'Comparative jurisprudence analyzes human rights protections across constitutional jurisdictions.', exAr: 'يحلل الفقه التشريعي المقارن ضمانات حقوق الإنسان عبر النظم الدستورية.' },
              { word: 'sovereignty', meaningAr: 'السيادة الوطنية الكاملة للدولة', partOfSpeech: 'noun', collocation: 'territorial sovereignty', def: 'Supreme, independent political authority within a geographical territory.', ex: 'The United Nations Charter guarantees the inviolability of national sovereignty.', exAr: 'يضمن ميثاق الأمم المتحدة حصانة السيادة الوطنية للدول واستقلالها.' },
              { word: 'arbitration', meaningAr: 'التحكيم الدولي لفض النزاعات', partOfSpeech: 'noun', collocation: 'international arbitration', def: 'The settlement of a dispute by a neutral, legally authorized third party.', ex: 'International commercial arbitration resolves maritime transit disagreements peacefully.', exAr: 'يسوي التحكيم التجاري الدولي النزاعات البحرية بطرق سلمية عادلة.' },
              { word: 'multilateral', meaningAr: 'متعدد الأطراف والدول', partOfSpeech: 'adjective', collocation: 'multilateral treaties', def: 'Agreed upon, conducted by, or participated in by three or more nations.', ex: 'Egypt actively participates in multilateral treaties regarding global water security.', exAr: 'تشارك مصر بفاعلية في المعاهدات متعددة الأطراف المعنية بالأمن المائي العالمي.' },
              { word: 'treaty', meaningAr: 'معاهدة واتفاقية دولية ملزمة', partOfSpeech: 'noun', collocation: 'binding treaty', def: 'A formally concluded, ratified agreement between sovereign nation-states.', ex: 'The bilateral peace treaty was deposited with the UN Secretariat.', exAr: 'أودعت معاهدة السلام الثنائية لدى الأمانة العامة للأمم المتحدة.' },
              { word: 'ratification', meaningAr: 'التصديق البرلماني الرسمي', partOfSpeech: 'noun', collocation: 'parliamentary ratification', def: 'The official legislative approval and enactment of a negotiated treaty.', ex: 'The maritime covenant requires parliamentary ratification before entering into force.', exAr: 'تتطلب الاتفاقية البحرية تصديقاً برلمانياً رسمياً قبل دخولها حيز النفاذ.' },
              { word: 'impartial', meaningAr: 'نزيه ومحايد وغير منحاز', partOfSpeech: 'adjective', collocation: 'impartial tribunal', def: 'Treating all rivals or disputants equally; unbiased and objective.', ex: 'Judicial proceedings must remain strictly impartial and free from political leverage.', exAr: 'يجب أن تظل الإجراءات القضائية نزيهة ومحايدة تماماً بمعزل عن الضغوط السياسية.' },
              { word: 'adjudication', meaningAr: 'الفصل القضائي وإصدار الحكم', partOfSpeech: 'noun', collocation: 'legal adjudication', def: 'The formal giving or pronouncing of a judgment or decree in a legal case.', ex: 'The International Court of Justice delivered its final adjudication on the border.', exAr: 'أصدرت محكمة العدل الدولية حكمها وقضاءها النهائي بشأن ترسيم الحدود.' },
              { word: 'statute', meaningAr: 'نص تشريعي وقانون معتمد', partOfSpeech: 'noun', collocation: 'codified statute', def: 'A formal written enactment passed by a legislative governing authority.', ex: 'The penal statute penalizes transboundary corporate environmental violations.', exAr: 'يعاقب النص القانوني التشريعي الانتهاكات البيئية العابرة للحدود التي ترتكبها الشركات.' },
              { word: 'delegitimize', meaningAr: 'يسلب الشرعية وينزع المصداقية', partOfSpeech: 'verb', collocation: 'delegitimize authority', def: 'To withdraw or destroy the legitimate standing or credibility of an entity.', ex: 'Systematic procedural violations delegitimize the credibility of the election.', exAr: 'تسلب الانتهاكات الإجرائية المنهجية شرعية الانتخابات ومصداقيتها.' },
              { word: 'bilateral', meaningAr: 'ثنائي بين دولتين أو طرفين', partOfSpeech: 'adjective', collocation: 'bilateral accord', def: 'Involving, affecting, or binding two distinct parties or countries.', ex: 'Egypt and Greece signed a bilateral agreement delineating maritime borders.', exAr: 'وقعت مصر واليونان اتفاقية ثنائية لترسيم الحدود البحرية المشتركة.' },
              { word: 'covenant', meaningAr: 'ميثاق وعهد دولي ملزم', partOfSpeech: 'noun', collocation: 'international covenant', def: 'A solemn binding agreement between nations embodying moral and legal duties.', ex: 'The International Covenant on Civil and Political Rights establishes essential liberties.', exAr: 'يقرر العهد الدولي الخاص بالحقوق المدنية والسياسية الحريات الأساسية.' },
              { word: 'sanction', meaningAr: 'عقوبة وجزاء دولي معتمد', partOfSpeech: 'noun', collocation: 'economic sanctions', def: 'A threatened penalty for disobeying an international law or rule.', ex: 'Economic sanctions were enforced against states defying nuclear safety inspections.', exAr: 'فُرضت عقوبات اقتصادية على الدول التي ترفض تفتيش السلامة النووية.' },
              { word: 'annexation', meaningAr: 'ضم الأراضي غير القانوني', partOfSpeech: 'noun', collocation: 'unlawful annexation', def: 'The forcible military or political incorporation of external territory.', ex: 'International consensus rejects the unilateral annexation of foreign soil.', exAr: 'يرفض الإجماع الدولي ضم الأراضي الأجنبية بشكل أحادي بالقوة.' },
              { word: 'unimpeachable', meaningAr: 'لا يرقى إليه الشك وفوق الشبهات', partOfSpeech: 'adjective', collocation: 'unimpeachable evidence', def: 'Entirely beyond doubt, question, or reproach; utterly reliable.', ex: 'The maritime commission relied upon unimpeachable cartographic records.', exAr: 'اعتمدت لجنة الحدود البحرية على سجلات وخرائط تاريخية لا يرقى إليها أدنى شك.' },
              { word: 'diplomatic immunity', meaningAr: 'الحصانة الدبلوماسية المقررة', partOfSpeech: 'noun', collocation: 'invoke diplomatic immunity', def: 'The legal privilege shielding accredited envoys from host-nation prosecution.', ex: 'Diplomatic immunity preserves unhindered state communication during regional crises.', exAr: 'تحفظ الحصانة الدبلوماسية قنوات التواصل المستقلة بين الدول وقت الأزمات.' },
              { word: 'discourse', meaningAr: 'خطاب تحليلي وتواصل فكري مقنن', partOfSpeech: 'noun', collocation: 'diplomatic discourse', def: 'Written or spoken communication, debate, or formal discussion in a field.', ex: 'Diplomatic discourse demands exquisite semantic precision and emotional restraint.', exAr: 'يتطلب الخطاب الدبلوماسي دقة لغوية متناهية وضبطاً عاطفياً رفيع المستوى.' },
              { word: 'nominalisation', meaningAr: 'التحويل الاسمي والتعبير الأكاديمي', partOfSpeech: 'noun', collocation: 'dense nominalisation', def: 'Transforming verbs and adjectives into nouns to produce dense academic prose.', ex: 'Nominalisation turns "nations agreed" into "the intergovernmental agreement".', exAr: 'يحول التعبير الاسمي الأكاديمي الأفعال إلى أسماء لإنتاج نصوص علمية موجزة ورصينة.' },
              { word: 'signatory', meaningAr: 'دولة أو جهة موقعة على المعاهدة', partOfSpeech: 'noun', collocation: 'signatory state', def: 'A party, state, or person that has formally signed an agreement.', ex: 'Over one hundred and forty states are signatories to the climate convention.', exAr: 'أكثر من مائة وأربعين دولة موقعة على اتفاقية المناخ الدولية.' },
              { word: 'territorial waters', meaningAr: 'المياه الإقليمية السيادية', partOfSpeech: 'noun', collocation: 'sovereign territorial waters', def: 'Waters under the sovereign jurisdiction of a coastal nation-state.', ex: 'Coastal patrols safeguard navigation rights and sovereignty within territorial waters.', exAr: 'تحمي الدوريات الساحلية حقوق الملاحة والسيادة الوطنية داخل المياه الإقليمية.' }
            ],
            'The Evolution of Multilateral Arbitration: From the Hague to Modern Diplomacy',
            'Having survived the devastating upheavals of twentieth-century global warfare, the international community instituted supranational legal forums grounded in impartial jurisprudence. Multilateral treaties, ratified by sovereign assemblies, substitute coercive militarism with structured legal adjudication. However, the efficacy of international law is intrinsically bound to universal compliance. When dominant powers selectively interpret codified statutes, the entire scaffolding of global jurisprudence suffers delegitimization.',
            'Diplomatic Academy Seminar: New Administrative Capital',
            'Ambassador Karim & Dr. Laila (International Law Professor)',
            'Ambassador Karim: "Having examined the arbitration filings, Egypt’s legal delegation presented an irrefutable historical claim regarding territorial waters."\nDr. Laila: "Indeed, Ambassador. Utilizing rigorous archival evidence and codified conventions, our scholars demonstrated that international law thrives only when supported by unimpeachable empirical documentation."',
            {
              vocab: [
                {
                  id: 'bac_s3_u1_v1',
                  skill: 'Vocabulary',
                  question: 'The supreme power or authority of a state to govern its own territory and affairs is termed __________.',
                  options: ['sovereignty', 'subjugation', 'annexation', 'vassalage'],
                  correctAnswer: 'A',
                  explanation: 'Sovereignty is the supreme independent authority over a defined territory.'
                },
                {
                  id: 'bac_s3_u1_v2',
                  skill: 'Vocabulary',
                  question: 'The theoretical philosophy and science of law is known as __________.',
                  options: ['jurisprudence', 'gerontology', 'philology', 'lexicography'],
                  correctAnswer: 'A',
                  explanation: 'Jurisprudence is legal philosophy and judicial theory.'
                },
                {
                  id: 'bac_s3_u1_v3',
                  skill: 'Vocabulary',
                  question: 'To settle a legal dispute through an impartial third-party tribunal is to conduct __________.',
                  options: ['arbitration', 'insurrection', 'retaliation', 'conspiracy'],
                  correctAnswer: 'A',
                  explanation: 'Arbitration is third-party legal dispute resolution.'
                },
                {
                  id: 'bac_s3_u1_v4',
                  skill: 'Vocabulary',
                  question: 'Which word serves as an antonym for "impartial"?',
                  options: ['partisan and biased', 'objective', 'disinterested', 'equitable'],
                  correctAnswer: 'A',
                  explanation: 'Partisan/biased stands directly opposed to impartial.'
                }
              ],
              grammar: [
                {
                  id: 'bac_s3_u1_g1',
                  skill: 'Grammar',
                  question: 'Rewrite using a perfect participle clause: "Because the diplomats had concluded the bilateral accord, they held a joint press briefing." -> __________',
                  options: [
                    'Having concluded the bilateral accord, the diplomats held a joint press briefing.',
                    'Concluding the bilateral accord, the diplomats held a joint press briefing.',
                    'Concluded the bilateral accord, the diplomats held a joint press briefing.',
                    'The bilateral accord having been concluding, the diplomats held a briefing.'
                  ],
                  correctAnswer: 'A',
                  explanation: 'Perfect participle "Having concluded" indicates an action completed prior to the main clause.'
                },
                {
                  id: 'bac_s3_u1_g2',
                  skill: 'Grammar',
                  question: '__________ on the western shore of the Nile, the ancient temple complex withstood centuries of inundation.',
                  options: ['Situated', 'Situating', 'Having situated', 'To situate'],
                  correctAnswer: 'A',
                  explanation: 'Past participle clause expressing passive state: Situated on the western shore...'
                },
                {
                  id: 'bac_s3_u1_g3',
                  skill: 'Grammar',
                  question: 'Transform into nominalised academic register: "The ministers analyzed the treaty meticulously." -> "The ministers’ meticulous __________ of the treaty clarified ambiguous clauses."',
                  options: ['analysis', 'analyze', 'analyzing', 'analyst'],
                  correctAnswer: 'A',
                  explanation: 'Nominalisation turns the verb "analyze" into the abstract noun "analysis".'
                },
                {
                  id: 'bac_s3_u1_g4',
                  skill: 'Grammar',
                  question: '__________ the international tribunal’s ruling, the state reaffirmed its commitment to peaceful coexistence.',
                  options: ['Accepting', 'Accepted', 'To have accepted', 'Being accepted'],
                  correctAnswer: 'A',
                  explanation: 'Present participle clause indicating contemporaneous or immediate resultant action: Accepting...'
                }
              ],
              reading: [
                {
                  id: 'bac_s3_u1_r1',
                  skill: 'Reading',
                  question: 'What fundamental vulnerability threatens the legitimacy of international legal frameworks?',
                  options: [
                    'The selective and self-serving interpretation of codified statutes by powerful states.',
                    'The excessive number of multilingual translators.',
                    'The lack of printed paper copies of treaties in libraries.',
                    'The rapid development of undersea communication cables.'
                  ],
                  correctAnswer: 'A',
                  explanation: 'Selective adherence by dominant states erodes universal trust and legitimacy.'
                },
                {
                  id: 'bac_s3_u1_r2',
                  skill: 'Reading',
                  question: 'The author asserts that multilateral arbitration replaces __________.',
                  options: [
                    'coercive militarism and violent geopolitical confrontation',
                    'international scientific cooperation',
                    'trade agreements between friendly neighboring nations',
                    'the translation of ancient historical documents'
                  ],
                  correctAnswer: 'A',
                  explanation: 'Arbitration replaces military coercion with judicial settlement.'
                },
                {
                  id: 'bac_s3_u1_r3',
                  skill: 'Reading',
                  question: 'What rhetorical function does the phrase "scaffolding of global jurisprudence" perform?',
                  options: [
                    'An architectural metaphor illustrating the interconnected, fragile structure of international law.',
                    'A literal description of a building under repair in Geneva.',
                    'A critique of ancient Roman architecture.',
                    'A computational reference to computer programming loops.'
                  ],
                  correctAnswer: 'A',
                  explanation: 'It is a classic architectural metaphor for complex institutional structures.'
                },
                {
                  id: 'bac_s3_u1_r4',
                  skill: 'Reading',
                  question: 'The author’s tone in discussing international legal compliance is __________.',
                  options: [
                    'judiciously realistic and demanding ethical fidelity',
                    'hyperbolic and sensationalist',
                    'cynical and entirely fatalistic',
                    'celebratory without acknowledging any systemic flaws'
                  ],
                  correctAnswer: 'A',
                  explanation: 'The tone is realistic, scholarly, and ethically grounded.'
                },
                {
                  id: 'bac_s3_u1_r5',
                  skill: 'Reading',
                  question: 'Which principle is portrayed as indispensable for enduring diplomatic triumph?',
                  options: [
                    'Unimpeachable archival and empirical evidentiary documentation',
                    'Threatening military action through social media channels',
                    'Relying on unverifiable verbal rumors',
                    'Ignoring historical treaties and maritime conventions'
                  ],
                  correctAnswer: 'A',
                  explanation: 'The conclusion emphasizes that rigorous documentation and conventions anchor legal triumph.'
                }
              ],
              listening: [
                {
                  id: 'bac_s3_u1_l1',
                  skill: 'Listening',
                  question: 'What did Egypt’s legal delegation present in their arbitration filing?',
                  options: [
                    'An irrefutable historical claim backed by archival documentation regarding territorial waters',
                    'A request for financial assistance from private banks',
                    'A collection of contemporary artistic paintings',
                    'An appeal to cancel maritime environmental regulations'
                  ],
                  correctAnswer: 'A',
                  explanation: 'The dialogue confirms an irrefutable historical claim grounded in archival proof.'
                },
                {
                  id: 'bac_s3_u1_l2',
                  skill: 'Listening',
                  question: 'According to Dr. Laila, when does international law truly flourish?',
                  options: [
                    'When supported by unimpeachable empirical documentation and codified conventions',
                    'When disputes are decided through armed conflict',
                    'When court proceedings are conducted in total secrecy',
                    'When judges ignore historical treaties'
                  ],
                  correctAnswer: 'A',
                  explanation: 'Dr. Laila notes that law thrives when anchored in unimpeachable empirical evidence.'
                },
                {
                  id: 'bac_s3_u1_l3',
                  skill: 'Listening',
                  question: 'Ambassador Karim begins his statement with which syntactic construction?',
                  options: [
                    'A perfect participle clause: "Having examined the arbitration filings..."',
                    'An inversion with "under no circumstances"',
                    'A future in the past passive',
                    'A cleft sentence with "what"'
                  ],
                  correctAnswer: 'A',
                  explanation: 'He begins with the perfect participle phrase: "Having examined..."'
                },
                {
                  id: 'bac_s3_u1_l4',
                  skill: 'Listening',
                  question: 'Where is the symposium set?',
                  options: [
                    'The Diplomatic Academy in the New Administrative Capital',
                    'A commercial cafe in downtown Alexandria',
                    'An archaeological excavation in Luxor',
                    'A remote desert camp in the Western Oasis'
                  ],
                  correctAnswer: 'A',
                  explanation: 'The transcript designates the Diplomatic Academy in the New Administrative Capital.'
                }
              ],
              exam: [
                {
                  id: 'bac_s3_u1_e1',
                  skill: 'Vocabulary',
                  question: 'A state’s refusal to abide by binding international judicial verdicts leads inevitably to international __________.',
                  options: ['isolation and diplomatic friction', 'economic prosperity and prestige', 'unrestricted maritime dominance', 'absolute legal immunity'],
                  correctAnswer: 'A',
                  explanation: 'Violating verdicts triggers international friction and isolation.'
                },
                {
                  id: 'bac_s3_u1_e2',
                  skill: 'Grammar',
                  question: '__________ by prominent international jurists, the convention was ratified unanimously.',
                  options: ['Drafted', 'Drafting', 'Having drafted', 'To draft'],
                  correctAnswer: 'A',
                  explanation: 'Past participle clause: Drafted by prominent international jurists...'
                },
                {
                  id: 'bac_s3_u1_e3',
                  skill: 'Reading',
                  question: 'Multilateral treaties draw their authority primarily from __________.',
                  options: ['the mutual consent of sovereign nations and codified international covenants', 'unilateral military decrees', 'corporate commercial interests', 'oral folklore traditions'],
                  correctAnswer: 'A',
                  explanation: 'Consent of sovereign states and codified law form the foundation of international law.'
                },
                {
                  id: 'bac_s3_u1_e4',
                  skill: 'Listening',
                  question: 'In diplomatic negotiations, precision in treaty terminology prevents future __________.',
                  options: ['ambiguity and jurisdictional conflict', 'international trade agreements', 'translation into foreign languages', 'diplomatic banquets'],
                  correctAnswer: 'A',
                  explanation: 'Semantic precision eliminates dangerous ambiguity and jurisdictional clashes.'
                }
              ]
            },
            bacLitSec3Ch1
          ),
          bacSec3Unit2,
          bacSec3Unit3,
          bacSec3Unit4,
          bacSec3Unit5,
          bacSec3Unit6
        ]
      }
    ]
  }
];
