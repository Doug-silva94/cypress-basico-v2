/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function() {
        cy.visit('src/index.html')
    })

    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia os formulários', function() {
        const longText = 'Teste, Teste, Teste, Teste, Teste, Teste'
        
        cy.get('#firstName').type('Mike')
        cy.get('#lastName').type('Baguncinha')
        cy.get('#email').type('mikebaguncinha@email.com')
        cy.get('#open-text-area').type(longText, {delay:0})
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')
    })

    it('exibe mensagem de erro ao submeter formulário com um email com formatação inválida', function() {
        cy.get('#firstName').type('Mike')
        cy.get('#lastName').type('Baguncinha')
        cy.get('#email').type('mikebaguncinha@email,com')
        cy.get('#open-text-area').type('Teste')
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })

    it('campo telefone continua vazio quando preenchido com valor não-numérico', function(){
        cy.get('#firstName').type('Mike')
        cy.get('#lastName').type('Baguncinha')
        cy.get('#email').type('mikebaguncinha@email.com')
        cy.get('#phone')
          .type('aaaaaaaaaa')
          .should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório, mas não é preenchido', function() {
        cy.get('#firstName').type('Mike')
        cy.get('#lastName').type('Baguncinha')
        cy.get('#email').type('mikebaguncinha@email.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('Teste')
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos', function() {
        cy.get('#firstName')
          .type('Mike')
          .should('have.value', 'Mike')
          .clear()
          .should('have.value', '')
        cy.get('#lastName')
          .type('Baguncinha')
          .should('have.value', 'Baguncinha')
          .clear()
          .should('have.value', '')
        cy.get('#phone')
          .type('21999999999')
          .should('have.value', '21999999999')
          .clear()
          .should('have.value', '')
    })

    it('exibe erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    it('envia o formulário com sucesso usando um comando customizado', function() {
        cy.fillMandatoryFieldsAndSubmit()
    })

    it('seleciona um produto (Youtube) por seu texto', function() {
        cy.get('#product')
          .select('YouTube')
          .should('have.value', 'youtube')
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function() {
        cy.get('#product')
          .select('mentoria')
          .should('have.value', 'mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', function() {
        cy.get('#product')
          .select(1)
          .should('have.value', 'blog')
    })

    it('marca o tipo de atendimento "Feedback"', function() {
        cy.get('input[type="radio"][value="feedback"]')
          .check()
          .should('have.value', 'feedback')
    })

    it('marca cada tipo de atendimento', function() {
        cy.get('input[type="radio"]')
          .should('have.length', 3)
          .each(function($radio) {
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
          })
    })

})
