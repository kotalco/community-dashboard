import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import Button from '@components/atoms/Button/Button';
import DeleteModal from '@components/molecules/Dialog/Dialog';
import TextInput from '@components/molecules/TextInput/TextInput';
import { deleteClusterPeer } from '@utils/requests/ipfs/clusterPeers';
import { NotificationInfo } from '@interfaces/NotificationInfo';
import { Deployments } from '@enums/Deployments';
import { handleRequest } from '@utils/helpers/handleRequest';
import { useModal } from '@hooks/useModal';

interface FormData {
  name: string;
}

interface Props {
  name: string;
}

const DeleteDeployment: React.FC<Props> = ({ name }) => {
  const [serverError, setServerError] = useState<string>('');
  const { isOpen, open, close } = useModal();
  const router = useRouter();
  const {
    register,
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormData>();

  const input = watch('name');

  const onSubmit = async () => {
    setServerError('');
    const { error } = await handleRequest(
      deleteClusterPeer.bind(undefined, name)
    );

    if (error) {
      setServerError(error);
      return;
    }

    const notification: NotificationInfo = {
      title: 'Validator has been deleted',
      message: 'Validator has been deleted successfully.',
      deploymentName: name,
    };
    localStorage.setItem(Deployments.clusterpeer, JSON.stringify(notification));
    router.push('/deployments/ipfs/clusterpeers');
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
        <div className="px-4 py-3 text-right bg-gray-50 sm:px-6">
          <Button className="btn btn-alert" onClick={open}>
            Delete Cluster Peer
          </Button>
        </div>
      </div>
      <DeleteModal
        open={isOpen}
        close={close}
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
          <TextInput {...register('name')} />
        </div>
        {serverError && (
          <p className="mt-2 text-sm font-medium text-red-600">{serverError}</p>
        )}
      </DeleteModal>
    </>
  );
};

export default DeleteDeployment;
