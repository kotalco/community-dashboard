import { IPFSRouting } from '@enums/IPFS/Peers/IPFSRouting';
import { IPFSConfigurationProfile } from '@enums/IPFS/Peers/IPFSConfigurationProfile';

export interface IPFSPeer {
  name: string;
  apiPort: number;
  apiHost: string;
  gatewayPort: number;
  gatewayHost: string;
  routing: IPFSRouting;
  profiles: IPFSConfigurationProfile[];
  initProfiles: IPFSConfigurationProfile[];
}

export interface CreateIPFSPeer {
  name: string;
  initProfiles: IPFSConfigurationProfile[];
}

export interface UpdateIPFSPeer {
  apiPort?: number;
  apiHost?: string;
  gatewayPort?: number;
  gatewayHost?: string;
  routing?: IPFSRouting;
  profiles?: IPFSConfigurationProfile[];
}

export interface UpdateConfigrationProfiles {
  profiles: IPFSConfigurationProfile[];
}

export interface UpdateAPI {
  apiPort: number;
  apiHost: string;
}

export interface UpdateGateway {
  gatewayPort: number;
  gatewayHost: string;
}

export interface UpdateRouting {
  routing: IPFSRouting;
}
