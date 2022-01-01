import React, { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { mutate } from 'swr';
import { joiResolver } from '@hookform/resolvers/joi';
import axios from 'axios';

import Button from '@components/atoms/Button/Button';
import { Routing } from '@interfaces/ipfs/Peer';
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
  const [serverError, setServerError] = useState<string | undefined>('');
  const [submitSuccess, setSubmitSuccess] = useState('');

  const {
    reset,
    handleSubmit,
    control,
    formState: { isDirty, isSubmitting, errors },
  } = useForm<Routing>({
    defaultValues: { routing },
    resolver: joiResolver(updateRoutingSchema),
  });

  const onSubmit: SubmitHandler<Routing> = async (values) => {
    setServerError('');
    setSubmitSuccess('');

    try {
      const peer = await updateIPFSPeer(peerName, values);
      mutate(peerName, peer);
      reset(values);
      setSubmitSuccess('Peer has been updated');
    } catch (e) {
      // if (axios.isAxiosError(e)) {
      //   const error = handleAxiosError<ServerError>(e);
      //   setSubmitError(error.response?.data.error);
      // }
    }
  };

  return (
    <>
      <div className="max-w-xs px-4 py-5 sm:p-6">
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
              value={field.value}
            />
          )}
        />
      </div>

      <div className="flex flex-row-reverse items-center px-4 py-3 space-x-2 space-x-reverse bg-gray-50 sm:px-6">
        <Button
          className="btn btn-primary"
          disabled={!isDirty || isSubmitting}
          loading={isSubmitting}
          onClick={handleSubmit(onSubmit)}
        >
          Save
        </Button>
        {serverError && (
          <p className="mb-5 text-center text-red-500">{serverError}</p>
        )}
        {submitSuccess && <p>{submitSuccess}</p>}
      </div>
    </>
  );
};

export default IPFSPeerDetails;
