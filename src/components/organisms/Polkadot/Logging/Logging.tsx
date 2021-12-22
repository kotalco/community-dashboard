import { useState } from 'react';
import { KeyedMutator } from 'swr';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

import Button from '@components/atoms/Button/Button';
import Select from '@components/molecules/Select/Select';
import Logs from '@components/organisms/Logging/Logging';
import { handleRequest } from '@utils/helpers/handleRequest';
import { PolkadotNode, ILogging } from '@interfaces/polkadot/PolkadotNode';
import { updatePolkadotNode } from '@utils/requests/polkadot';
import { LOGGINGS } from '@data/polkadot/logging';

interface Props extends PolkadotNode {
  mutate?: KeyedMutator<{ node: PolkadotNode }>;
}

function LoggingDetails({ logging, name, mutate }: Props) {
  const [submitSuccess, setSubmitSuccess] = useState('');
  const [serverError, setServerError] = useState('');

  const {
    handleSubmit,
    control,
    reset,
    formState: { isDirty, isSubmitting },
  } = useForm<ILogging>();

  const onSubmit: SubmitHandler<ILogging> = async (values) => {
    setSubmitSuccess('');
    setServerError('');
    const { error, response } = await handleRequest<PolkadotNode>(
      updatePolkadotNode.bind(undefined, values, name)
    );

    if (error) {
      setServerError(error);
      return;
    }

    if (response) {
      mutate?.();
      reset(response);
      setSubmitSuccess('Logging data has been updated');
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

      <div className="flex flex-row-reverse items-center px-4 py-3 space-x-2 space-x-reverse bg-gray-50 sm:px-6">
        <Button
          type="submit"
          className="btn btn-primary"
          disabled={!isDirty || isSubmitting}
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
