import { noSpacePattern } from '@schemas/helpers';
import { RegisterOptions } from 'react-hook-form';

export const nameValidations: RegisterOptions = {
  required: 'Please provide a secret name',
  setValueAs: (value: string) => value.trim(),
  pattern: {
    value: noSpacePattern,
    message: 'A secret name should not containe spaces',
  },
};

export const typeValidations: RegisterOptions = {
  required: 'Please choose your secret type',
};

export const passwordValidations: RegisterOptions = {
  required: 'Please provide a password',
  setValueAs: (value: string) => value.trim(),
  shouldUnregister: true,
};

export const keyValidations: RegisterOptions = {
  required: 'Please provide a private key',
  setValueAs: (value: string) => value.trim(),
  shouldUnregister: true,
};

export const keystoreValidations: RegisterOptions = {
  required: 'Please upload your keystore',
  validate: {
    // The file must be in JSON format
    json: (value: string) => {
      try {
        JSON.parse(atob(value));
        return true;
      } catch (e) {
        return 'Your keystore should be in JSON format';
      }
    },
    // File size should be less than 50KB
    size: (value: string) =>
      value.length * (3 / 4) < 50 * 1024 ||
      'Your keystore should be less than 1 MB',
  },
};
