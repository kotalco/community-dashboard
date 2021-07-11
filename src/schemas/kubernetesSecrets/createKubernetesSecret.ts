import { noSpacePattern } from '@schemas/helpers'
import { RegisterOptions } from 'react-hook-form'

export const nameValidations: RegisterOptions = {
  required: 'Please provide a secret name',
  setValueAs: (value: string) => value.trim(),
  pattern: {
    value: noSpacePattern,
    message: 'A secret name should not containe spaces',
  },
}

export const typeValidations: RegisterOptions = {
  required: 'Please choose your secret type',
}

export const passwordValidations: RegisterOptions = {
  required: 'Please provide a password',
  setValueAs: (value: string) => value.trim(),
  shouldUnregister: true,
}

export const keyValidations: RegisterOptions = {
  required: 'Please provide a private key',
  setValueAs: (value: string) => value.trim(),
  shouldUnregister: true,
}

export const keystoreValidations: RegisterOptions = {
  required: 'Please upload your keystore',
  validate: {
    json: (value: File) =>
      value.type === 'application/json' ||
      'Your keystore should be in JSON format',
    size: (value: File) =>
      value.size < 1 * 1024 * 1024 || 'Your keystore should be less than 1 MB',
  },
}
