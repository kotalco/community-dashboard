import { useRouter } from 'next/router';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Layout from '@components/templates/Layout/Layout';
import FormLayout from '@components/templates/FormLayout/FormLayout';
import TextInput from '@components/molecules/TextInput/TextInput';
import Select from '@components/molecules/Select/Select';
import Heading from '@components/templates/Heading/Heading';
import SelectWithInput from '@components/molecules/SelectWithInput/SelectWithInput';
import ErrorSummary from '@components/templates/ErrorSummary/ErrorSummary';
import Button from '@components/atoms/Button/Button';
import useInfiniteRequest from '@hooks/useInfiniteRequest';
import { createSchema } from '@schemas/chainlink/create';
import { CreateChainlinkNode } from '@interfaces/chainlink/ChainlinkNode';
import { KubernetesSecretTypes } from '@enums/KubernetesSecret/KubernetesSecretTypes';
import { handleRequest } from '@utils/helpers/handleRequest';
import { EVM_CHAINS } from '@data/chainlink/evmChain';
import { createChainlinkNode } from '@utils/requests/chainlink';
import { Deployments } from '@enums/Deployments';
import { NotificationInfo } from '@interfaces/NotificationInfo';
import { EthereumNode } from '@interfaces/Ethereum/ِEthereumNode';
import { useSecretTypes } from '@hooks/useSecretTypes';

function CreateChainlink() {
  const router = useRouter();
  const { data: ethereumNodes } =
    useInfiniteRequest<EthereumNode>('/ethereum/nodes');

  const activeNodes = ethereumNodes
    .filter(({ ws }) => ws)
    .map(({ name, wsPort }) => ({
      label: name,
      value: `ws://${name}:${wsPort}`,
    }));

  const { data: passwordOptions, isLoading } = useSecretTypes(
    KubernetesSecretTypes.password
  );

  const {
    handleSubmit,
    register,
    control,
    setValue,
    setError,
    clearErrors,
    formState: { errors, isSubmitted, isValid, isSubmitting, isDirty },
  } = useForm<CreateChainlinkNode>({ resolver: yupResolver(createSchema) });

  const handleEVMChange = (value: string | string[] | undefined) => {
    if (value && typeof value === 'string') {
      const [id, address] = value.split(':');
      setValue('ethereumChainId', parseInt(id, 10), { shouldValidate: true });
      setValue('linkContractAddress', address, { shouldValidate: true });
    }
  };

  const onSubmit: SubmitHandler<CreateChainlinkNode> = async (values) => {
    const { response } = await handleRequest(
      () => createChainlinkNode(values),
      setError
    );

    if (response) {
      const notification: NotificationInfo = {
        title: 'Chainlink Node has been created',
        message:
          'Node has been created successfully, and will be up and running in few seconds.',
        deploymentName: response.name,
      };
      localStorage.setItem(Deployments.chainlink, JSON.stringify(notification));
      router.push('/deployments/chainlink/nodes');
    }
  };

  return (
    <Layout>
      <Heading title="Create New Chainlink Node" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormLayout>
          {/* Node Name */}
          <TextInput
            id="name"
            type="text"
            label="Node Name"
            error={errors.name?.message}
            {...register('name')}
          />

          {/* EVM Chain */}
          <Select
            options={EVM_CHAINS}
            label="EVM Chain"
            placeholder="Select a chain..."
            error={errors.ethereumChainId?.message}
            onChange={handleEVMChange}
          />

          {/* Ethereum Websocket Endpoint */}
          <Controller
            control={control}
            name="ethereumWsEndpoint"
            render={({ field }) => (
              <SelectWithInput
                options={activeNodes}
                label="Ethereum Websocket Endpoint"
                placeholder="Select an ethereum node..."
                onChange={field.onChange}
                error={errors.ethereumWsEndpoint?.message}
                otherLabel="Externally Managed Node"
                helperText="Showing Ethereum nodes with WebSocket enabled"
                name={field.name}
                value={field.value}
              />
            )}
          />

          {/* Database Connection URL */}
          <TextInput
            id="databaseUrl"
            type="text"
            label="Database Connection URL"
            error={errors.databaseURL?.message}
            placeholder="postgres://"
            {...register('databaseURL')}
          />

          {/* Keystore Password */}
          {!isLoading && (
            <Controller
              control={control}
              name="keystorePasswordSecretName"
              render={({ field }) => (
                <Select
                  options={passwordOptions}
                  label="Keystore password"
                  placeholder="Select a password..."
                  onChange={field.onChange}
                  error={errors.keystorePasswordSecretName?.message}
                  href={`/core/secrets/create?type=${KubernetesSecretTypes.password}`}
                  hrefTitle="Create a password..."
                  helperText="For securing access to chainlink wallet"
                />
              )}
            />
          )}

          <h2 className="mt-10 text-xl font-bold">API Credentials</h2>
          <p className="mb-5 text-sm text-gray-500">
            For securing access to chainlink dashboard
          </p>

          {/* Email */}
          <TextInput
            id="email"
            type="text"
            label="Email"
            error={errors.apiCredentials?.email?.message}
            {...register('apiCredentials.email')}
          />

          {/* Password */}
          {!isLoading && (
            <Controller
              control={control}
              name="apiCredentials.passwordSecretName"
              render={({ field }) => (
                <Select
                  options={passwordOptions}
                  label="Password"
                  placeholder="Select a password..."
                  onChange={field.onChange}
                  error={errors.apiCredentials?.passwordSecretName?.message}
                  href={`/core/secrets/create?type=${KubernetesSecretTypes.password}`}
                  hrefTitle="Create New Password..."
                />
              )}
            />
          )}

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
}

export default CreateChainlink;
