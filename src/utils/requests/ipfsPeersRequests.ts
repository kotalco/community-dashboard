import axios from '../axios'

import { IPFSPeer } from '@interfaces/IPFSPeer'

export const getAllIPFSPeers = async (): Promise<IPFSPeer[]> => {
  const { data } = await axios.get<{ peers: IPFSPeer[] }>('/ipfs/peers')

  return data.peers
}
