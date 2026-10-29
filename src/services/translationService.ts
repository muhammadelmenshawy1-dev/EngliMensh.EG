// =========================================================================
// EngliMensh.EG - Intelligent Translation Service & Bounded Multi-Level Cache
// System Architect: Mohammad El-Menshawy (محمد المنشاوي)
// Features: 2-Level Cache (Memory + LocalStorage), 7s Deadline, Abort Cancellation,
// Concurrency Control, Fallback Pipeline & Friendly Arabic Errors
// =========================================================================

import { TranslationRequest, TranslationResponse, TranslationStyle } from '../types/dictionary';

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
  return `v${CACHE_VERSION}_${from}_${to}_${style}_${cleanText}`;
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
    // Gracefully ignore LocalStorage access or parse errors (e.g., private browsing)
  }
}

// Initialize cache once
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
  // Only cache valid, non-empty successful responses
  if (!response || !response.success || !response.translation || !response.translation.trim()) {
    return;
  }

  const newItem: CacheItem = {
    version: CACHE_VERSION,
    key,
    response: { ...response, fromCache: false },
    timestamp: Date.now(),
  };

  // Update In-Memory Cache (LRU prune if over capacity)
  if (inMemoryCache.has(key)) {
    inMemoryCache.delete(key);
  }
  inMemoryCache.set(key, newItem);

  if (inMemoryCache.size > MAX_CACHE_ENTRIES) {
    const oldestKey = inMemoryCache.keys().next().value;
    if (oldestKey) inMemoryCache.delete(oldestKey);
  }

  // Sync to LocalStorage Persistence
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
 * Translates text with fast response targets, 7s timeout deadlines,
 * AbortController cancellation, 2-level caching, and fallback execution.
 */
export async function translateSentence(
  text: string,
  from: 'ar' | 'en',
  to: 'ar' | 'en',
  style: TranslationStyle = 'msa'
): Promise<TranslationResponse> {
  const cleanText = text.trim();
  if (!cleanText) {
    return {
      success: true,
      translation: '',
      detectedSourceLang: from === 'ar' ? 'Arabic' : 'English',
    };
  }

  // 1. Check 2-Level Cache First
  const cacheKey = getNormalizedCacheKey(cleanText, from, to, style);
  const cachedHit = getCachedTranslation(cacheKey);
  if (cachedHit) {
    return cachedHit;
  }

  // 2. Concurrency Protection & Stale Request Abort
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

  // 3. 7-Second Deadline Timeout Protection
  let isTimedOut = false;
  const timeoutId = setTimeout(() => {
    if (monotonicRequestId === currentId) {
      isTimedOut = true;
      controller.abort('timeout');
    }
  }, 7000);

  try {
    // Primary API Route: Server-side Gemini proxy (/api/translate)
    const res = await fetch('/api/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: cleanText,
        sourceLang: from,
        targetLang: to,
        style,
      }),
      signal,
    });

    clearTimeout(timeoutId);

    // Ensure stale responses cannot corrupt UI
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
          styleUsed: data.styleUsed || style,
          alternativeSenses: data.alternativeSenses || [],
          note: data.note || '',
        };

        // Cache successful response
        setCachedTranslation(cacheKey, finalResponse);
        return finalResponse;
      }
    }
  } catch (err: any) {
    clearTimeout(timeoutId);

    // If aborted due to user typing a newer request, exit early
    if (currentId !== monotonicRequestId && err !== 'timeout') {
      return {
        success: false,
        translation: '',
        detectedSourceLang: from === 'ar' ? 'Arabic' : 'English',
        error: 'تم إلغاء الطلب.',
      };
    }
  }

  // 4. Single Controlled Fallback Attempt for Network Failures / Timeouts
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
              styleUsed: style,
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

  // 5. Friendly Standardized Arabic Error Response
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
    error: 'تعذر الاتصال بخدمة الترجمة. يمكنك إعادة المحاولة.',
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
