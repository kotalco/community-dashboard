import { useRouter } from 'next/router';

import Button from '@components/atoms/Button/Button';
import DeleteDialog from '@components/organisms/DeleteDialog/DeleteDialog';
import { deleteValidator } from '@utils/requests/ethereum2/validators';
import { NotificationInfo } from '@interfaces/NotificationInfo';
import { Deployments } from '@enums/Deployments';
import { useModal } from '@hooks/useModal';

interface Props {
  validatorName: string;
}

const DangerZone: React.FC<React.PropsWithChildren<Props>> = ({
  validatorName,
}) => {
  const { isOpen, open, close } = useModal();
  const router = useRouter();

  const deleteDeployment = async () => {
    await deleteValidator(validatorName);

    const notification: NotificationInfo = {
      title: 'Ethereum 2.0 Validator has been deleted',
      message: 'Validator has been deleted successfully.',
      deploymentName: validatorName,
    };
    localStorage.setItem(Deployments.validator, JSON.stringify(notification));
    router.push('/deployments/ethereum2/validators');
  };

  return (
    <>
      <div>
        <div className="px-4 py-5 sm:p-6">
          <p className="text-gray-700">
            By deleting this validator, all connected Apps will lose access to
            the Blockchain network.
          </p>
          <p className="text-gray-700">
            Validator attached volume that persists Blockchain data will not be
            removed, you need to delete it yourself.
          </p>
          <p className="text-gray-700">
            Are you sure you want to delete this validator ?
          </p>
        </div>
        <div className="px-4 py-3 text-right bg-gray-50 sm:px-6">
          <Button className="btn btn-alert" onClick={open}>
            Delete Validator
          </Button>
        </div>
      </div>

      <DeleteDialog
        isOpen={isOpen}
        close={close}
        name={validatorName}
        protocol="Ethereum 2.0"
        resource="Validator"
        deleteDepolyment={deleteDeployment}
      />
    </>
  );
};

export default DangerZone;
