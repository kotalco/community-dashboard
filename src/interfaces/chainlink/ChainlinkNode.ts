import { Resources } from '@interfaces/Resources';

export interface ChainlinkNode extends Resources {
  createdAt: string;
  name: string;
  ethereumChainId: string;
  ethereumWsEndpoint: string;
  linkContractAddress: string;
  databaseURL: string;
  keystorePasswordSecretName: string;
  apiCredentials: { email: string; passwordSecretName: string };
  corsDomains: string[];
  certSecretName: string;
  tlsPort: number;
  secureCookies: boolean;
  logging: 'debug' | 'info' | 'warn' | 'error' | 'panic';
  ethereumHttpEndpoints: string[];
}
