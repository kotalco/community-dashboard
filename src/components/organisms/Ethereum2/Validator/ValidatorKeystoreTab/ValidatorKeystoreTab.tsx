import { useForm, SubmitHandler, Controller } from 'react-hook-form';

import Button from '@components/atoms/Button/Button';
import Multiselect from '@components/molecules/Multiselect/Multiselect';
import Select from '@components/molecules/Select/Select';
import ErrorSummary from '@components/templates/ErrorSummary/ErrorSummary';
import { updateValidator } from '@utils/requests/ethereum2/validators';
import { Keystores, Validator } from '@interfaces/ethereum2/Validator';
import { KubernetesSecretTypes } from '@enums/KubernetesSecret/KubernetesSecretTypes';
import { handleRequest } from '@utils/helpers/handleRequest';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '@schemas/ethereum2/validator/keystores';
import { KeyedMutator } from 'swr';
import { useSecretTypes } from '@hooks/useSecretTypes';

interface Props extends Validator {
  mutate?: KeyedMutator<{ validator: Validator }>;
}

const ValidatorKeystoreTab: React.FC<React.PropsWithChildren<Props>> = ({
  name,
  keystores,
  walletPasswordSecretName,
  mutate,
}) => {
  const { data: keystoreOptions, isLoading: isLoadingKeystores } =
    useSecretTypes(KubernetesSecretTypes.ethereum2Keystore);

  const { data: passwordOptions, isLoading: isLoadingPasswords } =
    useSecretTypes(KubernetesSecretTypes.password);

  const selectedKeystores = keystores.map(({ secretName }) => secretName);

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
  } = useForm<Keystores>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Keystores> = async (values) => {
    const { response } = await handleRequest(
      () => updateValidator(name, values),
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
        {/* Key Stores */}
        {!isLoadingKeystores && (
          <Controller
            name="keystores"
            control={control}
            defaultValue={selectedKeystores}
            render={({ field }) => (
              <Multiselect
                label="Ethereum 2.0 Keystores"
                placeholder="Choose your keystores..."
                options={keystoreOptions}
                errors={errors}
                error={errors.keystores && field.name}
                onChange={field.onChange}
                value={field.value}
                href={`/core/secrets/create?type=${KubernetesSecretTypes.ethereum2Keystore}`}
                hrefTitle="Create New Keystore"
              />
            )}
          />
        )}

        {walletPasswordSecretName && !isLoadingPasswords && (
          <div className="max-w-xs mt-4">
            <Controller
              name="walletPasswordSecretName"
              control={control}
              defaultValue={walletPasswordSecretName}
              render={({ field }) => (
                <Select
                  placeholder="Choose a wallet password"
                  label="Prysm Client Wallet Password"
                  options={passwordOptions}
                  onChange={field.onChange}
                  value={field.value}
                  href={`/core/secrets/create?type=${KubernetesSecretTypes.password}`}
                  hrefTitle="Create New Password"
                />
              )}
            />
          </div>
        )}

        <ErrorSummary
          errors={errors}
          isSuccess={isSubmitSuccessful}
          successMessage="Your validator updated successfuly"
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

export default ValidatorKeystoreTab;
