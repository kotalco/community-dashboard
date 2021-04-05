import React from 'react'
import { useForm } from 'react-hook-form'

import TextInput from '@components/molecules/TextInput/TextInput'
import Select from '@components/molecules/Select/Select'
import { protocolSelectOptions } from '@data/data'
import { Protocol } from '@enums/Protocol'
import CreateEthereumNodeForm from '../CreateEthereumNodeForm/CreateEthereumNodeForm'

export type FormData = {
  name: string
  protocol: string
}

const defaultValues = {
  protocol: Protocol.ethereum,
}

const CreateNodeForm: React.FC = () => {
  const { register, watch, formState } = useForm<FormData>({
    mode: 'onTouched',
    defaultValues,
  })
  const [protocol, name] = watch(['protocol', 'name'])

  return (
    <form>
      <div className="px-4 pt-6 sm:px-6">
        {/* Node Name */}
        <TextInput
          {...register('name', { required: 'Please provide a node name.' })}
          label="Node Name"
          error={formState.errors.name?.message}
        />

        {/* Blockchain Protocol */}
        <Select
          label="Blockchain Protocol"
          options={protocolSelectOptions}
          {...register('protocol')}
        />
      </div>

      {protocol === Protocol.ethereum && (
        <CreateEthereumNodeForm nodeName={name} />
      )}

      {/* <!-- end: content here --> */}
    </form>
  )
}

export default CreateNodeForm
