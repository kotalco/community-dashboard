import { number, object, SchemaOf, string } from 'yup';

import { CreateChainlinkNode } from '@interfaces/chainlink/ChainlinkNode';
import { databaseSchema } from './database';
import { ethereumSchema } from './ethereum';
import { walletSchema } from './wallet';

const apiCredentialsSceham: SchemaOf<{
  email: string;
  passwordSecretName: string;
}> = object({
  email: string()
    .required('Email is required')
    .email('Invalied email address')
    .trim(),
  passwordSecretName: string().required('Password is required'),
});

export const createSchema: SchemaOf<CreateChainlinkNode> = object({
  name: string().required('Name is required').trim(),
  ethereumChainId: number().required('EVM Chain is required'),
  linkContractAddress: string().required('EVM Chain is required'),
  apiCredentials: apiCredentialsSceham,
})
  .concat(databaseSchema)
  .concat(ethereumSchema)
  .concat(walletSchema);
