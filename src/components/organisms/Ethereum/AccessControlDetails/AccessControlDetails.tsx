import { useState } from 'react';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Button from '@components/atoms/Button/Button';
import TextareaWithInput from '@components/molecules/TextareaWithInput/TextareaWithInput';
import { updateEthereumNode } from '@utils/requests/ethereum';
import {
  AccessControl,
  EthereumNode,
} from '@interfaces/Ethereum/ِEthereumNode';
import { KeyedMutator } from 'swr';
import { handleRequest } from '@utils/helpers/handleRequest';
import { schema } from '@schemas/ethereum/accessControl';

interface Props extends EthereumNode {
  mutate?: KeyedMutator<{ node: EthereumNode }>;
}

function AccessControlDetails({ name, mutate, ...rest }: Props) {
  const [submitSuccess, setSubmitSuccess] = useState('');
  const [serverError, setServerError] = useState('');
  const {
    handleSubmit,
    control,
    reset,
    formState: { isDirty, isSubmitting, errors, isValid },
  } = useForm<AccessControl>({
    defaultValues: rest,
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<AccessControl> = async (values) => {
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
      setSubmitSuccess('Access control data has been updated');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="px-4 py-5 sm:p-6">
        {/* Whitelisted Hosts */}
        <Controller
          control={control}
          name="hosts"
          render={({ field }) => (
            <TextareaWithInput
              multiple
              helperText="* (asterisk) means trust all hosts"
              errors={errors}
              error={errors.hosts && field.name}
              tooltip="Server Enforced"
              name={field.name}
              value={field.value}
              onChange={field.onChange}
              label="Whitelisted Hosts"
            />
          )}
        />

        {/* CORS Domains */}
        <div className="mt-5">
          <Controller
            control={control}
            name="corsDomains"
            render={({ field }) => (
              <TextareaWithInput
                multiple
                helperText="* (asterisk) means trust all domains"
                errors={errors}
                error={errors.corsDomains && field.name}
                tooltip="Browser Enforced"
                name={field.name}
                value={field.value}
                onChange={field.onChange}
                label="CORS Domains"
              />
            )}
          />
        </div>
      </div>

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

export default AccessControlDetails;
