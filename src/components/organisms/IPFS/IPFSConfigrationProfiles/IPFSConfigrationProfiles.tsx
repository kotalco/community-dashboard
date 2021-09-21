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
import { ConfigrationProfiles } from '@interfaces/ipfs/IPFSPeer';
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
      if (axios.isAxiosError(e)) {
        const error = handleAxiosError<ServerError>(e);
        setSubmitError(error.response?.data.error);
      }
    }
  };

  return (
    <>
      <div className="px-4 py-5 sm:p-6">
        <h2 className="mb-1 text-sm">Initial Configration Profiles</h2>
        <ul className="ml-5 mb-5 text-sm">
          {initProfiles.map((profile) => (
            <li key={profile} className="list-disc text-gray-500">
              {profile}
            </li>
          ))}
        </ul>
        <dl>
          <dt className="block text-sm font-medium text-gray-700">
            Configration Profiles
          </dt>
          <dd className="mt-1 ml-3">
            {remainingProfilesOptions.map(({ label, value }) => (
              <Checkbox
                key={value}
                label={label}
                value={value}
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
