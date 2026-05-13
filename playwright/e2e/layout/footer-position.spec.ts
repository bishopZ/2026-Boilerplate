import { test, expect } from '@playwright/test';

test.describe('Footer layout', () => {
  test('keeps footer at viewport bottom on short pages', async ({ page }) => {
    await page.goto('/login');

    const footer = page.locator('footer');
    await expect(footer).toBeVisible();

    const footerBox = await footer.boundingBox();
    const viewportHeight = page.viewportSize()?.height ?? 720;

    expect(footerBox).not.toBeNull();
    if (footerBox) {
      expect(Math.abs((footerBox.y + footerBox.height) - viewportHeight)).toBeLessThan(2);
    }
  });
});
