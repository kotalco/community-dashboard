import { KeyedMutator } from 'swr';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

import Button from '@components/atoms/Button/Button';
import Toggle from '@components/molecules/Toggle/Toggle';
import SelectWithInput from '@components/molecules/SelectWithInput/SelectWithInput';
import useInfiniteRequest from '@hooks/useInfiniteRequest';
import ErrorSummary from '@components/templates/ErrorSummary/ErrorSummary';
import { IPFS } from '@interfaces/filecoin/FilecoinNode';
import { handleRequest } from '@utils/helpers/handleRequest';
import { FilecoinNode } from '@interfaces/filecoin/FilecoinNode';
import { updateFilecoinNode } from '@utils/requests/filecoin';
import { Peer } from '@interfaces/ipfs/Peer';

interface Props extends FilecoinNode {
  mutate?: KeyedMutator<{ node: FilecoinNode }>;
}

function IPFSDetails({
  ipfsForRetrieval,
  ipfsOnlineMode,
  ipfsPeerEndpoint,
  name,
  mutate,
}: Props) {
  const { data: peers, isLoading } = useInfiniteRequest<Peer>('/ipfs/peers');
  const peersOptions = peers.map(({ name }) => ({
    label: name,
    value: `/dns4/${name}/tcp/5001`,
  }));

  const {
    handleSubmit,
    reset,
    control,
    setError,
    clearErrors,
    formState: {
      isDirty,
      isSubmitting,
      errors,
      isSubmitSuccessful,
      isSubmitted,
      isValid,
    },
  } = useForm<IPFS>();

  const onSubmit: SubmitHandler<IPFS> = async (values) => {
    const { response } = await handleRequest(
      () => updateFilecoinNode(values, name),
      setError
    );

    if (response) {
      mutate?.();
      reset(response);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="px-4 py-5 sm:p-6">
        {/* IPFS For Retrieval */}
        <Controller
          control={control}
          name="ipfsForRetrieval"
          defaultValue={ipfsForRetrieval}
          render={({ field }) => (
            <Toggle
              label="Use IPFS For Retrieval"
              checked={field.value}
              onChange={field.onChange}
              error={errors.ipfsForRetrieval?.message}
            />
          )}
        />

        {/* IPFS Online Mode */}
        <Controller
          control={control}
          name="ipfsOnlineMode"
          defaultValue={ipfsOnlineMode}
          render={({ field }) => (
            <Toggle
              label="IPFS Online Mode"
              checked={field.value}
              onChange={field.onChange}
              error={errors.ipfsOnlineMode?.message}
            />
          )}
        />

        {/* IPFS Peer Endpoint */}
        {!isLoading && (
          <Controller
            control={control}
            name="ipfsPeerEndpoint"
            defaultValue={ipfsPeerEndpoint}
            render={({ field }) => (
              <SelectWithInput
                options={peersOptions}
                placeholder="Select a peer..."
                label="IPFS Peer Endpoint"
                value={field.value}
                onChange={field.onChange}
                name={field.name}
                error={errors.ipfsPeerEndpoint?.message}
                otherLabel="Use External Peer"
                withClear
              />
            )}
          />
        )}

        <ErrorSummary
          errors={errors}
          isSuccess={isSubmitSuccessful}
          successMessage="Your node updated successfuly"
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
}

export default IPFSDetails;
