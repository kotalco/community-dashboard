import { EthereumNodeClient } from '@enums/Ethereum/EthereumNodeClient';

export interface EthereumNode {
  name: string;
  network: string;
  client: EthereumNodeClient;
}

export interface CreateEthereumNode {
  name: string;
  client: EthereumNodeClient;
  network: string;
}
