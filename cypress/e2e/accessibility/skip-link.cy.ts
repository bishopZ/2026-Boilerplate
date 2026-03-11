describe('Skip link accessibility', () => {
  it('shows the skip link when the user presses Tab', () => {
    cy.visit('/');

    cy.get('body').click('topLeft');
    cy.press(Cypress.Keyboard.Keys.TAB);
    cy.focused()
      .should('have.attr', 'href', '#main-content')
      .and('be.visible');
  });
});
