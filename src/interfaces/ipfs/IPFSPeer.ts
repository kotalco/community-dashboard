import { IPFSRouting } from '@enums/IPFSPeers/IPFSRouting'
import { IPFSConfigurationProfile } from '@enums/IPFSPeers/IPFSConfigurationProfile'

export interface IPFSPeer {
  name: string
  apiPort: number
  apiHost: string
  gatewayPort: number
  gatewayHost: string
  routing: IPFSRouting
  profiles: IPFSConfigurationProfile[]
  initProfiles: IPFSConfigurationProfile[]
}

export interface UpdateIPFSPeer {
  apiPort?: number
  apiHost?: string
  gatewayPort?: number
  gatewayHost?: string
  routing?: IPFSRouting
  profiles?: IPFSConfigurationProfile[]
}

export interface UpdateConfigrationProfiles {
  profiles: IPFSConfigurationProfile[]
}
