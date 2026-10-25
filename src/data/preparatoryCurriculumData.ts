import { GradeCurriculumCatalog, UnitCurriculum, PrepExamBlueprint } from '../types/curriculum.ts';
import {
  prep1Unit4, prep1Unit5, prep1Unit6,
  prep2Unit4, prep2Unit5, prep2Unit6,
  prep3Unit4, prep3Unit5, prep3Unit6
} from './preparatoryUnits4To6.ts';

// Helper to create enriched, authentic Preparatory units (New Hello Prep 1, 2, 3)
function createPrepUnit(
  grade: number,
  gradeLabel: string,
  semester: 1 | 2,
  unitNumber: number,
  unitTitle: string,
  unitTitleAr: string,
  theme: string,
  grammarRule: string,
  grammarRuleAr: string,
  grammarSummary: string,
  grammarSections: { title: string; explanation: string; examples: string[] }[],
  keyWords: { word: string; pos: string; ar: string; def: string; ex: string; exAr: string }[],
  collocations: { phrase: string; meaningAr: string; example: string }[],
  readingPassage: string,
  dialogueTranscript: string
): UnitCurriculum {
  const kw0 = keyWords[0] || { word: 'community', ar: 'مجتمع', def: 'a group of people living in the same place', ex: 'We must help our community.', exAr: 'يجب أن نساعد مجتمعنا.' };
  const kw1 = keyWords[1] || { word: 'volunteer', ar: 'متطوع', def: 'a person who works for free to help others', ex: 'He is a volunteer at the hospital.', exAr: 'هو متطوع في المستشفى.' };
  const kw2 = keyWords[2] || { word: 'proud', ar: 'فخور', def: 'feeling pleased about achievements', ex: 'Parents are proud of their children.', exAr: 'الآباء فخورون بأبنائهم.' };
  const coll0 = collocations[0] || { phrase: 'do voluntary work', meaningAr: 'يقوم بعمل تطوعي', example: 'They do voluntary work every weekend.' };
  const coll1 = collocations[1] || { phrase: 'make a decision', meaningAr: 'يتخذ قراراً', example: 'It is time to make a decision.' };

  const blueprint: PrepExamBlueprint = {
    dialogue: {
      title: `Finish the following dialogue about ${unitTitle}:`,
      context: `Two Egyptian prep students are discussing ${unitTitle.toLowerCase()} and school activities.`,
      turns: [
        {
          speaker: 'Hazem',
          text: `Hello, Omar! What are you learning about in Unit ${unitNumber}?`,
          isBlank: false
        },
        {
          speaker: 'Omar',
          isBlank: true,
          blankNumber: 1,
          expectedAnswer: `We are learning about ${unitTitle.toLowerCase()}.`,
          acceptableAnswers: [`We're studying ${unitTitle}.`, `It is about ${unitTitle}.`, `I'm reading about ${unitTitle}.`],
          hintAr: `أخبره بما تدرسونه في هذه الوحدة (${unitTitleAr})`
        },
        {
          speaker: 'Hazem',
          text: `That sounds interesting! What does the word "${kw0.word}" mean?`,
          isBlank: false
        },
        {
          speaker: 'Omar',
          isBlank: true,
          blankNumber: 2,
          expectedAnswer: `It means "${kw0.ar}" in Arabic.`,
          acceptableAnswers: [`It means ${kw0.ar}.`, `It means ${kw0.def}.`, `It means to help others.`],
          hintAr: `وضح معنى الكلمة بالعربية: ${kw0.ar}`
        },
        {
          speaker: 'Hazem',
          isBlank: true,
          blankNumber: 3,
          expectedAnswer: `How can we practice this in our daily life?`,
          acceptableAnswers: [`What should we do?`, `How do you apply it?`, `Can you give an example?`],
          hintAr: `اسأل سؤالاً عن كيفية التطبيق العملي`
        },
        {
          speaker: 'Omar',
          text: `We can ${coll0.phrase} and support our teachers and classmates.`,
          isBlank: false
        },
        {
          speaker: 'Hazem',
          text: `Do you think studying hard makes our parents proud?`,
          isBlank: false
        },
        {
          speaker: 'Omar',
          isBlank: true,
          blankNumber: 4,
          expectedAnswer: `Yes, of course, they feel very proud of us.`,
          acceptableAnswers: [`Yes, absolutely.`, `Yes, they do.`, `Certainly, they are proud.`],
          hintAr: `أجب بالإيجاب مؤكداً شعور الفخر`
        },
        {
          speaker: 'Hazem',
          isBlank: true,
          blankNumber: 5,
          expectedAnswer: `Thank you for sharing this inspiring information with me.`,
          acceptableAnswers: [`Thanks a lot!`, `Good luck with your studies.`, `Great, let us study together.`],
          hintAr: `عبّر عن الشكر أو تمني التوفيق`
        }
      ]
    },
    readingPassage: {
      title: `${unitTitle}: Official Comprehension Text`,
      passage: readingPassage,
      mcqs: [
        {
          id: `prep_g${grade}_u${unitNumber}_r_mcq1`,
          skill: 'Reading',
          difficulty: 'standard',
          question: `What is the general main idea of this reading passage?`,
          options: [
            `Understanding the fundamental concepts of ${unitTitle} and its societal value`,
            'Avoiding all extracurricular responsibilities at school',
            'Focusing purely on entertainment without academic effort',
            'Traveling abroad without planning or preparation'
          ],
          correctAnswer: 'A',
          explanation: `The passage explores the core theme of ${unitTitle} and practical life lessons.`,
          exam_trap_explanation: 'Examiners look for the holistic theme rather than isolated narrative details.'
        },
        {
          id: `prep_g${grade}_u${unitNumber}_r_mcq2`,
          skill: 'Reading',
          difficulty: 'hots',
          question: `In the passage, the word "${kw0.word}" contextually refers to:`,
          options: [
            kw0.def,
            'a sudden negative outcome',
            'an impossible educational challenge',
            'a temporary disagreement between peers'
          ],
          correctAnswer: 'A',
          explanation: `"${kw0.word}" is defined as: ${kw0.def}.`,
          exam_trap_explanation: 'Contextual synonym questions in Prep exams demand finding the standard lexical definition rather than colloquial usage.'
        },
        {
          id: `prep_g${grade}_u${unitNumber}_r_mcq3`,
          skill: 'Reading',
          difficulty: 'standard',
          question: `According to the text, how do successful students achieve their goals?`,
          options: [
            `By being persistent, disciplined, and practicing ${coll0.phrase}`,
            'By ignoring teacher guidance and studying alone',
            'By relying solely on last-minute memorization',
            'By postponing homework until the final week'
          ],
          correctAnswer: 'A',
          explanation: 'The text highlights consistency, ethical diligence, and collaboration.',
          exam_trap_explanation: 'Avoid distractors that contain negative or passive study habits.'
        }
      ],
      openEnded: [
        {
          id: `prep_g${grade}_u${unitNumber}_r_oe1`,
          question: `Infer from the passage: Why is "${kw0.word}" regarded as essential for Egyptian prep students?`,
          questionAr: `استنتج من النص: لماذا يُعد مفهوم (${kw0.ar}) ضرورياً لطلاب المرحلة الإعدادية في مصر؟`,
          modelAnswer: `It fosters personal responsibility, cooperative problem-solving, and civic commitment within the school and wider community.`,
          rubric: 'Relevance to text (1 Mark) · Grammatical and lexical correctness (1 Mark)',
          maxMarks: 2
        },
        {
          id: `prep_g${grade}_u${unitNumber}_r_oe2`,
          question: `Suggest a suitable alternative title for the reading passage, providing your rationale.`,
          questionAr: `اقترح عنواناً مناسباً آخر للنص القرائي مع ذكر السبب بإيجاز.`,
          modelAnswer: `A suitable title is "Pathways to Excellence in ${unitTitle}", because the text focuses on diligence, moral character, and purposeful learning.`,
          rubric: 'Appropriate title (1 Mark) · Valid logical reason (1 Mark)',
          maxMarks: 2
        }
      ]
    },
    vocabGrammarMcqs: [
      {
        id: `prep_g${grade}_u${unitNumber}_mcq1`,
        skill: 'Vocabulary',
        difficulty: 'standard',
        question: `The term "${kw0.word}" means ____________ in Arabic.`,
        options: [kw0.ar, 'إهمال متعمد', 'مغامرة خطيرة', 'خسارة مادية'],
        correctAnswer: 'A',
        explanation: `"${kw0.word}" corresponds directly to "${kw0.ar}".`,
        exam_trap_explanation: 'Beware of distractors that sound similar in Arabic but have completely unrelated meanings.'
      },
      {
        id: `prep_g${grade}_u${unitNumber}_mcq2`,
        skill: 'Vocabulary',
        difficulty: 'standard',
        question: `Which word is defined as: "${kw1.def}"?`,
        options: [kw1.word, 'nuisance', 'critic', 'pessimist'],
        correctAnswer: 'A',
        explanation: `"${kw1.word}" is defined as ${kw1.def}.`,
        exam_trap_explanation: 'Always verify the core definition provided in the New Hello Student Book.'
      },
      {
        id: `prep_g${grade}_u${unitNumber}_mcq3`,
        skill: 'Vocabulary',
        difficulty: 'hots',
        question: `Which academic collocation accurately completes: "Students should always ____________"?`,
        options: [coll0.phrase, 'break basic rules', 'lose their textbooks', 'quarrel constantly'],
        correctAnswer: 'A',
        explanation: `"${coll0.phrase}" is the official MOE target collocation for this unit.`,
        exam_trap_explanation: 'Collocation questions test natural word partnerships; verbs cannot be arbitrarily interchanged.'
      },
      {
        id: `prep_g${grade}_u${unitNumber}_mcq4`,
        skill: 'Grammar',
        difficulty: 'standard',
        question: `Identify the grammatically correct sentence illustrating: ${grammarRule}:`,
        options: [
          grammarSections[0]?.examples[0] || 'He always completes his homework on time.',
          'He don’t complete his homework.',
          'They was finishing yesterday.',
          'She have completed two book.'
        ],
        correctAnswer: 'A',
        explanation: `Follows the target grammar rule: ${grammarSections[0]?.explanation}`,
        exam_trap_explanation: 'Watch for subject-verb agreement pitfalls like "he don’t" or auxiliary confusion.'
      },
      {
        id: `prep_g${grade}_u${unitNumber}_mcq5`,
        skill: 'Grammar',
        difficulty: 'hots',
        question: `Choose the correct form according to Egyptian Ministry specifications:`,
        options: [
          grammarSections[0]?.examples[1] || 'We are looking forward to achieving high scores.',
          'We looking forward achieve high scores.',
          'We look forward achieve score.',
          'We are looked forward achieving.'
        ],
        correctAnswer: 'A',
        explanation: 'Follows proper tense, verb complementation, and structural rules.',
        exam_trap_explanation: 'Ministry examinations frequently test verbs followed by gerunds or specific prepositions.'
      },
      {
        id: `prep_g${grade}_u${unitNumber}_mcq6`,
        skill: 'Grammar',
        difficulty: 'hots',
        question: `In a ministerial dialogue question, which answer structure is fully accurate?`,
        options: [
          grammarSections[1]?.examples[0] || 'Yes, I usually do because it benefits everyone.',
          'Yes, I does because it good.',
          'No, he didn’t went to school.',
          'Because she are very intelligent.'
        ],
        correctAnswer: 'A',
        explanation: 'Maintains consistent tense and auxiliary verb alignment.',
        exam_trap_explanation: 'Remember that "didn’t" must be followed by infinitive, and third-person pronouns require singular verbs.'
      }
    ],
    errorCorrection: [
      {
        id: `prep_g${grade}_u${unitNumber}_err1`,
        sentence: `He (not like) waking up late on school mornings.`,
        bracketWord: 'not like',
        correctWord: "doesn't like",
        explanation: `In the present simple with singular subject "he", negative form is "doesn't + infinitive".`,
        explanationAr: `مع المفرد الغائب (He) يُنفى المضارع البسيط باستخدام doesn't + المصدر.`,
        exam_trap_explanation: 'Do not write "don’t like" or "isn’t like".'
      },
      {
        id: `prep_g${grade}_u${unitNumber}_err2`,
        sentence: `They are keen on (read) informative historical articles.`,
        bracketWord: 'read',
        correctWord: 'reading',
        explanation: `Prepositions such as "on", "in", "at", and "about" are followed by the verb-ing (gerund).`,
        explanationAr: `حروف الجر يتبعها دائماً اسم أو فعل مضاف له -ing.`,
        exam_trap_explanation: 'Students frequently forget to add -ing after prepositions like "keen on".'
      },
      {
        id: `prep_g${grade}_u${unitNumber}_err3`,
        sentence: `How (many) water do you drink during summer days?`,
        bracketWord: 'many',
        correctWord: 'much',
        explanation: `Water is an uncountable noun, so we ask about its quantity using "How much", not "How many".`,
        explanationAr: `الماء اسم لا يُعد وبالتالي نستخدم How much وليس How many.`,
        exam_trap_explanation: 'Remember: "How many" is strictly for countable plural nouns.'
      },
      {
        id: `prep_g${grade}_u${unitNumber}_err4`,
        sentence: `Yesterday, Omar (go) to the Cairo International Book Fair.`,
        bracketWord: 'go',
        correctWord: 'went',
        explanation: `"Yesterday" is an explicit time marker signaling the past simple tense, so the irregular past of "go" is "went".`,
        explanationAr: `كلمة Yesterday تدل على الماضي البسيط، والتصريف الثاني لفعل go هو went.`,
        exam_trap_explanation: 'Avoid adding -ed to irregular verbs like "goed".'
      }
    ],
    writingTask: {
      type: 'paragraph',
      title: `Write a paragraph of (90-110) words on: "${unitTitle}"`,
      prompt: `Write a coherent, well-structured paragraph of about 90 to 110 words discussing "${unitTitle}". Highlight key vocabulary (${kw0.word}, ${kw1.word}), describe how young Egyptians apply these values, and conclude with a piece of moral advice for your peers.`,
      promptAr: `اكتب فقرة من 90 إلى 110 كلمات عن "${unitTitleAr}"، موظفاً المفردات الأساسية والنصائح الإيجابية.`,
      targetWords: '90 - 110 words',
      guidancePoints: [
        `Introduce the importance of ${unitTitle.toLowerCase()} in our lives.`,
        `Describe how students can ${coll0.phrase} and cooperate with each other.`,
        'Conclude with an encouraging summary advice for fellow classmates.'
      ],
      modelAnswer: `${unitTitle} plays a vital role in our daily lives and educational journey. As Egyptian prep students, it is essential to understand that dedication, cooperation, and respect form the foundation of our success. For instance, when we ${coll0.phrase}, we not only assist our community but also develop essential life skills. Moreover, being ${kw2.word} of our heritage encourages us to study harder. In conclusion, every student should embrace positive values, respect teachers, and strive to build a brighter future for Egypt.`,
      rubricCriteria: [
        { criterion: 'Task Relevance & Ideas (Content)', marks: 4 },
        { criterion: 'Vocabulary Choice & Collocations', marks: 3 },
        { criterion: 'Grammar Accuracy & Punctuation', marks: 3 }
      ]
    }
  };

  return {
    stage: 'Preparatory',
    grade,
    gradeLabel,
    track: 'New Hello',
    semester,
    unitNumber,
    unitTitle,
    unitTitleAr,
    theme,
    vocabularyModule: {
      keyWords: keyWords.map(kw => ({
        word: kw.word,
        pos: kw.pos,
        partOfSpeech: kw.pos,
        ar: kw.ar,
        meaningAr: kw.ar,
        def: kw.def,
        meaningEn: kw.def,
        ex: kw.ex,
        exampleSentence: kw.ex,
        exAr: kw.exAr
      })),
      collocations: collocations.map(c => ({
        phrase: c.phrase,
        meaningAr: c.meaningAr,
        example: c.example
      })),
      exercises: blueprint.vocabGrammarMcqs.slice(0, 3)
    },
    grammarModule: {
      ruleName: grammarRule,
      ruleNameAr: grammarRuleAr,
      explanationSummary: grammarSummary,
      detailedRules: grammarSections,
      exercises: blueprint.vocabGrammarMcqs.slice(3, 6)
    },
    readingModule: {
      passageTitle: blueprint.readingPassage.title,
      passage: blueprint.readingPassage.passage,
      criticalThinkingFocus: `Analytical inference on ${theme}`,
      questions: blueprint.readingPassage.mcqs
    },
    listeningModule: {
      audioTitle: `${unitTitle}: Official Curriculum Dialogue Track`,
      speakerRoles: 'Student A & Student B',
      transcript: dialogueTranscript,
      durationApprox: '3 mins'
    },
    unitExam: {
      examId: `prep_g${grade}_u${unitNumber}_exam`,
      examTitle: `Prep ${grade - 6} - Unit ${unitNumber} MOE Standard Assessment (2026/2027)`,
      examTitleAr: `امتحان تقييم الوحدة ${unitNumber} - الصف ${grade === 7 ? 'الأول' : grade === 8 ? 'الثاني' : 'الثالث'} الإعدادي`,
      durationMinutes: 30,
      totalMarks: 30,
      stage: 'Preparatory',
      questions: [
        ...blueprint.vocabGrammarMcqs,
        ...blueprint.readingPassage.mcqs
      ],
      prepBlueprint: blueprint
    }
  };
}

// ------------------------------------------------------------------------------------------------
// PREPARATORY STAGE CATALOG (NEW HELLO PREP 1, 2, 3 - GRADES 7, 8, 9)
// ------------------------------------------------------------------------------------------------
export const preparatoryCurriculumCatalog: GradeCurriculumCatalog[] = [
  // ----------------------------------------------------------------------------------------------
  // PREP 1 (GRADE 7 - NEW HELLO PREP 1)
  // ----------------------------------------------------------------------------------------------
  {
    stage: 'Preparatory',
    grade: 7,
    gradeLabel: 'Prep 1 - الصف الأول الإعدادي',
    gradeLabelAr: 'الصف الأول الإعدادي (New Hello Prep 1 - 2026/2027)',
    track: 'New Hello',
    description: 'Family bonds, volunteer work, school schedules, subjects, inspirational Egyptian personalities, past weekend outings, and world wonders.',
    semesters: [
      {
        semester: 1,
        semesterLabel: 'Term 1 - الفصل الدراسي الأول (Units 1 to 6 - New Hello)',
        units: [
          // Unit 1: My Family and Me
          createPrepUnit(
            7, 'Prep 1', 1, 1, 'My Family and Me', 'عائلتي وأنا (العمل التطوعي والهوايات)',
            'Family relations, musical instruments, voluntary work, chess, twins, orphanages',
            'Possessive Adjectives vs. Possessive Pronouns & Present Simple',
            'صفات وضمائر الملكية والمضارع البسيط',
            'Possessive adjectives (my, your, his, her, our, their) are followed by a NOUN. Possessive pronouns (mine, yours, his, hers, ours, theirs) stand alone WITHOUT a noun. Present Simple expresses permanent facts and repeated habits.',
            [
              {
                title: '1. Possessives Masterclass (صفات وضمائر الملكية)',
                explanation: 'Rule: Possessive Adjective + Noun ("This is my bag"). Possessive Pronoun stands alone ("This bag is mine"). Notice that "its" has no possessive pronoun form.',
                examples: [
                  'This is my tennis racket, and that blue one is yours.',
                  'Hany gave his sister her novel, but he forgot his.'
                ]
              },
              {
                title: '2. Ministry Dialogue Strategy: How to Solve Dialogue Questions (دليل إتقان المحادثة)',
                explanation: 'Step 1: Read the full dialogue to understand context and roles. Step 2: Form Yes/No questions with Aux + Subj + Verb ("Do you play chess? - Yes, I do"). Step 3: Form Wh-questions with Wh-word + Aux + Subj + Verb ("Where do you do voluntary work? - At the children’s hospital").',
                examples: [
                  'Q: Where do you do voluntary work? — A: I do voluntary work at the children’s hospital.',
                  'Q: Can you play the drums? — A: Yes, I can play the drums in the school band.'
                ]
              }
            ],
            [
              { word: 'voluntary', pos: 'adj.', ar: 'تطوعي بدون أجر', def: 'Done willingly without being paid, for charity.', ex: 'Hany does voluntary work at the children’s hospital every Saturday.', exAr: 'يقوم هاني بعمل تطوعي في مستشفى الأطفال كل يوم سبت.' },
              { word: 'twins', pos: 'n.', ar: 'توأم متطابق أو متآخٍ', def: 'Two children born to the same mother at the same time.', ex: 'Hazem and Hatem are identical twins; they have the same smile.', exAr: 'حازم وحاتم توأم متطابق، ولديهما نفس الابتسامة.' },
              { word: 'drums', pos: 'n.', ar: 'طبول وآلات إيقاعية', def: 'A musical percussion instrument played with sticks.', ex: 'Rami plays the drums rhythmically in the school musical band.', exAr: 'يعزف رامي على الطبول بإيقاع رائع في فرقة المدرسة الموسيقية.' },
              { word: 'orphanage', pos: 'n.', ar: 'دار رعاية الأيتام', def: 'A residential institution devoted to the care of orphans.', ex: 'Our class visited the local orphanage to donate storybooks.', exAr: 'زار فصلنا دار الأيتام المحلية للتبرع بالقصص المصورة.' },
              { word: 'chess', pos: 'n.', ar: 'لعبة الشطرنج الاستراتيجية', def: 'A board game of strategic skill for two players.', ex: 'My grandfather taught me to play chess patiently.', exAr: 'علمني جدي كيف ألعب الشطرنج بصبر وذكاء.' },
              { word: 'band', pos: 'n.', ar: 'فرقة موسيقية مدرسية', def: 'A group of musicians who play music together.', ex: 'The school band won first prize in the national music contest.', exAr: 'فازت فرقة المدرسة الموسيقية بالجائزة الأولى في مسابقة الموسيقى.' },
              { word: 'interview', pos: 'n.', ar: 'مقابلة حوارية رسمية', def: 'A meeting of people face to face for consultation.', ex: 'The school radio broadcaster conducted an interview with our top athlete.', exAr: 'أجرى مذيع إذاعة المدرسة مقابلة مع بطلنا الرياضي المتفوق.' },
              { word: 'hobby', pos: 'n.', ar: 'هواية واهتمام شخصي', def: 'An activity done regularly in one’s leisure time for pleasure.', ex: 'Reading historical biographies is my favorite leisure hobby.', exAr: 'قراءة السير التاريخية هي هوايتي المفضلة في وقت الفراغ.' },
              { word: 'granddaughter', pos: 'n.', ar: 'الحفيدة', def: 'The daughter of someone’s son or daughter.', ex: 'Grandmother smiles whenever she hugs her young granddaughter.', exAr: 'تبتسم الجدة كلما احتضنت حفيدتها الصغيرة.' },
              { word: 'grandson', pos: 'n.', ar: 'الحفيد', def: 'The son of someone’s son or daughter.', ex: 'Grandpa is proud of his hardworking grandson.', exAr: 'يفتخر الجد بحفيده المجتهد المتفوق.' },
              { word: 'male', pos: 'adj. / n.', ar: 'مذكر / ذكر', def: 'Relating to the sex that produces gametes, especially spermatozoa.', ex: 'All male and female students participate in sports day.', exAr: 'يشارك جميع الطلاب الذكور والإناث في اليوم الرياضي.' },
              { word: 'female', pos: 'adj. / n.', ar: 'مؤنث / أنثى', def: 'Relating to the sex that can bear offspring.', ex: 'The female handball team won the national cup.', exAr: 'فاز فريق كرة اليد للإناث بكأس البطولة القومية.' },
              { word: 'cousin', pos: 'n.', ar: 'ابن أو ابنة العم/الخال', def: 'A child of one’s uncle or aunt.', ex: 'My cousin Tamer lives next door to us.', exAr: 'يعيش ابن عمي تامر في المنزل المجاور لنا.' },
              { word: 'diary', pos: 'n.', ar: 'مذكرات ويوميات شخصية', def: 'A daily written record of personal events and feelings.', ex: 'Hannah writes down her reflections in her secret diary every night.', exAr: 'تدون هنا خواطرها في دفتر يومياتها كل ليلة.' },
              { word: 'athletics', pos: 'n.', ar: 'ألعاب القوى والجمباز', def: 'Physical sports such as running, jumping, and throwing.', ex: 'Habiba Marzouk excels in international rhythmic gymnastics athletics.', exAr: 'تتفوق حبيبة مرزوق في منافسات ألعاب القوى والجمباز الإيقاعي الدولي.' },
              { word: 'gymnast', pos: 'n.', ar: 'لاعب جمباز محترف', def: 'A person trained in gymnastics exercises.', ex: 'An Olympic gymnast trains for six hours every single day.', exAr: 'يتدرب لاعب الجمباز الأولمبي ست ساعات كل يوم.' },
              { word: 'busy', pos: 'adj.', ar: 'مشغول بأعمال مفيدة', def: 'Having a great deal to do; occupied.', ex: 'Even when she is busy, she balances study with rigorous sports training.', exAr: 'حتى عندما تكون مشغولة، توازن بين دراستها وتدريبها الرياضي الشاق.' },
              { word: 'balance', pos: 'v.', ar: 'يوازن بين متطلبات الحياة', def: 'To keep or put in a steady position; equalize.', ex: 'Top students balance study, family time, and healthy athletic exercise.', exAr: 'يوازن الطلاب المتفوقون بين الدراسة ووقت العائلة والرياضة الصحية.' },
              { word: 'train', pos: 'v.', ar: 'يتدرب بجدية', def: 'To undergo a course of exercise and education in skill.', ex: 'Swimmers train hard to qualify for the national championships.', exAr: 'يتدرب السباحون بجد للتأهل لبطولات الجمهورية.' },
              { word: 'achieve', pos: 'v.', ar: 'يحقق وينجز الأهداف', def: 'Successfully bring about or reach a desired objective by effort.', ex: 'With persistent dedication, Egyptian youth achieve their ambitious dreams.', exAr: 'بالعزيمة والإصرار، يحقق الشباب المصري أحلامهم الطموحة.' }
            ],
            [
              { phrase: 'do voluntary work', meaningAr: 'يقوم بعمل تطوعي خيري', example: 'Our scouts group does voluntary work at the community center.' },
              { phrase: 'play musical instruments', meaningAr: 'يعزف على آلات موسيقية', example: 'Students learn to play musical instruments in music class.' },
              { phrase: 'balance school and sport', meaningAr: 'يوازن بين المدرسة والرياضة', example: 'Champions know how to balance school and competitive sport.' },
              { phrase: 'listen to the teacher', meaningAr: 'ينصت للمعلم باهتمام', example: 'Attentive students always listen to the teacher carefully.' },
              { phrase: 'proud of her achievements', meaningAr: 'فخور بإنجازاتها وبطولاتها', example: 'Egypt is proud of Habiba Marzouk’s gymnastics achievements.' }
            ],
            'Family life and personal dedication shape young Egyptians! Hazem and Hatem are twin brothers who attend prep school in Giza. Both boys are passionate about sports and community service. Every Friday afternoon, they visit an orphanage in their neighborhood to teach young children how to play chess and read English stories. "Voluntary work makes our hearts full of happiness," Hazem says. Their sister, Salma, is a dedicated gymnast who trains five hours a day. She balances her academic curriculum with rigorous athletics, dreaming of representing Egypt at the Olympic Games.',
            'Hazem: "Hello, Rami! What are your plans for this weekend?"\nRami: "Hello, Hazem! My twin brother and I are doing voluntary work at the children’s hospital."\nHazem: "That is wonderful! Do you play musical instruments there?"\nRami: "Yes, I play the drums and Hatem plays the guitar to cheer up the children."'
          ),

          // Unit 2: It's My Favorite Subject
          createPrepUnit(
            7, 'Prep 1', 1, 2, 'It’s My Favorite Subject', 'مادتي المفضلة والجدول المدرسي',
            'School subjects, timetable, library, school bell, daily routine, computer studies',
            'Possessive (’s / s’) & Adverbs of Frequency with Prepositions of Time',
            'الملكية وظروف التكرار وحروف جر الوقت',
            'Use singular (’s) for singular nouns: "the teacher’s book". Use (s’) for regular plurals ending in s: "the girls’ school". For irregular plurals, use (’s): "the children’s playground". Prepositions of time: "at + time" (at 7:30), "on + days" (on Monday), "in + months/parts of day" (in the morning).',
            [
              {
                title: '1. Possessive (’s / s’) Rules (قواعد الملكية الدقيقة)',
                explanation: 'Singular noun -> add ’s: "My sister’s pen". Regular plural -> add only apostrophe ’: "The boys’ bags". Irregular plural without s -> add ’s: "The children’s library".',
                examples: [
                  'This is the girls’ playground; the boys’ playground is across the field.',
                  'The teacher’s red pen is on the desk.'
                ]
              },
              {
                title: '2. Adverbs of Frequency & Position (موقع ظروف التكرار)',
                explanation: 'Always (100%), Usually (80%), Often (70%), Sometimes (50%), Never (0%). They go BEFORE main verbs, but AFTER verb "to be" (am/is/are).',
                examples: [
                  'We always listen to our computer studies teacher.',
                  'Hany is never late for the morning assembly.'
                ]
              }
            ],
            [
              { word: 'timetable', pos: 'n.', ar: 'جدول الحصص الدراسية', def: 'A chart showing the departure and arrival times or class schedules.', ex: 'Check your weekly school timetable to see when science class meets.', exAr: 'تحقق من جدول حصصك الأسبوعي لمعرفة موعد حصة العلوم.' },
              { word: 'drama', pos: 'n.', ar: 'المسرح والفنون التمثيلية', def: 'The performance of plays or theater as a school subject.', ex: 'We act out historical scenes during our weekly drama lessons.', exAr: 'نمثل مشاهد تاريخية خلال حصص الدراما والمسرح الأسبوعية.' },
              { word: 'computer studies', pos: 'n.', ar: 'مادة الحاسب الآلي وتكنولوجيا المعلومات', def: 'The study of computer hardware, programming, and software.', ex: 'In computer studies, we learned how to design interactive presentations.', exAr: 'في مادة الحاسب الآلي، تعلمنا كيفية تصميم عروض تقديمية تفاعلية.' },
              { word: 'bell', pos: 'n.', ar: 'جرس الحصة المدرسية', def: 'A metal instrument that rings to signal the start or end of a lesson.', ex: 'The school bell rings at eight o’clock to begin our first class.', exAr: 'يرن جرس المدرسة في تمام الثامنة لبدء الحصة الأولى.' },
              { word: 'library', pos: 'n.', ar: 'المكتبة المدرسية', def: 'A room containing collections of books and periodicals for reading.', ex: 'Students borrow encyclopedias and science books from the library.', exAr: 'يستعير الطلاب الموسوعات وكتب العلوم من المكتبة.' },
              { word: 'break', pos: 'n.', ar: 'الفسحة المدرسية ووقت الراحة', def: 'A pause in work or during the school day for recreation.', ex: 'During the break, we eat our healthy snacks and chat in the playground.', exAr: 'أثناء الفسحة، نتناول وجباتنا الخفيفة الصحية ونتحادث في الفناء.' },
              { word: 'hall', pos: 'n.', ar: 'فناء / ردهة المدرسة الكبرى', def: 'A large room in a school for assemblies and community gatherings.', ex: 'All students gather in the main assembly hall for the principal’s speech.', exAr: 'يجتمع جميع الطلاب في ردهة المدرسة الكبرى للاستماع لكلمة المدير.' },
              { word: 'typical', pos: 'adj.', ar: 'نموذجي ومعتاد في الروتين', def: 'Having the distinctive qualities of a particular type of person or thing.', ex: 'On a typical weekday, my alarm rings at six o’clock in the morning.', exAr: 'في يوم دراسي نموذجي، يرن منبهي في السادسة صباحاً.' },
              { word: 'quarter past', pos: 'idiom', ar: 'وربع (في التوقيت: 15 دقيقة)', def: 'Fifteen minutes past the specified hour.', ex: 'Our math period starts promptly at quarter past nine.', exAr: 'تبدأ حصة الرياضيات بدقة في التاسعة والربع.' },
              { word: 'quarter to', pos: 'idiom', ar: 'إلا ربع (في التوقيت: 45 دقيقة)', def: 'Fifteen minutes before the specified hour.', ex: 'We pack our backpacks at quarter to two in the afternoon.', exAr: 'نجمع حقائبنا المدرسية في تمام الثانية إلا ربع ظهراً.' },
              { word: 'religion', pos: 'n.', ar: 'التربية الدينية والأخلاق', def: 'The school subject covering moral values and spiritual teachings.', ex: 'Religious education promotes honesty, tolerance, and respect for all.', exAr: 'تعزز مادة التربية الدينية الصدق والتسامح والاحترام للجميع.' },
              { word: 'science', pos: 'n.', ar: 'العلوم والاكتشافات', def: 'The intellectual study of the physical and natural world through observation.', ex: 'We conducted an exciting experiment in the science laboratory.', exAr: 'أجرينا تجربة مشوقة ومثيرة في معمل العلوم.' },
              { word: 'social studies', pos: 'n.', ar: 'الدراسات الاجتماعية والجغرافيا', def: 'The study of human society, geography, and Egyptian history.', ex: 'Social studies teaches us about the pharaohs and the geography of the Nile.', exAr: 'تعلمنا الدراسات الاجتماعية عن الفراعنة وجغرافيا نهر النيل.' },
              { word: 'home economics', pos: 'n.', ar: 'مادة الاقتصاد المنزلي', def: 'Cooking and other aspects of household management taught in school.', ex: 'Students learn healthy cooking skills in home economics.', exAr: 'يتعلم الطلاب مهارات الطهي الصحي في حصة الاقتصاد المنزلي.' },
              { word: 'art', pos: 'n.', ar: 'التربية الفنية والرسم', def: 'The expression of human creative skill and imagination.', ex: 'I painted a panoramic view of the Citadel in my art class.', exAr: 'رسمت لوحة بانورامية لقلعة صلاح الدين في حصة التربية الفنية.' },
              { word: 'languages', pos: 'n.', ar: 'اللغات الحية (العربية والإنجليزية)', def: 'Systems of communication used by particular countries or communities.', ex: 'Mastering foreign languages opens doors to international scholarships.', exAr: 'إتقان اللغات الأجنبية يفتح الأبواب للمنح الدراسية الدولية.' },
              { word: 'punctual', pos: 'adj.', ar: 'منضبط ودقيق في المواعيد', def: 'Happening or doing something at the agreed or proper time.', ex: 'Punctual students arrive before the school gate closes.', exAr: 'يصل الطلاب المنضبطون قبل إغلاق بوابة المدرسة.' },
              { word: 'journey', pos: 'n.', ar: 'رحلة يومية إلى المدرسة', def: 'An act of travelling from one place to another.', ex: 'My daily journey to school takes twenty minutes by metro.', exAr: 'تستغرق رحلتي اليومية إلى المدرسة عشرين دقيقة بالمترو.' },
              { word: 'canoe', pos: 'n.', ar: 'زورق خفيف للتنقل المائي', def: 'A narrow, light boat propelled with a paddle.', ex: 'In some river communities, children travel to school in a canoe.', exAr: 'في بعض المجتمعات النهرية، يسافر الأطفال إلى المدرسة في زورق.' },
              { word: 'snowmobile', pos: 'n.', ar: 'مركبة جليدية للتنقل الشتوي', def: 'A motorized vehicle for traveling over snow.', ex: 'In polar regions, children ride a snowmobile over winter ice.', exAr: 'في المناطق القطبية، يركب الأطفال مركبة جليدية فوق الثلج.' }
            ],
            [
              { phrase: 'ring the school bell', meaningAr: 'يرن جرس المدرسة للحصص', example: 'The janitor rings the school bell at the end of each period.' },
              { phrase: 'borrow books from the library', meaningAr: 'يستعير كتباً من المكتبة', example: 'We borrow illustrated history books from the library.' },
              { phrase: 'have computer studies', meaningAr: 'يحضر حصة الحاسب الآلي', example: 'We have computer studies on Tuesday morning.' },
              { phrase: 'on school days', meaningAr: 'في الأيام الدراسية', example: 'I wake up at half past six on school days.' },
              { phrase: 'a long journey to school', meaningAr: 'رحلة طويلة للوصول للمدرسة', example: 'Walking through desert dunes is a long journey to school for some children.' }
            ],
            'A typical day at an Egyptian preparatory school is vibrant and purposeful! At quarter to eight, students assemble in the courtyard for the morning salute to the flag. When the bell rings at eight o’clock, we move to our classrooms. My favorite subject is computer studies because our teacher shows us how to program creative educational games. On Wednesdays, we have two periods of science in the modern laboratory, followed by art. During break, students sit in the courtyard to eat sandwiches, while others visit the library to borrow books.',
            'Amira: "What’s your favorite subject on today’s timetable, Dina?"\nDina: "My favorite subject is English! We have it at quarter past ten."\nAmira: "Who is your English teacher this term?"\nDina: "Miss Mona is our teacher. She is always energetic and kind."'
          ),

          // Unit 3: Different People
          createPrepUnit(
            7, 'Prep 1', 1, 3, 'Different People', 'شخصيات ملهمة وملامح متنوعة',
            'Physical features (curly, straight, blonde, dark, beard, mustache), Mohamed Salah, Alice in Wonderland, kindness',
            'Have got / Has got & Modal Can / Can’t for Abilities',
            'التعبير عن الملامح الجسدية بفعل Have got والقدرة بـ Can',
            'I/You/We/They have got (haven’t got). He/She/It has got (hasn’t got). Question: "Has he got dark curly hair? - Yes, he has." Modal CAN + base verb expresses physical and mental ability: "He can run very fast".',
            [
              {
                title: '1. Describing Physical Appearance (وصف الملامح الجسدية)',
                explanation: 'Form: Subject + have/has got + adjective + hair/eyes. Remember: Adjectives go in order: Size -> Shape -> Color -> Noun ("She has got long curly dark hair").',
                examples: [
                  'Mohamed Salah has got curly dark hair and a neat beard.',
                  'Alice has got straight blonde hair and curious bright eyes.'
                ]
              },
              {
                title: '2. Expressing Abilities with Can / Can’t (التعبير عن القدرات)',
                explanation: 'Form: Subject + can / cannot (can’t) + infinitive without to. Question: "Can you score goals? - Yes, I can."',
                examples: [
                  'Mohamed Salah can run fast and score sensational goals.',
                  'He is generous, so he can give donations to help his village.'
                ]
              }
            ],
            [
              { word: 'curly', pos: 'adj.', ar: 'شعر مجعد / كيرلي', def: 'Having curls, waves, or spirals.', ex: 'Mohamed Salah is famous for his trademark curly hair.', exAr: 'يشتهر محمد صلاح بشعره المجعد المميز.' },
              { word: 'straight', pos: 'adj.', ar: 'شعر أملس وناعم', def: 'Extending or moving uniformly in one direction without a curve.', ex: 'Noura has got straight brown hair tied with a ribbon.', exAr: 'لدى نورا شعر أملس بني ومربوط بشريطة أنيقة.' },
              { word: 'dark', pos: 'adj.', ar: 'داكن / أسود اللون', def: 'Having a color reflecting little light, such as black or dark brown.', ex: 'Many Egyptians have got striking dark eyes and lashes.', exAr: 'يمتلك العديد من المصريين عيوناً ورموشاً داكنة وجذابة.' },
              { word: 'blonde', pos: 'adj.', ar: 'أشقر الشعر', def: 'Having fair or pale yellow hair.', ex: 'Alice in Wonderland is depicted with long blonde hair.', exAr: 'تُوصف أليس في بلاد العجائب بأنها ذات شعر أشقر طويل.' },
              { word: 'beard', pos: 'n.', ar: 'لحية مهذبة', def: 'A growth of hair on the chin and lower cheeks of a man’s face.', ex: 'Our grandfather trims his distinguished grey beard every Friday.', exAr: 'يهذب جدنا لحيته الرمادية الموقرة كل يوم جمعة.' },
              { word: 'mustache', pos: 'n.', ar: 'شارب / شنب', def: 'A strip of hair left to grow on the upper lip.', ex: 'Uncle Ahmed wears a traditional Egyptian mustache.', exAr: 'يتميز العم أحمد بشارب مصري تقليدي مهذب.' },
              { word: 'generous', pos: 'adj.', ar: 'كريم ومعطاء لأهله', def: 'Showing a readiness to give more of something than is strictly necessary.', ex: 'Mohamed Salah is generous; he built a school and hospital in his village.', exAr: 'محمد صلاح كريم؛ فقد بنى مدرسة ومستشفى في قريته الأصلية.' },
              { word: 'sensible', pos: 'adj.', ar: 'عاقل وحكيم في تصرفاته', def: 'Chosen in accordance with wisdom or prudence; reasonable.', ex: 'Alice tries to make sensible decisions in a world of nonsense.', exAr: 'تحاول أليس اتخاذ قرارات عاقلة وحكيمة في عالم العجائب.' },
              { word: 'brave', pos: 'adj.', ar: 'شجاع وجريء', def: 'Ready to face and endure danger or pain; showing courage.', ex: 'The brave firefighter rescued the scared kitten from the tree.', exAr: 'أنقذ رجل الإطفاء الشجاع القطة الخائفة من أعلى الشجرة.' },
              { word: 'strange', pos: 'adj.', ar: 'غريب وغير مألوف', def: 'Unusual, unexpected, or surprising in a way that causes curiosity.', ex: 'Alice encountered many strange talking animals in Wonderland.', exAr: 'قابلت أليس العديد من الحيوانات الناطقة الغريبة في بلاد العجائب.' },
              { word: 'score', pos: 'v.', ar: 'يسجل ويحرز أهدافاً', def: 'Gain a point or goal in a competitive game or match.', ex: 'The striker was thrilled to score the decisive goal in the 90th minute.', exAr: 'فرح المهاجم كثيراً بتسجيل الهدف الحاسم في الدقيقة التسعين.' },
              { word: 'fan', pos: 'n.', ar: 'مشجع ومحب وفيّ', def: 'A person who has a strong interest in or admiration for sports.', ex: 'Millions of passionate Egyptian football fans cheered for the national team.', exAr: 'هتف الملايين من مشجعي كرة القدم المصريين المخلصين لمنتخبهم الوطني.' },
              { word: 'donation', pos: 'n.', ar: 'تبرع مالي أو عيني للخير', def: 'Something that is given to a charity, especially money.', ex: 'Generous citizens give donations to build children’s cancer wards.', exAr: 'يقدم المواطنون الكرماء تبرعات لبناء أقسام علاج سرطان الأطفال.' },
              { word: 'character', pos: 'n.', ar: 'شخصية في قصة أو رواية', def: 'A person in a novel, play, or movie.', ex: 'The Queen of Hearts is a bossy character in the story.', exAr: 'ملكة القلوب شخصية متسلطة في القصة.' },
              { word: 'speed', pos: 'n.', ar: 'سرعة حركية فائقة', def: 'The rate at which someone or something is able to move or operate.', ex: 'Salah’s incredible running speed terrifies European defenders.', exAr: 'سرعة صلاح الفائقة في الجري تخيف مدافعي الفرق الأوروبية.' },
              { word: 'smile', pos: 'n. / v.', ar: 'ابتسامة مشرقة', def: 'A pleased, kind, or amused facial expression.', ex: 'He always greets young fans with a warm, humble smile.', exAr: 'يرحب دائماً بالمشجعين الصغار بابتسامة دافئة ومتواضعة.' },
              { word: 'glasses', pos: 'n.', ar: 'نظارة طبية للقراءة', def: 'A pair of lenses set in a frame worn on the face to aid sight.', ex: 'My grandfather wears reading glasses to read the morning newspaper.', exAr: 'يرتدي جدي نظارة طبية لقراءة جريدة الصباح.' },
              { word: 'kindness', pos: 'n.', ar: 'عطف ورقة وإحسان', def: 'The quality of being friendly, generous, and considerate.', ex: 'Treating younger pupils with kindness builds a harmonious school.', exAr: 'معاملة التلاميذ الصغار برفق وإحسان تبني مدرسة متناغمة.' },
              { word: 'short', pos: 'adj.', ar: 'قصير القامة', def: 'Measuring a small distance from head to toe.', ex: 'Although he is relatively short, his agile agility makes him elusive.', exAr: 'رغم قصر قامته النسبي، فإن رشاقته الحركية تجعله صعب الإيقاف.' },
              { word: 'tall', pos: 'adj.', ar: 'طويل القامة وفارع', def: 'Of great or more than average height.', ex: 'Basketball players are typically very tall and athletic.', exAr: 'يتميز لاعبو كرة السلة عادة بأنهم طوال القامة ورياضيون جداً.' }
            ],
            [
              { phrase: 'score sensational goals', meaningAr: 'يحرز أهدافاً مذهلة', example: 'Mohamed Salah can score sensational goals from tight angles.' },
              { phrase: 'give money to charities', meaningAr: 'يتبرع بالأموال للجمعيات الخيرية', example: 'Kind stars give money to charities to help poor villages.' },
              { phrase: 'run very fast', meaningAr: 'يجري بسرعة فائقة', example: 'Athletes can run very fast to beat world records.' },
              { phrase: 'talk to his fans', meaningAr: 'يتحدث إلى مشجعيه بتواضع', example: 'He takes time to talk to his young fans and take photos.' },
              { phrase: 'make sensible decisions', meaningAr: 'يتخذ قرارات عاقلة وحكيمة', example: 'Wise students make sensible decisions about their study routines.' }
            ],
            'Mohamed Salah is my ultimate role model! He is an Egyptian sports hero who plays for Liverpool and the Egyptian national team. He has got dark curly hair, brown eyes, and a warm, trimmed beard. Salah is not exceptionally tall, but he is incredibly fast and agile. What makes him truly beloved across the globe is his generosity and humility. He has given millions of pounds to build clean water stations, modern schools, and hospitals in his hometown of Nagrig. He always smiles and takes time to sign autographs for children.',
            'Tarek: "Who is your favorite sports star, Youssef?"\nYoussef: "Mohamed Salah, without a doubt! He is an incredible player."\nTarek: "Has he got straight blonde hair?"\nYoussef: "No! He has got curly dark hair, a warm smile, and a neat beard."'
          ),
          prep1Unit4,
          prep1Unit5,
          prep1Unit6
        ]
      }
    ]
  },

  // ----------------------------------------------------------------------------------------------
  // PREP 2 (GRADE 8 - NEW HELLO PREP 2)
  // ----------------------------------------------------------------------------------------------
  {
    stage: 'Preparatory',
    grade: 8,
    gradeLabel: 'Prep 2 - الصف الثاني الإعدادي',
    gradeLabelAr: 'الصف الثاني الإعدادي (New Hello Prep 2 - 2026/2027)',
    track: 'New Hello',
    description: 'Teen habits, street food vendors, doctors and heroic nurses, smart gadgets of the future, nutrition, and environmental stewardship.',
    semesters: [
      {
        semester: 1,
        semesterLabel: 'Term 1 - الفصل الدراسي الأول (Units 1 to 6 - New Hello)',
        units: [
          // Unit 1: Coming Home
          createPrepUnit(
            8, 'Prep 2', 1, 1, 'Coming Home', 'العودة للمنزل وروتين المراهقين',
            'Daily routines, texting friends, sharing bedrooms, sofa, block of flats, hobbies',
            'Present Simple vs. Adverbs of Frequency & Wh-Question Formulations',
            'المضارع البسيط وروتين المراهقين وتكوين الأسئلة',
            'Use Present Simple for daily repetitive routines. Form questions: Question word + do/does + subject + infinitive verb ("What time do you text your friends? - I usually text them after dinner").',
            [
              {
                title: '1. Present Simple for Teen Habits (المضارع البسيط للروتين اليومي)',
                explanation: 'Affirmative: I/We/They text, He/She/It texts. Negative: don’t / doesn’t + bare verb. Time expressions: every day, in the evening, on weekends.',
                examples: [
                  'Dina usually does her homework on the living room sofa.',
                  'My brother doesn’t share a bedroom; he has his own room.'
                ]
              },
              {
                title: '2. Wh-Questions in Dialogue Solvers (تكوين الأسئلة في المحادثة)',
                explanation: 'Question word (What, Where, When, Who, Why, How often) + Auxiliary (do / does / did) + Subject + Main Verb.',
                examples: [
                  'Q: How often do you play chess with your father? — A: I usually play once a week.',
                  'Q: What time do you wake up on school days? — A: I always wake up at 6:30 AM.'
                ]
              }
            ],
            [
              { word: 'routine', pos: 'n.', ar: 'روتين ونمط يومي متكرر', def: 'A sequence of actions regularly followed.', ex: 'My morning routine includes eating breakfast and brushing my teeth.', exAr: 'يشمل روتيني الصباحي تناول الإفطار وغسل أسناني بالفرشاة.' },
              { word: 'text', pos: 'v.', ar: 'يراسل نصياً عبر الهاتف', def: 'Send a text message to someone on a mobile phone.', ex: 'I text my best friend to ask about the math homework.', exAr: 'أراسل صديقي المفضل نصياً لأسأله عن واجب الرياضيات.' },
              { word: 'block of flats', pos: 'n.', ar: 'عمارة سكنية متعددة الشقق', def: 'A large building containing many apartments.', ex: 'My grandparents live on the fourth floor of a modern block of flats.', exAr: 'يعيش جدي وجدتي في الطابق الرابع بعمارة سكنية حديثة.' },
              { word: 'sofa', pos: 'n.', ar: 'أريكة مريحة في غرفة المعيشة', def: 'A long comfortable seat with a back and arms.', ex: 'Dad relaxes on the living room sofa and reads the newspaper.', exAr: 'يستريح الأبي على أريكة غرفة المعيشة ويقرأ الجريدة.' },
              { word: 'share', pos: 'v.', ar: 'يشارك ويتشارك مع الآخرين', def: 'Have a portion of something with another or others.', ex: 'I share a sunny bedroom with my younger brother Ziad.', exAr: 'أتشارك غرفة نوم مشمسة مع أخي الأصغر زياد.' },
              { word: 'interview', pos: 'n. / v.', ar: 'مقابلة شخصية حوارية', def: 'A formal consultation to evaluate or obtain facts.', ex: 'The journalist held an interview with the prize-winning scientist.', exAr: 'أجرى الصحفي مقابلة مع العالم الحائز على الجائزة.' },
              { word: 'prefer', pos: 'v.', ar: 'يفضل أمراً على آخر', def: 'Like one thing or person better than another.', ex: 'I prefer studying in the quiet library rather than in noisy cafes.', exAr: 'أفضل المذاكرة في المكتبة الهادئة بدلاً من المقاهي الصاخبة.' },
              { word: 'weekend', pos: 'n.', ar: 'عطلة نهاية الأسبوع', def: 'Saturday and Sunday (or Friday and Saturday in Egypt).', ex: 'On the weekend, our whole family travels to Alexandria.', exAr: 'في عطلة نهاية الأسبوع، تسافر عائلتنا بأكملها إلى الإسكندرية.' },
              { word: 'baker’s', pos: 'n.', ar: 'مخبز العيش والفطائر', def: 'A shop where bread and cakes are made and sold.', ex: 'Dad buys fresh warm baladi bread from the local baker’s every morning.', exAr: 'يشتري أبي خبزاً بلدياً طازجاً ودافئاً من مخبز الحي كل صباح.' },
              { word: 'cook', pos: 'v. / n.', ar: 'يطهو / طباخ ماهر', def: 'Prepare food by combining and heating ingredients.', ex: 'Mom and I cook healthy lentil soup on cold winter evenings.', exAr: 'نطهو أنا وأمي شوربة عدس صحية في أمسيات الشتاء الباردة.' },
              { word: 'drawer', pos: 'n.', ar: 'درج المكتب لتخزين الأشياء', def: 'A box-shaped container that fits into a piece of furniture.', ex: 'I keep my stationery and rulers organized in my desk drawer.', exAr: 'أحتفظ بأدواتي ومساطري مرتبة في درج مكتبي.' },
              { word: 'wardrobe', pos: 'n.', ar: 'دولاب الملابس', def: 'A large, tall cupboard in which clothes may be hung or stored.', ex: 'Hang your clean school uniform neatly inside your wardrobe.', exAr: 'علق زيك المدرسي النظيف بعناية داخل دولاب الملابس.' },
              { word: 'mirror', pos: 'n.', ar: 'مرآة زجاجية عاكسة', def: 'A reflective surface of glass coated with metal.', ex: 'Look in the bathroom mirror before leaving home.', exAr: 'انظر في مرآة الحمام للتأكد من هندامك قبل مغادرة المنزل.' },
              { word: 'curtains', pos: 'n.', ar: 'ستائر النوافذ الجميلة', def: 'Pieces of cloth hung to cover a window.', ex: 'Open the white curtains to let the bright sunshine into the room.', exAr: 'افتح الستائر البيضاء لتسمح لأشعة الشمس المشرقة بدخول الغرفة.' },
              { word: 'cushion', pos: 'n.', ar: 'وسادة مقعد مريحة', def: 'A soft bag of fabric stuffed with feathers or foam.', ex: 'There are colorful cushions on our comfortable sofa.', exAr: 'توجد وسائد ملونة على أريكتنا المريحة.' },
              { word: 'carpet', pos: 'n.', ar: 'سجادة مفروشة على الأرض', def: 'A floor covering made of thick woven fabric.', ex: 'We bought a hand-woven oriental carpet from Khan el-Khalili.', exAr: 'اشترينا سجادة شرقية منسوجة يدوياً من خان الخليلي.' },
              { word: 'lamp', pos: 'n.', ar: 'مصباح إضاءة ومكتب', def: 'A device for giving light, especially one with an electric bulb.', ex: 'I turn on my desk lamp whenever I study after sunset.', exAr: 'أشعل مصباح مكتبي كلما ذاكرت بعد غروب الشمس.' },
              { word: 'basin', pos: 'n.', ar: 'حوض غسيل الأيدي والوجه', def: 'A bowl for water with taps and a drain in a bathroom.', ex: 'Wash your hands thoroughly in the bathroom basin.', exAr: 'اغسل يديك جيداً في حوض الحمام.' },
              { word: 'shelf', pos: 'n.', ar: 'رف خشبي للكتب', def: 'A flat length of wood attached to a wall to display objects.', ex: 'I arrange my English dictionaries neatly on the wooden shelf.', exAr: 'أنظم قواميسي الإنجليزية بدقة على الرف الخشبي.' },
              { word: 'tidy', pos: 'adj. / v.', ar: 'مرتب ومنظم / يرتب غرفته', def: 'Arranged neatly and in order; clean up.', ex: 'Keep your study desk tidy so you can concentrate well.', exAr: 'حافظ على ترتيب مكتب مذاكرتك لتتمكن من التركيز جيداً.' }
            ],
            [
              { phrase: 'text my friends', meaningAr: 'يراسل أصدقاءه عبر الهاتف', example: 'I relax on the sofa and text my friends after doing homework.' },
              { phrase: 'share a bedroom', meaningAr: 'يتشارك غرفة النوم مع أخيه', example: 'My brother and I share a bedroom happily.' },
              { phrase: 'do homework on the sofa', meaningAr: 'يحل الواجب جالساً على الأريكة', example: 'It is comfortable to read and do homework on the sofa.' },
              { phrase: 'have a busy routine', meaningAr: 'يمتلك جدولاً يومياً حافلاً', example: 'Prep students have a busy routine full of school and sports.' },
              { phrase: 'listen to music on headphones', meaningAr: 'يستمع للموسيقى بسماعات الأذن', example: 'He listens to soft music on his headphones while reading.' }
            ],
            'Dina and Reem are best friends who attend prep school in Alexandria. On weekdays, Dina’s alarm buzzes at 6:00 AM. She washes her face, puts on her school uniform, and eats a breakfast of fava beans and eggs with her parents. "I live in a tall block of flats overlooking the Mediterranean," Dina says. "My bedroom is sunny and tidy. I share it with my sister Maya. We have two white beds, a shared wardrobe, and a bookshelf full of adventure novels. In the evening, after completing my school projects, I love sitting on the sofa to text my friends and talk about our weekend plans."',
            'Reem: "Hi Dina! What do you usually do after school?"\nDina: "Hi Reem! I usually help my mother cook lunch, and then I do my English exercises."\nReem: "Do you have your own bedroom?"\nDina: "No, I share a cozy bedroom with my sister Maya."'
          ),

          // Unit 2: How Are You Feeling?
          createPrepUnit(
            8, 'Prep 2', 1, 2, 'How Are You Feeling?', 'كيف تشعر؟ (المهن وأحوال الشارع)',
            'Street food sellers, nurses, police officers, sign language, calligraphy, adverbs of manner',
            'Present Continuous vs. Present Simple & Adverbs of Manner (-ly)',
            'المضارع المستمر وظروف الطريقة (بإضافة ly)',
            'Use Present Continuous (am/is/are + verb-ing) for actions happening RIGHT NOW or temporary situations. Adverbs of manner describe HOW an action is done. Form: Adjective + "-ly" (quick -> quickly, careful -> carefully). Irregular adverbs: good -> well, fast -> fast, hard -> hard.',
            [
              {
                title: '1. Present Continuous for Actions Now (المضارع المستمر للأحداث الجارية)',
                explanation: 'Form: am/is/are + v-ing. Key words: now, at the moment, look!, listen!, at present. Rule: Verbs ending in -e drop the e (write -> writing).',
                examples: [
                  'The street food seller is preparing hot falafel sandwiches at the moment.',
                  'Look! The traffic police officer is directing cars safely.'
                ]
              },
              {
                title: '2. Adverbs of Manner: Form and Irregulars (ظروف الطريقة)',
                explanation: 'Adjectives describe nouns ("He is a careful driver"). Adverbs describe verbs ("He drives carefully"). Note: good becomes WELL, fast stays FAST, hard stays HARD.',
                examples: [
                  'The nurse treats the injured patients kindly and patiently.',
                  'He speaks English very well because he practices every day.'
                ]
              }
            ],
            [
              { word: 'street food seller', pos: 'n.', ar: 'بائع طعام الشارع المتجول', def: 'A vendor who prepares and sells fresh food from a mobile cart.', ex: 'The street food seller serves hot, crispy falafel to morning commuters.', exAr: 'يقدم بائع طعام الشارع الفلافل الساخنة المقرمشة للركاب في الصباح.' },
              { word: 'calligraphy', pos: 'n.', ar: 'فن الخط العربي البديع', def: 'Decorative handwriting or handwritten lettering with specialized pens.', ex: 'My grandfather practices Arabic calligraphy with black ink and reed pens.', exAr: 'يمارس جدي فن الخط العربي بالحبر الأسود وأقلام البوص.' },
              { word: 'sign language', pos: 'n.', ar: 'لغة الإشارة للصم والبكم', def: 'A system of communication using visual gestures and signs.', ex: 'She learned sign language to communicate with deaf and mute children.', exAr: 'تعلمت لغة الإشارة لتتواصل بسهولة مع الأطفال الصم والبكم.' },
              { word: 'patient', pos: 'n. / adj.', ar: 'مريض / صبور وحليم', def: 'A person receiving medical care; or able to accept delays calmly.', ex: 'The nurse checks the patient’s pulse patiently and gently.', exAr: 'تفحص الممرضة نبض المريض بصبر ورقة بالغة.' },
              { word: 'ward', pos: 'n.', ar: 'عنبر المرضى بالمستشفى', def: 'A separate room or division in a hospital for patients.', ex: 'The pediatric ward is painted with cheerful cartoon animals.', exAr: 'عنبر الأطفال بالمستشفى مزين برسومات كرتونية مرحة ومبهجة.' },
              { word: 'police officer', pos: 'n.', ar: 'ضابط شرطة يحفظ الأمن', def: 'A member of a police force who enforces traffic and laws.', ex: 'The police officer is directing morning traffic outside the school.', exAr: 'يقوم ضابط الشرطة بتنظيم حركة المرور الصباحية أمام المدرسة.' },
              { word: 'stall', pos: 'n.', ar: 'كشك أو عربة بيع طعام', def: 'A stand, booth, or compartment for the sale of goods in a market.', ex: 'Uncle Tarek parks his food stall near the metro station every morning.', exAr: 'يوقف العم طارق عربة طعامه بالقرب من محطة المترو كل صباح.' },
              { word: 'crowded', pos: 'adj.', ar: 'مزدحم وممتلئ بالناس', def: 'Full of people, leaving little or no room for movement.', ex: 'Downtown Cairo markets are crowded on Friday afternoons.', exAr: 'تكون أسواق وسط البلد في القاهرة مزدحمة في فترة بعد ظهر الجمعة.' },
              { word: 'repair', pos: 'v.', ar: 'يصلح العطل والأجهزة', def: 'Fix or mend a thing suffering from damage or a fault.', ex: 'The technician is repairing my broken laptop screen.', exAr: 'يقوم الفني بإصلاح شاشة حاسوبي المحمول المعطلة الآن.' },
              { word: 'sewing', pos: 'n.', ar: 'الخياطة والحياكة اليدوية', def: 'The craft of fastening or joining objects using stitches with needle.', ex: 'Grandma teaches my sister the traditional craft of embroidery sewing.', exAr: 'تعلم الجدة أختي حرفة التطريز والخياطة التقليدية الجميلة.' },
              { word: 'disabled', pos: 'adj.', ar: 'من ذوي الهمم والاحتياجات', def: 'Having a physical or mental condition that limits movements or senses.', ex: 'Modern public buses have ramps to welcome disabled passengers.', exAr: 'تحتوي حافلات النقل الحديثة على منحدرات لاستقبال الركاب من ذوي الهمم.' },
              { word: 'deaf', pos: 'adj.', ar: 'أصم فاقد لحاسة السمع', def: 'Lacking the power of hearing or having impaired hearing.', ex: 'Sign language enables deaf individuals to express complex feelings.', exAr: 'تمكن لغة الإشارة الصم من التعبير عن مشاعرهم وأفكارهم بدقة.' },
              { word: 'loudly', pos: 'adv.', ar: 'بصوت مرتفع وصاخب', def: 'In a way that produces much noise; audibly.', ex: 'Please do not speak loudly inside the hospital corridors.', exAr: 'من فضلك لا تتحدث بصوت مرتفع داخل ممرات المستشفى.' },
              { word: 'quietly', pos: 'adv.', ar: 'بهدوء وسكينة', def: 'In a quiet manner; making little or no noise.', ex: 'Students work quietly during their reading examination.', exAr: 'يعمل الطلاب بهدوء وسكينة أثناء امتحان القراءة.' },
              { word: 'politely', pos: 'adv.', ar: 'بأدب ولباقة رفيعة', def: 'In a respectful and considerate manner.', ex: 'Always answer your teachers and parents politely.', exAr: 'أجب دائماً على معلميك ووالديك بأدب واحترام.' },
              { word: 'dangerously', pos: 'adv.', ar: 'بشكل محفوف بالخطر', def: 'In a way that is likely to cause problems or injury.', ex: 'Motorcyclists who ride without helmets are driving dangerously.', exAr: 'سائقو الدراجات النارية بدون خوذة يقودون بتهور وبشكل محفوف بالخطر.' },
              { word: 'happily', pos: 'adv.', ar: 'بسعادة وسرور', def: 'In a happy manner; with joy and satisfaction.', ex: 'The children played happily in the neighborhood park.', exAr: 'لعب الأطفال بسعادة وفرح في حديقة الحي.' },
              { word: 'safely', pos: 'adv.', ar: 'بأمان وسلامة', def: 'In a way that is not likely to cause or lead to harm.', ex: 'Cross the wide street safely at the designated pedestrian crossing.', exAr: 'اعبر الشارع العريض بأمان عند ممر المشاة المخصص.' },
              { word: 'carefully', pos: 'adv.', ar: 'بحذر وحيطة وعناية', def: 'In a way that deliberately avoids harm or error.', ex: 'Handle hot glass test tubes carefully in the laboratory.', exAr: 'تعامل مع أنابيب الاختبار الزجاجية الساخنة بحذر في المعمل.' },
              { word: 'badly', pos: 'adv.', ar: 'بشكل رديء أو سيئ', def: 'In an unsatisfactory, inadequate, or unsuccessful way.', ex: 'The athlete played badly because he had a sprained ankle.', exAr: 'لعب الرياضي بشكل غير موفق بسبب التواء في كاحله.' }
            ],
            [
              { phrase: 'park his food stall', meaningAr: 'يوقف عربة طعامه في مكان مخصص', example: 'Uncle Kamal parks his food stall near the busy bus stop.' },
              { phrase: 'communicate with deaf people', meaningAr: 'يتواصل مع الصم بلغة الإشارة', example: 'Volunteers learn to communicate with deaf people using sign language.' },
              { phrase: 'look after patients', meaningAr: 'يعتني بالمرضى في المستشفى', example: 'Heroic nurses look after sick patients throughout the night.' },
              { phrase: 'drive carefully', meaningAr: 'يقود سيارته بحذر وأمان', example: 'Drivers must drive carefully when it rains heavily.' },
              { phrase: 'speak politely to customers', meaningAr: 'يتحدث بلباقة مع الزبائن', example: 'Shop assistants speak politely to all customers.' }
            ],
            'On a busy morning in downtown Cairo, hardworking citizens serve their community with passion! Uncle Kamal is a street food seller who prepares fresh foul and taameya sandwiches. "I park my food stall here at six o’clock in the morning," he smiles. "People are hurrying to catch the metro, so I prepare their food quickly and hygienically." Across the street at the children’s hospital, Nurse Mona is looking after young patients in the surgical ward. She speaks softly and treats every child with loving care. In the school next door, students are learning sign language so they can communicate warmly with deaf peers.',
            'Amal: "Look, what is that man doing on the corner?"\nNour: "He is a street food seller. He is preparing hot falafel for morning workers."\nAmal: "He is moving very quickly!"\nNour: "Yes, and he always greets his customers politely."'
          ),
          prep2Unit4,
          prep2Unit5,
          prep2Unit6
        ]
      }
    ]
  },

  // ----------------------------------------------------------------------------------------------
  // PREP 3 (GRADE 9 - THIRD PREPARATORY CERTIFICATE / الشهادة الإعدادية)
  // ----------------------------------------------------------------------------------------------
  {
    stage: 'Preparatory',
    grade: 9,
    gradeLabel: 'Prep 3 - الصف الثالث الإعدادي (الشهادة الإعدادية)',
    gradeLabelAr: 'الصف الثالث الإعدادي (الشهادة الإعدادية العامة 2026/2027)',
    track: 'New Hello',
    description: 'High-stakes Third Preparatory Certificate: Urban geography, e-commerce & smart consumer rights, Decent Life (حياة كريمة), environmental ecosystems, passive voice, relative clauses, and national exam banks.',
    semesters: [
      {
        semester: 1,
        semesterLabel: 'Term 1 - الفصل الدراسي الأول (Units 1 to 6 - New Hello)',
        units: [
          // Unit 1: Around Town
          createPrepUnit(
            9, 'Prep 3', 1, 1, 'Around Town', 'حول المدينة ومعالم الإسماعيلية والنقل العام',
            'Ismailia, Lake Timsah, Suez Canal, botanical gardens, public transport, ferries, monuments',
            'Present Simple for Scheduled Transport & Prepositions of Place and Direction',
            'المضارع البسيط للمواعيد المجدولة وحروف الجر للمكان والاتجاه',
            'Use Present Simple to express official fixed timetables for public transport, cinema screenings, and school terms: "The train leaves at 7:00 PM / The museum opens at 9:00 AM". Prepositions of place: opposite (في الجهة المقابلة), next to (بجوار), between X and Y (بين كذا وكذا), on the corner (على الناصية).',
            [
              {
                title: '1. Scheduled Timetables in Present Simple (المضارع البسيط للمواعيد والرحلات)',
                explanation: 'Even if the event happens in the future, if it is on an official schedule or timetable (train, bus, plane, film, lesson), use Present Simple (verb + s/es with singular subjects).',
                examples: [
                  'The express train to Aswan leaves platform 4 at 8:15 PM.',
                  'What time does the botanical museum close this afternoon?'
                ]
              },
              {
                title: '2. Directional Prepositions for Map Navigation (إعطاء الاتجاهات في المحادثة)',
                explanation: 'Imperatives for directions: "Go straight on", "Take the second turning on the left", "It is on the corner opposite the library".',
                examples: [
                  'Go straight on for two hundred meters, then turn left at the traffic lights.',
                  'The ferry terminal is between the maritime museum and the botanical garden.'
                ]
              }
            ],
            [
              { word: 'monuments', pos: 'n.', ar: 'آثار وصروح تاريخية خالدة', def: 'Statues, buildings, or structures built to commemorate a person or event.', ex: 'Ismailia boasts fascinating monuments commemorating the Suez Canal history.', exAr: 'تضم الإسماعيلية معالم وآثاراً تخلد تاريخ قناة السويس.' },
              { word: 'botanical gardens', pos: 'n.', ar: 'الحدائق النباتية العلمية', def: 'Gardens dedicated to the collection, cultivation, and display of plants.', ex: 'The Orman botanical gardens in Giza preserve rare tropical trees.', exAr: 'تحفظ حديقة الأورمان النباتية في الجيزة أشجاراً استوائية نادرة.' },
              { word: 'peaceful', pos: 'adj.', ar: 'هادئ ومسالم ومريح للأعصاب', def: 'Free from disturbance; tranquil and serene.', ex: 'Lake Timsah at sunrise is calm, scenic, and peaceful.', exAr: 'تتميز بحيرة التمساح عند شروق الشمس بالهدوء والجمال والسكينة.' },
              { word: 'ferry', pos: 'n.', ar: 'معدية لنقل الركاب والسيارات', def: 'A boat or ship for conveying passengers and goods across water.', ex: 'We boarded the ferry to cross from Port Said to Port Fouad.', exAr: 'ركبنا المعدية للانتقال بحراً من بورسعيد إلى بورفؤاد.' },
              { word: 'traffic', pos: 'n.', ar: 'حركة المرور والسيارات', def: 'Vehicles moving on a road or public highway.', ex: 'Ismailia is famous for clean air and smooth, light vehicle traffic.', exAr: 'تشتهر الإسماعيلية بنقاء هوائها وحركة المرور الهادئة والسلسة.' },
              { word: 'platform', pos: 'n.', ar: 'رصيف محطة القطار', def: 'A raised level surface on which passengers board a train.', ex: 'The Alexandria express will depart from platform number two.', exAr: 'سيغادر قطار الإسكندرية السريع من رصيف المحطة رقم اثنين.' },
              { word: 'timetable', pos: 'n.', ar: 'جدول مواعيد وسائل النقل', def: 'A schedule of the times at which public transport arrives and departs.', ex: 'Consult the railway timetable to choose the most convenient train.', exAr: 'راجع جدول مواعيد القطارات لاختيار موعد السفر الأنسب لك.' },
              { word: 'passenger', pos: 'n.', ar: 'راكب ومسافر', def: 'A traveler on a public or private conveyance other than the driver.', ex: 'Each passenger must carry a validated train ticket.', exAr: 'يجب على كل راكب حمل تذكرة قطار صالحة ومؤكدة.' },
              { word: 'tram', pos: 'n.', ar: 'الترام الكهربائي التراثي', def: 'An electric passenger vehicle running along rails in the streets.', ex: 'The historic blue tram in Alexandria is an eco-friendly way to travel.', exAr: 'يعد ترام الإسكندرية الأزرق وسيلة تنقل تراثية وصديقة للبيئة.' },
              { word: 'aquarium', pos: 'n.', ar: 'متحف الأحياء المائية والأسماك', def: 'A public building where living aquatic animals and plants are exhibited.', ex: 'We marveled at colorful Red Sea clownfish at the Hurghada aquarium.', exAr: 'انبهرنا بأسماك البحر الأحمر الملونة في متحف الأحياء المائية بالغردقة.' },
              { word: 'exhibition', pos: 'n.', ar: 'معرض فني أو تجاري', def: 'A public display of works of art or items of interest held in an art gallery.', ex: 'The modern art exhibition attracted thousands of visitors.', exAr: 'جذب معرض الفن الحديث آلاف الزوار والمهتمين.' },
              { word: 'indoors', pos: 'adv.', ar: 'في الداخل (داخل المبنى)', def: 'Into or within a building.', ex: 'When the midday temperature soars, it is pleasant to read indoors.', exAr: 'عندما تشتد حرارة الظهيرة، يكون من الرائع القراءة في الداخل.' },
              { word: 'outdoors', pos: 'adv.', ar: 'في الهواء الطلق بالخارج', def: 'In or into the open air; outside a building.', ex: 'Children love playing football outdoors in the fresh breeze.', exAr: 'يحب الأطفال لعب كرة القدم في الهواء الطلق والنسيم العليل.' },
              { word: 'especially', pos: 'adv.', ar: 'بشكل خاص وتحديداً', def: 'Used to single out one person, thing, or circumstance over all others.', ex: 'I enjoy visiting coastal cities, especially Ismailia and Port Said.', exAr: 'أستمتع بزيارة المدن الساحلية، وبخاصة الإسماعيلية وبورسعيد.' },
              { word: 'natural reserve', pos: 'n.', ar: 'محمية طبيعية محمية قانوناً', def: 'A protected area of importance for flora, fauna, or geological features.', ex: 'Ras Mohammed is Egypt’s premier marine natural reserve.', exAr: 'تعد رأس محمد المحمية البحرية الطبيعية الأولى والأهم في مصر.' },
              { word: 'lake', pos: 'n.', ar: 'بحيرة مائية عذبة أو مالحة', def: 'A large body of water surrounded by land.', ex: 'Lake Qarun in Fayoum is an ancient historical body of water.', exAr: 'تعد بحيرة قارون في الفيوم مسطحاً مائياً تاريخياً عريقاً.' },
              { word: 'comfortable', pos: 'adj.', ar: 'مريح ومبهج في الاستخدام', def: 'Providing physical ease and relaxation.', ex: 'First-class train seats are spacious and very comfortable.', exAr: 'مقاعد الدرجة الأولى في القطار واسعة ومريحة للغاية.' },
              { word: 'pollution', pos: 'n.', ar: 'تلوث بيئي ومائي', def: 'The presence in or introduction into the environment of harmful substances.', ex: 'Planting rows of green trees combats urban air pollution.', exAr: 'تساعد زراعة صفوف الأشجار الخضراء في مكافحة تلوث الهواء في المدن.' },
              { word: 'attractive', pos: 'adj.', ar: 'جذاب وجميل المظهر', def: 'Pleasing or appealing to the senses; charming.', ex: 'Ismailia is famous for its attractive colonial architecture and gardens.', exAr: 'تشتهر الإسماعيلية بطرازها المعماري الجذاب وحدائقها البديعة.' },
              { word: 'cross', pos: 'v.', ar: 'يعبر النهر أو الطريق', def: 'Pass from one side of a road or river to the other.', ex: 'Wait for the pedestrian signal before you cross the busy avenue.', exAr: 'انتظر إشارة المشاة الخضراء قبل أن تعبر الشارع المزدحم.' }
            ],
            [
              { phrase: 'go straight on', meaningAr: 'امشِ في خط مستقيم للأمام', example: 'Go straight on until you see the botanical garden on your right.' },
              { phrase: 'take the second turning', meaningAr: 'اتجه مع المنعطف الثاني', example: 'Take the second turning on your left past the post office.' },
              { phrase: 'on the corner of the street', meaningAr: 'على ناصية الشارع تماماً', example: 'The bookshop is right on the corner of Tahrir Street.' },
              { phrase: 'catch the ferry', meaningAr: 'يلحق بالمعدية للعبور', example: 'We must hurry to catch the nine o’clock ferry to Port Fouad.' },
              { phrase: 'a peaceful natural haven', meaningAr: 'ملاذ طبيعي هادئ ومريح', example: 'Ismailia’s lakes offer a peaceful natural haven away from big-city noise.' }
            ],
            'Ismailia is one of the most beautiful and peaceful cities in Egypt! Located on the west bank of the Suez Canal, it was founded in 1869. The city features wide, tree-lined boulevards, elegant historic monuments, and vast botanical gardens. Nearby lies Lake Timsah, where waters are tranquil and serene. Traveling around Ismailia is enjoyable because there is very little traffic pollution. To cross the canal, passengers board clean electric ferries. The railway station is situated near the city center: the train to Cairo departs every hour on the hour.',
            'Tourist: "Excuse me, how can I get to the Natural History Museum from here?"\nLocal Resident: "Go straight on along this boulevard for two hundred meters. Take the first turning on your right. The museum is on the corner, opposite the botanical gardens."\nTourist: "Thank you so much! What time does the museum close today?"\nLocal Resident: "It closes at four o’clock in the afternoon."'
          ),

          // Unit 2: Let's Go Shopping!
          createPrepUnit(
            9, 'Prep 3', 1, 2, 'Let’s Go Shopping!', 'هيا نتسوق عبر الإنترنت وخدمة العملاء',
            'Online shopping, smart appliances (microwave, kettle, speakers), discounts, delivery, customer complaints',
            'Correlative Conjunctions: "Both... and / Either... or / Neither... nor / None of"',
            'روابط الجمع والاختيار والنفي المزدوج (Both / Either / Neither / None)',
            'Both... and takes a PLURAL verb ("Both the kettle and the microwave are on sale"). Neither... nor matches the verb to the CLOSER subject ("Neither the manager nor the assistants were available"). Either... or presents two alternatives. None of is used for three or more items ("None of the laptops were damaged").',
            [
              {
                title: '1. Correlative Conjunctions Masterclass (روابط الاختيار والجمع)',
                explanation: 'Both X and Y -> ALWAYS PLURAL VERB. Neither X nor Y -> Verb agrees with Y (the closer noun). Either X or Y -> Verb agrees with Y. None of + plural noun -> usually takes plural or singular verb.',
                examples: [
                  'Both the smartphone and the tablet are on special discount today.',
                  'Neither the seller nor the customers were happy with the broken delivery.'
                ]
              },
              {
                title: '2. Formal Customer Service Complaints (حل محادثات الشكاوى وخدمة العملاء)',
                explanation: 'Polite complaint openings: "I am calling to make a complaint about...", "The item arrived damaged / didn’t work". Customer service replies: "I am terribly sorry about that. Could you give me your order number? We can replace it or refund your money."',
                examples: [
                  'Customer: "I want to make a complaint. The kettle I ordered makes a strange noise."',
                  'Assistant: "We apologize for the inconvenience. We will send you a replacement immediately."'
                ]
              }
            ],
            [
              { word: 'discount', pos: 'n.', ar: 'خصم وتخفيض في السعر', def: 'A deduction from the usual cost of something.', ex: 'The electronics store offers a twenty percent discount on smart TVs.', exAr: 'يقدم متجر الإلكترونيات خصماً بنسبة عشرين بالمائة على الشاشات الذكية.' },
              { word: 'complaint', pos: 'n.', ar: 'شكوى رسمية من عيب أو خدمة', def: 'A statement that something is unsatisfactory or unacceptable.', ex: 'The customer filed a formal complaint regarding delayed package delivery.', exAr: 'قدم العميل شكوى رسمية بخصوص تأخر وصول الطرد البريدي.' },
              { word: 'microwave', pos: 'n.', ar: 'فرن الميكروويف لتسخين الطعام', def: 'An electric oven that uses electromagnetic waves to heat food quickly.', ex: 'Warm your soup in the microwave for two minutes.', exAr: 'سخن حساءك في الميكروويف لمدة دقيقتين.' },
              { word: 'kettle', pos: 'n.', ar: 'غلاية مياه كهربائية', def: 'A vessel for boiling water, typically having a lid, spout, and handle.', ex: 'Boil water in the electric kettle to make hot mint tea.', exAr: 'اغلِ الماء في الغلاية الكهربائية لإعداد شاي النعناع الساخن.' },
              { word: 'smart speaker', pos: 'n.', ar: 'مكبر صوت ذكي بالبلوتوث', def: 'A wireless speaker controlled with spoken voice commands.', ex: 'I use our smart speaker to play the morning Quran recitation.', exAr: 'أستخدم مكبر الصوت الذكي لتشغيل تلاوة القرآن الصباحية.' },
              { word: 'delivery', pos: 'n.', ar: 'خدمة التوصيل والشحن للمنزل', def: 'The action of delivering letters, parcels, or ordered goods.', ex: 'Free home delivery is provided for orders over five hundred pounds.', exAr: 'تتوفر خدمة التوصيل المنزلي مجاناً للطلبات التي تتجاوز خمسمائة جنيه.' },
              { word: 'order', pos: 'n. / v.', ar: 'طلب شراء / يطلب سلعة', def: 'A request to make, supply, or deliver goods.', ex: 'I placed an online order for a pair of running sneakers.', exAr: 'قمت بطلب شراء حذاء رياضي للجري عبر الإنترنت.' },
              { word: 'special offer', pos: 'n.', ar: 'عرض ترويجي وتخفيض خاص', def: 'A temporary reduction in the price of products.', ex: 'Black Friday features special offers across all electronics departments.', exAr: 'تشهد عروض الجمعة تخفيضات خاصة عبر جميع أقسام الإلكترونيات.' },
              { word: 'deal', pos: 'n.', ar: 'صفقة تجارية رابحة', def: 'An attractive arrangement or bargain in purchasing.', ex: 'Buying two laptops for the price of one was an unbeatable deal.', exAr: 'كان شراء جهازي حاسوب بسعر جهاز واحد صفقة لا تعوض.' },
              { word: 'customer', pos: 'n.', ar: 'عميل وزبون المتجر', def: 'A person who buys goods or services from a shop or business.', ex: 'The polite shopkeeper greeted every customer with genuine warmth.', exAr: 'رحب صاحب المتجر اللبق بكل عميل بترحاب ومودة صادقة.' },
              { word: 'review', pos: 'n. / v.', ar: 'تقييم ومراجعة للمنتج', def: 'A critical appraisal of a book, play, or commercial product.', ex: 'Always read customer reviews before ordering electronics online.', exAr: 'اقرأ دائماً تقييمات المشترين قبل طلب الأجهزة الإلكترونية عبر الإنترنت.' },
              { word: 'charger', pos: 'n.', ar: 'شاحن بطارية الهاتف', def: 'A device for charging a storage battery such as a mobile phone.', ex: 'Do not leave your mobile phone charger plugged in all night.', exAr: 'لا تترك شاحن هاتفك المحمول موصولاً بالكهرباء طوال الليل.' },
              { word: 'item', pos: 'n.', ar: 'سلعة أو منتج معروض', def: 'An individual article or unit in a collection or catalog.', ex: 'The courier delivered three items from my online shopping cart.', exAr: 'سلم مندوب الشحن ثلاث سلع من سلة تسوقي عبر الإنترنت.' },
              { word: 'seller', pos: 'n.', ar: 'البائع في المتجر أو المتجر الرقمي', def: 'A person who sells goods or services.', ex: 'Choose an authorized online seller with certified consumer ratings.', exAr: 'اختر بائعاً رقمياً معتمداً ذا تقييمات مستهلكين موثوقة.' },
              { word: 'refund', pos: 'n. / v.', ar: 'استرداد الأموال واسترجاع القيمة', def: 'A repayment of a sum of money to a dissatisfied customer.', ex: 'The store refunded my money when the kettle arrived with a defect.', exAr: 'استرد المتجر نقودي عندما وصلت الغلاية وبها عيب صناعي.' },
              { word: 'exchange', pos: 'v.', ar: 'يستبدل سلعة بأخرى سليمة', def: 'Give something and receive something of the same kind in return.', ex: 'You can exchange this jacket for a larger size within fourteen days.', exAr: 'يمكنك استبدال هذه السترة بمقاس أكبر خلال أربعة عشر يوماً.' },
              { word: 'quality', pos: 'n.', ar: 'جودة وخامة التصنيع', def: 'The standard of something as measured against other things of a similar kind.', ex: 'Egyptian cotton garments are renowned worldwide for superior quality.', exAr: 'تشتهر الملابس المصنوعة من القطن المصري عالمياً بجودتها الفائقة.' },
              { word: 'online', pos: 'adj. / adv.', ar: 'عبر شبكة الإنترنت', def: 'Controlled by or connected to a global computer network.', ex: 'Online shopping saves time, but consumers must compare prices carefully.', exAr: 'يوفر التسوق عبر الإنترنت الوقت، لكن على المستهلكين مقارنة الأسعار بحرص.' },
              { word: 'advert', pos: 'n.', ar: 'إعلان تجاري ترويجي', def: 'An advertisement marketing a product to consumers.', ex: 'The television advert highlighted a fifty percent discount on kitchenware.', exAr: 'أبرز الإعلان التلفزيوني خصماً قدره خمسون بالمائة على أواني المطبخ.' },
              { word: 'guarantee', pos: 'n. / v.', ar: 'شهادة ضمان الجودة ضد العيوب', def: 'A formal promise or assurance that certain conditions will be fulfilled.', ex: 'This refrigerator comes with a ten-year manufacturer guarantee.', exAr: 'تأتي هذه الثلاجة مع شهادة ضمان من المصنع لمدة عشر سنوات.' }
            ],
            [
              { phrase: 'make a formal complaint', meaningAr: 'يقدم شكوى رسمية', example: 'I had to make a formal complaint because the microwave did not heat.' },
              { phrase: 'both... and are on sale', meaningAr: 'كلاهما معروضان للبيع بتخفيض', example: 'Both the kettle and the blender are on sale this weekend.' },
              { phrase: 'get a full refund', meaningAr: 'يسترد كامل المبلغ المدفوع', example: 'The customer was able to get a full refund for the damaged product.' },
              { phrase: 'exchange for a new one', meaningAr: 'يستبدل المنتج بآخر جديد سليم', example: 'The company agreed to exchange the broken phone for a new one.' },
              { phrase: 'check customer reviews', meaningAr: 'يفحص آراء وتقييمات المشترين', example: 'Savvy shoppers always check customer reviews before purchasing.' }
            ],
            'E-commerce has transformed consumer habits across Egypt! Millions of families purchase household appliances and books through verified digital platforms. However, smart shopping requires digital literacy. Always check seller warranties, customer reviews, and return policies. Last week, Tarek ordered a new electric kettle for his grandmother’s birthday. When the parcel arrived, the kettle was scratched and failed to boil water. Tarek called customer service politely: "I would like to make a complaint. The kettle I ordered yesterday arrived defective." The representative apologized immediately: "We will dispatch a courier tomorrow to replace the item free of charge."',
            'Customer: "Good afternoon. I am calling to make a complaint about my online order."\nAgent: "Good afternoon, sir. I apologize for the trouble. What seems to be the problem?"\nCustomer: "I ordered a smart speaker, but when I unboxed it, the charger was missing."\nAgent: "Could I have your order number, please? We will send you a replacement charger within 24 hours."'
          ),

          // Unit 3: My Community & Decent Life
          createPrepUnit(
            9, 'Prep 3', 1, 3, 'My Community & Decent Life', 'مجتمعي ومبادرة حياة كريمة في القرى',
            'Decent Life initiative (حياة كريمة), rural hospitals, paved roads, sports facilities, community empowerment',
            'Present Continuous for Future Arrangements & -ed vs. -ing Adjectives',
            'المضارع المستمر للترتيبات المستقبلية والصفات المنتهية بـ ed و ing',
            'Use Present Continuous (am/is/are + v-ing) for fixed future arrangements where time and place are already booked ("We are meeting the engineers tomorrow morning at 10:00"). Adjectives ending in "-ed" describe feelings of a person ("I am excited / amazed"). Adjectives ending in "-ing" describe the thing or person that causes the feeling ("The Decent Life project is exciting / amazing").',
            [
              {
                title: '1. Present Continuous for Fixed Future Arrangements (الترتيبات المستقبلية)',
                explanation: 'When plans are already organized, tickets booked, or appointments scheduled, use Present Continuous. Look for clues: arranged, prepared, booked, bought tickets.',
                examples: [
                  'Our class is visiting the new rural medical center in Fayoum next Monday.',
                  'The municipal engineers are inspecting the paved roads tomorrow morning.'
                ]
              },
              {
                title: '2. -ed vs. -ing Adjectives (الصفات المنتهية بـ ed و ing)',
                explanation: '-ed describes how a person feels: "The villagers were amazed by the clean water project." -ing describes the cause or quality of the object: "The Decent Life initiative is an amazing project."',
                examples: [
                  'The students were interested in learning about community volunteering.',
                  'Reading about Egyptian historical heroes is truly interesting and inspiring.'
                ]
              }
            ],
            [
              { word: 'facilities', pos: 'n.', ar: 'مرافق وخدمات مجتمعية عامة', def: 'Space or equipment provided for a particular purpose.', ex: 'Decent Life has built state-of-the-art sports facilities for rural youth.', exAr: 'أنشأت مبادرة حياة كريمة مرافق رياضية حديثة لشباب القرى.' },
              { word: 'pavement', pos: 'n.', ar: 'رصيف مشاة ممهد وآمن', def: 'A paved path for pedestrians at the side of a road.', ex: 'The municipal project laid smooth stone pavements for elderly pedestrians.', exAr: 'قام المشروع بتمهيد أرصفة حجرية ملساء للمشاة وكبار السن.' },
              { word: 'initiative', pos: 'n.', ar: 'مبادرة قومية رائدة', def: 'An act or strategy intended to resolve a difficulty or improve a situation.', ex: 'The Presidential Decent Life initiative transforms Egyptian rural hamlets.', exAr: 'تحدث مبادرة حياة كريمة الرئاسية تحولاً جذرياً في القرى المصرية.' },
              { word: 'community', pos: 'n.', ar: 'المجتمع والبيئة المحلية', def: 'A group of people living in the same place or having a particular characteristic.', ex: 'Our local community organized a tree-planting day to beautify the park.', exAr: 'نظم مجتمعنا المحلي يوماً لزراعة الأشجار لتجميل الحديقة.' },
              { word: 'rural', pos: 'adj.', ar: 'ريفي وقروي', def: 'In, relating to, or characteristic of the countryside rather than the town.', ex: 'Rural villages now enjoy potable running water and high-speed fiber internet.', exAr: 'تتمتع القرى الريفية الآن بمياه شرب نقية وإنترنت فائق السرعة بالألياف الضوئية.' },
              { word: 'disabled', pos: 'adj.', ar: 'من ذوي الإعاقة والهمم', def: 'Having a physical or mental condition that limits movements or activities.', ex: 'The new health clinics provide accessible ramps for disabled citizens.', exAr: 'توفر المراكز الصحية الجديدة منحدرات ميسرة للمواطنين من ذوي الهمم.' },
              { word: 'opportunity', pos: 'n.', ar: 'فرصة ثمينة للنجاح والعمل', def: 'A set of circumstances that makes it possible to do something.', ex: 'Vocational workshops offer rural women an opportunity to start businesses.', exAr: 'توفر الورش المهنية لسيدات الريف فرصة حقيقية لبدء مشاريعهن الخاصة.' },
              { word: 'improve', pos: 'v.', ar: 'يحسن ويطور الخدمات', def: 'Make or become better in condition, quality, or standard.', ex: 'Paved asphalt roads dramatically improve transportation between villages.', exAr: 'تسهم الطرق المسفلتة الممهدة في تحسين الانتقال بين القرى بشكل كبير.' },
              { word: 'healthcare', pos: 'n.', ar: 'الرعاية والخدمات الطبية', def: 'The organized provision of medical care to individuals or a community.', ex: 'Decent Life hospitals deliver comprehensive healthcare to underserved areas.', exAr: 'تقدم مستشفيات حياة كريمة رعاية صحية شاملة للمناطق الأكثر احتياجاً.' },
              { word: 'elderly', pos: 'adj. / n.', ar: 'كبار السن والمسنون', def: 'Of persons: advanced in years; old.', ex: 'Dedicated volunteers deliver monthly medical supplies to elderly villagers.', exAr: 'يوصل المتطوعون المخلصون المستلزمات الطبية الشهرية للمسنين في القرى.' },
              { word: 'education', pos: 'n.', ar: 'التعليم والتثقيف', def: 'The process of receiving or giving systematic instruction.', ex: 'Quality education empowers children to build prosperous, innovative futures.', exAr: 'يمكّن التعليم عالي الجودة الأطفال من بناء مستقبل مزدهر ومبتكر.' },
              { word: 'neighborhood', pos: 'n.', ar: 'الحي السكني والمجاورة', def: 'A district, especially one forming a community within a town or city.', ex: 'Our quiet neighborhood collaborated to establish a youth reading room.', exAr: 'تعاون حيّنا السكني الهادئ لإنشاء قاعة قراءة للشباب.' },
              { word: 'volunteer', pos: 'n. / v.', ar: 'متطوع للخدمة العامة', def: 'A person who freely offers to take part in an enterprise or undertake a task.', ex: 'College students volunteer to paint classroom walls and plant gardens.', exAr: 'يتطوع طلاب الجامعات لطلاء جدران الفصول وزراعة الحدائق المدرسية.' },
              { word: 'deliver', pos: 'v.', ar: 'يقدم ويوصل الخدمات', def: 'Bring and hand over a letter, parcel, or service.', ex: 'Mobile medical convoys deliver free treatments directly to remote hamlets.', exAr: 'تقدم القوافل الطبية المتنقلة العلاج المجاني مباشرة للقرى والنجوع النائية.' },
              { word: 'leisure', pos: 'n.', ar: 'وقت الفراغ والراحة', def: 'Use of free time for enjoyment and relaxation.', ex: 'The newly inaugurated youth center offers diverse leisure activities.', exAr: 'يقدم مركز الشباب الذي تم افتتاحه حديثاً أنشطة ترفيهية ورياضية متنوعة.' },
              { word: 'project', pos: 'n.', ar: 'مشروع تنموي قومي', def: 'An enterprise carefully planned to achieve a particular socio-economic aim.', ex: 'The sanitation infrastructure project protects villages from canal flooding.', exAr: 'يحمي مشروع البنية التحتية للصرف الصحي القرى من مشكلات المياه.' },
              { word: 'amazing', pos: 'adj.', ar: 'مذهل ورائع الإنجاز', def: 'Causing great surprise or wonder; astonishing.', ex: 'The rapid modernization of Upper Egyptian hamlets is truly amazing.', exAr: 'إن التطوير الشامل السريع لقرى صعيد مصر مذهل ومصدر فخر حقيقي.' },
              { word: 'amazed', pos: 'adj.', ar: 'مندهش ومبهور بالإنجاز', def: 'Filled with astonishment; greatly surprised.', ex: 'The visitors were amazed by the solar-powered street lighting.', exAr: 'انبهر الزوار بأعمدة إنارة الشوارع التي تعمل بالطاقة الشمسية بالكامل.' },
              { word: 'inspiring', pos: 'adj.', ar: 'ملهم ومحفز للهمم', def: 'Having the effect of inspiring someone; motivating.', ex: 'Watching young Egyptian engineers renovate villages is deeply inspiring.', exAr: 'إن مشاهدة المهندسين المصريين الشباب يطورون القرى أمر ملهم للغاية.' },
              { word: 'inspired', pos: 'adj.', ar: 'مستلهم ومفعم بالحماس', def: 'Of extraordinary quality, as if arising from external creative impulse.', ex: 'Students felt inspired to launch their own neighborhood clean-up campaign.', exAr: 'شعر الطلاب بالحماس والاستلهام لإطلاق حملة نظافة خاصة بحيهم.' }
            ],
            [
              { phrase: 'Decent Life initiative', meaningAr: 'مبادرة حياة كريمة الرئاسية', example: 'The Decent Life initiative brings hope, clean water, and schools to Egyptian villages.' },
              { phrase: 'equal opportunities for all', meaningAr: 'فرص متكافئة وعادلة للجميع', example: 'Modern development ensures equal opportunities for all children.' },
              { phrase: 'paved roads and clinics', meaningAr: 'طرق ممهدة ومراكز طبية', example: 'Paved roads and modern clinics connect once-isolated hamlets.' },
              { phrase: 'arranged to visit tomorrow', meaningAr: 'مرتب ومنسق للزيارة غداً', example: 'Our scouts troop is arranged to visit the community center tomorrow.' },
              { phrase: 'amazed by the progress', meaningAr: 'مبهور بالتقدم والتطور الملحوظ', example: 'Everyone is amazed by the rapid progress in rural public infrastructure.' }
            ],
            'The "Decent Life" (Haya Karima) initiative is an inspiring national endeavor transforming the Egyptian countryside! Launched by the Egyptian government, it targets over 4,500 rural villages across governorates like Minya, Asyut, Sohag, and Beheira. Before the initiative, many rural communities suffered from unpaved roads and inadequate medical clinics. Today, state-of-the-art schools, solar-illuminated streets, modern sanitation networks, and digital post offices are established. Young Egyptian engineers and university volunteers are working hand-in-hand to build a brighter future for generations to come.',
            'Omar: "Have you read about the Decent Life projects in Upper Egypt, Karim?"\nKarim: "Yes! The transformations in health clinics and schools are truly amazing."\nOmar: "Our scout group is traveling to Sohag next month to help paint the new primary school!"\nKarim: "That is fantastic! Count me in as a volunteer."'
          ),
          prep3Unit4,
          prep3Unit5,
          prep3Unit6
        ]
      }
    ]
  }
];
