import { object, SchemaOf, string, mixed } from 'yup';

import { CreatePolkadotNode } from '@interfaces/polkadot/PolkadotNode';
import { Network } from '@enums/Polkadot/Network';

export const createSchema: SchemaOf<CreatePolkadotNode> = object({
  name: string().required('Name is required').trim(),
  network: mixed<Network>()
    .required('Netwrok is required')
    .oneOf([Network.kusama, Network.polkadot, Network.rococo, Network.westend]),
});
