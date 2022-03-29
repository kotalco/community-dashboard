import { KeyedMutator } from 'swr';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';

import Button from '@components/atoms/Button/Button';
import Logging from '@components/organisms/Logging/Logging';
import ErrorSummary from '@components/templates/ErrorSummary/ErrorSummary';
import Select from '@components/molecules/Select/Select';
import { updateEthereumNode } from '@utils/requests/ethereum';
import {
  EthereumNode,
  LoggingInterface,
} from '@interfaces/Ethereum/ِEthereumNode';
import { loggingOptions } from '@data/ethereum/node/loggingOptions';
import { handleRequest } from '@utils/helpers/handleRequest';

interface Props extends EthereumNode {
  mutate?: KeyedMutator<{ node: EthereumNode }>;
}

function LoggingDetails({ name, client, mutate, logging }: Props) {
  const {
    handleSubmit,
    control,
    reset,
    setError,
    clearErrors,
    formState: {
      isDirty,
      isSubmitting,
      isValid,
      isSubmitSuccessful,
      isSubmitted,
      errors,
    },
  } = useForm<LoggingInterface>();

  const onSubmit: SubmitHandler<LoggingInterface> = async (values) => {
    const { response } = await handleRequest(
      () => updateEthereumNode(values, name),
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
        {/* Logging */}
        <div className="max-w-xs">
          <Controller
            control={control}
            name="logging"
            defaultValue={logging}
            render={({ field }) => (
              <Select
                label="Verbosity Levels"
                options={loggingOptions(client)}
                placeholder="Choose a logging level..."
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </div>
      </div>
      <Logging wsUrl={`/ethereum/nodes/${name}/logs`} />

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
