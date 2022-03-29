import { api } from '@utils/axios';

import { CreatePeer, Peer } from '@interfaces/ipfs/Peer';

export const createIPFSPeer = async (body: CreatePeer) => {
  const peer = await api.post<never, Peer>(`/ipfs/peers`, body);

  return peer;
};

export const updateIPFSPeer = async (
  peerName: string,
  values: Partial<Peer>
) => {
  const peer = await api.put<never, Peer>(`ipfs/peers/${peerName}`, values);

  return peer;
};

export const deleteIPFSPeer = async (name: string) => {
  await api.delete(`/ipfs/peers/${name}`);
};
