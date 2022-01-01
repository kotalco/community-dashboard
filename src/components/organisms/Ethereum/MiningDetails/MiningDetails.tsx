import { useState } from 'react';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import { KeyedMutator } from 'swr';
import { joiResolver } from '@hookform/resolvers/joi';

import Button from '@components/atoms/Button/Button';
import Toggle from '@components/molecules/Toggle/Toggle';
import TextInput from '@components/molecules/TextInput/TextInput';
import Select from '@components/molecules/Select/Select';
import Dialog from '@components/molecules/Dialog/Dialog';
import { updateEthereumNode } from '@utils/requests/ethereum';
import { Mining, API, EthereumNode } from '@interfaces/Ethereum/ِEthereumNode';
import { updateMiningSchema } from '@schemas/ethereum/updateNodeSchema';
import { useSecretsByType } from '@utils/requests/secrets';
import { KubernetesSecretTypes } from '@enums/KubernetesSecret/KubernetesSecretTypes';
import { EthereumNodeClient } from '@enums/Ethereum/EthereumNodeClient';
import { handleRequest } from '@utils/helpers/handleRequest';

interface Props extends EthereumNode {
  mutate?: KeyedMutator<{ node: EthereumNode }>;
}

function MiningDetails({ name, mutate, ...rest }: Props) {
  const [serverError, setServerError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');

  const { data: privateKeys } = useSecretsByType(
    KubernetesSecretTypes.ethereumPrivatekey
  );
  const { data: passwords } = useSecretsByType(KubernetesSecretTypes.password);
  const [open, setOpen] = useState(false);
  const {
    handleSubmit,
    control,
    register,
    watch,
    reset,
    setValue,
    formState: { isDirty, isSubmitting, errors },
  } = useForm<Mining & API>({
    defaultValues: rest,
    resolver: joiResolver(updateMiningSchema),
  });

  const miner = watch('miner');

  // Open Dialog if any APIs is activated
  const minerChange = (value: boolean) => {
    if (
      value &&
      (rest.rpc || rest.ws || rest.graphql) &&
      rest.client !== EthereumNodeClient.besu
    ) {
      setOpen(true);
    } else {
      setValue('miner', value, { shouldDirty: true });
    }
  };

  // Confirm activating mining and disable any active APIs
  const confirmMiner = () => {
    setValue('rpc', false);
    setValue('ws', false);
    setValue('graphql', false);
    setValue('miner', true, { shouldDirty: true });
    setOpen(false);
  };

  const onSubmit: SubmitHandler<Mining> = async (values) => {
    setSubmitSuccess('');
    setServerError('');

    const { error, response } = await handleRequest<EthereumNode>(
      updateEthereumNode.bind(undefined, values, name)
    );

    if (error) {
      setServerError(error);
      return;
    }

    if (response) {
      mutate?.();
      reset(values);
      setSubmitSuccess('Mining data data has been updated');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="px-4 py-5 sm:p-6">
        {/* Miner */}
        <Controller
          control={control}
          name="miner"
          render={({ field }) => (
            <Toggle
              label="Miner"
              checked={field.value}
              onChange={minerChange.bind(field.value)}
            />
          )}
        />

        {miner && rest.client !== EthereumNodeClient.besu && (
          <>
            {/* Coinbase Account */}
            <div className="mt-5">
              <TextInput
                label="Coinbase Account"
                error={errors.coinbase?.message}
                disabled={!miner}
                {...register('coinbase')}
              />
            </div>

            {/* Ethereum Private Keys */}
            <div className="max-w-xs mt-5">
              <Controller
                control={control}
                name="import.privateKeySecretName"
                render={({ field }) => (
                  <Select
                    label="Account Private Key"
                    options={privateKeys}
                    placeholder="Choose a private key..."
                    hrefTitle="Create a new ethereum private key..."
                    href={`/core/secrets/create?type=${KubernetesSecretTypes.ethereumPrivatekey}`}
                    error={errors.import?.privateKeySecretName?.message}
                    onChange={field.onChange}
                    value={field.value}
                  />
                )}
              />
            </div>

            {/* Account Password */}
            <div className="max-w-xs mt-5">
              <Controller
                control={control}
                name="import.passwordSecretName"
                render={({ field }) => (
                  <Select
                    label="Account Password"
                    options={passwords}
                    placeholder="Choose a password..."
                    hrefTitle="Create a new password..."
                    href={`/core/secrets/create?type=${KubernetesSecretTypes.password}`}
                    error={errors.import?.passwordSecretName?.message}
                    onChange={field.onChange}
                    value={field.value}
                  />
                )}
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
        {submitSuccess && <p>{submitSuccess}</p>}
        {serverError && (
          <p aria-label="alert" className="text-sm text-red-600">
            {serverError}
          </p>
        )}
      </div>

      {/* Confirmation Dialog if any APIs activated */}
      <Dialog
        open={open}
        close={() => setOpen(false)}
        cancel
        action={
          <Button
            loading={isSubmitting}
            className="btn btn-primary"
            onClick={confirmMiner}
          >
            Confirm
          </Button>
        }
      >
        Importing account for mining will disable any activated APIs (JSON-RPC
        Server, Web Socket Server and GraphQl Server). Are you sure you want to
        continue?
      </Dialog>
    </form>
  );
}

export default MiningDetails;
