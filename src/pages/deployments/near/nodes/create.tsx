import { useRouter } from 'next/router';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Layout from '@components/templates/Layout/Layout';
import FormLayout from '@components/templates/FormLayout/FormLayout';
import TextInput from '@components/molecules/TextInput/TextInput';
import Select from '@components/molecules/Select/Select';
import Heading from '@components/templates/Heading/Heading';
import Toggle from '@components/molecules/Toggle/Toggle';
import ErrorSummary from '@components/templates/ErrorSummary/ErrorSummary';
import Button from '@components/atoms/Button/Button';
import { createSchema } from '@schemas/near/create';
import { handleRequest } from '@utils/helpers/handleRequest';
import { NETWORKS } from '@data/near/networks';
import { Deployments } from '@enums/Deployments';
import { NotificationInfo } from '@interfaces/NotificationInfo';
import { CreateNearNode } from '@interfaces/near/NearNode';
import { createNearNode } from '@utils/requests/near';

function CreateNearNode() {
  const router = useRouter();

  const {
    handleSubmit,
    register,
    control,
    setError,
    clearErrors,
    formState: { errors, isSubmitted, isValid, isSubmitting, isDirty },
  } = useForm<CreateNearNode>({
    resolver: yupResolver(createSchema),
  });

  const onSubmit: SubmitHandler<CreateNearNode> = async (values) => {
    const { response } = await handleRequest(
      () => createNearNode(values),
      setError
    );

    if (response) {
      const notification: NotificationInfo = {
        title: 'Near Node has been created',
        message:
          'Node has been created successfully, and will be up and running in few seconds.',
        deploymentName: response.name,
      };
      localStorage.setItem(Deployments.near, JSON.stringify(notification));
      router.push('/deployments/near/nodes');
    }
  };

  return (
    <Layout>
      <Heading title="Create New Near Node" />
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

          {/* Archive Node */}
          <Controller
            control={control}
            name="archive"
            defaultValue={false}
            render={({ field }) => (
              <Toggle
                label="Archive Node"
                checked={field.value}
                onChange={field.onChange}
                error={errors.archive?.message}
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

export default CreateNearNode;
