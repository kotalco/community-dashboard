import { useForm, SubmitHandler, Controller } from 'react-hook-form';

import Button from '@components/atoms/Button/Button';
import Logs from '@components/organisms/Logging/Logging';
import Toggle from '@components/molecules/Toggle/Toggle';
import ErrorSummary from '@components/templates/ErrorSummary/ErrorSummary';
import { Logging } from '@interfaces/filecoin/FilecoinNode';
import { KeyedMutator } from 'swr';
import { handleRequest } from '@utils/helpers/handleRequest';
import { FilecoinNode } from '@interfaces/filecoin/FilecoinNode';
import { updateFilecoinNode } from '@utils/requests/filecoin';

interface Props extends FilecoinNode {
  mutate?: KeyedMutator<{
    node: FilecoinNode;
  }>;
}

function LoggingDetails({ disableMetadataLog, name, mutate }: Props) {
  const {
    handleSubmit,
    control,
    reset,
    setError,
    clearErrors,
    formState: {
      isDirty,
      isSubmitting,
      isSubmitted,
      isSubmitSuccessful,
      isValid,
      errors,
    },
  } = useForm<Logging>();

  const onSubmit: SubmitHandler<Logging> = async (values) => {
    const { response } = await handleRequest(
      () => updateFilecoinNode(values, name),
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
