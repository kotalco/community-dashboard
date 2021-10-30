import useSWR, { SWRConfiguration } from 'swr';

import axios, { fetcher } from '../../axios';
import {
  CreateKubernetesSecret,
  KubernetesSecret,
} from '@interfaces/KubernetesSecret/KubernetesSecret';
import { AxiosError } from 'axios';
import { KubernetesSecretTypes } from '@enums/KubernetesSecret/KubernetesSecretTypes';
import { arrangeSecrets } from '@utils/helpers/secrets';

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
  const { data } = await axios.post<{ secret: KubernetesSecret }>(
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
