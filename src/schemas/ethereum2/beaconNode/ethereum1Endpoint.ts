import { object, SchemaOf, array, string, mixed } from 'yup';

import { Eth1Endpoints } from '@interfaces/ethereum2/BeaconNode';
import { BeaconNodeClient } from '@enums/Ethereum2/BeaconNodes/BeaconNodeClient';

export const schema: SchemaOf<
  Eth1Endpoints & { client?: BeaconNodeClient; network?: string }
> = object({
  client: mixed<BeaconNodeClient>().strip(),
  network: string().strip(),
  eth1Endpoints: array().when(['client', 'network'], {
    is: (client: BeaconNodeClient, network: string) =>
      client === BeaconNodeClient.prysm && network !== 'mainnet',
    then: array()
      .of(string())
      .min(1, 'At least 1 endpoint is required')
      .ensure()
      .compact(),
    otherwise: array()
      .of(string())
      .max(1, 'Endpoint can not be more that one.')
      .ensure()
      .compact(),
  }),
});
