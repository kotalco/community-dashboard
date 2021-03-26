export interface EthereumNode {
  name: string
  network: string
  client: string
}

export interface AxiosNodesResponse {
  nodes: EthereumNode[]
}

export interface AxiosNodeResponse {
  node: EthereumNode
}
