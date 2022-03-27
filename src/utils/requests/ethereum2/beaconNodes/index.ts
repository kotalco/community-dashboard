import {
  CreateBeaconNode,
  BeaconNode,
  UpdateBeaconnode,
} from '@interfaces/ethereum2/BeaconNode';
import { api } from '../../../axios';

export const createBeaconNode = async (values: CreateBeaconNode) => {
  const beaconnode = await api.post<never, BeaconNode>(
    '/ethereum2/beaconnodes',
    values
  );

  return beaconnode;
};

export const updateBeaconNode = async (
  nodeName: string,
  nodeData: UpdateBeaconnode
) => {
  const beaconnode = await api.put<never, BeaconNode>(
    `/ethereum2/beaconnodes/${nodeName}`,
    nodeData
  );

  return beaconnode;
};

export const deleteBeaconNode = async (nodeName: string) => {
  await api.delete(`/ethereum2/beaconnodes/${nodeName}`);
};
