import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import SelectWithInput from '@components/molecules/SelectWithInput/SelectWithInput';
import MultiSelectWithInput from '@components/molecules/MultiSelectWithInput/MultiSelectWithInput';
import Button from '@components/atoms/Button/Button';
import { ClusterPeer, Peers } from '@interfaces/ipfs/ClusterPeer';
import { updateClusterPeer } from '@utils/requests/ipfs/clusterPeers';
import { useClusterPeer } from '@hooks/useClusterPeer';
import { handleRequest } from '@utils/helpers/handleRequest';
import { usePeers } from '@hooks/usePeers';
import { schema } from '@schemas/ipfs/clusterPeers/peers';
import { useClusterPeers } from '@hooks/useClusterPeers';

interface Props extends Peers {
  name: string;
  trustedPeers: string[];
}

const Peers: React.FC<Props> = ({
  peerEndpoint,
  name,
  trustedPeers,
  bootstrapPeers,
}) => {
  const [serverError, setServerError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');
  const { mutate } = useClusterPeer(name);
  const { peers, isLoading: isLoadingPeers } = usePeers();
  const { clusterpeers, isLoading: isLoadingClusterpeers } = useClusterPeers();

  // Get peers endpoints
  const peerEndpoints = peers.map(({ name }) => ({
    label: name,
    value: `/dns4/${name}/tcp/5001`,
  }));

  // Get cluster bootstrap peers
  const bootstrapPeersOptions = clusterpeers.map(({ name, id }) => ({
    label: name,
    value: `/dns4/${name}/tcp/4001/p2p/${id}`,
  }));

  const {
    handleSubmit,
    control,
    reset,
    formState: { isDirty, isSubmitting, errors },
  } = useForm<Peers>({
    resolver: yupResolver(schema),
    defaultValues: { peerEndpoint, bootstrapPeers },
  });

  const onSubmit: SubmitHandler<Peers> = async (values) => {
    setServerError('');
    setSubmitSuccess('');

    const { error, response } = await handleRequest<ClusterPeer>(
      updateClusterPeer.bind(undefined, name, values)
    );

    if (error) {
      setServerError(error);
      return;
    }

    if (response) {
      mutate();
      reset(values);
      setSubmitSuccess('Cluster peer has been updated');
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
        {!!trustedPeers.length && (
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
      </div>

      <div className="flex flex-row-reverse items-center px-4 py-3 space-x-2 space-x-reverse bg-gray-50 sm:px-6">
        <Button
          type="submit"
          className="btn btn-primary"
          disabled={!isDirty || isSubmitting}
          loading={isSubmitting}
        >
          Save
        </Button>
        {serverError && (
          <p className="mb-5 text-center text-red-500">{serverError}</p>
        )}
        {submitSuccess && <p>{submitSuccess}</p>}
      </div>
    </form>
  );
};

export default Peers;
