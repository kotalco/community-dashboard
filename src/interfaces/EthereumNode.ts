import { NodeClient } from '@enums/Ethereum/NodeClient'

export interface EthereumNode {
  name: string
  network: string
  client: NodeClient
}
