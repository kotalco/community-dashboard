import { NestedValue } from 'react-hook-form';

import { ClusterConsensusAlgorithm } from '@enums/IPFS/ClusterPeers/ClusterConsensusAlgorithm';
import { Resources } from '@interfaces/Resources';

export interface IPFSClusterPeer {
  name: string;
  consensus: ClusterConsensusAlgorithm;
  clusterSecretName: string;
  peerEndpoint: string;
  id: string;
  privatekeySecretName: string;
  trustedPeers: string[] | null;
  bootstrapPeers: string[] | null;
  cpu: string;
  cpuLimit: string;
  memory: string;
  memoryLimit: string;
  storage: string;
}

export interface CreateIPFSClusterPeer {
  name: string;
  consensus: ClusterConsensusAlgorithm;
  clusterSecretName: string;
  peerEndpoint: string;
  id: string;
  privatekeySecretName: string;
  trustedPeers: NestedValue<string[]>;
  bootstrapPeers: NestedValue<string[]>;
}

export interface UpdatePeers {
  peerEndpoint: string;
  bootstrapPeers: NestedValue<string[]>;
}

export interface UpdateIPFSClusterPeer
  extends Partial<UpdatePeers>,
    Partial<Resources> {}
