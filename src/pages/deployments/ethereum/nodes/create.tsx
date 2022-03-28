import { useState } from 'react';
import { useRouter } from 'next/router';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Layout from '@components/templates/Layout/Layout';
import FormLayout from '@components/templates/FormLayout/FormLayout';
import TextInput from '@components/molecules/TextInput/TextInput';
import SelectWithInput from '@components/molecules/SelectWithInput/SelectWithInput';
import Select from '@components/molecules/Select/Select';
import Heading from '@components/templates/Heading/Heading';
import { clientOptions } from '@data/ethereum/node/clientOptions';
import { networkOptions } from '@data/ethereum/node/networkOptions';
import { createEthereumNode } from '@utils/requests/ethereum';
import { schema } from '@schemas/ethereum/create';
import {
  CreateEthereumNode,
  EthereumNode,
} from '@interfaces/Ethereum/ِEthereumNode';
import { KubernetesSecretTypes } from '@enums/KubernetesSecret/KubernetesSecretTypes';
import { handleRequest } from '@utils/helpers/handleRequest';
import { Deployments } from '@enums/Deployments';
import { NotificationInfo } from '@interfaces/NotificationInfo';
import { useSecretTypes } from '@hooks/useSecretTypes';

function CreateNode() {
  const [serverError, setServerError] = useState('');
  const router = useRouter();

  const { data: privateKeyOptions, isLoading } = useSecretTypes(
    KubernetesSecretTypes.ethereumPrivatekey
  );

  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isSubmitted, isValid, isSubmitting },
  } = useForm<CreateEthereumNode>({ resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<CreateEthereumNode> = async (values) => {
    setServerError('');
    const { error, response } = await handleRequest<EthereumNode>(
      createEthereumNode.bind(undefined, values)
    );

    if (error) {
      setServerError(error);
      return;
    }

    if (response) {
      const notification: NotificationInfo = {
        title: 'Ethereum Node has been created',
        message:
          'Node has been created successfully, and will be up and running in few seconds.',
        deploymentName: response.name,
      };
      localStorage.setItem(Deployments.node, JSON.stringify(notification));
      router.push('/deployments/ethereum/nodes');
    }
  };

  return (
    <Layout>
      <Heading title="Create New Node" />
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

          {/* Client */}
          <Controller
            control={control}
            name="client"
            render={({ field }) => (
              <Select
                label="Client"
                placeholder="Choose a client..."
                error={errors.client?.message}
                options={clientOptions}
                onChange={field.onChange}
              />
            )}
          />

          {/* Network */}
          <Controller
            name="network"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <SelectWithInput
                placeholder="Choose a network..."
                label="Network"
                otherLabel="Other Network"
                error={errors.network?.message}
                options={networkOptions}
                name={field.name}
                onChange={field.onChange}
                value={field.value}
              />
            )}
          />

          {/* Node Private Key */}
          {!isLoading && (
            <Controller
              name="nodePrivateKeySecretName"
              control={control}
              render={({ field }) => (
                <Select
                  placeholder="Choose a private key..."
                  label="Node private key (optional)"
                  error={errors.nodePrivateKeySecretName?.message}
                  options={privateKeyOptions}
                  onChange={field.onChange}
                  href={`/core/secrets/create?type=${KubernetesSecretTypes.ethereumPrivatekey}`}
                  hrefTitle="Create new private key..."
                  withClear
                />
              )}
            />
          )}
        </FormLayout>
      </form>
    </Layout>
  );
}

export default CreateNode;
