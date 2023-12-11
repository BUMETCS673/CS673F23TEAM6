import React from 'react';
import Register from './Register';
import { mount } from 'cypress/react';

describe('<Register />', () => {
  beforeEach(() => {
    mount(<Register onClose={cy.stub().as('onCloseStub')} />);
  });

  it('shows error message when the user tries to register with an already used email', () => {
    // Stub the network response for the registration attempt
    cy.intercept('POST', '/api/users/register', {
      statusCode: 409, // Conflict status, indicating a duplicate user
      body: { message: 'Email already in use' },
    }).as('registerUser');

    // Fill out the form with credentials that should be already in use
    cy.get('input[name="name"]').should('not.be.disabled').type('Test User');
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();

    // Wait for the mocked network call to complete
    cy.wait('@registerUser');

    // Check if the error message is shown as expected
    cy.get('div').should('contain', 'Email already in use');
  });
});
