import { Resources } from '@interfaces/Resources';

export interface FilecoinNode extends Resources {
  name: string;
  network: string;
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
