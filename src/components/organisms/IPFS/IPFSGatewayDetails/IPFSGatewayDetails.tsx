import { SubmitHandler, useForm } from 'react-hook-form';
import { KeyedMutator } from 'swr';
import { joiResolver } from '@hookform/resolvers/joi';

import Button from '@components/atoms/Button/Button';
import TextInput from '@components/molecules/TextInput/TextInput';
import ErrorSummary from '@components/templates/ErrorSummary/ErrorSummary';
import { Gateway, Peer } from '@interfaces/ipfs/Peer';
import { updateGatewaySchema } from '@schemas/ipfs/peers/updateIPFSPeer';
import { updateIPFSPeer } from '@utils/requests/ipfs/peers';
import { handleRequest } from '@utils/helpers/handleRequest';

interface Props extends Peer {
  mutate?: KeyedMutator<{ peer: Peer }>;
}

const IPFSPeerDetails: React.FC<React.PropsWithChildren<Props>> = ({
  gatewayPort,
  gatewayHost,
  name,
  mutate,
}) => {
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
  } = useForm<Gateway>({
    resolver: joiResolver(updateGatewaySchema),
  });

  const onSubmit: SubmitHandler<Gateway> = async (values) => {
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
          error={errors.gatewayPort?.message}
          label="Local Gateway IPFS Server Port"
          defaultValue={gatewayPort}
          {...register('gatewayPort')}
        />
        <div className="mt-4">
          <TextInput
            error={errors.gatewayHost?.message}
            label="Local Gateway IPFS Server Host"
            defaultValue={gatewayHost}
            {...register('gatewayHost')}
          />
        </div>

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
