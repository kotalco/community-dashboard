import { KeyedMutator } from 'swr';
import { useForm, SubmitHandler } from 'react-hook-form';

import TextInput from '@components/molecules/TextInput/TextInput';
import Button from '@components/atoms/Button/Button';
import ErrorSummary from '@components/templates/ErrorSummary/ErrorSummary';
import { Networking } from '@interfaces/filecoin/FilecoinNode';
import { handleRequest } from '@utils/helpers/handleRequest';
import { yupResolver } from '@hookform/resolvers/yup';
import { networkingSchema } from '@schemas/filecoin/networking';
import { FilecoinNode } from '@interfaces/filecoin/FilecoinNode';
import { updateFilecoinNode } from '@utils/requests/filecoin';

interface Props extends FilecoinNode {
  mutate?: KeyedMutator<{ node: FilecoinNode }>;
}

function NetworkingDetails({ p2pPort, p2pHost, name, mutate }: Props) {
  const {
    handleSubmit,
    reset,
    register,
    setError,
    clearErrors,
    formState: {
      isValid,
      isSubmitSuccessful,
      isSubmitted,
      isSubmitting,
      errors,
      isDirty,
    },
  } = useForm<Networking>({
    resolver: yupResolver(networkingSchema),
  });

  const onSubmit: SubmitHandler<Networking> = async (values) => {
    const { response } = await handleRequest(
      () => updateFilecoinNode(values, name),
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
        {/* P2P Port */}
        <TextInput
          type="text"
          label="P2P Port"
          error={errors.p2pPort?.message}
          defaultValue={p2pPort}
          {...register('p2pPort')}
        />

        {/* P2P Host */}
        <TextInput
          type="text"
          label="P2P Host"
          error={errors.p2pHost?.message}
          defaultValue={p2pHost}
          {...register('p2pHost')}
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

export default NetworkingDetails;
