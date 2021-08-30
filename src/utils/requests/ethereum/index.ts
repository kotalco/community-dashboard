import axios, { fetcher } from '../../axios';
import {
  CreateEthereumNode,
  EthereumNode,
} from '@interfaces/Ethereum/ِEthereumNode';
import useSWR, { SWRConfiguration } from 'swr';

export const getAllNodes = async (): Promise<EthereumNode[]> => {
  const { data } = await axios.get<{ nodes: EthereumNode[] }>(
    `/ethereum/nodes`
  );
  return data.nodes;
};

/**
 * Create a new node
 * @param body ethereum node data
 * @returns the newly created node
 */
export const createEthereumNode = async (
  body: CreateEthereumNode
): Promise<EthereumNode> => {
  const { data } = await axios.post<{ node: EthereumNode }>(
    `/ethereum/nodes`,
    body
  );

  return data.node;
};

/**
 * Find ethereum node by its name
 * @param name ethereum node name
 * @param config SWR Configrations
 * @returns the found node or error 404 in not found
 */
export const useNode = (nodeName?: string, config?: SWRConfiguration) => {
  const swr = useSWR<{ node: EthereumNode }>(
    !nodeName ? null : `/ethereum/nodes/${nodeName}`,
    fetcher,
    config
  );
  const data = swr.data?.node;

  return { ...swr, data };
};

/**
 * Find ethereum node by its name and updates its data
 * @param nodeData new data to be updates, (client)
 * @param nodeName ethereum node name
 * @returns the updated node data after update is done
 */
export const updateEthereumNode = async (
  nodeName: string,
  nodeData: Partial<EthereumNode>
): Promise<EthereumNode> => {
  const { data } = await axios.put<{ node: EthereumNode }>(
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
  await axios.delete(`/ethereum/nodes/${name}`);
};
