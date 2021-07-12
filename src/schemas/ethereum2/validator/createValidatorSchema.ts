// import Joi from 'joi'

import { noSpacePattern } from '@schemas/helpers'
import { RegisterOptions } from 'react-hook-form'

// export const schema = Joi.object({
//   name: Joi.string().trim().required().pattern(/^\S*$/).messages({
//     'string.empty': `Please provide a name for your node`,
//     'string.pattern.base': `Node name shouldn't contain whitespaces`,
//   }),
//   client: Joi.string()
//     .required()
//     .valid('teku', 'prysm', 'lighthouse', 'nimbus')
//     .messages({
//       'string.empty': `Please choose your client`,
//       'any.required': `Please choose your client`,
//       'any.only': `Please choose your client`,
//     }),
//   selectNetwork: Joi.string()
//     .required()
//     .valid('mainnet', 'pyrmont', 'prater', 'other')
//     .messages({
//       'string.empty': `Please choose your network`,
//       'any.required': `Please choose your network`,
//       'any.only': `Please choose your network`,
//     }),
//   textNetwork: Joi.string()
//     .when('selectNetwork', {
//       is: Joi.valid('other'),
//       then: Joi.string().required(),
//       otherwise: Joi.string().allow(''),
//     })
//     .messages({
//       'string.empty': `Please provide a network name`,
//       'any.required': `Please provide a network name`,
//     }),
//   beaconEndpoints: Joi.when('client', {
//     not: 'lighthouse',
//     otherwise: Joi.array().items(Joi.string()).min(1),
//     then: Joi.array().items(Joi.string()).length(1),
//   }).messages({
//     'array.min': 'You need to enter at least 1 beacon endpoint',
//     'array.length': 'Please enter only 1 endpoint in case of lighthouse client',
//   }),
//   keystores: Joi.array().items(Joi.string()).min(1).messages({
//     'array.min': 'You need to choose at least 1 keystore',
//   }),
//   walletPasswordSecretName: Joi.when('client', {
//     is: 'prysm',
//     then: Joi.required().invalid('Choose a wallet password...'),
//     otherwise: Joi.string().strip(),
//   }).messages({
//     'any.invalid': 'Please choose a wallet password secret name',
//   }),
// })
// export default schema

export const nameValidations: RegisterOptions = {
  required: 'Please provide a validator name',
  setValueAs: (value: string) => value.trim(),
  pattern: {
    value: noSpacePattern,
    message: "A validator name shouldn't contain spaces",
  },
}

export const clientValidations: RegisterOptions = {
  required: 'Please choose your client',
}

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
}

export const keystoreValidations: RegisterOptions = {
  validate: (value: string[]) =>
    !!value.length || 'You have to choose at least 1 keystore',
}

export const walletPasswordValidations: RegisterOptions = {
  required: 'Please choose your wallet password',
  shouldUnregister: true,
  validate: (value: string) =>
    value !== 'Choose a wallet password...' ||
    'Please choose your wallet password',
}

export const beaconEndpointsValidations: RegisterOptions = {
  validate: (value: string[]) =>
    !!value.length || 'Please provide your beacon node endpoint',
}
