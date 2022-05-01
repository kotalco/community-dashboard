import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';

import Button from '@components/atoms/Button/Button';
import MultiSelectWithInput from '@components/molecules/MultiSelectWithInput/MultiSelectWithInput';
import useInfiniteRequest from '@hooks/useInfiniteRequest';
import ErrorSummary from '@components/templates/ErrorSummary/ErrorSummary';
import { updateBeaconNode } from '@utils/requests/ethereum2/beaconNodes';
import { BeaconNode, Eth1Endpoints } from '@interfaces/ethereum2/BeaconNode';
import { Ethereum2Client } from '@enums/Ethereum2/Ethereum2Client';
import { handleRequest } from '@utils/helpers/handleRequest';
import {
  requiredSchema,
  optionalSchema,
  onlyOneSchema,
} from '@schemas/ethereum2/beaconNode/ethereum1Endpoint';
import { KeyedMutator } from 'swr';
import { EthereumNode } from '@interfaces/Ethereum/ِEthereumNode';

interface Props extends BeaconNode {
  mutate?: KeyedMutator<{ beaconnode: BeaconNode }>;
}

const BeaconNodeEthereumTab: React.FC<React.PropsWithChildren<Props>> = ({
  name,
  client,
  eth1Endpoints,
  network,
  mutate,
}) => {
  const { data: ethereumNodes, isLoading } =
    useInfiniteRequest<EthereumNode>('/ethereum/nodes');

  const activeNodes = ethereumNodes
    .filter(({ rpc }) => rpc)
    .map(({ rpcPort, name }) => ({
      label: name,
      value: `http://${name}:${rpcPort}`,
    }));

  const {
    reset,
    handleSubmit,
    control,
    setError,
    clearErrors,
    formState: {
      isDirty,
      isSubmitting,
      isSubmitSuccessful,
      isSubmitted,
      isValid,
      errors,
    },
  } = useForm<Eth1Endpoints>({
    resolver: yupResolver(
      client === Ethereum2Client.prysm && network !== 'mainnet'
        ? requiredSchema
        : client === Ethereum2Client.nimbus || client === Ethereum2Client.teku
        ? onlyOneSchema
        : optionalSchema
    ),
  });

  const onSubmit: SubmitHandler<Eth1Endpoints> = async (values) => {
    const { response } = await handleRequest(
      () => updateBeaconNode(name, values),
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
        {!isLoading && (
          <Controller
            name="eth1Endpoints"
            control={control}
            defaultValue={eth1Endpoints}
            render={({ field }) => (
              <MultiSelectWithInput
                single={
                  client === Ethereum2Client.nimbus ||
                  client === Ethereum2Client.teku
                }
                options={activeNodes}
                label="Ethereum Node JSON-RPC Endpoints"
                emptyLabel="No Internal Active Nodes"
                helperText="Nodes must have activated JSON-RPC port"
                placeholder={
                  client !== Ethereum2Client.nimbus &&
                  client !== Ethereum2Client.teku
                    ? 'Select nodes...'
                    : 'Select a node...'
                }
                value={field.value}
                errors={errors}
                error={errors.eth1Endpoints && field.name}
                onChange={field.onChange}
                otherLabel={
                  client !== Ethereum2Client.nimbus &&
                  client !== Ethereum2Client.teku
                    ? 'Add external nodes'
                    : 'Use external node'
                }
              />
            )}
          />
        )}

        <ErrorSummary
          errors={errors}
          isSuccess={isSubmitSuccessful}
          successMessage="Your beaconnode updated successfuly"
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
};

export default BeaconNodeEthereumTab;
