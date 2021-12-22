import { object, SchemaOf, boolean, number } from 'yup';

import { Prometheus } from '@interfaces/polkadot/PolkadotNode';

export const prometheusSchema: SchemaOf<Prometheus> = object({
  prometheus: boolean().default(false),
  prometheusPort: number().when('prometheus', {
    is: true,
    then: number()
      .required('Prometheus port is required')
      .typeError('Prometheus port is number')
      .min(1, 'Prometheus Port is between 1 and 65535')
      .max(65535, 'Prometheus Port is between 1 and 65535'),
    otherwise: number().notRequired().default(0),
  }),
});
