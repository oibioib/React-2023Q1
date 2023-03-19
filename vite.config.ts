/// <reference types="vitest" />
/// <reference types="vite/client" />
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import eslint from 'vite-plugin-eslint';

const folders = ['pages', 'components', 'layouts', 'constants', 'hoc', 'helpers'];
const aliases = folders.map((folder) => ({
  find: `@${folder}`,
  replacement: path.resolve(__dirname, `./src/${folder}/index`),
}));

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
  resolve: {
    alias: [...aliases, { find: '@scss', replacement: path.resolve(__dirname, './src/scss') }],
  },
});
