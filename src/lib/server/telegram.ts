const TELEGRAM_API_ORIGIN = "https://api.telegram.org";
const TELEGRAM_TIMEOUT_MS = 7000;
const MOCK_TIMEOUT_MS = 300;

type DeliveryMode = "mock" | "telegram";
type MockLeadResult = "success" | "error" | "timeout";

export class TelegramTransportError extends Error {
  constructor(
    message: string,
    public readonly reason:
      | "missing-config"
      | "invalid-config"
      | "http-error"
      | "api-error"
      | "timeout"
      | "mock-forbidden",
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

function getProductionRuntime() {
  return process.env.NODE_ENV === "production";
}

async function getServerEnv(name: string) {
  if (process.env[name]) {
    return process.env[name] ?? "";
  }

  try {
    const { getSecret } = await import("astro:env/server");
    return getSecret(name) ?? "";
  } catch {
    return "";
  }
}

async function getLeadDeliveryMode(): Promise<DeliveryMode> {
  const configuredMode = await getServerEnv("LEAD_DELIVERY_MODE");

  if (!configuredMode) {
    return getProductionRuntime() ? "telegram" : "mock";
  }

  if (configuredMode === "mock" || configuredMode === "telegram") {
    return configuredMode;
  }

  throw new TelegramTransportError(
    "Lead delivery mode is invalid",
    "invalid-config",
  );
}

async function getMockLeadResult(): Promise<MockLeadResult> {
  const configuredResult = await getServerEnv("MOCK_LEAD_RESULT");

  if (!configuredResult) {
    return "success";
  }

  if (
    configuredResult === "success" ||
    configuredResult === "error" ||
    configuredResult === "timeout"
  ) {
    return configuredResult;
  }

  throw new TelegramTransportError(
    "Mock lead result is invalid",
    "invalid-config",
  );
}

function delayWithAbort(timeoutMs: number) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  return new Promise<void>((resolve, reject) => {
    controller.signal.addEventListener(
      "abort",
      () => {
        clearTimeout(timeout);
        reject(
          new TelegramTransportError("Mock lead delivery timed out", "timeout"),
        );
      },
      { once: true },
    );

    setTimeout(() => {
      clearTimeout(timeout);
      resolve();
    }, timeoutMs + 100);
  });
}

async function sendMockLead(): Promise<void> {
  if (getProductionRuntime()) {
    throw new TelegramTransportError(
      "Mock lead delivery is forbidden in production",
      "mock-forbidden",
    );
  }

  const result = await getMockLeadResult();

  if (result === "success") {
    await new Promise((resolve) => setTimeout(resolve, 120));
    return;
  }

  if (result === "timeout") {
    await delayWithAbort(MOCK_TIMEOUT_MS);
    return;
  }

  throw new TelegramTransportError("Mock lead delivery failed", "api-error");
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
  const mode = await getLeadDeliveryMode();

  if (mode === "mock") {
    await sendMockLead();
    return;
  }

  const token = await getServerEnv("TELEGRAM_BOT_TOKEN");
  const chatId = await getServerEnv("TELEGRAM_CHAT_ID");

  if (!token || !chatId) {
    throw new TelegramTransportError(
      "Telegram configuration is missing",
      "missing-config",
    );
  }

  await postTelegramMessage({ token, chatId, message });
}

export async function isMockLeadDeliveryEnabled() {
  return (await getLeadDeliveryMode()) === "mock" && !getProductionRuntime();
}
