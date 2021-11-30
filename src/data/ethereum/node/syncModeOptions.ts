import { SyncMode } from '@enums/Ethereum/SyncMode';
import { EthereumNodeClient } from '@enums/Ethereum/EthereumNodeClient';

export const syncModeOptions = (client: EthereumNodeClient) => {
  let options = [
    { label: 'Fast', value: SyncMode.fast },
    { label: 'Full', value: SyncMode.full },
    { label: 'Light', value: SyncMode.light },
  ];

  if (
    client === EthereumNodeClient.besu ||
    client === EthereumNodeClient.parity
  ) {
    options = options.filter((option) => option.value !== SyncMode.light);
  }

  return options;
};
