import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { mutate } from 'swr'
import { joiResolver } from '@hookform/resolvers/joi'

import Button from '@components/atoms/Button/Button'
import { UpdateRouting } from '@interfaces/ipfs/IPFSPeer'
import Select from '@components/molecules/Select/Select'
import { routingOptions } from '@data/ipfs/peers/routingOptions'
import { updateRoutingSchema } from '@schemas/ipfsPeer/updateIPFSPeer'
import { updateIPFSPeer } from '@utils/requests/ipfs/peers'
import { IPFSRouting } from '@enums/IPFSPeers/IPFSRouting'

interface Props {
  peerName: string
  routing: IPFSRouting
}

const IPFSPeerDetails: React.FC<Props> = ({ routing, peerName }) => {
  const [submitError, setSubmitError] = useState('')
  const [submitSuccess, setSubmitSuccess] = useState('')

  const {
    reset,
    register,
    handleSubmit,
    formState: { isDirty, isSubmitting, errors },
  } = useForm<UpdateRouting>({
    defaultValues: { routing },
    resolver: joiResolver(updateRoutingSchema),
  })

  const onSubmit: SubmitHandler<UpdateRouting> = async (values) => {
    setSubmitError('')
    setSubmitSuccess('')

    try {
      const peer = await updateIPFSPeer(peerName, values)
      mutate(peerName, peer)
      reset(values)
      setSubmitSuccess('Peer has been updated')
    } catch (e) {
      setSubmitError(e.response.data.error)
    }
  }

  return (
    <>
      <div className="px-4 py-5 sm:p-6">
        <div className="mt-4">
          <Select
            error={errors.routing?.message}
            className="rounded-md"
            options={routingOptions}
            label="Content Routing Mechanism"
            {...register('routing')}
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

export default IPFSPeerDetails
