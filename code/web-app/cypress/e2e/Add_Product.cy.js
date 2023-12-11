
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

      cy.contains('Create').click();
      cy.get('input[placeholder="Enter title of your product"]').type('Test');
      cy.get('textarea[placeholder="Enter description of your product"]').type('This is a test product.');
      cy.get('input[placeholder="Enter price of your product"]').type('20');
    
      // Select category and location
      cy.get('label:contains("Select category")').click();
      cy.get('div[role="listbox"]').contains('Books').click();
      cy.get('label:contains("Select location")').click();
      cy.get('div[role="listbox"]').contains('Brighton').click();
    
      cy.get('button:contains("Publish")').click();
      cy.wait(2000)//wait for form submission
      cy.url().should('not.contain', '/addProduct');
  
      // Type a search query again and submit the form
      cy.get('#default-search').type('Test');
      cy.get('form').submit();
      cy.get('.ProductCard').should('be.visible');
    
      cy.get('button[data-cy=logout-button]').click();
      cy.url().should('include', '/Login');
    });
});