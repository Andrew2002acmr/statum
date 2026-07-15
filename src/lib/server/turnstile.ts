const TURNSTILE_VERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const TURNSTILE_TIMEOUT_MS = 5000;
const TEST_TURNSTILE_TOKEN = "test-turnstile-token";

export class TurnstileVerificationError extends Error {
  constructor(
    message: string,
    public readonly reason:
      | "missing-config"
      | "missing-token"
      | "invalid-token"
      | "hostname-mismatch"
      | "timeout"
      | "network-error",
  ) {
    super(message);
    this.name = "TurnstileVerificationError";
  }
}

interface TurnstileResponse {
  success?: boolean;
  hostname?: string;
}

interface VerifyTurnstileOptions {
  token: string;
  hostname: string;
  fetchImpl?: typeof fetch;
  timeoutMs?: number;
}

function isAbortError(error: unknown) {
  return error instanceof DOMException && error.name === "AbortError";
}

export async function verifyTurnstileToken({
  token,
  hostname,
  fetchImpl = fetch,
  timeoutMs = TURNSTILE_TIMEOUT_MS,
}: VerifyTurnstileOptions): Promise<void> {
  if (!token) {
    throw new TurnstileVerificationError(
      "Turnstile token is missing",
      "missing-token",
    );
  }

  if (process.env.NODE_ENV === "test") {
    if (token === TEST_TURNSTILE_TOKEN) {
      return;
    }

    throw new TurnstileVerificationError(
      "Turnstile test token is invalid",
      "invalid-token",
    );
  }

  const { getSecret } = await import("astro:env/server");
  const secret = getSecret("TURNSTILE_SECRET_KEY");

  if (!secret) {
    throw new TurnstileVerificationError(
      "Turnstile configuration is missing",
      "missing-config",
    );
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const body = new URLSearchParams({
      secret,
      response: token,
    });

    const response = await fetchImpl(TURNSTILE_VERIFY_URL, {
      method: "POST",
      body,
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new TurnstileVerificationError(
        "Turnstile HTTP request failed",
        "network-error",
      );
    }

    const result = (await response.json()) as TurnstileResponse;

    if (result.success !== true) {
      throw new TurnstileVerificationError(
        "Turnstile token is invalid",
        "invalid-token",
      );
    }

    if (result.hostname && result.hostname !== hostname) {
      throw new TurnstileVerificationError(
        "Turnstile hostname mismatch",
        "hostname-mismatch",
      );
    }
  } catch (error) {
    if (isAbortError(error)) {
      throw new TurnstileVerificationError(
        "Turnstile request timed out",
        "timeout",
      );
    }

    if (error instanceof TurnstileVerificationError) {
      throw error;
    }

    throw new TurnstileVerificationError(
      "Turnstile request failed",
      "network-error",
    );
  } finally {
    clearTimeout(timeout);
  }
}
