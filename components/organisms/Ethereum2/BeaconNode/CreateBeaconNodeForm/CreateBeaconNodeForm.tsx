import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { joiResolver } from '@hookform/resolvers/joi'

import TextInput from '@components/molecules/TextInput/TextInput'
import Select from '@components/molecules/Select/Select'
import Button from '@components/atoms/Button/Button'
import { useNotification } from '@components/contexts/NotificationContext'
import { clientOptions } from '@data/ethereum2/beaconNode/clientOptions'
import { networkOptions } from '@data/ethereum2/beaconNode/networkOption'
import { createBeaconNode } from '@utils/requests/ethereum2/beaconNodes'
import { schema } from '@schemas/ethereum2/beaconNode/createBeaconNode'
import { BeaconNodeClient } from '@enums/Ethereum2/BeaconNodeClient'

export interface FormData {
  name: string
  client: BeaconNodeClient
  selectNetwork: string
  textNetwork: string
}

const CreateBeaconNodeForm: React.FC = () => {
  const [submitError, setSubmitError] = useState('')
  const router = useRouter()
  const { createNotification } = useNotification()
  const {
    register,
    watch,
    formState: { errors, isSubmitted, isValid, isSubmitting },
    handleSubmit,
  } = useForm<FormData>({ resolver: joiResolver(schema) })
  const [selectNetwork] = watch(['selectNetwork'])

  /**
   * Submit create ethereum node form
   * @param BeaconNodeData the data required to create new node
   */
  const onSubmit = async ({
    name,
    client,
    selectNetwork,
    textNetwork,
  }: FormData) => {
    const network = selectNetwork === 'other' ? textNetwork : selectNetwork
    const body = { name, client, network }

    try {
      setSubmitError('')
      const beaconNode = await createBeaconNode(body)

      createNotification({
        title: 'Beacon node has been created',
        protocol: `Ethereum 2.0`,
        name: beaconNode.name,
        action:
          'created successfully, and will be up and running in few seconds.',
      })
      router.push('/deployments/ethereum2/beaconnodes')
    } catch (e) {
      setSubmitError(e.response.data.error)
    }
  }

  return (
    <form>
      <div className="px-4 py-5 sm:p-6">
        {/* Beacon Node Name */}
        <TextInput
          {...register('name')}
          label="Node Name"
          className="rounded-md"
          error={errors.name?.message}
        />

        {/* Client */}
        <Select
          label="Client"
          error={errors.client?.message}
          className="rounded-md"
          options={[
            { label: 'Choose a client...', value: '' },
            ...clientOptions,
          ]}
          {...register('client')}
        />
        {/* Network */}
        <Select
          label="Network"
          error={errors.selectNetwork?.message}
          className={selectNetwork === 'other' ? 'rounded-t-md' : 'rounded-md'}
          options={[
            { label: 'Choose a network...', value: '' },
            ...networkOptions,
          ]}
          {...register('selectNetwork')}
        />
        {selectNetwork === 'other' && (
          <TextInput
            error={errors.textNetwork?.message}
            placeholder="Network Name"
            className="rounded-none rounded-b-md"
            {...register('textNetwork')}
          />
        )}
      </div>

      {/* <!-- end: content here --> */}
      <div className="flex space-x-2 space-x-reverse flex-row-reverse items-center px-4 py-3 bg-gray-50 sm:px-6">
        <Button
          className="btn btn-primary"
          disabled={(isSubmitted && !isValid) || isSubmitting}
          onClick={handleSubmit(onSubmit)}
          loading={isSubmitting}
        >
          Create
        </Button>

        {/* Show if there is an error from server */}
        {submitError && (
          <p className="text-center text-red-500">{submitError}</p>
        )}
      </div>
    </form>
  )
}

export default CreateBeaconNodeForm
