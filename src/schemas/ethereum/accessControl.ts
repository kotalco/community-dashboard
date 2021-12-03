import { object, SchemaOf, array, string } from 'yup';
import { AccessControl } from '@interfaces/Ethereum/ِEthereumNode';

export const schema: SchemaOf<AccessControl> = object({
  hosts: array()
    .ensure()
    .compact()
    .min(
      1,
      'Please specify your whitelisted hosts or "*" to whitelist all hosts'
    )
    .of(string().required()),
  corsDomains: array()
    .ensure()
    .compact()
    .min(1, 'Please specify your CORS domains or "*" to whitelist all domains')
    .of(string().required()),
});
