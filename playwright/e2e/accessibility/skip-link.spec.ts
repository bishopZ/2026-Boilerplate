import { test, expect } from '@playwright/test';

test.describe('Skip link accessibility', () => {
  test('shows the skip link when the user presses Tab', async ({ page }) => {
    await page.goto('/');
    await page.locator('body').click();
    await page.keyboard.press('Tab');

    const skipLink = page.locator('[href="#main-content"]');
    await expect(skipLink).toBeVisible();
  });
});
