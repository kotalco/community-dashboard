import { useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { mutate } from 'swr'

import Button from '@components/atoms/Button/Button'
import { updateBeaconNode } from '@utils/requests/ethereum2/beaconNodes'
import { updateAPISchema } from '@schemas/ethereum2/beaconNode/updateBeaconNode'
import {
  Ethereum2BeaconNode,
  MutableEthereum2BeaconNode,
} from '@interfaces/ethereum2/beaconNode/Ethereum2BeaconNode'
import Checkbox from '@components/molecules/CheckBox/CheckBox'
import TextInput from '@components/molecules/TextInput/TextInput'
import Separator from '@components/atoms/Separator/Separator'
import Toggle from '@components/molecules/Toggle/Toggle'

interface Props {
  beaconnode: Ethereum2BeaconNode
}

const BeaconNodeProtocolTab: React.FC<Props> = ({ beaconnode }) => {
  const [submitError, setSubmitError] = useState('')
  const [submitSuccess, setSubmitSuccess] = useState('')
  const {
    name,
    rest,
    restHost,
    restPort,
    rpc,
    rpcHost,
    rpcPort,
    grpc,
    grpcHost,
    grpcPort,
  } = beaconnode
  const defaultValues = {
    rest,
    restHost: restHost || '0.0.0.0',
    restPort: restPort || 5051,
    rpc,
    rpcHost: rpcHost || '0.0.0.0',
    rpcPort: rpcPort || 4000,
    grpc,
    grpcHost: grpcHost || '0.0.0.0',
    grpcPort: grpcPort || 3500,
  }

  const {
    reset,
    register,
    handleSubmit,
    control,
    formState: { isDirty, isSubmitting },
  } = useForm<MutableEthereum2BeaconNode>({
    defaultValues,
    resolver: joiResolver(updateAPISchema),
  })

  const [restState, rpcState, grpcState] = useWatch({
    control,
    name: ['rest', 'rpc', 'grpc'],
  })

  const onSubmit = handleSubmit(async (values) => {
    setSubmitError('')
    setSubmitSuccess('')
    try {
      const beaconnode = await updateBeaconNode(name, values)
      mutate(name, beaconnode)
      reset({ ...beaconnode })
      setSubmitSuccess('Beacon node has been updated')
    } catch (e) {
      setSubmitError(e.response.data.error)
    }
  })

  return (
    <>
      <div className="px-4 py-5 sm:p-6">
        {/* REST API */}
        <Toggle label="Enable REST API Server" {...register('rest')} />
        <div className="mt-4">
          <TextInput
            disabled={!restState}
            label="REST API Server Port"
            className="rounded-md"
            {...register('restPort')}
          />
        </div>
        <div className="mt-4">
          <TextInput
            disabled={!restState}
            label="REST API Server Host"
            className="rounded-md"
            {...register('restHost')}
          />
        </div>

        <Separator />

        {/* JSON-RPC Server */}
        <Toggle label="Enable JSON-RPC Server" {...register('rpc')} />
        <div className="mt-4">
          <TextInput
            disabled={!rpcState}
            label="JSON-RPC Server Port"
            className="rounded-md"
            {...register('rpcPort')}
          />
        </div>
        <div className="mt-4">
          <TextInput
            disabled={!rpcState}
            label="JSON-RPC Server Host"
            className="rounded-md"
            {...register('rpcHost')}
          />
        </div>

        <Separator />

        {/* GRPC Gateway Server */}
        <Toggle label="Enable GRPC Gateway Server" {...register('grpc')} />
        <div className="mt-4">
          <TextInput
            disabled={!grpcState}
            label="GRPC Gateway Server Port"
            className="rounded-md"
            {...register('grpcPort')}
          />
        </div>
        <div className="mt-4">
          <TextInput
            disabled={!grpcState}
            label="GRPC Gateway Server Host"
            className="rounded-md"
            {...register('grpcHost')}
          />
        </div>
      </div>

      <div className="flex space-x-2 space-x-reverse flex-row-reverse items-center px-4 py-3 bg-gray-50 sm:px-6">
        <Button
          className="btn btn-primary"
          disabled={!isDirty || isSubmitting}
          loading={isSubmitting}
          onClick={onSubmit}
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

export default BeaconNodeProtocolTab
