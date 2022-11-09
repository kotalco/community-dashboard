import { SelectOption } from '@interfaces/SelectOption';
import { Ethereum2Network } from '@enums/Ethereum2/Ethereum2Network';

export const networkOptions: SelectOption[] = [
  { label: 'Mainnet', value: Ethereum2Network.mainnet },
  { label: 'Goerli', value: Ethereum2Network.goerli },
  { label: 'Sepolia', value: Ethereum2Network.sepolia },
];
