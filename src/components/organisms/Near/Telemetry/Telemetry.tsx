import { useState } from 'react';
import { KeyedMutator } from 'swr';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';

import TextInput from '@components/molecules/TextInput/TextInput';
import Button from '@components/atoms/Button/Button';
import Toggle from '@components/molecules/Toggle/Toggle';
import { PolkadotNode, Telemetry } from '@interfaces/polkadot/PolkadotNode';
import { handleRequest } from '@utils/helpers/handleRequest';
import { yupResolver } from '@hookform/resolvers/yup';
import { updatePolkadotNode } from '@utils/requests/polkadot';
import { telemetrySchema } from '@schemas/polkadot/telemetry';

interface Props extends PolkadotNode {
  mutate?: KeyedMutator<{ node: PolkadotNode }>;
}

function TelemetryDetails({ telemetry, telemetryURL, name, mutate }: Props) {
  const [serverError, setServerError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');

  const {
    handleSubmit,
    control,
    reset,
    register,
    watch,
    formState: { isDirty, isSubmitting, errors },
  } = useForm<Telemetry>({
    resolver: yupResolver(telemetrySchema),
  });

  const telemetryState = watch('telemetry');

  const onSubmit: SubmitHandler<Telemetry> = async (values) => {
    setSubmitSuccess('');
    setServerError('');
    const { error, response } = await handleRequest<PolkadotNode>(
      updatePolkadotNode.bind(undefined, values, name)
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
        {/* Telemetry */}
        <Controller
          control={control}
          name="telemetry"
          defaultValue={telemetry}
          render={({ field }) => (
            <Toggle
              label="Telemetry"
              checked={field.value}
              onChange={field.onChange}
              error={errors.telemetry?.message}
            />
          )}
        />

        {/* Telemetry Service URL */}
        <TextInput
          disabled={!telemetryState}
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
