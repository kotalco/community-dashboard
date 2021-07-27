import { useState, useEffect } from 'react';
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
import {
  clientValidations,
  nameValidations,
  networkValidations,
  keystoreValidations,
  walletPasswordValidations,
  beaconEndpointsValidations,
} from '@schemas/ethereum2/validator/createValidatorSchema';
import { CreateEthereum2Validator } from '@interfaces/ethereum2/Ethereum2Validator';
import { createValidator } from '@utils/requests/ethereum2/validators';
import { ValidatorsClients } from '@enums/Ethereum2/Validators/ValidatorsClients';
import { useSecrets } from '@utils/requests/secrets';
import axios from 'axios';
import { handleAxiosError } from '@utils/axios';
import { ServerError } from '@interfaces/ServerError';

const CreateValidator: React.FC = () => {
  const [showTextNetwork, setShowTextNetwork] = useState(false);
  const router = useRouter();
  const { data: keystoreSecrets } = useSecrets('keystore');
  const { data: walletPasswordSecrets } = useSecrets('password');
  const { createNotification } = useNotification();
  const {
    register,
    watch,
    control,
    handleSubmit,
    setError,
    setValue,
    formState: { errors, isSubmitted, isValid, isSubmitting },
  } = useForm<CreateEthereum2Validator>({
    defaultValues: { beaconEndpoints: [], keystores: [] },
  });

  useEffect(() => {
    register('network', networkValidations);
  }, [register]);

  const client = watch('client');
  const keystoresOptions = keystoreSecrets?.map(({ name }) => name) || [];
  const walletPasswordOptions =
    walletPasswordSecrets?.map(({ name }) => name) || [];
  const handleNetworkChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { value } = e.target;
    if (
      value === 'mainnet' ||
      value === 'pyrmont' ||
      value === 'prater' ||
      value === 'choose'
    ) {
      setShowTextNetwork(false);
    } else {
      setShowTextNetwork(true);
    }
    setValue('network', value, { shouldValidate: true });
  };

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
          <div className="px-4 py-5 sm:p-6">
            {/* Beacon Node Name */}
            <TextInput
              {...register('name', nameValidations)}
              label="Validator Name"
              className="rounded-md"
              error={errors.name?.message}
            />

            {/* Client */}
            <Select
              label="Client"
              error={errors.client?.message}
              className="rounded-md"
              options={[
                { label: 'Choose a client...', value: '' },
                ...clientOptions,
              ]}
              {...register('client', clientValidations)}
            />
            {/* Network */}
            <Select
              label="Network"
              error={!showTextNetwork ? errors.network?.message : ''}
              className={showTextNetwork ? 'rounded-t-md' : 'rounded-md'}
              options={[
                { label: 'Choose a network...', value: 'choose' },
                ...networkOptions,
              ]}
              onChange={handleNetworkChange}
              name="selectNetwork"
            />
            {showTextNetwork && (
              <TextInput
                error={errors.network?.message}
                placeholder="Network Name"
                className="rounded-none rounded-b-md"
                onChange={handleNetworkChange}
                name="textNetwork"
              />
            )}

            {/* Key Stores */}
            <Controller
              name="keystores"
              control={control}
              rules={keystoreValidations}
              render={({ field }) => (
                <Multiselect
                  label="Ethereum 2.0 Keystores"
                  placeholder="Choose your keystores..."
                  options={keystoresOptions}
                  error={errors.keystores?.message}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />

            {/* Prysm Client Wallet Password */}
            {client === ValidatorsClients.prysm && (
              <Select
                label="Prysm Client Wallet Password"
                error={errors.walletPasswordSecretName?.message}
                className="rounded-md"
                options={[
                  'Choose a wallet password...',
                  ...walletPasswordOptions,
                ]}
                {...register(
                  'walletPasswordSecretName',
                  walletPasswordValidations
                )}
              />
            )}

            {/* Beacon Node Endpoints */}
            <div className="mt-5">
              <Controller
                name="beaconEndpoints"
                control={control}
                rules={beaconEndpointsValidations}
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
          </div>
        </FormLayout>
      </form>
    </Layout>
  );
};

export default CreateValidator;
