import { KeyedMutator } from 'swr';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';

import Button from '@components/atoms/Button/Button';
import Toggle from '@components/molecules/Toggle/Toggle';
import ErrorSummary from '@components/templates/ErrorSummary/ErrorSummary';
import { PolkadotNode, Validator } from '@interfaces/polkadot/PolkadotNode';
import { handleRequest } from '@utils/helpers/handleRequest';
import { updatePolkadotNode } from '@utils/requests/polkadot';

interface Props extends PolkadotNode {
  mutate?: KeyedMutator<{ node: PolkadotNode }>;
}

function Validatordetails({ validator, name, mutate }: Props) {
  const {
    handleSubmit,
    control,
    reset,
    setError,
    clearErrors,
    formState: {
      isSubmitting,
      errors,
      isSubmitSuccessful,
      isValid,
      isSubmitted,
      isDirty,
    },
  } = useForm<Validator>();

  const onSubmit: SubmitHandler<Validator> = async (values) => {
    const { response } = await handleRequest(
      () => updatePolkadotNode(values, name),
      setError
    );

    if (response) {
      mutate?.();
      reset(response);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="px-4 py-5 sm:p-6">
        {/* Validator */}
        <Controller
          control={control}
          name="validator"
          defaultValue={validator}
          render={({ field }) => (
            <Toggle
              label="Validator"
              checked={field.value}
              onChange={field.onChange}
              error={errors.validator?.message}
            />
          )}
        />

        <ErrorSummary
          errors={errors}
          isSuccess={isSubmitSuccessful}
          successMessage="Your node updated successfuly"
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
}

export default Validatordetails;
