import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';

import Button from '@components/atoms/Button/Button';
import UnitTextInput from '@components/molecules/UnitTextInput/UnitTextInput';
import { updateResourcesSchema } from '@schemas/ethereum2/beaconNode/updateBeaconNode';
import { Resources } from '@interfaces/Resources';
import { handleRequest } from '@utils/helpers/handleRequest';
import ErrorSummary from '@components/templates/ErrorSummary/ErrorSummary';

interface Props extends Resources {
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
  const defaultValues = { cpu, cpuLimit, memory, memoryLimit, storage };

  const {
    reset,
    handleSubmit,
    control,
    setError,
    clearErrors,
    formState: {
      isSubmitting,
      errors,
      isSubmitted,
      isValid,
      isSubmitSuccessful,
      isDirty,
    },
  } = useForm<Resources>({
    defaultValues,
    resolver: joiResolver(updateResourcesSchema),
  });

  const onSubmit: SubmitHandler<Resources> = async (values) => {
    const { error } = await handleRequest(
      () => updateResources(name, values),
      setError
    );

    if (error) return;

    reset(values);
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
              unit={parseInt(field.value) === 1 ? 'Core' : 'Cores'}
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
              unit={parseInt(field.value) === 1 ? 'Core' : 'Cores'}
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
              unit={unitOptions(parseInt(field.value))}
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
              unit={unitOptions(parseInt(field.value))}
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
              unit={unitOptions(parseInt(field.value))}
              error={errors.storage?.message}
              {...field}
            />
          )}
        />

        <ErrorSummary
          errors={errors}
          isSuccess={isSubmitSuccessful}
          successMessage="Your resources updated successfully"
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
};

export default ResourcesTab;
