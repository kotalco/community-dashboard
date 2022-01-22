import { boolean, number, object, SchemaOf, string } from 'yup';

import { RPC } from '@interfaces/near/NearNode';

export const rpcSchema: SchemaOf<RPC> = object({
  rpc: boolean().default(false),
  rpcPort: number()
    .default(3030)
    .when('rpc', {
      is: true,
      then: number()
        .typeError('JSON-RPC Port is number')
        .min(1, 'JSON-RPC Port is between 1 and 65535')
        .max(65535, 'JSON-RPC Port is between 1 and 65535'),
      otherwise: number().strip(),
    }),
  rpcHost: string().default('0.0.0.0').when('rpc', {
    is: false,
    then: string().strip(),
  }),
});
