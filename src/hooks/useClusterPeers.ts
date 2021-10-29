import { SWRInfiniteConfiguration } from 'swr/infinite';
import { AxiosResponse } from 'axios';

import { BeaconNode } from '@interfaces/ethereum2/BeaconNode';
import { sortByDate } from '@utils/helpers/sortByDate';
import useRequestInfinite from '@hooks/useRequestInfinite';
import { ClusterPeer } from '@interfaces/ipfs/ClusterPeer';

const PAGE_SIZE = 10;

function key(
  pageIndex: number,
  prevPageData: AxiosResponse<{
    clusterpeers: ClusterPeer[];
  }> | null
) {
  // Reached the end
  if (prevPageData && !prevPageData.data.clusterpeers.length) return null;
  // If first page, we don't have prevPageData
  if (pageIndex === 0) return '/ipfs/clusterpeers';
  return `/ipfs/clusterpeers?page=${pageIndex}`;
}

export const useBeaconNodes = (config?: SWRInfiniteConfiguration) => {
  // useRequestInfinit returns a paginated form of data
  const { data, headers, error, size, ...rest } = useRequestInfinite<{
    clusterpeers: ClusterPeer[];
  }>(key, config);

  // useSWR to get the x-total-count from headers
  // const headers = response?.[0].headers as { 'x-total-count': string };
  const totalCount = headers?.['x-total-count'];

  // Collect all data in single arrays instead of 2D arrays
  const initial: ClusterPeer[] = [];
  const clusterpeers = sortByDate(
    data?.reduce((prev, current) => prev.concat(current.clusterpeers), initial)
  );

  // Detect initial loading state
  const isInitialLoading = !data && !error;
  // Detect loading state any time
  const isLoading =
    isInitialLoading ||
    (size > 0 && data && typeof data[size - 1] === 'undefined');
  // Detect empty state
  const isEmpty = data?.[0]?.clusterpeers.length === 0;
  // Detect if at end page
  const isReachedEnd =
    isEmpty || (data && data[data.length - 1]?.clusterpeers.length < PAGE_SIZE);

  return {
    clusterpeers,
    totalCount,
    isLoading,
    isInitialLoading,
    isEmpty,
    isReachedEnd,
    size,
    ...rest,
  };
};
