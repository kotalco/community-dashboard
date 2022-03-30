import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import { KeyedMutator } from 'swr';
import { joiResolver } from '@hookform/resolvers/joi';

import Button from '@components/atoms/Button/Button';
import Toggle from '@components/molecules/Toggle/Toggle';
import TextInput from '@components/molecules/TextInput/TextInput';
import Select from '@components/molecules/Select/Select';
import Dialog from '@components/molecules/Dialog/Dialog';
import ErrorSummary from '@components/templates/ErrorSummary/ErrorSummary';
import { updateEthereumNode } from '@utils/requests/ethereum';
import { Mining, API, EthereumNode } from '@interfaces/Ethereum/ِEthereumNode';
import { updateMiningSchema } from '@schemas/ethereum/updateNodeSchema';
import { KubernetesSecretTypes } from '@enums/KubernetesSecret/KubernetesSecretTypes';
import { EthereumNodeClient } from '@enums/Ethereum/EthereumNodeClient';
import { handleRequest } from '@utils/helpers/handleRequest';
import { useModal } from '@hooks/useModal';
import { useSecretTypes } from '@hooks/useSecretTypes';

interface Props extends EthereumNode {
  mutate?: KeyedMutator<{ node: EthereumNode }>;
}

function MiningDetails({ name, mutate, ...rest }: Props) {
  const { data: privateKeyOptions, isLoading: isLoadingPrivateKeys } =
    useSecretTypes(KubernetesSecretTypes.ethereumPrivatekey);
  const { data: passwordOptions, isLoading: isLoadingPasswords } =
    useSecretTypes(KubernetesSecretTypes.password);

  const { isOpen, open, close } = useModal();
  const {
    handleSubmit,
    control,
    register,
    watch,
    reset,
    setValue,
    setError,
    clearErrors,
    formState: {
      isDirty,
      isSubmitting,
      isSubmitSuccessful,
      isSubmitted,
      isValid,
      errors,
    },
  } = useForm<Mining & API>({
    resolver: joiResolver(updateMiningSchema),
  });

  const miner = watch('miner');

  // Open Dialog if any APIs is activated
  const minerChange = (value: boolean) => {
    console.log(value);
    if (
      value &&
      (rest.rpc || rest.ws || rest.graphql) &&
      rest.client !== EthereumNodeClient.besu
    ) {
      open();
    } else {
      console.log(value);
      setValue('miner', value, { shouldDirty: true });
    }
  };

  // Confirm activating mining and disable any active APIs
  const confirmMiner = () => {
    setValue('rpc', false);
    setValue('ws', false);
    setValue('graphql', false);
    setValue('miner', true, { shouldDirty: true });
    close();
  };

  const onSubmit: SubmitHandler<Mining> = async (values) => {
    const { response } = await handleRequest(
      () => updateEthereumNode(values, name),
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
        {/* Miner */}
        <Controller
          control={control}
          name="miner"
          defaultValue={rest.miner}
          render={({ field }) => (
            <Toggle
              label="Miner"
              checked={field.value}
              onChange={(value) => minerChange(value)}
            />
          )}
        />

        {miner && rest.client !== EthereumNodeClient.besu && (
          <>
            {/* Coinbase Account */}
            <TextInput
              label="Coinbase Account"
              error={errors.coinbase?.message}
              disabled={!miner}
              defaultValue={rest.coinbase}
              {...register('coinbase')}
            />

            {/* Ethereum Private Keys */}
            {!isLoadingPrivateKeys && (
              <Controller
                control={control}
                name="import.privateKeySecretName"
                defaultValue={rest.import?.privateKeySecretName}
                render={({ field }) => (
                  <Select
                    label="Account Private Key"
                    options={privateKeyOptions}
                    placeholder="Choose a private key..."
                    hrefTitle="Create a new ethereum private key..."
                    href={`/core/secrets/create?type=${KubernetesSecretTypes.ethereumPrivatekey}`}
                    error={errors.import?.privateKeySecretName?.message}
                    onChange={field.onChange}
                    value={field.value}
                  />
                )}
              />
            )}

            {/* Account Password */}
            {!isLoadingPasswords && (
              <Controller
                control={control}
                name="import.passwordSecretName"
                defaultValue={rest.import?.passwordSecretName}
                render={({ field }) => (
                  <Select
                    label="Account Password"
                    options={passwordOptions}
                    placeholder="Choose a password..."
                    hrefTitle="Create a new password..."
                    href={`/core/secrets/create?type=${KubernetesSecretTypes.password}`}
                    error={errors.import?.passwordSecretName?.message}
                    onChange={field.onChange}
                    value={field.value}
                  />
                )}
              />
            )}
          </>
        )}

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

      {/* Confirmation Dialog if any APIs activated */}
      <Dialog open={isOpen} close={close}>
        <p>
          Importing account for mining will disable any activated APIs (JSON-RPC
          Server, Web Socket Server and GraphQl Server). Are you sure you want
          to continue?
        </p>
        <div className="flex flex-col items-center justify-end mt-5 sm:mt-4 sm:flex-row sm:space-x-4">
          <Button
            onClick={close}
            className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
          >
            Cancel
          </Button>
          <Button
            loading={isSubmitting}
            className="btn btn-primary"
            onClick={confirmMiner}
          >
            Confirm
          </Button>
        </div>
      </Dialog>
    </form>
  );
}

export default MiningDetails;
