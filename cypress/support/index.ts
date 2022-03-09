// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select input by its label.
       * @example cy.getInputByLabel('Name')
       */
      getInputByLabel(label: string): Chainable<Element>;

      /**
       * Custom command to select list box by its label.
       * @example cy.getSelectByLabel('Gender')
       */
      getSelectByLabel(label: string): Chainable<Element>;

      /**
       * Custom command to choose element from list box
       * @param text
       * @example cy.getSelectByLabel('Gender').choose('Male')
       */
      choose(text: string, options?: Partial<TypeOptions>): Chainable<Element>;

      /**
       * Custom command to clear list box
       * @example cy.getSelectByLabel('Gender').clearSelect()
       */
      clearSelect(options?: Partial<TypeOptions>): Chainable<Element>;
    }
  }
}

// Alternatively you can use CommonJS syntax:
// require('./commands')
