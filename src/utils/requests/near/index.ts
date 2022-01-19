import {
  CreateNearNode,
  NearNode,
  UpdateNearNode,
} from '@interfaces/near/NearNode';

import api from '../../axios';

export const createNearNode = async (body: CreateNearNode) => {
  const res = await api.post<{ node: NearNode }>(`/near/nodes`, body);
  return res.data.node;
};

export const updateNearNode = async (body: UpdateNearNode, name: string) => {
  const res = await api.put<{ node: NearNode }>(`/near/nodes/${name}`, body);
  return res.data.node;
};

export const deleteNearNode = async (name: string) => {
  await api.delete(`/near/nodes/${name}`);
};
