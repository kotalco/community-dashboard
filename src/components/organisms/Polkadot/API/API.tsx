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
import ErrorSummary from '@components/templates/ErrorSummary/ErrorSummary';

interface Props extends PolkadotNode {
  mutate?: KeyedMutator<{ node: PolkadotNode }>;
}

function APIDetails({ rpc, rpcPort, ws, wsPort, name, mutate }: Props) {
  const {
    handleSubmit,
    control,
    reset,
    register,
    watch,
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
  } = useForm<API>({
    resolver: yupResolver(apiSchema),
  });

  const [rpcState, wsState] = watch(['rpc', 'ws']);

  const onSubmit: SubmitHandler<API> = async (values) => {
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

export default APIDetails;
