import { object, SchemaOf, string, mixed, array } from 'yup';

import { CreateClusterPeer } from '@interfaces/ipfs/ClusterPeer';
import { ClusterConsensusAlgorithm } from '@enums/IPFS/ClusterPeers/ClusterConsensusAlgorithm';
import { nameRegex } from '@utils/helpers/regex';

export const schema: SchemaOf<CreateClusterPeer> = object().shape(
  {
    name: string()
      .required('Name is required')
      .trim()
      .matches(nameRegex, 'Spaces not allowed'),
    peerEndpoint: string().required('Please add your peer endpoint'),
    consensus: mixed<ClusterConsensusAlgorithm>()
      .required('Please choose your consensus algorithm')
      .oneOf([ClusterConsensusAlgorithm.crdt, ClusterConsensusAlgorithm.raft]),
    clusterSecretName: string().required(
      'Please Provide your cluster secret name'
    ),
    id: string().when('privatekeySecretName', {
      is: (value: string) => !!value,
      then: string().required('Please provide your cluster peer ID').trim(),
      otherwise: string().notRequired().trim(),
    }),
    privatekeySecretName: string().when('id', {
      is: (value: string) => !!value,
      then: string().required('Please provide your private key'),
      otherwise: string().notRequired(),
    }),
    trustedPeers: array().when('consensus', {
      is: ClusterConsensusAlgorithm.crdt,
      then: array()
        .min(1, 'Please provide your trusted peers')
        .ensure()
        .default(['*']),
      otherwise: array().strip(),
    }),
    bootstrapPeers: array().notRequired().of(string().required()),
  },
  [['id', 'privatekeySecretName']]
);

export default schema;
