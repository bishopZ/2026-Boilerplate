describe('Page meta tags', () => {
  const expectCanonicalPath = (path: string) => {
    cy.location('origin').then((origin) => {
      cy.get('link[rel="canonical"]').should('have.attr', 'href', `${origin}${path}`);
    });
  };

  const expectDescriptionToExist = () => {
    cy.get('meta[name="description"]')
      .invoke('attr', 'content')
      .should('be.a', 'string')
      .and('not.be.empty');
  };

  it('sets core metadata contract on key public pages', () => {
    cy.visit('/about');

    cy.title().should('eq', 'About - 2026 Boilerplate');
    expectDescriptionToExist();
    expectCanonicalPath('/about');

    cy.visit('/privacy');
    cy.location('pathname').should('eq', '/policies');

    cy.title().should('eq', 'Policy Writing Guide - 2026 Boilerplate');
    expectDescriptionToExist();

    cy.visit('/terms');
    cy.location('pathname').should('eq', '/policies');
    cy.title().should('eq', 'Policy Writing Guide - 2026 Boilerplate');
    expectDescriptionToExist();

    cy.visit('/policies');
    expectCanonicalPath('/policies');
  });
});
