import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

import TextInput from '@components/molecules/TextInput/TextInput'
import Select from '@components/molecules/Select/Select'
import Button from '@components/atoms/Button/Button'
import { protocolSelectOptions, ethereumNodeClientsOptions } from '@data/data'
import { Protocol } from '@enums/Protocol'
import { createNode } from '@utils/requests'

type FormData = {
  name: string
  protocol: string
  network: string
  client: string
}

const defaultValues = {
  protocol: Protocol.ethereum,
}

const CreateNodeForm: React.FC = () => {
  const [submitError, setSubmitError] = useState('')
  const router = useRouter()
  const { register, handleSubmit, watch, formState } = useForm<FormData>({
    defaultValues,
  })
  const { protocol } = watch(['protocol'])

  const onSubmit = async (data: FormData) => {
    const { name, protocol, network, client } = data
    const body = { name, network, client }

    try {
      setSubmitError('')
      await createNode(protocol, body)
      router.push('/')
    } catch (e) {
      setSubmitError(e.response.data.error)
    }
  }
  return (
    <form>
      <div>
        <div className="px-4 py-5 sm:p-6">
          {/* Node Name */}
          <TextInput
            name="name"
            label="Node Name"
            ref={register({ required: 'Please provide a node name.' })}
            error={formState.errors.name?.message}
          />

          {/* Blockchain Protocol */}
          <Select
            label="Blockchain Protocol"
            options={protocolSelectOptions}
            name="protocol"
            ref={register}
          />

          {protocol === Protocol.ethereum && (
            <>
              {/* Client */}
              <Select
                label="Client"
                options={ethereumNodeClientsOptions}
                name="client"
                ref={register}
              />
              {/* Network */}
              <TextInput
                className="mt-5"
                name="network"
                label="Network"
                ref={register({ required: 'Please provide a network name.' })}
                error={formState.errors.network?.message}
              />
            </>
          )}

          {/* Show Advanced Setting */}
          {/* <div
            className={`block mt-4 text-red-500 cursor-pointer hover:text-red-600 ${
              showAdvanced ? 'hidden' : ''
            }`}
            onClick={() => setShowAdvanced(true)}
          >
            Show Advanced Settings
            <Typography variant="p" className="text-black">
              I know what I am doing
            </Typography>
          </div> */}

          {/* <CreateIPFSNodeForm showAdvanced={showAdvanced} /> */}

          {/* <!-- end: content here --> */}
        </div>
        {submitError && (
          <p className="text-center text-red-500 mb-5">{submitError}</p>
        )}
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <Button onClick={handleSubmit(onSubmit)}>Create</Button>
        </div>
      </div>
    </form>
  )
}

export default CreateNodeForm
