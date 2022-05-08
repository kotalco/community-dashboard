import { useRouter } from 'next/router';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Layout from '@components/templates/Layout/Layout';
import FormLayout from '@components/templates/FormLayout/FormLayout';
import TextInput from '@components/molecules/TextInput/TextInput';
import Select from '@components/molecules/Select/Select';
import MultiSelectWithInput from '@components/molecules/MultiSelectWithInput/MultiSelectWithInput';
import Multiselect from '@components/molecules/Multiselect/Multiselect';
import SelectWithInput from '@components/molecules/SelectWithInput/SelectWithInput';
import Heading from '@components/templates/Heading/Heading';
import ErrorSummary from '@components/templates/ErrorSummary/ErrorSummary';
import Button from '@components/atoms/Button/Button';
import useInfiniteRequest from '@hooks/useInfiniteRequest';
import { clientOptions } from '@data/ethereum2/clientOptions';
import { networkOptions } from '@data/ethereum2/networkOptions';
import { schema } from '@schemas/ethereum2/validator/create';
import { CreateValidator } from '@interfaces/ethereum2/Validator';
import { createValidator } from '@utils/requests/ethereum2/validators';
import { Ethereum2Client } from '@enums/Ethereum2/Ethereum2Client';
import { KubernetesSecretTypes } from '@enums/KubernetesSecret/KubernetesSecretTypes';
import { handleRequest } from '@utils/helpers/handleRequest';
import { Deployments } from '@enums/Deployments';
import { NotificationInfo } from '@interfaces/NotificationInfo';
import { BeaconNode } from '@interfaces/ethereum2/BeaconNode';
import { useSecretTypes } from '@hooks/useSecretTypes';

const CreateValidator: React.FC = () => {
  const router = useRouter();

  const { data: keystoreOptions } = useSecretTypes(
    KubernetesSecretTypes.ethereum2Keystore
  );

  const { data: passwordOptions } = useSecretTypes(
    KubernetesSecretTypes.password
  );

  const { data: beaconnodes } = useInfiniteRequest<BeaconNode>(
    '/ethereum2/beaconnodes'
  );

  const activeBeaconnodes = beaconnodes
    .filter(({ client, rest, rpc }) =>
      client === Ethereum2Client.teku || client === Ethereum2Client.lighthouse
        ? rest
        : rpc
    )
    .map(({ name, client, rpcPort, restPort }) => ({
      label: name,
      value: `http://${name}:${
        client === Ethereum2Client.teku || client === Ethereum2Client.lighthouse
          ? restPort
          : rpcPort
      }`,
    }));

  const {
    watch,
    register,
    control,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitted, isValid, isSubmitting, isDirty },
  } = useForm<CreateValidator>({ resolver: yupResolver(schema) });

  const client = watch('client');

  const onSubmit: SubmitHandler<CreateValidator> = async (values) => {
    const { response } = await handleRequest(
      () => createValidator(values),
      setError
    );

    if (response) {
      const notification: NotificationInfo = {
        title: 'Ethereum 2.0 Validator has been created',
        message:
          'Validator has been created successfully, and will be up and running in few seconds.',
        deploymentName: response.name,
      };
      localStorage.setItem(Deployments.validator, JSON.stringify(notification));
      router.push('/deployments/ethereum2/validators');
    }
  };

  return (
    <Layout>
      <Heading title="Create New Validator" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormLayout>
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
                otherLabel="Other Network"
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
                errors={errors}
                error={errors.keystores && field.name}
                onChange={field.onChange}
                value={field.value}
                href={`/core/secrets/create?type=${KubernetesSecretTypes.ethereum2Keystore}`}
                hrefTitle="Create New Keystore"
              />
            )}
          />

          {/* Prysm Client Wallet Password */}
          {client === Ethereum2Client.prysm && (
            <Controller
              name="walletPasswordSecretName"
              control={control}
              shouldUnregister={true}
              render={({ field }) => (
                <Select
                  placeholder="Choose your wallet password..."
                  label="Prysm Client Wallet Password"
                  error={errors.walletPasswordSecretName?.message}
                  options={passwordOptions}
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
                single={client !== Ethereum2Client.lighthouse}
                options={activeBeaconnodes}
                label="Beacon Node Endpoints"
                emptyLabel="No Internal Active Beaconnodes"
                helperText={
                  client === Ethereum2Client.lighthouse
                    ? 'One endpoint per line'
                    : ''
                }
                errors={errors}
                error={errors.beaconEndpoints && field.name}
                value={field.value}
                onChange={field.onChange}
                placeholder={
                  client === Ethereum2Client.lighthouse
                    ? 'Select beacon nodes...'
                    : 'Select a beacon node...'
                }
                otherLabel={
                  client === Ethereum2Client.lighthouse
                    ? 'Add external beacon nodes'
                    : 'Use external beacon node'
                }
              />
            )}
          />

          <ErrorSummary errors={errors} />

          <div className="flex flex-row-reverse items-center px-4 py-3 mt-5 -mx-6 -mb-6 bg-gray-50 sm:px-6">
            <Button
              type="submit"
              className="btn btn-primary"
              disabled={(isSubmitted && !isValid) || isSubmitting || !isDirty}
              loading={isSubmitting}
              onClick={() => clearErrors()}
            >
              Create
            </Button>
          </div>
        </FormLayout>
      </form>
    </Layout>
  );
};

export default CreateValidator;
