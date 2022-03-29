import { useRouter } from 'next/router';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Layout from '@components/templates/Layout/Layout';
import FormLayout from '@components/templates/FormLayout/FormLayout';
import TextInput from '@components/molecules/TextInput/TextInput';
import Select from '@components/molecules/Select/Select';
import Heading from '@components/templates/Heading/Heading';
import ErrorSummary from '@components/templates/ErrorSummary/ErrorSummary';
import Button from '@components/atoms/Button/Button';
import { createSchema } from '@schemas/filecoin/create';
import { handleRequest } from '@utils/helpers/handleRequest';
import { NETWORKS } from '@data/filecoin/networks';
import { Deployments } from '@enums/Deployments';
import { NotificationInfo } from '@interfaces/NotificationInfo';
import { CreateFilecoinNode } from '@interfaces/filecoin/FilecoinNode';
import { createFilecoinNode } from '@utils/requests/filecoin';

function CreateNode() {
  const router = useRouter();

  const {
    handleSubmit,
    register,
    control,
    setError,
    clearErrors,
    formState: { errors, isSubmitted, isValid, isSubmitting, isDirty },
  } = useForm<CreateFilecoinNode>({
    resolver: yupResolver(createSchema),
  });

  const onSubmit: SubmitHandler<CreateFilecoinNode> = async (values) => {
    const { response } = await handleRequest(
      () => createFilecoinNode(values),
      setError
    );

    if (response) {
      const notification: NotificationInfo = {
        title: 'Filecoin Node has been created',
        message:
          'Node has been created successfully, and will be up and running in few seconds.',
        deploymentName: response.name,
      };
      localStorage.setItem(Deployments.filecoin, JSON.stringify(notification));
      router.push('/deployments/filecoin/nodes');
    }
  };

  return (
    <Layout>
      <Heading title="Create New Filecoin Node" />
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

          {/* Network */}
          <Controller
            control={control}
            name="network"
            render={({ field }) => (
              <Select
                options={NETWORKS}
                label="Network"
                placeholder="Select a network..."
                error={errors.network?.message}
                onChange={field.onChange}
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
