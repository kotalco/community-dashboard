import { IPFSRouting } from '@enums/IPFS/Peers/IPFSRouting';
import { IPFSConfigurationProfile } from '@enums/IPFS/Peers/IPFSConfigurationProfile';
import { Resources } from '@interfaces/Resources';

export interface CreateIPFSPeer {
  name: string;
  initProfiles: IPFSConfigurationProfile[];
}

export interface ConfigrationProfiles {
  profiles: IPFSConfigurationProfile[];
}

export interface API {
  apiPort: number;
  apiHost: string;
}

export interface Gateway {
  gatewayPort: number;
  gatewayHost: string;
}

export interface Routing {
  routing: IPFSRouting;
}

export interface IPFSPeer
  extends CreateIPFSPeer,
    ConfigrationProfiles,
    API,
    Gateway,
    Routing,
    Resources {}
