import axios from '../../../axios';

import {
  CreateBeaconNode,
  BeaconNode,
  UpdateBeaconnode,
} from '@interfaces/ethereum2/BeaconNode';

export const createBeaconNode = async (values: CreateBeaconNode) => {
  const { data } = await axios.post<{ beaconnode: BeaconNode }>(
    '/ethereum2/beaconnodes',
    values
  );

  return data.beaconnode;
};

export const deleteBeaconNode = async (nodeName: string): Promise<void> => {
  await axios.delete(`/ethereum2/beaconnodes/${nodeName}`);
};

export const updateBeaconNode = async (
  nodeName: string,
  nodeData: UpdateBeaconnode
) => {
  const { data } = await axios.put<{ beaconnode: BeaconNode }>(
    `/ethereum2/beaconnodes/${nodeName}`,
    nodeData
  );

  return data.beaconnode;
};
