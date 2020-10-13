/* eslint-disable linebreak-style */
describe('Open Website', () => {
  it('successfully loads', () => {
    cy.visit('/');
  });

  it('shows currencies', () => {
    const $dropdownMenu = cy.get('#dropdownMenu2')
      .click()
      .then(($dropdownMenu) => {
        cy.get('.dropdown-menu.dropdown-menu-lg-right')
          .find('.dropdown-item').should('have.length', 33);
      });
  });
  
});
