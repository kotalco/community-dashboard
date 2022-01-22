import { useState } from 'react';
import { KeyedMutator } from 'swr';
import { useForm, SubmitHandler } from 'react-hook-form';

import TextInput from '@components/molecules/TextInput/TextInput';
import Button from '@components/atoms/Button/Button';
import { handleRequest } from '@utils/helpers/handleRequest';
import { yupResolver } from '@hookform/resolvers/yup';
import { telemetrySchema } from '@schemas/near/telemetry';
import { NearNode, Telemetry } from '@interfaces/near/NearNode';
import { updateNearNode } from '@utils/requests/near';

interface Props extends NearNode {
  mutate?: KeyedMutator<{ node: NearNode }>;
}

function TelemetryDetails({ telemetryURL, name, mutate }: Props) {
  const [serverError, setServerError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');

  const {
    handleSubmit,
    reset,
    register,
    formState: { isDirty, isSubmitting, errors },
  } = useForm<Telemetry>({
    resolver: yupResolver(telemetrySchema),
  });

  const onSubmit: SubmitHandler<Telemetry> = async (values) => {
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
      setSubmitSuccess('Telemetry data has been updated');
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

export default TelemetryDetails;
