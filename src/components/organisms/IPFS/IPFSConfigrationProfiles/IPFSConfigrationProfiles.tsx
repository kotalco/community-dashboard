import { SubmitHandler, useForm } from 'react-hook-form';
import { KeyedMutator } from 'swr';
import { joiResolver } from '@hookform/resolvers/joi';

import Button from '@components/atoms/Button/Button';
import CheckboxGroup from '@components/molecules/CheckBoxGroup/CheckBoxGroup';
import ErrorSummary from '@components/templates/ErrorSummary/ErrorSummary';
import { initProfilesOptions } from '@data/ipfs/peers/initProfilesOptions';
import { updateConfigProfilesSchema } from '@schemas/ipfs/peers/updateIPFSPeer';
import { updateIPFSPeer } from '@utils/requests/ipfs/peers';
import { ConfigrationProfiles, Peer } from '@interfaces/ipfs/Peer';
import { handleRequest } from '@utils/helpers/handleRequest';

interface Props extends Peer {
  mutate?: KeyedMutator<{ peer: Peer }>;
}

const IPFSPeerDetails: React.FC<React.PropsWithChildren<Props>> = ({
  name,
  profiles,
  initProfiles,
  mutate,
}) => {
  const remainingProfilesOptions = initProfilesOptions.filter(
    ({ value }) => !initProfiles.includes(value)
  );

  const {
    reset,
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: {
      isValid,
      isSubmitSuccessful,
      isSubmitted,
      isSubmitting,
      errors,
      isDirty,
    },
  } = useForm<ConfigrationProfiles>({
    defaultValues: { profiles },
    resolver: joiResolver(updateConfigProfilesSchema),
  });

  const onSubmit: SubmitHandler<ConfigrationProfiles> = async (values) => {
    const { response } = await handleRequest(
      () => updateIPFSPeer(name, values),
      setError
    );

    if (response) {
      mutate?.();
      reset(values);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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

        <ErrorSummary
          errors={errors}
          isSuccess={isSubmitSuccessful}
          successMessage="Your peer updated successfuly"
        />
      </div>

      <div className="flex flex-row-reverse items-center px-4 py-3 space-x-2 space-x-reverse bg-gray-50 sm:px-6">
        <Button
          type="submit"
          className="btn btn-primary"
          disabled={(isSubmitted && !isValid) || isSubmitting || !isDirty}
          loading={isSubmitting}
          onClick={() => clearErrors()}
        >
          Save
        </Button>
      </div>
    </form>
  );
};

export default IPFSPeerDetails;
