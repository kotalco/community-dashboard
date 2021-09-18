import { SelectOption } from '@interfaces/SelectOption';
import { Logging } from '@enums/Ethereum/Logging';
import { EthereumNodeClient } from '@enums/Ethereum/EthereumNodeClient';

export const loggingOptions = (value: EthereumNodeClient): SelectOption[] => {
  let options = [
    { label: 'All', value: Logging.all },
    { label: 'Debug', value: Logging.debug },
    { label: 'Error', value: Logging.error },
    { label: 'Info', value: Logging.info },
    { label: 'Warn', value: Logging.warn },
    { label: 'Fatal', value: Logging.fatal },
    { label: 'Trace', value: Logging.trace },
    { label: 'Off', value: Logging.off },
  ];

  if (value === EthereumNodeClient.geth) {
    options = options.filter(
      ({ value }) => value !== Logging.trace && value !== Logging.fatal
    );
  }

  return options;
};
