import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { KeyedMutator } from 'swr';
import { joiResolver } from '@hookform/resolvers/joi';

import Button from '@components/atoms/Button/Button';
import TextInput from '@components/molecules/TextInput/TextInput';
import { API, Peer } from '@interfaces/ipfs/Peer';
import { updateAPIsSchema } from '@schemas/ipfs/peers/updateIPFSPeer';
import { updateIPFSPeer } from '@utils/requests/ipfs/peers';
import { handleRequest } from '@utils/helpers/handleRequest';

interface Props extends Peer {
  mutate?: KeyedMutator<{ peer: Peer }>;
}

const IPFSPeerDetails: React.FC<Props> = ({
  name,
  apiPort,
  apiHost,
  mutate,
}) => {
  const [serverError, setServerError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');

  const {
    reset,
    register,
    handleSubmit,
    formState: { isDirty, isSubmitting, errors },
  } = useForm<API>({
    defaultValues: { apiPort, apiHost },
    resolver: joiResolver(updateAPIsSchema),
  });

  const onSubmit: SubmitHandler<API> = async (values) => {
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
      <div className="px-4 py-5 sm:p-6">
        <TextInput
          error={errors.apiPort?.message}
          label="API Server Port"
          {...register('apiPort')}
        />
        <TextInput
          error={errors.apiHost?.message}
          label="API Server Host"
          {...register('apiHost')}
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
