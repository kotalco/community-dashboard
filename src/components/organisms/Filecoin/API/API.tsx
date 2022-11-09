import { KeyedMutator } from 'swr';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

import TextInput from '@components/molecules/TextInput/TextInput';
import Button from '@components/atoms/Button/Button';
import Toggle from '@components/molecules/Toggle/Toggle';
import ErrorSummary from '@components/templates/ErrorSummary/ErrorSummary';
import { API } from '@interfaces/filecoin/FilecoinNode';
import { handleRequest } from '@utils/helpers/handleRequest';
import { yupResolver } from '@hookform/resolvers/yup';
import { FilecoinNode } from '@interfaces/filecoin/FilecoinNode';
import { updateFilecoinNode } from '@utils/requests/filecoin';
import { apiSchema } from '@schemas/filecoin/api';

interface Props extends FilecoinNode {
  mutate?: KeyedMutator<{ node: FilecoinNode }>;
}

function APIDetails({ api, apiRequestTimeout, name, mutate }: Props) {
  const {
    handleSubmit,
    reset,
    register,
    control,
    watch,
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

  const [apiState, requestTimeout] = watch(['api', 'apiRequestTimeout']);

  const onSubmit: SubmitHandler<API> = async (values) => {
    const { response } = await handleRequest(
      () => updateFilecoinNode(values, name),
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
