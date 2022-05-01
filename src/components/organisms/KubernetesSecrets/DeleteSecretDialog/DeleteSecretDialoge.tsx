import { useState } from 'react';

import Button from '@components/atoms/Button/Button';
import Dialog from '@components/molecules/Dialog/Dialog';
import useInfiniteRequest from '@hooks/useInfiniteRequest';
import { deleteSecret as sendDeleteRequest } from '@utils/requests/secrets';
import { handleRequest } from '@utils/helpers/handleRequest';
import { KubernetesSecret } from '@interfaces/KubernetesSecret/KubernetesSecret';

interface Props {
  close: () => void;
  isOpen: boolean;
  secretName: string;
}

const DeleteSecretDialoge: React.FC<React.PropsWithChildren<Props>> = ({
  close,
  isOpen,
  secretName,
}) => {
  const [error, setError] = useState<string>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutate } = useInfiniteRequest<KubernetesSecret>('/core/secrets');

  const closeDialog = () => {
    close();
    setError(undefined);
  };

  const deleteSecret = async (secretName: string) => {
    setError(undefined);
    setIsSubmitting(true);

    const { error } = await handleRequest(() => sendDeleteRequest(secretName));

    if (error) {
      setError(error.message);
      setIsSubmitting(false);
      return;
    }

    mutate();
    close();
    setIsSubmitting(false);
  };

  return (
    <Dialog open={isOpen} close={closeDialog}>
      <p className="text-sm text-gray-500">
        Are you sure you want to delete secret:{' '}
        <span className="font-semibold">{secretName}</span>?
      </p>
      {error && <p className="text-sm text-red-700">{error}</p>}
      <div className="flex flex-col items-center justify-end mt-5 sm:mt-4 sm:flex-row sm:space-x-4">
        <Button
          onClick={closeDialog}
          className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
        >
          Cancel
        </Button>
        <Button
          className="btn btn-alert"
          onClick={() => deleteSecret(secretName)}
          loading={isSubmitting}
          disabled={isSubmitting}
        >
          Confirm
        </Button>
      </div>
    </Dialog>
  );
};

export default DeleteSecretDialoge;
