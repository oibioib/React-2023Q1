declare namespace Cypress {
  interface Chainable {
    submitForm: () => void;
    openMobileMenu: () => void;
    openModalCard: () => void;
    doSearch: () => void;
  }
}
