import { Network } from '@enums/Near/Network';
import { SelectOption } from '@interfaces/SelectOption';

export const NETWORKS: SelectOption[] = [
  { label: 'Mainnet', value: Network.mainnet },
  { label: 'Betanet', value: Network.betanet },
  { label: 'Testnet', value: Network.testnet },
];
