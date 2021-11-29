import { SchemaOf, string, object } from 'yup';

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
