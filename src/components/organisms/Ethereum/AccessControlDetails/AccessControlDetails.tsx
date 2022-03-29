import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Button from '@components/atoms/Button/Button';
import TextareaWithInput from '@components/molecules/TextareaWithInput/TextareaWithInput';
import ErrorSummary from '@components/templates/ErrorSummary/ErrorSummary';
import { updateEthereumNode } from '@utils/requests/ethereum';
import {
  AccessControl,
  EthereumNode,
} from '@interfaces/Ethereum/ِEthereumNode';
import { KeyedMutator } from 'swr';
import { handleRequest } from '@utils/helpers/handleRequest';
import { schema } from '@schemas/ethereum/accessControl';

interface Props extends EthereumNode {
  mutate?: KeyedMutator<{ node: EthereumNode }>;
}

function AccessControlDetails({ name, mutate, hosts, corsDomains }: Props) {
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
      isValid,
      isSubmitSuccessful,
      isSubmitted,
    },
  } = useForm<AccessControl>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<AccessControl> = async (values) => {
    const { response } = await handleRequest(
      () => updateEthereumNode(values, name),
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
        {/* Whitelisted Hosts */}
        <Controller
          control={control}
          name="hosts"
          defaultValue={hosts}
          render={({ field }) => (
            <TextareaWithInput
              multiple
              helperText="* (asterisk) means trust all hosts"
              errors={errors}
              error={errors.hosts && field.name}
              tooltip="Server Enforced"
              name={field.name}
              value={field.value}
              onChange={field.onChange}
              label="Whitelisted Hosts"
            />
          )}
        />

        {/* CORS Domains */}
        <div className="mt-5">
          <Controller
            control={control}
            name="corsDomains"
            defaultValue={corsDomains}
            render={({ field }) => (
              <TextareaWithInput
                multiple
                helperText="* (asterisk) means trust all domains"
                errors={errors}
                error={errors.corsDomains && field.name}
                tooltip="Browser Enforced"
                name={field.name}
                value={field.value}
                onChange={field.onChange}
                label="CORS Domains"
              />
            )}
          />
        </div>

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

export default AccessControlDetails;
