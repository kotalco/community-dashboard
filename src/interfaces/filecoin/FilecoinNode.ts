import { Resources } from '@interfaces/Resources';

export interface CreateFilecoinNode {
  name: string;
  network: string;
}

export interface Networking {
  p2pPort: number;
  p2pHost: string;
}

export interface API {
  api: boolean;
  apiRequestTimeout: number;
}

export interface IPFS {
  ipfsForRetrieval: boolean;
  ipfsPeerEndpoint: string;
  ipfsOnlineMode: boolean;
}

export interface Logging {
  disableMetadataLog: boolean;
}

export type UpdateFilecoinNode = Partial<
  Resources & Networking & API & IPFS & Logging
>;

export interface FilecoinNode
  extends CreateFilecoinNode,
    Networking,
    API,
    IPFS,
    Logging,
    Resources {
  createdAt: string;
  apiPort: number;
  apiHost: string;
}
