/**
 * Cloud Sync Service for EngliMensh Platform
 * Sends quiz scores and student analytics to Google Apps Script Web App endpoints
 * silently in the background with local offline queueing.
 */

const SYNC_QUEUE_KEY = 'englimensh_cloud_sync_queue';
const WEBHOOK_STORAGE_KEY = 'englimensh_custom_webhook_url';
// Default Google Apps Script fallback or user webhook
export const DEFAULT_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycby-EngliMensh-Sec1-DemoSync/exec';

export interface CloudSyncPayload {
  studentId: string;
  studentName: string;
  school: string;
  grade: string;
  group: string;
  examId: string;
  examTitle: string;
  category?: string;
  score: number;
  maxMarks: number;
  percentage: number;
  timestamp: string;
  platform: string;
}

export const getCustomWebhookUrl = (): string => {
  if (typeof window === 'undefined') return DEFAULT_WEBHOOK_URL;
  return localStorage.getItem(WEBHOOK_STORAGE_KEY) || DEFAULT_WEBHOOK_URL;
};

export const setCustomWebhookUrl = (url: string): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(WEBHOOK_STORAGE_KEY, url.trim());
};

const getOfflineQueue = (): CloudSyncPayload[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(SYNC_QUEUE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveOfflineQueue = (queue: CloudSyncPayload[]): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(SYNC_QUEUE_KEY, JSON.stringify(queue));
  } catch (err) {
    console.error('Failed to save offline queue', err);
  }
};

/**
 * Silently send an exam result payload to Google Sheets Web App endpoint.
 * Non-blocking, fails gracefully and stores into local offline queue.
 */
export const syncExamResultToCloud = async (payload: CloudSyncPayload): Promise<boolean> => {
  if (typeof window === 'undefined') return false;

  const endpoint = getCustomWebhookUrl();

  // If offline, directly push to queue
  if (!navigator.onLine) {
    const queue = getOfflineQueue();
    queue.push(payload);
    saveOfflineQueue(queue);
    return false;
  }

  try {
    // We send payload as text/plain or JSON using no-cors or standard CORS mode.
    // Google Apps Script redirects with 302, standard fetch mode 'no-cors' works reliably.
    await fetch(endpoint, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    return true;
  } catch (err) {
    console.warn('Cloud sync background request paused, saving to queue:', err);
    const queue = getOfflineQueue();
    queue.push(payload);
    saveOfflineQueue(queue);
    return false;
  }
};

/**
 * Flush any queued submissions when back online.
 */
export const flushCloudSyncQueue = async (): Promise<number> => {
  if (typeof window === 'undefined' || !navigator.onLine) return 0;

  const queue = getOfflineQueue();
  if (queue.length === 0) return 0;

  let successful = 0;
  const remaining: CloudSyncPayload[] = [];
  const endpoint = getCustomWebhookUrl();

  for (const item of queue) {
    try {
      await fetch(endpoint, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      });
      successful++;
    } catch {
      remaining.push(item);
    }
  }

  saveOfflineQueue(remaining);
  return successful;
};

// Auto-listen to window online event to flush queue
if (typeof window !== 'undefined') {
  window.addEventListener('online', () => {
    flushCloudSyncQueue().then((count) => {
      if (count > 0) {
        console.log(`Cloud sync successfully flushed ${count} queued items.`);
      }
    });
  });
}
