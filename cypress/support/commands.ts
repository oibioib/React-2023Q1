import { ADD_CARD_FORM, ALERT, TEXT } from '@constants';

Cypress.Commands.add('submitForm', () => {
  cy.contains('Submit').as('formSubmit');
  cy.get('@formSubmit').should('be.visible');
  cy.get('@formSubmit').click();
  cy.contains(ALERT.MESSAGES.CARD_SUCCESS).as('successMessage');
  cy.get('@successMessage').should('be.visible');
  cy.wait(4000);
  cy.get('@successMessage').should('not.exist');
  Object.values(ADD_CARD_FORM.VALIDATION_ERROR_MESSAGE).forEach((errorMessage) => {
    cy.contains(errorMessage).should('not.exist');
  });
});

Cypress.Commands.add('openMobileMenu', () => {
  cy.viewport(419, 750);
  cy.visit('/');
  cy.get('[data-testid="menu-burger"]').click();
});

Cypress.Commands.add('openModalCard', () => {
  cy.visit('/');
  cy.get('[data-testid="main-card"]').first().click();
  cy.get('[data-testid="loader"]').should('be.visible');
  cy.get('[data-testid="modal-card"]').should('be.visible');
});

Cypress.Commands.add('doSearch', () => {
  cy.visit('/');
  cy.get(`input[placeholder="${TEXT.PLACEHOLDERS.SEARCH}"]`).as('searchInput');
  cy.get('@searchInput').should('have.text', '');
  cy.get('@searchInput').type('something{enter}');
});
