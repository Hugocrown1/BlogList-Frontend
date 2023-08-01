describe('Blog app', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3000')
  })
  it('front page can be opened', function() {
    cy.contains('blogs')
  })

  it('login form can be opened', function() {
    cy.contains('login').click()
    cy.get('#username').type('daedalus')
    cy.get('#password').type('secretito')
    cy.get('#login-button').click()

    cy.contains('Jon logged in')
  })
})