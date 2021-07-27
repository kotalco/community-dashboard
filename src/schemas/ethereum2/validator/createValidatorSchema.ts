import { noSpacePattern } from '@schemas/helpers';
import { RegisterOptions } from 'react-hook-form';

export const nameValidations: RegisterOptions = {
  required: 'Please provide a validator name',
  setValueAs: (value: string) => value.trim(),
  pattern: {
    value: noSpacePattern,
    message: "A validator name shouldn't contain spaces",
  },
};

export const clientValidations: RegisterOptions = {
  required: 'Please choose your client',
};

export const networkValidations: RegisterOptions = {
  required: 'Please provide a network name',
  setValueAs: (value: string) => value.trim(),
  value: '',
  pattern: {
    value: noSpacePattern,
    message: "Network name shouldn't contain spaces",
  },
  validate: (value: string) =>
    (value !== 'other' && value !== 'choose') ||
    'Please provide a network name',
};

export const keystoreValidations: RegisterOptions = {
  validate: (value: string[]) =>
    !!value.length || 'You have to choose at least 1 keystore',
};

export const walletPasswordValidations: RegisterOptions = {
  required: 'Please choose your wallet password',
  shouldUnregister: true,
  validate: (value: string) =>
    value !== 'Choose a wallet password...' ||
    'Please choose your wallet password',
};

export const beaconEndpointsValidations: RegisterOptions = {
  validate: (value: string[]) =>
    !!value.length || 'Please provide your beacon node endpoint',
};
