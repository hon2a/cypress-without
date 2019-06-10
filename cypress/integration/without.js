describe('without', () => {
  beforeEach(() => {
    cy.visit('cypress/fixtures/index.html')
  })

  it('breaks out of a `within`', () => {
    cy.get('#first').within(() => {
      cy.get('a')
        .should('have.lengthOf', 1)
        .and('have.text', 'first link')
      cy.without($root => {
        cy.document().should(({ documentElement }) => expect($root[0]).to.equal(documentElement))
        cy.get('a')
          .should('have.lengthOf', 2)
          .eq(1)
          .should('have.text', 'second link')
      })
    })
  })

  it('works outside of a `within` (but does nothing interesting)', () => {
    cy.without($absoluteRoot => {
      cy.root().should($localRoot => expect($absoluteRoot[0]).to.equal($localRoot[0]))
      cy.get('a')
        .should('have.lengthOf', 2)
        .eq(1)
        .should('have.text', 'second link')
    })
  })
})
