import { useState } from 'react';
import { KeyedMutator } from 'swr';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';

import TextInput from '@components/molecules/TextInput/TextInput';
import Button from '@components/atoms/Button/Button';
import Toggle from '@components/molecules/Toggle/Toggle';
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
  const [serverError, setServerError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');

  const {
    handleSubmit,
    control,
    reset,
    register,
    watch,
    formState: { isDirty, isSubmitting, errors },
  } = useForm<Prometheus>({
    resolver: yupResolver(prometheusSchema),
  });

  const prometheusState = watch('prometheus');

  const onSubmit: SubmitHandler<Prometheus> = async (values) => {
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
      setSubmitSuccess('Prometheus data has been updated');
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

export default PrometheusDetails;
