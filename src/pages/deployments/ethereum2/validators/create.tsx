import { useRouter } from 'next/router';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';

import Layout from '@components/templates/Layout/Layout';
import FormLayout from '@components/templates/FormLayout/FormLayout';
import TextInput from '@components/molecules/TextInput/TextInput';
import Select from '@components/molecules/Select/Select';
import TextareaWithInput from '@components/molecules/TextareaWithInput/TextareaWithInput';
import Multiselect from '@components/molecules/Multiselect/Multiselect';
import { useNotification } from '@components/contexts/NotificationContext';
import { clientOptions } from '@data/ethereum2/clientOptions';
import { networkOptions } from '@data/ethereum2/networkOptions';
import { schema } from '@schemas/ethereum2/validator/createValidatorSchema';
import { CreateEthereum2Validator } from '@interfaces/ethereum2/Ethereum2Validator';
import { createValidator } from '@utils/requests/ethereum2/validators';
import { ValidatorsClients } from '@enums/Ethereum2/Validators/ValidatorsClients';
import { useSecretsByType } from '@utils/requests/secrets';
import axios from 'axios';
import { handleAxiosError } from '@utils/axios';
import { ServerError } from '@interfaces/ServerError';
import SelectWithInput from '@components/molecules/SelectWithInput/SelectWithInput';
import { KubernetesSecretTypes } from '@enums/KubernetesSecret/KubernetesSecretTypes';

const CreateValidator: React.FC = () => {
  const router = useRouter();
  const { data: keystoreOptions } = useSecretsByType(
    KubernetesSecretTypes.ethereum2Keystore
  );
  const { data: walletPasswordOptions } = useSecretsByType(
    KubernetesSecretTypes.password
  );
  const { createNotification } = useNotification();
  const {
    register,
    watch,
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitted, isValid, isSubmitting },
  } = useForm<CreateEthereum2Validator>();

  const client = watch('client');

  /**
   * Submit create validator form
   * @param ValidatorData the data required to create new node
   */
  const onSubmit: SubmitHandler<CreateEthereum2Validator> = async (values) => {
    try {
      const validator = await createValidator(values);

      createNotification({
        title: 'Validator has been created',
        protocol: `validator`,
        name: validator.name,
        action:
          'created successfully, and will be up and running in few seconds.',
      });
      void router.push('/deployments/ethereum2/validators');
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const error = handleAxiosError<ServerError>(e);
        setError('name', {
          type: 'server',
          message: error.response?.data.error,
        });
      }
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl font-semibold">Create New Validator</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormLayout
          isSubmitted={isSubmitted}
          isSubmitting={isSubmitting}
          isValid={isValid}
        >
          {/* Beacon Node Name */}
          <TextInput
            {...register('name', schema.name)}
            label="Validator Name"
            error={errors.name?.message}
          />

          {/* Client */}
          <div className="mt-4 max-w-xs">
            <Controller
              name="client"
              rules={schema.client}
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
          </div>

          {/* Network */}
          <div className="mt-4 max-w-xs">
            <Controller
              name="network"
              control={control}
              rules={schema.network}
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
          </div>

          {/* Key Stores */}
          <Controller
            name="keystores"
            control={control}
            rules={schema.keystore}
            render={({ field }) => (
              <Multiselect
                label="Ethereum 2.0 Keystores"
                placeholder="Choose your keystores..."
                options={keystoreOptions}
                error={errors.keystores?.message}
                onChange={field.onChange}
                value={field.value}
              />
            )}
          />

          {/* Prysm Client Wallet Password */}
          {client === ValidatorsClients.prysm && (
            <div className="mt-4 max-w-xs">
              <Controller
                name="walletPasswordSecretName"
                control={control}
                shouldUnregister={true}
                rules={schema.walletPassword}
                render={({ field }) => (
                  <Select
                    placeholder="Choose your wallet password..."
                    label="Prysm Client Wallet Password"
                    error={errors.walletPasswordSecretName?.message}
                    options={walletPasswordOptions}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
          )}

          {/* Beacon Node Endpoints */}
          <div className="mt-5">
            <Controller
              name="beaconEndpoints"
              control={control}
              rules={schema.beaconEndpoints}
              render={({ field }) => (
                <TextareaWithInput
                  multiple={client === ValidatorsClients.lighthouse}
                  label="Ethereum Node JSON-RPC Endpoints"
                  helperText={
                    client === ValidatorsClients.lighthouse
                      ? 'One endpoint per each line'
                      : ''
                  }
                  error={errors.beaconEndpoints?.message}
                  value={field.value}
                  name={field.name}
                  onChange={field.onChange}
                />
              )}
            />
          </div>
        </FormLayout>
      </form>
    </Layout>
  );
};

export default CreateValidator;
