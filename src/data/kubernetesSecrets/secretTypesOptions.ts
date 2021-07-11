import { KubernetesSecretTypes } from '@enums/KubernetesSecret/KubernetesSecretTypes'
import { SelectOption } from '@interfaces/SelectOption'

export const secretTypesOptions: SelectOption[] = [
  { label: 'Password', value: KubernetesSecretTypes.password },
  { label: 'Private Key', value: KubernetesSecretTypes.privatekey },
  { label: 'Keystore', value: KubernetesSecretTypes.keystore },
]
