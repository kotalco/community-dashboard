import { KubernetesSecretTypes } from '@enums/KubernetesSecret/KubernetesSecretTypes'

export interface KubernetesSecret {
  name: string
  type: KubernetesSecretTypes
}
