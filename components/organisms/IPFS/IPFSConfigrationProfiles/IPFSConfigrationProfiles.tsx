import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { mutate } from 'swr'
import { joiResolver } from '@hookform/resolvers/joi'

import Button from '@components/atoms/Button/Button'
import Checkbox from '@components/molecules/CheckBox/CheckBox'
import { IPFSPeer } from '@interfaces/ipfs/IPFSPeer'
import { initProfilesOptions } from '@data/ipfs/peers/initProfilesOptions'
import { updateConfigProfilesSchema } from '@schemas/ipfsPeer/updateIPFSPeer'
import { updateIPFSPeer } from '@utils/requests/ipfsPeersRequests'
import { UpdateConfigrationProfiles } from '@interfaces/ipfs/IPFSPeer'

interface Props {
  peer: IPFSPeer
}

const IPFSPeerDetails: React.FC<Props> = ({ peer }) => {
  const [submitError, setSubmitError] = useState('')
  const [submitSuccess, setSubmitSuccess] = useState('')

  const { profiles, initProfiles, name } = peer

  // SHOULD FIX THIS AFTER UPDATING API TO RETURN PROFILES WITH [] BY DEFAULT
  const allProfiles = profiles
    ? [...initProfiles, ...profiles]
    : [...initProfiles]

  const {
    reset,
    register,
    handleSubmit,
    formState: { isDirty, isSubmitting },
  } = useForm<UpdateConfigrationProfiles>({
    defaultValues: { profiles: allProfiles },
    resolver: joiResolver(updateConfigProfilesSchema),
  })

  const onSubmit: SubmitHandler<UpdateConfigrationProfiles> = async (
    values
  ) => {
    setSubmitError('')
    setSubmitSuccess('')

    try {
      const peer = await updateIPFSPeer(name, values)
      mutate(name, peer)
      reset({ profiles: [...peer.profiles, ...peer.initProfiles] })
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
