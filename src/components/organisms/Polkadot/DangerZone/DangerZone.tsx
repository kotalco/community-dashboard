import { useRouter } from 'next/router';

import Button from '@components/atoms/Button/Button';
import DeleteDialog from '@components/organisms/DeleteDialog/DeleteDialog';
import { deletePolkadotNode } from '@utils/requests/polkadot';
import { NotificationInfo } from '@interfaces/NotificationInfo';
import { Deployments } from '@enums/Deployments';
import { useModal } from '@hooks/useModal';

interface Props {
  nodeName: string;
}

const DangerousZone: React.FC<Props> = ({ nodeName }) => {
  const { isOpen, open, close } = useModal();
  const router = useRouter();

  const deleteDepolyment = async () => {
    await deletePolkadotNode(nodeName);

    const notification: NotificationInfo = {
      title: 'Polkadot Node has been deleted',
      message: 'Node has been deleted successfully.',
      deploymentName: nodeName,
    };
    localStorage.setItem(Deployments.polkadot, JSON.stringify(notification));
    router.push('/deployments/polkadot/nodes');
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
            Delete Node
          </Button>
        </div>
      </div>

      <DeleteDialog
        isOpen={isOpen}
        close={close}
        name={nodeName}
        protocol="Polkadot"
        resource="Node"
        deleteDepolyment={deleteDepolyment}
      />
    </>
  );
};

export default DangerousZone;
