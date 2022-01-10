import { SelectOption } from '@interfaces/SelectOption';
import { Ethereum2Network } from '@enums/Ethereum2/Ethereum2Network';

export const networkOptions: SelectOption[] = [
  { label: 'Mainnet', value: Ethereum2Network.mainnet },
  { label: 'Pyrmont', value: Ethereum2Network.pyrmont },
  { label: 'Prater', value: Ethereum2Network.prater },
];
