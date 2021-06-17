import axios from '../../../axios'

import {
  CreateEthereum2Validator,
  Ethereum2Validator,
} from '@interfaces/ethereum2/Ethereum2Validator'

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
 * Send a post request to create a new validator using ethereum 2.0 protocol
 * @param body The required data to create a new validator
 * @returns The newly created validator
 */
export const createValidator = async (
  values: CreateEthereum2Validator
): Promise<Ethereum2Validator> => {
  const {
    name,
    client,
    selectNetwork,
    textNetwork,
    beaconEndpoints,
    keystores,
    walletPasswordSecretName,
  } = values
  const network = selectNetwork === 'other' ? textNetwork : selectNetwork
  const keystoresObject = keystores.map((key) => ({ secretName: key }))

  const body = {
    name,
    client,
    network,
    beaconEndpoints,
    keystores: keystoresObject,
    walletPasswordSecretName,
  }

  const { data } = await axios.post<{ validator: Ethereum2Validator }>(
    '/ethereum2/validators',
    body
  )

  return data.validator
}

/**
 * Send a get request to find a validator by its name
 * @param validatorName Name of the validator we are looking for
 * @returns All validator data if found or 404 if not
 */
export const getBeaconNode = async (
  validatorName: string
): Promise<Ethereum2Validator> => {
  const { data } = await axios.get<{ validator: Ethereum2Validator }>(
    `/ethereum2/validators/${validatorName}`
  )

  return data.validator
}

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
