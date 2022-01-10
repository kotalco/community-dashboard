import { clientsHrefs } from '@data/clientsHrefs';
import { EthereumNodeClient } from '@enums/Ethereum/EthereumNodeClient';
import { Ethereum2Client } from '@enums/Ethereum2/Ethereum2Client';

export const getHref = (searchClient: Ethereum2Client | EthereumNodeClient) => {
  return (
    clientsHrefs.find((client) => client.client === searchClient)?.href || '#'
  );
};
