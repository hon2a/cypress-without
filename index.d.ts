import * as Cypress from 'cypress'

export function absoluteRoot(options?: Partial<Cypress.Loggable & Cypress.Timeoutable>): Cypress.Chainable<JQuery>

export function without(callback: (JQuery) => void, options?: Partial<Cypress.Loggable & Cypress.Timeoutable>): Cypress.Chainable<JQuery>
