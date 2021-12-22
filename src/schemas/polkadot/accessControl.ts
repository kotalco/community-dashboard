import { array, object, SchemaOf, string } from 'yup';

import { AccessControl } from '@interfaces/polkadot/PolkadotNode';

export const accessControlSchema: SchemaOf<AccessControl> = object({
  corsDomains: array().of(string().required()).ensure().compact(),
});
