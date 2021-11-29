import { array, object, SchemaOf, string } from 'yup';

import { AccessControl } from '@interfaces/chainlink/ChainlinkNode';

export const accessControlSchema: SchemaOf<AccessControl> = object({
  corsDomains: array().of(string().required()).ensure().compact(),
});
