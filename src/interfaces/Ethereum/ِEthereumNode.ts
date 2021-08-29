import { EthereumNodeClient } from '@enums/Ethereum/EthereumNodeClient';
import { Logging } from '@enums/Ethereum/Logging';
import { EthereumAPI } from '@enums/Ethereum/EthereumAPI';
import { SyncMode } from '@enums/Ethereum/SyncMode';
import { NestedValue } from 'react-hook-form';
import { Resources } from '@interfaces/Resources';

export interface EthereumNode extends Resources {
  name: string;
  network: string;
  client: EthereumNodeClient;
  logging: Logging;
  p2pPort: number;
  syncMode: SyncMode;
  staticNodes: NestedValue<string[]>;
  bootnodes: NestedValue<string[]>;
  miner: boolean;
  coinbase: string;
  rpc: boolean;
  rpcPort: number;
  rpcAPI: EthereumAPI;
  ws: boolean;
  wsPort: number;
  wsAPI: EthereumAPI;
  graphql: boolean;
  graphqlPort: number;
  hosts: NestedValue<string[]>;
  corsDomains: NestedValue<string[]>;
}

export interface CreateEthereumNode {
  name: string;
  client: EthereumNodeClient;
  network: string;
}
