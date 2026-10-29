/**
 * navigationHistory.ts — Unified Browser History & Capacitor Android Back Button Lifecycle
 * Prevents duplicate history entries, infinite back loops, and premature app exits on Android.
 */

import { Capacitor } from '@capacitor/core';
import { App as CapacitorApp } from '@capacitor/app';

export interface NavigationSnapshot {
  tab: string;
  examState: 'lobby' | 'taking' | 'evaluating' | 'result' | 'review';
  hasModalOpen: boolean;
  modalId?: string;
  subView?: string;
}

type BackHandler = () => boolean; // Return true if handled in-app, false to allow default/exit

const backHandlers = new Set<BackHandler>();
let isHandlingPopState = false;
let lastPushedSignature = '';

/**
 * Computes a deterministic signature for a navigation state to prevent duplicate history entries.
 */
export function getNavigationSignature(snapshot: NavigationSnapshot): string {
  return `${snapshot.tab}|${snapshot.examState}|${snapshot.subView || ''}|${snapshot.hasModalOpen ? snapshot.modalId || 'modal' : ''}`;
}

/**
 * Pushes a new in-app state to window.history if it differs from the current top state
 * and was not triggered by a popstate event itself.
 */
export function syncNavigationStateToHistory(snapshot: NavigationSnapshot): void {
  if (typeof window === 'undefined' || !window.history || typeof window.history.pushState !== 'function') {
    return;
  }

  const sig = getNavigationSignature(snapshot);
  if (isHandlingPopState) {
    lastPushedSignature = sig;
    return;
  }

  if (sig === lastPushedSignature) {
    return;
  }

  // On initial home lobby state with no modals, replaceState instead of pushing
  if (!lastPushedSignature && snapshot.tab === 'home' && snapshot.examState === 'lobby' && !snapshot.hasModalOpen && !snapshot.subView) {
    lastPushedSignature = sig;
    try {
      window.history.replaceState({ englimenshNav: snapshot, sig }, '');
    } catch {
      // Ignore
    }
    return;
  }

  lastPushedSignature = sig;
  try {
    window.history.pushState({ englimenshNav: snapshot, sig }, '');
  } catch {
    // Ignore history security errors in restricted iframes
  }
}

/**
 * Registers a prioritized LIFO back-navigation handler (modals -> subviews -> tabs).
 * Returns an unsubscribe cleanup function.
 */
export function registerBackNavigationHandler(
  idOrHandler: string | BackHandler,
  maybeHandler?: BackHandler
): () => void {
  const handler = typeof idOrHandler === 'function' ? idOrHandler : maybeHandler;
  if (typeof handler !== 'function') {
    return () => {};
  }
  backHandlers.add(handler);
  return () => {
    backHandlers.delete(handler);
  };
}

/**
 * Invokes registered handlers in reverse registration order (most recent modal/child first).
 */
export function dispatchBackNavigation(): boolean {
  const handlersArray = Array.from(backHandlers).reverse();
  for (const handler of handlersArray) {
    try {
      const handled = handler();
      if (handled) {
        return true;
      }
    } catch (e) {
      console.warn('[navigationHistory] Back handler error:', e);
    }
  }
  return false;
}

/**
 * Attaches global browser popstate and Capacitor Android hardware backButton listeners.
 * Returns a cleanup function that removes all listeners on unmount.
 */
export function initGlobalBackNavigationListener(): () => void {
  if (typeof window === 'undefined') return () => {};

  const onPopState = (_event: PopStateEvent) => {
    if (isHandlingPopState) return;
    isHandlingPopState = true;
    try {
      const handled = dispatchBackNavigation();
      if (!handled) {
        // Stay on root state safely
      }
    } finally {
      setTimeout(() => {
        isHandlingPopState = false;
      }, 20);
    }
  };

  window.addEventListener('popstate', onPopState);

  // Capacitor Android Hardware Back Button integration
  let capListenerRemove: (() => void) | null = null;
  try {
    const isNative =
      (typeof Capacitor?.isNativePlatform === 'function' && Capacitor.isNativePlatform()) ||
      Boolean((window as any).Capacitor?.Plugins?.App);
    const capApp = isNative ? CapacitorApp || (window as any).Capacitor?.Plugins?.App : null;
    if (capApp && typeof capApp.addListener === 'function') {
      const subPromise = capApp.addListener('backButton', () => {
        isHandlingPopState = true;
        try {
          const handled = dispatchBackNavigation();
          if (!handled && typeof capApp.exitApp === 'function') {
            void capApp.exitApp();
          }
        } finally {
          setTimeout(() => {
            isHandlingPopState = false;
          }, 20);
        }
      });
      if (subPromise && typeof subPromise.then === 'function') {
        subPromise
          .then((handle: any) => {
            if (handle && typeof handle.remove === 'function') {
              capListenerRemove = () => {
                void handle.remove();
              };
            }
          })
          .catch(() => {});
      }
    }
  } catch {
    // Ignore if Capacitor is not active
  }

  return () => {
    window.removeEventListener('popstate', onPopState);
    if (capListenerRemove) {
      try {
        capListenerRemove();
      } catch {
        // Ignore
      }
    }
  };
}
