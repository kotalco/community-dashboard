import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { mutate } from 'swr'
import { joiResolver } from '@hookform/resolvers/joi'

import Button from '@components/atoms/Button/Button'
import TextInput from '@components/molecules/TextInput/TextInput'
import { IPFSPeer } from '@interfaces/ipfs/IPFSPeer'
import { updateAPIsSchema } from '@schemas/ipfsPeer/updateIPFSPeer'
import { updateIPFSPeer } from '@utils/requests/ipfsPeersRequests'

interface Props {
  peer: IPFSPeer
}

interface FormData {
  apiPort: number
  apiHost: string
}

const IPFSPeerDetails: React.FC<Props> = ({ peer }) => {
  const [submitError, setSubmitError] = useState('')
  const [submitSuccess, setSubmitSuccess] = useState('')

  const { apiPort, apiHost } = peer

  const {
    reset,
    register,
    handleSubmit,
    formState: { isDirty, isSubmitting, errors },
  } = useForm<FormData>({
    defaultValues: { apiPort, apiHost },
    resolver: joiResolver(updateAPIsSchema),
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
            error={errors.apiPort?.message}
            className="rounded-md"
            label="API Server Port"
            {...register('apiPort')}
          />
        </div>
        <div className="mt-4">
          <TextInput
            error={errors.apiHost?.message}
            className="rounded-md"
            label="API Server Host"
            {...register('apiHost')}
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
