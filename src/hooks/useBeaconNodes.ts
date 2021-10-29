import { SWRInfiniteConfiguration } from 'swr/infinite';
import { AxiosResponse } from 'axios';

import { BeaconNode } from '@interfaces/ethereum2/BeaconNode';
import { sortByDate } from '@utils/helpers/sortByDate';
import useRequestInfinite from '@hooks/useRequestInfinite';

const PAGE_SIZE = 10;

function key(
  pageIndex: number,
  prevPageData: AxiosResponse<{
    beaconnodes: BeaconNode[];
  }> | null
) {
  // Reached the end
  if (prevPageData && !prevPageData.data.beaconnodes.length) return null;
  // If first page, we don't have prevPageData
  if (pageIndex === 0) return '/ethereum2/beaconnodes';
  return `/ethereum2/beaconnodes?page=${pageIndex}`;
}

export const useBeaconNodes = (config?: SWRInfiniteConfiguration) => {
  // useRequestInfinit returns a paginated form of data
  const { data, headers, error, size, ...rest } = useRequestInfinite<{
    beaconnodes: BeaconNode[];
  }>(key, config);

  // useSWR to get the x-total-count from headers
  // const headers = response?.[0].headers as { 'x-total-count': string };
  const totalCount = headers?.['x-total-count'];

  // Collect all data in single arrays instead of 2D arrays
  const initial: BeaconNode[] = [];
  const baeconnodes = sortByDate(
    data?.reduce((prev, current) => prev.concat(current.beaconnodes), initial)
  );

  // Detect initial loading state
  const isInitialLoading = !data && !error;
  // Detect loading state any time
  const isLoading =
    isInitialLoading ||
    (size > 0 && data && typeof data[size - 1] === 'undefined');
  // Detect empty state
  const isEmpty = data?.[0]?.beaconnodes.length === 0;
  // Detect if at end page
  const isReachedEnd =
    isEmpty || (data && data[data.length - 1]?.beaconnodes.length < PAGE_SIZE);

  return {
    baeconnodes,
    totalCount,
    isLoading,
    isInitialLoading,
    isEmpty,
    isReachedEnd,
    size,
    ...rest,
  };
};
