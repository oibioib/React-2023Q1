/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';
import checker from 'vite-plugin-checker';

export default defineConfig({
  plugins: [
    { ...react(), ...eslint(), apply: 'build' },
    {
      ...react(),
      ...checker({
        enableBuild: false,
        overlay: {
          position: 'tr',
          panelStyle:
            'background-color: #23272E; opacity: 0.95; min-height: 100%; top: 0px; transform: scale(1);',
        },
        eslint: {
          lintCommand: 'eslint ./src --ext .ts,.tsx --ignore-path ./.gitignore',
        },
      }),
      apply: 'serve',
    },
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
    coverage: {
      provider: 'c8',
      all: true,
      reporter: 'text',
    },
  },
});
