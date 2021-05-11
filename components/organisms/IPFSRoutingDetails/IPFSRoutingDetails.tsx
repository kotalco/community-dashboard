import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { mutate } from 'swr'
import { joiResolver } from '@hookform/resolvers/joi'

import Button from '@components/atoms/Button/Button'
import { IPFSPeer } from '@interfaces/IPFSPeer'
import Select from '@components/molecules/Select/Select'
import { ipfsRoutingOptions } from '@data/ipfsPeers/ipfsRoutongOptions'
import { updateRoutingSchema } from '@schemas/ipfsPeer/updateIPFSPeer'
import { updateIPFSPeer } from '@utils/requests/ipfsPeersRequests'
import { IPFSRouting } from '@enums/IPFSPeers/IPFSRouting'

interface Props {
  peer: IPFSPeer
}

interface FormData {
  routing: IPFSRouting
}

const IPFSPeerDetails: React.FC<Props> = ({ peer }) => {
  const [submitError, setSubmitError] = useState('')
  const [submitSuccess, setSubmitSuccess] = useState('')

  const { routing } = peer

  const {
    reset,
    register,
    handleSubmit,
    formState: { isDirty, isSubmitting, errors },
  } = useForm<FormData>({
    defaultValues: { routing },
    resolver: joiResolver(updateRoutingSchema),
  })

  const onSubmit = async (values: FormData) => {
    setSubmitError('')
    setSubmitSuccess('')
    const peerData = { ...peer, ...values }
    try {
      mutate(peer.name, { ...peer, ...values }, false)
      mutate(peer.name, updateIPFSPeer(peer.name, peerData))
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
            options={ipfsRoutingOptions}
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
