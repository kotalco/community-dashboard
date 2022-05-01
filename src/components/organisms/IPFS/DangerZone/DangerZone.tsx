import { useRouter } from 'next/router';

import Button from '@components/atoms/Button/Button';
import DeleteDialog from '@components/organisms/DeleteDialog/DeleteDialog';
import { deleteIPFSPeer } from '@utils/requests/ipfs/peers';
import { NotificationInfo } from '@interfaces/NotificationInfo';
import { Deployments } from '@enums/Deployments';
import { useModal } from '@hooks/useModal';

interface Props {
  peerName: string;
}

const DangerousZoneContent: React.FC<React.PropsWithChildren<Props>> = ({
  peerName,
}) => {
  const { isOpen, open, close } = useModal();
  const router = useRouter();

  const deleteDepolyment = async () => {
    await deleteIPFSPeer(peerName);

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
        deleteDepolyment={deleteDepolyment}
      />
    </>
  );
};

export default DangerousZoneContent;
