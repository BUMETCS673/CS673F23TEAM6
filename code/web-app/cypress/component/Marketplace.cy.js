import React from 'react';
import { mount } from 'cypress/react';
import Marketplace from '../../src/pages/Marketplace';

describe('Marketplace component', () => {
  beforeEach(() => {
    const onCloseStub = cy.stub().as('onCloseStub');

    mount(
      <Router>
        <Marketplace onClose={onCloseStub} />
      </Router>
    );
});

 it('should display a loading spinner while fetching products', () => {
    cy.get('.animate-spin').should('be.visible');
    cy.get('p').should('contain', 'getting products...');
  });

  it('should display products after fetching them', () => {
    cy.wait('@getProducts');
    cy.get('.animate-spin').should('not.exist');
    cy.get('.product-card').should('have.length', 3);
  });

  it('should display an error message if product fetching fails', () => {
    cy.intercept('GET', 'http://localhost:8000/products', {
      statusCode: 500,
    }).as('getProducts');
    cy.wait('@getProducts');
    cy.get('.animate-spin').should('not.exist');
    cy.get('.product-card').should('not.exist');
    cy.get('p').should('contain', 'An error occurred while fetching products.');
  });

  it('should update the product list based on the URL search parameters', () => {
    cy.visit('/marketplace?search=shoes&category=books');
    // Verify that the correct URL is fetched
    cy.intercept(`http://localhost:3000/products?search=shoes&category=books`).as('getProducts');
    cy.wait('@getProducts');
    // Verify that the product list is updated with the new products
    cy.get('.product-card').should('have.length', 3);
  });

  it('should display a message if no products are found', () => {
    cy.route('GET', 'http://localhost:3000/products', []).as('getProducts');
    cy.wait('@getProducts');

    cy.get('p').contains('No products found.');
  });
});
