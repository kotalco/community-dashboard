import axios from 'axios';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { SubmitHandler } from 'react-hook-form';
import { CubeIcon } from '@heroicons/react/outline';

import TextInput from '@components/molecules/TextInput/TextInput';
import TextareaWithInput from '@components/molecules/TextareaWithInput/TextareaWithInput';
import Button from '@components/atoms/Button/Button';
import { UpdatePeers } from '@interfaces/ipfs/ClusterPeer';
import {
  updateClusterPeer,
  useClusterPeer,
} from '@utils/requests/ipfs/clusterPeers';
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
      void mutate({ clusterpeer });
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
        <div className="mt-4 max-w-xs">
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
          <div className="mt-4 max-w-xs">
            <h4 className="block text-sm font-medium text-gray-700 mb-1">
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
      <div className="flex space-x-2 space-x-reverse flex-row-reverse items-center px-4 py-3 bg-gray-50 sm:px-6">
        <Button
          type="submit"
          className="btn btn-primary"
          disabled={!isDirty || isSubmitting}
          loading={isSubmitting}
        >
          Save
        </Button>
        {submitError && (
          <p className="text-center text-red-500 mb-5">{submitError}</p>
        )}
        {submitSuccess && <p>{submitSuccess}</p>}
      </div>
    </form>
  );
};

export default Peers;
