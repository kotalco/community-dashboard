import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { mutate } from 'swr'
import { joiResolver } from '@hookform/resolvers/joi'

import Button from '@components/atoms/Button/Button'
import TextInput from '@components/molecules/TextInput/TextInput'
import { IPFSPeer } from '@interfaces/ipfs/IPFSPeer'
import { updateGatewaySchema } from '@schemas/ipfsPeer/updateIPFSPeer'
import { updateIPFSPeer } from '@utils/requests/ipfsPeersRequests'

interface Props {
  peer: IPFSPeer
}

interface FormData {
  gatewayPort: number
  gatewayHost: string
}

const IPFSPeerDetails: React.FC<Props> = ({ peer }) => {
  const [submitError, setSubmitError] = useState('')
  const [submitSuccess, setSubmitSuccess] = useState('')

  const { gatewayPort, gatewayHost } = peer

  const {
    reset,
    register,
    handleSubmit,
    formState: { isDirty, isSubmitting, errors },
  } = useForm<FormData>({
    defaultValues: { gatewayHost, gatewayPort },
    resolver: joiResolver(updateGatewaySchema),
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
          <TextInput
            error={errors.gatewayPort?.message}
            className="rounded-md"
            label="Local Gateway IPFS Server Port"
            {...register('gatewayPort')}
          />
        </div>
        <div className="mt-4">
          <TextInput
            error={errors.gatewayHost?.message}
            className="rounded-md"
            label="Local Gateway IPFS Server Host"
            {...register('gatewayHost')}
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
