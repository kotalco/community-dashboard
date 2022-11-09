import { EthereumNodeClient } from '@enums/Ethereum/EthereumNodeClient';
import { Logging } from '@enums/Ethereum/Logging';
import { EthereumAPI } from '@enums/Ethereum/EthereumAPI';
import { SyncMode } from '@enums/Ethereum/SyncMode';
import { Resources } from '@interfaces/Resources';

export interface CreateEthereumNode {
  name: string;
  client: EthereumNodeClient;
  network: string;
}

export interface Networking {
  nodePrivateKeySecretName: string;
  p2pPort: number;
  syncMode: SyncMode;
  staticNodes: string[];
  bootnodes: string[];
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
  hosts: string[];
  corsDomains: string[];
}

export type Import = {
  privateKeySecretName: string;
  passwordSecretName: string;
};

export interface Mining {
  miner: boolean;
  coinbase: string;
  import: Import;
}

export interface LoggingInterface {
  logging: Logging;
}

export type UpdateEthereumNode = Partial<
  Networking & API & AccessControl & Mining & LoggingInterface & Resources
>;

export interface EthereumNode
  extends CreateEthereumNode,
    Networking,
    API,
    AccessControl,
    Mining,
    LoggingInterface,
    Resources {
  createdAt: string;
}
