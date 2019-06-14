export const without = (callback, { log: shouldLog = true, ...options } = {}) => {
  const internalOptions = { ...options, log: false }
  const log = message => () => shouldLog && Cypress.log({ name: 'without', message })
  cy.wrap(undefined, { log: false })
    .then(log('START'))
    .then(() => cy.document(internalOptions))
    .then(({ documentElement }) => documentElement)
    .within(internalOptions, callback)
    .then(log('END'))
}
