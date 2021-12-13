import { useState } from 'react';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';

import Layout from '@components/templates/Layout/Layout';
import FormLayout from '@components/templates/FormLayout/FormLayout';
import TextInput from '@components/molecules/TextInput/TextInput';
import Select from '@components/molecules/Select/Select';
import MultiSelectWithInput from '@components/molecules/MultiSelectWithInput/MultiSelectWithInput';
import Multiselect from '@components/molecules/Multiselect/Multiselect';
import SelectWithInput from '@components/molecules/SelectWithInput/SelectWithInput';
import { clientOptions } from '@data/ethereum2/clientOptions';
import { networkOptions } from '@data/ethereum2/networkOptions';
import { schema } from '@schemas/ethereum2/validator/create';
import { CreateValidator, Validator } from '@interfaces/ethereum2/Validator';
import { createValidator } from '@utils/requests/ethereum2/validators';
import { ValidatorsClient } from '@enums/Ethereum2/Validators/ValidatorsClient';
import { useSecretsByType } from '@utils/requests/secrets';
import { KubernetesSecretTypes } from '@enums/KubernetesSecret/KubernetesSecretTypes';
import Heading from '@components/templates/Heading/Heading';
import { handleRequest } from '@utils/helpers/handleRequest';
import { useBeaconNodes } from '@hooks/useBeaconNodes';
import { BeaconNodeClient } from '@enums/Ethereum2/BeaconNodes/BeaconNodeClient';

const CreateValidator: React.FC = () => {
  const [serverError, setServerError] = useState('');
  const router = useRouter();
  const { data: keystoreOptions } = useSecretsByType(
    KubernetesSecretTypes.ethereum2Keystore
  );
  const { data: walletPasswordOptions } = useSecretsByType(
    KubernetesSecretTypes.password
  );
  const { beaconnodes } = useBeaconNodes();

  const activeBeaconnodes = beaconnodes
    .filter(({ client, rest, rpc }) =>
      client === BeaconNodeClient.teku || client === BeaconNodeClient.lighthouse
        ? rest
        : rpc
    )
    .map(({ name, client, rpcPort, restPort }) => ({
      label: name,
      value: `http://${name}:${
        client === BeaconNodeClient.teku ||
        client === BeaconNodeClient.lighthouse
          ? restPort
          : rpcPort
      }`,
    }));

  const {
    watch,
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitted, isValid, isSubmitting },
  } = useForm<CreateValidator>({ resolver: yupResolver(schema) });

  const client = watch('client');

  const onSubmit: SubmitHandler<CreateValidator> = async (values) => {
    setServerError('');
    const { response, error } = await handleRequest<Validator>(
      createValidator.bind(undefined, values)
    );

    if (error) {
      setServerError(error);
      return;
    }

    if (response) {
      localStorage.setItem('validator', response.name);
      router.push('/deployments/ethereum2/validators');
    }
  };

  return (
    <Layout>
      <Heading title="Create New Validator" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormLayout
          error={serverError}
          isSubmitted={isSubmitted}
          isSubmitting={isSubmitting}
          isValid={isValid}
        >
          {/* Beacon Node Name */}
          <TextInput
            label="Validator Name"
            error={errors.name?.message}
            {...register('name')}
          />

          {/* Client */}
          <Controller
            name="client"
            control={control}
            render={({ field }) => (
              <Select
                label="Client"
                error={errors.client?.message}
                options={clientOptions}
                placeholder="Choose a client..."
                onChange={field.onChange}
              />
            )}
          />

          {/* Network */}
          <Controller
            name="network"
            control={control}
            render={({ field }) => (
              <SelectWithInput
                options={networkOptions}
                placeholder="Choose a network..."
                label="Network"
                name={field.name}
                value={field.value}
                onChange={field.onChange}
                error={errors.network?.message}
              />
            )}
          />

          {/* Key Stores */}
          <Controller
            name="keystores"
            control={control}
            render={({ field }) => (
              <Multiselect
                label="Ethereum 2.0 Keystores"
                placeholder="Choose your keystores..."
                options={keystoreOptions}
                error={
                  errors.keystores && (
                    <ErrorMessage errors={errors} name="keystores" />
                  )
                }
                onChange={field.onChange}
                value={field.value}
                href={`/core/secrets/create?type=${KubernetesSecretTypes.ethereum2Keystore}`}
                hrefTitle="Create New Keystore"
              />
            )}
          />

          {/* Prysm Client Wallet Password */}
          {client === ValidatorsClient.prysm && (
            <Controller
              name="walletPasswordSecretName"
              control={control}
              shouldUnregister={true}
              render={({ field }) => (
                <Select
                  placeholder="Choose your wallet password..."
                  label="Prysm Client Wallet Password"
                  error={errors.walletPasswordSecretName?.message}
                  options={walletPasswordOptions}
                  onChange={field.onChange}
                  href={`/core/secrets/create?type=${KubernetesSecretTypes.password}`}
                  hrefTitle="Create New Password"
                />
              )}
            />
          )}

          {/* Beacon Node Endpoints */}
          <Controller
            name="beaconEndpoints"
            control={control}
            render={({ field }) => (
              <MultiSelectWithInput
                single={client !== ValidatorsClient.lighthouse}
                options={activeBeaconnodes}
                label="Beacon Node Endpoints"
                helperText={
                  client === ValidatorsClient.lighthouse
                    ? 'One endpoint per each line'
                    : ''
                }
                errors={errors}
                error={errors.beaconEndpoints && field.name}
                value={field.value}
                onChange={field.onChange}
                placeholder={
                  client === ValidatorsClient.lighthouse
                    ? 'Select beacon nodes...'
                    : 'Select a beacon node...'
                }
                otherLabel={
                  client === ValidatorsClient.lighthouse
                    ? 'Add external beacon nodes'
                    : 'Use external beacon node'
                }
              />
            )}
          />
        </FormLayout>
      </form>
    </Layout>
  );
};

export default CreateValidator;
