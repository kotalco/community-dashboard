import useSWR, { SWRConfiguration } from 'swr';
import { AxiosError } from 'axios';

import { ChainlinkNode } from '@interfaces/chainlink/ChainlinkNode';

export const useChainlinkNode = (
  nodeName?: string,
  config?: SWRConfiguration
) => {
  const { data, error, ...rest } = useSWR<{ node: ChainlinkNode }, AxiosError>(
    !nodeName ? null : `/chainlink/nodes/${nodeName}`,
    config
  );

  return { node: data?.node, isLoading: !error && !data, error, ...rest };
};
