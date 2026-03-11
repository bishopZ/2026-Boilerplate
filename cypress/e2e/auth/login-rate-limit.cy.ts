const submitInvalidLogin = () => {
  cy.visit('/login');
  cy.get('input[name="username"]').type('wrong-user');
  cy.get('input[name="password"]').type('wrong-password');
  cy.get('form').submit();
};

const attemptUntilRateLimited = (remainingAttempts: number): void => {
  cy.intercept('POST', '/login/password').as('loginAttempt');
  submitInvalidLogin();
  cy.wait('@loginAttempt').then(({ response }) => {
    const statusCode = response?.statusCode;
    if (statusCode === 429) {
      return;
    }

    if (remainingAttempts <= 1) {
      throw new Error('Expected login to be rate limited within the configured attempt window.');
    }

    cy.location('pathname').should('eq', '/login');
    attemptUntilRateLimited(remainingAttempts - 1);
  });
};

describe('Login rate limiting', () => {
  it('blocks repeated failed login attempts', () => {
    // Bounded retry keeps this resilient if limits are tuned.
    attemptUntilRateLimited(10);
    cy.location('pathname').should('eq', '/login/password');
    cy.contains('Too many login attempts. Please try again later.').should('be.visible');
  });
});
