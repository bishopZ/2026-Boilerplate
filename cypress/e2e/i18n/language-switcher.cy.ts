describe('Language switcher', () => {
  it('supports Chinese, French, and Arabic locale switching', () => {
    cy.visit('/');
    const localeSelect = 'select[aria-label="Select language"]:visible';

    const readHeading = () => cy.get('main h1').first().invoke('text').then((text) => text.trim());

    cy.get(localeSelect).first().select('en');
    cy.get(localeSelect).first().should('have.value', 'en');

    readHeading().then((englishHeading) => {
      expect(englishHeading.length).to.be.greaterThan(0);

      cy.get(localeSelect).first().select('zh');
      cy.get(localeSelect).first().should('have.value', 'zh');
      cy.get('div[dir="ltr"]').should('exist');
      readHeading().then((chineseHeading) => {
        expect(chineseHeading.length).to.be.greaterThan(0);
        expect(chineseHeading).not.to.equal(englishHeading);
      });

      cy.get(localeSelect).first().select('fr');
      cy.get(localeSelect).first().should('have.value', 'fr');
      cy.get('div[dir="ltr"]').should('exist');
      readHeading().then((frenchHeading) => {
        expect(frenchHeading.length).to.be.greaterThan(0);
        expect(frenchHeading).not.to.equal(englishHeading);
      });

      cy.get(localeSelect).first().select('ar');
      cy.get(localeSelect).first().should('have.value', 'ar');
      cy.get('div[dir="rtl"]').should('exist');
      readHeading().then((arabicHeading) => {
        expect(arabicHeading.length).to.be.greaterThan(0);
        expect(arabicHeading).not.to.equal(englishHeading);
      });
    });
  });
});
