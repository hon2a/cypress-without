# cypress-without

`without` command for Cypress (https://www.cypress.io) for breaking out of a `within` inside custom commands

## Use

### `without`

Either import and use the command directly as a plain function:

```javascript
import { without } from '@hon2a/cypress-without'

cy.get('.some-container').within(() => {
  // ... find elements inside the container only
  without(() => {
    // ... find elements anywhere (e.g. drop-downs rendered through portals)
  })
  // ... find more elements just inside the container
})
```

Or register the command with Cypress and chain it off `cy`:

```javascript
import '@hon2a/cypress-without/lib/register' // best done just once in your support script

cy.get('.some-container').within(() => {
  // ... find elements inside the container only
  cy.without(() => {
    // ... find elements anywhere (e.g. drop-downs rendered through portals)
  })
  // ... find more elements just inside the container
})
```

Provide `{ log: false }` as the second argument to mute the log output.

### `absoluteRoot`

If you need to chain off the document root rather than perform a one-off action
on it, use `absoluteRoot` to get the root.

```javascript
import { absoluteRoot } from '@hon2a/cypress-without'

export const getActiveModal = () => absoluteRoot().find('.some-modal:visible')
```

This helper also gets registered as Cypress command when importing `…/register` (see above).

## Development

### Install

Install dependencies using:

```sh
npm install
```

### Develop

After you modify sources, run the following (or set up your IDE to do it for you):

- format the code using `npm run format`
- lint it using `npm run lint`
- test it using `npm test`

and fix the errors, if there are any.

### Publish

Publishing is done in two steps:

1. Create a new version tag and push it to the repository:
    ```sh
    npm version <patch|minor|major>
    git push --follow-tags
    ```
1. Build and publish the new version as a npm package:
    ```sh
    npm publish --access public
    ``` 
