import axios from 'axios';
import { useState } from 'react';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';

import TextInput from '@components/molecules/TextInput/TextInput';
import Button from '@components/atoms/Button/Button';
import Select from '@components/molecules/Select/Select';
import TextareaWithInput from '@components/molecules/TextareaWithInput/TextareaWithInput';
import { updateEthereumNode } from '@utils/requests/ethereum';
import { Networking } from '@interfaces/Ethereum/ِEthereumNode';
import { useNode } from '@utils/requests/ethereum';
import { syncModeOptions } from '@data/ethereum/node/syncModeOptions';
import { updateNetworkingSchema } from '@schemas/ethereumNode/updateNodeSchema';
import { handleAxiosError } from '@utils/axios';
import { ServerError } from '@interfaces/ServerError';
import { useSecretsByType } from '@utils/requests/secrets';
import { KubernetesSecretTypes } from '@enums/KubernetesSecret/KubernetesSecretTypes';

interface Props extends Networking {
  name: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const NetworkingDetails: React.FC<Props> = ({ name, children, ...rest }) => {
  const { mutate } = useNode(name);
  const { data: privateKeys } = useSecretsByType(
    KubernetesSecretTypes.ethereumPrivatekey
  );
  const [submitSuccess, setSubmitSuccess] = useState('');
  const {
    handleSubmit,
    control,
    register,
    reset,
    setError,
    formState: { isDirty, isSubmitting, errors },
  } = useForm<Networking>({
    defaultValues: rest,
    resolver: joiResolver(updateNetworkingSchema),
  });

  const onSubmit: SubmitHandler<Networking> = async (values) => {
    setSubmitSuccess('');
    try {
      const node = await updateEthereumNode(name, values);
      void mutate({ node });
      reset(values);
      setSubmitSuccess('Networking data has been updated');
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const error = handleAxiosError<ServerError>(e);
        setError('bootnodes', {
          type: 'server',
          message: error.response?.data.error,
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="px-4 py-5 sm:p-6">
        {/* Node Private key */}
        <div className="max-w-xs">
          <Controller
            name="nodePrivateKeySecretName"
            control={control}
            render={({ field }) => (
              <Select
                placeholder="Choose a private key..."
                label="Node private key"
                error={errors.nodePrivateKeySecretName?.message}
                options={privateKeys}
                onChange={field.onChange}
                value={field.value}
                href={`/core/secrets/create?type=${KubernetesSecretTypes.ethereumPrivatekey}`}
                hrefTitle="Create new private key..."
              />
            )}
          />
        </div>

        {/* P2P Port */}
        <div className="mt-5 max-w-xs">
          <TextInput
            label="P2P Port"
            {...register('p2pPort')}
            error={errors.p2pPort?.message}
          />
        </div>

        {/* Sync Mode */}
        <div className="mt-5 max-w-xs">
          <Controller
            control={control}
            name="syncMode"
            render={({ field }) => (
              <Select
                error={errors.syncMode?.message}
                options={syncModeOptions}
                placeholder="Choose your sync mode..."
                onChange={field.onChange}
                value={field.value}
                label="Sync Mode"
              />
            )}
          />
        </div>

        {/* Static Nodes */}
        <div className="mt-5 max-w-xs">
          <Controller
            control={control}
            name="staticNodes"
            render={({ field }) => (
              <TextareaWithInput
                multiple
                helperText="One enodeURL per line"
                name={field.name}
                label="Static Nodes"
                value={field.value}
                onChange={field.onChange}
                error={errors.staticNodes?.message}
              />
            )}
          />
        </div>

        {/* Boot Nodes */}
        <div className="mt-5 max-w-xs">
          <Controller
            control={control}
            name="bootnodes"
            render={({ field }) => (
              <TextareaWithInput
                multiple
                helperText="One enodeURL per line"
                name={field.name}
                label="Bootnodes"
                value={field.value}
                onChange={field.onChange}
                error={errors.bootnodes?.message}
              />
            )}
          />
        </div>
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
      </div>
    </form>
  );
};

export default NetworkingDetails;
