import { useRouter } from 'next/router';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Layout from '@components/templates/Layout/Layout';
import FormLayout from '@components/templates/FormLayout/FormLayout';
import TextInput from '@components/molecules/TextInput/TextInput';
import SelectWithInput from '@components/molecules/SelectWithInput/SelectWithInput';
import Select from '@components/molecules/Select/Select';
import Heading from '@components/templates/Heading/Heading';
import Button from '@components/atoms/Button/Button';
import ErrorSummary from '@components/templates/ErrorSummary/ErrorSummary';
import { clientOptions } from '@data/ethereum/node/clientOptions';
import { networkOptions } from '@data/ethereum/node/networkOptions';
import { createEthereumNode } from '@utils/requests/ethereum';
import { schema } from '@schemas/ethereum/create';
import { CreateEthereumNode } from '@interfaces/Ethereum/ِEthereumNode';
import { handleRequest } from '@utils/helpers/handleRequest';
import { Deployments } from '@enums/Deployments';
import { NotificationInfo } from '@interfaces/NotificationInfo';

function CreateNode() {
  const router = useRouter();

  const {
    handleSubmit,
    register,
    control,
    setError,
    clearErrors,
    formState: { errors, isSubmitted, isValid, isSubmitting, isDirty },
  } = useForm<CreateEthereumNode>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<CreateEthereumNode> = async (values) => {
    const { response } = await handleRequest(
      () => createEthereumNode(values),
      setError
    );

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
        <FormLayout>
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

          <ErrorSummary errors={errors} />

          <div className="flex flex-row-reverse items-center px-4 py-3 mt-5 -mx-6 -mb-6 bg-gray-50 sm:px-6">
            <Button
              type="submit"
              className="btn btn-primary"
              disabled={(isSubmitted && !isValid) || isSubmitting || !isDirty}
              loading={isSubmitting}
              onClick={() => clearErrors()}
            >
              Create
            </Button>
          </div>
        </FormLayout>
      </form>
    </Layout>
  );
}

export default CreateNode;
