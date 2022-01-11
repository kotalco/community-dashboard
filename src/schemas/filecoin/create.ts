import { object, SchemaOf, string, mixed } from 'yup';

import { Network } from '@enums/Filecoin/Network';
import { CreateFilecoinNode } from '@interfaces/filecoin/FilecoinNode';

export const createSchema: SchemaOf<CreateFilecoinNode> = object({
  name: string().required('Name is required').trim(),
  network: mixed<Network>()
    .required('Netwrok is required')
    .oneOf([Network.calibration, Network.mainnet]),
});
