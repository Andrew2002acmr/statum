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
  });
}
