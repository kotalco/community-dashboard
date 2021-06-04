import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { mutate } from 'swr'

import Button from '@components/atoms/Button/Button'
import { updateBeaconNode } from '@utils/requests/ethereum2/beaconNodes'
import { updateClientSchema } from '@schemas/ethereum2/beaconNode/updateBeaconNode'
import { Ethereum2BeaconNode } from '@interfaces/ethereum2/beaconNode/Ethereum2BeaconNode'
import UnitTextInput from '@components/molecules/UnitTextInput/UnitTextInput'

interface Props {
  beaconnode: Ethereum2BeaconNode
}

interface FormData {
  cpu: string
  cpuLimit: string
  memory: string
  memoryLimit: string
  storage: string
}

const unitOptions = [
  { label: 'Megabytes', value: 'Mi' },
  { label: 'Gegabytes', value: 'Gi' },
  { label: 'Terabytes', value: 'Ti' },
]

const BeaconNodeResourcesTab: React.FC<Props> = ({ beaconnode }) => {
  const [submitError, setSubmitError] = useState('')
  const [submitSuccess, setSubmitSuccess] = useState('')
  const { cpu, cpuLimit, memory, memoryLimit, storage, name } = beaconnode
  const defaultValues = { cpu, cpuLimit, memory, memoryLimit, storage }

  const {
    reset,
    handleSubmit,
    control,
    formState: { isDirty, isSubmitting },
  } = useForm<FormData>({
    defaultValues,
    // resolver: joiResolver(updateClientSchema),
  })

  const onSubmit = handleSubmit(async (values) => {
    setSubmitError('')
    setSubmitSuccess('')

    try {
      const beaconnode = await updateBeaconNode(name, values)
      mutate(name, beaconnode)
      reset({ ...beaconnode })
      setSubmitSuccess('Beacon node has been updated')
    } catch (e) {
      setSubmitError(e.response.data.error)
    }
  })

  return (
    <>
      <div className="px-4 py-5 sm:p-6">
        <Controller
          name="cpu"
          control={control}
          render={({ field }) => (
            <UnitTextInput
              label="CPU Cores Required"
              unit="Core(s)"
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
              {...field}
            />
          )}
        />

        <Controller
          name="memoryLimit"
          control={control}
          render={({ field }) => (
            <UnitTextInput label="Max Memory" unit={unitOptions} {...field} />
          )}
        />

        <Controller
          name="storage"
          control={control}
          render={({ field }) => (
            <UnitTextInput
              label="Disk Space Required"
              unit={unitOptions}
              {...field}
            />
          )}
        />
      </div>

      <div className="flex space-x-2 space-x-reverse flex-row-reverse items-center px-4 py-3 bg-gray-50 sm:px-6">
        <Button
          className="btn btn-primary"
          disabled={!isDirty || isSubmitting}
          loading={isSubmitting}
          onClick={onSubmit}
        >
          Save
        </Button>
        {submitError && (
          <p className="text-center text-red-500 mb-5">{submitError}</p>
        )}
        {submitSuccess && <p>{submitSuccess}</p>}
      </div>
    </>
  )
}

export default BeaconNodeResourcesTab
