import { KeyedMutator } from 'swr';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';

import TextInput from '@components/molecules/TextInput/TextInput';
import Button from '@components/atoms/Button/Button';
import Select from '@components/molecules/Select/Select';
import Toggle from '@components/molecules/Toggle/Toggle';
import ErrorSummary from '@components/templates/ErrorSummary/ErrorSummary';
import { PolkadotNode, Networking } from '@interfaces/polkadot/PolkadotNode';
import { KubernetesSecretTypes } from '@enums/KubernetesSecret/KubernetesSecretTypes';
import { handleRequest } from '@utils/helpers/handleRequest';
import { yupResolver } from '@hookform/resolvers/yup';
import { networkingSchema } from '@schemas/polkadot/networking';
import { updatePolkadotNode } from '@utils/requests/polkadot';
import { SYNC_MODES } from '@data/polkadot/syncModes';
import { useSecretTypes } from '@hooks/useSecretTypes';

interface Props extends PolkadotNode {
  mutate?: KeyedMutator<{ node: PolkadotNode }>;
}

function NetworkingDetails({
  nodePrivateKeySecretName,
  p2pPort,
  syncMode,
  retainedBlocks,
  pruning,
  name,
  mutate,
}: Props) {
  const { data: privateKeyOptions } = useSecretTypes(
    KubernetesSecretTypes.polkadotPrivatekey
  );

  const {
    handleSubmit,
    control,
    reset,
    register,
    setError,
    clearErrors,
    formState: {
      isSubmitting,
      errors,
      isValid,
      isSubmitSuccessful,
      isSubmitted,
      isDirty,
    },
  } = useForm<Networking>({
    resolver: yupResolver(networkingSchema),
  });

  const onSubmit: SubmitHandler<Networking> = async (values) => {
    const { response } = await handleRequest(
      () => updatePolkadotNode(values, name),
      setError
    );

    if (response) {
      mutate?.();
      reset(response);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="px-4 py-5 sm:p-6">
        {/* Node Private key */}
        <Controller
          name="nodePrivateKeySecretName"
          control={control}
          defaultValue={nodePrivateKeySecretName}
          render={({ field }) => (
            <Select
              placeholder="Choose a private key..."
              label="Node private key"
              error={errors.nodePrivateKeySecretName?.message}
              options={privateKeyOptions}
              onChange={field.onChange}
              value={field.value}
              href={`/core/secrets/create?type=${KubernetesSecretTypes.polkadotPrivatekey}`}
              hrefTitle="Create new private key..."
              withClear
            />
          )}
        />

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
              disabled
              onChange={() => {
                return;
              }}
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

        <ErrorSummary
          errors={errors}
          isSuccess={isSubmitSuccessful}
          successMessage="Your node updated successfuly"
        />
      </div>

      <div className="flex flex-row-reverse items-center px-4 py-3 space-x-2 space-x-reverse bg-gray-50 sm:px-6">
        <Button
          type="submit"
          className="btn btn-primary"
          disabled={(isSubmitted && !isValid) || isSubmitting || !isDirty}
          loading={isSubmitting}
          onClick={() => clearErrors()}
        >
          Save
        </Button>
      </div>
    </form>
  );
}

export default NetworkingDetails;
