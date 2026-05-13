import { test, expect } from '@playwright/test';

test.describe('Page meta tags', () => {
  test('sets core metadata contract on key public pages', async ({ page }) => {
    await page.goto('/about');
    expect(await page.title()).toContain('2026 Boilerplate');
    const aboutDescription = await page.locator('meta[name="description"]').getAttribute('content');
    expect(aboutDescription?.length).toBeGreaterThan(0);
    const aboutCanonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(aboutCanonical).toContain('/about');

    // Legacy redirects land on /policies and retain metadata
    await page.goto('/privacy');
    await expect(page).toHaveURL('/policies');
    const privacyDescription = await page.locator('meta[name="description"]').getAttribute('content');
    expect(privacyDescription?.length).toBeGreaterThan(0);

    await page.goto('/terms');
    await expect(page).toHaveURL('/policies');
    const termsDescription = await page.locator('meta[name="description"]').getAttribute('content');
    expect(termsDescription?.length).toBeGreaterThan(0);

    await page.goto('/policies');
    expect(await page.title()).toContain('2026 Boilerplate');
    const policiesCanonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    expect(policiesCanonical).toContain('/policies');
  });
});
