import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';
import {VitePWA} from 'vite-plugin-pwa';

const VITE_HMR_WS_GUARD = `
if (typeof window !== 'undefined' && window.WebSocket && !window.__viteHmrWsPatched) {
  window.__viteHmrWsPatched = true;
  const NativeWebSocket = window.WebSocket;
  class SafeViteHmrSocket extends EventTarget {
    constructor(url, protocols) {
      super();
      this.url = String(url || '');
      this.protocol = Array.isArray(protocols) ? (protocols[0] || '') : (protocols || '');
      this.readyState = 1;
      this.CONNECTING = 0;
      this.OPEN = 1;
      this.CLOSING = 2;
      this.CLOSED = 3;
      this.bufferedAmount = 0;
      this.extensions = '';
      this.binaryType = 'blob';
      queueMicrotask(() => {
        const evt = new Event('open');
        this.dispatchEvent(evt);
        if (typeof this.onopen === 'function') this.onopen(evt);
      });
    }
    send() {}
    close() {}
  }
  SafeViteHmrSocket.CONNECTING = 0;
  SafeViteHmrSocket.OPEN = 1;
  SafeViteHmrSocket.CLOSING = 2;
  SafeViteHmrSocket.CLOSED = 3;
  const PatchedWebSocket = function(url, protocols) {
    const isViteHmr =
      protocols === 'vite-hmr' ||
      (Array.isArray(protocols) && protocols.includes('vite-hmr'));
    if (isViteHmr) {
      return new SafeViteHmrSocket(url, protocols);
    }
    return protocols !== undefined
      ? new NativeWebSocket(url, protocols)
      : new NativeWebSocket(url);
  };
  PatchedWebSocket.prototype = NativeWebSocket.prototype;
  PatchedWebSocket.CONNECTING = NativeWebSocket.CONNECTING;
  PatchedWebSocket.OPEN = NativeWebSocket.OPEN;
  PatchedWebSocket.CLOSING = NativeWebSocket.CLOSING;
  PatchedWebSocket.CLOSED = NativeWebSocket.CLOSED;
  window.WebSocket = PatchedWebSocket;
}
`;

export default defineConfig(() => {
  return {
    plugins: [
      {
        name: 'vite-hmr-ws-guard',
        transform(code, id) {
          if (id.includes('vite/dist/client/client.mjs')) {
            return VITE_HMR_WS_GUARD + '\n' + code;
          }
        },
      },
      react(),
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: [
          'logo.png',
          'app-cover.svg',
          'pwa-icon.svg',
          'apple-touch-icon.png',
          'pwa-192x192.png',
          'pwa-512x512.png',
          'pwa-maskable-512x512.png',
        ],
        manifest: {
          id: '/',
          name: 'English - EngliMensh Exam Engine',
          short_name: 'EngliMensh',
          description: 'Official Egyptian MOE 1st Secondary English Multi-Level Exam Engine by Mr. Mohammad El-Menshawy',
          theme_color: '#0f172a',
          background_color: '#020617',
          display: 'standalone',
          orientation: 'portrait-primary',
          start_url: '/',
          scope: '/',
          icons: [
            {
              src: '/pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: '/pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: '/pwa-maskable-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable',
            },
          ],
        },
        workbox: {
          maximumFileSizeToCacheInBytes: 6 * 1024 * 1024,
          globPatterns: ['**/*.{js,css,html,ico,png,svg,woff,woff2}'],
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'google-fonts-cache',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365,
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
            {
              urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'gstatic-fonts-cache',
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 365,
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
          ],
        },
        devOptions: {
          enabled: false,
          type: 'module',
        },
      }),
    ],
    build: {
      chunkSizeWarningLimit: 4000,
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
