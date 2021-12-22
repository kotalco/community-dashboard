import { Network } from '@enums/Polkadot/Network';
import { SelectOption } from '@interfaces/SelectOption';

export const NETWORKS: SelectOption[] = [
  {
    label: 'Kusama',
    value: Network.kusama,
  },
  {
    label: 'Polkadot',
    value: Network.polkadot,
  },
  {
    label: 'Rococo',
    value: Network.rococo,
  },
  {
    label: 'Westend',
    value: Network.westend,
  },
];
