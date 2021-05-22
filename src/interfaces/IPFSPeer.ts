import { IPFSRouting } from '@enums/IPFSPeers/IPFSRouting'
import { IPFSConfigurationProfile } from '@enums/IPFSPeers/IPFSConfigurationProfile'

export interface IPFSPeer extends MutateIPFSPeer {
  name: string
  initProfiles: IPFSConfigurationProfile[]
}

export interface MutateIPFSPeer {
  apiPort: number
  apiHost: string
  gatewayPort: number
  gatewayHost: string
  routing: IPFSRouting
  profiles: IPFSConfigurationProfile[] | null
}
