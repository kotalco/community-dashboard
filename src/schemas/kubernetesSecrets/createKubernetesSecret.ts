import Joi from 'joi'

export const schema = Joi.object({
  name: Joi.string().trim().pattern(/^\S*$/).required().messages({
    'string.empty': 'Please provide a secret name',
    'string.pattern.base': 'Secret name should not containe spaces',
  }),
  type: Joi.string().required().valid('password').messages({
    'string.empty': 'Please choose your secret type',
    'any.only': 'Please choose your secret name',
  }),
  data: Joi.object({
    password: Joi.string().trim().required().min(8).messages({
      'string.empty': 'Please enter your password value',
      'string.min': 'Your password value must not be less than 8 characters',
    }),
  }),
})
