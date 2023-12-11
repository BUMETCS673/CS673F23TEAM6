import React from 'react';
import { mount } from 'cypress/react';
import Navbar from '../../src/Components/Navbar';

describe('Navbar', () => {
    beforeEach(() => {
    const onCloseStub = cy.stub().as('onCloseStub');
    mount(
      <Router>
        <Navbar onClose={onCloseStub} />
      </Router>
    );
    });
  
    it('should perform search', () => {
        // Type a search query and submit the form
        cy.get('#default-search').type('Test');
        cy.get('form').submit();
    
        // Assert that the URL contains the search query
        cy.url().should('include', 'search=your%20search%20query');
    });
    
    it('should filter by category', () => {
        // Click on the "Categories" filter
        cy.contains('Filters').click();
        cy.contains('Categories').click();
    
        // Check a category checkbox
        cy.contains('Books').click();
    
        // Assert that the URL reflects the selected category
        cy.url().should('include', 'category=your_category_value');
    });
    
    it('should filter by location', () => {
        // Click on the "Filters" button
        cy.contains('Filters').click();
        cy.contains('Location').click();
        // Check a location checkbox
        cy.contains('Brighton').click();
        // Assert that the URL reflects the selected location
        cy.url().should('include', 'location=your_location_value');
    });

    it('should filter by price range', () => {
        cy.contains('Filters').click();
        // Move the price slider to select a range
        cy.get('[role="slider"]').first().invoke('val', 30).trigger('change');
        cy.wait(1000);
        // Assert that the URL reflects the selected price range
        cy.url().should('include', 'min_price=0&max_price=30');
    });
  });
  