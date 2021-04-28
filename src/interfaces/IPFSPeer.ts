import { IPFSRouting } from '@enums/ipfsPeers/IPFSRouting'
import { IPFSConfigurationProfile } from '@enums/ipfsPeers/IPFSConfigurationProfile'

export interface IPFSPeer {
  name: string
  apiPort: number
  apiHost: string
  gatewayPort: number
  gatewayHost: string
  routing: IPFSRouting
  initProfiles: IPFSConfigurationProfile[]
}
