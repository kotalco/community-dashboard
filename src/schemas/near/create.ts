import { object, SchemaOf, string, mixed, boolean } from 'yup';

import { Network } from '@enums/Near/Network';
import { CreateNearNode } from '@interfaces/near/NearNode';

export const createSchema: SchemaOf<CreateNearNode> = object({
  name: string().required('Name is required').trim(),
  network: mixed<Network>()
    .required('Netwrok is required')
    .oneOf([Network.betanet, Network.mainnet, Network.testnet]),
  archive: boolean().default(false),
});
