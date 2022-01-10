import { EthereumNodeClient } from '@enums/Ethereum/EthereumNodeClient';
import { Ethereum2Client } from '@enums/Ethereum2/Ethereum2Client';

export interface ClientLink {
  client: Ethereum2Client | EthereumNodeClient;
  href: string;
}
