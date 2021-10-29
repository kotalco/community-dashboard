import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import Layout from '@components/templates/Layout/Layout';
import FormLayout from '@components/templates/FormLayout/FormLayout';
import TextInput from '@components/molecules/TextInput/TextInput';
import TextareaWithInput from '@components/molecules/TextareaWithInput/TextareaWithInput';
import RadioGroup from '@components/molecules/RadioGroup/RadioGroup';
import Toggle from '@components/molecules/Toggle/Toggle';
import Select from '@components/molecules/Select/Select';
import Heading from '@components/templates/Heading/Heading';
import { createIPFSClusterPeer } from '@utils/requests/ipfs/clusterPeers';
import schema from '@schemas/ipfs/clusterPeers';
import { CreateClusterPeer } from '@interfaces/ipfs/ClusterPeer';
import { useNotification } from '@components/contexts/NotificationContext';
import { consensusOptions } from '@data/ipfs/clusterPeers/consensusOptions';
import { useSecretsByType } from '@utils/requests/secrets';
import { ClusterConsensusAlgorithm } from '@enums/IPFS/ClusterPeers/ClusterConsensusAlgorithm';
import axios from 'axios';
import { handleAxiosError } from '@utils/axios';
import { ServerError } from '@interfaces/ServerError';
import { KubernetesSecretTypes } from '@enums/KubernetesSecret/KubernetesSecretTypes';

const CreateClusterPeerPage: React.FC = () => {
  const { createNotification } = useNotification();
  const [isPredefined, setIsPredefined] = useState(false);
  const { data: privateKeyNames } = useSecretsByType(
    KubernetesSecretTypes.ipfsClusterPeerPrivatekey
  );
  const { data: clusterSecretNames } = useSecretsByType(
    KubernetesSecretTypes.ipfsClusterSecret
  );

  const togglePredefined = () => {
    setIsPredefined(!isPredefined);
  };

  const router = useRouter();
  const {
    handleSubmit,
    setError,
    control,
    watch,
    formState: { errors, isSubmitted, isValid, isSubmitting },
  } = useForm<CreateClusterPeer>();

  const consensusValue = watch('consensus');

  const onSubmit: SubmitHandler<CreateClusterPeer> = async (values) => {
    try {
      const peer = await createIPFSClusterPeer(values);
      createNotification({
        title: 'IPFS Cluster Peer has been created',
        protocol: 'cluster peer',
        name: peer.name,
        action:
          'created successfully, and will be up and running in few seconds.',
      });
      void router.push('/deployments/ipfs/clusterpeers');
    } catch (e) {
      // if (axios.isAxiosError(e)) {
      //   const error = handleAxiosError<ServerError>(e);
      //   setError('name', {
      //     type: 'server',
      //     message: error.response?.data.error,
      //   });
      // }
    }
  };

  return (
    <Layout>
      <Heading title="Create New Cluster Peer" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormLayout
          isSubmitted={isSubmitted}
          isSubmitting={isSubmitting}
          isValid={isValid}
        >
          {/* Cluster Peer Name */}
          <TextInput
            label="Name"
            error={errors.name?.message}
            control={control}
            name="name"
            rules={schema.name}
          />

          {/* Peer Endpoint */}
          <div className="mt-4">
            <TextInput
              label="IPFS Peer"
              error={errors.peerEndpoint?.message}
              control={control}
              name="peerEndpoint"
              rules={schema.peerEndpoint}
            />
          </div>

          {/* Consensus */}
          <Controller
            name="consensus"
            control={control}
            rules={schema.consensus}
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
          <div className="mt-4 max-w-xs">
            <Controller
              name="clusterSecretName"
              control={control}
              rules={schema.clusterSecretName}
              render={({ field }) => (
                <Select
                  label="Cluster Secret Name"
                  placeholder="Choose a secret..."
                  error={errors.clusterSecretName?.message}
                  href={`/core/secrets/create?type=${KubernetesSecretTypes.ipfsClusterSecret}`}
                  hrefTitle="Create new secret..."
                  options={clusterSecretNames}
                  onChange={field.onChange}
                />
              )}
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
                    label="ID"
                    error={errors.id?.message}
                    control={control}
                    name="id"
                    rules={schema.id}
                  />
                </div>
                {/* Cluster Peer Private Key */}
                <div className="mt-4 max-w-xs">
                  <Controller
                    name="privatekeySecretName"
                    control={control}
                    rules={schema.privatekeySecretName}
                    shouldUnregister
                    render={({ field }) => (
                      <Select
                        label="Private Key"
                        options={privateKeyNames}
                        error={errors.privatekeySecretName?.message}
                        placeholder="Choose a private key..."
                        href={`/core/secrets/create?type=${KubernetesSecretTypes.ipfsClusterPeerPrivatekey}`}
                        hrefTitle="Create new private key..."
                        onChange={field.onChange}
                      />
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
                rules={schema.trustedPeers}
                defaultValue={['*']}
                render={({ field }) => (
                  <TextareaWithInput
                    multiple
                    label="Trusted Peers"
                    helperText="* (astrisk) means trust all peers"
                    error={errors.trustedPeers?.message}
                    value={field.value}
                    name={field.name}
                    onChange={field.onChange}
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
                  value={field.value}
                  name={field.name}
                  onChange={field.onChange}
                />
              )}
            />
          </div>
        </FormLayout>
      </form>
    </Layout>
  );
};

export default CreateClusterPeerPage;
