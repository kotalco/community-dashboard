import { RegisterOptions } from 'react-hook-form';

import { noSpacePattern } from '@schemas/helpers';

type Schema = {
  name: RegisterOptions;
  consensus: RegisterOptions;
  clusterSecretName: RegisterOptions;
  id: RegisterOptions;
  privatekeySecretName: RegisterOptions;
  trustedPeers: RegisterOptions;
};

const schema: Schema = {
  name: {
    required: 'Please provide cluster peer name',
    pattern: {
      value: noSpacePattern,
      message: 'Cluster peer name should have no spaces',
    },
    setValueAs: (value: string) => value.trim(),
  },
  consensus: {
    required: 'Please choose your consensus algorithm',
  },
  clusterSecretName: {
    required: 'Please Provide your cluster secret name',
  },
  id: {
    required: 'Please provide cluster peer ID',
    shouldUnregister: true,
    setValueAs: (value: string) => value.trim(),
  },
  privatekeySecretName: {
    required: 'Please choose your private key',
  },
  trustedPeers: {
    required: 'Please add your trusted peers',
    validate: (value: string[]) =>
      !!value.length || 'Please add your trusted peers',
  },
};

export default schema;
