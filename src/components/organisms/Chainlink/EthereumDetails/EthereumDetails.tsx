import { useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

import Select from '@components/molecules/SelectNew/SelectNew';
import Button from '@components/atoms/Button/Button';
import { ChainlinkNode, Ethereum } from '@interfaces/chainlink/ChainlinkNode';
import { KeyedMutator } from 'swr';
import { updateChainlinkNode } from '@utils/requests/chainlink';
import { handleRequest } from '@utils/helpers/handleRequest';
import { useEthereumNodes } from '@hooks/useEthereumNodes';

interface Props extends Ethereum {
  name: string;
  setNode: KeyedMutator<{
    node: ChainlinkNode;
  }>;
}

function EthereumDetails({
  ethereumHttpEndpoints,
  ethereumWsEndpoint,
  name,
  setNode,
}: Props) {
  const [submitSuccess, setSubmitSuccess] = useState('');
  const [serverError, setServerError] = useState('');
  const { nodes, isLoading } = useEthereumNodes();
  const wsActiveNodes = nodes
    .filter(({ ws }) => ws)
    .map(({ name, wsPort }) => ({
      label: name,
      wsValue: `ws://${name}:${wsPort}`,
    }));

  const rpcActiveNodes = nodes
    .filter(({ rpc }) => rpc)
    .map(({ name, rpcPort }) => ({
      label: name,
      httpValue: `http://${name}:${rpcPort}`,
    }));

  const {
    handleSubmit,
    control,
    reset,
    formState: { isDirty, isSubmitting, errors },
  } = useForm<Ethereum>();

  const onSubmit: SubmitHandler<Ethereum> = async (values) => {
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
      setSubmitSuccess('Ethereum data has been updated');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="px-4 py-5 sm:p-6">
        {/* Ethereum Websocket Endpint */}
        {!isLoading && (
          <Controller
            control={control}
            name="ethereumWsEndpoint"
            defaultValue={ethereumWsEndpoint}
            render={({ field }) => (
              <Select
                options={wsActiveNodes}
                labelProp="label"
                valueProp="wsValue"
                value={field.value}
                onChange={field.onChange}
                label="Ethereum Websocket Endpint"
                error={errors.ethereumWsEndpoint?.message}
                other
                otherLabel="External Manged Node"
              />
            )}
          />
        )}

        {/* Ethereum HTTP Endpoints */}
        {!isLoading && (
          <Controller
            control={control}
            name="ethereumHttpEndpoints"
            defaultValue={ethereumHttpEndpoints}
            render={({ field }) => (
              <Select
                options={rpcActiveNodes}
                labelProp="label"
                valueProp="httpValue"
                value={field.value}
                onChange={field.onChange}
                label="Ethereum HTTP Endpints"
                placeholder="Select nodes..."
                multiple
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

export default EthereumDetails;
