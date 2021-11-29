import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

import Button from '@components/atoms/Button/Button';
import TextareaWithInput from '@components/molecules/TextareaWithInput/TextareaWithInput';
import {
  AccessControl,
  ChainlinkNode,
} from '@interfaces/chainlink/ChainlinkNode';
import { KeyedMutator } from 'swr';
import { updateChainlinkNode } from '@utils/requests/chainlink';
import { handleRequest } from '@utils/helpers/handleRequest';
import { accessControlSchema } from '@schemas/chainlink/accessControl';

interface Props extends AccessControl {
  name: string;
  setNode: KeyedMutator<{
    node: ChainlinkNode;
  }>;
}

function AccessControlDetails({ corsDomains, name, setNode }: Props) {
  const [submitSuccess, setSubmitSuccess] = useState('');
  const [serverError, setServerError] = useState('');

  const {
    handleSubmit,
    control,
    reset,
    formState: { isDirty, isSubmitting },
  } = useForm<AccessControl>({ resolver: yupResolver(accessControlSchema) });

  const onSubmit: SubmitHandler<AccessControl> = async (values) => {
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
      setSubmitSuccess('CORS domains has been updated');
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

      <div className="flex space-x-2 space-x-reverse flex-row-reverse items-center px-4 py-3 bg-gray-50 sm:px-6">
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
