import axios, { fetcher } from '../../../axios';
import useSWR, { SWRConfiguration } from 'swr';

import {
  CreateBeaconNode,
  BeaconNode,
  UpdateBeaconnode,
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
 * Send a delete request to delete the beacon node
 * @param nodeName Node name to be deleted
 */
export const deleteBeaconNode = async (nodeName: string): Promise<void> => {
  await axios.delete(`/ethereum2/beaconnodes/${nodeName}`);
};

export const updateBeaconNode = async (
  nodeName: string,
  nodeData: UpdateBeaconnode
): Promise<BeaconNode> => {
  const { data } = await axios.put<{ beaconnode: BeaconNode }>(
    `/ethereum2/beaconnodes/${nodeName}`,
    nodeData
  );

  return data.beaconnode;
};
