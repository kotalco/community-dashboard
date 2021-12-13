import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';

import Button from '@components/atoms/Button/Button';
import MultiSelectWithInput from '@components/molecules/MultiSelectWithInput/MultiSelectWithInput';
import { updateBeaconNode } from '@utils/requests/ethereum2/beaconNodes';
import { useBeaconnode } from '@hooks/useBeaconNode';
import { BeaconNode, Eth1Endpoints } from '@interfaces/ethereum2/BeaconNode';
import { BeaconNodeClient } from '@enums/Ethereum2/BeaconNodes/BeaconNodeClient';
import { useEthereumNodes } from '@hooks/useEthereumNodes';
import { handleRequest } from '@utils/helpers/handleRequest';
import {
  requiredSchema,
  optionalSchema,
  onlyOneSchema,
} from '@schemas/ethereum2/beaconNode/ethereum1Endpoint';

interface Props extends Eth1Endpoints {
  name: string;
  client: BeaconNodeClient;
  network: string;
}

const BeaconNodeEthereumTab: React.FC<Props> = ({
  name,
  client,
  eth1Endpoints,
  network,
}) => {
  const { mutate } = useBeaconnode(name);
  const { nodes } = useEthereumNodes();
  const [submitSuccess, setSubmitSuccess] = useState('');
  const [serverError, setServerError] = useState('');

  const activeNodes = nodes
    .filter(({ rpc }) => rpc)
    .map(({ rpcPort, name }) => ({
      label: name,
      value: `http://${name}:${rpcPort}`,
    }));

  const {
    reset,
    handleSubmit,
    control,
    formState: { isDirty, isSubmitting, errors },
  } = useForm<Eth1Endpoints>({
    defaultValues: { eth1Endpoints },
    resolver: yupResolver(
      client === BeaconNodeClient.prysm && network !== 'mainnet'
        ? requiredSchema
        : client === BeaconNodeClient.nimbus || client === BeaconNodeClient.teku
        ? onlyOneSchema
        : optionalSchema
    ),
  });

  const onSubmit: SubmitHandler<Eth1Endpoints> = async (values) => {
    setSubmitSuccess('');
    setServerError('');
    const { error, response } = await handleRequest<BeaconNode>(
      updateBeaconNode.bind(undefined, name, values)
    );

    if (error) {
      setServerError(error);
      return;
    }

    if (response) {
      mutate();
      reset(values);
      setSubmitSuccess('Beacon node has been updated');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="px-4 py-5 sm:p-6">
        {activeNodes.length && (
          <Controller
            name="eth1Endpoints"
            control={control}
            render={({ field }) => (
              <MultiSelectWithInput
                single={
                  client === BeaconNodeClient.nimbus ||
                  client === BeaconNodeClient.teku
                }
                options={activeNodes}
                label="Ethereum Node JSON-RPC Endpoints"
                placeholder={
                  client !== BeaconNodeClient.nimbus &&
                  client !== BeaconNodeClient.teku
                    ? 'Select nodes...'
                    : 'Select a node...'
                }
                value={field.value}
                errors={errors}
                error={errors.eth1Endpoints && field.name}
                onChange={field.onChange}
                otherLabel={
                  client !== BeaconNodeClient.nimbus &&
                  client !== BeaconNodeClient.teku
                    ? 'Add external nodes'
                    : 'Use external node'
                }
              />
            )}
          />
        )}
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
};

export default BeaconNodeEthereumTab;
