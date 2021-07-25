import { RegisterOptions } from 'react-hook-form'

import { noSpacePattern } from '@schemas/helpers'

export const nameValidations: RegisterOptions = {
  required: 'Please provide cluster peer name',
  pattern: {
    value: noSpacePattern,
    message: 'Cluster peer name should have no spaces',
  },
  setValueAs: (value: string) => value.trim(),
}

export const consensusValidations: RegisterOptions = {
  required: 'Please choose your consensus algorithm',
}

export const clusterSecretNameValidations: RegisterOptions = {
  required: 'Please Provide your cluster secret name',
}

export const idValidation: RegisterOptions = {
  required: 'Please provide cluster peer ID',
  shouldUnregister: true,
  setValueAs: (value: string) => value.trim(),
}

export const privatekeySecretNameValidations: RegisterOptions = {
  required: 'Please choose your private key',
  shouldUnregister: true,
  validate: (value: string) =>
    value !== 'Choose a private key name...' ||
    'Please choose your private key',
}

export const trustedPeersValidation: RegisterOptions = {
  validate: (value: string[] | undefined) => {
    if (!value || !value.length) {
      return 'Please add your trusted peers'
    }
    return true
  },
}
