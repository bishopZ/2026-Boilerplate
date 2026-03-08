describe('Page meta tags', () => {
  it('updates shared metadata fields for each page', () => {
    cy.visit('/about');

    cy.title().should('eq', 'About - 2026 Boilerplate');
    cy.get('meta[name="description"]').should('have.attr', 'content', 'Learn how the 2026 Boilerplate organizes architecture, documentation, testing, and release workflows.');
    cy.get('meta[property="og:title"]').should('have.attr', 'content', 'About - 2026 Boilerplate');
    cy.get('meta[property="og:description"]').should('have.attr', 'content', 'Learn how the 2026 Boilerplate organizes architecture, documentation, testing, and release workflows.');
    cy.get('meta[name="twitter:title"]').should('have.attr', 'content', 'About - 2026 Boilerplate');
    cy.get('meta[name="twitter:description"]').should('have.attr', 'content', 'Learn how the 2026 Boilerplate organizes architecture, documentation, testing, and release workflows.');
    cy.get('meta[name="apple-mobile-web-app-title"]').should('have.attr', 'content', 'About - 2026 Boilerplate');
    cy.get('link[rel="canonical"]').should('have.attr', 'href', 'http://localhost:3000/about');

    cy.visit('/privacy');

    cy.title().should('eq', 'Privacy Policy - 2026 Boilerplate');
    cy.get('meta[name="description"]').should('have.attr', 'content', 'Privacy policy for the 2026 Boilerplate application');
    cy.get('meta[property="og:title"]').should('have.attr', 'content', 'Privacy Policy - 2026 Boilerplate');
    cy.get('meta[name="twitter:title"]').should('have.attr', 'content', 'Privacy Policy - 2026 Boilerplate');
    cy.get('link[rel="canonical"]').should('have.attr', 'href', 'http://localhost:3000/privacy');
  });
});
