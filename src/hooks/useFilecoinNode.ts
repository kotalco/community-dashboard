import useSWR, { SWRConfiguration } from 'swr';
import { AxiosError } from 'axios';

import { FilecoinNode } from '@interfaces/filecoin/FilecoinNode';

export const useFilecoinNode = (
  nodeName?: string,
  config?: SWRConfiguration
) => {
  const { data, error, ...rest } = useSWR<{ node: FilecoinNode }, AxiosError>(
    !nodeName ? null : `/filecoin/nodes/${nodeName}`,
    config
  );

  return { node: data?.node, isLoading: !error && !data, error, ...rest };
};
