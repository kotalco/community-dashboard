import Joi from 'joi'

const ipAddressRegex =
  /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/

export const updateClientSchema = Joi.object({
  client: Joi.string()
    .required()
    .valid('teku', 'prysm', 'lighthouse', 'nimbus')
    .messages({
      'string.empty': `Please choose your client`,
      'any.required': `Please choose your client`,
      'any.only': `Please choose your client`,
    }),
})

export const updateAPISchema = Joi.object({
  rest: Joi.boolean(),
  restPort: Joi.number()
    .when('rest', {
      is: Joi.valid(true),
      then: Joi.number().required(),
      otherwise: Joi.number().optional(),
    })
    .messages({
      'any.required': 'Please provide an API server port',
      'number.base': 'API server port should be a valid port number',
    }),
  restHost: Joi.string()
    .when('rest', {
      is: true,
      then: Joi.string().required().trim().pattern(ipAddressRegex),
      otherwise: Joi.string().allow(''),
    })
    .messages({
      'any.required': 'Please provide an API server host',
      'string.empty': 'Please provide an API server host',
      'string.pattern.base': 'Please provide a valid ip address',
    }),
})

export const updateResourcesSchema = Joi.object({
  cpu: Joi.string()
    .required()
    .pattern(/^[1-9]\d*$/)
    .messages({
      'any.required': 'Please enter number of CPU cores required',
      'string.empty': 'Please enter number of CPU cores required',
      'string.pattern.base': 'CPU cores should be a positive number',
    }),
  cpuLimit: Joi.string()
    .required()
    .pattern(/^[1-9]\d*$/)
    .messages({
      'any.required': 'Please enter number of CPU cores required',
      'string.empty': 'Please enter number of CPU cores required',
      'string.pattern.base': 'CPU cores should be a positive number',
    }),
  memory: Joi.string()
    .pattern(/(^\d+(G|T|M)i)/)
    .messages({
      'string.empty': 'Please enter number of memory',
      'string.pattern.base': 'Memory should be a number',
    }),
  memoryLimit: Joi.string()
    .pattern(/(^\d+(G|T|M)i)/)
    .messages({
      'string.empty': 'Please enter memory limit',
      'string.pattern.base': 'Memory limit should be a number',
    }),
  storage: Joi.string()
    .pattern(/(^\d+(G|T|M)i)/)
    .messages({
      'string.empty': 'Please enter number of disk space required',
      'string.pattern.base': 'Disk space required should be a number',
    }),
})
