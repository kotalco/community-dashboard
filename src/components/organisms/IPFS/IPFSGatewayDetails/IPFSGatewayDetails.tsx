import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { mutate } from 'swr';
import { joiResolver } from '@hookform/resolvers/joi';
import axios from 'axios';

import Button from '@components/atoms/Button/Button';
import TextInput from '@components/molecules/TextInput/TextInput';
import { UpdateGateway } from '@interfaces/ipfs/IPFSPeer';
import { updateGatewaySchema } from '@schemas/ipfs/peers/updateIPFSPeer';
import { updateIPFSPeer } from '@utils/requests/ipfs/peers';
import { handleAxiosError } from '@utils/axios';
import { ServerError } from '@interfaces/ServerError';

interface Props {
  peerName: string;
  gatewayPort: number;
  gatewayHost: string;
}

const IPFSPeerDetails: React.FC<Props> = (props) => {
  const [submitError, setSubmitError] = useState<string | undefined>('');
  const [submitSuccess, setSubmitSuccess] = useState('');

  const { gatewayPort, gatewayHost, peerName } = props;

  const {
    reset,
    register,
    handleSubmit,
    formState: { isDirty, isSubmitting, errors },
  } = useForm<UpdateGateway>({
    defaultValues: { gatewayHost, gatewayPort },
    resolver: joiResolver(updateGatewaySchema),
  });

  const onSubmit: SubmitHandler<UpdateGateway> = async (values) => {
    setSubmitError('');
    setSubmitSuccess('');

    try {
      const peer = await updateIPFSPeer(peerName, values);
      void mutate(peerName, peer);
      reset(values);
      setSubmitSuccess('Peer has been updated');
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
        <div className="mt-4">
          <TextInput
            error={errors.gatewayPort?.message}
            label="Local Gateway IPFS Server Port"
            {...register('gatewayPort')}
          />
        </div>
        <div className="mt-4">
          <TextInput
            error={errors.gatewayHost?.message}
            label="Local Gateway IPFS Server Host"
            {...register('gatewayHost')}
          />
        </div>
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

export default IPFSPeerDetails;
