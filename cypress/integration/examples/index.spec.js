/// <reference types="Cypress" />

describe('casa de cambio', () => {
  const URL = '/';
  const polyfillUrl = 'https://unpkg.com/unfetch/dist/unfetch.umd.js';
  let polyfill;

  // grab fetch polyfill from remote URL, could be also from a local package
  before(() => {
    cy.request(polyfillUrl)
      .then((response) => {
        polyfill = response.body;
      });

    cy.visit(URL, {
      onBeforeLoad(contentWindow) {
        delete contentWindow.fetch;
        contentWindow.eval(polyfill);
        contentWindow.fetch = contentWindow.unfetch;
      },
    });
  });

  beforeEach(() =>{
    cy.server();
    cy.route('GET', 'https://api.exchangeratesapi.io', 'fixture: exchange.json')
  });

  it('shows currencies', () => {
    cy.get('#dropdownMenu2')
      .click()
      .then(() => {
        cy.get('.dropdown-menu.dropdown-menu-lg-right')
          .find('.dropdown-item').should('have.length', 33);
      });
  });

  it('show currencies and their spots', () => {
    const $listItem = cy.get('.dropdown-item').contains('CAD')
      .click().should('have.class', 'active')
      .then(($listItem), () => {
        cy.get('tbody')
          .find('tr').should('have.length', 33);
        cy.get('tr')
          .find('td').should('have.length', 66);
      });
  });
  
  it('set date and verify changing spots', () => {
    cy.get('td').contains('USD').siblings().invoke('text').then((text1) => {
      cy.get('input[type="date"]')
        .type('2020-09-15')
        .trigger('change')
      cy.get('#Rates tbody')
        .find('tr');
      cy.get('td').contains('USD').siblings().invoke('text').should((text2) => {
        expect(text1).not.to.eq(text2)
      })
    });
  })
});
