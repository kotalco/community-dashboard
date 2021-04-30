import { EthereumClient } from '@enums/EthereumNodes/EthereumClient'

type ethereumNodeOption = { label: string; value: EthereumClient }

export const ethereumNodeClientsOptions: ethereumNodeOption[] = [
  { label: 'Go Ethereum', value: EthereumClient.geth },
  { label: 'Hyperledger Besu', value: EthereumClient.besu },
  { label: 'Open Ethereum', value: EthereumClient.parity },
  { label: 'Nethermind', value: EthereumClient.nethermind },
]
