const expectRedirect = (fromPath: string, toPath: string) => {
  cy.visit(fromPath);
  cy.location('pathname').should('eq', toPath);
  cy.get('main h1').should('be.visible');
};

describe('Legacy redirects', () => {
  it('redirects old policy URLs to current routes', () => {
    expectRedirect('/privacy', '/policies');
    expectRedirect('/terms', '/policies');
  });
});
