describe('Blog app', function() {
  beforeEach(function() {
    cy.visit('')
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'Joe Crown',
      username: 'daedalus',
      password: 'secretito'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)

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

  it('login fails with wrong password', function() {
    cy.contains('login').click()
    cy.get('#username').type('daedalus')
    cy.get('#password').type('malito')
    cy.get('#login-button').click()

    cy.get('.error').contains('Wrong username or password')
    cy.get('html').should('not.contain', 'Joe Crown logged in')
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'daedalus', password: 'secretito' })

      // cy.contains('login').click()
      // cy.get('#username').type('daedalus')
      // cy.get('#password').type('secretito')
      // cy.get('#login-button').click()

    })

    it('a new blog can be created', function() {
      cy.contains('create a new blog').click()
      cy.get('#title').type('Cypress chad')
      cy.get('#author').type('Juan Alberto')
      cy.get('#url').type('www.illojuan.com')
      cy.get('#create-blog-button').click()

      cy.contains('Cypress chad')
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Another one bites the dust',
          author: 'Freddie Mercurio',
          url: 'www.killerqueen.com'
        })
      })


    })

  })
})