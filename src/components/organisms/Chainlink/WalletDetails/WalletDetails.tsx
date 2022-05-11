import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

import Select from '@components/molecules/Select/Select';
import Button from '@components/atoms/Button/Button';
import ErrorSummary from '@components/templates/ErrorSummary/ErrorSummary';
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
  const { data: passwordOptions } = useSecretTypes(
    KubernetesSecretTypes.password
  );

  const {
    handleSubmit,
    control,
    reset,
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
  } = useForm<Wallet>({ resolver: yupResolver(walletSchema) });

  const onSubmit: SubmitHandler<Wallet> = async (values) => {
    const { response } = await handleRequest(
      () => updateChainlinkNode(values, name),
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
        {/* Keystore Password */}
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
              href={`/core/secrets/create?type=${KubernetesSecretTypes.password}`}
              hrefTitle="Create New Password..."
            />
          )}
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

export default WalletDetails;
