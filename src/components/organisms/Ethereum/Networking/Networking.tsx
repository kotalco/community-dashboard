import { KeyedMutator } from 'swr';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';

import TextInput from '@components/molecules/TextInput/TextInput';
import Button from '@components/atoms/Button/Button';
import Select from '@components/molecules/Select/Select';
import TextareaWithInput from '@components/molecules/TextareaWithInput/TextareaWithInput';
import ErrorSummary from '@components/templates/ErrorSummary/ErrorSummary';
import { updateEthereumNode } from '@utils/requests/ethereum';
import { EthereumNode, Networking } from '@interfaces/Ethereum/ِEthereumNode';
import { syncModeOptions } from '@data/ethereum/node/syncModeOptions';
import { KubernetesSecretTypes } from '@enums/KubernetesSecret/KubernetesSecretTypes';
import { handleRequest } from '@utils/helpers/handleRequest';
import { yupResolver } from '@hookform/resolvers/yup';
import { networkingSchema } from '@schemas/ethereum/networking';
import { useSecretTypes } from '@hooks/useSecretTypes';

interface Props extends EthereumNode {
  mutate?: KeyedMutator<{ node: EthereumNode }>;
}

function NetworkingDetails({
  name,
  client,
  mutate,
  nodePrivateKeySecretName,
  p2pPort,
  syncMode,
  staticNodes,
  bootnodes,
}: Props) {
  const { data: privateKeyOptions, isLoading } = useSecretTypes(
    KubernetesSecretTypes.ethereumPrivatekey
  );

  const {
    handleSubmit,
    control,
    reset,
    register,
    setError,
    clearErrors,
    formState: {
      isDirty,
      isSubmitting,
      errors,
      isValid,
      isSubmitSuccessful,
      isSubmitted,
    },
  } = useForm<Networking>({
    resolver: yupResolver(networkingSchema),
  });

  const onSubmit: SubmitHandler<Networking> = async (values) => {
    const { response } = await handleRequest(
      () => updateEthereumNode(values, name),
      setError
    );

    if (response) {
      mutate?.();
      reset(values);
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
                label="Node Private Key"
                error={errors.nodePrivateKeySecretName?.message}
                options={privateKeyOptions}
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
          defaultValue={staticNodes}
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
          defaultValue={bootnodes}
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
