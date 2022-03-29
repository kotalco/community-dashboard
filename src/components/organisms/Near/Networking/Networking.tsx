import { KeyedMutator } from 'swr';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

import TextInput from '@components/molecules/TextInput/TextInput';
import TextareaWithInput from '@components/molecules/TextareaWithInput/TextareaWithInput';
import Select from '@components/molecules/Select/Select';
import Button from '@components/atoms/Button/Button';
import ErrorSummary from '@components/templates/ErrorSummary/ErrorSummary';
import { Networking } from '@interfaces/near/NearNode';
import { handleRequest } from '@utils/helpers/handleRequest';
import { yupResolver } from '@hookform/resolvers/yup';
import { networkingSchema } from '@schemas/near/networking';
import { NearNode } from '@interfaces/near/NearNode';
import { updateNearNode } from '@utils/requests/near';
import { KubernetesSecretTypes } from '@enums/KubernetesSecret/KubernetesSecretTypes';
import { useSecretTypes } from '@hooks/useSecretTypes';

interface Props extends NearNode {
  mutate?: KeyedMutator<{ node: NearNode }>;
}

function NetworkingDetails({
  nodePrivateKeySecretName,
  minPeers,
  p2pPort,
  p2pHost,
  bootnodes,
  name,
  mutate,
}: Props) {
  const { data: privateKeyOptions, isLoading } = useSecretTypes(
    KubernetesSecretTypes.nearPrivateKey
  );

  const {
    handleSubmit,
    reset,
    register,
    control,
    setError,
    clearErrors,
    formState: {
      isSubmitSuccessful,
      isSubmitted,
      isValid,
      isSubmitting,
      errors,
      isDirty,
    },
  } = useForm<Networking>({
    resolver: yupResolver(networkingSchema),
  });

  const onSubmit: SubmitHandler<Networking> = async (values) => {
    const { response } = await handleRequest(
      () => updateNearNode(values, name),
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
        {/* Node Private Key */}
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
                options={privateKeyOptions}
                onChange={field.onChange}
                value={field.value}
                href={`/core/secrets/create?type=${KubernetesSecretTypes.nearPrivateKey}`}
                hrefTitle="Create new private key..."
                withClear
              />
            )}
          />
        )}

        {/* Minimum Peers */}
        <TextInput
          type="text"
          label="Minimum Peers"
          error={errors.minPeers?.message}
          defaultValue={minPeers}
          {...register('minPeers')}
        />

        {/* P2P Port */}
        <TextInput
          type="text"
          label="P2P Port"
          error={errors.p2pPort?.message}
          defaultValue={p2pPort}
          {...register('p2pPort')}
        />

        {/* P2P Host */}
        <TextInput
          type="text"
          label="P2P Host"
          error={errors.p2pHost?.message}
          defaultValue={p2pHost}
          {...register('p2pHost')}
        />

        {/* Bootnodes */}
        <Controller
          control={control}
          name="bootnodes"
          defaultValue={bootnodes}
          render={({ field }) => (
            <TextareaWithInput
              multiple
              label="Bootnodes"
              name={field.name}
              onChange={field.onChange}
              value={field.value}
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
