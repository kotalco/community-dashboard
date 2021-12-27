import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import Button from '@components/atoms/Button/Button';
import DeleteModal from '@components/molecules/Dialog/Dialog';
import { deleteIPFSPeer } from '@utils/requests/ipfs/peers';
import TextInput from '@components/molecules/TextInput/TextInput';
import { NotificationInfo } from '@interfaces/NotificationInfo';
import { Deployments } from '@enums/Deployments';
import { handleRequest } from '@utils/helpers/handleRequest';
import { useModal } from '@hooks/useModal';

interface FormData {
  name: string;
}

interface Props {
  peerName: string;
}

const DangerousZoneContent: React.FC<Props> = ({ peerName }) => {
  const [serverError, setServerError] = useState<string>('');
  const { isOpen, open, close } = useModal();
  const router = useRouter();
  const {
    register,
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormData>();

  const [name] = watch(['name']);

  const onSubmit = async () => {
    setServerError('');
    const { error } = await handleRequest(
      deleteIPFSPeer.bind(undefined, peerName)
    );

    if (error) {
      setServerError(error);
      return;
    }

    const notification: NotificationInfo = {
      title: 'Peer has been deleted',
      message: 'Peer has been deleted successfully.',
      deploymentName: peerName,
    };
    localStorage.setItem(Deployments.peer, JSON.stringify(notification));
    router.push('/deployments/ipfs/peers');
  };

  return (
    <>
      <div>
        <div className="px-4 py-5 sm:p-6">
          <p className="text-gray-700">
            By deleting this peer, all connected Apps will lose access to the
            Blockchain network.
          </p>
          <p className="text-gray-700">
            Peer attached volume that persists Blockchain data will not be
            removed, you need to delete it yourself.
          </p>
          <p className="text-gray-700">
            Are you sure you want to delete this peer ?
          </p>
        </div>
        <div className="px-4 py-3 text-right bg-gray-50 sm:px-6">
          <Button className="btn btn-alert" onClick={open}>
            Delete Peer
          </Button>
        </div>
      </div>
      <DeleteModal
        open={isOpen}
        close={close}
        title="Delete Ethereum Node"
        action={
          <Button
            className="btn btn-alert"
            onClick={handleSubmit(onSubmit)}
            disabled={name !== peerName || isSubmitting}
            loading={isSubmitting}
          >
            I understand the consequnces, delete this node
          </Button>
        }
      >
        <p className="text-sm text-gray-500">
          This action cannot be undone. This will permnantly delete the node (
          {peerName}) node.
        </p>
        <div className="mt-4">
          <p className="mb-2">
            Please type the peer name (
            <span className="font-bold">{peerName}</span>) to confirm
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

export default DangerousZoneContent;
