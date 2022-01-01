import React, { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { KeyedMutator } from 'swr';
import { joiResolver } from '@hookform/resolvers/joi';

import Button from '@components/atoms/Button/Button';
import { Peer, Routing } from '@interfaces/ipfs/Peer';
import Select from '@components/molecules/Select/Select';
import { routingOptions } from '@data/ipfs/peers/routingOptions';
import { updateRoutingSchema } from '@schemas/ipfs/peers/updateIPFSPeer';
import { updateIPFSPeer } from '@utils/requests/ipfs/peers';
import { handleRequest } from '@utils/helpers/handleRequest';

interface Props extends Peer {
  mutate?: KeyedMutator<{ peer: Peer }>;
}

const IPFSPeerDetails: React.FC<Props> = ({ routing, name, mutate }) => {
  const [serverError, setServerError] = useState('');
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

    const { error, response } = await handleRequest(
      updateIPFSPeer.bind(undefined, name, values)
    );

    if (error) return setServerError(error);

    if (response) {
      mutate?.();
      reset(values);
      setSubmitSuccess('Peer has been updated');
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
