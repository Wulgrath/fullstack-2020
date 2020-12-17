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

        cy.get('#viewButton').click()
        cy.get('#showLikes').contains(1)
      })
      it('a blog can be removed', function () {
        cy.get('#viewButton').click()
        cy.get('#removeButton').click()

        cy.get('html').should('not.contain', 'test title test author')
      })
    })
    describe('and multiple blogs exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'test title',
          author: 'test author',
          url: 'test url',
          likes: 10
        })
        cy.createBlog({
          title: 'test title2',
          author: 'test author2',
          url: 'test url2',
          likes: 200
        })
        cy.createBlog({
          title: 'test title3',
          author: 'test author3',
          url: 'test url3',
          likes: 100
        })
      })
      it('the blogs are arranged, one with the most first', function () {
        cy.get('#viewButton').click()
        cy.get('#viewButton').click()
        cy.get('#viewButton').click()

        cy.get('.openBlogs').then (blogs => {
          expect(blogs[0]).to.contain.text(200)
          expect(blogs[1]).to.contain.text(100)
          expect(blogs[2]).to.contain.text(10)
        })
      })
    })
  })
})