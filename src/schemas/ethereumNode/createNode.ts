// import Joi from 'joi';

// import { CreateEthereumNode } from '@interfaces/Ethereum/ِEthereumNode';

// export const schema = Joi.object<CreateEthereumNode>({
//   name: Joi.string().trim().required().pattern(/^\S*$/).messages({
//     'string.empty': `Please provide a name for your node`,
//     'string.pattern.base': `Node name shouldn't contain whitespaces`,
//   }),
//   client: Joi.string()
//     .required()
//     .valid('geth', 'besu', 'parity', 'nethermind')
//     .messages({
//       'string.empty': `Please choose your client`,
//       'any.required': `Please choose your client`,
//       'any.only': `Please choose your client`,
//     }),
//   network: Joi.string().required().messages({
//     'string.empty': `Please choose your network`,
//     'any.required': `Please choose your network`,
//     'any.only': `Please choose your network`,
//   }),
//   nodePrivateKeySecretName: Joi.string().default(''),
// });

import { FieldError, Resolver } from 'react-hook-form';

import { CreateEthereumNode } from '@interfaces/Ethereum/ِEthereumNode';
import { nameRegex } from '@utils/helpers/regex';

// eslint-disable-next-line @typescript-eslint/require-await
export const resolver: Resolver<CreateEthereumNode> = async (values) => {
  const errors: Partial<Record<keyof CreateEthereumNode, FieldError>> = {};

  // Remove trailing empty spaces
  values.name.trim();
  values.network.trim();

  // Check for name
  if (!values.name)
    errors.name = { type: 'required', message: 'Node name is required' };

  // Check for pattern
  if (!nameRegex.test(values.name))
    errors.name = {
      type: 'pattern',
      message: 'Node name must not contain spaces',
    };

  // Check for client
  if (!values.client)
    errors.client = { type: 'required', message: 'Client is required' };

  if (!values.network)
    errors.network = { type: 'required', message: 'Network is required' };

  return { values, errors };
};
