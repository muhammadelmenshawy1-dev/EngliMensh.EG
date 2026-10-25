import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Clock,
  Award,
  CheckCircle2,
  XCircle,
  AlertCircle,
  RotateCcw,
  BookOpen,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Printer,
  FileText,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  Volume2,
  PenTool,
  Check,
  ShieldAlert,
  Target,
  MessageSquare,
  Edit3
} from 'lucide-react';
import { UnitExam, CurriculumQuestion, UnitCurriculum, PrepExamBlueprint } from '../types/curriculum.ts';
import { StudentProfile } from '../types.ts';
import { recordExamCompletion } from '../services/studentStorage.ts';

// Helper to get or synthesize a rich PrepExamBlueprint if not already attached
function getOrSynthesizePrepBlueprint(exam: UnitExam, unitCurriculum?: UnitCurriculum | null): PrepExamBlueprint {
  if (exam.prepBlueprint) {
    return exam.prepBlueprint;
  }
  if ((unitCurriculum as any)?.unitExam?.prepBlueprint) {
    return (unitCurriculum as any).unitExam.prepBlueprint;
  }
  const title = unitCurriculum?.unitTitle || 'Preparatory Curriculum Unit';
  const titleAr = unitCurriculum?.unitTitleAr || 'الوحدة الدراسية المقررة';
  const kw0 = unitCurriculum?.vocabularyModule?.keyWords?.[0] || { word: 'community', ar: 'مجتمع', meaningAr: 'مجتمع', meaningEn: 'a group of people living together', def: 'a group of people living together' };
  const kw1 = unitCurriculum?.vocabularyModule?.keyWords?.[1] || { word: 'volunteer', ar: 'متطوع', meaningAr: 'متطوع', meaningEn: 'a person who works for free to help others', def: 'a person who works for free to help others' };
  const passageText = unitCurriculum?.readingModule?.passage || `Education is the cornerstone of Egyptian youth development. In the Preparatory stage, students develop linguistic competence, critical thinking, and collaborative skills. Through daily study and engagement in extracurricular tasks, young learners prepare themselves for high school and university challenges while embracing moral integrity.`;
  const passageTitle = unitCurriculum?.readingModule?.passageTitle || `${title}: Official Comprehension Text`;

  return {
    dialogue: {
      title: `Finish the following dialogue about ${title}:`,
      context: `Two Egyptian prep students are discussing their English lesson and daily study habits.`,
      turns: [
        { speaker: 'Hazem', text: `Hello, Omar! What unit are you studying in English today?`, isBlank: false },
        { speaker: 'Omar', isBlank: true, blankNumber: 1, expectedAnswer: `We are learning about ${title.toLowerCase()}.`, acceptableAnswers: [`We're studying ${title}.`, `It is about ${title}.`], hintAr: `أخبره بما تدرسونه في هذه الوحدة (${titleAr})` },
        { speaker: 'Hazem', text: `That sounds interesting! What does the word "${(kw0 as any).word}" mean?`, isBlank: false },
        { speaker: 'Omar', isBlank: true, blankNumber: 2, expectedAnswer: `It means "${(kw0 as any).meaningAr || (kw0 as any).ar || 'مجتمع'}" in Arabic.`, acceptableAnswers: [`It means ${(kw0 as any).meaningAr || (kw0 as any).ar || 'مجتمع'}.`], hintAr: `وضح معنى الكلمة بالعربية: ${(kw0 as any).meaningAr || (kw0 as any).ar || 'مجتمع'}` },
        { speaker: 'Hazem', isBlank: true, blankNumber: 3, expectedAnswer: `How can we practice this in our daily life?`, acceptableAnswers: [`What should we do?`, `How do you practice it?`], hintAr: `اسأل سؤالاً عن كيفية التطبيق العملي` },
        { speaker: 'Omar', text: `We can do voluntary work and cooperate with our teachers and classmates.`, isBlank: false },
        { speaker: 'Hazem', text: `Do your parents feel proud when you get high marks?`, isBlank: false },
        { speaker: 'Omar', isBlank: true, blankNumber: 4, expectedAnswer: `Yes, of course, they feel very proud of me.`, acceptableAnswers: [`Yes, they do.`, `Yes, certainly.`], hintAr: `أجب بالإيجاب مؤكداً شعور الفخر` },
        { speaker: 'Hazem', isBlank: true, blankNumber: 5, expectedAnswer: `Thank you for this great conversation! Good luck!`, acceptableAnswers: [`Thanks a lot!`, `Good luck!`], hintAr: `عبّر عن الشكر أو تمني التوفيق` }
      ]
    },
    readingPassage: {
      title: passageTitle,
      passage: passageText,
      mcqs: [
        {
          id: `synth_r1`,
          skill: 'Reading',
          difficulty: 'standard',
          question: `What is the general main idea of this reading passage?`,
          options: [
            `Understanding the fundamental concepts of ${title} and moral diligence`,
            'Avoiding school responsibilities and homework',
            'Focusing purely on entertainment without academic effort',
            'Traveling abroad without planning or preparation'
          ],
          correctAnswer: 'A',
          explanation: `The passage explores the core theme of ${title} and practical life lessons.`,
          exam_trap_explanation: 'Examiners look for the holistic theme rather than isolated narrative details.'
        },
        {
          id: `synth_r2`,
          skill: 'Reading',
          difficulty: 'hots',
          question: `In the passage, the word "${(kw0 as any).word}" contextually refers to:`,
          options: [
            (kw0 as any).meaningEn || (kw0 as any).def || 'a group of people living together',
            'a sudden negative outcome',
            'an impossible educational challenge',
            'a temporary disagreement between peers'
          ],
          correctAnswer: 'A',
          explanation: `"${(kw0 as any).word}" is defined as: ${(kw0 as any).meaningEn || (kw0 as any).def || 'a group of people living together'}.`,
          exam_trap_explanation: 'Contextual synonym questions in Prep exams demand finding the standard lexical definition rather than colloquial usage.'
        },
        {
          id: `synth_r3`,
          skill: 'Reading',
          difficulty: 'standard',
          question: `According to the text, how do successful students achieve their goals?`,
          options: [
            'By being persistent, disciplined, and cooperating with others',
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
          id: `synth_oe1`,
          question: `Infer from the passage: Why is education regarded as essential for Egyptian prep students?`,
          questionAr: `استنتج من النص: لماذا يُعد التعليم ضرورياً لطلاب المرحلة الإعدادية في مصر؟`,
          modelAnswer: `It fosters personal responsibility, cooperative problem-solving, and civic commitment within the school and wider community.`,
          rubric: 'Relevance to text (1 Mark) · Grammatical and lexical correctness (1 Mark)',
          maxMarks: 2
        },
        {
          id: `synth_oe2`,
          question: `Suggest a suitable alternative title for the reading passage, providing your rationale.`,
          questionAr: `اقترح عنواناً مناسباً آخر للنص القرائي مع ذكر السبب بإيجاز.`,
          modelAnswer: `A suitable title is "Pathways to Excellence in ${title}", because the text focuses on diligence, moral character, and purposeful learning.`,
          rubric: 'Appropriate title (1 Mark) · Valid logical reason (1 Mark)',
          maxMarks: 2
        }
      ]
    },
    vocabGrammarMcqs: (exam.questions && exam.questions.length >= 6 ? exam.questions.slice(0, 6) : [
      {
        id: `synth_mcq1`,
        skill: 'Vocabulary',
        difficulty: 'standard',
        question: `The term "${(kw0 as any).word}" corresponds to which Arabic meaning?`,
        options: [(kw0 as any).meaningAr || (kw0 as any).ar || 'المعنى الأول', 'إهمال متعمد', 'مغامرة خطيرة', 'خسارة مادية'],
        correctAnswer: 'A',
        explanation: `"${(kw0 as any).word}" corresponds directly to "${(kw0 as any).meaningAr || (kw0 as any).ar}".`,
        exam_trap_explanation: 'Beware of distractors that sound similar in Arabic but have completely unrelated meanings.'
      },
      {
        id: `synth_mcq2`,
        skill: 'Vocabulary',
        difficulty: 'standard',
        question: `Which word is defined as: "${(kw1 as any).meaningEn || (kw1 as any).def || 'a person who works for free'}"?`,
        options: [(kw1 as any).word || 'volunteer', 'nuisance', 'critic', 'pessimist'],
        correctAnswer: 'A',
        explanation: `The defined word is ${(kw1 as any).word}.`,
        exam_trap_explanation: 'Always verify the core definition provided in the New Hello Student Book.'
      },
      {
        id: `synth_mcq3`,
        skill: 'Vocabulary',
        difficulty: 'hots',
        question: `Which academic collocation accurately completes: "Students should always ____________ in their community"?`,
        options: ['do voluntary work', 'break basic rules', 'lose their textbooks', 'quarrel constantly'],
        correctAnswer: 'A',
        explanation: 'The official target collocation is "do voluntary work".',
        exam_trap_explanation: 'Collocation questions test natural word partnerships; verbs cannot be arbitrarily interchanged.'
      },
      {
        id: `synth_mcq4`,
        skill: 'Grammar',
        difficulty: 'standard',
        question: `Identify the grammatically correct sentence:`,
        options: [
          'He always completes his homework on time.',
          'He don’t complete his homework.',
          'They was finishing yesterday.',
          'She have completed two book.'
        ],
        correctAnswer: 'A',
        explanation: 'Follows proper subject-verb agreement and present simple tense.',
        exam_trap_explanation: 'Watch for subject-verb agreement pitfalls like "he don’t" or auxiliary confusion.'
      },
      {
        id: `synth_mcq5`,
        skill: 'Grammar',
        difficulty: 'hots',
        question: `Choose the correct form according to Egyptian Ministry specifications:`,
        options: [
          'We are looking forward to achieving high scores.',
          'We looking forward achieve high scores.',
          'We look forward achieve score.',
          'We are looked forward achieving.'
        ],
        correctAnswer: 'A',
        explanation: 'Follows proper tense, verb complementation, and structural rules ("look forward to + verb-ing").',
        exam_trap_explanation: 'Ministry examinations frequently test verbs followed by gerunds or specific prepositions.'
      },
      {
        id: `synth_mcq6`,
        skill: 'Grammar',
        difficulty: 'hots',
        question: `In a ministerial dialogue question, which answer structure is fully accurate?`,
        options: [
          'Yes, I usually do because it benefits everyone.',
          'Yes, I does because it good.',
          'No, he didn’t went to school.',
          'Because she are very intelligent.'
        ],
        correctAnswer: 'A',
        explanation: 'Maintains consistent tense and auxiliary verb alignment.',
        exam_trap_explanation: 'Remember that "didn’t" must be followed by infinitive, and third-person pronouns require singular verbs.'
      }
    ]),
    errorCorrection: [
      {
        id: `synth_err1`,
        sentence: `He (not like) waking up late on school mornings.`,
        bracketWord: 'not like',
        correctWord: "doesn't like",
        explanation: `In the present simple with singular subject "he", negative form is "doesn't + infinitive".`,
        explanationAr: `مع المفرد الغائب (He) يُنفى المضارع البسيط باستخدام doesn't + المصدر.`,
        exam_trap_explanation: 'Do not write "don’t like" or "isn’t like".'
      },
      {
        id: `synth_err2`,
        sentence: `They are keen on (read) informative historical articles.`,
        bracketWord: 'read',
        correctWord: 'reading',
        explanation: `Prepositions such as "on", "in", "at", and "about" are followed by the verb-ing (gerund).`,
        explanationAr: `حروف الجر يتبعها دائماً اسم أو فعل مضاف له -ing.`,
        exam_trap_explanation: 'Students frequently forget to add -ing after prepositions like "keen on".'
      },
      {
        id: `synth_err3`,
        sentence: `How (many) water do you drink during summer days?`,
        bracketWord: 'many',
        correctWord: 'much',
        explanation: `Water is an uncountable noun, so we ask about its quantity using "How much", not "How many".`,
        explanationAr: `الماء اسم لا يُعد وبالتالي نستخدم How much وليس How many.`,
        exam_trap_explanation: 'Remember: "How many" is strictly for countable plural nouns.'
      },
      {
        id: `synth_err4`,
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
      title: `Write a paragraph of (90-110) words on: "${title}"`,
      prompt: `Write a coherent, well-structured paragraph of about 90 to 110 words discussing "${title}". Highlight key vocabulary (${(kw0 as any).word}, ${(kw1 as any).word}), describe how young Egyptians apply these values, and conclude with a piece of moral advice for your peers.`,
      promptAr: `اكتب فقرة من 90 إلى 110 كلمات عن "${titleAr}"، موظفاً المفردات الأساسية والنصائح الإيجابية.`,
      targetWords: '90 - 110 words',
      guidancePoints: [
        `Introduce the importance of ${title.toLowerCase()} in our lives.`,
        `Describe how students can cooperate with each other and practice good study habits.`,
        'Conclude with an encouraging summary advice for fellow classmates.'
      ],
      modelAnswer: `${title} plays a vital role in our daily lives and educational journey. As Egyptian prep students, it is essential to understand that dedication, cooperation, and respect form the foundation of our success. For instance, when we help our classmates and do voluntary work, we not only assist our community but also develop essential life skills. Moreover, being proud of our heritage encourages us to study harder. In conclusion, every student should embrace positive values, respect teachers, and strive to build a brighter future for Egypt.`,
      rubricCriteria: [
        { criterion: 'Task Relevance & Ideas (Content)', marks: 4 },
        { criterion: 'Vocabulary Choice & Collocations', marks: 3 },
        { criterion: 'Grammar Accuracy & Punctuation', marks: 3 }
      ]
    }
  };
}

interface CurriculumExamModalProps {
  exam: UnitExam;
  student: StudentProfile | null;
  track?: 'general_secondary' | 'baccalaureate' | 'egyptian_baccalaureate' | string;
  grade?: number;
  unitCurriculum?: UnitCurriculum | null;
  onClose: () => void;
  onStudentUpdated?: (updated: StudentProfile) => void;
}

export const CurriculumExamModal: React.FC<CurriculumExamModalProps> = ({
  exam,
  student,
  track = 'general_secondary',
  grade = 10,
  unitCurriculum,
  onClose,
  onStudentUpdated,
}) => {
  // Track detection
  const isBaccalaureate =
    track === 'baccalaureate' ||
    track === 'egyptian_baccalaureate' ||
    exam.examTitle.toLowerCase().includes('baccalaureate') ||
    (exam as any).trackType === 'baccalaureate';

  const isPrepStage =
    (grade >= 7 && grade <= 9) ||
    unitCurriculum?.stage === 'Preparatory' ||
    exam.stage === 'Preparatory' ||
    exam.examTitle.toLowerCase().includes('prep') ||
    exam.examId.toLowerCase().includes('prep');

  // Preparatory Blueprint
  const prepBlueprint = isPrepStage ? getOrSynthesizePrepBlueprint(exam, unitCurriculum) : null;

  // Secondary/Baccalaureate Navigation & Section state
  const [activeSection, setActiveSection] = useState<'mcq' | 'reading' | 'written'>('mcq');

  // Preparatory Navigation Section: 5 Official MOE Sections
  const [prepActiveSection, setPrepActiveSection] = useState<
    'dialogue' | 'reading' | 'vocab_grammar' | 'error_correction' | 'writing'
  >('dialogue');

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [qId: string]: 'A' | 'B' | 'C' | 'D' }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [showRubricModal, setShowRubricModal] = useState(false);
  const [readingMobileTab, setReadingMobileTab] = useState<'passage' | 'questions'>('passage');

  // Secondary Written Section Answers (15%)
  const [novelAnswer, setNovelAnswer] = useState('');
  const [essayAnswer, setEssayAnswer] = useState('');
  const [openNovelHint, setOpenNovelHint] = useState(false);

  // Preparatory Specific Student Answers
  const [dialogueAnswers, setDialogueAnswers] = useState<{ [blankNum: number]: string }>({});
  const [readingOpenEndedAnswers, setReadingOpenEndedAnswers] = useState<{ [oeId: string]: string }>({});
  const [errorCorrectionAnswers, setErrorCorrectionAnswers] = useState<{ [errId: string]: string }>({});
  const [prepWritingAnswer, setPrepWritingAnswer] = useState('');
  const [openHintForBlank, setOpenHintForBlank] = useState<{ [blankNum: number]: boolean }>({});

  // 30 minute countdown timer (or exam.durationMinutes)
  const initialSeconds = (exam.durationMinutes || 30) * 60;
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const timerRef = useRef<any>(null);

  // Score states
  const [score, setScore] = useState(0);
  const [maxScore, setMaxScore] = useState(isPrepStage ? 30 : exam.questions.length * 2 + 10);
  const [percentage, setPercentage] = useState(0);
  const [skillBreakdown, setSkillBreakdown] = useState<{ [skill: string]: { correct: number; total: number } }>({});

  // Audio speech synthesis
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Questions split: MCQs vs Reading Questions
  const allQuestions = exam.questions;
  const readingQuestions = allQuestions.filter(
    q => q.skill === 'Reading' || q.question_type === 'reading_comprehension'
  );
  const mcqQuestions = allQuestions.filter(
    q => q.skill !== 'Reading' && q.question_type !== 'reading_comprehension'
  );

  // Reading Passage source
  const defaultPassageText = unitCurriculum?.readingModule?.passage || `In today's interconnected global landscape, technological innovation and sustainable ecological governance have emerged as the twin pillars of socioeconomic transformation. In Egypt, landmark projects such as the Benban Solar Park in Aswan represent a pivotal paradigm shift toward renewable energy sovereignty. Researchers argue that technological leapfrogging—the rapid adoption of advanced green technologies without navigating the polluting stages of historical industrialization—empowers emerging nations to achieve sustainable development goals while safeguarding biodiversity. However, this transition is not devoid of challenges; equitable workforce reskilling, robust grid infrastructure, and digital accessibility remain decisive prerequisites to guarantee that sustainable progress benefits all segments of society equitably.`;
  const passageTitle = unitCurriculum?.readingModule?.passageTitle || 'Technological Sovereignty & Sustainable Ecosystems';

  // Novel & Essay prompts calibrated by Grade & Track
  const novelMeta = isBaccalaureate
    ? {
        novelTitle: 'Egyptian Baccalaureate Advanced Literary Analysis',
        question: 'Examine how rhetorical devices, dramatic irony, and thematic dialectics in classical and contemporary drama reflect the tension between societal expectations and individual autonomy. Support your analysis with critical textual references.',
        questionAr: 'حلل كيف تعكس الأساليب البلاغية والمفارقة الدرامية التوتر الجوهري بين التوقعات المجتمعية والإرادة الفردية في النصوص الأدبية المقررة.',
        modelAnswer: 'The core dialectic between societal convention and personal agency is highlighted through systematic dramatic irony and symbolic motif deployment. Characters operate within rigid societal codes while confronting their existential imperatives, creating heightened tragic resonance.',
        rubric: 'Thesis clarity (2 Marks) · Critical insight & textual evidence (3 Marks) · Academic register & diction (2 Marks)'
      }
    : grade === 11
    ? {
        novelTitle: 'King Lear by William Shakespeare',
        question: 'How does King Lear\'s tragic downfall illustrate the danger of confusing filial flattery with genuine loyalty? Analyze the consequences of his rash division of the kingdom.',
        questionAr: 'كيف يوضح السقوط التراجيدي للملك لير خطورة الخلط بين النفاق والتملق وبين الولاء الحقيقي والبر؟ ناقش عواقب تقسيمه المتسرع للمملكة.',
        modelAnswer: 'Lear’s tragic flaw (hamartia) stems from his excessive pride and blind demand for superficial adulation. By rewarding the deceitful flattery of Goneril and Regan while exiling the genuinely devoted Cordelia, he shatters both political harmony and familial sanctitude, directly catalyzing chaos and madness.',
        rubric: 'Critical depth & thematic awareness (2 Marks) · Textual evidence & character arc (2 Marks) · Linguistic clarity (1 Mark)'
      }
    : grade === 12
    ? {
        novelTitle: 'Great Expectations by Charles Dickens',
        question: 'Trace Pip\'s moral transformation throughout the novel. In what ways does Dickens critique Victorian social snobbery through Pip\'s disillusionment with high society?',
        questionAr: 'تتبع التحول الأخلاقي لشخصية بيب في الرواية، وكيف وجه ديكنز نقداً لاذعاً للطبقية والغطرسة الاجتماعية الفيكتورية من خلال خيبة أمل بيب.',
        modelAnswer: 'Dickens utilizes Pip’s trajectory to challenge the 19th-century equation of wealth with moral nobility. Upon learning that his secret benefactor is the convict Magwitch rather than the wealthy Miss Havisham, Pip confronts his own snobbery and discovers that true gentility resides in loyalty, empathy, and integrity rather than superficial wealth.',
        rubric: 'Thematic depth (2 Marks) · Character evaluation (2 Marks) · Expressive precision (1 Mark)'
      }
    : {
        novelTitle: 'The Old Man and the Sea by Ernest Hemingway',
        question: 'Analyze Hemingway’s central theme: "A man can be destroyed, but not defeated." How does Santiago embody resilience in the face of inevitable adversity?',
        questionAr: 'حلل المقولة الشهيرة "الإنسان قد يُدمَّر لكنه لا يُهزم". كيف جسد سانتياجو أسمى معاني الصمود والإصرار أمام قسوة الطبيعة؟',
        modelAnswer: 'Santiago’s epic duel with the marlin and his subsequent struggle against the sharks reflect the invincible human spirit. Even when his physical catch is decimated, his dignity, humility, and moral victory remain unblemished, proving that true heroism lies in endurance and noble effort.',
        rubric: 'Analytical insight (2 Marks) · Evidence from narrative (2 Marks) · Clarity of expression (1 Mark)'
      };

  const essayPrompt = isBaccalaureate
    ? {
        title: 'Academic Argumentative Synthesis (150 - 200 words)',
        prompt: 'Compose an academic argumentative essay examining whether technological automation enhances human potential or accelerates socioeconomic disparity. Provide a well-defined thesis, balanced counter-arguments, and persuasive evidence.',
        targetWords: '150 - 200 words'
      }
    : {
        title: 'Official MOE Composition / Essay Prompt (150 - 200 words)',
        prompt: 'Write a well-structured essay of about 150 to 200 words on: "The Crucial Role of Modern Green Technology in Safeguarding Egypt\'s Environmental Future for Upcoming Generations". Include a compelling introduction, coherent body paragraphs, and a reflective conclusion.',
        targetWords: '150 - 200 words'
      };

  // Word count calculations
  const essayWordCount = essayAnswer.trim().split(/\s+/).filter(Boolean).length;
  const novelWordCount = novelAnswer.trim().split(/\s+/).filter(Boolean).length;
  const prepWritingWordCount = prepWritingAnswer.trim().split(/\s+/).filter(Boolean).length;

  useEffect(() => {
    if (isSubmitted) return;

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [isSubmitted]);

  const handleSelectOption = (qId: string, optionLetter: 'A' | 'B' | 'C' | 'D') => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [qId]: optionLetter }));
  };

  const handleAutoSubmit = () => {
    calculateResults();
  };

  const handleSubmitExam = () => {
    setShowSubmitConfirm(false);
    calculateResults();
  };

  const calculateResults = () => {
    clearInterval(timerRef.current);

    // ========================================================
    // PREPARATORY OFFICIAL MOE 30-MARK SCORING ENGINE
    // ========================================================
    if (isPrepStage && prepBlueprint) {
      // 1. Language Functions (Dialogue): 5 Marks (1 mark per blank)
      let dialogueEarned = 0;
      prepBlueprint.dialogue.turns.forEach(t => {
        if (t.isBlank && t.blankNumber) {
          const userVal = (dialogueAnswers[t.blankNumber] || '').trim().toLowerCase();
          if (userVal.length >= 2) {
            const matchesExpected = t.expectedAnswer && userVal.includes(t.expectedAnswer.toLowerCase().slice(0, 4));
            const matchesAcceptable = t.acceptableAnswers?.some(acc => userVal.includes(acc.toLowerCase().slice(0, 4)));
            if (matchesExpected || matchesAcceptable || userVal.length >= 4) {
              dialogueEarned += 1;
            }
          }
        }
      });

      // 2. Reading Comprehension: 5 Marks (3 MCQs @ 1 Mark + 2 Open-ended @ 1 Mark)
      let readingEarned = 0;
      prepBlueprint.readingPassage.mcqs.forEach(rq => {
        if (selectedAnswers[rq.id] === rq.correctAnswer) {
          readingEarned += 1;
        }
      });
      prepBlueprint.readingPassage.openEnded.forEach(oe => {
        const oeAns = (readingOpenEndedAnswers[oe.id] || '').trim();
        if (oeAns.length >= 8) {
          readingEarned += 1;
        }
      });

      // 3. Vocabulary & Structure MCQs: 6 Marks (1 Mark each)
      let vocabGrammarEarned = 0;
      prepBlueprint.vocabGrammarMcqs.forEach(vq => {
        if (selectedAnswers[vq.id] === vq.correctAnswer) {
          vocabGrammarEarned += 1;
        }
      });

      // 4. Error Correction: 4 Marks (1 Mark each)
      let errorCorrectionEarned = 0;
      prepBlueprint.errorCorrection.forEach(item => {
        const studentCorrection = (errorCorrectionAnswers[item.id] || '').trim().toLowerCase();
        const expected = item.correctWord.toLowerCase().trim();
        if (
          studentCorrection === expected ||
          (expected.includes("'") && studentCorrection.replace("'", "") === expected.replace("'", ""))
        ) {
          errorCorrectionEarned += 1;
        }
      });

      // 5. Guided Writing Task: 10 Marks
      let writingEarned = 0;
      if (prepWritingWordCount >= 85) writingEarned = 10;
      else if (prepWritingWordCount >= 60) writingEarned = 8;
      else if (prepWritingWordCount >= 40) writingEarned = 6;
      else if (prepWritingWordCount >= 20) writingEarned = 4;
      else if (prepWritingWordCount >= 5) writingEarned = 2;

      const totalEarned = dialogueEarned + readingEarned + vocabGrammarEarned + errorCorrectionEarned + writingEarned;
      const totalPossible = 30;
      const pct = Math.round((totalEarned / totalPossible) * 100);

      const prepSkills: { [skill: string]: { correct: number; total: number } } = {
        'Language Functions (المحادثة)': { correct: dialogueEarned, total: 5 },
        'Reading Comprehension (فهم المقروء)': { correct: readingEarned, total: 5 },
        'Vocabulary & Structure (المفردات والقواعد)': { correct: vocabGrammarEarned, total: 6 },
        'Error Correction (تصحيح الأخطاء)': { correct: errorCorrectionEarned, total: 4 },
        'Guided Writing (موضوع التعبير)': { correct: writingEarned, total: 10 }
      };

      setScore(totalEarned);
      setMaxScore(totalPossible);
      setPercentage(pct);
      setSkillBreakdown(prepSkills);
      setIsSubmitted(true);

      if (student?.id) {
        try {
          const result = recordExamCompletion({
            examId: exam.examId,
            examTitle: exam.examTitle,
            category: 'curriculum_unit_exam',
            score: totalEarned,
            maxMarks: totalPossible,
            percentage: pct
          });
          if (result?.student && onStudentUpdated) {
            onStudentUpdated(result.student);
          }
        } catch (err) {
          console.error('Failed to record prep exam result:', err);
        }
      }
      return;
    }

    // ========================================================
    // SECONDARY & BACCALAUREATE SCORING ENGINE
    // ========================================================
    let earned = 0;
    const skills: { [skill: string]: { correct: number; total: number } } = {};

    allQuestions.forEach(q => {
      const skillName = q.skill || 'General';
      if (!skills[skillName]) {
        skills[skillName] = { correct: 0, total: 0 };
      }
      skills[skillName].total += 1;

      const chosen = selectedAnswers[q.id];
      if (chosen === q.correctAnswer) {
        earned += 2;
        skills[skillName].correct += 1;
      }
    });

    // Score 15% Written section based on word count & effort
    let writtenEarned = 0;
    if (novelWordCount >= 30) writtenEarned += 4;
    else if (novelWordCount > 10) writtenEarned += 2;

    if (essayWordCount >= 140) writtenEarned += 6;
    else if (essayWordCount >= 70) writtenEarned += 3;

    const totalEarned = earned + writtenEarned;
    const totalPossible = allQuestions.length * 2 + 10;
    const pct = Math.round((totalEarned / totalPossible) * 100);

    setScore(totalEarned);
    setMaxScore(totalPossible);
    setPercentage(pct);
    setSkillBreakdown(skills);
    setIsSubmitted(true);

    if (student?.id) {
      try {
        const result = recordExamCompletion({
          examId: exam.examId,
          examTitle: exam.examTitle,
          category: 'curriculum_unit_exam',
          score: totalEarned,
          maxMarks: totalPossible,
          percentage: pct
        });
        if (result?.student && onStudentUpdated) {
          onStudentUpdated(result.student);
        }
      } catch (err) {
        console.error('Failed to record curriculum exam result:', err);
      }
    }
  };

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remaining = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remaining.toString().padStart(2, '0')}`;
  };

  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    if (isSpeaking) {
      setIsSpeaking(false);
      return;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.95;
    setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const answeredCount = Object.keys(selectedAnswers).length;
  const currentQ = allQuestions[currentQuestionIndex] || allQuestions[0];
  const optionLetters: ('A' | 'B' | 'C' | 'D')[] = ['A', 'B', 'C', 'D'];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-6xl shadow-2xl border border-slate-100 flex flex-col max-h-[95vh] overflow-hidden">
        
        {/* ========================================================
            A. HEADER BADGE & INFO BAR
           ======================================================== */}
        <header className="px-5 py-4 bg-gradient-to-r from-[#0B397D] via-[#0957B7] to-[#0878E8] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md shrink-0 border-b border-blue-400/20">
          <div className="space-y-1.5 flex-1 min-w-0">
            {/* Top Official Track Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 border border-white/20 text-white text-[11px] sm:text-xs font-black shadow-inner tracking-wide">
              <Award className="w-3.5 h-3.5 text-[#FFC928]" />
              <span>
                {isPrepStage
                  ? 'الامتحان الرسمي للمرحلة الإعدادية - مطابق لمواصفات وزارة التربية والتعليم'
                  : isBaccalaureate
                  ? 'Advanced Collegiate Assessment Model (Literature & Critical Synthesis)'
                  : 'نظام التقييم الرسمي لوزارة التربية والتعليم (85% بابل شيت / إلكتروني + 15% مقالي)'}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <h2 className="text-base sm:text-lg font-black leading-tight truncate">
                {exam.examTitle}
              </h2>
              {exam.examTitleAr && (
                <span className="text-xs text-blue-200 hidden md:inline truncate" dir="rtl">
                  {exam.examTitleAr}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
            {/* Floating Countdown Timer */}
            {!isSubmitted && (
              <div
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full font-mono text-sm font-black shadow-inner border transition-all ${
                  timeLeft < 300
                    ? 'bg-rose-500 text-white border-rose-400 animate-pulse'
                    : 'bg-white/15 text-white border-white/25'
                }`}
                title="Exam Countdown Timer"
              >
                <Clock className="w-4 h-4 text-[#FFC928]" />
                <span>{formatTimer(timeLeft)}</span>
              </div>
            )}

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/20 text-white/80 hover:text-white transition-all cursor-pointer"
              title="Close Exam Window"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Section Navigation Tabs & Fast Navigator */}
        {!isSubmitted && (
          <div className="bg-slate-100/90 border-b border-slate-200 px-5 py-2.5 flex flex-wrap items-center justify-between gap-3 shrink-0">
            {/* Section Switcher */}
            {isPrepStage && prepBlueprint ? (
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                <button
                  type="button"
                  onClick={() => setPrepActiveSection('dialogue')}
                  className={`px-3 py-1.5 text-xs font-black rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                    prepActiveSection === 'dialogue'
                      ? 'bg-[#0B397D] text-white shadow-xs'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#FFC928]" />
                  <span>1. المحادثة (Dialogue · 5 Marks)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPrepActiveSection('reading')}
                  className={`px-3 py-1.5 text-xs font-black rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                    prepActiveSection === 'reading'
                      ? 'bg-[#0B397D] text-white shadow-xs'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5 text-[#0878E8]" />
                  <span>2. قطعة الفهم (Reading · 5 Marks)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPrepActiveSection('vocab_grammar')}
                  className={`px-3 py-1.5 text-xs font-black rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                    prepActiveSection === 'vocab_grammar'
                      ? 'bg-[#0B397D] text-white shadow-xs'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <Target className="w-3.5 h-3.5 text-emerald-600" />
                  <span>3. الاختياري (Vocab &amp; Grammar · 6 Marks)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPrepActiveSection('error_correction')}
                  className={`px-3 py-1.5 text-xs font-black rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                    prepActiveSection === 'error_correction'
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'bg-white text-amber-900 border border-amber-200 hover:bg-amber-50'
                  }`}
                >
                  <Edit3 className="w-3.5 h-3.5 text-amber-500" />
                  <span>4. تصحيح الخطأ (Error Correction · 4 Marks)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPrepActiveSection('writing')}
                  className={`px-3 py-1.5 text-xs font-black rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                    prepActiveSection === 'writing'
                      ? 'bg-purple-900 text-white shadow-xs'
                      : 'bg-white text-purple-900 border border-purple-200 hover:bg-purple-50'
                  }`}
                >
                  <PenTool className="w-3.5 h-3.5 text-purple-400" />
                  <span>5. موضوع التعبير (Writing · 10 Marks)</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                <button
                  type="button"
                  onClick={() => {
                    setActiveSection('mcq');
                    const firstMcqIdx = allQuestions.findIndex(q => q.skill !== 'Reading' && q.question_type !== 'reading_comprehension');
                    if (firstMcqIdx !== -1) setCurrentQuestionIndex(firstMcqIdx);
                  }}
                  className={`px-3 py-1.5 text-xs font-black rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                    activeSection === 'mcq'
                      ? 'bg-[#0B397D] text-white shadow-xs'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <Target className="w-3.5 h-3.5 text-[#FFC928]" />
                  <span>Section A: Core MCQs ({mcqQuestions.length} Qs · 85%)</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setActiveSection('reading');
                    const firstReadIdx = allQuestions.findIndex(q => q.skill === 'Reading' || q.question_type === 'reading_comprehension');
                    if (firstReadIdx !== -1) setCurrentQuestionIndex(firstReadIdx);
                  }}
                  className={`px-3 py-1.5 text-xs font-black rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                    activeSection === 'reading'
                      ? 'bg-[#0B397D] text-white shadow-xs'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5 text-[#0878E8]" />
                  <span>Section B: Reading Split-View ({readingQuestions.length || 5} Qs)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveSection('written')}
                  className={`px-3 py-1.5 text-xs font-black rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                    activeSection === 'written'
                      ? 'bg-purple-900 text-white shadow-xs'
                      : 'bg-white text-purple-900 border border-purple-200 hover:bg-purple-50'
                  }`}
                >
                  <PenTool className="w-3.5 h-3.5 text-purple-400" />
                  <span>قسم الأسئلة المقالية (Written · 15%)</span>
                </button>
              </div>
            )}

            {/* Quick Answered Stat */}
            <div className="text-xs font-bold text-slate-500">
              {isPrepStage && prepBlueprint ? (
                <>
                  Completed Items:{' '}
                  <strong className="text-[#0B397D]">
                    {Object.keys(dialogueAnswers).filter(k => (dialogueAnswers[Number(k)] || '').trim().length > 0).length +
                      prepBlueprint.readingPassage.mcqs.filter(q => !!selectedAnswers[q.id]).length +
                      prepBlueprint.vocabGrammarMcqs.filter(q => !!selectedAnswers[q.id]).length +
                      Object.keys(readingOpenEndedAnswers).filter(k => (readingOpenEndedAnswers[k] || '').trim().length > 0).length +
                      Object.keys(errorCorrectionAnswers).filter(k => (errorCorrectionAnswers[k] || '').trim().length > 0).length +
                      (prepWritingWordCount >= 10 ? 1 : 0)}
                  </strong>{' '}
                  / 21
                </>
              ) : (
                <>
                  MCQs Answered: <strong className="text-[#0B397D]">{answeredCount}</strong> / {allQuestions.length}
                </>
              )}
            </div>
          </div>
        )}

        {/* ========================================================
            QUESTION NAVIGATOR GRID
           ======================================================== */}
        {!isSubmitted && (
          <div className="bg-slate-50 px-5 py-2.5 border-b border-slate-200/80 flex items-center gap-2 overflow-x-auto shrink-0">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0">
              {isPrepStage ? 'Sections & Items:' : 'Questions:'}
            </span>

            {isPrepStage && prepBlueprint ? (
              <div className="flex items-center gap-2 flex-1 min-w-0 overflow-x-auto py-0.5">
                {/* 1. Dialogue 1-5 */}
                <div className="flex items-center gap-1 pl-1 pr-2 border-r border-slate-200">
                  <span className="text-[10px] font-black text-slate-400 uppercase">Dialogue:</span>
                  {[1, 2, 3, 4, 5].map((bNum) => {
                    const isAns = (dialogueAnswers[bNum] || '').trim().length > 0;
                    return (
                      <button
                        key={bNum}
                        type="button"
                        onClick={() => setPrepActiveSection('dialogue')}
                        className={`w-6 h-6 rounded-md text-[11px] font-black transition-all flex items-center justify-center cursor-pointer ${
                          prepActiveSection === 'dialogue'
                            ? isAns
                              ? 'bg-emerald-600 text-white'
                              : 'bg-blue-600 text-white'
                            : isAns
                            ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                            : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                        }`}
                        title={`Dialogue Blank ${bNum}`}
                      >
                        {bNum}
                      </button>
                    );
                  })}
                </div>

                {/* 2. Reading 1-5 (3 MCQs + 2 Open-Ended) */}
                <div className="flex items-center gap-1 px-2 border-r border-slate-200">
                  <span className="text-[10px] font-black text-slate-400 uppercase">Reading:</span>
                  {prepBlueprint.readingPassage.mcqs.map((rq, idx) => {
                    const isAns = !!selectedAnswers[rq.id];
                    return (
                      <button
                        key={rq.id}
                        type="button"
                        onClick={() => setPrepActiveSection('reading')}
                        className={`w-6 h-6 rounded-md text-[11px] font-black transition-all flex items-center justify-center cursor-pointer ${
                          prepActiveSection === 'reading'
                            ? isAns
                              ? 'bg-emerald-600 text-white'
                              : 'bg-blue-600 text-white'
                            : isAns
                            ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                            : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                        }`}
                        title={`Reading MCQ ${idx + 1}`}
                      >
                        Q{idx + 1}
                      </button>
                    );
                  })}
                  {prepBlueprint.readingPassage.openEnded.map((oe, idx) => {
                    const isAns = (readingOpenEndedAnswers[oe.id] || '').trim().length > 0;
                    return (
                      <button
                        key={oe.id}
                        type="button"
                        onClick={() => setPrepActiveSection('reading')}
                        className={`w-6 h-6 rounded-md text-[11px] font-black transition-all flex items-center justify-center cursor-pointer ${
                          prepActiveSection === 'reading'
                            ? isAns
                              ? 'bg-purple-700 text-white'
                              : 'bg-purple-600 text-white'
                            : isAns
                            ? 'bg-purple-100 text-purple-900 border border-purple-300'
                            : 'bg-white text-purple-900 border border-purple-200 hover:bg-purple-50'
                        }`}
                        title={`Reading Open-Ended ${idx + 4}`}
                      >
                        Q{idx + 4}
                      </button>
                    );
                  })}
                </div>

                {/* 3. Vocab & Grammar MCQs 1-6 */}
                <div className="flex items-center gap-1 px-2 border-r border-slate-200">
                  <span className="text-[10px] font-black text-slate-400 uppercase">MCQ:</span>
                  {prepBlueprint.vocabGrammarMcqs.map((vq, idx) => {
                    const isAns = !!selectedAnswers[vq.id];
                    return (
                      <button
                        key={vq.id}
                        type="button"
                        onClick={() => setPrepActiveSection('vocab_grammar')}
                        className={`w-6 h-6 rounded-md text-[11px] font-black transition-all flex items-center justify-center cursor-pointer ${
                          prepActiveSection === 'vocab_grammar'
                            ? isAns
                              ? 'bg-emerald-600 text-white'
                              : 'bg-blue-600 text-white'
                            : isAns
                            ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                            : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                        }`}
                        title={`MCQ Item ${idx + 1}`}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>

                {/* 4. Error Correction 1-4 */}
                <div className="flex items-center gap-1 px-2 border-r border-slate-200">
                  <span className="text-[10px] font-black text-slate-400 uppercase">Correction:</span>
                  {prepBlueprint.errorCorrection.map((item, idx) => {
                    const isAns = (errorCorrectionAnswers[item.id] || '').trim().length > 0;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setPrepActiveSection('error_correction')}
                        className={`w-6 h-6 rounded-md text-[11px] font-black transition-all flex items-center justify-center cursor-pointer ${
                          prepActiveSection === 'error_correction'
                            ? isAns
                              ? 'bg-amber-600 text-white'
                              : 'bg-amber-500 text-white'
                            : isAns
                            ? 'bg-amber-100 text-amber-900 border border-amber-300'
                            : 'bg-white text-amber-900 border border-amber-200 hover:bg-amber-50'
                        }`}
                        title={`Correction Item ${idx + 1}`}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>

                {/* 5. Writing */}
                <button
                  type="button"
                  onClick={() => setPrepActiveSection('writing')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-black shrink-0 border transition-all cursor-pointer ${
                    prepActiveSection === 'writing'
                      ? 'bg-purple-900 text-white border-purple-950'
                      : prepWritingWordCount >= 80
                      ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                      : 'bg-purple-50 text-purple-900 border-purple-200 hover:bg-purple-100'
                  }`}
                >
                  ✍️ Writing ({prepWritingWordCount}w)
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 flex-1 min-w-0 overflow-x-auto py-0.5">
                {allQuestions.map((q, idx) => {
                  const isAnswered = !!selectedAnswers[q.id];
                  const isCurrent = idx === currentQuestionIndex && activeSection !== 'written';
                  const isHots = q.difficulty === 'hots' || q.skill === 'Reading';

                  return (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => {
                        setCurrentQuestionIndex(idx);
                        if (q.skill === 'Reading' || q.question_type === 'reading_comprehension') {
                          setActiveSection('reading');
                        } else {
                          setActiveSection('mcq');
                        }
                      }}
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-xs font-black transition-all cursor-pointer flex items-center justify-center shrink-0 relative ${
                        isCurrent
                          ? 'bg-[#0878E8] text-white ring-2 ring-[#0878E8] ring-offset-2'
                          : isAnswered
                          ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                          : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                      }`}
                      title={`Question ${idx + 1} (${q.skill})${isHots ? ' [HOTS]' : ''}`}
                    >
                      <span>{idx + 1}</span>
                      {isHots && (
                        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full border border-white" />
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            {!isPrepStage && (
              <button
                type="button"
                onClick={() => setActiveSection('written')}
                className={`px-2.5 py-1 rounded-lg text-xs font-black shrink-0 border transition-all ${
                  activeSection === 'written'
                    ? 'bg-purple-900 text-white border-purple-950'
                    : 'bg-purple-50 text-purple-900 border-purple-200 hover:bg-purple-100'
                }`}
              >
                ✍️ Written
              </button>
            )}
          </div>
        )}

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 space-y-6">
          {!isSubmitted ? (
            isPrepStage && prepBlueprint ? (
              <div className="space-y-6">
                {/* ========================================================
                    PREPARATORY SECTION 1: LANGUAGE FUNCTIONS (المحادثة)
                   ======================================================== */}
                {prepActiveSection === 'dialogue' && (
                  <div className="max-w-4xl mx-auto space-y-6">
                    {/* Section Banner */}
                    <div className="bg-gradient-to-r from-[#0B397D] via-[#0957B7] to-[#0878E8] text-white p-5 sm:p-6 rounded-2xl shadow-md space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-black uppercase text-blue-100 tracking-wider">
                          Section 1 · Official Language Functions (5 Marks)
                        </span>
                        <span className="text-xs font-mono font-bold bg-white/25 px-2.5 py-0.5 rounded-md text-[#FFC928]">
                          1 Mark per Blank
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-black">
                        السؤال الأول: المحادثة (Language Functions - Complete the Mini-Dialogue)
                      </h3>
                      <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
                        {prepBlueprint.dialogue.title}
                      </p>
                    </div>

                    {/* Context Card */}
                    <div className="bg-blue-50/80 border border-blue-200 rounded-2xl p-4 text-xs sm:text-sm text-blue-900 flex items-center gap-3">
                      <MessageSquare className="w-5 h-5 text-[#0878E8] shrink-0" />
                      <div>
                        <strong className="block font-bold">Context / سياق المحادثة:</strong>
                        <p className="text-slate-700">{prepBlueprint.dialogue.context}</p>
                      </div>
                    </div>

                    {/* Dialogue Turns */}
                    <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-7 space-y-4 shadow-xs">
                      {prepBlueprint.dialogue.turns.map((turn, tIdx) => {
                        const isBlank = turn.isBlank;
                        const bNum = turn.blankNumber || 1;
                        const studentAns = dialogueAnswers[bNum] || '';
                        const showHint = openHintForBlank[bNum];

                        return (
                          <div
                            key={tIdx}
                            className={`p-4 rounded-2xl border transition-all ${
                              isBlank
                                ? 'bg-amber-50/40 border-amber-200/90 shadow-2xs'
                                : 'bg-slate-50/70 border-slate-100'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2 mb-2">
                              <span className={`text-xs font-black px-2.5 py-0.5 rounded-lg ${
                                turn.speaker === 'Hazem' || turn.speaker === 'Student A' || turn.speaker === 'Samy'
                                  ? 'bg-blue-100 text-[#0878E8]'
                                  : 'bg-purple-100 text-purple-900'
                              }`}>
                                {turn.speaker}:
                              </span>

                              {isBlank && (
                                <div className="flex items-center gap-2">
                                  <span className="text-[11px] font-mono font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded-md border border-amber-300">
                                    Blank ({bNum}/5) · 1 Mark
                                  </span>
                                  {turn.hintAr && (
                                    <button
                                      type="button"
                                      onClick={() => setOpenHintForBlank(prev => ({ ...prev, [bNum]: !prev[bNum] }))}
                                      className="text-[11px] font-bold text-amber-800 hover:text-amber-950 flex items-center gap-1 cursor-pointer"
                                    >
                                      <Lightbulb className={`w-3 h-3 ${showHint ? 'fill-current' : ''}`} />
                                      <span>{showHint ? 'إخفاء الفكرة' : 'فكرة السؤال (Hint)'}</span>
                                    </button>
                                  )}
                                </div>
                              )}
                            </div>

                            {isBlank ? (
                              <div className="space-y-2">
                                <input
                                  type="text"
                                  value={studentAns}
                                  onChange={(e) => setDialogueAnswers(prev => ({ ...prev, [bNum]: e.target.value }))}
                                  placeholder={`(${bNum}) Type the complete grammatical response in English...`}
                                  className="w-full p-3 rounded-xl border border-amber-300 bg-white text-sm font-medium focus:ring-2 focus:ring-[#0878E8] focus:border-[#0878E8] outline-none"
                                />
                                {showHint && turn.hintAr && (
                                  <div className="p-2.5 rounded-lg bg-amber-100/70 text-xs text-amber-950 border border-amber-300" dir="rtl">
                                    💡 <strong>توجيه إرشادي:</strong> {turn.hintAr}
                                  </div>
                                )}
                              </div>
                            ) : (
                              <p className="text-sm font-semibold text-slate-800 leading-relaxed">
                                {turn.text}
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Section Footer */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="text-xs text-slate-500 font-medium">
                        Blanks completed: <strong>{Object.keys(dialogueAnswers).filter(k => (dialogueAnswers[Number(k)] || '').trim().length > 0).length}</strong> / 5
                      </div>
                      <button
                        type="button"
                        onClick={() => setPrepActiveSection('reading')}
                        className="px-6 py-2.5 rounded-full bg-[#0878E8] hover:bg-[#0768c9] text-white font-bold text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
                      >
                        <span>Proceed to Section 2: Reading Comprehension</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* ========================================================
                    PREPARATORY SECTION 2: READING COMPREHENSION (القطعة)
                   ======================================================== */}
                {prepActiveSection === 'reading' && (
                  <div className="space-y-4">
                    {/* Mobile Tab Switcher */}
                    <div className="flex lg:hidden items-center justify-between bg-slate-100 p-1 rounded-xl border border-slate-200">
                      <button
                        type="button"
                        onClick={() => setReadingMobileTab('passage')}
                        className={`flex-1 py-2 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                          readingMobileTab === 'passage'
                            ? 'bg-[#0B397D] text-white shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>📖 Reading Passage</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setReadingMobileTab('questions')}
                        className={`flex-1 py-2 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                          readingMobileTab === 'questions'
                            ? 'bg-[#0B397D] text-white shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>📝 Questions (3 MCQs + 2 Open-Ended)</span>
                      </button>
                    </div>

                    {/* Split Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                      {/* LEFT: Passage Panel with Line Numbers */}
                      <div
                        className={`lg:col-span-6 xl:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col ${
                          readingMobileTab === 'passage' ? 'block' : 'hidden lg:flex'
                        } lg:sticky lg:top-4 max-h-[75vh] overflow-hidden`}
                      >
                        <div className="p-4 sm:p-5 border-b border-slate-100 bg-slate-50/90 flex items-center justify-between gap-3 shrink-0">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-blue-100 text-[#0878E8]">
                                Official Unseen Passage
                              </span>
                              <span className="text-[10px] font-mono text-slate-400">
                                5 Marks Total
                              </span>
                            </div>
                            <h3 className="text-base font-bold text-slate-900 mt-1">
                              {prepBlueprint.readingPassage.title}
                            </h3>
                          </div>

                          <button
                            type="button"
                            onClick={() => speakText(prepBlueprint.readingPassage.passage)}
                            className={`px-3 py-1.5 text-xs rounded-xl border flex items-center gap-1.5 font-bold transition-all cursor-pointer shrink-0 ${
                              isSpeaking
                                ? 'bg-rose-50 border-rose-300 text-rose-700 animate-pulse'
                                : 'bg-white border-slate-200 text-[#0B397D] hover:bg-blue-50'
                            }`}
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                            <span>{isSpeaking ? 'Stop' : 'Listen'}</span>
                          </button>
                        </div>

                        {/* Passage Text with Line Numbers */}
                        <div className="p-5 overflow-y-auto space-y-3 font-serif text-sm sm:text-base text-slate-800 leading-relaxed divide-y divide-slate-100">
                          {prepBlueprint.readingPassage.passage.split('\n\n').map((paragraph, pIdx) => {
                            const lines = paragraph.split('. ').filter(Boolean);
                            return (
                              <div key={pIdx} className="pt-3 first:pt-0 space-y-2">
                                {lines.map((line, lIdx) => {
                                  const lineNumber = pIdx * 4 + lIdx * 2 + 1;
                                  return (
                                    <div key={lIdx} className="flex items-start gap-3 group">
                                      <span className="font-mono text-[10px] text-slate-400 select-none w-6 text-right shrink-0 pt-0.5 group-hover:text-[#0878E8]">
                                        {lineNumber % 2 === 1 ? lineNumber : ''}
                                      </span>
                                      <p className="flex-1 font-sans text-xs sm:text-sm text-slate-800 leading-relaxed">
                                        {line.endsWith('.') ? line : `${line}.`}
                                      </p>
                                    </div>
                                  );
                                })}
                              </div>
                            );
                          })}
                        </div>

                        <div className="p-3 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-500 text-center font-medium">
                          💡 Tip: Read the passage carefully. Answer the 3 MCQs and 2 open-ended inference questions.
                        </div>
                      </div>

                      {/* RIGHT: Questions (3 MCQs + 2 Open-Ended) */}
                      <div
                        className={`lg:col-span-6 xl:col-span-5 space-y-5 ${
                          readingMobileTab === 'questions' ? 'block' : 'hidden lg:block'
                        }`}
                      >
                        <div className="border-b border-slate-200 pb-2 flex items-center justify-between">
                          <span className="text-xs font-black uppercase tracking-wider text-slate-500">
                            A. Multiple Choice Items (3 Marks)
                          </span>
                          <span className="text-xs font-bold text-[#0878E8]">3 Questions</span>
                        </div>

                        {prepBlueprint.readingPassage.mcqs.map((rq, qIdx) => {
                          const isAnswered = !!selectedAnswers[rq.id];
                          return (
                            <div
                              key={rq.id}
                              className={`p-4 sm:p-5 rounded-2xl border transition-all space-y-3 ${
                                isAnswered ? 'bg-emerald-50/40 border-emerald-200' : 'bg-white border-slate-200 shadow-xs'
                              }`}
                            >
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-xs font-black text-slate-500">
                                  Item {qIdx + 1}
                                </span>
                                {rq.difficulty === 'hots' && (
                                  <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                                    HOTS ⚠️
                                  </span>
                                )}
                              </div>

                              <p className="text-sm font-bold text-slate-900 leading-snug">
                                {rq.question}
                              </p>

                              <div className="space-y-2 pt-1">
                                {rq.options.map((optText, optIdx) => {
                                  const letter = optionLetters[optIdx];
                                  const isSelected = selectedAnswers[rq.id] === letter;
                                  return (
                                    <button
                                      key={optIdx}
                                      type="button"
                                      onClick={() => handleSelectOption(rq.id, letter)}
                                      className={`w-full text-left p-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-all cursor-pointer flex items-center gap-2.5 ${
                                        isSelected
                                          ? 'bg-blue-50 border-[#0878E8] text-[#0B397D] font-bold ring-1 ring-[#0878E8]'
                                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                                      }`}
                                    >
                                      <span className={`w-6 h-6 rounded-md flex items-center justify-center font-bold text-xs shrink-0 ${
                                        isSelected ? 'bg-[#0878E8] text-white' : 'bg-slate-100 text-slate-600'
                                      }`}>
                                        {letter}
                                      </span>
                                      <span>{optText}</span>
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })}

                        <div className="border-b border-slate-200 pt-3 pb-2 flex items-center justify-between">
                          <span className="text-xs font-black uppercase tracking-wider text-slate-500">
                            B. Open-Ended Inference Questions (2 Marks)
                          </span>
                          <span className="text-xs font-bold text-purple-900">2 Questions · HOTS</span>
                        </div>

                        {prepBlueprint.readingPassage.openEnded.map((oe, oeIdx) => {
                          const userAns = readingOpenEndedAnswers[oe.id] || '';
                          return (
                            <div
                              key={oe.id}
                              className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 space-y-3 shadow-xs"
                            >
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-xs font-black text-purple-900">
                                  Question {oeIdx + 4} (Open-Ended · 1 Mark)
                                </span>
                                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                                  أسئلة التميز ⚠️
                                </span>
                              </div>

                              <p className="text-sm font-bold text-slate-900 leading-snug">
                                {oe.question}
                              </p>

                              {oe.questionAr && (
                                <p className="text-xs text-slate-500" dir="rtl">
                                  {oe.questionAr}
                                </p>
                              )}

                              <textarea
                                rows={3}
                                value={userAns}
                                onChange={(e) => setReadingOpenEndedAnswers(prev => ({ ...prev, [oe.id]: e.target.value }))}
                                placeholder="Type your inference response in English..."
                                className="w-full p-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-sans focus:ring-2 focus:ring-[#0878E8] outline-none"
                              />
                            </div>
                          );
                        })}

                        <div className="pt-2">
                          <button
                            type="button"
                            onClick={() => setPrepActiveSection('vocab_grammar')}
                            className="w-full py-3 rounded-xl bg-[#0B397D] hover:bg-[#092d63] text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                          >
                            <span>Proceed to Section 3: Vocab &amp; Structure (6 MCQs)</span>
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* ========================================================
                    PREPARATORY SECTION 3: VOCABULARY & STRUCTURE (الاختياري)
                   ======================================================== */}
                {prepActiveSection === 'vocab_grammar' && (
                  <div className="max-w-4xl mx-auto space-y-6">
                    <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-[#0B397D] text-white p-5 sm:p-6 rounded-2xl shadow-md space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-black uppercase text-emerald-100 tracking-wider">
                          Section 3 · Vocabulary &amp; Structure (6 Marks)
                        </span>
                        <span className="text-xs font-mono font-bold bg-white/25 px-2.5 py-0.5 rounded-md text-[#FFC928]">
                          6 MCQs · 1 Mark each
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-black">
                        السؤال الثالث: المفردات والتراكيب اللغوية (Choose the Correct Answer)
                      </h3>
                      <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
                        Choose the correct answer from a, b, c, or d based on official New Hello curricular vocabulary, idioms, and grammatical structures.
                      </p>
                    </div>

                    <div className="space-y-4">
                      {prepBlueprint.vocabGrammarMcqs.map((q, qIdx) => {
                        const isAnswered = !!selectedAnswers[q.id];
                        return (
                          <div
                            key={q.id}
                            className={`p-5 sm:p-6 rounded-2xl border transition-all space-y-4 ${
                              isAnswered ? 'bg-emerald-50/40 border-emerald-200' : 'bg-white border-slate-200 shadow-xs'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-black text-slate-500">
                                  Item {qIdx + 1} • <strong className="text-[#0878E8]">{q.skill}</strong>
                                </span>
                                {q.difficulty === 'hots' && (
                                  <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                                    مستويات عليا / HOTS ⚠️
                                  </span>
                                )}
                              </div>
                              <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-md">
                                1 Mark
                              </span>
                            </div>

                            <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-relaxed">
                              {qIdx + 1}. {q.question}
                            </h4>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                              {q.options.map((optText, optIdx) => {
                                const letter = optionLetters[optIdx];
                                const isSelected = selectedAnswers[q.id] === letter;
                                return (
                                  <button
                                    key={optIdx}
                                    type="button"
                                    onClick={() => handleSelectOption(q.id, letter)}
                                    className={`text-left p-3 rounded-xl border text-xs sm:text-sm font-medium transition-all cursor-pointer flex items-center gap-3 ${
                                      isSelected
                                        ? 'bg-blue-50 border-[#0878E8] text-[#0B397D] font-bold ring-2 ring-[#0878E8]/30 shadow-xs'
                                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                                    }`}
                                  >
                                    <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                                      isSelected ? 'bg-[#0878E8] text-white' : 'bg-slate-100 text-slate-600'
                                    }`}>
                                      {letter}
                                    </span>
                                    <span>{optText}</span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="text-xs text-slate-500 font-medium">
                        MCQs answered: <strong>{prepBlueprint.vocabGrammarMcqs.filter(q => !!selectedAnswers[q.id]).length}</strong> / 6
                      </div>
                      <button
                        type="button"
                        onClick={() => setPrepActiveSection('error_correction')}
                        className="px-6 py-2.5 rounded-full bg-[#0878E8] hover:bg-[#0768c9] text-white font-bold text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
                      >
                        <span>Proceed to Section 4: Error Correction (4 Items)</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* ========================================================
                    PREPARATORY SECTION 4: ERROR CORRECTION (تصحيح الخطأ)
                   ======================================================== */}
                {prepActiveSection === 'error_correction' && (
                  <div className="max-w-4xl mx-auto space-y-6">
                    <div className="bg-gradient-to-r from-amber-700 via-orange-800 to-[#0B397D] text-white p-5 sm:p-6 rounded-2xl shadow-md space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-black uppercase text-amber-100 tracking-wider">
                          Section 4 · Error Correction (4 Marks)
                        </span>
                        <span className="text-xs font-mono font-bold bg-white/25 px-2.5 py-0.5 rounded-md text-[#FFC928]">
                          4 Items · 1 Mark each
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-black">
                        السؤال الرابع: تصحيح الكلمات بين الأقواس (Complete with Correct Form)
                      </h3>
                      <p className="text-xs sm:text-sm text-amber-100 leading-relaxed">
                        Complete the sentences with the correct form of the word(s) in brackets according to Egyptian Ministry specifications.
                      </p>
                    </div>

                    <div className="space-y-4">
                      {prepBlueprint.errorCorrection.map((item, idx) => {
                        const studentAns = errorCorrectionAnswers[item.id] || '';
                        const parts = item.sentence.split(`(${item.bracketWord})`);
                        return (
                          <div
                            key={item.id}
                            className={`p-5 sm:p-6 rounded-2xl border transition-all space-y-3.5 ${
                              studentAns.trim() ? 'bg-amber-50/30 border-amber-300/80 shadow-2xs' : 'bg-white border-slate-200 shadow-xs'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-2">
                              <span className="text-xs font-black text-amber-900">
                                Item {idx + 1} (Correction · 1 Mark)
                              </span>
                              <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                                فخ الامتحان الوزاري ⚠️
                              </span>
                            </div>

                            <p className="text-sm sm:text-base font-semibold text-slate-900 leading-relaxed">
                              {idx + 1}. {parts[0]}
                              <span className="px-2.5 py-1 rounded-lg bg-amber-100 text-amber-950 font-mono font-bold border border-amber-300 inline-block mx-1">
                                ({item.bracketWord})
                              </span>
                              {parts[1] || ''}
                            </p>

                            <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-1">
                              <label className="text-xs font-black text-slate-600 uppercase tracking-wider shrink-0">
                                Correct Form:
                              </label>
                              <input
                                type="text"
                                value={studentAns}
                                onChange={(e) => setErrorCorrectionAnswers(prev => ({ ...prev, [item.id]: e.target.value }))}
                                placeholder="Type the corrected word..."
                                className="flex-1 p-2.5 text-sm rounded-xl border border-slate-300 bg-white font-mono font-bold text-[#0B397D] focus:ring-2 focus:ring-[#0878E8] outline-none"
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="text-xs text-slate-500 font-medium">
                        Items answered: <strong>{Object.keys(errorCorrectionAnswers).filter(k => (errorCorrectionAnswers[k] || '').trim().length > 0).length}</strong> / 4
                      </div>
                      <button
                        type="button"
                        onClick={() => setPrepActiveSection('writing')}
                        className="px-6 py-2.5 rounded-full bg-purple-900 hover:bg-purple-800 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
                      >
                        <span>Proceed to Section 5: Guided Writing Task</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* ========================================================
                    PREPARATORY SECTION 5: GUIDED WRITING (موضوع التعبير)
                   ======================================================== */}
                {prepActiveSection === 'writing' && (
                  <div className="max-w-4xl mx-auto space-y-6">
                    <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-[#0B397D] text-white p-5 sm:p-6 rounded-2xl shadow-md space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-black uppercase text-purple-200 tracking-wider">
                          Section 5 · Official Guided Writing (10 Marks)
                        </span>
                        <span className="text-xs font-mono font-bold bg-white/25 px-2.5 py-0.5 rounded-md text-[#FFC928]">
                          Target: 90 - 110 words
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-black">
                        السؤال الخامس: موضوع التعبير / الإيميل (Guided Paragraph / Email)
                      </h3>
                      <p className="text-xs sm:text-sm text-purple-100 leading-relaxed">
                        {prepBlueprint.writingTask.title}
                      </p>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-7 space-y-4 shadow-xs">
                      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
                        <div>
                          <span className="text-xs font-black uppercase tracking-wider text-purple-900 block">
                            Official Prep MOE Prompt (10 Marks)
                          </span>
                          <h4 className="text-base font-bold text-slate-900 mt-0.5">
                            {prepBlueprint.writingTask.title}
                          </h4>
                        </div>

                        {/* Live Word Count Indicator */}
                        <div className={`px-3 py-1 rounded-full text-xs font-mono font-bold flex items-center gap-1.5 border ${
                          prepWritingWordCount >= 90 && prepWritingWordCount <= 120
                            ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                            : prepWritingWordCount < 90
                            ? 'bg-amber-100 text-amber-900 border-amber-300'
                            : 'bg-rose-100 text-rose-900 border-rose-300'
                        }`}>
                          <span>Target: 90 - 110 words</span>
                          <span>·</span>
                          <strong>{prepWritingWordCount} words</strong>
                        </div>
                      </div>

                      <p className="text-sm font-semibold text-slate-800 leading-relaxed">
                        {prepBlueprint.writingTask.prompt}
                      </p>

                      {prepBlueprint.writingTask.promptAr && (
                        <p className="text-xs text-slate-500" dir="rtl">
                          {prepBlueprint.writingTask.promptAr}
                        </p>
                      )}

                      {/* Guidance Points */}
                      {prepBlueprint.writingTask.guidancePoints && (
                        <div className="p-3.5 rounded-xl bg-purple-50/70 border border-purple-200 text-xs text-purple-950 space-y-1">
                          <strong className="block font-black text-purple-900">Guiding Elements:</strong>
                          <ul className="list-disc list-inside space-y-1">
                            {prepBlueprint.writingTask.guidancePoints.map((pt, pIdx) => (
                              <li key={pIdx}>{pt}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Textarea */}
                      <div className="space-y-2">
                        <textarea
                          rows={9}
                          value={prepWritingAnswer}
                          onChange={(e) => setPrepWritingAnswer(e.target.value)}
                          placeholder="Write your paragraph here (90 to 110 words). Use clear topic sentence, supporting sentences with collocations, and a concluding remark..."
                          className="w-full p-4 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-900 font-sans leading-relaxed"
                        />

                        {/* Word Count Progress Bar */}
                        <div className="space-y-1">
                          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div
                              className={`h-full transition-all duration-300 ${
                                prepWritingWordCount >= 90 ? 'bg-emerald-500' : 'bg-[#0878E8]'
                              }`}
                              style={{ width: `${Math.min(100, Math.round((prepWritingWordCount / 100) * 100))}%` }}
                            />
                          </div>
                          <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                            <span>0 words</span>
                            <span>90 words threshold</span>
                            <span>110 words max</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Submit Final Action */}
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div>
                        <h5 className="font-bold text-slate-900 text-sm">Ready to finalize your official Preparatory exam?</h5>
                        <p className="text-xs text-slate-500">
                          All 5 ministerial sections will be graded electronically according to MOE standards.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => setShowSubmitConfirm(true)}
                        className="px-7 py-3 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-sm shadow-lg shadow-emerald-600/25 transition-all flex items-center gap-2 cursor-pointer shrink-0"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Submit &amp; Grade Complete Exam (30 Marks)</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                {/* ========================================================
                    SECTION 1: CORE MCQS (85% BUBBLE SHEET / ELECTRONIC)
                   ======================================================== */}
                {activeSection === 'mcq' && currentQ && (
                  <div className="max-w-4xl mx-auto space-y-6">
                  {/* Active Question Card */}
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-7 space-y-5 shadow-xs">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/80 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-blue-100 text-[#0878E8]">
                          Skill: {currentQ.skill}
                        </span>

                        {/* HOTS Badge */}
                        {(currentQ.difficulty === 'hots' || currentQ.skill === 'Reading') && (
                          <span className="text-xs font-black px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1 shadow-2xs">
                            <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
                            <span>مستويات عليا / HOTS ⚠️</span>
                          </span>
                        )}
                      </div>

                      <span className="text-xs font-mono font-bold text-slate-500 bg-white px-2.5 py-1 rounded-md border border-slate-200">
                        2 Marks
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
                      {currentQuestionIndex + 1}. {currentQ.question}
                    </h3>

                    {/* 4 Options Grid */}
                    <div className="grid grid-cols-1 gap-3 pt-2">
                      {currentQ.options.map((optionText, optIdx) => {
                        const letter = optionLetters[optIdx];
                        const isSelected = selectedAnswers[currentQ.id] === letter;

                        return (
                          <button
                            key={optIdx}
                            type="button"
                            onClick={() => handleSelectOption(currentQ.id, letter)}
                            className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer flex items-center gap-3.5 ${
                              isSelected
                                ? 'bg-blue-50/90 border-[#0878E8] ring-2 ring-[#0878E8]/30 shadow-xs'
                                : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-100/60'
                            }`}
                          >
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm shrink-0 transition-colors ${
                              isSelected
                                ? 'bg-[#0878E8] text-white'
                                : 'bg-slate-100 text-slate-600 border border-slate-200'
                            }`}>
                              {letter}
                            </div>
                            <span className={`text-sm sm:text-base font-semibold ${
                              isSelected ? 'text-[#0B397D] font-bold' : 'text-slate-800'
                            }`}>
                              {optionText}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Trap hint preview for answered questions */}
                    {selectedAnswers[currentQ.id] && (
                      <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-200/80 text-xs text-blue-900 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>
                          Choice <strong>{selectedAnswers[currentQ.id]}</strong> recorded. The Ministry Exam Trap analysis will be unlocked upon final submission.
                        </span>
                      </div>
                    )}
                  </div>

                  {/* MCQ Navigation Footer */}
                  <div className="flex items-center justify-between pt-2">
                    <button
                      type="button"
                      disabled={currentQuestionIndex === 0}
                      onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                      className="px-5 py-2.5 rounded-full border border-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" /> Previous
                    </button>

                    {currentQuestionIndex < allQuestions.length - 1 ? (
                      <button
                        type="button"
                        onClick={() => {
                          const nextIdx = currentQuestionIndex + 1;
                          setCurrentQuestionIndex(nextIdx);
                          if (allQuestions[nextIdx]?.skill === 'Reading') {
                            setActiveSection('reading');
                          }
                        }}
                        className="px-6 py-2.5 rounded-full bg-[#0878E8] hover:bg-[#0768c9] text-white font-bold text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
                      >
                        Next <ArrowRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setActiveSection('written')}
                        className="px-6 py-2.5 rounded-full bg-purple-900 hover:bg-purple-800 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
                      >
                        Proceed to Written Section <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* ========================================================
                  B. READING COMPREHENSION SPLIT-VIEW
                 ======================================================== */}
              {activeSection === 'reading' && (
                <div className="space-y-4">
                  {/* Mobile Tab Switcher */}
                  <div className="flex lg:hidden items-center justify-between bg-slate-100 p-1 rounded-xl border border-slate-200">
                    <button
                      type="button"
                      onClick={() => setReadingMobileTab('passage')}
                      className={`flex-1 py-2 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                        readingMobileTab === 'passage'
                          ? 'bg-[#0B397D] text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>📖 Reading Passage</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setReadingMobileTab('questions')}
                      className={`flex-1 py-2 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
                        readingMobileTab === 'questions'
                          ? 'bg-[#0B397D] text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>📝 Questions ({readingQuestions.length || 5})</span>
                    </button>
                  </div>

                  {/* Split Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    
                    {/* LEFT: Passage Panel with Line Numbers */}
                    <div
                      className={`lg:col-span-6 xl:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col ${
                        readingMobileTab === 'passage' ? 'block' : 'hidden lg:flex'
                      } lg:sticky lg:top-4 max-h-[75vh] overflow-hidden`}
                    >
                      <div className="p-4 sm:p-5 border-b border-slate-100 bg-slate-50/90 flex items-center justify-between gap-3 shrink-0">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-blue-100 text-[#0878E8]">
                              Unseen Analytical Passage
                            </span>
                            <span className="text-[10px] font-mono text-slate-400">
                              ~300 words
                            </span>
                          </div>
                          <h3 className="text-base font-bold text-slate-900 mt-1">
                            {passageTitle}
                          </h3>
                        </div>

                        <button
                          type="button"
                          onClick={() => speakText(defaultPassageText)}
                          className={`px-3 py-1.5 text-xs rounded-xl border flex items-center gap-1.5 font-bold transition-all cursor-pointer shrink-0 ${
                            isSpeaking
                              ? 'bg-rose-50 border-rose-300 text-rose-700 animate-pulse'
                              : 'bg-white border-slate-200 text-[#0B397D] hover:bg-blue-50'
                          }`}
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                          <span>{isSpeaking ? 'Stop' : 'Listen'}</span>
                        </button>
                      </div>

                      {/* Passage Text with Line Numbers */}
                      <div className="p-5 overflow-y-auto space-y-3 font-serif text-sm sm:text-base text-slate-800 leading-relaxed divide-y divide-slate-100">
                        {defaultPassageText.split('\n\n').map((paragraph, pIdx) => {
                          const lines = paragraph.split('. ').filter(Boolean);
                          return (
                            <div key={pIdx} className="pt-3 first:pt-0 space-y-2">
                              {lines.map((line, lIdx) => {
                                const lineNumber = pIdx * 4 + lIdx * 2 + 1;
                                return (
                                  <div key={lIdx} className="flex items-start gap-3 group">
                                    <span className="font-mono text-[10px] text-slate-400 select-none w-6 text-right shrink-0 pt-0.5 group-hover:text-[#0878E8]">
                                      {lineNumber % 2 === 1 ? lineNumber : ''}
                                    </span>
                                    <p className="flex-1 font-sans text-xs sm:text-sm text-slate-800 leading-relaxed">
                                      {line.endsWith('.') ? line : `${line}.`}
                                    </p>
                                  </div>
                                );
                              })}
                            </div>
                          );
                        })}
                      </div>

                      <div className="p-3 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-500 text-center font-medium">
                        💡 Tip: Read the questions on the right carefully and infer answers directly from textual evidence.
                      </div>
                    </div>

                    {/* RIGHT: Corresponding Reading Questions */}
                    <div
                      className={`lg:col-span-6 xl:col-span-5 space-y-4 ${
                        readingMobileTab === 'questions' ? 'block' : 'hidden lg:block'
                      }`}
                    >
                      <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                        <span className="text-xs font-black uppercase tracking-wider text-slate-500">
                          Reading HOTS Questions
                        </span>
                        <span className="text-xs font-bold text-[#0878E8]">
                          {readingQuestions.length} Questions
                        </span>
                      </div>

                      {(readingQuestions.length > 0 ? readingQuestions : allQuestions.slice(0, 4)).map((rq, qIdx) => {
                        const globalIdx = allQuestions.findIndex(q => q.id === rq.id);
                        const isAnswered = !!selectedAnswers[rq.id];

                        return (
                          <div
                            key={rq.id}
                            className={`p-5 rounded-2xl border transition-all space-y-3 ${
                              isAnswered
                                ? 'bg-emerald-50/40 border-emerald-200'
                                : 'bg-white border-slate-200 shadow-xs'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-xs font-black text-slate-500">
                                Item {qIdx + 1}
                              </span>
                              <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                                HOTS ⚠️
                              </span>
                            </div>

                            <p className="text-sm font-bold text-slate-900 leading-snug">
                              {rq.question}
                            </p>

                            <div className="space-y-2 pt-1">
                              {rq.options.map((optText, optIdx) => {
                                const letter = optionLetters[optIdx];
                                const isSelected = selectedAnswers[rq.id] === letter;

                                return (
                                  <button
                                    key={optIdx}
                                    type="button"
                                    onClick={() => handleSelectOption(rq.id, letter)}
                                    className={`w-full text-left p-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-all cursor-pointer flex items-center gap-2.5 ${
                                      isSelected
                                        ? 'bg-blue-50 border-[#0878E8] text-[#0B397D] font-bold ring-1 ring-[#0878E8]'
                                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                                    }`}
                                  >
                                    <span className={`w-6 h-6 rounded-md flex items-center justify-center font-bold text-xs shrink-0 ${
                                      isSelected ? 'bg-[#0878E8] text-white' : 'bg-slate-100 text-slate-600'
                                    }`}>
                                      {letter}
                                    </span>
                                    <span>{optText}</span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}

                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={() => setActiveSection('written')}
                          className="w-full py-3 rounded-xl bg-purple-900 hover:bg-purple-800 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <span>Proceed to 15% Written & Novel Section</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              )}

              {/* ========================================================
                  C. ESSAY & NOVEL CRITICAL WRITING SECTION (THE 15%)
                 ======================================================== */}
              {activeSection === 'written' && (
                <div className="max-w-4xl mx-auto space-y-6">
                  {/* Section Header */}
                  <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-[#0B397D] text-white p-6 rounded-2xl shadow-md space-y-2">
                    <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-black uppercase text-purple-200 tracking-wider">
                      Section C · Official 15% Written Assessment
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black">
                      قسم الأسئلة المقالية والتفكير النقدي (Written Section)
                    </h3>
                    <p className="text-xs sm:text-sm text-purple-100 leading-relaxed">
                      Conforming strictly with official Egyptian MOE guidelines: Prescribed literature analytical response plus structured composition essay (150-200 words).
                    </p>
                  </div>

                  {/* Task 1: Novel Critical Question */}
                  <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 space-y-4 shadow-xs">
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
                      <div>
                        <span className="text-xs font-black uppercase tracking-wider text-[#0878E8] block">
                          Part 1: Prescribed Novel Analysis (4 Marks)
                        </span>
                        <h4 className="text-base font-bold text-slate-900 mt-0.5">
                          {novelMeta.novelTitle}
                        </h4>
                      </div>

                      {/* On-Demand Arabic Hint Button */}
                      <button
                        type="button"
                        onClick={() => setOpenNovelHint(!openNovelHint)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                          openNovelHint
                            ? 'bg-amber-400 text-slate-950 border-amber-500'
                            : 'bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100'
                        }`}
                      >
                        <Lightbulb className={`w-3.5 h-3.5 ${openNovelHint ? 'fill-current' : ''}`} />
                        <span>{openNovelHint ? 'إخفاء التوضيح' : 'إضاءة باللغة العربية (Hint)'}</span>
                      </button>
                    </div>

                    <p className="text-sm sm:text-base font-bold text-slate-900 leading-relaxed">
                      {novelMeta.question}
                    </p>

                    {/* Arabic Hint Box */}
                    {openNovelHint && (
                      <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 space-y-1 animate-in fade-in" dir="rtl">
                        <strong className="block font-black text-amber-900">إضاءة بلاغية ونقدية:</strong>
                        <p>{novelMeta.questionAr}</p>
                      </div>
                    )}

                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                        <span>Your Critical Response (in English):</span>
                        <span className="font-mono text-purple-900">Word count: {novelWordCount}</span>
                      </div>
                      <textarea
                        rows={4}
                        value={novelAnswer}
                        onChange={(e) => setNovelAnswer(e.target.value)}
                        placeholder="Type your critical analysis in English here..."
                        className="w-full p-4 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0878E8] font-sans leading-relaxed"
                      />
                    </div>
                  </div>

                  {/* Task 2: Essay Writing Prompt (150-200 words) */}
                  <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 space-y-4 shadow-xs">
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
                      <div>
                        <span className="text-xs font-black uppercase tracking-wider text-purple-900 block">
                          Part 2: Formal Essay / Composition (6 Marks)
                        </span>
                        <h4 className="text-base font-bold text-slate-900 mt-0.5">
                          {essayPrompt.title}
                        </h4>
                      </div>

                      {/* Live Word Count Indicator */}
                      <div className={`px-3 py-1 rounded-full text-xs font-mono font-bold flex items-center gap-1.5 border ${
                        essayWordCount >= 150 && essayWordCount <= 220
                          ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                          : essayWordCount < 150
                          ? 'bg-amber-100 text-amber-900 border-amber-300'
                          : 'bg-rose-100 text-rose-900 border-rose-300'
                      }`}>
                        <span>Target: 150 - 200 words</span>
                        <span>·</span>
                        <strong>{essayWordCount} words</strong>
                      </div>
                    </div>

                    <p className="text-sm font-semibold text-slate-800 leading-relaxed">
                      {essayPrompt.prompt}
                    </p>

                    {/* Interactive Text Area */}
                    <div className="space-y-2">
                      <textarea
                        rows={10}
                        value={essayAnswer}
                        onChange={(e) => setEssayAnswer(e.target.value)}
                        placeholder="Organize your essay into cohesive paragraphs: Introduction (hook + thesis statement), Body Paragraph 1 (supporting evidence & discourse markers), Body Paragraph 2 (counter-arguments or further elaboration), and Conclusion (synthesis & future outlook)..."
                        className="w-full p-4 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-900 font-sans leading-relaxed"
                      />

                      {/* Word Count Progress Bar */}
                      <div className="space-y-1">
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div
                            className={`h-full transition-all duration-300 ${
                              essayWordCount >= 150 ? 'bg-emerald-500' : 'bg-[#0878E8]'
                            }`}
                            style={{ width: `${Math.min(100, Math.round((essayWordCount / 175) * 100))}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                          <span>0 words</span>
                          <span>150 words threshold</span>
                          <span>200 words max</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Submit Final Action */}
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <h5 className="font-bold text-slate-900 text-sm">Ready to finalize your examination?</h5>
                      <p className="text-xs text-slate-500">
                        Your electronic sheet and written responses will be recorded and graded instantly.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setShowSubmitConfirm(true)}
                      className="px-7 py-3 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-sm shadow-lg shadow-emerald-600/25 transition-all flex items-center gap-2 cursor-pointer shrink-0"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Submit &amp; Grade Complete Exam</span>
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            /* ========================================================
                RESULTS & PEDAGOGICAL REVIEW MODE
               ======================================================== */
            <div className="space-y-8 animate-in fade-in duration-300">
              {/* Score Showcase */}
              <div className={`p-8 rounded-3xl text-center border relative overflow-hidden ${
                percentage >= 85
                  ? 'bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200'
                  : percentage >= 65
                  ? 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200'
                  : 'bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200'
              }`}>
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white shadow-lg mb-3">
                  {percentage >= 85 ? (
                    <Award className="w-10 h-10 text-emerald-600" />
                  ) : percentage >= 65 ? (
                    <Sparkles className="w-10 h-10 text-blue-600" />
                  ) : (
                    <RotateCcw className="w-10 h-10 text-amber-600" />
                  )}
                </div>

                <div className="text-xs font-black uppercase tracking-wider text-slate-500 mb-1">
                  {isBaccalaureate
                    ? 'Egyptian Baccalaureate Collegiate Standard'
                    : 'النتيجة الرسمية وفق معايير وزارة التربية والتعليم المصرية'}
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                  {percentage >= 85
                    ? 'Outstanding Mastery! ممتاز مع مرتبة الشرف'
                    : percentage >= 65
                    ? 'Well Done! جيد جداً واستيعاب رائع'
                    : 'Good Effort! بحاجة إلى مراجعة بعض القواعد'}
                </h3>

                <p className="text-slate-600 text-sm mt-1 max-w-md mx-auto">
                  85% Electronic MCQs + 15% Written &amp; Novel Critical Writing.
                </p>

                {/* Score Pill Row */}
                <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-6">
                  <div className="bg-white px-6 py-3 rounded-2xl shadow-xs border border-slate-100">
                    <span className="text-xs font-bold text-slate-400 block uppercase">Final Composite Score</span>
                    <span className="text-3xl font-black text-[#0B397D]">
                      {score} <span className="text-base text-slate-400 font-normal">/ {maxScore}</span>
                    </span>
                  </div>

                  <div className="bg-white px-6 py-3 rounded-2xl shadow-xs border border-slate-100">
                    <span className="text-xs font-bold text-slate-400 block uppercase">Percentage</span>
                    <span className={`text-3xl font-black ${
                      percentage >= 85 ? 'text-emerald-600' : percentage >= 65 ? 'text-blue-600' : 'text-amber-600'
                    }`}>
                      {percentage}%
                    </span>
                  </div>

                  {/* Rubric Guide Trigger Button */}
                  <button
                    type="button"
                    onClick={() => setShowRubricModal(true)}
                    className="px-5 py-3 rounded-2xl bg-purple-900 hover:bg-purple-800 text-white font-black text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <BookOpen className="w-4 h-4 text-[#FFC928]" />
                    <span>عرض نموذج الإجابة ومعايير التصحيح (Rubric Guide)</span>
                  </button>
                </div>

                {/* Skill Breakdown */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 max-w-xl mx-auto">
                  {Object.entries(skillBreakdown).map(([skillName, stat]) => {
                    const skillPct = Math.round((stat.correct / stat.total) * 100);
                    return (
                      <div key={skillName} className="bg-white/80 p-3 rounded-xl border border-slate-200/60 text-center">
                        <span className="text-xs font-bold text-slate-500 block">{skillName}</span>
                        <span className="text-base font-black text-slate-800">{stat.correct}/{stat.total}</span>
                        <span className="text-[11px] font-semibold text-slate-400 block">({skillPct}%)</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {isPrepStage && prepBlueprint ? (
                /* ========================================================
                    OFFICIAL PREPARATORY STAGE 5-SECTION PEDAGOGICAL REVIEW
                   ======================================================== */
                <div className="space-y-6">
                  {/* Review Section 1: Dialogue (Language Functions) */}
                  <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <h4 className="text-base font-black text-slate-900 flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 text-[#0878E8]" />
                        <span>Section 1 Review: Language Functions (المحادثة · 5 Marks)</span>
                      </h4>
                      <span className="text-xs font-bold text-slate-500">1 Mark per Blank</span>
                    </div>

                    <div className="space-y-3">
                      {prepBlueprint.dialogue.turns.map((turn, tIdx) => {
                        if (!turn.isBlank || !turn.blankNumber) return null;
                        const bNum = turn.blankNumber;
                        const userAns = dialogueAnswers[bNum] || '';
                        return (
                          <div key={tIdx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs sm:text-sm">
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-bold text-[#0B397D]">
                                Blank ({bNum}) - Turn by: <strong>{turn.speaker}</strong>
                              </span>
                              <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                                1 Mark
                              </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                              <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-1">
                                <span className="text-[11px] font-bold text-slate-400 block uppercase">Your Response:</span>
                                <p className="font-semibold text-slate-900">{userAns || <em className="text-slate-400 font-normal">No response entered</em>}</p>
                              </div>

                              <div className="p-3 bg-emerald-50/70 rounded-lg border border-emerald-200 space-y-1">
                                <span className="text-[11px] font-bold text-emerald-800 block uppercase">Expected Model Answer:</span>
                                <p className="font-bold text-emerald-950">{turn.expectedAnswer}</p>
                                {turn.acceptableAnswers && (
                                  <p className="text-[11px] text-emerald-800 mt-1">
                                    <strong>Also Accepted:</strong> {turn.acceptableAnswers.join(' / ')}
                                  </p>
                                )}
                              </div>
                            </div>

                            {turn.hintAr && (
                              <div className="p-2.5 rounded-lg bg-amber-50 text-xs text-amber-950 border border-amber-200" dir="rtl">
                                💡 <strong>التوجيه الوزاري:</strong> {turn.hintAr}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Review Section 2: Reading Comprehension */}
                  <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <h4 className="text-base font-black text-slate-900 flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-[#0878E8]" />
                        <span>Section 2 Review: Reading Comprehension (5 Marks)</span>
                      </h4>
                      <span className="text-xs font-bold text-slate-500">3 MCQs + 2 Open-Ended Inference</span>
                    </div>

                    {/* Passage Box */}
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs sm:text-sm">
                      <span className="font-black text-[#0B397D] uppercase tracking-wide block">
                        Passage: {prepBlueprint.readingPassage.title}
                      </span>
                      <p className="text-slate-700 leading-relaxed font-serif max-h-40 overflow-y-auto">
                        {prepBlueprint.readingPassage.passage}
                      </p>
                    </div>

                    {/* 3 Reading MCQs */}
                    <div className="space-y-3 pt-2">
                      <span className="text-xs font-black uppercase tracking-wider text-slate-500 block">
                        Part A: Multiple Choice Questions (3 Marks)
                      </span>
                      {prepBlueprint.readingPassage.mcqs.map((rq, idx) => {
                        const userAns = selectedAnswers[rq.id];
                        const isCorrect = userAns === rq.correctAnswer;
                        return (
                          <div
                            key={rq.id}
                            className={`p-4 rounded-xl border space-y-2.5 text-xs sm:text-sm ${
                              isCorrect ? 'bg-emerald-50/40 border-emerald-200' : 'bg-rose-50/40 border-rose-200'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-slate-900">
                                Item {idx + 1}. {rq.question}
                              </span>
                              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                                isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                              }`}>
                                {isCorrect ? 'Correct (+1)' : 'Incorrect (0)'}
                              </span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                              {rq.options.map((opt, optIdx) => {
                                const letter = optionLetters[optIdx];
                                const isUser = userAns === letter;
                                const isAns = rq.correctAnswer === letter;
                                return (
                                  <div
                                    key={optIdx}
                                    className={`p-2 rounded-lg border font-medium flex items-center justify-between ${
                                      isAns
                                        ? 'bg-emerald-100/80 border-emerald-300 text-emerald-950 font-bold'
                                        : isUser
                                        ? 'bg-rose-100/80 border-rose-300 text-rose-950 font-bold'
                                        : 'bg-white border-slate-200 text-slate-600'
                                    }`}
                                  >
                                    <span>{letter}. {opt}</span>
                                    {isAns && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
                                    {isUser && !isAns && <XCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />}
                                  </div>
                                );
                              })}
                            </div>

                            {/* Exam Trap */}
                            <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-300 text-amber-950 text-xs space-y-1">
                              <span className="font-black flex items-center gap-1.5 text-amber-900">
                                <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
                                <span>فخ الامتحان الوزاري (Distractor Rationale):</span>
                              </span>
                              <p>{rq.exam_trap_explanation || rq.explanation}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* 2 Open-Ended Reading Inference Questions */}
                    <div className="space-y-3 pt-2">
                      <span className="text-xs font-black uppercase tracking-wider text-purple-900 block">
                        Part B: Open-Ended Inference Questions (2 Marks)
                      </span>
                      {prepBlueprint.readingPassage.openEnded.map((oe, idx) => {
                        const userAns = readingOpenEndedAnswers[oe.id] || '';
                        return (
                          <div key={oe.id} className="p-4 rounded-xl bg-purple-50/30 border border-purple-200 space-y-2 text-xs sm:text-sm">
                            <span className="font-bold text-slate-900 block">
                              Question {idx + 4}: {oe.question}
                            </span>
                            {oe.questionAr && (
                              <p className="text-xs text-slate-500" dir="rtl">{oe.questionAr}</p>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                              <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-1">
                                <span className="text-[11px] font-bold text-slate-400 block uppercase">Your Response:</span>
                                <p className="text-slate-800">{userAns || <em className="text-slate-400 font-normal">No response entered</em>}</p>
                              </div>

                              <div className="p-3 bg-purple-50 rounded-lg border border-purple-200 space-y-1">
                                <span className="text-[11px] font-bold text-purple-900 block uppercase">Full-Mark Model Answer:</span>
                                <p className="font-semibold text-purple-950">{oe.modelAnswer}</p>
                                <span className="text-[11px] text-purple-800 block mt-1">
                                  <strong>Criteria:</strong> {oe.rubric}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Review Section 3: Vocab & Structure MCQs */}
                  <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <h4 className="text-base font-black text-slate-900 flex items-center gap-2">
                        <Target className="w-4 h-4 text-emerald-600" />
                        <span>Section 3 Review: Vocabulary &amp; Structure (6 Marks)</span>
                      </h4>
                      <span className="text-xs font-bold text-slate-500">6 MCQs with Exam Traps</span>
                    </div>

                    <div className="space-y-4">
                      {prepBlueprint.vocabGrammarMcqs.map((q, idx) => {
                        const userAns = selectedAnswers[q.id];
                        const isCorrect = userAns === q.correctAnswer;
                        return (
                          <div
                            key={q.id}
                            className={`p-4 sm:p-5 rounded-xl border space-y-3 ${
                              isCorrect ? 'bg-emerald-50/40 border-emerald-200' : 'bg-rose-50/40 border-rose-200'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-slate-500">
                                Item {idx + 1} • <strong className="text-[#0878E8]">{q.skill}</strong>
                              </span>
                              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                                isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                              }`}>
                                {isCorrect ? 'Correct (+1)' : 'Incorrect (0)'}
                              </span>
                            </div>

                            <p className="text-sm font-bold text-slate-900">{q.question}</p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                              {q.options.map((opt, optIdx) => {
                                const letter = optionLetters[optIdx];
                                const isUser = userAns === letter;
                                const isAns = q.correctAnswer === letter;
                                return (
                                  <div
                                    key={optIdx}
                                    className={`p-2.5 rounded-lg border font-medium flex items-center justify-between ${
                                      isAns
                                        ? 'bg-emerald-100/80 border-emerald-300 text-emerald-950 font-bold'
                                        : isUser
                                        ? 'bg-rose-100/80 border-rose-300 text-rose-950 font-bold'
                                        : 'bg-white border-slate-200 text-slate-600'
                                    }`}
                                  >
                                    <span>{letter}. {opt}</span>
                                    {isAns && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
                                    {isUser && !isAns && <XCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />}
                                  </div>
                                );
                              })}
                            </div>

                            <div className="p-3 rounded-lg bg-amber-50 border border-amber-300 text-amber-950 text-xs space-y-1">
                              <span className="font-black flex items-center gap-1.5 text-amber-900">
                                <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
                                <span>⚠️ فخ الامتحان الوزاري (Exam Trap):</span>
                              </span>
                              <p className="leading-relaxed">{q.exam_trap_explanation || q.explanation}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Review Section 4: Error Correction */}
                  <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <h4 className="text-base font-black text-slate-900 flex items-center gap-2">
                        <Edit3 className="w-4 h-4 text-amber-600" />
                        <span>Section 4 Review: Error Correction (4 Marks)</span>
                      </h4>
                      <span className="text-xs font-bold text-slate-500">Correct the bracketed words</span>
                    </div>

                    <div className="space-y-3">
                      {prepBlueprint.errorCorrection.map((item, idx) => {
                        const studentAns = (errorCorrectionAnswers[item.id] || '').trim();
                        const isCorrect = studentAns.toLowerCase() === item.correctWord.toLowerCase();
                        const parts = item.sentence.split(`(${item.bracketWord})`);
                        return (
                          <div
                            key={item.id}
                            className={`p-4 rounded-xl border space-y-2.5 text-xs sm:text-sm ${
                              isCorrect ? 'bg-emerald-50/40 border-emerald-200' : 'bg-amber-50/40 border-amber-300'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-slate-900">
                                {idx + 1}. {parts[0]}
                                <strong className="text-amber-900 underline font-mono">({item.bracketWord})</strong>
                                {parts[1] || ''}
                              </span>
                              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                                isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                              }`}>
                                {isCorrect ? 'Correct (+1)' : 'Review Form'}
                              </span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                              <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                                <span className="text-[11px] font-bold text-slate-400 block uppercase">Your Correction:</span>
                                <p className="font-mono font-bold text-slate-900">{studentAns || <em className="text-slate-400 font-normal">None</em>}</p>
                              </div>
                              <div className="p-2.5 bg-emerald-50 rounded-lg border border-emerald-200">
                                <span className="text-[11px] font-bold text-emerald-800 block uppercase">Correct Form:</span>
                                <p className="font-mono font-bold text-emerald-950">{item.correctWord}</p>
                              </div>
                            </div>

                            <div className="p-2.5 rounded-lg bg-white border border-slate-200 text-xs space-y-1">
                              <p className="text-slate-700"><strong>Rule Explanation:</strong> {item.explanation}</p>
                              {item.explanationAr && (
                                <p className="text-slate-600 font-medium" dir="rtl"><strong>القاعدة بالعربية:</strong> {item.explanationAr}</p>
                              )}
                              {item.exam_trap_explanation && (
                                <p className="text-amber-900 font-bold pt-1">⚠️ {item.exam_trap_explanation}</p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Review Section 5: Writing Task */}
                  <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <h4 className="text-base font-black text-slate-900 flex items-center gap-2">
                        <PenTool className="w-4 h-4 text-purple-700" />
                        <span>Section 5 Review: Guided Writing Task (10 Marks)</span>
                      </h4>
                      <button
                        type="button"
                        onClick={() => setShowRubricModal(true)}
                        className="text-xs font-bold text-purple-800 hover:underline"
                      >
                        View Official Scoring Rubric
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Student Paragraph Box */}
                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-black uppercase tracking-wider text-slate-500">
                            Your Paragraph ({prepWritingWordCount} words)
                          </span>
                          <span className={`text-xs font-bold font-mono px-2 py-0.5 rounded ${
                            prepWritingWordCount >= 90 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            Target: 90-110 words
                          </span>
                        </div>
                        <p className="text-xs text-slate-800 italic bg-white p-3 rounded-lg border border-slate-100 max-h-36 overflow-y-auto whitespace-pre-wrap leading-relaxed">
                          {prepWritingAnswer || 'No paragraph submitted.'}
                        </p>
                        <div className="text-xs text-emerald-800 font-medium">
                          ✓ Graded on Content (4M), Lexis (3M), and Grammar/Mechanics (3M).
                        </div>
                      </div>

                      {/* Official High-Scoring Model Paragraph */}
                      <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-black uppercase tracking-wider text-emerald-900">
                            Official Model Answer (Full Mark)
                          </span>
                          <span className="text-xs font-bold text-emerald-800 font-mono">10/10 Marks</span>
                        </div>
                        <p className="text-xs text-slate-800 bg-white p-3 rounded-lg border border-emerald-100 max-h-36 overflow-y-auto leading-relaxed">
                          {prepBlueprint.writingTask.modelAnswer}
                        </p>
                        <div className="text-xs text-emerald-900 font-bold">
                          ✓ Exemplary New Hello communicative cohesion.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* ========================================================
                    SECONDARY & BACCALAUREATE WRITTEN & ITEM REVIEW
                   ======================================================== */
                <>
                  {/* Written Section Evaluation Summary */}
                  <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <h4 className="text-base font-black text-slate-900 flex items-center gap-2">
                        <PenTool className="w-4 h-4 text-purple-700" />
                        <span>Written &amp; Novel Evaluation (The 15% Section)</span>
                      </h4>
                      <button
                        type="button"
                        onClick={() => setShowRubricModal(true)}
                        className="text-xs font-bold text-purple-800 hover:underline"
                      >
                        View Model Rubric Guide
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Novel Answer Box */}
                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                        <span className="text-xs font-black uppercase tracking-wider text-slate-500">
                          Novel Submission ({novelWordCount} words)
                        </span>
                        <p className="text-xs text-slate-800 italic bg-white p-3 rounded-lg border border-slate-100">
                          {novelAnswer || 'No written response submitted.'}
                        </p>
                        <div className="text-xs text-emerald-800 font-medium">
                          ✓ Model benchmarks and criteria available in Rubric Guide.
                        </div>
                      </div>

                      {/* Essay Answer Box */}
                      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                        <span className="text-xs font-black uppercase tracking-wider text-slate-500">
                          Essay Submission ({essayWordCount} words)
                        </span>
                        <p className="text-xs text-slate-800 italic bg-white p-3 rounded-lg border border-slate-100 max-h-32 overflow-y-auto">
                          {essayAnswer || 'No composition submitted.'}
                        </p>
                        <div className="text-xs text-emerald-800 font-medium">
                          ✓ Target threshold: 150-200 words.
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Detailed Item Review with Exam Traps */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-[#0878E8]" />
                        <span>Pedagogical Review &amp; Ministry Exam Trap Explanations</span>
                      </h4>
                      <span className="text-xs text-slate-500">All questions reviewed with distractor analysis</span>
                    </div>

                    <div className="space-y-4">
                      {allQuestions.map((q, idx) => {
                        const userAns = selectedAnswers[q.id];
                        const isCorrect = userAns === q.correctAnswer;

                        return (
                          <div
                            key={q.id}
                            className={`p-5 sm:p-6 rounded-2xl border transition-all ${
                              isCorrect
                                ? 'bg-emerald-50/40 border-emerald-200'
                                : 'bg-rose-50/40 border-rose-200'
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-slate-500">
                                  Question {idx + 1} • <strong className="text-[#0878E8]">{q.skill}</strong>
                                </span>
                                {(q.difficulty === 'hots' || q.skill === 'Reading') && (
                                  <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                                    HOTS ⚠️
                                  </span>
                                )}
                              </div>

                              <span className={`text-xs font-black px-2.5 py-0.5 rounded-full ${
                                isCorrect ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                              }`}>
                                {isCorrect ? 'Correct (+2)' : 'Incorrect (0)'}
                              </span>
                            </div>

                            <p className="text-sm sm:text-base font-bold text-slate-900 mb-3">
                              {q.question}
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs mb-3">
                              {q.options.map((opt, optIdx) => {
                                const letter = optionLetters[optIdx];
                                const isUserChoice = userAns === letter;
                                const isCorrectChoice = q.correctAnswer === letter;

                                return (
                                  <div
                                    key={optIdx}
                                    className={`p-2.5 rounded-lg border font-medium flex items-center justify-between ${
                                      isCorrectChoice
                                        ? 'bg-emerald-100/80 border-emerald-300 text-emerald-950 font-bold'
                                        : isUserChoice
                                        ? 'bg-rose-100/80 border-rose-300 text-rose-950 font-bold'
                                        : 'bg-white border-slate-200 text-slate-600'
                                    }`}
                                  >
                                    <span>{letter}. {opt}</span>
                                    {isCorrectChoice && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
                                    {isUserChoice && !isCorrectChoice && <XCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />}
                                  </div>
                                );
                              })}
                            </div>

                            {/* Pedagogical Explanation & Official Exam Trap */}
                            <div className="bg-white/95 p-4 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-2">
                              <div>
                                <span className="font-bold text-[#0B397D] block mb-0.5">Pedagogical Explanation:</span>
                                <p className="leading-relaxed">{q.explanation}</p>
                              </div>

                              {/* D. EXAM TRAP / فخ الامتحان */}
                              <div className="p-3 rounded-lg bg-amber-50 border border-amber-300 text-amber-950 font-medium space-y-1">
                                <span className="font-black flex items-center gap-1.5 text-amber-900">
                                  <ShieldAlert className="w-4 h-4 text-amber-600" />
                                  <span>⚠️ Exam Trap Warning &amp; Distractor Analysis (فخ الامتحان الوزاري):</span>
                                </span>
                                <p className="leading-relaxed text-[11px] sm:text-xs">
                                  {q.exam_trap_explanation ||
                                    'Avoid selecting choices based solely on surface familiarity or literal translation. The Ministry examiners specifically target contextual connotations and syntactic prepositions.'}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Modal Bottom Footer */}
        <footer className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-full border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-200 transition-all cursor-pointer"
          >
            Close Exam
          </button>

          {!isSubmitted ? (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowSubmitConfirm(true)}
                className="px-6 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Submit Exam ({answeredCount}/{allQuestions.length})</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowRubricModal(true)}
                className="px-5 py-2 rounded-full bg-purple-900 hover:bg-purple-800 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5 text-[#FFC928]" />
                <span>Rubric Guide</span>
              </button>

              <button
                type="button"
                onClick={() => window.print()}
                className="px-5 py-2 rounded-full bg-[#0878E8] hover:bg-[#0768c9] text-white font-bold text-xs shadow-md flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print / Save Review</span>
              </button>
            </div>
          )}
        </footer>
      </div>

      {/* ========================================================
          SUBMIT CONFIRMATION MODAL
         ======================================================== */}
      {showSubmitConfirm && (
        <div className="fixed inset-0 z-60 bg-slate-900/60 flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full space-y-4 shadow-2xl text-center border border-slate-100 animate-in zoom-in-95">
            <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-black text-slate-900">Confirm Exam Submission?</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {isPrepStage && prepBlueprint ? (
                <>
                  You are about to submit your official Preparatory examination (30 Marks).
                  {prepWritingWordCount < 60 && (
                    <span className="block text-amber-700 font-medium mt-1">
                      Notice: Your paragraph has {prepWritingWordCount} words (target: 90-110 words).
                    </span>
                  )}
                </>
              ) : (
                <>
                  You have answered <strong className="text-[#0878E8]">{answeredCount}</strong> out of{' '}
                  <strong className="text-slate-800">{allQuestions.length}</strong> MCQs.
                  {answeredCount < allQuestions.length && (
                    <span className="block text-rose-600 font-bold mt-1">
                      ⚠️ Warning: You still have {allQuestions.length - answeredCount} unanswered questions!
                    </span>
                  )}
                  {essayWordCount < 50 && (
                    <span className="block text-amber-700 font-medium mt-1">
                      Notice: Your essay has only {essayWordCount} words (target: 150-200).
                    </span>
                  )}
                </>
              )}
            </p>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowSubmitConfirm(false)}
                className="px-4 py-2 rounded-full border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-100 cursor-pointer"
              >
                Return to Test
              </button>
              <button
                type="button"
                onClick={handleSubmitExam}
                className="px-5 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md cursor-pointer"
              >
                Submit &amp; View Results
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          RUBRIC GUIDE & MODEL ANSWER MODAL
         ======================================================== */}
      {showRubricModal && (
        <div className="fixed inset-0 z-60 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-slate-100">
            {/* Header */}
            <div className="px-6 py-4 bg-gradient-to-r from-purple-900 to-[#0B397D] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#FFC928]" />
                <h3 className="font-black text-base sm:text-lg">
                  نموذج الإجابة الاسترشادي ومعايير التصحيح (Official Rubric Guide)
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowRubricModal(false)}
                className="p-1 rounded-full hover:bg-white/20 text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Rubric Content */}
            <div className="p-6 overflow-y-auto space-y-6 text-xs sm:text-sm">
              {isPrepStage && prepBlueprint ? (
                <>
                  {/* Official Preparatory MOE 5-Section Blueprint */}
                  <div className="space-y-3">
                    <span className="font-black uppercase tracking-wider text-purple-900 text-xs block">
                      Official MOE Preparatory Stage Scoring Matrix (30 Marks Total):
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center space-y-1">
                        <strong className="block text-slate-900 font-bold text-xs">1. Dialogue</strong>
                        <span className="text-[#0878E8] font-black text-sm">5 Marks</span>
                        <p className="text-[10px] text-slate-500">1 mark per blank for appropriate grammatical turn</p>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center space-y-1">
                        <strong className="block text-slate-900 font-bold text-xs">2. Reading</strong>
                        <span className="text-[#0878E8] font-black text-sm">5 Marks</span>
                        <p className="text-[10px] text-slate-500">3 MCQs (3M) + 2 Open-ended inference (2M)</p>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center space-y-1">
                        <strong className="block text-slate-900 font-bold text-xs">3. Vocab/Grammar</strong>
                        <span className="text-[#0878E8] font-black text-sm">6 Marks</span>
                        <p className="text-[10px] text-slate-500">6 contextual multiple-choice questions</p>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center space-y-1">
                        <strong className="block text-slate-900 font-bold text-xs">4. Error Correction</strong>
                        <span className="text-[#0878E8] font-black text-sm">4 Marks</span>
                        <p className="text-[10px] text-slate-500">4 items correcting bracketed words</p>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center space-y-1">
                        <strong className="block text-slate-900 font-bold text-xs">5. Writing Task</strong>
                        <span className="text-purple-700 font-black text-sm">10 Marks</span>
                        <p className="text-[10px] text-slate-500">Content (4M) + Lexis (3M) + Grammar/Mechanics (3M)</p>
                      </div>
                    </div>
                  </div>

                  {/* Preparatory Writing Rubric Breakdown */}
                  <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200 space-y-2">
                    <span className="font-bold text-purple-900 uppercase tracking-wide text-xs block">
                      Writing Scoring Rubric (90 - 110 Words Target):
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                      <div className="bg-white p-3 rounded-xl border border-purple-100">
                        <strong className="block text-slate-900 font-bold">1. Content &amp; Ideas (4 Marks)</strong>
                        <p className="text-[11px] text-slate-600 mt-1">Directly addresses prompt, provides clear topic sentence, supportive details, and a positive concluding moral.</p>
                      </div>
                      <div className="bg-white p-3 rounded-xl border border-purple-100">
                        <strong className="block text-slate-900 font-bold">2. Vocabulary &amp; Collocations (3 Marks)</strong>
                        <p className="text-[11px] text-slate-600 mt-1">Accurate usage of target New Hello lexis, authentic English collocations, and varied word choice.</p>
                      </div>
                      <div className="bg-white p-3 rounded-xl border border-purple-100">
                        <strong className="block text-slate-900 font-bold">3. Grammar &amp; Mechanics (3 Marks)</strong>
                        <p className="text-[11px] text-slate-600 mt-1">Grammatical tense consistency, subject-verb agreement, proper punctuation, and accurate spelling.</p>
                      </div>
                    </div>
                  </div>

                  {/* Preparatory Writing Benchmark */}
                  <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-emerald-900 uppercase tracking-wide text-xs block">
                        Official Benchmark Model Paragraph ({prepBlueprint.writingTask.title}):
                      </span>
                      <span className="text-xs text-emerald-700 font-bold font-mono">Full Mark Model (10/10)</span>
                    </div>
                    <div className="text-slate-800 leading-relaxed font-sans text-xs sm:text-sm bg-white p-4 rounded-xl border border-emerald-100">
                      <p>{prepBlueprint.writingTask.modelAnswer}</p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Official 4-Domain MOE Matrix */}
                  <div className="space-y-3">
                    <span className="font-black uppercase tracking-wider text-purple-900 text-xs block">
                      Official MOE 4-Domain Scoring Rubric (15% Weightage):
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                        <strong className="block text-slate-900 font-bold">1. Task Achievement</strong>
                        <span className="text-purple-700 font-black block">30%</span>
                        <p className="text-[11px] text-slate-500">Addressing all bullet points with insightful thesis and supported arguments.</p>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                        <strong className="block text-slate-900 font-bold">2. Coherence &amp; Cohesion</strong>
                        <span className="text-purple-700 font-black block">25%</span>
                        <p className="text-[11px] text-slate-500">Logical paragraph sequencing, transitional discourse markers, and clear flow.</p>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                        <strong className="block text-slate-900 font-bold">3. Lexical Resource</strong>
                        <span className="text-purple-700 font-black block">25%</span>
                        <p className="text-[11px] text-slate-500">Sophisticated academic vocabulary, idioms, and accurate collocations.</p>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                        <strong className="block text-slate-900 font-bold">4. Grammatical Range</strong>
                        <span className="text-purple-700 font-black block">20%</span>
                        <p className="text-[11px] text-slate-500">Complex clause structures, inversions, and high syntactic accuracy.</p>
                      </div>
                    </div>
                  </div>

                  {/* Novel Benchmark Answer */}
                  <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-blue-900 uppercase tracking-wide text-xs">
                        Novel Model Answer ({novelMeta.novelTitle}):
                      </span>
                      <span className="text-xs text-blue-700 font-bold font-mono">Full Mark Model</span>
                    </div>
                    <p className="text-slate-800 leading-relaxed font-sans text-xs sm:text-sm">
                      {novelMeta.modelAnswer}
                    </p>
                    <div className="text-[11px] text-blue-800 font-semibold pt-1 border-t border-blue-200/60">
                      Criteria: {novelMeta.rubric}
                    </div>
                  </div>

                  {/* Essay Benchmark */}
                  <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2">
                    <span className="font-bold text-emerald-900 uppercase tracking-wide text-xs block">
                      Model High-Scoring Essay (180 words):
                    </span>
                    <div className="text-slate-800 leading-relaxed font-sans text-xs sm:text-sm space-y-2 bg-white p-4 rounded-xl border border-emerald-100">
                      <p>
                        In an era defined by rapid climate challenges, sustainable technological governance has transcended luxury to become an existential imperative. Egypt's transition toward renewable energy, exemplified by monumental clean solar and wind initiatives, represents a transformative blueprint for sustainable development across the MENA region.
                      </p>
                      <p>
                        First and foremost, adopting clean technology fosters economic leapfrogging, generating green employment while drastically curbing carbon emissions. Furthermore, integrating smart environmental infrastructure shields agricultural land and vital water reserves from ecological degradation. While initial capital expenditure is substantial, the long-term dividend in public health and energy independence unequivocally justifies the investment.
                      </p>
                      <p>
                        In conclusion, green technology is not merely a technical solution, but a profound commitment to intergenerational equity. By championing sustainability today, our nation secures a flourishing, resilient ecosystem for generations to come.
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setShowRubricModal(false)}
                className="px-5 py-2 rounded-full bg-[#0B397D] text-white font-bold text-xs"
              >
                Close Rubric
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
