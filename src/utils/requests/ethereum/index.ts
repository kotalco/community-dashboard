import {
  CreateEthereumNode,
  EthereumNode,
} from '@interfaces/Ethereum/ِEthereumNode';
import { UnpackNestedValue } from 'react-hook-form';

import api from '../../axios';

export const createEthereumNode = async (body: CreateEthereumNode) => {
  const res = await api.post<{ node: EthereumNode }>(`/ethereum/nodes`, body);
  return res.data.node;
};

/**
 * Find ethereum node by its name and updates its data
 * @param nodeData new data to be updates, (client)
 * @param nodeName ethereum node name
 * @returns the updated node data after update is done
 */
export const updateEthereumNode = async (
  nodeName: string,
  nodeData: Partial<UnpackNestedValue<EthereumNode>>
): Promise<EthereumNode> => {
  const { data } = await api.put<{ node: EthereumNode }>(
    `/ethereum/nodes/${nodeName}`,
    nodeData
  );
  return data.node;
};

/**
 * Send a delete request to delete an Ethereum Node
 * @param name Ethereum node name
 */
export const deleteNode = async (name: string): Promise<void> => {
  await api.delete(`/ethereum/nodes/${name}`);
};
