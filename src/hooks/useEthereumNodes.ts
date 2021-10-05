import useSWR, { KeyLoader } from 'swr';
import useSWRInfinite, { SWRInfiniteConfiguration } from 'swr/infinite';
import { AxiosError } from 'axios';

import { EthereumNode } from '@interfaces/Ethereum/ِEthereumNode';
import { sortByDate } from '@utils/helpers/sortByDate';
import { fetchHeader } from '@utils/axios';

const PAGE_SIZE = 10;

const key: KeyLoader<{ nodes: EthereumNode[] }> = (pageIndex, prevPageData) => {
  // Reached the end
  if (prevPageData && !prevPageData.nodes.length) return null;
  // If first page, we don't have prevPageData
  if (pageIndex === 0) return '/ethereum/nodes';
  return `/ethereum/nodes?page=${pageIndex}`;
};

export const useEthereumNodes = (config?: SWRInfiniteConfiguration) => {
  // useSWRInfinite returns a paginated form of data
  const { data, error, size, ...rest } = useSWRInfinite<
    { nodes: EthereumNode[] },
    AxiosError
  >(key, config);

  // useSWR to get the x-total-count from headers
  const { data: headers } = useSWR('/ethereum/nodes', { fetcher: fetchHeader });
  const totalCount = headers?.['x-total-count'];

  // Collect all data in single arrays instead of 2D arrays
  const initial: EthereumNode[] = [];
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
    ...rest,
  };
};
