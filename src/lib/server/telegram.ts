const TELEGRAM_API_ORIGIN = "https://api.telegram.org";
const TELEGRAM_TIMEOUT_MS = 7000;

export class TelegramTransportError extends Error {
  constructor(
    message: string,
    public readonly reason:
      "missing-config" | "http-error" | "api-error" | "timeout",
  ) {
    super(message);
    this.name = "TelegramTransportError";
  }
}

interface TelegramResponse {
  ok?: boolean;
}

interface TelegramPostOptions {
  token: string;
  chatId: string;
  message: string;
  fetchImpl?: typeof fetch;
  timeoutMs?: number;
}

function isAbortError(error: unknown) {
  return error instanceof DOMException && error.name === "AbortError";
}

export async function postTelegramMessage({
  token,
  chatId,
  message,
  fetchImpl = fetch,
  timeoutMs = TELEGRAM_TIMEOUT_MS,
}: TelegramPostOptions): Promise<void> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetchImpl(
      `${TELEGRAM_API_ORIGIN}/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          disable_web_page_preview: true,
        }),
        signal: controller.signal,
      },
    );

    if (!response.ok) {
      throw new TelegramTransportError(
        "Telegram HTTP request failed",
        "http-error",
      );
    }

    const result = (await response.json()) as TelegramResponse;

    if (result.ok !== true) {
      throw new TelegramTransportError(
        "Telegram API returned ok=false",
        "api-error",
      );
    }
  } catch (error) {
    if (isAbortError(error)) {
      throw new TelegramTransportError("Telegram request timed out", "timeout");
    }

    if (error instanceof TelegramTransportError) {
      throw error;
    }

    throw new TelegramTransportError("Telegram request failed", "http-error");
  } finally {
    clearTimeout(timeout);
  }
}

export async function sendTelegramLead(message: string): Promise<void> {
  if (process.env.NODE_ENV === "test") {
    return;
  }

  const { getSecret } = await import("astro:env/server");
  const token = getSecret("TELEGRAM_BOT_TOKEN");
  const chatId = getSecret("TELEGRAM_CHAT_ID");

  if (!token || !chatId) {
    throw new TelegramTransportError(
      "Telegram configuration is missing",
      "missing-config",
    );
  }

  await postTelegramMessage({ token, chatId, message });
}
