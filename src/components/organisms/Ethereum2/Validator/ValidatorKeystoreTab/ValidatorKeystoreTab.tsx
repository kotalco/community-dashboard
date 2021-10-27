import { useState } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { mutate } from 'swr';
import axios from 'axios';

import Button from '@components/atoms/Button/Button';
import { updateValidator } from '@utils/requests/ethereum2/validators';
import { UpdateKeystores } from '@interfaces/ethereum2/Ethereum2Validator';
import Multiselect from '@components/molecules/Multiselect/Multiselect';
import Select from '@components/molecules/Select/Select';
import { ValidatorsClients } from '@enums/Ethereum2/Validators/ValidatorsClients';
import { updateKeystoresSchema } from '@schemas/ethereum2/validator/updateValidatorSchema';
import { useSecretsByType } from '@utils/requests/secrets';
import { handleAxiosError } from '@utils/axios';
import { ServerError } from '@interfaces/ServerError';
import { KubernetesSecretTypes } from '@enums/KubernetesSecret/KubernetesSecretTypes';

interface Props {
  name: string;
  keystores: { secretName: string }[];
  walletPasswordSecretName: string;
  client: ValidatorsClients;
}

const ValidatorKeystoreTab: React.FC<Props> = ({
  name,
  keystores,
  walletPasswordSecretName,
  client,
}) => {
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');
  const { data: allKeystores } = useSecretsByType(
    KubernetesSecretTypes.ethereum2Keystore
  );
  const { data: allWalletValues } = useSecretsByType(
    KubernetesSecretTypes.password
  );

  const selectedKeystores = keystores.map(({ secretName }) => secretName);

  const {
    reset,
    handleSubmit,
    control,
    formState: { isDirty, isSubmitting, errors },
  } = useForm<UpdateKeystores>({
    // resolver: joiResolver(updateKeystoresSchema),
    defaultValues: {
      keystores: selectedKeystores,
      walletPasswordSecretName,
      client,
    },
  });

  const onSubmit: SubmitHandler<UpdateKeystores> = async (values) => {
    const { keystores, ...rest } = values;
    const keystoresObject = keystores.map((key) => ({ secretName: key }));
    const valuesToUpdate = { ...rest, keystores: keystoresObject };

    setSubmitError('');
    setSubmitSuccess('');
    try {
      const validator = await updateValidator(name, valuesToUpdate);
      void mutate(name, validator);
      reset(values);
      setSubmitSuccess('Validator has been updated');
    } catch (e) {
      // if (axios.isAxiosError(e)) {
      //   const error = handleAxiosError<ServerError>(e);
      // setSubmitError(
      //   error.response?.data.error || 'Something wrong happened'
      // );
      // }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="px-4 py-5 sm:p-6">
        {/* Key Stores */}
        <div className="max-w-xs">
          <Controller
            name="keystores"
            control={control}
            render={({ field }) => (
              <Multiselect
                label="Ethereum 2.0 Keystores"
                placeholder="Choose your keystores..."
                options={allKeystores}
                error={errors.keystores?.message}
                onChange={field.onChange}
                value={field.value}
              />
            )}
          />
        </div>

        {walletPasswordSecretName && (
          <div className="mt-4 max-w-xs">
            <Controller
              name="walletPasswordSecretName"
              control={control}
              render={({ field }) => (
                <Select
                  placeholder="Choose a wallet password"
                  label="Prysm Client Wallet Password"
                  options={allWalletValues}
                  onChange={field.onChange}
                  value={field.value}
                />
              )}
            />
          </div>
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
        {submitError && (
          <p className="text-center text-red-500 mb-5">{submitError}</p>
        )}
        {submitSuccess && <p>{submitSuccess}</p>}
      </div>
    </form>
  );
};

export default ValidatorKeystoreTab;
