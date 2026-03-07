describe('Login', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('redirects to /product on successful login with test/test', () => {
    cy.get('input[name="username"]').type('test');
    cy.get('input[name="password"]').type('test');
    cy.get('form').submit();

    cy.url().should('include', '/product');
  });

  it('redirects back to /login on failed login', () => {
    cy.get('input[name="username"]').type('wrong');
    cy.get('input[name="password"]').type('wrong');
    cy.get('form').submit();

    cy.url().should('include', '/login');
  });
});
