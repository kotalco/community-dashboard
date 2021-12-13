import { object, SchemaOf, string, array } from 'yup';

import { Peers } from '@interfaces/ipfs/ClusterPeer';

export const schema: SchemaOf<Peers> = object({
  peerEndpoint: string().required('Please provide your Peer Endpoint'),
  bootstrapPeers: array()
    .of(string().required())
    .ensure()
    .compact()
    .default([]),
});
