import axios from '@utils/axios';
import {
  CreateClusterPeer,
  ClusterPeer,
  UpdateClusterPeer,
} from '@interfaces/ipfs/ClusterPeer';
import { UnpackNestedValue } from 'react-hook-form';

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
  body: UpdateClusterPeer
) => {
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
