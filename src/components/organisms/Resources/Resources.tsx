import { useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import axios from 'axios';

import Button from '@components/atoms/Button/Button';
import { updateResourcesSchema } from '@schemas/ethereum2/beaconNode/updateBeaconNode';
import UnitTextInput from '@components/molecules/UnitTextInput/UnitTextInput';
import { handleAxiosError } from '@utils/axios';
import { ServerError } from '@interfaces/ServerError';
import { Resources } from '@interfaces/Resources';

interface Props {
  cpu: string;
  cpuLimit: string;
  storage: string;
  memory: string;
  memoryLimit: string;
  name: string;
  updateResources: (name: string, values: Resources) => Promise<void>;
}

const unitOptions = (value: number) => [
  { label: value === 1 ? 'Megabyte' : 'Megabytes', value: 'Mi' },
  { label: value === 1 ? 'Gegabyte' : 'Gegabytes', value: 'Gi' },
  { label: value === 1 ? 'Terabyte' : 'Terabytes', value: 'Ti' },
];

const ResourcesTab: React.FC<Props> = ({
  cpu,
  cpuLimit,
  memory,
  memoryLimit,
  storage,
  name,
  updateResources,
}) => {
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
      await updateResources(name, values);
      reset(values);
      setSubmitSuccess('Resources has been updated');
    } catch (e) {
      // if (axios.isAxiosError(e)) {
      //   const error = handleAxiosError<ServerError>(e);
      //   setSubmitError(
      //     error.response?.data.error || 'Something wrong happened'
      //   );
      // }
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
                unit={parseInt(field.value) === 1 ? 'Core' : 'Cores'}
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
                unit={parseInt(field.value) === 1 ? 'Core' : 'Cores'}
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
                unit={unitOptions(parseInt(field.value))}
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
                unit={unitOptions(parseInt(field.value))}
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
                unit={unitOptions(parseInt(field.value))}
                error={errors.storage?.message}
                {...field}
              />
            )}
          />
        </div>
      </div>

      <div className="flex flex-row-reverse items-center px-4 py-3 space-x-2 space-x-reverse bg-gray-50 sm:px-6">
        <Button
          type="submit"
          className="btn btn-primary"
          disabled={!isDirty || isSubmitting}
          loading={isSubmitting}
        >
          Save
        </Button>
        {submitError && (
          <p className="mb-5 text-center text-red-500">{submitError}</p>
        )}
        {submitSuccess && <p>{submitSuccess}</p>}
      </div>
    </form>
  );
};

export default ResourcesTab;
