import { SelectOption } from '@interfaces/SelectOption';
import { EthereumNodeClient } from '@enums/Ethereum/EthereumNodeClient';

export const clientOptions: SelectOption[] = [
  { label: 'Go Ethereum', value: EthereumNodeClient.geth },
  { label: 'Hyperledger Besu', value: EthereumNodeClient.besu },
  { label: 'Open Ethereum', value: EthereumNodeClient.parity },
  { label: 'Nethermind', value: EthereumNodeClient.nethermind },
];

export const getClientLabel = (value: EthereumNodeClient) => {
  const client = clientOptions.find((client) => value === client.value);
  return client?.label || value;
};
