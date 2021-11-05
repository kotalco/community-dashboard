import axios, { fetcher } from '../../../axios';
import useSWR, { SWRConfiguration } from 'swr';

import {
  CreateBeaconNode,
  BeaconNode,
  UpdateBeaconNode,
} from '@interfaces/ethereum2/BeaconNode';

export const createBeaconNode = async (
  values: CreateBeaconNode
): Promise<BeaconNode> => {
  const { data } = await axios.post<{ beaconnode: BeaconNode }>(
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
  const swr = useSWR<{ beaconnode: BeaconNode }>(
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
  nodeData: UpdateBeaconNode
): Promise<BeaconNode> => {
  const { data } = await axios.put<{ beaconnode: BeaconNode }>(
    `/ethereum2/beaconnodes/${nodeName}`,
    nodeData
  );

  return data.beaconnode;
};
