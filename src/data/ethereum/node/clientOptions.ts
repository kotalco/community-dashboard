import { SelectOption } from '@interfaces/SelectOption'
import { NodeClient } from '@enums/Ethereum/NodeClient'

export const clientOptions: SelectOption[] = [
  { label: 'Go Ethereum', value: NodeClient.geth },
  { label: 'Hyperledger Besu', value: NodeClient.besu },
  { label: 'Open Ethereum', value: NodeClient.parity },
  { label: 'Nethermind', value: NodeClient.nethermind },
]
