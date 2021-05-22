import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { mutate } from 'swr'
import { joiResolver } from '@hookform/resolvers/joi'

import Button from '@components/atoms/Button/Button'
import Checkbox from '@components/molecules/CheckBox/CheckBox'
import TextInput from '@components/molecules/TextInput/TextInput'
import { IPFSPeer, MutateIPFSPeer } from '@interfaces/IPFSPeer'
import Select from '@components/molecules/Select/Select'
import { ipfsRoutingOptions } from '@data/ipfsPeers/ipfsRoutongOptions'
import { initProfilesOptions } from '@data/ipfsPeers/ipfsInitOptions'
import { schema } from '@schemas/ipfsPeer/updateIPFSPeer'
import { updateIPFSPeer } from '@utils/requests/ipfsPeersRequests'

interface Props {
  peer: IPFSPeer
}

const IPFSPeerDetails: React.FC<Props> = ({ peer }) => {
  const [submitError, setSubmitError] = useState('')
  const [submitSuccess, setSubmitSuccess] = useState('')

  console.log(peer)

  const { profiles, initProfiles } = peer

  // const {
  //   reset,
  //   register,
  //   handleSubmit,
  //   formState: { isDirty, isSubmitting, errors },
  // } = useForm<MutateIPFSPeer>({ defaultValues: {}, resolver: joiResolver(schema) })

  // const onSubmit = async (values: MutateIPFSPeer) => {
  //   setSubmitError('')
  //   setSubmitSuccess('')
  //   try {
  //     mutate(peer.name, { ...peer, ...values }, false)
  //     mutate(peer.name, updateIPFSPeer(peer.name, values))
  //     reset(values)
  //     setSubmitSuccess('Peer has been updated')
  //   } catch (e) {
  //     setSubmitError(e.response.data.error)
  //   }
  // }

  return (
    <>
      <div className="px-4 py-5 sm:p-6">
        <dl>
          <dt className="block text-sm font-medium text-gray-700">
            IPFS Initial Configration Profiles
          </dt>
          <dd className="mt-1">
            <span className="text-gray-500 text-sm">
              {initProfiles.join(', ')}
            </span>
          </dd>
        </dl>

        <div className="ml-5 max-w-lg space-y-2 mt-1">
          {initProfilesOptions.map(({ label, value }) => (
            <Checkbox
              key={value}
              label={label}
              value={value}
              // {...register('initProfiles')}
            />
          ))}
        </div>
      </div>

      {/* <div className="flex space-x-2 space-x-reverse flex-row-reverse items-center px-4 py-3 bg-gray-50 sm:px-6">
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
      </div> */}
    </>
  )
}

export default IPFSPeerDetails
