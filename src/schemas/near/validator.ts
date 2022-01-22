import { object, SchemaOf, string } from 'yup';

import { Validator } from '@interfaces/near/NearNode';

export const validatorSchema: SchemaOf<Validator> = object({
  validatorSecretName: string().notRequired().default(''),
});
