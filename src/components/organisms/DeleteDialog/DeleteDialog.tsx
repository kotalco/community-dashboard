import { useForm } from 'react-hook-form';

import Dialog from '@components/molecules/Dialog/Dialog';
import TextInput from '@components/molecules/TextInput/TextInput';
import Button from '@components/atoms/Button/Button';

interface Props {
  isOpen: boolean;
  error?: string;
  name: string;
  protocol: string;
  resource: string;
  onSubmit: () => Promise<void>;
  close: () => void;
}

type FormFields = {
  resourceName: string;
};

const DeleteDialog: React.FC<Props> = ({
  isOpen,
  close,
  error,
  name,
  protocol,
  resource,
  onSubmit,
}) => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormFields>();

  const resourceName = watch('resourceName');

  return (
    <Dialog
      open={isOpen}
      close={close}
      error={error}
      title={`Delete ${protocol} ${resource}`}
    >
      <p className="text-sm text-gray-500">
        This action cannot be undone. This will permnantly delete ({name}){' '}
        {protocol} {resource}.
      </p>
      <div className="mt-4">
        <p className="mb-2">
          Please type the {resource.toLocaleLowerCase()} name (
          <span className="font-bold">{name}</span>) to confirm
        </p>
        <TextInput {...register('resourceName')} />
      </div>
      <div className="flex flex-col items-center justify-between mt-5 sm:mt-4 sm:flex-row-reverse">
        <Button
          className="btn btn-alert"
          onClick={handleSubmit(onSubmit)}
          disabled={name !== resourceName || isSubmitting}
          loading={isSubmitting}
        >
          I understand the consequnces, delete this{' '}
          {resource.toLocaleLowerCase()}
        </Button>
      </div>
    </Dialog>
  );
};

export default DeleteDialog;
