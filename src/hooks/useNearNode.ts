import useSWR, { SWRConfiguration } from 'swr';
import { AxiosError } from 'axios';

import { NearNode } from '@interfaces/near/NearNode';

export const useNearNode = (nodeName?: string, config?: SWRConfiguration) => {
  const { data, error, ...rest } = useSWR<{ node: NearNode }, AxiosError>(
    !nodeName ? null : `/near/nodes/${nodeName}`,
    config
  );

  return { node: data?.node, isLoading: !error && !data, error, ...rest };
};
