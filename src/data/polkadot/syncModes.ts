import { SyncMode } from '@enums/Polkadot/SyncMode';
import { SelectOption } from '@interfaces/SelectOption';

export const SYNC_MODES: SelectOption[] = [
  {
    label: 'Fast',
    value: SyncMode.fast,
  },
  {
    label: 'Full',
    value: SyncMode.full,
  },
];
