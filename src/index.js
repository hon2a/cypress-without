export const without = (callback, options) =>
  cy
    .document(options)
    .its('documentElement')
    .within(callback, options)
