import { useForm, SubmitHandler, Controller } from 'react-hook-form';

import Select from '@components/molecules/Select/Select';
import Button from '@components/atoms/Button/Button';
import Toggle from '@components/molecules/Toggle/Toggle';
import TextInput from '@components/molecules/TextInput/TextInput';
import ErrorSummary from '@components/templates/ErrorSummary/ErrorSummary';
import { ChainlinkNode, TLS } from '@interfaces/chainlink/ChainlinkNode';
import { KeyedMutator } from 'swr';
import { updateChainlinkNode } from '@utils/requests/chainlink';
import { handleRequest } from '@utils/helpers/handleRequest';
import { KubernetesSecretTypes } from '@enums/KubernetesSecret/KubernetesSecretTypes';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '@schemas/chainlink/tls';
import { useSecretTypes } from '@hooks/useSecretTypes';

interface Props extends ChainlinkNode {
  mutate?: KeyedMutator<{
    node: ChainlinkNode;
  }>;
}

function TLSDetails({
  certSecretName,
  tlsPort,
  secureCookies,
  name,
  mutate,
}: Props) {
  const { data: tlsCertificateOptions, isLoading } = useSecretTypes(
    KubernetesSecretTypes.tlsCertificate
  );

  const {
    handleSubmit,
    register,
    control,
    reset,
    watch,
    setValue,
    setError,
    clearErrors,
    formState: {
      isDirty,
      isSubmitting,
      isSubmitSuccessful,
      isSubmitted,
      isValid,
      errors,
    },
  } = useForm<TLS>({
    resolver: yupResolver(schema),
  });

  const tlsCertificate = watch('certSecretName');

  const onSubmit: SubmitHandler<TLS> = async (values) => {
    const { response } = await handleRequest(
      () => updateChainlinkNode(values, name),
      setError
    );

    if (response) {
      mutate?.();
      reset(values);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="px-4 py-5 sm:p-6">
        {/* Certificate */}
        {!isLoading && (
          <Controller
            control={control}
            name="certSecretName"
            defaultValue={certSecretName}
            render={({ field }) => (
              <Select
                options={tlsCertificateOptions}
                value={field.value}
                onChange={(value) => {
                  if (!value) setValue('secureCookies', false);
                  field.onChange(value);
                }}
                withClear
                label="Certificate"
                error={errors.certSecretName?.message}
                placeholder="Select a certificate..."
                href={`/core/secrets/create?type=${KubernetesSecretTypes.tlsCertificate}`}
                hrefTitle="Add New Certificate..."
              />
            )}
          />
        )}

        {/* Secure Cookies */}
        <Controller
          control={control}
          name="secureCookies"
          defaultValue={secureCookies}
          render={({ field }) => (
            <Toggle
              label="Secure Cookies"
              checked={field.value}
              onChange={(state) => {
                if (!tlsCertificate) return;
                field.onChange(state);
              }}
            />
          )}
        />

        {/* TLS Port */}
        <TextInput
          disabled={!tlsCertificate}
          defaultValue={tlsPort}
          label="TLS Port"
          {...register('tlsPort')}
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

export default TLSDetails;
