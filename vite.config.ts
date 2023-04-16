/// <reference types="vitest" />
/// <reference types="vite/client" />
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import { configDefaults } from 'vitest/config';

const folders = [
  'pages',
  'components',
  'layouts',
  'constants',
  'helpers',
  'scss',
  'store',
  'mocks',
  'utils',
];

const aliases = folders.map((folder) => ({
  find: `@${folder}`,
  replacement: path.resolve(__dirname, `./src/${folder}`),
}));

const lintCommand = 'eslint ./src --ext .ts,.tsx --ignore-path ./.gitignore';

export default defineConfig({
  plugins: [
    {
      ...react(),
      ...checker({
        enableBuild: false,
        overlay: false,
        eslint: {
          lintCommand,
        },
      }),
      apply: 'serve',
    },
  ],
  css: {
    devSourcemap: true,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
    coverage: {
      provider: 'c8',
      all: true,
      reporter: 'text',
      exclude: [...configDefaults.coverage.exclude, '**/index.ts', '**/types.ts', '**/main.tsx'],
    },
  },
  resolve: {
    alias: [...aliases],
  },
});
