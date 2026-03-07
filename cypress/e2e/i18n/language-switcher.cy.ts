describe('Language switcher', () => {
  it('supports French and Arabic locale switching', () => {
    cy.visit('/');
    const localeSelect = 'select[aria-label="Select language"]:visible';

    cy.get(localeSelect).first().select('fr');
    cy.contains('Créez des applications web modernes').should('be.visible');
    cy.contains('Accueil').should('be.visible');
    cy.get('div[dir="ltr"]').should('exist');

    cy.get(localeSelect).first().select('ar');
    cy.contains('ابنِ تطبيقات ويب حديثة').should('be.visible');
    cy.contains('الرئيسية').should('be.visible');
    cy.get('div[dir="rtl"]').should('exist');
  });
});
