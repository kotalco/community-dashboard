import { SelectOption } from '@interfaces/SelectOption'
import { IPFSRouting } from '@enums/IPFSPeers/IPFSRouting'

export const routingOptions: SelectOption[] = [
  { label: 'None', value: IPFSRouting.none },
  { label: 'DHT', value: IPFSRouting.dht },
  { label: 'DHT Client', value: IPFSRouting.dhtclient },
  { label: 'DHT Server', value: IPFSRouting.dhtserver },
]
