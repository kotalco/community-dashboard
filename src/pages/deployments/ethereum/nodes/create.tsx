import Layout from '@components/templates/Layout/Layout';
import FormLayout from '@components/templates/FormLayout/FormLayout';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { joiResolver } from '@hookform/resolvers/joi';

import TextInput from '@components/molecules/TextInput/TextInput';
import Select from '@components/molecules/Select/Select';
import { useNotification } from '@components/contexts/NotificationContext';
import { clientOptions } from '@data/ethereum/node/clientOptions';
import { networkOptions } from '@data/ethereum/node/networkOptions';
import { createEthereumNode } from '@utils/requests/ethereumNodeRequests';
import { schema } from '@schemas/ethereumNode/createNode';
import { CreateEthereumNode } from '@interfaces/Ethereum/ِEthereumNode';
import axios from 'axios';
import { handleAxiosError } from '@utils/axios';
import { ServerError } from '@interfaces/ServerError';
import SelectWithInput from '@components/molecules/SelectWithInput/SelectWithInput';

const CreateNode: React.FC = () => {
  const router = useRouter();
  const { createNotification } = useNotification();
  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors, isSubmitted, isValid, isSubmitting },
  } = useForm<CreateEthereumNode>({ resolver: joiResolver(schema) });

  /**
   * Submit create ethereum node form
   * @param nodeData the data required to create new node
   */
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

      void router.push('/deployments/ethereum/nodes');
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
          <div className="px-4 py-5 sm:p-6">
            {/* Node Name */}
            <TextInput
              {...register('name')}
              label="Node Name"
              error={errors.name?.message}
            />

            {/* Client */}
            <div className="mt-4 max-w-xs">
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
            </div>

            {/* Network */}
            <div className="mt-4 max-w-xs">
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
            </div>
          </div>
        </FormLayout>
      </form>
    </Layout>
  );
};

export default CreateNode;
