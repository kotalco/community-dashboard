import { Resources } from '@interfaces/Resources';
import { Network } from '@enums/Near/Network';

export interface CreateNearNode {
  name: string;
  network: Network;
  archive: boolean;
}

export interface Networking {
  nodePrivateKeySecretName: string;
  minPeers: number;
  p2pPort: number;
  p2pHost: string;
  bootnodes: string[];
}

export interface RPC {
  rpc: boolean;
  rpcPort: number;
  rpcHost: string;
}

export interface Validator {
  validatorSecretName: string;
}

export interface Prometheus {
  prometheusPort: number;
  prometheusHost: string;
}

export interface Telemetry {
  telemetryURL: string;
}

export type UpdateNearNode = Partial<
  Networking & Validator & Telemetry & Prometheus & RPC & Resources
>;

export interface NearNode
  extends CreateNearNode,
    Networking,
    Validator,
    Telemetry,
    Prometheus,
    RPC,
    Resources {
  createdAt: string;
}
