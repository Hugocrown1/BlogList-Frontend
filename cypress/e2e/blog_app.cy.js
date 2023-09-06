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

  // excercise 5.17
  it('login form can be opened', function() {
    cy.contains('login').click()
    cy.get('#username').type('daedalus')
    cy.get('#password').type('secretito')
    cy.get('#login-button').click()

    cy.contains('Joe Crown logged in')
  })

  // excercise 5.18
  it('login fails with wrong password', function() {
    cy.contains('login').click()
    cy.get('#username').type('daedalus')
    cy.get('#password').type('malito')
    cy.get('#login-button').click()

    cy.get('.error').contains('Wrong username or password')
    cy.get('.error').should('have.css', 'color' ,'rgb(255, 0, 0)')
    cy.get('.error').should('have.css', 'border-style', 'solid')
    cy.get('html').should('not.contain', 'Joe Crown logged in')
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'daedalus', password: 'secretito' })

    })

    // exercise 5.19
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

      // exercise 5.20
      it('a blog can be liked', function() {
        cy.contains('Another one bites the dust').contains('view').click()
        cy.contains('likes 0').contains('like').click()
        cy.contains('likes 1')
      })

      // exercise 5.21
      it('a blog can be deleted', function() {
        cy.contains('Another one bites the dust').contains('view').click()
        cy.get('.removeBlogButton').click()
        cy.wait(1000)

        cy.get('.blogComponent').should('not.exist')

      })

      describe('and another user logs in', function () {
        beforeEach(function () {
          const user = {
            name: 'Virgilio Sparda',
            username: 'edgepapis',
            password: 'yamato'
          }
          cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
          cy.login({ username: 'edgepapis', password: 'yamato' })
          cy.visit('')
        })

        // exercise 5.22
        it('a blog from another user cannot be deleted', function() {
          cy.contains('Another one bites the dust').contains('view').click()
          cy.get('.removeBlogButton').should('not.exist')
        })

        // exercise 5.23
        it('blogs are sorted by number of likes', function() {
          cy.createBlog({
            title: 'Devil May Cry',
            author: 'Dante Sparda',
            url: 'www.dmc.com'
          })
          cy.visit('')
          cy.get('.blogComponent').eq(0).should('contain', 'Another one bites the dust')
          cy.get('.blogComponent').eq(1).should('contain', 'Devil May Cry')

          cy.contains('Devil May Cry').contains('view').click()

          cy.contains('Devil May Cry by Dante Sparda').parent().contains('like').click()

          cy.visit('')
          cy.get('.blogComponent').eq(0).should('contain', 'Devil May Cry')
          cy.get('.blogComponent').eq(1).should('contain', 'Another one bites the dust')


        })

      })


    })

  })
})