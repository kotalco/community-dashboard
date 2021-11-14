import axios from '../../../axios';

import { CreatePeer, Peer } from '@interfaces/ipfs/Peer';

export const createIPFSPeer = async (body: CreatePeer) => {
  const { data } = await axios.post<{ peer: Peer }>(`/ipfs/peers`, body);

  return data.peer;
};

export const getIPFSPeer = async (peerName: string): Promise<Peer> => {
  const { data } = await axios.get<{ peer: Peer }>(`/ipfs/peers/${peerName}`);

  return data.peer;
};

/**
 * Send Put request to update specific IPFS Peer
 * @param peerName The IPFS Peer that will be updated
 * @param values The values needed to be updated
 * @returns an updated peer
 */
export const updateIPFSPeer = async (
  peerName: string,
  values: Partial<Peer>
): Promise<Peer> => {
  const { data } = await axios.put<{ peer: Peer }>(
    `ipfs/peers/${peerName}`,
    values
  );

  return data.peer;
};

/**
 * Send a delete request to delete an IPFS Peer
 * @param name IPFS Peer name
 */
export const deleteIPFSPeer = async (name: string): Promise<void> => {
  await axios.delete(`/ipfs/peers/${name}`);
};
