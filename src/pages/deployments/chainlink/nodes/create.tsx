import { useState } from 'react';
import { useRouter } from 'next/router';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Layout from '@components/templates/Layout/Layout';
import FormLayout from '@components/templates/FormLayout/FormLayout';
import TextInput from '@components/molecules/TextInput/TextInput';
import Select from '@components/molecules/Select/Select';
import Heading from '@components/templates/Heading/Heading';
import SelectWithInput from '@components/molecules/SelectWithInput/SelectWithInput';
import useInfiniteRequest from '@hooks/useInfiniteRequest';
import { createSchema } from '@schemas/chainlink/create';
import {
  ChainlinkNode,
  CreateChainlinkNode,
} from '@interfaces/chainlink/ChainlinkNode';
import { useSecretsByType } from '@utils/requests/secrets';
import { KubernetesSecretTypes } from '@enums/KubernetesSecret/KubernetesSecretTypes';
import { handleRequest } from '@utils/helpers/handleRequest';
import { EVM_CHAINS } from '@data/chainlink/evmChain';
import { createChainlinkNode } from '@utils/requests/chainlink';
import { Deployments } from '@enums/Deployments';
import { NotificationInfo } from '@interfaces/NotificationInfo';
import { EthereumNode } from '@interfaces/Ethereum/ِEthereumNode';

function CreateChainlink() {
  const [serverError, setServerError] = useState('');
  const router = useRouter();
  const { data: ethereumNodes } =
    useInfiniteRequest<EthereumNode>('/ethereum/nodes');

  const activeNodes = ethereumNodes
    .filter(({ ws }) => ws)
    .map(({ name, wsPort }) => ({
      label: name,
      value: `ws://${name}:${wsPort}`,
    }));
  const { data: passwords } = useSecretsByType(KubernetesSecretTypes.password);

  const {
    handleSubmit,
    register,
    control,
    setValue,
    formState: { errors, isSubmitted, isValid, isSubmitting },
  } = useForm<CreateChainlinkNode>({ resolver: yupResolver(createSchema) });

  const handleEVMChange = (value: string | string[] | undefined) => {
    if (value && typeof value === 'string') {
      const [id, address] = value.split(':');
      setValue('ethereumChainId', parseInt(id, 10), { shouldValidate: true });
      setValue('linkContractAddress', address, { shouldValidate: true });
    }
  };

  const onSubmit: SubmitHandler<CreateChainlinkNode> = async (values) => {
    setServerError('');
    const { error, response } = await handleRequest<ChainlinkNode>(
      createChainlinkNode.bind(undefined, values)
    );

    if (error) {
      setServerError(error);
      return;
    }

    if (response) {
      const notification: NotificationInfo = {
        title: 'Chainlink Node has been created',
        message:
          'Node has been created successfully, and will be up and running in few seconds.',
        deploymentName: response.name,
      };
      localStorage.setItem(Deployments.chainlink, JSON.stringify(notification));
      router.push('/deployments/chainlink/nodes');
    }
  };

  return (
    <Layout>
      <Heading title="Create New Chainlink Node" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormLayout
          error={serverError}
          isSubmitted={isSubmitted}
          isSubmitting={isSubmitting}
          isValid={isValid}
        >
          {/* Node Name */}
          <TextInput
            id="name"
            type="text"
            label="Node Name"
            error={errors.name?.message}
            {...register('name')}
          />

          {/* EVM Chain */}
          <Select
            options={EVM_CHAINS}
            label="EVM Chain"
            placeholder="Select a chain..."
            error={errors.ethereumChainId?.message}
            onChange={handleEVMChange}
          />

          {/* Ethereum Websocket Endpoint */}
          <Controller
            control={control}
            name="ethereumWsEndpoint"
            render={({ field }) => (
              <SelectWithInput
                options={activeNodes}
                label="Ethereum Websocket Endpoint"
                placeholder="Select an ethereum node..."
                onChange={field.onChange}
                error={errors.ethereumWsEndpoint?.message}
                otherLabel="Externally Managed Node"
                helperText="Showing Ethereum nodes with WebSocket enabled"
                name={field.name}
                value={field.value}
              />
            )}
          />

          {/* Database Connection URL */}
          <TextInput
            id="databaseUrl"
            type="text"
            label="Database Connection URL"
            error={errors.databaseURL?.message}
            placeholder="postgres://"
            {...register('databaseURL')}
          />

          {/* Keystore Password */}
          <Controller
            control={control}
            name="keystorePasswordSecretName"
            render={({ field }) => (
              <Select
                options={passwords}
                label="Keystore password"
                placeholder="Select a password..."
                onChange={field.onChange}
                error={errors.keystorePasswordSecretName?.message}
                href={`/core/secrets/create?type=${KubernetesSecretTypes.password}`}
                hrefTitle="Create a password..."
                helperText="For securing access to chainlink wallet"
              />
            )}
          />

          <h2 className="mt-10 text-xl font-bold">API Credentials</h2>
          <p className="mb-5 text-sm text-gray-500">
            For securing access to chainlink dashboard
          </p>

          {/* Email */}
          <TextInput
            id="email"
            type="text"
            label="Email"
            error={errors.apiCredentials?.email?.message}
            {...register('apiCredentials.email')}
          />

          {/* Password */}
          <Controller
            control={control}
            name="apiCredentials.passwordSecretName"
            render={({ field }) => (
              <Select
                options={passwords}
                label="Password"
                placeholder="Select a password..."
                onChange={field.onChange}
                error={errors.apiCredentials?.passwordSecretName?.message}
                href={`/core/secrets/create?type=${KubernetesSecretTypes.password}`}
                hrefTitle="Create New Password..."
              />
            )}
          />
        </FormLayout>
      </form>
    </Layout>
  );
}

export default CreateChainlink;
