import { number, object, SchemaOf, string } from 'yup';

import { CreateChainlinkNode } from '@interfaces/chainlink/ChainlinkNode';
import { databaseSchema } from './database';

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
  ethereumWsEndpoint: string()
    .required('Ethereum Websocket is required')
    .matches(/wss?:\/\//, 'Invalid websocket URL'),
  keystorePasswordSecretName: string().required(
    'Keystore password is required'
  ),
  apiCredentials: apiCredentialsSceham,
}).concat(databaseSchema);
