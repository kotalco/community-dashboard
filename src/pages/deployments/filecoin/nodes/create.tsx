import { useState } from 'react';
import { useRouter } from 'next/router';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Layout from '@components/templates/Layout/Layout';
import FormLayout from '@components/templates/FormLayout/FormLayout';
import TextInput from '@components/molecules/TextInput/TextInput';
import Select from '@components/molecules/Select/Select';
import Heading from '@components/templates/Heading/Heading';
import { createSchema } from '@schemas/filecoin/create';
import { handleRequest } from '@utils/helpers/handleRequest';
import { NETWORKS } from '@data/filecoin/networks';
import { Deployments } from '@enums/Deployments';
import { NotificationInfo } from '@interfaces/NotificationInfo';
import {
  CreateFilecoinNode,
  FilecoinNode,
} from '@interfaces/filecoin/FilecoinNode';
import { createFilecoinNode } from '@utils/requests/filecoin';

function CreateNode() {
  const [serverError, setServerError] = useState('');
  const router = useRouter();

  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isSubmitted, isValid, isSubmitting },
  } = useForm<CreateFilecoinNode>({
    resolver: yupResolver(createSchema),
  });

  const onSubmit: SubmitHandler<CreateFilecoinNode> = async (values) => {
    setServerError('');
    const { error, response } = await handleRequest<FilecoinNode>(
      createFilecoinNode.bind(undefined, values)
    );

    if (error) {
      setServerError(error);
      return;
    }

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
        </FormLayout>
      </form>
    </Layout>
  );
}

export default CreateNode;
