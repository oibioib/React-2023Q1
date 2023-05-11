import codeCoverageTask from '@cypress/code-coverage/task';
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      codeCoverageTask(on, config);
      return config;
    },
    baseUrl: 'http://localhost:5173',
  },
  video: false,
  defaultCommandTimeout: 10000,
  screenshotOnRunFailure: false,
});
