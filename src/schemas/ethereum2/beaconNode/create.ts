import { mixed, object, SchemaOf, string, array } from 'yup';

import { CreateBeaconNode } from '@interfaces/ethereum2/BeaconNode';
import { nameRegex } from '@utils/helpers/regex';
import { Ethereum2Client } from '@enums/Ethereum2/Ethereum2Client';

export const schema: SchemaOf<CreateBeaconNode> = object({
  name: string()
    .required('Name is required')
    .trim()
    .matches(nameRegex, 'Spaces not allowed'),
  client: mixed<Ethereum2Client>()
    .required('Client is required')
    .oneOf(
      [
        Ethereum2Client.lighthouse,
        Ethereum2Client.nimbus,
        Ethereum2Client.prysm,
        Ethereum2Client.teku,
      ],
      '${value} is not valid value'
    ),
  network: string().required('Network is required').trim(),
  eth1Endpoints: array().when(['client', 'network'], {
    is: (client: Ethereum2Client, network: string) =>
      client === Ethereum2Client.prysm && network !== 'mainnet',
    then: array()
      .of(string())
      .min(1, 'At least 1 endpoint is required')
      .ensure()
      .compact(),
    otherwise: array().strip(),
  }),
});
