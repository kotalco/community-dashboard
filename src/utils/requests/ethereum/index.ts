import axios from 'axios';
import {
  CreateEthereumNode,
  EthereumNode,
} from '@interfaces/Ethereum/ِEthereumNode';
import useSWR, { SWRConfiguration } from 'swr';
import { UnpackNestedValue } from 'react-hook-form';

import api, { fetcher, handleAxiosError } from '../../axios';

export const createEthereumNode = async (body: CreateEthereumNode) => {
  try {
    const { data } = await api.post<{ node: EthereumNode }>(
      `/ethereum/nodes`,
      body
    );

    return data.node;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return handleAxiosError(e);
    }
  }
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
