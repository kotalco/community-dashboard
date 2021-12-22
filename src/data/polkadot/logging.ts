import { Logging } from '@enums/Polkadot/Logging';
import { SelectOption } from '@interfaces/SelectOption';

export const LOGGINGS: SelectOption[] = [
  { label: 'Debug', value: Logging.debug },
  { label: 'Error', value: Logging.error },
  { label: 'Info', value: Logging.info },
  { label: 'Trace', value: Logging.trace },
  { label: 'Warn', value: Logging.warn },
];
