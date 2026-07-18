import { expect, test, type Locator, type Page } from "@playwright/test";
import { formatLeadMessage } from "../../src/lib/server/lead-message";
import {
  leadInputSchema,
  normalizeLeadInput,
  parseQuizAnswersPayload,
} from "../../src/lib/server/lead-schema";
import {
  postTelegramMessage,
  sendTelegramLead,
} from "../../src/lib/server/telegram";
import { verifyTurnstileToken } from "../../src/lib/server/turnstile";
import {
  formatRussianPhone,
  normalizeRussianPhone,
} from "../../src/lib/russian-phone";

const validInput = {
  name: " Иван ",
  phone: "+7 (999) 123-45-67",
  comment: "",
  consent: "on",
  source: "hero",
  quizAnswers: '{"object-type":"apartment"}',
  company: "",
  turnstileToken: "test-turnstile-token",
} as const;

async function countActionRequests(page: Page) {
  let count = 0;

  page.on("request", (request) => {
    if (request.method() === "POST" && request.url().includes("_actions")) {
      count += 1;
    }
  });

  return () => count;
}

async function completeQuiz(page: Page) {
  const quiz = page.locator("[data-estimate-quiz]");

  for (let stepIndex = 0; stepIndex < 5; stepIndex += 1) {
    const step = quiz.locator(`[data-quiz-step-index="${stepIndex}"]`);
    await step.locator("[data-quiz-option-card]").first().click();
    await quiz.locator("[data-quiz-next]").click();
  }

  return quiz;
}

async function fillValidLeadForm(form: Locator) {
  await form.locator('input[name="name"]').fill("Иван");
  await form.locator('input[name="phone"]').fill("89991234567");
  await expect(form.locator('input[name="phone"]')).toHaveValue(
    "+7 (999) 123-45-67",
  );
  await form.locator('textarea[name="comment"]').fill("Нужна консультация");
  await form.locator('input[name="consent"]').check();
}

test.describe("lead validation", () => {
  test("rejects invalid fields, extra fields, and damaged quiz payloads", () => {
    expect(leadInputSchema.safeParse({ ...validInput, name: "" }).success).toBe(
      false,
    );
    expect(
      leadInputSchema.safeParse({ ...validInput, name: "А" }).success,
    ).toBe(false);
    expect(
      leadInputSchema.safeParse({ ...validInput, name: "Иван2" }).success,
    ).toBe(false);
    expect(
      leadInputSchema.safeParse({
        ...validInput,
        name: "А".repeat(61),
      }).success,
    ).toBe(false);
    expect(
      leadInputSchema.safeParse({ ...validInput, phone: "" }).success,
    ).toBe(false);
    expect(
      leadInputSchema.safeParse({ ...validInput, phone: "+7 (999) 123" })
        .success,
    ).toBe(false);
    expect(
      leadInputSchema.safeParse({ ...validInput, phone: "9991234567" }).success,
    ).toBe(false);
    expect(
      leadInputSchema.safeParse({ ...validInput, phone: "+1 999 123 45 67" })
        .success,
    ).toBe(false);
    expect(
      leadInputSchema.safeParse({ ...validInput, phone: "799912345678" })
        .success,
    ).toBe(false);
    expect(
      leadInputSchema.safeParse({
        ...validInput,
        comment: "x".repeat(1001),
      }).success,
    ).toBe(false);
    expect(
      leadInputSchema.safeParse({ ...validInput, consent: undefined }).success,
    ).toBe(false);
    expect(
      leadInputSchema.safeParse({ ...validInput, consent: "true" }).success,
    ).toBe(false);
    expect(
      leadInputSchema.safeParse({ ...validInput, company: "spam" }).success,
    ).toBe(false);
    expect(
      leadInputSchema.safeParse({ ...validInput, source: "unknown" }).success,
    ).toBe(false);
    expect(
      leadInputSchema.safeParse({ ...validInput, extra: "field" }).success,
    ).toBe(false);
    expect(() => parseQuizAnswersPayload("{bad-json")).toThrow(
      "INVALID_QUIZ_PAYLOAD",
    );
    expect(() =>
      parseQuizAnswersPayload('{"object-type":"unknown-option"}'),
    ).toThrow("INVALID_QUIZ_OPTION");
  });

  test("normalizes Russian phone numbers to one canonical value", () => {
    const variants = [
      "89991234567",
      "79991234567",
      "+7 (999) 123-45-67",
      "+7 999 123 45 67",
    ];

    for (const phone of variants) {
      const parsed = leadInputSchema.safeParse({ ...validInput, phone });
      expect(parsed.success).toBe(true);

      if (parsed.success) {
        expect(parsed.data.phone).toBe("+79991234567");
        expect(
          normalizeLeadInput(parsed.data, "https://example.test/").phone,
        ).toBe("+79991234567");
      }
    }

    expect(formatRussianPhone("8 (999) 123-45-67")).toBe("+7 (999) 123-45-67");
    expect("canonical" in normalizeRussianPhone("+79991234567")).toBe(true);
  });
});

test.describe("lead message formatter", () => {
  test("formats compact plain text without empty optional fields", () => {
    const parsed = leadInputSchema.parse(validInput);
    const lead = normalizeLeadInput(parsed, "https://example.test/");
    const message = formatLeadMessage(lead, new Date("2026-07-15T10:00:00Z"));

    expect(message).toContain("Новая заявка с сайта «Статум»");
    expect(message).toContain("Имя: Иван");
    expect(message).toContain("Телефон: +7 (999) 123-45-67");
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

  test("handles telegram timeout, mock transport, and test-only turnstile", async () => {
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
    const originalMode = process.env.LEAD_DELIVERY_MODE;
    const originalMockResult = process.env.MOCK_LEAD_RESULT;
    process.env.NODE_ENV = "test";
    process.env.LEAD_DELIVERY_MODE = "mock";

    try {
      process.env.MOCK_LEAD_RESULT = "success";
      await expect(sendTelegramLead("message")).resolves.toBeUndefined();

      process.env.MOCK_LEAD_RESULT = "error";
      await expect(sendTelegramLead("message")).rejects.toThrow(
        "Mock lead delivery failed",
      );

      process.env.MOCK_LEAD_RESULT = "timeout";
      await expect(sendTelegramLead("message")).rejects.toThrow(
        "Mock lead delivery timed out",
      );

      await expect(
        verifyTurnstileToken({
          token: "",
          hostname: "127.0.0.1",
          allowTestBypass: true,
        }),
      ).resolves.toBeUndefined();
    } finally {
      process.env.NODE_ENV = originalNodeEnv;
      if (originalMode === undefined) {
        delete process.env.LEAD_DELIVERY_MODE;
      } else {
        process.env.LEAD_DELIVERY_MODE = originalMode;
      }

      if (originalMockResult === undefined) {
        delete process.env.MOCK_LEAD_RESULT;
      } else {
        process.env.MOCK_LEAD_RESULT = originalMockResult;
      }
    }
  });
});

test("hero form validates fields before calling the Action", async ({
  page,
}, testInfo) => {
  await page.goto("/");
  const getActionRequestCount = await countActionRequests(page);
  const form = page.getByTestId("lead-form-hero");

  await form.locator("[data-lead-submit]").click();

  await expect(form.locator('input[name="name"]')).toBeFocused();
  await expect(form.locator('[data-field-error="name"]')).toContainText(
    "Укажите ваше имя",
  );
  await expect(form.locator('[data-field-error="phone"]')).toContainText(
    "Укажите номер телефона",
  );
  await expect(form.locator('[data-field-error="consent"]')).toContainText(
    "Подтвердите согласие",
  );
  expect(getActionRequestCount()).toBe(0);

  await form.locator('input[name="name"]').fill("А");
  await form.locator('input[name="name"]').blur();
  await expect(form.locator('[data-field-error="name"]')).toContainText(
    "Имя должно содержать не менее 2 символов",
  );

  await form.locator('input[name="name"]').fill("Иван2");
  await expect(form.locator('[data-field-error="name"]')).toContainText(
    "Используйте буквы",
  );

  await form.locator('input[name="name"]').fill("Иван");
  await expect(form.locator('[data-field-error="name"]')).toHaveText("");

  const phone = form.locator('input[name="phone"]');
  await expect(phone).toHaveAttribute("type", "tel");
  await expect(phone).toHaveAttribute("autocomplete", "tel");

  await phone.fill("89991234567");
  await expect(phone).toHaveValue("+7 (999) 123-45-67");

  await phone.fill("+7 999 123 45 67");
  await expect(phone).toHaveValue("+7 (999) 123-45-67");

  await phone.fill("89991234567999");
  await expect(phone).toHaveValue("+7 (999) 123-45-67");

  await phone.press("Backspace");
  await expect(phone).not.toHaveValue(/\+\+/);

  await phone.fill("+7 (999) 123-45-67");
  await form.locator('textarea[name="comment"]').fill("x".repeat(1005));
  await expect(form.locator('textarea[name="comment"]')).toHaveValue(
    "x".repeat(1000),
  );
  await expect(form.locator("[data-comment-counter]")).toContainText(
    "1000 / 1000",
  );

  await form.locator('textarea[name="comment"]').fill("");
  await form.locator('input[name="consent"]').check();
  await form.locator("[data-lead-submit]").click();

  await expect(page.locator("#lead-form-hero-dialog")).toBeVisible();
  await expect(page.locator("#lead-form-hero-dialog")).toContainText(
    "Заявка отправлена",
  );
  await page.locator("#lead-form-hero-dialog").screenshot({
    path: testInfo.outputPath("lead-success-dialog.png"),
  });
});

test("estimate quiz keeps context and submits selected answers", async ({
  page,
}, testInfo) => {
  const browserErrors: string[] = [];
  const actionBodies: string[] = [];

  page.on("console", (message) => {
    if (message.type() === "error") {
      browserErrors.push(message.text());
    }
  });

  page.on("pageerror", (error) => {
    browserErrors.push(error.message);
  });

  page.on("request", (request) => {
    if (request.method() === "POST" && request.url().includes("_actions")) {
      actionBodies.push(request.postData() ?? "");
    }
  });

  await page.goto("/");
  const startUrl = page.url();
  const quiz = await completeQuiz(page);

  await expect(quiz.locator("[data-quiz-final]")).toBeVisible();
  await expect(page.getByTestId("lead-form-estimate")).toBeVisible();
  await expect(quiz.locator("[data-quiz-summary-list] > div")).toHaveCount(5);
  await expect(page).toHaveURL(startUrl);
  await page.locator("#estimate").screenshot({
    path: testInfo.outputPath("estimate-completed-with-form.png"),
  });

  const form = page.getByTestId("lead-form-estimate");
  await fillValidLeadForm(form);
  await form.locator("[data-lead-submit]").click();
  await expect(form.locator("[data-lead-submit]")).toBeDisabled();

  const dialog = page.locator("#lead-form-estimate-dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog).toContainText("Заявка отправлена");
  await expect(dialog.getByRole("button", { name: "Закрыть" })).toBeFocused();
  await dialog.screenshot({
    path: testInfo.outputPath("estimate-success-dialog.png"),
  });
  expect(actionBodies.some((body) => body.includes("object-type"))).toBe(true);
  await dialog.getByRole("button", { name: "Закрыть" }).click();

  await expect(form.locator('input[name="name"]')).toHaveValue("");
  await expect(page.locator('[data-quiz-step-index="0"]')).toBeVisible();
  await expect(page).toHaveURL(startUrl);
  await expect(page.locator("h1")).toHaveCount(1);

  const unexpectedBrowserErrors = browserErrors.filter(
    (error) => !error.includes("Failed to load resource"),
  );
  expect(unexpectedBrowserErrors).toEqual([]);
});

test("mock error keeps values and allows retry @mock-error", async ({
  page,
}, testInfo) => {
  await page.goto("/");
  const form = page.getByTestId("lead-form-hero");
  let actionCount = 0;

  page.on("request", (request) => {
    if (request.method() === "POST" && request.url().includes("_actions")) {
      actionCount += 1;
    }
  });

  await fillValidLeadForm(form);
  await form.locator("[data-lead-submit]").click();

  const dialog = page.locator("#lead-form-hero-dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog).toContainText("Не удалось отправить заявку");
  await expect(form.locator('input[name="name"]')).toHaveValue("Иван");
  await expect(form.locator('input[name="phone"]')).toHaveValue(
    "+7 (999) 123-45-67",
  );
  await expect(form.locator("[data-lead-submit]")).toBeEnabled();
  expect(actionCount).toBe(1);
  await dialog.screenshot({
    path: testInfo.outputPath("lead-error-dialog.png"),
  });

  await dialog.getByRole("button", { name: "Попробовать снова" }).click();
  await expect(dialog).toBeVisible();
  expect(actionCount).toBe(2);
});

test("mock timeout returns safe error without stuck submitting @mock-timeout", async ({
  page,
}, testInfo) => {
  await page.goto("/");
  const form = page.getByTestId("lead-form-hero");

  await fillValidLeadForm(form);
  await form.locator("[data-lead-submit]").click();

  const dialog = page.locator("#lead-form-hero-dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog).toContainText("Не удалось отправить заявку");
  await expect(form.locator("[data-lead-submit]")).toBeEnabled();
  await expect(form.locator('input[name="name"]')).toHaveValue("Иван");
  await dialog.screenshot({
    path: testInfo.outputPath("lead-timeout-dialog.png"),
  });
});
