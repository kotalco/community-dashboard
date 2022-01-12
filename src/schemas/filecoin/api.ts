import { boolean, number, object, SchemaOf, string } from 'yup';

import { API } from '@interfaces/filecoin/FilecoinNode';

export const apiSchema: SchemaOf<API> = object({
  api: boolean().default(false),
  apiPort: number()
    .default(1234)
    .when('api', {
      is: true,
      then: number()
        .typeError('API Port is number')
        .min(1, 'API Port is between 1 and 65535')
        .max(65535, 'API Port is between 1 and 65535'),
      otherwise: number().strip(),
    }),
  apiHost: string().default('0.0.0.0').when('api', {
    is: false,
    then: string().strip(),
  }),
  apiRequestTimeout: number()
    .default(30)
    .when('api', {
      is: true,
      then: number()
        .typeError('Request timeout is a number')
        .min(1, 'Request timeout should be more than 1'),
      otherwise: number().strip(),
    }),
});
