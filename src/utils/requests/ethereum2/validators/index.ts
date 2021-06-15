import axios from '../../../axios'

import { Ethereum2Validator } from '@interfaces/ethereum2/Ethereum2Validator'

/**
 * Send a get request to find all ethereum 2.0 validators
 * @returns All Ethereum 2.0 validators
 */
export const getAllValidators = async (): Promise<Ethereum2Validator[]> => {
  const { data } = await axios.get<{ validators: Ethereum2Validator[] }>(
    `/ethereum2/validators`
  )

  return data.validators
}

/**
 * Send a post request to create a new beacon node using ethereum 2.0 protocol
 * @param body The required data to create a new beacon node
 * @returns The newly created beacon node
 */
// export const createBeaconNode = async (
//   values: CreateEthereum2BeaconNode
// ): Promise<Ethereum2BeaconNode> => {
//   const { name, client, selectNetwork, textNetwork, eth1Endpoints } = values
//   const network = selectNetwork === 'other' ? textNetwork : selectNetwork
//   const body = { name, client, network, eth1Endpoints }

//   const { data } = await axios.post<{ beaconnode: Ethereum2BeaconNode }>(
//     '/ethereum2/beaconnodes',
//     body
//   )

//   return data.beaconnode
// }

/**
 * Send a get request to find a beacon node by its name
 * @param nodeName Name of the node we are looking for
 * @returns All node data if found
 */
// export const getBeaconNode = async (
//   nodeName: string
// ): Promise<Ethereum2BeaconNode> => {
//   const { data } = await axios.get<{ beaconnode: Ethereum2BeaconNode }>(
//     `/ethereum2/beaconnodes/${nodeName}`
//   )

//   return data.beaconnode
// }

/**
 * Send a delete request to delete the beacon node
 * @param nodeName Node name to be deleted
 */
// export const deleteBeaconNode = async (nodeName: string): Promise<void> => {
//   await axios.delete(`/ethereum2/beaconnodes/${nodeName}`)
// }

// export const updateBeaconNode = async (
//   nodeName: string,
//   nodeData: UpdateEthereum2BeaconNode
// ): Promise<Ethereum2BeaconNode> => {
//   const { data } = await axios.put<{ beaconnode: Ethereum2BeaconNode }>(
//     `/ethereum2/beaconnodes/${nodeName}`,
//     nodeData
//   )

//   return data.beaconnode
// }
