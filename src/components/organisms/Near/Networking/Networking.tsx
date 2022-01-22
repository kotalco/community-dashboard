import { useState } from 'react';
import { KeyedMutator } from 'swr';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

import TextInput from '@components/molecules/TextInput/TextInput';
import TextareaWithInput from '@components/molecules/TextareaWithInput/TextareaWithInput';
import Select from '@components/molecules/Select/Select';
import Button from '@components/atoms/Button/Button';
import { Networking } from '@interfaces/near/NearNode';
import { handleRequest } from '@utils/helpers/handleRequest';
import { yupResolver } from '@hookform/resolvers/yup';
import { networkingSchema } from '@schemas/near/networking';
import { NearNode } from '@interfaces/near/NearNode';
import { updateNearNode } from '@utils/requests/near';
import { KubernetesSecretTypes } from '@enums/KubernetesSecret/KubernetesSecretTypes';
import { useSecretsByType } from '@utils/requests/secrets';

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
  const [serverError, setServerError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');
  const { data: privateKeys, isLoading } = useSecretsByType(
    KubernetesSecretTypes.nearPrivateKey
  );

  const {
    handleSubmit,
    reset,
    register,
    control,
    formState: { isDirty, isSubmitting, errors },
  } = useForm<Networking>({
    resolver: yupResolver(networkingSchema),
  });

  const onSubmit: SubmitHandler<Networking> = async (values) => {
    setSubmitSuccess('');
    setServerError('');
    const { error, response } = await handleRequest<NearNode>(
      updateNearNode.bind(undefined, values, name)
    );

    if (error) {
      setServerError(error);
      return;
    }

    if (response) {
      mutate?.();
      reset(response);
      setSubmitSuccess('Networking data has been updated');
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
                options={privateKeys}
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
