import Joi from 'joi'

export const schema = Joi.object({
  name: Joi.string().trim().required().pattern(/^\S*$/).messages({
    'string.empty': `Please provide a name for your node`,
    'string.pattern.base': `Node name shouldn't contain whitespaces`,
  }),
  protocol: Joi.string().required().messages({
    'string.empty': `Please choose your protocol`,
  }),
  client: Joi.string().required().messages({
    'string.empty': `Please choose your client`,
    'any.required': `Please choose your client`,
  }),
  selectNetwork: Joi.string().required().messages({
    'string.empty': `Please choose your network`,
    'any.required': `Please choose your network`,
  }),
  textNetwork: Joi.string().allow(''),
}).custom((values) => {
  if (values.selectNetwork === 'other' && values.textNetwork === '') {
    throw new Error('Please provide a network for your node')
  }
  return values
})
export default schema
