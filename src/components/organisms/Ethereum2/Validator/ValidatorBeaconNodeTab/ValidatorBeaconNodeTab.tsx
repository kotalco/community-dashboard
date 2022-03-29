import { useForm, Controller, SubmitHandler } from 'react-hook-form';

import Button from '@components/atoms/Button/Button';
import MultiSelectWithInput from '@components/molecules/MultiSelectWithInput/MultiSelectWithInput';
import useInfiniteRequest from '@hooks/useInfiniteRequest';
import ErrorSummary from '@components/templates/ErrorSummary/ErrorSummary';
import { BeaconEndpoints, Validator } from '@interfaces/ethereum2/Validator';
import { updateValidator } from '@utils/requests/ethereum2/validators';
import { Ethereum2Client } from '@enums/Ethereum2/Ethereum2Client';
import { handleRequest } from '@utils/helpers/handleRequest';
import {
  MultipleSchema,
  onlyOneSchema,
} from '@schemas/ethereum2/validator/beaconnodes';
import { yupResolver } from '@hookform/resolvers/yup';
import { KeyedMutator } from 'swr';
import { BeaconNode } from '@interfaces/ethereum2/BeaconNode';

interface Props extends Validator {
  mutate?: KeyedMutator<{ validator: Validator }>;
}

const ValidatorBeaconNodeTab: React.FC<Props> = ({
  name,
  beaconEndpoints,
  client,
  mutate,
}) => {
  const { data: beaconnodes, isLoading } =
    useInfiniteRequest<BeaconNode>('/ethereum2/nodes');

  const activeBeaconnodes = beaconnodes
    .filter(({ client, rest, rpc }) =>
      client === Ethereum2Client.teku || client === Ethereum2Client.lighthouse
        ? rest
        : rpc
    )
    .map(({ name, client, rpcPort, restPort }) => ({
      label: name,
      value: `http://${name}:${
        client === Ethereum2Client.teku || client === Ethereum2Client.lighthouse
          ? restPort
          : rpcPort
      }`,
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
      errors,
      isValid,
      isSubmitSuccessful,
      isSubmitted,
    },
  } = useForm<BeaconEndpoints>({
    resolver: yupResolver(
      client === Ethereum2Client.lighthouse ? MultipleSchema : onlyOneSchema
    ),
  });

  const onSubmit: SubmitHandler<BeaconEndpoints> = async (values) => {
    const { response } = await handleRequest(
      () => updateValidator(name, values),
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
            name="beaconEndpoints"
            control={control}
            defaultValue={beaconEndpoints}
            render={({ field }) => (
              <MultiSelectWithInput
                single={client !== Ethereum2Client.lighthouse}
                options={activeBeaconnodes}
                label="Ethereum 2.0 Beacon Node Endpoints"
                emptyLabel="No Internal Active Beaconnodes"
                errors={errors}
                error={errors.beaconEndpoints && field.name}
                helperText={
                  client === Ethereum2Client.lighthouse
                    ? 'One endpoint per each line'
                    : ''
                }
                value={field.value}
                onChange={field.onChange}
                placeholder={
                  client === Ethereum2Client.lighthouse
                    ? 'Select beacon nodes...'
                    : 'Select beacon node'
                }
                otherLabel={
                  client === Ethereum2Client.lighthouse
                    ? 'Add External Beacon Nodes'
                    : 'Use External Beacon Node'
                }
              />
            )}
          />
        )}

        <ErrorSummary
          errors={errors}
          isSuccess={isSubmitSuccessful}
          successMessage="Your validator updated successfuly"
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

export default ValidatorBeaconNodeTab;
