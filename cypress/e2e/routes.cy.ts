import { MENU_LINKS } from '@constants';

describe('Routes', () => {
  it('Should open pages from menu', () => {
    cy.visit('/');
    for (let i = 1; i < MENU_LINKS.length; i += 1) {
      const { route, title } = MENU_LINKS[i];
      if (route !== '/' && route !== '/404') {
        cy.contains(title).click();
        cy.url().should('include', route);
        cy.get('h1').should('have.text', title);
      }
    }
  });

  it('Should display error page', () => {
    cy.visit('/pagenotexist');
    cy.get('h1').should('have.text', '404');
  });
});
