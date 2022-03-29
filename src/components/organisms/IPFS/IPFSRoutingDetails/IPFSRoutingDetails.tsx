import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { KeyedMutator } from 'swr';
import { joiResolver } from '@hookform/resolvers/joi';

import Button from '@components/atoms/Button/Button';
import Select from '@components/molecules/Select/Select';
import ErrorSummary from '@components/templates/ErrorSummary/ErrorSummary';
import { Peer, Routing } from '@interfaces/ipfs/Peer';
import { routingOptions } from '@data/ipfs/peers/routingOptions';
import { updateRoutingSchema } from '@schemas/ipfs/peers/updateIPFSPeer';
import { updateIPFSPeer } from '@utils/requests/ipfs/peers';
import { handleRequest } from '@utils/helpers/handleRequest';

interface Props extends Peer {
  mutate?: KeyedMutator<{ peer: Peer }>;
}

const IPFSPeerDetails: React.FC<Props> = ({ routing, name, mutate }) => {
  const {
    reset,
    handleSubmit,
    control,
    setError,
    clearErrors,
    formState: {
      isSubmitting,
      errors,
      isValid,
      isSubmitSuccessful,
      isSubmitted,
      isDirty,
    },
  } = useForm<Routing>({
    resolver: joiResolver(updateRoutingSchema),
  });

  const onSubmit: SubmitHandler<Routing> = async (values) => {
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
      <div className="max-w-xs px-4 py-5 sm:p-6">
        <Controller
          name="routing"
          control={control}
          defaultValue={routing}
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
