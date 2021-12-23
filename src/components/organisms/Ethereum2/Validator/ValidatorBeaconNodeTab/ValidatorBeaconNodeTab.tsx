import { useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';

import Button from '@components/atoms/Button/Button';
import MultiSelectWithInput from '@components/molecules/MultiSelectWithInput/MultiSelectWithInput';
import { BeaconEndpoints, Validator } from '@interfaces/ethereum2/Validator';
import { updateValidator } from '@utils/requests/ethereum2/validators';
import { ValidatorsClient } from '@enums/Ethereum2/Validators/ValidatorsClient';
import { useValidator } from '@hooks/useValidator';
import { handleRequest } from '@utils/helpers/handleRequest';
import { useBeaconNodes } from '@hooks/useBeaconNodes';
import { BeaconNodeClient } from '@enums/Ethereum2/BeaconNodes/BeaconNodeClient';
import {
  MultipleSchema,
  onlyOneSchema,
} from '@schemas/ethereum2/validator/beaconnodes';
import { yupResolver } from '@hookform/resolvers/yup';

interface Props extends BeaconEndpoints {
  name: string;
  client: ValidatorsClient;
}

const ValidatorBeaconNodeTab: React.FC<Props> = ({
  name,
  beaconEndpoints,
  client,
}) => {
  const [serverError, setServerError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');
  const { mutate } = useValidator(name);
  const { beaconnodes, isLoading } = useBeaconNodes();

  const activeBeaconnodes = beaconnodes
    .filter(({ client, rest, rpc }) =>
      client === BeaconNodeClient.teku || client === BeaconNodeClient.lighthouse
        ? rest
        : rpc
    )
    .map(({ name, client, rpcPort, restPort }) => ({
      label: name,
      value: `http://${name}:${
        client === BeaconNodeClient.teku ||
        client === BeaconNodeClient.lighthouse
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
    defaultValues: { beaconEndpoints },
    resolver: yupResolver(
      client === ValidatorsClient.lighthouse ? MultipleSchema : onlyOneSchema
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
      mutate();
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
            render={({ field }) => (
              <MultiSelectWithInput
                single={client !== ValidatorsClient.lighthouse}
                options={activeBeaconnodes}
                label="Ethereum 2.0 Beacon Node Endpoints"
                emptyLabel="No Internal Active Beaconnodes"
                errors={errors}
                error={errors.beaconEndpoints && field.name}
                helperText={
                  client === ValidatorsClient.lighthouse
                    ? 'One endpoint per each line'
                    : ''
                }
                value={field.value}
                onChange={field.onChange}
                placeholder={
                  client === ValidatorsClient.lighthouse
                    ? 'Select beacon nodes...'
                    : 'Select beacon node'
                }
                otherLabel={
                  client === ValidatorsClient.lighthouse
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
