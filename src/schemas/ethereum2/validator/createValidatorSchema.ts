import { noSpacePattern } from '@schemas/helpers';
import { RegisterOptions } from 'react-hook-form';

type Schema = {
  name: RegisterOptions;
  client: RegisterOptions;
  network: RegisterOptions;
  keystore: RegisterOptions;
  walletPassword: RegisterOptions;
  beaconEndpoints: RegisterOptions;
};

export const schema: Schema = {
  name: {
    required: 'Please provide a validator name',
    setValueAs: (value: string) => value.trim(),
    pattern: {
      value: noSpacePattern,
      message: "A validator name shouldn't contain spaces",
    },
  },
  client: { required: 'Please choose your client' },
  network: { required: 'Please provide a network name' },
  keystore: {
    required: 'You have to choose at least 1 keystore',
    validate: (value: string[]) =>
      !!value.length || 'You have to choose at least 1 keystore',
  },
  walletPassword: { required: 'Please choose your wallet password' },
  beaconEndpoints: {
    required: 'Please provide your beacon node endpoint',
    validate: (value: string[]) =>
      !!value.length || 'Please provide your beacon node endpoint',
  },
};
