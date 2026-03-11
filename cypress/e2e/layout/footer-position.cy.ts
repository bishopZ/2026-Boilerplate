describe('Footer layout', () => {
  it('keeps footer at viewport bottom on short pages', () => {
    cy.visit('/login');

    cy.window().its('innerHeight').then((viewportHeight) => {
      cy.get('footer').should('be.visible').then(($footer) => {
        const { bottom } = $footer[0].getBoundingClientRect();
        expect(Math.abs(bottom - viewportHeight)).to.be.lessThan(2);
      });
    });
  });
});
