import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

import Button from '@components/atoms/Button/Button';
import TextareaWithInput from '@components/molecules/TextareaWithInput/TextareaWithInput';
import ErrorSummary from '@components/templates/ErrorSummary/ErrorSummary';
import {
  AccessControl,
  ChainlinkNode,
} from '@interfaces/chainlink/ChainlinkNode';
import { KeyedMutator } from 'swr';
import { updateChainlinkNode } from '@utils/requests/chainlink';
import { handleRequest } from '@utils/helpers/handleRequest';
import { accessControlSchema } from '@schemas/chainlink/accessControl';

interface Props extends ChainlinkNode {
  name: string;
  mutate?: KeyedMutator<{
    node: ChainlinkNode;
  }>;
}

function AccessControlDetails({ corsDomains, name, mutate }: Props) {
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
  } = useForm<AccessControl>({ resolver: yupResolver(accessControlSchema) });

  const onSubmit: SubmitHandler<AccessControl> = async (values) => {
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
