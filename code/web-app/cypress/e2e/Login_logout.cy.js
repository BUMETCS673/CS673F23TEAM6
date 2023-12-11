import '../support/commands'


describe('Login and Logout', () => {
  beforeEach(() => {
    const onCloseStub = cy.stub().as('onCloseStub');
      // Visit the login page
      cy.visit('http://localhost:3000');
      cy.contains('Log-in').click()
  });
  it('should successfully log in and log out', () => {

    // test user credentials
    const email = 'nidhi@gmail.com';
    const password = 'Nidhi@CollegeStreet673';

    // Login
    cy.get('[data-cy=login-email]').type(email);
    cy.get('#password').type(password);
    cy.get('button[type=submit]').click();
  
    // Verify that the user is redirected to the marketplace page
    cy.url().should('include', '/marketplace');
  
    cy.get('button[data-cy=logout-button]').click();
    cy.url().should('include', '/login');
  });
      
  it('should navigate to the forgot password page when the link is clicked', () => {
    
    cy.get('.forgot-password-link').click();
    cy.url().should('include', '/forgot-password'); // Check if the URL changes to forgot password page
  });
  });
  