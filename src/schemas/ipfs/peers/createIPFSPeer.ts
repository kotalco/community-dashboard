import Joi from 'joi';

export const schema = Joi.object({
  name: Joi.string().trim().required().pattern(/^\S*$/).messages({
    'string.empty': `Please provide a name for your node`,
    'string.pattern.base': `Node name shouldn't contain whitespaces`,
  }),
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
});
