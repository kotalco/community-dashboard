import Joi from 'joi'

export const schema = Joi.object({
  name: Joi.string().trim().required().pattern(/^\S*$/).messages({
    'string.empty': `Please provide a name for your node`,
    'string.pattern.base': `Node name shouldn't contain whitespaces`,
  }),
  client: Joi.string()
    .required()
    .valid('teku', 'prysm', 'lighthouse', 'nimbus')
    .messages({
      'string.empty': `Please choose your client`,
      'any.required': `Please choose your client`,
      'any.only': `Please choose your client`,
    }),
  selectNetwork: Joi.string()
    .required()
    .valid('mainnet', 'pyrmont', 'prater', 'other')
    .messages({
      'string.empty': `Please choose your network`,
      'any.required': `Please choose your network`,
      'any.only': `Please choose your network`,
    }),
  textNetwork: Joi.string()
    .when('selectNetwork', {
      is: Joi.valid('other'),
      then: Joi.string().required(),
      otherwise: Joi.string().allow(''),
    })
    .messages({
      'string.empty': `Please provide a network name`,
      'any.required': `Please provide a network name`,
    }),
  beaconEndpoints: Joi.array().items(Joi.string()).min(1).messages({
    'array.min': 'You need to enter at least 1 beacon endpoint',
  }),
  keystores: Joi.array().items(Joi.string()).min(1).messages({
    'array.min': 'You need to choose at least 1 keystore',
  }),
  walletPasswordSecretName: Joi.string().required().messages({
    'string.empty': `Please choose your client`,
    'any.required': `Please choose your client`,
    'any.only': `Please choose your client`,
  }),
})
export default schema
