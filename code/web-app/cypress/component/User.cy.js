import React from 'react';
import { mount } from 'cypress/react';
import User from '../../src/pages/User';

describe('User component', () => {
  beforeEach(() => {
    const onCloseStub = cy.stub().as('onCloseStub');

    mount(
      <Router>
        <User onClose={onCloseStub} />
      </Router>
    );
});

  it('should display the user\'s name, email, and bio', () => {
    cy.wait(() => {
      cy.get('.p-8 mt-24 bg-white shadow').should('be.visible');
    });

    cy.get('h1').contains('Nidhi');
    cy.get('p').contains('Nidhi@bu.edu');
    cy.get('p').contains('User Bio');
  });

  it('should display user\'s products', () => {
    cy.wait(() => {
      cy.get('.ProductCardProfile').should('be.visible');
    });
    // ProductCardProfile element should be displayed and have a length of 1
    cy.get('.ProductCardProfile').should('have.length', 3);
  });
});
