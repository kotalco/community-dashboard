import axios, { fetcher } from '../../axios'
import useSWR from 'swr'
import {
  CreateKubernetesSecret,
  KubernetesSecret,
} from '@interfaces/KubernetesSecret/KubernetesSecret'

/**
 * hook to send a request to get all secrets
 * @param initialData the secrets already exist
 * @returns object with the requested secrets or error if exist
 */
export const useSecrets = (initialData: {
  secrets: KubernetesSecret[]
}): { data?: KubernetesSecret[]; isError: boolean } => {
  const { data, error } = useSWR<{ secrets: KubernetesSecret[] }>(
    '/core/secrets',
    fetcher,
    { initialData }
  )

  return { data: data?.secrets, isError: !!error }
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
