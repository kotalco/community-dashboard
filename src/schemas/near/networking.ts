import { number, object, SchemaOf, string, array } from 'yup';

import { Networking } from '@interfaces/near/NearNode';

export const networkingSchema: SchemaOf<Networking> = object({
  nodePrivateKeySecretName: string().notRequired().default(''),
  minPeers: number()
    .typeError('Minimun Peers is number')
    .notRequired()
    .min(0, 'Minimum Peers is greater than 0')
    .default(5),
  p2pPort: number()
    .typeError('P2P Port is number')
    .notRequired()
    .min(1, 'P2P Port is between 1 and 65535')
    .max(65535, 'P2P Port is between 1 and 65535')
    .default(24567),
  p2pHost: string().default('0.0.0.0'),
  bootnodes: array().of(string().required()).ensure().compact(),
});
