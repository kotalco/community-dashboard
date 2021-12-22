import {
  CreatePolkadotNode,
  PolkadotNode,
  UpdatePolkadotNode,
} from '@interfaces/polkadot/PolkadotNode';
import api from '../../axios';

export const createPolkadotNode = async (body: CreatePolkadotNode) => {
  const res = await api.post<{ node: PolkadotNode }>(`/polkadot/nodes`, body);
  return res.data.node;
};

export const updatePolkadotNode = async (
  body: UpdatePolkadotNode,
  name: string
) => {
  const res = await api.put<{ node: PolkadotNode }>(
    `/polkadot/nodes/${name}`,
    body
  );
  return res.data.node;
};

// export const deleteChainlinkNode = async (name: string) => {
//   await api.delete(`/chainlink/nodes/${name}`);
// };
