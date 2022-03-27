import { api } from '@utils/axios';
import {
  CreateClusterPeer,
  ClusterPeer,
  UpdateClusterPeer,
} from '@interfaces/ipfs/ClusterPeer';
import { UnpackNestedValue } from 'react-hook-form';

export const createIPFSClusterPeer = async (
  body: UnpackNestedValue<CreateClusterPeer>
): Promise<ClusterPeer> => {
  const clusterpeer = await api.post<never, ClusterPeer>(
    `/ipfs/clusterpeers`,
    body
  );
  return clusterpeer;
};

export const updateClusterPeer = async (
  name: string,
  body: UpdateClusterPeer
) => {
  const clusterpeer = await api.put<never, ClusterPeer>(
    `/ipfs/clusterpeers/${name}`,
    body
  );

  return clusterpeer;
};

export const deleteClusterPeer = async (name: string) => {
  await api.delete(`/ipfs/clusterpeers/${name}`);
};
