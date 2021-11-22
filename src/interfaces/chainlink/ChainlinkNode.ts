import { Resources } from '@interfaces/Resources';

export interface Database {
  databaseURL: string;
}

export interface Ethereum {
  ethereumWsEndpoint: string;
  ethereumHttpEndpoints: string[];
}

export interface Wallet {
  keystorePasswordSecretName: string;
}

export interface TLS {
  certSecretName: string;
  tlsPort: number;
  secureCookies: boolean;
}

export interface CreateChainlinkNode
  extends Database,
    Pick<Ethereum, 'ethereumWsEndpoint'>,
    Wallet {
  name: string;
  ethereumChainId: number;
  linkContractAddress: string;
  apiCredentials: { email: string; passwordSecretName: string };
}

export type UpdateChainlinkNode = Partial<Database & Ethereum & Wallet & TLS>;

export interface ChainlinkNode
  extends CreateChainlinkNode,
    Pick<Ethereum, 'ethereumHttpEndpoints'>,
    TLS,
    Resources {
  createdAt: string;
  corsDomains: string[];
  logging: 'debug' | 'info' | 'warn' | 'error' | 'panic';
}
