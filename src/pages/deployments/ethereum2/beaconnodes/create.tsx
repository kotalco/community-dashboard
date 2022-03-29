import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';

import Layout from '@components/templates/Layout/Layout';
import FormLayout from '@components/templates/FormLayout/FormLayout';
import TextInput from '@components/molecules/TextInput/TextInput';
import Select from '@components/molecules/Select/Select';
import MultiSelectWithInput from '@components/molecules/MultiSelectWithInput/MultiSelectWithInput';
import Heading from '@components/templates/Heading/Heading';
import SelectWithInput from '@components/molecules/SelectWithInput/SelectWithInput';
import ErrorSummary from '@components/templates/ErrorSummary/ErrorSummary';
import Button from '@components/atoms/Button/Button';
import useInfiniteRequest from '@hooks/useInfiniteRequest';
import { clientOptions } from '@data/ethereum2/clientOptions';
import { networkOptions } from '@data/ethereum2/networkOptions';
import { createBeaconNode } from '@utils/requests/ethereum2/beaconNodes';
import { schema } from '@schemas/ethereum2/beaconNode/create';
import { Ethereum2Client } from '@enums/Ethereum2/Ethereum2Client';
import { CreateBeaconNode } from '@interfaces/ethereum2/BeaconNode';
import { Ethereum2Network } from '@enums/Ethereum2/Ethereum2Network';
import { handleRequest } from '@utils/helpers/handleRequest';
import { Deployments } from '@enums/Deployments';
import { NotificationInfo } from '@interfaces/NotificationInfo';
import { EthereumNode } from '@interfaces/Ethereum/ِEthereumNode';

const CreateBeaconNode: React.FC = () => {
  const { data: ethereumNodes } =
    useInfiniteRequest<EthereumNode>('/ethereum/nodes');
  const router = useRouter();

  const activeNodes = ethereumNodes
    .filter(({ rpc }) => rpc)
    .map(({ rpcPort, name }) => ({
      label: name,
      value: `http://${name}:${rpcPort}`,
    }));

  const {
    watch,
    control,
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitted, isValid, isSubmitting, isDirty },
  } = useForm<CreateBeaconNode>({ resolver: yupResolver(schema) });
  const [network, client] = watch(['network', 'client']);

  const onSubmit: SubmitHandler<CreateBeaconNode> = async (values) => {
    const { response } = await handleRequest(
      () => createBeaconNode(values),
      setError
    );

    if (response) {
      const notification: NotificationInfo = {
        title: 'Ethereum 2.0 Node has been created',
        message:
          'Node has been created successfully, and will be up and running in few seconds.',
        deploymentName: response.name,
      };
      localStorage.setItem(
        Deployments.beaconnode,
        JSON.stringify(notification)
      );
      router.push('/deployments/ethereum2/beaconnodes');
    }
  };

  return (
    <Layout>
      <Heading title="Create New Beacon Node" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormLayout>
          {/* Beacon Node Name */}
          <TextInput
            label="Node Name"
            error={errors.name?.message}
            {...register('name')}
          />

          {/* Client */}
          <Controller
            name="client"
            control={control}
            render={({ field }) => (
              <Select
                placeholder="Choose a client..."
                label="Client"
                error={errors.client?.message}
                options={clientOptions}
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
                placeholder="Choose a network..."
                label="Network"
                otherLabel="Other Network"
                error={errors.network?.message}
                options={networkOptions}
                value={field.value}
                name={field.name}
                onChange={field.onChange}
              />
            )}
          />

          {/* Ethereum Endpoint in case of client is Prysm and network is not Mainnet */}
          {client === Ethereum2Client.prysm &&
            network !== Ethereum2Network.mainnet && (
              <Controller
                name="eth1Endpoints"
                control={control}
                render={({ field }) => (
                  <MultiSelectWithInput
                    options={activeNodes}
                    otherLabel="Add more externl nodes"
                    placeholder="Select Ethereum Nodes..."
                    onChange={field.onChange}
                    value={field.value}
                    label="Ethereum Node JSON-RPC Endpoints"
                    helperText="One endpoint per each line"
                    errors={errors}
                    error={errors.eth1Endpoints && field.name}
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
};

export default CreateBeaconNode;
