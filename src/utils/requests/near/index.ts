import {
  CreateNearNode,
  NearNode,
  UpdateNearNode,
} from '@interfaces/near/NearNode';

import { api } from '@utils/axios';

export const createNearNode = async (body: CreateNearNode) => {
  const node = await api.post<never, NearNode>(`/near/nodes`, body);
  return node;
};

export const updateNearNode = async (body: UpdateNearNode, name: string) => {
  const node = await api.put<never, NearNode>(`/near/nodes/${name}`, body);
  return node;
};

export const deleteNearNode = async (name: string) => {
  await api.delete(`/near/nodes/${name}`);
};
