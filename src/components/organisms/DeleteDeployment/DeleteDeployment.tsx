import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import Button from '@components/atoms/Button/Button';
import DeleteModal from '@components/molecules/Dialog/Dialog';
import TextInput from '@components/molecules/TextInput/TextInput';
import { useNotification } from '@components/contexts/NotificationContext';
import { handleAxiosError } from '@utils/axios';
import { ServerError } from '@interfaces/ServerError';
import { deleteClusterPeer } from '@utils/requests/ipfs/clusterPeers';

interface FormData {
  name: string;
}

interface Props {
  name: string;
}

const DeleteDeployment: React.FC<Props> = ({ name }) => {
  const [error, setError] = useState<string | undefined>('');
  const { createNotification } = useNotification();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const router = useRouter();
  const {
    control,
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormData>();

  const input = watch('name');

  const onSubmit = async () => {
    setError('');
    try {
      await deleteClusterPeer(name);
      void router.push('/deployments/ipfs/clusterpeers');
      createNotification({
        title: 'IPFS peer has been deleted',
        name,
        action: 'deleted successfuly',
        protocol: 'peer',
      });
    } catch (e) {
      // if (axios.isAxiosError(e)) {
      //   const error = handleAxiosError<ServerError>(e);
      //   setError(error.response?.data.error);
      // }
    }
  };

  const closeModal = () => {
    setShowDeleteModal(false);
  };

  const openModal = () => {
    setShowDeleteModal(true);
  };

  return (
    <>
      <div>
        <div className="px-4 py-5 sm:p-6">
          <p className="text-gray-700">
            By deleting this cluster peer, all connected Apps will lose access
            to the blockchain network.
          </p>
          <p className="text-gray-700">
            Peer attached volume that persists Blockchain data will not be
            removed, you need to delete it yourself.
          </p>
          <p className="text-gray-700">
            Are you sure you want to delete this cluster peer?
          </p>
        </div>
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <Button className="btn btn-alert" onClick={openModal}>
            Delete Cluster Peer
          </Button>
        </div>
      </div>
      <DeleteModal
        open={showDeleteModal}
        close={closeModal}
        title="Delete Cluster Peer"
        action={
          <Button
            className="btn btn-alert"
            onClick={handleSubmit(onSubmit)}
            disabled={input !== name || isSubmitting}
            loading={isSubmitting}
          >
            I understand the consequnces, delete this cluster peer
          </Button>
        }
      >
        <p className="text-sm text-gray-500">
          This action cann&apos;t be undone. This will permnantly delete ({name}
          ) cluster peer.
        </p>
        <div className="mt-4">
          <p className="mb-2">
            Please type the cluster peer name (
            <span className="font-bold">{name}</span>) to confirm
          </p>
          <TextInput control={control} name="name" />
        </div>
        {error && (
          <p className="text-sm text-red-600 font-medium mt-2">{error}</p>
        )}
      </DeleteModal>
    </>
  );
};

export default DeleteDeployment;
