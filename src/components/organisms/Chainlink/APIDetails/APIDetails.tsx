import { useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

import Select from '@components/molecules/SelectNew/SelectNew';
import Button from '@components/atoms/Button/Button';
import { API, ChainlinkNode } from '@interfaces/chainlink/ChainlinkNode';
import { KeyedMutator } from 'swr';
import { updateChainlinkNode } from '@utils/requests/chainlink';
import { handleRequest } from '@utils/helpers/handleRequest';
import { useSecretsByType } from '@utils/requests/secrets';
import { KubernetesSecretTypes } from '@enums/KubernetesSecret/KubernetesSecretTypes';
import TextInput from '@components/molecules/TextInput/TextInput';

interface Props extends API {
  name: string;
  setNode: KeyedMutator<{
    node: ChainlinkNode;
  }>;
}

function APIDetails({ apiCredentials, name, setNode }: Props) {
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
  } = useForm<API>();

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
      setNode();
      reset(values);
      setSubmitSuccess('API credentials has been updated');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="px-4 py-5 sm:p-6">
        <h2 className="font-bold text-xl">API Credentials</h2>
        <p className="text-gray-500 mb-5 text-sm">
          For securing access to chainlink dashboard
        </p>

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
                labelProp="label"
                valueProp="value"
                value={field.value}
                onChange={field.onChange}
                label="Password"
                error={errors.apiCredentials?.passwordSecretName?.message}
              />
            )}
          />
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
