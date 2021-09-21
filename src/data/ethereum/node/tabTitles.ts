import { EthereumNodeClient } from '@enums/Ethereum/EthereumNodeClient';

export const titles = [
  'Protocol',
  'Networking',
  'API',
  'Access Control',
  'Mining',
  'Logging',
  'Resources',
  'Danger Zone',
];

export const tabTitles = (client: EthereumNodeClient) => {
  if (client === EthereumNodeClient.nethermind) {
    return titles.filter((title) => title !== 'Access Control');
  }
  return titles;
};
