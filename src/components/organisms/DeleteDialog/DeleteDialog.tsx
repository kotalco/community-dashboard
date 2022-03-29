import { SubmitHandler, useForm } from 'react-hook-form';

import Dialog from '@components/molecules/Dialog/Dialog';
import TextInput from '@components/molecules/TextInput/TextInput';
import Button from '@components/atoms/Button/Button';
import ErrorSummary from '@components/templates/ErrorSummary/ErrorSummary';
import { handleRequest } from '@utils/helpers/handleRequest';

interface Props {
  isOpen: boolean;
  name: string;
  protocol: string;
  resource: string;
  deleteDepolyment: () => Promise<void>;
  close: () => void;
}

type FormFields = {
  resourceName: string;
};

const DeleteDialog: React.FC<Props> = ({
  isOpen,
  close,
  name,
  protocol,
  resource,
  deleteDepolyment,
}) => {
  const {
    register,
    watch,
    handleSubmit,
    setError,
    clearErrors,
    formState: { isSubmitting, errors },
  } = useForm<FormFields>();

  const resourceName = watch('resourceName');

  const onSubmit: SubmitHandler<FormFields> = async () => {
    await handleRequest(deleteDepolyment, setError);
  };

  return (
    <Dialog
      open={isOpen}
      close={close}
      title={`Delete ${protocol} ${resource}`}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
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

          <ErrorSummary errors={errors} />
        </div>
        <div className="flex flex-col items-center justify-between mt-5 sm:mt-4 sm:flex-row-reverse">
          <Button
            className="btn btn-alert"
            type="submit"
            onClick={() => clearErrors()}
            disabled={name !== resourceName || isSubmitting}
            loading={isSubmitting}
          >
            I understand the consequnces, delete this{' '}
            {resource.toLocaleLowerCase()}
          </Button>
        </div>
      </form>
    </Dialog>
  );
};

export default DeleteDialog;
