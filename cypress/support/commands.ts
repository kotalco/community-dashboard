/// <reference types="cypress" />
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('getInputByLabel', (label) => {
  cy.log('**getInputByLabel**');
  cy.contains('label', label)
    .invoke('attr', 'for')
    .then((id) => {
      if (id) cy.get(`#${id}`);
    });
});

Cypress.Commands.add('getSelectByLabel', (label) => {
  cy.contains('label', label).parent();
});

Cypress.Commands.add('choose', { prevSubject: 'element' }, (subject, text) => {
  cy.wrap(subject)
    .find('label')
    .click()
    .focused()
    .click()
    .get('li')
    .contains(text)
    .click();
});

Cypress.Commands.add('clearSelect', { prevSubject: 'element' }, (subject) => {
  cy.wrap(subject).find('button[type=reset]').click();
});

export {};
