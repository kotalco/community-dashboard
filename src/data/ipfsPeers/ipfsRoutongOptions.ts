import { IPFSRouting } from '@enums/IPFSPeers/IPFSRouting'

type Routing = { label: string; value: IPFSRouting }[]

export const ipfsRoutingOptions: Routing = [
  { label: 'None', value: IPFSRouting.none },
  { label: 'DHT', value: IPFSRouting.dht },
  { label: 'DHT Client', value: IPFSRouting.dhtclient },
  { label: 'DHT Server', value: IPFSRouting.dhtserver },
]
