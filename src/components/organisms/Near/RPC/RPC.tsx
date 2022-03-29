import { KeyedMutator } from 'swr';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

import TextInput from '@components/molecules/TextInput/TextInput';
import Button from '@components/atoms/Button/Button';
import Toggle from '@components/molecules/Toggle/Toggle';
import ErrorSummary from '@components/templates/ErrorSummary/ErrorSummary';
import { handleRequest } from '@utils/helpers/handleRequest';
import { yupResolver } from '@hookform/resolvers/yup';
import { NearNode, RPC } from '@interfaces/near/NearNode';
import { updateNearNode } from '@utils/requests/near';
import { rpcSchema } from '@schemas/near/rpc';

interface Props extends NearNode {
  mutate?: KeyedMutator<{ node: NearNode }>;
}

function RPCDetails({ rpc, rpcPort, rpcHost, name, mutate }: Props) {
  const {
    handleSubmit,
    reset,
    register,
    control,
    watch,
    setError,
    clearErrors,
    formState: {
      isSubmitting,
      errors,
      isSubmitSuccessful,
      isSubmitted,
      isValid,
      isDirty,
    },
  } = useForm<RPC>({
    resolver: yupResolver(rpcSchema),
  });

  const [rpcState] = watch(['rpc']);

  const onSubmit: SubmitHandler<RPC> = async (values) => {
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
        {/* JSON-RPC Server */}
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

        {/* JSON-RPC Port */}
        <TextInput
          type="text"
          label="JSON-RPC Port"
          disabled={!rpcState}
          error={errors.rpcPort?.message}
          defaultValue={rpcPort}
          {...register('rpcPort')}
        />

        {/* JSON-RPC Host */}
        <TextInput
          type="text"
          label="JSON-RPC Host"
          disabled={!rpcState}
          error={errors.rpcHost?.message}
          defaultValue={rpcHost}
          {...register('rpcHost')}
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

export default RPCDetails;
