import { Resources } from '@interfaces/Resources';

export interface Database {
  databaseURL: string;
}

export interface CreateChainlinkNode extends Database {
  name: string;
  ethereumChainId: number;
  ethereumWsEndpoint: string;
  linkContractAddress: string;
  keystorePasswordSecretName: string;
  apiCredentials: { email: string; passwordSecretName: string };
}

export type UpdateChainlinkNode = Partial<Database>;

export interface ChainlinkNode extends CreateChainlinkNode, Resources {
  createdAt: string;
  corsDomains: string[];
  certSecretName: string;
  tlsPort: number;
  secureCookies: boolean;
  logging: 'debug' | 'info' | 'warn' | 'error' | 'panic';
  ethereumHttpEndpoints: string[];
}
