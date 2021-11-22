import { Resources } from '@interfaces/Resources';

export interface Database {
  databaseURL: string;
}

export interface Ethereum {
  ethereumWsEndpoint: string;
  ethereumHttpEndpoints: string[];
}

export interface CreateChainlinkNode
  extends Database,
    Pick<Ethereum, 'ethereumWsEndpoint'> {
  name: string;
  ethereumChainId: number;
  linkContractAddress: string;
  keystorePasswordSecretName: string;
  apiCredentials: { email: string; passwordSecretName: string };
}

export type UpdateChainlinkNode = Partial<Database & Ethereum>;

export interface ChainlinkNode
  extends CreateChainlinkNode,
    Ethereum,
    Resources {
  createdAt: string;
  corsDomains: string[];
  certSecretName: string;
  tlsPort: number;
  secureCookies: boolean;
  logging: 'debug' | 'info' | 'warn' | 'error' | 'panic';
}
