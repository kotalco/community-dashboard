import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { mutate } from 'swr';
import axios from 'axios';

import Button from '@components/atoms/Button/Button';
import { updateValidator } from '@utils/requests/ethereum2/validators';
import { UpdateGrafitti } from '@interfaces/ethereum2/Ethereum2Validator';
import TextInput from '@components/molecules/TextInput/TextInput';
import { handleAxiosError } from '@utils/axios';
import { ServerError } from '@interfaces/ServerError';

interface Props {
  name: string;
  graffiti: string;
}

const ValidatorGarfittiTab: React.FC<Props> = ({ name, graffiti }) => {
  const [submitError, setSubmitError] = useState<string | undefined>('');
  const [submitSuccess, setSubmitSuccess] = useState('');

  const {
    reset,
    register,
    handleSubmit,
    formState: { isDirty, isSubmitting },
  } = useForm<UpdateGrafitti>({
    defaultValues: { graffiti },
  });

  const onSubmit: SubmitHandler<UpdateGrafitti> = async (values) => {
    setSubmitError('');
    setSubmitSuccess('');

    try {
      const validator = await updateValidator(name, values);
      void mutate(name, validator);
      reset(values);
      setSubmitSuccess('Validator has been updated');
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const error = handleAxiosError<ServerError>(e);
        setSubmitError(error.response?.data.error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="px-4 py-5 sm:p-6">
        <TextInput label="Graffiti" {...register('graffiti')} />
      </div>

      <div className="flex space-x-2 space-x-reverse flex-row-reverse items-center px-4 py-3 bg-gray-50 sm:px-6">
        <Button
          type="submit"
          className="btn btn-primary"
          disabled={!isDirty || isSubmitting}
          loading={isSubmitting}
        >
          Save
        </Button>
        {submitError && (
          <p className="text-center text-red-500 mb-5">{submitError}</p>
        )}
        {submitSuccess && <p>{submitSuccess}</p>}
      </div>
    </form>
  );
};

export default ValidatorGarfittiTab;
