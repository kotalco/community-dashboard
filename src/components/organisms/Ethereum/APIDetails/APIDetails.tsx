import { useState } from 'react';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';

import TextInput from '@components/molecules/TextInput/TextInput';
import Button from '@components/atoms/Button/Button';
import Toggle from '@components/molecules/Toggle/Toggle';
import Checkbox from '@components/molecules/CheckBox/CheckBox';
import Separator from '@components/atoms/Separator/Separator';
import Dialog from '@components/molecules/Dialog/Dialog';
import { updateEthereumNode } from '@utils/requests/ethereum';
import { API, EthereumNode } from '@interfaces/Ethereum/ِEthereumNode';
import { apiOptions } from '@data/ethereum/node/apiOptions';
import { updateAPISchema } from '@schemas/ethereum/updateNodeSchema';
import { EthereumNodeClient } from '@enums/Ethereum/EthereumNodeClient';
import { KeyedMutator } from 'swr';
import { handleRequest } from '@utils/helpers/handleRequest';

interface Props extends API {
  name: string;
  client: EthereumNodeClient;
  miner: boolean;
  setNode: KeyedMutator<{ node: EthereumNode }>;
}

function APIDetails({ name, setNode, ...rest }: Props) {
  const [open, setOpen] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState('');
  const [serverError, setServerError] = useState('');
  const [selectedApi, setSelectedApi] = useState<'rpc' | 'ws' | 'graphql'>(
    'rpc'
  );
  const {
    handleSubmit,
    control,
    register,
    reset,
    watch,
    setValue,
    formState: { isDirty, isSubmitting, errors },
  } = useForm<API & { miner: boolean }>({
    defaultValues: {
      rpcAPI: rest.rpcAPI || ['eth', 'net', 'web3'],
      wsAPI: rest.wsAPI || ['eth', 'net', 'web3'],
    },
    resolver: joiResolver(updateAPISchema),
  });

  const [rpc, ws, graphql] = watch(['rpc', 'ws', 'graphql']);

  const handleApiChange = (
    state: boolean,
    onChange: (value: boolean) => void,
    name: 'rpc' | 'ws' | 'graphql'
  ) => {
    if (state && rest.miner && rest.client !== EthereumNodeClient.besu) {
      setSelectedApi(name);
      setOpen(true);
      return;
    }

    onChange(state);
  };

  const confirmApis = () => {
    setValue('miner', false);
    setValue(selectedApi, true, { shouldDirty: true });
    setOpen(false);
  };

  const onSubmit: SubmitHandler<API> = async (values) => {
    setServerError('');
    setSubmitSuccess('');

    const { error, response } = await handleRequest<EthereumNode>(
      updateEthereumNode.bind(undefined, values, name)
    );

    if (error) {
      setServerError(error);
      return;
    }

    if (response) {
      setNode();
      reset(values);
      setSubmitSuccess('API data has been updated');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="px-4 py-5 sm:p-6">
          {/* Enable JSON-RPC HTTP Server */}
          <Controller
            control={control}
            name="rpc"
            defaultValue={rest.rpc}
            render={({ field }) => (
              <Toggle
                label="JSON-RPC Server"
                checked={field.value}
                error={errors.rpc?.message}
                onChange={(state) =>
                  handleApiChange(state, field.onChange, field.name)
                }
              />
            )}
          />

          {/* JSON-RPC HTTP Server Port */}
          {rpc && (
            <>
              <TextInput
                disabled={!rpc}
                label="JSON-RPC Server Port"
                error={errors.rpcPort?.message}
                defaultValue={rest.rpcPort || 8545}
                {...register('rpcPort')}
              />

              {/* JSON-RPC Server APIs */}
              <Checkbox
                label="JSON-RPC Server APIs"
                options={apiOptions}
                error={errors.rpcAPI?.message}
                {...register('rpcAPI')}
              />
            </>
          )}

          <Separator />

          {/* Enable Web Socket Server */}
          <Controller
            control={control}
            name="ws"
            defaultValue={rest.ws}
            render={({ field }) => (
              <Toggle
                label="Web Socket Server"
                checked={field.value}
                onChange={(state) =>
                  handleApiChange(state, field.onChange, field.name)
                }
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
                  defaultValue={rest.wsPort || 8546}
                  {...register('wsPort')}
                />
              </div>

              {/* Web Socket Server APIs */}
              <Checkbox
                options={apiOptions}
                label="Web Socket Server APIs"
                error={errors.wsAPI?.message}
                {...register('wsAPI')}
              />
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
                  defaultValue={rest.graphql}
                  render={({ field }) => (
                    <Toggle
                      label="GraphQl Server"
                      checked={field.value}
                      onChange={(state) =>
                        handleApiChange(state, field.onChange, field.name)
                      }
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
                      defaultValue={rest.graphqlPort || 8547}
                      {...register('graphqlPort')}
                    />
                  </div>
                )}
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
          {submitSuccess && <p>{submitSuccess}</p>}
          {serverError && (
            <p aria-label="alert" className="text-sm text-red-600">
              {serverError}
            </p>
          )}
        </div>
      </form>

      {/* Confirmation Dialog if any APIs activated */}
      <Dialog
        open={open}
        close={() => setOpen(false)}
        cancel
        action={
          <Button
            loading={isSubmitting}
            className="btn btn-primary"
            onClick={confirmApis}
          >
            Confirm
          </Button>
        }
      >
        Activating APIs (JSON-RPC Server, Web Socket Server or GraphQl Server)
        will disable mining. Are you sure you want to continue?
      </Dialog>
    </>
  );
}

export default APIDetails;
