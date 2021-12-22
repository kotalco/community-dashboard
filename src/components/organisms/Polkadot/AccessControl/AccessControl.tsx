import { useState } from 'react';
import { KeyedMutator } from 'swr';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

import Button from '@components/atoms/Button/Button';
import TextareaWithInput from '@components/molecules/TextareaWithInput/TextareaWithInput';
import { handleRequest } from '@utils/helpers/handleRequest';
import { accessControlSchema } from '@schemas/polkadot/accessControl';
import { PolkadotNode, AccessControl } from '@interfaces/polkadot/PolkadotNode';
import { updatePolkadotNode } from '@utils/requests/polkadot';

interface Props extends PolkadotNode {
  mutate?: KeyedMutator<{ node: PolkadotNode }>;
}

function AccessControlDetails({ corsDomains, name, mutate }: Props) {
  const [submitSuccess, setSubmitSuccess] = useState('');
  const [serverError, setServerError] = useState('');

  const {
    handleSubmit,
    control,
    reset,
    formState: { isDirty, isSubmitting },
  } = useForm<AccessControl>({ resolver: yupResolver(accessControlSchema) });

  const onSubmit: SubmitHandler<AccessControl> = async (values) => {
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
      setSubmitSuccess('Access control data has been updated');
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

export default AccessControlDetails;
