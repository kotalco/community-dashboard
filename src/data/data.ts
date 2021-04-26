import { SelectOption } from '@interfaces/SelectOption'
import { EthereumClient } from '@enums/EthereumClient'
import { EthereumNetwork } from '@enums/EthereumNetwork'

export const ethereumNodeClientsOptions: SelectOption[] = [
  { label: 'Go Ethereum', value: EthereumClient.geth },
  { label: 'Hyperledger Besu', value: EthereumClient.besu },
  { label: 'Open Ethereum', value: EthereumClient.parity },
  { label: 'Nethermind', value: EthereumClient.nethermind },
]

export const ethereumNodeNetworkOptions: SelectOption[] = [
  { label: 'Mainnet', value: EthereumNetwork.mainnet },
  { label: 'Rinkeby', value: EthereumNetwork.rinkeby },
  { label: 'Ropsten', value: EthereumNetwork.ropsten },
  { label: 'Goerli', value: EthereumNetwork.goerli },
]

export const ENDPOINTS = [
  {
    id: 1,
    name: 'beacon-endpoint',
    nodeName: 'my-beacon-node',
  },
  {
    id: 2,
    name: 'calibration-endpoint',
    nodeName: 'my-filecoin-node',
  },
  {
    id: 3,
    name: 'rinkeby-endpoint',
    nodeName: 'my-ethereum-node',
  },
]
