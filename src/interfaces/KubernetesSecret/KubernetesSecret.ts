import { KubernetesSecretTypes } from '@enums/KubernetesSecret/KubernetesSecretTypes';

export interface KubernetesSecret {
  createdAt: string;
  name: string;
  type: KubernetesSecretTypes;
}

export interface CreateKubernetesSecret {
  name: string;
  type: KubernetesSecretTypes;
  data: { password: string; key: string; keystore: string; secret: string };
}
