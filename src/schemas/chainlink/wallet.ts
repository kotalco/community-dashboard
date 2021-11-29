import { object, SchemaOf, string } from 'yup';

import { Wallet } from '@interfaces/chainlink/ChainlinkNode';

export const walletSchema: SchemaOf<Wallet> = object({
  keystorePasswordSecretName: string().required(
    'Keystore password is required'
  ),
});
