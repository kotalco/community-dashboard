import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { mutate } from 'swr'

import Button from '@components/atoms/Button/Button'
import Select from '@components/molecules/Select/Select'
import { clientOptions } from '@data/ethereum2/beaconNode/clientOptions'
import { updateBeaconNode } from '@utils/requests/ethereum2/beaconNodes'
import { BeaconNodeClient } from '@enums/Ethereum2/BeaconNodeClient'
import { updateClientSchema } from '@schemas/ethereum2/beaconNode/updateBeaconNode'

interface Props {
  client: BeaconNodeClient
  network: string
  nodeName: string
}

type FormData = {
  client: BeaconNodeClient
}

const BeaconNodeProtocolTab: React.FC<Props> = ({
  client,
  network,
  nodeName,
}) => {
  const [submitError, setSubmitError] = useState('')
  const [submitSuccess, setSubmitSuccess] = useState('')

  const {
    reset,
    register,
    handleSubmit,
    formState: { isDirty, isSubmitting },
  } = useForm<FormData>({
    defaultValues: { client },
    resolver: joiResolver(updateClientSchema),
  })

  const onSubmit = handleSubmit(async (values) => {
    setSubmitError('')
    setSubmitSuccess('')
    try {
      const beaconnode = await updateBeaconNode(nodeName, values)
      mutate(nodeName, beaconnode)
      reset({ client: beaconnode.client })
      setSubmitSuccess('Beacon node has been updated')
    } catch (e) {
      setSubmitError(e.response.data.error)
    }
  })

  return (
    <>
      <div className="px-4 py-5 sm:p-6">
        <dl>
          <dt className="block text-sm font-medium text-gray-700">Protocol</dt>
          <dd className="mt-1">
            <span className="text-gray-500 text-sm">Ethereum 2.0</span>
          </dd>
        </dl>
        <dl>
          <dt className="block text-sm font-medium text-gray-700 mt-4">
            Chain
          </dt>
          <dd className="mt-1">
            <span className="text-gray-500 text-sm">{network}</span>
          </dd>
        </dl>
        <div className="mt-4">
          <Select
            className="rounded-md"
            options={clientOptions}
            {...register('client')}
            label="Client Software"
          />
        </div>
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

export default BeaconNodeProtocolTab
