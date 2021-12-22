import { Resources } from '@interfaces/Resources';
import { Logging } from '@enums/Polkadot/Logging';
import { Network } from '@enums/Polkadot/Network';
import { SyncMode } from '@enums/Polkadot/SyncMode';

export interface CreatePolkadotNode {
  name: string;
  network: Network;
}

export interface PolkadotNode extends CreatePolkadotNode, Resources {
  p2pPort: number;
  nodePrivateKeySecretName: string;
  validator: boolean;
  syncMode: SyncMode;
  pruning: boolean;
  retainedBlocks: number;
  logging: Logging;
  telemetry: boolean;
  telemetryURL: string;
  prometheus: boolean;
  prometheusPort: number;
  rpc: boolean;
  rpcPort: number;
  ws: boolean;
  wsPort: number;
  corsDomains: string[];
  createdAt: string;
}
