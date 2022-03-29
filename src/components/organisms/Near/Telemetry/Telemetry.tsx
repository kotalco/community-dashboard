import { KeyedMutator } from 'swr';
import { useForm, SubmitHandler } from 'react-hook-form';

import TextInput from '@components/molecules/TextInput/TextInput';
import Button from '@components/atoms/Button/Button';
import ErrorSummary from '@components/templates/ErrorSummary/ErrorSummary';
import { handleRequest } from '@utils/helpers/handleRequest';
import { yupResolver } from '@hookform/resolvers/yup';
import { telemetrySchema } from '@schemas/near/telemetry';
import { NearNode, Telemetry } from '@interfaces/near/NearNode';
import { updateNearNode } from '@utils/requests/near';

interface Props extends NearNode {
  mutate?: KeyedMutator<{ node: NearNode }>;
}

function TelemetryDetails({ telemetryURL, name, mutate }: Props) {
  const {
    handleSubmit,
    reset,
    register,
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
  } = useForm<Telemetry>({
    resolver: yupResolver(telemetrySchema),
  });

  const onSubmit: SubmitHandler<Telemetry> = async (values) => {
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
        {/* Telemetry Service URL */}
        <TextInput
          label="Telemetry Service URL"
          error={errors.telemetryURL?.message}
          defaultValue={telemetryURL}
          {...register('telemetryURL')}
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

export default TelemetryDetails;
