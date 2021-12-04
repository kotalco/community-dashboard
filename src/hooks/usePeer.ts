import useSWR, { SWRConfiguration } from 'swr';
import { AxiosError } from 'axios';

import { Peer } from '@interfaces/ipfs/Peer';

export const usePeer = (peerName?: string, config?: SWRConfiguration) => {
  const { data, error, ...rest } = useSWR<{ peer: Peer }, AxiosError>(
    !peerName ? null : `/ipfs/peers/${peerName}`,
    config
  );
  const peer = data?.peer;
  const isLoading = !error && !data;

  return { peer, error, isLoading, ...rest };
};
