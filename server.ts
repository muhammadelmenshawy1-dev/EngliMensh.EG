// =========================================================================
// EngliMensh.EG - Full-Stack Express Server with Server-Side AI Grading & Translation Proxy
// System Architect: Mohammad El-Menshawy (محمد المنشاوي)
// Port 3000 & Vite Middleware Integration
// =========================================================================

import express from 'express';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const isProd = process.env.NODE_ENV === 'production';

app.use(express.json({ limit: '64kb' }));

// CORS & Security Headers for Web + Capacitor Android Clients
const allowedOriginEnv = (process.env.ALLOWED_ORIGIN || '').trim();
app.use('/api', (req, res, next) => {
  const requestOrigin = req.headers.origin || '';
  const isAllowedCapacitorOrigin =
    requestOrigin === 'https://localhost' ||
    requestOrigin === 'capacitor://localhost' ||
    requestOrigin === 'http://localhost' ||
    requestOrigin.startsWith('http://localhost:');

  if (allowedOriginEnv && requestOrigin === allowedOriginEnv) {
    res.setHeader('Access-Control-Allow-Origin', requestOrigin);
  } else if (isAllowedCapacitorOrigin || !isProd) {
    res.setHeader('Access-Control-Allow-Origin', requestOrigin || '*');
  }

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }
  next();
});

// Simple per-IP sliding window rate limiter for AI endpoints
const rateLimitMap = new Map<string, { count: number; windowStart: number }>();
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 40;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, windowStart: now });
    return true;
  }
  if (entry.count >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }
  entry.count += 1;
  return true;
}

// Initialize GoogleGenAI server-side with protected environment variable
const geminiApiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENAI_API_KEY || '';
const ai = geminiApiKey
  ? new GoogleGenAI({
      apiKey: geminiApiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

const createTimeoutPromise = (ms: number, message: string) =>
  new Promise<never>((_, reject) => setTimeout(() => reject(new Error(message)), ms));

async function generateJsonWithFallback(prompt: string, primaryTimeoutMs = 8000, fallbackTimeoutMs = 6500): Promise<any> {
  if (!geminiApiKey || !ai) {
    throw new Error('GEMINI_API_KEY environment variable is not configured on the server.');
  }

  const callModel = async (modelName: string) =>
    ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.2,
      },
    });

  let response: any;
  try {
    response = await Promise.race([
      callModel('gemini-3.8-flash'),
      createTimeoutPromise(primaryTimeoutMs, 'Primary Gemini model timed out'),
    ]);
  } catch (primaryErr: any) {
    try {
      response = await Promise.race([
        callModel('gemini-3.1-flash-lite'),
        createTimeoutPromise(fallbackTimeoutMs, 'Fallback Gemini model timed out'),
      ]);
    } catch (fallbackErr: any) {
      throw new Error(fallbackErr.message || primaryErr.message || 'Gemini model request failed');
    }
  }

  const outputText = (response?.text || '').trim();
  if (!outputText) {
    throw new Error('Received empty response from Gemini model');
  }
  const cleanJson = outputText.replace(/^```json\s*/i, '').replace(/```\s*$/, '').trim();
  return JSON.parse(cleanJson);
}

// -------------------------------------------------------------------------
// API ROUTES: Health, Video Status, AI Grading & Translation
// -------------------------------------------------------------------------

// 0. Health Check Endpoint
app.get('/api/health', (_req, res) => {
  return res.json({
    status: 'ok',
    aiConfigured: Boolean(geminiApiKey && ai),
    timestamp: new Date().toISOString(),
  });
});

// 1. Provider Status Endpoint
app.get('/api/video/provider-status', async (_req, res) => {
  return res.json({
    providerName: 'Google Gemini / Veo Video API',
    modelIdentifier: 'models/gemini-omni-flash-preview',
    isAvailable: false,
    statusMessage:
      'Live video synthesis is disabled until a verified paid Gemini Omni/Veo pipeline is provisioned. Verified pre-rendered unit videos remain active.',
    quotaLimitationNotice:
      'Notice: Pre-rendered MP4 educational animations and interactive cartoon dialogues are active.',
    estimatedCostPerSecondUsd: 0.02,
  });
});

// 2. Submit Video Generation Endpoint (Honest Unconfigured Status — No Spoofable Email or Fake Completed Job)
app.post('/api/video/generate', async (_req, res) => {
  return res.status(503).json({
    success: false,
    isConfigured: false,
    status: 'unconfigured',
    error:
      'خدمة التوليد المباشر للفيديو غير مفعلة في بيئة الخادم الحالية. الفيديوهات التعليمية المسجلة والمعتمدة متاحة للعرض مباشرة.',
  });
});

// 3. Server-Side AI Grading Endpoint (Essay, Story/Literature, Baccalaureate Research)
app.post('/api/grade', async (req, res) => {
  const clientIp = String(req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown');
  if (!checkRateLimit(clientIp)) {
    return res.status(429).json({
      error: 'Too many grading requests. Please wait a moment and try again.',
    });
  }

  const { type, topic, prompt, studentText, modelAnswer, chapter, question, criteria, maxMarks } = req.body || {};

  if (!type || !['essay', 'story', 'research'].includes(type)) {
    return res.status(400).json({ error: 'Invalid grading type. Expected essay, story, or research.' });
  }

  const cleanStudentText = String(studentText || '').trim();
  if (!cleanStudentText || cleanStudentText.length < 3) {
    return res.status(400).json({ error: 'Student submission text is empty or too short to grade.' });
  }
  if (cleanStudentText.length > 8000) {
    return res.status(400).json({ error: 'Student submission exceeds maximum length (8000 characters).' });
  }

  if (!geminiApiKey || !ai) {
    return res.status(503).json({
      error: 'GEMINI_API_KEY environment variable is not configured on the server.',
      requiresApiKey: true,
    });
  }

  try {
    if (type === 'essay') {
      const gradingPrompt = `You are a Senior Assessment Examiner for the Egyptian Ministry of Education (MOE) evaluating Secondary English writing.
Grade the student's submission strictly according to the official 14-mark Egyptian Ministerial Rubric:
1. Ideas & Relevance (Max 4 marks): Clarity of thesis, depth of supporting arguments, relevance to prompt.
2. Grammar & Vocabulary Range (Max 4 marks): Accuracy of tense, variety of clause structures, appropriate lexical choice.
3. Organization & Cohesion (Max 3 marks): Proper paragraphing (Introduction, body paragraphs, conclusion), transitions.
4. Mechanics & Spelling (Max 3 marks): Capitalization, punctuation, spelling accuracy.

Topic: ${String(topic || '').slice(0, 300)}
Task Prompt: ${String(prompt || '').slice(0, 800)}
Student Submission:
"""
${cleanStudentText}
"""
Reference Benchmark / Model Answer:
"""
${String(modelAnswer || '').slice(0, 2000)}
"""

Respond strictly with valid JSON matching this schema:
{
  "ideasScore": number (0 to 4 in 0.5 increments),
  "grammarVocabScore": number (0 to 4 in 0.5 increments),
  "organizationScore": number (0 to 3 in 0.5 increments),
  "mechanicsScore": number (0 to 3 in 0.5 increments),
  "totalScore": number (0 to 14),
  "maxScore": 14,
  "feedback": "Constructive bilingual Arabic & English feedback detailing strengths and areas for improvement",
  "correctedSentences": [
    {
      "original": "weak or incorrect sentence from student text",
      "corrected": "corrected academic version",
      "explanation": "concise grammatical or lexical explanation in Arabic & English"
    }
  ]
}`;

      const parsed = await generateJsonWithFallback(gradingPrompt, 8500, 7000);
      const ideasScore = Math.min(4, Math.max(0, Number(parsed.ideasScore ?? 0)));
      const grammarVocabScore = Math.min(4, Math.max(0, Number(parsed.grammarVocabScore ?? 0)));
      const organizationScore = Math.min(3, Math.max(0, Number(parsed.organizationScore ?? 0)));
      const mechanicsScore = Math.min(3, Math.max(0, Number(parsed.mechanicsScore ?? 0)));
      const totalScore = Math.min(
        14,
        Math.max(0, Number((ideasScore + grammarVocabScore + organizationScore + mechanicsScore).toFixed(1)))
      );

      return res.json({
        success: true,
        evaluation: {
          ideasScore,
          grammarVocabScore,
          organizationScore,
          mechanicsScore,
          totalScore,
          maxScore: 14,
          feedback: parsed.feedback || 'Good effort addressing the prompt.',
          correctedSentences: Array.isArray(parsed.correctedSentences) ? parsed.correctedSentences : [],
          modelAnswer: modelAnswer || parsed.modelAnswer || '',
        },
      });
    }

    if (type === 'story') {
      const safeCriteria = Array.isArray(criteria) ? criteria.slice(0, 8).map((c) => String(c)) : [];
      const gradingPrompt = `You are a Senior Egyptian MOE English Literature Examiner assessing open-ended critical thinking questions (Chapter ${Number(chapter) || 1}).
Evaluate the student's answer on a 5-mark scale:
- Critical Depth & Interpretation (2 marks)
- Factual Alignment with Plot and Characters (2 marks)
- Argument Clarity and Language (1 mark)

Key Criteria:
${safeCriteria.map((c) => `- ${c}`).join('\n')}

Question: ${String(question || '').slice(0, 500)}
Student's Response:
"""
${cleanStudentText}
"""
Ministry Model Benchmark:
"""
${String(modelAnswer || '').slice(0, 1500)}
"""

Respond strictly with valid JSON:
{
  "score": number (0 to 5 in 0.5 increments),
  "maxScore": 5,
  "criticalDepth": "High" | "Medium" | "Developing",
  "factualAlignment": "Fully Aligned" | "Partially Aligned" | "Inaccurate",
  "feedback": "Detailed bilingual critique in English and Arabic"
}`;

      const parsed = await generateJsonWithFallback(gradingPrompt, 8000, 6500);
      const score = Math.min(5, Math.max(0, Number(parsed.score ?? 0)));

      return res.json({
        success: true,
        evaluation: {
          score,
          maxScore: 5,
          criticalDepth: parsed.criticalDepth || (score >= 4 ? 'High' : score >= 2.5 ? 'Medium' : 'Developing'),
          factualAlignment: parsed.factualAlignment || (score >= 3 ? 'Fully Aligned' : 'Partially Aligned'),
          feedback: parsed.feedback || 'Thoughtful response addressing the core literary theme.',
          modelAnswer: modelAnswer || '',
        },
      });
    }

    // type === 'research' (Baccalaureate Academic Synthesis & Research Task)
    const boundedMaxMarks = Math.min(20, Math.max(1, Number(maxMarks) || 6));
    const gradingPrompt = `You are a Senior Egyptian Baccalaureate (البكالوريا المصرية) Academic Research Examiner.
Evaluate the student's academic research synthesis defense out of ${boundedMaxMarks} marks based on:
1. Thesis & Argumentative Rigor (40%)
2. Integration of Provided Empirical Evidence (30%)
3. Academic Register & Cohesion (30%)

Research Topic: ${String(topic || '').slice(0, 300)}
Thesis Prompt: ${String(prompt || '').slice(0, 800)}
Student Defense Submission:
"""
${cleanStudentText}
"""
Model Defense Benchmark:
"""
${String(modelAnswer || '').slice(0, 2000)}
"""

Respond strictly with valid JSON:
{
  "score": number (0 to ${boundedMaxMarks} in 0.5 increments),
  "maxScore": ${boundedMaxMarks},
  "feedback": "Constructive bilingual Arabic & English evaluation of the research synthesis"
}`;

    const parsed = await generateJsonWithFallback(gradingPrompt, 8000, 6500);
    const score = Math.min(boundedMaxMarks, Math.max(0, Number(parsed.score ?? 0)));

    return res.json({
      success: true,
      evaluation: {
        score,
        maxScore: boundedMaxMarks,
        feedback: parsed.feedback || 'Solid academic synthesis and evidence integration.',
        modelAnswer: modelAnswer || '',
      },
    });
  } catch (err: any) {
    console.error('AI grading server error:', err);
    return res.status(500).json({
      error: err.message || 'Failed to process AI grading request.',
    });
  }
});

// 4. Intelligent Bilingual & Egyptian Dialect Translation Endpoint
app.post('/api/translate', async (req, res) => {
  const clientIp = String(req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown');
  if (!checkRateLimit(clientIp)) {
    return res.status(429).json({
      error: 'Too many translation requests. Please wait a moment and try again.',
    });
  }

  const { text, targetLang, style } = req.body || {};

  if (!text || !String(text).trim()) {
    return res.status(400).json({ error: 'Text input is required for translation.' });
  }

  const cleanText = String(text).trim().slice(0, 2000);

  if (!geminiApiKey || !ai) {
    return res.status(503).json({
      error: 'GEMINI_API_KEY environment variable is not configured on the server.',
      requiresApiKey: true,
    });
  }

  try {
    const isEgyptianTarget = style === 'egyptian_arabic';

    const prompt = `You are an expert English-Arabic translator and educational language specialist specializing in Modern Standard Arabic and Egyptian Colloquial Arabic (العامية المصرية).
Detect the source language and translate the input into ${
      targetLang === 'ar'
        ? isEgyptianTarget
          ? 'natural Egyptian Colloquial Arabic (العامية المصرية)'
          : 'Modern Standard Arabic (العربية الفصحى)'
        : 'natural, fluent English'
    }.

Special Instructions:
- Recognize Egyptian colloquial expressions, informal questions, contractions, and daily speech if input is in Egyptian Arabic (e.g. "ازيك", "كويس", "معلش", "إيه الأخبار", "على طول", "توضحهولي", "فاهم").
- When translating to Egyptian Arabic (style='egyptian_arabic'), use authentic, natural Egyptian spoken expressions (e.g., "أهلاً بيك", "ازيك", "كويس", "ربنا يخليك", "مش فاهم").
- When translating to Modern Standard Arabic (style='msa'), use clear educational Modern Standard Arabic.
- Preserve meaning, tone, intent, numbers, names, and context.
- If the input is a single word or short phrase with multiple common meanings, provide alternative senses in the 'alternativeSenses' array.

Input Text: "${cleanText}"

Return ONLY a valid JSON object matching this schema:
{
  "translation": "primary translation text",
  "detectedSourceLang": "English" or "Arabic" or "Egyptian Arabic",
  "styleUsed": "${style || 'msa'}",
  "alternativeSenses": [
    {
      "meaning": "alternative Arabic or English translation",
      "context": "usage context or part of speech",
      "exampleEn": "example sentence in English",
      "exampleAr": "example sentence in Arabic"
    }
  ],
  "note": "brief educational or dialect note if relevant"
}`;

    const parsed = await generateJsonWithFallback(prompt, 7000, 6000);

    return res.json({
      success: true,
      translation: parsed.translation || '',
      detectedSourceLang: parsed.detectedSourceLang || 'auto',
      styleUsed: parsed.styleUsed || style || 'msa',
      alternativeSenses: parsed.alternativeSenses || [],
      note: parsed.note || '',
    });
  } catch (err: any) {
    console.error('Translation server error:', err);
    return res.status(500).json({
      error: err.message || 'Failed to process translation request.',
    });
  }
});

// 5. EngliMensh AI Intelligent Pedagogical Co-Pilot & Student Recommendation Endpoint
app.post(['/api/copilot/recommend', '/api/copilot/feedback'], (req, res) => {
  const { studentName, xp = 0, completedLessons = 0 } = req.body || {};
  const name = String(studentName || 'البطل').trim();
  const numXp = Number(xp) || 0;
  const numLessons = Number(completedLessons) || 0;

  let cheerEn = '';
  let cheerAr = '';
  let recommendationAr = '';

  if (numXp < 100 || numLessons < 2) {
    cheerEn = `Wonderful start, ${name}! Every single step counts!`;
    cheerAr = `بداية رائعة يا ${name}! كل خطوة تقربك من التميز!`;
    recommendationAr = `التحدي التالي المقترح: تجربة لعبة (ضربات الجزاء) أو مراجعة 5 كلمات جديدة في (بنك كلماتي)!`;
  } else if (numXp <= 200) {
    cheerEn = `Great progress, ${name}! Keep up the brilliant work!`;
    cheerAr = `تقدم رائع يا ${name}! استمر في هذا الأداء المتألق!`;
    recommendationAr = `التحدي التالي المقترح: خوض منافسة في لعبة (شد الحبل) لمضاعفة نقاطك وإتقان القواعد!`;
  } else {
    cheerEn = `Outstanding achievement, ${name}! You are unstoppable!`;
    cheerAr = `إنجاز استثنائي يا ${name}! عزيمتك لا تُقهر!`;
    recommendationAr = `التحدي التالي المقترح: المشاركة في (بطولة البولينج) لحصد شارة بطل الأسبوع وتصدر لوحة الصدارة!`;
  }

  const line1 = `${cheerEn} | ${cheerAr}`;
  const line2 = recommendationAr;

  return res.json({
    success: true,
    line1,
    line2,
    output: `${line1}\n${line2}`,
    tier: numXp < 100 || numLessons < 2 ? 1 : numXp <= 200 ? 2 : 3,
  });
});

// -------------------------------------------------------------------------
// VITE / STATIC FILE SERVING
// -------------------------------------------------------------------------
async function startServer() {
  const httpServer = http.createServer(app);

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: {
          server: httpServer,
        },
        watch: null,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  httpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`EngliMensh.EG Server running on port ${PORT} (prod: ${isProd})`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
