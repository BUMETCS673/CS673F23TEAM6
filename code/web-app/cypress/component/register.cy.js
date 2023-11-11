import { describe, it } from 'cypress';

describe('Register component', () => {
    beforeEach(() => {
      cy.visit(`http://localhost:3000`); 
  });

  it('should display the register form', () => {

    cy.get('h2').contains('Create an Account!');

    cy.get('input[name="name"]').should('be.visible');
    cy.get('input[name="email"]').should('be.visible');
    cy.get('input[name="password"]').should('be.visible');

    cy.get('button').contains('Join');
  });

  it('should validate the register form', () => {
    cy.get('button').contains('Join').click();
    // Should display 3 invalid feilds
    cy.get('.invalid:visible').should('have.length', 3);
  });

  it('should register a new user', () => {

    // function handleSubmit(e) {
    //   e.preventDefault();

    //   // Check if the user's email address already exists in the database.
    //   const userExists = fetch('http://localhost:8000/users/exists', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ email: data.email }),
    //   });

    //   // If the user exists, display an error message and prevent the user from registering.
    //   if (userExists.status === 200) {
    //     alert('The email address you entered is already in use.');
    //     return;
    //   }

    //   // Otherwise, proceed with the registration process.
    //   try {
    //     setLoading(true);
    //     const registrationResponse = fetch('http://localhost:8000/register', {
    //       method: 'POST',
    //       headers: { 'Content-Type': 'application/json' },
    //       body: JSON.stringify(data),
    //     });

    //     // Wait for the registration response.
    //     const registrationData = await registrationResponse.json();

    //     // If the registration was successful, close the modal.
    //     if (registrationData.success) {
    //       onClose();
    //     }

    //     // Otherwise, display an error message.
    //     else {
    //       alert('Registration failed.');
    //     }

    //     setLoading(false);
    //   } catch (error) {
    //     console.log(error);
    //     setLoading(false);
    //   }
    // }
    cy.get('input[name="name"]').type('John Doe');
    cy.get('input[name="email"]').type('john.doe@example.com');
    cy.get('input[name="password"]').type('Password123');

    cy.get('button').contains('Join').click();

    cy.get('.alert-success').should('be.visible');
    cy.get('.alert-success').contains('Registration successful!');
  });

  it('Displays error message on registration with an existing user', () => {
    // Fill out the registration form with an existing user's email
    cy.get('[name="name"]').type('John Doe');
    cy.get('[name="email"]').type('existing.user@example.com'); // Use an existing user's email
    cy.get('[name="password"]').type('securePassword123');
    cy.get('button[type="submit"]').click();

    // Error message should be displayed for the existing user
    cy.contains('User with this email already exists').should('exist');
  });
  
});
