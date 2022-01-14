import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';

import Layout from '@components/templates/Layout/Layout';
import FormLayout from '@components/templates/FormLayout/FormLayout';
import TextInput from '@components/molecules/TextInput/TextInput';
import RadioGroup from '@components/molecules/RadioGroup/RadioGroup';
import Toggle from '@components/molecules/Toggle/Toggle';
import Select from '@components/molecules/Select/Select';
import Heading from '@components/templates/Heading/Heading';
import SelectWithInput from '@components/molecules/SelectWithInput/SelectWithInput';
import MultiSelectWithInput from '@components/molecules/MultiSelectWithInput/MultiSelectWithInput';
import { createIPFSClusterPeer } from '@utils/requests/ipfs/clusterPeers';
import { schema } from '@schemas/ipfs/clusterPeers/create';
import { ClusterPeer, CreateClusterPeer } from '@interfaces/ipfs/ClusterPeer';
import { consensusOptions } from '@data/ipfs/clusterPeers/consensusOptions';
import { useSecretsByType } from '@utils/requests/secrets';
import { ClusterConsensusAlgorithm } from '@enums/IPFS/ClusterPeers/ClusterConsensusAlgorithm';
import { KubernetesSecretTypes } from '@enums/KubernetesSecret/KubernetesSecretTypes';
import { handleRequest } from '@utils/helpers/handleRequest';
import { usePeers } from '@hooks/usePeers';
import { Deployments } from '@enums/Deployments';
import { NotificationInfo } from '@interfaces/NotificationInfo';
import { useClusterPeers } from '@hooks/useClusterPeers';

const CreateClusterPeerPage: React.FC = () => {
  const [serverError, setServerError] = useState('');
  const [isPredefined, setIsPredefined] = useState(false);
  const { peers } = usePeers();
  const { clusterpeers } = useClusterPeers();
  const { data: privateKeyNames } = useSecretsByType(
    KubernetesSecretTypes.ipfsClusterPeerPrivatekey
  );
  const { data: clusterSecretNames } = useSecretsByType(
    KubernetesSecretTypes.ipfsClusterSecret
  );

  // Get peer endpoints opions
  const peerEndoints = peers.map(({ name }) => ({
    label: name,
    value: `/dns4/${name}/tcp/5001`,
  }));

  // Get cluster bootsrap peers
  const bootstrapPeers = clusterpeers.map(({ name, id }) => ({
    label: name,
    value: `/dns4/${name}/tcp/9096/p2p/${id}`,
  }));

  // Get cluster trusted peers
  const trustedPeers = clusterpeers.map(({ name, id }) => ({
    label: name,
    value: id,
  }));

  const togglePredefined = () => {
    setIsPredefined(!isPredefined);
  };

  const router = useRouter();
  const {
    handleSubmit,
    register,
    control,
    watch,
    formState: { errors, isSubmitted, isValid, isSubmitting },
  } = useForm<CreateClusterPeer>({ resolver: yupResolver(schema) });

  const consensusValue = watch('consensus');

  const onSubmit: SubmitHandler<CreateClusterPeer> = async (values) => {
    setServerError('');
    const { response, error } = await handleRequest<ClusterPeer>(
      createIPFSClusterPeer.bind(undefined, values)
    );

    if (error) {
      setServerError(error);
      return;
    }

    if (response) {
      const notification: NotificationInfo = {
        title: 'IPFS Cluster Peer has been created',
        message:
          'Cluster Peer has been created successfully, and will be up and running in few seconds.',
        deploymentName: response.name,
      };
      localStorage.setItem(
        Deployments.clusterpeer,
        JSON.stringify(notification)
      );
      router.push('/deployments/ipfs/clusterpeers');
    }
  };

  return (
    <Layout>
      <Heading title="Create New Cluster Peer" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormLayout
          error={serverError}
          isSubmitted={isSubmitted}
          isSubmitting={isSubmitting}
          isValid={isValid}
        >
          {/* Cluster Peer Name */}
          <TextInput
            label="Name"
            error={errors.name?.message}
            {...register('name')}
          />

          {/* Peer Endpoint */}
          <Controller
            control={control}
            name="peerEndpoint"
            render={({ field }) => (
              <SelectWithInput
                options={peerEndoints}
                placeholder="Select peer..."
                name={field.name}
                value={field.value}
                onChange={field.onChange}
                error={errors.peerEndpoint?.message}
                label="IPFS Peer"
                otherLabel="Use External Peer"
              />
            )}
          />

          {/* Consensus */}
          <Controller
            name="consensus"
            control={control}
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
          <Controller
            name="clusterSecretName"
            control={control}
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

          {/* Ask for predefined identity and private key */}
          <Toggle
            label="Do you want to start with predefined identity and private key?"
            checked={isPredefined}
            onChange={togglePredefined}
          />
          {isPredefined && (
            <>
              {/* Cluster Peer ID */}
              <TextInput
                label="ID"
                error={errors.id?.message}
                {...register('id')}
              />

              {/* Cluster Peer Private Key */}
              <Controller
                name="privatekeySecretName"
                control={control}
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
            </>
          )}

          {/* Trusted Peers */}
          {consensusValue === ClusterConsensusAlgorithm.crdt && (
            <Controller
              shouldUnregister={true}
              name="trustedPeers"
              control={control}
              render={({ field }) => (
                <MultiSelectWithInput
                  options={trustedPeers}
                  label="Trusted Peers"
                  helperText="* (astrisk) means trust all peers"
                  errors={errors}
                  error={errors.trustedPeers && field.name}
                  onChange={field.onChange}
                  placeholder="Select trusted peers..."
                  otherLabel="Use External Peers"
                  value={field.value}
                />
              )}
            />
          )}

          {/* Bootstrap Peers */}
          <Controller
            name="bootstrapPeers"
            control={control}
            defaultValue={[]}
            render={({ field }) => (
              <MultiSelectWithInput
                options={bootstrapPeers}
                label="Bootstrap Peers (Optional)"
                errors={errors}
                error={errors.bootstrapPeers && field.name}
                onChange={field.onChange}
                placeholder="Select bootstrap peers..."
                otherLabel="Use External Peers"
                value={field.value}
              />
            )}
          />
        </FormLayout>
      </form>
    </Layout>
  );
};

export default CreateClusterPeerPage;
