import { SelectOption } from '@interfaces/SelectOption';
import { SyncMode } from '@enums/Ethereum/SyncMode';

export const syncModeOptions: SelectOption[] = [
  { label: 'Fast', value: SyncMode.fast },
  { label: 'Full', value: SyncMode.full },
  { label: 'Light', value: SyncMode.light },
];
