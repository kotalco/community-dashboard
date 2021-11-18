import { useState } from 'react';
import { useRouter } from 'next/router';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Layout from '@components/templates/Layout/Layout';
import FormLayout from '@components/templates/FormLayout/FormLayout';
import TextInput from '@components/molecules/TextInput/TextInput';
// import Select from '@components/molecules/Select/Select';
import SelectWithInput from '@components/molecules/SelectWithInput/SelectWithInput';
import Select from '@components/molecules/SelectNew/SelectNew';
import Heading from '@components/templates/Heading/Heading';
import { clientOptions } from '@data/ethereum/node/clientOptions';
import { networkOptions } from '@data/ethereum/node/networkOptions';
import { createEthereumNode } from '@utils/requests/ethereum';
import { schema } from '@schemas/ethereum/createNode';
import {
  CreateEthereumNode,
  EthereumNode,
} from '@interfaces/Ethereum/ِEthereumNode';
import { useSecretsByType } from '@utils/requests/secrets';
import { KubernetesSecretTypes } from '@enums/KubernetesSecret/KubernetesSecretTypes';
import { handleRequest } from '@utils/helpers/handleRequest';

function CreateNode() {
  const [serverError, setServerError] = useState('');
  const router = useRouter();
  const { data: privateKeys } = useSecretsByType(
    KubernetesSecretTypes.ethereumPrivatekey
  );
  const {
    handleSubmit,
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
      localStorage.setItem('node', response.name);
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
            control={control}
            name="name"
            id="name"
            type="text"
            label="Node Name"
            defaultValue=""
            error={errors.name?.message}
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
                error={errors.network?.message}
                options={networkOptions}
                name={field.name}
                onChange={field.onChange}
                value={field.value}
              />
            )}
          />

          {/* Node Private Key */}
          <Controller
            name="nodePrivateKeySecretName"
            control={control}
            render={({ field }) => (
              <Select
                placeholder="Choose a private key..."
                label="Node private key (optional)"
                error={errors.nodePrivateKeySecretName?.message}
                options={privateKeys}
                onChange={field.onChange}
                href={`/core/secrets/create?type=${KubernetesSecretTypes.ethereumPrivatekey}`}
                hrefTitle="Create new private key..."
              />
            )}
          />
        </FormLayout>
      </form>
    </Layout>
  );
}

export default CreateNode;
