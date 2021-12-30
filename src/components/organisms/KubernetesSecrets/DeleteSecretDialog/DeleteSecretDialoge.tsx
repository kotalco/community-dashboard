import { useState } from 'react';

import Button from '@components/atoms/Button/Button';
import Dialog from '@components/molecules/Dialog/Dialog';
import { deleteSecret as sendDeleteRequest } from '@utils/requests/secrets';
import { useSecrets } from '@hooks/useSecrets';
import { handleRequest } from '@utils/helpers/handleRequest';

interface Props {
  close: () => void;
  isOpen: boolean;
  secretName: string;
}

const DeleteSecretDialoge: React.FC<Props> = ({
  close,
  isOpen,
  secretName,
}) => {
  const [serverError, setServerError] = useState<string | undefined>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutate } = useSecrets();

  const closeDialog = () => {
    close();
    setServerError('');
  };

  const deleteSecret = async (secretName: string) => {
    setServerError('');
    setIsSubmitting(true);

    const { error } = await handleRequest(
      sendDeleteRequest.bind(undefined, secretName)
    );

    if (error) {
      setServerError(error);
      setIsSubmitting(false);
      return;
    }

    mutate();
    close();
    setIsSubmitting(false);
  };

  return (
    <Dialog
      open={isOpen}
      close={closeDialog}
      error={serverError}
      cancel
      action={
        <Button
          className="btn btn-alert"
          onClick={() => deleteSecret(secretName)}
          loading={isSubmitting}
          disabled={isSubmitting}
        >
          Confirm
        </Button>
      }
    >
      <p className="text-sm text-gray-500">
        Are you sure you want to delete secret:{' '}
        <span className="font-semibold">{secretName}</span>?
      </p>
    </Dialog>
  );
};

export default DeleteSecretDialoge;
