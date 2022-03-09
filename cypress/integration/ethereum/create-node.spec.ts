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
    ).as('getPrivateKeys');
    cy.intercept('POST', 'http://localhost:4000/api/v1/ethereum/nodes', {
      fixture: 'ethereumNode.json',
    }).as('nodeCreated');
    cy.visit('/');
    cy.get('button').contains('Deployments').click();
    cy.get('a').contains('Ethereum').click();
    cy.get('h3').contains('There is no nodes created');
    cy.get('a').contains('New Node').click();
  });

  it('Create Node without node private key', () => {
    // Write Node Name
    cy.get('input#name').type('my-node');
    // Choose a client
    cy.get('button').contains('Choose a client...').click();
    cy.get('li').contains('Go Ethereum').click();
    // Choose a network
    cy.get('button').contains('Choose a network...').click();
    cy.get('li').contains('Rinkeby').click();

    // Submit
    cy.get('button[type=submit]').click();
    cy.wait('@nodeCreated');
    cy.url().should('include', '/deployments/ethereum/nodes');
    cy.get('span').contains('my-node');
  });

  it('Should create new ethereum node with node private key', () => {
    // Write Node Name
    cy.get('input#name').type('my-node');
    // Choose a client
    cy.get('button').contains('Choose a client...').click();
    cy.get('li').contains('Go Ethereum').click();
    // Choose a network
    cy.get('button').contains('Choose a network...').click();
    cy.get('li').contains('Mainnet').click();
    // Choose a node private key
    cy.wait('@getPrivateKeys');
    cy.get('button').contains('Choose a private key...').click();
    cy.get('li').contains('privateKey1').click();
    // Submit
    cy.get('button[type=submit]').click();
    cy.wait('@nodeCreated');
    cy.url().should('include', '/deployments/ethereum/nodes');
    cy.get('span').contains('my-node');
  });

  it('Should not create new ethereum node if missing required field', () => {
    // Submit
    cy.get('button[type=submit]').click();
    // Find errrs
    cy.get('form').find('p[role=alert]').should('have.length', 3);
  });
});

export {};
