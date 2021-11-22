import { useState } from 'react';
import { useRouter } from 'next/router';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Layout from '@components/templates/Layout/Layout';
import FormLayout from '@components/templates/FormLayout/FormLayout';
import TextInput from '@components/molecules/TextInput/TextInput';
import Select from '@components/molecules/SelectNew/SelectNew';
import Heading from '@components/templates/Heading/Heading';
import { schema } from '@schemas/ethereum/createNode';
import {
  ChainlinkNode,
  CreateChainlinkNode,
} from '@interfaces/chainlink/ChainlinkNode';
import { useSecretsByType } from '@utils/requests/secrets';
import { KubernetesSecretTypes } from '@enums/KubernetesSecret/KubernetesSecretTypes';
import { handleRequest } from '@utils/helpers/handleRequest';
import { EVM_CHAINS } from '@data/chainlink/evmChain';
import { useEthereumNodes } from '@hooks/useEthereumNodes';
import { createChainlinkNode } from '@utils/requests/chainlink';

function CreateChainlink() {
  const [serverError, setServerError] = useState('');
  const router = useRouter();
  const { nodes } = useEthereumNodes();

  const activeNodes = nodes
    .filter(({ ws }) => ws)
    .map(({ name, wsPort }) => ({
      label: name,
      value: `ws://${name}:${wsPort}`,
    }));
  const { data: passwords } = useSecretsByType(KubernetesSecretTypes.password);

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitted, isValid, isSubmitting },
  } = useForm<CreateChainlinkNode>();
  //   { resolver: yupResolver(schema) }

  const handleEVMChange = (value: string | string[] | undefined) => {
    if (value && typeof value === 'string') {
      const [id, address] = value.split(':');
      setValue('ethereumChainId', parseInt(id, 10));
      setValue('linkContractAddress', address);
    }
  };

  // eslint-disable-next-line @typescript-eslint/require-await
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
      localStorage.setItem('node', response.name);
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
            control={control}
            name="name"
            id="name"
            type="text"
            label="Node Name"
            defaultValue=""
            error={errors.name?.message}
          />

          {/* EVM Chain */}
          <Select
            options={EVM_CHAINS}
            labelProp="label"
            valueProp="value"
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
              <Select
                options={activeNodes}
                labelProp="label"
                valueProp="value"
                label="Ethereum Websocket Endpoint"
                placeholder="Select an ethereum node..."
                onChange={field.onChange}
                error={errors.ethereumWsEndpoint?.message}
                other
                otherLabel="Externally Managed Node"
              />
            )}
          />

          {/* Database Connection URL */}
          <TextInput
            control={control}
            name="databaseURL"
            id="databaseUrl"
            type="text"
            label="Database Connection URL"
            defaultValue=""
            error={errors.databaseURL?.message}
            placeholder="postgres://"
          />

          {/* Keystore Password */}
          <Controller
            control={control}
            name="keystorePasswordSecretName"
            render={({ field }) => (
              <Select
                options={passwords}
                labelProp="label"
                valueProp="value"
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

          <h2 className="font-bold mt-10 text-xl">API Credentials</h2>
          <p className="text-gray-500 mb-5 text-sm">
            For securing access to chainlink dashboard
          </p>

          {/* Email */}
          <TextInput
            control={control}
            name="apiCredentials.email"
            id="email"
            type="text"
            label="Email"
            defaultValue=""
            error={errors.apiCredentials?.email?.message}
          />

          {/* Password */}
          {passwords && (
            <Controller
              control={control}
              name="apiCredentials.passwordSecretName"
              render={({ field }) => (
                <Select
                  options={passwords}
                  labelProp="label"
                  valueProp="value"
                  label="Password"
                  placeholder="Select a password..."
                  onChange={field.onChange}
                  error={errors.apiCredentials?.passwordSecretName?.message}
                  href={`/core/secrets/create?type=${KubernetesSecretTypes.password}`}
                  hrefTitle="Create a password..."
                />
              )}
            />
          )}
        </FormLayout>
      </form>
    </Layout>
  );
}

export default CreateChainlink;
