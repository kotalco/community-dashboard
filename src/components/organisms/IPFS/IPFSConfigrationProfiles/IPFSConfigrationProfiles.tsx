import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { mutate } from 'swr';
import { joiResolver } from '@hookform/resolvers/joi';
import axios from 'axios';

import Button from '@components/atoms/Button/Button';
import Checkbox from '@components/molecules/CheckBox/CheckBox';
import { initProfilesOptions } from '@data/ipfs/peers/initProfilesOptions';
import { updateConfigProfilesSchema } from '@schemas/ipfs/peers/updateIPFSPeer';
import { updateIPFSPeer } from '@utils/requests/ipfs/peers';
import { UpdateConfigrationProfiles } from '@interfaces/ipfs/IPFSPeer';
import { IPFSConfigurationProfile } from '@enums/IPFS/Peers/IPFSConfigurationProfile';
import { handleAxiosError } from '@utils/axios';
import { ServerError } from '@interfaces/ServerError';

interface Props {
  peerName: string;
  profiles: IPFSConfigurationProfile[];
  initProfiles: IPFSConfigurationProfile[];
}

const IPFSPeerDetails: React.FC<Props> = (props) => {
  const [submitError, setSubmitError] = useState<string | undefined>('');
  const [submitSuccess, setSubmitSuccess] = useState('');

  const { peerName, profiles, initProfiles } = props;

  // SHOULD FIX THIS AFTER UPDATING API TO RETURN PROFILES WITH [] BY DEFAULT
  const allProfiles = profiles
    ? [...initProfiles, ...profiles]
    : [...initProfiles];

  const {
    reset,
    register,
    handleSubmit,
    formState: { isDirty, isSubmitting },
  } = useForm<UpdateConfigrationProfiles>({
    defaultValues: { profiles: allProfiles },
    resolver: joiResolver(updateConfigProfilesSchema),
  });

  const onSubmit: SubmitHandler<UpdateConfigrationProfiles> = async (
    values
  ) => {
    setSubmitError('');
    setSubmitSuccess('');

    try {
      const peer = await updateIPFSPeer(peerName, values);
      void mutate(peerName, peer);
      reset({ profiles: [...peer.profiles, ...peer.initProfiles] });
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
        <dl>
          <dt className="block text-sm font-medium text-gray-700">
            Configration Profiles
          </dt>
          <dd className="mt-3 ml-5">
            {initProfilesOptions.map(({ label, value }) => (
              <Checkbox
                key={value}
                label={label}
                value={value}
                disabled={initProfiles.includes(value)}
                {...register('profiles')}
              />
            ))}
          </dd>
        </dl>
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
