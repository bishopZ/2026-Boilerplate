const DEFAULT_USERNAME = 'test';
const DEFAULT_PASSWORD = 'test';

const getLoginCredentials = () => {
  const username = Cypress.env('TEST_USERNAME');
  const password = Cypress.env('TEST_PASSWORD');

  return {
    username: typeof username === 'string' ? username : DEFAULT_USERNAME,
    password: typeof password === 'string' ? password : DEFAULT_PASSWORD,
  };
};

const submitLogin = (username: string, password: string) => {
  cy.get('input[name="username"]').clear().type(username);
  cy.get('input[name="password"]').clear().type(password);
  cy.get('form').submit();
};

describe('Login', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('redirects to the product route on successful login', () => {
    const { username, password } = getLoginCredentials();
    submitLogin(username, password);
    cy.location('pathname').should('eq', '/product');
  });

  it('redirects back to /login on failed login', () => {
    submitLogin('invalid-user', 'wrong-password');
    cy.location('pathname').should('eq', '/login');
  });
});
