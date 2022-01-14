import { useState } from 'react';
import { useRouter } from 'next/router';

import Button from '@components/atoms/Button/Button';
import DeleteDialog from '@components/organisms/DeleteDialog/DeleteDialog';
import { deleteIPFSPeer } from '@utils/requests/ipfs/peers';
import { NotificationInfo } from '@interfaces/NotificationInfo';
import { Deployments } from '@enums/Deployments';
import { handleRequest } from '@utils/helpers/handleRequest';
import { useModal } from '@hooks/useModal';

interface Props {
  peerName: string;
}

const DangerousZoneContent: React.FC<Props> = ({ peerName }) => {
  const [serverError, setServerError] = useState<string>('');
  const { isOpen, open, close } = useModal();
  const router = useRouter();

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
      title: 'IPFS Peer has been deleted',
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

      <DeleteDialog
        isOpen={isOpen}
        close={close}
        name={peerName}
        protocol="IPFS"
        resource="Peer"
        error={serverError}
        onSubmit={onSubmit}
      />
    </>
  );
};

export default DangerousZoneContent;
