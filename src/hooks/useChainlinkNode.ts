import useSWR, { SWRConfiguration } from 'swr';

import { ChainlinkNode } from '@interfaces/chainlink/ChainlinkNode';

export const useChainlinkNode = (
  nodeName?: string,
  config?: SWRConfiguration
) => {
  const { data, ...rest } = useSWR<{ node: ChainlinkNode }>(
    !nodeName ? null : `/chainlink/nodes/${nodeName}`,
    config
  );

  return { node: data?.node, ...rest };
};
