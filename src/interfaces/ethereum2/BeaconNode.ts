import { BeaconNodeClient } from '@enums/Ethereum2/BeaconNodes/BeaconNodeClient';
import { NestedValue } from 'react-hook-form';

export interface CreateBeaconNode {
  name: string;
  client: BeaconNodeClient;
  network: string;
  eth1Endpoints: string[];
}

export interface BeaconNode {
  createdAt: string;
  name: string;
  network: string;
  client: BeaconNodeClient;
  eth1Endpoints: string[];
  rest?: boolean;
  restPort?: number;
  restHost?: string;
  rpc: boolean;
  rpcPort: number;
  rpcHost: string;
  grpc: boolean;
  grpcPort: number;
  grpcHost: string;
  cpu: string;
  cpuLimit: string;
  memory: string;
  memoryLimit: string;
  storage: string;
}

export interface UpdateBeaconNode {
  client?: BeaconNodeClient;
  eth1Endpoints?: string[];
  rest?: boolean;
  restPort?: number;
  restHost?: string;
  rpc?: boolean;
  rpcPort?: number;
  rpcHost?: string;
  grpc?: boolean;
  grpcPort?: number;
  grpcHost?: string;
  cpu?: string;
  cpuLimit?: string;
  memory?: string;
  memoryLimit?: string;
  storage?: string;
}

export interface UpdateEth1Endpoints {
  eth1Endpoints: NestedValue<string[]>;
}

export interface UpdateAPI {
  rest: boolean;
  restHost: string;
  restPort: number;
  rpc: boolean;
  rpcHost: string;
  rpcPort: number;
  grpc: boolean;
  grpcHost: string;
  grpcPort: number;
}
