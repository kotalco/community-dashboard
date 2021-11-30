import { object, SchemaOf, string, mixed } from 'yup';

import { CreateEthereumNode } from '@interfaces/Ethereum/ِEthereumNode';
import { nameRegex } from '@utils/helpers/regex';
import { EthereumNodeClient } from '@enums/Ethereum/EthereumNodeClient';

export const schema: SchemaOf<CreateEthereumNode> = object({
  name: string()
    .required('Name is required')
    .trim()
    .matches(nameRegex, 'Spaces not allowed'),
  client: mixed<EthereumNodeClient>()
    .required('Client is required')
    .oneOf(
      [
        EthereumNodeClient.geth,
        EthereumNodeClient.besu,
        EthereumNodeClient.parity,
        EthereumNodeClient.nethermind,
      ],
      '${value} is not valid value'
    ),
  network: string().required('Network is required').trim(),
  nodePrivateKeySecretName: string().notRequired().default(''),
});
