Cypress._.times(3, function() {
  it('acessa a página política de privacidade de forma independente', function() {
    cy.visit('src/privacy.html')
    cy.contains('Talking About Testing').should('be.visible')
  })
})