import { test, expect, type Page } from '@playwright/test';
import { login } from '../helpers/auth';

const INCREMENT_TOOL = 'increment-counter';

interface WebMcpTool {
  name: string;
  execute: (input: Record<string, never>, agent: unknown) => { content: { type: string; text: string }[] };
}

declare global {
  interface Window {
    __webMcpTools?: Map<string, WebMcpTool>;
  }
}

const injectModelContextMock = async (page: Page): Promise<void> => {
  await page.addInitScript(() => {
    const tools = new Map<string, unknown>();
    window.__webMcpTools = tools as Map<string, WebMcpTool>;

    Object.defineProperty(navigator, 'modelContext', {
      configurable: true,
      get: () => ({
        registerTool: (tool: { name: string }) => tools.set(tool.name, tool),
        unregisterTool: (name: string) => tools.delete(name),
      }),
    });
  });
};

test.describe('WebMCP increment counter', () => {
  test('increments the private counter via a registered WebMCP tool', async ({ page }) => {
    await page.context().clearCookies();
    await injectModelContextMock(page);

    await login(page);
    await expect(page).toHaveURL('/product');

    // Wait until the app registers the increment-counter tool
    await page.waitForFunction(
      (toolName) => window.__webMcpTools?.has(toolName),
      INCREMENT_TOOL
    );

    // Execute the tool via the browser context
    const result = await page.evaluate((toolName) => {
      const tool = window.__webMcpTools?.get(toolName);
      return tool?.execute({} as Record<string, never>, {});
    }, INCREMENT_TOOL);

    expect(result?.content[0]?.text).toContain('Counter incremented to');
    await expect(page.getByRole('heading', { name: /Welcome to the Product Page/ })).toContainText('(1)');
  });

  test('still supports manual increments when modelContext is unavailable', async ({ page }) => {
    await page.context().clearCookies();

    await login(page);
    await expect(page).toHaveURL('/product');

    await page.getByRole('button', { name: 'Increment Counter' }).click();
    await expect(page.getByRole('heading', { name: /Welcome to the Product Page/ })).toContainText('(1)');
  });
});
