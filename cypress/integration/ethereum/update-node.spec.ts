/// <reference types="cypress"/>

describe('Ethereum Node Details', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:4000/api/v1/ethereum/nodes', {
      fixture: 'ethereumNodes.json',
    });
    cy.intercept('GET', 'http://localhost:4000/api/v1/ethereum/nodes/my-node', {
      fixture: 'ethereumNode.json',
    });
    cy.intercept(
      'GET',
      'http://localhost:4000/api/v1/core/secrets?type=ethereum_privatekey',
      { fixture: 'nodePrivateKeys.json' }
    );
    cy.visit('/');
    cy.get('button').contains('Deployments').click();
    cy.get('a').contains('Ethereum').click();
    cy.get('a[href="/deployments/ethereum/nodes/my-node"]').click();
    cy.url().should('include', '/my-node');
  });

  it('check for protocol details', () => {
    cy.get('button').contains('Protocol').click();
    cy.get('dd').contains('Ethereum').should('contain.text', 'Ethereum');
    cy.get('dd').contains('Rinkeby').should('contain.text', 'Rinkeby');
    cy.get('dd').contains('Go Ethereum').should('contain.text', 'Go Ethereum');
  });

  it('update networking details', () => {
    cy.get('button').contains('Networking').click();
    cy.get('button[type="submit"]').should('be.disabled');
    cy.getSelectByLabel('Node Private Key').choose('privateKey1');

    cy.getInputByLabel('P2P Port').clear().type('3333');

    cy.getSelectByLabel('Sync Mode').choose('Fast');
  });

  // it('update API details', () => {
  //   cy.get('button').contains('API').click();
  // });

  // it('update access control details', () => {
  //   cy.get('button').contains('Access Control').click();
  // });

  // it('update mining details', () => {
  //   cy.get('button').contains('Mining').click();
  // });

  // it('update logging details', () => {
  //   cy.get('button').contains('Logging').click();
  // });

  // it('update resources details', () => {
  //   cy.get('button').contains('Resources').click();
  // });

  // it('delete ethereum node', () => {
  //   cy.get('button').contains('Danger Zone').click();
  // });
});

export {};
