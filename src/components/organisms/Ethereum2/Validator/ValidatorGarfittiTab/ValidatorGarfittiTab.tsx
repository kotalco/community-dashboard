import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import Button from '@components/atoms/Button/Button';
import TextInput from '@components/molecules/TextInput/TextInput';
import { updateValidator } from '@utils/requests/ethereum2/validators';
import { UpdateGrafitti } from '@interfaces/ethereum2/Validator';
import { useValidator } from '@hooks/useValidator';
import { handleRequest } from '@utils/helpers/handleRequest';
import { Validator } from '@interfaces/ethereum2/Validator';

interface Props {
  name: string;
  graffiti: string;
}

const ValidatorGarfittiTab: React.FC<Props> = ({ name, graffiti }) => {
  const [ServerError, setServerError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');
  const { mutate } = useValidator(name);

  const {
    reset,
    register,
    handleSubmit,
    formState: { isDirty, isSubmitting },
  } = useForm<UpdateGrafitti>({
    defaultValues: { graffiti },
  });

  const onSubmit: SubmitHandler<UpdateGrafitti> = async (values) => {
    setServerError('');
    setSubmitSuccess('');

    const { error, response } = await handleRequest<Validator>(
      updateValidator.bind(undefined, name, values)
    );

    if (error) {
      setServerError(error);
      return;
    }

    if (response) {
      mutate();
      reset(values);
      setSubmitSuccess('Validator has been updated');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="px-4 py-5 sm:p-6">
        <TextInput label="Graffiti" {...register('graffiti')} />
      </div>

      <div className="flex flex-row-reverse items-center px-4 py-3 space-x-2 space-x-reverse bg-gray-50 sm:px-6">
        <Button
          type="submit"
          className="btn btn-primary"
          disabled={!isDirty || isSubmitting}
          loading={isSubmitting}
        >
          Save
        </Button>
        {ServerError && (
          <p className="mb-5 text-center text-red-500">{ServerError}</p>
        )}
        {submitSuccess && <p>{submitSuccess}</p>}
      </div>
    </form>
  );
};

export default ValidatorGarfittiTab;
