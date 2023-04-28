/// <reference types="vitest" />
/// <reference types="vite/client" />
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    ssr: true,
    target: 'node18',
    rollupOptions: {
      input: path.resolve('./src/server.ts'),
      output: {
        entryFileNames: `server.js`,
      },
    },
  },
});
