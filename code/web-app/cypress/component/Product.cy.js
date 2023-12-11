import React from 'react';
import { mount } from 'cypress/react';
import Product from '../../src/pages/Product';

describe('Product component', () => {
  beforeEach(() => {
    const onCloseStub = cy.stub().as('onCloseStub');

    mount(
      <Router>
        <Product onClose={onCloseStub} />
      </Router>
    );
});

    it('should display product details after fetching the product', () => {
    cy.wait(() => {
      cy.get('.ProductCard').should('be.visible');
    });

    cy.get('h1').contains('Product Title');
    cy.get('img').should('have.attr', 'alt', 'Product Title');
    cy.get('.mx-2 mt-2 text-gray-600 break-words').contains('Product Description');
    cy.get('.w-1/4 h-20 mx-2 text-2xl font-semibold text-center border rounded-xl').contains('Price: $100');
  });

  it('should open edit product modal', () => {
    cy.wait(() => {
      cy.get('.ProductCard').should('be.visible');
    });

    cy.get('svg[data-testid="edit-icon"]').click();
    cy.get('.modal-content').should('be.visible');
    cy.get('.modal-content h1').should('contain', 'Edit Product');
    cy.get('.edit-product-button').click();
    cy.get('.modal').should('be.visible');
  });

  it('should allow the user to delete the product if they are the author', () => {
    cy.wait(() => {
      cy.get('.ProductCard').should('be.visible');
    });

    cy.get('button').contains('Delete').click();
    cy.get('.modal-content').should('be.visible');
    cy.get('.modal-content').contains('Are you sure you wish to delete this item?');
    cy.get('button').contains('Yes').click();

    cy.get('.modal-content').should('not.be.visible');
    cy.get('h1').contains('Product Title');
  });
});
