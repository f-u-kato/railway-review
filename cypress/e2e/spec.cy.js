/*eslint no-undef:0 */
describe('ログイン画面のブラウザテスト', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login')
  })

  it('入力フォームテスト', () => {
    //email未入力
    cy.get('#email').clear()
    cy.get('#password').clear().type('password')
    cy.get('#submit').click()
    cy.get('#email-error').should('be.visible')
    cy.get('#password-error').should('not.be.visible')

    //email書式
    cy.get('#email').clear().type('invalid-email')
    cy.get('#password').clear().type('password')
    cy.get('#submit').click()
    cy.get('#email-error').should('be.visible')
    cy.get('#password-error').should('not.be.visible')

    //正常
    cy.get('#email').clear().type('valid-email@example.com')
    cy.get('#password').clear().type('password')
    cy.get('#submit').click()
    cy.get('#email-error').should('not.be.visible')
    cy.get('#password-error').should('not.be.visible')

    //パスワード未入力
    cy.get('#email').clear().type('valid-email@example.com')
    cy.get('#password').clear()
    cy.get('#submit').click()
    cy.get('#email-error').should('not.be.visible')
    cy.get('#password-error').should('be.visible')

    //両方未入力
    cy.get('#email').clear()
    cy.get('#password').clear()
    cy.get('#submit').click()
    cy.get('#email-error').should('be.visible')
    cy.get('#password-error').should('be.visible')
  })
})
