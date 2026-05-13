import { test, expect } from '@playwright/test';

const MAX_ATTEMPTS = 10;

test.describe('Login rate limiting', () => {
  test('blocks repeated failed login attempts', async ({ page }) => {
    let rateLimited = false;

    for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
      await page.goto('/login');
      await page.fill('input[name="username"]', 'wrong-user');
      await page.fill('input[name="password"]', 'wrong-password');

      const [response] = await Promise.all([
        page.waitForResponse((resp) => resp.url().includes('/login/password')),
        page.locator('form').press('Enter'),
      ]);

      if (response.status() === 429) {
        rateLimited = true;
        break;
      }

      await expect(page).toHaveURL('/login');
    }

    if (!rateLimited) {
      throw new Error(`Expected rate limit within ${String(MAX_ATTEMPTS)} attempts but it was never triggered.`);
    }

    await expect(page.locator('body')).toContainText('Too many login attempts');
  });
});
