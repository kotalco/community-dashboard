import Joi from 'joi'

export const schema = Joi.object({
  name: Joi.string().trim().required().pattern(/^\S*$/).messages({
    'string.empty': `Please provide a name for your node`,
    'string.pattern.base': `Node name shouldn't contain whitespaces`,
  }),
  apiPort: Joi.number().default(5001),
  apiHost: Joi.string().default('0.0.0.0'),
  gatewayPort: Joi.number().default(8080),
  gatewayHost: Joi.string().default('0.0.0.0'),
  routing: Joi.string().default('dht'),
  initProfiles: Joi.array()
    .min(1)
    .items(
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
    )
    .prefs({
      errors: { wrap: { array: '"' } },

      messages: {
        'array.min': 'You must choose at least 1 configration profile',
        'any.only':
          'You have to choose 1 configration profile from the allowed list',
      },
    }),
})
