import { object, SchemaOf, array, string } from 'yup';

import { Eth1Endpoints } from '@interfaces/ethereum2/BeaconNode';

export const requiredSchema: SchemaOf<Eth1Endpoints> = object({
  eth1Endpoints: array()
    .of(string().required())
    .min(1, 'At least 1 endpoint is required')
    .ensure()
    .compact(),
});

export const optionalSchema: SchemaOf<Eth1Endpoints> = object({
  eth1Endpoints: array()
    .of(string().required())
    // .max(1, 'Endpoint can not be more that one.')
    .ensure()
    .compact(),
});

export const onlyOneSchema: SchemaOf<Eth1Endpoints> = object({
  eth1Endpoints: array()
    .of(string().required())
    .max(1, 'Endpoint can not be more that one.')
    .ensure()
    .compact(),
});
