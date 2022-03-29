import {
  CreatePolkadotNode,
  PolkadotNode,
  UpdatePolkadotNode,
} from '@interfaces/polkadot/PolkadotNode';
import { api } from '@utils/axios';

export const createPolkadotNode = async (body: CreatePolkadotNode) => {
  const node = await api.post<never, PolkadotNode>(`/polkadot/nodes`, body);
  return node;
};

export const updatePolkadotNode = async (
  body: UpdatePolkadotNode,
  name: string
) => {
  const node = await api.put<never, PolkadotNode>(
    `/polkadot/nodes/${name}`,
    body
  );
  return node;
};

export const deletePolkadotNode = async (name: string) => {
  await api.delete(`/polkadot/nodes/${name}`);
};
