import { createHash, randomUUID } from "node:crypto";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;

interface RateLimitEntry {
  count: number;
  expiresAt: number;
}

const requests = new Map<string, RateLimitEntry>();

export class RateLimitError extends Error {
  constructor(public readonly correlationId = randomUUID()) {
    super("Lead submission rate limit exceeded");
    this.name = "RateLimitError";
  }
}

function hashKey(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

function cleanupExpired(now: number) {
  for (const [key, entry] of requests) {
    if (entry.expiresAt <= now) {
      requests.delete(key);
    }
  }
}

export function assertLeadRateLimit(rawKey: string): void {
  const now = Date.now();
  cleanupExpired(now);

  const key = hashKey(rawKey || "unknown-client");
  const current = requests.get(key);

  if (!current || current.expiresAt <= now) {
    requests.set(key, {
      count: 1,
      expiresAt: now + WINDOW_MS,
    });
    return;
  }

  current.count += 1;

  if (current.count > MAX_REQUESTS) {
    throw new RateLimitError();
  }
}
