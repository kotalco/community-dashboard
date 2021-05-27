import { NodeNetwork } from '@enums/Ethereum/NodeNetwork'

type NetworkOption = { label: string; value: NodeNetwork }

export const ethereumNodeNetworkOptions: NetworkOption[] = [
  { label: 'Mainnet', value: NodeNetwork.mainnet },
  { label: 'Rinkeby', value: NodeNetwork.rinkeby },
  { label: 'Ropsten', value: NodeNetwork.ropsten },
  { label: 'Goerli', value: NodeNetwork.goerli },
]
