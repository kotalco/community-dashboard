import { boolean, number, object, SchemaOf, string } from 'yup';

import { TLS } from '@interfaces/chainlink/ChainlinkNode';

export const schema: SchemaOf<TLS> = object({
  certSecretName: string().default(''),
  tlsPort: number().default(0),
  secureCookies: boolean().default(false),
});
