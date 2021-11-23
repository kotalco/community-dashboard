import { Logging } from '@enums/Chainlink/Logging';

export const loggingOptions = [
  { label: 'Debug', value: Logging.debug },
  { label: 'Error', value: Logging.error },
  { label: 'Info', value: Logging.info },
  { label: 'Warn', value: Logging.warn },
  { label: 'Panic', value: Logging.panic },
];
