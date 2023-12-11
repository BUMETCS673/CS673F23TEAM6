import React from 'react';
import { mount } from 'cypress/react';
import AddProductForm from '../../src/Components/AddProductForm';


describe('Product Form Test', () => {
  beforeEach(() => {
    const onCloseStub = cy.stub().as('onCloseStub');

    mount(
      <Router>
        <AddProductForm onClose={onCloseStub} />
      </Router>
    );
});

it('should display upload image section', () => {
  cy.get('.relative.mb-5.5').should('be.visible');
  cy.get('.relative.mb-5.5').should('contain', 'Click to select images');
});

it('should allow image selection and upload', () => {
  cy.get('#img-upload').attachFile('downloads/test.jpg');
  cy.get('.py-2.text-sm.text-gray-500').should('contain', 'image.jpg');
  cy.get('.p-2.rounded-md').click();
  cy.wait(2000); // wait for upload
  cy.get('.flex.flex-wrap.items-start.justify-start.gap-2.py-2 img').should('be.visible');
});

it('should allow removing uploaded images', () => {
  cy.get('#img-upload').attachFile('cypress/fixtures/image.jpg');
  cy.get('.p-2.rounded-md').click();
  cy.wait(2000);
  cy.get('.flex.flex-wrap.items-start.justify-start.gap-2.py-2 button').click();
  cy.get('.flex.flex-wrap.items-start.justify-start.gap-2.py-2 img').should('not.exist');
});

it('should display an error message if the form is submitted with missing fields', () => {
  // Submit the form without filling in required fields
  cy.get('button:contains("Publish")').click();

  cy.contains('Title is required').should('exist');
  cy.contains('Description is required').should('exist');
  cy.contains('Price is required').should('exist');
});

it('should allow submitting the form with valid data', () => {
  cy.get('input[placeholder="Enter title of your product"]').type('Test Product');
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
});
});
  