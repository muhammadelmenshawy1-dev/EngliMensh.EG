/**
 * apiConfig.ts — Centralized API Base URL & Environment Resolution
 * Ensures local dev works with Express while packaged Android APKs never assume
 * their local WebView origin hosts the Express API unless VITE_API_BASE_URL is configured.
 */

export interface ResolvedApiEndpoint {
  url: string | null;
  isConfigured: boolean;
  isPackagedNativeOrigin: boolean;
  errorArabic?: string;
}

/**
 * Reads VITE_API_BASE_URL from Vite import.meta.env or Node process.env (for automated tests).
 */
export function getConfiguredApiBaseUrl(): string {
  let raw = '';
  try {
    if (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_API_BASE_URL) {
      raw = String((import.meta as any).env.VITE_API_BASE_URL).trim();
    }
  } catch {
    // Ignore
  }

  if (!raw && typeof process !== 'undefined' && process.env?.VITE_API_BASE_URL) {
    raw = String(process.env.VITE_API_BASE_URL).trim();
  }

  return raw.replace(/\/+$/, '');
}

/**
 * Detects whether the application is running inside a packaged mobile WebView
 * (Capacitor, Cordova, file://, or localhost WebView asset server without Express).
 */
export function isPackagedMobileEnvironment(): boolean {
  if (typeof window === 'undefined') return false;

  const cap = (window as any).Capacitor;
  if (cap && typeof cap.isNativePlatform === 'function' && cap.isNativePlatform()) {
    return true;
  }

  const protocol = window.location?.protocol || '';
  if (protocol === 'capacitor:' || protocol === 'file:' || protocol === 'app:') {
    return true;
  }

  // Capacitor Android defaults to https://localhost (with no port) whereas local Vite/Express uses a port (e.g. :3000)
  const hostname = window.location?.hostname || '';
  const port = window.location?.port || '';
  if (
    hostname === 'localhost' &&
    !port &&
    protocol === 'https:'
  ) {
    return true;
  }

  return false;
}

/**
 * Resolves a backend API endpoint (e.g., '/api/translate' or '/api/grade').
 */
export function resolveApiEndpoint(path: string): ResolvedApiEndpoint {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const configuredBase = getConfiguredApiBaseUrl();
  const isNative = isPackagedMobileEnvironment();

  if (configuredBase) {
    if (isNative && !configuredBase.startsWith('https://') && !configuredBase.startsWith('http://localhost')) {
      return {
        url: null,
        isConfigured: false,
        isPackagedNativeOrigin: isNative,
        errorArabic: 'يجب أن يبدأ عنوان الخادم السحابي (VITE_API_BASE_URL) ببروتوكول آمن (https://).',
      };
    }
    return {
      url: `${configuredBase}${normalizedPath}`,
      isConfigured: true,
      isPackagedNativeOrigin: isNative,
    };
  }

  if (isNative) {
    return {
      url: null,
      isConfigured: false,
      isPackagedNativeOrigin: true,
      errorArabic:
        'خدمة الذكاء الاصطناعي السحابية تتطلب ضبط VITE_API_BASE_URL في إعدادات بناء التطبيق (APK). يعمل التطبيق حالياً في الوضع المحلي (Offline Mode).',
    };
  }

  return {
    url: normalizedPath,
    isConfigured: true,
    isPackagedNativeOrigin: false,
  };
}
