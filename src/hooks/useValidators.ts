import { SWRInfiniteConfiguration } from 'swr/infinite';
import { AxiosError, AxiosResponse } from 'axios';

import { sortByDate } from '@utils/helpers/sortByDate';
import { Validator } from '@interfaces/ethereum2/Validator';
import useRequestInfinite from '@hooks/useRequestInfinite';

const PAGE_SIZE = 10;

function key(
  pageIndex: number,
  prevPageData: AxiosResponse<{
    validators: Validator[];
  }> | null
) {
  // Reached the end
  if (prevPageData && !prevPageData.data.validators.length) return null;
  // If first page, we don't have prevPageData
  if (pageIndex === 0) return '/ethereum2/validators';
  return `/ethereum2/validators?page=${pageIndex}`;
}

export const useValidators = (config?: SWRInfiniteConfiguration) => {
  // useRequestInfinit returns a paginated form of data
  const { data, headers, error, size, ...rest } = useRequestInfinite<
    {
      validators: Validator[];
    },
    AxiosError
  >(key, config);

  // useSWR to get the x-total-count from headers
  const totalCount = headers && parseInt(headers?.['x-total-count']);

  // Collect all data in single arrays instead of 2D arrays
  const initial: Validator[] = [];
  const validators = sortByDate(
    data?.reduce((prev, current) => prev.concat(current.validators), initial)
  );

  // Detect initial loading state
  const isInitialLoading = !data && !error;
  // Detect loading state any time
  const isLoading =
    isInitialLoading ||
    (size > 0 && data && typeof data[size - 1] === 'undefined');
  // Detect empty state
  const isEmpty = data?.[0]?.validators.length === 0;
  // Detect if at end page
  const isReachedEnd =
    isEmpty || (data && data[data.length - 1]?.validators.length < PAGE_SIZE);

  return {
    validators,
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
