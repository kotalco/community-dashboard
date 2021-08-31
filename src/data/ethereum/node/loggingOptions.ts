import { SelectOption } from '@interfaces/SelectOption';
import { Logging } from '@enums/Ethereum/Logging';

export const loggingOptions: SelectOption[] = [
  { label: 'Debug', value: Logging.debug },
  { label: 'Error', value: Logging.error },
  { label: 'Info', value: Logging.info },
  { label: 'Off', value: Logging.off },
  { label: 'Trace', value: Logging.trace },
  { label: 'Warn', value: Logging.warn },
];
