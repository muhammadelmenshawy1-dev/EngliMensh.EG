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
  return {
    stage,
    grade,
    gradeLabel,
    track,
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
        exampleSentence: `Students use the word "${kw.word}" in contextual sentences.`
      })),
      collocations: [
        {
          phrase: `practice ${keyWordsList[0]?.word || 'vocabulary'}`,
          meaningAr: `يمارس ويطبق مفردات الوحدة`,
          example: `Active learners practice ${keyWordsList[0]?.word || 'vocabulary'} in daily speech.`
        },
        {
          phrase: 'make steady progress',
          meaningAr: 'يحقق تقدماً ثابتاً ومستمراً',
          example: 'Consistent study helps learners make steady progress in English fluency.'
        }
      ],
      exercises: [
        {
          id: `${stage.toLowerCase()}_g${grade}_t${semester}_u${unitNumber}_v1`,
          skill: 'Vocabulary',
          question: `Which word best corresponds to the meaning: "${keyWordsList[0]?.meaningAr}"?`,
          options: [keyWordsList[0]?.word || 'Option A', 'distraction', 'obstacle', 'penalty'],
          correctAnswer: 'A',
          explanation: `The correct target vocabulary term is "${keyWordsList[0]?.word}".`
        },
        {
          id: `${stage.toLowerCase()}_g${grade}_t${semester}_u${unitNumber}_v2`,
          skill: 'Vocabulary',
          question: `Complete the sentence: "Learners should work consistently to __________ steady progress."`,
          options: ['break', 'make', 'lose', 'drop'],
          correctAnswer: 'B',
          explanation: 'The standard academic collocation is "make steady progress".'
        },
        {
          id: `${stage.toLowerCase()}_g${grade}_t${semester}_u${unitNumber}_v3`,
          skill: 'Vocabulary',
          question: `In the context of ${unitTitle}, the word "${keyWordsList[1]?.word || 'concept'}" means:`,
          options: ['something trivial', 'an incorrect guess', keyWordsList[1]?.meaningAr || 'المفهوم الرئيسي', 'a minor mistake'],
          correctAnswer: 'C',
          explanation: `The pedagogical translation for "${keyWordsList[1]?.word}" is "${keyWordsList[1]?.meaningAr}".`
        },
        {
          id: `${stage.toLowerCase()}_g${grade}_t${semester}_u${unitNumber}_v4`,
          skill: 'Vocabulary',
          question: `Which term best describes the central theme of ${unitTitle}?`,
          options: ['Confusion', 'Indifference', 'Carelessness', theme],
          correctAnswer: 'D',
          explanation: `The central theme of this unit is "${theme}".`
        }
      ]
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
            `Standard usage example for ${ruleName} according to MOE specifications.`,
            `Common error caution and correction when applying ${ruleName}.`
          ]
        }
      ],
      exercises: [
        {
          id: `${stage.toLowerCase()}_g${grade}_t${semester}_u${unitNumber}_g1`,
          skill: 'Grammar',
          question: `Which sentence demonstrates the grammatically accurate deployment of ${ruleName}?`,
          options: [
            `Correct model structure illustrating ${ruleName}`,
            `Incorrect verb form missing auxiliary markers`,
            `Confused word order violating syntax rules`,
            `Mismatched subject-verb agreement clause`
          ],
          correctAnswer: 'A',
          explanation: `Choice A adheres strictly to the rules of ${ruleName}.`
        },
        {
          id: `${stage.toLowerCase()}_g${grade}_t${semester}_u${unitNumber}_g2`,
          skill: 'Grammar',
          question: `Identify the correct auxiliary or connector required for ${ruleName}:`,
          options: ['incorrect auxiliary', 'standard target form', 'unrelated conjunction', 'redundant preposition'],
          correctAnswer: 'B',
          explanation: `The correct target auxiliary form for ${ruleName} is highlighted in Choice B.`
        },
        {
          id: `${stage.toLowerCase()}_g${grade}_t${semester}_u${unitNumber}_g3`,
          skill: 'Grammar',
          question: `Choose the correct option: In ${ruleName}, time adverbs typically indicate:`,
          options: ['irrelevant past', 'impossible future', 'precise temporal or aspectual relationship', 'unrelated negation'],
          correctAnswer: 'C',
          explanation: 'Aspectual and temporal markers establish the correct verb sequence.'
        },
        {
          id: `${stage.toLowerCase()}_g${grade}_t${semester}_u${unitNumber}_g4`,
          skill: 'Grammar',
          question: `Which error must students avoid when formulating ${ruleName}?`,
          options: ['Reading carefully', 'Checking spelling', 'Using capital letters', 'Omitting the mandatory auxiliary or inflectional suffix'],
          correctAnswer: 'D',
          explanation: 'Omitting the necessary inflectional marker breaks grammatical correctness.'
        }
      ]
    },
    readingModule: {
      passageTitle: `${unitTitle}: Exploring Perspectives`,
      passage: `In the modern Egyptian educational framework, language acquisition is intimately bound to critical cognition. Through the thematic study of ${theme}, learners develop both lexical breadth and analytical insight. Authentic texts encourage students to synthesize information, deduce contextual meaning, and formulate reasoned responses to contemporary global and local issues.`,
      criticalThinkingFocus: `Evaluating contextual perspectives on ${theme}.`,
      questions: [
        {
          id: `${stage.toLowerCase()}_g${grade}_t${semester}_u${unitNumber}_r1`,
          skill: 'Reading',
          question: `What is the primary pedagogical objective of exploring ${theme}?`,
          options: [
            `Developing lexical breadth alongside analytical and critical cognition`,
            `Encouraging students to abandon written literature`,
            `Restricting study solely to mechanical memorization`,
            `Eliminating grammar discussions in the classroom`
          ],
          correctAnswer: 'A',
          explanation: 'The passage highlights combining lexical acquisition with critical cognition.'
        },
        {
          id: `${stage.toLowerCase()}_g${grade}_t${semester}_u${unitNumber}_r2`,
          skill: 'Reading',
          question: `How do authentic thematic passages support second language development?`,
          options: [
            `By making reading tests completely unnecessary`,
            `By encouraging students to deduce contextual nuances and synthesize ideas`,
            `By replacing all spoken language in schools`,
            `By teaching outdated slang exclusively`
          ],
          correctAnswer: 'B',
          explanation: 'Authentic texts train learners to deduce meaning and synthesize concepts.'
        },
        {
          id: `${stage.toLowerCase()}_g${grade}_t${semester}_u${unitNumber}_r3`,
          skill: 'Reading',
          question: `What cognitive skill is particularly nurtured through the study of ${unitTitle}?`,
          options: [
            `Speed typing without comprehension`,
            `Memorizing dictionary pages without context`,
            `Formulating reasoned responses to real-world local and global issues`,
            `Ignoring questions from examiners`
          ],
          correctAnswer: 'C',
          explanation: 'The text emphasizes formulating reasoned responses to real-world themes.'
        },
        {
          id: `${stage.toLowerCase()}_g${grade}_t${semester}_u${unitNumber}_r4`,
          skill: 'Reading',
          question: `According to the passage, modern Egyptian education connects language acquisition directly to:`,
          options: [
            `passive repetition alone`,
            `commercial advertising slogans`,
            `irrelevant fantasy folklore`,
            `critical thinking and contextual awareness`
          ],
          correctAnswer: 'D',
          explanation: 'Language learning is linked directly to critical thinking.'
        },
        {
          id: `${stage.toLowerCase()}_g${grade}_t${semester}_u${unitNumber}_r5`,
          skill: 'Reading',
          question: `What conclusion can be drawn regarding effective language practice?`,
          options: [
            `Contextualized thematic reading deepens long-term retention and conceptual mastery`,
            `Students should avoid reading complete sentences`,
            `Exams should never include reading passages`,
            `Vocabulary has no relation to reading fluency`
          ],
          correctAnswer: 'A',
          explanation: 'Contextual reading fosters deeper understanding and enduring retention.'
        }
      ]
    },
    listeningModule: {
      audioTitle: `${unitTitle}: Audio Dialogue & Listening Comprehension`,
      speakerRoles: 'Teacher (Mr. Hazem) & Student (Salma)',
      transcript: `Mr. Hazem: Good morning, Salma. Today we are reviewing the core concepts of ${unitTitle}. What did you find most engaging?
Salma: Good morning, Mr. Hazem. I was fascinated by the practical applications of ${theme}. It connects our classroom learning directly to real-world situations in Egypt!
Mr. Hazem: Precisely. Remember that mastering both the vocabulary and the grammatical rules for ${ruleName} gives you the confidence to communicate fluently.
Salma: Thank you, Mr. Hazem! I will practice these drills thoroughly.`,
      durationApprox: '1 min 45 secs',
      exercises: [
        {
          id: `${stage.toLowerCase()}_g${grade}_t${semester}_u${unitNumber}_l1`,
          skill: 'Listening',
          question: `What aspect of the lesson did Salma find especially engaging?`,
          options: [
            `Connecting the theme of ${theme} directly to practical real-world situations`,
            `Leaving the classroom earlier than other students`,
            `Skipping the grammar explanation entirely`,
            `Watching a silent cartoon film`
          ],
          correctAnswer: 'A',
          explanation: 'Salma stated she was fascinated by the real-world applications of the theme.'
        },
        {
          id: `${stage.toLowerCase()}_g${grade}_t${semester}_u${unitNumber}_l2`,
          skill: 'Listening',
          question: `What two components did Mr. Hazem urge Salma to master for fluent communication?`,
          options: [
            `Painting brushes and canvas`,
            `Target vocabulary and the grammatical structures of ${ruleName}`,
            `Typing speed and mobile phone games`,
            `Singing loud songs during exams`
          ],
          correctAnswer: 'B',
          explanation: 'Mr. Hazem emphasized vocabulary alongside the grammar rules.'
        },
        {
          id: `${stage.toLowerCase()}_g${grade}_t${semester}_u${unitNumber}_l3`,
          skill: 'Listening',
          question: `What was Salma’s final stated resolution at the end of the conversation?`,
          options: [
            `To cancel her school registration`,
            `To avoid speaking English to her classmates`,
            `To practice the communicative exercises thoroughly`,
            `To forget everything she learned`
          ],
          correctAnswer: 'C',
          explanation: 'Salma resolved to practice the drills thoroughly.'
        },
        {
          id: `${stage.toLowerCase()}_g${grade}_t${semester}_u${unitNumber}_l4`,
          skill: 'Listening',
          question: `What educational tone best characterizes the dialogue between the teacher and student?`,
          options: [
            `Angry and confrontational`,
            `Bored and indifferent`,
            `Confused and unhelpful`,
            `Encouraging, supportive, and academically focused`
          ],
          correctAnswer: 'D',
          explanation: 'The conversation is positive, pedagogical, and supportive.'
        }
      ]
    },
    unitExam: {
      examId: `${stage.toLowerCase()}_g${grade}_t${semester}_u${unitNumber}_exam`,
      examTitle: `${gradeLabel} - Unit ${unitNumber} Assessment: ${unitTitle}`,
      examTitleAr: `امتحان تقييم الوحدة ${unitNumber} - ${gradeLabel}`,
      durationMinutes: 30,
      totalMarks: 32,
      questions: [
        {
          id: `${stage.toLowerCase()}_g${grade}_t${semester}_u${unitNumber}_ex1`,
          skill: 'Vocabulary',
          question: `Select the word that correctly fits the context: "${keyWordsList[0]?.word || 'Target word'}" refers to:`,
          options: [keyWordsList[0]?.meaningAr || 'المعنى المستهدف', 'خطأ عابر', 'تسلية مؤقتة', 'حالة سلبية'],
          correctAnswer: 'A',
          explanation: `The pedagogical Arabic meaning is ${keyWordsList[0]?.meaningAr}.`
        },
        {
          id: `${stage.toLowerCase()}_g${grade}_t${semester}_u${unitNumber}_ex2`,
          skill: 'Grammar',
          question: `In the context of ${ruleName}, which structure represents correct affirmative syntax?`,
          options: ['Incorrect inverted form', 'Standard target grammatical structure', 'Missing auxiliary verb form', 'Redundant double modal'],
          correctAnswer: 'B',
          explanation: `Choice B adheres strictly to the rules of ${ruleName}.`
        },
        {
          id: `${stage.toLowerCase()}_g${grade}_t${semester}_u${unitNumber}_ex3`,
          skill: 'Reading',
          question: `According to the unit reading passage, studying ${theme} enables learners to:`,
          options: ['Ignore societal issues', 'Avoid taking examinations', 'Synthesize ideas and formulate critical responses', 'Rely solely on mechanical memorization'],
          correctAnswer: 'C',
          explanation: 'The reading emphasizes synthesizing ideas and critical thinking.'
        },
        {
          id: `${stage.toLowerCase()}_g${grade}_t${semester}_u${unitNumber}_ex4`,
          skill: 'Listening',
          question: `Mr. Hazem emphasized that communicative confidence arises from mastering vocabulary and ___________.`,
          options: ['physical sports', 'social media browsing', 'computer games', 'accurate grammatical structures'],
          correctAnswer: 'D',
          explanation: 'Communicative fluency requires combining vocabulary with grammatical mastery.'
        },
        {
          id: `${stage.toLowerCase()}_g${grade}_t${semester}_u${unitNumber}_ex5`,
          skill: 'Vocabulary',
          question: `The collocation "make steady __________" expresses continuous improvement.`,
          options: ['progress', 'danger', 'damage', 'mistakes'],
          correctAnswer: 'A',
          explanation: 'The correct collocation is "make steady progress".'
        },
        {
          id: `${stage.toLowerCase()}_g${grade}_t${semester}_u${unitNumber}_ex6`,
          skill: 'Grammar',
          question: `Identify the appropriate negative formulation corresponding to ${ruleName}:`,
          options: ['Ungrammatical double negative', 'Standard grammatically correct negative form', 'Fragment lacking main predicate', 'Misplaced adverbial particle'],
          correctAnswer: 'B',
          explanation: 'Choice B correctly negates the target verb structure.'
        },
        {
          id: `${stage.toLowerCase()}_g${grade}_t${semester}_u${unitNumber}_ex7`,
          skill: 'Reading',
          question: `The primary benefit of contextualized thematic reading in modern education is that it:`,
          options: ['Eliminates the need for teachers', 'Makes textbooks obsolete', 'Fosters deeper cognitive understanding and long-term vocabulary retention', 'Shortens the academic school year'],
          correctAnswer: 'C',
          explanation: 'Contextual reading deepens conceptual mastery and vocabulary retention.'
        },
        {
          id: `${stage.toLowerCase()}_g${grade}_t${semester}_u${unitNumber}_ex8`,
          skill: 'Listening',
          question: `Salma expressed enthusiasm because the curriculum topics connect directly to:`,
          options: ['Ancient mythology only', 'Foreign video games', 'Fictional superhero movies', 'Real-world situations and contemporary Egyptian society'],
          correctAnswer: 'D',
          explanation: 'Salma highlighted the direct connection to real-world applications.'
        },
        {
          id: `${stage.toLowerCase()}_g${grade}_t${semester}_u${unitNumber}_ex9`,
          skill: 'Vocabulary',
          question: `Which term represents the target concept "${keyWordsList[1]?.meaningAr || 'Concept'}"?`,
          options: [keyWordsList[1]?.word || 'Target', 'Hesitation', 'Orphanage', 'Eviction'],
          correctAnswer: 'A',
          explanation: `The target lexical item is "${keyWordsList[1]?.word}".`
        },
        {
          id: `${stage.toLowerCase()}_g${grade}_t${semester}_u${unitNumber}_ex10`,
          skill: 'Grammar',
          question: `When answering a question formulated with ${ruleName}, the response should maintain:`,
          options: ['Random verb tenses', 'Consistent aspectual and tense agreement', 'Only nouns without verbs', 'No punctuation whatsoever'],
          correctAnswer: 'B',
          explanation: 'Tense and aspect consistency must be maintained across question and response.'
        },
        {
          id: `${stage.toLowerCase()}_g${grade}_t${semester}_u${unitNumber}_ex11`,
          skill: 'Reading',
          question: `Critical reading questions in the Egyptian national assessment assess the student’s ability to:`,
          options: ['Copy the first sentence of the text verbatim', 'Guess randomly without reading', 'Analyze nuances, infer implicit meanings, and evaluate perspectives', 'Count the total number of words on the page'],
          correctAnswer: 'C',
          explanation: 'Higher-order thinking questions measure inference, evaluation, and analysis.'
        },
        {
          id: `${stage.toLowerCase()}_g${grade}_t${semester}_u${unitNumber}_ex12`,
          skill: 'Listening',
          question: `What strategy did Salma decide to implement to ensure optimal mastery of the unit?`,
          options: ['Postponing all revision until exam morning', 'Leaving her assignments incomplete', 'Skipping all audio listening tracks', 'Practicing communicative and grammatical exercises diligently'],
          correctAnswer: 'D',
          explanation: 'Salma resolved to practice the communicative exercises thoroughly.'
        },
        {
          id: `${stage.toLowerCase()}_g${grade}_t${semester}_u${unitNumber}_ex13`,
          skill: 'Vocabulary',
          question: `A student who demonstrates commitment and hard work in their studies is described as:`,
          options: ['diligent', 'apathetic', 'lethargic', 'careless'],
          correctAnswer: 'A',
          explanation: '"Diligent" means showing care and conscientiousness in one’s work.'
        },
        {
          id: `${stage.toLowerCase()}_g${grade}_t${semester}_u${unitNumber}_ex14`,
          skill: 'Grammar',
          question: `Which option demonstrates accurate punctuation and clause linkage in ${ruleName}?`,
          options: ['Run-on sentence lacking commas', 'Correctly punctuated complex sentence structure', 'Comma splice connecting two independent clauses without conjunction', 'Unfinished sentence fragment'],
          correctAnswer: 'B',
          explanation: 'Choice B demonstrates correct syntactic linkage and punctuation.'
        },
        {
          id: `${stage.toLowerCase()}_g${grade}_t${semester}_u${unitNumber}_ex15`,
          skill: 'Reading',
          question: `The ultimate objective of the New Hello and Connect curricula is to empower learners to:`,
          options: ['Memorize isolated grammar rules in isolation', 'Avoid using English outside the classroom', 'Communicate effectively and think critically in an interconnected world', 'Replace their mother tongue entirely'],
          correctAnswer: 'C',
          explanation: 'The objective is effective communication and critical thinking.'
        },
        {
          id: `${stage.toLowerCase()}_g${grade}_t${semester}_u${unitNumber}_ex16`,
          skill: 'Listening',
          question: `The overall tone of the classroom dialogue reflects a learning environment founded on:`,
          options: ['Fear and severe punishment', 'Strict memorization without discussion', 'Total confusion and noise', 'Active engagement, encouragement, and collaborative guidance'],
          correctAnswer: 'D',
          explanation: 'The classroom environment models active engagement and constructive guidance.'
        }
      ]
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
        units: secondary1Term2Units.map(u => ({ ...u, track: 'General Secondary' as const, secondaryPath: 'general_secondary' as const })),
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
        semesterLabel: 'Term 2 - الفصل الدراسي الثاني',
        units: [
          createStandardUnit('Secondary', 11, 'Secondary 2', 'General Secondary', 2, 4, 'Living and Working Abroad', 'العمل والإقامة في الخارج (التكيف الثقافي)', 'Culture shock, international diplomacy, expatriates', 'Present Perfect Simple vs. Present Perfect Continuous', 'المضارع التام البسيط والمستمر والفروق الدقيقة', [
            { word: 'culture shock', meaningAr: 'صدمة التغير الثقافي', partOfSpeech: 'noun' },
            { word: 'expatriate', meaningAr: 'مغترب يعمل خارج وطنه', partOfSpeech: 'noun' }
          ]),
          createStandardUnit('Secondary', 11, 'Secondary 2', 'General Secondary', 2, 5, 'The Power of the Press', 'سلطة الصحافة والإعلام الرقمي', 'Investigative journalism, ethical reporting, fake news', 'Passive Voice across all continuous and perfect tenses', 'المبني للمجهول في جميع الأزمنة المتقدمة', [
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
        semesterLabel: 'Term 2 - الفصل الدراسي الثاني (Units 7 to 12 + Final Cumulative National Bank)',
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
