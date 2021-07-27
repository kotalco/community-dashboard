import { useState } from 'react';
import {
  useForm,
  Controller,
  SubmitHandler,
  FieldError,
} from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { mutate } from 'swr';
import axios from 'axios';

import Button from '@components/atoms/Button/Button';
import { updateBeaconNode } from '@utils/requests/ethereum2/beaconNodes';
import { UpdateEth1Endpoints } from '@interfaces/ethereum2/Ethereum2BeaconNode';
import TextareaWithInput from '@components/molecules/TextareaWithInput/TextareaWithInput';
import { BeaconNodeClient } from '@enums/Ethereum2/BeaconNodes/BeaconNodeClient';
import { updateEth1EndpointsSchema } from '@schemas/ethereum2/beaconNode/updateBeaconNode';
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
  const [submitError, setSubmitError] = useState<string | undefined>('');
  const [submitSuccess, setSubmitSuccess] = useState('');

  const {
    reset,
    handleSubmit,
    control,
    formState: { isDirty, isSubmitting, errors },
  } = useForm<UpdateEth1Endpoints>({
    defaultValues: { eth1Endpoints, client, network },
    resolver: joiResolver(updateEth1EndpointsSchema),
  });
  const eth1EndpointsError = errors.eth1Endpoints as FieldError | undefined;

  const onSubmit: SubmitHandler<UpdateEth1Endpoints> = async (values) => {
    setSubmitError('');
    setSubmitSuccess('');
    try {
      const beaconnode = await updateBeaconNode(name, values);
      void mutate(name, beaconnode);
      reset(values);
      setSubmitSuccess('Beacon node has been updated');
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const error = handleAxiosError<ServerError>(e);
        setSubmitError(error.response?.data.error);
      }
    }
  };

  return (
    <>
      <div className="px-4 py-5 sm:p-6">
        <Controller
          name="eth1Endpoints"
          control={control}
          render={({ field }) => (
            <TextareaWithInput
              multiple={
                client !== BeaconNodeClient.nimbus &&
                client !== BeaconNodeClient.teku
              }
              error={eth1EndpointsError?.message}
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
          className="btn btn-primary"
          disabled={!isDirty || isSubmitting}
          loading={isSubmitting}
          onClick={handleSubmit(onSubmit)}
        >
          Save
        </Button>
        {submitError && (
          <p className="text-center text-red-500 mb-5">{submitError}</p>
        )}
        {submitSuccess && <p>{submitSuccess}</p>}
      </div>
    </>
  );
};

export default BeaconNodeEthereumTab;
