import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { KeyedMutator } from 'swr';
import { joiResolver } from '@hookform/resolvers/joi';

import Button from '@components/atoms/Button/Button';
import CheckboxGroup from '@components/molecules/CheckBoxGroup/CheckBoxGroup';
import { initProfilesOptions } from '@data/ipfs/peers/initProfilesOptions';
import { updateConfigProfilesSchema } from '@schemas/ipfs/peers/updateIPFSPeer';
import { updateIPFSPeer } from '@utils/requests/ipfs/peers';
import { ConfigrationProfiles, Peer } from '@interfaces/ipfs/Peer';
import { handleRequest } from '@utils/helpers/handleRequest';

interface Props extends Peer {
  mutate?: KeyedMutator<{ peer: Peer }>;
}

const IPFSPeerDetails: React.FC<Props> = ({
  name,
  profiles,
  initProfiles,
  mutate,
}) => {
  const [serverError, setServerError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');

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
        <h2 className="mb-1 text-sm">Initial Configration Profiles</h2>
        <ul className="mb-5 ml-5 text-sm">
          {initProfiles.map((profile) => (
            <li key={profile} className="text-gray-500 list-disc">
              {profile}
            </li>
          ))}
        </ul>

        <CheckboxGroup
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
        {serverError && (
          <p className="mb-5 text-center text-red-500">{serverError}</p>
        )}
        {submitSuccess && <p>{submitSuccess}</p>}
      </div>
    </>
  );
};

export default IPFSPeerDetails;
