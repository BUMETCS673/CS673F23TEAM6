import { describe, it } from 'cypress';

describe('User component', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/User'); 
  });

  it('should display the user\'s name, email, and bio', () => {
    cy.wait(() => {
      cy.get('.p-8 mt-24 bg-white shadow').should('be.visible');
    });

    cy.get('h1').contains('User Name');
    cy.get('p').contains('User Email');
    cy.get('p').contains('User Bio');
  });

  it('should display the user\'s products', () => {
    cy.wait(() => {
      cy.get('.ProductCardProfile').should('be.visible');
    });
    // ProductCardProfile element should be displayed and have a length of 1
    cy.get('.ProductCardProfile').should('have.length.at.least', 1);
  });
});
