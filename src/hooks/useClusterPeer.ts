import { AxiosError } from 'axios';
import useSWR, { SWRConfiguration } from 'swr';

import { ClusterPeer } from '@interfaces/ipfs/ClusterPeer';

export const useClusterPeer = (name?: string, config?: SWRConfiguration) => {
  const { data, error, ...rest } = useSWR<
    { clusterpeer: ClusterPeer },
    AxiosError
  >(!name ? null : `/ipfs/clusterpeers/${name}`, config);

  const clusterpeer = data?.clusterpeer;
  const isLoading = !data && !error;

  return { clusterpeer, isLoading, error, ...rest };
};
