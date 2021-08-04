import { useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import axios from 'axios';

import Button from '@components/atoms/Button/Button';
import { updateResourcesSchema } from '@schemas/ethereum2/beaconNode/updateBeaconNode';
import UnitTextInput from '@components/molecules/UnitTextInput/UnitTextInput';
import { handleAxiosError } from '@utils/axios';
import { ServerError } from '@interfaces/ServerError';
import {
  updateClusterPeer,
  useClusterPeer,
} from '@utils/requests/ipfs/clusterPeers';
import { Resources } from '@interfaces/Resources';

interface Props {
  cpu: string;
  cpuLimit: string;
  storage: string;
  memory: string;
  memoryLimit: string;
  name: string;
}

const unitOptions = [
  { label: 'Megabytes', value: 'Mi' },
  { label: 'Gegabytes', value: 'Gi' },
  { label: 'Terabytes', value: 'Ti' },
];

const ResourcesTab: React.FC<Props> = ({
  cpu,
  cpuLimit,
  memory,
  memoryLimit,
  storage,
  name,
}) => {
  const { mutate } = useClusterPeer(name);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');
  const defaultValues = { cpu, cpuLimit, memory, memoryLimit, storage };

  const {
    reset,
    handleSubmit,
    control,
    formState: { isDirty, isSubmitting, errors },
  } = useForm<Resources>({
    defaultValues,
    resolver: joiResolver(updateResourcesSchema),
  });

  const onSubmit: SubmitHandler<Resources> = async (values) => {
    setSubmitError('');
    setSubmitSuccess('');

    try {
      const clusterpeer = await updateClusterPeer(name, values);
      void mutate({ clusterpeer });
      reset(values);
      setSubmitSuccess('Cluster peer has been updated');
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const error = handleAxiosError<ServerError>(e);
        setSubmitError(
          error.response?.data.error || 'Something wrong happened'
        );
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="px-4 py-5 sm:p-6">
        <div className="max-w-xs">
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
        </div>
        <div className="max-w-xs mt-4">
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
        </div>
        <div className="max-w-xs mt-4">
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
        </div>
        <div className="max-w-xs mt-4">
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
        </div>
        <div className="max-w-xs mt-4">
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

export default ResourcesTab;
