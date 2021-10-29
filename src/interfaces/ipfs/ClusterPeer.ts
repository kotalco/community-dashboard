import { NestedValue } from 'react-hook-form';

import { ClusterConsensusAlgorithm } from '@enums/IPFS/ClusterPeers/ClusterConsensusAlgorithm';
import { Resources } from '@interfaces/Resources';

export interface ClusterPeer {
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

export interface CreateClusterPeer {
  name: string;
  peerEndpoint: string;
  consensus: ClusterConsensusAlgorithm;
  clusterSecretName: string;
  id: string;
  privatekeySecretName: string;
  trustedPeers: NestedValue<string[]>;
  bootstrapPeers: NestedValue<string[]>;
}

export interface UpdatePeers {
  peerEndpoint: string;
  bootstrapPeers: NestedValue<string[]>;
}

export interface UpdateClusterPeer
  extends Partial<UpdatePeers>,
    Partial<Resources> {}
