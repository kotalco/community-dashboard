import { api } from '@utils/axios';
import {
  CreateKubernetesSecret,
  KubernetesSecret,
} from '@interfaces/KubernetesSecret/KubernetesSecret';

export const createSecret = async (body: CreateKubernetesSecret) => {
  const secret = await api.post<never, KubernetesSecret>('/core/secrets', body);
  return secret;
};

export const deleteSecret = async (name: string) => {
  await api.delete(`/core/secrets/${name}`);
};
