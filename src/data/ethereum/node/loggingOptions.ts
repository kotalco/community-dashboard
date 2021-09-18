import { SelectOption } from '@interfaces/SelectOption';
import { Logging } from '@enums/Ethereum/Logging';

export const loggingOptions: SelectOption[] = [
  { label: 'All', value: Logging.all },
  { label: 'Debug', value: Logging.debug },
  { label: 'Error', value: Logging.error },
  { label: 'Info', value: Logging.info },
  { label: 'Trace', value: Logging.trace },
  { label: 'Warn', value: Logging.warn },
  { label: 'Fatal', value: Logging.fatal },
  { label: 'Off', value: Logging.off },
];
