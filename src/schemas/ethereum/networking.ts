import { object, SchemaOf, string, array, mixed } from 'yup';

import { Networking } from '@interfaces/Ethereum/ِEthereumNode';
import { SyncMode } from '@enums/Ethereum/SyncMode';

export const networkingSchema: SchemaOf<Networking> = object({
  nodePrivateKeySecretName: string().notRequired().default(''),
  syncMode: mixed<SyncMode>()
    .oneOf([SyncMode.fast, SyncMode.full, SyncMode.light])
    .default(SyncMode.fast),
  staticNodes: array().of(string().required()).ensure().compact(),
  bootnodes: array().of(string().required()).ensure().compact(),
});
