import { object, SchemaOf, string, boolean } from 'yup';

import { Telemetry } from '@interfaces/polkadot/PolkadotNode';

export const telemetrySchema: SchemaOf<Telemetry> = object({
  telemetry: boolean().default(false),
  telemetryURL: string().default('wss://telemetry.polkadot.io/submit/0'),
});
