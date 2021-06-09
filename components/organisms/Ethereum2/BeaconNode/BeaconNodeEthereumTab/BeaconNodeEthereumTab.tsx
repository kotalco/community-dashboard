import { useState } from 'react'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import { mutate } from 'swr'

import Button from '@components/atoms/Button/Button'
import { updateBeaconNode } from '@utils/requests/ethereum2/beaconNodes'
import { UpdateEth1Endpoints } from '@interfaces/ethereum2/Ethereum2BeaconNode'
import Textarea from '@components/molecules/Textarea/Textarea'
import { BeaconNodeClient } from '@enums/Ethereum2/BeaconNodeClient'
import TextInput from '@components/molecules/TextInput/TextInput'

interface Props {
  name: string
  client: BeaconNodeClient
  eth1Endpoints: string[]
}

const BeaconNodeEthereumTab: React.FC<Props> = ({
  name,
  client,
  eth1Endpoints,
}) => {
  const [submitError, setSubmitError] = useState('')
  const [submitSuccess, setSubmitSuccess] = useState('')

  const {
    reset,
    register,
    handleSubmit,
    control,
    formState: { isDirty, isSubmitting },
  } = useForm<UpdateEth1Endpoints>({
    defaultValues: { eth1Endpoints },
  })

  const onSubmit: SubmitHandler<UpdateEth1Endpoints> = async (values) => {
    // Convert values to empty array if empty string
    if (!values.eth1Endpoints) {
      values.eth1Endpoints = []
    }
    // Convert values to array
    if (typeof values.eth1Endpoints === 'string') {
      values.eth1Endpoints = [values.eth1Endpoints]
    }

    setSubmitError('')
    setSubmitSuccess('')

    try {
      const beaconnode = await updateBeaconNode(name, values)
      mutate(name, beaconnode)
      reset(values)
      setSubmitSuccess('Beacon node has been updated')
    } catch (e) {
      setSubmitError(e.response.data.error)
    }
  }

  return (
    <>
      <div className="px-4 py-5 sm:p-6">
        {client === BeaconNodeClient.nimbus ||
        client === BeaconNodeClient.teku ? (
          // Render Text input in case to Teku or Nimbus clients
          <TextInput
            fullWidth
            className="rounded-md"
            label="Ethereum Node JSON-RPC Endpoints"
            {...register('eth1Endpoints')}
          />
        ) : (
          // Render Textarea in case of any other client
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
        )}
      </div>

      <div className="flex space-x-2 space-x-reverse flex-row-reverse items-center px-4 py-3 bg-gray-50 sm:px-6">
        <Button
          className="btn btn-primary"
          disabled={!isDirty || isSubmitting}
          loading={isSubmitting}
          onClick={handleSubmit(onSubmit)}
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
