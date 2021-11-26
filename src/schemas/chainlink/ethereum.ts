import { array, object, SchemaOf, string } from 'yup';

import { Ethereum } from '@interfaces/chainlink/ChainlinkNode';

export const ethereumSchema: SchemaOf<Ethereum> = object({
  ethereumWsEndpoint: string()
    .required('Ethereum Websocket is required')
    .matches(/wss?:\/\//, 'Invalid websocket URL'),
  ethereumHttpEndpoints: array()
    .of(
      string()
        .required()
        .matches(/https?:\/\//, 'Invalid HTTP endpoint URL')
    )
    .ensure()
    .compact(),
});
