import { SchemaOf, string, object } from 'yup';
import { API } from '@interfaces/chainlink/ChainlinkNode';

export const apiCredentialsSchema: SchemaOf<{
  email: string;
  passwordSecretName: string;
}> = object({
  email: string()
    .required('Email is required')
    .email('Invalied email address')
    .trim(),
  passwordSecretName: string().required('Password is required'),
});

export const apiSchema: SchemaOf<API> = object({
  apiCredentials: apiCredentialsSchema,
});
