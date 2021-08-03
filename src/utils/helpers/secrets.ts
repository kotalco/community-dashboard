import { KubernetesSecret } from '@interfaces/KubernetesSecret/KubernetesSecret';

export const arrangeSecrets = (secrets: KubernetesSecret[]) =>
  secrets.map(({ name }) => ({ label: name, value: name }));
