import { useState } from 'react'
import { useForm, useWatch, Controller, SubmitHandler } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { mutate } from 'swr'

import Button from '@components/atoms/Button/Button'
import { updateBeaconNode } from '@utils/requests/ethereum2/beaconNodes'
import { updateAPISchema } from '@schemas/ethereum2/beaconNode/updateBeaconNode'
import { UpdateAPI } from '@interfaces/ethereum2/Ethereum2BeaconNode'
import TextInput from '@components/molecules/TextInput/TextInput'
import Separator from '@components/atoms/Separator/Separator'
import Toggle from '@components/molecules/Toggle/Toggle'
import { BeaconNodeClient } from '@enums/Ethereum2/BeaconNodeClient'

interface Props {
  name: string
  rest?: boolean
  restHost?: string
  restPort?: number
  rpc: boolean
  rpcHost: string
  rpcPort: number
  grpc: boolean
  grpcHost: string
  grpcPort: number
  client: BeaconNodeClient
}

const BeaconNodeProtocolTab: React.FC<Props> = ({
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
  client,
}) => {
  const [submitError, setSubmitError] = useState('')
  const [submitSuccess, setSubmitSuccess] = useState('')

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
    client,
  }

  const {
    reset,
    register,
    handleSubmit,
    control,
    formState: { isDirty, isSubmitting, errors },
  } = useForm<UpdateAPI>({
    defaultValues,
    resolver: joiResolver(updateAPISchema),
  })

  const [restState, rpcState, grpcState] = useWatch({
    control,
    name: ['rest', 'rpc', 'grpc'],
  })

  const onSubmit: SubmitHandler<UpdateAPI> = async (values) => {
    setSubmitError('')
    setSubmitSuccess('')
    try {
      const beaconnode = await updateBeaconNode(name, values)
      mutate(name, beaconnode)
      reset(values)
      setSubmitSuccess('Beacon node has been updated')
    } catch (e) {
      setSubmitError(e.response.data.error)
    }
  }

  return (
    <>
      <div className="px-4 py-5 sm:p-6">
        {/* REST API */}
        {/* Supported by Teku and Lighthouse only */}
        {(client === BeaconNodeClient.teku ||
          client === BeaconNodeClient.lighthouse) && (
          <>
            <Controller
              name="rest"
              control={control}
              render={({ field }) => (
                <Toggle
                  label="REST API Server"
                  onChange={(state) => {
                    field.onChange(state)
                  }}
                  checked={!!field.value}
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
          </>
        )}

        {/* JSON-RPC Server */}
        {/* Supoorted only by Prysm and Nimbus */}
        {(client === BeaconNodeClient.nimbus ||
          client === BeaconNodeClient.prysm) && (
          <>
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
          </>
        )}

        {/* GRPC Gateway Server */}
        {/* Supported by Prysm only */}
        {client === BeaconNodeClient.prysm && (
          <>
            <Separator />

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
          </>
        )}
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

export default BeaconNodeProtocolTab
