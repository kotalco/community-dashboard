import useSWR, { SWRConfiguration } from 'swr';
import { AxiosError } from 'axios';

import { EthereumNode } from '@interfaces/Ethereum/ِEthereumNode';

export const useEthereumNode = (
  nodeName?: string,
  config?: SWRConfiguration
) => {
  const { data, error, ...rest } = useSWR<{ node: EthereumNode }, AxiosError>(
    !nodeName ? null : `/ethereum/nodes/${nodeName}`,
    config
  );

  return { node: data?.node, isLoading: !error && !data, error, ...rest };
};
