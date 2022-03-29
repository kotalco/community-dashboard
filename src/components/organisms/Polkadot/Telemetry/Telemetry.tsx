import { KeyedMutator } from 'swr';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';

import TextInput from '@components/molecules/TextInput/TextInput';
import Button from '@components/atoms/Button/Button';
import Toggle from '@components/molecules/Toggle/Toggle';
import ErrorSummary from '@components/templates/ErrorSummary/ErrorSummary';
import { PolkadotNode, Telemetry } from '@interfaces/polkadot/PolkadotNode';
import { handleRequest } from '@utils/helpers/handleRequest';
import { yupResolver } from '@hookform/resolvers/yup';
import { updatePolkadotNode } from '@utils/requests/polkadot';
import { telemetrySchema } from '@schemas/polkadot/telemetry';

interface Props extends PolkadotNode {
  mutate?: KeyedMutator<{ node: PolkadotNode }>;
}

function TelemetryDetails({ telemetry, telemetryURL, name, mutate }: Props) {
  const {
    handleSubmit,
    control,
    reset,
    register,
    watch,
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

  const telemetryState = watch('telemetry');

  const onSubmit: SubmitHandler<Telemetry> = async (values) => {
    const { response } = await handleRequest(
      () => updatePolkadotNode(values, name),
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
