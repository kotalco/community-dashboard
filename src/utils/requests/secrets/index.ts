import axios from '../../axios'
import { KubernetesSecret } from '@interfaces/KubernetesSecret/KubernetesSecret'

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
