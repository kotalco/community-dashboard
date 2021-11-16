import { SWRInfiniteConfiguration } from 'swr/infinite';
import { AxiosError, AxiosResponse } from 'axios';

import { sortByDate } from '@utils/helpers/sortByDate';
import { Peer } from '@interfaces/ipfs/Peer';
import useRequestInfinite from '@hooks/useRequestInfinite';

const PAGE_SIZE = 10;

function key(
  pageIndex: number,
  prevPageData: AxiosResponse<
    {
      peers: Peer[];
    },
    AxiosError
  > | null
) {
  // Reached the end
  if (prevPageData && !prevPageData.data.peers.length) return null;
  // If first page, we don't have prevPageData
  if (pageIndex === 0) return '/ipfs/peers';
  return `/ipfs/peers?page=${pageIndex}`;
}

export const usePeers = (config?: SWRInfiniteConfiguration) => {
  // useRequestInfinit returns a paginated form of data
  const { data, headers, error, size, ...rest } = useRequestInfinite<{
    peers: Peer[];
  }>(key, config);

  // useSWR to get the x-total-count from headers
  const totalCount = headers && parseInt(headers['x-total-count']);

  // Collect all data in single arrays instead of 2D arrays
  const initial: Peer[] = [];
  const peers = sortByDate(
    data?.reduce((prev, current) => prev.concat(current.peers), initial)
  );

  // Detect initial loading state
  const isInitialLoading = !data && !error;
  // Detect loading state any time
  const isLoading =
    isInitialLoading ||
    (size > 0 && data && typeof data[size - 1] === 'undefined');
  // Detect empty state
  const isEmpty = data?.[0]?.peers.length === 0;
  // Detect if at end page
  const isReachedEnd =
    isEmpty || (data && data[data.length - 1]?.peers.length < PAGE_SIZE);

  return {
    peers,
    totalCount,
    isLoading,
    isInitialLoading,
    isEmpty,
    isReachedEnd,
    size,
    error,
    ...rest,
  };
};
