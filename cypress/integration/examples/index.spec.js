/* eslint-disable linebreak-style */
describe('Open Website', () => {
  it('successfully loads', () => {
    cy.visit('/');
  });

  it('shows currencies', () => {
    const $dropdownMenu = cy.get('#dropdownMenuLink')
      .click()
      .then(($dropdownMenu) => {
        cy.get('.dropdown-menu')
          .find('.dropdown-item').should('have.length', 33);
      });
  });
  
});
