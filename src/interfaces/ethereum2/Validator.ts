import { ValidatorsClient } from '@enums/Ethereum2/Validators/ValidatorsClient';
import { NestedValue } from 'react-hook-form';

export interface CreateValidator {
  name: string;
  network: string;
  client: ValidatorsClient;
  keystores: string[];
  walletPasswordSecretName?: string;
  beaconEndpoints: string[];
}

export interface UpdateValidator {
  graffiti?: string;
  keystores?: { secretName: string }[];
  walletPasswordSecretName?: string;
  beaconEndpoints?: string[];
  cpu?: string;
  cpuLimit?: string;
  memory?: string;
  memoryLimit?: string;
  storage?: string;
}

export interface UpdateGrafitti {
  graffiti: string;
}

export interface UpdateKeystores {
  keystores: NestedValue<string[]>;
  walletPasswordSecretName: string;
  client: ValidatorsClient;
}

export interface UpdateBeaconEndpoints {
  beaconEndpoints: string[];
}

export interface UpdateResources {
  cpu: string;
  cpuLimit: string;
  memory: string;
  memoryLimit: string;
  storage: string;
}

export interface Validator
  extends Required<Omit<CreateValidator, 'keystores'>> {
  createdAt: string;
  graffiti: string;
  keystores: { secretName: string }[];
  cpu: string;
  cpuLimit: string;
  memory: string;
  memoryLimit: string;
  storage: string;
}
