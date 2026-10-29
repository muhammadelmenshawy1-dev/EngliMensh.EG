import { GradeCurriculumCatalog, UnitCurriculum } from '../types/curriculum.ts';
import { secondary1Term1Units, sec1Term1RevisionExam } from './secondary1CurriculumTerm1.ts';
import { secondary1Term2Units, sec1Term2RevisionExam } from './secondary1CurriculumTerm2.ts';
import { baccalaureateSecondaryCatalog } from './baccalaureateCurriculum.ts';
import {
  fullSecondary1Units,
  fullSecondary2Units,
  fullSecondary3Units
} from './secondaryCurriculumFullTerm1.ts';
import { primaryCurriculumCatalog } from './primaryCurriculumData.ts';
import { preparatoryCurriculumCatalog } from './preparatoryCurriculumData.ts';

// Helper to create concise, academically aligned representative units for other grades
function createStandardUnit(
  stage: 'Primary' | 'Preparatory' | 'Secondary',
  grade: number,
  gradeLabel: string,
  track: any,
  semester: 1 | 2,
  unitNumber: number,
  unitTitle: string,
  unitTitleAr: string,
  theme: string,
  ruleName: string,
  ruleNameAr: string,
  keyWordsList: { word: string; meaningAr: string; partOfSpeech: string }[]
): UnitCurriculum {
  const isPresentPerfect = ruleName.toLowerCase().includes('present perfect');
  const isPassive = ruleName.toLowerCase().includes('passive');
  const isModalDeduction = ruleName.toLowerCase().includes('modal') || ruleName.toLowerCase().includes('deduction');

  const g1Question = isPresentPerfect
    ? 'Dr. Nadia __________ in London for three years now, and she is still conducting research there.'
    : isPassive
    ? 'The investigative report __________ by the editorial board before yesterday’s broadcast.'
    : isModalDeduction
    ? 'The astronauts __________ experienced extreme weightlessness once the spacecraft entered orbit.'
    : 'Pip __________ his legal documents reviewed by Mr. Jaggers before leaving for London.';

  const g1Options: [string, string, string, string] = isPresentPerfect
    ? ['has been working', 'had worked', 'is worked', 'works']
    : isPassive
    ? ['had been verified', 'has verifying', 'was verify', 'verified']
    : isModalDeduction
    ? ['must have', 'can’t have', 'shouldn’t', 'needn’t']
    : ['had', 'made', 'let', 'forced'];

  const g2Question = isPresentPerfect
    ? 'How many diplomatic reports __________ the ambassador written since the summit began?'
    : isPassive
    ? 'Strict media ethics __________ across all national newsrooms at this very moment.'
    : isModalDeduction
    ? 'He __________ missed the train; I just saw him standing on the station platform.'
    : 'Miss Havisham got the servants __________ the banquet hall untouched for decades.';

  const g2Options: [string, string, string, string] = isPresentPerfect
    ? ['has been', 'has', 'did', 'is']
    : isPassive
    ? ['enforced', 'are being enforced', 'have enforcing', 'were enforce']
    : isModalDeduction
    ? ['must have', 'can’t have', 'should have', 'would have']
    : ['leave', 'to leave', 'left', 'leaving'];

  const passageText = isPresentPerfect
    ? 'When Egyptian engineers and scholars travel abroad for postgraduate fellowships, they often experience culture shock during their first months. Adapting to unfamiliar customs, weather patterns, and social routines requires patience and resilience. However, expatriates who actively engage with host communities while preserving their cultural identity soon become cultural ambassadors who bridge nations.'
    : isPassive
    ? 'In the digital age, investigative journalism plays a vital role in holding institutions accountable and informing the public. Before any news article is published by a reputable newspaper, its sources must be independently verified by editors. Sensational headlines and unverified rumors can mislead citizens, whereas objective reporting builds lasting public trust.'
    : isModalDeduction
    ? 'Aerospace engineering has transformed humanity’s reach beyond Earth. Inside an orbiting space station, astronauts live in conditions of weightlessness where ordinary tasks require specialized training. Engineers on the ground monitor telemetry data continuously to ensure that every life-support system functions safely during long-duration missions.'
    : 'In Charles Dickens’s Great Expectations, young Pip believes that sudden wealth will make him a true gentleman. Yet as the narrative unfolds in London, he discovers that authentic nobility comes from loyalty, humility, and gratitude toward selfless friends like Joe Gargery rather than superficial social status.';

  const r1Q = isPresentPerfect
    ? 'What challenge do scholars often face during their first months living abroad?'
    : isPassive
    ? 'What must editors do before an investigative news article is published?'
    : isModalDeduction
    ? 'What condition do astronauts experience inside an orbiting space station?'
    : 'What lesson does Pip ultimately learn in Great Expectations?';

  const r1Opts: [string, string, string, string] = isPresentPerfect
    ? ['Culture shock and adapting to unfamiliar customs', 'Forgetting how to read their native language', 'Losing their passports at the airport', 'Refusing to attend university lectures']
    : isPassive
    ? ['Independently verify all sources and facts', 'Invent sensational rumors to sell more copies', 'Delete all interviews with witnesses', 'Publish articles without reading them']
    : isModalDeduction
    ? ['Weightlessness requiring specialized training', 'Heavy snowstorms inside the cabin', 'Complete lack of radio communication', 'Underwater ocean pressure']
    : ['True nobility comes from loyalty and humility rather than wealth', 'Money alone guarantees happiness and loyal friends', 'London is smaller than his villageforge', 'Education is unnecessary for a gentleman'];

  const r2Q = isPresentPerfect
    ? 'According to the passage, how can expatriates succeed in their host communities?'
    : isPassive
    ? 'What is the danger of sensational headlines and unverified rumors?'
    : isModalDeduction
    ? 'Why do ground engineers monitor telemetry data continuously?'
    : 'Who represents genuine loyalty and moral integrity in Pip’s life?';

  const r2Opts: [string, string, string, string] = isPresentPerfect
    ? ['By isolating themselves from everyone', 'By engaging positively while preserving their cultural identity', 'By abandoning their academic research immediately', 'By avoiding speaking English in public']
    : isPassive
    ? ['They make newspapers cheaper to print', 'They can mislead citizens and erode public trust', 'They improve grammatical accuracy', 'They help readers verify scientific facts']
    : isModalDeduction
    ? ['To sell commercial tickets to tourists', 'To ensure every life-support system functions safely', 'To turn off the station’s solar panels', 'To delay the astronauts’ return to Earth']
    : ['Compeyson', 'Joe Gargery', 'Bentley Drummle', 'Orlick'];

  const unitIdPrefix = `${stage.toLowerCase()}_g${grade}_t${semester}_u${unitNumber}`;

  const v2Q = isPresentPerfect
    ? 'Living in a new country requires patience to __________ to unfamiliar customs and daily routines.'
    : isPassive
    ? 'Investigative journalists must never __________ sensational rumors without verifying their sources.'
    : isModalDeduction
    ? 'Spacecraft engineers __________ telemetry instruments carefully before launching an orbital mission.'
    : 'In Great Expectations, Pip’s sudden fortune __________ his perspective on social class in London.';

  const v2Opts: [string, string, string, string] = isPresentPerfect
    ? ['ignore', 'adapt', 'refuse', 'abandon']
    : isPassive
    ? ['verify', 'publish', 'correct', 'archive']
    : isModalDeduction
    ? ['damage', 'calibrate', 'misplace', 'forget']
    : ['stabilized', 'transformed', 'simplified', 'ignored'];

  const v4Q = isPresentPerfect
    ? 'Scholars who maintain their values while engaging with foreign cultures show remarkable:'
    : isPassive
    ? 'A news report that presents all sides of an issue fairly without personal bias is called:'
    : isModalDeduction
    ? 'Inside an orbiting space station, objects float freely because of microgravity and:'
    : 'Joe Gargery’s unconditional kindness toward Pip demonstrates true moral:';

  const v4Opts: [string, string, string, string] = isPresentPerfect
    ? ['isolation', 'hesitation', 'negligence', 'resilience']
    : isPassive
    ? ['sensational', 'misleading', 'biased', 'objective']
    : isModalDeduction
    ? ['turbulence', 'friction', 'altitude', 'weightlessness']
    : ['arrogance', 'greed', 'deception', 'integrity'];

  const g3Q = isPresentPerfect
    ? 'The Egyptian researchers __________ on the renewable energy project since last October, and they are still testing prototypes.'
    : isPassive
    ? 'By the time the evening newspaper went to print, all eyewitness statements __________ by the legal team.'
    : isModalDeduction
    ? 'The satellite signal disappeared suddenly; the solar array __________ been damaged by micrometeoroids.'
    : 'Mr. Jaggers had his clerk __________ the confidential legal deeds before Pip arrived at the office.';

  const g3Opts: [string, string, string, string] = isPresentPerfect
    ? ['worked', 'had worked', 'have been working', 'are worked']
    : isPassive
    ? ['have reviewed', 'were reviewing', 'had been reviewed', 'are reviewing']
    : isModalDeduction
    ? ['can’t', 'shouldn’t', 'might have', 'needn’t have']
    : ['prepared', 'preparing', 'prepare', 'to preparing'];

  const g4Q = isPresentPerfect
    ? 'This is the third international fellowship that Dr. Kareem __________ for this academic year.'
    : isPassive
    ? 'Breaking news updates __________ to millions of subscribers while the press conference is taking place.'
    : isModalDeduction
    ? 'The mission commander __________ forgotten the launch protocol; she rehearsed every step a hundred times.'
    : 'Before the wedding banquet was cancelled, Miss Havisham had the grand cake __________ by the finest bakery.';

  const g4Opts: [string, string, string, string] = isPresentPerfect
    ? ['is applying', 'was applied', 'had applied', 'has applied']
    : isPassive
    ? ['broadcast', 'have broadcast', 'were broadcasting', 'are being broadcast']
    : isModalDeduction
    ? ['must have', 'should have', 'may have', 'couldn’t have']
    : ['deliver', 'delivering', 'to deliver', 'delivered'];

  const r4Q = isPresentPerfect
    ? 'What is the main message of the passage regarding Egyptian scholars studying abroad?'
    : isPassive
    ? 'Why is independent source verification essential in modern journalism?'
    : isModalDeduction
    ? 'How do ground control engineers support astronauts during long-duration orbital missions?'
    : 'How does Charles Dickens contrast Joe Gargery with superficial London society?';

  const r4Opts: [string, string, string, string] = isPresentPerfect
    ? [
        'Expatriates should avoid all contact with local universities',
        'Living abroad permanently erases one’s native culture',
        'Culture shock prevents scholars from completing research',
        'Positive engagement combined with cultural pride turns scholars into cultural ambassadors'
      ]
    : isPassive
    ? [
        'It delays news broadcasts for several weeks',
        'It replaces factual reporting with entertainment',
        'It reduces the need for professional editors',
        'It protects citizens from misinformation and builds lasting public trust'
      ]
    : isModalDeduction
    ? [
        'By turning off communications during orbital flights',
        'By eliminating the need for astronaut training',
        'By increasing gravity inside the spacecraft cabin',
        'By continuously tracking telemetry data to keep life-support systems safe'
      ]
    : [
        'By portraying Joe as wealthy and arrogant',
        'By showing that London society values humility over money',
        'By claiming that social status is more important than family',
        'By showing that authentic nobility stems from loyalty and gratitude rather than wealth'
      ];

  const l3Q = isPresentPerfect
    ? 'In the listening dialogue, what example does Salma give to distinguish Present Perfect Continuous from Present Perfect Simple?'
    : isPassive
    ? 'In the audio discussion, why does Mr. Hazem emphasize passive verbs in news headlines?'
    : isModalDeduction
    ? 'According to the audio lesson, when do we use "must have + past participle"?'
    : 'In the literature discussion, how does Salma distinguish passive causatives from active causatives?';

  const l3Opts: [string, string, string, string] = isPresentPerfect
    ? [
        'Comparing future predictions with imperative commands',
        'Listing irregular plural nouns in primary grades',
        'Contrasting ongoing duration ("has been researching") with completed quantity ("has published three papers")',
        'Replacing all verbs with passive adjectives'
      ]
    : isPassive
    ? [
        'To hide the main topic of the news article',
        'To avoid using punctuation marks',
        'To focus attention on the verified action or event when the agent is unknown or institutional',
        'To make sentences longer than necessary'
      ]
    : isModalDeduction
    ? [
        'When giving advice about future exams',
        'When asking for permission in the classroom',
        'When expressing a strong logical certainty about a past event based on clear evidence',
        'When describing a habitual daily routine'
      ]
    : [
        'By using past simple verbs only',
        'By omitting the object from every sentence',
        'By checking whether the object receives the action (past participle) or performs it (infinitive / to-infinitive)',
        'By changing all nouns into adverbs'
      ];

  const l4Q = isPresentPerfect
    ? 'What assignment does Mr. Hazem ask Salma to complete for Unit 7 (Living and Working Abroad)?'
    : isPassive
    ? 'What media analysis task does Salma agree to prepare after the Unit 8 lesson?'
    : isModalDeduction
    ? 'Which aerospace case study will Salma summarize using past modal deductions?'
    : 'Which character’s moral transformation in Great Expectations will Salma write an essay about?';

  const l4Opts: [string, string, string, string] = isPresentPerfect
    ? [
        'Draw a map of primary school classrooms',
        'Copy a list of French verbs',
        'Memorize a recipe for traditional bread',
        'Write a paragraph about an Egyptian scientist abroad using Present Perfect Simple and Continuous'
      ]
    : isPassive
    ? [
        'Write a fictional fairy tale for children',
        'Cancel her subscription to the school magazine',
        'Translate a math textbook into Spanish',
        'Rewrite five active news reports into accurate passive journalistic broadcasts'
      ]
    : isModalDeduction
    ? [
        'A history of ancient sailing boats',
        'A guide to planting desert trees',
        'A schedule of local train departures',
        'An analysis of how engineers diagnosed an orbital satellite anomaly using telemetry evidence'
      ]
    : [
        'Oliver Twist’s arrival at the workhouse',
        'Robinson Crusoe’s island survival diary',
        'King Lear’s division of his kingdom',
        'Pip’s realization of Joe Gargery’s loyalty and the true meaning of being a gentleman'
      ];

  const vocabExercises = [
    {
      id: `${unitIdPrefix}_v1`,
      skill: 'Vocabulary' as const,
      question: `Which word best corresponds to the Arabic meaning: "${keyWordsList[0]?.meaningAr}"?`,
      options: [keyWordsList[0]?.word || 'concept', 'distraction', 'obstacle', 'penalty'] as [string, string, string, string],
      correctAnswer: 'A' as const,
      explanation: `The correct target vocabulary term is "${keyWordsList[0]?.word}".`,
      verificationStatus: 'corrected_pending_verification' as const
    },
    {
      id: `${unitIdPrefix}_v2`,
      skill: 'Vocabulary' as const,
      question: v2Q,
      options: v2Opts,
      correctAnswer: 'B' as const,
      explanation: `"${v2Opts[1]}" is the contextually accurate vocabulary choice for ${unitTitle}.`,
      verificationStatus: 'corrected_pending_verification' as const
    },
    {
      id: `${unitIdPrefix}_v3`,
      skill: 'Vocabulary' as const,
      question: `In the context of "${unitTitle}", the term "${keyWordsList[1]?.word || 'concept'}" means:`,
      options: ['something trivial', 'an accidental error', keyWordsList[1]?.meaningAr || 'المفهوم الرئيسي', 'a minor delay'] as [string, string, string, string],
      correctAnswer: 'C' as const,
      explanation: `The accurate Arabic meaning for "${keyWordsList[1]?.word}" is "${keyWordsList[1]?.meaningAr}".`,
      verificationStatus: 'corrected_pending_verification' as const
    },
    {
      id: `${unitIdPrefix}_v4`,
      skill: 'Vocabulary' as const,
      question: v4Q,
      options: v4Opts,
      correctAnswer: 'D' as const,
      explanation: `"${v4Opts[3]}" accurately completes the academic meaning in ${unitTitle}.`,
      verificationStatus: 'corrected_pending_verification' as const
    }
  ];

  const grammarExercises = [
    {
      id: `${unitIdPrefix}_g1`,
      skill: 'Grammar' as const,
      question: g1Question,
      options: g1Options,
      correctAnswer: 'A' as const,
      explanation: `"${g1Options[0]}" accurately applies ${ruleName} in context.`,
      verificationStatus: 'corrected_pending_verification' as const
    },
    {
      id: `${unitIdPrefix}_g2`,
      skill: 'Grammar' as const,
      question: g2Question,
      options: g2Options,
      correctAnswer: 'B' as const,
      explanation: `"${g2Options[1]}" is the required grammatical form for ${ruleName}.`,
      verificationStatus: 'corrected_pending_verification' as const
    },
    {
      id: `${unitIdPrefix}_g3`,
      skill: 'Grammar' as const,
      question: g3Q,
      options: g3Opts,
      correctAnswer: 'C' as const,
      explanation: `"${g3Opts[2]}" correctly applies ${ruleName}.`,
      verificationStatus: 'corrected_pending_verification' as const
    },
    {
      id: `${unitIdPrefix}_g4`,
      skill: 'Grammar' as const,
      question: g4Q,
      options: g4Opts,
      correctAnswer: 'D' as const,
      explanation: `"${g4Opts[3]}" is the grammatically accurate structure for ${ruleName}.`,
      verificationStatus: 'corrected_pending_verification' as const
    }
  ];

  const readingQuestions = [
    {
      id: `${unitIdPrefix}_r1`,
      skill: 'Reading' as const,
      question: r1Q,
      options: r1Opts,
      correctAnswer: 'A' as const,
      explanation: `Directly stated in the opening lines of the passage on ${unitTitle}.`,
      verificationStatus: 'corrected_pending_verification' as const
    },
    {
      id: `${unitIdPrefix}_r2`,
      skill: 'Reading' as const,
      question: r2Q,
      options: r2Opts,
      correctAnswer: 'B' as const,
      explanation: `Supported by the contextual details in the second half of the passage.`,
      verificationStatus: 'corrected_pending_verification' as const
    },
    {
      id: `${unitIdPrefix}_r3`,
      skill: 'Reading' as const,
      question: `In the passage, the word "${keyWordsList[0]?.word}" is most closely associated with:`,
      options: ['culinary recipes', 'ancient folklore', theme, 'traffic rules'] as [string, string, string, string],
      correctAnswer: 'C' as const,
      explanation: `The passage uses "${keyWordsList[0]?.word}" within the context of ${theme}.`,
      verificationStatus: 'corrected_pending_verification' as const
    },
    {
      id: `${unitIdPrefix}_r4`,
      skill: 'Reading' as const,
      question: r4Q,
      options: r4Opts,
      correctAnswer: 'D' as const,
      explanation: `Synthesizes the central argument of the passage on ${unitTitle}.`,
      verificationStatus: 'corrected_pending_verification' as const
    }
  ];

  const listeningQuestions = [
    {
      id: `${unitIdPrefix}_l1`,
      skill: 'Listening' as const,
      question: `In the Unit ${unitNumber} ("${unitTitle}") audio dialogue, what main topic are Mr. Hazem and Salma discussing?`,
      options: [
        `${unitTitle} (${theme})`,
        `Booking a summer holiday in Spain`,
        `Repairing a broken bicycle tire`,
        `Ordering dinner from a restaurant`
      ] as [string, string, string, string],
      correctAnswer: 'A' as const,
      explanation: `Mr. Hazem introduces the review of ${unitTitle}.`,
      verificationStatus: 'corrected_pending_verification' as const
    },
    {
      id: `${unitIdPrefix}_l2`,
      skill: 'Listening' as const,
      question: `During the review of "${unitTitle}", which grammatical structure does Mr. Hazem remind Salma to apply carefully?`,
      options: [
        `Primary school alphabet phonics`,
        `${ruleName}`,
        `Counting numbers from one to ten`,
        `Imperative classroom commands`
      ] as [string, string, string, string],
      correctAnswer: 'B' as const,
      explanation: `Mr. Hazem specifically highlights ${ruleName}.`,
      verificationStatus: 'corrected_pending_verification' as const
    },
    {
      id: `${unitIdPrefix}_l3`,
      skill: 'Listening' as const,
      question: l3Q,
      options: l3Opts,
      correctAnswer: 'C' as const,
      explanation: `Explains how ${ruleName} is applied in ${unitTitle}.`,
      verificationStatus: 'corrected_pending_verification' as const
    },
    {
      id: `${unitIdPrefix}_l4`,
      skill: 'Listening' as const,
      question: l4Q,
      options: l4Opts,
      correctAnswer: 'D' as const,
      explanation: `Describes Salma's follow-up task for ${unitTitle}.`,
      verificationStatus: 'corrected_pending_verification' as const
    }
  ];

  const allUnitQuestions = [
    ...vocabExercises,
    ...grammarExercises,
    ...readingQuestions,
    ...listeningQuestions
  ].map(q => ({
    ...q,
    id: `exam_${q.id}`
  }));

  return {
    stage,
    grade,
    gradeLabel,
    track,
    textbookSeries: `General Secondary ${grade - 9}`,
    verificationStatus: 'corrected_pending_verification',
    sourceReference: `Supplemental Term 2 Enrichment Unit (${gradeLabel} - Unit ${unitNumber}: ${unitTitle}) — Pending Term 2 Official Page Citation`,
    semester,
    unitNumber,
    unitTitle,
    unitTitleAr,
    theme,
    vocabularyModule: {
      keyWords: keyWordsList.map(kw => ({
        word: kw.word,
        partOfSpeech: kw.partOfSpeech,
        meaningEn: `Key target lexical item for ${unitTitle}`,
        meaningAr: kw.meaningAr,
        exampleSentence: `In "${unitTitle}", the term "${kw.word}" is essential for discussing ${theme.toLowerCase()}.`
      })),
      collocations: [
        {
          phrase: `cope with ${keyWordsList[0]?.word || 'challenges'}`,
          meaningAr: `يتعامل بوعي مع ${keyWordsList[0]?.meaningAr || 'التحديات'}`,
          example: `Successful individuals learn how to cope with ${keyWordsList[0]?.word || 'challenges'} effectively.`
        },
        {
          phrase: 'make steady progress',
          meaningAr: 'يحقق تقدماً ثابتاً ومستمراً',
          example: 'Consistent study helps learners make steady progress in English fluency.'
        }
      ],
      exercises: vocabExercises
    },
    grammarModule: {
      ruleName,
      ruleNameAr,
      explanationSummary: `Official Egyptian Curriculum structural focus: ${ruleName}.`,
      detailedRules: [
        {
          title: 'Core Pattern & Form',
          explanation: `Mastering structural syntax and communicative deployment for ${ruleName}.`,
          examples: [
            g1Question.replace('__________', g1Options[0]),
            g2Question.replace('__________', g2Options[1])
          ]
        }
      ],
      exercises: grammarExercises
    },
    readingModule: {
      passageTitle: `${unitTitle}: Thematic Reading Passage`,
      passage: passageText,
      criticalThinkingFocus: `Evaluating contextual perspectives on ${theme}.`,
      questions: readingQuestions
    },
    listeningModule: {
      audioTitle: `${unitTitle}: Classroom Dialogue`,
      speakerRoles: 'Teacher (Mr. Hazem) & Student (Salma)',
      transcript: `Mr. Hazem: Good morning, Salma. Today we are reviewing the core concepts of ${unitTitle}, including terms like "${keyWordsList[0]?.word}" and "${keyWordsList[1]?.word}". What did you find most interesting?
Salma: Good morning, Mr. Hazem. I was fascinated by the practical applications of ${theme}. It connects our classroom learning directly to real-world situations in Egypt!
Mr. Hazem: Precisely. Remember that mastering both the vocabulary and the grammatical rules for ${ruleName} gives you the confidence to communicate accurately.
Salma: Thank you, Mr. Hazem! I will practice these drills thoroughly.`,
      durationApprox: '1 min 45 secs',
      exercises: listeningQuestions
    },
    unitExam: {
      examId: `${unitIdPrefix}_exam`,
      examTitle: `${gradeLabel} - Unit ${unitNumber} Assessment: ${unitTitle}`,
      examTitleAr: `امتحان تقييم الوحدة ${unitNumber} - ${gradeLabel}`,
      durationMinutes: 30,
      totalMarks: 32,
      questions: allUnitQuestions
    }
  };
}

// ------------------------------------------------------------------------------------------------
// 1. PRIMARY STAGE (CONNECT 1-6) & 2. PREPARATORY STAGE (NEW HELLO PREP 1-3)
// ------------------------------------------------------------------------------------------------
export { primaryCurriculumCatalog };


// ------------------------------------------------------------------------------------------------
// 2. PREPARATORY STAGE (NEW HELLO PREP 1-3)
// ------------------------------------------------------------------------------------------------
export { preparatoryCurriculumCatalog };


// ------------------------------------------------------------------------------------------------
// 3. SECONDARY STAGE: SEPARATED INTO TWO DISTINCT PATHS (2026/2027 SYLLABUS)
//    Path A: General Secondary (Thanaweya Amma - الثانوية العامة)
//    Path B: Egyptian Baccalaureate (البكالوريا المصرية - Advanced Dual Stream)
// ------------------------------------------------------------------------------------------------

// PATH A: General Secondary (Thanaweya Amma - الثانوية العامة)
export const generalSecondaryCatalog: GradeCurriculumCatalog[] = [
  // Secondary 1 (Grade 10) - Complete 12 Units + Term 1 & 2 Revisions (New Hello 2026/2027)
  {
    stage: 'Secondary',
    grade: 10,
    gradeLabel: 'Secondary 1 - الصف الأول الثانوي (الثانوية العامة)',
    gradeLabelAr: 'الصف الأول الثانوي (مسار الثانوية العامة - New Hello Sec 1)',
    track: 'General Secondary',
    secondaryPath: 'general_secondary',
    description: "Egyptian MOE General Secondary (Thanaweya Amma 2026/2027): Complete national curriculum featuring Egypt's Heritage, Hands Help Hearts Care, Truth Vs. Lies, Save and Shine, Using Technology at Schools, Job Hunting, and Ernest Hemingway's novel The Old Man and the Sea.",
    semesters: [
      {
        semester: 1,
        semesterLabel: 'Term 1 - الفصل الدراسي الأول (Units 1 to 6 + Literature + Revision)',
        units: fullSecondary1Units,
        revisionTitle: 'Term 1 Comprehensive Final Assessment',
        revisionExam: sec1Term1RevisionExam
      },
      {
        semester: 2,
        semesterLabel: 'Term 2 - الفصل الدراسي الثاني (Units 7 to 12 + Revision)',
        units: secondary1Term2Units.map(u => ({
          ...u,
          track: 'General Secondary' as const,
          secondaryPath: 'general_secondary' as const,
          verificationStatus: 'corrected_pending_verification' as const
        })),
        revisionTitle: 'Term 2 Comprehensive Final Assessment',
        revisionExam: sec1Term2RevisionExam
      }
    ]
  },
  // Secondary 2 (Grade 11) - General Secondary Track (New Hello Sec 2)
  {
    stage: 'Secondary',
    grade: 11,
    gradeLabel: 'Secondary 2 - الصف الثاني الثانوي (الثانوية العامة)',
    gradeLabelAr: 'الصف الثاني الثانوي (مسار الثانوية العامة - New Hello Sec 2)',
    track: 'General Secondary',
    secondaryPath: 'general_secondary',
    description: 'Egyptian MOE General Secondary (Thanaweya Amma 2026/2027): Advanced academic English, cellular immunity, King Lear (Shakespeare), sports journalism, vertical agriculture, and translation competencies.',
    semesters: [
      {
        semester: 1,
        semesterLabel: 'Term 1 - الفصل الدراسي الأول (Units 1 to 6 + King Lear)',
        units: fullSecondary2Units
      },
      {
        semester: 2,
        semesterLabel: 'Term 2 - الفصل الدراسي الثاني (Units 7 & 8)',
        units: [
          createStandardUnit('Secondary', 11, 'Secondary 2', 'General Secondary', 2, 7, 'Living and Working Abroad', 'العمل والإقامة في الخارج (التكيف الثقافي)', 'Culture shock, international diplomacy, expatriates', 'Present Perfect Simple vs. Present Perfect Continuous', 'المضارع التام البسيط والمستمر والفروق الدقيقة', [
            { word: 'culture shock', meaningAr: 'صدمة التغير الثقافي', partOfSpeech: 'noun' },
            { word: 'expatriate', meaningAr: 'مغترب يعمل خارج وطنه', partOfSpeech: 'noun' }
          ]),
          createStandardUnit('Secondary', 11, 'Secondary 2', 'General Secondary', 2, 8, 'The Power of the Press', 'سلطة الصحافة والإعلام الرقمي', 'Investigative journalism, ethical reporting, fake news', 'Passive Voice across all continuous and perfect tenses', 'المبني للمجهول في جميع الأزمنة المتقدمة', [
            { word: 'investigative', meaningAr: 'صحافة استقصائية دقيقة', partOfSpeech: 'adjective' },
            { word: 'censorship', meaningAr: 'الرقابة الإعلامية', partOfSpeech: 'noun' }
          ])
        ]
      }
    ]
  },
  // Secondary 3 (Grade 12 - General Secondary Certificate / شهادة إتمام الثانوية العامة)
  {
    stage: 'Secondary',
    grade: 12,
    gradeLabel: 'Secondary 3 - الصف الثالث الثانوي (شهادة إتمام الثانوية العامة)',
    gradeLabelAr: 'الصف الثالث الثانوي (شهادة إتمام الثانوية العامة المصرية 2026/2027)',
    track: 'General Secondary',
    secondaryPath: 'general_secondary',
    description: 'High-stakes Egyptian National General Secondary Certificate (Thanaweya Amma 2026/2027): Great Expectations (Dickens), cognitive psychology, advanced essay composition, higher-order literary analysis, and official national standardized examination banks.',
    semesters: [
      {
        semester: 1,
        semesterLabel: 'Term 1 - الفصل الدراسي الأول (Units 1 to 6 + Great Expectations)',
        units: fullSecondary3Units
      },
      {
        semester: 2,
        semesterLabel: 'Term 2 - الفصل الدراسي الثاني (Units 7 & 8 + Final Cumulative National Bank)',
        units: [
          createStandardUnit('Secondary', 12, 'Secondary 3', 'General Secondary', 2, 7, 'Reaching for the Stars', 'بلوغ النجوم وتحقيق المستحيل', 'Aviation history, aerospace engineering, grit', 'Modal verbs of deduction in the past (must have, can’t have, might have)', 'أفعال الاستنتاج في الماضي مع التصريف الثالث', [
            { word: 'weightlessness', meaningAr: 'انعدام الجاذبية والوزن', partOfSpeech: 'noun' },
            { word: 'aerospace', meaningAr: 'علوم هندسة الطيران والفضاء', partOfSpeech: 'noun' }
          ]),
          createStandardUnit('Secondary', 12, 'Secondary 3', 'General Secondary', 2, 8, 'Great Expectations', 'آمال كبرى (تشارلز ديكنز والقيم الإنسانية)', 'Pip, Estella, Miss Havisham, true gentlemanliness vs false vanity', 'Causative verbs: Have / Get something done & Active causatives', 'الأفعال السببية (Have / Get someone to do)', [
            { word: 'benefactor', meaningAr: 'فاعل خير وولي نعمة سري', partOfSpeech: 'noun' },
            { word: 'convict', meaningAr: 'سجين ومدان قضائياً', partOfSpeech: 'noun' }
          ])
        ]
      }
    ]
  }
];

// Re-export Path B: Egyptian Baccalaureate Catalog
export { baccalaureateSecondaryCatalog };

// Combined Secondary Catalog (contains both paths for backward compatibility)
export const secondaryCurriculumCatalog: GradeCurriculumCatalog[] = [
  ...generalSecondaryCatalog,
  ...baccalaureateSecondaryCatalog
];

// Combine all grade catalogs across Primary, Preparatory, and Secondary paths
export const allStagesCurriculumCatalog: GradeCurriculumCatalog[] = [
  ...primaryCurriculumCatalog,
  ...preparatoryCurriculumCatalog,
  ...secondaryCurriculumCatalog
];
