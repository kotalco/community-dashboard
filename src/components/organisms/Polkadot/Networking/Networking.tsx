import { useState } from 'react';
import { KeyedMutator } from 'swr';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';

import TextInput from '@components/molecules/TextInput/TextInput';
import Button from '@components/atoms/Button/Button';
import Select from '@components/molecules/Select/Select';
import Toggle from '@components/molecules/Toggle/Toggle';
import { PolkadotNode, Networking } from '@interfaces/polkadot/PolkadotNode';
import { useSecretsByType } from '@utils/requests/secrets';
import { KubernetesSecretTypes } from '@enums/KubernetesSecret/KubernetesSecretTypes';
import { handleRequest } from '@utils/helpers/handleRequest';
import { yupResolver } from '@hookform/resolvers/yup';
import { networkingSchema } from '@schemas/polkadot/networking';
import { updatePolkadotNode } from '@utils/requests/polkadot';
import { SYNC_MODES } from '@data/polkadot/syncModes';

interface Props extends PolkadotNode {
  mutate?: KeyedMutator<{ node: PolkadotNode }>;
}

function NetworkingDetails({
  nodePrivateKeySecretName,
  p2pPort,
  syncMode,
  pruning,
  retainedBlocks,
  name,
  mutate,
}: Props) {
  const [serverError, setServerError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');
  const { data: privateKeys, isLoading } = useSecretsByType(
    KubernetesSecretTypes.polkadotPrivatekey
  );

  const {
    handleSubmit,
    control,
    reset,
    register,
    formState: { isDirty, isSubmitting, errors },
  } = useForm<Networking>({
    resolver: yupResolver(networkingSchema),
  });

  const onSubmit: SubmitHandler<Networking> = async (values) => {
    setSubmitSuccess('');
    setServerError('');
    const { error, response } = await handleRequest<PolkadotNode>(
      updatePolkadotNode.bind(undefined, values, name)
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
            defaultValue={nodePrivateKeySecretName}
            render={({ field }) => (
              <Select
                placeholder="Choose a private key..."
                label="Node private key"
                error={errors.nodePrivateKeySecretName?.message}
                options={privateKeys}
                onChange={field.onChange}
                value={field.value}
                href={`/core/secrets/create?type=${KubernetesSecretTypes.polkadotPrivatekey}`}
                hrefTitle="Create new private key..."
              />
            )}
          />
        )}

        {/* P2P Port */}
        <TextInput
          type="text"
          label="P2P Port"
          error={errors.p2pPort?.message}
          defaultValue={p2pPort}
          {...register('p2pPort')}
        />

        {/* Sync Mode */}
        <Controller
          control={control}
          name="syncMode"
          defaultValue={syncMode}
          render={({ field }) => (
            <Select
              error={errors.syncMode?.message}
              options={SYNC_MODES}
              placeholder="Choose your sync mode..."
              onChange={field.onChange}
              value={field.value}
              label="Sync Mode"
            />
          )}
        />

        {/* Pruning */}
        <Controller
          control={control}
          name="pruning"
          defaultValue={pruning}
          render={({ field }) => (
            <Toggle
              label="Pruning"
              checked={field.value}
              onChange={field.onChange}
              error={errors.pruning?.message}
            />
          )}
        />

        {/* Retained Blocks */}
        <TextInput
          label="Retained Blocks"
          defaultValue={retainedBlocks}
          error={errors.retainedBlocks?.message}
          id="retainedBlock"
          {...register('retainedBlocks')}
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
