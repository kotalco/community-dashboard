import { useState } from 'react';
import { KeyedMutator } from 'swr';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

import TextInput from '@components/molecules/TextInput/TextInput';
import Button from '@components/atoms/Button/Button';
import { API } from '@interfaces/filecoin/FilecoinNode';
import { handleRequest } from '@utils/helpers/handleRequest';
import { yupResolver } from '@hookform/resolvers/yup';
import { FilecoinNode } from '@interfaces/filecoin/FilecoinNode';
import { updateFilecoinNode } from '@utils/requests/filecoin';
import Toggle from '@components/molecules/Toggle/Toggle';
import { apiSchema } from '@schemas/filecoin/api';

interface Props extends FilecoinNode {
  mutate?: KeyedMutator<{ node: FilecoinNode }>;
}

function APIDetails({
  api,
  apiHost,
  apiPort,
  apiRequestTimeout,
  name,
  mutate,
}: Props) {
  const [serverError, setServerError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');

  const {
    handleSubmit,
    reset,
    register,
    control,
    watch,
    formState: { isDirty, isSubmitting, errors },
  } = useForm<API>({
    resolver: yupResolver(apiSchema),
  });

  const [apiState, requestTimeout] = watch(['api', 'apiRequestTimeout']);

  const onSubmit: SubmitHandler<API> = async (values) => {
    setSubmitSuccess('');
    setServerError('');
    const { error, response } = await handleRequest<FilecoinNode>(
      updateFilecoinNode.bind(undefined, values, name)
    );

    if (error) {
      setServerError(error);
      return;
    }

    if (response) {
      mutate?.();
      reset(response);
      setSubmitSuccess('API data has been updated');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="px-4 py-5 sm:p-6">
        {/* API */}
        <Controller
          control={control}
          name="api"
          defaultValue={api}
          render={({ field }) => (
            <Toggle
              label="API"
              checked={field.value}
              onChange={field.onChange}
              error={errors.api?.message}
            />
          )}
        />

        {/* API Port */}
        <TextInput
          type="text"
          label="API Port"
          disabled={!apiState}
          error={errors.apiPort?.message}
          defaultValue={apiPort}
          {...register('apiPort')}
        />

        {/* API Host */}
        <TextInput
          type="text"
          label="API Host"
          disabled={!apiState}
          error={errors.apiHost?.message}
          defaultValue={apiHost}
          {...register('apiHost')}
        />

        {/* API Request Timeout */}
        <TextInput
          type="text"
          label="API Request Timeout"
          disabled={!apiState}
          unit={requestTimeout > 1 ? 'Seconds' : 'Second'}
          error={errors.apiRequestTimeout?.message}
          defaultValue={apiRequestTimeout}
          {...register('apiRequestTimeout')}
        />
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
