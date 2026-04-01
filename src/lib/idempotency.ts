import { AxiosError } from "axios";

const DEFAULT_RETRY_DELAYS_MS = [300, 600, 1200] as const;

export function createIdempotencyKey(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export async function withIdempotentRetry<T>(
  action: () => Promise<T>,
  maxAttempts = 3,
): Promise<T> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      return await action();
    } catch (error) {
      lastError = error;

      const shouldRetry = isRetryableError(error);
      if (!shouldRetry || attempt >= maxAttempts) {
        throw error;
      }

      const delayMs = backoffDelayMs(attempt);
      await sleep(delayMs);
    }
  }

  throw lastError;
}

function backoffDelayMs(attempt: number): number {
  const base = DEFAULT_RETRY_DELAYS_MS[Math.min(attempt - 1, DEFAULT_RETRY_DELAYS_MS.length - 1)];
  const jitter = Math.floor(Math.random() * 100);
  return base + jitter;
}

function isRetryableError(error: unknown): boolean {
  if (!isAxiosError(error)) {
    return false;
  }

  const status = error.response?.status;

  if (status == null) {
    return true;
  }

  if ([429, 502, 503, 504].includes(status)) {
    return true;
  }

  if (status === 409) {
    const message = String(error.response?.data?.message ?? "").toUpperCase();
    return message.includes("REQUEST_IN_PROGRESS") || message.includes("처리 중");
  }

  return false;
}

function isAxiosError(error: unknown): error is AxiosError<{ message?: string }> {
  return error instanceof AxiosError;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
