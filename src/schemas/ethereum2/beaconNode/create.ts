import { mixed, object, SchemaOf, string, array } from 'yup';

import { CreateBeaconNode } from '@interfaces/ethereum2/BeaconNode';
import { nameRegex } from '@utils/helpers/regex';
import { BeaconNodeClient } from '@enums/Ethereum2/BeaconNodes/BeaconNodeClient';

export const schema: SchemaOf<CreateBeaconNode> = object({
  name: string()
    .required('Name is required')
    .trim()
    .matches(nameRegex, 'Spaces not allowed'),
  client: mixed<BeaconNodeClient>()
    .required('Client is required')
    .oneOf(
      [
        BeaconNodeClient.lighthouse,
        BeaconNodeClient.nimbus,
        BeaconNodeClient.prysm,
        BeaconNodeClient.teku,
      ],
      '${value} is not valid value'
    ),
  network: string().required('Network is required').trim(),
  eth1Endpoints: array().when(['client', 'network'], {
    is: (client: BeaconNodeClient, network: string) =>
      client === BeaconNodeClient.prysm && network !== 'mainnet',
    then: array()
      .of(string())
      .min(1, 'At least 1 endpoint is required')
      .ensure()
      .compact(),
    otherwise: array().strip(),
  }),
});
