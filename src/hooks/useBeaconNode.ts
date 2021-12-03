import useSWR, { SWRConfiguration } from 'swr';
import { AxiosError } from 'axios';

import { BeaconNode } from '@interfaces/ethereum2/BeaconNode';

export const useBeaconnode = (nodeName?: string, config?: SWRConfiguration) => {
  const { data, error, ...rest } = useSWR<
    { beaconnode: BeaconNode },
    AxiosError
  >(!nodeName ? null : `/ethereum2/beaconnodes/${nodeName}`, config);
  const beaconnode = data?.beaconnode;
  const isLoading = !error && !data;

  return { beaconnode, error, isLoading, ...rest };
};
