import { boolean, number, object, SchemaOf } from 'yup';

import { API } from '@interfaces/filecoin/FilecoinNode';

export const apiSchema: SchemaOf<API> = object({
  api: boolean().default(false),
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
