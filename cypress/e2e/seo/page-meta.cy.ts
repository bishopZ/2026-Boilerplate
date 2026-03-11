describe('Page meta tags', () => {
  const expectCanonicalPath = (path: string) => {
    cy.location('origin').then((origin) => {
      cy.get('link[rel="canonical"]').should('have.attr', 'href', `${origin}${path}`);
    });
  };

  it('updates shared metadata fields for each page', () => {
    cy.visit('/about');

    cy.title().should('eq', 'About - 2026 Boilerplate');
    cy.get('meta[name="description"]').should('have.attr', 'content', 'Learn how the 2026 Boilerplate organizes architecture, documentation, testing, and release workflows.');
    cy.get('meta[property="og:title"]').should('have.attr', 'content', 'About - 2026 Boilerplate');
    cy.get('meta[property="og:description"]').should('have.attr', 'content', 'Learn how the 2026 Boilerplate organizes architecture, documentation, testing, and release workflows.');
    cy.get('meta[name="twitter:title"]').should('have.attr', 'content', 'About - 2026 Boilerplate');
    cy.get('meta[name="twitter:description"]').should('have.attr', 'content', 'Learn how the 2026 Boilerplate organizes architecture, documentation, testing, and release workflows.');
    cy.get('meta[name="apple-mobile-web-app-title"]').should('have.attr', 'content', 'About - 2026 Boilerplate');
    expectCanonicalPath('/about');

    cy.visit('/policies');
    cy.contains('h1', 'Policy Writing Guide').should('be.visible');

    cy.title().should('eq', 'Policy Writing Guide - 2026 Boilerplate');
    cy.get('meta[name="description"]').should('have.attr', 'content', 'How to create your own Terms of Service and Privacy Policy for this project.');
    cy.get('meta[property="og:title"]').should('have.attr', 'content', 'Policy Writing Guide - 2026 Boilerplate');
    cy.get('meta[name="twitter:title"]').should('have.attr', 'content', 'Policy Writing Guide - 2026 Boilerplate');
    expectCanonicalPath('/policies');

    cy.visit('/privacy');
    cy.location('pathname').should('eq', '/policies');

    cy.visit('/terms');
    cy.location('pathname').should('eq', '/policies');
  });
});
