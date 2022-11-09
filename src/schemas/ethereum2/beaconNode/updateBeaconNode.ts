import Joi from 'joi';

export const updateAPISchema = Joi.object({
  rest: Joi.boolean().when('client', {
    not: Joi.valid('teku', 'lighthouse'),
    then: Joi.boolean().strip(),
  }),
  rpc: Joi.boolean().when('client', {
    not: Joi.valid('prysm', 'nimbus'),
    then: Joi.boolean().strip(),
  }),
  grpc: Joi.boolean().when('client', {
    not: Joi.valid('prysm'),
    then: Joi.boolean().strip(),
  }),
  client: Joi.string().strip(),
});

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
});
