import axios from 'axios';
import { useState } from 'react';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';

import TextInput from '@components/molecules/TextInput/TextInput';
import Button from '@components/atoms/Button/Button';
import Toggle from '@components/molecules/Toggle/Toggle';
import { updateEthereumNode } from '@utils/requests/ethereum';
import { AccessControl, API } from '@interfaces/Ethereum/ِEthereumNode';
import { useNode } from '@utils/requests/ethereum';
import { apiOptions } from '@data/ethereum/node/apiOptions';
import { updateAPISchema } from '@schemas/ethereumNode/updateNodeSchema';
import { handleAxiosError } from '@utils/axios';
import { ServerError } from '@interfaces/ServerError';
import Checkbox from '@components/molecules/CheckBox/CheckBox';
import Separator from '@components/atoms/Separator/Separator';
import TextareaWithInput from '@components/molecules/TextareaWithInput/TextareaWithInput';

interface Props extends AccessControl {
  name: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const AccessControlDetails: React.FC<Props> = ({ name, children, ...rest }) => {
  const { mutate } = useNode(name);
  const [submitSuccess, setSubmitSuccess] = useState('');
  const {
    handleSubmit,
    control,
    register,
    reset,
    setError,
    watch,
    formState: { isDirty, isSubmitting, errors, isValid },
  } = useForm<AccessControl>({
    defaultValues: rest,
    // resolver: joiResolver(updateAPISchema),
  });

  const onSubmit: SubmitHandler<API> = (values) => {
    console.log(values);
    // setSubmitSuccess('');
    // try {
    //   const node = await updateEthereumNode(name, values);
    //   void mutate({ node });
    //   reset(values);
    //   setSubmitSuccess('API data has been updated');
    // } catch (e) {
    //   if (axios.isAxiosError(e)) {
    //     const error = handleAxiosError<ServerError>(e);
    //     setError('graphqlPort', {
    //       type: 'server',
    //       message: error.response?.data.error,
    //     });
    //   }
    // }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="px-4 py-5 sm:p-6">
        {/* Whitelisted Hosts */}
        <Controller
          control={control}
          name="hosts"
          render={({ field }) => (
            <TextareaWithInput
              multiple
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
            render={({ field }) => (
              <TextareaWithInput
                multiple
                tooltip="Browser Enforced"
                name={field.name}
                value={field.value}
                onChange={field.onChange}
                label="CORS Domains"
              />
            )}
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

export default AccessControlDetails;
