import { SelectOption } from '@interfaces/SelectOption'
import { BeaconNodeNetwork } from '@enums/Ethereum2/BeaconNodes/BeaconNodeNetwork'

export const networkOptions: SelectOption[] = [
  { label: 'Mainnet', value: BeaconNodeNetwork.mainnet },
  { label: 'Pyrmont', value: BeaconNodeNetwork.pyrmont },
  { label: 'Prater', value: BeaconNodeNetwork.prater },
  { label: 'Other', value: 'other' },
]
