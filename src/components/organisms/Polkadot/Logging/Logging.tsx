import { KeyedMutator } from 'swr';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

import Button from '@components/atoms/Button/Button';
import Select from '@components/molecules/Select/Select';
import Logs from '@components/organisms/Logging/Logging';
import { handleRequest } from '@utils/helpers/handleRequest';
import { PolkadotNode, ILogging } from '@interfaces/polkadot/PolkadotNode';
import { updatePolkadotNode } from '@utils/requests/polkadot';
import { LOGGINGS } from '@data/polkadot/logging';
import ErrorSummary from '@components/templates/ErrorSummary/ErrorSummary';

interface Props extends PolkadotNode {
  mutate?: KeyedMutator<{ node: PolkadotNode }>;
}

function LoggingDetails({ logging, name, mutate }: Props) {
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
  } = useForm<ILogging>();

  const onSubmit: SubmitHandler<ILogging> = async (values) => {
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
      <div className="px-4 pt-5 sm:px-6">
        <Controller
          control={control}
          name="logging"
          defaultValue={logging}
          render={({ field }) => (
            <Select
              label="Verbosity Levels"
              options={LOGGINGS}
              placeholder="Choose a logging level..."
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </div>
      <Logs wsUrl={`/polkadot/nodes/${name}/logs`} />

      <div className="ml-6">
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

export default LoggingDetails;
