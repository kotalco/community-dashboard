import { useRouter } from 'next/router';

import Button from '@components/atoms/Button/Button';
import { deleteClusterPeer } from '@utils/requests/ipfs/clusterPeers';
import { NotificationInfo } from '@interfaces/NotificationInfo';
import { Deployments } from '@enums/Deployments';
import { useModal } from '@hooks/useModal';
import DeleteDialog from '@components/organisms/DeleteDialog/DeleteDialog';

interface Props {
  peerName: string;
}

const DeleteDeployment: React.FC<Props> = ({ peerName }) => {
  const { isOpen, open, close } = useModal();
  const router = useRouter();

  const deleteDepolyment = async () => {
    await deleteClusterPeer(peerName);

    const notification: NotificationInfo = {
      title: 'IPFS Cluster Peer has been deleted',
      message: 'Cluster Peer has been deleted successfully.',
      deploymentName: peerName,
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

      <DeleteDialog
        isOpen={isOpen}
        close={close}
        name={peerName}
        protocol="IPFS"
        resource="Cluster Peer"
        deleteDepolyment={deleteDepolyment}
      />
    </>
  );
};

export default DeleteDeployment;
