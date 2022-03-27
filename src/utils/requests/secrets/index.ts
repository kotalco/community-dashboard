import useSWR, { SWRConfiguration } from 'swr';

import { fetcher, api } from '../../axios';
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
  const { data, error, ...rest } = useSWR<
    { secrets: KubernetesSecret[] },
    AxiosError
  >(`/core/secrets?type=${type}`, fetcher, config);

  const secrets = data?.secrets;
  const arranged = arrangeSecrets(secrets || []);

  return { data: arranged, error, isLoading: !error && !data, ...rest };
};

export const createSecret = async (body: CreateKubernetesSecret) => {
  const secret = await api.post<never, KubernetesSecret>('/core/secrets', body);
  return secret;
};

export const deleteSecret = async (name: string) => {
  await api.delete(`/core/secrets/${name}`);
};
