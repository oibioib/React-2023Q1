import '@cypress/code-coverage/support';

import './commands.ts';

afterEach(() => {
  cy.window().trigger('unload');
});
