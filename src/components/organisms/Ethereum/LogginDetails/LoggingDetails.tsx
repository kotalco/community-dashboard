import { useState } from 'react';
import { KeyedMutator } from 'swr';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';

import Button from '@components/atoms/Button/Button';
import Logging from '@components/organisms/Logging/Logging';
import { updateEthereumNode } from '@utils/requests/ethereum';
import Select from '@components/molecules/Select/Select';
import {
  EthereumNode,
  LoggingInterface,
} from '@interfaces/Ethereum/ِEthereumNode';
import { loggingOptions } from '@data/ethereum/node/loggingOptions';
import { handleRequest } from '@utils/helpers/handleRequest';

interface Props extends EthereumNode {
  mutate?: KeyedMutator<{ node: EthereumNode }>;
}

function LoggingDetails({ name, client, mutate, ...rest }: Props) {
  const [submitSuccess, setSubmitSuccess] = useState('');
  const [serverError, setServerError] = useState('');

  const {
    handleSubmit,
    control,
    reset,
    formState: { isDirty, isSubmitting, isValid },
  } = useForm<LoggingInterface>({
    defaultValues: rest,
  });

  const onSubmit: SubmitHandler<LoggingInterface> = async (values) => {
    setSubmitSuccess('');
    setServerError('');

    const { error, response } = await handleRequest<EthereumNode>(
      updateEthereumNode.bind(undefined, values, name)
    );

    if (error) {
      setServerError(error);
      return;
    }

    if (response) {
      mutate?.();
      reset(values);
      setSubmitSuccess('Mining data data has been updated');
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

      <div className="flex flex-row-reverse items-center px-4 py-3 space-x-2 space-x-reverse bg-gray-50 sm:px-6">
        <Button
          type="submit"
          className="btn btn-primary"
          disabled={!isDirty || isSubmitting || !isValid}
          loading={isSubmitting}
        >
          Save
        </Button>
        {submitSuccess && <p>{submitSuccess}</p>}
        {serverError && (
          <p aria-label="alert" className="text-sm text-red-600">
            {serverError}
          </p>
        )}
      </div>
    </form>
  );
}

export default LoggingDetails;
