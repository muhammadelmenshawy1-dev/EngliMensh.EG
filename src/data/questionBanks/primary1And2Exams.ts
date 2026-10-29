// =========================================================================
// EngliMensh.EG - Primary 1 & Primary 2 Comprehensive 5-Level Exam Banks
// Connect 1 & Connect 2 (Term 1) - Official Egyptian MOE Curriculum
// System Architect: Mohammad El-Menshawy (محمد المنشاوي)
// 12 Units Total (P1 U1-U6 & P2 U1-U6)
// Each Unit contains:
//   Level 1: 10 Foundation & Recognition Questions
//   Level 2: 10 Contextual & Practice Questions
//   Level 3: 10 Advanced Structure & Grammar Questions
//   Level 4: Complete MOE Mock Exam (Listening, Reading, MCQ, Reorder, Punctuation)
//   Level 5: 8 Higher-Order Thinking Skills Questions with Arabic Explanations
// =========================================================================

import type { PrimaryExamQuestion } from '../primaryStageData.ts';

export interface UnitExamSuite {
  level1_Foundation: PrimaryExamQuestion[];
  level2_Contextual: PrimaryExamQuestion[];
  level3_AdvancedStructure: PrimaryExamQuestion[];
  level4_MoeMockExam: PrimaryExamQuestion[];
  level5_HigherThinking: PrimaryExamQuestion[];
}

export interface P1P2VocabSpec {
  word: string;
  meaning: string;
  phonetic: string;
  pos: 'Noun' | 'Verb' | 'Adjective' | 'Phrase';
  clozeSentence: string;
  clozeDistractors: [string, string, string];
}

export interface P1P2UnitSpec {
  unitId: string;
  unitIndex: number;
  unitTitleEn: string;
  unitTitleAr: string;
  grammarTopic: string;
  vocab: [P1P2VocabSpec, P1P2VocabSpec, P1P2VocabSpec, P1P2VocabSpec, P1P2VocabSpec];
  phonics: {
    soundLabel: string;
    targetWord: string;
    targetMeaningAr: string;
    distractors: [string, string, string];
    matchingPair: [string, string];
    pairDistractors: [string, string, string];
  };
  dialogueQ: {
    prompt: string;
    correct: string;
    distractors: [string, string, string];
    explanationAr: string;
  };
  grammarMcqs: [
    { prompt: string; correct: string; distractors: [string, string, string]; explanationAr: string },
    { prompt: string; correct: string; distractors: [string, string, string]; explanationAr: string },
    { prompt: string; correct: string; distractors: [string, string, string]; explanationAr: string }
  ];
  reorders: [
    { prompt: string; correct: string; distractors: [string, string, string]; explanationAr: string },
    { prompt: string; correct: string; distractors: [string, string, string]; explanationAr: string },
    { prompt: string; correct: string; distractors: [string, string, string]; explanationAr: string },
    { prompt: string; correct: string; distractors: [string, string, string]; explanationAr: string }
  ];
  readingPassage: {
    passage: string;
    question: string;
    correct: string;
    distractors: [string, string, string];
    explanationAr: string;
  };
  punctuationQ: {
    correct: string;
    distractors: [string, string, string];
    explanationAr: string;
  };
}

export function rotatePrimarySuiteOptions(suite: UnitExamSuite, unitIndex: number): UnitExamSuite {
  const rotateList = (list: PrimaryExamQuestion[], levelOffset: number): PrimaryExamQuestion[] =>
    list.map((q, qIdx) => {
      if (!q.options || q.options.length < 2 || Array.isArray(q.correctAnswer)) {
        return q;
      }
      const opts = [...q.options];
      const correctStr = String(q.correctAnswer).trim();
      const currentIdx = opts.findIndex(o => o.trim() === correctStr);
      if (currentIdx === -1) return q;

      const n = opts.length;
      const targetIdx = (unitIndex + levelOffset + qIdx) % n;
      if (currentIdx === targetIdx) return q;

      // Place correct option at targetIdx deterministically
      const others = opts.filter((_, i) => i !== currentIdx);
      const rotated: string[] = [];
      let otherPtr = 0;
      for (let i = 0; i < n; i++) {
        if (i === targetIdx) {
          rotated.push(opts[currentIdx]);
        } else {
          rotated.push(others[otherPtr++]);
        }
      }
      return {
        ...q,
        options: rotated
      };
    });

  return {
    level1_Foundation: rotateList(suite.level1_Foundation, 0),
    level2_Contextual: rotateList(suite.level2_Contextual, 1),
    level3_AdvancedStructure: rotateList(suite.level3_AdvancedStructure, 2),
    level4_MoeMockExam: rotateList(suite.level4_MoeMockExam, 3),
    level5_HigherThinking: rotateList(suite.level5_HigherThinking, 4),
  };
}

export function buildVerifiedP1P2Suite(spec: P1P2UnitSpec): UnitExamSuite {
  const [v1, v2, v3, v4, v5] = spec.vocab;
  const { unitId, unitTitleEn, unitTitleAr, phonics, dialogueQ, grammarMcqs, reorders, readingPassage, punctuationQ } = spec;

  const rawSuite: UnitExamSuite = {
    level1_Foundation: [
      {
        id: `${unitId}_l1_q1`,
        type: 'mcq',
        questionPrompt: `Identify the unit word: What means "${v1.meaning}" in English?`,
        options: [v1.word, v2.word, v3.word, v4.word],
        correctAnswer: v1.word,
        explanationAr: `الكلمة الإنجليزية التي تعني (${v1.meaning}) هي ${v1.word}.`,
        marks: 1
      },
      {
        id: `${unitId}_l1_q2`,
        type: 'mcq',
        questionPrompt: `Look and recognize: The word "${v2.word}" means ______ in Arabic.`,
        options: [v2.meaning, v1.meaning, v4.meaning, v5.meaning],
        correctAnswer: v2.meaning,
        explanationAr: `معنى كلمة ${v2.word} باللغة العربية هو (${v2.meaning}).`,
        marks: 1
      },
      {
        id: `${unitId}_l1_q3`,
        type: 'mcq',
        questionPrompt: `Phonics Focus: Which word has the target phonics sound ${phonics.soundLabel}?`,
        options: [phonics.targetWord, ...phonics.distractors],
        correctAnswer: phonics.targetWord,
        explanationAr: `كلمة ${phonics.targetWord} (${phonics.targetMeaningAr}) تحتوي على الصوت المستهدف ${phonics.soundLabel}.`,
        marks: 1
      },
      {
        id: `${unitId}_l1_q4`,
        type: 'mcq',
        questionPrompt: `Topic Recognition: Which vocabulary item belongs to Unit "${unitTitleEn}"?`,
        options: [v3.word, 'Submarine', 'Astronaut', 'Volcano'],
        correctAnswer: v3.word,
        explanationAr: `تنتمي مفردة ${v3.word} (${v3.meaning}) إلى موضوع الوحدة (${unitTitleAr}).`,
        marks: 1
      },
      {
        id: `${unitId}_l1_q5`,
        type: 'mcq',
        questionPrompt: `Spelling Check: Choose the correctly spelled word for "${v4.meaning}":`,
        options: [v4.word, `${v4.word}xx`, `z${v4.word.toLowerCase()}`, v4.word.slice(0, Math.max(2, v4.word.length - 2))],
        correctAnswer: v4.word,
        explanationAr: `التهجئة الصحيحة للمفردة هي ${v4.word}.`,
        marks: 1
      },
      {
        id: `${unitId}_l1_q6`,
        type: 'mcq',
        questionPrompt: `Initial Letter Recognition: What letter does "${v5.word}" begin with?`,
        options: [v5.word[0].toUpperCase(), 'Z', 'X', 'Q'],
        correctAnswer: v5.word[0].toUpperCase(),
        explanationAr: `تبدأ كلمة ${v5.word} بحرف ${v5.word[0].toUpperCase()}.`,
        marks: 1
      },
      {
        id: `${unitId}_l1_q7`,
        type: 'mcq',
        questionPrompt: `Word Meaning: What is the English word for "${v3.meaning}"?`,
        options: [v3.word, v1.word, v2.word, v5.word],
        correctAnswer: v3.word,
        explanationAr: `الترجمة الصحيحة لـ (${v3.meaning}) هي ${v3.word}.`,
        marks: 1
      },
      {
        id: `${unitId}_l1_q8`,
        type: 'mcq',
        questionPrompt: `Arabic Meaning: What does "${v4.word}" mean in Arabic?`,
        options: [v4.meaning, v2.meaning, v3.meaning, v1.meaning],
        correctAnswer: v4.meaning,
        explanationAr: `معنى ${v4.word} هو (${v4.meaning}).`,
        marks: 1
      },
      {
        id: `${unitId}_l1_q9`,
        type: 'mcq',
        questionPrompt: `Vocabulary Match: "${v5.meaning}" in English is ______.`,
        options: [v5.word, v1.word, v2.word, v3.word],
        correctAnswer: v5.word,
        explanationAr: `المفردة الإنجليزية المقابلة لـ (${v5.meaning}) هي ${v5.word}.`,
        marks: 1
      },
      {
        id: `${unitId}_l1_q10`,
        type: 'mcq',
        questionPrompt: `Part of Speech Check: In English grammar, "${v1.word}" (${v1.meaning}) is used as a ______.`,
        options: [
          v1.pos,
          v1.pos === 'Noun' ? 'Preposition' : 'Noun',
          'Conjunction',
          'Question word'
        ],
        correctAnswer: v1.pos,
        explanationAr: `تصنيف كلمة ${v1.word} في القواعد هو ${v1.pos}.`,
        marks: 1
      }
    ],
    level2_Contextual: [
      {
        id: `${unitId}_l2_q1`,
        type: 'fill_in_the_blank',
        questionPrompt: `Complete the sentence: "${v1.clozeSentence}"`,
        options: [v1.word, ...v1.clozeDistractors],
        correctAnswer: v1.word,
        explanationAr: `تكتمل الجملة سياقياً بمفردة ${v1.word} (${v1.meaning}).`,
        marks: 1
      },
      {
        id: `${unitId}_l2_q2`,
        type: 'mcq',
        questionPrompt: `Choose the right word for the context: "${v2.clozeSentence}"`,
        options: [v2.word, ...v2.clozeDistractors],
        correctAnswer: v2.word,
        explanationAr: `الكلمة المناسبة للسياق هي ${v2.word} (${v2.meaning}).`,
        marks: 1
      },
      {
        id: `${unitId}_l2_q3`,
        type: 'mcq',
        questionPrompt: `Complete the sentence accurately: "${v3.clozeSentence}"`,
        options: [v3.word, ...v3.clozeDistractors],
        correctAnswer: v3.word,
        explanationAr: `المفردة الصحيحة لإتمام المعنى هي ${v3.word} (${v3.meaning}).`,
        marks: 1
      },
      {
        id: `${unitId}_l2_q4`,
        type: 'mcq',
        questionPrompt: `Fill in the blank: "${v4.clozeSentence}"`,
        options: [v4.word, ...v4.clozeDistractors],
        correctAnswer: v4.word,
        explanationAr: `الكلمة الصحيحة في هذا السياق هي ${v4.word} (${v4.meaning}).`,
        marks: 1
      },
      {
        id: `${unitId}_l2_q5`,
        type: 'mcq',
        questionPrompt: `Select the missing word: "${v5.clozeSentence}"`,
        options: [v5.word, ...v5.clozeDistractors],
        correctAnswer: v5.word,
        explanationAr: `تكتمل الجملة بالمفردة المقررة ${v5.word} (${v5.meaning}).`,
        marks: 1
      },
      {
        id: `${unitId}_l2_q6`,
        type: 'mcq',
        questionPrompt: dialogueQ.prompt,
        options: [dialogueQ.correct, ...dialogueQ.distractors],
        correctAnswer: dialogueQ.correct,
        explanationAr: dialogueQ.explanationAr,
        marks: 1
      },
      {
        id: `${unitId}_l2_q7`,
        type: 'mcq',
        questionPrompt: `Phonics Pair: Which two words share the target phonics sound ${phonics.soundLabel}?`,
        options: [`${phonics.matchingPair[0]} and ${phonics.matchingPair[1]}`, ...phonics.pairDistractors],
        correctAnswer: `${phonics.matchingPair[0]} and ${phonics.matchingPair[1]}`,
        explanationAr: `الكلمتان (${phonics.matchingPair[0]} و ${phonics.matchingPair[1]}) تشتركان في الصوت ${phonics.soundLabel}.`,
        marks: 1
      },
      {
        id: `${unitId}_l2_q8`,
        type: 'mcq',
        questionPrompt: grammarMcqs[0].prompt,
        options: [grammarMcqs[0].correct, ...grammarMcqs[0].distractors],
        correctAnswer: grammarMcqs[0].correct,
        explanationAr: grammarMcqs[0].explanationAr,
        marks: 1
      },
      {
        id: `${unitId}_l2_q9`,
        type: 'mcq',
        questionPrompt: grammarMcqs[1].prompt,
        options: [grammarMcqs[1].correct, ...grammarMcqs[1].distractors],
        correctAnswer: grammarMcqs[1].correct,
        explanationAr: grammarMcqs[1].explanationAr,
        marks: 1
      },
      {
        id: `${unitId}_l2_q10`,
        type: 'mcq',
        questionPrompt: grammarMcqs[2].prompt,
        options: [grammarMcqs[2].correct, ...grammarMcqs[2].distractors],
        correctAnswer: grammarMcqs[2].correct,
        explanationAr: grammarMcqs[2].explanationAr,
        marks: 1
      }
    ],
    level3_AdvancedStructure: [
      {
        id: `${unitId}_l3_q1`,
        type: 'reorder',
        questionPrompt: reorders[0].prompt,
        options: [reorders[0].correct, ...reorders[0].distractors],
        correctAnswer: reorders[0].correct,
        explanationAr: reorders[0].explanationAr,
        marks: 2
      },
      {
        id: `${unitId}_l3_q2`,
        type: 'mcq',
        questionPrompt: grammarMcqs[0].prompt,
        options: [grammarMcqs[0].correct, ...grammarMcqs[0].distractors],
        correctAnswer: grammarMcqs[0].correct,
        explanationAr: grammarMcqs[0].explanationAr,
        marks: 1
      },
      {
        id: `${unitId}_l3_q3`,
        type: 'reorder',
        questionPrompt: reorders[1].prompt,
        options: [reorders[1].correct, ...reorders[1].distractors],
        correctAnswer: reorders[1].correct,
        explanationAr: reorders[1].explanationAr,
        marks: 2
      },
      {
        id: `${unitId}_l3_q4`,
        type: 'mcq',
        questionPrompt: grammarMcqs[1].prompt,
        options: [grammarMcqs[1].correct, ...grammarMcqs[1].distractors],
        correctAnswer: grammarMcqs[1].correct,
        explanationAr: grammarMcqs[1].explanationAr,
        marks: 1
      },
      {
        id: `${unitId}_l3_q5`,
        type: 'reorder',
        questionPrompt: reorders[2].prompt,
        options: [reorders[2].correct, ...reorders[2].distractors],
        correctAnswer: reorders[2].correct,
        explanationAr: reorders[2].explanationAr,
        marks: 2
      },
      {
        id: `${unitId}_l3_q6`,
        type: 'mcq',
        questionPrompt: grammarMcqs[2].prompt,
        options: [grammarMcqs[2].correct, ...grammarMcqs[2].distractors],
        correctAnswer: grammarMcqs[2].correct,
        explanationAr: grammarMcqs[2].explanationAr,
        marks: 1
      },
      {
        id: `${unitId}_l3_q7`,
        type: 'reorder',
        questionPrompt: reorders[3].prompt,
        options: [reorders[3].correct, ...reorders[3].distractors],
        correctAnswer: reorders[3].correct,
        explanationAr: reorders[3].explanationAr,
        marks: 2
      },
      {
        id: `${unitId}_l3_q8`,
        type: 'mcq',
        questionPrompt: `Select the sentence with accurate capitalization and punctuation:`,
        options: [punctuationQ.correct, ...punctuationQ.distractors],
        correctAnswer: punctuationQ.correct,
        explanationAr: punctuationQ.explanationAr,
        marks: 1
      },
      {
        id: `${unitId}_l3_q9`,
        type: 'mcq',
        questionPrompt: `Identify the odd one out (which word does NOT belong to "${unitTitleEn}"):`,
        options: ['Submarine', v1.word, v2.word, v3.word],
        correctAnswer: 'Submarine',
        explanationAr: `الكلمات (${v1.word}, ${v2.word}, ${v3.word}) من مفردات الوحدة بينما Submarine غواصة خارجة عن الموضوع.`,
        marks: 1
      },
      {
        id: `${unitId}_l3_q10`,
        type: 'mcq',
        questionPrompt: `Which sentence uses "${v1.word}" correctly?`,
        options: [
          v1.clozeSentence.replace('______', v1.word),
          `Goodbye ${v1.word} yesterday!`,
          `Are you a ${v1.word} clock?`,
          `Two ${v1.word} is am.`
        ],
        correctAnswer: v1.clozeSentence.replace('______', v1.word),
        explanationAr: `الجملة الصحيحة نحوياً ودلالياً هي: ${v1.clozeSentence.replace('______', v1.word)}`,
        marks: 1
      }
    ],
    level4_MoeMockExam: [
      {
        id: `${unitId}_l4_q1`,
        type: 'mcq',
        questionPrompt: `[Listening Comprehension] Listen to the teacher: "${v1.clozeSentence.replace('______', v1.word)}" Which word did you hear?`,
        options: [v1.word, ...v1.clozeDistractors],
        correctAnswer: v1.word,
        explanationAr: `نطقت المعلمة المفردة الأساسية في الجملة وهي ${v1.word}.`,
        marks: 2
      },
      {
        id: `${unitId}_l4_q2`,
        type: 'mcq',
        questionPrompt: `[Reading Passage] "${readingPassage.passage}" — ${readingPassage.question}`,
        options: [readingPassage.correct, ...readingPassage.distractors],
        correctAnswer: readingPassage.correct,
        explanationAr: readingPassage.explanationAr,
        marks: 2
      },
      {
        id: `${unitId}_l4_q3`,
        type: 'mcq',
        questionPrompt: `[Dialogue Practice] ${dialogueQ.prompt}`,
        options: [dialogueQ.correct, ...dialogueQ.distractors],
        correctAnswer: dialogueQ.correct,
        explanationAr: dialogueQ.explanationAr,
        marks: 2
      },
      {
        id: `${unitId}_l4_q4`,
        type: 'mcq',
        questionPrompt: `[Phonics Assessment] Which word contains the phonics sound ${phonics.soundLabel}?`,
        options: [phonics.targetWord, ...phonics.distractors],
        correctAnswer: phonics.targetWord,
        explanationAr: `كلمة ${phonics.targetWord} تتضمن الصوت ${phonics.soundLabel}.`,
        marks: 2
      },
      {
        id: `${unitId}_l4_q5`,
        type: 'reorder',
        questionPrompt: `[Writing Drill] ${reorders[0].prompt}`,
        options: [reorders[0].correct, ...reorders[0].distractors],
        correctAnswer: reorders[0].correct,
        explanationAr: reorders[0].explanationAr,
        marks: 2
      },
      {
        id: `${unitId}_l4_q6`,
        type: 'punctuation',
        questionPrompt: `[Punctuation Standard] Choose the correctly capitalized and punctuated sentence:`,
        options: [punctuationQ.correct, ...punctuationQ.distractors],
        correctAnswer: punctuationQ.correct,
        explanationAr: punctuationQ.explanationAr,
        marks: 2
      }
    ],
    level5_HigherThinking: [
      {
        id: `${unitId}_l5_q1`,
        type: 'mcq',
        questionPrompt: `Contextual Application: ${dialogueQ.prompt}`,
        options: [dialogueQ.correct, ...dialogueQ.distractors],
        correctAnswer: dialogueQ.correct,
        explanationAr: dialogueQ.explanationAr,
        marks: 2
      },
      {
        id: `${unitId}_l5_q2`,
        type: 'mcq',
        questionPrompt: `Grammatical Analysis (${spec.grammarTopic}): ${grammarMcqs[0].prompt}`,
        options: [grammarMcqs[0].correct, ...grammarMcqs[0].distractors],
        correctAnswer: grammarMcqs[0].correct,
        explanationAr: grammarMcqs[0].explanationAr,
        marks: 2
      },
      {
        id: `${unitId}_l5_q3`,
        type: 'mcq',
        questionPrompt: `Thematic Classification: Which pair of words belongs together in "${unitTitleEn}"?`,
        options: [`${v1.word} and ${v2.word}`, 'Rocket and Submarine', 'Snowstorm and Glacier', 'Traffic and Factory'],
        correctAnswer: `${v1.word} and ${v2.word}`,
        explanationAr: `الكلمتان (${v1.word} و ${v2.word}) تنتميان معاً لموضوع الوحدة (${unitTitleAr}).`,
        marks: 2
      },
      {
        id: `${unitId}_l5_q4`,
        type: 'mcq',
        questionPrompt: `Structure & Syntax: ${grammarMcqs[2].prompt}`,
        options: [grammarMcqs[2].correct, ...grammarMcqs[2].distractors],
        correctAnswer: grammarMcqs[2].correct,
        explanationAr: grammarMcqs[2].explanationAr,
        marks: 2
      },
      {
        id: `${unitId}_l5_q5`,
        type: 'mcq',
        questionPrompt: `Comprehension Inference: Based on "${readingPassage.passage}", ${readingPassage.question}`,
        options: [readingPassage.correct, ...readingPassage.distractors],
        correctAnswer: readingPassage.correct,
        explanationAr: readingPassage.explanationAr,
        marks: 2
      },
      {
        id: `${unitId}_l5_q6`,
        type: 'guided_sentence',
        questionPrompt: `Complete the meaningful sentence from the unit: "${v3.clozeSentence}"`,
        options: [v3.word, ...v3.clozeDistractors],
        correctAnswer: v3.word,
        explanationAr: `الكلمة الدقيقة لإكمال المعنى هي ${v3.word}.`,
        marks: 2
      },
      {
        id: `${unitId}_l5_q7`,
        type: 'mcq',
        questionPrompt: `Phonics Deduction: Which word pair shares the target sound ${phonics.soundLabel}?`,
        options: [`${phonics.matchingPair[0]} and ${phonics.matchingPair[1]}`, ...phonics.pairDistractors],
        correctAnswer: `${phonics.matchingPair[0]} and ${phonics.matchingPair[1]}`,
        explanationAr: `تشترك الكلمتان (${phonics.matchingPair[0]} و ${phonics.matchingPair[1]}) في الصوت ${phonics.soundLabel}.`,
        marks: 2
      },
      {
        id: `${unitId}_l5_q8`,
        type: 'mcq',
        questionPrompt: `Writing Mechanics: Which sentence follows all English capitalization and punctuation rules?`,
        options: [punctuationQ.correct, ...punctuationQ.distractors],
        correctAnswer: punctuationQ.correct,
        explanationAr: punctuationQ.explanationAr,
        marks: 2
      }
    ]
  };

  return rotatePrimarySuiteOptions(rawSuite, spec.unitIndex);
}

// -------------------------------------------------------------------------
// PRIMARY 1 - UNIT 1: Hello!
// -------------------------------------------------------------------------
const raw_p1_u1_exams: UnitExamSuite = {
  level1_Foundation: [
    { id: 'p1_u1_l1_q1', type: 'mcq', questionPrompt: 'Look and identify: When you meet someone new, you say ______.', options: ['Hello', 'Goodbye', 'Pen', 'Book'], correctAnswer: 'Hello', explanationAr: 'عند لقاء شخص نقول مرحباً (Hello).', marks: 1 },
    { id: 'p1_u1_l1_q2', type: 'mcq', questionPrompt: 'Which word starts with the letter sound /b/?', options: ['Bag', 'Hello', 'Eye', 'Nose'], correctAnswer: 'Bag', explanationAr: 'كلمة Bag تبدأ بصوت الحرف B /b/.', marks: 1 },
    { id: 'p1_u1_l1_q3', type: 'mcq', questionPrompt: 'The Busy Bee is a ______.', options: ['bee', 'bag', 'book', 'bus'], correctAnswer: 'bee', explanationAr: 'النحلة النشيطة تسمى Busy Bee.', marks: 1 },
    { id: 'p1_u1_l1_q4', type: 'mcq', questionPrompt: 'When you leave class, you wave your hand and say ______.', options: ['Goodbye', 'Hello', 'Bag', 'Name'], correctAnswer: 'Goodbye', explanationAr: 'عند الانصراف نقول وداعاً (Goodbye).', marks: 1 },
    { id: 'p1_u1_l1_q5', type: 'mcq', questionPrompt: 'Identify the object: You read stories from a ______.', options: ['book', 'bus', 'bee', 'blue'], correctAnswer: 'book', explanationAr: 'نقرأ القصص من الكتاب (book).', marks: 1 },
    { id: 'p1_u1_l1_q6', type: 'mcq', questionPrompt: 'Which color starts with the letter B sound /b/?', options: ['Blue', 'Red', 'Green', 'Yellow'], correctAnswer: 'Blue', explanationAr: 'اللون الأزرق (Blue) يبدأ بصوت /b/.', marks: 1 },
    { id: 'p1_u1_l1_q7', type: 'mcq', questionPrompt: 'We carry our pencils and books inside our ______.', options: ['bag', 'hand', 'eye', 'mouth'], correctAnswer: 'bag', explanationAr: 'نحمل أدواتنا داخل الحقيبة (bag).', marks: 1 },
    { id: 'p1_u1_l1_q8', type: 'mcq', questionPrompt: 'Students travel to school on a big yellow ______.', options: ['bus', 'bag', 'book', 'bee'], correctAnswer: 'bus', explanationAr: 'الحافلة المدرسية تسمى bus.', marks: 1 },
    { id: 'p1_u1_l1_q9', type: 'mcq', questionPrompt: 'Choose the correct greeting: "______! I am Miss Mona."', options: ['Hello', 'Bus', 'Blue', 'Book'], correctAnswer: 'Hello', explanationAr: 'المعلمة تبدأ بالتحية: Hello! I am Miss Mona.', marks: 1 },
    { id: 'p1_u1_l1_q10', type: 'mcq', questionPrompt: 'When friends meet in Egypt, they shake ______.', options: ['hands', 'bags', 'books', 'pens'], correctAnswer: 'hands', explanationAr: 'يصافح الأصدقاء بالأيدي (shake hands).', marks: 1 },
  ],
  level2_Contextual: [
    { id: 'p1_u1_l2_q1', type: 'fill_in_the_blank', questionPrompt: 'Complete the question: "______ your name? — I am Hany."', options: ["What's", "Where's", "How", "Who"], correctAnswer: "What's", explanationAr: "السؤال عن الاسم هو What's your name?", marks: 1 },
    { id: 'p1_u1_l2_q2', type: 'mcq', questionPrompt: 'Teacher says: "______ your book, please. Open page 5."', options: ['Open', 'Close', 'Shake', 'Play'], correctAnswer: 'Open', explanationAr: 'أمر الفصل المدرسي: Open your book (افتح كتابك).', marks: 1 },
    { id: 'p1_u1_l2_q3', type: 'mcq', questionPrompt: 'At the end of the lesson: "______ your bags, children."', options: ['Close', 'Hello', 'Play', 'Read'], correctAnswer: 'Close', explanationAr: 'أمر إغلاق الحقيبة: Close your bags.', marks: 1 },
    { id: 'p1_u1_l2_q4', type: 'mcq', questionPrompt: 'Hany says: "Hello, I am Hany." Youssef replies: "Hello, ______ Youssef."', options: ['I am', 'you are', 'it is', 'they are'], correctAnswer: 'I am', explanationAr: 'للتعريف بالنفس نستخدم صيغة I am.', marks: 1 },
    { id: 'p1_u1_l2_q5', type: 'mcq', questionPrompt: '"What is this?" — "It is a blue ______."', options: ['bag', 'hello', 'goodbye', 'play'], correctAnswer: 'bag', explanationAr: 'حقيبة زرقاء: blue bag.', marks: 1 },
    { id: 'p1_u1_l2_q6', type: 'mcq', questionPrompt: 'Complete: "Shake hands with your ______."', options: ['friend', 'book', 'bus', 'bag'], correctAnswer: 'friend', explanationAr: 'صافح زميلك أو صديقك: friend.', marks: 1 },
    { id: 'p1_u1_l2_q7', type: 'mcq', questionPrompt: 'Select the missing word: "Open your ______ and take your pencil."', options: ['pencil case', 'bus', 'door', 'bed'], correctAnswer: 'pencil case', explanationAr: 'افتح المقلمة: Open your pencil case.', marks: 1 },
    { id: 'p1_u1_l2_q8', type: 'mcq', questionPrompt: 'Amira introduces herself: "I am ______."', options: ['Amira', 'Book', 'Bus', 'Blue'], correctAnswer: 'Amira', explanationAr: 'أميرة تذكر اسمها: I am Amira.', marks: 1 },
    { id: 'p1_u1_l2_q9', type: 'mcq', questionPrompt: 'Hany and Youssef play in the schoolyard. They are ______.', options: ['friends', 'books', 'buses', 'bees'], correctAnswer: 'friends', explanationAr: 'هاني ويوسف صديقان (friends).', marks: 1 },
    { id: 'p1_u1_l2_q10', type: 'mcq', questionPrompt: '"Goodbye, children!" — The children answer: "Goodbye, ______ Mona!"', options: ['Miss', 'Mr', 'Bus', 'Bag'], correctAnswer: 'Miss', explanationAr: 'وداعاً مس منى: Goodbye, Miss Mona.', marks: 1 },
  ],
  level3_AdvancedStructure: [
    { id: 'p1_u1_l3_q1', type: 'reorder', questionPrompt: 'Reorder into a correct sentence: [Mona - am - I - Miss].', options: ['I am Miss Mona', 'Miss Mona am I', 'Am I Miss Mona', 'Mona Miss I am'], correctAnswer: 'I am Miss Mona', explanationAr: 'الترتيب الصحيح: الفاعل I ثم am ثم الاسم Miss Mona.', marks: 2 },
    { id: 'p1_u1_l3_q2', type: 'reorder', questionPrompt: 'Reorder the imperative sentence: [book - your - Open].', options: ['Open your book', 'Your book open', 'Book open your', 'Open book your'], correctAnswer: 'Open your book', explanationAr: 'جملة الأمر تبدأ بالفعل الأساسي في المصدر: Open your book.', marks: 2 },
    { id: 'p1_u1_l3_q3', type: 'reorder', questionPrompt: 'Reorder the greeting: [to - Nice - meet - you].', options: ['Nice to meet you', 'Meet you nice to', 'To meet you nice', 'Nice you to meet'], correctAnswer: 'Nice to meet you', explanationAr: 'عبارة التحية والترحيب: Nice to meet you (سعيد بلقائك).', marks: 2 },
    { id: 'p1_u1_l3_q4', type: 'reorder', questionPrompt: 'Reorder: [Hany - is - name - My].', options: ['My name is Hany', 'Hany is my name', 'Is my name Hany', 'Name my is Hany'], correctAnswer: 'My name is Hany', explanationAr: 'الترتيب النموذجي: My name is Hany.', marks: 2 },
    { id: 'p1_u1_l3_q5', type: 'mcq', questionPrompt: 'Choose the correct punctuation: "what is your name"', options: ["What's your name?", "Whats your name.", "what's your name!", "What your name"], correctAnswer: "What's your name?", explanationAr: 'يبدأ السؤال بحرف كبير وينتهي بعلامة استفهام.', marks: 1 },
    { id: 'p1_u1_l3_q6', type: 'reorder', questionPrompt: 'Reorder the command: [bag - your - Close].', options: ['Close your bag', 'Your bag close', 'Bag your close', 'Close bag your'], correctAnswer: 'Close your bag', explanationAr: 'صيغة الأمر: Close your bag.', marks: 2 },
    { id: 'p1_u1_l3_q7', type: 'mcq', questionPrompt: 'Choose the correct form: "I ______ a Primary 1 student."', options: ['am', 'is', 'are', 'be'], correctAnswer: 'am', explanationAr: 'الضمير I يأخذ فعل يكون am.', marks: 1 },
    { id: 'p1_u1_l3_q8', type: 'reorder', questionPrompt: 'Reorder: [hands - your - Shake].', options: ['Shake your hands', 'Your hands shake', 'Hands your shake', 'Shake hands your'], correctAnswer: 'Shake your hands', explanationAr: 'جملة الأمر: Shake your hands.', marks: 2 },
    { id: 'p1_u1_l3_q9', type: 'mcq', questionPrompt: 'Identify the odd one out:', options: ['Nose', 'Bag', 'Book', 'Bus'], correctAnswer: 'Nose', explanationAr: 'الكلمات Bag, Book, Bus تبدأ بحرف B، بينما Nose تبدأ بحرف N وعضو جسم.', marks: 1 },
    { id: 'p1_u1_l3_q10', type: 'mcq', questionPrompt: 'Which sentence has correct capitalization?', options: ['I am Hana.', 'i am hana.', 'I am hana.', 'i Am Hana.'], correctAnswer: 'I am Hana.', explanationAr: 'الضمير I واسم العلم Hana يجب أن يبدآ بحرف كبير Capital.', marks: 1 },
  ],
  level4_MoeMockExam: [
    { id: 'p1_u1_l4_q1', type: 'mcq', questionPrompt: '[Listening Comprehension] Listen: "Hello, I am Miss Mona. Open your bag." What does Miss Mona ask you to do?', options: ['Open the bag', 'Close the book', 'Say goodbye', 'Shake hands'], correctAnswer: 'Open the bag', explanationAr: 'طلبت المعلمة فتح الحقيبة: Open your bag.', marks: 2 },
    { id: 'p1_u1_l4_q2', type: 'mcq', questionPrompt: '[Reading Passage] "This is Hany. Hany has a blue bag and a green book. He says hello to Youssef." What color is Hany\'s bag?', options: ['Blue', 'Green', 'Red', 'Yellow'], correctAnswer: 'Blue', explanationAr: 'حقيبة هاني زرقاء: blue bag.', marks: 2 },
    { id: 'p1_u1_l4_q3', type: 'mcq', questionPrompt: '[Dialogue Match] "What\'s your name?" — "______"', options: ['I am Amira.', 'It is blue.', 'Goodbye!', 'Thank you.'], correctAnswer: 'I am Amira.', explanationAr: 'الرد المناسب على السؤال عن الاسم هو: I am Amira.', marks: 2 },
    { id: 'p1_u1_l4_q4', type: 'mcq', questionPrompt: '[Phonics Focus] Which two words start with the same sound /b/?', options: ['Bag and Bee', 'Hello and Bag', 'Book and Hand', 'Bus and Eye'], correctAnswer: 'Bag and Bee', explanationAr: 'الكلمتان Bag و Bee تبدآن بنفس الصوت /b/.', marks: 2 },
    { id: 'p1_u1_l4_q5', type: 'reorder', questionPrompt: '[Writing Construction] Reorder into a greeting: [Hello - am - I - Hany - ,].', options: ['Hello, I am Hany', 'I am Hany Hello', 'Hany I am Hello', 'Hello Hany am I'], correctAnswer: 'Hello, I am Hany', explanationAr: 'الجملة الصحيحة: Hello, I am Hany.', marks: 2 },
    { id: 'p1_u1_l4_q6', type: 'punctuation', questionPrompt: '[Punctuation Assessment] Choose the sentence with correct punctuation:', options: ['Goodbye, Miss Mona.', 'goodbye miss mona', 'Goodbye miss Mona?', 'goodbye, Miss mona.'], correctAnswer: 'Goodbye, Miss Mona.', explanationAr: 'تبدأ الجملة بحرف كبير وتوضع فاصلة بعد Goodbye ونقطة في النهاية.', marks: 2 },
  ],
  level5_HigherThinking: [
    { id: 'p1_u1_l5_q1', type: 'mcq', questionPrompt: 'Reasoning: You arrive at your English class at 8:00 AM. What is the most polite greeting to say to your teacher?', options: ['Hello, Miss Mona!', 'Goodbye, Miss Mona!', 'Close your book!', 'What is this?'], correctAnswer: 'Hello, Miss Mona!', explanationAr: 'عند الوصول في بداية اليوم الدراسي نوجه التحية المهذبة Hello.', marks: 2 },
    { id: 'p1_u1_l5_q2', type: 'mcq', questionPrompt: 'Context Analysis: Your classmate is holding a new backpack and asks "What\'s this?" How do you answer?', options: ['It is a bag.', 'Hello!', 'I am Hany.', 'Goodbye!'], correctAnswer: 'It is a bag.', explanationAr: 'السؤال عن الشيء غير العاقل جوابه It is a bag.', marks: 2 },
    { id: 'p1_u1_l5_q3', type: 'mcq', questionPrompt: 'Phonics Association: If Bag, Book, Bus, and Bee share a sound, which new word belongs to their family?', options: ['Boy', 'Cat', 'Dog', 'Apple'], correctAnswer: 'Boy', explanationAr: 'كلمة Boy تبدأ بصوت /b/ مثل باقي الكلمات.', marks: 2 },
    { id: 'p1_u1_l5_q4', type: 'mcq', questionPrompt: 'Social Skills: You see a new boy standing alone in the school playground. What should you do first?', options: ['Say "Hello! I am..." and shake hands', 'Say "Goodbye!" and walk away', 'Tell him to open his bag', 'Stay quiet'], correctAnswer: 'Say "Hello! I am..." and shake hands', explanationAr: 'من آداب التعارف واللطف تقديم النفس ومصافحة الزميل الجديد.', marks: 2 },
    { id: 'p1_u1_l5_q5', type: 'mcq', questionPrompt: 'Language Logic: Why do we use "I am" instead of "It is" when saying our name?', options: ['Because people are persons, not objects', 'Because names are colors', 'Because it is shorter', 'There is no reason'], correctAnswer: 'Because people are persons, not objects', explanationAr: 'نستخدم الضمير I للإشارة إلى النفس العاقلة بينما It لغير العاقل.', marks: 2 },
    { id: 'p1_u1_l5_q6', type: 'guided_sentence', questionPrompt: 'Complete the self-introduction: "Hello! My name is ______."', options: ['Amira', 'Book', 'Bag', 'Bus'], correctAnswer: 'Amira', explanationAr: 'نكمل باسم شخص مناسب مثل Amira.', marks: 2 },
    { id: 'p1_u1_l5_q7', type: 'mcq', questionPrompt: 'Error Correction: Find the error in "Open you bag, please."', options: ['"you" should be "your"', '"Open" is wrong', '"bag" is wrong', '"please" is wrong'], correctAnswer: '"you" should be "your"', explanationAr: 'صفة الملكية الصحيحة هي your bag وليس you bag.', marks: 2 },
    { id: 'p1_u1_l5_q8', type: 'mcq', questionPrompt: 'Roleplay Decision: The school bell rings at 2:00 PM and everyone is going home. What do you say to your friends?', options: ['Goodbye! See you tomorrow.', 'Open your books!', 'What\'s your name?', 'Hello, Miss Mona.'], correctAnswer: 'Goodbye! See you tomorrow.', explanationAr: 'عند المغادرة نهاية اليوم الدراسي نودع أصدقاءنا بـ Goodbye.', marks: 2 },
  ],
};

export const p1_u1_exams: UnitExamSuite = rotatePrimarySuiteOptions(raw_p1_u1_exams, 1);

// -------------------------------------------------------------------------
// PRIMARY 1 - UNITS 2 TO 6
// -------------------------------------------------------------------------
export const p1_u2_exams: UnitExamSuite = buildVerifiedP1P2Suite({
  unitId: 'p1_u2',
  unitIndex: 2,
  unitTitleEn: 'This is me!',
  unitTitleAr: 'هذا أنا وأجزاء الجسم',
  grammarTopic: 'Touch your... / Parts of the body & Imperatives',
  vocab: [
    { word: 'Nose', meaning: 'أنف', phonetic: '/nəʊz/', pos: 'Noun', clozeSentence: 'Touch your ______ and smell the flower.', clozeDistractors: ['Book', 'Bus', 'Chair'] },
    { word: 'Eye', meaning: 'عين', phonetic: '/aɪ/', pos: 'Noun', clozeSentence: 'I can see the board with my ______.', clozeDistractors: ['Bag', 'Table', 'Door'] },
    { word: 'Ear', meaning: 'أذن', phonetic: '/ɪə/', pos: 'Noun', clozeSentence: 'Listen to the teacher with your ______.', clozeDistractors: ['Pen', 'Shoe', 'Ruler'] },
    { word: 'Mouth', meaning: 'فم', phonetic: '/maʊθ/', pos: 'Noun', clozeSentence: 'Wash your face and ______ every morning.', clozeDistractors: ['Pencil', 'Window', 'Bus'] },
    { word: 'Hand', meaning: 'يد', phonetic: '/hænd/', pos: 'Noun', clozeSentence: 'Wash your ______ with water and soap before eating.', clozeDistractors: ['Book', 'Bike', 'Tree'] }
  ],
  phonics: {
    soundLabel: '/n/ and /h/',
    targetWord: 'Nose',
    targetMeaningAr: 'أنف',
    distractors: ['Bag', 'Book', 'Apple'],
    matchingPair: ['Hand', 'Hair'],
    pairDistractors: ['Nose and Bag', 'Eye and Bus', 'Ear and Book']
  },
  dialogueQ: {
    prompt: 'Teacher says: "Touch your nose, Hany!" What does Hany say?',
    correct: 'This is my nose!',
    distractors: ['Goodbye, Miss Mona.', 'Open your bag.', 'I am seven.'],
    explanationAr: 'عندما يطلب المعلم لمس الأنف يشير الطالب قائلاً: This is my nose.'
  },
  grammarMcqs: [
    { prompt: 'Choose the correct action instruction: "______ your hands with soap!"', correct: 'Wash', distractors: ['Read', 'Sleep', 'Drive'], explanationAr: 'الفعل المناسب لغسل اليدين بالصابون هو Wash.' },
    { prompt: 'Complete the sentence: "I have two ______."', correct: 'eyes', distractors: ['nose', 'mouth', 'head'], explanationAr: 'بعد العدد two نختار الاسم الجمع eyes (عينان).' },
    { prompt: 'Choose the correct demonstrative: "______ is my hand."', correct: 'This', distractors: ['These', 'They', 'Are'], explanationAr: 'للمفرد القريب (hand) نستخدم اسم الإشارة This is.' }
  ],
  reorders: [
    { prompt: 'Reorder into a correct sentence: [is - This - my - nose].', correct: 'This is my nose', distractors: ['My nose is this', 'Is this my nose', 'Nose my is this'], explanationAr: 'الترتيب الصحيح: This is my nose.' },
    { prompt: 'Reorder the instruction: [your - Wash - hands].', correct: 'Wash your hands', distractors: ['Your hands wash', 'Hands wash your', 'Wash hands your'], explanationAr: 'تبدأ جملة الأمر بالفعل في المصدر: Wash your hands.' },
    { prompt: 'Reorder the command: [your - Touch - ear].', correct: 'Touch your ear', distractors: ['Your ear touch', 'Ear your touch', 'Touch ear your'], explanationAr: 'أمر الفصل: Touch your ear (المس أذنك).' },
    { prompt: 'Reorder: [salad - eat - Let\'s - healthy].', correct: "Let's eat healthy salad", distractors: ["Healthy salad let's eat", "Eat let's healthy salad", "Salad healthy eat let's"], explanationAr: "أسلوب الاقتراح يبدأ بـ Let's يليها الفعل في المصدر." }
  ],
  readingPassage: {
    passage: 'Hana is a clean girl. Every morning, she washes her face and hands with water and soap. She brushes her hair and goes to school happy.',
    question: 'How does Hana clean her face and hands?',
    correct: 'With water and soap.',
    distractors: ['With a blue pen.', 'With a school bus.', 'With a storybook.'],
    explanationAr: 'تغسل هنا وجهها ويديها بالماء والصابون (with water and soap).'
  },
  punctuationQ: {
    correct: 'Touch your nose, Hany.',
    distractors: ['touch your nose hany', 'Touch your nose hany?', 'touch Your Nose, Hany.'],
    explanationAr: 'تبدأ الجملة بحرف كبير ويكتب اسم العلم Hany بحرف كبير وتنتهي الجملة بنقطة.'
  }
});

export const p1_u3_exams: UnitExamSuite = buildVerifiedP1P2Suite({
  unitId: 'p1_u3',
  unitIndex: 3,
  unitTitleEn: 'My School Bag',
  unitTitleAr: 'حقيبتي المدرسية والأدوات',
  grammarTopic: 'What is this? It is a... / Counting 1–5 & Plurals',
  vocab: [
    { word: 'Pen', meaning: 'قلم جاف', phonetic: '/pɛn/', pos: 'Noun', clozeSentence: 'The teacher writes with a blue ______.', clozeDistractors: ['Nose', 'Apple', 'Cloud'] },
    { word: 'Pencil', meaning: 'قلم رصاص', phonetic: '/ˈpɛnsəl/', pos: 'Noun', clozeSentence: 'I draw a picture with my ______.', clozeDistractors: ['Ear', 'Banana', 'Shoe'] },
    { word: 'Ruler', meaning: 'مسطرة', phonetic: '/ˈruːlə/', pos: 'Noun', clozeSentence: 'Use your ______ to draw a straight line.', clozeDistractors: ['Mouth', 'Cat', 'Tree'] },
    { word: 'Sharpener', meaning: 'براية', phonetic: '/ˈʃɑːpnə/', pos: 'Noun', clozeSentence: 'I use a ______ to sharpen my pencil.', clozeDistractors: ['Hand', 'Bus', 'Milk'] },
    { word: 'Pencil case', meaning: 'مقلمة', phonetic: '/ˈpɛnsəl keɪs/', pos: 'Noun', clozeSentence: 'I keep my pens and ruler inside my ______.', clozeDistractors: ['Eye', 'Chair', 'Window'] }
  ],
  phonics: {
    soundLabel: '/p/ and /r/',
    targetWord: 'Pencil',
    targetMeaningAr: 'قلم رصاص',
    distractors: ['Nose', 'Hand', 'Book'],
    matchingPair: ['Pen', 'Pencil'],
    pairDistractors: ['Pen and Nose', 'Ruler and Bag', 'Book and Ear']
  },
  dialogueQ: {
    prompt: '"What\'s this?" — "______"',
    correct: 'It is a pencil case.',
    distractors: ['I am Hany.', 'Hello, Miss Mona!', 'Wash your hands.'],
    explanationAr: 'السؤال عن أداة مدرسية مفردة غير عاقلة جوابه: It is a pencil case.'
  },
  grammarMcqs: [
    { prompt: 'Count and choose: "One ruler, two, three ______."', correct: 'rulers', distractors: ['ruler', 'a ruler', 'an ruler'], explanationAr: 'بعد العدد three يأتي الاسم في صيغة الجمع بإضافة s (rulers).' },
    { prompt: 'Complete the question: "______ is this? — It is a sharpener."', correct: 'What', distractors: ['Who', 'How old', 'Where'], explanationAr: 'نسأل عن ماهية الشيء غير العاقل بأداة الاستفهام What.' },
    { prompt: 'Choose the correct article: "It is ______ red pen."', correct: 'a', distractors: ['an', 'two', 'are'], explanationAr: 'الصفة red تبدأ بصوت ساكن والمفرد المعدود يسبقه أداة النكرة a.' }
  ],
  reorders: [
    { prompt: 'Reorder the question: [is - What - this - ?].', correct: 'What is this?', distractors: ['This is what?', 'Is this what?', 'What this is?'], explanationAr: 'السؤال الصحيح: What is this?' },
    { prompt: 'Reorder the answer: [is - It - a - ruler].', correct: 'It is a ruler', distractors: ['A ruler is it', 'Is it a ruler', 'Ruler a it is'], explanationAr: 'الإجابة الصحيحة: It is a ruler.' },
    { prompt: 'Reorder the counting sentence: [three - I - pens - have].', correct: 'I have three pens', distractors: ['Three pens have I', 'Have I three pens', 'Pens three I have'], explanationAr: 'الترتيب الصحيح: الفاعل I ثم الفعل have ثم العدد والاسم الجمع.' },
    { prompt: 'Reorder: [my - is - This - pencil].', correct: 'This is my pencil', distractors: ['My pencil is this', 'Is this my pencil', 'Pencil my this is'], explanationAr: 'الترتيب الصحيح: This is my pencil.' }
  ],
  readingPassage: {
    passage: 'Youssef has a new school bag. Inside his bag, he has one pencil case, two blue pens, three pencils, and one red ruler.',
    question: 'How many pencils does Youssef have in his bag?',
    correct: 'Three pencils.',
    distractors: ['One pencil.', 'Five pencils.', 'Ten pencils.'],
    explanationAr: 'ذكر النص أن يوسف لديه ثلاثة أقلام رصاص (three pencils).'
  },
  punctuationQ: {
    correct: 'What is this?',
    distractors: ['what is this.', 'What is this.', 'what Is This?'],
    explanationAr: 'يبدأ السؤال بحرف كبير وينتهي بعلامة استفهام.'
  }
});

export const p1_u4_exams: UnitExamSuite = buildVerifiedP1P2Suite({
  unitId: 'p1_u4',
  unitIndex: 4,
  unitTitleEn: "It's My Birthday!",
  unitTitleAr: 'عيد ميلادي والأرقام والألوان',
  grammarTopic: 'How old are you? I am... / Numbers 6–10 & Colors',
  vocab: [
    { word: 'Cake', meaning: 'كعكة عيد ميلاد', phonetic: '/keɪk/', pos: 'Noun', clozeSentence: 'Mom baked a delicious chocolate ______ for my birthday.', clozeDistractors: ['Ruler', 'Pencil', 'Bus'] },
    { word: 'Candle', meaning: 'شمعة', phonetic: '/ˈkændl/', pos: 'Noun', clozeSentence: 'There are seven ______s on top of the birthday cake.', clozeDistractors: ['Bags', 'Ears', 'Doors'] },
    { word: 'Card', meaning: 'بطاقة تهنئة', phonetic: '/kɑːd/', pos: 'Noun', clozeSentence: 'Amira wrote "Happy Birthday" on a colorful ______.', clozeDistractors: ['Nose', 'Shoe', 'Spoon'] },
    { word: 'Balloon', meaning: 'بالون ملون', phonetic: '/bəˈluːn/', pos: 'Noun', clozeSentence: 'He has a red and yellow ______ for the party.', clozeDistractors: ['Sharpener', 'Mouth', 'Bed'] },
    { word: 'Orange', meaning: 'برتقالة / اللون البرتقالي', phonetic: '/ˈɒrɪndʒ/', pos: 'Noun', clozeSentence: 'Red and yellow make the color ______.', clozeDistractors: ['Book', 'Hand', 'Pen'] }
  ],
  phonics: {
    soundLabel: '/k/ (letter c) and /ɒ/ (letter o)',
    targetWord: 'Cake',
    targetMeaningAr: 'كعكة',
    distractors: ['Pen', 'Nose', 'Hand'],
    matchingPair: ['Cake', 'Card'],
    pairDistractors: ['Cake and Nose', 'Card and Pen', 'Orange and Bag']
  },
  dialogueQ: {
    prompt: '"How old are you, Hany?" — "______"',
    correct: 'I am seven.',
    distractors: ['It is a book.', 'Touch your nose.', 'Open your bag.'],
    explanationAr: 'عند السؤال عن العمر بـ How old are you نجيب بـ I am + الرقم.'
  },
  grammarMcqs: [
    { prompt: 'Complete the question about age: "______ old are you?"', correct: 'How', distractors: ['What', 'Who', 'Where'], explanationAr: 'نسأل عن العمر باستخدام الصيغة: How old are you?' },
    { prompt: 'Choose the correct verb: "I ______ six years old."', correct: 'am', distractors: ['is', 'are', 'have'], explanationAr: 'الضمير I يتبعه دائماً الفعل am عند ذكر السن.' },
    { prompt: 'Count the candles: "Six, seven, eight, ______, ten."', correct: 'nine', distractors: ['two', 'one', 'four'], explanationAr: 'العدد الذي يأتي بين 8 (eight) و 10 (ten) هو 9 (nine).' }
  ],
  reorders: [
    { prompt: 'Reorder the age question: [old - How - you - are - ?].', correct: 'How old are you?', distractors: ['Are you how old?', 'Old how are you?', 'You are how old?'], explanationAr: 'ترتيب السؤال عن العمر: How old are you?' },
    { prompt: 'Reorder the answer: [seven - am - I].', correct: 'I am seven', distractors: ['Seven am I', 'Am I seven', 'I seven am'], explanationAr: 'الإجابة عن العمر: I am seven.' },
    { prompt: 'Reorder: [birthday - Happy - you - to].', correct: 'Happy birthday to you', distractors: ['Birthday happy to you', 'To you happy birthday', 'You to happy birthday'], explanationAr: 'عبارة التهنئة بعيد الميلاد: Happy birthday to you.' },
    { prompt: 'Reorder: [balloons - red - Three].', correct: 'Three red balloons', distractors: ['Balloons red three', 'Red balloons three', 'Three balloons red'], explanationAr: 'العدد ثم اللون ثم الاسم الجمع: Three red balloons.' }
  ],
  readingPassage: {
    passage: 'Today is Amira\'s birthday. She is eight years old. Her friends Hany and Hana give her a birthday card and five colorful balloons.',
    question: 'How old is Amira today?',
    correct: 'She is eight years old.',
    distractors: ['She is five years old.', 'She is ten years old.', 'She is six years old.'],
    explanationAr: 'ذكر النص أن عمر أميرة اليوم ثماني سنوات (She is eight years old).'
  },
  punctuationQ: {
    correct: 'How old are you?',
    distractors: ['how old are you.', 'How old are you.', 'how Old Are You?'],
    explanationAr: 'سؤال الاستفهام يبدأ بحرف كبير (H) وينتهي بعلامة استفهام (?).'
  }
});

export const p1_u5_exams: UnitExamSuite = buildVerifiedP1P2Suite({
  unitId: 'p1_u5',
  unitIndex: 5,
  unitTitleEn: 'With My Family',
  unitTitleAr: 'مع عائلتي والترابط الأسري',
  grammarTopic: 'Who is this? This is my... / Polite manners (Please & Thank you)',
  vocab: [
    { word: 'Father', meaning: 'أب', phonetic: '/ˈfɑːðə/', pos: 'Noun', clozeSentence: 'This is my ______. He reads stories to me.', clozeDistractors: ['Pencil', 'Balloon', 'Ruler'] },
    { word: 'Mother', meaning: 'أم', phonetic: '/ˈmʌðə/', pos: 'Noun', clozeSentence: 'I love my ______ and help her in the kitchen.', clozeDistractors: ['Sharpener', 'Bus', 'Candle'] },
    { word: 'Brother', meaning: 'أخ', phonetic: '/ˈbrʌðə/', pos: 'Noun', clozeSentence: 'My ______ plays football with me in the garden.', clozeDistractors: ['Bag', 'Cake', 'Book'] },
    { word: 'Sister', meaning: 'أخت', phonetic: '/ˈsɪstə/', pos: 'Noun', clozeSentence: 'This is my ______. She shares her colors with me.', clozeDistractors: ['Pen', 'Chair', 'Table'] },
    { word: 'Grandmother', meaning: 'جدة', phonetic: '/ˈɡrænˌmʌðə/', pos: 'Noun', clozeSentence: 'We visit our kind ______ and grandfather on Friday.', clozeDistractors: ['Ruler', 'Bus', 'Balloon'] }
  ],
  phonics: {
    soundLabel: '/f/ and /t/',
    targetWord: 'Father',
    targetMeaningAr: 'أب (يبدأ بصوت /f/)',
    distractors: ['Bag', 'Candle', 'Nose'],
    matchingPair: ['Father', 'Family'],
    pairDistractors: ['Father and Cake', 'Mother and Bus', 'Sister and Pen']
  },
  dialogueQ: {
    prompt: '"Have some cake, Hany." — "______"',
    correct: 'Thank you!',
    distractors: ['Who is this?', 'Open your book.', 'I have a nose.'],
    explanationAr: 'عندما يقدم لنا شخص شيئاً نشكره بأدب قائلين: Thank you!'
  },
  grammarMcqs: [
    { prompt: 'Ask about a family member: "______ is this? — This is my father."', correct: 'Who', distractors: ['What', 'How many', 'Where'], explanationAr: 'للسؤال عن الشخص العاقل نستخدم أداة الاستفهام Who (مَنْ).' },
    { prompt: 'Complete the polite request: "Can I have some water, ______?"', correct: 'please', distractors: ['hello', 'bag', 'who'], explanationAr: 'نستخدم كلمة please عند الطلب المهذب.' },
    { prompt: 'Choose the correct pronoun for your sister: "This is my sister. ______ is kind."', correct: 'She', distractors: ['He', 'It', 'They'], explanationAr: 'الضمير العائد على الأخت (مفرد مؤنث) هو She.' }
  ],
  reorders: [
    { prompt: 'Reorder the question: [this - Who - is - ?].', correct: 'Who is this?', distractors: ['This is who?', 'Is this who?', 'Who this is?'], explanationAr: 'السؤال عن العاقل: Who is this?' },
    { prompt: 'Reorder the family introduction: [is - This - father - my].', correct: 'This is my father', distractors: ['My father is this', 'Is this my father', 'Father my this is'], explanationAr: 'الترتيب الصحيح للتعريف بالأب: This is my father.' },
    { prompt: 'Reorder the polite sentence: [love - I - family - my].', correct: 'I love my family', distractors: ['My family love I', 'Love I my family', 'Family my I love'], explanationAr: 'الترتيب الصحيح: I love my family.' },
    { prompt: 'Reorder: [you - Thank - , - Mom].', correct: 'Thank you, Mom', distractors: ['You thank, Mom', 'Mom thank you', 'Thank Mom you'], explanationAr: 'عبارة الشكر المهذبة: Thank you, Mom.' }
  ],
  readingPassage: {
    passage: 'Hany loves his family. He helps his mother and father at home. He shares his toys with his sister Amira and says "please" and "thank you".',
    question: 'With whom does Hany share his toys?',
    correct: 'With his sister Amira.',
    distractors: ['With a school bus.', 'With a sharpener.', 'With a red ruler.'],
    explanationAr: 'يشارك هاني ألعابه مع أخته أميرة (with his sister Amira).'
  },
  punctuationQ: {
    correct: 'This is my mother.',
    distractors: ['this is my mother', 'This is my mother?', 'this Is My Mother.'],
    explanationAr: 'تبدأ الجملة الخبرية بحرف كبير وتنتهي بنقطة.'
  }
});

export const p1_u6_exams: UnitExamSuite = buildVerifiedP1P2Suite({
  unitId: 'p1_u6',
  unitIndex: 6,
  unitTitleEn: "Let's Play Music!",
  unitTitleAr: 'هيا نعزف الموسيقى والقدرات',
  grammarTopic: 'I can play the... / Expressing ability with can',
  vocab: [
    { word: 'Guitar', meaning: 'جيتار', phonetic: '/ɡɪˈtɑː/', pos: 'Noun', clozeSentence: 'Hany can play the ______ with his fingers.', clozeDistractors: ['Nose', 'Sharpener', 'Apple'] },
    { word: 'Piano', meaning: 'بيانو', phonetic: '/piˈænəʊ/', pos: 'Noun', clozeSentence: 'Amira plays a beautiful song on the ______.', clozeDistractors: ['Ruler', 'Ear', 'Balloon'] },
    { word: 'Flute', meaning: 'ناي / مزمار', phonetic: '/fluːt/', pos: 'Noun', clozeSentence: 'Youssef blows air into his ______ to make music.', clozeDistractors: ['Bag', 'Shoe', 'Candle'] },
    { word: 'Drum', meaning: 'طبلة', phonetic: '/drʌm/', pos: 'Noun', clozeSentence: 'I can hit the ______ to keep the rhythm.', clozeDistractors: ['Pencil', 'Book', 'Eye'] },
    { word: 'Triangle', meaning: 'مثلث موسيقي', phonetic: '/ˈtraɪæŋɡl/', pos: 'Noun', clozeSentence: 'Hana rings the silver ______ in music class.', clozeDistractors: ['Mouth', 'Bus', 'Cake'] }
  ],
  phonics: {
    soundLabel: '/d/ and /g/',
    targetWord: 'Drum',
    targetMeaningAr: 'طبلة (تبدأ بصوت /d/)',
    distractors: ['Pen', 'Nose', 'Cake'],
    matchingPair: ['Drum', 'Dog'],
    pairDistractors: ['Drum and Pen', 'Guitar and Nose', 'Flute and Bag']
  },
  dialogueQ: {
    prompt: '"Can you play the piano, Amira?" — "______"',
    correct: 'Yes, I can.',
    distractors: ['It is a ruler.', 'I am seven.', 'Goodbye!'],
    explanationAr: 'السؤال الذي يبدأ بـ Can you play جوابه بالإثبات: Yes, I can.'
  },
  grammarMcqs: [
    { prompt: 'Choose the correct form after "can": "I can ______ the guitar."', correct: 'play', distractors: ['plays', 'playing', 'played'], explanationAr: 'بعد الفعل الناقص can يأتي الفعل الأساسي في المصدر بدون أي إضافات (play).' },
    { prompt: 'Complete the sentence: "She can play ______ drum."', correct: 'the', distractors: ['an', 'two', 'are'], explanationAr: 'مع الآلات الموسيقية نستخدم أداة التعريف the بعد الفعل play.' },
    { prompt: 'Which sense do we use when listening to music? "I can ______ the music with my ears."', correct: 'hear', distractors: ['taste', 'smell', 'touch'], explanationAr: 'نسمع الموسيقى بالأذنين باستخدام الفعل hear.' }
  ],
  reorders: [
    { prompt: 'Reorder the ability sentence: [play - I - can - the - drum].', correct: 'I can play the drum', distractors: ['The drum can I play', 'Can I play the drum', 'Play can I the drum'], explanationAr: 'الترتيب الصحيح: الفاعل I ثم can ثم play ثم the drum.' },
    { prompt: 'Reorder: [play - Let\'s - music - together].', correct: "Let's play music together", distractors: ["Music together let's play", "Play let's music together", "Together music play let's"], explanationAr: "تبدأ جملة الاقتراح بـ Let's متبوعة بالمصدر play." },
    { prompt: 'Reorder: [can - She - play - the - piano].', correct: 'She can play the piano', distractors: ['The piano she can play', 'Can she play the piano', 'Piano the play she can'], explanationAr: 'الترتيب الصحيح: She can play the piano.' },
    { prompt: 'Reorder: [guitar - my - This - is].', correct: 'This is my guitar', distractors: ['My guitar is this', 'Is this my guitar', 'Guitar my this is'], explanationAr: 'الترتيب الصحيح: This is my guitar.' }
  ],
  readingPassage: {
    passage: 'The children are in the music room. Hany can play the guitar. Amira can play the piano. Youssef can play the drum. They love music!',
    question: 'What instrument can Hany play?',
    correct: 'The guitar.',
    distractors: ['The flute.', 'The triangle.', 'The violin.'],
    explanationAr: 'ذكر النص أن هاني يستطيع عزف الجيتار (Hany can play the guitar).'
  },
  punctuationQ: {
    correct: 'I can play the piano.',
    distractors: ['i can play the piano', 'I can play the piano?', 'i Can Play The Piano.'],
    explanationAr: 'الضمير I يكتب بحرف كبير وتنتهي الجملة الخبرية بنقطة.'
  }
});

// -------------------------------------------------------------------------
// PRIMARY 2 - UNITS 1 TO 6
// -------------------------------------------------------------------------
export const p2_u1_exams: UnitExamSuite = buildVerifiedP1P2Suite({
  unitId: 'p2_u1',
  unitIndex: 7,
  unitTitleEn: 'Meet My Family',
  unitTitleAr: 'تعرف على عائلتي والتحيات اليومية',
  grammarTopic: 'This is vs. These are / Greetings (Good morning, Good afternoon, Good evening)',
  vocab: [
    { word: 'Parents', meaning: 'الوالدان (الأب والأم)', phonetic: '/ˈpeərənts/', pos: 'Noun', clozeSentence: 'These are my ______. They take care of our family.', clozeDistractors: ['Pencils', 'Balloons', 'Shoes'] },
    { word: 'Grandparents', meaning: 'الأجداد (الجد والجدة)', phonetic: '/ˈɡrænˌpeərənts/', pos: 'Noun', clozeSentence: 'We visit our ______ every Friday and listen to their stories.', clozeDistractors: ['Rulers', 'Buses', 'Tables'] },
    { word: 'Cousin', meaning: 'ابن أو ابنة العم/الخال', phonetic: '/ˈkʌzən/', pos: 'Noun', clozeSentence: 'This is my ______ Ramy. He is seven years old.', clozeDistractors: ['Drum', 'Book', 'Cake'] },
    { word: 'Uncle', meaning: 'عم أو خال', phonetic: '/ˈʌŋkəl/', pos: 'Noun', clozeSentence: 'My ______ wears glasses and works as a teacher.', clozeDistractors: ['Bag', 'Candle', 'Flute'] },
    { word: 'Nurse', meaning: 'ممرضة تساعد المرضى', phonetic: '/nɜːs/', pos: 'Noun', clozeSentence: 'My aunt is a kind ______ who helps sick children.', clozeDistractors: ['Chair', 'Sharpener', 'Guitar'] }
  ],
  phonics: {
    soundLabel: 'digraph /tʃ/ (ch)',
    targetWord: 'Chicken',
    targetMeaningAr: 'دجاج (يبدأ بصوت ch /tʃ/)',
    distractors: ['Ship', 'Book', 'Sun'],
    matchingPair: ['Chicken', 'Children'],
    pairDistractors: ['Chicken and Ship', 'Children and Bus', 'Chips and Car']
  },
  dialogueQ: {
    prompt: 'The sun is rising at 7:00 AM. Grandpa says: "Good morning, Hana!" Hana replies: "______"',
    correct: 'Good morning, Grandpa!',
    distractors: ['Good night, Grandpa!', 'It is a ruler.', 'Close your bag.'],
    explanationAr: 'نرد على تحية الصباح Good morning بنفس التحية: Good morning, Grandpa!'
  },
  grammarMcqs: [
    { prompt: 'Choose the correct demonstrative for plural family members: "______ are my grandparents."', correct: 'These', distractors: ['This', 'It', 'Am'], explanationAr: 'مع الاسم الجمع (grandparents) نستخدم اسم الإشارة للجمع القريب These are.' },
    { prompt: 'Choose the correct demonstrative for one person: "______ is my cousin."', correct: 'This', distractors: ['These', 'Those', 'They'], explanationAr: 'مع الاسم المفرد (cousin) نستخدم This is.' },
    { prompt: 'Complete with the right verb: "My parents ______ kind and helpful."', correct: 'are', distractors: ['is', 'am', 'has'], explanationAr: 'الفاعل الجمع (My parents) يأخذ الفعل المساعد are.' }
  ],
  reorders: [
    { prompt: 'Reorder the plural introduction: [are - These - parents - my].', correct: 'These are my parents', distractors: ['My parents are these', 'Are these my parents', 'These my parents are'], explanationAr: 'الترتيب الصحيح للجمع: These are my parents.' },
    { prompt: 'Reorder the singular introduction: [my - is - This - uncle].', correct: 'This is my uncle', distractors: ['My uncle is this', 'Is this my uncle', 'Uncle my this is'], explanationAr: 'الترتيب الصحيح للمفرد: This is my uncle.' },
    { prompt: 'Reorder the greeting: [morning - Good - , - Grandma].', correct: 'Good morning, Grandma', distractors: ['Morning good, Grandma', 'Grandma good morning', 'Good Grandma morning'], explanationAr: 'تحية الصباح: Good morning, Grandma.' },
    { prompt: 'Reorder: [help - I - family - my].', correct: 'I help my family', distractors: ['My family help I', 'Help I my family', 'Family my I help'], explanationAr: 'الجملة الفعلية: الفاعل I ثم الفعل help ثم المفعول my family.' }
  ],
  readingPassage: {
    passage: 'Amira introduces her family to her friend. "These are my parents. My father is a doctor and my mother is a teacher. This is my cousin Adam."',
    question: 'What is Amira\'s mother\'s job?',
    correct: 'She is a teacher.',
    distractors: ['She is a pilot.', 'She is a baker.', 'She is a driver.'],
    explanationAr: 'ذكر النص أن والدة أميرة معلمة (my mother is a teacher).'
  },
  punctuationQ: {
    correct: 'These are my grandparents.',
    distractors: ['these are my grandparents', 'These are my grandparents?', 'these Are My Grandparents.'],
    explanationAr: 'تبدأ الجملة بحرف كبير وتنتهي بنقطة.'
  }
});

export const p2_u2_exams: UnitExamSuite = buildVerifiedP1P2Suite({
  unitId: 'p2_u2',
  unitIndex: 8,
  unitTitleEn: 'My Body',
  unitTitleAr: 'جسمي وحواسي والقدرات',
  grammarTopic: 'I have / He has / Irregular plurals (tooth/teeth, foot/feet)',
  vocab: [
    { word: 'Head', meaning: 'رأس', phonetic: '/hɛd/', pos: 'Noun', clozeSentence: 'A bird has one ______ and two wings.', clozeDistractors: ['Book', 'Bus', 'Pencil'] },
    { word: 'Face', meaning: 'وجه', phonetic: '/feɪs/', pos: 'Noun', clozeSentence: 'I wash my ______ every morning when I wake up.', clozeDistractors: ['Bag', 'Ruler', 'Chair'] },
    { word: 'Teeth', meaning: 'أسنان (جمع شاذ لـ tooth)', phonetic: '/tiːθ/', pos: 'Noun', clozeSentence: 'Brush your ______ with a toothbrush after meals.', clozeDistractors: ['Shoes', 'Books', 'Bags'] },
    { word: 'Feet', meaning: 'أقدام (جمع شاذ لـ foot)', phonetic: '/fiːt/', pos: 'Noun', clozeSentence: 'I kick the football and run with my two ______.', clozeDistractors: ['Ears', 'Noses', 'Eyes'] },
    { word: 'Beak', meaning: 'منقار الطائر', phonetic: '/biːk/', pos: 'Noun', clozeSentence: 'A bird eats seeds with its sharp ______.', clozeDistractors: ['Hand', 'Shoe', 'Pen'] }
  ],
  phonics: {
    soundLabel: 'digraph /θ/ (th) and long /iː/ (ee)',
    targetWord: 'Teeth',
    targetMeaningAr: 'أسنان (تحتوي على صوت ee وصوت th)',
    distractors: ['Bag', 'Cake', 'Drum'],
    matchingPair: ['Teeth', 'Feet'],
    pairDistractors: ['Teeth and Bag', 'Feet and Nose', 'Bee and Book']
  },
  dialogueQ: {
    prompt: '"How many feet do you have?" — "______"',
    correct: 'I have two feet.',
    distractors: ['I have two foots.', 'It is a beak.', 'Good evening!'],
    explanationAr: 'جمع كلمة foot هو جمع غير منتظم (two feet) وليس foots.'
  },
  grammarMcqs: [
    { prompt: 'Choose the correct verb: "An elephant ______ four strong legs."', correct: 'has', distractors: ['have', 'am', 'are'], explanationAr: 'الفاعل المفرد الغائب (An elephant = It) يأخذ الفعل has.' },
    { prompt: 'Choose the correct irregular plural: "One tooth, many ______."', correct: 'teeth', distractors: ['tooths', 'toothes', 'foot'], explanationAr: 'جمع كلمة tooth (سن) هو teeth (أسنان).' },
    { prompt: 'Complete the ability sentence: "A monkey ______ climb trees quickly."', correct: 'can', distractors: ['is', 'are', 'have'], explanationAr: 'نستخدم الفعل الناقص can للتعبير عن الاستطاعة والقدرة.' }
  ],
  reorders: [
    { prompt: 'Reorder into a correct sentence: [have - I - two - feet].', correct: 'I have two feet', distractors: ['Two feet have I', 'Have I two feet', 'Feet two I have'], explanationAr: 'الترتيب الصحيح: I have two feet.' },
    { prompt: 'Reorder: [has - A - bird - beak - a].', correct: 'A bird has a beak', distractors: ['A beak has a bird', 'Has a bird a beak', 'Bird a has beak a'], explanationAr: 'الفاعل المفرد A bird يليه الفعل has ثم المفعول a beak.' },
    { prompt: 'Reorder: [can - I - see - my - with - eyes].', correct: 'I can see with my eyes', distractors: ['With my eyes can I see', 'See can I with my eyes', 'My eyes I can see with'], explanationAr: 'الترتيب الصحيح: I can see with my eyes.' },
    { prompt: 'Reorder: [teeth - Brush - your - daily].', correct: 'Brush your teeth daily', distractors: ['Your teeth brush daily', 'Teeth your daily brush', 'Daily your teeth brush'], explanationAr: 'جملة الأمر الصحية: Brush your teeth daily.' }
  ],
  readingPassage: {
    passage: 'Look at the hoopoe bird! It has two wings, two legs, and one orange beak. It can fly high in the sky, but it cannot swim.',
    question: 'What can the hoopoe bird do?',
    correct: 'It can fly high in the sky.',
    distractors: ['It can swim under water.', 'It can drive a bus.', 'It can read a book.'],
    explanationAr: 'يستطيع الهدهد الطيران عالياً في السماء (It can fly high in the sky).'
  },
  punctuationQ: {
    correct: 'A bird has two wings.',
    distractors: ['a bird has two wings', 'A bird has two wings?', 'a Bird Has Two Wings.'],
    explanationAr: 'تبدأ الجملة الخبرية بحرف كبير وتنتهي بنقطة.'
  }
});

export const p2_u3_exams: UnitExamSuite = buildVerifiedP1P2Suite({
  unitId: 'p2_u3',
  unitIndex: 9,
  unitTitleEn: 'Off to School',
  unitTitleAr: 'في طريقي إلى المدرسة والملابس',
  grammarTopic: 'What is this? vs. What are these? / Singular & Plural Clothes',
  vocab: [
    { word: 'Boots', meaning: 'حذاء برقبة (بوت)', phonetic: '/buːts/', pos: 'Noun', clozeSentence: 'I wear my brown ______ on rainy winter days.', clozeDistractors: ['Pencils', 'Cakes', 'Ears'] },
    { word: 'Dress', meaning: 'فستان أنيق', phonetic: '/drɛs/', pos: 'Noun', clozeSentence: 'Amira wears a clean blue ______ to the party.', clozeDistractors: ['Ruler', 'Beak', 'Drum'] },
    { word: 'Glasses', meaning: 'نظارة طبية أو شمسية', phonetic: '/ˈɡlɑːsɪz/', pos: 'Noun', clozeSentence: 'Grandpa wears his ______ when he reads a book.', clozeDistractors: ['Boots', 'Candles', 'Flutes'] },
    { word: 'Hat', meaning: 'قبعة تحمي من الشمس', phonetic: '/hæt/', pos: 'Noun', clozeSentence: 'Wear a yellow ______ on your head when it is sunny.', clozeDistractors: ['Shoe', 'Spoon', 'Tooth'] },
    { word: 'Coat', meaning: 'معطف شتوي دافئ', phonetic: '/kəʊt/', pos: 'Noun', clozeSentence: 'Put on your warm ______ because it is cold outside.', clozeDistractors: ['Sharpener', 'Balloon', 'Nose'] }
  ],
  phonics: {
    soundLabel: '/ɑːr/ (ar) and /ɔːr/ (or)',
    targetWord: 'Shirt',
    targetMeaningAr: 'قميص مدرسي (من مفردات الملابس)',
    distractors: ['Book', 'Nose', 'Bee'],
    matchingPair: ['Car', 'Star'],
    pairDistractors: ['Car and Book', 'Sport and Nose', 'Shirt and Bag']
  },
  dialogueQ: {
    prompt: '"What are these?" (pointing to a pair of boots) — "______"',
    correct: 'They are my boots.',
    distractors: ['It is a hat.', 'I am eight.', 'Good morning!'],
    explanationAr: 'السؤال عن اسم جمع (What are these?) نجيب عنه بـ They are my boots.'
  },
  grammarMcqs: [
    { prompt: 'Choose the correct pronoun for plural clothes (glasses / boots): "______ are my glasses."', correct: 'They', distractors: ['It', 'He', 'She'], explanationAr: 'الكلمات المكونة من فردتين مثل glasses و boots تعامل معاملة الجمع وتأخذ They are.' },
    { prompt: 'Choose the correct question for a singular item: "______ is this? — It\'s my coat."', correct: 'What', distractors: ['Who', 'How many', 'Where'], explanationAr: 'للسؤال عن المفرد غير العاقل نستخدم What is this?' },
    { prompt: 'Complete the sentence: "It ______ a green dress."', correct: 'is', distractors: ['are', 'am', 'have'], explanationAr: 'مع المفرد (It) نستخدم الفعل is.' }
  ],
  reorders: [
    { prompt: 'Reorder the plural question: [these - What - are - ?].', correct: 'What are these?', distractors: ['Are these what?', 'These are what?', 'What these are?'], explanationAr: 'ترتيب السؤال عن الجمع القريب: What are these?' },
    { prompt: 'Reorder the plural answer: [are - They - boots - my].', correct: 'They are my boots', distractors: ['My boots are they', 'Are they my boots', 'Boots my they are'], explanationAr: 'الإجابة للجمع: They are my boots.' },
    { prompt: 'Reorder: [is - It - hat - my].', correct: 'It is my hat', distractors: ['My hat is it', 'Is it my hat', 'Hat my it is'], explanationAr: 'الإجابة للمفرد: It is my hat.' },
    { prompt: 'Reorder: [school - like - I - uniform - my].', correct: 'I like my school uniform', distractors: ['My school uniform like I', 'Like I my school uniform', 'Uniform my school I like'], explanationAr: 'الترتيب الصحيح: I like my school uniform.' }
  ],
  readingPassage: {
    passage: 'Hany is getting ready for school. He wears a pale blue shirt, gray trousers, and black shoes. He carries his school bag on his back.',
    question: 'What color is Hany\'s school shirt?',
    correct: 'Pale blue.',
    distractors: ['Bright orange.', 'Dark purple.', 'Yellow and pink.'],
    explanationAr: 'قميص هاني المدرسي لونه أزرق فاتح (pale blue shirt).'
  },
  punctuationQ: {
    correct: 'What are these?',
    distractors: ['what are these.', 'What are these.', 'what Are These?'],
    explanationAr: 'يبدأ السؤال بحرف كبير وينتهي بعلامة استفهام.'
  }
});

export const p2_u4_exams: UnitExamSuite = buildVerifiedP1P2Suite({
  unitId: 'p2_u4',
  unitIndex: 10,
  unitTitleEn: 'Time to Play Sports!',
  unitTitleAr: 'وقت الرياضة والأنشطة الحركية',
  grammarTopic: 'Can you...? Yes, I can / No, I can\'t & Numbers 10–100',
  vocab: [
    { word: 'Football', meaning: 'كرة القدم', phonetic: '/ˈfʊtbɔːl/', pos: 'Noun', clozeSentence: 'Youssef kicks the ball and plays ______ in the club.', clozeDistractors: ['Pencil', 'Coat', 'Tooth'] },
    { word: 'Basketball', meaning: 'كرة السلة', phonetic: '/ˈbɑːskɪtˌbɔːl/', pos: 'Noun', clozeSentence: 'She throws the ball into the basket when playing ______.', clozeDistractors: ['Sharpener', 'Beak', 'Hat'] },
    { word: 'Tennis', meaning: 'رياضة التنس', phonetic: '/ˈtɛnɪs/', pos: 'Noun', clozeSentence: 'I hit the small yellow ball with a racket in ______.', clozeDistractors: ['Boots', 'Cake', 'Nose'] },
    { word: 'Karate', meaning: 'رياضة الكاراتيه', phonetic: '/kəˈrɑːti/', pos: 'Noun', clozeSentence: 'Hana wears a white suit when she practices ______.', clozeDistractors: ['Ruler', 'Glasses', 'Candle'] },
    { word: 'Swimming', meaning: 'رياضة السباحة', phonetic: '/ˈswɪmɪŋ/', pos: 'Noun', clozeSentence: 'We go ______ in the pool on hot summer days.', clozeDistractors: ['Reading', 'Sleeping', 'Drawing'] }
  ],
  phonics: {
    soundLabel: 'consonant blend /gr/ and /bl/',
    targetWord: 'Green',
    targetMeaningAr: 'أخضر (يبدأ بصوت gr)',
    distractors: ['Hat', 'Pen', 'Nose'],
    matchingPair: ['Green', 'Grandma'],
    pairDistractors: ['Green and Book', 'Black and Nose', 'Blue and Cake']
  },
  dialogueQ: {
    prompt: '"Can you hit the ball with a racket?" — "______"',
    correct: 'Yes, I can play tennis.',
    distractors: ['It is a coat.', 'Good night!', 'They are boots.'],
    explanationAr: 'الرد المناسب على سؤال القدرة الرياضية هو: Yes, I can play tennis.'
  },
  grammarMcqs: [
    { prompt: 'Choose the correct short negative answer: "Can a baby play basketball? — No, he ______."', correct: "can't", distractors: ['can', 'is', 'aren\'t'], explanationAr: "النفي المختصر للفعل can هو can't." },
    { prompt: 'Which action verb matches football? "I can ______ the football."', correct: 'kick', distractors: ['read', 'write', 'wear'], explanationAr: 'في كرة القدم نركل الكرة بالقدم: kick the football.' },
    { prompt: 'Count by tens: "Ten, twenty, thirty, ______, fifty."', correct: 'forty', distractors: ['four', 'fourteen', 'five'], explanationAr: 'العد بالعشرات: 10, 20, 30, 40 (forty), 50.' }
  ],
  reorders: [
    { prompt: 'Reorder the question: [you - Can - kick - the - ball - ?].', correct: 'Can you kick the ball?', distractors: ['You can kick the ball?', 'Kick can you the ball?', 'The ball can you kick?'], explanationAr: 'السؤال عن القدرة يبدأ بـ Can يليها الفاعل you ثم الفعل kick.' },
    { prompt: 'Reorder the negative sentence: [can\'t - I - play - tennis].', correct: "I can't play tennis", distractors: ["Play tennis I can't", "Can't I play tennis", "Tennis I can't play"], explanationAr: "الترتيب الصحيح للنفي: I can't play tennis." },
    { prompt: 'Reorder: [throw - He - can - the - ball].', correct: 'He can throw the ball', distractors: ['The ball he can throw', 'Can he throw the ball', 'Throw can he the ball'], explanationAr: 'الترتيب الصحيح: He can throw the ball.' },
    { prompt: 'Reorder: [fast - run - We - can].', correct: 'We can run fast', distractors: ['Fast can we run', 'Can we run fast', 'Run fast we can'], explanationAr: 'الترتيب الصحيح: We can run fast.' }
  ],
  readingPassage: {
    passage: 'At the sports club, Hany plays football with his team. He can run fast and kick the ball hard. His sister Hana likes tennis and swimming.',
    question: 'Where does Hany play football with his team?',
    correct: 'At the sports club.',
    distractors: ['In the bedroom.', 'Inside a pencil case.', 'On a small boat.'],
    explanationAr: 'يلعب هاني كرة القدم في النادي الرياضي (At the sports club).'
  },
  punctuationQ: {
    correct: 'Can you play basketball?',
    distractors: ['can you play basketball.', 'Can you play basketball.', 'can You Play Basketball?'],
    explanationAr: 'يبدأ السؤال بـ Can بحرف كبير وينتهي بعلامة استفهام.'
  }
});

export const p2_u5_exams: UnitExamSuite = buildVerifiedP1P2Suite({
  unitId: 'p2_u5',
  unitIndex: 11,
  unitTitleEn: 'My Day',
  unitTitleAr: 'يومي وروتيني المدرسي والوقت',
  grammarTopic: "What's the time? It's ... o'clock / Present Simple Daily Routine",
  vocab: [
    { word: 'Get up', meaning: 'يستيقظ من النوم', phonetic: '/ɡɛt ʌp/', pos: 'Phrase', clozeSentence: 'I ______ at six o\'clock every school morning.', clozeDistractors: ['sleep', 'close', 'goodbye'] },
    { word: 'Breakfast', meaning: 'وجبة الإفطار الصباحية', phonetic: '/ˈbrɛkfəst/', pos: 'Noun', clozeSentence: 'I eat a healthy ______ with bread, eggs, and milk at 6:30.', clozeDistractors: ['pencil', 'racket', 'boot'] },
    { word: 'Walk to school', meaning: 'يمشي إلى المدرسة', phonetic: '/wɔːk tuː skuːl/', pos: 'Phrase', clozeSentence: 'Hany and his sister ______ together at seven o\'clock.', clozeDistractors: ['sleep in bed', 'brush teeth', 'say goodnight'] },
    { word: 'Drink water', meaning: 'يشرب ماءً نقياً', phonetic: '/drɪŋk ˈwɔːtə/', pos: 'Phrase', clozeSentence: 'When I am thirsty at break time, I ______.', clozeDistractors: ['wear boots', 'draw lines', 'play drums'] },
    { word: 'Sleep', meaning: 'ينام في المساء', phonetic: '/sliːp/', pos: 'Verb', clozeSentence: 'I go to bed and ______ at nine o\'clock at night.', clozeDistractors: ['wake', 'walk', 'kick'] }
  ],
  phonics: {
    soundLabel: 'consonant blends /pl/ and /kl/',
    targetWord: 'Clock',
    targetMeaningAr: 'ساعة حائط (تبدأ بصوت cl /kl/)',
    distractors: ['Nose', 'Book', 'Hand'],
    matchingPair: ['Plane', 'Play'],
    pairDistractors: ['Plane and Nose', 'Clock and Bag', 'Clay and Shoe']
  },
  dialogueQ: {
    prompt: '"What time is it, please?" — "______"',
    correct: 'It is seven o\'clock.',
    distractors: ['They are my boots.', 'Yes, I can swim.', 'This is my nose.'],
    explanationAr: 'عند السؤال عن الوقت بـ What time is it نجيب بـ It is ... o\'clock.'
  },
  grammarMcqs: [
    { prompt: 'Choose the correct verb form with "He": "Hany ______ breakfast at half past six."', correct: 'eats', distractors: ['eat', 'eating', 'to eat'], explanationAr: 'في زمن المضارع البسيط مع الفاعل المفرد الغائب (Hany = He) نضيف s للفعل (eats).' },
    { prompt: 'Choose the correct verb form with "We": "We ______ home at two o\'clock."', correct: 'go', distractors: ['goes', 'going', 'is go'], explanationAr: 'مع الضمير We يأتي الفعل في المصدر بدون s في المضارع البسيط (go).' },
    { prompt: 'Choose the right preposition of time: "I go to bed ______ nine o\'clock."', correct: 'at', distractors: ['on', 'in', 'under'], explanationAr: 'مع الساعات المحددة نستخدم حرف الجر at (at nine o\'clock).' }
  ],
  reorders: [
    { prompt: 'Reorder the time question: [time - What - it - is - ?].', correct: 'What time is it?', distractors: ['It is what time?', 'Time what is it?', 'Is it what time?'], explanationAr: 'السؤال عن الساعة: What time is it?' },
    { prompt: 'Reorder the routine sentence: [eat - I - breakfast - at - seven].', correct: 'I eat breakfast at seven', distractors: ['Breakfast at seven I eat', 'Eat I breakfast at seven', 'At seven breakfast eat I'], explanationAr: 'الترتيب الصحيح: الفاعل I ثم الفعل eat ثم المفعول breakfast ثم الوقت.' },
    { prompt: 'Reorder: [gets - She - up - early].', correct: 'She gets up early', distractors: ['Up early she gets', 'Gets she up early', 'Early gets up she'], explanationAr: 'الترتيب الصحيح: She gets up early.' },
    { prompt: 'Reorder: [is - It - o\'clock - three].', correct: "It is three o'clock", distractors: ["Three o'clock is it", "Is it three o'clock", "O'clock three it is"], explanationAr: "الإخبار عن الساعة: It is three o'clock." }
  ],
  readingPassage: {
    passage: 'Amira has a tidy daily routine. She gets up at six o\'clock. She eats breakfast with her family at half past six and goes to school at seven o\'clock.',
    question: 'When does Amira go to school?',
    correct: 'At seven o\'clock.',
    distractors: ['At ten o\'clock at night.', 'At midnight.', 'At four o\'clock in the afternoon.'],
    explanationAr: 'تذهب أميرة إلى المدرسة في تمام الساعة السابعة (at seven o\'clock).'
  },
  punctuationQ: {
    correct: "It is six o'clock.",
    distractors: ['it is six oclock', 'It is six o\'clock?', 'it Is Six O\'clock.'],
    explanationAr: 'تبدأ الجملة بحرف كبير وتوضع الفاصلة العليا في o\'clock وتنتهي بنقطة.'
  }
});

export const p2_u6_exams: UnitExamSuite = buildVerifiedP1P2Suite({
  unitId: 'p2_u6',
  unitIndex: 12,
  unitTitleEn: 'Healthy Habits',
  unitTitleAr: 'العادات الصحية والطعام المفيد',
  grammarTopic: 'Healthy vs. Unhealthy Food / Do you like...? Yes, I do / No, I don\'t',
  vocab: [
    { word: 'Healthy food', meaning: 'طعام صحي ومفيد للجسم', phonetic: '/ˈhɛlθi fuːd/', pos: 'Phrase', clozeSentence: 'Eating ______ like apples and salad makes our bodies strong.', clozeDistractors: ['sharpener', 'plastic', 'chalk'] },
    { word: 'Fruit', meaning: 'فواكه طازجة', phonetic: '/fruːt/', pos: 'Noun', clozeSentence: 'Bananas, apples, and oranges are delicious ______.', clozeDistractors: ['boots', 'rulers', 'drums'] },
    { word: 'Vegetables', meaning: 'خضروات غنية بالفيتامينات', phonetic: '/ˈvɛdʒtəbəlz/', pos: 'Noun', clozeSentence: 'Carrots, cucumbers, and tomatoes are fresh ______.', clozeDistractors: ['glasses', 'candles', 'guitars'] },
    { word: 'Exercise', meaning: 'يمارس الرياضة والتمارين', phonetic: '/ˈɛksəsaɪz/', pos: 'Verb', clozeSentence: 'We should ______ every day to keep our hearts fit.', clozeDistractors: ['forget', 'break', 'dirty'] },
    { word: 'Wash hands', meaning: 'يغسل يديه بالماء والصابون', phonetic: '/wɒʃ hændz/', pos: 'Phrase', clozeSentence: 'Always ______ before eating and after playing outside.', clozeDistractors: ['eat candy', 'lose books', 'sleep late'] }
  ],
  phonics: {
    soundLabel: 'consonant blends /fr/ and /dr/',
    targetWord: 'Fruit',
    targetMeaningAr: 'فاكهة (تبدأ بصوت fr /fr/)',
    distractors: ['Bag', 'Book', 'Hat'],
    matchingPair: ['Fruit', 'Fries'],
    pairDistractors: ['Fruit and Book', 'Drink and Nose', 'Draw and Shoe']
  },
  dialogueQ: {
    prompt: '"Would you like some fresh fruit, Hana?" — "______"',
    correct: 'Yes, please! It is healthy.',
    distractors: ['They are my glasses.', 'It is eight o\'clock.', 'Who is this?'],
    explanationAr: 'الرد المهذب عند عرض طعام صحي هو: Yes, please! It is healthy.'
  },
  grammarMcqs: [
    { prompt: 'Choose the correct answer: "Do you like fresh apples? — Yes, I ______."', correct: 'do', distractors: ['does', 'am', 'can'], explanationAr: 'السؤال الذي يبدأ بـ Do you نجيب عنه بـ Yes, I do.' },
    { prompt: 'Complete the health advice: "Don\'t eat too many sweets ______ they are unhealthy for your teeth."', correct: 'because', distractors: ['or', 'who', 'where'], explanationAr: 'نستخدم because لبيان السبب.' },
    { prompt: 'Which item is a healthy drink for children?', correct: 'Milk and fresh water', distractors: ['Sugary soda', 'Salty oil', 'Fizzy cola'], explanationAr: 'الحليب والماء النقي من المشروبات الصحية المفيدة لنمو الأطفال.' }
  ],
  reorders: [
    { prompt: 'Reorder the health advice: [healthy - Eat - food - every - day].', correct: 'Eat healthy food every day', distractors: ['Healthy food eat every day', 'Every day healthy food eat', 'Food healthy eat day every'], explanationAr: 'جملة النصيحة الصحية: Eat healthy food every day.' },
    { prompt: 'Reorder: [water - Drink - plenty - of].', correct: 'Drink plenty of water', distractors: ['Plenty of water drink', 'Water drink plenty of', 'Of water plenty drink'], explanationAr: 'النصيحة الصحية: Drink plenty of water.' },
    { prompt: 'Reorder the question: [like - Do - you - fruit - ?].', correct: 'Do you like fruit?', distractors: ['You do like fruit?', 'Like do you fruit?', 'Fruit do you like?'], explanationAr: 'تكوين السؤال بـ Do: Do you like fruit?' },
    { prompt: 'Reorder: [are - Vegetables - good - us - for].', correct: 'Vegetables are good for us', distractors: ['Good for us are vegetables', 'Are vegetables good for us', 'Us for good vegetables are'], explanationAr: 'الترتيب الصحيح: Vegetables are good for us.' }
  ],
  readingPassage: {
    passage: 'To stay healthy and strong, Youssef eats fruit and vegetables every day. He drinks plenty of water, exercises in the playground, and sleeps for eight hours every night.',
    question: 'How many hours does Youssef sleep every night?',
    correct: 'Eight hours.',
    distractors: ['Two hours.', 'Twenty hours.', 'One hour.'],
    explanationAr: 'ذكر النص أن يوسف ينام ثماني ساعات كل ليلة (sleeps for eight hours).'
  },
  punctuationQ: {
    correct: 'Do you like apples and bananas?',
    distractors: ['do you like apples and bananas', 'Do you like apples and bananas.', 'do You Like Apples And Bananas?'],
    explanationAr: 'يبدأ السؤال بـ Do بحرف كبير وينتهي بعلامة استفهام.'
  }
});
