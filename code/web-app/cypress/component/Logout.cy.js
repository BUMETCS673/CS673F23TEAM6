import React from 'react';
import { mount } from 'cypress/react';
import Product from '../../src/pages/Product';
import Marketplace from '../../src/pages/Marketplace';
import User from '../../src/pages/User';

describe('Logout component', () => {
    it('should log the user from Marketplace out and redirect to the login page', () => {
        const onCloseStub = cy.stub().as('onCloseStub');
        mount(
          <Router>
            <Marketplace onClose={onCloseStub} />
          </Router>
        );
        cy.contains('Logout').click();
    
        // Assertions for logout success
        cy.url().should('include', '/login'); // Check if the URL contains '/login'
        cy.contains('Login').should('exist'); 
    });
    
    it('should logout the user from Product page and redirect to the login page', () => {
        const onCloseStub = cy.stub().as('onCloseStub');
        mount(
          <Router>
            <Product onClose={onCloseStub} />
          </Router>
        );
        cy.contains('Logout').click();
    
        // Assertions for logout success
        cy.url().should('include', '/login'); // Check if the URL contains '/login'
        cy.contains('Login').should('exist'); 
    });
    
    it('should logout the user from User Profile page and redirect to the login page', () => {
        const onCloseStub = cy.stub().as('onCloseStub');
        mount(
          <Router>
            <User onClose={onCloseStub} />
          </Router>
        );
        cy.contains('Logout').click();
    
        // Assertions for logout success
        cy.url().should('include', '/login'); // Check if the URL contains '/login'
        cy.contains('Login').should('exist'); 
    });
});
