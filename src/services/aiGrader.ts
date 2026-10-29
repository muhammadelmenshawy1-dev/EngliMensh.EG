import { EssayEvaluation, StoryEvaluation } from '../types.ts';
import { resolveApiEndpoint } from '../config/apiConfig.ts';

const LEGACY_GEMINI_STORAGE_KEY = 'egypt_moe_gemini_api_key';

// Clean up any legacy client-side API key that was previously stored in localStorage
if (typeof window !== 'undefined') {
  try {
    localStorage.removeItem(LEGACY_GEMINI_STORAGE_KEY);
  } catch {
    // Ignore storage access errors
  }
}

export interface ResearchEvaluation {
  score: number;
  maxScore: number;
  feedback: string;
  modelAnswer: string;
  isFallbackRubric?: boolean;
}

/**
 * Deprecated client-side key helpers kept only as safe no-ops for backward compatibility.
 * All AI grading is performed strictly server-side via POST /api/grade.
 */
export const getStoredApiKey = (): string => '';
export const setStoredApiKey = (_key: string): void => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(LEGACY_GEMINI_STORAGE_KEY);
    } catch {
      // Ignore
    }
  }
};
export const clearStoredApiKey = (): void => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(LEGACY_GEMINI_STORAGE_KEY);
    } catch {
      // Ignore
    }
  }
};

export async function gradeEssayWithAI(
  topic: string,
  prompt: string,
  studentText: string,
  modelAnswer: string
): Promise<EssayEvaluation> {
  const cleanText = (studentText || '').trim();
  if (!cleanText || cleanText.split(/\s+/).filter(Boolean).length < 3) {
    return localGradeEssay(topic, prompt, cleanText, modelAnswer);
  }

  const endpointInfo = resolveApiEndpoint('/api/grade');
  if (!endpointInfo.isConfigured || !endpointInfo.url) {
    const fallback = localGradeEssay(topic, prompt, cleanText, modelAnswer);
    fallback.feedback = `[تقييم محلي وفق معايير وزارة التربية والتعليم — وضع عدم الاتصال / Built-in MOE Rubric]\n\n${fallback.feedback}`;
    return fallback;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 9500);

    const response = await fetch(endpointInfo.url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'essay',
        topic,
        prompt,
        studentText: cleanText,
        modelAnswer,
      }),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.error || `Server grading status ${response.status}`);
    }

    const data = await response.json();
    const ev = data.evaluation;
    if (!ev) {
      throw new Error('Malformed grading response from server');
    }

    return {
      ideasScore: Number(ev.ideasScore) || 0,
      grammarVocabScore: Number(ev.grammarVocabScore) || 0,
      organizationScore: Number(ev.organizationScore) || 0,
      mechanicsScore: Number(ev.mechanicsScore) || 0,
      totalScore: Number(ev.totalScore) || 0,
      maxScore: 14,
      feedback: ev.feedback || 'Good effort showing understanding of the topic.',
      correctedSentences: Array.isArray(ev.correctedSentences) ? ev.correctedSentences : [],
      modelAnswer: ev.modelAnswer || modelAnswer,
    };
  } catch (err: any) {
    const fallback = localGradeEssay(topic, prompt, cleanText, modelAnswer);
    fallback.feedback = `[تقييم محلي وفق معايير وزارة التربية والتعليم — تعذر الاتصال بخدمة التقييم السحابي / Evaluated via Built-in MOE Rubric Engine]\n\n${fallback.feedback}`;
    return fallback;
  }
}

export async function gradeStoryWithAI(
  chapter: number,
  question: string,
  studentAnswer: string,
  modelAnswer: string,
  criteria: string[]
): Promise<StoryEvaluation> {
  const cleanAnswer = (studentAnswer || '').trim();
  if (!cleanAnswer || cleanAnswer.split(/\s+/).filter(Boolean).length < 2) {
    return localGradeStory(chapter, question, cleanAnswer, modelAnswer, criteria);
  }

  const endpointInfo = resolveApiEndpoint('/api/grade');
  if (!endpointInfo.isConfigured || !endpointInfo.url) {
    const fallback = localGradeStory(chapter, question, cleanAnswer, modelAnswer, criteria);
    fallback.feedback = `[تقييم محلي وفق نموذج القصة الوزاري — وضع عدم الاتصال / Built-in Literature Rubric]\n\n${fallback.feedback}`;
    return fallback;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 9000);

    const response = await fetch(endpointInfo.url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'story',
        chapter,
        question,
        studentText: cleanAnswer,
        modelAnswer,
        criteria,
      }),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.error || `HTTP ${response.status}`);
    }

    const data = await response.json();
    const ev = data.evaluation;
    if (!ev) {
      throw new Error('Malformed story evaluation response');
    }

    return {
      score: Number(ev.score) || 0,
      maxScore: 5,
      criticalDepth: ev.criticalDepth || 'Medium',
      factualAlignment: ev.factualAlignment || 'Fully Aligned',
      feedback: ev.feedback || 'Thoughtful response addressing the core theme.',
      modelAnswer: ev.modelAnswer || modelAnswer,
    };
  } catch {
    const fallback = localGradeStory(chapter, question, cleanAnswer, modelAnswer, criteria);
    fallback.feedback = `[تقييم محلي وفق نموذج القصة الوزاري — تعذر الاتصال بخدمة التقييم السحابي / Evaluated via Built-in Literature Rubric]\n\n${fallback.feedback}`;
    return fallback;
  }
}

export async function gradeResearchWithAI(
  title: string,
  thesisPrompt: string,
  studentText: string,
  modelDefense: string,
  maxMarks: number = 6
): Promise<ResearchEvaluation> {
  const cleanText = (studentText || '').trim();
  const boundedMax = Math.max(1, Number(maxMarks) || 6);

  if (!cleanText || cleanText.split(/\s+/).filter(Boolean).length < 3) {
    return localGradeResearch(title, thesisPrompt, cleanText, modelDefense, boundedMax);
  }

  const endpointInfo = resolveApiEndpoint('/api/grade');
  if (!endpointInfo.isConfigured || !endpointInfo.url) {
    return localGradeResearch(title, thesisPrompt, cleanText, modelDefense, boundedMax);
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 9000);

    const response = await fetch(endpointInfo.url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'research',
        topic: title,
        prompt: thesisPrompt,
        studentText: cleanText,
        modelAnswer: modelDefense,
        maxMarks: boundedMax,
      }),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    const ev = data.evaluation;
    if (!ev) {
      throw new Error('Malformed research evaluation');
    }

    return {
      score: Math.min(boundedMax, Math.max(0, Number(ev.score) || 0)),
      maxScore: boundedMax,
      feedback: ev.feedback || 'تقييم بحثي متميز يعكس قدرة على دمج الأدلة.',
      modelAnswer: ev.modelAnswer || modelDefense,
      isFallbackRubric: false,
    };
  } catch {
    return localGradeResearch(title, thesisPrompt, cleanText, modelDefense, boundedMax);
  }
}

// Built-in rule-based evaluation fallbacks (Strict zero-mark handling for empty/minimal input)
export function localGradeEssay(
  _topic: string,
  _prompt: string,
  studentText: string,
  modelAnswer: string
): EssayEvaluation {
  const words = (studentText || '').trim().split(/\s+/).filter((w) => w.length > 0);
  const wordCount = words.length;

  if (wordCount < 5) {
    return {
      ideasScore: 0,
      grammarVocabScore: 0,
      organizationScore: 0,
      mechanicsScore: 0,
      totalScore: 0,
      maxScore: 14,
      feedback:
        'لم يتم كتابة مقال كافٍ للتقييم (أقل من 5 كلمات). يرجى كتابة مقال متكامل يتضمن مقدمة وفقرات عرض وخاتمة للحصول على الدرجة.',
      correctedSentences: [],
      modelAnswer,
    };
  }

  const paragraphs = studentText.split(/\n+/).filter((p) => p.trim().length > 0);

  let ideas = 2.0;
  let grammarVocab = 2.0;
  let organization = 1.5;
  let mechanics = 1.5;

  if (wordCount < 30) {
    ideas = 1.0;
    grammarVocab = 1.0;
    organization = 0.5;
    mechanics = 0.5;
  } else if (wordCount < 60) {
    ideas = 1.5;
    grammarVocab = 1.5;
    organization = 1.0;
    mechanics = 1.5;
  } else if (wordCount < 100) {
    ideas = 2.5;
    grammarVocab = 2.5;
    organization = 2.0;
    mechanics = 2.0;
  } else if (wordCount >= 120) {
    ideas = 3.5;
    grammarVocab = 3.5;
    organization = 3.0;
    mechanics = 3.0;
  }

  if (paragraphs.length >= 3) {
    organization = Math.min(3, organization + 0.5);
  } else if (paragraphs.length === 1 && wordCount >= 30) {
    organization = Math.max(0.5, organization - 0.5);
  }

  const connectors = [
    'firstly',
    'secondly',
    'in addition',
    'moreover',
    'furthermore',
    'in conclusion',
    'on the other hand',
    'however',
    'therefore',
  ];
  const lower = studentText.toLowerCase();
  const matchedConnectors = connectors.filter((c) => lower.includes(c));
  if (matchedConnectors.length >= 3) {
    organization = Math.min(3, organization + 0.5);
    grammarVocab = Math.min(4, grammarVocab + 0.5);
  }

  const total = Math.min(14, Number((ideas + grammarVocab + organization + mechanics).toFixed(1)));

  const correctedSentences = [];
  if (lower.includes('i am agree')) {
    correctedSentences.push({
      original: 'I am agree',
      corrected: 'I agree',
      explanation: "'Agree' is a verb in English, so do not combine it with auxiliary 'am'.",
    });
  }
  if (lower.includes('informations')) {
    correctedSentences.push({
      original: 'informations',
      corrected: 'information',
      explanation: "'Information' is an uncountable noun with no plural 's'.",
    });
  }

  return {
    ideasScore: ideas,
    grammarVocabScore: grammarVocab,
    organizationScore: organization,
    mechanicsScore: mechanics,
    totalScore: total,
    maxScore: 14,
    feedback: `التقييم الوزاري / MOE Assessment Feedback:
- عدد الكلمات / Word Count: ${wordCount} words (Target: 120-150 words).
- الفقرات / Structure: ${paragraphs.length} paragraphs identified. ${
      paragraphs.length >= 3
        ? 'ممتاز! تم تقسيم المقال إلى مقدمة ومتن وخاتمة.'
        : 'تنبيه: يجب تقسيم المقال إلى مقدمة وفقرات متن وخاتمة واضحة.'
    }
- الروابط اللغوية / Transitions: ${
      matchedConnectors.length > 0
        ? `Used: ${matchedConnectors.join(', ')}`
        : 'ينصح باستخدام روابط مثل Moreover, In addition, In conclusion'
    }.
- الدرجة المستحقة: ${total} من 14 طبقاً للمواصفات الرسمية.`,
    correctedSentences,
    modelAnswer,
  };
}

export function localGradeStory(
  chapter: number,
  _question: string,
  studentAnswer: string,
  modelAnswer: string,
  criteria: string[]
): StoryEvaluation {
  const words = (studentAnswer || '').trim().split(/\s+/).filter((w) => w.length > 0);
  const wordCount = words.length;

  if (wordCount < 3) {
    return {
      score: 0,
      maxScore: 5,
      criticalDepth: 'Developing',
      factualAlignment: 'Inaccurate',
      feedback: 'لم يتم إدخال إجابة كافية لسؤال التفكير النقدي للقصة.',
      modelAnswer,
    };
  }

  const lower = studentAnswer.toLowerCase();

  let matchedCriteriaCount = 0;
  for (const crit of criteria) {
    const keywords = crit
      .toLowerCase()
      .split(/\s+/)
      .filter((k) => k.length > 3);
    const found = keywords.some((k) => lower.includes(k));
    if (found) matchedCriteriaCount++;
  }

  let score = wordCount >= 10 ? 2.0 : 1.0;
  if (wordCount > 30) score += 1.0;
  if (wordCount > 60) score += 0.5;
  if (matchedCriteriaCount >= 2) score += 1.5;
  else if (matchedCriteriaCount === 1) score += 0.5;
  score = Math.min(5, Math.max(0.5, score));

  return {
    score,
    maxScore: 5,
    criticalDepth: score >= 4 ? 'High' : score >= 3 ? 'Medium' : 'Developing',
    factualAlignment: matchedCriteriaCount >= 1 ? 'Fully Aligned' : 'Partially Aligned',
    feedback: `تقييم سؤال القصة المقررة (The Old Man and the Sea - Chapter ${chapter}):
- عمق التحليل / Critical Depth: ${
      score >= 4
        ? 'متميز، يعكس استيعاباً رائعاً للشخصيات والرمزية.'
        : 'مقبول، ينصح بالتركيز أكثر على الدوافع النفسية والرمزية الأدبية.'
    }
- محاذاة النص الوزاري / Benchmark Alignment: إجابتك ركزت على الجوانب الأساسية. راجع الإجابة النموذجية المرفقة لمقارنة أسلوب الاستدلال النقدي.`,
    modelAnswer,
  };
}

export function localGradeResearch(
  title: string,
  _thesisPrompt: string,
  studentText: string,
  modelDefense: string,
  maxMarks: number = 6
): ResearchEvaluation {
  const words = (studentText || '').trim().split(/\s+/).filter((w) => w.length > 0);
  const wordCount = words.length;
  const boundedMax = Math.max(1, Number(maxMarks) || 6);

  if (wordCount < 5) {
    return {
      score: 0,
      maxScore: boundedMax,
      feedback: 'لم يتم تقديم مرافعة بحثية كافية للتقييم في سؤال البحث الأكاديمي.',
      modelAnswer: modelDefense,
      isFallbackRubric: true,
    };
  }

  const lower = studentText.toLowerCase();
  const academicMarkers = [
    'evidence',
    'data',
    'study',
    'research',
    'furthermore',
    'however',
    'consequently',
    'demonstrates',
    'empirical',
    'policy',
    'sustainable',
    'economic',
  ];
  const matchedMarkers = academicMarkers.filter((m) => lower.includes(m));

  let ratio = 0.35;
  if (wordCount >= 40) ratio += 0.2;
  if (wordCount >= 80) ratio += 0.2;
  if (matchedMarkers.length >= 2) ratio += 0.15;
  if (matchedMarkers.length >= 4) ratio += 0.1;

  const rawScore = Math.min(boundedMax, Math.round(boundedMax * Math.min(1, ratio) * 2) / 2);

  return {
    score: rawScore,
    maxScore: boundedMax,
    feedback: `[تقييم محلي وفق معايير البكالوريا المصرية — ${title}]: عدد الكلمات ${wordCount} كلمة، وتم توظيف ${matchedMarkers.length} من المؤشرات البحثية الأكاديمية. الدرجة المستحقة: ${rawScore} من ${boundedMax}.`,
    modelAnswer: modelDefense,
    isFallbackRubric: true,
  };
}
