import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { mutate } from 'swr'
import { joiResolver } from '@hookform/resolvers/joi'

import Button from '@components/atoms/Button/Button'
import TextInput from '@components/molecules/TextInput/TextInput'
import { IPFSPeer, MutateIPFSPeer } from '@interfaces/IPFSPeer'
import Select from '@components/molecules/Select/Select'
import { ipfsRoutingOptions } from '@data/ipfsPeers/ipfsRoutongOptions'
import { schema } from '@schemas/ipfsPeer/updateIPFSPeer'
import { updateIPFSPeer } from '@utils/requests/ipfsPeersRequests'

interface Props {
  peer: IPFSPeer
}

const IPFSPeerDetails: React.FC<Props> = ({ peer }) => {
  const [submitError, setSubmitError] = useState('')
  const [submitSuccess, setSubmitSuccess] = useState('')

  const { apiPort, apiHost, gatewayPort, gatewayHost, routing } = peer
  const defaultValues: MutateIPFSPeer = {
    apiPort,
    apiHost,
    gatewayPort,
    gatewayHost,
    routing,
  }

  const {
    reset,
    register,
    handleSubmit,
    formState: { isDirty, isSubmitting, errors },
  } = useForm<MutateIPFSPeer>({ defaultValues, resolver: joiResolver(schema) })

  const onSubmit = async (values: MutateIPFSPeer) => {
    setSubmitError('')
    setSubmitSuccess('')
    try {
      mutate(peer.name, { ...peer, ...values }, false)
      mutate(peer.name, updateIPFSPeer(peer.name, values))
      reset(values)
      setSubmitSuccess('Peer has been updated')
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
            <span className="text-gray-500 text-sm">IPFS Peer</span>
          </dd>
        </dl>
        <dl>
          <dt className="block text-sm font-medium text-gray-700 mt-4">
            IPFS Configration Profile
          </dt>
          <dd className="mt-1">
            <span className="text-gray-500 text-sm">
              {peer.initProfiles.join(', ')}
            </span>
          </dd>
        </dl>
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
