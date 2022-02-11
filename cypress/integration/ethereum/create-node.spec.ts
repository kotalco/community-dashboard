/// <reference types="cypress"/>

describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/deployments/ethereum/nodes/create');
    cy.intercept(
      'GET',
      'http://localhost:4000/api/v1/core/secrets?type=ethereum_privatekey',
      { fixture: 'nodePrivateKeys.json' }
    ).as('getSecrets');
  });

  it('Should create new ethereum node without node private key', () => {
    // // Write Node Name
    // cy.get('input#name').type('new-node');
    // // Choose a client
    // cy.get('button').contains('Choose a client...').click();
    // cy.get('li').contains('Go Ethereum').click();
    // // Choose a network
    // cy.get('button').contains('Choose a network...').click();
    // cy.get('li').contains('Mainnet').click();
    // // Submit
    // cy.get('button[type=submit]').click();
  });

  it('Should create new ethereum node with node private key', () => {
    // Write Node Name
    cy.get('input#name').type('new-node');
    // Choose a client
    cy.get('button').contains('Choose a client...').click();
    cy.get('li').contains('Go Ethereum').click();
    // Choose a network
    cy.get('button').contains('Choose a network...').click();
    cy.get('li').contains('Mainnet').click();
    // Choose a node private key
    cy.get('button').contains('Choose a private key...').click();
    cy.get('li').contains('Private Key 1').click();
    // Submit
    cy.get('button[type=submit]').click();
  });

  // it('Should not create new ethereum node if missing field', () => {});
});

export {};
