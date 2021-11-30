import { number, object, SchemaOf, string, array, mixed } from 'yup';

import { Networking } from '@interfaces/Ethereum/ِEthereumNode';
import { SyncMode } from '@enums/Ethereum/SyncMode';

export const networkingSchema: SchemaOf<Networking> = object({
  nodePrivateKeySecretName: string().notRequired().default(''),
  p2pPort: number()
    .typeError('P2P Port is number')
    .notRequired()
    .min(1, 'P2P Port is between 1 and 65535')
    .max(65535, 'P2P Port is between 1 and 65535')
    .default(30303),
  syncMode: mixed<SyncMode>()
    .oneOf([SyncMode.fast, SyncMode.full, SyncMode.light])
    .default(SyncMode.fast),
  staticNodes: array().of(string().required()).ensure().compact(),
  bootnodes: array().of(string().required()).ensure().compact(),
});
