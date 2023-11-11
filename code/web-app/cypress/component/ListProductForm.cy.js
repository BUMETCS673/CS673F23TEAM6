import { describe, it } from 'cypress';

describe('Product Form Tests', () => {
    beforeEach(() => {
            cy.visit('http://localhost:3000/Marketplace'); 
    });
  
    it('should fill out and submit the form successfully', () => {
      cy.get('input[placeholder="Enter title of your product"]').type('Test Product');
      cy.get('textarea[placeholder="Enter description of your product"]').type('This is a test product.');
      cy.get('input[placeholder="Enter price of your product"]').type('20');
  
      // Upload a test image test-img.jpg
      cy.get('input[type="file"]').attachFile('test-image.jpg');
      cy.get('button:contains("Publish")').click();
      cy.url().should('not.contain', 'products'); // Assuming submission redirects to a different URL
      cy.contains('Test Product').should('exist'); // Check if the product is displayed on the page
    });
  
    it('should display an error message if the form is submitted with missing fields', () => {
      // Submit the form without filling in required fields
      cy.get('button:contains("Publish")').click();

      cy.contains('Title is required').should('exist');
      cy.contains('Description is required').should('exist');
      cy.contains('Price is required').should('exist');
    });

});
  