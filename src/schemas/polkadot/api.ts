import { object, SchemaOf, boolean, number } from 'yup';

import { API } from '@interfaces/polkadot/PolkadotNode';

export const apiSchema: SchemaOf<API> = object({
  rpc: boolean().default(false),
  rpcPort: number().when('rpc', {
    is: true,
    then: number()
      .typeError('JSON-RPC port is number')
      .min(1, 'JSON-RPC Port is between 1 and 65535')
      .max(65535, 'JSON-RPC Port is between 1 and 65535')
      .default(9933),
    otherwise: number().default(9933),
  }),
  ws: boolean().default(false),
  wsPort: number().when('ws', {
    is: true,
    then: number()
      .typeError('WebSocket port is number')
      .min(1, 'WebSocket Port is between 1 and 65535')
      .max(65535, 'WebSocket Port is between 1 and 65535')
      .default(9944),
    otherwise: number().default(9944),
  }),
});
