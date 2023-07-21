import { absoluteRoot, without } from '../../src'

beforeEach(() => {
  cy.visit('cypress/fixtures/index.html')
})

describe('absoluteRoot', () => {
  it('returns absolute root regardless of call context', () => {
    cy.document().then(({ documentElement }) => {
      absoluteRoot().should($root => expect($root[0]).to.equal(documentElement))
      cy.get('#first').within(() => {
        absoluteRoot().should($root => expect($root[0]).to.equal(documentElement))
      })
    })
  })
})

describe('without', () => {
  it('breaks out of a `within`', () => {
    cy.get('#first').within(() => {
      // only select the link inside the paragraph
      cy.get('a')
        .should('have.lengthOf', 1)
        .and('have.text', 'first link')

      // select all links inside a `without`
      without($root => {
        cy.document().should(({ documentElement }) => expect($root[0]).to.equal(documentElement))
        cy.get('a')
          .should('have.lengthOf', 2)
          .eq(1)
          .should('have.text', 'second link')
      })

      // continue correctly `within` the previous container (select just the one link again)
      cy.get('a').should('have.lengthOf', 1)
    })
  })

  it('works outside of a `within` (but does nothing interesting)', () => {
    without($absoluteRoot => {
      cy.root().should($localRoot => expect($absoluteRoot[0]).to.equal($localRoot[0]))
      cy.get('a')
        .should('have.lengthOf', 2)
        .eq(1)
        .should('have.text', 'second link')
    })
  })
})
