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
export const createEthereumNode = async (
  body: EthereumNode
): Promise<EthereumNode> => {
  const { data } = await axios.post<AxiosNodeResponse>(`/ethereum/nodes`, body)

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

// Update node by its name
export const updateNode = async (
  body: { client: string },
  name: string,
  protocol: string
): Promise<EthereumNode> => {
  const { data } = await axios.put<AxiosNodeResponse>(
    `/${protocol}/nodes/${name}`,
    body
  )
  return data.node
}

// Delete node by its name
export const deleteNode = async (
  protocol: string,
  name: string
): Promise<void> => {
  await axios.delete(`/${protocol}/nodes/${name}`)
}
