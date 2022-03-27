import {
  CreateEthereumNode,
  EthereumNode,
  UpdateEthereumNode,
} from '@interfaces/Ethereum/ِEthereumNode';

import { api } from '../../axios';

export const createEthereumNode = async (body: CreateEthereumNode) => {
  const node = await api.post<never, EthereumNode>(`/ethereum/nodes`, body);
  return node;
};

export const updateEthereumNode = async (
  nodeData: UpdateEthereumNode,
  nodeName: string
) => {
  const node = await api.put<never, EthereumNode>(
    `/ethereum/nodes/${nodeName}`,
    nodeData
  );
  return node;
};

export const deleteEthereumNode = async (name: string) => {
  await api.delete(`/ethereum/nodes/${name}`);
};
