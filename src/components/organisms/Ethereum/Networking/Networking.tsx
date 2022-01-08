import { KeyedMutator } from 'swr';
import { useState } from 'react';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';

import TextInput from '@components/molecules/TextInput/TextInput';
import Button from '@components/atoms/Button/Button';
import Select from '@components/molecules/Select/Select';
import TextareaWithInput from '@components/molecules/TextareaWithInput/TextareaWithInput';
import { updateEthereumNode } from '@utils/requests/ethereum';
import { EthereumNode, Networking } from '@interfaces/Ethereum/ِEthereumNode';
import { syncModeOptions } from '@data/ethereum/node/syncModeOptions';
import { useSecretsByType } from '@utils/requests/secrets';
import { KubernetesSecretTypes } from '@enums/KubernetesSecret/KubernetesSecretTypes';
import { handleRequest } from '@utils/helpers/handleRequest';
import { yupResolver } from '@hookform/resolvers/yup';
import { networkingSchema } from '@schemas/ethereum/networking';

interface Props extends EthereumNode {
  mutate?: KeyedMutator<{ node: EthereumNode }>;
}

function NetworkingDetails({ name, client, mutate, ...rest }: Props) {
  const [serverError, setServerError] = useState('');
  const { data: privateKeys, isLoading } = useSecretsByType(
    KubernetesSecretTypes.ethereumPrivatekey
  );

  const [submitSuccess, setSubmitSuccess] = useState('');
  const {
    handleSubmit,
    control,
    reset,
    register,
    formState: { isDirty, isSubmitting, errors },
  } = useForm<Networking>({
    defaultValues: rest,
    resolver: yupResolver(networkingSchema),
  });

  const onSubmit: SubmitHandler<Networking> = async (values) => {
    setSubmitSuccess('');
    setServerError('');
    const { error, response } = await handleRequest<EthereumNode>(
      updateEthereumNode.bind(undefined, values, name)
    );

    if (error) {
      setServerError(error);
      return;
    }

    if (response) {
      mutate?.();
      reset(values);
      setSubmitSuccess('Networking data has been updated');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="px-4 py-5 sm:p-6">
        {/* Node Private key */}
        {!isLoading && (
          <Controller
            name="nodePrivateKeySecretName"
            control={control}
            render={({ field }) => (
              <Select
                placeholder="Choose a private key..."
                label="Node private key"
                error={errors.nodePrivateKeySecretName?.message}
                options={privateKeys}
                onChange={field.onChange}
                value={field.value}
                href={`/core/secrets/create?type=${KubernetesSecretTypes.ethereumPrivatekey}`}
                hrefTitle="Create new private key..."
                withClear
              />
            )}
          />
        )}

        {/* P2P Port */}
        <TextInput
          type="text"
          label="P2P Port"
          error={errors.p2pPort?.message}
          {...register('p2pPort')}
        />

        {/* Sync Mode */}
        <Controller
          control={control}
          name="syncMode"
          render={({ field }) => (
            <Select
              error={errors.syncMode?.message}
              options={syncModeOptions(client)}
              placeholder="Choose your sync mode..."
              onChange={field.onChange}
              value={field.value}
              label="Sync Mode"
            />
          )}
        />

        {/* Static Nodes */}
        <Controller
          control={control}
          name="staticNodes"
          render={({ field }) => (
            <TextareaWithInput
              multiple
              helperText="One enodeURL per line"
              name={field.name}
              label="Static Nodes"
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />

        {/* Boot Nodes */}
        <Controller
          control={control}
          name="bootnodes"
          render={({ field }) => (
            <TextareaWithInput
              multiple
              helperText="One enodeURL per line"
              name={field.name}
              label="Bootnodes"
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </div>

      <div className="flex flex-row-reverse items-center px-4 py-3 space-x-2 space-x-reverse bg-gray-50 sm:px-6">
        <Button
          type="submit"
          className="btn btn-primary"
          disabled={!isDirty || isSubmitting}
          loading={isSubmitting}
        >
          Save
        </Button>
        {submitSuccess && <p>{submitSuccess}</p>}
        {serverError && (
          <p aria-label="alert" className="text-sm text-red-600">
            {serverError}
          </p>
        )}
      </div>
    </form>
  );
}

export default NetworkingDetails;
