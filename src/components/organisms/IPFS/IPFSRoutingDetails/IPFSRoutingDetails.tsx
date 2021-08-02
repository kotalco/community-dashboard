import React, { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { mutate } from 'swr';
import { joiResolver } from '@hookform/resolvers/joi';
import axios from 'axios';

import Button from '@components/atoms/Button/Button';
import { UpdateRouting } from '@interfaces/ipfs/IPFSPeer';
import Select from '@components/molecules/Select/Select';
import { routingOptions } from '@data/ipfs/peers/routingOptions';
import { updateRoutingSchema } from '@schemas/ipfs/peers/updateIPFSPeer';
import { updateIPFSPeer } from '@utils/requests/ipfs/peers';
import { IPFSRouting } from '@enums/IPFS/Peers/IPFSRouting';
import { handleAxiosError } from '@utils/axios';
import { ServerError } from '@interfaces/ServerError';

interface Props {
  peerName: string;
  routing: IPFSRouting;
}

const IPFSPeerDetails: React.FC<Props> = ({ routing, peerName }) => {
  const [submitError, setSubmitError] = useState<string | undefined>('');
  const [submitSuccess, setSubmitSuccess] = useState('');

  const {
    reset,
    handleSubmit,
    control,
    formState: { isDirty, isSubmitting, errors },
  } = useForm<UpdateRouting>({
    defaultValues: { routing },
    resolver: joiResolver(updateRoutingSchema),
  });

  const onSubmit: SubmitHandler<UpdateRouting> = async (values) => {
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
          <Controller
            name="routing"
            control={control}
            render={({ field }) => (
              <Select
                placeholder="Choose routing option..."
                error={errors.routing?.message}
                options={routingOptions}
                label="Content Routing Mechanism"
                onChange={field.onChange}
              />
            )}
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
