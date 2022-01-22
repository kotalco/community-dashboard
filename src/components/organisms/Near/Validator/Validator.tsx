import { useState } from 'react';
import { KeyedMutator } from 'swr';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

import Select from '@components/molecules/Select/Select';
import Button from '@components/atoms/Button/Button';
import { Validator } from '@interfaces/near/NearNode';
import { handleRequest } from '@utils/helpers/handleRequest';
import { yupResolver } from '@hookform/resolvers/yup';
import { NearNode } from '@interfaces/near/NearNode';
import { updateNearNode } from '@utils/requests/near';
import { KubernetesSecretTypes } from '@enums/KubernetesSecret/KubernetesSecretTypes';
import { useSecretsByType } from '@utils/requests/secrets';
import { validatorSchema } from '@schemas/near/validator';

interface Props extends NearNode {
  mutate?: KeyedMutator<{ node: NearNode }>;
}

function ValidatorDetails({ validatorSecretName, name, mutate }: Props) {
  const [serverError, setServerError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');
  const { data: privateKeys, isLoading } = useSecretsByType(
    KubernetesSecretTypes.nearPrivateKey
  );

  const {
    handleSubmit,
    reset,
    control,
    formState: { isDirty, isSubmitting, errors },
  } = useForm<Validator>({
    resolver: yupResolver(validatorSchema),
  });

  const onSubmit: SubmitHandler<Validator> = async (values) => {
    setSubmitSuccess('');
    setServerError('');
    const { error, response } = await handleRequest<NearNode>(
      updateNearNode.bind(undefined, values, name)
    );

    if (error) {
      setServerError(error);
      return;
    }

    if (response) {
      mutate?.();
      reset(response);
      setSubmitSuccess('Validator data has been updated');
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
                options={privateKeys}
                onChange={field.onChange}
                value={field.value}
                href={`/core/secrets/create?type=${KubernetesSecretTypes.nearPrivateKey}`}
                hrefTitle="Create new validator key..."
                withClear
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

export default ValidatorDetails;
