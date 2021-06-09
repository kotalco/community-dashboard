import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { mutate } from 'swr'

import Button from '@components/atoms/Button/Button'
import { updateBeaconNode } from '@utils/requests/ethereum2/beaconNodes'
import { Ethereum2BeaconNode } from '@interfaces/ethereum2/Ethereum2BeaconNode'
import Textarea from '@components/molecules/Textarea/Textarea'

interface Props {
  beaconnode: Ethereum2BeaconNode
}

const BeaconNodeEthereumTab: React.FC<Props> = ({ beaconnode }) => {
  const [submitError, setSubmitError] = useState('')
  const [submitSuccess, setSubmitSuccess] = useState('')
  const { name, eth1Endpoints } = beaconnode

  const {
    reset,
    handleSubmit,
    control,
    formState: { isDirty, isSubmitting },
  } = useForm<{ eth1Endpoints: string[] }>({
    defaultValues: { eth1Endpoints },
  })

  const onSubmit = handleSubmit(async (values) => {
    setSubmitError('')
    setSubmitSuccess('')

    try {
      const beaconnode = await updateBeaconNode(name, values)
      mutate(name, beaconnode)
      reset({ eth1Endpoints: beaconnode.eth1Endpoints })
      setSubmitSuccess('Beacon node has been updated')
    } catch (e) {
      setSubmitError(e.response.data.error)
    }
  })

  return (
    <>
      <div className="px-4 py-5 sm:p-6">
        <Controller
          name="eth1Endpoints"
          control={control}
          render={({ field }) => (
            <Textarea
              label="Ethereum Node JSON-RPC Endpoints"
              helperText="One endpoint per each line"
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

export default BeaconNodeEthereumTab
