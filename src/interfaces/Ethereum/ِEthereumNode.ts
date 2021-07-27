import { EthereumNodeClient } from '@enums/Ethereum/EthereumNodeClient';
import { EthereumNodeNetwork } from '@enums/Ethereum/EthereumNodeNetwork';

export interface EthereumNode {
  name: string;
  network: string;
  client: EthereumNodeClient;
}

export interface CreateEthereumNode {
  name: string;
  client: EthereumNodeClient;
  selectNetwork: EthereumNodeNetwork;
  textNetwork: string;
}
