import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

import Button from '@components/atoms/Button/Button';
import DeleteModal from '@components/molecules/Dialog/Dialog';
import TextInput from '@components/molecules/TextInput/TextInput';
import { deletePolkadotNode } from '@utils/requests/polkadot';
import { NotificationInfo } from '@interfaces/NotificationInfo';
import { Deployments } from '@enums/Deployments';
import { handleRequest } from '@utils/helpers/handleRequest';

interface FormData {
  name: string;
}

interface Props {
  nodeName: string;
}

const DangerousZone: React.FC<Props> = ({ nodeName }) => {
  const [serverError, setServerError] = useState<string>('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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
      deletePolkadotNode.bind(undefined, nodeName)
    );

    if (error) {
      setServerError(error);
      return;
    }

    const notification: NotificationInfo = {
      title: 'Node has been deleted',
      message: 'Node has been deleted successfully.',
      deploymentName: nodeName,
    };
    localStorage.setItem(Deployments.polkadot, JSON.stringify(notification));
    router.push('/deployments/polkadot/nodes');
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
          <Button className="btn btn-alert" onClick={openModal}>
            Delete Node
          </Button>
        </div>
      </div>
      <DeleteModal
        open={showDeleteModal}
        close={closeModal}
        title="Delete Chainlink Node"
        action={
          <Button
            className="btn btn-alert"
            onClick={handleSubmit(onSubmit)}
            disabled={name !== nodeName || isSubmitting}
            loading={isSubmitting}
          >
            I understand the consequnces, delete this node
          </Button>
        }
      >
        <p className="text-sm text-gray-500">
          This action cannot be undone. This will permnantly delete the node (
          {nodeName}) node.
        </p>
        <div className="mt-4">
          <p className="mb-2">
            Please type the node name (
            <span className="font-bold">{nodeName}</span>) to confirm
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

export default DangerousZone;
