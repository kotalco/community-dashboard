import { object, SchemaOf, string } from 'yup';

import { Telemetry } from '@interfaces/near/NearNode';

export const telemetrySchema: SchemaOf<Telemetry> = object({
  telemetryURL: string().default('wss://telemetry.polkadot.io/submit/0'),
});
