import axios from 'axios';
import { useState } from 'react';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';

import Button from '@components/atoms/Button/Button';
import Toggle from '@components/molecules/Toggle/Toggle';
import TextInput from '@components/molecules/TextInput/TextInput';
import Select from '@components/molecules/Select/Select';
import { updateEthereumNode } from '@utils/requests/ethereum';
import { Mining } from '@interfaces/Ethereum/ِEthereumNode';
import { useNode } from '@utils/requests/ethereum';
import { updateMiningSchema } from '@schemas/ethereumNode/updateNodeSchema';
import { handleAxiosError } from '@utils/axios';
import { ServerError } from '@interfaces/ServerError';
import { useSecretsByType } from '@utils/requests/secrets';
import { KubernetesSecretTypes } from '@enums/KubernetesSecret/KubernetesSecretTypes';
import { EthereumNodeClient } from '@enums/Ethereum/EthereumNodeClient';

interface Props extends Mining {
  client: EthereumNodeClient;
  name: string;
}

const MiningDetails: React.FC<Props> = ({
  name,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  children,
  ...rest
}) => {
  const { mutate } = useNode(name);
  const { data: privateKeys } = useSecretsByType(
    KubernetesSecretTypes.ethereumPrivatekey
  );
  const { data: passwords } = useSecretsByType(KubernetesSecretTypes.password);
  const [submitSuccess, setSubmitSuccess] = useState('');
  const {
    handleSubmit,
    control,
    watch,
    reset,
    setError,
    register,
    formState: { isDirty, isSubmitting, errors },
  } = useForm<Mining>({
    defaultValues: rest,
    resolver: joiResolver(updateMiningSchema),
  });

  const miner = watch('miner');

  const onSubmit: SubmitHandler<Mining> = async (values) => {
    setSubmitSuccess('');
    try {
      const node = await updateEthereumNode(name, values);
      void mutate({ node });
      reset(values);
      setSubmitSuccess('Mining data has been updated');
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const error = handleAxiosError<ServerError>(e);
        setError('coinbase', {
          type: 'server',
          message: error.response?.data.error,
        });
      }
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
              onChange={field.onChange}
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
            <div className="mt-5 max-w-xs">
              <Controller
                control={control}
                name="import.privateKeySecretName"
                render={({ field }) => (
                  <Select
                    label="Account Private Key"
                    options={privateKeys}
                    placeholder="Choose a private key..."
                    hrefTitle="Create a new ethereum provate key..."
                    href={`/core/secrets/create?type=${KubernetesSecretTypes.ethereumPrivatekey}`}
                    error={errors.import?.privateKeySecretName?.message}
                    onChange={field.onChange}
                    value={field.value}
                  />
                )}
              />
            </div>

            {/* Account Password */}
            <div className="mt-5 max-w-xs">
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

export default MiningDetails;
