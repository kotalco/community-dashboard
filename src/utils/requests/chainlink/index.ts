import {
  ChainlinkNode,
  CreateChainlinkNode,
} from '@interfaces/chainlink/ChainlinkNode';
import api from '../../axios';

export const createChainlinkNode = async (body: CreateChainlinkNode) => {
  const res = await api.post<{ node: ChainlinkNode }>(`/chainlink/nodes`, body);
  return res.data.node;
};
