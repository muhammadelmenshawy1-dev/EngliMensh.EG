// =========================================================================
// EngliMensh.EG - Intelligent Translation Service & Bounded Multi-Level Cache
// System Architect: Mohammad El-Menshawy (محمد المنشاوي)
// Features: Centralized VITE_API_BASE_URL, 2-Level Cache (Memory + LocalStorage),
// 7s Deadline, Abort Cancellation, Distinct Egyptian vs MSA Offline Fallbacks
// =========================================================================

import { TranslationRequest, TranslationResponse, TranslationStyle } from '../types/dictionary';
import { resolveApiEndpoint } from '../config/apiConfig.ts';

// --- CACHE CONFIGURATION & SCHEMA ---
const CACHE_STORAGE_KEY = 'englimensh_translation_cache_v2';
const CACHE_VERSION = 2;
const MAX_CACHE_ENTRIES = 200;
const CACHE_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

interface CacheItem {
  version: number;
  key: string;
  response: TranslationResponse;
  timestamp: number;
}

// In-Memory First-Level Cache
const inMemoryCache = new Map<string, CacheItem>();

// Built-in Offline Dictionary with distinct MSA and Egyptian Arabic modes
const OFFLINE_BILINGUAL_DICTIONARY: Record<
  string,
  { msa: string; egyptian: string; en: string }
> = {
  friend: { msa: 'صديق', egyptian: 'صاحبي / صاحب', en: 'friend' },
  happy: { msa: 'سعيد', egyptian: 'مبسوط / فرحان', en: 'happy' },
  school: { msa: 'مدرسة', egyptian: 'مدرسة', en: 'school' },
  teacher: { msa: 'معلم / أستاذ', egyptian: 'مستر / أستاذ', en: 'teacher' },
  student: { msa: 'طالب', egyptian: 'طالب', en: 'student' },
  book: { msa: 'كتاب', egyptian: 'كتاب', en: 'book' },
  family: { msa: 'عائلة / أسرة', egyptian: 'عيلة / أهل', en: 'family' },
  water: { msa: 'ماء', egyptian: 'مية', en: 'water' },
  science: { msa: 'علوم', egyptian: 'علوم', en: 'science' },
  future: { msa: 'مستقبل', egyptian: 'مستقبل', en: 'future' },
  success: { msa: 'نجاح', egyptian: 'نجاح وتفوق', en: 'success' },
  knowledge: { msa: 'معرفة', egyptian: 'معرفة وخبرة', en: 'knowledge' },
  curriculum: { msa: 'منهج دراسي', egyptian: 'منهج الدراسة', en: 'curriculum' },
  environment: { msa: 'بيئة', egyptian: 'البيئة', en: 'environment' },
  technology: { msa: 'تكنولوجيا / تقنية', egyptian: 'تكنولوجيا', en: 'technology' },
  education: { msa: 'تعليم', egyptian: 'تعليم', en: 'education' },
  hello: { msa: 'مرحباً / أهلاً', egyptian: 'أهلاً بيك / ازيك', en: 'hello' },
  welcome: { msa: 'أهلاً بك', egyptian: 'منور / أهلاً بيك', en: 'welcome' },
  'how are you': { msa: 'كيف حالك؟', egyptian: 'ازيك؟ عامل إيه؟', en: 'how are you?' },
  'thank you': { msa: 'شكراً جزيلاً لك', egyptian: 'شكراً ليك / كتر خيرك', en: 'thank you' },
  'good morning': { msa: 'صباح الخير', egyptian: 'صباح الفل / صباح الخير', en: 'good morning' },
  صديق: { msa: 'صديق', egyptian: 'صاحب', en: 'friend' },
  سعيد: { msa: 'سعيد', egyptian: 'مبسوط', en: 'happy' },
  مدرسة: { msa: 'مدرسة', egyptian: 'مدرسة', en: 'school' },
  معلم: { msa: 'معلم', egyptian: 'مستر', en: 'teacher' },
  طالب: { msa: 'طالب', egyptian: 'طالب', en: 'student' },
  كتاب: { msa: 'كتاب', egyptian: 'كتاب', en: 'book' },
  عائلة: { msa: 'عائلة', egyptian: 'عيلة', en: 'family' },
  مستقبل: { msa: 'مستقبل', egyptian: 'مستقبل', en: 'future' },
  نجاح: { msa: 'نجاح', egyptian: 'نجاح', en: 'success' },
  تعليم: { msa: 'تعليم', egyptian: 'تعليم', en: 'education' },
  ازيك: { msa: 'كيف حالك', egyptian: 'ازيك', en: 'How are you?' },
};

export function normalizeTranslationStyle(style?: TranslationStyle | string): TranslationStyle {
  if (style === 'egyptian' || style === 'egyptian_arabic') {
    return 'egyptian_arabic';
  }
  if (style === 'en') return 'en';
  return 'msa';
}

export function lookupOfflineTranslation(
  text: string,
  to: 'ar' | 'en',
  style: TranslationStyle = 'msa'
): string | null {
  const key = text.trim().toLowerCase().replace(/[?.!,]/g, '').replace(/\s+/g, ' ');
  const entry = OFFLINE_BILINGUAL_DICTIONARY[key];
  if (!entry) return null;

  if (to === 'en') return entry.en;
  const normalizedStyle = normalizeTranslationStyle(style);
  return normalizedStyle === 'egyptian_arabic' ? entry.egyptian : entry.msa;
}

/**
 * Normalizes input text and translation settings into a consistent cache key.
 */
export function getNormalizedCacheKey(
  text: string,
  from: 'ar' | 'en',
  to: 'ar' | 'en',
  style: TranslationStyle = 'msa'
): string {
  const cleanText = text.trim().toLowerCase().replace(/\s+/g, ' ');
  const normalizedStyle = normalizeTranslationStyle(style);
  return `v${CACHE_VERSION}_${from}_${to}_${normalizedStyle}_${cleanText}`;
}

/**
 * Loads persisted cache items into memory on module init.
 */
function initializeCacheFromStorage(): void {
  try {
    if (typeof localStorage === 'undefined') return;
    const raw = localStorage.getItem(CACHE_STORAGE_KEY);
    if (!raw) return;

    const parsed: CacheItem[] = JSON.parse(raw);
    if (!Array.isArray(parsed)) return;

    const now = Date.now();
    for (const item of parsed) {
      if (
        item &&
        item.version === CACHE_VERSION &&
        item.key &&
        item.response &&
        item.response.success &&
        item.response.translation &&
        now - item.timestamp < CACHE_TTL_MS
      ) {
        inMemoryCache.set(item.key, item);
      }
    }
  } catch {
    // Gracefully ignore LocalStorage access or parse errors
  }
}

initializeCacheFromStorage();

/**
 * Retrieves a validated cached translation if available and fresh.
 */
export function getCachedTranslation(key: string): TranslationResponse | null {
  const item = inMemoryCache.get(key);
  if (!item) return null;

  if (Date.now() - item.timestamp > CACHE_TTL_MS) {
    inMemoryCache.delete(key);
    return null;
  }

  return { ...item.response, fromCache: true };
}

/**
 * Persists a successful, non-empty translation response into the 2-level cache.
 */
export function setCachedTranslation(key: string, response: TranslationResponse): void {
  if (!response || !response.success || !response.translation || !response.translation.trim()) {
    return;
  }

  const newItem: CacheItem = {
    version: CACHE_VERSION,
    key,
    response: { ...response, fromCache: false },
    timestamp: Date.now(),
  };

  if (inMemoryCache.has(key)) {
    inMemoryCache.delete(key);
  }
  inMemoryCache.set(key, newItem);

  if (inMemoryCache.size > MAX_CACHE_ENTRIES) {
    const oldestKey = inMemoryCache.keys().next().value;
    if (oldestKey) inMemoryCache.delete(oldestKey);
  }

  try {
    if (typeof localStorage === 'undefined') return;
    const itemsArray = Array.from(inMemoryCache.values());
    localStorage.setItem(CACHE_STORAGE_KEY, JSON.stringify(itemsArray));
  } catch {
    // Handle QuotaExceededError or disabled LocalStorage
  }
}

/**
 * Clears stored translation cache.
 */
export function clearTranslationCache(): void {
  inMemoryCache.clear();
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(CACHE_STORAGE_KEY);
    }
  } catch {
    // Ignore storage errors
  }
}

// --- REQUEST CONCURRENCY & TIMEOUT STATE ---
let activeAbortController: AbortController | null = null;
let monotonicRequestId = 0;

/**
 * Translates text with centralized API base URL resolution, 7s timeout deadlines,
 * AbortController cancellation, 2-level caching, and offline/online fallback execution.
 */
export async function translateSentence(
  text: string,
  from: 'ar' | 'en',
  to: 'ar' | 'en',
  style: TranslationStyle = 'msa'
): Promise<TranslationResponse> {
  const cleanText = text.trim();
  const normalizedStyle = normalizeTranslationStyle(style);

  if (!cleanText) {
    return {
      success: true,
      translation: '',
      detectedSourceLang: from === 'ar' ? 'Arabic' : 'English',
    };
  }

  // 1. Check 2-Level Cache First
  const cacheKey = getNormalizedCacheKey(cleanText, from, to, normalizedStyle);
  const cachedHit = getCachedTranslation(cacheKey);
  if (cachedHit) {
    return cachedHit;
  }

  // 2. If browser is explicitly offline, check offline bilingual dictionary immediately
  if (typeof navigator !== 'undefined' && navigator.onLine === false) {
    const offlineWord = lookupOfflineTranslation(cleanText, to, normalizedStyle);
    if (offlineWord) {
      const offlineResponse: TranslationResponse = {
        success: true,
        translation: offlineWord,
        detectedSourceLang: from === 'ar' ? 'Arabic' : 'English',
        styleUsed: normalizedStyle,
        note: 'تمت الترجمة عبر القاموس المحلي بدون إنترنت.',
      };
      setCachedTranslation(cacheKey, offlineResponse);
      return offlineResponse;
    }
    return {
      success: false,
      translation: '',
      detectedSourceLang: from === 'ar' ? 'Arabic' : 'English',
      error: 'لا يوجد اتصال بالإنترنت حالياً. القاموس المحلي يدعم المفردات الأساسية فقط بدون إنترنت.',
    };
  }

  // 3. Concurrency Protection & Stale Request Abort
  if (activeAbortController) {
    try {
      activeAbortController.abort('newer_request_submitted');
    } catch {
      // Ignore abort errors
    }
  }

  const controller = new AbortController();
  activeAbortController = controller;
  const signal = controller.signal;
  const currentId = ++monotonicRequestId;

  let isTimedOut = false;
  const timeoutId = setTimeout(() => {
    if (monotonicRequestId === currentId) {
      isTimedOut = true;
      controller.abort('timeout');
    }
  }, 7000);

  const apiResolution = resolveApiEndpoint('/api/translate');

  if (apiResolution.url) {
    try {
      const res = await fetch(apiResolution.url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: cleanText,
          sourceLang: from,
          targetLang: to,
          style: normalizedStyle,
        }),
        signal,
      });

      clearTimeout(timeoutId);

      if (currentId !== monotonicRequestId || signal.aborted) {
        return {
          success: false,
          translation: '',
          detectedSourceLang: from === 'ar' ? 'Arabic' : 'English',
          error: 'تم إلغاء الطلب.',
        };
      }

      if (res.ok) {
        const data = await res.json();
        if (data && data.success && data.translation && data.translation.trim()) {
          const finalResponse: TranslationResponse = {
            success: true,
            translation: data.translation.trim(),
            detectedSourceLang: data.detectedSourceLang || (from === 'ar' ? 'Arabic' : 'English'),
            styleUsed: data.styleUsed || normalizedStyle,
            alternativeSenses: data.alternativeSenses || [],
            note: data.note || '',
          };

          setCachedTranslation(cacheKey, finalResponse);
          return finalResponse;
        }
      }
    } catch (err: any) {
      clearTimeout(timeoutId);

      if (currentId !== monotonicRequestId && err !== 'timeout') {
        return {
          success: false,
          translation: '',
          detectedSourceLang: from === 'ar' ? 'Arabic' : 'English',
          error: 'تم إلغاء الطلب.',
        };
      }
    }
  } else {
    clearTimeout(timeoutId);
  }

  // 4. Check Offline Bilingual Dictionary (preserves Egyptian vs MSA distinction for core terms)
  const offlineMatch = lookupOfflineTranslation(cleanText, to, normalizedStyle);
  if (offlineMatch && currentId === monotonicRequestId) {
    const offlineResponse: TranslationResponse = {
      success: true,
      translation: offlineMatch,
      detectedSourceLang: from === 'ar' ? 'Arabic' : 'English',
      styleUsed: normalizedStyle,
      note: apiResolution.errorArabic || '',
    };
    setCachedTranslation(cacheKey, offlineResponse);
    return offlineResponse;
  }

  // 5. Controlled Fallback Attempt for Network Failures / Unconfigured Native Backend
  if (currentId === monotonicRequestId) {
    try {
      const fallbackController = new AbortController();
      const fallbackTimeout = setTimeout(() => fallbackController.abort(), 4000);

      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${from}&tl=${to}&dt=t&q=${encodeURIComponent(cleanText)}`;
      const res = await fetch(url, { signal: fallbackController.signal });
      clearTimeout(fallbackTimeout);

      if (res.ok && currentId === monotonicRequestId) {
        const data = await res.json();
        if (data && data[0]) {
          const translatedText = data[0].map((item: any) => item[0]).join('').trim();
          if (translatedText) {
            const fallbackResponse: TranslationResponse = {
              success: true,
              translation: translatedText,
              detectedSourceLang: from === 'ar' ? 'Arabic' : 'English',
              styleUsed: normalizedStyle,
              note: apiResolution.errorArabic || undefined,
            };
            setCachedTranslation(cacheKey, fallbackResponse);
            return fallbackResponse;
          }
        }
      }
    } catch {
      // Fallback network error ignored
    }
  }

  if (isTimedOut) {
    return {
      success: false,
      translation: '',
      detectedSourceLang: from === 'ar' ? 'Arabic' : 'English',
      error: 'استغرق الطلب وقتًا أطول من المتوقع. حاول مرة أخرى.',
    };
  }

  return {
    success: false,
    translation: '',
    detectedSourceLang: from === 'ar' ? 'Arabic' : 'English',
    error: apiResolution.errorArabic || 'تعذر الاتصال بخدمة الترجمة. تحقق من الإنترنت وحاول مرة أخرى.',
  };
}

/**
 * Shared Request Wrapper used across the application.
 */
export async function requestTranslation(
  request: TranslationRequest
): Promise<TranslationResponse> {
  const { text, sourceLang = 'auto', targetLang = 'ar', style = 'msa' } = request;
  if (!text || !text.trim()) {
    return {
      success: false,
      translation: '',
      detectedSourceLang: 'auto',
      error: 'لا يوجد نص واضح لترجمته.',
    };
  }

  const from = sourceLang === 'ar' ? 'ar' : 'en';
  const to = targetLang === 'en' ? 'en' : 'ar';

  return translateSentence(text, from, to, style);
}
