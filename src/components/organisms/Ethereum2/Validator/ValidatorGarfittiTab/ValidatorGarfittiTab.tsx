import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import Button from '@components/atoms/Button/Button';
import TextInput from '@components/molecules/TextInput/TextInput';
import { updateValidator } from '@utils/requests/ethereum2/validators';
import { Grafitti } from '@interfaces/ethereum2/Validator';
import { handleRequest } from '@utils/helpers/handleRequest';
import { Validator } from '@interfaces/ethereum2/Validator';
import { KeyedMutator } from 'swr';

interface Props extends Validator {
  mutate?: KeyedMutator<{ validator: Validator }>;
}

const ValidatorGarfittiTab: React.FC<Props> = ({ name, graffiti, mutate }) => {
  const [serverError, setServerError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');

  const {
    reset,
    register,
    handleSubmit,
    formState: { isDirty, isSubmitting },
  } = useForm<Grafitti>({
    defaultValues: { graffiti },
  });

  const onSubmit: SubmitHandler<Grafitti> = async (values) => {
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
      mutate?.();
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
        {serverError && (
          <p className="mb-5 text-center text-red-500">{serverError}</p>
        )}
        {submitSuccess && <p>{submitSuccess}</p>}
      </div>
    </form>
  );
};

export default ValidatorGarfittiTab;
