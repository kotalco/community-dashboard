import { IPFSRouting } from '@enums/ipfsPeers/IPFSRouting'
import { IPFSConfigurationProfile } from '@enums/ipfsPeers/IPFSConfigurationProfile'

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
}
