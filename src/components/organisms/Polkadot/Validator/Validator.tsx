import { useState } from 'react';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';

import TextInput from '@components/molecules/TextInput/TextInput';
import Button from '@components/atoms/Button/Button';
import Select from '@components/molecules/Select/Select';
import Toggle from '@components/molecules/Toggle/Toggle';
import {
  PolkadotNode,
  Networking,
  Validator,
} from '@interfaces/polkadot/PolkadotNode';
import { useSecretsByType } from '@utils/requests/secrets';
import { KubernetesSecretTypes } from '@enums/KubernetesSecret/KubernetesSecretTypes';
import { handleRequest } from '@utils/helpers/handleRequest';
import { yupResolver } from '@hookform/resolvers/yup';
import { networkingSchema } from '@schemas/polkadot/networking';
import { updatePolkadotNode } from '@utils/requests/polkadot';
import { SYNC_MODES } from '@data/polkadot/syncModes';
import { KeyedMutator } from 'swr';

interface Props extends PolkadotNode {
  mutate?: KeyedMutator<{ node: PolkadotNode }>;
}

function Validatordetails({ validator, name, mutate }: Props) {
  const [serverError, setServerError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');

  const {
    handleSubmit,
    control,
    reset,
    register,
    formState: { isDirty, isSubmitting, errors },
  } = useForm<Validator>();

  const onSubmit: SubmitHandler<Validator> = async (values) => {
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
      reset(values);
      setSubmitSuccess('Validator data has been updated');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="px-4 py-5 sm:p-6">
        {/* Validator */}
        <Controller
          control={control}
          name="validator"
          defaultValue={validator}
          render={({ field }) => (
            <Toggle
              label="Validator"
              checked={field.value}
              onChange={field.onChange}
              error={errors.validator?.message}
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

export default Validatordetails;
