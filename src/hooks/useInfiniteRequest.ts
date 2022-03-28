import useSWRInfinite, {
  SWRInfiniteConfiguration,
  SWRInfiniteResponse,
} from 'swr/infinite';
import { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';

import { api } from '@utils/axios';

const PAGE_SIZE = 2;

interface InfiniteReturn<Data, Error>
  extends Pick<
    SWRInfiniteResponse<AxiosResponse<{ data: Data[] }>, AxiosError<Error>>,
    'isValidating' | 'error' | 'mutate' | 'size' | 'setSize'
  > {
  isInitialLoading: boolean;
  isLoading?: boolean;
  isEmpty: boolean;
  isReachedEnd?: boolean;
  data: Data[];
  totalCount?: number;
}

export interface InfiniteConfig<Data = unknown, Error = unknown>
  extends Omit<
    SWRInfiniteConfiguration<AxiosResponse<Data>, AxiosError<Error>>,
    'fallbackData'
  > {
  fallbackData?: Data[];
}

export default function useInfiniteRequest<Data = unknown, Error = unknown>(
  url: string,
  axiosConfig?: AxiosRequestConfig<Data>,
  { fallbackData, ...config }: InfiniteConfig<{ data: Data[] }, Error> = {}
): InfiniteReturn<Data, Error> {
  const {
    data: response,
    error,
    isValidating,
    mutate,
    size,
    setSize,
  } = useSWRInfinite<AxiosResponse<{ data: Data[] }>, AxiosError<Error>>(
    (pageIndex, previousPageData) => {
      // Reached the end
      if (previousPageData && !previousPageData.data.data.length) return null;
      // If first page, we don't have prevPageData
      if (pageIndex === 0) return url;
      return `${url}?page=${pageIndex}`;
    },
    (url: string) => api.get<{ data: Data[] }>(url, axiosConfig),
    {
      ...config,
      fallbackData:
        fallbackData &&
        fallbackData.map((i) => ({
          status: 200,
          statusText: 'InitialData',
          config: {},
          headers: {},
          data: i,
        })),
    }
  );

  // Collect all data in single arrays instead of 2D arrays
  const data =
    (response &&
      response
        .map((r) => r.data)
        .reduce((prev, current) => prev.concat(current.data), [] as Data[])) ||
    [];

  // Get total count from x-total-count in headers
  const totalCount =
    response?.[0].headers && parseInt(response?.[0].headers['x-total-count']);

  // Detect initial loading state
  const isInitialLoading = !response && !error;

  // Detect loading state any time
  const isLoading =
    isInitialLoading ||
    (size > 0 && response && typeof response[size - 1] === 'undefined');

  // Detect empty state
  const isEmpty = response?.[0]?.data.data.length === 0;

  // Detect if at end page
  const isReachedEnd =
    isEmpty ||
    (response && response[response.length - 1]?.data.data.length < PAGE_SIZE);

  return {
    data,
    totalCount,
    isInitialLoading,
    isLoading,
    isEmpty,
    isReachedEnd,
    error,
    size,
    isValidating,
    mutate,
    setSize,
  };
}
