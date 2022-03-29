import { KeyedMutator } from 'swr';
import { useForm, SubmitHandler } from 'react-hook-form';

import TextInput from '@components/molecules/TextInput/TextInput';
import Button from '@components/atoms/Button/Button';
import ErrorSummary from '@components/templates/ErrorSummary/ErrorSummary';
import { handleRequest } from '@utils/helpers/handleRequest';
import { yupResolver } from '@hookform/resolvers/yup';
import { prometheusSchema } from '@schemas/near/prometheus';
import { NearNode, Prometheus } from '@interfaces/near/NearNode';
import { updateNearNode } from '@utils/requests/near';

interface Props extends NearNode {
  mutate?: KeyedMutator<{ node: NearNode }>;
}

function PrometheusDetails({
  prometheusPort,
  prometheusHost,
  name,
  mutate,
}: Props) {
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
  } = useForm<Prometheus>({
    resolver: yupResolver(prometheusSchema),
  });

  const onSubmit: SubmitHandler<Prometheus> = async (values) => {
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
        {/* Prometheus Port */}
        <TextInput
          label="Prometheus Port"
          error={errors.prometheusPort?.message}
          defaultValue={prometheusPort}
          {...register('prometheusPort')}
        />

        {/* Prometheus Host */}
        <TextInput
          label="Prometheus Host"
          error={errors.prometheusHost?.message}
          defaultValue={prometheusHost}
          {...register('prometheusHost')}
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
