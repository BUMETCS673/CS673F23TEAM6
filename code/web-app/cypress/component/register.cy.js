import React from 'react';
import { mount } from 'cypress/react';
import Register from '../../src/pages/auth/Register';

describe('Register component', () => {
  beforeEach(() => {
    const onCloseStub = cy.stub().as('onCloseStub');

    mount(
      <Router>
        <Register onClose={onCloseStub} />
      </Router>
    );
});
  it('should display register form', () => {

    cy.get('h2').contains('Create an Account!');

    cy.get('input[name="name"]').should('be.visible');
    cy.get('input[name="email"]').should('be.visible');
    cy.get('input[name="password"]').should('be.visible');

    cy.get('button').contains('Join');
  });

  it('should validate the register form', () => {

    cy.get('button').contains('Join').click();
    cy.get('.text-red-700').should('be.visible');
  });

  it('should register a new user', () => {
    
    cy.get('input[name="name"]').type('John Doe');
    cy.get('input[name="email"]').type('john.doe@gmail.com');
    cy.click('input[name="password"]')
    cy.contains('Only .edu e-mail ids can register').should('be.visible');
  });

  it('should register a new user', () => {
    
    cy.get('input[name="name"]').type('John Doe');
    cy.get('input[name="email"]').type('john.doe@bu.edu');
    cy.get('input[name="password"]').type('Password123');

    cy.get('button').contains('Join').click();

    cy.get('.alert-success').should('be.visible');
    cy.get('.alert-success').contains('Registration successful!');
  });

  it('Displays error message on registration with an existing user', () => {
    // Fill out the registration form with an existing user's email
    cy.get('[name="name"]').type('John Doe');
    cy.get('[name="email"]').type('existing.john.doe@bu.edu'); // Use an existing user's email
    cy.get('[name="password"]').type('securePassword123');
    cy.get('button[type="submit"]').click();

    // Error message should be displayed for the existing user
    cy.contains('User with this email already exists').should('exist');
  });
  
});
