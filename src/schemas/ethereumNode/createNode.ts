import Joi from 'joi';

import { CreateEthereumNode } from '@interfaces/Ethereum/ِEthereumNode';

export const schema = Joi.object<CreateEthereumNode>({
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
  network: Joi.string().required().messages({
    'string.empty': `Please choose your network`,
    'any.required': `Please choose your network`,
    'any.only': `Please choose your network`,
  }),
  nodePrivateKeySecretName: Joi.string().default(''),
});
