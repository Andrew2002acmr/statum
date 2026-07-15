import { expect, test } from "@playwright/test";
import { formatLeadMessage } from "../../src/lib/server/lead-message";
import {
  leadInputSchema,
  normalizeLeadInput,
  parseQuizAnswersPayload,
} from "../../src/lib/server/lead-schema";
import { postTelegramMessage } from "../../src/lib/server/telegram";
import { verifyTurnstileToken } from "../../src/lib/server/turnstile";

const validInput = {
  name: " Иван ",
  phone: "+7 999 123-45-67",
  comment: "",
  consent: "on",
  source: "hero",
  quizAnswers: '{"object-type":"apartment"}',
  company: "",
  turnstileToken: "test-turnstile-token",
} as const;

test.describe("lead validation", () => {
  test("rejects invalid fields and damaged quiz payloads", () => {
    expect(leadInputSchema.safeParse({ ...validInput, name: "" }).success).toBe(
      false,
    );
    expect(
      leadInputSchema.safeParse({ ...validInput, phone: "abc" }).success,
    ).toBe(false);
    expect(
      leadInputSchema.safeParse({
        ...validInput,
        comment: "x".repeat(701),
      }).success,
    ).toBe(false);
    expect(
      leadInputSchema.safeParse({ ...validInput, consent: undefined }).success,
    ).toBe(false);
    expect(
      leadInputSchema.safeParse({ ...validInput, company: "spam" }).success,
    ).toBe(false);
    expect(
      leadInputSchema.safeParse({ ...validInput, source: "unknown" }).success,
    ).toBe(false);
    expect(() => parseQuizAnswersPayload("{bad-json")).toThrow(
      "INVALID_QUIZ_PAYLOAD",
    );
    expect(() =>
      parseQuizAnswersPayload('{"object-type":"unknown-option"}'),
    ).toThrow("INVALID_QUIZ_OPTION");
  });
});

test.describe("lead message formatter", () => {
  test("formats compact plain text without empty optional fields", () => {
    const lead = normalizeLeadInput(validInput, "https://example.test/");
    const message = formatLeadMessage(lead, new Date("2026-07-15T10:00:00Z"));

    expect(message).toContain("Новая заявка с сайта «Статум»");
    expect(message).toContain("Имя: Иван");
    expect(message).toContain("Телефон: +7 999 123-45-67");
    expect(message).not.toContain("Комментарий:");
    expect(message).toContain("Параметры предварительной оценки:");
    expect(message).toContain("•");
    expect(message).toContain("Страница: https://example.test/");
    expect(message.length).toBeLessThanOrEqual(3500);
  });
});

test.describe("telegram and turnstile transports", () => {
  test("handles telegram success and safe failures", async () => {
    await expect(
      postTelegramMessage({
        token: "token",
        chatId: "chat",
        message: "message",
        fetchImpl: async () =>
          new Response(JSON.stringify({ ok: true }), { status: 200 }),
      }),
    ).resolves.toBeUndefined();

    await expect(
      postTelegramMessage({
        token: "token",
        chatId: "chat",
        message: "message",
        fetchImpl: async () => new Response("fail", { status: 500 }),
      }),
    ).rejects.toThrow("Telegram HTTP request failed");

    await expect(
      postTelegramMessage({
        token: "token",
        chatId: "chat",
        message: "message",
        fetchImpl: async () =>
          new Response(JSON.stringify({ ok: false }), { status: 200 }),
      }),
    ).rejects.toThrow("Telegram API returned ok=false");
  });

  test("handles telegram timeout and test-only turnstile", async () => {
    await expect(
      postTelegramMessage({
        token: "token",
        chatId: "chat",
        message: "message",
        timeoutMs: 1,
        fetchImpl: (_input, init) =>
          new Promise<Response>((_resolve, reject) => {
            init?.signal?.addEventListener("abort", () => {
              reject(new DOMException("Aborted", "AbortError"));
            });
          }),
      }),
    ).rejects.toThrow("Telegram request timed out");

    const originalNodeEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = "test";

    try {
      await expect(
        verifyTurnstileToken({
          token: "test-turnstile-token",
          hostname: "127.0.0.1",
        }),
      ).resolves.toBeUndefined();
      await expect(
        verifyTurnstileToken({
          token: "bad-token",
          hostname: "127.0.0.1",
        }),
      ).rejects.toThrow("Turnstile test token is invalid");
    } finally {
      process.env.NODE_ENV = originalNodeEnv;
    }
  });
});

test("lead form submits only after server success and preserves data on error", async ({
  page,
}) => {
  const browserErrors: string[] = [];

  page.on("console", (message) => {
    if (message.type() === "error") {
      browserErrors.push(message.text());
    }
  });

  page.on("pageerror", (error) => {
    browserErrors.push(error.message);
  });

  await page.goto("/");

  const submittedBodies: string[] = [];
  page.on("request", (request) => {
    if (request.method() === "POST" && request.url().includes("_actions")) {
      submittedBodies.push(request.postData() ?? "");
    }
  });

  const quiz = page.locator("[data-estimate-quiz]");
  for (let stepIndex = 0; stepIndex < 5; stepIndex += 1) {
    const activeStep = quiz.locator(`[data-quiz-step-index="${stepIndex}"]`);
    await activeStep.locator("[data-quiz-option-card]").first().click();
    await quiz.locator("[data-quiz-next]").click();
  }
  await expect(quiz.locator("[data-quiz-final]")).toBeVisible();

  await page.locator("#lead-request").scrollIntoViewIfNeeded();

  const form = page.locator("[data-lead-form]").first();
  await expect(form).toBeVisible();

  await form.locator('input[name="name"]').fill("Иван");
  await form.locator('input[name="phone"]').fill("+7 999 123-45-67");
  await form.locator('textarea[name="comment"]').fill("Нужна консультация");
  await form.locator('input[name="consent"]').check();
  await form
    .locator('input[name="turnstileToken"]')
    .evaluate((node: HTMLInputElement) => {
      node.value = "bad-token";
    });

  await form.locator("[data-lead-submit]").click();
  await expect(form.locator("[data-lead-status]")).toContainText(
    "Не удалось отправить заявку",
  );
  await expect(form.locator('input[name="name"]')).toHaveValue("Иван");
  await expect(form.locator('input[name="phone"]')).toHaveValue(
    "+7 999 123-45-67",
  );

  await form
    .locator('input[name="turnstileToken"]')
    .evaluate((node: HTMLInputElement) => {
      node.value = "test-turnstile-token";
    });

  await form.locator("[data-lead-submit]").click();
  await expect(form.locator("[data-lead-status]")).toContainText(
    "Заявка отправлена",
  );
  await expect(form.locator('input[name="name"]')).toHaveValue("");
  expect(submittedBodies.some((body) => body.includes("object-type"))).toBe(
    true,
  );
  const unexpectedBrowserErrors = browserErrors.filter(
    (error) => !error.includes("Failed to load resource"),
  );
  expect(unexpectedBrowserErrors).toEqual([]);
});
