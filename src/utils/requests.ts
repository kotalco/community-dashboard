import axios from './axios'
import {
  EthereumNode,
  AxiosNodesResponse,
  AxiosNodeResponse,
} from '@interfaces/Node'

// Get all nodes
export const getAllNodes = async (protocol = ''): Promise<EthereumNode[]> => {
  const { data } = await axios.get<AxiosNodesResponse>(`/${protocol}/nodes`)
  return data.nodes
}

// Create new node
export const createNode = async (
  protocol: string,
  body: EthereumNode
): Promise<EthereumNode> => {
  const { data } = await axios.post<AxiosNodeResponse>(
    `/${protocol}/nodes`,
    body
  )

  return data.node
}

// Get node by its name
export const getNode = async (
  protocol: string,
  name: string
): Promise<EthereumNode> => {
  const { data } = await axios.get<AxiosNodeResponse>(
    `/${protocol}/nodes/${name}`
  )
  return data.node
}
