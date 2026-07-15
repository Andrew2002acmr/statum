import { expect, test, type Page } from "@playwright/test";

const viewports = [
  { width: 1440, height: 900 },
  { width: 1024, height: 768 },
  { width: 768, height: 1024 },
  { width: 390, height: 844 },
];

async function expectNoHorizontalOverflow(page: Page) {
  const hasHorizontalOverflow = await page.evaluate(() => {
    const root = document.documentElement;
    return root.scrollWidth > root.clientWidth;
  });

  expect(hasHorizontalOverflow).toBe(false);
}

async function expectServiceCardTextFits(page: Page) {
  const overflowingText = await page
    .locator("[data-service-card-title], [data-service-card-description]")
    .evaluateAll((nodes) =>
      nodes.some((node) => node.scrollWidth > node.clientWidth),
    );

  expect(overflowingText).toBe(false);
}

async function expectQuizProgress(page: Page, expectedValue: number) {
  const progressValue = await page
    .locator("[data-quiz-progress]")
    .evaluate((node: HTMLProgressElement) => node.value);

  expect(progressValue).toBe(expectedValue);
}

async function chooseQuizOption(page: Page, stepIndex: number) {
  const step = page.locator(`[data-quiz-step-index="${stepIndex}"]`);
  await step.locator("[data-quiz-option-card]").first().click();
}

for (const viewport of viewports) {
  test(`home page smoke ${viewport.width}x${viewport.height}`, async ({
    page,
  }, testInfo) => {
    const browserErrors: string[] = [];

    page.on("console", (message) => {
      if (message.type() === "error") {
        browserErrors.push(message.text());
      }
    });

    page.on("pageerror", (error) => {
      browserErrors.push(error.message);
    });

    await page.setViewportSize(viewport);
    await page.goto("/");

    await expect(page.locator("header")).toBeVisible();
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("h1")).toContainText("Ремонт под контролем");
    await expect(page.locator("#about")).toBeVisible();
    await expect(page.locator("#process")).toBeVisible();
    await expect(page.locator("#services")).toBeVisible();
    await expect(page.locator("#benefits")).toBeVisible();
    await expect(page.locator("#projects")).toBeVisible();
    await expect(page.locator("#statistics")).toBeVisible();
    await expect(page.locator("#estimate")).toBeVisible();
    await expect(page.locator("[data-process-step]")).toHaveCount(5);
    await expect(page.locator("[data-service-card]")).toHaveCount(5);
    await expect(page.locator("[data-benefit-card]")).toHaveCount(5);
    await expect(page.locator("[data-project-card]")).toHaveCount(5);
    await expect(page.locator("[data-statistic-item]")).toHaveCount(4);
    await expect(page.locator("[data-quiz-step]")).toHaveCount(5);

    if (viewport.width >= 1024) {
      await expect(
        page.getByRole("link", { name: "Услуги" }).first(),
      ).toHaveAttribute("href", "#services");
      await expect(
        page.getByRole("link", { name: "Работы" }).first(),
      ).toHaveAttribute("href", "#projects");
    }

    await expect(
      page.getByRole("link", { name: /Получить расчёт/i }).first(),
    ).toBeVisible();

    if (viewport.width < 1024) {
      const menuButton = page.getByRole("button", { name: "Открыть меню" });
      await expect(menuButton).toBeVisible();
      await expect(menuButton).toHaveAttribute("aria-expanded", "false");

      await menuButton.click();
      await expect(menuButton).toHaveAttribute("aria-expanded", "true");
      await expect(page.locator("#mobile-navigation")).toBeVisible();
      await expect(
        page.locator("#mobile-navigation").getByRole("link", {
          name: "Услуги",
        }),
      ).toHaveAttribute("href", "#services");
      await expect(
        page.locator("#mobile-navigation").getByRole("link", {
          name: "Работы",
        }),
      ).toHaveAttribute("href", "#projects");
      await expectNoHorizontalOverflow(page);

      await page.keyboard.press("Escape");
      await expect(menuButton).toHaveAttribute("aria-expanded", "false");
      await expect(page.locator("#mobile-navigation")).toBeHidden();
    }

    await expectNoHorizontalOverflow(page);
    expect(browserErrors).toEqual([]);

    await page.screenshot({
      path: testInfo.outputPath(
        `home-${viewport.width}x${viewport.height}.png`,
      ),
      fullPage: true,
    });

    await page.screenshot({
      path: testInfo.outputPath(
        `home-top-${viewport.width}x${viewport.height}.png`,
      ),
      clip: {
        x: 0,
        y: 0,
        width: viewport.width,
        height: Math.min(viewport.height, 900),
      },
    });

    await page.locator("#about").screenshot({
      path: testInfo.outputPath(
        `about-${viewport.width}x${viewport.height}.png`,
      ),
    });

    await page.locator("#process").screenshot({
      path: testInfo.outputPath(
        `process-${viewport.width}x${viewport.height}.png`,
      ),
    });

    await page.locator("#services").screenshot({
      path: testInfo.outputPath(
        `services-${viewport.width}x${viewport.height}.png`,
      ),
    });

    await page
      .locator("[data-service-card-description]")
      .first()
      .evaluate((node) => {
        node.textContent =
          "Длинное описание услуги без фиксированной длины и с оченьдлиннымнепрерывнымфрагментомкоторыйдолженпереноситьсявнутрикарточкибезобрезки";
      });
    await expectServiceCardTextFits(page);
    await expectNoHorizontalOverflow(page);

    await page.locator("#benefits").screenshot({
      path: testInfo.outputPath(
        `benefits-${viewport.width}x${viewport.height}.png`,
      ),
    });

    await page.locator("#projects").screenshot({
      path: testInfo.outputPath(
        `projects-${viewport.width}x${viewport.height}.png`,
      ),
    });

    await page.locator("#statistics").screenshot({
      path: testInfo.outputPath(
        `statistics-${viewport.width}x${viewport.height}.png`,
      ),
    });

    const quiz = page.locator("[data-estimate-quiz]");
    const nextButton = quiz.locator("[data-quiz-next]");
    const previousButton = quiz.locator("[data-quiz-prev]");

    await expect(quiz).toBeVisible();
    await expect(page.locator('[data-quiz-step-index="0"]')).toBeVisible();
    await expectQuizProgress(page, 1);
    await expect(nextButton).toBeDisabled();

    await page.locator("#estimate").screenshot({
      path: testInfo.outputPath(
        `estimate-first-${viewport.width}x${viewport.height}.png`,
      ),
    });

    await chooseQuizOption(page, 0);
    await expect(nextButton).toBeEnabled();
    await nextButton.click();
    await expect(page.locator('[data-quiz-step-index="1"]')).toBeVisible();
    await expectQuizProgress(page, 2);

    await page.locator("#estimate").screenshot({
      path: testInfo.outputPath(
        `estimate-middle-${viewport.width}x${viewport.height}.png`,
      ),
    });

    await previousButton.click();
    await expect(page.locator('[data-quiz-step-index="0"]')).toBeVisible();
    await expect(
      page.locator('[data-quiz-step-index="0"] input[type="radio"]').first(),
    ).toBeChecked();
    await expect(nextButton).toBeEnabled();

    await nextButton.click();

    for (let stepIndex = 1; stepIndex < 5; stepIndex += 1) {
      await chooseQuizOption(page, stepIndex);
      await expect(nextButton).toBeEnabled();
      await nextButton.click();
    }

    await expect(page.locator("[data-quiz-final]")).toBeVisible();
    await expect(page.locator("#estimate")).not.toContainText(/\d+\s*(₽|руб)/i);
    await expectNoHorizontalOverflow(page);
    expect(browserErrors).toEqual([]);

    await page.locator("#estimate").screenshot({
      path: testInfo.outputPath(
        `estimate-final-${viewport.width}x${viewport.height}.png`,
      ),
    });
  });
}
