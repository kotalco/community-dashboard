import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { mutate } from 'swr'

import Button from '@components/atoms/Button/Button'
import Select from '@components/molecules/Select/Select'
import { clientOptions } from '@data/ethereum2/beaconNode/clientOptions'
import { updateBeaconNode } from '@utils/requests/ethereum2/beaconNodes'
import { updateClientSchema } from '@schemas/ethereum2/beaconNode/updateBeaconNode'
import {
  Ethereum2BeaconNode,
  MutableEthereum2BeaconNode,
} from '@interfaces/ethereum2/beaconNode/Ethereum2BeaconNode'
import UnitTextInput from '@components/molecules/UnitTextInput/UnitTextInput'
import { SelectOption } from '@interfaces/SelectOption'

interface Props {
  beaconnode: Ethereum2BeaconNode
}

const unitOptions = [
  { label: 'Megabytes', value: 'Mi' },
  { label: 'Gegabytes', value: 'Gi' },
  { label: 'Terabytes', value: 'Ti' },
]

const BeaconNodeResourcesTab: React.FC<Props> = ({ beaconnode }) => {
  const [submitError, setSubmitError] = useState('')
  const [submitSuccess, setSubmitSuccess] = useState('')
  const { cpu, cpuLimit, memory, memoryLimit, storage } = beaconnode
  const defaultValues = { cpu, cpuLimit, memory, memoryLimit, storage }

  const {
    reset,
    register,
    handleSubmit,
    formState: { isDirty, isSubmitting },
  } = useForm<MutableEthereum2BeaconNode>({
    defaultValues,
    // resolver: joiResolver(updateClientSchema),
  })

  const onSubmit = handleSubmit(async (values) => {
    setSubmitError('')
    setSubmitSuccess('')
    console.log(values)
    // try {
    //   const beaconnode = await updateBeaconNode(name, values)
    //   mutate(name, beaconnode)
    //   reset({ client: beaconnode.client })
    //   setSubmitSuccess('Beacon node has been updated')
    // } catch (e) {
    //   setSubmitError(e.response.data.error)
    // }
  })

  console.log(memory.match(/(\d+|[^\d]+)/g))
  console.log(memoryLimit.match(/(\d+|[^\d]+)/g))
  console.log(storage.match(/(\d+|[^\d]+)/g))

  return (
    <>
      <div className="px-4 py-5 sm:p-6">
        <UnitTextInput
          label="CPU Cores Required"
          unit="Core(s)"
          {...register('cpu')}
        />
        <UnitTextInput
          label="Maximum CPU Cores"
          unit="Core(s)"
          {...register('cpuLimit')}
        />
        <UnitTextInput
          label="Memory Required"
          unit={unitOptions}
          {...register('memory')}
        />
        <UnitTextInput
          label="Max Memory"
          unit={unitOptions}
          {...register('memoryLimit')}
        />
        <UnitTextInput
          label="Disk Space Required"
          unit={unitOptions}
          {...register('storage')}
        />
      </div>

      <div className="flex space-x-2 space-x-reverse flex-row-reverse items-center px-4 py-3 bg-gray-50 sm:px-6">
        <Button
          className="btn btn-primary"
          // disabled={!isDirty || isSubmitting}
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
