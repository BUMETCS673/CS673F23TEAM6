import React from 'react';
import { mount } from 'cypress/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from '../../src/pages/auth/Login';


describe('Marketplace E2E Test', () => {
  beforeEach(() => {
    const onCloseStub = cy.stub().as('onCloseStub');
      // Visit the login page
      cy.visit('http://localhost:3000');
      // test user credentials
      const email = 'nidhi@gmail.com';
      const password = 'Nidhi@CollegeStreet673';
      
      cy.contains('Log-in').click()
  });
  it('should login, create a listing, and logout', () => {

      // Login to CollegeStreet
      cy.get('[data-cy=login-email]').type(email);
      cy.get('#password').type(password);
      cy.get('button[type=submit]').click();
  
      // Verify that the user is redirected to the marketplace page
      cy.url().should('include', '/marketplace');
  
      cy.get('button[data-cy=logout-button]').click();
      cy.url().should('include', 'Login');
    });
});