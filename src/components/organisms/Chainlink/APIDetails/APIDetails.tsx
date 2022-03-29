import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

import Select from '@components/molecules/Select/Select';
import Button from '@components/atoms/Button/Button';
import TextInput from '@components/molecules/TextInput/TextInput';
import ErrorSummary from '@components/templates/ErrorSummary/ErrorSummary';
import { API, ChainlinkNode } from '@interfaces/chainlink/ChainlinkNode';
import { KeyedMutator } from 'swr';
import { updateChainlinkNode } from '@utils/requests/chainlink';
import { handleRequest } from '@utils/helpers/handleRequest';
import { KubernetesSecretTypes } from '@enums/KubernetesSecret/KubernetesSecretTypes';
import { apiSchema } from '@schemas/chainlink/apiCredentials';
import { useSecretTypes } from '@hooks/useSecretTypes';

interface Props extends ChainlinkNode {
  name: string;
  mutate?: KeyedMutator<{
    node: ChainlinkNode;
  }>;
}

function APIDetails({ apiCredentials, name, mutate }: Props) {
  const { data: passwordOptions, isLoading } = useSecretTypes(
    KubernetesSecretTypes.password
  );

  const {
    handleSubmit,
    register,
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
  } = useForm<API>({
    resolver: yupResolver(apiSchema),
  });

  const onSubmit: SubmitHandler<API> = async (values) => {
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
        {/* Email */}
        <TextInput
          label="Email"
          defaultValue={apiCredentials.email}
          {...register('apiCredentials.email')}
        />

        {/* Password */}
        {!isLoading && (
          <Controller
            control={control}
            name="apiCredentials.passwordSecretName"
            defaultValue={apiCredentials.passwordSecretName}
            render={({ field }) => (
              <Select
                options={passwordOptions}
                value={field.value}
                onChange={field.onChange}
                label="Password"
                error={errors.apiCredentials?.passwordSecretName?.message}
                href={`/core/secrets/create?type=${KubernetesSecretTypes.password}`}
                hrefTitle="Create New Password..."
                placeholder="Select a password"
              />
            )}
          />
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
    </form>
  );
}

export default APIDetails;
