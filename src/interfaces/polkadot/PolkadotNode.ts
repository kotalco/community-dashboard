import { Resources } from '@interfaces/Resources';
import { Logging } from '@enums/Polkadot/Logging';
import { Network } from '@enums/Polkadot/Network';
import { SyncMode } from '@enums/Polkadot/SyncMode';

export interface CreatePolkadotNode {
  name: string;
  network: Network;
  pruning: boolean;
}

export interface Networking {
  p2pPort: number;
  nodePrivateKeySecretName: string;
  syncMode: SyncMode;
  retainedBlocks: number;
}

export interface Validator {
  validator: boolean;
}

export interface Telemetry {
  telemetry: boolean;
  telemetryURL?: string;
}

export interface Prometheus {
  prometheus: boolean;
  prometheusPort?: number;
}

export interface API {
  rpc: boolean;
  rpcPort?: number;
  ws: boolean;
  wsPort?: number;
}

export interface AccessControl {
  corsDomains: string[];
}

export interface ILogging {
  logging: Logging;
}

export type UpdatePolkadotNode = Partial<
  Networking &
    Validator &
    Telemetry &
    Prometheus &
    API &
    AccessControl &
    ILogging &
    Resources
>;

export interface PolkadotNode
  extends CreatePolkadotNode,
    Networking,
    Validator,
    Telemetry,
    Prometheus,
    API,
    AccessControl,
    ILogging,
    Resources {
  createdAt: string;
}
