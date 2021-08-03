import useSWR, { SWRConfiguration } from 'swr';
import { AxiosError } from 'axios';

import axios, { fetcher } from '@utils/axios';
import {
  CreateIPFSClusterPeer,
  IPFSClusterPeer,
} from '@interfaces/ipfs/IPFSClusterPeer';

/**
 * Hook that get all cluster peers from the server
 * @param initialClusterPeers if present
 * @returns object with all cluster peers or undefined if error then isError is true
 */
export const useClusterPeers = (config?: SWRConfiguration) => {
  const swr = useSWR<{ clusterpeers: IPFSClusterPeer[] }, AxiosError>(
    '/ipfs/clusterpeers',
    fetcher,
    config
  );
  const data = swr.data?.clusterpeers;

  return { ...swr, data };
};

/**
 * Send POST request to the server to create new IPFS Cluster Peer
 * @param body data required to create new IPFS Cluster Peer
 * @returns the IPFS Cluster Peer created by the server
 */
export const createIPFSClusterPeer = async (
  body: CreateIPFSClusterPeer
): Promise<IPFSClusterPeer> => {
  const { data } = await axios.post<{ clusterpeer: IPFSClusterPeer }>(
    `/ipfs/clusterpeers`,
    body
  );
  return data.clusterpeer;
};
