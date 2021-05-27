import { NodeClient } from '@enums/Ethereum/NodeClient'

type ethereumNodeOption = { label: string; value: NodeClient }

export const ethereumNodeClientsOptions: ethereumNodeOption[] = [
  { label: 'Go Ethereum', value: NodeClient.geth },
  { label: 'Hyperledger Besu', value: NodeClient.besu },
  { label: 'Open Ethereum', value: NodeClient.parity },
  { label: 'Nethermind', value: NodeClient.nethermind },
]
