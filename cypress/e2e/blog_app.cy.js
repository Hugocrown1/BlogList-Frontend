describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Joe Crown',
      username: 'daedalus',
      password: 'secretito'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
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

    cy.contains('Joe Crown logged in')
  })

  it.only('login fails with wrong password', function() {
    cy.contains('login').click()
    cy.get('#username').type('daedalus')
    cy.get('#password').type('malito')
    cy.get('#login-button').click()

    cy.get('.error').contains('Wrong username or password')
    cy.get('html').should('not.contain', 'Joe Crown logged in')
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.contains('login').click()
      cy.get('input:first').type('daedalus')
      cy.get('input:last').type('secretito')
      cy.get('#login-button').click()
    })

    it('a new blog can be created', function() {
      cy.contains('create a new blog').click()
      cy.get('#title').type('Cypress chad')
      cy.get('#author').type('Juan Alberto')
      cy.get('#url').type('www.illojuan.com')
      cy.get('#create-blog-button').click()

      cy.contains('Cypress chad')
    })
  })
})