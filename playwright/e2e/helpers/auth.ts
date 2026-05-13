import type { Page } from '@playwright/test';

const DEFAULT_USERNAME = 'test';
const DEFAULT_PASSWORD = 'test';

export const getCredentials = () => ({
  username: process.env.TEST_USERNAME ?? DEFAULT_USERNAME,
  password: process.env.TEST_PASSWORD ?? DEFAULT_PASSWORD,
});

export const login = async (page: Page, username?: string, password?: string): Promise<void> => {
  const creds = getCredentials();
  await page.goto('/login');
  await page.fill('input[name="username"]', username ?? creds.username);
  await page.fill('input[name="password"]', password ?? creds.password);
  await page.locator('form').press('Enter');
};
