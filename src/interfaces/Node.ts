export interface EthereumNode {
  name: string
  network: string
  client: string
}

export interface AxiosGetAllResponse {
  nodes: EthereumNode[]
}
