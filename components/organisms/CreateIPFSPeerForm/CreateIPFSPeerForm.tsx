import React, { useState } from 'react'
import { FieldError, useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { joiResolver } from '@hookform/resolvers/joi'

import TextInput from '@components/molecules/TextInput/TextInput'
import Button from '@components/atoms/Button/Button'
import Checkbox from '@components/molecules/CheckBox/CheckBox'
import { createIPFSPeer } from '@utils/requests/ipfsPeersRequests'
import { schema } from '@schemas/ipfsPeer/createIPFSPeer'
import { IPFSPeer } from '@interfaces/IPFSPeer'
import { IPFSConfigurationProfile } from '@enums/IPFSPeers/IPFSConfigurationProfile'
import { initProfilesOptions } from '@data/ipfs/peers/initProfilesOptions'
import { useNotification } from '@components/contexts/NotificationContext'

const CreateNodeForm: React.FC = () => {
  const [submitError, setSubmitError] = useState('')
  const { createNotification } = useNotification()

  const router = useRouter()
  const {
    register,
    formState: { errors, isSubmitted, isValid, isSubmitting },
    handleSubmit,
  } = useForm<IPFSPeer>({
    resolver: joiResolver(schema),
    defaultValues: {
      initProfiles: [IPFSConfigurationProfile.defaultDatastore],
    },
  })

  /**
   * Submit create IPFS Peer from
   * @param values the data required to create new peer
   */
  const onSubmit = async (values: IPFSPeer) => {
    try {
      setSubmitError('')
      const peer = await createIPFSPeer(values)
      createNotification({
        title: 'IPFS Peer has been created',
        protocol: 'IPFS',
        name: peer.name,
        action:
          'created successfully, and will be up and running in few seconds.',
      })
      router.push('/deployments/ipfs/peers')
    } catch (e) {
      setSubmitError(e.response.data.error)
    }
  }

  const initProfilesError = errors.initProfiles as FieldError | undefined

  return (
    <form>
      <div className="px-4 py-5 sm:p-6">
        {/* Peer Name */}
        <TextInput
          {...register('name')}
          label="Peer Name"
          className="rounded-md"
          error={errors.name?.message}
        />

        {/* <!-- configuration profiles --> */}
        <div className="mt-4">
          <p className="block text-sm font-medium text-gray-700">
            Initial Configuration Profiles:
          </p>
          <div className="ml-5 max-w-lg space-y-2 mt-1">
            {initProfilesOptions.map(({ label, value }) => (
              <Checkbox
                key={value}
                label={label}
                value={value}
                {...register('initProfiles')}
              />
            ))}
          </div>
        </div>
        <p className="text-red-500 text-sm mt-2">
          {initProfilesError?.message}
        </p>
      </div>

      {/* <!-- end: content here --> */}
      <div className="flex space-x-2 space-x-reverse flex-row-reverse items-center px-4 py-3 bg-gray-50 sm:px-6">
        <Button
          className="btn btn-primary"
          disabled={(isSubmitted && !isValid) || isSubmitting}
          onClick={handleSubmit(onSubmit)}
          loading={isSubmitting}
        >
          Create
        </Button>

        {/* Show if there is an error from server */}
        {submitError && (
          <p className="text-center text-red-500">{submitError}</p>
        )}
      </div>
    </form>
  )
}

export default CreateNodeForm
