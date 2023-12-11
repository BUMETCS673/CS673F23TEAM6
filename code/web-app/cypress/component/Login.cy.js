import React from 'react';
import { mount } from 'cypress/react';
import Login from '../../src/pages/auth/Login';


describe('Login', () => {

    beforeEach(() => {
      const onCloseStub = cy.stub().as('onCloseStub');

      mount(
        <Router>
          <Login onClose={onCloseStub} />
        </Router>
      );
  });

  it('should display Login form', () => {
    // Visit login page
    cy.get('h2').contains('Welcome to College Street!');
    cy.get('input[name="email"]').should('be.visible');
    cy.get('input[name="password"]').should('be.visible');

    cy.get('button').contains('Login');
  });
  
  it('should successfully log in with valid credentials', () => {
    // Visit login page
 
    cy.get('input[name="email"]').type('your-valid-email@example.com');
    cy.get('input[name="password"]').type('your-valid-password');
    cy.get('button[type="submit"]').click();

  });

  it('should display an error message with invalid credentials', () => {

    cy.get('input[name="email"]').type('invalid-email@example.com');
    cy.get('input[name="password"]').type('invalid-password');
    cy.get('button[type="submit"]').click();

    // Assertions
    cy.url().should('include', '/login'); // Check if the URL remains on the login page
    cy.get('div').should('contain.text', 'Invalid Email or Password'); // Check if an error message is displayed

  });
});
