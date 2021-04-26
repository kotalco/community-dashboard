import Joi from 'joi'

export const schema = Joi.object({
  name: Joi.string().trim().required().pattern(/^\S*$/).messages({
    'string.empty': `Please provide a name for your node`,
    'string.pattern.base': `Node name shouldn't contain whitespaces`,
  }),
  client: Joi.string()
    .required()
    .valid('geth', 'besu', 'parity', 'nethermind')
    .messages({
      'string.empty': `Please choose your client`,
      'any.required': `Please choose your client`,
      'any.only': `Please choose your client`,
    }),
  selectNetwork: Joi.string()
    .required()
    .valid('mainnet', 'rinkeby', 'ropsten', 'goerli', 'other')
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
})
export default schema
