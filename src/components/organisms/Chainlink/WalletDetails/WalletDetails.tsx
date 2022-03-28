import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

import Select from '@components/molecules/Select/Select';
import Button from '@components/atoms/Button/Button';
import { ChainlinkNode, Wallet } from '@interfaces/chainlink/ChainlinkNode';
import { KeyedMutator } from 'swr';
import { updateChainlinkNode } from '@utils/requests/chainlink';
import { handleRequest } from '@utils/helpers/handleRequest';
import { KubernetesSecretTypes } from '@enums/KubernetesSecret/KubernetesSecretTypes';
import { walletSchema } from '@schemas/chainlink/wallet';
import { useSecretTypes } from '@hooks/useSecretTypes';

interface Props extends ChainlinkNode {
  mutate?: KeyedMutator<{
    node: ChainlinkNode;
  }>;
}

function WalletDetails({ keystorePasswordSecretName, name, mutate }: Props) {
  const [submitSuccess, setSubmitSuccess] = useState('');
  const [serverError, setServerError] = useState('');

  const { data: passwordOptions, isLoading } = useSecretTypes(
    KubernetesSecretTypes.password
  );

  const {
    handleSubmit,
    control,
    reset,
    formState: { isDirty, isSubmitting, errors },
  } = useForm<Wallet>({ resolver: yupResolver(walletSchema) });

  const onSubmit: SubmitHandler<Wallet> = async (values) => {
    setServerError('');
    const { error, response } = await handleRequest<ChainlinkNode>(
      updateChainlinkNode.bind(undefined, values, name)
    );

    if (error) {
      setServerError(error);
      return;
    }

    if (response) {
      mutate?.();
      reset(values);
      setSubmitSuccess('Wallet keystore password has been updated');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="px-4 py-5 sm:p-6">
        {/* Keystore Password */}
        {!isLoading && (
          <Controller
            control={control}
            name="keystorePasswordSecretName"
            defaultValue={keystorePasswordSecretName}
            render={({ field }) => (
              <Select
                options={passwordOptions}
                value={field.value}
                onChange={field.onChange}
                label="Keystore Password"
                error={errors.keystorePasswordSecretName?.message}
                placeholder="Select a password"
              />
            )}
          />
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
  );
}

export default WalletDetails;
