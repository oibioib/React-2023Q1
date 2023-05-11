/// <reference types="vitest" />
/// <reference types="vite/client" />
import react from '@vitejs/plugin-react';
import { readdirSync } from 'fs';
import path from 'path';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import istanbul from 'vite-plugin-istanbul';
import { configDefaults } from 'vitest/config';

const getSourceFolders = () =>
  readdirSync(path.resolve(__dirname, 'src'), { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

const aliases = getSourceFolders().map((folder) => ({
  find: `@${folder}`,
  replacement: path.resolve(__dirname, `./src/${folder}`),
}));

export default defineConfig({
  plugins: [
    react({ fastRefresh: false }),
    process.env.ISTANBUL &&
      istanbul({
        cypress: true,
        requireEnv: false,
      }),
    !process.env.TEST &&
      checker({
        typescript: true,
        overlay: false,
        eslint: {
          lintCommand: 'eslint ./src --ext .ts,.tsx --ignore-path ./.gitignore',
        },
      }),
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
      exclude: [...configDefaults.coverage.exclude, '**/index.ts', '**/types.ts'],
    },
  },
  resolve: {
    alias: [...aliases],
  },
  build: {
    sourcemap: 'hidden',
    rollupOptions: {
      input: path.resolve(__dirname, './src/AppClient.tsx'),
      output: {
        entryFileNames: `script.js`,
        assetFileNames: ({ name }) => {
          if (name.endsWith('.css')) return 'styles.css';
          return '[name].[ext]';
        },
      },
    },
  },
});
