import { useState } from 'react';
import { useForm, useWatch, Controller, SubmitHandler } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';

import Button from '@components/atoms/Button/Button';
import { updateBeaconNode } from '@utils/requests/ethereum2/beaconNodes';
import { updateAPISchema } from '@schemas/ethereum2/beaconNode/updateBeaconNode';
import { API, BeaconNode } from '@interfaces/ethereum2/BeaconNode';
import TextInput from '@components/molecules/TextInput/TextInput';
import Separator from '@components/atoms/Separator/Separator';
import Toggle from '@components/molecules/Toggle/Toggle';
import { BeaconNodeClient } from '@enums/Ethereum2/BeaconNodes/BeaconNodeClient';
import { KeyedMutator } from 'swr';
import { handleRequest } from '@utils/helpers/handleRequest';

interface Props extends BeaconNode {
  mutate?: KeyedMutator<{ beaconnode: BeaconNode }>;
}

const BeaconNodeProtocolTab: React.FC<Props> = ({
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
  const [serverError, setServerError] = useState<string | undefined>('');
  const [submitSuccess, setSubmitSuccess] = useState('');

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
    register,
    handleSubmit,
    control,
    formState: { isDirty, isSubmitting, errors },
  } = useForm<API>({
    defaultValues,
    resolver: joiResolver(updateAPISchema),
  });

  const [restState, rpcState, grpcState] = useWatch({
    control,
    name: ['rest', 'rpc', 'grpc'],
  });

  const onSubmit: SubmitHandler<API> = async (values) => {
    setServerError('');
    setSubmitSuccess('');

    const { error, response } = await handleRequest(
      updateBeaconNode.bind(undefined, name, values)
    );

    if (error) {
      setServerError(error);
      return;
    }

    if (response) {
      mutate?.();
      reset(values);
      setSubmitSuccess('Beacon node has been updated');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="px-4 py-5 sm:p-6">
        {/* REST API */}
        {/* Supported by Teku and Lighthouse only */}
        {(client === BeaconNodeClient.teku ||
          client === BeaconNodeClient.lighthouse) && (
          <>
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
            <div className="mt-4">
              <TextInput
                disabled={!restState}
                label="REST API Server Port"
                error={errors.restPort?.message}
                defaultValue={restPort}
                {...register('restPort')}
              />
            </div>
            <div className="mt-4">
              <TextInput
                disabled={!restState}
                label="REST API Server Host"
                error={errors.restHost?.message}
                {...register('restHost')}
              />
            </div>
          </>
        )}

        {/* JSON-RPC Server */}
        {/* Supoorted only by Prysm and Nimbus */}
        {(client === BeaconNodeClient.nimbus ||
          client === BeaconNodeClient.prysm) && (
          <>
            <Controller
              name="rpc"
              control={control}
              defaultValue={rpc}
              render={({ field }) => (
                <Toggle
                  label="JSON-RPC Server"
                  onChange={(state) => {
                    if (client === BeaconNodeClient.prysm) {
                      return;
                    }
                    field.onChange(state);
                  }}
                  helperText={
                    client === BeaconNodeClient.prysm
                      ? ` (RPC Server couldn't turned of in case of Prysm Client)`
                      : ''
                  }
                  checked={!!field.value}
                />
              )}
            />
            <div className="mt-4">
              <TextInput
                disabled={!rpcState}
                label="JSON-RPC Server Port"
                error={errors.rpcPort?.message}
                defaultValue={rpcPort}
                {...register('rpcPort')}
              />
            </div>
            <div className="mt-4">
              <TextInput
                disabled={!rpcState}
                label="JSON-RPC Server Host"
                error={errors.rpcHost?.message}
                defaultValue={rpcHost}
                {...register('rpcHost')}
              />
            </div>
          </>
        )}

        {/* GRPC Gateway Server */}
        {/* Supported by Prysm only */}
        {client === BeaconNodeClient.prysm && (
          <>
            <Separator />

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
            <div className="mt-4">
              <TextInput
                disabled={!grpcState}
                label="GRPC Gateway Server Port"
                error={errors.grpcPort?.message}
                defaultValue={grpcPort}
                {...register('grpcPort')}
              />
            </div>
            <div className="mt-4">
              <TextInput
                disabled={!grpcState}
                label="GRPC Gateway Server Host"
                error={errors.grpcHost?.message}
                defaultValue={grpcHost}
                {...register('grpcHost')}
              />
            </div>
          </>
        )}
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
        {serverError && (
          <p className="mb-5 text-center text-red-500">{serverError}</p>
        )}
        {submitSuccess && <p>{submitSuccess}</p>}
      </div>
    </form>
  );
};

export default BeaconNodeProtocolTab;
