import { Ethereum2Client } from '@enums/Ethereum2/Ethereum2Client';
import { Resources } from '@interfaces/Resources';

export interface CreateValidator {
  name: string;
  network: string;
  client: Ethereum2Client;
  keystores: string[];
  walletPasswordSecretName?: string;
  beaconEndpoints: string[];
}

export interface Grafitti {
  graffiti: string;
}

export interface Keystores {
  keystores: string[];
  walletPasswordSecretName: string;
}

export interface BeaconEndpoints {
  beaconEndpoints: string[];
}

export type UpdateValidator = Partial<
  Grafitti & Keystores & BeaconEndpoints & Resources
>;

export interface Validator
  extends Required<Omit<CreateValidator, 'keystores'>>,
    Grafitti,
    Resources {
  createdAt: string;
  keystores: { secretName: string }[];
}
