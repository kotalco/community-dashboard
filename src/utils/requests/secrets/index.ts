import useSWR from 'swr'

import axios, { fetcher } from '../../axios'
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
    { initialData, revalidateOnMount: true }
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
  const formData = new FormData()
  formData.append('name', secret.name)
  formData.append('type', secret.type)
  formData.append('data[password]', secret.data.password)
  formData.append('data[keystore]', secret.data.keystore)

  const { data } = await axios.post<{ secret: CreateKubernetesSecret }>(
    '/core/secrets',
    formData,
    { headers: { 'Content-Type': 'multipart/form-data' } }
  )

  return data.secret
}

/**
 * Deletes kubernetes secret
 * @param name Name of the secret
 */
export const deleteSecret = async (name: string): Promise<void> => {
  await axios.delete(`/core/secrets/${name}`)
}
