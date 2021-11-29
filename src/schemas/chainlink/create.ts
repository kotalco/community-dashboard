import { number, object, SchemaOf, string } from 'yup';

import { CreateChainlinkNode } from '@interfaces/chainlink/ChainlinkNode';
import { databaseSchema } from './database';
import { ethereumSchema } from './ethereum';
import { walletSchema } from './wallet';
import { apiCredentialsSchema } from './apiCredentials';

export const createSchema: SchemaOf<CreateChainlinkNode> = object({
  name: string().required('Name is required').trim(),
  ethereumChainId: number().required('EVM Chain is required'),
  linkContractAddress: string().required('EVM Chain is required'),
  apiCredentials: apiCredentialsSchema,
})
  .concat(databaseSchema)
  .concat(ethereumSchema)
  .concat(walletSchema);
