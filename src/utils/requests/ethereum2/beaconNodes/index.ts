import axios, { fetcher } from '../../../axios';
import { AxiosError } from 'axios';
import useSWR, { SWRConfiguration } from 'swr';

import {
  CreateEthereum2BeaconNode,
  Ethereum2BeaconNode,
  UpdateEthereum2BeaconNode,
} from '@interfaces/ethereum2/Ethereum2BeaconNode';
import { UnpackNestedValue } from 'react-hook-form';

/**
 * Send a get request to find all ethereum 2.0 beacon nodes
 * @param config Any SWR Configration Value
 * @returns All Ethereum 2.0 beacon nodes
 */
export const useBeaconnodes = (config?: SWRConfiguration) => {
  const swr = useSWR<{ beaconnodes: Ethereum2BeaconNode[] }, AxiosError>(
    '/ethereum2/beaconnodes',
    fetcher,
    config
  );
  const data = swr.data?.beaconnodes;

  return { ...swr, data };
};

/**
 * Send a post request to create a new beacon node using ethereum 2.0 protocol
 * @param body The required data to create a new beacon node
 * @returns The newly created beacon node
 */
export const createBeaconNode = async (
  values: UnpackNestedValue<CreateEthereum2BeaconNode>
): Promise<Ethereum2BeaconNode> => {
  const { data } = await axios.post<{ beaconnode: Ethereum2BeaconNode }>(
    '/ethereum2/beaconnodes',
    values
  );

  return data.beaconnode;
};

/**
 * Send a get request to find a beacon node by its name
 * @param nodeName Name of the node we are looking for
 * @param config Any SWR Configration Value
 * @returns All node data if found
 */
export const useBeaconnode = (nodeName?: string, config?: SWRConfiguration) => {
  const swr = useSWR<{ beaconnode: Ethereum2BeaconNode }>(
    !nodeName ? null : `/ethereum2/beaconnodes/${nodeName}`,
    fetcher,
    config
  );
  const data = swr.data?.beaconnode;

  return { ...swr, data };
};

/**
 * Send a delete request to delete the beacon node
 * @param nodeName Node name to be deleted
 */
export const deleteBeaconNode = async (nodeName: string): Promise<void> => {
  await axios.delete(`/ethereum2/beaconnodes/${nodeName}`);
};

export const updateBeaconNode = async (
  nodeName: string,
  nodeData: UpdateEthereum2BeaconNode
): Promise<Ethereum2BeaconNode> => {
  const { data } = await axios.put<{ beaconnode: Ethereum2BeaconNode }>(
    `/ethereum2/beaconnodes/${nodeName}`,
    nodeData
  );

  return data.beaconnode;
};
