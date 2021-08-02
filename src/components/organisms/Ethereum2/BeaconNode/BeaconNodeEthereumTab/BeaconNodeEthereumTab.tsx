import { useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import axios from 'axios';

import Button from '@components/atoms/Button/Button';
import {
  updateBeaconNode,
  useBeaconnode,
} from '@utils/requests/ethereum2/beaconNodes';
import { UpdateEth1Endpoints } from '@interfaces/ethereum2/Ethereum2BeaconNode';
import TextareaWithInput from '@components/molecules/TextareaWithInput/TextareaWithInput';
import { BeaconNodeClient } from '@enums/Ethereum2/BeaconNodes/BeaconNodeClient';
import schema from '@schemas/ethereum2/beaconNode/createBeaconNode';
import { handleAxiosError } from '@utils/axios';
import { ServerError } from '@interfaces/ServerError';

interface Props {
  name: string;
  client: BeaconNodeClient;
  eth1Endpoints: string[];
  network: string;
}

const BeaconNodeEthereumTab: React.FC<Props> = ({
  name,
  client,
  eth1Endpoints,
  network,
}) => {
  const { mutate } = useBeaconnode(name);
  const [submitSuccess, setSubmitSuccess] = useState('');
  const {
    reset,
    handleSubmit,
    control,
    setError,
    formState: { isDirty, isSubmitting, errors },
  } = useForm<UpdateEth1Endpoints>({
    defaultValues: { eth1Endpoints },
  });

  const onSubmit: SubmitHandler<UpdateEth1Endpoints> = async (values) => {
    setSubmitSuccess('');
    try {
      const beaconnode = await updateBeaconNode(name, values);
      void mutate({ beaconnode });
      reset(values);
      setSubmitSuccess('Beacon node has been updated');
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const error = handleAxiosError<ServerError>(e);
        setError('eth1Endpoints', {
          type: 'server',
          message: error.response?.data.error,
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="px-4 py-5 sm:p-6">
        <Controller
          name="eth1Endpoints"
          control={control}
          rules={
            client === BeaconNodeClient.prysm && network !== 'mainnet'
              ? schema.eth1Endpoints
              : undefined
          }
          render={({ field }) => (
            <TextareaWithInput
              multiple={
                client !== BeaconNodeClient.nimbus &&
                client !== BeaconNodeClient.teku
              }
              error={errors.eth1Endpoints?.message}
              label="Ethereum Node JSON-RPC Endpoints"
              helperText="One endpoint per each line"
              value={field.value}
              name={field.name}
              onChange={field.onChange}
            />
          )}
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
      </div>
    </form>
  );
};

export default BeaconNodeEthereumTab;
