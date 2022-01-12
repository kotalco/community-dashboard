import { number, object, SchemaOf, string } from 'yup';

import { Networking } from '@interfaces/filecoin/FilecoinNode';

export const networkingSchema: SchemaOf<Networking> = object({
  p2pPort: number()
    .typeError('P2P Port is number')
    .min(1, 'P2P Port is between 1 and 65535')
    .max(65535, 'P2P Port is between 1 and 65535')
    .default(4444),
  p2pHost: string().default('0.0.0.0'),
});
