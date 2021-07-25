import { NestedValue } from 'react-hook-form'

import { ClusterConsensusAlgorithm } from '@enums/IPFS/ClusterPeers/ClusterConsensusAlgorithm'

export interface IPFSClusterPeer {
  name: string
  consensus: ClusterConsensusAlgorithm
  clusterSecretName: string
  peerEndpoint: string
  id: string
  privatekeySecretName: string
  trustedPeers: string[]
  bootstrapPeers: string[]
  cpu: string
  cpuLimit: string
  memory: string
  memoryLimit: string
  storage: string
}

export interface CreateIPFSClusterPeer {
  name: string
  consensus: ClusterConsensusAlgorithm
  clusterSecretName: string
  peerEndpoint: string
  id: string
  privatekeySecretName: string
  trustedPeers: NestedValue<string[]>
  bootstrapPeers: NestedValue<string[]>
}
