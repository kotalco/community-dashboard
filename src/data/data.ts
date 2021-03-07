export const NODES = [
  {
    id: 1,
    name: 'my-beacon-node',
    client: 'Pyrmont',
    server: 'Prysm',
  },
  {
    id: 2,
    name: 'my-filecoin-node',
    client: 'Calibration',
    server: 'lotus',
  },
  {
    id: 3,
    name: 'my-ethereum-node',
    client: 'Rinkeby',
    server: 'Hyperledger Besu',
  },
]

export const ENDPOINTS = [
  {
    id: 1,
    name: 'beacon-endpoint',
    nodeName: 'my-beacon-node',
  },
  {
    id: 2,
    name: 'calibration-endpoint',
    nodeName: 'my-filecoin-node',
  },
  {
    id: 3,
    name: 'rinkeby-endpoint',
    nodeName: 'my-ethereum-node',
  },
]
