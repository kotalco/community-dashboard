import { useState } from 'react';
import { useRouter } from 'next/router';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Layout from '@components/templates/Layout/Layout';
import FormLayout from '@components/templates/FormLayout/FormLayout';
import TextInput from '@components/molecules/TextInput/TextInput';
import Select from '@components/molecules/Select/Select';
import Heading from '@components/templates/Heading/Heading';
import { createSchema } from '@schemas/polkadot/create';
import { handleRequest } from '@utils/helpers/handleRequest';
import {
  CreatePolkadotNode,
  PolkadotNode,
} from '@interfaces/polkadot/PolkadotNode';
import { NETWORKS } from '@data/polkadot/networks';
import { createPolkadotNode } from '@utils/requests/polkadot';

function CreatePolkadotNode() {
  const [serverError, setServerError] = useState('');
  const router = useRouter();

  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isSubmitted, isValid, isSubmitting },
  } = useForm<CreatePolkadotNode>({
    resolver: yupResolver(createSchema),
  });

  const onSubmit: SubmitHandler<CreatePolkadotNode> = async (values) => {
    setServerError('');
    const { error, response } = await handleRequest<PolkadotNode>(
      createPolkadotNode.bind(undefined, values)
    );

    if (error) {
      setServerError(error);
      return;
    }

    if (response) {
      localStorage.setItem('polkadot', response.name);
      router.push('/deployments/polkadot/nodes');
    }
  };

  return (
    <Layout>
      <Heading title="Create New Polkadot Node" />
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

export default CreatePolkadotNode;
