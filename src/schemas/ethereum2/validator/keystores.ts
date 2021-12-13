import { object, SchemaOf, array, mixed, string } from 'yup';

import { Keystores } from '@interfaces/ethereum2/Validator';

export const schema: SchemaOf<Keystores> = object({
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
  walletPasswordSecretName: string().default(''),
});
