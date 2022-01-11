import { Network } from '@enums/Filecoin/Network';
import { SelectOption } from '@interfaces/SelectOption';

export const NETWORKS: SelectOption[] = [
  { label: 'Mainnet', value: Network.mainnet },
  { label: 'Calibration', value: Network.calibration },
];
