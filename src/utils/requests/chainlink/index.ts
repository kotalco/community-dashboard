import {
  ChainlinkNode,
  CreateChainlinkNode,
  UpdateChainlinkNode,
} from '@interfaces/chainlink/ChainlinkNode';
import api from '../../axios';

export const createChainlinkNode = async (body: CreateChainlinkNode) => {
  const res = await api.post<{ node: ChainlinkNode }>(`/chainlink/nodes`, body);
  return res.data.node;
};

export const updateChainlinkNode = async (
  body: UpdateChainlinkNode,
  name: string
) => {
  const res = await api.put<{ node: ChainlinkNode }>(
    `/chainlink/nodes/${name}`,
    body
  );
  return res.data.node;
};

export const deleteChainlinkNode = async (name: string) => {
  await api.delete(`/chainlink/nodes/${name}`);
};
