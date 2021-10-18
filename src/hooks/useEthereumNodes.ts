import { SWRInfiniteConfiguration } from 'swr/infinite';
import { AxiosResponse } from 'axios';

import { EthereumNode } from '@interfaces/Ethereum/ِEthereumNode';
import { sortByDate } from '@utils/helpers/sortByDate';
import useRequestInfinite, { GetRequest } from '@hooks/useRequestInfinite';

const PAGE_SIZE = 10;

function key(
  pageIndex: number,
  prevPageData: AxiosResponse<{
    nodes: EthereumNode[];
  }> | null
): GetRequest {
  // Reached the end
  if (prevPageData && !prevPageData.data.nodes.length) return null;
  // If first page, we don't have prevPageData
  if (pageIndex === 0) return { url: '/ethereum/nodes' };
  return { url: `/ethereum/nodes?page=${pageIndex}` };
}

export const useEthereumNodes = (config?: SWRInfiniteConfiguration) => {
  // useRequestInfinit returns a paginated form of data
  const { data, headers, error, size, ...rest } = useRequestInfinite<{
    nodes: EthereumNode[];
  }>(key, config);

  // useSWR to get the x-total-count from headers
  // const headers = response?.[0].headers as { 'x-total-count': string };
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
