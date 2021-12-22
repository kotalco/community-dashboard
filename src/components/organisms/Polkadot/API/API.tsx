import { useState } from 'react';
import { KeyedMutator } from 'swr';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';

import TextInput from '@components/molecules/TextInput/TextInput';
import Button from '@components/atoms/Button/Button';
import Toggle from '@components/molecules/Toggle/Toggle';
import { API, PolkadotNode } from '@interfaces/polkadot/PolkadotNode';
import { handleRequest } from '@utils/helpers/handleRequest';
import { yupResolver } from '@hookform/resolvers/yup';
import { updatePolkadotNode } from '@utils/requests/polkadot';
import { apiSchema } from '@schemas/polkadot/api';

interface Props extends PolkadotNode {
  mutate?: KeyedMutator<{ node: PolkadotNode }>;
}

function APIDetails({ rpc, rpcPort, ws, wsPort, name, mutate }: Props) {
  const [serverError, setServerError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');

  const {
    handleSubmit,
    control,
    reset,
    register,
    watch,
    formState: { isDirty, isSubmitting, errors },
  } = useForm<API>({
    resolver: yupResolver(apiSchema),
  });

  const [rpcState, wsState] = watch(['rpc', 'ws']);

  const onSubmit: SubmitHandler<API> = async (values) => {
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
      reset(response);
      setSubmitSuccess('API data has been updated');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="px-4 py-5 sm:p-6">
        {/* RPC */}
        <Controller
          control={control}
          name="rpc"
          defaultValue={rpc}
          render={({ field }) => (
            <Toggle
              label="JSON-RPC Server"
              checked={field.value}
              onChange={field.onChange}
              error={errors.rpc?.message}
            />
          )}
        />

        {/* RPC Port */}
        <TextInput
          disabled={!rpcState}
          label="JSON-RPC Server Port"
          error={errors.rpcPort?.message}
          defaultValue={rpcPort}
          {...register('rpcPort')}
        />

        {/* WS */}
        <Controller
          control={control}
          name="ws"
          defaultValue={ws}
          render={({ field }) => (
            <Toggle
              label="WebSocket Server"
              checked={field.value}
              onChange={field.onChange}
              error={errors.ws?.message}
            />
          )}
        />

        {/* WebSocket Port */}
        <TextInput
          disabled={!wsState}
          label="WebSocket Server Port"
          error={errors.wsPort?.message}
          defaultValue={wsPort}
          {...register('wsPort')}
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

export default APIDetails;
