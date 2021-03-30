import { useState } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

import { useAppDispatch, useAppSelector } from '@hooks/hooks'
import Button from '@components/atoms/Button/Button'
import Select from '@components/molecules/Select/Select'
import { EthereumNode } from '@interfaces/Node'
import { ethereumNodeClientsOptions } from '@data/data'
import { Protocol } from '@enums/Protocol'
import { updateNode } from '@utils/requests'
import { setLaodingState } from '@store/slices/loadingSlice/loadingSlice'

interface Props {
  node: EthereumNode
}

const ProtocolTabContent: React.FC<Props> = ({ node }) => {
  const [submitError, setSubmitError] = useState('')
  const router = useRouter()
  const dispatch = useAppDispatch()
  const loadingState = useAppSelector(({ loading }) => loading.state)
  const { register, handleSubmit } = useForm()
  const { protocol } = router.query
  const clients =
    protocol === Protocol.ethereum ? ethereumNodeClientsOptions : []

  const onSubmit = async (data: { client: string }) => {
    setSubmitError('')
    dispatch(setLaodingState(true))
    try {
      await updateNode(data, node.name, protocol as string)
    } catch (e) {
      setSubmitError(e.response.data.error)
    }
    dispatch(setLaodingState(false))
  }

  return (
    <>
      <div className="px-4 py-5 sm:p-6">
        <dl>
          <dt className="block text-sm font-medium text-gray-700">Protocol</dt>
          <dd className="mt-1">
            <span className="text-gray-500 text-sm">{protocol}</span>
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
            ref={register}
            options={clients}
            defaultValue={node.client}
            name="client"
            label="Client Software"
          />
        </div>
      </div>
      {submitError && (
        <p className="text-center text-red-500 mb-5">{submitError}</p>
      )}
      <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
        <Button
          disabled={loadingState}
          loading={loadingState}
          onClick={handleSubmit(onSubmit)}
        >
          Save
        </Button>
      </div>
    </>
  )
}

export default ProtocolTabContent
