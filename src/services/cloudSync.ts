/**
 * Cloud Sync Service for EngliMensh Platform
 * Queues and synchronizes quiz scores and student analytics with verifiable delivery.
 * Never deletes queued records on unverified opaque ('no-cors') responses.
 */

const SYNC_QUEUE_KEY = 'englimensh_cloud_sync_queue';
const WEBHOOK_STORAGE_KEY = 'englimensh_custom_webhook_url';

// Placeholder demo URL — treated as unconfigured until a real endpoint is set
export const DEFAULT_WEBHOOK_URL =
  'https://script.google.com/macros/s/AKfycby-EngliMensh-Sec1-DemoSync/exec';

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
  retryCount?: number;
  lastAttemptAt?: string;
}

export interface CloudSyncStatus {
  isConfigured: boolean;
  webhookUrl: string;
  pendingCount: number;
}

export const getCustomWebhookUrl = (): string => {
  if (typeof window === 'undefined') return '';
  const stored = (localStorage.getItem(WEBHOOK_STORAGE_KEY) || '').trim();
  const envUrl = (
    ((import.meta as any).env?.VITE_CLOUD_SYNC_WEBHOOK_URL as string | undefined) || ''
  ).trim();
  return stored || envUrl || DEFAULT_WEBHOOK_URL;
};

export const isWebhookConfigured = (): boolean => {
  const url = getCustomWebhookUrl();
  if (!url || url === DEFAULT_WEBHOOK_URL) {
    return false;
  }
  return url.startsWith('https://') || url.startsWith('http://');
};

export const setCustomWebhookUrl = (url: string): void => {
  if (typeof window === 'undefined') return;
  const trimmed = url.trim();
  if (!trimmed) {
    localStorage.removeItem(WEBHOOK_STORAGE_KEY);
    return;
  }
  localStorage.setItem(WEBHOOK_STORAGE_KEY, trimmed);
};

export const getOfflineQueue = (): CloudSyncPayload[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(SYNC_QUEUE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const saveOfflineQueue = (queue: CloudSyncPayload[]): void => {
  if (typeof window === 'undefined') return;
  try {
    // Cap queue at 200 entries to prevent storage bloat while preserving recent records
    const bounded = queue.slice(-200);
    localStorage.setItem(SYNC_QUEUE_KEY, JSON.stringify(bounded));
  } catch (err) {
    console.error('Failed to save offline queue', err);
  }
};

function enqueuePayload(payload: CloudSyncPayload): void {
  const queue = getOfflineQueue();
  const exists = queue.some(
    (item) =>
      item.studentId === payload.studentId &&
      item.examId === payload.examId &&
      item.timestamp === payload.timestamp
  );
  if (!exists) {
    queue.push({
      ...payload,
      retryCount: payload.retryCount ?? 0,
      lastAttemptAt: new Date().toISOString(),
    });
    saveOfflineQueue(queue);
  }
}

export const getCloudSyncStatus = (): CloudSyncStatus => {
  return {
    isConfigured: isWebhookConfigured(),
    webhookUrl: isWebhookConfigured() ? getCustomWebhookUrl() : '',
    pendingCount: getOfflineQueue().length,
  };
};

/**
 * Send an exam result payload to a verified webhook endpoint.
 * Preserves the record in the local offline queue whenever the webhook is unconfigured,
 * offline, or returns a non-2xx status.
 */
export const syncExamResultToCloud = async (payload: CloudSyncPayload): Promise<boolean> => {
  if (typeof window === 'undefined') return false;

  if (!isWebhookConfigured() || !navigator.onLine) {
    enqueuePayload(payload);
    return false;
  }

  const endpoint = getCustomWebhookUrl();

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Webhook returned HTTP ${response.status}`);
    }

    return true;
  } catch (err) {
    console.warn('Cloud sync background request deferred to offline queue:', err);
    enqueuePayload({
      ...payload,
      retryCount: (payload.retryCount ?? 0) + 1,
      lastAttemptAt: new Date().toISOString(),
    });
    return false;
  }
};

/**
 * Flush any queued submissions when online and a verified webhook is configured.
 * Only removes items after a verified 2xx response.
 */
export const flushCloudSyncQueue = async (): Promise<number> => {
  if (typeof window === 'undefined' || !navigator.onLine || !isWebhookConfigured()) {
    return 0;
  }

  const queue = getOfflineQueue();
  if (queue.length === 0) return 0;

  let successful = 0;
  const remaining: CloudSyncPayload[] = [];
  const endpoint = getCustomWebhookUrl();

  for (const item of queue) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(item),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (response.ok) {
        successful++;
      } else {
        remaining.push({
          ...item,
          retryCount: (item.retryCount ?? 0) + 1,
          lastAttemptAt: new Date().toISOString(),
        });
      }
    } catch {
      remaining.push({
        ...item,
        retryCount: (item.retryCount ?? 0) + 1,
        lastAttemptAt: new Date().toISOString(),
      });
    }
  }

  saveOfflineQueue(remaining);
  return successful;
};

// Auto-listen to window online event to flush queue when configured
if (typeof window !== 'undefined') {
  window.addEventListener('online', () => {
    flushCloudSyncQueue().then((count) => {
      if (count > 0) {
        console.log(`Cloud sync successfully flushed ${count} queued items.`);
      }
    });
  });
}
