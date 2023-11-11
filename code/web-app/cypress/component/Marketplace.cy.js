import { describe, it } from 'cypress';

describe('Marketplace component', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/Marketplace'); 
  });

  it('should display a list of products after fetching products', () => {
    cy.wait(() => {
      cy.get('.ProductCard').should('have.length.at.least', 1);
    });
  });

  it('should display a message if no products are found', () => {
    cy.route('GET', 'http://localhost:3000/products', []).as('getProducts');
    cy.wait('@getProducts');

    cy.get('p').contains('No products found.');
  });
});
