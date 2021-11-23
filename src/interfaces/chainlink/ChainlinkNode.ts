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

export interface API {
  apiCredentials: { email: string; passwordSecretName: string };
}

export interface CreateChainlinkNode
  extends Database,
    Pick<Ethereum, 'ethereumWsEndpoint'>,
    Wallet,
    API {
  name: string;
  ethereumChainId: number;
  linkContractAddress: string;
}

export type UpdateChainlinkNode = Partial<
  Database & Ethereum & Wallet & TLS & API
>;

export interface ChainlinkNode
  extends CreateChainlinkNode,
    Pick<Ethereum, 'ethereumHttpEndpoints'>,
    TLS,
    Resources {
  createdAt: string;
  corsDomains: string[];
  logging: 'debug' | 'info' | 'warn' | 'error' | 'panic';
}
