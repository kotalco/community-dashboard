import { useState } from 'react';
import { useForm, useWatch, Controller, SubmitHandler } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import axios from 'axios';

import Button from '@components/atoms/Button/Button';
import { updateBeaconNode } from '@utils/requests/ethereum2/beaconNodes';
import { useBeaconnode } from '@hooks/useBeaconNode';
import { updateAPISchema } from '@schemas/ethereum2/beaconNode/updateBeaconNode';
import { UpdateAPI } from '@interfaces/ethereum2/BeaconNode';
import TextInput from '@components/molecules/TextInput/TextInput';
import Separator from '@components/atoms/Separator/Separator';
import Toggle from '@components/molecules/Toggle/Toggle';
import { BeaconNodeClient } from '@enums/Ethereum2/BeaconNodes/BeaconNodeClient';
import { handleAxiosError } from '@utils/axios';
import { ServerError } from '@interfaces/ServerError';

interface Props {
  name: string;
  rest?: boolean;
  restHost?: string;
  restPort?: number;
  rpc: boolean;
  rpcHost: string;
  rpcPort: number;
  grpc: boolean;
  grpcHost: string;
  grpcPort: number;
  client: BeaconNodeClient;
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
}) => {
  const { mutate } = useBeaconnode(name);
  const [submitError, setSubmitError] = useState<string | undefined>('');
  const [submitSuccess, setSubmitSuccess] = useState('');

  const defaultValues = {
    rest,
    restHost: restHost || '0.0.0.0',
    restPort: restPort || 5051,
    rpc,
    rpcHost: rpcHost || '0.0.0.0',
    rpcPort: rpcPort || 4000,
    grpc,
    grpcHost: grpcHost || '0.0.0.0',
    grpcPort: grpcPort || 3500,
    client,
  };

  const {
    reset,
    register,
    handleSubmit,
    control,
    formState: { isDirty, isSubmitting, errors },
  } = useForm<UpdateAPI>({
    defaultValues,
    resolver: joiResolver(updateAPISchema),
  });

  const [restState, rpcState, grpcState] = useWatch({
    control,
    name: ['rest', 'rpc', 'grpc'],
  });

  const onSubmit: SubmitHandler<UpdateAPI> = async (values) => {
    setSubmitError('');
    setSubmitSuccess('');
    try {
      const beaconnode = await updateBeaconNode(name, values);
      void mutate({ beaconnode });
      reset(values);
      setSubmitSuccess('Beacon node has been updated');
    } catch (e) {
      // if (axios.isAxiosError(e)) {
      //   const error = handleAxiosError<ServerError>(e);
      //   setSubmitError(error.response?.data.error);
      // }
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
                {...register('rpcPort')}
              />
            </div>
            <div className="mt-4">
              <TextInput
                disabled={!rpcState}
                label="JSON-RPC Server Host"
                error={errors.rpcHost?.message}
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
                {...register('grpcPort')}
              />
            </div>
            <div className="mt-4">
              <TextInput
                disabled={!grpcState}
                label="GRPC Gateway Server Host"
                error={errors.grpcHost?.message}
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
        {submitError && (
          <p className="mb-5 text-center text-red-500">{submitError}</p>
        )}
        {submitSuccess && <p>{submitSuccess}</p>}
      </div>
    </form>
  );
};

export default BeaconNodeProtocolTab;
