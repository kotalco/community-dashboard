import useSWR, { SWRConfiguration } from 'swr';

import axios, { fetcher } from '../../axios';
import {
  CreateKubernetesSecret,
  KubernetesSecret,
} from '@interfaces/KubernetesSecret/KubernetesSecret';
import { AxiosError } from 'axios';
import { KubernetesSecretTypes } from '@enums/KubernetesSecret/KubernetesSecretTypes';
import { arrangeSecrets } from '@utils/helpers/secrets';

/**
 * hook to send a request to get all secrets
 * @param type secret types [password, keystore, privatekey, generic]
 * @param initialData the secrets already exist
 * @returns object with the requested secrets or error if exist
 */
export const useSecrets = (config?: SWRConfiguration) => {
  const swr = useSWR<{ secrets: KubernetesSecret[] }, AxiosError>(
    '/core/secrets',
    fetcher,
    config
  );
  const data = swr.data?.secrets;

  return { ...swr, data };
};

export const useSecretsByType = (
  type: KubernetesSecretTypes,
  config?: SWRConfiguration
) => {
  const swr = useSWR<{ secrets: KubernetesSecret[] }, AxiosError>(
    `/core/secrets?type=${type}`,
    fetcher,
    config
  );
  const secrets = swr.data?.secrets;
  const data = arrangeSecrets(secrets || []);

  return { ...swr, data };
};

/**
 * Create new secret type
 * @param secret Secret data
 * @returns the name and type of the created secret
 */
export const createSecret = async (
  secret: CreateKubernetesSecret
): Promise<KubernetesSecret> => {
  const { data } = await axios.post<{ secret: CreateKubernetesSecret }>(
    '/core/secrets',
    secret
  );

  return data.secret;
};

/**
 * Deletes kubernetes secret
 * @param name Name of the secret
 */
export const deleteSecret = async (name: string): Promise<void> => {
  await axios.delete(`/core/secrets/${name}`);
};
