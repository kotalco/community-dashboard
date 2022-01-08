import { useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

import Select from '@components/molecules/Select/Select';
import Button from '@components/atoms/Button/Button';
import { ChainlinkNode, TLS } from '@interfaces/chainlink/ChainlinkNode';
import { KeyedMutator } from 'swr';
import { updateChainlinkNode } from '@utils/requests/chainlink';
import { handleRequest } from '@utils/helpers/handleRequest';
import { useSecretsByType } from '@utils/requests/secrets';
import { KubernetesSecretTypes } from '@enums/KubernetesSecret/KubernetesSecretTypes';
import Toggle from '@components/molecules/Toggle/Toggle';
import TextInput from '@components/molecules/TextInput/TextInput';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '@schemas/chainlink/tls';

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
  const [submitSuccess, setSubmitSuccess] = useState('');
  const [serverError, setServerError] = useState('');
  const { data: tlsCertificates, isLoading } = useSecretsByType(
    KubernetesSecretTypes.tlsCertificate
  );

  const {
    handleSubmit,
    register,
    control,
    reset,
    watch,
    setValue,
    formState: { isDirty, isSubmitting, errors },
  } = useForm<TLS>({ resolver: yupResolver(schema) });

  const tlsCertificate = watch('certSecretName');

  const onSubmit: SubmitHandler<TLS> = async (values) => {
    setServerError('');
    const { error, response } = await handleRequest<ChainlinkNode>(
      updateChainlinkNode.bind(undefined, values, name)
    );

    if (error) {
      setServerError(error);
      return;
    }

    if (response) {
      mutate?.();
      reset(values);
      setSubmitSuccess('TLS certificate data has been updated');
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
                options={tlsCertificates}
                value={field.value}
                onChange={(value) => {
                  if (!value) setValue('secureCookies', false);
                  field.onChange(value);
                }}
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

export default TLSDetails;
