import { useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

import Select from '@components/molecules/SelectNew/SelectNew';
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

interface Props extends TLS {
  name: string;
  setNode: KeyedMutator<{
    node: ChainlinkNode;
  }>;
}

function TLSDetails({
  certSecretName,
  tlsPort,
  secureCookies,
  name,
  setNode,
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
    formState: { isDirty, isSubmitting, errors },
  } = useForm<TLS>({ resolver: yupResolver(schema) });

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
      setNode();
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
                labelProp="label"
                valueProp="value"
                value={field.value}
                onChange={field.onChange}
                label="Certificate"
                error={errors.certSecretName?.message}
                placeholder="Select a certificate..."
                href={`/core/secrets/create?type=${KubernetesSecretTypes.tlsCertificate}`}
                hrefTitle="Add a certificate..."
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
              onChange={field.onChange}
            />
          )}
        />

        {/* TLS Port */}
        <TextInput
          defaultValue={tlsPort}
          label="TLS Port"
          {...register('tlsPort')}
        />
      </div>

      <div className="flex space-x-2 space-x-reverse flex-row-reverse items-center px-4 py-3 bg-gray-50 sm:px-6">
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
