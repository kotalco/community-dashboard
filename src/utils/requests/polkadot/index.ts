import {
  CreatePolkadotNode,
  PolkadotNode,
} from '@interfaces/polkadot/PolkadotNode';
import api from '../../axios';

export const createPolkadotNode = async (body: CreatePolkadotNode) => {
  const res = await api.post<{ node: PolkadotNode }>(`/polkadot/nodes`, body);
  return res.data.node;
};

// export const updateChainlinkNode = async (
//   body: UpdateChainlinkNode,
//   name: string
// ) => {
//   const res = await api.put<{ node: ChainlinkNode }>(
//     `/chainlink/nodes/${name}`,
//     body
//   );
//   return res.data.node;
// };

// export const deleteChainlinkNode = async (name: string) => {
//   await api.delete(`/chainlink/nodes/${name}`);
// };
