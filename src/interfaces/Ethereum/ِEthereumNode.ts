import { EthereumNodeClient } from '@enums/Ethereum/EthereumNodeClient';
import { Logging } from '@enums/Ethereum/Logging';
import { EthereumAPI } from '@enums/Ethereum/EthereumAPI';
import { SyncMode } from '@enums/Ethereum/SyncMode';
import { NestedValue } from 'react-hook-form';
import { Resources } from '@interfaces/Resources';

export interface Networking {
  p2pPort: number;
  syncMode: SyncMode;
  staticNodes: NestedValue<string[]>;
  bootnodes: NestedValue<string[]>;
}

export interface API {
  rpc: boolean;
  rpcPort: number;
  rpcAPI: EthereumAPI;
  ws: boolean;
  wsPort: number;
  wsAPI: EthereumAPI;
  graphql: boolean;
  graphqlPort: number;
}

export interface EthereumNode extends Networking, API, Resources {
  name: string;
  network: string;
  client: EthereumNodeClient;
  logging: Logging;
  miner: boolean;
  coinbase: string;
  hosts: NestedValue<string[]>;
  corsDomains: NestedValue<string[]>;
}

export interface CreateEthereumNode {
  name: string;
  client: EthereumNodeClient;
  network: string;
}
