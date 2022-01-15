import { number, object, SchemaOf, string, mixed, boolean } from 'yup';

import { Networking } from '@interfaces/polkadot/PolkadotNode';
import { SyncMode } from '@enums/Polkadot/SyncMode';

export const networkingSchema: SchemaOf<Networking> = object({
  nodePrivateKeySecretName: string().notRequired().default(''),
  p2pPort: number()
    .typeError('P2P Port is number')
    .notRequired()
    .min(1, 'P2P Port is between 1 and 65535')
    .max(65535, 'P2P Port is between 1 and 65535')
    .default(30333),
  syncMode: mixed<SyncMode>()
    .oneOf([SyncMode.fast, SyncMode.full])
    .default(SyncMode.full),
  retainedBlocks: number()
    .typeError('Retained Blocks is number')
    .notRequired()
    .min(1, 'Retained blocks should be more than 0')
    .default(256),
  pruning: boolean().required(),
});
