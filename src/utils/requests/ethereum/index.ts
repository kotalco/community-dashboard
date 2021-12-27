import {
  CreateEthereumNode,
  EthereumNode,
  UpdateEthereumNode,
} from '@interfaces/Ethereum/ِEthereumNode';

import api from '../../axios';

export const createEthereumNode = async (body: CreateEthereumNode) => {
  const res = await api.post<{ node: EthereumNode }>(`/ethereum/nodes`, body);
  return res.data.node;
};

export const updateEthereumNode = async (
  nodeData: UpdateEthereumNode,
  nodeName: string
) => {
  const { data } = await api.put<{ node: EthereumNode }>(
    `/ethereum/nodes/${nodeName}`,
    nodeData
  );
  return data.node;
};

export const deleteEthereumNode = async (name: string) => {
  await api.delete(`/ethereum/nodes/${name}`);
};
