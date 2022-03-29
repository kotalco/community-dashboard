import { Controller, useForm } from 'react-hook-form';
import { SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import SelectWithInput from '@components/molecules/SelectWithInput/SelectWithInput';
import MultiSelectWithInput from '@components/molecules/MultiSelectWithInput/MultiSelectWithInput';
import Button from '@components/atoms/Button/Button';
import useInfiniteRequest from '@hooks/useInfiniteRequest';
import { ClusterPeer, Peers } from '@interfaces/ipfs/ClusterPeer';
import { updateClusterPeer } from '@utils/requests/ipfs/clusterPeers';
import { handleRequest } from '@utils/helpers/handleRequest';
import { schema } from '@schemas/ipfs/clusterPeers/peers';
import { KeyedMutator } from 'swr';
import { Peer } from '@interfaces/ipfs/Peer';
import ErrorSummary from '@components/templates/ErrorSummary/ErrorSummary';

interface Props extends ClusterPeer {
  mutate?: KeyedMutator<{ clusterpeer: ClusterPeer }>;
}

const Peers: React.FC<Props> = ({
  peerEndpoint,
  name,
  trustedPeers,
  bootstrapPeers,
  mutate,
}) => {
  const { data: peers, isLoading: isLoadingPeers } =
    useInfiniteRequest<Peer>('/ipfs/peers');
  const { data: clusterpeers, isLoading: isLoadingClusterpeers } =
    useInfiniteRequest<ClusterPeer>('/ipfs/clusterpeers');

  // Get peers endpoints
  const peerEndpoints = peers.map(({ name }) => ({
    label: name,
    value: `/dns4/${name}/tcp/5001`,
  }));

  // Get cluster bootstrap peers
  const bootstrapPeersOptions = clusterpeers.map(({ name, id }) => ({
    label: name,
    value: `/dns4/${name}/tcp/9096/p2p/${id}`,
  }));

  const {
    handleSubmit,
    control,
    reset,
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
  } = useForm<Peers>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Peers> = async (values) => {
    const { response } = await handleRequest(
      () => updateClusterPeer(name, values),
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
        {/* Peer Endpoint */}
        {!isLoadingPeers && (
          <Controller
            control={control}
            name="peerEndpoint"
            defaultValue={peerEndpoint}
            render={({ field }) => (
              <SelectWithInput
                options={peerEndpoints}
                error={errors.peerEndpoint?.message}
                label="IPFS Peer"
                placeholder="Select a peer"
                otherLabel="Use External Peer"
                value={field.value}
                onChange={field.onChange}
                name={field.name}
              />
            )}
          />
        )}

        {/* Bootstrap Peers */}
        {!isLoadingClusterpeers && (
          <Controller
            name="bootstrapPeers"
            control={control}
            defaultValue={bootstrapPeers}
            render={({ field }) => (
              <MultiSelectWithInput
                options={bootstrapPeersOptions}
                label="Bootstrap Peers"
                errors={errors}
                error={errors.bootstrapPeers && field.name}
                onChange={field.onChange}
                placeholder="Select bootstrap peers..."
                otherLabel="Use External Peers"
                value={field.value}
              />
            )}
          />
        )}

        {/* Trusted Peers */}
        {!!trustedPeers && (
          <div className="max-w-xs mt-4">
            <h4 className="block mb-1 text-sm font-medium text-gray-700">
              Trusted Peers
            </h4>
            <ul className="ml-5 text-sm">
              {trustedPeers.map((peer) => (
                <li key={peer} className="text-gray-500 list-disc">
                  {peer}
                </li>
              ))}
            </ul>
          </div>
        )}

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

export default Peers;
