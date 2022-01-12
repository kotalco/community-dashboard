import { useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

import Button from '@components/atoms/Button/Button';
import Logs from '@components/organisms/Logging/Logging';
import { Logging } from '@interfaces/filecoin/FilecoinNode';
import { KeyedMutator } from 'swr';
import { handleRequest } from '@utils/helpers/handleRequest';
import { FilecoinNode } from '@interfaces/filecoin/FilecoinNode';
import { updateFilecoinNode } from '@utils/requests/filecoin';
import Toggle from '@components/molecules/Toggle/Toggle';

interface Props extends FilecoinNode {
  mutate?: KeyedMutator<{
    node: FilecoinNode;
  }>;
}

function LoggingDetails({ disableMetadataLog, name, mutate }: Props) {
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
    const { error, response } = await handleRequest<FilecoinNode>(
      updateFilecoinNode.bind(undefined, values, name)
    );

    if (error) {
      setServerError(error);
      return;
    }

    if (response) {
      mutate?.();
      reset(values);
      setSubmitSuccess('Logging data has been updated');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="px-4 pt-5 sm:px-6">
        {/* Disable Metadata Log */}
        <Controller
          control={control}
          name="disableMetadataLog"
          defaultValue={disableMetadataLog}
          render={({ field }) => (
            <Toggle
              label="Disable Metadata Logs"
              checked={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </div>
      <Logs wsUrl={`/filecoin/nodes/${name}/logs`} />

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
