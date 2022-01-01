import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

import Select from '@components/molecules/Select/Select';
import Button from '@components/atoms/Button/Button';
import { API, ChainlinkNode } from '@interfaces/chainlink/ChainlinkNode';
import { KeyedMutator } from 'swr';
import { updateChainlinkNode } from '@utils/requests/chainlink';
import { handleRequest } from '@utils/helpers/handleRequest';
import { useSecretsByType } from '@utils/requests/secrets';
import { KubernetesSecretTypes } from '@enums/KubernetesSecret/KubernetesSecretTypes';
import TextInput from '@components/molecules/TextInput/TextInput';
import { apiSchema } from '@schemas/chainlink/apiCredentials';

interface Props extends ChainlinkNode {
  name: string;
  mutate?: KeyedMutator<{
    node: ChainlinkNode;
  }>;
}

function APIDetails({ apiCredentials, name, mutate }: Props) {
  const [submitSuccess, setSubmitSuccess] = useState('');
  const [serverError, setServerError] = useState('');
  const { data: passwords, isLoading } = useSecretsByType(
    KubernetesSecretTypes.password
  );

  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { isDirty, isSubmitting, errors },
  } = useForm<API>({
    resolver: yupResolver(apiSchema),
  });

  const onSubmit: SubmitHandler<API> = async (values) => {
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
      setSubmitSuccess('API credentials has been updated');
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
                options={passwords}
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

export default APIDetails;
