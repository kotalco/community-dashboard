import { useState } from 'react';
import { KeyedMutator } from 'swr';
import { useForm, SubmitHandler } from 'react-hook-form';

import TextInput from '@components/molecules/TextInput/TextInput';
import Button from '@components/atoms/Button/Button';
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
  const [serverError, setServerError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');

  const {
    handleSubmit,
    reset,
    register,
    formState: { isDirty, isSubmitting, errors },
  } = useForm<Networking>({
    resolver: yupResolver(networkingSchema),
  });

  const onSubmit: SubmitHandler<Networking> = async (values) => {
    setSubmitSuccess('');
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
      reset(response);
      setSubmitSuccess('Networking data has been updated');
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
      </div>

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

export default NetworkingDetails;
