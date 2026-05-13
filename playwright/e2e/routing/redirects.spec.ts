import { test, expect, type Page } from '@playwright/test';

const expectRedirect = async (
  page: Page,
  fromPath: string,
  toPath: string
): Promise<void> => {
  await page.goto(fromPath);
  await expect(page).toHaveURL(toPath);
  await expect(page.locator('main h1')).toBeVisible();
};

test.describe('Legacy redirects', () => {
  test('redirects old policy URLs to current routes', async ({ page }) => {
    await expectRedirect(page, '/privacy', '/policies');
    await expectRedirect(page, '/terms', '/policies');
  });
});
