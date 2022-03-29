import { useForm, SubmitHandler } from 'react-hook-form';

import Button from '@components/atoms/Button/Button';
import TextInput from '@components/molecules/TextInput/TextInput';
import { updateValidator } from '@utils/requests/ethereum2/validators';
import { Grafitti } from '@interfaces/ethereum2/Validator';
import { handleRequest } from '@utils/helpers/handleRequest';
import { Validator } from '@interfaces/ethereum2/Validator';
import { KeyedMutator } from 'swr';
import ErrorSummary from '@components/templates/ErrorSummary/ErrorSummary';

interface Props extends Validator {
  mutate?: KeyedMutator<{ validator: Validator }>;
}

const ValidatorGarfittiTab: React.FC<Props> = ({ name, graffiti, mutate }) => {
  const {
    reset,
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: {
      isDirty,
      isSubmitting,
      isSubmitSuccessful,
      isSubmitted,
      isValid,
      errors,
    },
  } = useForm<Grafitti>();

  const onSubmit: SubmitHandler<Grafitti> = async (values) => {
    const { response } = await handleRequest(
      () => updateValidator(name, values),
      setError
    );

    if (response) {
      mutate?.();
      reset(values);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="px-4 py-5 sm:p-6">
        <TextInput
          label="Graffiti"
          defaultValue={graffiti}
          {...register('graffiti')}
        />

        <ErrorSummary
          errors={errors}
          isSuccess={isSubmitSuccessful}
          successMessage="Your validator updated successfuly"
        />
      </div>

      <div className="flex flex-row-reverse items-center px-4 py-3 space-x-2 space-x-reverse bg-gray-50 sm:px-6">
        <Button
          type="submit"
          className="btn btn-primary"
          disabled={(isSubmitted && !isValid) || isSubmitting || !isDirty}
          loading={isSubmitting}
          onClick={() => clearErrors()}
        >
          Save
        </Button>
      </div>
    </form>
  );
};

export default ValidatorGarfittiTab;
