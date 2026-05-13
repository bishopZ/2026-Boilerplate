import { test, expect } from '@playwright/test';

test.describe('Language switcher', () => {
  test('supports Chinese, French, and Arabic locale switching', async ({ page }) => {
    await page.goto('/');
    const select = page.locator('select[aria-label="Select language"]').first();

    await select.selectOption('en');
    const englishHeading = (await page.locator('main h1').first().textContent())?.trim() ?? '';
    expect(englishHeading.length).toBeGreaterThan(0);

    await select.selectOption('zh');
    await expect(page.locator('div[dir="ltr"]')).toBeVisible();
    const chineseHeading = (await page.locator('main h1').first().textContent())?.trim() ?? '';
    expect(chineseHeading.length).toBeGreaterThan(0);
    expect(chineseHeading).not.toBe(englishHeading);

    await select.selectOption('fr');
    await expect(page.locator('div[dir="ltr"]')).toBeVisible();
    const frenchHeading = (await page.locator('main h1').first().textContent())?.trim() ?? '';
    expect(frenchHeading.length).toBeGreaterThan(0);
    expect(frenchHeading).not.toBe(englishHeading);

    await select.selectOption('ar');
    await expect(page.locator('div[dir="rtl"]')).toBeVisible();
    const arabicHeading = (await page.locator('main h1').first().textContent())?.trim() ?? '';
    expect(arabicHeading.length).toBeGreaterThan(0);
    expect(arabicHeading).not.toBe(englishHeading);
  });
});
