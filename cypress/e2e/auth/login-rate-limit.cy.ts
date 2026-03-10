const submitInvalidLogin = () => {
  cy.visit('/login');
  cy.get('input[name="username"]').type('wrong-user');
  cy.get('input[name="password"]').type('wrong-password');
  cy.get('form').submit();
};

const attemptUntilRateLimited = (remainingAttempts: number): void => {
  submitInvalidLogin();
  cy.url().then((url) => {
    if (url.includes('/login/password')) {
      return;
    }

    if (remainingAttempts <= 1) {
      throw new Error('Expected login to be rate limited within the configured attempt window.');
    }

    attemptUntilRateLimited(remainingAttempts - 1);
  });
};

describe('Login rate limiting', () => {
  it('blocks repeated failed login attempts', () => {
    // Use a bounded retry loop so the test remains stable
    // even if previous tests already consumed some failed attempts.
    attemptUntilRateLimited(6);
    cy.url().should('include', '/login/password');
    cy.contains('Too many login attempts. Please try again later.').should('be.visible');
  });
});
