const expectRedirect = (fromPath: string, toPath: string, expectedHeading: string) => {
  cy.visit(fromPath);
  cy.location('pathname').should('eq', toPath);
  cy.contains('h1', expectedHeading).should('be.visible');
};

describe('Legacy redirects', () => {
  it('redirects old policy URLs to current routes', () => {
    expectRedirect('/privacy-policy', '/privacy', 'Privacy Policy');
    expectRedirect('/terms-of-service', '/terms', 'Terms of Service');
  });
});
