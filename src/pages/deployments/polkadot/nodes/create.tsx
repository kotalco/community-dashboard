import { useRouter } from 'next/router';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Layout from '@components/templates/Layout/Layout';
import FormLayout from '@components/templates/FormLayout/FormLayout';
import TextInput from '@components/molecules/TextInput/TextInput';
import Select from '@components/molecules/Select/Select';
import Heading from '@components/templates/Heading/Heading';
import Toggle from '@components/molecules/Toggle/Toggle';
import Alert from '@components/atoms/Alert/Alert';
import ErrorSummary from '@components/templates/ErrorSummary/ErrorSummary';
import Button from '@components/atoms/Button/Button';
import { createSchema } from '@schemas/polkadot/create';
import { handleRequest } from '@utils/helpers/handleRequest';
import { CreatePolkadotNode } from '@interfaces/polkadot/PolkadotNode';
import { NETWORKS } from '@data/polkadot/networks';
import { createPolkadotNode } from '@utils/requests/polkadot';
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
  } = useForm<CreatePolkadotNode>({
    resolver: yupResolver(createSchema),
  });

  const onSubmit: SubmitHandler<CreatePolkadotNode> = async (values) => {
    const { response } = await handleRequest(
      () => createPolkadotNode(values),
      setError
    );

    if (response) {
      const notification: NotificationInfo = {
        title: 'Polkadot Node has been created',
        message:
          'Node has been created successfully, and will be up and running in few seconds.',
        deploymentName: response.name,
      };
      localStorage.setItem(Deployments.polkadot, JSON.stringify(notification));
      router.push('/deployments/polkadot/nodes');
    }
  };

  return (
    <Layout>
      <Heading title="Create New Polkadot Node" />
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

          {/* Pruning */}
          <Controller
            control={control}
            name="pruning"
            defaultValue={false}
            render={({ field }) => (
              <Toggle
                label="Pruning"
                checked={field.value}
                onChange={field.onChange}
                error={errors.pruning?.message}
              />
            )}
          />

          <div className="mb-2">
            <Alert role="warn">
              <h3 className="text-sm font-medium text-yellow-800">Attension</h3>
              <ul className="mt-2 ml-4 text-sm text-yellow-700 list-disc">
                <li>Validator nodes must run in archive mode.</li>
                <li>Disable pruning to enable archive mode.</li>
                <li>
                  You can enable validator mode after node is up and running
                  &amp; fully synced
                </li>
              </ul>
            </Alert>
          </div>

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
