import { useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';

import Button from '@components/atoms/Button/Button';
import MultiSelectWithInput from '@components/molecules/MultiSelectWithInput/MultiSelectWithInput';
import { BeaconEndpoints, Validator } from '@interfaces/ethereum2/Validator';
import { updateValidator } from '@utils/requests/ethereum2/validators';
import { Ethereum2Client } from '@enums/Ethereum2/Ethereum2Client';
import { handleRequest } from '@utils/helpers/handleRequest';
import { useBeaconNodes } from '@hooks/useBeaconNodes';
import {
  MultipleSchema,
  onlyOneSchema,
} from '@schemas/ethereum2/validator/beaconnodes';
import { yupResolver } from '@hookform/resolvers/yup';
import { KeyedMutator } from 'swr';

interface Props extends Validator {
  mutate?: KeyedMutator<{ validator: Validator }>;
}

const ValidatorBeaconNodeTab: React.FC<Props> = ({
  name,
  beaconEndpoints,
  client,
  mutate,
}) => {
  const [serverError, setServerError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');
  const { beaconnodes, isLoading } = useBeaconNodes();

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
    formState: { isDirty, isSubmitting, errors },
  } = useForm<BeaconEndpoints>({
    resolver: yupResolver(
      client === Ethereum2Client.lighthouse ? MultipleSchema : onlyOneSchema
    ),
  });

  const onSubmit: SubmitHandler<BeaconEndpoints> = async (values) => {
    setServerError('');
    setSubmitSuccess('');

    const { error, response } = await handleRequest<Validator>(
      updateValidator.bind(undefined, name, values)
    );

    if (error) {
      setServerError(error);
      return;
    }

    if (response) {
      mutate?.();
      reset(values);
      setSubmitSuccess('Validator has been updated');
    }
  };

  return (
    <>
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
      </div>

      <div className="flex flex-row-reverse items-center px-4 py-3 space-x-2 space-x-reverse bg-gray-50 sm:px-6">
        <Button
          className="btn btn-primary"
          disabled={!isDirty || isSubmitting}
          loading={isSubmitting}
          onClick={handleSubmit(onSubmit)}
        >
          Save
        </Button>
        {serverError && (
          <p className="mb-5 text-center text-red-500">{serverError}</p>
        )}
        {submitSuccess && <p>{submitSuccess}</p>}
      </div>
    </>
  );
};

export default ValidatorBeaconNodeTab;
