import { SchemaOf, object, array, string } from 'yup';

import { BeaconEndpoints } from '@interfaces/ethereum2/Validator';

export const MultipleSchema: SchemaOf<BeaconEndpoints> = object({
  beaconEndpoints: array()
    .of(string().required())
    .ensure()
    .compact()
    .min(1, 'Beacon node endpoints are required'),
});

export const onlyOneSchema: SchemaOf<BeaconEndpoints> = object({
  beaconEndpoints: array()
    .of(string().required())
    .ensure()
    .compact()
    .length(1, 'Only one beacon node endpoint is allowed'),
});
