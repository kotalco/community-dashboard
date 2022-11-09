import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';

import Button from '@components/atoms/Button/Button';
import Toggle from '@components/molecules/Toggle/Toggle';
import ErrorSummary from '@components/templates/ErrorSummary/ErrorSummary';
import { updateBeaconNode } from '@utils/requests/ethereum2/beaconNodes';
import { updateAPISchema } from '@schemas/ethereum2/beaconNode/updateBeaconNode';
import { API, BeaconNode } from '@interfaces/ethereum2/BeaconNode';
import { Ethereum2Client } from '@enums/Ethereum2/Ethereum2Client';
import { KeyedMutator } from 'swr';
import { handleRequest } from '@utils/helpers/handleRequest';

interface Props extends BeaconNode {
  mutate?: KeyedMutator<{ beaconnode: BeaconNode }>;
}

const BeaconNodeProtocolTab: React.FC<React.PropsWithChildren<Props>> = ({
  name,
  rest,
  restHost,
  restPort,
  rpc,
  rpcHost,
  rpcPort,
  grpc,
  grpcHost,
  grpcPort,
  client,
  mutate,
}) => {
  const defaultValues = {
    rest,
    restHost: restHost,
    restPort: restPort,
    rpc,
    rpcHost: rpcHost,
    rpcPort: rpcPort,
    grpc,
    grpcHost: grpcHost,
    grpcPort: grpcPort,
    client,
  };

  const {
    reset,
    handleSubmit,
    control,
    setError,
    clearErrors,
    formState: {
      isDirty,
      isSubmitting,
      errors,
      isSubmitSuccessful,
      isSubmitted,
      isValid,
    },
  } = useForm<API>({
    defaultValues,
    resolver: joiResolver(updateAPISchema),
  });

  const onSubmit: SubmitHandler<API> = async (values) => {
    const { response } = await handleRequest(
      () => updateBeaconNode(name, values),
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
        {/* REST API */}
        {/* Supported by Teku and Lighthouse only */}
        {(client === Ethereum2Client.teku ||
          client === Ethereum2Client.lighthouse) && (
          <Controller
            name="rest"
            control={control}
            defaultValue={rest}
            render={({ field }) => (
              <Toggle
                label="REST API Server"
                onChange={(state) => {
                  field.onChange(state);
                }}
                checked={!!field.value}
              />
            )}
          />
        )}

        {/* JSON-RPC Server */}
        {/* Supoorted only by Prysm and Nimbus */}
        {(client === Ethereum2Client.nimbus ||
          client === Ethereum2Client.prysm) && (
          <Controller
            name="rpc"
            control={control}
            defaultValue={rpc}
            render={({ field }) => (
              <Toggle
                label="JSON-RPC Server"
                onChange={(state) => {
                  if (client === Ethereum2Client.prysm) {
                    return;
                  }
                  field.onChange(state);
                }}
                helperText={
                  client === Ethereum2Client.prysm
                    ? ` (RPC Server couldn't turned of in case of Prysm Client)`
                    : ''
                }
                checked={!!field.value}
              />
            )}
          />
        )}

        {/* GRPC Gateway Server */}
        {/* Supported by Prysm only */}
        {client === Ethereum2Client.prysm && (
          <Controller
            name="grpc"
            control={control}
            defaultValue={grpc}
            render={({ field }) => (
              <Toggle
                label="GRPC Gateway Server"
                onChange={(state) => {
                  field.onChange(state);
                }}
                checked={!!field.value}
              />
            )}
          />
        )}

        <ErrorSummary
          errors={errors}
          isSuccess={isSubmitSuccessful}
          successMessage="Your beaconnode updated successfuly"
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
};

export default BeaconNodeProtocolTab;
