import { Resources } from '@interfaces/Resources';

export interface CreateChainlinkNode {
  name: string;
  ethereumChainId: number;
  ethereumWsEndpoint: string;
  linkContractAddress: string;
  databaseURL: string;
  keystorePasswordSecretName: string;
  apiCredentials: { email: string; passwordSecretName: string };
}

export interface ChainlinkNode extends CreateChainlinkNode, Resources {
  createdAt: string;
  corsDomains: string[];
  certSecretName: string;
  tlsPort: number;
  secureCookies: boolean;
  logging: 'debug' | 'info' | 'warn' | 'error' | 'panic';
  ethereumHttpEndpoints: string[];
}
