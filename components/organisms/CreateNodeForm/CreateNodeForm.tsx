import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'

import TextInput from '@components/molecules/TextInput/TextInput'
import Select from '@components/molecules/Select/Select'
import Button from '@components/atoms/Button/Button'
import {
  protocolSelectOptions,
  ethereumNodeClientsOptions,
  ethereumNodeNetworkOptions,
} from '@data/data'
import { Protocol } from '@enums/Protocol'
import { createNode } from '@utils/requests'

export type FormData = {
  name: string
  protocol: string
  client: string
  selectNetwork: string
  textNetwork: string
}

const CreateNodeForm: React.FC = () => {
  const [submitError, setSubmitError] = useState('')
  const router = useRouter()
  const {
    register,
    watch,
    formState: { errors, isSubmitted, isValid, isSubmitting },
    handleSubmit,
  } = useForm<FormData>()
  const [protocol, selectNetwork] = watch(['protocol', 'selectNetwork'])

  const onSubmit = async ({
    name,
    protocol,
    client,
    selectNetwork,
    textNetwork,
  }: FormData) => {
    const network = selectNetwork === 'other' ? textNetwork : selectNetwork

    const body = { name, client, network }

    try {
      setSubmitError('')
      const node = await createNode(protocol, body)
      localStorage.setItem('node', JSON.stringify(node))
      router.push('/')
    } catch (e) {
      setSubmitError(e.response.data.error)
    }
  }

  return (
    <form>
      <div className="px-4 py-5 sm:p-6">
        {/* Node Name */}
        <TextInput
          {...register('name', { required: 'Please provide a node name' })}
          label="Node Name"
          error={errors.name?.message}
        />

        {/* Blockchain Protocol */}
        <Select
          label="Blockchain Protocol"
          error={errors.protocol?.message}
          options={[
            { label: 'Choose a protocol...', value: '' },
            ...protocolSelectOptions,
          ]}
          {...register('protocol', { required: 'Please choose a protocol' })}
        />

        {/* Ask for CLIENT and NETWORK in case of PROTOCOL is ETHEREUM */}
        {protocol === Protocol.ethereum && (
          <>
            {/* Client */}
            <Select
              label="Client"
              error={errors.client?.message}
              options={[
                { label: 'Choose a client...', value: '' },
                ...ethereumNodeClientsOptions,
              ]}
              {...register('client', { required: 'Please choose a protocol' })}
            />
            {/* Network */}
            <Select
              label="Network"
              rounded={
                selectNetwork === 'other' ? 'rounded-none rounded-t-md' : ''
              }
              options={[
                { label: 'Choose a network...', value: '' },
                ...ethereumNodeNetworkOptions,
                { label: 'Other', value: 'other' },
              ]}
              {...register('selectNetwork')}
            />
            {selectNetwork === 'other' && (
              <TextInput
                placeholder="Network Name"
                rounded="rounded-none rounded-b-md"
                {...register('textNetwork')}
              />
            )}

            {/* Show if there is an error from server */}
            {submitError && (
              <p className="text-center text-red-500 my-5">{submitError}</p>
            )}
          </>
        )}
      </div>

      {/* <!-- end: content here --> */}
      <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
        <Button
          disabled={(isSubmitted && !isValid) || isSubmitting}
          onClick={handleSubmit(onSubmit)}
          loading={isSubmitting}
        >
          Create
        </Button>
      </div>
    </form>
  )
}

export default CreateNodeForm
