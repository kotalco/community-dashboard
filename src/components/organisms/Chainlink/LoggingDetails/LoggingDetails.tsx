import { useForm, SubmitHandler, Controller } from 'react-hook-form';

import Button from '@components/atoms/Button/Button';
import Select from '@components/molecules/Select/Select';
import Logs from '@components/organisms/Logging/Logging';
import ErrorSummary from '@components/templates/ErrorSummary/ErrorSummary';
import { ChainlinkNode, Logging } from '@interfaces/chainlink/ChainlinkNode';
import { KeyedMutator } from 'swr';
import { updateChainlinkNode } from '@utils/requests/chainlink';
import { handleRequest } from '@utils/helpers/handleRequest';
import { loggingOptions } from '@data/chainlink/loggingOptions';

interface Props extends ChainlinkNode {
  mutate?: KeyedMutator<{
    node: ChainlinkNode;
  }>;
}

function LoggingDetails({ logging, name, mutate }: Props) {
  const {
    handleSubmit,
    control,
    reset,
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
  } = useForm<Logging>();

  const onSubmit: SubmitHandler<Logging> = async (values) => {
    const { response } = await handleRequest(
      () => updateChainlinkNode(values, name),
      setError
    );

    if (response) {
      mutate?.();
      reset(values);
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
              options={loggingOptions}
              placeholder="Choose a logging level..."
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </div>
      <Logs wsUrl={`/chainlink/nodes/${name}/logs`} />

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
