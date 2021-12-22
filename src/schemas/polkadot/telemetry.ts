import { object, SchemaOf, string, boolean } from 'yup';

import { Telemetry } from '@interfaces/polkadot/PolkadotNode';

export const telemetrySchema: SchemaOf<Telemetry> = object({
  telemetry: boolean().default(false),
  telemetryURL: string().when('telemetry', {
    is: true,
    then: string().required('Telemetry service URL is required').trim(),
    otherwise: string().notRequired().default(''),
  }),
});
