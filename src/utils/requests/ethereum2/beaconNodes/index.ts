import axios from '../../../axios'

import {
  Ethereum2BeaconNode,
  MutableEthereum2BeaconNode,
} from '@interfaces/ethereum2/beaconNode/Ethereum2BeaconNode'
import { BeaconNodeRequiredData } from '@interfaces/ethereum2/beaconNode/BeaconNodeRequiredData'

/**
 * Send a get request to find all ethereum 2.0 beacon nodes
 * @returns All Ethereum 2.0 beacon nodes
 */
export const getAllBeaconNodes = async (): Promise<Ethereum2BeaconNode[]> => {
  const { data } = await axios.get<{ beaconnodes: Ethereum2BeaconNode[] }>(
    `/ethereum2/beaconnodes`
  )

  return data.beaconnodes
}

/**
 * Send a post request to create a new beacon node using ethereum 2.0 protocol
 * @param body The required data to create a new beacon node
 * @returns The newly created beacon node
 */
export const createBeaconNode = async (
  body: BeaconNodeRequiredData
): Promise<Ethereum2BeaconNode> => {
  const { data } = await axios.post<{ beaconnode: Ethereum2BeaconNode }>(
    '/ethereum2/beaconnodes',
    body
  )

  return data.beaconnode
}

/**
 * Send a get request to find a beacon node by its name
 * @param nodeName Name of the node we are looking for
 * @returns All node data if found
 */
export const getBeaconNode = async (
  nodeName: string
): Promise<Ethereum2BeaconNode> => {
  // SHOULD BE FIXED LATER
  const { data } = await axios.get<{ beaconnnode: Ethereum2BeaconNode }>(
    `/ethereum2/beaconnodes/${nodeName}`
  )

  return data.beaconnnode
}

/**
 * Send a delete request to delete the beacon node
 * @param nodeName Node name to be deleted
 */
export const deleteBeaconNode = async (nodeName: string): Promise<void> => {
  await axios.delete(`/ethereum2/beaconnodes/${nodeName}`)
}

export const updateBeaconNode = async (
  nodeName: string,
  nodeData: MutableEthereum2BeaconNode
): Promise<Ethereum2BeaconNode> => {
  const { data } = await axios.put<{ beaconnode: Ethereum2BeaconNode }>(
    `/ethereum2/beaconnodes/${nodeName}`,
    nodeData
  )

  return data.beaconnode
}
