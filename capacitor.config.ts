/**
 * Capacitor Android & Hybrid Packaging Configuration for EngliMensh.eg
 *
 * Package ID: eg.englimensh.app
 * App Name: EngliMensh
 * Web Assets Directory: dist
 *
 * Runtime notes:
 * - Uses HTTPS scheme on Android WebView so Web Speech API & secure-context APIs work when available.
 * - API calls automatically resolve via `VITE_API_BASE_URL` in `src/config/apiConfig.ts` and fall back
 *   to local offline dictionaries/rubrics when offline or when no remote backend URL is configured.
 */
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'eg.englimensh.app',
  appName: 'EngliMensh',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    cleartext: false,
  },
  android: {
    allowMixedContent: false,
    captureInput: true,
    webContentsDebuggingEnabled: false,
  },
};

export default config;
