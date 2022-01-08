import { boolean, number, object, SchemaOf, string } from 'yup';

import { TLS } from '@interfaces/chainlink/ChainlinkNode';

export const schema: SchemaOf<TLS> = object({
  certSecretName: string().default(''),
  tlsPort: number()
    .default(6689)
    .when('certSecretName', {
      is: (value: string) => !!value,
      then: number().default(6689),
      otherwise: number().strip(),
    }),
  secureCookies: boolean()
    .default(false)
    .when('certSecretName', {
      is: (value: string) => !!value,
      then: boolean().default(false),
      otherwise: boolean().isFalse(),
    }),
});
