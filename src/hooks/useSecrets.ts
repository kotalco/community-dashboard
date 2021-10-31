import { SWRInfiniteConfiguration } from 'swr/infinite';
import { AxiosError, AxiosResponse } from 'axios';

import { sortByDate } from '@utils/helpers/sortByDate';
import { KubernetesSecret } from '@interfaces/KubernetesSecret/KubernetesSecret';
import useRequestInfinite from '@hooks/useRequestInfinite';

const PAGE_SIZE = 10;

function key(
  pageIndex: number,
  prevPageData: AxiosResponse<{
    secrets: KubernetesSecret[];
  }> | null
) {
  // Reached the end
  if (prevPageData && !prevPageData.data.secrets.length) return null;
  // If first page, we don't have prevPageData
  if (pageIndex === 0) return '/core/secrets';
  return `/core/secrets?page=${pageIndex}`;
}

export const useSecrets = (config?: SWRInfiniteConfiguration) => {
  // useRequestInfinit returns a paginated form of data
  const { data, headers, error, size, ...rest } = useRequestInfinite<
    {
      secrets: KubernetesSecret[];
    },
    AxiosError
  >(key, config);
  console.log(headers);
  // useSWR to get the x-total-count from headers
  // const headers = response?.[0].headers as { 'x-total-count': string };
  const totalCount = headers?.['x-total-count'];

  // Collect all data in single arrays instead of 2D arrays
  const initial: KubernetesSecret[] = [];
  const secrets = sortByDate(
    data?.reduce((prev, current) => prev.concat(current.secrets), initial)
  );

  // Detect initial loading state
  const isInitialLoading = !data && !error;
  // Detect loading state any time
  const isLoading =
    isInitialLoading ||
    (size > 0 && data && typeof data[size - 1] === 'undefined');
  // Detect empty state
  const isEmpty = data?.[0]?.secrets.length === 0;
  // Detect if at end page
  const isReachedEnd =
    isEmpty || (data && data[data.length - 1]?.secrets.length < PAGE_SIZE);

  return {
    secrets,
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
