import { describe, it } from 'cypress';

describe('Landing Page', () => {
      it('should render the contact us section', () => {

      cy.visit('http://localhost:3000');
      cy.contains('Contact Us').click();
      cy.contains('Submit').should('exist');
      
      // Fill out the contact form
      cy.get('#name').type('John Smith');
      cy.get('#email').type('john.smith@example.edu');
      cy.get('#phone').type('123-456-7890');
      cy.get('#message').type('This is a test message');

      cy.get('form').submit();
    });
  });
  