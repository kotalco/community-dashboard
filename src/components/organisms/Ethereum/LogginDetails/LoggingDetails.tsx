import axios from 'axios';
import { useEffect, useState } from 'react';
import { Controller, useForm, SubmitHandler } from 'react-hook-form';

import Button from '@components/atoms/Button/Button';
import { updateEthereumNode } from '@utils/requests/ethereum';
import { LoggingInterface } from '@interfaces/Ethereum/ِEthereumNode';
import { useNode } from '@utils/requests/ethereum';
import { handleAxiosError } from '@utils/axios';
import { ServerError } from '@interfaces/ServerError';
import Select from '@components/molecules/Select/Select';
import { loggingOptions } from '@data/ethereum/node/loggingOptions';
import { EthereumNodeClient } from '@enums/Ethereum/EthereumNodeClient';

interface Props extends LoggingInterface {
  client: EthereumNodeClient;
  name: string;
}

const LoggingDetails: React.FC<Props> = ({
  name,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  children,
  client,
  ...rest
}) => {
  const { mutate } = useNode(name);
  const [submitSuccess, setSubmitSuccess] = useState('');
  const {
    handleSubmit,
    control,
    reset,
    setError,
    formState: { isDirty, isSubmitting, isValid },
  } = useForm<LoggingInterface>({
    defaultValues: rest,
  });

  useEffect(() => {
    const websocket = new WebSocket(
      'ws://localhost:5000/api/v1/ethereum/nodes/my-node-1/logs'
    );
    websocket.onopen = () => {
      console.log('connected');
    };

    websocket.onmessage = (event) => {
      console.log(event.data);
    };
  }, []);

  const onSubmit: SubmitHandler<LoggingInterface> = async (values) => {
    setSubmitSuccess('');
    try {
      const node = await updateEthereumNode(name, values);
      void mutate({ node });
      reset(values);
      setSubmitSuccess('Logging data has been updated');
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const error = handleAxiosError<ServerError>(e);
        setError('logging', {
          type: 'server',
          message: error.response?.data.error,
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="px-4 py-5 sm:p-6">
        {/* Logging */}

        <div className="max-w-xs">
          <Controller
            control={control}
            name="logging"
            render={({ field }) => (
              <Select
                label="Verbosity Levels"
                options={loggingOptions(client)}
                placeholder="Choose a logging level..."
                value={field.value}
                onChange={field.onChange}
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

export default LoggingDetails;
