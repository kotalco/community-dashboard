import {
  ChainlinkNode,
  CreateChainlinkNode,
  UpdateChainlinkNode,
} from '@interfaces/chainlink/ChainlinkNode';
import { api } from '../../axios';

export const createChainlinkNode = async (body: CreateChainlinkNode) => {
  const node = await api.post<never, ChainlinkNode>(`/chainlink/nodes`, body);
  return node;
};

export const updateChainlinkNode = async (
  body: UpdateChainlinkNode,
  name: string
) => {
  const node = await api.put<never, ChainlinkNode>(
    `/chainlink/nodes/${name}`,
    body
  );
  return node;
};

export const deleteChainlinkNode = async (name: string) => {
  await api.delete(`/chainlink/nodes/${name}`);
};
