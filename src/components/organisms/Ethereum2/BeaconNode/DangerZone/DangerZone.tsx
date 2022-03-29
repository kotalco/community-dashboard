import { useRouter } from 'next/router';

import Button from '@components/atoms/Button/Button';
import DeleteDialog from '@components/organisms/DeleteDialog/DeleteDialog';
import { deleteBeaconNode } from '@utils/requests/ethereum2/beaconNodes';
import { NotificationInfo } from '@interfaces/NotificationInfo';
import { Deployments } from '@enums/Deployments';
import { useModal } from '@hooks/useModal';

interface Props {
  nodeName: string;
}

const DeleteBeaconNode: React.FC<Props> = ({ nodeName }) => {
  const { isOpen, open, close } = useModal();
  const router = useRouter();

  const deleteDeployment = async () => {
    await deleteBeaconNode(nodeName);

    const notification: NotificationInfo = {
      title: 'Ethereum 2.0 Node has been deleted',
      message: 'Node has been deleted successfully.',
      deploymentName: nodeName,
    };
    localStorage.setItem(Deployments.beaconnode, JSON.stringify(notification));
    router.push('/deployments/ethereum2/beaconnodes');
  };

  return (
    <>
      <div>
        <div className="px-4 py-5 sm:p-6">
          <p className="text-gray-700">
            By deleting this node, all connected Apps will lose access to the
            Blockchain network.
          </p>
          <p className="text-gray-700">
            Node attached volume that persists Blockchain data will not be
            removed, you need to delete it yourself.
          </p>
          <p className="text-gray-700">
            Are you sure you want to delete this node ?
          </p>
        </div>
        <div className="px-4 py-3 text-right bg-gray-50 sm:px-6">
          <Button className="btn btn-alert" onClick={open}>
            Delete Beacon Node
          </Button>
        </div>
      </div>

      <DeleteDialog
        isOpen={isOpen}
        close={close}
        name={nodeName}
        protocol="Ethereum 2.0"
        resource="Node"
        deleteDepolyment={deleteDeployment}
      />
    </>
  );
};

export default DeleteBeaconNode;
