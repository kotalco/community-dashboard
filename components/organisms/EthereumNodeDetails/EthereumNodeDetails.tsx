import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { mutate } from 'swr'

import Button from '@components/atoms/Button/Button'
import Select from '@components/molecules/Select/Select'
import { EthereumNode } from '@interfaces/EthereumNode'
import { clientOptions } from '@data/ethereum/node/clientOptions'
import { updateEthereumNode } from '@utils/requests/ethereumNodeRequests'
import { NodeClient } from '@enums/Ethereum/NodeClient'

interface Props {
  node: EthereumNode
}

const EthereumNodeDetails: React.FC<Props> = ({ node }) => {
  const [submitError, setSubmitError] = useState('')
  const [submitSuccess, setSubmitSuccess] = useState('')

  const {
    reset,
    register,
    handleSubmit,
    formState: { isDirty, isSubmitting },
  } = useForm({
    defaultValues: { client: node.client },
  })

  const onSubmit = async (data: { client: NodeClient }) => {
    setSubmitError('')
    setSubmitSuccess('')
    try {
      mutate(node.name, { ...node, client: data.client }, false)
      mutate(node.name, updateEthereumNode(node.name, data))
      reset({ client: data.client })
      setSubmitSuccess('Node has been updated')
    } catch (e) {
      setSubmitError(e.response.data.error)
    }
  }

  return (
    <>
      <div className="px-4 py-5 sm:p-6">
        <dl>
          <dt className="block text-sm font-medium text-gray-700">Protocol</dt>
          <dd className="mt-1">
            <span className="text-gray-500 text-sm">Ethereum</span>
          </dd>
        </dl>
        <dl>
          <dt className="block text-sm font-medium text-gray-700 mt-4">
            Chain
          </dt>
          <dd className="mt-1">
            <span className="text-gray-500 text-sm">{node.network}</span>
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

export default EthereumNodeDetails
