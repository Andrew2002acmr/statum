import { expect, test } from "@playwright/test";

const viewports = [
  { width: 1440, height: 900 },
  { width: 1024, height: 768 },
  { width: 768, height: 1024 },
  { width: 390, height: 844 },
];

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

    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("h1")).toContainText("Statum");

    const hasHorizontalOverflow = await page.evaluate(() => {
      const root = document.documentElement;
      return root.scrollWidth > root.clientWidth;
    });

    expect(hasHorizontalOverflow).toBe(false);
    expect(browserErrors).toEqual([]);

    await page.screenshot({
      path: testInfo.outputPath(
        `home-${viewport.width}x${viewport.height}.png`,
      ),
      fullPage: true,
    });
  });
}
