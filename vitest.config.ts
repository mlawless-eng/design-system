/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'node:url';

const dirname = typeof __dirname !== 'undefined'
  ? __dirname
  : path.dirname(fileURLToPath(import.meta.url));

// Storybook + Playwright vitest config — only used when running `vitest`
// Kept separate from vite.config.ts so the dev server never depends on
// playwright browser binaries being installed.
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(dirname, './src'),
    },
  },
  test: {
    projects: [
      {
        extends: true,
        plugins: [
          // Lazy import so missing package never crashes the main vite config
          ...(await (async () => {
            try {
              const { storybookTest } = await import('@storybook/addon-vitest/vitest-plugin');
              return [storybookTest({ configDir: path.join(dirname, '.storybook') })];
            } catch {
              return [];
            }
          })()),
        ],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: 'playwright',
            instances: [{ browser: 'chromium' }],
          },
        },
      },
    ],
  },
});
