import { useState } from 'react';
import { useRouter } from 'next/router';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Layout from '@components/templates/Layout/Layout';
import FormLayout from '@components/templates/FormLayout/FormLayout';
import TextInput from '@components/molecules/TextInput/TextInput';
import Select from '@components/molecules/Select/Select';
import Heading from '@components/templates/Heading/Heading';
import { createSchema } from '@schemas/near/create';
import { handleRequest } from '@utils/helpers/handleRequest';
import { NETWORKS } from '@data/near/networks';
import { Deployments } from '@enums/Deployments';
import { NotificationInfo } from '@interfaces/NotificationInfo';
import { CreateNearNode, NearNode } from '@interfaces/near/NearNode';
import { createNearNode } from '@utils/requests/near';
import Toggle from '@components/molecules/Toggle/Toggle';

function CreateNearNode() {
  const [serverError, setServerError] = useState('');
  const router = useRouter();

  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isSubmitted, isValid, isSubmitting },
  } = useForm<CreateNearNode>({
    resolver: yupResolver(createSchema),
  });

  const onSubmit: SubmitHandler<CreateNearNode> = async (values) => {
    setServerError('');
    const { error, response } = await handleRequest<NearNode>(
      createNearNode.bind(undefined, values)
    );

    if (error) {
      setServerError(error);
      return;
    }

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
        </FormLayout>
      </form>
    </Layout>
  );
}

export default CreateNearNode;
