import axios from 'axios';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { SubmitHandler } from 'react-hook-form';
import { CubeIcon } from '@heroicons/react/outline';

import TextInput from '@components/molecules/TextInput/TextInput';
import TextareaWithInput from '@components/molecules/TextareaWithInput/TextareaWithInput';
import Button from '@components/atoms/Button/Button';
import { UpdatePeers } from '@interfaces/ipfs/ClusterPeer';
import { updateClusterPeer } from '@utils/requests/ipfs/clusterPeers';
import { useClusterPeer } from '@hooks/useClusterPeer';
import { handleAxiosError } from '@utils/axios';
import { ServerError } from '@interfaces/ServerError';

interface Props {
  peerEndpoint: string;
  name: string;
  trustedPeers: string[];
  bootstrapPeers: string[];
}

const Peers: React.FC<Props> = ({
  peerEndpoint,
  name,
  trustedPeers,
  bootstrapPeers,
}) => {
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');
  const { mutate } = useClusterPeer(name);
  const {
    handleSubmit,
    control,
    register,
    reset,
    formState: { isDirty, isSubmitting },
  } = useForm<UpdatePeers>({
    defaultValues: { peerEndpoint, bootstrapPeers },
  });

  const onSubmit: SubmitHandler<UpdatePeers> = async (values) => {
    setSubmitError('');
    setSubmitSuccess('');
    try {
      const clusterpeer = await updateClusterPeer(name, values);
      mutate({ clusterpeer });
      reset(values);
      setSubmitSuccess('Cluster peer has been updated');
    } catch (e) {
      // if (axios.isAxiosError(e)) {
      //   const error = handleAxiosError<ServerError>(e);
      //   setSubmitError(
      //     error.response?.data.error || 'Something wrong happened'
      //   );
      // }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="px-4 py-5 sm:p-6">
        <TextInput label="IPFS Peer" {...register('peerEndpoint')} />
        <div className="max-w-xs mt-4">
          <Controller
            name="bootstrapPeers"
            control={control}
            render={({ field }) => (
              <TextareaWithInput
                multiple
                label="Bootstrap Peers"
                name={field.name}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </div>
        {!!trustedPeers.length && (
          <div className="max-w-xs mt-4">
            <h4 className="block mb-1 text-sm font-medium text-gray-700">
              Trusted Peers
            </h4>
            <ul className="ml-2">
              {trustedPeers.map((peer) => (
                <li
                  key={peer}
                  className="flex items-center space-x-2 text-sm text-gray-500"
                >
                  <CubeIcon className="w-4 h-4 text-indigo-600" />
                  <p>{peer}</p>
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
        {submitError && (
          <p className="mb-5 text-center text-red-500">{submitError}</p>
        )}
        {submitSuccess && <p>{submitSuccess}</p>}
      </div>
    </form>
  );
};

export default Peers;
