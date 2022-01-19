import useRequestInfinite from '@hooks/useRequestInfinite';
import { SWRInfiniteConfiguration } from 'swr/infinite';
import { AxiosError, AxiosResponse } from 'axios';

import { sortByDate } from '@utils/helpers/sortByDate';
import { NearNode } from '@interfaces/near/NearNode';

const PAGE_SIZE = 10;

function key(
  pageIndex: number,
  prevPageData: AxiosResponse<{
    nodes: NearNode[];
  }> | null
) {
  // Reached the end
  if (prevPageData && !prevPageData.data.nodes.length) return null;
  // If first page, we don't have prevPageData
  if (pageIndex === 0) return '/near/nodes';
  return `/near/nodes?page=${pageIndex}`;
}

export const useNearNodes = (config?: SWRInfiniteConfiguration) => {
  // useRequestInfinit returns a paginated form of data
  const { data, headers, error, size, ...rest } = useRequestInfinite<
    {
      nodes: NearNode[];
    },
    AxiosError
  >(key, config);

  const totalCount = headers && parseInt(headers?.['x-total-count']);

  // Collect all data in single arrays instead of 2D arrays
  const initial: NearNode[] = [];
  const nodes = sortByDate(
    data?.reduce((prev, current) => prev.concat(current.nodes), initial)
  );

  // Detect initial loading state
  const isInitialLoading = !data && !error;
  // Detect loading state any time
  const isLoading =
    isInitialLoading ||
    (size > 0 && data && typeof data[size - 1] === 'undefined');
  // Detect empty state
  const isEmpty = data?.[0]?.nodes.length === 0;
  // Detect if at end page
  const isReachedEnd =
    isEmpty || (data && data[data.length - 1]?.nodes.length < PAGE_SIZE);

  return {
    nodes,
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
