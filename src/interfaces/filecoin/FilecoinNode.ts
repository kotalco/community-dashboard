import { Resources } from '@interfaces/Resources';

export interface CreateFilecoinNode {
  name: string;
  network: string;
}

export interface FilecoinNode extends CreateFilecoinNode, Resources {
  api: boolean;
  apiPort: number;
  apiHost: string;
  apiRequestTimeout: number;
  disableMetadataLog: boolean;
  p2pPort: number;
  p2pHost: string;
  ipfsForRetrieval: boolean;
  ipfsPeerEndpoint: string;
  ipfsOnlineMode: boolean;
  createdAt: string;
}
