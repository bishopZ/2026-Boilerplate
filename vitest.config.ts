import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';

export default defineConfig({
  plugins: [tsconfigPaths()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    // Make describe/it/expect available without explicit imports.
    globals: true,

    // Set env vars before any module-level code runs.
    // SESSION_SECRET must be present when jwt.ts is first imported
    // (it reads the var at module initialization time).
    env: {
      SESSION_SECRET: 'vitest-test-secret-do-not-use-in-production',
    },

    // Only scan src/ for unit tests — exclude Playwright spec files in playwright/.
    include: ['src/**/*.test.ts'],

    // Run server tests in a real Node environment;
    // run client tests in a simulated browser environment.
    environmentMatchGlobs: [
      ['src/server/**', 'node'],
      ['src/client/**', 'happy-dom'],
    ],

    // Isolate modules between test files so module-level state
    // (e.g. JWT_SECRET, ENV_FEATURE_FLAGS) doesn't bleed across suites.
    isolate: true,
  },
});
