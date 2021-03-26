export interface EthereumNode {
  name: string
  network: string
  client: string
}

export interface AxiosGetAllNodesResponse {
  nodes: EthereumNode[]
}

export interface AxiosCreateNodeResponse {
  node: EthereumNode
}
