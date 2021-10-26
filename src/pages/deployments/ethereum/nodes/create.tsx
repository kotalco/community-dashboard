import axios from 'axios';
import { useRouter } from 'next/router';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';

import Layout from '@components/templates/Layout/Layout';
import FormLayout from '@components/templates/FormLayout/FormLayout';
import TextInput from '@components/molecules/TextInput/TextInput';
import Select from '@components/molecules/Select/Select';
import SelectWithInput from '@components/molecules/SelectWithInput/SelectWithInput';
import { useNotification } from '@components/contexts/NotificationContext';
import { clientOptions } from '@data/ethereum/node/clientOptions';
import { networkOptions } from '@data/ethereum/node/networkOptions';
import { createEthereumNode } from '@utils/requests/ethereum';
import { schema } from '@schemas/ethereumNode/createNode';
import { CreateEthereumNode } from '@interfaces/Ethereum/ِEthereumNode';
import { handleAxiosError } from '@utils/axios';
import { ServerError } from '@interfaces/ServerError';
import { useSecretsByType } from '@utils/requests/secrets';
import { KubernetesSecretTypes } from '@enums/KubernetesSecret/KubernetesSecretTypes';

const CreateNode: React.FC = () => {
  const router = useRouter();
  const { createNotification } = useNotification();
  const { data: privateKeys } = useSecretsByType(
    KubernetesSecretTypes.ethereumPrivatekey
  );
  const {
    handleSubmit,
    setError,
    control,
    formState: { errors, isSubmitted, isValid, isSubmitting },
  } = useForm<CreateEthereumNode>({ resolver: joiResolver(schema) });

  const onSubmit: SubmitHandler<CreateEthereumNode> = async (values) => {
    try {
      const node = await createEthereumNode(values);
      createNotification({
        title: 'Node has been created',
        protocol: `node`,
        name: node.name,
        action:
          'created successfully, and will be up and running in few seconds.',
      });

      router.push('/deployments/ethereum/nodes');
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const error = handleAxiosError<ServerError>(e);
        setError('name', {
          type: 'server',
          message: error.response?.data.error,
        });
      }
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl font-semibold">Create New Node</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormLayout
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
            name="client"
            control={control}
            render={({ field }) => (
              <Select
                placeholder="Choose a client..."
                label="Client"
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
                value={field.value}
                href={`/core/secrets/create?type=${KubernetesSecretTypes.ethereumPrivatekey}`}
                hrefTitle="Create new private key..."
              />
            )}
          />
        </FormLayout>
      </form>
    </Layout>
  );
};

export default CreateNode;
