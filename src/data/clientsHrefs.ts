import { EthereumNodeClient } from '@enums/Ethereum/EthereumNodeClient';
import { Ethereum2Client } from '@enums/Ethereum2/Ethereum2Client';
import { ClientLink } from '@interfaces/ClientLink';

export const clientsHrefs: ClientLink[] = [
  {
    client: EthereumNodeClient.besu,
    href: 'https://github.com/hyperledger/besu',
  },
  {
    client: EthereumNodeClient.geth,
    href: 'https://github.com/ethereum/go-ethereum',
  },
  {
    client: EthereumNodeClient.nethermind,
    href: 'https://github.com/NethermindEth/nethermind',
  },
  {
    client: Ethereum2Client.lighthouse,
    href: 'https://github.com/sigp/lighthouse',
  },
  {
    client: Ethereum2Client.nimbus,
    href: 'https://github.com/status-im/nimbus-eth2',
  },
  {
    client: Ethereum2Client.prysm,
    href: 'https://github.com/prysmaticlabs/prysm',
  },
  { client: Ethereum2Client.teku, href: 'https://github.com/ConsenSys/teku' },
];
