import axios from '../axios'
import { EthereumNode } from '@interfaces/EthereumNode'

export const getAllNodes = async (): Promise<EthereumNode[]> => {
  const { data } = await axios.get<{ nodes: EthereumNode[] }>(`/ethereum/nodes`)
  return data.nodes
}

/**
 * Create a new node
 * @param body ethereum node data
 * @returns the newly created node
 */
export const createEthereumNode = async (
  body: EthereumNode
): Promise<EthereumNode> => {
  const { data } = await axios.post<{ node: EthereumNode }>(
    `/ethereum/nodes`,
    body
  )

  return data.node
}

/**
 * Find ethereum node by its name
 * @param name ethereum node name
 * @returns the found node or error 404 in not found
 */
export const getEthereumNode = async (name: string): Promise<EthereumNode> => {
  const { data } = await axios.get<{ node: EthereumNode }>(
    `/ethereum/nodes/${name}`
  )
  return data.node
}

/**
 * Find ethereum node by its name and updates its data
 * @param body new data to be updates, (client)
 * @param name ethereum node name
 * @returns the updated node data after update is done
 */
export const updateEthereumNode = async (
  name: string,
  body: { client: string }
): Promise<EthereumNode> => {
  const { data } = await axios.put<{ node: EthereumNode }>(
    `/ethereum/nodes/${name}`,
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
