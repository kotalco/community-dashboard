import axios from '../../axios'
import {
  CreateKubernetesSecret,
  KubernetesSecret,
} from '@interfaces/KubernetesSecret/KubernetesSecret'

/**
 * get all the kubernetes secrets or filter according to type if type parameter sent
 * @param type the type of secret (optional)
 * @returns All the secrets of that type if introduced or all secrets if no parameter
 */
export const getAllSecrets = async (type = ''): Promise<KubernetesSecret[]> => {
  const { data } = await axios.get<{ secrets: KubernetesSecret[] }>(
    `/core/secrets${type ? `?type=${type}` : ''}`
  )
  return data.secrets
}

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
  )

  return data.secret
}
