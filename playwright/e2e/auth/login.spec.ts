import { test, expect } from '@playwright/test';
import { login, getCredentials } from '../helpers/auth';

test.describe('Login', () => {
  test('redirects to the product route on successful login', async ({ page }) => {
    const { username, password } = getCredentials();
    await login(page, username, password);
    await expect(page).toHaveURL('/product');
  });

  test('redirects back to /login on failed login', async ({ page }) => {
    await login(page, 'invalid-user', 'wrong-password');
    await expect(page).toHaveURL('/login');
  });
});
