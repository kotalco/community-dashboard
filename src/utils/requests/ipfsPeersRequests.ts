import axios from '../axios'

import { IPFSPeer } from '@interfaces/IPFSPeer'

/**
 * Send GET request to the server to get all peers
 * @returns all ipfs peers
 */
export const getAllIPFSPeers = async (): Promise<IPFSPeer[]> => {
  const { data } = await axios.get<{ peers: IPFSPeer[] }>('/ipfs/peers')

  return data.peers
}

/**
 * Send POST request to the server to create new IPFS Peer
 * @param body data required to create new IPFS Peer
 * @returns the IPFS Peer created by the server
 */
export const createIPFSPeer = async (body: IPFSPeer): Promise<IPFSPeer> => {
  const { data } = await axios.post<{ peer: IPFSPeer }>(`/ipfs/peers`, body)

  return data.peer
}

export const getIPFSPeer = async (peerName: string): Promise<IPFSPeer> => {
  const { data } = await axios.get<{ peer: IPFSPeer }>(
    `/ipfs/peers/${peerName}`
  )

  return data.peer
}
