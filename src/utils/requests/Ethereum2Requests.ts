import axios from '../axios'

import { Ethereum2BeaconNode } from '@interfaces/Ethereum2BeaconNode'

/**
 * Send a get request to find all ethereum 2 beacon nodes
 * @returns All Ethereum 2.0 beacon nodes
 */
export const getAllEthereum2BeaconNodes = async (): Promise<
  Ethereum2BeaconNode[]
> => {
  const { data } = await axios.get<{ beaconnodes: Ethereum2BeaconNode[] }>(
    `/ethereum2/beaconnodes`
  )
  return data.beaconnodes
}
