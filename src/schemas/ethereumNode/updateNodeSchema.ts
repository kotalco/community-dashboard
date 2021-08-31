import Joi from 'joi';
import { apiOptions } from '@data/ethereum/node/apiOptions';
import {
  AccessControl,
  API,
  Mining,
  Networking,
} from '@interfaces/Ethereum/ِEthereumNode';

const apiValus = apiOptions.map(({ value }) => value);

export const updateNetworkingSchema = Joi.object<Networking>({
  p2pPort: Joi.number().port().invalid(0).messages({
    'number.base': 'Please proivde a valid port number',
    'number.port': 'Please provide a valid port number',
    'any.invalid': 'Please provide a valid port number',
  }),
  syncMode: Joi.string().valid('full', 'fast', 'light'),
  staticNodes: Joi.array().default([]),
  bootnodes: Joi.array().default([]),
});

export const updateAPISchema = Joi.object<API>({
  rpc: Joi.boolean(),
  rpcPort: Joi.when('rpc', {
    is: false,
    then: Joi.number().strip(),
    otherwise: Joi.number().port().invalid(0).messages({
      'number.base': 'Please proivde a valid port number',
      'number.port': 'Please provide a valid port number',
      'any.invalid': 'Please provide a valid port number',
    }),
  }),
  rpcAPI: Joi.when('rpc', {
    is: false,
    then: Joi.array().default([]),
    otherwise: Joi.array()
      .min(1)
      .items(Joi.string().valid(...apiValus))
      .messages({
        'array.min': 'Please choose your APIs',
      }),
  }),
  ws: Joi.boolean(),
  wsPort: Joi.when('ws', {
    is: false,
    then: Joi.number().strip(),
    otherwise: Joi.number().port().invalid(0).messages({
      'number.base': 'Please proivde a valid port number',
      'number.port': 'Please provide a valid port number',
      'any.invalid': 'Please provide a valid port number',
    }),
  }),
  wsAPI: Joi.when('ws', {
    is: false,
    then: Joi.array().default([]),
    otherwise: Joi.array()
      .min(1)
      .items(Joi.string().valid(...apiValus))
      .messages({
        'array.min': 'Please choose your APIs',
      }),
  }),
  graphql: Joi.boolean(),
  graphqlPort: Joi.when('graphql', {
    is: false,
    then: Joi.number().strip(),
    otherwise: Joi.number().port().invalid(0).messages({
      'number.base': 'Please proivde a valid port number',
      'number.port': 'Please provide a valid port number',
      'any.invalid': 'Please provide a valid port number',
    }),
  }),
});

export const updateAccessControlSchema = Joi.object<AccessControl>({
  hosts: Joi.array().default([]).min(1).messages({
    'array.min':
      'Please specify your whitelisted hosts or "*" to whitelist all hosts',
  }),
  corsDomains: Joi.array().default([]).min(1).messages({
    'array.min':
      'Please specify your CORS domains or "*" to whitelist all domains',
  }),
});

export const updateMiningSchema = Joi.object<Mining>({
  miner: Joi.boolean(),
  coinbase: Joi.when('miner', {
    is: false,
    then: Joi.any().strip(),
    otherwise: Joi.string().trim().required().messages({
      'any.required': 'Please type your coinbase account',
      'string.empty': 'Please type your coinbase account',
    }),
  }),
});
