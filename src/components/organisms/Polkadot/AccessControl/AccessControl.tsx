import { KeyedMutator } from 'swr';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

import Button from '@components/atoms/Button/Button';
import TextareaWithInput from '@components/molecules/TextareaWithInput/TextareaWithInput';
import ErrorSummary from '@components/templates/ErrorSummary/ErrorSummary';
import { handleRequest } from '@utils/helpers/handleRequest';
import { accessControlSchema } from '@schemas/polkadot/accessControl';
import { PolkadotNode, AccessControl } from '@interfaces/polkadot/PolkadotNode';
import { updatePolkadotNode } from '@utils/requests/polkadot';

interface Props extends PolkadotNode {
  mutate?: KeyedMutator<{ node: PolkadotNode }>;
}

function AccessControlDetails({ corsDomains, name, mutate }: Props) {
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
      isSubmitted,
      isValid,
      isDirty,
    },
  } = useForm<AccessControl>({ resolver: yupResolver(accessControlSchema) });

  const onSubmit: SubmitHandler<AccessControl> = async (values) => {
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
        {/* CORS Domains */}
        <Controller
          control={control}
          name="corsDomains"
          defaultValue={corsDomains}
          render={({ field }) => (
            <TextareaWithInput
              multiple
              helperText="One domain per line"
              name={field.name}
              value={field.value}
              onChange={field.onChange}
              label="CORS Domains"
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

export default AccessControlDetails;
