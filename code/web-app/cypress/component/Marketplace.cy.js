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

  it('should display list of products after fetching products', () => {
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