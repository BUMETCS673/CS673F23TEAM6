import React from 'react';
import { mount } from 'cypress/react';
import ContactUs from '../../src/pages/contact';

describe('Landing Page', () => {
  beforeEach(() => {
    const onCloseStub = cy.stub().as('onCloseStub');
    
        mount(
          <Router>
            <ContactUs onClose={onCloseStub} />
          </Router>
        );
  });
      it('should render the contact us section', () => {
 
      cy.contains('Contact Us').should('exist');
      cy.contains('Submit').should('exist');
      
      // Fill out the contact form
      cy.get('#name').type('John Smith');
      cy.get('#email').type('jsmith@bu.edu');
      
      // Enter a valid phone number and submit the form
      cy.get('#phone').clear().type('123-456-7890');
      cy.get('#message').type('This is a test message');

      cy.get('form').submit();
    });

    it('should Reject phone numbers with lengths less than or greater than 10', () => {
 
      cy.contains('Submit').should('exist');
      
      // Fill out the contact form
      cy.get('#name').type('John Smith');
      cy.get('#email').type('jsmith@bu.edu');
      
      // Reject phone numbers with lengths less than or greater than 10
      cy.get('#phone').type('123-456-789').should('have.css', 'border', '1px solid red');
      cy.get('#phone').type('12345678901').should('have.css', 'border', '1px solid red');

      // Enter a valid phone number and submit the form
      cy.get('#phone').clear().type('123-456-7890');
      cy.get('#message').type('This is a test message');

      cy.get('form').submit();
    });

    it('should reject emails with anything other than bu.edu', () => {
        
      cy.contains('Submit').should('exist');
  
      // Fill out the contact form with an invalid email
      cy.get('#name').type('John Smith');
      cy.get('#email').type('jsmith@gmail.com');
      cy.get('#phone').type('123-456-7890');
      cy.get('#message').type('This is a test message');
  
      cy.get('form').submit();
  
      // Verify that error message is displayed
      cy.contains('Please enter a valid BU email address').should('exist');
    });
  });
  