import { useState } from 'react'
import { useForm, useWatch, Controller } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { mutate } from 'swr'

import Button from '@components/atoms/Button/Button'
import { updateBeaconNode } from '@utils/requests/ethereum2/beaconNodes'
import { updateAPISchema } from '@schemas/ethereum2/beaconNode/updateBeaconNode'
import { Ethereum2BeaconNode } from '@interfaces/ethereum2/beaconNode/Ethereum2BeaconNode'
import TextInput from '@components/molecules/TextInput/TextInput'
import Separator from '@components/atoms/Separator/Separator'
import Toggle from '@components/molecules/Toggle/Toggle'

interface Props {
  beaconnode: Ethereum2BeaconNode
}

interface FormData {
  rest: boolean
  restHost: string
  restPort: number
  rpc: boolean
  rpcHost: string
  rpcPort: number
  grpc: boolean
  grpcHost: string
  grpcPort: number
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
    formState: { isDirty, isSubmitting, errors },
  } = useForm<FormData>({
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
      const {
        rest,
        restPort,
        restHost,
        rpc,
        rpcPort,
        rpcHost,
        grpc,
        grpcPort,
        grpcHost,
      } = beaconnode
      reset({
        rest,
        restPort,
        restHost,
        rpc,
        rpcPort,
        rpcHost,
        grpc,
        grpcPort,
        grpcHost,
      })
      setSubmitSuccess('Beacon node has been updated')
    } catch (e) {
      setSubmitError(e.response.data.error)
    }
  })

  return (
    <>
      <div className="px-4 py-5 sm:p-6">
        {/* REST API */}
        <Controller
          name="rest"
          control={control}
          render={({ field }) => (
            <Toggle
              label="REST API Server"
              onChange={(state) => {
                field.onChange(state)
              }}
              checked={field.value}
            />
          )}
        />
        <div className="mt-4">
          <TextInput
            disabled={!restState}
            label="REST API Server Port"
            className="rounded-md"
            error={errors.restPort?.message}
            {...register('restPort')}
          />
        </div>
        <div className="mt-4">
          <TextInput
            disabled={!restState}
            label="REST API Server Host"
            className="rounded-md"
            error={errors.restHost?.message}
            {...register('restHost')}
          />
        </div>

        <Separator />

        {/* JSON-RPC Server */}
        <Controller
          name="rpc"
          control={control}
          render={({ field }) => (
            <Toggle
              label="JSON-RPC Server"
              onChange={(state) => {
                field.onChange(state)
              }}
              checked={!!field.value}
            />
          )}
        />
        <div className="mt-4">
          <TextInput
            disabled={!rpcState}
            label="JSON-RPC Server Port"
            className="rounded-md"
            error={errors.rpcPort?.message}
            {...register('rpcPort')}
          />
        </div>
        <div className="mt-4">
          <TextInput
            disabled={!rpcState}
            label="JSON-RPC Server Host"
            className="rounded-md"
            error={errors.rpcHost?.message}
            {...register('rpcHost')}
          />
        </div>

        <Separator />

        {/* GRPC Gateway Server */}
        <Controller
          name="grpc"
          control={control}
          render={({ field }) => (
            <Toggle
              label="GRPC Gateway Server"
              onChange={(state) => {
                field.onChange(state)
              }}
              checked={!!field.value}
            />
          )}
        />
        <div className="mt-4">
          <TextInput
            disabled={!grpcState}
            label="GRPC Gateway Server Port"
            className="rounded-md"
            error={errors.grpcPort?.message}
            {...register('grpcPort')}
          />
        </div>
        <div className="mt-4">
          <TextInput
            disabled={!grpcState}
            label="GRPC Gateway Server Host"
            className="rounded-md"
            error={errors.grpcHost?.message}
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
