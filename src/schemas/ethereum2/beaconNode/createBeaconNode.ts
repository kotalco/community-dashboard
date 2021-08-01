import { RegisterOptions } from 'react-hook-form';
import { noSpacePattern } from '@schemas/helpers';

type Schema = {
  name: RegisterOptions;
  client: RegisterOptions;
  network: RegisterOptions;
  eth1Endpoints: RegisterOptions;
};

const schema: Partial<Schema> = {
  name: {
    required: 'Please provide a name for your node',
    setValueAs: (value: string) => value.trim(),
    pattern: {
      value: noSpacePattern,
      message: "Node name shouldn't contain whitespaces",
    },
  },
  client: {
    required: 'Please choose your client',
    validate: (value: string) =>
      value === 'teku' ||
      value === 'prysm' ||
      value === 'nimbus' ||
      value === 'lighthouse' ||
      'Please choose one of the clients available',
  },
  network: {
    required: 'Please choose your network',
  },
  eth1Endpoints: {
    validate: (value: string[] | undefined) =>
      (value && value.length > 0 && !!value[0]) ||
      'You need to enter at least 1 Ethereum endpoint when client is Prysm and network is not Mainnet',
  },
};

export default schema;
