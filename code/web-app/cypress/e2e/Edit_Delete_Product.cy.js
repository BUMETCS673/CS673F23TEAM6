import '../support/commands'


describe('Edit and delete product', () => {
  beforeEach(() => {
    const onCloseStub = cy.stub().as('onCloseStub');
      // Visit the login page
      cy.visit('http://localhost:3000');
      cy.contains('Log-in').click()
  });
  it('should successfully log in, Edit Product and log out', () => {

    // test user credentials
    const email = 'nidhi@gmail.com';
    const password = 'Nidhi@CollegeStreet673';

    // Login
    cy.get('[data-cy=login-email]').type(email);
    cy.get('#password').type(password);
    cy.get('button[type=submit]').click();
  
    // Verify that the user is redirected to the marketplace page
    cy.url().should('include', '/marketplace');
      
    // Type a search query and submit the form
    cy.get('#default-search').type('Test');
    cy.get('form').submit();
    cy.get('.ProductCard').should('be.visible');
    cy.get('svg[data-testid="edit-icon"]').click();

    //Edit Product
    cy.get('.modal-content').should('be.visible');
    cy.get('.modal-content h1').should('contain', 'Edit Product');
    cy.get('.edit-product-button').click();
    cy.get('.modal').should('be.visible');
    cy.get('h1').contains('Product Title');
    const newTitle = 'New Test';
    cy.get('@modalContent').find('input[name="productTitle"]').clear().type(newTitle);
  
    // Save the changes
    cy.get('@modalContent').find('.save-product-button').click();
    // Verify that the updated title is displayed on the product page
    cy.get('h1').should('contain', newTitle);
    cy.get('button[data-cy=logout-button]').click();
    cy.url().should('include', '/login');
  });
      
  it('should successfully log in, Delete Product and log out', () => {
    
    // test user credentials
    const email = 'nidhi@gmail.com';
    const password = 'Nidhi@CollegeStreet673';

    // Login
    cy.get('[data-cy=login-email]').type(email);
    cy.get('#password').type(password);
    cy.get('button[type=submit]').click();

    // Verify that the user is redirected to the marketplace page
    cy.url().should('include', '/marketplace');
    // Type a search query and submit the form
    cy.get('#default-search').type('New Test');
    cy.get('form').submit();
    cy.get('.ProductCard').should('be.visible').click();

    cy.get('button').contains('Delete').click();
    cy.get('.modal-content').should('be.visible');
    cy.get('.modal-content').contains('Are you sure you wish to delete this item?');
    cy.get('button').contains('Yes').click();

    cy.get('.modal-content').should('not.be.visible');
    cy.get('h1').contains('Product Title');
    // Verify that the user is redirected to the marketplace page
    cy.url().should('include', '/marketplace');
  
    // Type a search query again and submit the form
    cy.get('#default-search').type('New Test');
    cy.get('form').submit();
    cy.get('.ProductCard').should('not.be.visible');

    cy.get('button[data-cy=logout-button]').click();
    cy.url().should('include', '/login');
  });
  });
  