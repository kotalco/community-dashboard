import axios from 'axios';
import { useState } from 'react';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';

import TextInput from '@components/molecules/TextInput/TextInput';
import Button from '@components/atoms/Button/Button';
import Toggle from '@components/molecules/Toggle/Toggle';
import Checkbox from '@components/molecules/CheckBox/CheckBox';
import Separator from '@components/atoms/Separator/Separator';
import { updateEthereumNode } from '@utils/requests/ethereum';
import { API } from '@interfaces/Ethereum/ِEthereumNode';
import { useNode } from '@utils/requests/ethereum';
import { apiOptions } from '@data/ethereum/node/apiOptions';
import { updateAPISchema } from '@schemas/ethereumNode/updateNodeSchema';
import { handleAxiosError } from '@utils/axios';
import { ServerError } from '@interfaces/ServerError';
import { EthereumNodeClient } from '@enums/Ethereum/EthereumNodeClient';

interface Props extends API {
  name: string;
  client: EthereumNodeClient;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const APIDetails: React.FC<Props> = ({ name, children, ...rest }) => {
  const { mutate } = useNode(name);
  const [submitSuccess, setSubmitSuccess] = useState('');
  const {
    handleSubmit,
    control,
    register,
    reset,
    setError,
    watch,
    formState: { isDirty, isSubmitting, errors },
  } = useForm<API>({
    defaultValues: {
      ...rest,
      rpcPort: rest.rpcPort || 8545,
      rpcAPI: rest.rpcAPI || ['eth', 'net', 'web3'],
      wsPort: rest.wsPort || 8546,
      wsAPI: rest.wsAPI || ['eth', 'net', 'web3'],
      graphqlPort: rest.graphqlPort || 8547,
    },
    resolver: joiResolver(updateAPISchema),
  });

  const [rpc, ws, graphql] = watch(['rpc', 'ws', 'graphql']);

  const onSubmit: SubmitHandler<API> = async (values) => {
    setSubmitSuccess('');
    try {
      const node = await updateEthereumNode(name, values);
      void mutate({ node });
      reset(values);
      setSubmitSuccess('API data has been updated');
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const error = handleAxiosError<ServerError>(e);
        setError('graphqlPort', {
          type: 'server',
          message: error.response?.data.error,
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="px-4 py-5 sm:p-6">
        {/* Enable JSON-RPC HTTP Server */}
        <Controller
          control={control}
          name="rpc"
          render={({ field }) => (
            <Toggle
              label="JSON-RPC Server"
              checked={field.value}
              onChange={(state) => field.onChange(state)}
            />
          )}
        />

        {/* JSON-RPC HTTP Server Port */}
        {rpc && (
          <>
            <div className="max-w-xs mt-5">
              <TextInput
                disabled={!rpc}
                label="JSON-RPC Server Port"
                error={errors.rpcPort?.message}
                {...register('rpcPort')}
              />
            </div>

            {/* JSON-RPC Server APIs */}
            <div className="mt-5">
              <p className="block text-sm font-md text-gray-900">
                JSON-RPC Server APIs
              </p>
              <div className="flex flex-wrap ml-5 mt-1">
                {apiOptions.map(({ label, value }) => (
                  <div key={value} className="w-1/2 sm:w-1/3 md:w-1/4">
                    <Checkbox
                      disabled={!rpc}
                      label={label}
                      value={value}
                      {...register('rpcAPI')}
                    />
                  </div>
                ))}
              </div>
              <p role="alert" className="mt-2 text-sm text-red-600">
                {errors.rpcAPI?.message}
              </p>
            </div>
          </>
        )}

        <Separator />

        {/* Enable Web Socket Server */}
        <Controller
          control={control}
          name="ws"
          render={({ field }) => (
            <Toggle
              label="Web Socket Server"
              checked={field.value}
              onChange={(state) => field.onChange(state)}
            />
          )}
        />

        {/* Web Socket Server Port */}
        {ws && (
          <>
            <div className="max-w-xs mt-5">
              <TextInput
                disabled={!ws}
                label="Web Socket Server Port"
                error={errors.wsPort?.message}
                {...register('wsPort')}
              />
            </div>

            {/* Web Socket Server APIs */}
            <div className="mt-5">
              <p className="block text-sm font-md text-gray-900">
                Web Socket Server APIs
              </p>
              <div className="flex flex-wrap ml-5 mt-1">
                {apiOptions.map(({ label, value }) => (
                  <div key={value} className="w-1/2 sm:w-1/3 md:w-1/4">
                    <Checkbox
                      disabled={!ws}
                      label={label}
                      value={value}
                      {...register('wsAPI')}
                    />
                  </div>
                ))}
              </div>
              <p role="alert" className="mt-2 text-sm text-red-600">
                {errors.wsAPI?.message}
              </p>
            </div>
          </>
        )}
        {rest.client !== EthereumNodeClient.parity &&
          rest.client !== EthereumNodeClient.nethermind && (
            <>
              <Separator />

              {/* Enable GraphQl Server */}
              <Controller
                control={control}
                name="graphql"
                render={({ field }) => (
                  <Toggle
                    label="GraphQl Server"
                    checked={field.value}
                    onChange={(state) => field.onChange(state)}
                  />
                )}
              />

              {/* GraphQl Server Port */}
              {graphql && (
                <div className="max-w-xs mt-5">
                  <TextInput
                    disabled={!graphql}
                    label="GraphQl Server Port"
                    error={errors.graphqlPort?.message}
                    {...register('graphqlPort')}
                  />
                </div>
              )}
            </>
          )}
      </div>

      <div className="flex space-x-2 space-x-reverse flex-row-reverse items-center px-4 py-3 bg-gray-50 sm:px-6">
        <Button
          type="submit"
          className="btn btn-primary"
          disabled={!isDirty || isSubmitting}
          loading={isSubmitting}
        >
          Save
        </Button>
        {submitSuccess && <p>{submitSuccess}</p>}
      </div>
    </form>
  );
};

export default APIDetails;
