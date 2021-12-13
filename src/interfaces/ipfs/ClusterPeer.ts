import { ClusterConsensusAlgorithm } from '@enums/IPFS/ClusterPeers/ClusterConsensusAlgorithm';
import { Resources } from '@interfaces/Resources';

export interface CreateClusterPeer extends Peers, Security {
  name: string;
  consensus: ClusterConsensusAlgorithm;
  id?: string;
  privatekeySecretName?: string;
  trustedPeers: string[];
}

export interface Peers {
  peerEndpoint: string;
  bootstrapPeers: string[];
}

export interface Security {
  clusterSecretName: string;
}

export type UpdateClusterPeer = Partial<Peers & Resources>;

export interface ClusterPeer extends Required<CreateClusterPeer>, Resources {
  createdAt: string;
}
