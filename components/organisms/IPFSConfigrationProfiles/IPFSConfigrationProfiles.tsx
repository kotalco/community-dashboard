import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { mutate } from 'swr'
import { joiResolver } from '@hookform/resolvers/joi'

import Button from '@components/atoms/Button/Button'
import Checkbox from '@components/molecules/CheckBox/CheckBox'
import { IPFSPeer } from '@interfaces/IPFSPeer'
import { initProfilesOptions } from '@data/ipfsPeers/ipfsInitOptions'
import { updateConfigProfilesSchema } from '@schemas/ipfsPeer/updateIPFSPeer'
import { updateIPFSPeer } from '@utils/requests/ipfsPeersRequests'
import { IPFSConfigurationProfile } from '@enums/IPFSPeers/IPFSConfigurationProfile'

interface Props {
  peer: IPFSPeer
}

interface FormData {
  profiles: IPFSConfigurationProfile[]
}

const IPFSPeerDetails: React.FC<Props> = ({ peer }) => {
  const [submitError, setSubmitError] = useState('')
  const [submitSuccess, setSubmitSuccess] = useState('')

  const { profiles, initProfiles } = peer

  // SHOULD FIX THIS AFTER UPDATING API TO RETURN PROFILES WITH [] BY DEFAULT
  const allProfiles = profiles
    ? [...initProfiles, ...profiles]
    : [...initProfiles]

  const {
    reset,
    register,
    handleSubmit,
    formState: { isDirty, isSubmitting },
  } = useForm<FormData>({
    defaultValues: { profiles: allProfiles },
    resolver: joiResolver(updateConfigProfilesSchema),
  })

  const onSubmit = async (values: FormData) => {
    setSubmitError('')
    setSubmitSuccess('')
    const peerData = { ...peer, ...values }
    try {
      mutate(peer.name, { ...peer, ...values }, false)
      mutate(peer.name, updateIPFSPeer(peer.name, peerData))
      reset({ profiles: [...initProfiles, ...values.profiles] })
      setSubmitSuccess('Peer has been updated')
    } catch (e) {
      setSubmitError(e.response.data.error)
    }
  }

  return (
    <>
      <div className="px-4 py-5 sm:p-6">
        <dl>
          <dt className="block text-sm font-medium text-gray-700">
            Configration Profiles
          </dt>
          <dd className="mt-3 ml-5">
            {initProfilesOptions.map(({ label, value }) => (
              <Checkbox
                key={value}
                label={label}
                value={value}
                disabled={initProfiles.includes(value)}
                {...register('profiles')}
              />
            ))}
          </dd>
        </dl>
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
