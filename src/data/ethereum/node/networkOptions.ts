import { SelectOption } from '@interfaces/SelectOption';
import { EthereumNodeNetwork } from '@enums/Ethereum/EthereumNodeNetwork';

export const networkOptions: SelectOption[] = [
  { label: 'Mainnet', value: EthereumNodeNetwork.mainnet },
  { label: 'Sepolia', value: EthereumNodeNetwork.sepolia },
  { label: 'Goerli', value: EthereumNodeNetwork.goerli },
];
