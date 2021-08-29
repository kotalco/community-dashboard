import { SelectOption } from '@interfaces/SelectOption';
import { EthereumNodeNetwork } from '@enums/Ethereum/EthereumNodeNetwork';

export const networkOptions: SelectOption[] = [
  { label: 'Mainnet', value: EthereumNodeNetwork.mainnet },
  { label: 'Rinkeby', value: EthereumNodeNetwork.rinkeby },
  { label: 'Ropsten', value: EthereumNodeNetwork.ropsten },
  { label: 'Goerli', value: EthereumNodeNetwork.goerli },
];

export const getNetworkLabel = (value: string) => {
  const network = networkOptions.find((network) => value === network.value);
  return network?.label || value;
};
