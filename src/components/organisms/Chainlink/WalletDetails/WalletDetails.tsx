import { useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

import Select from '@components/molecules/SelectNew/SelectNew';
import Button from '@components/atoms/Button/Button';
import { ChainlinkNode, Wallet } from '@interfaces/chainlink/ChainlinkNode';
import { KeyedMutator } from 'swr';
import { updateChainlinkNode } from '@utils/requests/chainlink';
import { handleRequest } from '@utils/helpers/handleRequest';
import { useSecretsByType } from '@utils/requests/secrets';
import { KubernetesSecretTypes } from '@enums/KubernetesSecret/KubernetesSecretTypes';

interface Props extends Wallet {
  name: string;
  setNode: KeyedMutator<{
    node: ChainlinkNode;
  }>;
}

function WalletDetails({ keystorePasswordSecretName, name, setNode }: Props) {
  const [submitSuccess, setSubmitSuccess] = useState('');
  const [serverError, setServerError] = useState('');
  const { data: passwords } = useSecretsByType(KubernetesSecretTypes.password);

  const {
    handleSubmit,
    control,
    reset,
    formState: { isDirty, isSubmitting, errors },
  } = useForm<Wallet>();

  const onSubmit: SubmitHandler<Wallet> = async (values) => {
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
      setSubmitSuccess('Wallet keystore password has been updated');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="px-4 py-5 sm:p-6">
        {/* Keystore Password */}
        {passwords.length && (
          <Controller
            control={control}
            name="keystorePasswordSecretName"
            defaultValue={keystorePasswordSecretName}
            render={({ field }) => (
              <Select
                options={passwords}
                labelProp="label"
                valueProp="value"
                value={field.value}
                onChange={field.onChange}
                label="Keystore Password"
                error={errors.keystorePasswordSecretName?.message}
              />
            )}
          />
        )}
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

export default WalletDetails;
