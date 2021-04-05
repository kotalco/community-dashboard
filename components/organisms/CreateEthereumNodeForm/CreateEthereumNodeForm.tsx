import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'

import Select from '@components/molecules/Select/Select'
import TextInput from '@components/molecules/TextInput/TextInput'
import Button from '@components/atoms/Button/Button'
import { createNode } from '@utils/requests'
import {
  ethereumNodeClientsOptions,
  ethereumNodeNetworkOptions,
} from '@data/data'

type FormData = {
  client: string
  selectNetwork: string
  textNetwork: string
}

interface Props {
  nodeName: string
}

const CreateEthereumNodeForm: React.FC<Props> = ({ nodeName }) => {
  const [submitError, setSubmitError] = useState('')
  const router = useRouter()
  const { register, handleSubmit, watch } = useForm<FormData>()
  const [selectNetwork] = watch(['selectNetwork'])

  const onSubmit = async ({ client, selectNetwork, textNetwork }: FormData) => {
    if (!nodeName) return
    const network = textNetwork ? textNetwork : selectNetwork

    const body = { name: nodeName, client, network }

    try {
      setSubmitError('')
      const node = await createNode('ethereum', body)
      localStorage.setItem('node', JSON.stringify(node))
      router.push('/')
    } catch (e) {
      setSubmitError(e.response.data.error)
    }
  }

  return (
    <>
      <div className="px-4 sm:px-6">
        {/* Client */}
        <Select
          label="Client"
          options={ethereumNodeClientsOptions}
          {...register('client')}
        />
        {/* Network */}
        <Select
          label="Network"
          rounded="rounded-none rounded-t-md"
          options={[
            ...ethereumNodeNetworkOptions,
            { label: 'Other', value: '' },
          ]}
          {...register('selectNetwork')}
        />
        <TextInput
          rounded="rounded-none rounded-b-md"
          {...register('textNetwork')}
          // error={formState.errors.network?.message}
          disabled={selectNetwork !== ''}
        />

        {submitError && (
          <p className="text-center text-red-500 my-5">{submitError}</p>
        )}
      </div>
      <div className="px-4 py-3 mt-6 bg-gray-50 text-right sm:px-6">
        <Button onClick={handleSubmit(onSubmit)}>Create</Button>
      </div>
    </>
  )
}

export default CreateEthereumNodeForm
