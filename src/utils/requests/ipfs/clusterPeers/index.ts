import useSWR, { SWRConfiguration } from 'swr';
import { AxiosError } from 'axios';

import axios, { fetcher } from '@utils/axios';
import {
  CreateClusterPeer,
  ClusterPeer,
  UpdateClusterPeer,
} from '@interfaces/ipfs/ClusterPeer';
import { UnpackNestedValue } from 'react-hook-form';

/**
 * Hook that get all cluster peers from the server
 * @param config swr configration if present
 * @returns object with all cluster peers or undefined if error then isError is true
 */
export const useClusterPeers = (config?: SWRConfiguration) => {
  const swr = useSWR<{ clusterpeers: ClusterPeer[] }, AxiosError>(
    '/ipfs/clusterpeers',
    fetcher,
    config
  );
  const data = swr.data?.clusterpeers;

  return { ...swr, data };
};

/**
 * Hook that get the cluster peer details using its name
 * @param name Peername
 * @param config swr configration if present
 * @returns Object with cluster peer details and swr return
 */
export const useClusterPeer = (name?: string, config?: SWRConfiguration) => {
  const swr = useSWR<{ clusterpeer: ClusterPeer }, AxiosError>(
    !name ? null : `/ipfs/clusterpeers/${name}`,
    fetcher,
    config
  );
  const data = swr.data?.clusterpeer;
  return { ...swr, data };
};

/**
 * Send POST request to the server to create new IPFS Cluster Peer
 * @param body data required to create new IPFS Cluster Peer
 * @returns the IPFS Cluster Peer created by the server
 */
export const createIPFSClusterPeer = async (
  body: UnpackNestedValue<CreateClusterPeer>
): Promise<ClusterPeer> => {
  const { data } = await axios.post<{ clusterpeer: ClusterPeer }>(
    `/ipfs/clusterpeers`,
    body
  );
  return data.clusterpeer;
};

export const updateClusterPeer = async (
  name: string,
  body: UnpackNestedValue<UpdateClusterPeer>
): Promise<ClusterPeer> => {
  const { data } = await axios.put<{ clusterpeer: ClusterPeer }>(
    `/ipfs/clusterpeers/${name}`,
    body
  );

  return data.clusterpeer;
};

/**
 * Send a delete request to delete an IPFS Cluster Peer
 * @param name IPFS Cluster Peer name
 */
export const deleteClusterPeer = async (name: string): Promise<void> => {
  await axios.delete(`/ipfs/clusterpeers/${name}`);
};
