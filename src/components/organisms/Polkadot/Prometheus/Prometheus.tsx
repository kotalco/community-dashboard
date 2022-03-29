import { KeyedMutator } from 'swr';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';

import TextInput from '@components/molecules/TextInput/TextInput';
import Button from '@components/atoms/Button/Button';
import Toggle from '@components/molecules/Toggle/Toggle';
import ErrorSummary from '@components/templates/ErrorSummary/ErrorSummary';
import { PolkadotNode, Prometheus } from '@interfaces/polkadot/PolkadotNode';
import { handleRequest } from '@utils/helpers/handleRequest';
import { yupResolver } from '@hookform/resolvers/yup';
import { updatePolkadotNode } from '@utils/requests/polkadot';
import { prometheusSchema } from '@schemas/polkadot/prometheus';

interface Props extends PolkadotNode {
  mutate?: KeyedMutator<{ node: PolkadotNode }>;
}

function PrometheusDetails({
  prometheus,
  prometheusPort,
  name,
  mutate,
}: Props) {
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
  } = useForm<Prometheus>({
    resolver: yupResolver(prometheusSchema),
  });

  const prometheusState = watch('prometheus');

  const onSubmit: SubmitHandler<Prometheus> = async (values) => {
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
        {/* Prometheus */}
        <Controller
          control={control}
          name="prometheus"
          defaultValue={prometheus}
          render={({ field }) => (
            <Toggle
              label="Prometheus"
              checked={field.value}
              onChange={field.onChange}
              error={errors.prometheus?.message}
            />
          )}
        />

        {/* Prometheus Port */}
        <TextInput
          disabled={!prometheusState}
          label="Prometheus Port"
          error={errors.prometheusPort?.message}
          defaultValue={prometheusPort}
          {...register('prometheusPort')}
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

export default PrometheusDetails;
