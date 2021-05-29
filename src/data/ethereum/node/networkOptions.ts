import { SelectOption } from '@interfaces/SelectOption'
import { NodeNetwork } from '@enums/Ethereum/NodeNetwork'

export const networkOptions: SelectOption[] = [
  { label: 'Mainnet', value: NodeNetwork.mainnet },
  { label: 'Rinkeby', value: NodeNetwork.rinkeby },
  { label: 'Ropsten', value: NodeNetwork.ropsten },
  { label: 'Goerli', value: NodeNetwork.goerli },
  { label: 'Other', value: 'other' },
]
