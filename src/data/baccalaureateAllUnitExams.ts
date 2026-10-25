import { UnitInfo } from '../types.ts';
import { generateBaccalaureate5LevelExams } from './baccalaureateUnitExamsGenerator.ts';
import {
  bacSec1U4Exams,
  bacSec1U5Exams,
  bacSec1U6Exams,
  bacSec2U4Exams,
  bacSec2U5Exams,
  bacSec2U6Exams,
  bacSec3U4Exams,
  bacSec3U5Exams,
  bacSec3U6Exams
} from './baccalaureateUnits4To6Exams.ts';

export {
  bacSec1U4Exams,
  bacSec1U5Exams,
  bacSec1U6Exams,
  bacSec2U4Exams,
  bacSec2U5Exams,
  bacSec2U6Exams,
  bacSec3U4Exams,
  bacSec3U5Exams,
  bacSec3U6Exams
};

// =================================================================================================
// 1. GRADE 10 (SECONDARY 1) - BACCALAUREATE 5-LEVEL EXAM SUITES
// Novel: The Old Man and the Sea by Ernest Hemingway (Chapters 1 to 6)
// =================================================================================================

export const bacSec1U1Exams = generateBaccalaureate5LevelExams({
  grade: 10,
  unitId: 1,
  unitTitle: 'Sustainable Global Frontiers',
  unitTitleAr: 'الحدود البيئية العالمية وحفظ النظم البحرية',
  theme: 'Oceanic Conservation, Thermal Resilience in Coral Biomes & Environmental Refugia',
  grammarRule: 'Inversion with Negative & Restrictive Adverbials (Seldom / Under no circumstances)',
  novelReference: 'The Old Man and the Sea (Hemingway) — Chapter 1: The Solitary Fisherman',
  novelReferenceAr: 'رواية العجوز والبحر — الفصل الأول: كبرياء الصياد والوفاء المقدس لمانولين',
  sampleQuestions: {
    l1: {
      q: 'Under no circumstances __________ unauthorized fishing vessels to enter the Ras Mohammed coral marine sanctuary.',
      opts: ['will maritime authorities permit', 'maritime authorities permit', 'did permit maritime authorities', 'authorities maritime will permit'],
      ans: [0],
      exp: 'Inversion after "Under no circumstances": auxiliary (will) + subject + base verb.'
    },
    l2: {
      q: 'The word "resilience" in ecological studies denotes an organism’s capacity to __________.',
      opts: ['rebound and recover from severe environmental trauma', 'die immediately upon minor temperature shifts', 'resist all forms of direct sunlight', 'reproduce only in laboratory tubes'],
      ans: [0],
      exp: 'Resilience is physiological and ecological capacity to bounce back from disturbance.'
    },
    l3: {
      q: 'Seldom __________ such extraordinary genetic adaptation as observed in northern Red Sea coral biomes.',
      opts: ['have marine biologists witnessed', 'marine biologists have witnessed', 'did witnessed marine biologists', 'marine biologists witnessing'],
      ans: [0],
      exp: 'Inversion following "Seldom": Seldom + auxiliary (have) + subject + past participle.'
    },
    l4: {
      q: 'Only after rigorous autonomous satellite telemetry __________ the thermal refugium status of the Gulf of Aqaba.',
      opts: ['did international scientists confirm', 'international scientists confirmed', 'have confirmed scientists', 'scientists had confirming'],
      ans: [0],
      exp: 'Inversion after "Only after [phrase]": auxiliary (did) + subject + base verb.'
    },
    l5: {
      q: 'In academic discourse, what distinguishes an environmental "refugium" from an ordinary nature reserve?',
      opts: [
        'An evolutionary safe haven where species survive broader macro-climatic extinction pressures',
        'A commercially zoned holiday resort with artificial aquariums',
        'A temporary holding cage for livestock transport',
        'A botanical greenhouse heated artificially in winter'
      ],
      ans: [0],
      exp: 'A refugium is an evolutionary sanctuary providing genetic survival across climatic shifts.'
    }
  },
  readingPassage: {
    title: 'The Thermal Fortitude of Red Sea Coral Refugia',
    text: 'While equatorial coral reefs worldwide succumb to catastrophic bleaching driven by rising sea temperatures, the scleractinian reefs of the northern Red Sea and Gulf of Aqaba exhibit unprecedented thermal tolerance. Biologists hypothesize that post-glacial larval migration selected for heat-hardy phenotypes capable of surviving temperatures 3 to 4 degrees Celsius above global bleaching thresholds. However, thermal resilience provides no immunity against localized anthropogenic threats: untreated wastewater discharges and plastic sedimentation. Preserving this planetary genetic reservoir demands holistic transboundary stewardship.',
    q: 'What evolutionary mechanism explains northern Red Sea corals’ heat tolerance?',
    opts: [
      'Post-glacial migration through high-temperature southern gateways selecting heat-hardy phenotypes',
      'Artificial laboratory genetic modification by contemporary scientists',
      'Constant shadow from coastal mountain ranges blocking ultraviolet radiation',
      'The total absence of marine currents in the Gulf of Aqaba'
    ],
    ans: [0],
    exp: 'The passage highlights post-glacial migration filtering for thermal tolerance.'
  },
  translationPair: {
    enToAr: {
      src: 'Protecting marine biodiversity in the Red Sea is an urgent planetary imperative for future generations.',
      opts: [
        'إن حماية التنوع البيولوجي البحري في البحر الأحمر واجب كوكبي حتمي وملح من أجل أجيال المستقبل.',
        'السياحة البحرية في البحر الأحمر تحقق أرباحاً تجارية سريعة للمستثمرين فقط.',
        'يجب صيد كافة الأسماك الكبيرة في البحر الأحمر لزيادة كميات الإنتاج الغذائي.',
        'التنوع البيولوجي ليس له أي تأثير على استقرار النظم البيئية والمناخية.'
      ],
      ans: 0,
      exp: 'Option A conveys the formal academic register and precise terminology.'
    },
    arToEn: {
      src: 'تسهم المحميات الطبيعية المصرية في استعادة التوازن البيئي ومكافحة التغيرات المناخية.',
      opts: [
        'Egyptian natural protectorates contribute to restoring ecological equilibrium and combating climate changes.',
        'Natural protectorates in Egypt are built only for commercial factories and industrial zones.',
        'Climate change cannot be mitigated by establishing environmental reserves.',
        'Ecological equilibrium is achieved by eliminating all marine predators completely.'
      ],
      ans: 0,
      exp: 'Option A provides the accurate translation with formal environmental terminology.'
    }
  },
  literatureTask: {
    chapterOrAct: 1,
    q: '“Everything about him was old except his eyes and they were the same color as the sea and were cheerful and undefeated.” How does Hemingway establish Santiago’s metaphysical dignity through this characterization?',
    qAr: '«كل ما فيه كان هَرِماً باستثناء عينيه؛ كانتا بلون البحر، مفعمتين بالبهجة والعزيمة التي لا تُقهر». كيف يرسخ همنجواي الكرامة الوجودية لسانتياغو عبر هذا الوصف؟',
    modelAnswer: 'Hemingway contrasts the physical decrepitude of Santiago’s aging, scarred body with the immortal vigor of his eyes, which mirror the timeless sea. While 84 days without a fish have battered his material circumstances, his spirit remains completely undefeated. By linking his ocular radiance directly with oceanic majesty, Hemingway portrays Santiago as an elemental hero whose dignity transcends physical suffering and poverty.',
    criteria: [
      'Contrast between physical decay (scars, wrinkles) and spiritual vitality (cheerful, undefeated eyes)',
      'Symbolic alignment between the color of the sea and natural timeless endurance',
      'Grounding in Santiago’s 84-day fishing drought as the test of existential fortitude'
    ]
  },
  essayTask: {
    title: 'Ecological Refugia & Planetary Stewardship',
    prompt: 'Write an analytical essay (200 words) examining the significance of protecting ecological refugia in mitigating global climate collapse.',
    outline: [
      'Hook: The accelerating pace of marine ecosystem degradation worldwide.',
      'Thesis: Protecting evolutionary refugia like the northern Red Sea corals is essential for preserving the genetic blueprints necessary for ecological restoration.',
      'Body 1: The scientific value of thermal tolerance and biodiversity reservoirs.',
      'Body 2: The necessity of transboundary policy and community-led conservation.',
      'Conclusion: Stewardship as a moral obligation linking science with youth leadership.'
    ],
    model: 'In an epoch characterized by unprecedented climatic disruption, the identification and stewardship of ecological refugia have emerged as foundational pillars of conservation biology. Nowhere is this dynamic more striking than in the northern Red Sea, where scleractinian coral reefs display extraordinary evolutionary fortitude against marine heatwaves. Such refugia do not merely shelter local biodiversity; they function as planetary genetic banks capable of repopulating degraded biomes across the tropics. However, biological resilience cannot withstand unconstrained anthropogenic pollution. Coastal urbanization, industrial sedimentation, and plastic waste jeopardize the very ecosystems that could salvage oceanic equilibrium. Consequently, safeguarding these frontiers demands rigorous supranational governance combined with empowered local stewardship. By integrating autonomous telemetry grids with indigenous coastal lore, modern environmental policy bridges empirical surveillance with grassroots responsibility, ensuring that our planetary heritage endures for posterity.'
  }
});

export const bacSec1U2Exams = generateBaccalaureate5LevelExams({
  grade: 10,
  unitId: 2,
  unitTitle: 'Civic Leadership & Philanthropic Architecture',
  unitTitleAr: 'القيادة المدنية وصياغة العمل التطوعي المتقدم',
  theme: 'Altruism, Non-Governmental Organizations & Structural Community Empowerment',
  grammarRule: 'Correlative Conjunctions & Subjunctive Passive Forms',
  novelReference: 'The Old Man and the Sea — Chapter 2: The Sacred Covenant of Mentorship',
  novelReferenceAr: 'رواية العجوز والبحر — الفصل الثاني: ميثاق الوفاء والتلمذة النبيلة بين سانتياغو ومانولين',
  sampleQuestions: {
    l1: {
      q: 'Not only __________ material relief to underprivileged hamlets, but they also constructed vocational training workshops.',
      opts: ['did the philanthropic foundation disburse', 'the philanthropic foundation disbursed', 'disbursed the philanthropic foundation', 'had disbursed the foundation'],
      ans: [0],
      exp: 'Inversion after fronted "Not only": Not only + did + subject + base verb.'
    },
    l2: {
      q: 'The board of trustees resolved that the community clinic __________ without administrative delays.',
      opts: ['be inaugurated', 'is inaugurated', 'was inaugurated', 'has inaugurated'],
      ans: [0],
      exp: 'Subjunctive passive: resolved that + subject + be + past participle.'
    },
    l3: {
      q: 'Scarcely had the volunteer team distributed the supplies __________ another emergency request arrived from the delta.',
      opts: ['when', 'than', 'then', 'as soon as'],
      ans: [0],
      exp: 'Scarcely had... when is the strictly required correlative pairing.'
    },
    l4: {
      q: 'The socio-economic concept of "synergy" in community development emphasizes that __________.',
      opts: [
        'combined multi-sectoral collaboration produces greater impact than isolated individual efforts',
        'organizations should compete ruthlessly to eliminate peer institutions',
        'financial resources should be hoarded in non-transparent private trusts',
        'civic volunteerism is unnecessary when market forces operate freely'
      ],
      ans: [0],
      exp: 'Synergy is the cooperative interaction of elements producing a combined effect greater than the sum.'
    },
    l5: {
      q: 'Identify the sentence displaying flawless correlative syntax and register:',
      opts: [
        'Neither did the NGO compromise on financial transparency, nor did it neglect grassroots advocacy.',
        'Neither the NGO compromised transparency nor neglecting advocacy.',
        'Neither did the NGO compromise transparency or neglecting advocacy.',
        'Neither the NGO compromise on transparency nor neglecting advocacy.'
      ],
      ans: [0],
      exp: 'Maintains parallel inverted clause structure: Neither did X..., nor did it Y...'
    }
  },
  readingPassage: {
    title: 'Strategic Philanthropy as a Catalyst for Structural Equity',
    text: 'Contemporary civil society has moved beyond patriarchal charity toward systemic social investment. In Egypt, philanthropic organizations collaborate with public institutions under the Decent Life initiative to modernize village infrastructure, establish microfinance cooperatives, and eliminate educational deficits. By focusing on sustainable human capacity rather than transient handouts, civic leadership bridges institutional gaps, fostering authentic social cohesion.',
    q: 'What distinguishes strategic philanthropy from traditional charity in the text?',
    opts: [
      'Focusing on sustainable capacity building and structural equity rather than transient handouts',
      'Distributing cash without requiring any project accountability',
      'Operating exclusively in metropolitan capital cities while ignoring rural villages',
      'Abolishing all educational apprenticeships'
    ],
    ans: [0],
    exp: 'Strategic philanthropy emphasizes long-term capacity building.'
  },
  translationPair: {
    enToAr: {
      src: 'Civic leadership and transparent non-profit governance foster resilient and empowered communities.',
      opts: [
        'تسهم القيادة المدنية والحوكمة الرشيدة للمؤسسات غير الربحية في بناء مجتمعات قوية وممكّنة.',
        'العمل التطوعي غير مفيد في بناء القدرات المؤسسية للمجتمعات المعاصرة.',
        'الشركات الخاصة تسعى دائماً للأرباح دون أدنى التزام بالمسؤولية المجتمعية.',
        'الحوكمة الإدارية تؤدي دائماً إلى إعاقة وتأخير المبادرات الإنسانية.'
      ],
      ans: 0,
      exp: 'Option A provides the precise, elegant Arabic translation.'
    },
    arToEn: {
      src: 'يمثل التكافل الاجتماعي ركيزة أساسية لتحقيق العدالة الاجتماعية وحماية الفئات الأكثر احتياجاً.',
      opts: [
        'Social solidarity represents a fundamental pillar for achieving social justice and protecting the most vulnerable groups.',
        'Social solidarity is unnecessary when market economies grow rapidly without regulation.',
        'Vulnerable groups should rely entirely on external loans rather than community support.',
        'Justice is achieved by reducing investments in public healthcare and schools.'
      ],
      ans: 0,
      exp: 'Option A translates the sociological terms accurately into high-level English.'
    }
  },
  literatureTask: {
    chapterOrAct: 2,
    q: 'How does the sacred bond between Santiago and Manolin contrast with the mercenary pragmatism of the other village fishermen?',
    qAr: 'كيف يتناقض الميثاق المقدس بين سانتياغو ومانولين مع النفعية المادية لبقية صيادي القرية؟',
    modelAnswer: 'While the village fishermen and Manolin’s parents evaluate Santiago strictly through a mercenary lens—branding him "salao" due to 84 fishless days—Manolin relates to the old man through love, reverence, and ethical devotion. Manolin recognizes Santiago’s supreme mastery and spiritual nobility. He ministers to Santiago’s physical needs without condescension, embodying selfless human solidarity that defies transactional market values.',
    criteria: [
      'Contrast between community mercenary evaluation (salao, failure) and Manolin’s love',
      'Analysis of Manolin’s filial caretaking (food, bait, baseball companionship)',
      'Thematic conclusion: true loyalty transcends economic utility'
    ]
  },
  essayTask: {
    title: 'The Architecture of Modern Civic Leadership',
    prompt: 'Write an analytical essay (200 words) on how youth-led civic initiatives foster structural social resilience.',
    outline: [
      'Introduction: Defining civic leadership in the twenty-first century.',
      'Body 1: The shift from paternalistic charity to developmental empowerment.',
      'Body 2: Youth mobilization through digital transparency and grassroots alliances.',
      'Conclusion: Civic engagement as the cornerstone of equitable national progress.'
    ],
    model: 'Civic leadership in the contemporary world has evolved from episodic benevolence into an architectural framework for social equity. Rather than offering ephemeral relief, modern civil society emphasizes systemic empowerment: equipping marginalized populations with technical literacies, credit access, and ecological tools. In this transformative landscape, youth engagement serves as a decisive catalyst. Unencumbered by bureaucratic inertia, youth-led grassroots movements deploy digital platforms to ensure transparent fiscal tracking and targeted resource allocation. When civic initiatives operate in synergistic alignment with public policy, the results transcend material metrics, reinforcing communal solidarity and institutional trust. Ultimately, an empowered civil society proves that sustainable national development is not merely an executive mandate, but a participatory endeavor forged through everyday civic responsibility.'
  }
});

export const bacSec1U3Exams = generateBaccalaureate5LevelExams({
  grade: 10,
  unitId: 3,
  unitTitle: 'Digital Epistemology & Algorithmic Media',
  unitTitleAr: 'نظرية المعرفة الرقمية والإعلام الخوارزمي',
  theme: 'Infodemic Containment, Deepfake Forensics & Cognitive Resistance to Disinformation',
  grammarRule: 'Inverted Conditionals (Were it not for / Had they verified) & Modal Stance',
  novelReference: 'The Old Man and the Sea — Chapters 4 to 6: Hemingway’s Objective Iceberg Theory',
  novelReferenceAr: 'رواية العجوز والبحر — الفصول من 4 إلى 6: نظرية جبل الجليد الأدبية والانتصار الوجودي',
  sampleQuestions: {
    l1: {
      q: 'Had forensic investigators __________ the digital watermarking, they would have identified the synthetic deepfake instantly.',
      opts: ['examined', 'examining', 'examine', 'to examine'],
      ans: [0],
      exp: 'Third conditional inverted structure: Had + subject + past participle (examined).'
    },
    l2: {
      q: 'Were public platforms __________ independent algorithmic audits, viral disinformation would decrease significantly.',
      opts: ['to mandate', 'mandating', 'mandated', 'have mandated'],
      ans: [0],
      exp: 'Second conditional inverted structure: Were + subject + to + base verb.'
    },
    l3: {
      q: 'The media term "provenance" refers to the verifiable __________ of a digital artifact.',
      opts: ['chain of origin, creation, and custody', 'screen resolution and brightness', 'retail download price', 'storage file format extension'],
      ans: [0],
      exp: 'Provenance establishes chronological custody, origin, and authenticity.'
    },
    l4: {
      q: 'In epistemic logic, what danger does an "infodemic" present to public health governance?',
      opts: [
        'An overabundance of conflicting information paralyzes rational decision-making during emergencies',
        'All computer databases automatically format their memory drives',
        'Hospitals run out of pharmaceutical supplies immediately',
        'Scientific journals stop printing physical paper editions'
      ],
      ans: [0],
      exp: 'An infodemic creates cognitive overload and confusion through mixed truth and falsehood.'
    },
    l5: {
      q: 'Choose the sentence exhibiting the highest academic modal stance:',
      opts: [
        'Algorithmic recommendation engines must needs be subjected to rigorous ethical oversight.',
        'Algorithms maybe should be checked sometimes if convenient.',
        'Algorithms are probably okay without anyone looking at them.',
        'Nobody can know what algorithms do so we should do nothing.'
      ],
      ans: [0],
      exp: '"Must needs be subjected" conveys imperative, unavoidable formal necessity.'
    }
  },
  readingPassage: {
    title: 'Epistemic Sovereignty in the Age of Generative Synthetic Media',
    text: 'Generative artificial intelligence has democratized the synthesis of hyper-realistic audiovisual media, fundamentally challenging the epistemological premise that "seeing is believing." When malicious actors deploy deepfakes to manipulate financial panics or geopolitical narratives, the fabric of democratic consensus frays. Combating algorithmic deception necessitates media forensic protocols: cryptographic hashing to establish digital provenance and spectral analysis to detect micro-pixel anomalies.',
    q: 'How does generative synthetic media challenge traditional epistemological standards?',
    opts: [
      'It dismantles the premise that audiovisual recordings provide reliable proof of physical reality',
      'It increases the cost of television manufacturing worldwide',
      'It forces newspapers to return exclusively to handwritten letters',
      'It prevents computers from connecting to the global internet'
    ],
    ans: [0],
    exp: 'Deepfakes sever the reliable link between audiovisual perception and objective reality.'
  },
  translationPair: {
    enToAr: {
      src: 'Developing critical media literacy is our primary defense against weaponized digital disinformation.',
      opts: [
        'يمثل تطوير الثقافة الإعلامية النقدية خط دفاعنا الأول في مواجهة المعلومات المضللة الرقمية الموجهة.',
        'وسائل الإعلام الرقمية تنشر دائماً الحقائق المؤكدة دون حاجة إلى أي فحص نقدي.',
        'التكنولوجيا الحديثة تمنع انتشار الشائعات بشكل تلقائي ومضمون.',
        'يجب إغلاق كافة المنصات الرقمية لتجنب قراءة الأخبار والمعلومات.'
      ],
      ans: 0,
      exp: 'Option A delivers the precise, formal Arabic rendition.'
    },
    arToEn: {
      src: 'يتطلب التحقق من صحة الأدلة الرقمية فحص المنشأ واستخدام تقنيات التشفير المتقدمة.',
      opts: [
        'Verifying the authenticity of digital evidence requires examining provenance and utilizing advanced cryptographic techniques.',
        'Digital evidence is always reliable without needing any verification or cryptography.',
        'Cryptography is used only by banking institutions to calculate interest rates.',
        'Examining evidence should be abandoned to expedite legal trials.'
      ],
      ans: 0,
      exp: 'Option A renders the technical legal-technological terms with academic precision.'
    }
  },
  literatureTask: {
    chapterOrAct: 5,
    q: '“A man can be destroyed but not defeated.” Evaluate how this climactic axiom in The Old Man and the Sea reflects Hemingway’s Iceberg Theory of existential triumph.',
    qAr: '«الإنسان قد يُدمّر لكنه لا يُهزم أبداً». قيّم كيف تعكس هذه المقولة المحورية في رواية العجوز والبحر نظرية جبل الجليد الأدبية عند همنجواي في الانتصار الوجودي.',
    modelAnswer: 'Hemingway’s axiom distinguishes between physical annihilation (destruction) and spiritual capitulation (defeat). Santiago loses the physical flesh of the marlin to predatory sharks, and his body is broken by exhaustion and wounds. Yet, because he fought with unyielding courage and never surrendered his dignity or respect for nature, his spirit remains unconquered. Under Hemingway’s Iceberg Theory, the surface text chronicles a ruined catch, but the submerged, profound truth celebrates the moral apotheosis of the human spirit.',
    criteria: [
      'Deconstruction of destruction (physical/material) vs defeat (spiritual/moral)',
      'Application of Hemingway’s Iceberg Theory (surface loss vs submerged existential victory)',
      'Textual context: the battle against the sharks resulting in the monumental marlin skeleton'
    ]
  },
  essayTask: {
    title: 'Epistemic Vigilance in Algorithmic Ecosystems',
    prompt: 'Write an analytical essay (200 words) discussing how societies can cultivate cognitive resilience against generative disinformation.',
    outline: [
      'Introduction: The post-truth information ecosystem created by generative AI.',
      'Body 1: Technical countermeasures (cryptographic watermarks and forensic provenance).',
      'Body 2: Pedagogical reform (teaching digital epistemology and critical verification in schools).',
      'Conclusion: Cultivating cognitive resilience as a prerequisite for democratic sovereignty.'
    ],
    model: 'The proliferation of generative artificial intelligence has precipitated an existential epistemic crisis, dismantling the classical evidentiary maxim that audiovisual sensory input constitutes unmediated reality. In an ecosystem saturated with hyper-realistic synthetic media, truth becomes vulnerable to algorithmic weaponization. Countering this insidious infodemic demands a multifaceted architecture of vigilance. At the technical frontier, institutions must institutionalize cryptographic provenance protocols and automated forensic telemetry to authenticate digital assets at source. However, technological firewalls remain insufficient without cognitive antibodies. Educational systems, spearheaded by advanced curricula such as the Egyptian Baccalaureate, must cultivate rigorous media epistemology: equipping citizens with the analytical reflexes to interrogate provenance, evaluate authorial bias, and dissect algorithmic echo chambers. Ultimately, safeguarding democratic coherence depends not merely on algorithmic filters, but on cultivating an intellectually vigilant populace committed to empirical verification.'
  }
});

// -------------------------------------------------------------------------------------------------
// 2. GRADE 11 (SECONDARY 2) - BACCALAUREATE 5-LEVEL EXAM SUITES
// Novel: King Lear by William Shakespeare (Acts 1 to 5)
// -------------------------------------------------------------------------------------------------

export const bacSec2U1Exams = generateBaccalaureate5LevelExams({
  grade: 11,
  unitId: 1,
  unitTitle: 'Epistemology & Cognitive Bias',
  unitTitleAr: 'نظرية المعرفة والانحياز المعرفي في المنهج العلمي',
  theme: 'Falsifiability, Peer Review Scrutiny & Cognitive Biases (Anchoring & Confirmation)',
  grammarRule: 'Wh-Cleft Sentences & Academic Nominalisation',
  novelReference: 'King Lear (Shakespeare) — Act 1: The Fatal Love Test & The Pathology of Hubris',
  novelReferenceAr: 'مسرحية الملك لير — الفصل الأول: اختبار المحبة القاتل ومرض الغرور الأعمى',
  sampleQuestions: {
    l1: {
      q: '__________ surprised the evaluators was the meticulous empirical replicability of the candidate’s experimental methodology.',
      opts: ['What', 'That', 'Which', 'It'],
      ans: [0],
      exp: 'Wh-cleft sentence structure: What + verb phrase + was + focus noun phrase.'
    },
    l2: {
      q: 'Convert for rhetorical emphasis: "The lack of double-blind peer review compromised the validity of the study." -> __________',
      opts: [
        'What compromised the validity of the study was the lack of double-blind peer review.',
        'It was compromised the validity of the study by lack of peer review.',
        'Which compromised validity was lacking peer review in the study.',
        'That compromised the study validity lacked peer review.'
      ],
      ans: [0],
      exp: 'Wh-cleft: What + compromised... + was + [focus: the lack of double-blind peer review].'
    },
    l3: {
      q: 'In the philosophy of science, Karl Popper argued that a proposition is scientific only if it satisfies the criterion of __________.',
      opts: ['falsifiability', 'unverifiability', 'dogmatism', 'ambiguity'],
      ans: [0],
      exp: 'Falsifiability—the potential to be disproven by empirical evidence—is Popper’s demarcation criterion.'
    },
    l4: {
      q: 'Which cognitive bias causes researchers to favor evidence corroborating prior beliefs while dismissing contradictory data?',
      opts: ['Confirmation bias', 'Hindsight bias', 'Sunk cost fallacy', 'Availability heuristic'],
      ans: [0],
      exp: 'Confirmation bias is the tendency to seek and value information confirming preexisting hypotheses.'
    },
    l5: {
      q: 'Identify the sentence demonstrating the most sophisticated academic nominalisation:',
      opts: [
        'The rapid implementation of standardized testing protocols facilitated the systematic quantification of educational outcomes.',
        'Because teachers quickly implemented tests, they could easily see how students scored well.',
        'Teachers testing students fast helped them to count numbers easily in school.',
        'When testing happens fast, counting grades becomes easy.'
      ],
      ans: [0],
      exp: 'Dense nominalisation transforms actions into nouns (implementation, quantification) to produce authoritative register.'
    }
  },
  readingPassage: {
    title: 'The Dual Architecture of Human Cognition and Epistemic Fallibility',
    text: 'Daniel Kahneman’s dual-process theory delineates human cognition into System 1 (rapid, heuristic, emotionally driven) and System 2 (deliberate, analytical, computationally demanding). While System 1 evolved for rapid existential survival, its heuristic shortcuts systematically induce cognitive biases—such as anchoring, availability, and framing effects. Scientific progress depends on methodological institutionalization: double-blind peer review and pre-registered trials designed explicitly to counter human epistemic frailty.',
    q: 'According to the passage, why do scientific institutions rely on double-blind peer review?',
    opts: [
      'To systematically counteract innate cognitive biases inherent in System 1 thinking',
      'To eliminate all human scientists from participating in academic research',
      'To prevent the publication of any revolutionary hypotheses',
      'To make scientific discoveries inaccessible to the public'
    ],
    ans: [0],
    exp: 'Formal peer review and double-blind scrutiny neutralize subjective human cognitive biases.'
  },
  translationPair: {
    enToAr: {
      src: 'Recognizing cognitive biases is the first step toward cultivating intellectual humility and scientific rigor.',
      opts: [
        'إن إدراك الانحيازات المعرفية هو الخطوة الأولى نحو ترسيخ التواضع الفكري والصرامة العلمية.',
        'الانحياز المعرفي يساعد العلماء دائماً في الوصول إلى الحقائق المؤكدة بسرعة.',
        'التواضع الفكري يعني التخلي عن البحث العلمي وقبول النظريات القديمة.',
        'الصرامة العلمية تتطلب رفض كافة التجارب المعملية الحديثة.'
      ],
      ans: 0,
      exp: 'Option A provides the precise, solemn philosophical translation.'
    },
    arToEn: {
      src: 'تعتمد نظرية المعرفة على التمييز الدقيق بين الحقائق التجريبية والافتراضات غير المدعومة بأدلة.',
      opts: [
        'Epistemology relies on the precise distinction between empirical facts and unsubstantiated presuppositions.',
        'Knowledge depends only on personal emotional beliefs without checking any evidence.',
        'Empirical facts cannot be distinguished from unsubstantiated assumptions.',
        'Philosophy rejects all distinction between fact and fiction in academic studies.'
      ],
      ans: 0,
      exp: 'Option A renders the epistemological vocabulary with impeccable academic accuracy.'
    }
  },
  literatureTask: {
    chapterOrAct: 1,
    q: '“Unhappy that I am, I cannot heave my heart into my mouth: I love your majesty according to my bond; nor more nor less.” Analyze Cordelia’s refusal to participate in the Love Test in light of cognitive flattery versus moral integrity.',
    qAr: '«يا لبؤسي، لست قادرة على أن ألقي بقلبي في فمي: إني أحب جلالتك بحكم واجبي البنوي، لا أكثر ولا أقل». حلل رفض كورديليا المشاركة في اختبار الحب في ضوء النفاق التملقي مقابل النزاهة الأخلاقية.',
    modelAnswer: 'Cordelia’s refusal exposes the moral pathology of Lear’s court. While Goneril and Regan manipulate Lear’s narcissistic hubris through hyperbolic flattery, trading empty rhetoric for political land, Cordelia respects the sacred incommensurability of genuine love. By stating that she loves her father "according to my bond," she grounds filial love in natural duty and truth rather than commercial auction. Her silence is an act of supreme moral courage that reveals Lear’s spiritual blindness.',
    criteria: [
      'Contrast between the sisters’ performative flattery and Cordelia’s honest brevity',
      'Analysis of the filial "bond" as natural law and authentic affection',
      'Evaluation of Lear’s hubris and emotional blindness in banishing his truest daughter'
    ]
  },
  essayTask: {
    title: 'The Demarcation of Scientific Truth',
    prompt: 'Write an analytical essay (200 words) on how Karl Popper’s falsifiability criterion guards against dogmatism in research.',
    outline: [
      'Introduction: The challenge of defining genuine scientific inquiry.',
      'Body 1: Verificationism versus falsificationism (Karl Popper’s insight).',
      'Body 2: The role of peer review and intellectual humility in dismantling dogmatic claims.',
      'Conclusion: Falsifiability as the essential safeguard of academic progress.'
    ],
    model: 'The quest for objective knowledge has persistently wrestled with the boundary separating empirical science from dogmatic pseudoscience. In his seminal epistemological interventions, Karl Popper dismantled classical verificationism by arguing that no finite quantity of positive observations can definitively prove a universal law, whereas a single anomalous observation can decisively refute it. Consequently, falsifiability emerged as the definitive hallmark of authentic scientific inquiry. What distinguishes genuine science from ideological dogma is its vulnerability to empirical refutation. When theories are formulated in such ambiguity that no possible data could disconfirm them, they cease to function as instruments of discovery. By institutionalizing methodological skepticism, double-blind trials, and open peer scrutiny, the scientific enterprise disciplines the human tendency toward confirmation bias. Embracing falsifiability requires intellectual humility: recognizing that scientific paradigms are not immutable scriptures, but provisional approximations continually refined through rigorous experimental interrogation.'
  }
});

export const bacSec2U2Exams = generateBaccalaureate5LevelExams({
  grade: 11,
  unitId: 2,
  unitTitle: 'Macroeconomic Sustainability & Resource Economics',
  unitTitleAr: 'الاستدامة الاقتصادية الكلية واقتصاد الموارد البديلة',
  theme: 'Circular Bioeconomy, Decarbonization Mandates & Multilateral Trade Tariffs',
  grammarRule: 'Mixed Conditionals & Participle Clauses in Economic Forecasts',
  novelReference: 'King Lear — Acts 2 & 3: The Storm on the Heath & Cosmic Indifference',
  novelReferenceAr: 'مسرحية الملك لير — الفصلان الثاني والثالث: عاصفة البراري الموحشة والتعري من زخرف السلطة',
  sampleQuestions: {
    l1: {
      q: 'Had the state not invested in renewable energy infrastructure five years ago, our electrical grid __________ vulnerable to fuel volatility today.',
      opts: ['would be', 'would have been', 'will be', 'had been'],
      ans: [0],
      exp: 'Mixed conditional (past hypothetical cause with present consequence): Had + PP -> would + base verb.'
    },
    l2: {
      q: '__________ by international credit agencies, the sovereign green bonds attracted significant foreign investment.',
      opts: ['Authenticated', 'Authenticating', 'To authenticate', 'Having authenticate'],
      ans: [0],
      exp: 'Past participle clause replacing passive adverbial clause: (Being) Authenticated by...'
    },
    l3: {
      q: 'In environmental economics, "unpriced externalities" refer to __________.',
      opts: [
        'indirect costs such as pollution that are not reflected in the market price of goods',
        'the salaries paid to government finance ministers',
        'the retail discount offered during seasonal shopping events',
        'the physical weight of manufactured metal products'
      ],
      ans: [0],
      exp: 'Externalities are side effects of production borne by society without compensation.'
    },
    l4: {
      q: 'What is the primary operational objective of a "circular bioeconomy"?',
      opts: [
        'Decoupling industrial manufacturing from finite resource extraction through continuous reuse and recycling',
        'Accelerating the extraction of fossil fuels before they deplete',
        'Banning all international maritime container shipping',
        'Mandating that all manufactured goods be discarded after single use'
      ],
      ans: [0],
      exp: 'A circular economy emphasizes closed-loop regeneration of materials.'
    },
    l5: {
      q: 'Identify the sentence demonstrating the most accurate mixed conditional syntax:',
      opts: [
        'Had we ratified the international carbon accord earlier, our manufacturing sector would enjoy lower border tariffs now.',
        'Had we ratified the accord earlier, our manufacturing sector will enjoy lower tariffs now.',
        'If we ratified the accord earlier, our manufacturing sector would had enjoyed lower tariffs.',
        'Were we ratifying earlier, our sector enjoyed lower tariffs now.'
      ],
      ans: [0],
      exp: 'Had ratified (past condition) -> would enjoy (present result).'
    }
  },
  readingPassage: {
    title: 'The Macroeconomic Architecture of Carbon Border Adjustment',
    text: 'Global multilateral trade in 2026/2027 incorporates carbon border adjustment mechanisms (CBAM) to prevent "carbon leakage"—the relocation of carbon-intensive industries to jurisdictions with lax regulatory oversight. By levying tariffs equal to the domestic carbon price on imported steel, cement, and fertilizers, sovereign economic blocs incentivize trading partners to decarbonize their industrial supply chains, transforming environmental compliance into a competitive commercial prerequisite.',
    q: 'What is the economic function of Carbon Border Adjustment Mechanisms?',
    opts: [
      'To prevent carbon leakage by equalizing the carbon cost between domestic and imported goods',
      'To ban all imports of construction materials worldwide',
      'To subsidize foreign manufacturers using high-polluting coal plants',
      'To eliminate all taxes on industrial manufacturing'
    ],
    ans: [0],
    exp: 'CBAM equalizes carbon pricing to prevent industries from relocating to unregulated havens.'
  },
  translationPair: {
    enToAr: {
      src: 'Decarbonizing industrial manufacturing is a prerequisite for long-term macroeconomic stability.',
      opts: [
        'يعد خفض الانبعاثات الكربونية في الصناعات التحويلية شرطاً أساسياً لتحقيق الاستقرار الاقتصادي الكلي طويل الأجل.',
        'الصناعات الثقيلة يجب أن تستمر في استخدام الفحم لتقليل تكاليف الإنتاج فوراً.',
        'الاستقرار الاقتصادي لا يرتبط إطلاقاً بالمعايير البيئية العالمية.',
        'يجب وقف كافة المصانع لحماية البيئة بصرف النظر عن الإنتاج القومي.'
      ],
      ans: 0,
      exp: 'Option A translates the macroeconomic terms accurately.'
    },
    arToEn: {
      src: 'تسهم مشروعات الطاقة المتجددة في خلق فرص عمل خضراء وتعزيز السيادة الاقتصادية الوطنية.',
      opts: [
        'Renewable energy projects contribute to creating green employment opportunities and reinforcing national economic sovereignty.',
        'Renewable energy destroys jobs and increases reliance on foreign fossil fuels.',
        'National sovereignty depends exclusively on importing non-renewable coal.',
        'Green employment is unnecessary in modern industrial development.'
      ],
      ans: 0,
      exp: 'Option A provides the precise English academic translation.'
    }
  },
  literatureTask: {
    chapterOrAct: 3,
    q: '“Blow, winds, and crack your cheeks! rage! blow! You cataracts and hurricanoes, spout... A poor, bare, forked animal.” How does the storm on the heath mirror Lear’s internal psychological collapse and moral epiphany?',
    qAr: '«اعصفي أيتها الرياح وشققي شدقيكِ! اغضبي واعصفي!... الإنسان المجرد ليس سوى حيوان عارٍ ذي شعبتين». كيف تعكس عاصفة البراري انهيار لير النفسي وصحوته الأخلاقية؟',
    modelAnswer: 'Shakespeare employs the pathetic fallacy on a cosmic scale: the external meteorological tempest mirrors the inner anarchy of Lear’s shattered mind. Stripped of his knights, palace, and sanity by his ungrateful daughters, Lear confronts his mortal vulnerability on the barren heath. Tearing off his royal robes, he recognizes that without regal pomp, man is merely an "unaccommodated, bare, forked animal." This harrowing reduction purges his lifelong hubris, awakening his profound empathy for the destitute poor he once ignored.',
    criteria: [
      'Analysis of pathetic fallacy (external storm reflecting internal psychological tempest)',
      'Discussion of the phrase "unaccommodated man" and shedding royal garments',
      'Thematic transformation from autocratic arrogance to compassionate empathy'
    ]
  },
  essayTask: {
    title: 'The Macroeconomics of Ecological Transition',
    prompt: 'Write an analytical essay (200 words) discussing how sovereign states can balance fiscal growth with stringent decarbonization mandates.',
    outline: [
      'Introduction: The historic tension between industrial output and climate stewardship.',
      'Body 1: The mechanism of green fiscal policies (carbon pricing and green bonds).',
      'Body 2: The role of circular supply chains in mitigating raw material volatility.',
      'Conclusion: Sustainable economics as the foundation of modern national sovereignty.'
    ],
    model: 'The macroeconomic landscape of the mid-2020s has decisively rejected the antiquated dogma that ecological preservation compromises sovereign industrial growth. Forward-looking states increasingly recognize that environmental externalities—manifested in climate catastrophes, public health costs, and resource depletion—constitute profound liabilities that erode sovereign balance sheets. Balancing fiscal expansion with decarbonization mandates requires structural recalibration. By instituting carbon pricing frameworks and mobilizing capital through sovereign green bonds, governments incentivize private capital reallocation toward clean energy infrastructure, such as green hydrogen and utility-scale solar generation. Simultaneously, transitioning toward a circular bioeconomy mitigates vulnerability to raw material supply disruptions. Far from dampening economic dynamism, stringent ecological governance fosters technological innovation, creates resilient green employment sectors, and protects national export competitiveness under international carbon border tariffs.'
  }
});

export const bacSec2U3Exams = generateBaccalaureate5LevelExams({
  grade: 11,
  unitId: 3,
  unitTitle: 'Linguistic Anthropology & Cognitive Semantics',
  unitTitleAr: 'الأنثروبولوجيا اللغوية والدلالات المعرفية',
  theme: 'Language Acquisition, Endangered Regional Dialects & Neuro-Linguistic Architecture',
  grammarRule: 'Reduced Relative Clauses & Advanced Inverted Subjunctives',
  novelReference: 'King Lear — Acts 4 & 5: Cordelia’s Grace, Reconciliation & Tragic Catastrophe',
  novelReferenceAr: 'مسرحية الملك لير — الفصلان الرابع والخامس: طهارة كورديليا، لم الشمل المؤثر والمأساة الختامية',
  sampleQuestions: {
    l1: {
      q: 'The ancient manuscript __________ in the desert monastery preserved invaluable phonetic records of early Coptic dialects.',
      opts: ['discovered', 'discovering', 'was discovered', 'to discover'],
      ans: [0],
      exp: 'Reduced relative clause replacing "(which was) discovered": past participle alone.'
    },
    l2: {
      q: '__________ that regional dialects encode unique cultural conceptualizations of spatial geography.',
      opts: ['Suffice it to say', 'Sufficing to say', 'It suffices to say', 'Suffice to be saying'],
      ans: [0],
      exp: '"Suffice it to say" is the canonical formal frozen subjunctive formula.'
    },
    l3: {
      q: 'In cognitive semantics, metaphor is regarded not merely as ornamental rhetoric, but as __________.',
      opts: [
        'a fundamental neurological mechanism structuring abstract human conceptual thought',
        'a grammatical error that students should avoid in formal essays',
        'an obsolete device found only in ancient Greek poetry',
        'a computational glitch in digital word processors'
      ],
      ans: [0],
      exp: 'Cognitive semantics (Lakoff & Johnson) shows metaphor shapes fundamental thought processes.'
    },
    l4: {
      q: 'Why do linguistic anthropologists view the extinction of an indigenous dialect as an irreversible catastrophe?',
      opts: [
        'Because each language embodies unique taxonomic classifications, ecological lore, and conceptual paradigms',
        'Because it decreases the weight of printed dictionaries in national libraries',
        'Because computer keyboards can no longer be manufactured',
        'Because translation software ceases to operate without paper books'
      ],
      ans: [0],
      exp: 'Linguistic extinction destroys irreplaceable cultural, cognitive, and ecological archives.'
    },
    l5: {
      q: 'Identify the sentence with correctly reduced relative syntax:',
      opts: [
        'Linguists analyzing regional phonemes discovered previously unrecorded vowel shifts.',
        'Linguists analyze regional phonemes discovered vowel shifts.',
        'Linguists who analyzing phonemes discovered vowel shifts.',
        'Linguists were analyzing regional phonemes discovered shifts.'
      ],
      ans: [0],
      exp: 'Active reduced relative clause: "Linguists (who were) analyzing regional phonemes..."'
    }
  },
  readingPassage: {
    title: 'The Neurological Scaffolding of Linguistic Relativity',
    text: 'The Sapir-Whorf hypothesis, revitalized by contemporary cognitive neuroscience, posits that language structures influence the cognitive faculties of their speakers. Communities speaking languages with absolute spatial coordinates (cardinal directions) demonstrate vastly superior spatial memory compared to speakers utilizing egocentric relative terms (left/right). In the Nile Basin, documenting oral Nubian and Bedouin vernaculars preserves nuanced conceptual taxonomies that enrich global understandings of human cognition.',
    q: 'How does cognitive neuroscience substantiate aspects of the linguistic relativity hypothesis?',
    opts: [
      'By demonstrating that grammatical coordinate systems measurably alter spatial memory and perception',
      'By showing that all human brains process language in identical mathematical binary code',
      'By proving that learning a foreign language damages memory retention',
      'By demonstrating that written words have zero neural footprint'
    ],
    ans: [0],
    exp: 'Neurological data confirms that grammatical spatial frames influence cognitive processing.'
  },
  translationPair: {
    enToAr: {
      src: 'Preserving endangered dialects safeguards the cultural heritage and cognitive diversity of human civilization.',
      opts: [
        'إن حماية اللهجات المهددة بالاندثار تحفظ التراث الثقافي والتنوع المعرفي للحضارة الإنسانية.',
        'اللهجات المحلية تعيق دائماً التقدم العلمي ويجب استبدالها بلغات أجنبية.',
        'التنوع اللغوي يسبب الخلافات بين الشعوب ولذلك يجب توحيد العالم في لغة واحدة.',
        'اللغات المهددة بالانقراض لا تحمل أي قيمة معرفية أو تاريخية.'
      ],
      ans: 0,
      exp: 'Option A accurately conveys the anthropological nuance.'
    },
    arToEn: {
      src: 'تشكل اللغة الوعي الإنساني وتحدد أطر تفاعلنا مع العالم الطبيعي والاجتماعي.',
      opts: [
        'Language shapes human consciousness and determines the frameworks of our interaction with the natural and social world.',
        'Human consciousness is completely independent of any linguistic or cultural framework.',
        'Language is only an ornamental tool that has no influence on thought or perception.',
        'The natural world can only be understood through non-verbal mathematical equations.'
      ],
      ans: 0,
      exp: 'Option A renders the philosophical concept with academic elegance.'
    }
  },
  literatureTask: {
    chapterOrAct: 5,
    q: '“No, no, no, no! Come, let’s away to prison; we two alone will sing like birds i’ the cage: when thou dost ask me blessing, I’ll kneel down, and ask of thee forgiveness.” Analyze the supreme spiritual reconciliation between Lear and Cordelia in the play’s closing acts.',
    qAr: '«كلا، كلا، هيا بنا إلى السجن؛ سنغني معاً كطائرين في قفص. وحين تطلبين بركتي سأجثو على ركبتي وأسألكِ الغفران». حلل مشهد الصلح الروحي الأسمى بين لير وكورديليا في ختام المسرحية.',
    modelAnswer: 'This tender passage marks the moral zenith of King Lear. Lear has completely discarded his autocratic vanity, obsession with kingdom boundaries, and desire for public flattery. Welcoming physical imprisonment with joyous serenity, Lear discovers that true freedom resides in authentic filial love and mutual forgiveness. His willingness to kneel before Cordelia—the monarch bowing to the child he unjustly exiled—consecrates his transformation from a petulant tyrant into a redeemed, loving father.',
    criteria: [
      'Contrast between Lear’s initial obsession with power/homage and his joyous acceptance of prison',
      'Analysis of the poetic metaphor "sing like birds i’ the cage" as spiritual liberation',
      'Thematic climax: a sovereign king kneeling to ask his youngest child for forgiveness'
    ]
  },
  essayTask: {
    title: 'The Ecology of Human Languages',
    prompt: 'Write an analytical essay (200 words) on why the preservation of endangered indigenous vernaculars is crucial for human cognitive science.',
    outline: [
      'Introduction: The rapid rate of global linguistic extinction.',
      'Body 1: Linguistic diversity as a repository of unique cognitive and ecological knowledge.',
      'Body 2: Digital documentation techniques bridging linguistics and artificial intelligence.',
      'Conclusion: Cultural diversity as an indispensable dimension of human heritage.'
    ],
    model: 'In an era dominated by hyper-connected algorithmic media and digital linguistic homogenization, thousands of regional vernaculars face imminent extinction. Linguistic anthropologists observe that when a language perishes, humanity loses far more than phonetic conventions; it forfeits a unique epistemic lens through which reality was deciphered across millennia. Indigenous languages often encode sophisticated taxonomies of botanical lore, astronomical navigation, and ecological equilibrium that modern science has yet to fully comprehend. Furthermore, cognitive semantics demonstrates that diverse grammatical structures illuminate the architectural adaptability of human neural processing. Protecting endangered vernaculars—through digital voice corpora, pedagogical revitalization, and community archiving—is therefore not an exercise in nostalgic sentimentality, but an imperative for scientific inquiry. By safeguarding linguistic biodiversity, global society ensures that the kaleidoscopic richness of human consciousness remains accessible to future generations of researchers.'
  }
});

// -------------------------------------------------------------------------------------------------
// 3. GRADE 12 (SECONDARY 3) - BACCALAUREATE 5-LEVEL EXAM SUITES
// Novel: Great Expectations by Charles Dickens (Chapters 1 to 12 & Capstone)
// -------------------------------------------------------------------------------------------------

export const bacSec3U1Exams = generateBaccalaureate5LevelExams({
  grade: 12,
  unitId: 1,
  unitTitle: 'Diplomatic Discourse & Global Jurisprudence',
  unitTitleAr: 'الخطاب الدبلوماسي وفلسفة القانون الدولي',
  theme: 'Multilateral Conventions, Universal Human Rights & Sovereignty in International Law',
  grammarRule: 'Perfect Participle Clauses & Complex Negative Inversions',
  novelReference: 'Great Expectations (Dickens) — Chapters 1 to 4: The Convict on the Marshes',
  novelReferenceAr: 'رواية آمال كبرى — الفصول من 1 إلى 4: السجين الهارب في المستنقعات ونبل الإنسانية الفطرية',
  sampleQuestions: {
    l1: {
      q: 'Having __________ the binding multilateral treaty, the sovereign parliament enacted harmonized domestic legislation.',
      opts: ['ratified', 'ratifying', 'ratify', 'to ratify'],
      ans: [0],
      exp: 'Perfect participle clause: Having + past participle (ratified) indicating prior completed action.'
    },
    l2: {
      q: 'Under no circumstances __________ a sovereign state to violate codified international maritime corridors.',
      opts: ['is permitted', 'permits', 'has permitted', 'did permit'],
      ans: [0],
      exp: 'Inversion after "Under no circumstances": auxiliary (is) + subject + past participle.'
    },
    l3: {
      q: 'The legal doctrine of "universal jurisprudence" asserts that basic human rights __________ all geographic and statutory boundaries.',
      opts: ['transcend', 'subjugate', 'abbreviate', 'curtail'],
      ans: [0],
      exp: 'Transcend = exceed, go beyond national statutory jurisdictions.'
    },
    l4: {
      q: 'In diplomatic negotiations, how does "impartial arbitration" resolve interstate maritime territorial disputes?',
      opts: [
        'By submitting claims to an independent international tribunal whose binding adjudication is rooted in codified law',
        'By encouraging unilateral military deployment to claim contested islands',
        'By conducting public opinion polls on commercial social media apps',
        'By dissolving the legal sovereignty of both disputing nation-states'
      ],
      ans: [0],
      exp: 'Arbitration relies on an independent neutral tribunal issuing binding legal decisions.'
    },
    l5: {
      q: 'Choose the sentence demonstrating the most sophisticated diplomatic register:',
      opts: [
        'Notwithstanding the unilateral assertions of the respondent, the International Court upheld the inviolability of sovereign territorial waters.',
        'Even though the other country said stuff, the court said the water was ours.',
        'Because one side talked loud, the court decided to give water to everyone.',
        'Notwithstanding that one side argued, the water was divided somehow.'
      ],
      ans: [0],
      exp: 'Demonstrates elevated diplomatic vocabulary: Notwithstanding, assertions, inviolability, sovereign territorial waters.'
    }
  },
  readingPassage: {
    title: 'The Evolution of Supranational Adjudication in International Law',
    text: 'The international legal architecture established post-1945 rests on the sovereign equality of nation-states and the prohibition of coercive unilateral force. Through institutions like the International Court of Justice (ICJ) and permanent arbitration forums, sovereign governments litigate transboundary riparian rights, maritime boundaries, and environmental covenants. However, supranational adjudication requires universal adherence; when dominant powers selectively evade binding rulings, the collective legitimacy of global jurisprudence is gravely eroded.',
    q: 'According to the passage, what threatens the efficacy of supranational judicial bodies?',
    opts: [
      'The selective evasion of binding international verdicts by dominant powers',
      'The excessive reliance on codified written treaties',
      'The translation of legal arguments into multiple foreign languages',
      'The physical location of international courts in European capitals'
    ],
    ans: [0],
    exp: 'Selective non-compliance by powerful states undermines the entire scaffolding of international law.'
  },
  translationPair: {
    enToAr: {
      src: 'Adherence to international law and judicial arbitration is the cornerstone of sustainable world peace.',
      opts: [
        'إن الالتزام بالقانون الدولي والتحكيم القضائي يمثل حجر الزاوية لتحقيق السلام العالمي المستدام.',
        'القوانين الدولية لا تلزم إلا الدول النامية بينما تعفى الدول العظمى من كافة الاتفاقيات.',
        'التحكيم القضائي يستغرق وقتاً طويلاً ولذلك تفضل الدول النزاعات العسكرية.',
        'السلام العالمي يتحقق فقط عبر إبرام معاهدات تجارية دون حاجة للقانون.'
      ],
      ans: 0,
      exp: 'Option A provides the precise, authoritative Arabic diplomatic translation.'
    },
    arToEn: {
      src: 'تؤكد المواثيق الدولية على احترام السيادة الوطنية وحظر الاستيلاء على الأراضي بالقوة.',
      opts: [
        'International covenants emphasize respect for national sovereignty and prohibit the acquisition of territory by force.',
        'International treaties permit the military annexation of foreign land during economic crises.',
        'National sovereignty can be disregarded whenever international corporations desire.',
        'Acquiring foreign territories is supported by universal human rights charters.'
      ],
      ans: 0,
      exp: 'Option A translates the diplomatic principles with flawless precision.'
    }
  },
  literatureTask: {
    chapterOrAct: 1,
    q: 'How does Dickens use the terrifying encounter between young Pip and the escaped convict Magwitch on the desolate Kent marshes to subvert Victorian notions of criminality and morality?',
    qAr: 'كيف يوظف ديكنز اللقاء المرعب بين الصغير بيب والسجين الهارب ماجويتش في مستنقعات كِنت لتقويض المفاهيم الفيكتورية السائدة حول الإجرام والأخلاق؟',
    modelAnswer: 'Dickens inverts Victorian class morality from the opening chapter. Magwitch appears terrifying, brutalized by prison irons and starvation, threatening the child violently. Yet when Pip treats him with instinctive compassion—bringing him food and pitifying his suffering—Magwitch exhibits profound moral gratitude. When recaptured, Magwitch chivalrously claims he stole the pie himself to protect Pip. Dickens demonstrates that the branded criminal possesses greater nobility, courage, and loyalty than the respectable, self-righteous Victorian hypocrites who condemn him.',
    criteria: [
      'Contrast between Magwitch’s terrifying exterior and his inner capacity for gratitude',
      'Pip’s instinctive empathy (pitying the convict eating) as the catalyst for mutual redemption',
      'Magwitch’s self-sacrificing lie protecting Pip from punishment as proof of authentic nobility'
    ]
  },
  essayTask: {
    title: 'The Scaffolding of International Jurisprudence',
    prompt: 'Write an analytical essay (200 words) on how multilateral legal adjudication preserves sovereign rights in global diplomacy.',
    outline: [
      'Introduction: The post-war transition from unilateral force to codified multilateralism.',
      'Body 1: The role of the International Court of Justice in resolving border and maritime disputes.',
      'Body 2: The systemic crisis of selective compliance and jurisdictional legitimacy.',
      'Conclusion: Upholding universal legal norms as the prerequisite for civilizational survival.'
    ],
    model: 'The contemporary architecture of global governance is anchored in the foundational premise that sovereign disagreements must be mediated through impartial jurisprudence rather than coercive militarism. Codified multilateral instruments, deposited with supranational institutions like the International Court of Justice, provide a rigorous mechanism for resolving boundary contestations, riparian allocations, and maritime jurisdictions. When nation-states submit to binding legal adjudication, they substitute violent chaos with structured argumentation grounded in archival evidence and legal treaties. However, the integrity of this jurisprudential scaffolding remains inherently fragile. The efficacy of international law depends upon universal, non-discriminatory compliance. When influential powers selectively repudiate judicial verdicts that conflict with domestic strategic interests, they delegitimize the very multilateral framework that guarantees global security. Preserving international legal sovereignty requires relentless diplomatic commitment: reinforcing the principle that treaties, once ratified, transcend temporal political expedience and establish enduring obligations to the global community.'
  }
});

export const bacSec3U2Exams = generateBaccalaureate5LevelExams({
  grade: 12,
  unitId: 2,
  unitTitle: 'Bioethics & Artificial Intelligence Governance',
  unitTitleAr: 'الأخلاقيات الحيوية وحوكمة الذكاء الاصطناعي',
  theme: 'Algorithmic Accountability, Genetic Editing Ethics & Digital Human Rights',
  grammarRule: 'Advanced Modal Stance & Impersonal Passives in Jurisprudential Drafting',
  novelReference: 'Great Expectations — Chapters 5 to 8: Satis House & The Pathology of Revenge',
  novelReferenceAr: 'رواية آمال كبرى — الفصول من 5 إلى 8: قصر ساتيس هاوس، مأساة الانتقام وتشويه المشاعر',
  sampleQuestions: {
    l1: {
      q: 'It is widely __________ that autonomous intelligence algorithms must remain subject to human-in-the-loop oversight.',
      opts: ['acknowledged', 'acknowledging', 'acknowledge', 'to acknowledge'],
      ans: [0],
      exp: 'Impersonal passive construction: It is widely + past participle (acknowledged) + that clause.'
    },
    l2: {
      q: 'In formal bioethical legislation, the phrase "must needs be" denotes __________.',
      opts: [
        'an inescapable logical and moral requirement that cannot be compromised',
        'an optional suggestion that researchers can ignore if expensive',
        'a past possibility that no longer applies to contemporary laboratories',
        'a speculative doubt regarding experimental feasibility'
      ],
      ans: [0],
      exp: '"Must needs be" encodes absolute, inescapable statutory necessity.'
    },
    l3: {
      q: 'Why do international bioethicists establish a strict regulatory boundary against "germline" gene editing?',
      opts: [
        'Because genetic modifications made to germline cells are permanently inherited by all subsequent generations',
        'Because germline editing requires zero laboratory equipment or training',
        'Because it is exclusively utilized in commercial cosmetic advertising',
        'Because germline alterations disappear naturally after twenty-four hours'
      ],
      ans: [0],
      exp: 'Germline alterations alter human hereditary DNA permanently across all future generations.'
    },
    l4: {
      q: 'In algorithmic governance, the mandate for "explainability" requires developers to __________.',
      opts: [
        'provide transparent, understandable rationales for how an AI system reached a specific decision',
        'delete all source code immediately after software deployment',
        'publish all proprietary corporate financial accounts on social media',
        'prevent any human auditor from inspecting training datasets'
      ],
      ans: [0],
      exp: 'Explainability ensures algorithmic decisions are auditable, fair, and transparent.'
    },
    l5: {
      q: 'Identify the sentence demonstrating the most formal impersonal passive style:',
      opts: [
        'It is held by constitutional jurists that digital biometric privacy constitutes an inviolable fundamental right.',
        'Judges think that privacy is really important for everyone on the internet.',
        'People say that biometric data must be private always.',
        'We believe privacy is good and computers should not steal it.'
      ],
      ans: [0],
      exp: '"It is held by constitutional jurists that..." exemplifies elevated impersonal legal register.'
    }
  },
  readingPassage: {
    title: 'The Bioethical Convergence of Genome Editing and Autonomous Systems',
    text: 'The intersection of CRISPR-Cas9 genetic engineering and deep learning diagnostic algorithms inaugurates a transformative yet perilous medical epoch. While predictive neural networks accelerate molecular drug discovery, algorithmic triage systems risk encoding systemic demographic biases. Simultaneously, germline genomic modifications pose existential questions regarding human dignity: commodifying biological traits risks resurrecting insidious eugenic hierarchies under the guise of therapeutic optimization.',
    q: 'What existential hazard does germline genetic commodification introduce according to the passage?',
    opts: [
      'The resurrection of insidious eugenic hierarchies disguised as therapeutic enhancement',
      'The total eradication of all pharmaceutical research institutions',
      'An immediate drop in computer processing speeds worldwide',
      'A global ban on teaching biology in secondary schools'
    ],
    ans: [0],
    exp: 'Germline commodification risks creating stratified genetic castes and neo-eugenic discrimination.'
  },
  translationPair: {
    enToAr: {
      src: 'Algorithmic governance must guarantee transparency, accountability, and the protection of fundamental human dignity.',
      opts: [
        'يجب أن تضمن حوكمة الخوارزميات الشفافية والمساءلة القانونية وحماية الكرامة الإنسانية الأساسية.',
        'الذكاء الاصطناعي لا يحتاج إلى أي ضوابط قانونية لأنه يعمل بدقة تفوق البشر.',
        'الكرامة الإنسانية تتعارض دائماً مع استخدام التكنولوجيا الحديثة في المستشفيات.',
        'المساءلة القانونية يجب أن تقع على عاتق الروبوتات دون محاسبة مطوري البرمجيات.'
      ],
      ans: 0,
      exp: 'Option A translates the bioethical concepts with legal fidelity.'
    },
    arToEn: {
      src: 'تحظر المواثيق الأخلاقية استغلال التطور الجيني لأغراض تجارية تمييزية تنتهك حقوق الإنسان.',
      opts: [
        'Bioethical charters prohibit the exploitation of genetic advancement for discriminatory commercial purposes that violate human rights.',
        'Genetic advancement should be commercialized freely without any regard for human rights.',
        'Ethical charters encourage discrimination based on genetic traits in employment.',
        'Human rights charters do not apply to medical and biological technologies.'
      ],
      ans: 0,
      exp: 'Option A provides the precise English legal translation.'
    }
  },
  literatureTask: {
    chapterOrAct: 8,
    q: '“It is a most miserable thing to be ashamed of home... I had believed in the forge as the glowing road to manhood; now, it was all coarse and common.” Analyze how Pip’s exposure to Miss Havisham and Estella at Satis House poisons his moral values.',
    qAr: '«إنه لأمر بائس للغاية أن يخجل المرء من بيته... كنت أؤمن بورشتنا كطريق وهاج للرجولة، أما الآن فأصبحت أراها خشنة مبتذلة». حلل كيف أفسد تعرض بيب لقصر ساتيس هاوس وإستيلا قيمه الأخلاقية.',
    modelAnswer: 'Satis House represents psychological and moral decay frozen in time. Miss Havisham, consumed by bitter vengeance after being jilted, uses Estella as a weapon to break male hearts. When Estella mocks Pip’s coarse hands and thick boots, Pip internalizes artificial Victorian class snobbery. Instead of valuing Joe Gargery’s unpretentious integrity and loving labor at the forge, Pip feels toxic shame for his humble origins. Dickens illustrates that social ambition divorced from moral truth alienates human beings from genuine love.',
    criteria: [
      'Analysis of Satis House as an emblem of psychological decay, frozen time, and spite',
      'Estella’s cruel mockery of Pip’s working-class physical traits (coarse hands, thick boots)',
      'Pip’s tragic internalization of false class superiority over Joe Gargery’s honest forge'
    ]
  },
  essayTask: {
    title: 'The Ethics of Autonomous Intelligence and Genetic Architecture',
    prompt: 'Write an analytical essay (200 words) discussing why bioethical oversight must govern generative AI and genome engineering.',
    outline: [
      'Introduction: The rapid convergence of biomedical engineering and artificial intelligence.',
      'Body 1: The ethical imperative of algorithmic transparency and bias mitigation in medicine.',
      'Body 2: The inviolable sanctity of the human germline against neo-eugenic commodification.',
      'Conclusion: Framing technology as an instrument of human flourishing, bounded by moral law.'
    ],
    model: 'The technological landscape of the twenty-first century is defined by the convergence of two unprecedented capabilities: the capacity to engineer the human biological code through CRISPR genome editing, and the ability to automate cognitive judgment through deep artificial neural networks. While these breakthroughs offer transformative therapeutic promise, they present grave existential hazards if detached from bioethical jurisprudence. In healthcare analytics, autonomous triage and diagnostic algorithms frequently inherit systemic demographic biases from training data, potentially institutionalizing discriminatory healthcare access. It is an imperative of modern governance that algorithmic systems remain explainable, auditable, and subject to human oversight. Even more profound are the perils of germline genetic modification. When genetic alterations are rendered heritable, the human species risks crossing an irreversible threshold toward biological commodification and neo-eugenic stratification. Safeguarding civilizational equity demands multilateral statutory covenants affirming that human dignity is non-negotiable, and that technological innovation must forever serve as the servant of humanity rather than its master.'
  }
});

export const bacSec3U3Exams = generateBaccalaureate5LevelExams({
  grade: 12,
  unitId: 3,
  unitTitle: 'Higher Level Capstone Simulation & Thesis Defense',
  unitTitleAr: 'محاكاة مشروع التخرج رفيع المستوى والدفاع عن الأطروحة',
  theme: 'Empirical Research Defense, Discursive Rhetoric & Higher-Order Synthesis',
  grammarRule: 'Rhetorical Discourse Markers & Cohesive Academic Connectors',
  novelReference: 'Great Expectations — Chapters 9 to 12 & Capstone: The Anonymous Benefactor & True Gentlemanliness',
  novelReferenceAr: 'رواية آمال كبرى — الفصول من 9 إلى 12 والختام: المحسن المجهول، نبل الجوهر والوفاء الأخلاقي',
  sampleQuestions: {
    l1: {
      q: 'Which discourse marker is most appropriate to introduce a logical concession followed by a definitive counter-claim?',
      opts: ['Notwithstanding the foregoing', 'Because of this', 'In order that', 'Consequently then'],
      ans: [0],
      exp: '"Notwithstanding the foregoing" signals high-register academic concession prior to rebuttal.'
    },
    l2: {
      q: 'The researcher presented a definitive rebuttal to the committee’s critique; __________ of corollary, the hypothesis was ratified.',
      opts: ['by way', 'on behalf', 'in front', 'with respect'],
      ans: [0],
      exp: '"By way of corollary" introduces a natural, logically deduced consequence.'
    },
    l3: {
      q: 'What constitutes an academic "capstone simulation and defense" in senior Baccalaureate evaluation?',
      opts: [
        'Formulating an original empirical thesis and defending its methodology and telemetry against faculty cross-examination',
        'Memorizing multiple choice keys from previous decades without understanding',
        'Writing a brief summary of a fictional novel without citations',
        'Reading aloud a textbook chapter without answering questions'
      ],
      ans: [0],
      exp: 'A capstone defense is an oral viva testing original research, methodology, and discursive rigor.'
    },
    l4: {
      q: 'In academic writing, "discursive synthesis" describes the intellectual ability to __________.',
      opts: [
        'combine divergent theoretical perspectives and empirical findings into a coherent, higher-order thesis',
        'repeat a single author’s argument verbatim without analysis',
        'dismiss all opposing viewpoints using sarcastic language',
        'delete contradictory data to make charts look uniform'
      ],
      ans: [0],
      exp: 'Synthesis is the integration of multiple complex sources into an original coherent whole.'
    },
    l5: {
      q: 'Identify the sentence demonstrating the most cohesive academic argumentative flow:',
      opts: [
        'Notwithstanding the preliminary fiscal expenditure, the discounted cash-flow telemetry corroborates long-term infrastructural solvency; by way of corollary, the initiative commands state support.',
        'Even though it cost money at first, the project is good and we should do it right now.',
        'Because spending money is bad, we did not spend it, so the project succeeded anyway.',
        'Money was spent notwithstanding, but cash was good by corollary.'
      ],
      ans: [0],
      exp: 'Flawlessly deploys formal connectors: Notwithstanding..., telemetry corroborates..., by way of corollary...'
    }
  },
  readingPassage: {
    title: 'The Epistemic Rigor of the Baccalaureate Thesis Defense',
    text: 'The Senior Baccalaureate Capstone Dissertation represents the bridge between secondary education and university scholarship. Candidates do not regurgitate standardized syllabi; they identify an unaddressed empirical problem, formulate an evidence-based thesis, and substantiate it with reproducible quantitative data. During the viva voce examination, academic jurors rigorously probe methodological vulnerability, test statistical limits, and evaluate discursive composure.',
    q: 'What is the primary pedagogical objective of the Baccalaureate viva voce defense?',
    opts: [
      'To evaluate candidates’ ability to defend original empirical research against rigorous cross-examination',
      'To test how quickly students can write handwritten sentences in a timed sprint',
      'To verify that students agree with every opinion held by the examination jury',
      'To force candidates to memorize encyclopedic trivia without critical reasoning'
    ],
    ans: [0],
    exp: 'The viva voce evaluates critical defense of original research under academic scrutiny.'
  },
  translationPair: {
    enToAr: {
      src: 'The senior capstone project cultivates scholarly rigor, analytical rhetoric, and intellectual independence.',
      opts: [
        'يسهم مشروع التخرج للمرحلة الثانوية في تنمية الصرامة العلمية والبلاغة التحليلية والاستقلال الفكري.',
        'مشروع التخرج هو امتحان روتيني يعتمد على الحفظ والتلقين فقط دون أي بحث.',
        'الاستقلال الفكري يعني عدم الرجوع إلى أي مراجع علمية أو تجارب سابقة.',
        'البلاغة التحليلية تتطلب استخدام العبارات العامية في الأبحاث الجامعية.'
      ],
      ans: 0,
      exp: 'Option A translates the academic competencies with solemn dignity.'
    },
    arToEn: {
      src: 'يتطلب الدفاع عن الأطروحة العلمية التمكن من أدوات البحث التجريبي ومواجهة النقد الموضوعي بحجج دامغة.',
      opts: [
        'Defending an academic thesis requires mastery of empirical research tools and confronting objective critique with irrefutable arguments.',
        'Defending a thesis means refusing to listen to any criticism from the examination board.',
        'Empirical research tools are unnecessary when presenting emotional personal stories.',
        'Objective critique should be prohibited during university dissertation defenses.'
      ],
      ans: 0,
      exp: 'Option A renders the academic defense principles with precision.'
    }
  },
  literatureTask: {
    chapterOrAct: 12,
    q: '“‘Dear Magwitch, I must tell you, now at last. You had a child once, whom you loved and lost. She is a lady and very beautiful. And I love her!’” How does Pip’s final revelation to the dying convict mark his complete moral redemption and true gentlemanliness?',
    qAr: '«عزيزي ماجويتش، يجب أن أخبرك الآن وأخيراً: كان لك طفلة ذات يوم، أحببتها وفقدتها؛ إنها الآن سيدة بالغة الجمال، وإني أحبها!». كيف يمثل اعتراف بيب الأخير لماجويتش خلاصه الأخلاقي التام ونبل فروسيته الحقة؟',
    modelAnswer: 'This climactic moment marks the culmination of Pip’s moral pilgrimage. When Pip first discovered that Magwitch—an escaped, branded convict—was his secret benefactor rather than the aristocratic Miss Havisham, Pip felt overwhelming revulsion and horror. Yet as Magwitch faces death, Pip’s snobbery melts into unconditional filial love. Holding the dying convict’s hand in prison, Pip reveals that Magwitch’s lost daughter (Estella) is alive, beautiful, and deeply loved by Pip. By comforting the dying outcast and renouncing the tainted fortune, Pip achieves authentic gentility: true nobility of spirit, forged through love, loyalty, and self-sacrifice rather than Victorian class privilege.',
    criteria: [
      'Contrast between Pip’s initial disgust at Magwitch’s identity and his final tender loyalty',
      'The dramatic reconciliation: Estella is Magwitch’s child, uniting high society and criminal underworld',
      'The novel’s moral resolution: true gentlemanliness is defined by Joe Gargery and Magwitch’s love, not money'
    ]
  },
  essayTask: {
    title: 'The Synthesis of Rigor and Rhetoric in Academic Research',
    prompt: 'Write an analytical essay (200 words) discussing how secondary students develop scholarly maturity through capstone research defense.',
    outline: [
      'Introduction: The transition from passive memorization to active inquiry.',
      'Body 1: The empirical discipline required to formulate and test an original hypothesis.',
      'Body 2: The discursive composure developed through viva cross-examination.',
      'Conclusion: Capstone scholarship as preparation for leadership in knowledge economies.'
    ],
    model: 'The culmination of secondary educational formation is celebrated not by the passive absorption of codified knowledge, but by the intellectual courage to formulate original research and defend its validity before a scholarly jury. In the Egyptian Baccalaureate track, the Capstone Dissertation functions as the ultimate crucible of academic maturation. Rather than accepting textbook assertions as immutable axioms, candidates must interrogate unexamined problems, gather empirical telemetry, and articulate cohesive methodologies. This rigorous process bridges quantitative precision with discursive eloquence. Defending a thesis during viva cross-examination compels candidates to develop metacognitive composure: anticipating counter-claims, conceding evidentiary boundaries with intellectual humility, and deploying cogent rebuttals rooted in verifiable facts. Such experience fundamentally transforms the student from a passive consumer of information into an active contributor to human knowledge, cultivating the ethical, analytical, and rhetorical competencies indispensable for leadership in modern knowledge societies.'
  }
});

// =================================================================================================
// 4. CONSOLIDATED BACCALAUREATE UNIT GROUPS (GRADES 10, 11, 12)
// =================================================================================================

export const baccalaureateUnits10: UnitInfo[] = [
  {
    id: 1,
    title: 'Sustainable Global Frontiers',
    titleAr: 'الحدود البيئية العالمية وحفظ النظم البحرية',
    theme: 'Oceanic Conservation, Thermal Resilience in Coral Biomes & Environmental Refugia',
    grammarFocus: 'Syntactic Inversion (Under no circumstances / Seldom) & Emphatic Cleft Sentences',
    novelChapter: 'World Literature: The Old Man and the Sea (Hemingway) — Man vs Ecological Majesty',
    exams: bacSec1U1Exams
  },
  {
    id: 2,
    title: 'Civic Leadership & Philanthropic Architecture',
    titleAr: 'القيادة المدنية وصياغة العمل التطوعي المتقدم',
    theme: 'Altruism, Non-Governmental Organizations & Structural Community Empowerment',
    grammarFocus: 'Correlative Conjunctions (Scarcely... when) & Subjunctive Passive Forms',
    novelChapter: 'World Literature: The Old Man and the Sea — Santiago and Manolin’s Sacred Covenant',
    exams: bacSec1U2Exams
  },
  {
    id: 3,
    title: 'Digital Epistemology & Algorithmic Media',
    titleAr: 'نظرية المعرفة الرقمية والإعلام الخوارزمي',
    theme: 'Infodemic Containment, Deepfake Forensics & Cognitive Resistance to Disinformation',
    grammarFocus: 'Inverted Conditionals (Were it not for / Had they verified) & Modal Stance',
    novelChapter: 'World Literature: The Old Man and the Sea — Hemingway’s Objective Iceberg Theory',
    exams: bacSec1U3Exams
  },
  {
    id: 4,
    title: 'Renewable Agritech & Desert Reclamation',
    titleAr: 'الزراعة التكنولوجية المتقدمة واستصلاح الأراضي الصحراوية',
    theme: 'Closed-Loop Hydroponics, Subterranean Aquifer Monitoring & Arid Biosphere Engineering',
    grammarFocus: 'Complex Relative Clauses & Reduced Participle Clauses',
    novelChapter: 'World Literature: The Old Man and the Sea (Hemingway) — The 48-Hour Struggle on High Seas',
    exams: bacSec1U4Exams
  },
  {
    id: 5,
    title: 'Suez Maritime Logistics & Global Trade Corridors',
    titleAr: 'اللوجستيات الملاحية وقناة السويس وممرات التجارة العالمية',
    theme: 'Containerization, Chokepoint Geopolitics, Green Port Decarbonization & Multimodal Transit',
    grammarFocus: 'Advanced Passive Register & Impersonal Constructions (It is asserted that...)',
    novelChapter: 'World Literature: The Old Man and the Sea (Hemingway) — Subjugation of the Great Marlin',
    exams: bacSec1U5Exams
  },
  {
    id: 6,
    title: 'Archaeological Digital Forensics & Monumental Stewardship',
    titleAr: 'الأدلة الرقمية الأثرية وحفظ التراث الإنساني',
    theme: 'Photogrammetry, LiDAR Subsurface Tomography, Heritage Repatriation & Digital Archiving',
    grammarFocus: 'Unreal Conditionals & Past Subjunctive Inversions (Had it not been for...)',
    novelChapter: 'World Literature: The Old Man and the Sea (Hemingway) — Dignity Undefeated & The Lions',
    exams: bacSec1U6Exams
  }
];

export const baccalaureateUnits11: UnitInfo[] = [
  {
    id: 1,
    title: 'Epistemology & Cognitive Bias',
    titleAr: 'نظرية المعرفة والانحياز المعرفي في المنهج العلمي',
    theme: 'Falsifiability, Peer Review Scrutiny & Cognitive Biases (Anchoring & Confirmation)',
    grammarFocus: 'Wh-Cleft Sentences (What Popper emphasized was...) & Academic Nominalisation',
    novelChapter: 'Tragic Dramaturgy: King Lear (Shakespeare) — Tragic Blindness & The Pathology of Hubris',
    exams: bacSec2U1Exams
  },
  {
    id: 2,
    title: 'Macroeconomic Sustainability & Resource Economics',
    titleAr: 'الاستدامة الاقتصادية الكلية واقتصاد الموارد البديلة',
    theme: 'Circular Bioeconomy, Decarbonization Mandates & Multilateral Trade Tariffs',
    grammarFocus: 'Mixed Conditionals (Had we invested then, we would be resilient now) & Participle Clauses',
    novelChapter: 'Tragic Dramaturgy: King Lear — The Storm as Cosmic Indifference to Human Vanity',
    exams: bacSec2U2Exams
  },
  {
    id: 3,
    title: 'Linguistic Anthropology & Cognitive Semantics',
    titleAr: 'الأنثروبولوجيا اللغوية والدلالات المعرفية',
    theme: 'Language Acquisition, Endangered Regional Dialects & Neuro-Linguistic Architecture',
    grammarFocus: 'Reduced Relative Clauses & Advanced Inverted Subjunctives',
    novelChapter: 'Tragic Dramaturgy: King Lear — Rhetorical Deception vs Cordelia’s Sacred Truth',
    exams: bacSec2U3Exams
  },
  {
    id: 4,
    title: 'Bio-Cybernetics & Neural Interfaces',
    titleAr: 'السيبرانية الحيوية والواجهات العصبية المتقدمة',
    theme: 'Brain-Computer Interfaces, Prosthetic Neuro-Motor Rehabilitation & Transhumanist Ethics',
    grammarFocus: 'Subjunctive in Formal Scientific Assertions & Mandates (insist that / be imperative)',
    novelChapter: 'Tragic Dramaturgy: King Lear (Shakespeare) — The Cliff of Dover & Spiritual Sight in Blindness',
    exams: bacSec2U4Exams
  },
  {
    id: 5,
    title: 'Orbital Governance & Extraterrestrial Jurisprudence',
    titleAr: 'الحوكمة المدارية وقانون الفضاء الخارجي',
    theme: 'Kessler Syndrome, Orbital Debris Mitigation, Lunar Mining Rights & Supranational Space Treaties',
    grammarFocus: 'Double Comparative Structures & Proportionate Discourse (The more... the more...)',
    novelChapter: 'Tragic Dramaturgy: King Lear (Shakespeare) — Trial by Combat & Cosmic Moral Reckoning',
    exams: bacSec2U5Exams
  },
  {
    id: 6,
    title: 'Comparative Rhetoric & Critical Discourse Analysis',
    titleAr: 'البلاغة المقارنة والتحليل النقدي للخطاب',
    theme: 'Ideological Framing, Discursive Hegemony, Fallacy Deconstruction & Cross-Cultural Argumentation',
    grammarFocus: 'Inversion with Negative Correlatives (Scarcely... when / No sooner... than)',
    novelChapter: 'Tragic Dramaturgy: King Lear (Shakespeare) — Lear’s Pieta, Cordelia’s Death & Tragic Catharsis',
    exams: bacSec2U6Exams
  }
];

export const baccalaureateUnits12: UnitInfo[] = [
  {
    id: 1,
    title: 'Diplomatic Discourse & Global Jurisprudence',
    titleAr: 'الخطاب الدبلوماسي وفلسفة القانون الدولي',
    theme: 'Multilateral Conventions, Universal Human Rights & Sovereignty in International Law',
    grammarFocus: 'Perfect Participle Clauses (Having ratified...) & Complex Negative Inversions',
    novelChapter: 'Victorian Social Hierarchy: Great Expectations (Dickens) — The Legal Hypocrisy of Newgate',
    exams: bacSec3U1Exams
  },
  {
    id: 2,
    title: 'Bioethics & Artificial Intelligence Governance',
    titleAr: 'الأخلاقيات الحيوية وحوكمة الذكاء الاصطناعي',
    theme: 'Algorithmic Accountability, Genetic Editing Ethics & Digital Human Rights',
    grammarFocus: 'Advanced Modal Stance (Must needs be / It is imperative that...) & Impersonal Passives',
    novelChapter: 'Victorian Social Hierarchy: Great Expectations — Satis House as Moral Stagnation',
    exams: bacSec3U2Exams
  },
  {
    id: 3,
    title: 'Higher Level Capstone Simulation & Thesis Defense',
    titleAr: 'محاكاة مشروع التخرج رفيع المستوى والدفاع عن الأطروحة',
    theme: 'Empirical Research Defense, Discursive Rhetoric & Higher-Order Synthesis',
    grammarFocus: 'Rhetorical Discourse Markers & Cohesive Academic Connectors',
    novelChapter: 'Victorian Social Hierarchy: Great Expectations — Pip’s True Nobility through Self-Sacrifice',
    exams: bacSec3U3Exams
  },
  {
    id: 4,
    title: 'Transboundary Riparian Geopolitics & Water Jurisprudence',
    titleAr: 'جيوسياسة المياه العابرة للحدود وفقه الأمن المائي',
    theme: 'Hydropolitics, Helsinki Rules, Equitable Riparian Apportionment & Ecological Baseflow',
    grammarFocus: 'Concessive Clauses with Inversion (Be that as it may / Whatever the merits / However complex)',
    novelChapter: 'Victorian Social Hierarchy: Great Expectations (Dickens) — Wemmick’s Castle & Newgate Bureaucracy',
    exams: bacSec3U4Exams
  },
  {
    id: 5,
    title: 'Cognitive Neuro-Ethics & Synthetic Mind Governance',
    titleAr: 'أخلاقيات العلوم العصبية وحوكمة العقول الاصطناعية',
    theme: 'Artificial General Intelligence (AGI), Synthetic Sentience, Cognitive Liberty & Algorithmic Liability',
    grammarFocus: 'Elliptical Structures & Parallelism in Academic Dissertations',
    novelChapter: 'Victorian Social Hierarchy: Great Expectations (Dickens) — The Perilous Thames Escape & Magwitch’s Ordeal',
    exams: bacSec3U5Exams
  },
  {
    id: 6,
    title: 'Senior Capstone Dissertation Defense & Viva Simulation',
    titleAr: 'الدفاع عن أطروحة التخرج والمحاكاة الأكاديمية الشاملة',
    theme: 'Empirical Dissertation Defense, Scholarly Viva Voce, Academic Metadiscourse & Epistemic Humility',
    grammarFocus: 'Absolute Participial Constructions & Discursive Metadiscourse (The data having been audited)',
    novelChapter: 'Victorian Social Hierarchy: Great Expectations (Dickens) — The Forge Reconciled & True Moral Nobility',
    exams: bacSec3U6Exams
  }
];
