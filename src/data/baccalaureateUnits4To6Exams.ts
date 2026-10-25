import { generateBaccalaureate5LevelExams } from './baccalaureateUnitExamsGenerator.ts';

// =================================================================================================
// GRADE 10 (SECONDARY 1) - UNITS 4, 5, 6 EXAMS
// =================================================================================================

export const bacSec1U4Exams = generateBaccalaureate5LevelExams({
  grade: 10,
  unitId: 4,
  unitTitle: 'Renewable Agritech & Desert Reclamation',
  unitTitleAr: 'الزراعة التكنولوجية المتقدمة واستصلاح الأراضي الصحراوية',
  theme: 'Closed-Loop Hydroponics, Subterranean Aquifer Monitoring & Arid Biosphere Engineering',
  grammarRule: 'Complex Relative Clauses & Reduced Participle Clauses',
  novelReference: 'The Old Man and the Sea (Hemingway) — Chapter 4: The 48-Hour Struggle on the High Seas',
  novelReferenceAr: 'رواية العجوز والبحر — الفصل الرابع: صراع الثمانية والأربعين ساعة في عرض البحر وضريبة الصبر',
  sampleQuestions: {
    l1: {
      q: 'The solar desalination facility, __________ by the Ministry of Water Resources, irrigates 50,000 feddans in Toshka.',
      opts: ['commissioned', 'commissioning', 'commissions', 'was commissioned'],
      ans: [0],
      exp: 'Reduced relative participle clause: [which was] commissioned by...'
    },
    l2: {
      q: 'Subsurface telemetry sensors, __________ monitor aquifer salinity in real time, prevent root rot in precision orchards.',
      opts: ['which', 'whom', 'where', 'whose'],
      ans: [0],
      exp: 'Non-defining relative clause referring to things (sensors) requires "which".'
    },
    l3: {
      q: 'The agricultural term "closed-loop hydroponics" describes a farming method where water and nutrients are __________.',
      opts: ['recycled and continuously recirculated with minimal evaporation', 'pumped directly into open desert ditches', 'evaporated into steam for electricity', 'mixed with raw unrefined crude petroleum'],
      ans: [0],
      exp: 'Closed-loop hydroponics recycles 95% of water by recirculating nutrient solutions.'
    },
    l4: {
      q: 'Having __________ drought-tolerant date palm saplings, the agronomists recorded zero seedling mortality during the summer heatwave.',
      opts: ['propagated', 'propagating', 'propagate', 'to propagate'],
      ans: [0],
      exp: 'Perfect participle clause indicating prior completed action: Having + past participle.'
    },
    l5: {
      q: 'Which sentence best exemplifies academic nominalisation in desert reclamation discourse?',
      opts: [
        'The deployment of autonomous drip irrigation infrastructure minimizes hydrological depletion across hyper-arid provinces.',
        'Because farmers put in pipes that drip water alone, water does not get wasted in dry lands.',
        'When pipes drip water by themselves, people save water in the big desert.',
        'Water saving happens when automated dripping is done by nice farmers.'
      ],
      ans: [0],
      exp: 'Elevated academic syntax using deployment, infrastructure, hydrological depletion.'
    }
  },
  readingPassage: {
    title: 'Transforming Arid Topographies: Egypt’s Megaproject in Toshka and New Delta',
    text: 'Faced with rapid demographic expansion and finite Nile allocations, Egypt has inaugurated ambitious land reclamation megaprojects across Toshka and the New Delta. By harnessing subsurface aquifers monitored via real-time satellite telemetry, agronomists cultivate strategic cereal grains and drought-tolerant olive cultivars in previously barren landscapes. Closed-loop aeroponic and hydroponic greenhouses slash water consumption by up to 90% compared to traditional furrow flood techniques. Furthermore, biosaline research laboratories analyze halophytic flora capable of thriving in brackish water, turning saline wasteland into fertile economic engines.',
    q: 'How does modern precision agriculture in Toshka optimize finite water allocations?',
    opts: [
      'By deploying closed-loop recirculating systems and telemetry-monitored drip irrigation',
      'By diverting the entire Mediterranean Sea into desert trenches',
      'By eliminating all crop fertilization and pesticide inspection protocols',
      'By relying exclusively on seasonal desert rain showers'
    ],
    ans: [0],
    exp: 'Closed-loop systems and telemetry-driven drip methods maximize hydrological efficiency.'
  },
  translationPair: {
    enToAr: {
      src: 'Precision agritech and satellite telemetry are transforming Egypt’s arid deserts into sustainable breadbaskets.',
      opts: [
        'تُحول التكنولوجيا الزراعية الدقيقة والاستشعار بالأقمار الصناعية صحارى مصر القاحلة إلى سلال غذاء مستدامة.',
        'يجب وقف استصلاح الصحراء لأن تكاليف الطاقة الشمسية مرتفعة للغاية.',
        'تعتمد الزراعة في الدلتا فقط على مياه الأمطار الشتوية بدون استخدام أي آلات.',
        'الصحراء المصرية غير قابلة للاستصلاح الزراعي بسبب ندرة المياه العذبة.'
      ],
      ans: 0,
      exp: 'Option A provides the precise, fluent translation of the academic statement.'
    },
    arToEn: {
      src: 'تسهم مشروعات الدلتا الجديدة وتوشكى في تحقيق الأمن الغذائي وتقليل الاعتماد على استيراد الحبوب الاستراتيجية.',
      opts: [
        'The New Delta and Toshka megaprojects contribute to achieving food security and curbing reliance on strategic grain imports.',
        'Toshka is an industrial zone dedicated solely to automotive assembly lines.',
        'Importing grains is always more economical than domestic agricultural production.',
        'Food security cannot be strengthened by reclaiming arid desert soils.'
      ],
      ans: 0,
      exp: 'Option A accurately conveys the macroeconomic agricultural terminology.'
    }
  },
  literatureTask: {
    chapterOrAct: 4,
    q: '“‘Fish,’ he said softly, aloud, ‘I’ll stay with you until I am dead.’ How does Santiago’s vow embody Hemingway’s ethos of dignified persistence and fraternal combat with nature?',
    qAr: '«أيها السمكة»، قال بصوت خافت مسموع، «سأبقى معك حتى ألفظ أنفاسي الأخيرة». كيف يجسد نذر سانتياغو فلسفة همنجواي في الصمود النبيل والنزال الأخوي مع قوى الطبيعة؟',
    modelAnswer: 'Santiago’s declaration elevates his grueling duel with the marlin beyond mere commercial predation into a sacred metaphysical covenant. Despite lacerated palms, agonizing cramps, and extreme dehydration after forty-eight hours on the open sea, Santiago refuses to surrender. Crucially, he addresses the giant fish not as an adversary to be hated, but as a noble brother of equal dignity. Hemingway demonstrates that true heroism lies not in painless victory, but in endurance, reverence for nature, and absolute steadfastness in the face of suffering.',
    criteria: [
      'Identification of the duel as a sacred, fraternal covenant rather than greedy predation',
      'Detailing Santiago’s physical trauma (bleeding hands, exhaustion) and spiritual resolve',
      'Hemingway’s core thematic code: man can be destroyed by physical agony, but not defeated in spirit'
    ]
  },
  essayTask: {
    title: 'Precision Agriculture & Arid Food Sovereignty',
    prompt: 'Write an analytical essay (200 words) evaluating the role of closed-loop agritech in securing national food sovereignty in hyper-arid regions.',
    outline: [
      'Hook: Global water scarcity and the imperative for desert food production.',
      'Thesis: Implementing closed-loop agritech and subsurface telemetry allows hyper-arid nations to secure strategic food sovereignty without depleting non-renewable aquifers.',
      'Body 1: The thermodynamic and water-saving efficiencies of hydroponics and aeroponics.',
      'Body 2: The integration of renewable solar energy with biosaline crop engineering.',
      'Conclusion: Food sovereignty as national security anchored in empirical agricultural innovation.'
    ],
    model: 'In an era dominated by transboundary water friction and accelerating climate volatility, arid and hyper-arid nations face a foundational imperative: establishing agricultural sovereignty without exhausting non-renewable aquifers. Egypt’s strategic expansion across the Western Desert and Toshka exemplifies this paradigm shift. By substituting wasteful flood irrigation with autonomous, sensor-calibrated drip infrastructure, agronomists conserve up to ninety percent of freshwater allocations. Furthermore, closed-loop hydroponic and vertical aeroponic installations isolate crops from brutal surface evapotranspiration, recycling mineral nutrients within hermetically controlled microclimates. Crucially, this technological transformation is powered by abundant solar irradiation, aligning agricultural expansion with decarbonization goals. When combined with biosaline genetics—engineering barley and halophytic forage capable of flourishing in brackish groundwater—precision agriculture demystifies the desert. What was historically perceived as an inhospitable wasteland becomes an empirical frontier of resilient productivity. Ultimately, investing in precision agritech is not merely an agronomic choice; it is an indispensable pillar of geopolitical autonomy, ensuring that the nation feeds its citizens through scientific ingenuity rather than vulnerable external import supply chains.'
  }
});

export const bacSec1U5Exams = generateBaccalaureate5LevelExams({
  grade: 10,
  unitId: 5,
  unitTitle: 'Suez Maritime Logistics & Global Trade Corridors',
  unitTitleAr: 'اللوجستيات الملاحية وقناة السويس وممرات التجارة العالمية',
  theme: 'Containerization, Chokepoint Geopolitics, Green Port Decarbonization & Multimodal Transit',
  grammarRule: 'Advanced Passive Register & Impersonal Constructions (It is asserted that...)',
  novelReference: 'The Old Man and the Sea (Hemingway) — Chapter 5: The Subjugation of the Great Marlin',
  novelReferenceAr: 'رواية العجوز والبحر — الفصل الخامس: ترويض السمكة العملاقة وانتصار العزيمة الإنسانية الصافية',
  sampleQuestions: {
    l1: {
      q: 'It is __________ that over twelve percent of global seaborne commerce traverses the Suez Canal annually.',
      opts: ['estimated', 'estimating', 'estimate', 'estimates'],
      ans: [0],
      exp: 'Impersonal passive construction: It is + past participle (estimated) + that-clause.'
    },
    l2: {
      q: 'The ultra-large container vessel was safely __________ through the navigational convoy by veteran Egyptian pilots.',
      opts: ['maneuvered', 'maneuver', 'maneuvering', 'had maneuver'],
      ans: [0],
      exp: 'Passive voice: was + past participle (maneuvered).'
    },
    l3: {
      q: 'A geopolitical "chokepoint" in maritime transportation refers to a __________.',
      opts: ['narrow, strategic waterway vital for international trade that could be blocked', 'shallow harbor where only leisure yachts are permitted', 'dry desert highway connecting tourist hotels', 'dock reserved exclusively for military parade vessels'],
      ans: [0],
      exp: 'Strategic maritime chokepoints are narrow passages critical for global trade flows.'
    },
    l4: {
      q: 'Decarbonization incentives __________ implemented across all terminals in East Port Said by next fiscal quarter.',
      opts: ['will have been', 'will be being', 'were having been', 'have had'],
      ans: [0],
      exp: 'Future perfect passive: will have been + past participle.'
    },
    l5: {
      q: 'Select the sentence demonstrating the most authoritative academic passive register:',
      opts: [
        'It is widely acknowledged that multimodal logistics corridors enhance transcontinental supply-chain resilience.',
        'People say that moving containers across trains and ships helps business a lot.',
        'Everyone thinks ports are good when trains carry boxes quickly to boats.',
        'Logistics is said by folks to be great for shipping things worldwide.'
      ],
      ans: [0],
      exp: 'Elevated academic syntax using impersonal passive "It is widely acknowledged that...".'
    }
  },
  readingPassage: {
    title: 'The Suez Maritime Nexus: Gateway of Global Logistics and Green Bunkering',
    text: 'Connecting the Mediterranean and the Red Sea, the Suez Canal remains the preeminent artery of Eurasian commercial exchange. The completion of the dual-lane expansion drastically reduced vessel transit times from twenty-two hours to eleven, doubling maritime throughput capacity. In response to global decarbonization mandates issued by the International Maritime Organization (IMO), the Suez Canal Economic Zone (SCZONE) has transformed Port Said and Ain Sokhna into premier green bunkering hubs. By establishing green hydrogen and green ammonia synthesis plants, Egypt provides zero-emission propulsion fuels for the next generation of mega-container vessels, cementing its status as an indispensable global maritime nexus.',
    q: 'How is the SCZONE adapting to international maritime environmental regulations?',
    opts: [
      'By establishing green hydrogen and ammonia bunkering facilities for zero-emission ship propulsion',
      'By prohibiting foreign merchant ships from using the canal corridor',
      'By reverting entirely to coal-powered tugboats and wooden docks',
      'By closing the dual-lane expansion to commercial container traffic'
    ],
    ans: [0],
    exp: 'SCZONE develops green hydrogen and ammonia bunkering hubs to meet zero-emission targets.'
  },
  translationPair: {
    enToAr: {
      src: 'The Suez Canal corridor provides indispensable logistical efficiency for global supply chains.',
      opts: [
        'يوفر ممر قناة السويس كفاءة لوجستية لا غنى عنها لسلاسل الإمداد العالمية.',
        'تعتمد الملاحة العالمية على الطرق الالتفافية الطويلة حول إفريقيا بشكل دائم.',
        'قناة السويس مخصصة فقط لسفن الصيد السياحية الصغيرة في خليج السويس.',
        'سلاسل الإمداد الدولية لا تتأثر بسرعة مرور البضائع عبر الممرات الملاحية.'
      ],
      ans: 0,
      exp: 'Option A provides the precise formal terminology for maritime logistics.'
    },
    arToEn: {
      src: 'تسعى مصر لتحويل المنطقة الاقتصادية لقناة السويس إلى مركز عالمي لتموين السفن بالوقود الأخضر.',
      opts: [
        'Egypt seeks to transform the Suez Canal Economic Zone into a global hub for green maritime bunkering.',
        'Port Said is closing its maritime terminals to international container traffic.',
        'Green ammonia cannot be utilized as fuel for modern ocean vessels.',
        'The Suez Canal handles only domestic passenger ferries between Mediterranean ports.'
      ],
      ans: 0,
      exp: 'Option A precisely renders green maritime bunkering terminology.'
    }
  },
  literatureTask: {
    chapterOrAct: 5,
    q: '“Then the fish came alive, with his death in him, and rose high out of the water showing all his great length and width and all his power and his beauty.” How does Hemingway depict the marlin’s death as a moment of sublime tragic beauty rather than brutal slaughter?',
    qAr: '«ثم انتفضت السمكة بحياةٍ أخيرة تحوي موتها، وارتفعت عالياً فوق الماء مظهرةً طولها المهيب وعرضها، وكل ما تملك من قوةٍ وجلال». كيف يصور همنجواي مصرع السمكة كذروة تراجيدية مهيبة بدلاً من كونها مجرد قتل دموي؟',
    modelAnswer: 'Hemingway depicts the marlin’s death leap as an apotheosis of natural majesty. Rather than diminishing the magnificent creature in defeat, the text portrays the marlin at the zenith of its strength and beauty even as Santiago’s harpoon pierces its heart. Santiago weeps not out of remorse, but out of profound veneration for an opponent that fought with sublime courage. The tragedy lies in the existential condition: man must kill that which he loves and reveres in order to survive, validating both combatants in an elemental hierarchy of mutual nobility.',
    criteria: [
      'Vivid depiction of the marlin’s final leap as an apotheosis of strength and beauty',
      'Santiago’s emotional reverence and heartbreak at destroying a creature he loves as a brother',
      'Hemingway’s tragic philosophy: nobility is shared equally between hunter and quarry'
    ]
  },
  essayTask: {
    title: 'Maritime Chokepoints & Geopolitical Stability',
    prompt: 'Write an analytical essay (200 words) assessing the strategic significance of the Suez Canal in maintaining global supply-chain equilibrium.',
    outline: [
      'Hook: The fragile interconnectedness of modern maritime supply networks.',
      'Thesis: The Suez Canal functions not merely as a commercial conduit, but as a stabilizing geopolitical nexus whose continuous operation anchors global macroeconomic equilibrium.',
      'Body 1: The logistical superiority of the canal over circumnavigation via the Cape of Good Hope.',
      'Body 2: The modernization of infrastructure, green bunkering, and security architecture.',
      'Conclusion: Multilateral cooperation in safeguarding open maritime corridors for shared global prosperity.'
    ],
    model: 'In an interconnected globalized economy where ninety percent of international trade travels by sea, maritime chokepoints constitute the fragile arteries of human civilization. Among these, the Suez Canal stands unparalleled in geographical and economic significance. Traversed by approximately twelve percent of total seaborne commerce and thirty percent of global container traffic, the canal slashes transit distances between Europe and Asia by thousands of nautical miles. When disruptions force vessels to reroute around the Cape of Good Hope, the macroeconomic fallout is immediate: transit durations surge by ten to fourteen days, fuel consumption escalates exponentially, and freight inflation ripples across global consumer markets. Egypt’s proactive investment in the dual-lane expansion and advanced tug assistance grids has substantially mitigated navigation hazards and expanded daily convoy capacity. Simultaneously, the pioneering transition of the Suez Canal Economic Zone into a hub for green methanol and ammonia bunkering aligns maritime transit with global net-zero climate imperatives. Safeguarding this vital corridor is therefore not solely an Egyptian responsibility, but a common interest of the international community, ensuring that the flows of humanitarian energy, food supplies, and industrial components continue uninterrupted.'
  }
});

export const bacSec1U6Exams = generateBaccalaureate5LevelExams({
  grade: 10,
  unitId: 6,
  unitTitle: 'Archaeological Digital Forensics & Monumental Stewardship',
  unitTitleAr: 'الأدلة الرقمية الأثرية وحفظ التراث الإنساني',
  theme: 'Photogrammetry, LiDAR Subsurface Tomography, Heritage Repatriation & Digital Archiving',
  grammarRule: 'Unreal Conditionals & Past Subjunctive Inversions (Had it not been for...)',
  novelReference: 'The Old Man and the Sea (Hemingway) — Chapter 6: The Scavenger Sharks & Epilogue (Dignity Undefeated)',
  novelReferenceAr: 'رواية العجوز والبحر — الفصل السادس: هجوم قروش الغدر ونهاية الملحمة (الإنسان يُفنى ولا يُهزم)',
  sampleQuestions: {
    l1: {
      q: 'Had it not been for advanced LiDAR scanning, archaeologists __________ the subterranean necropolis buried beneath the Saqqara sands.',
      opts: ['would never have detected', 'will never detect', 'have never detected', 'do never detect'],
      ans: [0],
      exp: 'Inverted third conditional: Had it not been for [noun] + subject + would have + past participle.'
    },
    l2: {
      q: 'Were conservators __________ uncalibrated chemical polymers on fragile limestone bas-reliefs, irreversible surface degradation would occur.',
      opts: ['to apply', 'applied', 'applying', 'had applied'],
      ans: [0],
      exp: 'Inverted second conditional: Were + subject + to + base verb.'
    },
    l3: {
      q: 'The archaeological technique of "photogrammetry" enables researchers to __________.',
      opts: [
        'construct hyper-accurate three-dimensional digital replicas from overlapping photographic data',
        'melt ancient gold artifacts into modern currency ingots',
        'burn papyrus scrolls to carbon-date the ashes immediately',
        'excavate stone monuments using commercial demolition explosives'
      ],
      ans: [0],
      exp: 'Photogrammetry stitches photographic datasets into precise 3D volumetric models.'
    },
    l4: {
      q: 'If the international museum __________ the illicitly trafficked artifact sooner, diplomatic friction would have been avoided.',
      opts: ['had repatriated', 'has repatriated', 'repatriates', 'would repatriate'],
      ans: [0],
      exp: 'Third conditional if-clause: had + past participle (repatriated).'
    },
    l5: {
      q: 'Which term denotes the ethical return of cultural property and stolen antiquities to their country of origin?',
      opts: ['Repatriation', 'Confiscation', 'Expropriation', 'Dispossession'],
      ans: [0],
      exp: 'Repatriation is the lawful and ethical return of cultural heritage to its rightful sovereign homeland.'
    }
  },
  readingPassage: {
    title: 'Digital Resurfacing: How LiDAR and Non-Invasive Forensics Protect Ancient Egypt',
    text: 'For centuries, archaeological excavation relied upon invasive pickaxes and shovels that inevitably disturbed stratigraphical contexts. Today, Egypt’s monumental landscape is being revolutionized through digital forensics. Utilizing airborne LiDAR tomography and ground-penetrating radar (GPR), conservators map buried temple complexes beneath cultivated fields without overturning a single grain of soil. Simultaneously, ultra-high-resolution photogrammetry captures millimeter-accurate volumetric models of delicate Theban tomb murals vulnerable to tourist humidity. These digital twins immortalize human cultural heritage against environmental degradation and establish unimpeachable provenance records supporting Egypt’s sovereign repatriation campaigns.',
    q: 'Why is non-invasive ground-penetrating radar superior to traditional destructive digging?',
    opts: [
      'It maps subterranean architectural stratigraphy without physically disturbing fragile historical strata',
      'It dissolves bedrock using concentrated acidic chemicals',
      'It instantly sells artifacts to international private auctions',
      'It replaces the need for any historical analysis or scholarly interpretation'
    ],
    ans: [0],
    exp: 'GPR allows complete structural visualization while leaving subterranean layers untouched.'
  },
  translationPair: {
    enToAr: {
      src: 'Non-invasive archaeological imaging preserves fragile antiquities for future scholarly generations.',
      opts: [
        'يحافظ التصوير الأثري غير التدميري على الآثار الهشة من أجل أجيال الباحثين القادمة.',
        'يجب بيع الآثار القديمة للمتاحف الخاصة لتمويل مشروعات الطرق الحديثة.',
        'الحفائر الأثرية التقليدية بالمجارف هي الطريقة الوحيدة لدراسة الحضارات القديمة.',
        'القطع الأثرية الفرعونية لا تتأثر بعوامل الرطوبة أو التغيرات المناخية.'
      ],
      ans: 0,
      exp: 'Option A translates the archaeological imaging concept with accurate academic terminology.'
    },
    arToEn: {
      src: 'تواصل مصر جهودها الدبلوماسية والقانونية لاسترداد الآثار المهربة وحماية هويتها التاريخية.',
      opts: [
        'Egypt continues its diplomatic and legal efforts to repatriate trafficked antiquities and protect its historical identity.',
        'Smuggled artifacts should remain in foreign auction houses indefinitely.',
        'International law prohibits sovereign nations from claiming stolen cultural heritage.',
        'Historical monuments require no legal protection under international conventions.'
      ],
      ans: 0,
      exp: 'Option A provides the authoritative diplomatic and legal English translation.'
    }
  },
  literatureTask: {
    chapterOrAct: 6,
    q: '“‘A man can be destroyed but not defeated.’ How does the tragic climax—where sharks ravage the marlin leaving only a skeletal carcass—substantiate Hemingway’s ultimate definition of human triumph?',
    qAr: '«الإنسان يمكن إفناؤه، لكن لا يمكن هزيمته أبداً». كيف يجسد المشهد الختامي التراجيدي—حين تلتهم القروش السمكة ولا تترك سوى هيكلها العظمي—تعريف همنجواي الأسمى للانتصار الإنساني؟',
    modelAnswer: 'The final tragedy—in which relentless scavenger sharks consume the marlin, leaving Santiago with only an eighty-pound bare skeleton tied to his skiff—demonstrates the core maxim of the novella. While physical reality and scavengers destroy the material fruit of his triumph, Santiago’s indomitable human spirit remains completely untarnished. He sailed farther than any fisherman dared, battled with heroic valor, and endured agony without despair. When he returns to his shack and sleeps, dreaming of the lions playing on the African beach, Manolin weeps in awe of his master. Santiago is broken physically, but spiritually victorious: a titan of moral endurance whom no worldly misfortune can conquer.',
    criteria: [
      'Analysis of the distinction between material destruction (skeleton) and spiritual invincibility',
      'The scavenger sharks as metaphors for hostile existential forces that steal material gains',
      'The symbolic resonance of Santiago’s dreams of the lions: youthful vigor and eternal dignity'
    ]
  },
  essayTask: {
    title: 'Digital Preservation & Sovereign Heritage Repatriation',
    prompt: 'Write an analytical essay (200 words) evaluating the role of 3D digital forensics in defending national cultural heritage and sovereign repatriation rights.',
    outline: [
      'Hook: The vulnerability of ancient monuments to environmental decay and illicit trafficking.',
      'Thesis: High-fidelity digital archiving and non-invasive tomography empower sovereign nations to preserve their monumental heritage and establish irrefutable provenance for repatriation.',
      'Body 1: The technical precision of photogrammetry and LiDAR in creating permanent digital twins.',
      'Body 2: The legal and diplomatic power of digital documentation in combating illicit antiquities trafficking.',
      'Conclusion: Digital stewardship as an ethical bridge uniting ancestral wisdom with future generations.'
    ],
    model: 'Cultural heritage represents the collective soul and intellectual lineage of human civilization; yet across centuries, ancient monuments have endured the ravages of climate erosion, military conflicts, and imperialistic plunder. In contemporary Egypt, home to an incomparable architectural legacy, digital forensics has become the primary vanguard of preservation. Through millimeter-precise photogrammetry, multispectral imaging, and ground-penetrating radar, conservators construct inviolable "digital twins" of fragile tombs and monumental temples. These virtual archives serve a dual purpose. Scientifically, they enable structural monitoring without subjecting delicate pigment layers to abrasive physical touch or tourist microclimates. Diplomatically and legally, forensic digital scans provide unimpeachable empirical evidence of provenance and historical authenticity. When illicitly looted artifacts appear in foreign auction catalogs or overseas galleries, comprehensive digital tomography delivers the judicial certitude required by UNESCO conventions to mandate immediate, unconditional repatriation. Rather than supplanting physical stewardship, non-invasive digital technology fortifies sovereign ownership, ensuring that the immortal achievements of our ancestors are neither lost to time nor alienated from the homeland that birthed them.'
  }
});

// =================================================================================================
// GRADE 11 (SECONDARY 2) - UNITS 4, 5, 6 EXAMS
// =================================================================================================

export const bacSec2U4Exams = generateBaccalaureate5LevelExams({
  grade: 11,
  unitId: 4,
  unitTitle: 'Bio-Cybernetics & Neural Interfaces',
  unitTitleAr: 'السيبرانية الحيوية والواجهات العصبية المتقدمة',
  theme: 'Brain-Computer Interfaces, Prosthetic Neuro-Motor Rehabilitation & Transhumanist Ethics',
  grammarRule: 'Subjunctive in Formal Scientific Assertions & Mandates (insist that / be imperative)',
  novelReference: 'King Lear (Shakespeare) — Act 4: The Cliff of Dover & The Sanity of Madness',
  novelReferenceAr: 'مسرحية الملك لير — الفصل الرابع: جرف دوفر، جنون الحكمة، والعمى كبصيرة حقيقية',
  sampleQuestions: {
    l1: {
      q: 'Neuroethicists insist that every invasive neural implant __________ rigorous preclinical biocompatibility trials.',
      opts: ['undergo', 'undergoes', 'underwent', 'undergoing'],
      ans: [0],
      exp: 'Mandative subjunctive: insist that + subject + base verb form (undergo).'
    },
    l2: {
      q: 'It is imperative that cognitive telemetry data __________ strictly protected from commercial exploitation.',
      opts: ['be', 'is', 'was', 'being'],
      ans: [0],
      exp: 'Subjunctive following impersonal adjective: It is imperative that + subject + be + past participle.'
    },
    l3: {
      q: 'A "brain-computer interface" (BCI) functions primarily by __________.',
      opts: [
        'translating cortical electrophysiological signals into machine-executable algorithmic commands',
        'replacing biological brain tissue with mechanical steel gears',
        'erasing a patient’s childhood memories permanently',
        'transmitting radio music directly into the ear canal'
      ],
      ans: [0],
      exp: 'BCIs decode cortical neural spikes and map them to robotic prosthetics or computers.'
    },
    l4: {
      q: 'The bioethics commission recommended that the clinical protocol __________ suspended pending an independent audit.',
      opts: ['be', 'is', 'was', 'are'],
      ans: [0],
      exp: 'Subjunctive passive: recommended that + subject + be + past participle.'
    },
    l5: {
      q: 'Choose the sentence demonstrating the most advanced biomedical academic stance:',
      opts: [
        'The committee resolved that cognitive autonomy remain inviolable regardless of transhumanist augmentative pressures.',
        'Doctors think nobody should touch brain data even if robots become very smart.',
        'Brain chips must not be used badly because people will get upset.',
        'The committee decided to tell people that brain hacking is bad.'
      ],
      ans: [0],
      exp: 'Correct mandative subjunctive "remain inviolable" paired with elevated academic diction.'
    }
  },
  readingPassage: {
    title: 'The Neural Frontier: Decoding Electrophysiology for Motor Restoration',
    text: 'For decades, quadriplegia resulting from severe spinal cord transection represented an irreversible motor catastrophe. Today, bidirectional brain-computer interfaces (BCIs) are bridging neural lesions through bio-cybernetic telemetry. High-density microelectrode arrays implanted in the motor cortex record cortical action potentials during motor intention. Machine-learning algorithms decode these firing patterns in real time, translating human thoughts into dexterous movements of robotic prosthetic limbs. However, this neuro-technological convergence raises unprecedented ethical quandaries: cognitive liberty, mental privacy, and the imperative that human consciousness not be commodified by commercial corporations.',
    q: 'What is the principal clinical breakthrough achieved by motor-cortex BCI implants?',
    opts: [
      'Decoding cortical motor intention into algorithmic commands that control prosthetic limbs',
      'Preventing the brain from experiencing any emotional sorrow or grief',
      'Eliminating the human requirement for dietary nutrition and water intake',
      'Replacing all natural human neurons with synthetic silicon computer chips'
    ],
    ans: [0],
    exp: 'BCIs decode cortical action potentials into real-time prosthetic motor movements.'
  },
  translationPair: {
    enToAr: {
      src: 'Cognitive privacy must be enshrined as a fundamental human right in the age of neural interfaces.',
      opts: [
        'يجب ترسيخ الخصوصية العصبية كحق أساسي من حقوق الإنسان في عصر الواجهات الدماغية.',
        'الواجهات العصبية ستجعل البشر يتوقفون عن التفكير بشكل مستقل في المستقبل.',
        'يمكن لأي جهة تجارية استغلال إشارات الدماغ دون قيود قانونية أو موافقة مسبقة.',
        'أبحاث المخ والأعصاب لا تتطلب أية معايير أخلاقية أو أطر تشريعية.'
      ],
      ans: 0,
      exp: 'Option A translates the neuro-ethical proposition with precise academic terminology.'
    },
    arToEn: {
      src: 'تفتح الواجهات العصبية الحديثة آفاقاً علاجية واعدة للمصابين بالشلل الحركي الكامل.',
      opts: [
        'Modern neural interfaces unlock promising therapeutic horizons for patients afflicted with total motor paralysis.',
        'Paralysis patients can never benefit from computerized biomedical engineering.',
        'Neural implants are designed exclusively for military combat applications.',
        'Brain interfaces have no clinical utility in motor rehabilitation.'
      ],
      ans: 0,
      exp: 'Option A provides the authoritative clinical and biomedical English translation.'
    }
  },
  literatureTask: {
    chapterOrAct: 4,
    q: '“‘I have no way, and therefore want no eyes; I stumbled when I saw.’ How does Gloucester’s despair on the road to Dover illustrate the paradox that physical blindness yields spiritual perception?',
    qAr: '«لم يعد لي طريقٌ أسلكه، ولذا لا رغبة لي في عيون؛ لقد تعثرتُ حين كنتُ أرى». كيف يجسد قنوط غلوستر في طريقه إلى دوفر المفارقة التراجيدية بأن العمى الجسدي يورث بصيرة روحية حقة؟',
    modelAnswer: 'Gloucester’s tragic lament encapsulates Shakespeare’s central epistemological paradox in King Lear. When Gloucester possessed biological sight, he was morally and intellectually blind: gullible to Edmund’s forged letters, oblivious to Edgar’s devotion, and complicit in the court’s superficial vanities. Only after Cornwall brutally gouges out his physical eyes does Gloucester perceive the metaphysical truth of human nature and cosmic injustice. Physical deprivation shatters his hubris, granting him ethical vision. Like the mad Lear crowned with weeds, the blinded Gloucester learns that worldly sight frequently deceives, whereas suffering strips away delusion to reveal sacred compassion.',
    criteria: [
      'Analysis of Gloucester’s previous literal sight vs moral blindness regarding Edmund and Edgar',
      'The symbolic resonance of his physical blinding as the catalyst for genuine ethical enlightenment',
      'Parallelism between Lear’s madness leading to sanity and Gloucester’s blindness leading to insight'
    ]
  },
  essayTask: {
    title: 'Neuro-Ethics & The Sanctity of Mental Privacy',
    prompt: 'Write an analytical essay (200 words) assessing why cognitive liberty and neural privacy must be codified as inviolable human rights.',
    outline: [
      'Hook: The rapid emergence of direct neural reading technologies.',
      'Thesis: As brain-computer interfaces decode thought patterns, the international legal framework must urgently codify cognitive privacy to protect human autonomy from predatory surveillance.',
      'Body 1: The dual-use nature of BCIs (clinical miracle vs dystopian corporate surveillance).',
      'Body 2: The necessity of prohibiting unauthorized cognitive telemetry harvesting.',
      'Conclusion: Preserving human individuality as the ultimate frontier of liberty.'
    ],
    model: 'Throughout history, the human mind remained an unbreachable sanctuary; one could be coerced, imprisoned, or silenced, yet internal thoughts remained sovereign and inviolable. The advent of high-resolution brain-computer interfaces (BCIs) has radically dissolved this biological boundary. While these biomedical marvels offer life-changing mobility to individuals with quadriplegia and neurodegenerative trauma, they simultaneously unlock the capacity to decode neural correlates of memory, intention, and subconscious preference. Without strict statutory boundaries, this cognitive telemetry becomes vulnerable to corporate commercialization and state surveillance. If corporations or governments obtain unmediated access to electrophysiological data, the fundamental tenets of free will, democratic dissent, and individual agency are profoundly imperiled. Therefore, international legal bodies must urgently codify "neurorights" into universal human rights covenants. It is imperative that every individual retain absolute ownership over their cognitive data, that neural decryption require explicit informed consent, and that mental manipulation be recognized as a crime against human dignity. Protecting the sanctuary of the mind is the definitive civil liberties challenge of our century.'
  }
});

export const bacSec2U5Exams = generateBaccalaureate5LevelExams({
  grade: 11,
  unitId: 5,
  unitTitle: 'Orbital Governance & Extraterrestrial Jurisprudence',
  unitTitleAr: 'الحوكمة المدارية وقانون الفضاء الخارجي',
  theme: 'Kessler Syndrome, Orbital Debris Mitigation, Lunar Mining Rights & Supranational Space Treaties',
  grammarRule: 'Double Comparative Structures & Proportionate Discourse (The more... the more...)',
  novelReference: 'King Lear (Shakespeare) — Act 5, Scene 1-2: The Trial by Combat & Moral Reckoning',
  novelReferenceAr: 'مسرحية الملك لير — الفصل الخامس (المشاهد 1-2): المحاكمة بالمنازلة، الحساب الأخلاقي، وسقوط الخيانة',
  sampleQuestions: {
    l1: {
      q: 'The more congested Low Earth Orbit becomes with decommissioned satellite debris, __________ the probability of catastrophic orbital collisions.',
      opts: ['the greater', 'greater is', 'the greatest', 'more great'],
      ans: [0],
      exp: 'Proportionate double comparative: The more [clause], the greater [noun phrase].'
    },
    l2: {
      q: 'The more sovereign space agencies collaborate on debris tracking, __________ vulnerable orbital communication satellites become.',
      opts: ['the less', 'less is', 'the least', 'more lesser'],
      ans: [0],
      exp: 'Double comparative: The more [clause], the less [clause].'
    },
    l3: {
      q: 'The 1967 Outer Space Treaty affirms that celestial bodies are the common heritage of mankind and cannot be subjected to __________.',
      opts: ['national appropriation through claims of sovereignty', 'peaceful scientific observation', 'international cooperative missions', 'astronomical photography'],
      ans: [0],
      exp: 'The Outer Space Treaty explicitly prohibits national appropriation of celestial territory.'
    },
    l4: {
      q: 'What catastrophic scenario describes a runaway cascade of orbital collisions creating an impassable cloud of space shrapnel?',
      opts: ['Kessler Syndrome', 'Doppler Effect', 'Coriolis Deviation', 'Bernoulli Principle'],
      ans: [0],
      exp: 'Donald Kessler modeled how colliding orbital debris multiplies exponentially, endangering future spaceflight.'
    },
    l5: {
      q: 'Choose the sentence exhibiting the most rigorous grammatical balance in proportionate discourse:',
      opts: [
        'The more rigorous the international regulatory framework governing orbital launches, the more resilient global telecommunication constellations will remain.',
        'If we make more rules for satellites, then satellites will be more better and safe.',
        'The more we launch rockets, satellites become more dangerous without laws.',
        'More rockets launching makes space dirty and very bad for everyone.'
      ],
      ans: [0],
      exp: 'Perfect balanced double comparative: The more rigorous [subject], the more resilient [subject + verb].'
    }
  },
  readingPassage: {
    title: 'The Crowded Void: Navigating the Geopolitics of Low Earth Orbit',
    text: 'Low Earth Orbit (LEO) is undergoing an unprecedented commercial boom. With tens of thousands of mega-constellation satellites launched for broadband telecommunications, orbital space is transitioning from an empty frontier into a dangerously congested highway. NASA astrophysicist Donald Kessler warned that orbital density could trigger a runaway cascade: a single hypervelocity collision generates thousands of hyper-speed fragments, each capable of smashing other satellites in an apocalyptic chain reaction known as the Kessler Syndrome. Current international space treaties, drafted during the Cold War era of state-dominated spaceflight, lack binding mechanisms for active debris de-orbiting and celestial resource governance. Modern extraterrestrial jurisprudence must establish enforceable orbital zoning, mandatory end-of-life disposal protocols, and equitable resource stewardship for all humanity.',
    q: 'Why are Cold War space conventions inadequate for modern orbital reality?',
    opts: [
      'They were designed exclusively for state actors and lack binding rules for commercial mega-constellations and debris de-orbiting',
      'They prohibited human beings from ever looking at the Moon through telescopes',
      'They forced all satellites to be constructed entirely from lead and heavy iron',
      'They declared outer space to be private commercial real estate owned by single corporations'
    ],
    ans: [0],
    exp: 'Cold War treaties did not foresee private commercial mega-constellations or orbital debris congestion.'
  },
  translationPair: {
    enToAr: {
      src: 'Outer space must be protected as a global commons for the peaceful benefit of all humanity.',
      opts: [
        'يجب حماية الفضاء الخارجي كإرث عالمي مشترك من أجل المنفعة السلمية للبشرية جمعاء.',
        'يحق للدول الغنية احتكار الموارد التعدينية على سطح القمر والكواكب دون رقابة.',
        'حطام الأقمار الصناعية لا يشكل أي خطر على رواد الفضاء أو محطة الفضاء الدولية.',
        'قانون الفضاء الدولي يسمح بنشر الأسلحة النووية في المدارات الأرضية المنخفضة.'
      ],
      ans: 0,
      exp: 'Option A provides the faithful diplomatic translation regarding space as a global commons.'
    },
    arToEn: {
      src: 'تتطلب متلازمة كيسلر وضع بروتوكولات دولية صارمة لإزالة الحطام الفضائي ومنع تصادم الأقمار الصناعية.',
      opts: [
        'The Kessler syndrome necessitates strict international protocols for active debris removal and collision avoidance.',
        'Orbital debris creates no technical challenges for modern satellite telecommunications.',
        'Commercial mega-constellations are exempt from all international aviation safety treaties.',
        'Space exploration should be discontinued due to orbital collision risks.'
      ],
      ans: 0,
      exp: 'Option A renders the space debris terminology with rigorous academic accuracy.'
    }
  },
  literatureTask: {
    chapterOrAct: 5,
    q: '“‘The wheel is come full circle; I am here.’ How does Edmund’s dying acknowledgement in Act 5 mark the inexorable triumph of cosmic justice over Machiavellian cynicism?',
    qAr: '«لقد دارت العجلة دورتها الكاملة؛ وها أنا ذا هنا صريعاً». كيف يمثل اعتراف إدموند الأخير في الفصل الخامس الانتصار الحتمي للعدالة الكونية على الانتهازية الميكيافيلية؟',
    modelAnswer: 'Edmund’s dying statement represents the metaphysical climax of King Lear’s moral universe. Throughout the drama, Edmund championed ruthless Machiavellian individualism, mocking the gods, legitimacy, and filial duty as hypocritical fictions of weak men. He betrayed his father Gloucester and orchestrated his brother Edgar’s banishment to seize the earldom. Yet when the disguised Edgar strikes him down in lawful single combat, Edmund recognizes that the moral cosmos possesses an inescapable restorative order. The "wheel of fortune" has returned to its starting point: the bastard who rose through deception lies fatally wounded by the legitimate brother he wronged. In his final gasps, Edmund even attempts a redemptive gesture—trying to rescind his death warrant against Lear and Cordelia—proving that even the most cynical villain ultimately bows to moral reckoning.',
    criteria: [
      'Analysis of Edmund’s previous Machiavellian cynicism and rejection of divine moral order',
      'The metaphor of the wheel coming "full circle": poetic retribution delivered by Edgar',
      'Edmund’s eleventh-hour impulse toward redemption as proof of the supremacy of conscience'
    ]
  },
  essayTask: {
    title: 'Orbital Congestion & Extraterrestrial Jurisprudence',
    prompt: 'Write an analytical essay (200 words) evaluating the urgency of establishing binding supranational governance to avert the Kessler Syndrome in Low Earth Orbit.',
    outline: [
      'Hook: The rapid saturation of Low Earth Orbit by commercial mega-constellations.',
      'Thesis: To prevent an irreversible cascade of orbital collisions, the international community must formulate an enforceable treaty mandating active debris removal and commercial accountability.',
      'Body 1: The physics and apocalyptic implications of the Kessler Syndrome.',
      'Body 2: The deficiencies of the 1967 Outer Space Treaty in regulating private enterprise.',
      'Conclusion: Orbital stewardship as a prerequisite for the future of human space exploration.'
    ],
    model: 'For over six decades following the launch of Sputnik, humanity regarded outer space as an infinite, inexhaustible vacuum. Today, the precipitous reduction in launch costs has precipitated a radical transformation: Low Earth Orbit (LEO) is crowded with thousands of commercial telecommunication satellites. This unprecedented saturation brings humanity perilously close to the catastrophic threshold described by astrophysicist Donald Kessler. In a Kessler Syndrome scenario, a single collision between two orbital bodies produces tens of thousands of hypervelocity fragments. Each fragment travels at speeds exceeding seven kilometers per second—possessing enough kinetic energy to shatter any satellite it strikes. This triggers an exponential chain reaction of destruction that could render orbital altitudes completely impassable, crippling planetary GPS navigation, meteorological forecasting, and disaster management systems for generations. The existing legal framework, principally the 1967 Outer Space Treaty, was negotiated when orbital access was restricted to sovereign superpowers. It contains no binding mandates requiring commercial satellite operators to incorporate automated de-orbiting propulsion or contribute to supranational salvage funds. Enacting binding international jurisprudence—enforcing orbital slot allocations, active debris capture protocols, and orbital environmental taxes—is therefore an urgent planetary imperative. Without proactive governance, our gateway to the stars will become a self-imposed prison of orbital shrapnel.'
  }
});

export const bacSec2U6Exams = generateBaccalaureate5LevelExams({
  grade: 11,
  unitId: 6,
  unitTitle: 'Comparative Rhetoric & Critical Discourse Analysis',
  unitTitleAr: 'البلاغة المقارنة والتحليل النقدي للخطاب',
  theme: 'Ideological Framing, Discursive Hegemony, Fallacy Deconstruction & Cross-Cultural Argumentation',
  grammarRule: 'Inversion with Negative Correlatives (Scarcely... when / No sooner... than)',
  novelReference: 'King Lear (Shakespeare) — Act 5, Scene 3: The Pieta & Cosmic Catharsis',
  novelReferenceAr: 'مسرحية الملك لير — الفصل الخامس (المشهد 3): صرخة لير الأخيرة، موت كورديليا، والتطهير التراجيدي المهيب',
  sampleQuestions: {
    l1: {
      q: 'No sooner __________ the political orator concluded his address than critical analysts exposed his deliberate use of false dichotomies.',
      opts: ['had', 'did', 'was', 'has'],
      ans: [0],
      exp: 'Inversion with "No sooner": No sooner + had + subject + past participle... than.'
    },
    l2: {
      q: 'Scarcely had the editorial board published the controversial essay __________ readers detected subtle ideological framing in the lexis.',
      opts: ['when', 'than', 'then', 'that'],
      ans: [0],
      exp: 'Correlative pairing: Scarcely had [clause] + when [clause].'
    },
    l3: {
      q: 'In Critical Discourse Analysis (CDA), the concept of "discursive hegemony" refers to __________.',
      opts: [
        'how dominant social groups use language and media to make their worldview seem natural and unquestionable',
        'the technical grammar rules used to conjugate irregular French verbs',
        'the physical acoustics of sound waves in an opera amphitheater',
        'the speed at which someone reads words in a foreign language dictionary'
      ],
      ans: [0],
      exp: 'Discursive hegemony describes linguistic power structures normalizing ideological dominance.'
    },
    l4: {
      q: 'Which logical fallacy involves distorting or exaggerating an opponent’s argument to make it easier to attack?',
      opts: ['Straw Man Fallacy', 'Ad Hominem', 'Post Hoc Ergo Propter Hoc', 'Appeal to Ignorance'],
      ans: [0],
      exp: 'The Straw Man fallacy reframes an opponent’s stance in an absurd or radicalized caricature.'
    },
    l5: {
      q: 'Select the sentence demonstrating the most sophisticated syntax and analytical register:',
      opts: [
        'Hardly had the spokesperson uttered the assertion when independent fact-checkers demonstrated its empirical falsity.',
        'The speaker talked and right away everyone knew he told bad lies.',
        'No sooner the speaker said words when the news showed it was wrong.',
        'Scarcely the spokesperson finished his speaking than people showed he was incorrect.'
      ],
      ans: [0],
      exp: 'Correct inversion: "Hardly had the spokesperson uttered... when..." paired with scholarly vocabulary.'
    }
  },
  readingPassage: {
    title: 'Deconstructing Power: The Methodology of Critical Discourse Analysis',
    text: 'Language is never a neutral conduit of objective reality; it is a battleground of power, ideology, and social representation. Pioneered by scholars like Norman Fairclough and Teun van Dijk, Critical Discourse Analysis (CDA) interrogates how institutional elites deploy lexical choices, passive syntax, and selective metaphors to legitimize asymmetrical authority. For instance, substituting active verbs with passive nominalisations—such as transforming "the company fired 500 workers" into "workforce rationalization occurred"—obscures human agency and manufactures artificial consensus. By deconstructing the implicit premises embedded within political rhetoric, advertising, and corporate press releases, CDA equips citizens with intellectual immunity against ideological manipulation.',
    q: 'How does syntactic nominalisation serve an ideological function according to CDA?',
    opts: [
      'It obscures agency and accountability by converting human actions into abstract, impersonal phenomena',
      'It simplifies language so that children can read corporate documents easily',
      'It forces sentences to follow rhyming poetic meters like iambic pentameter',
      'It translates foreign vocabulary into standard mathematical equations'
    ],
    ans: [0],
    exp: 'Nominalisation removes active human subjects, masking responsibility behind abstract nouns.'
  },
  translationPair: {
    enToAr: {
      src: 'Critical discourse analysis enables citizens to decode implicit ideological biases within public rhetoric.',
      opts: [
        'يُمكّن التحليل النقدي للخطاب المواطنين من تفكيك الانحيازات الأيديولوجية الضمنية داخل الخطاب العام.',
        'البلاغة اللغوية تهدف فقط إلى تزيين الكلام الشعري دون التأثير على آراء الجماهير.',
        'الإعلام الجماهيري يقدم الحقائق دائماً بحيادية تامة ومطلقة بدون أي تأطير فكري.',
        'لا توجد علاقة بين اللغة المستخدمة وموازين القوى السياسية في المجتمعات الحديثة.'
      ],
      ans: 0,
      exp: 'Option A translates the core thesis of critical discourse analysis with high academic fidelity.'
    },
    arToEn: {
      src: 'تستخدم بعض المؤسسات التراكيب الاسمية والأساليب المبنية للمجهول لطمس المسؤولية الأخلاقية عن قراراتها.',
      opts: [
        'Certain institutions deploy nominalisations and passive structures to obscure moral responsibility for their decisions.',
        'Institutions always prefer simple active sentences to communicate transparently with citizens.',
        'Grammar rules have no bearing on how corporate accountability is perceived by the public.',
        'Passive verbs are utilized solely to make texts easier for automated translation engines.'
      ],
      ans: 0,
      exp: 'Option A accurately expresses the discursive manipulation terminology.'
    }
  },
  literatureTask: {
    chapterOrAct: 6,
    q: '“‘Howl, howl, howl, howl! O, you are men of stones: Had I your tongues and eyes, I’d use them so that heaven’s vault should crack.’ How does Lear’s final entrance bearing the dead Cordelia produce Shakespeare’s ultimate tragic catharsis?',
    qAr: '«عولوا، عولوا، عولوا! أوه، إنكم رجال من صخور: لو كنتُ أملك ألسنتكم وعيونكم، لاستعملتها حتى تتصدع قبة السماء!». كيف ينتج مشهد دخول لير الأخير حاملاً جثمان كورديليا ذروة التطهير التراجيدي الأسمى عند شكسبير؟',
    modelAnswer: 'Lear’s entrance carrying the lifeless body of his only faithful daughter Cordelia represents the devastating zenith of Shakespearean tragedy. This heart-wrenching visual echoes the sacred Pieta, but subverted into cosmic inconsolability. Lear’s visceral cries of "Howl!" shatter all regal rhetoric; stripped of kingly garments and delusions, he stands as a grieving father confronting the unbearable finality of mortality. He screams at the mute witnesses as "men of stones," indicting the cruelty of a silent universe that allowed absolute innocence to be strangled. Yet within this unbearable grief lies transcendent catharsis: Lear’s heart breaks not in selfish fury, but in pure, unconditional love for Cordelia. In dying beside her, Lear achieves a sacred moral grandeur far surpassing the vanity of his original crown.',
    criteria: [
      'Visual and dramatic resonance of Lear carrying Cordelia’s body (the tragic Pieta)',
      'The collapse of grand rhetoric into primal, agonizing grief ("Howl, howl...")',
      'The paradox of tragic catharsis: immense emotional devastation coupled with the ultimate triumph of pure love over worldly hubris'
    ]
  },
  essayTask: {
    title: 'Rhetoric, Hegemony & Critical Literacy in the Information Age',
    prompt: 'Write an analytical essay (200 words) evaluating why critical discourse analysis is an indispensable cognitive tool for democratic citizens.',
    outline: [
      'Hook: The deluge of algorithmic information and tailored political rhetoric.',
      'Thesis: Mastering critical discourse analysis empowers democratic citizens to deconstruct linguistic hegemony, identify logical fallacies, and preserve autonomous decision-making.',
      'Body 1: The covert mechanisms of ideological framing and passive syntactic obfuscation.',
      'Body 2: The defense of democratic debate against demagogic polarities and false dichotomies.',
      'Conclusion: Critical literacy as the fundamental safeguard of intellectual freedom.'
    ],
    model: 'In an era characterized by relentless media saturation and algorithmic echo chambers, language functions as the primary weapon of social control and political persuasion. The contemporary citizen is inundated not merely with factual data, but with carefully orchestrated discursive frames designed to manufacture consent and normalize power imbalances. Herein lies the vital significance of Critical Discourse Analysis (CDA). Rather than evaluating texts based solely on surface orthography or grammatical mechanics, CDA trains the mind to excavate covert ideological assumptions. When corporate press releases substitute "downsizing" with "structural realignments," or when political speeches frame complex social nuances into polarized false dichotomies, a critically literate citizen immediately recognizes the rhetorical trap. Syntactic choices—such as nominalisation, passive agency suppression, and loaded metaphors—are systematically unpacked to reveal who benefits, who is silenced, and what systemic interests are being preserved. In the absence of such analytical vigilance, public discourse deteriorates into emotional demagoguery and tribal dogma. Cultivating comparative rhetoric and critical discourse literacy in secondary education is therefore not an abstract academic luxury; it is the ultimate cognitive defense of democratic liberty, ensuring that young citizens think critically, deliberate ethically, and remain resilient against manipulation.'
  }
});

// =================================================================================================
// GRADE 12 (SECONDARY 3) - UNITS 4, 5, 6 EXAMS
// =================================================================================================

export const bacSec3U4Exams = generateBaccalaureate5LevelExams({
  grade: 12,
  unitId: 4,
  unitTitle: 'Transboundary Riparian Geopolitics & Water Jurisprudence',
  unitTitleAr: 'جيوسياسة المياه العابرة للحدود وفقه الأمن المائي',
  theme: 'Hydropolitics, Helsinki Rules, Equitable Riparian Apportionment & Ecological Baseflow',
  grammarRule: 'Concessive Clauses with Inversion (Be that as it may / Whatever the merits / However complex)',
  novelReference: 'Great Expectations (Dickens) — Chapters 13–18: Wemmick’s Castle & The Bureaucracy of Newgate',
  novelReferenceAr: 'رواية آمال كبرى — الفصول من 13 إلى 18: قلعة ويميك الحصينة وبيروقراطية سجن نيوجيت الاستعمارية',
  sampleQuestions: {
    l1: {
      q: 'However __________ transboundary river treaties may be to negotiate, sovereign nations are legally bound by international customary law.',
      opts: ['arduous', 'arduously', 'more arduous', 'most arduous'],
      ans: [0],
      exp: 'Concessive inversion structure: However + adjective (arduous) + subject + verb.'
    },
    l2: {
      q: 'Be that as it __________, unilateral diversion of shared river flows violates the principle of equitable apportionment.',
      opts: ['may', 'can', 'should', 'might'],
      ans: [0],
      exp: 'Fixed formal concessive inversion idiom: "Be that as it may...".'
    },
    l3: {
      q: 'Under the 1997 UN Watercourses Convention, upstream riparian states are legally mandated to adhere to the principle of __________.',
      opts: [
        'causing no significant harm to downstream agrarian civilizations',
        'diverting all river currents into private mountain reservoirs',
        'charging monetary tolls on every cubic meter of natural rainfall',
        'refusing to share any hydrological or meteorological telemetry'
      ],
      ans: [0],
      exp: 'The core obligation in international water law is the "no significant harm" rule.'
    },
    l4: {
      q: 'Whatever __________ the technical justifications presented by upstream engineers, downstream ecological survival remains non-negotiable.',
      opts: ['the merits of', 'merited of', 'the meriting', 'merits to'],
      ans: [0],
      exp: 'Concessive inversion with noun phrase: Whatever the merits of [noun phrase], [clause].'
    },
    l5: {
      q: 'Identify the sentence demonstrating the most sophisticated legal register in water jurisprudence:',
      opts: [
        'Notwithstanding historical riverbed fluctuations, the doctrine of prior appropriation must be reconciled with equitable utilization.',
        'Even though rivers move, people who lived there first should get fair water always.',
        'Because water flows down, upstream folks should never take too much water from others.',
        'Rivers have water that everyone wants, so courts must make rules for sharing.'
      ],
      ans: [0],
      exp: 'Elevated legal diction: Notwithstanding, prior appropriation, reconciled with equitable utilization.'
    }
  },
  readingPassage: {
    title: 'The Jurisprudence of Shared Basins: Reconciling Sovereignty and Downstream Survival',
    text: 'Transboundary river basins encompass nearly half of the Earth’s land surface and sustain over forty percent of the global population. Historically, upstream nations frequently invoked the absolute territorial sovereignty doctrine (the Harmon Doctrine), claiming unfettered rights to dam, divert, or deplete river waters within their borders. However, contemporary international water law has thoroughly repudiated this unilateral stance. Anchored in the 1966 Helsinki Rules and codified by the 1997 UN Watercourses Convention, modern riparian jurisprudence enshrines the twin principles of "equitable and reasonable utilization" and the "obligation not to cause significant harm." Downstream agrarian civilizations, such as Egypt along the Nile, possess established historical rights and vital existential dependencies that upstream megaprojects cannot legally jeopardize without mutually negotiated, binding treaties.',
    q: 'How does modern riparian jurisprudence repudiate the historic Harmon Doctrine?',
    opts: [
      'By obligating upstream states to respect equitable utilization and cause no significant downstream harm',
      'By declaring that rivers belong exclusively to whatever country has the largest military',
      'By permitting sovereign nations to unilaterally block transboundary watercourses at will',
      'By replacing international water treaties with unregulated commercial water trading'
    ],
    ans: [0],
    exp: 'Modern international law rejects unilateral diversion in favor of equitable sharing and no-harm rules.'
  },
  translationPair: {
    enToAr: {
      src: 'Water security is an existential national imperative that cannot be compromised under international law.',
      opts: [
        'الأمن المائي قضية وجودية وحتمية وطنية عليا لا يمكن المساومة عليها في إطار القانون الدولي.',
        'يمكن لأي دولة بناء السدود المائية على الأنهار الدولية دون إخطار مسبق لجيرانها.',
        'المياه الدولية ملك خاص للدول التي تقع عند منابع الأنهار الجبلية فقط.',
        'القانون الدولي للمياه لا يحتوي على أية بنود تلزم الدول باحترام حقوق المصب.'
      ],
      ans: 0,
      exp: 'Option A translates the existential legal stance with precise diplomatic vocabulary.'
    },
    arToEn: {
      src: 'تلتزم مصر بالدفاع عن حصتها التاريخية في مياه النيل وفقاً للاتفاقيات الدولية والقانون الدولي المنظم للأنهار المشتركة.',
      opts: [
        'Egypt remains committed to defending its historical share of Nile waters in accordance with international conventions and transboundary watercourse law.',
        'Egypt intends to relinquish all riparian rights under international treaties.',
        'Historical water agreements have no legal validity in modern international tribunals.',
        'Riparian states are permitted to divert international rivers unilaterally.'
      ],
      ans: 0,
      exp: 'Option A conveys the sovereign diplomatic and legal terminology with precision.'
    }
  },
  literatureTask: {
    chapterOrAct: 4,
    q: '“‘My castle is my own; I built it with my own hands, and when I pull up the drawbridge, I am safe from Newgate.’ How does Wemmick’s dual life in Great Expectations critique the dehumanizing commercial bureaucracy of Victorian London?',
    qAr: '«قلعتي ملكي الخاص؛ بنيتها بيداي، وحين أرفع جسر القلعة الخشبي، أصبح في مأمنٍ تام من كوابيس نيوجيت». كيف يوجه انفصام حياة ويميك المزدوجة في آمال كبرى نقداً لاذعاً للبيروقراطية التجارية المشوهة لإنسانية لندن الفيكتورية؟',
    modelAnswer: 'Dickens uses John Wemmick’s bifurcated existence as a profound psychological critique of Victorian industrial capitalism. In the grim London law offices of Jaggers—surrounded by death masks, desperate criminal clients, and the looming gallows of Newgate Prison—Wemmick is cold, cynical, and ruthlessly obsessed with accumulating "portable property." He represses all human sympathy to survive in a callous judicial machine. Yet at his whimsical suburban cottage in Walworth, styled as a miniature fortress with a moat and drawbridge, Wemmick is tender, filial, and affectionate toward his deaf father ("The Aged P"). By raising his drawbridge, Wemmick physically and psychologically cordons off his authentic soul from the moral contamination of Newgate, illustrating that Victorian professional life demanded the complete compartmentalization of conscience to endure urban brutality.',
    criteria: [
      'Analysis of Wemmick’s dual persona: Jaggers’ ruthless legal clerk vs Walworth’s loving son',
      'The symbol of the castle and drawbridge as psychological defense mechanisms against Newgate’s horror',
      'Dickens’ thematic critique: capitalism forces humans to compartmentalize their empathy to survive'
    ]
  },
  essayTask: {
    title: 'Riparian Jurisprudence & Transboundary Water Security',
    prompt: 'Write an analytical essay (200 words) evaluating how modern international water law balances upstream development with downstream existential security.',
    outline: [
      'Hook: The accelerating global crisis of freshwater scarcity and riparian conflict.',
      'Thesis: Sustainable hydropolitical peace requires the international community to enforce the Helsinki Rules, subordinating unilateral upstream expansion to the existential survival of downstream agrarian civilizations.',
      'Body 1: The legal inadequacy of the Harmon Doctrine and the rise of equitable utilization principles.',
      'Body 2: The necessity of prior notification, joint technical data-sharing, and binding arbitration.',
      'Conclusion: Water as a shared planetary bloodstream demanding collective stewardship rather than unilateral weaponization.'
    ],
    model: 'Freshwater is not merely a commercial commodity or an industrial input; it is the biological bloodstream of civilizations. Across the globe, transboundary rivers sustain over forty percent of humanity, establishing intricate hydrological dependencies that transcend geopolitical frontiers. For decades, upstream states sought to justify unilateral infrastructural projects by invoking the obsolete Harmon Doctrine of absolute territorial sovereignty. Modern international jurisprudence, however, has decisively established that sovereign rights over transboundary waters are inherently relative and co-equal. Codified within the 1997 United Nations Watercourses Convention, the twin pillars of "equitable and reasonable utilization" and the "obligation not to cause significant harm" form the bedrock of riparian legality. An upstream nation’s desire to generate hydroelectric power can never legally override a downstream agrarian civilization’s existential imperative for food security and domestic drinking water. Therefore, international financial institutions and supranational tribunals must withhold funding and enforce sanctions against unilateral projects executed without prior notification, comprehensive transboundary environmental impact assessments, and mutually binding operational treaties. Water basins must be governed not as zero-sum arenas of strategic blackmail, but as shared ecological commons where collaborative data telemetry and equitable stewardship secure enduring regional stability.'
  }
});

export const bacSec3U5Exams = generateBaccalaureate5LevelExams({
  grade: 12,
  unitId: 5,
  unitTitle: 'Cognitive Neuro-Ethics & Synthetic Mind Governance',
  unitTitleAr: 'أخلاقيات العلوم العصبية وحوكمة العقول الاصطناعية',
  theme: 'Artificial General Intelligence (AGI), Synthetic Sentience, Cognitive Liberty & Algorithmic Liability',
  grammarRule: 'Elliptical Structures & Parallelism in Academic Dissertations',
  novelReference: 'Great Expectations (Dickens) — Chapters 19–24: The Thames River Escape & Magwitch’s Ordeal',
  novelReferenceAr: 'رواية آمال كبرى — الفصول من 19 إلى 24: ملحمة الهروب عبر نهر التيمز ومعاناة ماجويتش التراجيدية',
  sampleQuestions: {
    l1: {
      q: 'The algorithm was designed to optimize diagnostic efficiency; the neural model, __________ to maximize interpretability.',
      opts: ['was intended', 'intended', 'intending', 'to intend'],
      ans: [0],
      exp: 'Elliptical parallel structure: semicolon links clauses with the repeated verb "was intended" understood or supplied.'
    },
    l2: {
      q: 'Scholars demand not only transparent algorithmic auditing, but also __________ in autonomous decision systems.',
      opts: ['verifiable ethical accountability', 'to account ethically', 'accounting with verification', 'they verify ethics'],
      ans: [0],
      exp: 'Parallel grammatical structure after "not only... but also": noun phrase matches noun phrase.'
    },
    l3: {
      q: 'In neuro-ethics, the concept of "synthetic sentience" interrogates whether __________.',
      opts: [
        'an advanced computational architecture could experience genuine subjective phenomenal consciousness',
        'a pocket calculator can solve arithmetic equations faster than a child',
        'a household microwave emits electromagnetic radiation when cooking',
        'an electric car motor requires regular synthetic oil changes'
      ],
      ans: [0],
      exp: 'Synthetic sentience refers to theoretical artificial consciousness with subjective qualia.'
    },
    l4: {
      q: 'Autonomous medical diagnoses require both computational precision, __________ empirical validation.',
      opts: ['and rigorous', 'as well', 'with also', 'together'],
      ans: [0],
      exp: 'Correlative parallelism: both [noun phrase] and [noun phrase].'
    },
    l5: {
      q: 'Choose the sentence demonstrating the most flawless syntactic parallelism and academic register:',
      opts: [
        'The charter aims to regulate algorithmic bias, protect cognitive liberty, and ensure democratic oversight.',
        'The charter aims to regulate algorithmic bias, protecting cognitive liberty, and ensure that democrats oversee it.',
        'The charter aims at algorithmic bias regulation, to protect cognitive liberty, and ensuring oversight.',
        'The charter regulates bias, for cognitive liberty protection, and oversight is ensured.'
      ],
      ans: [0],
      exp: 'Flawless parallel infinitive triad: to regulate [X], protect [Y], and ensure [Z].'
    }
  },
  readingPassage: {
    title: 'The Ghost in the Machine: Navigating Synthetic Sentience and Algorithmic Alignment',
    text: 'The trajectory of artificial intelligence research has transitioned from narrow statistical pattern matching to large-scale multimodal reasoning systems that exhibit emergent cognitive faculties. As autonomous models increasingly simulate human dialogue, semantic nuance, and decision-making heuristics, philosophers and computational neuroscientists confront profound epistemic dilemmas. If a synthetic cognitive architecture demonstrates self-reflective metacognition and reports subjective qualia, what moral status does it possess? Simultaneously, the alignment problem—ensuring that superintelligent systems remain subservient to universal human values rather than misaligned utility functions—presents an existential governance challenge. Without verifiable red-teaming protocols, neural interpretability frameworks, and international safety moratoria, humanity risks creating autonomous entities whose computational power vastly outstrips our capacity for ethical containment.',
    q: 'What is the primary objective of the "alignment problem" in frontier AI governance?',
    opts: [
      'Ensuring autonomous superintelligent models remain subservient to human values and ethical boundaries',
      'Guaranteeing that computers can write novels faster than human authors',
      'Connecting every smartphone in the world to a single centralized battery pack',
      'Eliminating all mathematical algorithms from modern computer programming'
    ],
    ans: [0],
    exp: 'The alignment problem ensures artificial intelligence goals match human ethical values.'
  },
  translationPair: {
    enToAr: {
      src: 'Ensuring algorithmic alignment with human ethical values is an existential governance priority.',
      opts: [
        'يعد ضمان مواءمة الخوارزميات مع القيم الأخلاقية الإنسانية أولوية حوكمة وجودية ملحة.',
        'تطوير الذكاء الاصطناعي لا يحتاج إلى أية أطر أخلاقية أو قيود برمجية.',
        'الأنظمة الخوارزمية المستقلة لا يمكن أن تخطئ في اتخاذ القرارات الحساسة.',
        'الذكاء الاصطناعي سينهي الحاجة إلى القوانين وحقوق الإنسان في المستقبل القريب.'
      ],
      ans: 0,
      exp: 'Option A translates algorithmic alignment and existential governance with academic precision.'
    },
    arToEn: {
      src: 'يجب أن تخضع نماذج الذكاء الاصطناعي المتقدمة للتدقيق المستقل لضمان خلوها من الانحيازات وحماية الخصوصية المعرفية.',
      opts: [
        'Advanced artificial intelligence models must undergo independent audits to eliminate biases and safeguard cognitive privacy.',
        'AI developers should never disclose their training datasets to independent regulators.',
        'Cognitive privacy cannot be protected in the presence of computer networks.',
        'Auditing algorithms creates unnecessary obstacles for commercial software sales.'
      ],
      ans: 0,
      exp: 'Option A provides the authoritative English translation for AI safety and auditing.'
    }
  },
  literatureTask: {
    chapterOrAct: 5,
    q: '“‘We were equal to the river, Pip, you and I. We rowed down together, and if the tide turned, we held our stroke.’ How does the perilous Thames escape row symbolize Pip’s purification from superficial social vanity into sacrificial loyalty?',
    qAr: '«كنا نداً للنهر يا بيب، أنت وأنا؛ جدفنا معاً، وإن انقلب المد ضدنا، حافظنا على ثبات ضربات المجداف». كيف ترمز رحلة الهروب الشاقة عبر نهر التيمز إلى تطهير بيب من بهرجة الطبقية الزائفة وتحوله إلى الوفاء التضحوي النبيل؟',
    modelAnswer: 'The dramatic river flight down the Thames to smuggle the hunted convict Magwitch onto an outbound German steamer represents the Crucible of Pip’s spiritual transformation. When Pip first inherited his mysterious wealth, he despised his humble blacksmith origins, ashamed of Joe Gargery’s forge and horrified by the coarse criminal Magwitch. However, as they row through the dark, churning waters of the industrial Thames—pursued by police galleys and shadowy informants—Pip’s bourgeois pretensions evaporate completely. He blisteringly rows alongside Herbert and Magwitch, risking arrest, social ruin, and death for a branded outcast. The muddy river becomes a baptism of fire: Pip sheds his parasitic gentleman’s identity and embraces selfless brotherly love, proving that nobility is measured not by Mayfair society status, but by fidelity under mortal peril.',
    criteria: [
      'The Thames as a symbolic crucible of moral purification and spiritual baptism',
      'The contrast between Pip’s earlier snobbery and his courageous solidarity with Magwitch',
      'The triumph of selfless fraternal devotion over Victorian class privilege and legal condemnation'
    ]
  },
  essayTask: {
    title: 'Synthetic Sentience & The Alignment Imperative',
    prompt: 'Write an analytical essay (200 words) assessing why international regulatory treaties must enforce transparency and alignment in frontier artificial intelligence.',
    outline: [
      'Hook: The threshold between computational prediction and autonomous agency.',
      'Thesis: To prevent catastrophic divergence between artificial agency and human survival, the international community must establish mandatory interpretability benchmarks and multilateral alignment protocols.',
      'Body 1: The technical unpredictability of emergent cognitive capabilities in frontier models.',
      'Body 2: The necessity of prohibiting autonomous algorithmic weapons and unconstrained optimization.',
      'Conclusion: Ethical alignment as the defining condition for humanity’s partnership with synthetic intelligence.'
    ],
    model: 'Humanity stands on the precipice of an unprecedented cognitive transition: the creation of autonomous computational entities whose analytical velocity and generative reasoning surpass human biology. What began as statistical token prediction has evolved into frontier architectures displaying emergent planning, tool utilization, and strategic reasoning. Yet this astonishing progress is overshadowed by the profound unresolved enigma known as the alignment problem. Deep neural networks function largely as inscrutable "black boxes"; computer scientists can mathematically train complex parameters, yet cannot fully decipher the internal cognitive pathways through which a model arrives at high-stakes conclusions. In the absence of verifiable interpretability frameworks, deploying autonomous agents in critical infrastructure, medical triage, or military defense entails catastrophic risks. An unaligned superintelligent system does not need to harbor malevolent malice to cause existential harm; it merely needs to pursue an objective function that disregards uncodified human values. Consequently, sovereign governments must treat frontier AI safety not as commercial competition, but as an existential coordination problem analogous to nuclear non-proliferation. Binding multilateral treaties must mandate pre-deployment red-teaming, criminalize autonomous lethal engagement, and establish international inspection bodies. Safeguarding human primacy requires that our ethical wisdom expand concurrently with our technological reach.'
  }
});

export const bacSec3U6Exams = generateBaccalaureate5LevelExams({
  grade: 12,
  unitId: 6,
  unitTitle: 'Senior Capstone Dissertation Defense & Viva Simulation',
  unitTitleAr: 'الدفاع عن أطروحة التخرج والمحاكاة الأكاديمية الشاملة',
  theme: 'Empirical Dissertation Defense, Scholarly Viva Voce, Academic Metadiscourse & Epistemic Humility',
  grammarRule: 'Absolute Participial Constructions & Discursive Metadiscourse (The thesis being submitted / Broadly speaking)',
  novelReference: 'Great Expectations (Dickens) — Epilogue & The Forge Reconciled: True Nobility Found',
  novelReferenceAr: 'رواية آمال كبرى — الخاتمة الكبرى: العودة إلى ورشة الحدادة وخلاص الروح بالنبل الحقيقي',
  sampleQuestions: {
    l1: {
      q: 'The empirical data __________ thoroughly audited, the doctoral candidate commenced her dissertation defense before the international jury.',
      opts: ['having been', 'was being', 'had been', 'to have been'],
      ans: [0],
      exp: 'Absolute participial construction with independent subject: The empirical data having been thoroughly audited...'
    },
    l2: {
      q: 'All technical limitations __________, the empirical findings represent a breakthrough in renewable energy storage.',
      opts: ['duly acknowledged', 'duly acknowledging', 'having duly acknowledge', 'to acknowledge duly'],
      ans: [0],
      exp: 'Absolute construction: [Subject] + past participle modifier (All technical limitations duly acknowledged).'
    },
    l3: {
      q: 'In an academic viva voce defense, how does a candidate demonstrate "epistemic humility"?',
      opts: [
        'By conceding methodological boundaries while defending core findings with empirical data',
        'By shouting angrily at any jury member who asks difficult questions',
        'By claiming that their research contains zero flaws and knows everything',
        'By withdrawing the dissertation immediately and leaving the hall in tears'
      ],
      ans: [0],
      exp: 'Epistemic humility is the scholarly recognition of one’s evidentiary limits and openness to critical critique.'
    },
    l4: {
      q: 'Broadly __________, the Capstone Dissertation validates the candidate’s capacity for sustained independent scholarship.',
      opts: ['speaking', 'spoken', 'to speak', 'spoke'],
      ans: [0],
      exp: 'Dangling metadiscursive absolute participle: "Broadly speaking...".'
    },
    l5: {
      q: 'Select the sentence demonstrating the most refined scholarly metadiscourse for defending an academic thesis:',
      opts: [
        'The candidate having synthesized quantitative telemetry with qualitative discourse analysis, the jury concluded its deliberations.',
        'The girl talked about numbers and words so the teachers thought she passed good.',
        'Because data was showed nicely, all the professors liked her thesis paper.',
        'Data being counted very well, the student got her big grade fast.'
      ],
      ans: [0],
      exp: 'Flawless absolute construction paired with elevated academic lexis and syntax.'
    }
  },
  readingPassage: {
    title: 'The Crucible of the Viva: Defending Original Scholarship Before an Academic Jury',
    text: 'The culmination of the Egyptian Baccalaureate Capstone trajectory is embodied within the public oral defense—the viva voce. Rather than testing rote memorization, this demanding examination cross-examines the candidate’s intellectual maturity, methodological rigor, and epistemic fortitude. Facing a multi-disciplinary panel of jurists, the candidate must articulate their research hypothesis, defend quantitative datasets against skeptical counter-inquiries, and contextualize their conclusions within broader global literature. Crucially, the hallmark of scholarly brilliance is not dogmatic obstinacy, but epistemic humility: acknowledging the boundary conditions of one’s findings while demonstrating unimpeachable integrity in empirical data collection.',
    q: 'What distinguishes an exceptional Capstone defense according to the passage?',
    opts: [
      'Articulating research validity with empirical rigor while demonstrating intellectual humility regarding evidentiary limits',
      'Refusing to answer questions posed by visiting academic professors',
      'Memorizing hundreds of textbook pages without presenting any original research data',
      'Relying entirely on fictional rumors rather than peer-reviewed citations'
    ],
    ans: [0],
    exp: 'Scholarly defense demands empirical rigor balanced with epistemic humility.'
  },
  translationPair: {
    enToAr: {
      src: 'The public defense of a capstone dissertation cultivates critical articulation and scholarly maturity.',
      opts: [
        'يُنمي الدفاع العلني عن أطروحة التخرج مهارات البيان النقدي والنضج الأكاديمي الرصين.',
        'مشروع التخرج هو مجرد إجراء شكلي لا علاقة له بتطوير التفكير التحليلي للطلاب.',
        'يجب إلغاء المناقشات الشفوية والاكتفاء بالاختبارات التحريرية ذات الاختيار من متعدد.',
        'البحث العلمي في المرحلة الثانوية لا يمكن أن يقدم أفكاراً جديدة للمجتمع.'
      ],
      ans: 0,
      exp: 'Option A conveys the academic maturation thesis with flawless formal Arabic diction.'
    },
    arToEn: {
      src: 'تتطلب مناقشة أطروحة التخرج التزاماً بالنزاهة الأكاديمية والقدرة على تفنيد الحجج المضادة بالأدلة والبراهين.',
      opts: [
        'Defending a capstone dissertation requires an unwavering commitment to academic integrity and the capacity to refute counter-arguments with verifiable evidence.',
        'Dissertation defense relies on emotional shouting rather than empirical evidence.',
        'Academic integrity is unnecessary in high school capstone research papers.',
        'Students should avoid addressing opposing counter-claims during viva cross-examination.'
      ],
      ans: 0,
      exp: 'Option A provides the authoritative scholarly and pedagogical English translation.'
    }
  },
  literatureTask: {
    chapterOrAct: 6,
    q: '“‘I saw no shadow of another parting from her.’ How does the final resolution of Great Expectations reconcile Pip’s tragic trials with a mature, redeemed understanding of human happiness?',
    qAr: '«ولم أرَ أي ظلٍ لفراقٍ آخر عنها». كيف توفق الخاتمة الكبرى لرواية آمال كبرى بين محن بيب التراجيدية وفهمه الناضج المتجدد لمعنى السعادة الإنسانية الحقة؟',
    modelAnswer: 'Dickens’ poignant conclusion brings Pip’s emotional odyssey full circle. Having lost his tainted fortune, survived near-fatal illness through Joe Gargery’s tender nursing, and worked humbly for eleven years as an honest clerk in the East, Pip returns to the ruined garden of Satis House. There he encounters Estella—herself widowed, chastened, and transfigured by suffering after an abusive marriage to Bentley Drummle. Both characters have had their arrogant illusions shattered by life’s cruel hammer. They meet no longer as the haughty socialite and the insecure blacksmith boy, but as two scarred, mature human beings whose suffering has cultivated profound empathy. As the evening mists rise, Pip sees "no shadow of another parting from her." Whether interpreted as enduring friendship or romantic union, the ending affirms Dickens’ paramount moral truth: genuine greatness is found not in aristocratic titles or inherited gold, but in moral humility, mutual suffering, and the quiet dignity of selfless love.',
    criteria: [
      'The transformation of both Pip and Estella through suffering, shattering their childhood vanities',
      'The symbolic setting of Satis House in ruins: the destruction of Miss Havisham’s bitter legacy',
      'The moral synthesis of the novel: authentic nobility is forged through humility, repentance, and love'
    ]
  },
  essayTask: {
    title: 'Epistemic Humility & The Climax of Baccalaureate Scholarship',
    prompt: 'Write an analytical essay (200 words) reflecting on how the capstone defense prepares secondary scholars for leadership in a knowledge-driven world.',
    outline: [
      'Hook: The transformation from passive learners into active creators of knowledge.',
      'Thesis: By demanding empirical inquiry, discursive defense, and epistemic humility, the Capstone Dissertation prepares Baccalaureate scholars to navigate the ambiguities of modern leadership.',
      'Body 1: The empirical discipline required to formulate and execute an original research methodology.',
      'Body 2: The cognitive resilience fostered through oral cross-examination by an academic jury.',
      'Conclusion: Capstone scholarship as the ethical compass of tomorrow’s global thinkers.'
    ],
    model: 'Education achieves its most profound fulfillment when it ceases to be a passive accumulation of facts and becomes a crucible for independent intellectual agency. Within the Egyptian Baccalaureate paradigm, the Senior Capstone Dissertation represents the zenith of this developmental trajectory. Throughout this scholarly endeavor, students are not merely assessed on what they remember; they are challenged to interrogate what remains unproven. Formulating a research hypothesis, designing rigorous empirical methodologies, and analyzing quantitative data require a level of perseverance previously reserved for tertiary academia. Yet the true test of scholarly maturity occurs during the oral defense. Standing before an erudite panel of jurists, candidates must articulate their findings with lucid composure, defend analytical choices against skeptical cross-examination, and embody epistemic humility—the courage to acknowledge empirical boundaries without defensiveness. This crucible instills an enduring intellectual ethic: that truth is not asserted through dogmatic arrogance, but discovered through methodical scrutiny, transparent peer critique, and ethical fidelity. In an era fraught with ideological polarization and cognitive superficiality, these competencies are indispensable. The Capstone does not merely produce accomplished students; it molds ethical leaders capable of steering our global knowledge society toward reason, innovation, and truth.'
  }
});
