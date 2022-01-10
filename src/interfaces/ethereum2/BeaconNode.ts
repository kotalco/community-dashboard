import { Ethereum2Client } from '@enums/Ethereum2/Ethereum2Client';
import { Resources } from '@interfaces/Resources';

export interface CreateBeaconNode {
  name: string;
  client: Ethereum2Client;
  network: string;
  eth1Endpoints?: string[];
}

export interface Eth1Endpoints {
  eth1Endpoints: string[];
}

export interface API {
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

export type UpdateBeaconnode = Partial<Eth1Endpoints & API & Resources>;

export interface BeaconNode extends Required<CreateBeaconNode>, API, Resources {
  createdAt: string;
}
