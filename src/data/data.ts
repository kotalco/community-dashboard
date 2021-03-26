import { SelectOption } from '@interfaces/SelectOption'
import { Protocol } from '@enums/Protocol'
import { EthereumClient } from '@enums/EthereumClient'
import { EthereumNetwork } from '@enums/EthereumNetwork'

export const protocolSelectOptions: SelectOption[] = [
  { label: 'Ethereum', value: Protocol.ethereum },
  { label: 'Ethereum 2.0', value: Protocol.ethereum2 },
  { label: 'Filecoin', value: Protocol.filecoin },
  { label: 'IPFS', value: Protocol.ipfs },
]

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
  { label: 'Other', value: EthereumNetwork.other },
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
