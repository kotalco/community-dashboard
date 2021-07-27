import useSWR from 'swr';
import axios, { fetcher } from '../../../axios';
import { AxiosError } from 'axios';

import {
  CreateIPFSPeer,
  IPFSPeer,
  UpdateIPFSPeer,
} from '@interfaces/ipfs/IPFSPeer';

/**
 * Hook that get all peers from the server
 * @param initialPeers if present
 * @returns object with all peers or undefined if error then isError is true
 */
export const usePeers = (initialPeers?: {
  peers: IPFSPeer[];
}): { peers?: IPFSPeer[]; isError: boolean } => {
  const { data, error } = useSWR<{ peers: IPFSPeer[] }, AxiosError>(
    '/ipfs/peers',
    fetcher,
    { initialData: initialPeers, revalidateOnMount: true }
  );

  return { peers: data?.peers, isError: !!error };
};

/**
 * Send POST request to the server to create new IPFS Peer
 * @param body data required to create new IPFS Peer
 * @returns the IPFS Peer created by the server
 */
export const createIPFSPeer = async (
  body: CreateIPFSPeer
): Promise<IPFSPeer> => {
  const { data } = await axios.post<{ peer: IPFSPeer }>(`/ipfs/peers`, body);

  return data.peer;
};

export const getIPFSPeer = async (peerName: string): Promise<IPFSPeer> => {
  const { data } = await axios.get<{ peer: IPFSPeer }>(
    `/ipfs/peers/${peerName}`
  );

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
  values: UpdateIPFSPeer
): Promise<IPFSPeer> => {
  const { data } = await axios.put<{ peer: IPFSPeer }>(
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
