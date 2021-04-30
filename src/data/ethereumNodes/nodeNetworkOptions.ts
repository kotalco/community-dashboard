import { EthereumNetwork } from '@enums/EthereumNodes/EthereumNetwork'

type NetworkOption = { label: string; value: EthereumNetwork }

export const ethereumNodeNetworkOptions: NetworkOption[] = [
  { label: 'Mainnet', value: EthereumNetwork.mainnet },
  { label: 'Rinkeby', value: EthereumNetwork.rinkeby },
  { label: 'Ropsten', value: EthereumNetwork.ropsten },
  { label: 'Goerli', value: EthereumNetwork.goerli },
]
