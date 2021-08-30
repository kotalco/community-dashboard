import Joi from 'joi';

export const updateNetworkingSchema = Joi.object({
  p2pPort: Joi.number().port().messages({
    'number.base': 'Please proivde a valid port number',
    'number.port': 'Please provide a valid port number',
  }),
  syncMode: Joi.string().valid('full', 'fast', 'light'),
  staticNodes: Joi.array().default([]),
  bootnodes: Joi.array().default([]),
});
