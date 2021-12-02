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
import { ConfigrationProfiles } from '@interfaces/ipfs/Peer';
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

  const remainingProfilesOptions = initProfilesOptions.filter(
    ({ value }) => !initProfiles.includes(value)
  );

  const {
    reset,
    register,
    handleSubmit,
    formState: { isDirty, isSubmitting },
  } = useForm<ConfigrationProfiles>({
    defaultValues: { profiles },
    resolver: joiResolver(updateConfigProfilesSchema),
  });

  const onSubmit: SubmitHandler<ConfigrationProfiles> = async (values) => {
    setSubmitError('');
    setSubmitSuccess('');

    try {
      const peer = await updateIPFSPeer(peerName, values);
      void mutate(peerName, peer);
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
      <div className="px-4 py-5 sm:p-6">
        <h2 className="mb-1 text-sm">Initial Configration Profiles</h2>
        <ul className="mb-5 ml-5 text-sm">
          {initProfiles.map((profile) => (
            <li key={profile} className="text-gray-500 list-disc">
              {profile}
            </li>
          ))}
        </ul>

        <Checkbox
          options={remainingProfilesOptions}
          label="Configration Profiles"
          {...register('profiles')}
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
        {submitError && (
          <p className="mb-5 text-center text-red-500">{submitError}</p>
        )}
        {submitSuccess && <p>{submitSuccess}</p>}
      </div>
    </>
  );
};

export default IPFSPeerDetails;
