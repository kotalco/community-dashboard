import { object, SchemaOf, number, string } from 'yup';

import { Prometheus } from '@interfaces/near/NearNode';

export const prometheusSchema: SchemaOf<Prometheus> = object({
  prometheusPort: number()
    .default(9615)
    .typeError('Prometheus port is number')
    .min(1, 'Prometheus Port is between 1 and 65535')
    .max(65535, 'Prometheus Port is between 1 and 65535'),
  prometheusHost: string().notRequired().default('0.0.0.0'),
});
