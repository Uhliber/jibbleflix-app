describe('JibbleFlix App', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/movies/search/**').as('fetchMovies')
    cy.visit('/')
    cy.wait('@fetchMovies')
  })

  it('should load the homepage and display movies', () => {
    cy.contains('h1', 'Binge the Jibble Way')
    cy.get('[data-cy="movie-item"]').should('have.length.at.least', 1)
  })

  it('should search for a movie and show results', () => {
    cy.get('input[placeholder="Search Movie by Title"]').as('search')

    cy.get('@search').clear()
    cy.get('@search').type('Batman')

    cy.wait('@fetchMovies')

    cy.get('[data-cy="movie-item"]').first().should('contain.text', 'Batman')
  })

  it('should paginate through movie results', () => {
    cy.get('[data-cy="pagination-next"]').click()

    cy.wait('@fetchMovies').its('request.url').should('include', 'page=2')

    cy.get('[data-cy="pagination-page"][aria-current="true"]').should('contain.text', '2')
  })

  it('should toggle a movie as favorite and see it under Favorites tab', () => {
    cy.get('[data-cy="favorite-button"]').first().click()

    cy.contains('[role="button"][data-cy="tab-desktop"]', 'Favorites').click()

    cy.get('[data-cy="movie-item"]').should('have.length.at.least', 1)
  })

  it('should switch back to Movies tab', () => {
    cy.contains('[role="button"][data-cy="tab-desktop"]', 'Movies').click()

    cy.get('[data-cy="movie-item"]').should('exist')
  })
})
