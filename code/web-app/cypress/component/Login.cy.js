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

  it('should successfully log in with valid credentials', () => {
    // Visit login page
 
    cy.get('input[name="email"]').type('your-valid-email@example.com');
    cy.get('input[name="password"]').type('your-valid-password');
    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/marketplace'); // Check if the URL has changed after successful login
    cy.get('span').should('contain.text', 'Welcome'); // Check if a welcome message is displayed

  });

  it('should display an error message with invalid credentials', () => {

    cy.get('input[name="email"]').type('invalid-email@example.com');
    cy.get('input[name="password"]').type('invalid-password');
    cy.get('button[type="submit"]').click();

    // Assertions
    cy.url().should('include', '/login'); // Check if the URL remains on the login page
    cy.get('div').should('contain.text', 'Invalid Email or Password'); // Check if an error message is displayed

  });

  it('should toggle password visibility when the eye icon is clicked', () => {
    
    cy.get('.toggle-password').click();
    cy.get('#password').should('have.attr', 'type', 'text');
    cy.get('.toggle-password').click();
    cy.get('#password').should('have.attr', 'type', 'password');
  });

  it('should navigate to the forgot password page when the link is clicked', () => {
    
    cy.get('.forgot-password-link').click();
    cy.url().should('include', '/forgot-password'); // Check if the URL changes to forgot password page
  });
});
