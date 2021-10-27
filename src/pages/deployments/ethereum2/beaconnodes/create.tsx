import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/router';
import axios from 'axios';

import Layout from '@components/templates/Layout/Layout';
import FormLayout from '@components/templates/FormLayout/FormLayout';
import TextInput from '@components/molecules/TextInput/TextInput';
import Select from '@components/molecules/Select/Select';
import TextareaWithInput from '@components/molecules/TextareaWithInput/TextareaWithInput';
import Heading from '@components/templates/Heading/Heading';
import SelectWithInput from '@components/molecules/SelectWithInput/SelectWithInput';
import { useNotification } from '@components/contexts/NotificationContext';
import { clientOptions } from '@data/ethereum2/clientOptions';
import { networkOptions } from '@data/ethereum2/networkOptions';
import { createBeaconNode } from '@utils/requests/ethereum2/beaconNodes';
import schema from '@schemas/ethereum2/beaconNode/createBeaconNode';
import { BeaconNodeClient } from '@enums/Ethereum2/BeaconNodes/BeaconNodeClient';
import { CreateEthereum2BeaconNode } from '@interfaces/ethereum2/Ethereum2BeaconNode';
import { BeaconNodeNetwork } from '@enums/Ethereum2/BeaconNodes/BeaconNodeNetwork';
import { handleAxiosError } from '@utils/axios';
import { ServerError } from '@interfaces/ServerError';

const CreateBeaconNode: React.FC = () => {
  const router = useRouter();
  const { createNotification } = useNotification();
  const {
    watch,
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitted, isValid, isSubmitting },
  } = useForm<CreateEthereum2BeaconNode>();
  const [network, client] = watch(['network', 'client']);
  /**
   * Submit create ethereum node form
   * @param BeaconNodeData the data required to create new node
   */
  const onSubmit: SubmitHandler<CreateEthereum2BeaconNode> = async (values) => {
    try {
      const beaconNode = await createBeaconNode(values);

      createNotification({
        title: 'Beacon node has been created',
        protocol: `Beacon node`,
        name: beaconNode.name,
        action:
          'created successfully, and will be up and running in few seconds.',
      });
      void router.push('/deployments/ethereum2/beaconnodes');
    } catch (e) {
      // if (axios.isAxiosError(e)) {
      //   const error = handleAxiosError<ServerError>(e);
      //   setError('name', {
      //     type: 'server',
      //     message: error.response?.data.error,
      //   });
      // }
    }
  };

  return (
    <Layout>
      <Heading title="Create New Beacon Node" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormLayout
          isSubmitted={isSubmitted}
          isSubmitting={isSubmitting}
          isValid={isValid}
        >
          {/* Beacon Node Name */}
          <TextInput
            control={control}
            name="name"
            rules={schema.name}
            label="Node Name"
            error={errors.name?.message}
          />

          {/* Client */}
          <div className="pt-4 max-w-xs">
            <Controller
              name="client"
              control={control}
              rules={schema.client}
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
          </div>

          {/* Network */}
          <div className="pt-4 max-w-xs">
            <Controller
              name="network"
              control={control}
              rules={schema.network}
              render={({ field }) => (
                <SelectWithInput
                  placeholder="Choose a network..."
                  label="Network"
                  error={errors.network?.message}
                  options={networkOptions}
                  value={field.value}
                  name={field.name}
                  onChange={field.onChange}
                />
              )}
            />
          </div>

          {/* Ethereum Endpoint in case of client is Prysm and network is not Mainnet */}
          {client === BeaconNodeClient.prysm &&
            network !== BeaconNodeNetwork.mainnet && (
              <div className="mt-5">
                <Controller
                  name="eth1Endpoints"
                  control={control}
                  shouldUnregister
                  rules={schema.eth1Endpoints}
                  render={({ field }) => (
                    <TextareaWithInput
                      multiple
                      label="Ethereum Node JSON-RPC Endpoints"
                      helperText="One endpoint per each line"
                      error={errors.eth1Endpoints?.message}
                      value={field.value}
                      name={field.name}
                      onChange={field.onChange}
                    />
                  )}
                />
              </div>
            )}
        </FormLayout>
      </form>
    </Layout>
  );
};

export default CreateBeaconNode;
