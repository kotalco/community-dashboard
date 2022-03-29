import { KeyedMutator } from 'swr';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

import Select from '@components/molecules/Select/Select';
import Button from '@components/atoms/Button/Button';
import ErrorSummary from '@components/templates/ErrorSummary/ErrorSummary';
import { Validator } from '@interfaces/near/NearNode';
import { handleRequest } from '@utils/helpers/handleRequest';
import { yupResolver } from '@hookform/resolvers/yup';
import { NearNode } from '@interfaces/near/NearNode';
import { updateNearNode } from '@utils/requests/near';
import { KubernetesSecretTypes } from '@enums/KubernetesSecret/KubernetesSecretTypes';
import { validatorSchema } from '@schemas/near/validator';
import { useSecretTypes } from '@hooks/useSecretTypes';

interface Props extends NearNode {
  mutate?: KeyedMutator<{ node: NearNode }>;
}

function ValidatorDetails({ validatorSecretName, name, mutate }: Props) {
  const { data: privateKeyOptions, isLoading } = useSecretTypes(
    KubernetesSecretTypes.nearPrivateKey
  );

  const {
    handleSubmit,
    reset,
    control,
    setError,
    clearErrors,
    formState: {
      isSubmitting,
      errors,
      isSubmitSuccessful,
      isSubmitted,
      isValid,
      isDirty,
    },
  } = useForm<Validator>({
    resolver: yupResolver(validatorSchema),
  });

  const onSubmit: SubmitHandler<Validator> = async (values) => {
    const { response } = await handleRequest(
      () => updateNearNode(values, name),
      setError
    );

    if (response) {
      mutate?.();
      reset(response);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="px-4 py-5 sm:p-6">
        {/* Validator Key */}
        {!isLoading && (
          <Controller
            name="validatorSecretName"
            control={control}
            defaultValue={validatorSecretName}
            render={({ field }) => (
              <Select
                placeholder="Choose a private key..."
                label="Validator key"
                error={errors.validatorSecretName?.message}
                options={privateKeyOptions}
                onChange={field.onChange}
                value={field.value}
                href={`/core/secrets/create?type=${KubernetesSecretTypes.nearPrivateKey}`}
                hrefTitle="Create new validator key..."
                withClear
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

export default ValidatorDetails;
