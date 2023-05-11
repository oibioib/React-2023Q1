import { ADD_CARD_FORM } from '@constants';

describe('Form page', () => {
  it('Should render form', () => {
    cy.visit('/form');
    cy.get('[data-testid="add-card-form"]').should('be.visible');
    cy.get('[data-testid="add-card-form"]').children().should('have.length', 7);
  });

  it('Should display errors if submit empty form', () => {
    cy.visit('/form');
    cy.contains('Submit').as('formSubmit');
    cy.get('@formSubmit').should('be.visible');
    cy.get('@formSubmit').click();

    Object.values(ADD_CARD_FORM.VALIDATION_ERROR_MESSAGE).forEach((errorMessage) => {
      cy.contains(errorMessage).should('be.visible');
    });
  });

  it('Should submit valid form', () => {
    cy.visit('/form');
    cy.submitForm();
    cy.get('[data-testid="card"]').should('be.visible').should('have.length', 1);
    cy.submitForm();
    cy.get('[data-testid="card"]').should('be.visible').should('have.length', 2);
    cy.get('nav a').first().click();
    cy.go('back');
    cy.get('[data-testid="card"]').should('be.visible').should('have.length', 2);
  });
});
