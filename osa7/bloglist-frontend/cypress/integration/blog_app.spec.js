describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Taneli Nyyssölä',
      username: 'tannyy',
      password: 'salasana'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })
  it('Login form is shown', function () {
    cy.contains('Log in')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#login').click()
      cy.get('#username').type('tannyy')
      cy.get('#password').type('salasana')
      cy.get('#loginButton').click()

      cy.get('.notification').contains('successfully logged in as')
    })
    it('fails with incorrect credentials', function () {
      cy.get('#login').click()
      cy.get('#username').type('tannyy')
      cy.get('#password').type('salainen')
      cy.get('#loginButton').click()

      cy.get('.notification').contains('wrong username or password')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'tannyy', password: 'salasana' })
    })
    it('a new blog can be created', function () {
      cy.get('#openBlog').click()
      cy.get('#title').type('test blog')
      cy.get('#author').type('test author')
      cy.get('#url').type('test url')
      cy.get('#submitBlog').click()

      cy.get('#blogList').contains('test blog test author')
    })
    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'test title',
          author: 'test author',
          url: 'test url'
        })
      })
      it('a blog can be liked', function () {
        cy.get('#viewButton').click()
        cy.get('#likeButton').click()
      })
      it.only('a blog can be removed', function () {
        cy.get('#viewButton').click()
        cy.get('#removeButton').click()

        cy.get('html').should('not.contain', 'test title test author')
      })
    })
  })
})