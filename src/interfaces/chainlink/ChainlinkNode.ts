import { Resources } from '@interfaces/Resources';
import { Logging as LoggingEnum } from '@enums/Chainlink/Logging';

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

export interface AccessControl {
  corsDomains: string[];
}

export interface Logging {
  logging: LoggingEnum;
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
  Database & Ethereum & Wallet & TLS & API & AccessControl & Logging & Resources
>;

export interface ChainlinkNode
  extends CreateChainlinkNode,
    Pick<Ethereum, 'ethereumHttpEndpoints'>,
    TLS,
    AccessControl,
    Logging,
    Resources {
  createdAt: string;
}
