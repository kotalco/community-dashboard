import useSWRInfinite, {
  SWRInfiniteConfiguration,
  SWRInfiniteResponse,
} from 'swr/infinite';
import { AxiosResponse, AxiosError } from 'axios';

import axios from '@utils/axios';

interface InfiniteReturn<Data, Error>
  extends Pick<
    SWRInfiniteResponse<AxiosResponse<Data>, AxiosError<Error>>,
    'isValidating' | 'error' | 'mutate' | 'size' | 'setSize'
  > {
  data: Data[] | undefined;
  response: AxiosResponse<Data>[] | undefined;
  headers: { 'x-total-count': string } | undefined;
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
  ) => string | null,
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
      return key ? key : null;
    },
    (url: string) => axios.get<Data>(url),
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
    headers: response?.[0].headers as { 'x-total-count': string },
    response,
    error,
    isValidating,
    mutate,
    size,
    setSize,
  };
}
