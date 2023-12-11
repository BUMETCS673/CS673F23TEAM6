import React from 'react';
import { mount } from 'cypress/react';
import Chat from '../../src/pages/Chat';

describe('Chat Component', () => {
    beforeEach(() => {
        const onCloseStub = cy.stub().as('onCloseStub');

        mount(
          <Router>
            <Chat onClose={onCloseStub} />
          </Router>
        );
    });
  
    it('should send a message', () => {
      cy.get('input[type="text"]').type('Hello!');
      cy.get('button[type="submit"]').click();
      // Check if the message is displayed in the chat body
      cy.get('.chat-body').contains('Hello!');
    });
  
    it('should fetch messages and contacts', () => {
      cy.wait(3000); 
      // Check if messages and contacts are displayed
      cy.get('.chat-body').should('not.be.empty');
      cy.get('.chat-sidebar').should('not.be.empty');
    });
    
    it('should not allow sending empty messages', () => {
      // Attempt to send an empty message
      cy.get('button[type="submit"]').click();
      // Check if the message was not sent
      cy.get('.chat-body').should('not.contain.text', 'Empty Message');
    });
  });
  