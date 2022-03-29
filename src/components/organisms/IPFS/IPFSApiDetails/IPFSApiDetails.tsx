import { SubmitHandler, useForm } from 'react-hook-form';
import { KeyedMutator } from 'swr';
import { joiResolver } from '@hookform/resolvers/joi';

import Button from '@components/atoms/Button/Button';
import TextInput from '@components/molecules/TextInput/TextInput';
import ErrorSummary from '@components/templates/ErrorSummary/ErrorSummary';
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
  const {
    reset,
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: {
      isSubmitSuccessful,
      isValid,
      isSubmitted,
      isSubmitting,
      errors,
      isDirty,
    },
  } = useForm<API>({
    resolver: joiResolver(updateAPIsSchema),
  });

  const onSubmit: SubmitHandler<API> = async (values) => {
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
        <TextInput
          error={errors.apiPort?.message}
          label="API Server Port"
          defaultValue={apiPort}
          {...register('apiPort')}
        />
        <TextInput
          error={errors.apiHost?.message}
          label="API Server Host"
          defaultValue={apiHost}
          {...register('apiHost')}
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
