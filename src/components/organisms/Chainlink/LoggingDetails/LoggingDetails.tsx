import { useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

import Button from '@components/atoms/Button/Button';
import Select from '@components/molecules/Select/Select';
import Logs from '@components/organisms/Logging/Logging';
import { ChainlinkNode, Logging } from '@interfaces/chainlink/ChainlinkNode';
import { KeyedMutator } from 'swr';
import { updateChainlinkNode } from '@utils/requests/chainlink';
import { handleRequest } from '@utils/helpers/handleRequest';
import { loggingOptions } from '@data/chainlink/loggingOptions';

interface Props extends Logging {
  name: string;
  setNode: KeyedMutator<{
    node: ChainlinkNode;
  }>;
}

function LoggingDetails({ logging, name, setNode }: Props) {
  const [submitSuccess, setSubmitSuccess] = useState('');
  const [serverError, setServerError] = useState('');

  const {
    handleSubmit,
    control,
    reset,
    formState: { isDirty, isSubmitting },
  } = useForm<Logging>();

  const onSubmit: SubmitHandler<Logging> = async (values) => {
    setServerError('');
    const { error, response } = await handleRequest<ChainlinkNode>(
      updateChainlinkNode.bind(undefined, values, name)
    );

    if (error) {
      setServerError(error);
      return;
    }

    if (response) {
      setNode();
      reset(values);
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
              options={loggingOptions}
              placeholder="Choose a logging level..."
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </div>
      <Logs wsUrl={`/chainlink/nodes/${name}/logs`} />

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
