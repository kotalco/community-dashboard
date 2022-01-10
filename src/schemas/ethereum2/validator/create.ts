import { object, SchemaOf, string, mixed, array } from 'yup';

import { CreateValidator } from '@interfaces/ethereum2/Validator';
import { nameRegex } from '@utils/helpers/regex';
import { Ethereum2Client } from '@enums/Ethereum2/Ethereum2Client';

export const schema: SchemaOf<CreateValidator> = object({
  name: string()
    .required('Name is required')
    .trim()
    .matches(nameRegex, 'Spaces not allowed'),
  client: mixed<Ethereum2Client>()
    .required('Client is required')
    .oneOf<Ethereum2Client>(
      [
        Ethereum2Client.lighthouse,
        Ethereum2Client.nimbus,
        Ethereum2Client.prysm,
        Ethereum2Client.teku,
      ],
      '${value} is not valid value'
    ),
  network: string().required('Network is required').trim(),
  keystores: array()
    .of(
      mixed()
        .required()
        .transform(function (value: string) {
          return this.isType(value) && value !== null
            ? { secretName: value }
            : value;
        })
    )
    .ensure()
    .compact()
    .min(1, '1 keystore at least is required'),
  walletPasswordSecretName: string().when('client', {
    is: Ethereum2Client.prysm,
    then: string().required('Wallet password is required'),
    otherwise: string().strip(),
  }),
  beaconEndpoints: array()
    .of(string().required())
    .ensure()
    .compact()
    .when('client', {
      is: Ethereum2Client.lighthouse,
      then: array().min(1, 'Beacon node endpoints are required'),
      otherwise: array().length(1, 'Only one beacon node endpoint is allowed'),
    }),
});
