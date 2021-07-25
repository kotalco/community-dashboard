import { useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/router'

import Layout from '@components/templates/Layout/Layout'
import FormLayout from '@components/templates/FormLayout/FormLayout'
import TextInput from '@components/molecules/TextInput/TextInput'
import TextareaWithInput from '@components/molecules/TextareaWithInput/TextareaWithInput'
import RadioGroup from '@components/molecules/RadioGroup/RadioGroup'
import Toggle from '@components/molecules/Toggle/Toggle'
import Select from '@components/molecules/Select/Select'
import { createIPFSClusterPeer } from '@utils/requests/ipfs/clusterPeers'
import {
  nameValidations,
  consensusValidations,
  clusterSecretNameValidations,
  idValidation,
  privatekeySecretNameValidations,
  trustedPeersValidation,
} from '@schemas/ipfs/clusterPeers'
import { CreateIPFSClusterPeer } from '@interfaces/ipfs/IPFSClusterPeer'
import { useNotification } from '@components/contexts/NotificationContext'
import { consensusOptions } from '@data/ipfs/clusterPeers/consensusOptions'
import { useSecrets } from '@utils/requests/secrets'
import { ClusterConsensusAlgorithm } from '@enums/IPFS/ClusterPeers/ClusterConsensusAlgorithm'

const CreateClusterPeerPage: React.FC = () => {
  const { createNotification } = useNotification()
  const [isPredefined, setIsPredefined] = useState(false)
  const { data } = useSecrets('privatekey')
  const privateKeyNames = data?.map(({ name }) => name) || []

  const togglePredefined = () => {
    setIsPredefined(!isPredefined)
  }

  const router = useRouter()
  const {
    register,
    handleSubmit,
    setError,
    control,
    watch,
    formState: { errors, isSubmitted, isValid, isSubmitting },
  } = useForm<CreateIPFSClusterPeer>({
    defaultValues: {
      trustedPeers: [],
      bootstrapPeers: [],
    },
  })

  const consensusValue = watch('consensus')

  /**
   * Submit create IPFS Cluster Peer form
   * @param values the data required to create new peer
   */
  const onSubmit: SubmitHandler<CreateIPFSClusterPeer> = async (values) => {
    try {
      const peer = await createIPFSClusterPeer(values)
      createNotification({
        title: 'IPFS Cluster Peer has been created',
        protocol: 'cluster peer',
        name: peer.name,
        action:
          'created successfully, and will be up and running in few seconds.',
      })
      router.push('/deployments/ipfs/clusterpeers')
    } catch (e) {
      setError('name', { type: 'server', message: e.response.data.error })
    }
  }

  return (
    <Layout>
      <h1 className="text-2xl font-semibold">Create New Cluster Peer</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormLayout
          isSubmitted={isSubmitted}
          isSubmitting={isSubmitting}
          isValid={isValid}
        >
          {/* Cluster Peer Name */}
          <TextInput
            label="Name"
            className="rounded-md"
            error={errors.name?.message}
            {...register('name', nameValidations)}
          />

          {/* Consensus */}
          <Controller
            name="consensus"
            control={control}
            rules={consensusValidations}
            render={({ field }) => (
              <RadioGroup
                options={consensusOptions}
                value={field.value}
                onChange={field.onChange}
                error={errors.consensus?.message}
              />
            )}
          />

          {/* Cluster Secret */}
          <div className="mt-4">
            <TextInput
              label="Cluster Secret Name"
              className="rounded-md"
              error={errors.clusterSecretName?.message}
              {...register('clusterSecretName', clusterSecretNameValidations)}
            />
          </div>

          {/* Ask for predefined identity and private key */}
          <div className="mt-4">
            <Toggle
              label="Do you want to start with predefined identity and private key?"
              checked={isPredefined}
              onChange={togglePredefined}
            />
            {isPredefined && (
              <>
                {/* Cluster Peer ID */}
                <div className="mt-4">
                  <TextInput
                    className="rounded-md"
                    label="ID"
                    error={errors.id?.message}
                    {...register('id', idValidation)}
                  />
                </div>
                {/* Cluster Peer Private Key */}
                <div className="mt-4">
                  <Select
                    label="Private Key"
                    options={[
                      'Choose a private key name...',
                      ...privateKeyNames,
                    ]}
                    className="rounded-md"
                    error={errors.privatekeySecretName?.message}
                    {...register(
                      'privatekeySecretName',
                      privatekeySecretNameValidations
                    )}
                  />
                </div>
              </>
            )}
          </div>

          {/* Trusted Peers */}
          {consensusValue === ClusterConsensusAlgorithm.crdt && (
            <div className="mt-4">
              <Controller
                shouldUnregister={true}
                name="trustedPeers"
                control={control}
                rules={trustedPeersValidation}
                render={({ field }) => (
                  <TextareaWithInput
                    multiple
                    label="Trusted Peers"
                    error={errors.trustedPeers?.message}
                    {...field}
                  />
                )}
              />
            </div>
          )}

          {/* Bootstrap Peers */}
          <div className="mt-4">
            <Controller
              name="bootstrapPeers"
              control={control}
              render={({ field }) => (
                <TextareaWithInput
                  multiple
                  label="Bootstrap Peers (Optional)"
                  {...field}
                />
              )}
            />
          </div>
        </FormLayout>
      </form>
    </Layout>
  )
}

export default CreateClusterPeerPage
