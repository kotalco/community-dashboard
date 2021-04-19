import { useState } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import useSWR, { mutate } from 'swr'

import { useAppDispatch } from '@hooks/hooks'
import Button from '@components/atoms/Button/Button'
import Select from '@components/molecules/Select/Select'
import { EthereumNode } from '@interfaces/Node'
import { ethereumNodeClientsOptions } from '@data/data'
import { updateNode, getNode } from '@utils/requests'
import { setNotificationState } from '@store/slices/notificationSlice/notificationSlice'

interface Props {
  node: EthereumNode
}

const ProtocolTabContent: React.FC<Props> = ({ node }) => {
  const [submitError, setSubmitError] = useState('')
  const router = useRouter()
  const dispatch = useAppDispatch()

  const { protocol, nodeName } = router.query
  const { data } = useSWR([protocol, nodeName], getNode, {
    initialData: node,
  })

  const {
    register,
    handleSubmit,
    formState: { isDirty, isSubmitting },
  } = useForm({
    defaultValues: { client: data?.client },
  })

  const onSubmit = async (data: { client: string }) => {
    setSubmitError('')
    try {
      mutate([protocol, nodeName], { ...node, client: data.client }, false)
      mutate(
        [protocol, nodeName],
        updateNode(data, node.name, protocol as string)
      )

      dispatch(setNotificationState(true))
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
            options={ethereumNodeClientsOptions}
            {...register('client')}
            label="Client Software"
          />
        </div>
      </div>
      {submitError && (
        <p className="text-center text-red-500 mb-5">{submitError}</p>
      )}
      <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
        <Button
          className="btn btn-primary"
          disabled={!isDirty || isSubmitting}
          loading={isSubmitting}
          onClick={handleSubmit(onSubmit)}
        >
          Save
        </Button>
      </div>
    </>
  )
}

export default ProtocolTabContent
