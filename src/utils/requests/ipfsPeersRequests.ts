import axios from '../axios'

import { IPFSPeer, MutateIPFSPeer } from '@interfaces/IPFSPeer'

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

/**
 * Send Put request to update specific IPFS Peer
 * @param peerName The IPFS Peer that will be updated
 * @param values The values needed to be updated
 * @returns an updated peer
 */
export const updateIPFSPeer = async (
  peerName: string,
  values: MutateIPFSPeer
): Promise<IPFSPeer> => {
  const { data } = await axios.put<{ peer: IPFSPeer }>(
    `ipfs/peers/${peerName}`,
    values
  )

  return data.peer
}

/**
 * Send a delete request to delete an IPFS Peer
 * @param name IPFS Peer name
 */
export const deleteIPFSPeer = async (name: string): Promise<void> => {
  await axios.delete(`/ipfs/peers/${name}`)
}
