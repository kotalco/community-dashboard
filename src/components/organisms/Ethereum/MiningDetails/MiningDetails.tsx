import axios from 'axios';
import { useState } from 'react';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';

import Button from '@components/atoms/Button/Button';
import TextareaWithInput from '@components/molecules/TextareaWithInput/TextareaWithInput';
import { updateEthereumNode } from '@utils/requests/ethereum';
import { AccessControl, Mining } from '@interfaces/Ethereum/ِEthereumNode';
import { useNode } from '@utils/requests/ethereum';
import { updateAccessControlSchema } from '@schemas/ethereumNode/updateNodeSchema';
import { handleAxiosError } from '@utils/axios';
import { ServerError } from '@interfaces/ServerError';
import Toggle from '@components/molecules/Toggle/Toggle';
import TextInput from '@components/molecules/TextInput/TextInput';

interface Props extends Mining {
  name: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const MiningDetails: React.FC<Props> = ({ name, children, ...rest }) => {
  const { mutate } = useNode(name);
  const [submitSuccess, setSubmitSuccess] = useState('');
  const {
    handleSubmit,
    control,
    watch,
    reset,
    setError,
    register,
    formState: { isDirty, isSubmitting, errors, isValid },
  } = useForm<Mining>({
    defaultValues: rest,
    // resolver: joiResolver(updateAccessControlSchema),
  });

  const miner = watch('miner');

  const onSubmit: SubmitHandler<Mining> = (values) => {
    console.log(values);
    // setSubmitSuccess('');
    // try {
    //   const node = await updateEthereumNode(name, values);
    //   void mutate({ node });
    //   reset(values);
    //   setSubmitSuccess('Access control data has been updated');
    // } catch (e) {
    //   if (axios.isAxiosError(e)) {
    //     const error = handleAxiosError<ServerError>(e);
    //     setError('corsDomains', {
    //       type: 'server',
    //       message: error.response?.data.error,
    //     });
    //   }
    // }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="px-4 py-5 sm:p-6">
        {/* Miner */}
        <Controller
          control={control}
          name="miner"
          render={({ field }) => (
            <Toggle
              label="Miner"
              checked={field.value}
              onChange={field.onChange}
            />
          )}
        />

        {/* Coinbase Account */}
        <div className="mt-5">
          <TextInput
            label="Coinbase Account"
            error={errors.coinbase?.message}
            disabled={!miner}
            {...register('coinbase')}
          />
        </div>
      </div>

      <div className="flex space-x-2 space-x-reverse flex-row-reverse items-center px-4 py-3 bg-gray-50 sm:px-6">
        <Button
          type="submit"
          className="btn btn-primary"
          disabled={!isDirty || isSubmitting || !isValid}
          loading={isSubmitting}
        >
          Save
        </Button>
        {submitSuccess && <p>{submitSuccess}</p>}
      </div>
    </form>
  );
};

export default MiningDetails;
