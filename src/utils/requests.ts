import axios from './axios'
import {
  EthereumNode,
  AxiosGetAllNodesResponse,
  AxiosCreateNodeResponse,
} from '@interfaces/Node'

export const getAllNodes = async (protocol = ''): Promise<EthereumNode[]> => {
  const { data } = await axios.get<AxiosGetAllNodesResponse>(
    `/${protocol}/nodes`
  )
  return data.nodes
}

export const createNode = async (
  protocol: string,
  body: EthereumNode
): Promise<EthereumNode> => {
  const { data } = await axios.post<AxiosCreateNodeResponse>(
    `/${protocol}/nodes`,
    body
  )

  return data.node
}
