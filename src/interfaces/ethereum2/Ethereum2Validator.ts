import { ValidatorsClients } from '@enums/Ethereum2/Validators/ValidatorsClients';
import { NestedValue } from 'react-hook-form';

export interface Ethereum2Validator {
  name: string;
  network: string;
  client: ValidatorsClients;
  graffiti: string;
  keystores: { secretName: string }[];
  walletPasswordSecretName: string;
  beaconEndpoints: string[];
  cpu: string;
  cpuLimit: string;
  memory: string;
  memoryLimit: string;
  storage: string;
}

export interface CreateEthereum2Validator {
  name: string;
  network: string;
  client: ValidatorsClients;
  keystores: NestedValue<string[]>;
  walletPasswordSecretName?: string;
  beaconEndpoints: NestedValue<string[]>;
}

export interface UpdateEthereum2Validator {
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
  client: ValidatorsClients;
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
