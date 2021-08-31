import { EthereumNodeClient } from '@enums/Ethereum/EthereumNodeClient';
import { Logging } from '@enums/Ethereum/Logging';
import { EthereumAPI } from '@enums/Ethereum/EthereumAPI';
import { SyncMode } from '@enums/Ethereum/SyncMode';
import { NestedValue } from 'react-hook-form';
import { Resources } from '@interfaces/Resources';

export interface CreateEthereumNode {
  name: string;
  client: EthereumNodeClient;
  network: string;
}

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

export interface AccessControl {
  hosts: NestedValue<string[]>;
  corsDomains: NestedValue<string[]>;
}

export interface Mining {
  miner: boolean;
  coinbase: string;
}

export interface LoggingInterface {
  logging: Logging;
}

export interface EthereumNode
  extends CreateEthereumNode,
    Networking,
    API,
    AccessControl,
    Mining,
    LoggingInterface,
    Resources {}
