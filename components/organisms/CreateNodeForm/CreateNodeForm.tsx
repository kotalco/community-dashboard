import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { joiResolver } from '@hookform/resolvers/joi'

import TextInput from '@components/molecules/TextInput/TextInput'
import Select from '@components/molecules/Select/Select'
import Button from '@components/atoms/Button/Button'
import {
  ethereumNodeClientsOptions,
  ethereumNodeNetworkOptions,
} from '@data/data'
import { createEthereumNode } from '@utils/requests'
import { schema } from '@schemas/createNode'

export type FormData = {
  name: string
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
  } = useForm<FormData>({ resolver: joiResolver(schema) })
  const [selectNetwork] = watch(['selectNetwork'])

  /**
   * Submit create ethereum node form
   * @param nodeData the data required to create new node
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
      const node = await createEthereumNode(body)
      localStorage.setItem('node', JSON.stringify(node))
      router.push('/deployments/ethereum/nodes')
    } catch (e) {
      setSubmitError(e.response.data.error)
    }
  }

  return (
    <form>
      <div className="px-4 py-5 sm:p-6">
        {/* Node Name */}
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
            ...ethereumNodeClientsOptions,
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
            ...ethereumNodeNetworkOptions,
            { label: 'Other', value: 'other' },
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

export default CreateNodeForm
