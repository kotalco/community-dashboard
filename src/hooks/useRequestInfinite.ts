import useSWRInfinite, {
  SWRInfiniteConfiguration,
  SWRInfiniteResponse,
} from 'swr/infinite';
import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

import axios from '@utils/axios';

export type GetRequest = AxiosRequestConfig | null;

interface InfiniteReturn<Data, Error>
  extends Pick<
    SWRInfiniteResponse<AxiosResponse<Data>, AxiosError<Error>>,
    'isValidating' | 'error' | 'mutate' | 'size' | 'setSize'
  > {
  data: Data[] | undefined;
  response: AxiosResponse<Data>[] | undefined;
}

export interface InfiniteConfig<Data = unknown, Error = unknown>
  extends Omit<
    SWRInfiniteConfiguration<AxiosResponse<Data>, AxiosError<Error>>,
    'fallbackData'
  > {
  fallbackData?: Data[];
}

export default function useRequestInfinite<Data = unknown, Error = unknown>(
  getRequest: (
    index: number,
    previousPageData: AxiosResponse<Data> | null
  ) => GetRequest,
  { fallbackData, ...config }: InfiniteConfig<Data, Error> = {}
): InfiniteReturn<Data, Error> {
  const {
    data: response,
    error,
    isValidating,
    mutate,
    size,
    setSize,
  } = useSWRInfinite<AxiosResponse<Data>, AxiosError<Error>>(
    (index, previousPageData) => {
      const key = getRequest(index, previousPageData);
      return key ? JSON.stringify(key) : null;
    },
    (request: string) => axios(JSON.parse(request)),
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

  return {
    data: response && response.map((r) => r.data),
    response,
    error,
    isValidating,
    mutate,
    size,
    setSize,
  };
}
