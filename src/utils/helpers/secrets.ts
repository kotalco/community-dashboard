import { KubernetesSecret } from '@interfaces/KubernetesSecret/KubernetesSecret';

export function formatSecretOptions(secrets?: KubernetesSecret[]) {
  return secrets?.map(({ name }) => ({ label: name, value: name }));
}
