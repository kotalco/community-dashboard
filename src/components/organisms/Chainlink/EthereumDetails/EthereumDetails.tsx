import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

import Button from '@components/atoms/Button/Button';
import SelectWithInput from '@components/molecules/SelectWithInput/SelectWithInput';
import MultiselectWithInput from '@components/molecules/MultiSelectWithInput/MultiSelectWithInput';
import useInfiniteRequest from '@hooks/useInfiniteRequest';
import ErrorSummary from '@components/templates/ErrorSummary/ErrorSummary';
import { ChainlinkNode, Ethereum } from '@interfaces/chainlink/ChainlinkNode';
import { KeyedMutator } from 'swr';
import { updateChainlinkNode } from '@utils/requests/chainlink';
import { handleRequest } from '@utils/helpers/handleRequest';
import { ethereumSchema } from '@schemas/chainlink/ethereum';
import { EthereumNode } from '@interfaces/Ethereum/ِEthereumNode';

interface Props extends ChainlinkNode {
  mutate?: KeyedMutator<{
    node: ChainlinkNode;
  }>;
}

function EthereumDetails({
  ethereumHttpEndpoints,
  ethereumWsEndpoint,
  name,
  mutate,
}: Props) {
  const { data: ethereumNodes, isLoading } =
    useInfiniteRequest<EthereumNode>('/ethereum/nodes');

  const wsActiveNodes = ethereumNodes
    .filter(({ ws }) => ws)
    .map(({ name, wsPort }) => ({
      label: name,
      value: `ws://${name}:${wsPort}`,
    }));

  const rpcActiveNodes = ethereumNodes
    .filter(({ rpc }) => rpc)
    .map(({ name, rpcPort }) => ({
      label: name,
      value: `http://${name}:${rpcPort}`,
    }));

  const {
    handleSubmit,
    control,
    reset,
    setError,
    clearErrors,
    formState: {
      isDirty,
      isSubmitting,
      errors,
      isSubmitSuccessful,
      isSubmitted,
      isValid,
    },
  } = useForm<Ethereum>({ resolver: yupResolver(ethereumSchema) });

  const onSubmit: SubmitHandler<Ethereum> = async (values) => {
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
        {/* Ethereum Websocket Endpint */}
        {!isLoading && (
          <Controller
            control={control}
            name="ethereumWsEndpoint"
            defaultValue={ethereumWsEndpoint}
            render={({ field }) => (
              <SelectWithInput
                options={wsActiveNodes}
                value={field.value}
                onChange={field.onChange}
                label="Ethereum Websocket Endpint"
                error={errors.ethereumWsEndpoint?.message}
                otherLabel="External Manged Node"
                helperText="Showing Ethereum nodes with WebSocket enabled"
                name={field.name}
                placeholder="Select a node..."
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
              <MultiselectWithInput
                options={rpcActiveNodes}
                value={field.value}
                onChange={field.onChange}
                label="Ethereum HTTP Endpints"
                placeholder="Select nodes..."
                otherLabel="Add External Nodes"
                emptyLabel="No Enabled Internal Node"
                errors={errors}
                error={errors.ethereumHttpEndpoints && field.name}
              />
            )}
          />
        )}

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

export default EthereumDetails;
