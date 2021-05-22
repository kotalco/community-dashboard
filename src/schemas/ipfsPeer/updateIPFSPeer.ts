import Joi from 'joi'

const ipAddressRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/

export const schema = Joi.object({
  apiPort: Joi.number().required().messages({
    'any.required': 'Please provide an API server port',
    'number.base': 'API server port should be a valid port number',
  }),
  apiHost: Joi.string().required().trim().pattern(ipAddressRegex).messages({
    'string.empty': 'Please provide an API server host',
    'string.pattern.base': 'Please provide a valid ip address',
  }),
  gatewayPort: Joi.number().required().messages({
    'any.required': 'Please provide a local IPFS gateway server port',
    'number.base': 'API server port should be a valid port number',
  }),
  gatewayHost: Joi.string().required().trim().pattern(ipAddressRegex).messages({
    'string.empty': 'Please provide a gateway server host',
    'string.pattern.base': 'Please provide a valid ip address',
  }),
  routing: Joi.string()
    .required()
    .trim()
    .valid('none', 'dht', 'dhtclient', 'dhtserver')
    .messages({
      'any.only': `Please choose a client from the list`,
    }),
})

export const updateConfigProfilesSchema = Joi.object({
  profiles: Joi.array().items(
    Joi.string().valid(
      'server',
      'randomports',
      'default-datastore',
      'local-discovery',
      'test',
      'default-networking',
      'flatfs',
      'badgerds',
      'lowpower'
    )
  ),
})

export const updateAPIsSchema = Joi.object({
  apiPort: Joi.number().required().messages({
    'any.required': 'Please provide an API server port',
    'number.base': 'API server port should be a valid port number',
  }),
  apiHost: Joi.string().required().trim().pattern(ipAddressRegex).messages({
    'string.empty': 'Please provide an API server host',
    'string.pattern.base': 'Please provide a valid ip address',
  }),
})

export const updateGatewaySchema = Joi.object({
  gatewayPort: Joi.number().required().messages({
    'any.required': 'Please provide a local IPFS gateway server port',
    'number.base': 'API server port should be a valid port number',
  }),
  gatewayHost: Joi.string().required().trim().pattern(ipAddressRegex).messages({
    'string.empty': 'Please provide a gateway server host',
    'string.pattern.base': 'Please provide a valid ip address',
  }),
})

export const updateRoutingSchema = Joi.object({
  routing: Joi.string()
    .required()
    .trim()
    .valid('none', 'dht', 'dhtclient', 'dhtserver')
    .messages({
      'any.only': `Please choose a client from the list`,
    }),
})
