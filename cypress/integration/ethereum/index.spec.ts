/// <reference types="cypress"/>

describe('Ethereum Home Page', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:4000/api/v1/ethereum/nodes', {
      nodes: [],
    });
    cy.intercept(
      'GET',
      'http://localhost:4000/api/v1/core/secrets?type=ethereum_privatekey',
      { fixture: 'nodePrivateKeys.json' }
    );
    cy.visit('/');
    cy.get('button').contains('Deployments').click();
    cy.get('a').contains('Ethereum').click();
  });

  it('Should show empty state page of no ethereum nodes', () => {
    cy.get('h3').contains('There is no nodes created');
    cy.get('a').contains('New Node').click();
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

  // it('Should create new ethereum node with node private key', () => {
  //   // Write Node Name
  //   cy.get('input#name').type('new-node');
  //   // Choose a client
  //   cy.get('button').contains('Choose a client...').click();
  //   cy.get('li').contains('Go Ethereum').click();
  //   // Choose a network
  //   cy.get('button').contains('Choose a network...').click();
  //   cy.get('li').contains('Mainnet').click();
  //   // Choose a node private key
  //   cy.get('button').contains('Choose a private key...').click();
  //   cy.get('li').contains('Private Key 1').click();
  //   // Submit
  //   cy.get('button[type=submit]').click();
  // });

  // it('Should not create new ethereum node if missing field', () => {});
});

export {};
