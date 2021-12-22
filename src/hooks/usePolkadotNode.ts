import useSWR, { SWRConfiguration } from 'swr';
import { AxiosError } from 'axios';

import { PolkadotNode } from '@interfaces/polkadot/PolkadotNode';

export const usePolkadotNode = (
  nodeName?: string,
  config?: SWRConfiguration
) => {
  const { data, error, ...rest } = useSWR<{ node: PolkadotNode }, AxiosError>(
    !nodeName ? null : `/polkadot/nodes/${nodeName}`,
    config
  );

  return { node: data?.node, isLoading: !error && !data, error, ...rest };
};
