import {
  CreateFilecoinNode,
  FilecoinNode,
} from '@interfaces/filecoin/FilecoinNode';

import api from '../../axios';

export const createFilecoinNode = async (body: CreateFilecoinNode) => {
  const res = await api.post<{ node: FilecoinNode }>(`/filecoin/nodes`, body);
  return res.data.node;
};

// export const updatePolkadotNode = async (
//   body: UpdatePolkadotNode,
//   name: string
// ) => {
//   const res = await api.put<{ node: PolkadotNode }>(
//     `/polkadot/nodes/${name}`,
//     body
//   );
//   return res.data.node;
// };

// export const deletePolkadotNode = async (name: string) => {
//   await api.delete(`/polkadot/nodes/${name}`);
// };
