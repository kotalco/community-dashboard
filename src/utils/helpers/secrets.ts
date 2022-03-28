import { KubernetesSecret } from '@interfaces/KubernetesSecret/KubernetesSecret';
import { SelectOption } from '@interfaces/SelectOption';

export function formatSecretOptions(
  secrets?: KubernetesSecret[]
): SelectOption[] {
  return secrets?.map(({ name }) => ({ label: name, value: name })) || [];
}
