import {
  CreateFilecoinNode,
  FilecoinNode,
  UpdateFilecoinNode,
} from '@interfaces/filecoin/FilecoinNode';

import { api } from '../../axios';

export const createFilecoinNode = async (body: CreateFilecoinNode) => {
  const node = await api.post<never, FilecoinNode>(`/filecoin/nodes`, body);
  return node;
};

export const updateFilecoinNode = async (
  body: UpdateFilecoinNode,
  name: string
) => {
  const node = await api.put<never, FilecoinNode>(
    `/filecoin/nodes/${name}`,
    body
  );
  return node;
};

export const deleteFilecoinNode = async (name: string) => {
  await api.delete(`/filecoin/nodes/${name}`);
};
