import { useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import axios from 'axios';

import Button from '@components/atoms/Button/Button';
import {
  updateBeaconNode,
  useBeaconnode,
} from '@utils/requests/ethereum2/beaconNodes';
import { updateResourcesSchema } from '@schemas/ethereum2/beaconNode/updateBeaconNode';
import { Ethereum2BeaconNode } from '@interfaces/ethereum2/Ethereum2BeaconNode';
import UnitTextInput from '@components/molecules/UnitTextInput/UnitTextInput';
import { handleAxiosError } from '@utils/axios';
import { ServerError } from '@interfaces/ServerError';

interface Props {
  beaconnode: Ethereum2BeaconNode;
}

interface FormData {
  cpu: string;
  cpuLimit: string;
  memory: string;
  memoryLimit: string;
  storage: string;
}

const unitOptions = [
  { label: 'Megabytes', value: 'Mi' },
  { label: 'Gegabytes', value: 'Gi' },
  { label: 'Terabytes', value: 'Ti' },
];

const BeaconNodeResourcesTab: React.FC<Props> = ({ beaconnode }) => {
  const { mutate } = useBeaconnode(beaconnode.name);
  const [submitError, setSubmitError] = useState<string | undefined>('');
  const [submitSuccess, setSubmitSuccess] = useState('');
  const { cpu, cpuLimit, memory, memoryLimit, storage, name } = beaconnode;
  const defaultValues = { cpu, cpuLimit, memory, memoryLimit, storage };

  const {
    reset,
    handleSubmit,
    control,
    formState: { isDirty, isSubmitting, errors },
  } = useForm<FormData>({
    defaultValues,
    resolver: joiResolver(updateResourcesSchema),
  });

  const onSubmit: SubmitHandler<FormData> = async (values) => {
    setSubmitError('');
    setSubmitSuccess('');

    try {
      const beaconnode = await updateBeaconNode(name, values);
      void mutate({ beaconnode });
      const { cpu, cpuLimit, memory, memoryLimit, storage } = beaconnode;
      reset({ cpu, cpuLimit, memory, memoryLimit, storage });
      setSubmitSuccess('Beacon node has been updated');
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const error = handleAxiosError<ServerError>(e);
        setSubmitError(error.response?.data.error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="px-4 py-5 sm:p-6">
        <Controller
          name="cpu"
          control={control}
          render={({ field }) => (
            <UnitTextInput
              label="CPU Cores Required"
              unit="Core(s)"
              error={errors.cpu?.message}
              {...field}
            />
          )}
        />

        <Controller
          name="cpuLimit"
          control={control}
          render={({ field }) => (
            <UnitTextInput
              label="Maximum CPU Cores"
              unit="Core(s)"
              error={errors.cpuLimit?.message}
              {...field}
            />
          )}
        />

        <Controller
          name="memory"
          control={control}
          render={({ field }) => (
            <UnitTextInput
              label="Memory Required"
              unit={unitOptions}
              error={errors.memory?.message}
              {...field}
            />
          )}
        />

        <Controller
          name="memoryLimit"
          control={control}
          render={({ field }) => (
            <UnitTextInput
              label="Max Memory"
              unit={unitOptions}
              error={errors.memoryLimit?.message}
              {...field}
            />
          )}
        />

        <Controller
          name="storage"
          control={control}
          render={({ field }) => (
            <UnitTextInput
              label="Disk Space Required"
              unit={unitOptions}
              error={errors.storage?.message}
              {...field}
            />
          )}
        />
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

export default BeaconNodeResourcesTab;