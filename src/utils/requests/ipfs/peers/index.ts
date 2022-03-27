import { api } from '@utils/axios';

import { CreatePeer, Peer } from '@interfaces/ipfs/Peer';

export const createIPFSPeer = async (body: CreatePeer) => {
  const peer = await api.post<never, Peer>(`/ipfs/peers`, body);

  return peer;
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
  const { data } = await api.put<{ peer: Peer }>(
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
  await api.delete(`/ipfs/peers/${name}`);
};
