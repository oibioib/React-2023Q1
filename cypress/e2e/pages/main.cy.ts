import { API, MENU_LINKS, TEXT } from '@constants';

describe('Main page', () => {
  describe('Header', () => {
    it('Should render menu', () => {
      cy.visit('/');
      cy.get('nav a').should('have.length', MENU_LINKS.length);
    });

    it('Should render mobile menu', () => {
      cy.viewport(419, 750);
      cy.visit('/');
      cy.get('[data-testid="menu-burger"]').should('be.visible');
    });

    it('Should open mobile menu', () => {
      cy.openMobileMenu();
      cy.get('[data-testid="menu-mobile"]').should('be.visible');
    });

    it('Should open and close mobile menu', () => {
      cy.openMobileMenu();
      cy.get('[data-testid="modal-close"]').click();
      cy.get('[data-testid="menu-mobile"]').should('not.exist');
    });

    it('Should open and close mobile menu by clicking on the overlay', () => {
      cy.openMobileMenu();
      cy.get('[data-testid="menu-mobile"]').as('menuMobile').should('be.visible');
      cy.get('[data-testid="modal"]').click(0, 0);
      cy.get('@menuMobile').should('not.exist');
    });

    it('Should open and close mobile menu by clicking on the link in menu', () => {
      cy.openMobileMenu();
      cy.get('[data-testid="menu-mobile"]').as('menuMobile').should('be.visible');
      cy.get('@menuMobile').children('a').not('[aria-current="page"]').first().click();
      cy.get('@menuMobile').should('not.exist');
    });
  });

  describe('Search', () => {
    it('Should render search input', () => {
      cy.visit('/');
      cy.get(`input[placeholder="${TEXT.PLACEHOLDERS.SEARCH}"]`).should('be.visible');
    });

    it('Clear search by click on cross', () => {
      cy.doSearch();
      cy.get('[data-testid="search-clear"]').as('searchClear');
      cy.get('@searchClear').should('be.visible');
      cy.get('@searchClear').click();
      cy.wait(500);
      cy.get(`input[placeholder="${TEXT.PLACEHOLDERS.SEARCH}"]`).should('have.text', '');
      cy.get('@searchClear').should('not.exist');
    });

    it('Clear search by type Esc', () => {
      cy.doSearch();
      cy.get(`input[placeholder="${TEXT.PLACEHOLDERS.SEARCH}"]`).as('searchInput');
      cy.get('@searchInput').type('{esc}');
      cy.wait(500);
      cy.get('@searchInput').should('have.text', '');
      cy.get('[data-testid="search-clear"]').should('not.exist');
    });
  });

  describe('Main Cards', () => {
    it('Should display default cards', () => {
      cy.visit('/');
      cy.get('[data-testid="main-card"]').should('have.length', API.PARAMS.PER_PAGE);
    });

    it('Should load new cards', () => {
      cy.visit('/');
      cy.get(`input[placeholder="${TEXT.PLACEHOLDERS.SEARCH}"]`).type('dog{enter}');
      cy.get('[data-testid="loader"]').should('be.visible');
      cy.get('[data-testid="main-card"]').should('have.length.at.least', 1);
    });

    it('Should not display cards for non-existent search input', () => {
      cy.visit('/');
      cy.intercept('GET', `${API.ENDPOINT.PHOTOS}*`, {
        statusCode: 200,
        body: { total: 0, total_pages: 0, results: [] },
      }).as('Request 0 results');
      cy.get(`input[placeholder="${TEXT.PLACEHOLDERS.SEARCH}"]`).type('something{enter}');
      cy.contains(TEXT.MESSAGES.NO_CARDS_FOUNDED).should('be.visible');
      cy.get('[data-testid="main-card"]').should('not.exist');
    });
  });

  describe('Modal Cards', () => {
    it('Should open modal card on click', () => {
      cy.openModalCard();
    });

    it('Should open modal card on click and close it', () => {
      cy.openModalCard();
      cy.get('[data-testid="modal-close"]').click();
      cy.get('[data-testid="modal-card"]').should('not.exist');
    });

    it('Should open modal card on click and close it by clicking on overlay', () => {
      cy.openModalCard();
      cy.get('[data-testid="modal"]').click(0, 0);
      cy.get('[data-testid="modal-card"]').should('not.exist');
    });

    it('Should not close modal card on click on it', () => {
      cy.openModalCard();
      cy.get('[data-testid="modal-card"]').as('modalCard');
      cy.get('@modalCard').click(0, 0);
      cy.get('@modalCard').should('be.visible');
    });
  });

  describe('Errors', () => {
    it('Should show error when getPhotos request failed', () => {
      cy.visit('/');
      cy.intercept('GET', `${API.ENDPOINT.PHOTOS}*`, { forceNetworkError: true }).as(
        'Abort fetch photos for test'
      );
      cy.get(`input[placeholder="${TEXT.PLACEHOLDERS.SEARCH}"]`).type('dog{enter}');
      cy.contains(TEXT.MESSAGES.ERROR).should('be.visible');
    });

    it('Should show error when getPhoto request failed', () => {
      cy.visit('/');
      cy.intercept('GET', `${API.ENDPOINT.SINGLE_PHOTO}/*`, { forceNetworkError: true }).as(
        'Abort fetch photo for test'
      );
      cy.get('[data-testid="main-card"]').first().click();
      cy.contains(TEXT.MESSAGES.ERROR).should('be.visible');
    });
  });
});
